#!/usr/bin/env node
/**
 * Turns a Claude Code session log (JSONL, from ~/.claude/projects/) into readable Markdown.
 * Dev tooling only; not part of the app.
 *
 * Usage:
 *   node scripts/transcript-to-markdown.mjs <session.jsonl> <out.md> --title "…" [--stop-before "…"] [--redact "text"]…
 *
 * - User messages and Claude's replies in order, each under its own heading.
 * - Every tool call (shell commands, file edits, browser steps) with its input and its output,
 *   in a collapsible section. Long outputs are shortened; images are replaced by a note.
 * - Left out: Claude's internal reasoning ("thinking" blocks, also left out by /export) and text
 *   that Claude Code injects into messages (system reminders, command caveats).
 * - --stop-before: stop at the first user message that starts with this text.
 * - Anything that looks like a GitHub token is replaced with [REDACTED].
 * - --redact (repeatable): text to remove everywhere, e.g. a personal email address; it is
 *   replaced with [email removed] if it looks like an email, otherwise with [REDACTED].
 */
import { readFileSync, writeFileSync } from 'node:fs';

const [input, output, ...rest] = process.argv.slice(2);
const option = (name) => {
  const index = rest.indexOf(name);
  return index >= 0 ? rest[index + 1] : undefined;
};
const title = option('--title') ?? 'Session transcript';
const stopBefore = option('--stop-before');
const redactions = rest.flatMap((value, index) => (rest[index - 1] === '--redact' ? [value] : []));
if (!input || !output) {
  console.error('Usage: node scripts/transcript-to-markdown.mjs <session.jsonl> <out.md> --title "…" [--stop-before "…"]');
  process.exit(1);
}

const MAX_LINES = 60;
const MAX_CHARS = 5000;
const TOKEN = /gh[pousr]_[A-Za-z0-9]{20,}/g;

const all = readFileSync(input, 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((line) => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  })
  .filter(Boolean);

// Follow the conversation as it actually happened: walk from the last message back through
// parentUuid. Messages the user sent and then edited or rewound sit on abandoned branches and
// are left out.
const byUuid = new Map(all.filter((entry) => entry.uuid).map((entry) => [entry.uuid, entry]));
const chained = all.filter((entry) => entry.uuid && (entry.type === 'user' || entry.type === 'assistant') && !entry.isSidechain);
const onChain = new Set();
for (let entry = chained[chained.length - 1]; entry; entry = byUuid.get(entry.parentUuid)) {
  if (onChain.has(entry.uuid)) break;
  onChain.add(entry.uuid);
}
const entries = all.filter(
  (entry) =>
    onChain.has(entry.uuid) ||
    // A message typed while Claude was working is stored as a queued command, not a user message.
    (entry.type === 'attachment' && entry.attachment?.type === 'queued_command' && onChain.has(entry.parentUuid)),
);

// ---------- helpers ----------

/** A code fence longer than any run of backticks inside the text, so the block never breaks. */
function fence(text, language = '') {
  const longest = Math.max(2, ...(text.match(/`+/g) ?? []).map((run) => run.length));
  const ticks = '`'.repeat(longest + 1);
  return `${ticks}${language}\n${text.replace(/\n+$/, '')}\n${ticks}`;
}

function shorten(text, maxLines = MAX_LINES) {
  let lines = text.split('\n');
  let note = '';
  if (lines.length > maxLines) {
    note = `\n… (${lines.length - maxLines} more lines not shown)`;
    lines = lines.slice(0, maxLines);
  }
  let result = lines.join('\n');
  if (result.length > MAX_CHARS) {
    note = `\n… (${result.length - MAX_CHARS} more characters not shown)`;
    result = result.slice(0, MAX_CHARS);
  }
  return result + note;
}

/** Removes text that Claude Code injects into user messages; keeps what the user wrote. */
function cleanUserText(text) {
  return text
    .replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, '')
    .replace(/<local-command-caveat>[\s\S]*?<\/local-command-caveat>/g, '')
    .replace(/<\/?pasted_content[^>]*>/g, '')
    .trim();
}

function time(entry) {
  const date = new Date(entry.timestamp);
  return Number.isNaN(date.getTime())
    ? ''
    : ` · ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function resultText(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content
    .map((block) => (block.type === 'text' ? block.text : block.type === 'image' ? '[image: screenshot]' : ''))
    .join('\n');
}

function describeTool(block) {
  const inputValue = block.input ?? {};
  const name = block.name.replace(/^mcp__playwright__browser_/, 'Browser: ').replace(/^mcp__[^_]+__/, '');
  switch (block.name) {
    case 'Bash':
      return {
        summary: `Shell: ${inputValue.description ?? 'command'}`,
        body: fence(shorten(inputValue.command ?? '', 80), 'sh'),
      };
    case 'Read':
      return { summary: `Read ${inputValue.file_path ?? ''}`, body: '' };
    case 'Write':
      return {
        summary: `Write ${inputValue.file_path ?? ''}`,
        body: fence(shorten(inputValue.content ?? '', 80)),
      };
    case 'Edit':
      return {
        summary: `Edit ${inputValue.file_path ?? ''}`,
        body: `Replace:\n\n${fence(shorten(inputValue.old_string ?? '', 30))}\n\nwith:\n\n${fence(shorten(inputValue.new_string ?? '', 30))}`,
      };
    default:
      return { summary: name, body: fence(shorten(JSON.stringify(inputValue, null, 2), 40), 'json') };
  }
}

// ---------- render ----------

const results = new Map(); // tool_use_id → result text
for (const entry of entries) {
  if (entry.type !== 'user' || !Array.isArray(entry.message?.content)) continue;
  for (const block of entry.message.content) {
    if (block.type === 'tool_result') {
      results.set(block.tool_use_id, { text: resultText(block.content), error: block.is_error === true });
    }
  }
}

const out = [];
let lastSpeaker = '';
let stopped = false;
let userTurns = 0;

for (const entry of entries) {
  const content = entry.message?.content;

  if (entry.type === 'attachment') {
    const text = cleanUserText(String(entry.attachment.prompt ?? ''));
    if (!text) continue;
    if (stopBefore && text.startsWith(stopBefore)) {
      stopped = true;
      break;
    }
    userTurns += 1;
    out.push('---', '', `### User (sent while Claude was working)${time(entry)}`, '', text.split('\n').map((line) => `> ${line}`.trimEnd()).join('\n'), '');
    lastSpeaker = 'user';
    continue;
  }

  if (entry.type === 'user') {
    // Text Claude Code adds by itself (skill instructions, image file references) is not the user's.
    if (entry.isMeta) {
      const skill = typeof content === 'string' ? content.match(/^Base directory for this skill: .*\/([^/\n]+)\n/) : null;
      if (skill) out.push(`*Claude loaded the writing-style skill "${skill[1]}".*`, '');
      continue;
    }
    // Tool results are shown with their tool call.
    if (Array.isArray(content) && content.every((block) => block.type === 'tool_result')) continue;

    let text =
      typeof content === 'string'
        ? content
        : (content ?? []).map((block) => (block.type === 'text' ? block.text : block.type === 'image' ? '[image attached by the user]' : '')).join('\n');

    const command = text.match(/<command-name>([\s\S]*?)<\/command-name>[\s\S]*?<command-args>([\s\S]*?)<\/command-args>/);
    if (command) {
      out.push(`*The user ran a Claude Code command: \`${command[1].trim()} ${command[2].trim()}\`.*`, '');
      continue;
    }
    if (/<local-command-stdout>/.test(text) || (entry.isMeta && !/\S/.test(cleanUserText(text)))) continue;

    text = cleanUserText(text);
    if (!text) continue;
    if (stopBefore && text.startsWith(stopBefore)) {
      stopped = true;
      break;
    }
    userTurns += 1;
    out.push('---', '', `### User${time(entry)}`, '', text.split('\n').map((line) => `> ${line}`.trimEnd()).join('\n'), '');
    lastSpeaker = 'user';
    continue;
  }

  // assistant
  for (const block of Array.isArray(content) ? content : []) {
    if (block.type === 'thinking' || block.type === 'redacted_thinking') continue;
    if (lastSpeaker !== 'claude') {
      out.push(`### Claude${time(entry)}`, '');
      lastSpeaker = 'claude';
    }
    if (block.type === 'text' && block.text.trim()) {
      out.push(block.text.trim(), '');
    } else if (block.type === 'tool_use') {
      const { summary, body } = describeTool(block);
      const result = results.get(block.id);
      const resultPart = result
        ? `\n\n${result.error ? 'Error' : 'Output'}:\n\n${fence(shorten(result.text || '(no output)'))}`
        : '';
      out.push(`<details><summary>${summary.replace(/</g, '&lt;')}</summary>\n\n${body}${resultPart}\n\n</details>`, '');
    }
  }
}

const header = [
  `# ${title}`,
  '',
  `Generated from the Claude Code session log by \`scripts/transcript-to-markdown.mjs\`. It shows every message and every tool call with its output (click a grey line to open it). Long outputs are shortened and screenshots are replaced by a note. Claude's internal reasoning is not included, as in Claude Code's own export. Any GitHub token is replaced with [REDACTED].`,
  '',
];
if (stopped) header.push(`This transcript ends before the user message starting "${stopBefore}"; the messages after it were left out.`, '');

let text = (header.join('\n') + '\n' + out.join('\n')).replace(TOKEN, '[REDACTED]').replace(/[ \t]+$/gm, '') + '\n';
for (const secret of redactions) {
  text = text.split(secret).join(secret.includes('@') ? '[email removed]' : '[REDACTED]');
}
writeFileSync(output, text);
console.log(`${output}: ${userTurns} user messages, ${text.split('\n').length} lines${stopped ? ', stopped as requested' : ''}`);

# AI session transcripts

All work was done with **Claude Code**, model **Claude Opus 5.5**, on 6 November 2026.
Each transcript is exported with Claude Code's own `/export` command. One GitHub token pasted by mistake was replaced with [REDACTED]. Session-03 ends with the reply to the "Final cleanup" message: the last four messages after it (and the replies to them) came after the work was finished and were left out. Nothing else was changed.

| # | File | Purpose |
|---|---|---|
| 01 | not included | The chat that drafted the first versions of the four planning documents. It was not saved and could not be recovered. Its first prompt is quoted in full in session 02. |
| 02 | [session-02.md](session-02.md) | Analysing the assignment, reviewing the first documents against it, and planning the prompts for session 03. Each result from session 03 was pasted back here for review. |
| 03 | [session-03.md](session-03.md) | Fixing the documents, then the whole build: setup, engine, validation, config, UI, schedule, extra payments, presets, audit, statuses and README. |

## Reading order

1. **Session 02** up to "this is the propment through this i have generated those md files": the
   original prompt and why the first documents missed several assignment rules.
2. **Session 03** from the start: the corrected rules and the document rework, then the build step by
   step. Each step lists its test cases before any code, and records the mistakes found and fixed.
3. **Session 02** alongside session 03: the review of each step's output.

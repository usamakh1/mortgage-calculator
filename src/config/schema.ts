/**
 * validateConfig: turns any parsed JSON into a complete, valid AppConfig plus a list of problems.
 * Pure (no fetch, no DOM, no logging) and never throws.
 * Rules: docs/user-stories.md A1 (schema, config rules), A2 (presets), A3 (texts), A4 (fallbacks).
 */
import { MESSAGES } from '../messages';
import {
  DEFAULT_CONFIG,
  DEFAULT_DEFAULTS,
  DEFAULT_LIMITS,
  type AppConfig,
  type Defaults,
  type Limits,
  type Preset,
  type Range,
} from './defaults';

export interface ConfigProblem {
  /** Name shown in the E12 list, e.g. "currency", "limits.termYears", "presets: Jumbo". */
  field: string;
  value: unknown;
}

export interface ConfigNotice {
  id: 'E11' | 'E12';
  text: string;
}

export interface ConfigResult {
  config: AppConfig;
  problems: ConfigProblem[];
  /** E11 when the file could not be used at all, E12 when some settings fell back, else null. */
  notice: ConfigNotice | null;
}

type Json = Record<string, unknown>;

export function isPlainObject(value: unknown): value is Json {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

const TOP_LEVEL_KEYS = ['currency', 'locale', 'officeName', 'disclaimer', 'limits', 'defaults', 'presets'];
const LIMIT_KEYS = ['homePrice', 'ratePercent', 'termYears', 'extraPayment'] as const;
const DEFAULT_KEYS = ['homePrice', 'downPayment', 'ratePercent', 'termYears', 'extraPayment'] as const;
const RANGE_KEYS = ['min', 'max'];
const PRESET_KEYS = ['id', 'name', 'ratePercent', 'termYears', 'description'];

/** Decimals allowed per kind of value: money 2, rate 3, years 0 (matches the Input rules). */
const DECIMALS: Record<keyof Limits, number> = { homePrice: 2, ratePercent: 3, termYears: 0, extraPayment: 2 };

function hasAtMostDecimals(value: number, decimals: number): boolean {
  const scaled = value * 10 ** decimals;
  return Math.abs(scaled - Math.round(scaled)) < 1e-6;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

const within = (value: number, range: Range): boolean => value >= range.min && value <= range.max;
const clamp = (value: number, range: Range): number => Math.min(range.max, Math.max(range.min, value));

/** Reports keys of `object` that are not in `known`, as `${path}.${key}` (Q4). */
function reportUnknownKeys(object: Json, known: readonly string[], path: string, problems: ConfigProblem[]): void {
  for (const key of Object.keys(object)) {
    if (!known.includes(key)) problems.push({ field: path ? `${path}.${key}` : key, value: object[key] });
  }
}

function checkCurrency(value: unknown): string | null {
  if (typeof value !== 'string' || value.trim() === '') return null;
  const code = value.trim().toUpperCase();
  try {
    const supported =
      typeof Intl.supportedValuesOf === 'function'
        ? Intl.supportedValuesOf('currency').includes(code)
        : /^[A-Z]{3}$/.test(code);
    if (!supported) return null;
    // Only 2-decimal currencies: amounts are calculated in cents (A1 config rules, plan §8).
    const digits = new Intl.NumberFormat('en-US', { style: 'currency', currency: code }).resolvedOptions()
      .maximumFractionDigits;
    return digits === 2 ? code : null;
  } catch {
    return null;
  }
}

function checkLocale(value: unknown): string | null {
  if (typeof value !== 'string' || value.trim() === '') return null;
  try {
    return Intl.NumberFormat.supportedLocalesOf(value.trim())[0] ?? null;
  } catch {
    return null; // "not a locale!!" throws RangeError
  }
}

/** Text fields: missing, null or blank → `fallback` silently; non-text → problem (A3.3–A3.5, Q10). */
function checkText<T>(
  json: Json,
  key: 'officeName' | 'disclaimer',
  fallback: T,
  problems: ConfigProblem[],
): string | T {
  const value = json[key];
  if (value === undefined || value === null) return fallback;
  if (typeof value !== 'string') {
    problems.push({ field: key, value });
    return fallback;
  }
  const trimmed = value.trim();
  return trimmed === '' ? fallback : trimmed;
}

function checkLimits(value: unknown, problems: ConfigProblem[]): Limits {
  const limits: Limits = { ...DEFAULT_LIMITS };
  if (value === undefined) return limits;
  if (!isPlainObject(value)) {
    problems.push({ field: 'limits', value });
    return limits;
  }
  for (const key of Object.keys(value)) {
    const field = `limits.${key}`;
    if (!(LIMIT_KEYS as readonly string[]).includes(key)) {
      problems.push({ field, value: value[key] });
      continue;
    }
    const name = key as keyof Limits;
    const range = value[key];
    if (!isPlainObject(range)) {
      problems.push({ field, value: range });
      continue;
    }
    const builtIn = DEFAULT_LIMITS[name];
    const { min, max } = range;
    const valid =
      isFiniteNumber(min) &&
      isFiniteNumber(max) &&
      min <= max &&
      min >= builtIn.min && // Q2: limits may only narrow the built-in ranges
      max <= builtIn.max &&
      hasAtMostDecimals(min, DECIMALS[name]) &&
      hasAtMostDecimals(max, DECIMALS[name]);
    if (valid) {
      limits[name] = { min, max };
    } else {
      problems.push({ field, value: range });
    }
    reportUnknownKeys(range, RANGE_KEYS, field, problems);
  }
  return limits;
}

function checkDefaults(value: unknown, limits: Limits, problems: ConfigProblem[]): Defaults {
  let given: Json = {};
  if (value !== undefined) {
    if (isPlainObject(value)) {
      given = value;
      reportUnknownKeys(value, DEFAULT_KEYS, 'defaults', problems);
    } else {
      problems.push({ field: 'defaults', value });
    }
  }

  /** Admin value if valid; else the built-in default (reported if the Admin set it), moved inside the limits. */
  const pick = (key: keyof Limits): number => {
    const raw = given[key];
    const range = limits[key];
    if (raw !== undefined) {
      if (isFiniteNumber(raw) && within(raw, range) && hasAtMostDecimals(raw, DECIMALS[key])) return raw;
      problems.push({ field: `defaults.${key}`, value: raw });
    }
    return clamp(DEFAULT_DEFAULTS[key], range);
  };

  const homePrice = pick('homePrice');
  const ratePercent = pick('ratePercent');
  const termYears = pick('termYears');
  const extraPayment = pick('extraPayment');

  // Down payment: 0 or more, at most 2 decimals, below the default price (Q3).
  const fallbackDown = DEFAULT_DEFAULTS.downPayment < homePrice ? DEFAULT_DEFAULTS.downPayment : 0;
  let downPayment = fallbackDown;
  const rawDown = given.downPayment;
  if (rawDown !== undefined) {
    if (isFiniteNumber(rawDown) && rawDown >= 0 && rawDown < homePrice && hasAtMostDecimals(rawDown, 2)) {
      downPayment = rawDown;
    } else {
      problems.push({ field: 'defaults.downPayment', value: rawDown });
    }
  }

  return { homePrice, downPayment, ratePercent, termYears, extraPayment };
}

function checkPresets(value: unknown, limits: Limits, problems: ConfigProblem[]): Preset[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) {
    problems.push({ field: 'presets', value });
    return [];
  }

  const presets: Preset[] = [];
  const seenIds = new Set<string>();
  value.forEach((item: unknown, index) => {
    const position = `presets[${index}]`;
    if (!isPlainObject(item)) {
      problems.push({ field: position, value: item });
      return;
    }
    reportUnknownKeys(item, PRESET_KEYS, position, problems);

    const name = typeof item.name === 'string' && item.name.trim() !== '' ? item.name.trim() : null;
    const label = name ? `presets: ${name}` : position; // Q5
    const id = typeof item.id === 'string' && item.id.trim() !== '' ? item.id.trim() : null;
    const { ratePercent, termYears, description } = item;

    const valid =
      id !== null &&
      name !== null &&
      isFiniteNumber(ratePercent) &&
      within(ratePercent, limits.ratePercent) &&
      hasAtMostDecimals(ratePercent, DECIMALS.ratePercent) &&
      isFiniteNumber(termYears) &&
      Number.isInteger(termYears) &&
      within(termYears, limits.termYears) &&
      (description === undefined || description === null || typeof description === 'string');
    if (!valid) {
      problems.push({ field: label, value: item });
      return;
    }
    if (seenIds.has(id)) {
      problems.push({ field: `presets: duplicate id ${id}`, value: item }); // A2.4: first one wins
      return;
    }
    seenIds.add(id);
    const text = typeof description === 'string' && description.trim() !== '' ? description.trim() : null;
    presets.push({ id, name, ratePercent, termYears, description: text });
  });
  return presets;
}

function copyOfDefaults(): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    defaults: { ...DEFAULT_CONFIG.defaults },
    limits: { ...DEFAULT_CONFIG.limits },
    presets: [],
  };
}

/** Result for a file that cannot be used at all (E11). */
export function unusableConfig(reason: string, value: unknown): ConfigResult {
  return {
    config: copyOfDefaults(),
    problems: [{ field: 'config.json', value }],
    notice: { id: 'E11', text: MESSAGES.E11(reason) },
  };
}

export function validateConfig(json: unknown): ConfigResult {
  if (!isPlainObject(json)) return unusableConfig('not a JSON object', json);

  const problems: ConfigProblem[] = [];
  const config = copyOfDefaults();

  if (json.currency !== undefined) {
    const currency = checkCurrency(json.currency);
    if (currency) config.currency = currency;
    else problems.push({ field: 'currency', value: json.currency });
  }
  if (json.locale !== undefined) {
    const locale = checkLocale(json.locale);
    if (locale) config.locale = locale;
    else problems.push({ field: 'locale', value: json.locale });
  }
  config.officeName = checkText(json, 'officeName', null, problems);
  config.disclaimer = checkText(json, 'disclaimer', DEFAULT_CONFIG.disclaimer, problems);
  // Limits first: defaults and presets are checked against the limits actually in use.
  config.limits = checkLimits(json.limits, problems);
  config.defaults = checkDefaults(json.defaults, config.limits, problems);
  config.presets = checkPresets(json.presets, config.limits, problems);
  reportUnknownKeys(json, TOP_LEVEL_KEYS, '', problems);

  const notice: ConfigNotice | null =
    problems.length > 0 ? { id: 'E12', text: MESSAGES.E12(problems.map((p) => p.field).join(', ')) } : null;
  return { config, problems, notice };
}

/**
 * Reads the text of one number field. Pure, no DOM, never throws.
 * Implements the "Input rules" in docs/user-stories.md (Shared definitions).
 */

/** money: home price, down payment, extra payment. rate: interest rate in %. term: years. */
export type FieldKind = 'money' | 'rate' | 'term';

export type ParseResult =
  | { kind: 'empty' }
  | { kind: 'invalid' }
  /** money → integer cents; rate → percent (e.g. 6.5); term → whole years. */
  | { kind: 'ok'; value: number };

const EMPTY: ParseResult = { kind: 'empty' };
const INVALID: ParseResult = { kind: 'invalid' };

/**
 * Integer part: plain digits, or 1–3 digits followed by groups of ",ddd" (rule 3).
 * Optional fraction after ".". Only ASCII digits: `[0-9]`, not `\d` with the u flag (rule 2).
 * No sign, exponent or hex can match (rule 5).
 */
const NUMBER = /^([0-9]{1,3}(?:,[0-9]{3})+|[0-9]*)(?:\.([0-9]*))?$/;

/** One trailing "%", optionally preceded by spaces (rule 7). */
const PERCENT_SUFFIX = /\s*%$/;

const MAX_DECIMALS: Record<FieldKind, number> = { money: 2, rate: 3, term: Number.POSITIVE_INFINITY };

export function parseField(raw: string, kind: FieldKind): ParseResult {
  let text = raw.trim(); // String.prototype.trim also removes non-breaking spaces (rule 1)
  if (text === '') return EMPTY;

  if (kind === 'rate' && PERCENT_SUFFIX.test(text)) {
    text = text.replace(PERCENT_SUFFIX, '');
  }

  const match = NUMBER.exec(text);
  if (!match) return INVALID;

  const integerPart = (match[1] ?? '').replace(/,/g, '');
  const fraction = match[2] ?? '';
  if (integerPart === '' && fraction === '') return INVALID; // "." or "%" alone (rule 4)
  if (fraction.length > MAX_DECIMALS[kind]) {
    // Term: "15.0" and "15.00" are whole (rule 8); any other fraction is rejected.
    if (kind !== 'term' || /[1-9]/.test(fraction)) return INVALID;
  }
  if (kind === 'term' && /[1-9]/.test(fraction)) return INVALID; // "15.5" (rule 8)

  const digits = integerPart === '' ? '0' : integerPart;
  let value: number;
  if (kind === 'money') {
    value = Number(digits + fraction.padEnd(2, '0')); // exact integer cents, no float rounding (rule 6)
  } else if (kind === 'term') {
    value = Number(digits);
  } else {
    value = Number(`${digits}.${fraction || '0'}`);
  }

  // Keeps Infinity and imprecise huge values out of the app; the field's message covers them.
  if (!Number.isFinite(value) || value > Number.MAX_SAFE_INTEGER) return INVALID;
  return { kind: 'ok', value };
}

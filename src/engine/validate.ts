/**
 * Validates the five calculator fields. Pure, no DOM, never throws.
 * Order of checks (docs/user-stories.md, Error messages): each field on its own first;
 * E3 only when home price and down payment are each valid. E7 is decided by the engine.
 */
import type { Limits, Range } from '../config/defaults';
import { MESSAGES } from '../messages';
import { parseField, type FieldKind } from './parse';

export type { Limits } from '../config/defaults';

export type Field = 'homePrice' | 'downPayment' | 'interestRate' | 'termYears' | 'extraPayment';

export type RawInputs = Record<Field, string>;

export type FieldErrorId = 'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 'E6';

export interface FieldError {
  id: FieldErrorId;
  text: string;
}

/** Ready for calculateLoan (add `today`). */
export interface ValidInputs {
  homePriceCents: number;
  downPaymentCents: number;
  principalCents: number;
  annualRatePercent: number;
  termYears: number;
  extraMonthlyCents: number;
}

export type ValidationOutcome =
  | { ok: true; values: ValidInputs }
  | { ok: false; errors: Partial<Record<Field, FieldError>> };

function numberFormatter(locale: string): Intl.NumberFormat {
  try {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 3 });
  } catch {
    // An invalid locale must never break validation; config validation reports it (A4).
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 3 });
  }
}

type RangeMessage = (min: string, max: string) => string;

interface FieldCheck {
  value: number | null;
  error: FieldError | null;
}

/**
 * Parses one field and checks it against its range.
 * `scale` converts the range to the parsed unit (100 for money in cents).
 */
function checkField(
  raw: string,
  kind: FieldKind,
  required: boolean,
  range: Range | null,
  scale: number,
  error: () => FieldError,
): FieldCheck {
  const parsed = parseField(raw, kind);
  if (parsed.kind === 'empty') {
    return required ? { value: null, error: error() } : { value: 0, error: null };
  }
  if (parsed.kind === 'invalid') return { value: null, error: error() };
  // Money limits become cents; rate and term limits stay as they are (a rate max of 7.5 must not become 8).
  const toUnit = (limit: number): number => (scale === 1 ? limit : Math.round(limit * scale));
  if (range && (parsed.value < toUnit(range.min) || parsed.value > toUnit(range.max))) {
    return { value: null, error: error() };
  }
  return { value: parsed.value, error: null };
}

export function validateInputs(raw: RawInputs, limits: Limits, locale: string): ValidationOutcome {
  const format = numberFormatter(locale);
  const rangeError =
    (id: FieldErrorId, message: RangeMessage, range: Range) => (): FieldError => ({
      id,
      text: message(format.format(range.min), format.format(range.max)),
    });

  const price = checkField(
    raw.homePrice,
    'money',
    true,
    limits.homePrice,
    100,
    rangeError('E1', MESSAGES.E1, limits.homePrice),
  );
  const down = checkField(raw.downPayment, 'money', false, { min: 0, max: Number.MAX_SAFE_INTEGER / 100 }, 100, () => ({
    id: 'E2',
    text: MESSAGES.E2,
  }));
  const rate = checkField(
    raw.interestRate,
    'rate',
    true,
    limits.ratePercent,
    1,
    rangeError('E4', MESSAGES.E4, limits.ratePercent),
  );
  const term = checkField(
    raw.termYears,
    'term',
    true,
    limits.termYears,
    1,
    rangeError('E5', MESSAGES.E5, limits.termYears),
  );
  const extra = checkField(
    raw.extraPayment,
    'money',
    false,
    limits.extraPayment,
    100,
    rangeError('E6', MESSAGES.E6, limits.extraPayment),
  );

  const errors: Partial<Record<Field, FieldError>> = {};
  if (price.error) errors.homePrice = price.error;
  if (down.error) errors.downPayment = down.error;
  if (rate.error) errors.interestRate = rate.error;
  if (term.error) errors.termYears = term.error;
  if (extra.error) errors.extraPayment = extra.error;

  // E3 only when both the price and the down payment are valid on their own.
  if (price.value !== null && down.value !== null && down.value >= price.value) {
    errors.downPayment = { id: 'E3', text: MESSAGES.E3 };
  }

  if (
    Object.keys(errors).length > 0 ||
    price.value === null ||
    down.value === null ||
    rate.value === null ||
    term.value === null ||
    extra.value === null
  ) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    values: {
      homePriceCents: price.value,
      downPaymentCents: down.value,
      principalCents: price.value - down.value,
      annualRatePercent: rate.value,
      termYears: term.value,
      extraMonthlyCents: extra.value,
    },
  };
}

/** Display formatting with the configured currency and locale (A1.1). */
import type { YearMonth } from '../engine/amortize';

export interface Formatters {
  /** Integer cents → e.g. "$1,798.65" or "1.798,65 €". */
  money(cents: number): string;
  /** { year: 2056, month: 11 } → e.g. "November 2056". */
  month(value: YearMonth): string;
}

export function createFormatters(currency: string, locale: string): Formatters {
  let moneyFormat: Intl.NumberFormat;
  let monthFormat: Intl.DateTimeFormat;
  try {
    moneyFormat = new Intl.NumberFormat(locale, { style: 'currency', currency });
    monthFormat = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  } catch {
    // Config validation already rejects bad values; this keeps the UI alive regardless.
    moneyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
  }
  return {
    money: (cents) => moneyFormat.format(cents / 100),
    month: ({ year, month }) => monthFormat.format(new Date(year, month - 1, 1)),
  };
}

/** A config default (currency units) as plain input text, e.g. 350000 → "350000". */
export function toInputText(value: number): string {
  return String(value);
}

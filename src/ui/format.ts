/** Display formatting with the configured currency and locale (A1.1). */
import type { YearMonth } from '../engine/amortize';

export interface CurrencyAffix {
  /** The symbol as Intl shows it for this currency and locale, e.g. "$", "€", "PKR". */
  symbol: string;
  /** Whether the locale writes the symbol before ("$1.00") or after ("1,00 €") the number. */
  position: 'prefix' | 'suffix';
}

export interface Formatters {
  /** Integer cents → e.g. "$1,798.65" or "1.798,65 €". */
  money(cents: number): string;
  /** { year: 2056, month: 11 } → e.g. "November 2056". */
  month(value: YearMonth): string;
  /** 0.46 → "46%" (or "46 %" in de-DE). */
  percent(fraction: number): string;
  currency: CurrencyAffix;
}

function affixOf(format: Intl.NumberFormat): CurrencyAffix {
  const parts = format.formatToParts(1);
  const symbolIndex = parts.findIndex((part) => part.type === 'currency');
  const numberIndex = parts.findIndex((part) => part.type === 'integer');
  const symbol = parts[symbolIndex]?.value ?? '';
  return { symbol, position: symbolIndex > numberIndex ? 'suffix' : 'prefix' };
}

export function createFormatters(currency: string, locale: string): Formatters {
  let moneyFormat: Intl.NumberFormat;
  let monthFormat: Intl.DateTimeFormat;
  let percentFormat: Intl.NumberFormat;
  try {
    moneyFormat = new Intl.NumberFormat(locale, { style: 'currency', currency });
    monthFormat = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
    percentFormat = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 });
  } catch {
    // Config validation already rejects bad values; this keeps the UI alive regardless.
    moneyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
    percentFormat = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 0 });
  }
  return {
    money: (cents) => moneyFormat.format(cents / 100),
    month: ({ year, month }) => monthFormat.format(new Date(year, month - 1, 1)),
    percent: (fraction) => percentFormat.format(fraction),
    currency: affixOf(moneyFormat),
  };
}

/** A config default (currency units) as plain input text, e.g. 350000 → "350000". */
export function toInputText(value: number): string {
  return String(value);
}

/**
 * Splits total paid into whole percentages for principal and interest that always add up to 100.
 * Returns null when there is nothing to split.
 */
export function principalInterestShares(
  principalCents: number,
  interestCents: number,
): { principal: number; interest: number } | null {
  const total = principalCents + interestCents;
  if (!(total > 0)) return null;
  const principal = Math.round((principalCents / total) * 100);
  return { principal, interest: 100 - principal };
}

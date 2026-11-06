/**
 * Schedule CSV (L3.4, L3.5, L3.10): always monthly rows, comma separators, "." decimal point,
 * exactly 2 decimals, no currency symbols, no thousands separators. Dates as YYYY-MM.
 */
import type { ScheduleRow } from '../engine/amortize';
import { UI_TEXT } from '../messages';

export const CSV_FILENAME = 'mortgage-schedule.csv';

export const CSV_HEADER = [
  UI_TEXT.colPaymentNumber,
  UI_TEXT.colDate,
  UI_TEXT.colPayment,
  UI_TEXT.colPrincipal,
  UI_TEXT.colInterest,
  UI_TEXT.colExtra,
  UI_TEXT.colBalance,
].join(',');

/** Integer cents → "1798.65", exactly, with no float formatting involved. */
export function centsToPlain(cents: number): string {
  const whole = Math.floor(cents / 100);
  const rest = String(cents % 100).padStart(2, '0');
  return `${whole}.${rest}`;
}

const yearMonth = (row: ScheduleRow): string => `${row.year}-${String(row.month).padStart(2, '0')}`;

/** Lines end with CRLF (RFC 4180), which every spreadsheet app reads. */
export function scheduleCsv(rows: readonly ScheduleRow[]): string {
  const lines = rows.map((row) =>
    [
      String(row.number),
      yearMonth(row),
      centsToPlain(row.paymentCents),
      centsToPlain(row.principalCents),
      centsToPlain(row.interestCents),
      centsToPlain(row.extraCents),
      centsToPlain(row.balanceCents),
    ].join(','),
  );
  return [CSV_HEADER, ...lines].join('\r\n') + '\r\n';
}

/** Saves text as a file in the browser. A blob: URL is local, not a network request (A5.4). */
export function downloadText(filename: string, text: string): void {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
  // Revoke later: some browsers (Safari) start the download asynchronously.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

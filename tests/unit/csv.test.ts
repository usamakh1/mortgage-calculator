import { describe, expect, it } from 'vitest';
import { calculateLoan, type LoanInput, type LoanResult } from '../../src/engine/amortize';
import { CSV_FILENAME, CSV_HEADER, centsToPlain, scheduleCsv } from '../../src/ui/csv';

const TODAY = new Date(2026, 10, 6);

function rows(principal: number, rate: number, years: number, today = TODAY): LoanResult['rows'] {
  const input: LoanInput = {
    principalCents: Math.round(principal * 100),
    annualRatePercent: rate,
    termYears: years,
    extraMonthlyCents: 0,
    today,
  };
  const outcome = calculateLoan(input);
  if (!outcome.ok) throw new Error(outcome.error);
  return outcome.result.rows;
}

const lines = (csv: string): string[] => csv.split('\r\n').filter((line) => line !== '');

describe('Schedule CSV (L3.4, L3.5, L3.10)', () => {
  const csv = scheduleCsv(rows(300_000, 6, 30));

  it('L3.4: file name and exact header line', () => {
    expect(CSV_FILENAME).toBe('mortgage-schedule.csv');
    expect(CSV_HEADER).toBe('Payment number,Date,Payment,Principal,Interest,Extra payment,Balance');
    expect(lines(csv)[0]).toBe(CSV_HEADER);
  });

  it('L3.4: 360 data lines; line 2 is exactly "1,2026-12,1798.65,298.65,1500.00,0.00,299701.35"', () => {
    expect(lines(csv)).toHaveLength(361);
    expect(lines(csv)[1]).toBe('1,2026-12,1798.65,298.65,1500.00,0.00,299701.35');
    expect(lines(csv)[360]).toBe('360,2056-11,1800.09,1791.13,8.96,0.00,0.00');
  });

  it('L3.5: commas only as separators, "." decimals, exactly 2 decimals, no symbols or thousands separators', () => {
    for (const line of lines(csv).slice(1)) {
      const cells = line.split(',');
      expect(cells).toHaveLength(7);
      expect(cells[0]).toMatch(/^\d+$/);
      expect(cells[1]).toMatch(/^\d{4}-\d{2}$/);
      for (const amount of cells.slice(2)) expect(amount).toMatch(/^\d+\.\d{2}$/);
    }
    expect(csv).not.toMatch(/[$€£]/);
  });

  it('lines end with CRLF and the file ends with one line break', () => {
    expect(csv.startsWith(`${CSV_HEADER}\r\n1,`)).toBe(true);
    expect(csv.endsWith('0.00\r\n')).toBe(true);
    expect(csv).not.toMatch(/[^\r]\n/);
  });

  it('L3.10: on 15 March 2027 the dates run from 2027-04 to 2057-03', () => {
    const later = lines(scheduleCsv(rows(300_000, 6, 30, new Date(2027, 2, 15))));
    expect(later[1]?.split(',')[1]).toBe('2027-04');
    expect(later[360]?.split(',')[1]).toBe('2057-03');
  });

  it('maximum values are written in full (no exponent, no thousands separators)', () => {
    const big = lines(scheduleCsv(rows(100_000_000, 30, 40)));
    expect(big).toHaveLength(481);
    expect(big[1]).toBe('1,2026-12,2500017.80,17.80,2500000.00,0.00,99999982.20');
    expect(big.join('\n')).not.toMatch(/e\+|NaN|Infinity/);
  });

  it.each([
    [0, '0.00'],
    [5, '0.05'],
    [179865, '1798.65'],
    [120002280306, '1200022803.06'],
  ])('centsToPlain(%d) = %s', (cents, text) => {
    expect(centsToPlain(cents)).toBe(text);
  });
});

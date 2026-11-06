import { describe, expect, it } from 'vitest';
import {
  calculateLoan,
  monthlyPaymentCents,
  principalFromPrice,
  roundHalfUp,
  toYearly,
  type LoanInput,
  type LoanResult,
  type ScheduleRow,
} from '../../src/engine/amortize';

/** 6 November 2026, local time: the fixed "today" from docs/user-stories.md Shared definitions. */
const TODAY = new Date(2026, 10, 6);

/** Currency units → integer cents, for readable expectations. */
const c = (units: number): number => Math.round(units * 100);

function loan(principal: number, ratePercent: number, termYears: number, extra = 0, today = TODAY): LoanInput {
  return {
    principalCents: c(principal),
    annualRatePercent: ratePercent,
    termYears,
    extraMonthlyCents: c(extra),
    today,
  };
}

/** Calculates and fails the test if the engine returned an error. */
function ok(input: LoanInput): LoanResult {
  const outcome = calculateLoan(input);
  if (!outcome.ok) throw new Error(`expected a result, got ${outcome.error}`);
  return outcome.result;
}

const last = (rows: ScheduleRow[]): ScheduleRow => {
  const row = rows[rows.length - 1];
  if (!row) throw new Error('empty schedule');
  return row;
};

const sum = (rows: ScheduleRow[], key: 'paymentCents' | 'interestCents' | 'principalCents' | 'extraCents'): number =>
  rows.reduce((total, row) => total + row[key], 0);

/** Every valid case used below, for the invariants in B6, D3 and D8. */
const VALID_CASES: LoanInput[] = [
  loan(300_000, 6, 30),
  loan(200_000, 5, 15),
  loan(120_000, 0, 10),
  loan(300_000, 5, 30),
  loan(1, 0.001, 1),
  loan(100_000_000, 30, 40),
  loan(300_000, 6, 15),
  loan(300_000, 5.75, 15),
  loan(300_000, 6, 30, 200),
  loan(300_000, 6, 30, 400_000),
  loan(300_000, 6, 30, 10_000_000),
  loan(25, 0.72, 1),
];

describe('A. Monthly payment (L1, plan §3)', () => {
  it('A1: loan amount = price − down payment (350,000 − 50,000 = 300,000.00)', () => {
    expect(principalFromPrice(c(350_000), c(50_000))).toBe(c(300_000));
  });

  it.each([
    ['A2', 300_000, 6, 30, 1_798.65],
    ['A3', 200_000, 5, 15, 1_581.59],
    ['A4 (r = 0 branch)', 120_000, 0, 10, 1_000.0],
    ['A5', 300_000, 5, 30, 1_610.46],
    ['A6', 1, 0.001, 1, 0.08],
    ['A7', 100_000_000, 30, 40, 2_500_017.8],
    ['A8', 300_000, 6, 15, 2_531.57],
    ['A9', 300_000, 5.75, 15, 2_491.23],
  ])('%s: principal %s, rate %s, %s years → payment %s', (_id, principal, rate, years, expected) => {
    expect(monthlyPaymentCents(c(principal), rate, years * 12)).toBe(c(expected));
    expect(ok(loan(principal, rate, years)).monthlyPaymentCents).toBe(c(expected));
  });
});

describe('B. Totals and final payment (L2, plan §3)', () => {
  it.each([
    ['B1', 300_000, 6, 30, 1_800.09, 347_515.44, 647_515.44],
    ['B2', 200_000, 5, 15, 1_580.87, 84_685.48, 284_685.48],
    ['B3', 120_000, 0, 10, 1_000.0, 0, 120_000.0],
    ['B4', 1, 0.001, 1, 0.12, 0, 1.0],
    ['B5', 100_000_000, 30, 40, 2_514_276.86, 1_100_022_803.06, 1_200_022_803.06],
  ])('%s: principal %s, rate %s, %s years', (_id, principal, rate, years, finalPayment, totalInterest, totalPaid) => {
    const result = ok(loan(principal, rate, years));
    expect(last(result.rows).paymentCents).toBe(c(finalPayment));
    expect(result.totalInterestCents).toBe(c(totalInterest));
    expect(result.totalPaidCents).toBe(c(totalPaid));
  });

  it('B6 (L2.5): total paid and total interest equal the sums of the schedule columns, for every case', () => {
    for (const input of VALID_CASES) {
      const result = ok(input);
      expect(result.totalPaidCents).toBe(sum(result.rows, 'paymentCents'));
      expect(result.totalInterestCents).toBe(sum(result.rows, 'interestCents'));
    }
  });
});

describe('C. Dates (first payment is the month after today)', () => {
  it.each([
    ['C1 (L2.2, L3.1, L3.2)', new Date(2026, 10, 6), 30, 0, { year: 2026, month: 12 }, { year: 2056, month: 11 }],
    ['C2 (L2.6, L3.9)', new Date(2027, 2, 15), 30, 0, { year: 2027, month: 4 }, { year: 2057, month: 3 }],
    ['C3 (change of year)', new Date(2026, 11, 31), 30, 0, { year: 2027, month: 1 }, { year: 2056, month: 12 }],
    ['C4 (L5.1)', new Date(2026, 10, 6), 30, 200, { year: 2026, month: 12 }, { year: 2050, month: 2 }],
    ['C5 (L5.8)', new Date(2027, 2, 15), 30, 200, { year: 2027, month: 4 }, { year: 2050, month: 6 }],
    ['C6 (1-year loan)', new Date(2026, 10, 6), 1, 0, { year: 2026, month: 12 }, { year: 2027, month: 11 }],
  ])('%s', (_id, today, years, extra, firstPayment, payoff) => {
    const result = ok(loan(300_000, 6, years, extra, today));
    expect(result.firstPayment).toEqual(firstPayment);
    expect(result.payoff).toEqual(payoff);
    const firstRow = result.rows[0];
    expect(firstRow && { year: firstRow.year, month: firstRow.month }).toEqual(firstPayment);
    const lastRow = last(result.rows);
    expect({ year: lastRow.year, month: lastRow.month }).toEqual(payoff);
  });
});

describe('D. Schedule rows (L3)', () => {
  const base = ok(loan(300_000, 6, 30));

  it('D1 (L3.1): 360 rows; row 1 is 1, Dec 2026, 1,798.65, 298.65, 1,500.00, 0.00, 299,701.35', () => {
    expect(base.rows).toHaveLength(360);
    expect(base.rows[0]).toEqual({
      number: 1,
      year: 2026,
      month: 12,
      paymentCents: c(1_798.65),
      principalCents: c(298.65),
      interestCents: c(1_500.0),
      extraCents: 0,
      balanceCents: c(299_701.35),
    });
  });

  it('D2 (L3.2): row 360 is 360, Nov 2056, 1,800.09, 1,791.13, 8.96, 0.00, 0.00', () => {
    expect(last(base.rows)).toEqual({
      number: 360,
      year: 2056,
      month: 11,
      paymentCents: c(1_800.09),
      principalCents: c(1_791.13),
      interestCents: c(8.96),
      extraCents: 0,
      balanceCents: 0,
    });
  });

  it('D3: in every row of every case, payment = principal + interest, balance falls by principal, nothing negative or fractional', () => {
    for (const input of VALID_CASES) {
      let previousBalance = input.principalCents;
      for (const row of ok(input).rows) {
        expect(row.paymentCents).toBe(row.principalCents + row.interestCents);
        expect(row.balanceCents).toBe(previousBalance - row.principalCents);
        for (const value of [row.paymentCents, row.principalCents, row.interestCents, row.extraCents, row.balanceCents]) {
          expect(Number.isSafeInteger(value)).toBe(true);
          expect(value).toBeGreaterThanOrEqual(0);
        }
        previousBalance = row.balanceCents;
      }
      expect(previousBalance).toBe(0);
    }
  });

  it('D4 (L3.3): yearly view has 30 rows; year 1 is 21,583.80 / 3,684.00 / 17,899.80 / 296,316.00; every year sums its months', () => {
    const years = toYearly(base.rows);
    expect(years).toHaveLength(30);
    expect(years[0]).toEqual({
      year: 1,
      paymentCount: 12,
      paymentCents: c(21_583.8),
      principalCents: c(3_684.0),
      interestCents: c(17_899.8),
      extraCents: 0,
      endBalanceCents: c(296_316.0),
    });
    years.forEach((yearRow, index) => {
      const months = base.rows.slice(index * 12, index * 12 + 12);
      expect(yearRow.paymentCents).toBe(sum(months, 'paymentCents'));
      expect(yearRow.principalCents).toBe(sum(months, 'principalCents'));
      expect(yearRow.interestCents).toBe(sum(months, 'interestCents'));
      expect(yearRow.endBalanceCents).toBe(last(months).balanceCents);
    });
  });

  it('D5: yearly view with extra 200 has 24 years, the last with 3 payments', () => {
    const years = toYearly(ok(loan(300_000, 6, 30, 200)).rows);
    expect(years).toHaveLength(24);
    expect(years[23]?.paymentCount).toBe(3);
    expect(years[23]?.endBalanceCents).toBe(0);
  });

  it('D6 (L3.6): 1 at 0.001% over 1 year → 12 rows, rows 1–11 pay 0.08, row 12 pays 0.12, ends at 0.00', () => {
    const { rows } = ok(loan(1, 0.001, 1));
    expect(rows).toHaveLength(12);
    rows.slice(0, 11).forEach((row) => expect(row.paymentCents).toBe(8));
    expect(last(rows).paymentCents).toBe(12);
    expect(last(rows).balanceCents).toBe(0);
  });

  it('D7 (L3.7): 100,000,000 at 30% over 40 years → exactly 480 rows, ends at 0.00', () => {
    const { rows } = ok(loan(100_000_000, 30, 40));
    expect(rows).toHaveLength(480);
    expect(last(rows).balanceCents).toBe(0);
  });

  it('D8 (§3, L5.7): no schedule has more than n = term × 12 rows', () => {
    for (const input of VALID_CASES) {
      expect(ok(input).rows.length).toBeLessThanOrEqual(input.termYears * 12);
    }
  });
});

describe('E. Extra payment (L5)', () => {
  it('E-1 (L5.1): extra 200 → 279 rows, last 716.87, interest 256,341.57, paid 556,341.57, 81 months and 91,173.87 saved', () => {
    const result = ok(loan(300_000, 6, 30, 200));
    expect(result.rows).toHaveLength(279);
    expect(last(result.rows).paymentCents).toBe(c(716.87));
    expect(last(result.rows).extraCents).toBe(0); // reduced last row: Payment < regular payment
    expect(last(result.rows).balanceCents).toBe(0);
    expect(result.rows[0]?.paymentCents).toBe(c(1_998.65));
    expect(result.rows[0]?.extraCents).toBe(c(200));
    expect(result.totalInterestCents).toBe(c(256_341.57));
    expect(result.totalPaidCents).toBe(c(556_341.57));
    expect(result.savings).toEqual({ monthsSaved: 81, interestSavedCents: c(91_173.87) });
  });

  it('E-2 (L5.2): extra 400,000 → 1 row of 301,500.00, 359 months and 346,015.44 saved', () => {
    const result = ok(loan(300_000, 6, 30, 400_000));
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0]?.paymentCents).toBe(c(301_500.0));
    expect(result.rows[0]?.extraCents).toBe(c(299_701.35)); // 301,500.00 − 1,798.65
    expect(result.rows[0]?.balanceCents).toBe(0);
    expect(result.savings).toEqual({ monthsSaved: 359, interestSavedCents: c(346_015.44) });
  });

  it('E-3 (L5.5): extra 10,000,000 (the maximum) → 1 row of 301,500.00', () => {
    const result = ok(loan(300_000, 6, 30, 10_000_000));
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0]?.paymentCents).toBe(c(301_500.0));
    expect(result.rows[0]?.balanceCents).toBe(0);
  });

  it('E-4 (L5.3): extra 0 → identical to no extra, and no savings', () => {
    const withZero = ok(loan(300_000, 6, 30, 0));
    expect(withZero.savings).toBeNull();
    expect(withZero.rows).toEqual(ok(loan(300_000, 6, 30)).rows);
    expect(withZero.totalInterestCents).toBe(c(347_515.44));
  });
});

describe('F. Guards and rounding (plan §3)', () => {
  it.each([
    ['payment rounds to 0.00: 1 at 0% over 40 years (L8.8)', loan(1, 0, 40)],
    ['payment rounds to 0.00: 0.01 at 6% over 30 years', loan(0.01, 6, 30)],
    ['payment rounds to 0.00: principal 0', loan(0, 6, 30)],
    ['F3, payment 0.03 ≤ first interest 0.03: 1 at 30% over 40 years (L8.8)', loan(1, 30, 40)],
  ])('F1/F3 E7: %s', (_label, input) => {
    expect(calculateLoan(input)).toEqual({ ok: false, error: 'E7' });
  });

  it.each([
    ['rate NaN', { ...loan(300_000, 6, 30), annualRatePercent: Number.NaN }],
    ['principal Infinity', { ...loan(300_000, 6, 30), principalCents: Number.POSITIVE_INFINITY }],
    ['extra NaN', { ...loan(300_000, 6, 30), extraMonthlyCents: Number.NaN }],
    ['term 0 (n = 0 guard)', loan(300_000, 6, 0)],
    ['invalid today', loan(300_000, 6, 30, 0, new Date(Number.NaN))],
  ])('F2 E10, without throwing: %s', (_label, input) => {
    expect(() => calculateLoan(input)).not.toThrow();
    expect(calculateLoan(input)).toEqual({ ok: false, error: 'E10' });
  });

  it.each([
    [0.5, 1],
    [1.5, 2],
    [2.5, 3], // half-up, not banker's rounding (which would give 2)
    [2.4999999, 2],
    [0, 0],
  ])('F4: roundHalfUp(%d) = %d', (value, expected) => {
    expect(roundHalfUp(value)).toBe(expected);
  });

  it('F5: values whose float form is just below .5 still round up', () => {
    // 1.005 is stored as 1.00499999999999989…, so 1.005 × 100 = 100.49999999999999.
    expect(1.005 * 100).toBeLessThan(100.5);
    expect(roundHalfUp(1.005 * 100)).toBe(101);
    // Exact interest 25.00 × 0.72% ÷ 12 = 1.5 cents, but the float product is 1.4999999999999998.
    expect(2500 * (0.72 / 1200)).toBeLessThan(1.5);
    expect(roundHalfUp(2500 * (0.72 / 1200))).toBe(2);
  });

  it('F6: month interest uses exact arithmetic, so 25.00 at 0.72% charges 0.02 in month 1 (float half-up would give 0.01)', () => {
    expect(ok(loan(25, 0.72, 1)).rows[0]?.interestCents).toBe(2);
  });
});

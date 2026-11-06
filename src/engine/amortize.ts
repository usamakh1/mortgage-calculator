/**
 * Amortization engine. Pure functions, no DOM.
 * Implements docs/product-plan.md §3 exactly. All money is in integer cents.
 */

export type EngineError = 'E7' | 'E10';

export interface YearMonth {
  year: number;
  /** 1 = January … 12 = December. */
  month: number;
}

export interface LoanInput {
  /** Loan amount (home price − down payment) in integer cents. */
  principalCents: number;
  /** Annual interest rate in percent, e.g. 6 for 6%. */
  annualRatePercent: number;
  /** Whole number of years. */
  termYears: number;
  /** Extra monthly payment in integer cents; 0 for none. */
  extraMonthlyCents: number;
  /** Only the local year and month are used. The first payment is the month after this. */
  today: Date;
}

export interface ScheduleRow extends YearMonth {
  /** 1-based payment number. */
  number: number;
  /** Full amount paid this month, including any extra. */
  paymentCents: number;
  principalCents: number;
  interestCents: number;
  /** min(entered extra, Payment − regular payment), never below 0. 0 on a reduced last payment. */
  extraCents: number;
  /** Balance after this payment. */
  balanceCents: number;
}

export interface YearRow {
  /** Loan year: 1 = payments 1–12, 2 = payments 13–24, … */
  year: number;
  paymentCount: number;
  paymentCents: number;
  principalCents: number;
  interestCents: number;
  extraCents: number;
  endBalanceCents: number;
}

export interface Savings {
  monthsSaved: number;
  interestSavedCents: number;
}

export interface LoanResult {
  /** Regular monthly principal-and-interest payment, without the extra. */
  monthlyPaymentCents: number;
  rows: ScheduleRow[];
  totalPaidCents: number;
  totalInterestCents: number;
  firstPayment: YearMonth;
  /** Month of the last payment. */
  payoff: YearMonth;
  /** Compared with the same loan without an extra payment; null when the extra is 0. */
  savings: Savings | null;
}

export type CalcOutcome = { ok: true; result: LoanResult } | { ok: false; error: EngineError };

/** Rates are handled exactly to 6 decimal places of a percent (validation allows far fewer). */
const RATE_SCALE = 1_000_000;

/**
 * Rounds a non-negative float half-up to an integer.
 *
 * Plain Math.floor(x + 0.5) fails when the float sits just below a true .5:
 * 1.005 × 100 is 100.49999999999999 and would round to 100. Results here come from at most a few
 * float operations, each off by at most half an ulp, so a value within a few ulps of .5 is
 * treated as exactly .5. The tolerance is relative (4 × EPSILON × |x|), so it stays meaningful
 * for both 0.5 cents and billions of cents, and is far smaller than any real difference in cents.
 */
export function roundHalfUp(x: number): number {
  const tolerance = 4 * Number.EPSILON * Math.max(1, Math.abs(x));
  return Math.floor(x + 0.5 + tolerance);
}

/** Exact half-up division of non-negative bigints. */
function divideHalfUp(numerator: bigint, denominator: bigint): bigint {
  return (2n * numerator + denominator) / (2n * denominator);
}

/** Loan amount in cents (L1.1). Validation guarantees down payment < price. */
export function principalFromPrice(priceCents: number, downPaymentCents: number): number {
  return priceCents - downPaymentCents;
}

/**
 * Regular monthly payment in cents, rounded half-up (plan §3).
 * r = 0 is a separate branch because the standard formula divides by zero there.
 */
export function monthlyPaymentCents(principalCents: number, annualRatePercent: number, months: number): number {
  const rateMicros = Math.round(annualRatePercent * RATE_SCALE);
  if (rateMicros === 0) {
    // Exact: P ÷ n, half-up.
    return Number(divideHalfUp(BigInt(principalCents), BigInt(months)));
  }
  const r = annualRatePercent / 12 / 100;
  const growth = Math.pow(1 + r, months);
  return roundHalfUp((principalCents * r * growth) / (growth - 1));
}

/** One month's interest in cents: balance × annual rate ÷ 1200, computed exactly and rounded half-up. */
function monthInterestCents(balanceCents: number, rateMicros: number): number {
  return Number(divideHalfUp(BigInt(balanceCents) * BigInt(rateMicros), BigInt(1200 * RATE_SCALE)));
}

function addMonths(start: YearMonth, monthsToAdd: number): YearMonth {
  const index = start.year * 12 + (start.month - 1) + monthsToAdd;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}

interface Schedule {
  rows: ScheduleRow[];
  totalPaidCents: number;
  totalInterestCents: number;
}

/**
 * Builds the schedule. The loop runs at most `months` times: row n always clears the balance,
 * and with an extra payment the loop stops as soon as the balance reaches 0.
 */
function buildSchedule(
  principalCents: number,
  rateMicros: number,
  months: number,
  regularPaymentCents: number,
  extraCents: number,
  firstPayment: YearMonth,
): Schedule {
  const rows: ScheduleRow[] = [];
  let balance = principalCents;
  let totalPaid = 0;
  let totalInterest = 0;

  for (let number = 1; number <= months && balance > 0; number++) {
    const interest = monthInterestCents(balance, rateMicros);
    const owed = balance + interest;
    const scheduled = regularPaymentCents + extraCents;
    // The final row, or any row where the payment would overshoot, pays exactly what is owed.
    const payment = number === months || scheduled >= owed ? owed : scheduled;
    const principal = payment - interest;
    balance -= principal;
    totalPaid += payment;
    totalInterest += interest;
    rows.push({
      number,
      ...addMonths(firstPayment, number - 1),
      paymentCents: payment,
      principalCents: principal,
      interestCents: interest,
      // Capped at the entered extra, so a final rounding adjustment (e.g. 1,800.09 vs 1,798.65)
      // is not reported as an extra payment (L3.2).
      extraCents: Math.min(extraCents, Math.max(0, payment - regularPaymentCents)),
      balanceCents: balance,
    });
  }

  return { rows, totalPaidCents: totalPaid, totalInterestCents: totalInterest };
}

const isWholeNonNegative = (value: number): boolean => Number.isSafeInteger(value) && value >= 0;

function allValuesSafe(schedule: Schedule): boolean {
  if (!isWholeNonNegative(schedule.totalPaidCents) || !isWholeNonNegative(schedule.totalInterestCents)) {
    return false;
  }
  return schedule.rows.every(
    (row) =>
      isWholeNonNegative(row.paymentCents) &&
      isWholeNonNegative(row.principalCents) &&
      isWholeNonNegative(row.interestCents) &&
      isWholeNonNegative(row.extraCents) &&
      isWholeNonNegative(row.balanceCents),
  );
}

/**
 * Calculates the full loan. Never throws.
 * Returns E10 for inputs the engine cannot handle (non-finite, negative, fractional cents, n = 0)
 * or any non-finite or negative result; validation should prevent these from reaching it.
 * Returns E7 when the rounded regular payment is 0.00 or does not exceed the first month's
 * interest, so the balance would never go down.
 */
export function calculateLoan(input: LoanInput): CalcOutcome {
  try {
    const { principalCents, annualRatePercent, termYears, extraMonthlyCents, today } = input;
    const months = termYears * 12;
    const todayTime = today.getTime();

    if (
      !isWholeNonNegative(principalCents) ||
      !isWholeNonNegative(extraMonthlyCents) ||
      !Number.isFinite(annualRatePercent) ||
      annualRatePercent < 0 ||
      !Number.isSafeInteger(termYears) ||
      termYears < 1 ||
      !Number.isFinite(todayTime)
    ) {
      return { ok: false, error: 'E10' };
    }

    const rateMicros = Math.round(annualRatePercent * RATE_SCALE);
    const regularPayment = monthlyPaymentCents(principalCents, annualRatePercent, months);
    if (!Number.isSafeInteger(regularPayment) || regularPayment < 0) {
      return { ok: false, error: 'E10' };
    }
    if (regularPayment === 0 || regularPayment <= monthInterestCents(principalCents, rateMicros)) {
      return { ok: false, error: 'E7' };
    }

    const firstPayment = addMonths({ year: today.getFullYear(), month: today.getMonth() + 1 }, 1);
    const schedule = buildSchedule(principalCents, rateMicros, months, regularPayment, extraMonthlyCents, firstPayment);
    const lastRow = schedule.rows[schedule.rows.length - 1];
    if (!lastRow || lastRow.balanceCents !== 0 || !allValuesSafe(schedule)) {
      return { ok: false, error: 'E10' };
    }

    let savings: Savings | null = null;
    if (extraMonthlyCents > 0) {
      const baseline = buildSchedule(principalCents, rateMicros, months, regularPayment, 0, firstPayment);
      savings = {
        monthsSaved: baseline.rows.length - schedule.rows.length,
        interestSavedCents: baseline.totalInterestCents - schedule.totalInterestCents,
      };
      if (!isWholeNonNegative(savings.monthsSaved) || !isWholeNonNegative(savings.interestSavedCents)) {
        return { ok: false, error: 'E10' };
      }
    }

    return {
      ok: true,
      result: {
        monthlyPaymentCents: regularPayment,
        rows: schedule.rows,
        totalPaidCents: schedule.totalPaidCents,
        totalInterestCents: schedule.totalInterestCents,
        firstPayment,
        payoff: { year: lastRow.year, month: lastRow.month },
        savings,
      },
    };
  } catch (error) {
    console.error('Mortgage engine failed', error, input);
    return { ok: false, error: 'E10' };
  }
}

/** Groups monthly rows into loan years (L3.3). The last year may have fewer than 12 payments. */
export function toYearly(rows: ScheduleRow[]): YearRow[] {
  const years: YearRow[] = [];
  for (const row of rows) {
    const yearNumber = Math.ceil(row.number / 12);
    let year = years[yearNumber - 1];
    if (!year) {
      year = {
        year: yearNumber,
        paymentCount: 0,
        paymentCents: 0,
        principalCents: 0,
        interestCents: 0,
        extraCents: 0,
        endBalanceCents: 0,
      };
      years.push(year);
    }
    year.paymentCount += 1;
    year.paymentCents += row.paymentCents;
    year.principalCents += row.principalCents;
    year.interestCents += row.interestCents;
    year.extraCents += row.extraCents;
    year.endBalanceCents = row.balanceCents;
  }
  return years;
}

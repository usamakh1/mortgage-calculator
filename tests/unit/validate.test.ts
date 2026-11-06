import { describe, expect, it } from 'vitest';
import { calculateLoan } from '../../src/engine/amortize';
import { validateInputs, type Limits, type RawInputs, type ValidationOutcome } from '../../src/engine/validate';
import { DEFAULT_LIMITS } from '../../src/config/defaults';

const TODAY = new Date(2026, 10, 6);

/** Default case from L1.1: 350,000 / 50,000 / 6 / 30, no extra. */
function raw(overrides: Partial<RawInputs> = {}): RawInputs {
  return {
    homePrice: '350000',
    downPayment: '50000',
    interestRate: '6',
    termYears: '30',
    extraPayment: '',
    ...overrides,
  };
}

const errorIds = (outcome: ValidationOutcome): Record<string, string> =>
  outcome.ok ? {} : Object.fromEntries(Object.entries(outcome.errors).map(([field, error]) => [field, error.id]));

const validate = (overrides: Partial<RawInputs> = {}, limits: Limits = DEFAULT_LIMITS, locale = 'en-US') =>
  validateInputs(raw(overrides), limits, locale);

const TEXT = {
  E1: 'Enter a home price between 1 and 100,000,000.',
  E2: 'Enter a down payment of 0 or more.',
  E3: 'Down payment must be less than the home price.',
  E4: 'Enter an interest rate between 0 and 30.',
  E5: 'Enter a whole number of years between 1 and 40.',
  E6: 'Enter an extra payment between 0 and 10,000,000.',
} as const;

describe('Default limits match docs/user-stories.md Shared definitions', () => {
  it('home price 1–100,000,000, rate 0–30, term 1–40, extra 0–10,000,000', () => {
    expect(DEFAULT_LIMITS).toEqual({
      homePrice: { min: 1, max: 100_000_000 },
      ratePercent: { min: 0, max: 30 },
      termYears: { min: 1, max: 40 },
      extraPayment: { min: 0, max: 10_000_000 },
    });
  });
});

describe('V. Empty and required fields (L8.1, L8.2)', () => {
  it('V0: the L1.1 inputs are valid and become cents', () => {
    expect(validate()).toEqual({
      ok: true,
      values: {
        homePriceCents: 35_000_000,
        downPaymentCents: 5_000_000,
        principalCents: 30_000_000,
        annualRatePercent: 6,
        termYears: 30,
        extraMonthlyCents: 0,
      },
    });
  });

  it.each(['', 'abc'])('V1 (L8.1): home price "%s" → E1', (homePrice) => {
    expect(errorIds(validate({ homePrice }))).toEqual({ homePrice: 'E1' });
  });

  it('V2 (L8.2): empty rate → E4', () => {
    expect(errorIds(validate({ interestRate: '' }))).toEqual({ interestRate: 'E4' });
  });

  it('V3: empty term → E5', () => {
    expect(errorIds(validate({ termYears: '' }))).toEqual({ termYears: 'E5' });
  });

  it('V4: empty down payment and extra count as 0 (L1.4, L5.3)', () => {
    const outcome = validate({ downPayment: '', extraPayment: '' });
    expect(outcome.ok && outcome.values.downPaymentCents).toBe(0);
    expect(outcome.ok && outcome.values.principalCents).toBe(35_000_000);
    expect(outcome.ok && outcome.values.extraMonthlyCents).toBe(0);
  });

  it('V5: spaces only in a required field → that field\'s message', () => {
    expect(errorIds(validate({ homePrice: '   ', interestRate: ' ', termYears: '  ' }))).toEqual({
      homePrice: 'E1',
      interestRate: 'E4',
      termYears: 'E5',
    });
  });
});

describe('R. Field rules and order of checks', () => {
  it('R1 (L8.4): down payment -1 → E2', () => {
    expect(errorIds(validate({ downPayment: '-1' }))).toEqual({ downPayment: 'E2' });
  });

  it('R2 (L8.5): term 15.5 → E5', () => {
    expect(errorIds(validate({ termYears: '15.5' }))).toEqual({ termYears: 'E5' });
  });

  it.each(['300000', '300001'])('R3 (L8.3): price 300,000 with down payment %s → E3 on the down payment', (downPayment) => {
    expect(errorIds(validate({ homePrice: '300000', downPayment }))).toEqual({ downPayment: 'E3' });
  });

  it('R4: E3 only when price and down payment are each valid', () => {
    expect(errorIds(validate({ homePrice: 'abc', downPayment: '50000' }))).toEqual({ homePrice: 'E1' });
    expect(errorIds(validate({ homePrice: '0', downPayment: '500000' }))).toEqual({ homePrice: 'E1' });
    expect(errorIds(validate({ homePrice: '300000', downPayment: '-1' }))).toEqual({ downPayment: 'E2' });
  });

  it('R5 (L8.9): price and rate both invalid → E1 and E4, each on its own field', () => {
    expect(errorIds(validate({ homePrice: 'abc', interestRate: '31' }))).toEqual({
      homePrice: 'E1',
      interestRate: 'E4',
    });
  });

  it('R5b: every field invalid at once → one message per field', () => {
    expect(
      errorIds(validate({ homePrice: 'x', downPayment: 'x', interestRate: 'x', termYears: 'x', extraPayment: 'x' })),
    ).toEqual({ homePrice: 'E1', downPayment: 'E2', interestRate: 'E4', termYears: 'E5', extraPayment: 'E6' });
  });

  it.each(['-50', 'abc', '10,000,000.01'])('R6 (L5.4): extra payment "%s" → E6', (extraPayment) => {
    expect(errorIds(validate({ extraPayment }))).toEqual({ extraPayment: 'E6' });
  });

  it('R7 (L5.5): extra payment 10,000,000 is valid', () => {
    const outcome = validate({ extraPayment: '10,000,000' });
    expect(outcome.ok && outcome.values.extraMonthlyCents).toBe(1_000_000_000);
  });

  it('U12 (rule 9): a down payment above the price limit gets E3 only', () => {
    expect(errorIds(validate({ homePrice: '300000', downPayment: '200000000' }))).toEqual({ downPayment: 'E3' });
  });

  it('U1/U7 (rules 5, 6): down payment "100.123" or "+5" → E2', () => {
    expect(errorIds(validate({ downPayment: '100.123' }))).toEqual({ downPayment: 'E2' });
    expect(errorIds(validate({ downPayment: '+5' }))).toEqual({ downPayment: 'E2' });
  });
});

describe('B. Boundaries (L8.10–L8.13)', () => {
  it.each(['0', '0.001', '30', '30.000'])('B1: rate %s is accepted', (interestRate) => {
    expect(validate({ interestRate }).ok).toBe(true);
  });

  it.each(['30.01', '-0.01', '30.001'])('B1: rate %s → E4', (interestRate) => {
    expect(errorIds(validate({ interestRate }))).toEqual({ interestRate: 'E4' });
  });

  it.each(['1', '40'])('B2: term %s is accepted', (termYears) => {
    expect(validate({ termYears }).ok).toBe(true);
  });

  it.each(['0', '41'])('B2: term %s → E5', (termYears) => {
    expect(errorIds(validate({ termYears }))).toEqual({ termYears: 'E5' });
  });

  it.each(['1', '100,000,000', '100000000.00'])('B3: home price %s is accepted (down payment 0)', (homePrice) => {
    expect(validate({ homePrice, downPayment: '0' }).ok).toBe(true);
  });

  it.each(['0', '0.99', '100,000,000.01'])('B3: home price %s → E1', (homePrice) => {
    expect(errorIds(validate({ homePrice, downPayment: '0' }))).toEqual({ homePrice: 'E1' });
  });

  it('B4 (L8.13): price 300,000 with down payment 299,000 → loan amount 1,000.00', () => {
    const outcome = validate({ homePrice: '300000', downPayment: '299000' });
    expect(outcome.ok && outcome.values.principalCents).toBe(100_000);
  });

  it('B4: down payment 0 is accepted', () => {
    expect(validate({ downPayment: '0' }).ok).toBe(true);
  });
});

describe('M. Message texts come from messages.ts and the limits', () => {
  it('M1: each field message has the exact text from the Error messages table', () => {
    const outcome = validateInputs(
      { homePrice: 'x', downPayment: 'x', interestRate: 'x', termYears: 'x', extraPayment: 'x' },
      DEFAULT_LIMITS,
      'en-US',
    );
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors.homePrice?.text).toBe(TEXT.E1);
    expect(outcome.errors.downPayment?.text).toBe(TEXT.E2);
    expect(outcome.errors.interestRate?.text).toBe(TEXT.E4);
    expect(outcome.errors.termYears?.text).toBe(TEXT.E5);
    expect(outcome.errors.extraPayment?.text).toBe(TEXT.E6);
    const e3 = validate({ homePrice: '300000', downPayment: '300000' });
    expect(!e3.ok && e3.errors.downPayment?.text).toBe(TEXT.E3);
  });

  it('M2 (A1.3): a custom rate maximum of 15 is used in the message and the check', () => {
    const limits: Limits = { ...DEFAULT_LIMITS, ratePercent: { min: 0, max: 15 } };
    const outcome = validate({ interestRate: '16' }, limits);
    expect(!outcome.ok && outcome.errors.interestRate?.text).toBe('Enter an interest rate between 0 and 15.');
    expect(validate({ interestRate: '15' }, limits).ok).toBe(true);
  });

  it('M3: range numbers are formatted for the locale (de-DE)', () => {
    const outcome = validate({ homePrice: 'x' }, DEFAULT_LIMITS, 'de-DE');
    expect(!outcome.ok && outcome.errors.homePrice?.text).toBe('Enter a home price between 1 and 100.000.000.');
  });

  it('M4: a limit with decimals is shown with its decimals (rate max 7.5)', () => {
    const limits: Limits = { ...DEFAULT_LIMITS, ratePercent: { min: 0, max: 7.5 } };
    const outcome = validate({ interestRate: '8' }, limits);
    expect(!outcome.ok && outcome.errors.interestRate?.text).toBe('Enter an interest rate between 0 and 7.5.');
  });

  it('M5: an unusable locale falls back to en-US instead of throwing', () => {
    expect(() => validate({ homePrice: 'x' }, DEFAULT_LIMITS, 'not a locale!!')).not.toThrow();
    const outcome = validate({ homePrice: 'x' }, DEFAULT_LIMITS, 'not a locale!!');
    expect(!outcome.ok && outcome.errors.homePrice?.text).toBe(TEXT.E1);
  });
});

describe('I. Hand-off to the engine', () => {
  it('I1 (L8.14, carrying on after an error): rate 31 → E4; then rate 6 → no errors and 1,798.65', () => {
    expect(errorIds(validate({ interestRate: '31' }))).toEqual({ interestRate: 'E4' });
    const fixed = validate({ interestRate: '6' });
    expect(fixed.ok).toBe(true);
    if (!fixed.ok) return;
    const outcome = calculateLoan({ ...fixed.values, today: TODAY });
    expect(outcome.ok && outcome.result.monthlyPaymentCents).toBe(179_865);
  });

  it('I2 (L8.8): 1 / 0 / 30 / 40 passes validation, then the engine returns E7', () => {
    const outcome = validate({ homePrice: '1', downPayment: '0', interestRate: '30', termYears: '40' });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(calculateLoan({ ...outcome.values, today: TODAY })).toEqual({ ok: false, error: 'E7' });
  });

  it('I3 (L8.17): ~1,000 random and boundary inputs never throw, never give E10, NaN or negatives', () => {
    // Mulberry32: small seeded PRNG so failures are reproducible.
    let seed = 20261106;
    const random = (): number => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const pick = <T>(items: readonly T[]): T => items[Math.floor(random() * items.length)] as T;

    const junk = ['', ' ', 'abc', '1e5', '--5', '-1', '+5', 'NaN', 'Infinity', '6.5%', '1,5', '1.500.000', '.', '0x10', '٣'];
    const priceEdges = ['0', '0.99', '1', '100000000', '100000000.01'];
    const rateEdges = ['0', '0.001', '30', '30.01', '-0.01'];
    const termEdges = ['0', '1', '40', '41', '15.5'];
    const extraEdges = ['0', '10000000', '10000000.01'];
    const money = (max: number): string => (random() * max).toFixed(pick([0, 1, 2]));

    const allowedIds = new Set(['E1', 'E2', 'E3', 'E4', 'E5', 'E6']);
    let valid = 0;
    let tooSmall = 0;

    for (let i = 0; i < 1000; i++) {
      // About 75% of each field's values are plausible; the rest are edges or junk.
      const field = (plausible: () => string, edges: readonly string[]): string =>
        random() < 0.75 ? plausible() : pick([pick(edges), pick(junk)]);
      const input: RawInputs = {
        homePrice: field(() => pick([money(1_000_000), money(100_000_000), money(500)]), priceEdges),
        downPayment: field(() => pick(['', '0', money(50_000)]), ['0', '-1', '100.123']),
        interestRate: field(() => (random() * 30).toFixed(pick([0, 1, 3])), rateEdges),
        termYears: field(() => String(1 + Math.floor(random() * 40)), termEdges),
        extraPayment: field(() => pick(['', '0', money(5_000)]), extraEdges),
      };

      let outcome: ValidationOutcome | undefined;
      expect(() => {
        outcome = validateInputs(input, DEFAULT_LIMITS, 'en-US');
      }, JSON.stringify(input)).not.toThrow();
      if (!outcome) throw new Error('no outcome');

      if (!outcome.ok) {
        for (const error of Object.values(outcome.errors)) {
          expect(allowedIds.has(error.id), JSON.stringify(input)).toBe(true);
          expect(error.text.length).toBeGreaterThan(0);
        }
        continue;
      }

      valid++;
      const calc = calculateLoan({ ...outcome.values, today: TODAY });
      if (!calc.ok) {
        expect(calc.error, JSON.stringify(input)).toBe('E7');
        tooSmall++;
        continue;
      }
      const { result } = calc;
      for (const n of [result.monthlyPaymentCents, result.totalPaidCents, result.totalInterestCents]) {
        expect(Number.isSafeInteger(n) && n >= 0, JSON.stringify(input)).toBe(true);
      }
      expect(result.rows.length).toBeLessThanOrEqual(outcome.values.termYears * 12);
    }

    // The loop must actually exercise the engine, not only the error paths.
    expect(valid).toBeGreaterThan(100);
    expect(valid - tooSmall).toBeGreaterThan(100);
  });
});

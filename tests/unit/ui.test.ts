// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { createApp, type AppDependencies } from '../../src/ui/app';
import { validateConfig, type ConfigResult } from '../../src/config/schema';
import type { Field } from '../../src/engine/validate';
import type { LoanResult } from '../../src/engine/amortize';

const TODAY = new Date(2026, 10, 6);
const E8 = 'Fix the highlighted fields to see your results.';

let root: HTMLElement;
let errorSpy: MockInstance<typeof console.error>;

beforeEach(() => {
  document.body.innerHTML = '<div id="app"></div>';
  root = document.querySelector<HTMLElement>('#app')!;
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterEach(() => {
  errorSpy.mockRestore();
});

function start(json: unknown = {}, deps: AppDependencies = {}): ConfigResult {
  const configResult = validateConfig(json);
  createApp(root, configResult, { today: () => TODAY, ...deps });
  return configResult;
}

const input = (field: Field): HTMLInputElement => root.querySelector<HTMLInputElement>(`#field-${field}`)!;
const errorText = (field: Field): string => root.querySelector(`#field-${field}-error`)?.textContent ?? '';
const result = (name: string): string | null => root.querySelector(`[data-result="${name}"]`)?.textContent ?? null;
const resultsText = (): string => root.querySelector('.results-body')?.textContent ?? '';

/** Types a value as a user would: sets it and fires `input`. */
function type(field: Field, value: string): void {
  const el = input(field);
  el.value = value;
  el.dispatchEvent(new Event('input', { bubbles: true }));
}
/** Leaves the field: fires `focusout`. */
function leave(field: Field): void {
  input(field).dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
}
function enter(values: Partial<Record<Field, string>>): void {
  for (const [field, value] of Object.entries(values)) type(field as Field, value);
}

describe('Form prefilled from config defaults (A1.2)', () => {
  it('built-in defaults: 350000 / 50000 / 6 / 30 with results shown', () => {
    start();
    expect(input('homePrice').value).toBe('350000');
    expect(input('downPayment').value).toBe('50000');
    expect(input('interestRate').value).toBe('6');
    expect(input('termYears').value).toBe('30');
    expect(result('monthly-payment')).toBe('$1,798.65');
  });

  it('config defaults 400,000 / 5 / 25 are prefilled and their results shown', () => {
    start({ defaults: { homePrice: 400000, ratePercent: 5, termYears: 25 } });
    expect(input('homePrice').value).toBe('400000');
    expect(input('interestRate').value).toBe('5');
    expect(input('termYears').value).toBe('25');
    expect(result('loan-amount')).toBe('$350,000.00');
  });

  it('inputs are text fields with labels (so "1,500,000" can be typed)', () => {
    start();
    for (const field of ['homePrice', 'downPayment', 'interestRate', 'termYears'] as const) {
      expect(input(field).type).toBe('text');
      expect(root.querySelector(`label[for="field-${field}"]`)?.textContent).toBeTruthy();
    }
  });
});

describe('Results (L1, L2, A1.1)', () => {
  it('L1.1: 350,000 / 50,000 / 6 / 30 → loan 300,000.00, payment 1,798.65', () => {
    start();
    enter({ homePrice: '350000', downPayment: '50000', interestRate: '6', termYears: '30' });
    expect(result('loan-amount')).toBe('$300,000.00');
    expect(result('monthly-payment')).toBe('$1,798.65');
  });

  it('L1.2 / L1.3: 200,000 at 5% for 15 → 1,581.59; 120,000 at 0% for 10 → 1,000.00', () => {
    start();
    enter({ homePrice: '200000', downPayment: '0', interestRate: '5', termYears: '15' });
    expect(result('monthly-payment')).toBe('$1,581.59');
    enter({ homePrice: '120000', interestRate: '0', termYears: '10' });
    expect(result('monthly-payment')).toBe('$1,000.00');
    expect(root.querySelector('.field-error:not(:empty)')).toBeNull();
  });

  it('L1.4: an empty down payment makes the loan amount equal the price', () => {
    start();
    type('downPayment', '');
    expect(result('loan-amount')).toBe('$350,000.00');
  });

  it('L1.5: changing the rate to 5 updates the payment to 1,610.46 with no button', () => {
    start();
    type('interestRate', '5');
    expect(result('monthly-payment')).toBe('$1,610.46');
    expect(root.querySelector('button[type="submit"], input[type="submit"]')).toBeNull();
  });

  it('L1.7 / L2.4: maximum values are written out in full', () => {
    start();
    enter({ homePrice: '100000000', downPayment: '0', interestRate: '30', termYears: '40' });
    expect(result('monthly-payment')).toBe('$2,500,017.80');
    expect(result('total-interest')).toBe('$1,100,022,803.06');
    expect(result('total-paid')).toBe('$1,200,022,803.06');
    expect(resultsText()).not.toMatch(/NaN|Infinity|e\+/);
  });

  it('L2.1 / L2.2: total interest 347,515.44, total paid 647,515.44, payoff November 2056', () => {
    start();
    enter({ homePrice: '300000', downPayment: '0', interestRate: '6', termYears: '30' });
    expect(result('total-interest')).toBe('$347,515.44');
    expect(result('total-paid')).toBe('$647,515.44');
    expect(result('payoff-date')).toBe('November 2056');
  });

  it('L2.6: on another day (15 March 2027) the payoff date is March 2057', () => {
    start({}, { today: () => new Date(2027, 2, 15) });
    enter({ homePrice: '300000', downPayment: '0' });
    expect(result('payoff-date')).toBe('March 2057');
  });

  it('A1.1: EUR / de-DE formats the payment as 1.798,65 €', () => {
    start({ currency: 'EUR', locale: 'de-DE' });
    enter({ homePrice: '300000', downPayment: '0' });
    expect(result('monthly-payment')).toBe('1.798,65 €');
    expect(result('payoff-date')).toBe('November 2056');
  });
});

describe('Errors and message timing (L8, input rule 11)', () => {
  it('rule 11: while typing an invalid value, the results switch to E8 but the field message waits until the field is left', () => {
    start();
    type('homePrice', 'abc');
    expect(resultsText()).toBe(E8);
    expect(errorText('homePrice')).toBe('');
    expect(input('homePrice').hasAttribute('aria-invalid')).toBe(false);
    leave('homePrice');
    expect(errorText('homePrice')).toBe('!Enter a home price between 1 and 100,000,000.');
  });

  it('rule 11 / L8.14: the message disappears as soon as the value is valid while typing, and results return', () => {
    start();
    type('interestRate', '31');
    leave('interestRate');
    expect(errorText('interestRate')).toContain('Enter an interest rate between 0 and 30.');
    input('interestRate').focus();
    type('interestRate', '6');
    expect(errorText('interestRate')).toBe('');
    expect(input('interestRate').hasAttribute('aria-invalid')).toBe(false);
    expect(result('monthly-payment')).toBe('$1,798.65');
  });

  it('rule 11: after becoming valid, a new invalid value waits for the next leave again', () => {
    start();
    type('termYears', '0');
    leave('termYears');
    type('termYears', '30');
    type('termYears', '41');
    expect(errorText('termYears')).toBe('');
    leave('termYears');
    expect(errorText('termYears')).toContain('Enter a whole number of years between 1 and 40.');
  });

  it('L8.15: an invalid value removes every result and the schedule figures; only E8 remains', () => {
    start();
    expect(result('monthly-payment')).toBe('$1,798.65');
    type('homePrice', 'abc');
    expect(resultsText()).toBe(E8);
    expect(root.querySelector('[data-result]')).toBeNull();
    expect(root.querySelector('.results')?.textContent).not.toMatch(/\$/);
  });

  it('L8.16: changing the term from 30 to 15 replaces every figure', () => {
    start();
    enter({ homePrice: '300000', downPayment: '0' });
    type('termYears', '15');
    expect(result('monthly-payment')).toBe('$2,531.57');
    expect(resultsText()).not.toContain('1,798.65');
    expect(resultsText()).not.toContain('November 2056');
  });

  it('L8.3: down payment equal to the price → E3 under the down payment', () => {
    start();
    enter({ homePrice: '300000', downPayment: '300000' });
    leave('downPayment');
    expect(errorText('downPayment')).toBe('!Down payment must be less than the home price.');
    expect(resultsText()).toBe(E8);
  });

  it('E3 also appears when the home price is left (the price caused it)', () => {
    start();
    type('homePrice', '40000');
    leave('homePrice');
    expect(errorText('downPayment')).toContain('Down payment must be less than the home price.');
    type('homePrice', '400000');
    expect(errorText('downPayment')).toBe('');
  });

  it('L8.9: two invalid fields show two messages, each under its own field', () => {
    start();
    type('homePrice', 'abc');
    leave('homePrice');
    type('interestRate', '31');
    leave('interestRate');
    expect(errorText('homePrice')).toContain('Enter a home price');
    expect(errorText('interestRate')).toContain('Enter an interest rate');
  });

  it('L8.8: 1 / 0 / 30 / 40 shows E7 and no payment', () => {
    start();
    enter({ homePrice: '1', downPayment: '0', interestRate: '30', termYears: '40' });
    expect(resultsText()).toBe('The loan amount is too small for this term.');
    expect(root.querySelector('[data-result]')).toBeNull();
  });

  it('L8.18: an invalid field has aria-invalid, aria-describedby to its message, an aria-live message and a text marker', () => {
    start();
    type('homePrice', 'abc');
    leave('homePrice');
    const el = input('homePrice');
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(el.getAttribute('aria-describedby')).toBe('field-homePrice-error');
    const message = root.querySelector('#field-homePrice-error')!;
    expect(message.getAttribute('aria-live')).toBe('polite');
    expect(message.querySelector('.error-marker')?.textContent).toBe('!');
    expect(message.querySelector('.error-marker')?.getAttribute('aria-hidden')).toBe('true');
    expect(el.closest('.field')?.classList.contains('has-error')).toBe(true);
  });

  it('every message element is an aria-live region even before any error', () => {
    start();
    for (const field of ['homePrice', 'downPayment', 'interestRate', 'termYears'] as const) {
      expect(root.querySelector(`#field-${field}-error`)?.getAttribute('aria-live')).toBe('polite');
    }
  });

  it('L8.19: an unexpected exception shows E9, keeps every input and never blanks the page', () => {
    start({}, {
      calculate: () => {
        throw new Error('boom');
      },
    });
    type('interestRate', '5');
    expect(resultsText()).toBe('Something went wrong. Your inputs are kept; please try again.');
    expect(input('interestRate').value).toBe('5');
    expect(input('homePrice').value).toBe('350000');
    expect(root.querySelector('h1')?.textContent).toBe('Mortgage Calculator');
    expect(errorSpy).toHaveBeenCalled();
  });

  it('L8.20: a non-finite result from the engine shows E10 and logs details', () => {
    const broken = (): { ok: true; result: LoanResult } => ({
      ok: true,
      result: {
        monthlyPaymentCents: Number.NaN,
        rows: [],
        totalPaidCents: Number.POSITIVE_INFINITY,
        totalInterestCents: 0,
        firstPayment: { year: 2026, month: 12 },
        payoff: { year: 2056, month: 11 },
        savings: null,
      },
    });
    start({}, { calculate: broken });
    expect(resultsText()).toBe('Could not calculate this loan. Please check your inputs.');
    expect(resultsText()).not.toMatch(/NaN|Infinity/);
    expect(errorSpy).toHaveBeenCalled();
  });

  it('L8.20: an engine E10 is shown as E10 and logged', () => {
    start({}, { calculate: () => ({ ok: false, error: 'E10' }) });
    expect(resultsText()).toBe('Could not calculate this loan. Please check your inputs.');
    expect(errorSpy).toHaveBeenCalled();
  });

  it('pressing Enter in the form does not reload or submit', () => {
    start();
    const submit = new Event('submit', { bubbles: true, cancelable: true });
    root.querySelector('form')!.dispatchEvent(submit);
    expect(submit.defaultPrevented).toBe(true);
  });
});

describe('Footer (A3, on-screen only)', () => {
  it('A3.1: shows the office name and the disclaimer', () => {
    start({ officeName: 'Riverside Mortgages', disclaimer: 'Figures are estimates.' });
    const footer = root.querySelector('footer')!;
    expect(footer.querySelector('.office-name')?.textContent).toBe('Riverside Mortgages');
    expect(footer.querySelector('.disclaimer')?.textContent).toBe('Figures are estimates.');
  });

  it('A3.2: markup in the disclaimer is shown as literal text and creates no element', () => {
    start({ disclaimer: '<img src=x onerror=alert(1)>' });
    const footer = root.querySelector('footer')!;
    expect(footer.querySelector('.disclaimer')?.textContent).toBe('<img src=x onerror=alert(1)>');
    expect(root.querySelector('img')).toBeNull();
  });

  it('A3.3: no disclaimer configured → the default disclaimer', () => {
    start();
    expect(root.querySelector('footer .disclaimer')?.textContent).toBe(
      'Estimates only. Not a loan offer or financial advice.',
    );
  });

  it('A3.5: no office name → only the disclaimer, no empty label', () => {
    start();
    const footer = root.querySelector('footer')!;
    expect(footer.querySelector('.office-name')).toBeNull();
    expect(footer.children).toHaveLength(1);
  });
});

describe('Config banner (A4.6)', () => {
  it('a valid config shows no banner', () => {
    start({ currency: 'USD' });
    expect(root.querySelector('.config-banner')).toBeNull();
  });

  it('E12 is shown; Dismiss hides it and the calculator stays usable; it returns on reload', () => {
    const json = { currency: 'XYZ', limits: { termYears: { min: 50, max: 40 } } };
    start(json);
    const banner = root.querySelector('.config-banner')!;
    expect(banner.textContent).toContain(
      'Some settings were invalid and defaults are used instead: currency, limits.termYears.',
    );
    banner.querySelector('button')!.click();
    expect(root.querySelector('.config-banner')).toBeNull();
    type('interestRate', '5');
    expect(result('monthly-payment')).toBe('$1,610.46');

    // "Reload" with the config still broken
    start(json);
    expect(root.querySelector('.config-banner')).not.toBeNull();
  });

  it('E11 is shown with its exact text when the file could not be used', () => {
    createApp(root, validateConfig([]), { today: () => TODAY });
    expect(root.querySelector('.config-banner p')?.textContent).toBe(
      'Configuration could not be loaded (not a JSON object). Using default settings.',
    );
    expect(result('monthly-payment')).toBe('$1,798.65');
  });

  it('banner text is set as plain text', () => {
    start({ '<b>x</b>': 1 });
    expect(root.querySelector('.config-banner b')).toBeNull();
    expect(root.querySelector('.config-banner p')?.textContent).toContain('<b>x</b>');
  });
});

describe('5d design: header, adornments, principal vs. interest bar', () => {
  it('the header shows the app name and the configured office name as text', () => {
    start({ officeName: 'Riverside Mortgages' });
    const header = root.querySelector('header')!;
    expect(header.querySelector('h1')?.textContent).toBe('Mortgage Calculator');
    expect(header.querySelector('.header-office')?.textContent).toBe('Riverside Mortgages');
  });

  it('no office name → no office label in the header', () => {
    start();
    expect(root.querySelector('header .header-office')).toBeNull();
  });

  it('adornments come from the config currency: "$" before money fields, "%" and "years" after', () => {
    start();
    const adornments = (field: Field) =>
      [...input(field).parentElement!.querySelectorAll('.adornment')].map((a) => [a.className, a.textContent]);
    expect(adornments('homePrice')).toEqual([['adornment adornment-prefix', '$']]);
    expect(adornments('downPayment')).toEqual([['adornment adornment-prefix', '$']]);
    expect(adornments('interestRate')).toEqual([['adornment adornment-suffix', '%']]);
    expect(adornments('termYears')).toEqual([['adornment adornment-suffix', 'years']]);
    for (const a of root.querySelectorAll('.adornment')) expect(a.getAttribute('aria-hidden')).toBe('true');
  });

  it('EUR in de-DE puts "€" after the money fields; PKR shows "PKR" before', () => {
    start({ currency: 'EUR', locale: 'de-DE' });
    expect(input('homePrice').parentElement!.querySelector('.adornment-suffix')?.textContent).toBe('€');
    start({ currency: 'PKR' });
    expect(input('homePrice').parentElement!.querySelector('.adornment-prefix')?.textContent).toBe('PKR');
  });

  it('the bar has text labels with amounts and percentages that add up to 100%', () => {
    start();
    enter({ homePrice: '300000', downPayment: '0' });
    expect(root.querySelector('[data-share="principal"]')?.textContent).toBe('$300,000.00 (46%)');
    expect(root.querySelector('[data-share="interest"]')?.textContent).toBe('$347,515.44 (54%)');
    expect(root.querySelector('.breakdown-bar')?.getAttribute('aria-hidden')).toBe('true');
    const widths = [...root.querySelectorAll<HTMLElement>('.breakdown-segment')].map((s) => s.style.width);
    expect(widths).toEqual(['46%', '54%']);
  });

  it('at 0% interest the bar is 100% principal and 0% interest', () => {
    start();
    enter({ homePrice: '120000', downPayment: '0', interestRate: '0', termYears: '10' });
    expect(root.querySelector('[data-share="principal"]')?.textContent).toBe('$120,000.00 (100%)');
    expect(root.querySelector('[data-share="interest"]')?.textContent).toBe('$0.00 (0%)');
  });

  it('the bar disappears with every other figure when an input is invalid', () => {
    start();
    type('homePrice', 'abc');
    expect(root.querySelector('.breakdown')).toBeNull();
  });
});

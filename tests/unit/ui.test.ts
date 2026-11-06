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

/** Rows of the table on the current schedule page. */
const pageRows = (): string[][] =>
  [...root.querySelectorAll('.schedule tbody tr')].map((tr) => [...tr.children].map((td) => td.textContent ?? ''));
const pagerButton = (which: 'prev' | 'next'): HTMLButtonElement | null =>
  root.querySelector<HTMLButtonElement>(`.schedule [data-page="${which}"]`);
const pagerStatus = (): string => root.querySelector('.schedule .pager-status')?.textContent ?? '';
const isUnavailable = (button: HTMLButtonElement | null): boolean => button?.getAttribute('aria-disabled') === 'true';

/** Every row of the schedule, collected page by page from page 1 (leaves the last page shown). */
function allScheduleRows(): string[][] {
  let guard = 0;
  while (pagerButton('prev') && !isUnavailable(pagerButton('prev')) && guard++ < 100) pagerButton('prev')!.click();
  const rows = [...pageRows()];
  guard = 0;
  while (pagerButton('next') && !isUnavailable(pagerButton('next')) && guard++ < 100) {
    pagerButton('next')!.click();
    rows.push(...pageRows());
  }
  return rows;
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

describe('Schedule (L3)', () => {
  const tableRows = allScheduleRows;
  const headers = (): string[] => [...root.querySelectorAll('.schedule thead th')].map((th) => th.textContent ?? '');
  const scheduleText = (): string => root.querySelector('.schedule-body')?.textContent ?? '';
  const clickMode = (mode: 'monthly' | 'yearly'): void =>
    root.querySelector<HTMLButtonElement>(`.schedule [data-mode="${mode}"]`)!.click();

  it('L3.1: monthly by default, 360 rows, the seven columns, and row 1', () => {
    start();
    enter({ homePrice: '300000', downPayment: '0' });
    expect(root.querySelector('.schedule [data-mode="monthly"]')?.getAttribute('aria-pressed')).toBe('true');
    expect(headers()).toEqual(['Payment number', 'Date', 'Payment', 'Principal', 'Interest', 'Extra payment', 'Balance']);
    expect(tableRows()).toHaveLength(360);
    expect(tableRows()[0]).toEqual(['1', 'December 2026', '$1,798.65', '$298.65', '$1,500.00', '$0.00', '$299,701.35']);
  });

  it('L3.2: the last row is 360, November 2056, 1,800.09, 1,791.13, 8.96, 0.00, 0.00', () => {
    start();
    enter({ homePrice: '300000', downPayment: '0' });
    expect(tableRows()[359]).toEqual(['360', 'November 2056', '$1,800.09', '$1,791.13', '$8.96', '$0.00', '$0.00']);
  });

  it('L3.3: yearly view has 30 rows; year 1 is 21,583.80 / 3,684.00 / 17,899.80 / 296,316.00', () => {
    start();
    enter({ homePrice: '300000', downPayment: '0' });
    clickMode('yearly');
    expect(root.querySelector('.schedule [data-mode="yearly"]')?.getAttribute('aria-pressed')).toBe('true');
    expect(root.querySelector('.schedule [data-mode="monthly"]')?.getAttribute('aria-pressed')).toBe('false');
    expect(headers()).toEqual(['Year', 'Payment', 'Principal', 'Interest', 'Extra payment', 'Ending balance']);
    expect(tableRows()).toHaveLength(30);
    expect(tableRows()[0]).toEqual(['1', '$21,583.80', '$3,684.00', '$17,899.80', '$0.00', '$296,316.00']);
    clickMode('monthly');
    expect(tableRows()).toHaveLength(360);
  });

  it('the chosen view stays when an input changes', () => {
    start();
    clickMode('yearly');
    type('termYears', '15');
    expect(tableRows()).toHaveLength(15);
  });

  it('L3.4 / L3.5: Download CSV saves mortgage-schedule.csv with monthly rows, even in yearly view', () => {
    const download = vi.fn();
    start({}, { download });
    enter({ homePrice: '300000', downPayment: '0' });
    clickMode('yearly');
    root.querySelector<HTMLButtonElement>('.schedule .csv-button')!.click();
    expect(download).toHaveBeenCalledTimes(1);
    const [filename, text] = download.mock.calls[0] as [string, string];
    expect(filename).toBe('mortgage-schedule.csv');
    const lines = text.split('\r\n').filter(Boolean);
    expect(lines[0]).toBe('Payment number,Date,Payment,Principal,Interest,Extra payment,Balance');
    expect(lines).toHaveLength(361);
    expect(lines[1]).toBe('1,2026-12,1798.65,298.65,1500.00,0.00,299701.35');
  });

  it('L3.6: 1 / 0 / 0.001 / 1 → 12 rows; rows 1–11 pay 0.08, row 12 pays 0.12, last balance 0.00', () => {
    start();
    enter({ homePrice: '1', downPayment: '0', interestRate: '0.001', termYears: '1' });
    const rows = tableRows();
    expect(rows).toHaveLength(12);
    rows.slice(0, 11).forEach((row) => expect(row[2]).toBe('$0.08'));
    expect(rows[11]?.[2]).toBe('$0.12');
    expect(rows[11]?.[6]).toBe('$0.00');
  });

  it('L3.7: maximum values → exactly 480 rows, last balance 0.00, no negative, NaN or Infinity cell', () => {
    start();
    enter({ homePrice: '100000000', downPayment: '0', interestRate: '30', termYears: '40' });
    const rows = tableRows();
    expect(rows).toHaveLength(480);
    expect(rows[479]?.[6]).toBe('$0.00');
    expect(scheduleText()).not.toMatch(/NaN|Infinity|-\$|\$-/);
  });

  it('L3.8: an invalid input replaces the schedule with E8 (no rows, no buttons); fixing it brings the new schedule', () => {
    start();
    expect(tableRows()).toHaveLength(360);
    type('homePrice', 'abc');
    expect(scheduleText()).toBe(E8);
    expect(root.querySelector('.schedule tbody')).toBeNull();
    expect(root.querySelector<HTMLElement>('.schedule-toolbar')?.hidden).toBe(true);
    type('homePrice', '350000');
    type('termYears', '15');
    expect(tableRows()).toHaveLength(180);
    expect(root.querySelector<HTMLElement>('.schedule-toolbar')?.hidden).toBe(false);
  });

  it('E7 and E9 also replace the schedule', () => {
    start();
    enter({ homePrice: '1', downPayment: '0', interestRate: '30', termYears: '40' });
    expect(scheduleText()).toBe('The loan amount is too small for this term.');
    start({}, {
      calculate: () => {
        throw new Error('boom');
      },
    });
    expect(scheduleText()).toBe('Something went wrong. Your inputs are kept; please try again.');
  });

  it('L3.9: on 15 March 2027, row 1 is April 2027 and row 360 is March 2057', () => {
    start({}, { today: () => new Date(2027, 2, 15) });
    enter({ homePrice: '300000', downPayment: '0' });
    expect(tableRows()[0]?.[1]).toBe('April 2027');
    expect(tableRows()[359]?.[1]).toBe('March 2057');
  });

  it('L3.10: the CSV dates match the on-screen schedule on any day (15 March 2027)', () => {
    const download = vi.fn();
    start({}, { today: () => new Date(2027, 2, 15), download });
    enter({ homePrice: '300000', downPayment: '0' });
    root.querySelector<HTMLButtonElement>('.schedule .csv-button')!.click();
    const lines = (download.mock.calls[0]?.[1] as string).split('\r\n').filter(Boolean);
    expect(lines[1]?.split(',')[1]).toBe('2027-04');
    expect(lines[360]?.split(',')[1]).toBe('2057-03');
  });

  it('reused rows never keep stale values: 30 → 1 → 30 years, then a new rate', () => {
    start();
    enter({ homePrice: '300000', downPayment: '0' });
    type('termYears', '1');
    expect(tableRows()).toHaveLength(12);
    type('termYears', '30');
    expect(tableRows()).toHaveLength(360);
    expect(tableRows()[359]).toEqual(['360', 'November 2056', '$1,800.09', '$1,791.13', '$8.96', '$0.00', '$0.00']);
    type('interestRate', '5');
    expect(tableRows()[0]).toEqual(['1', 'December 2026', '$1,610.46', '$360.46', '$1,250.00', '$0.00', '$299,639.54']);
    expect(root.querySelectorAll('.schedule tbody')).toHaveLength(1);
  });

  it('the table is a labelled, keyboard-focusable scroll region with a caption and column headers', () => {
    start();
    const region = root.querySelector('.schedule .table-scroll')!;
    expect(region.getAttribute('role')).toBe('region');
    expect(region.getAttribute('aria-label')).toBe('Amortization schedule table');
    expect(region.getAttribute('tabindex')).toBe('0');
    expect(root.querySelector('.schedule caption')?.textContent).toBeTruthy();
    for (const th of root.querySelectorAll('.schedule thead th')) expect(th.getAttribute('scope')).toBe('col');
  });
});

describe('Extra monthly payment (L5)', () => {
  const tableRows = allScheduleRows;
  const L5_1 = { homePrice: '300000', downPayment: '0', interestRate: '6', termYears: '30' };

  it('the field is labelled, has the currency prefix and starts empty when the default is 0', () => {
    start();
    expect(root.querySelector('label[for="field-extraPayment"]')?.textContent).toBe('Extra monthly payment');
    expect(input('extraPayment').value).toBe('');
    expect(input('extraPayment').parentElement!.querySelector('.adornment-prefix')?.textContent).toBe('$');
  });

  it('a config default of 100 is prefilled', () => {
    start({ defaults: { extraPayment: 100 } });
    expect(input('extraPayment').value).toBe('100');
  });

  it('L5.1: extra 200 → payoff February 2050, 81 months and 91,173.87 saved, interest 256,341.57, 279 rows', () => {
    start();
    enter({ ...L5_1, extraPayment: '200' });
    expect(result('payoff-date')).toBe('February 2050');
    expect(result('months-saved')).toBe('81 months');
    expect(result('interest-saved')).toBe('$91,173.87');
    expect(result('total-interest')).toBe('$256,341.57');
    expect(root.querySelector('.savings-title')?.textContent).toBe('Paying $200.00 extra each month');
    const rows = tableRows();
    expect(rows).toHaveLength(279);
    expect(rows[0]?.[2]).toBe('$1,998.65');
    expect(rows[0]?.[5]).toBe('$200.00');
    expect(rows[278]?.[2]).toBe('$716.87');
    expect(rows[278]?.[5]).toBe('$0.00');
    expect(rows[278]?.[6]).toBe('$0.00');
  });

  it('L5.2: extra 400,000 → 1 row of 301,500.00, 359 months and 346,015.44 saved, no negative balance', () => {
    start();
    enter({ ...L5_1, extraPayment: '400000' });
    const rows = tableRows();
    expect(rows).toHaveLength(1);
    expect(rows[0]?.[2]).toBe('$301,500.00');
    expect(rows[0]?.[6]).toBe('$0.00');
    expect(result('months-saved')).toBe('359 months');
    expect(result('interest-saved')).toBe('$346,015.44');
    // The summary names the amount entered, not the capped amount in row 1 (299,701.35).
    expect(root.querySelector('.savings-title')?.textContent).toBe('Paying $400,000.00 extra each month');
    expect(root.querySelector('.schedule')?.textContent).not.toMatch(/-\$|\$-/);
  });

  it.each(['0', ''])('L5.3: extra "%s" → same results as without, and no savings summary', (extraPayment) => {
    start();
    enter({ ...L5_1, extraPayment });
    expect(result('total-interest')).toBe('$347,515.44');
    expect(result('payoff-date')).toBe('November 2056');
    expect(root.querySelector('.savings')).toBeNull();
    expect(result('months-saved')).toBeNull();
    expect(tableRows()).toHaveLength(360);
  });

  it.each(['-50', 'abc', '10,000,000.01'])('L5.4: extra "%s" → E6 under the field and E8 in the results', (extraPayment) => {
    start();
    type('extraPayment', extraPayment);
    leave('extraPayment');
    expect(errorText('extraPayment')).toBe('!Enter an extra payment between 0 and 10,000,000.');
    expect(resultsText()).toBe(E8);
  });

  it('L5.5: extra 10,000,000 is accepted: no error, 1 row of 301,500.00', () => {
    start();
    enter({ ...L5_1, extraPayment: '10000000' });
    leave('extraPayment');
    expect(errorText('extraPayment')).toBe('');
    expect(tableRows()).toHaveLength(1);
    expect(tableRows()[0]?.[2]).toBe('$301,500.00');
  });

  it('L5.6: E6 for -50 disappears when changed to 200, and the L5.1 results appear', () => {
    start();
    enter(L5_1);
    type('extraPayment', '-50');
    leave('extraPayment');
    expect(errorText('extraPayment')).toContain('Enter an extra payment');
    type('extraPayment', '200');
    expect(errorText('extraPayment')).toBe('');
    expect(result('months-saved')).toBe('81 months');
    expect(result('interest-saved')).toBe('$91,173.87');
  });

  it('L5.8: on 15 March 2027 the payoff date is June 2050 and months saved is still 81', () => {
    start({}, { today: () => new Date(2027, 2, 15) });
    enter({ ...L5_1, extraPayment: '200' });
    expect(result('payoff-date')).toBe('June 2050');
    expect(result('months-saved')).toBe('81 months');
  });

  it('a single month saved reads "1 month"', () => {
    start();
    // 120,000 at 0% over 10 years: 1,000/month; an extra 9 per month saves exactly 1 month.
    enter({ homePrice: '120000', downPayment: '0', interestRate: '0', termYears: '10', extraPayment: '9' });
    expect(result('months-saved')).toBe('1 month');
  });
});

describe('Loan product selector (M1)', () => {
  const PRESETS = {
    presets: [
      { id: 'f30', name: '30-year fixed', ratePercent: 6.5, termYears: 30, description: 'Our standard 30-year loan' },
      { id: 'f15', name: '15-year fixed', ratePercent: 5.75, termYears: 15, description: 'Lower total interest' },
    ],
  };
  const select = (): HTMLSelectElement => root.querySelector<HTMLSelectElement>('#field-preset')!;
  const choose = (value: string): void => {
    select().value = value;
    select().dispatchEvent(new Event('change', { bubbles: true }));
  };
  const selectedText = (): string => select().selectedOptions[0]?.textContent ?? '';
  const description = (): string => root.querySelector('#field-preset-description')?.textContent ?? '';
  const lockNote = (): HTMLElement | null => root.querySelector<HTMLElement>('#field-lock-note');
  const fieldOrder = (): string[] =>
    [...root.querySelectorAll<HTMLInputElement | HTMLSelectElement>('form input, form select')].map((el) => el.name);
  const isLocked = (field: Field): boolean => input(field).readOnly;

  it('M1.1: Custom, 30-year fixed, 15-year fixed in order, Custom selected; rate and term follow the selector and are editable', () => {
    start(PRESETS);
    expect(root.querySelector('label[for="field-preset"]')?.textContent).toBe('Loan product');
    expect([...select().options].map((o) => o.textContent)).toEqual(['Custom', '30-year fixed', '15-year fixed']);
    expect(selectedText()).toBe('Custom');
    expect(fieldOrder()).toEqual(['preset', 'interestRate', 'termYears', 'homePrice', 'downPayment', 'extraPayment']);
    expect(isLocked('interestRate')).toBe(false);
    expect(isLocked('termYears')).toBe(false);
    expect(lockNote()?.textContent ?? '').toBe('');
  });

  it('M1.2: choosing 15-year fixed fills 5.75 and 15 and updates the payment to 2,491.23', () => {
    start(PRESETS);
    enter({ homePrice: '350000', downPayment: '50000' });
    choose('f15');
    expect(input('interestRate').value).toBe('5.75');
    expect(input('termYears').value).toBe('15');
    expect(result('monthly-payment')).toBe('$2,491.23');
    expect(allScheduleRows()).toHaveLength(180);
  });

  it('M1.3: the description appears under the selector, and goes away for Custom', () => {
    start(PRESETS);
    expect(description()).toBe('');
    choose('f15');
    expect(description()).toBe('Lower total interest');
    expect(select().getAttribute('aria-describedby')).toBe('field-preset-description');
    choose('');
    expect(description()).toBe('');
  });

  it('M1.4: with a product selected, rate and term are readonly (not disabled), focusable, and explained by the note', () => {
    start(PRESETS);
    choose('f15');
    for (const field of ['interestRate', 'termYears'] as const) {
      const el = input(field);
      expect(el.readOnly).toBe(true);
      expect(el.disabled).toBe(false);
      expect(el.tabIndex).not.toBe(-1);
      expect(el.getAttribute('aria-describedby')?.split(' ')).toContain('field-lock-note');
      expect(el.closest('.field')?.classList.contains('is-locked')).toBe(true);
    }
    expect(lockNote()?.textContent).toBe('Set by 15-year fixed. Choose Custom to change.');
    expect(lockNote()?.hidden).toBe(false);
    // The note sits directly under the rate and term fields.
    expect(input('termYears').closest('.field')?.nextElementSibling).toBe(lockNote());
  });

  it('M1.4: a forced input event on a locked field (e.g. a script) does not unlock it or change the product', () => {
    start(PRESETS);
    choose('f15');
    input('interestRate').dispatchEvent(new Event('input', { bubbles: true }));
    expect(selectedText()).toBe('15-year fixed');
    expect(isLocked('interestRate')).toBe(true);
    expect(input('interestRate').value).toBe('5.75');
  });

  it.each(['homePrice', 'downPayment', 'extraPayment'] as const)(
    'M1.5: changing %s keeps the product and the lock',
    (field) => {
      start(PRESETS);
      choose('f15');
      type(field, '10000');
      expect(selectedText()).toBe('15-year fixed');
      expect(description()).toBe('Lower total interest');
      expect(isLocked('interestRate')).toBe(true);
      expect(isLocked('termYears')).toBe(true);
      expect(input(field).readOnly).toBe(false);
    },
  );

  it('M1.6: choosing Custom unlocks rate and term, keeps 5.75 / 15, removes the note; rate 6 → 2,531.57', () => {
    start(PRESETS);
    enter({ homePrice: '350000', downPayment: '50000' });
    choose('f15');
    choose('');
    expect(selectedText()).toBe('Custom');
    expect(isLocked('interestRate')).toBe(false);
    expect(isLocked('termYears')).toBe(false);
    expect(input('interestRate').value).toBe('5.75');
    expect(input('termYears').value).toBe('15');
    expect(lockNote()?.hidden).toBe(true);
    expect(input('interestRate').getAttribute('aria-describedby') ?? '').not.toContain('field-lock-note');
    expect(root.querySelector('.field.is-locked')).toBeNull();
    type('interestRate', '6');
    expect(result('monthly-payment')).toBe('$2,531.57');
    expect(selectedText()).toBe('Custom');
  });

  it('M1.7: switching from 30-year fixed to 15-year fixed updates the values and the note, and stays locked', () => {
    start(PRESETS);
    choose('f30');
    expect(input('interestRate').value).toBe('6.5');
    expect(lockNote()?.textContent).toBe('Set by 30-year fixed. Choose Custom to change.');
    choose('f15');
    expect(input('interestRate').value).toBe('5.75');
    expect(input('termYears').value).toBe('15');
    expect(isLocked('interestRate')).toBe(true);
    expect(lockNote()?.textContent).toBe('Set by 15-year fixed. Choose Custom to change.');
  });

  it.each([[{}], [{ presets: [] }]])('M1.8: no presets (%j) → no selector, usual field order, editable, no note', (json) => {
    start(json);
    expect(root.querySelector('#field-preset')).toBeNull();
    expect(fieldOrder()).toEqual(['homePrice', 'downPayment', 'interestRate', 'termYears', 'extraPayment']);
    expect(isLocked('interestRate')).toBe(false);
    expect(lockNote()).toBeNull();
    expect(result('monthly-payment')).toBe('$1,798.65');
  });

  it('a locked field keeps its error behaviour out of the way: choosing a product clears a shown rate error', () => {
    start(PRESETS);
    type('interestRate', '31');
    leave('interestRate');
    expect(errorText('interestRate')).toContain('Enter an interest rate');
    choose('f30');
    expect(errorText('interestRate')).toBe('');
    expect(input('interestRate').getAttribute('aria-describedby')).toBe('field-lock-note');
    expect(result('monthly-payment')).not.toBeNull();
  });

  it('preset names and descriptions are plain text, including in the note', () => {
    start({ presets: [{ id: 'x', name: '<b>Bold</b>', ratePercent: 5, termYears: 15, description: '<i>it</i>' }] });
    expect([...select().options].map((o) => o.textContent)).toContain('<b>Bold</b>');
    choose('x');
    expect(description()).toBe('<i>it</i>');
    expect(lockNote()?.textContent).toBe('Set by <b>Bold</b>. Choose Custom to change.');
    expect(root.querySelector('#field-preset-description i, select b, #field-lock-note b')).toBeNull();
  });
});

describe('Error paths inside the running app (L8.19)', () => {
  const E9_TEXT = 'Something went wrong. Your inputs are kept; please try again.';

  it('a rendering failure (the schedule cannot be drawn) shows E9 instead of a half-drawn page', () => {
    start();
    const spy = vi.spyOn(Element.prototype, 'replaceWith').mockImplementation(() => {
      throw new Error('render failure');
    });
    type('interestRate', '5');
    spy.mockRestore();
    expect(resultsText()).toBe(E9_TEXT);
    expect(root.querySelector('.schedule-body')?.textContent).toBe(E9_TEXT);
    expect(input('interestRate').value).toBe('5');
    expect(errorSpy).toHaveBeenCalled();
  });

  it('switching the schedule view fails → E9, not an uncaught error', () => {
    start();
    const spy = vi.spyOn(Element.prototype, 'replaceWith').mockImplementation(() => {
      throw new Error('render failure');
    });
    expect(() => root.querySelector<HTMLButtonElement>('.schedule [data-mode="yearly"]')!.click()).not.toThrow();
    spy.mockRestore();
    expect(resultsText()).toBe(E9_TEXT);
  });

  it('Download CSV fails (e.g. downloads blocked) → E9, not an uncaught error', () => {
    start({}, {
      download: () => {
        throw new Error('download blocked');
      },
    });
    expect(() => root.querySelector<HTMLButtonElement>('.schedule .csv-button')!.click()).not.toThrow();
    expect(resultsText()).toBe(E9_TEXT);
    expect(errorSpy).toHaveBeenCalled();
  });

  it('after an E9, fixing or changing an input brings the results back', () => {
    start({}, {
      download: () => {
        throw new Error('download blocked');
      },
    });
    root.querySelector<HTMLButtonElement>('.schedule .csv-button')!.click();
    type('interestRate', '5');
    expect(result('monthly-payment')).toBe('$1,610.46');
  });
});

describe('Schedule pages and cards (L3.1, L3.6, L3.11–L3.16)', () => {
  const L3 = { homePrice: '300000', downPayment: '0' };
  const jump = (): HTMLSelectElement | null => root.querySelector<HTMLSelectElement>('#schedule-year');
  const chooseYear = (year: number): void => {
    jump()!.value = String(year);
    jump()!.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const clickMode = (mode: 'monthly' | 'yearly'): void =>
    root.querySelector<HTMLButtonElement>(`.schedule [data-mode="${mode}"]`)!.click();
  const cards = (): HTMLElement[] => [...root.querySelectorAll<HTMLElement>('.schedule .schedule-card')];
  const cardData = (card: HTMLElement): Record<string, string> =>
    Object.fromEntries(
      [...card.querySelectorAll('dt')].map((dt) => [dt.textContent ?? '', dt.nextElementSibling?.textContent ?? '']),
    );

  it('L3.1: page 1 of 30 shows payments 1–12 of 360', () => {
    start();
    enter(L3);
    expect(pageRows()).toHaveLength(12);
    expect(pageRows()[0]?.[0]).toBe('1');
    expect(pageRows()[11]?.[0]).toBe('12');
    expect(pagerStatus()).toBe('Page 1 of 30 · payments 1–12 of 360');
  });

  it('L3.11: Previous is unavailable on page 1; Next shows 13–24; Next is unavailable on the last page', () => {
    start();
    enter(L3);
    expect(isUnavailable(pagerButton('prev'))).toBe(true);
    expect(isUnavailable(pagerButton('next'))).toBe(false);
    pagerButton('next')!.click();
    expect(pagerStatus()).toBe('Page 2 of 30 · payments 13–24 of 360');
    expect(pageRows()[0]?.[0]).toBe('13');
    expect(pageRows()[11]?.[0]).toBe('24');
    expect(root.querySelector('.schedule .pager-status')?.getAttribute('aria-live')).toBe('polite');
    expect(root.querySelector('.schedule .schedule-pager')?.getAttribute('aria-label')).toBe('Schedule pages');
    chooseYear(30);
    expect(pagerStatus()).toBe('Page 30 of 30 · payments 349–360 of 360');
    expect(isUnavailable(pagerButton('next'))).toBe(true);
    pagerButton('next')!.click(); // unavailable: nothing happens
    expect(pagerStatus()).toBe('Page 30 of 30 · payments 349–360 of 360');
  });

  it('L3.2: the last row on page 30 is payment 360, November 2056, balance 0.00', () => {
    start();
    enter(L3);
    chooseYear(30);
    expect(pageRows()[11]).toEqual(['360', 'November 2056', '$1,800.09', '$1,791.13', '$8.96', '$0.00', '$0.00']);
  });

  it('L3.12: "Jump to year" lists every loan year with its months; Year 20 shows payments 229–240', () => {
    start();
    enter(L3);
    const options = [...jump()!.options].map((o) => o.textContent);
    expect(options).toHaveLength(30);
    expect(options[0]).toBe('Year 1 (Dec 2026 – Nov 2027)');
    expect(options[19]).toBe('Year 20 (Dec 2045 – Nov 2046)');
    expect(root.querySelector('label[for="schedule-year"]')?.textContent).toBe('Jump to year');
    chooseYear(20);
    expect(pageRows()[0]?.[0]).toBe('229');
    expect(pageRows()[11]?.[0]).toBe('240');
    expect(jump()!.value).toBe('20');
  });

  it('L3.13: page 20 stays when inputs change; a shorter schedule goes to its last page', () => {
    start();
    enter(L3);
    chooseYear(20);
    type('interestRate', '5');
    expect(pagerStatus()).toBe('Page 20 of 30 · payments 229–240 of 360');
    type('termYears', '15');
    expect(pagerStatus()).toBe('Page 15 of 15 · payments 169–180 of 180');
  });

  it('L3.14: switching view goes to page 1, both ways; Jump to year is only in the monthly view', () => {
    start();
    enter(L3);
    chooseYear(5);
    clickMode('yearly');
    expect(pagerStatus()).toBe('Page 1 of 3 · years 1–10 of 30');
    expect(pageRows()).toHaveLength(10);
    expect(jump()?.closest('[hidden]')).not.toBeNull();
    clickMode('monthly');
    expect(pagerStatus()).toBe('Page 1 of 30 · payments 1–12 of 360');
    expect(jump()?.closest('[hidden]')).toBeNull();
  });

  it('L3.3: yearly view pages hold 10 years; page 3 holds years 21–30', () => {
    start();
    enter(L3);
    clickMode('yearly');
    pagerButton('next')!.click();
    pagerButton('next')!.click();
    expect(pagerStatus()).toBe('Page 3 of 3 · years 21–30 of 30');
    expect(pageRows()[0]?.[0]).toBe('21');
    expect(pageRows()[9]?.[0]).toBe('30');
  });

  it('L3.6: a 12-payment loan fits on one page, with no page controls', () => {
    start();
    enter({ homePrice: '1', downPayment: '0', interestRate: '0.001', termYears: '1' });
    expect(pageRows()).toHaveLength(12);
    expect(root.querySelector<HTMLElement>('.schedule .schedule-pager')?.hidden).toBe(true);
  });

  it('L3.15: the current page is also shown as cards with labelled values (shown below 600 px by CSS)', () => {
    start();
    enter(L3);
    expect(cards()).toHaveLength(12);
    expect(cards()[0]?.querySelector('h3')?.textContent).toBe('Payment 1 · December 2026');
    expect(cardData(cards()[0]!)).toEqual({
      Payment: '$1,798.65',
      Principal: '$298.65',
      Interest: '$1,500.00',
      'Extra payment': '$0.00',
      Balance: '$299,701.35',
    });
    pagerButton('next')!.click();
    expect(cards()[0]?.querySelector('h3')?.textContent).toBe('Payment 13 · December 2027');
    clickMode('yearly');
    expect(cards()).toHaveLength(10);
    expect(cards()[0]?.querySelector('h3')?.textContent).toBe('Year 1');
    expect(cardData(cards()[0]!)).toEqual({
      Payment: '$21,583.80',
      Principal: '$3,684.00',
      Interest: '$17,899.80',
      'Extra payment': '$0.00',
      'Ending balance': '$296,316.00',
    });
  });

  it('L3.15: cards and table show the same rows for every page', () => {
    start();
    enter(L3);
    for (let page = 0; page < 3; page++) {
      const fromTable = pageRows().map((row) => row[2]);
      const fromCards = cards().map((card) => cardData(card)['Payment']);
      expect(fromCards).toEqual(fromTable);
      pagerButton('next')!.click();
    }
  });

  it('L3.16: focus stays on Next while paging, also once it becomes unavailable', () => {
    start();
    enter({ homePrice: '300000', downPayment: '0', termYears: '2' });
    const next = pagerButton('next')!;
    next.focus();
    next.click();
    expect(document.activeElement).toBe(next);
    expect(isUnavailable(next)).toBe(true);
    expect(next.disabled).toBe(false); // aria-disabled, so focus is not thrown away
  });

  it('L3.8: an invalid input removes the page controls and the cards too', () => {
    start();
    type('homePrice', 'abc');
    expect(cards()).toHaveLength(0);
    expect(root.querySelector<HTMLElement>('.schedule .schedule-pager')?.hidden).toBe(true);
  });
});

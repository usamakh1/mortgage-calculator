/**
 * Wires config, form, validation, engine and results together.
 * Message timing follows input rule 11 (docs/user-stories.md, Shared definitions):
 * a field's message appears when the field is left, and disappears as soon as the value is
 * valid while typing; the results area switches to E8 immediately on any invalid input.
 */
import { calculateLoan, type CalcOutcome, type LoanInput } from '../engine/amortize';
import { validateInputs, type Field } from '../engine/validate';
import type { ConfigResult } from '../config/schema';
import { MESSAGES, UI_TEXT } from '../messages';
import { createForm, FORM_FIELDS, type Adornment } from './form';
import { createFormatters, toInputText } from './format';
import { createBanner, createFooter, createHeader } from './layout';
import { createResults } from './results';
import { createSchedule } from './schedule';
import { createPresetSelector } from './presets';
import { downloadText } from './csv';

export interface AppDependencies {
  calculate?: (input: LoanInput) => CalcOutcome;
  today?: () => Date;
  /** Saves a file; replaced in tests. */
  download?: (filename: string, text: string) => void;
}

export interface AppHandle {
  /** Shows E9 in the results area; used by the global error handlers. */
  showUnexpectedError(error: unknown): void;
}

export function createApp(root: HTMLElement, configResult: ConfigResult, deps: AppDependencies = {}): AppHandle {
  const { config, notice } = configResult;
  const calculate = deps.calculate ?? calculateLoan;
  const today = deps.today ?? (() => new Date());
  const download = deps.download ?? downloadText;
  const format = createFormatters(config.currency, config.locale);

  const header = createHeader(config.officeName);

  // Currency symbol from the config currency and locale ("$" before, "€" after in de-DE).
  const money: Adornment =
    format.currency.position === 'prefix' ? { prefix: format.currency.symbol } : { suffix: format.currency.symbol };
  const form = createForm(
    FORM_FIELDS,
    {
      homePrice: toInputText(config.defaults.homePrice),
      downPayment: toInputText(config.defaults.downPayment),
      interestRate: toInputText(config.defaults.ratePercent),
      termYears: toInputText(config.defaults.termYears),
      // A default of 0 shows as an empty, optional field (config schema, Q11).
      extraPayment: config.defaults.extraPayment === 0 ? '' : toInputText(config.defaults.extraPayment),
    },
    {
      homePrice: money,
      downPayment: money,
      extraPayment: money,
      interestRate: { suffix: UI_TEXT.percentSuffix },
      termYears: { suffix: UI_TEXT.yearsSuffix },
    },
  );
  const formSection = document.createElement('section');
  formSection.className = 'card form-section';
  formSection.setAttribute('aria-labelledby', 'form-heading');
  const formHeading = document.createElement('h2');
  formHeading.id = 'form-heading';
  formHeading.className = 'card-title';
  formHeading.textContent = UI_TEXT.formHeading;
  formSection.append(formHeading, form.element);

  const results = createResults(format);

  const main = document.createElement('main');
  main.className = 'layout';
  // showUnexpectedError is defined below; it is only called later, from a click.
  const schedule = createSchedule(format, download, (error) => showUnexpectedError(error));
  main.append(formSection, results.element, schedule.element);

  const banner = createBanner(notice);
  root.replaceChildren(header, ...(banner ? [banner] : []), main, createFooter(config.officeName, config.disclaimer));

  /** Fields whose message may show: left at least once since they were last valid. */
  const touched = new Set<Field>();

  /** Replaces every result and the whole schedule with one message (L8.15, L3.8). */
  const showMessage = (text: string): void => {
    results.showMessage(text);
    schedule.showMessage(text);
  };

  const showUnexpectedError = (error: unknown): void => {
    console.error('Unexpected error', error);
    showMessage(MESSAGES.E9);
  };

  const update = (): void => {
    try {
      const outcome = validateInputs(form.read(), config.limits, config.locale);
      for (const { field } of FORM_FIELDS) {
        const error = outcome.ok ? undefined : outcome.errors[field];
        if (!error) {
          touched.delete(field);
          form.setError(field, null);
        } else if (touched.has(field)) {
          form.setError(field, error.text);
        }
      }
      if (!outcome.ok) {
        showMessage(MESSAGES.E8);
        return;
      }

      const calc = calculate({ ...outcome.values, today: today() });
      if (!calc.ok) {
        if (calc.error === 'E10') console.error('Calculation returned E10', outcome.values);
        showMessage(calc.error === 'E7' ? MESSAGES.E7 : MESSAGES.E10);
        return;
      }
      if (!results.showResult(calc.result, outcome.values.principalCents, outcome.values.extraMonthlyCents)) {
        console.error('Calculation produced a value that is not a safe amount', calc.result);
        showMessage(MESSAGES.E10);
        return;
      }
      schedule.show(calc.result.rows);
    } catch (error) {
      showUnexpectedError(error);
    }
  };

  // Loan product selector (M1): fills rate and term, then recalculates.
  const presetSelector = createPresetSelector(config.presets, (preset) => {
    const rate = form.inputs.interestRate;
    const term = form.inputs.termYears;
    if (rate) rate.value = toInputText(preset.ratePercent);
    if (term) term.value = toInputText(preset.termYears);
    update();
  });
  if (presetSelector) form.element.prepend(presetSelector.element);

  form.element.addEventListener('input', (event) => {
    // Editing rate or term means the figures no longer match the product (M1.4);
    // price, down payment and extra payment are not part of a preset (M1.5).
    const target = event.target;
    if (target === form.inputs.interestRate || target === form.inputs.termYears) presetSelector?.markCustom();
    update();
  });
  form.element.addEventListener('focusout', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    const field = target.name as Field;
    touched.add(field);
    // E3 belongs to the down payment but is caused by either field, so leaving the
    // home price also reveals it.
    if (field === 'homePrice') touched.add('downPayment');
    update();
  });

  update();
  return { showUnexpectedError };
}

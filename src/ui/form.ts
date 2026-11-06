/**
 * The loan form. Builds the inputs and shows per-field messages with the ARIA from L8.18.
 * All text comes from messages.ts; values are read as raw strings and parsed by validate.ts.
 */
import type { Field, RawInputs } from '../engine/validate';
import { UI_TEXT } from '../messages';

export interface FieldSpec {
  field: Field;
  label: string;
  inputMode: 'decimal' | 'numeric';
}

/** Fields shown in 5a. Extra payment is added in 5c. */
export const FORM_FIELDS: readonly FieldSpec[] = [
  { field: 'homePrice', label: UI_TEXT.homePrice, inputMode: 'decimal' },
  { field: 'downPayment', label: UI_TEXT.downPayment, inputMode: 'decimal' },
  { field: 'interestRate', label: UI_TEXT.interestRate, inputMode: 'decimal' },
  { field: 'termYears', label: UI_TEXT.termYears, inputMode: 'numeric' },
];

export interface FormView {
  element: HTMLFormElement;
  inputs: Partial<Record<Field, HTMLInputElement>>;
  /** Current raw text of every field; fields not on the form read as "". */
  read(): RawInputs;
  /** Shows (text) or clears (null) the message under a field. */
  setError(field: Field, text: string | null): void;
}

/** Visual text before or after an input, e.g. "$" or "years". Hidden from screen readers: the label says it. */
export interface Adornment {
  prefix?: string;
  suffix?: string;
}

export const inputId = (field: Field): string => `field-${field}`;
export const errorId = (field: Field): string => `field-${field}-error`;

export function createForm(
  specs: readonly FieldSpec[],
  initial: Partial<Record<Field, string>>,
  adornments: Partial<Record<Field, Adornment>> = {},
): FormView {
  const form = document.createElement('form');
  form.className = 'loan-form';
  form.noValidate = true;
  form.addEventListener('submit', (event) => event.preventDefault()); // results update live; Enter does nothing

  const inputs: Partial<Record<Field, HTMLInputElement>> = {};
  const errors: Partial<Record<Field, HTMLElement>> = {};
  const wrappers: Partial<Record<Field, HTMLElement>> = {};

  for (const spec of specs) {
    const wrapper = document.createElement('div');
    wrapper.className = 'field';

    const label = document.createElement('label');
    label.htmlFor = inputId(spec.field);
    label.textContent = spec.label;

    const input = document.createElement('input');
    input.id = inputId(spec.field);
    input.name = spec.field;
    input.type = 'text'; // not type=number: it rejects "1,500,000" and behaves differently per browser
    input.inputMode = spec.inputMode;
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.value = initial[spec.field] ?? '';

    // Always present, so screen readers announce changes (aria-live).
    const error = document.createElement('p');
    error.id = errorId(spec.field);
    error.className = 'field-error';
    error.setAttribute('aria-live', 'polite');

    // Input and its adornments share one bordered box (.input-group).
    const group = document.createElement('div');
    group.className = 'input-group';
    const { prefix, suffix } = adornments[spec.field] ?? {};
    const adornment = (text: string, side: 'prefix' | 'suffix'): HTMLElement => {
      const span = document.createElement('span');
      span.className = `adornment adornment-${side}`;
      span.setAttribute('aria-hidden', 'true');
      span.textContent = text;
      return span;
    };
    if (prefix) group.append(adornment(prefix, 'prefix'));
    group.append(input);
    if (suffix) group.append(adornment(suffix, 'suffix'));

    wrapper.append(label, group, error);
    form.append(wrapper);
    inputs[spec.field] = input;
    errors[spec.field] = error;
    wrappers[spec.field] = wrapper;
  }

  return {
    element: form,
    inputs,
    read: () => ({
      homePrice: inputs.homePrice?.value ?? '',
      downPayment: inputs.downPayment?.value ?? '',
      interestRate: inputs.interestRate?.value ?? '',
      termYears: inputs.termYears?.value ?? '',
      extraPayment: inputs.extraPayment?.value ?? '',
    }),
    setError(field, text) {
      const input = inputs[field];
      const error = errors[field];
      const wrapper = wrappers[field];
      if (!input || !error || !wrapper) return;
      if (text === null) {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
        wrapper.classList.remove('has-error');
        error.replaceChildren();
        return;
      }
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errorId(field));
      wrapper.classList.add('has-error');
      const marker = document.createElement('span');
      marker.className = 'error-marker';
      marker.setAttribute('aria-hidden', 'true');
      marker.textContent = UI_TEXT.errorMarker;
      error.replaceChildren(marker, document.createTextNode(text));
    },
  };
}

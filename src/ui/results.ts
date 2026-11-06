/**
 * The results area. Shows either the calculated figures or exactly one message (E7–E10),
 * never both, so nothing from earlier inputs stays on screen (L8.15).
 */
import type { LoanResult } from '../engine/amortize';
import { UI_TEXT } from '../messages';
import type { Formatters } from './format';

export interface ResultsView {
  element: HTMLElement;
  /** Renders the figures. Returns false (and renders nothing) if any value is unsafe (L8.20). */
  showResult(result: LoanResult, principalCents: number): boolean;
  showMessage(text: string): void;
}

const isSafeAmount = (value: number): boolean => Number.isSafeInteger(value) && value >= 0;

export function createResults(format: Formatters): ResultsView {
  const section = document.createElement('section');
  section.className = 'results';
  section.setAttribute('aria-labelledby', 'results-heading');

  const heading = document.createElement('h2');
  heading.id = 'results-heading';
  heading.textContent = UI_TEXT.resultsHeading;

  const body = document.createElement('div');
  body.className = 'results-body';
  section.append(heading, body);

  const item = (label: string, value: string, name: string, note?: string): HTMLElement => {
    const wrapper = document.createElement('div');
    wrapper.className = `result result-${name}`;
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.dataset.result = name;
    dd.textContent = value;
    wrapper.append(dt, dd);
    if (note) {
      const small = document.createElement('dd');
      small.className = 'result-note';
      small.textContent = note;
      wrapper.append(small);
    }
    return wrapper;
  };

  return {
    element: section,
    showResult(result, principalCents) {
      const amounts = [principalCents, result.monthlyPaymentCents, result.totalInterestCents, result.totalPaidCents];
      const dates = [result.payoff.year, result.payoff.month];
      if (!amounts.every(isSafeAmount) || !dates.every((n) => Number.isSafeInteger(n) && n > 0)) {
        return false;
      }
      const list = document.createElement('dl');
      list.className = 'result-list';
      list.append(
        item(UI_TEXT.monthlyPayment, format.money(result.monthlyPaymentCents), 'monthly-payment', UI_TEXT.monthlyPaymentNote),
        item(UI_TEXT.loanAmount, format.money(principalCents), 'loan-amount'),
        item(UI_TEXT.totalInterest, format.money(result.totalInterestCents), 'total-interest'),
        item(UI_TEXT.totalPaid, format.money(result.totalPaidCents), 'total-paid'),
        item(UI_TEXT.payoffDate, format.month(result.payoff), 'payoff-date'),
      );
      body.replaceChildren(list);
      return true;
    },
    showMessage(text) {
      const message = document.createElement('p');
      message.className = 'results-message';
      message.setAttribute('role', 'status');
      message.textContent = text;
      body.replaceChildren(message);
    },
  };
}

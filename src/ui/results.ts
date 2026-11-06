/**
 * The results area. Shows either the calculated figures or exactly one message (E7–E10),
 * never both, so nothing from earlier inputs stays on screen (L8.15).
 */
import type { LoanResult } from '../engine/amortize';
import { UI_TEXT } from '../messages';
import { principalInterestShares, type Formatters } from './format';

export interface ResultsView {
  element: HTMLElement;
  /** Renders the figures. Returns false (and renders nothing) if any value is unsafe (L8.20). */
  showResult(result: LoanResult, principalCents: number): boolean;
  showMessage(text: string): void;
}

const isSafeAmount = (value: number): boolean => Number.isSafeInteger(value) && value >= 0;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function createResults(format: Formatters): ResultsView {
  const section = el('section', 'card results');
  section.setAttribute('aria-labelledby', 'results-heading');
  const heading = el('h2', 'card-title', UI_TEXT.resultsHeading);
  heading.id = 'results-heading';
  const body = el('div', 'results-body');
  section.append(heading, body);

  /** One labelled figure. `name` becomes data-result, which the tests read. */
  const stat = (label: string, value: string, name: string): HTMLElement => {
    const wrapper = el('div', `stat stat-${name}`);
    const dt = el('dt', 'stat-label', label);
    const dd = el('dd', 'stat-value amount', value);
    dd.dataset.result = name;
    wrapper.append(dt, dd);
    return wrapper;
  };

  /** Principal vs. interest of total paid. Text labels carry the meaning; the bar only illustrates it. */
  const breakdown = (principalCents: number, interestCents: number): HTMLElement | null => {
    const shares = principalInterestShares(principalCents, interestCents);
    if (!shares) return null;
    const figure = el('figure', 'breakdown');
    const caption = el('figcaption', 'breakdown-title', UI_TEXT.breakdownHeading);

    const bar = el('div', 'breakdown-bar');
    bar.setAttribute('aria-hidden', 'true');
    const principalPart = el('span', 'breakdown-segment segment-principal');
    principalPart.style.width = `${shares.principal}%`;
    const interestPart = el('span', 'breakdown-segment segment-interest');
    interestPart.style.width = `${shares.interest}%`;
    bar.append(principalPart, interestPart);

    const legend = el('dl', 'breakdown-legend');
    const entry = (label: string, cents: number, share: number, kind: string): HTMLElement => {
      const row = el('div', `legend-item legend-${kind}`);
      const dt = el('dt');
      dt.append(el('span', `legend-swatch segment-${kind}`), document.createTextNode(label));
      dt.firstElementChild?.setAttribute('aria-hidden', 'true');
      const dd = el('dd', 'amount');
      dd.dataset.share = kind;
      dd.textContent = `${format.money(cents)} (${format.percent(share / 100)})`;
      row.append(dt, dd);
      return row;
    };
    legend.append(
      entry(UI_TEXT.principal, principalCents, shares.principal, 'principal'),
      entry(UI_TEXT.interest, interestCents, shares.interest, 'interest'),
    );
    figure.append(caption, bar, legend);
    return figure;
  };

  return {
    element: section,
    showResult(result, principalCents) {
      const amounts = [principalCents, result.monthlyPaymentCents, result.totalInterestCents, result.totalPaidCents];
      const dates = [result.payoff.year, result.payoff.month];
      if (!amounts.every(isSafeAmount) || !dates.every((n) => Number.isSafeInteger(n) && n > 0)) {
        return false;
      }

      const hero = el('div', 'hero');
      const heroList = el('dl', 'hero-list');
      const heroLabel = el('dt', 'hero-label', UI_TEXT.monthlyPayment);
      const heroValue = el('dd', 'hero-value amount', format.money(result.monthlyPaymentCents));
      heroValue.dataset.result = 'monthly-payment';
      const heroNote = el('dd', 'hero-note', UI_TEXT.monthlyPaymentNote);
      heroList.append(heroLabel, heroValue, heroNote);
      hero.append(heroList);

      const grid = el('dl', 'stat-grid');
      grid.append(
        stat(UI_TEXT.loanAmount, format.money(principalCents), 'loan-amount'),
        stat(UI_TEXT.totalInterest, format.money(result.totalInterestCents), 'total-interest'),
        stat(UI_TEXT.totalPaid, format.money(result.totalPaidCents), 'total-paid'),
        stat(UI_TEXT.payoffDate, format.month(result.payoff), 'payoff-date'),
      );

      const parts: HTMLElement[] = [hero, grid];
      const chart = breakdown(principalCents, result.totalInterestCents);
      if (chart) parts.push(chart);
      body.replaceChildren(...parts);
      return true;
    },
    showMessage(text) {
      const message = el('p', 'results-message', text);
      message.setAttribute('role', 'status');
      body.replaceChildren(message);
    },
  };
}

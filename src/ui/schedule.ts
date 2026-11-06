/**
 * Amortization schedule (L3): monthly table by default, a yearly toggle, and a CSV download that
 * always holds monthly rows. On invalid input the whole schedule is replaced by a message (L3.8).
 */
import { toYearly, type ScheduleRow } from '../engine/amortize';
import { UI_TEXT } from '../messages';
import { CSV_FILENAME, scheduleCsv } from './csv';
import type { Formatters } from './format';

export type ScheduleMode = 'monthly' | 'yearly';

export interface ScheduleView {
  element: HTMLElement;
  show(rows: readonly ScheduleRow[]): void;
  showMessage(text: string): void;
}

export function createSchedule(format: Formatters, download: (filename: string, text: string) => void): ScheduleView {
  let mode: ScheduleMode = 'monthly';
  let rows: readonly ScheduleRow[] = [];

  const section = document.createElement('section');
  section.className = 'card schedule';
  section.setAttribute('aria-labelledby', 'schedule-heading');

  const head = document.createElement('div');
  head.className = 'schedule-head';
  const heading = document.createElement('h2');
  heading.id = 'schedule-heading';
  heading.className = 'card-title';
  heading.textContent = UI_TEXT.scheduleHeading;

  const toolbar = document.createElement('div');
  toolbar.className = 'schedule-toolbar';

  const toggle = document.createElement('div');
  toggle.className = 'segmented';
  toggle.setAttribute('role', 'group');
  toggle.setAttribute('aria-label', UI_TEXT.scheduleViewLabel);
  const modeButton = (value: ScheduleMode, label: string): HTMLButtonElement => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.mode = value;
    button.textContent = label;
    button.addEventListener('click', () => {
      mode = value;
      render();
    });
    return button;
  };
  const monthlyButton = modeButton('monthly', UI_TEXT.monthly);
  const yearlyButton = modeButton('yearly', UI_TEXT.yearly);
  toggle.append(monthlyButton, yearlyButton);

  const csvButton = document.createElement('button');
  csvButton.type = 'button';
  csvButton.className = 'csv-button';
  csvButton.textContent = UI_TEXT.downloadCsv;
  // Always the monthly rows, whatever the view (L3.5).
  csvButton.addEventListener('click', () => download(CSV_FILENAME, scheduleCsv(rows)));

  toolbar.append(toggle, csvButton);
  head.append(heading, toolbar);

  const body = document.createElement('div');
  body.className = 'schedule-body';
  section.append(head, body);

  const cell = (tag: 'td' | 'th', text: string): HTMLTableCellElement => {
    const node = document.createElement(tag);
    node.textContent = text;
    return node;
  };

  /** The table currently on screen; updates keep its header and scroll region and swap only the body. */
  let current: { mode: ScheduleMode; frame: HTMLElement; region: HTMLElement; tbody: HTMLTableSectionElement } | null =
    null;

  /** Shows a fade on the right edge while more columns are hidden there (narrow screens). */
  function updateScrollHint(frame: HTMLElement, region: HTMLElement): void {
    const moreRight = region.scrollLeft + region.clientWidth < region.scrollWidth - 1;
    frame.classList.toggle('more-right', moreRight);
  }

  function buildTable(
    caption: string,
    headers: string[],
  ): { frame: HTMLElement; region: HTMLElement; tbody: HTMLTableSectionElement } {
    const frame = document.createElement('div');
    frame.className = 'table-frame';
    // A focusable, labelled region so keyboard users can scroll it (L10.3).
    const region = document.createElement('div');
    region.className = 'table-scroll';
    region.tabIndex = 0;
    region.setAttribute('role', 'region');
    region.setAttribute('aria-label', UI_TEXT.scheduleRegionLabel);

    const tableEl = document.createElement('table');
    tableEl.className = 'data-table';
    tableEl.dataset.mode = mode; // monthly: column 2 is a date (left-aligned); yearly: an amount
    const captionEl = document.createElement('caption');
    captionEl.className = 'visually-hidden';
    captionEl.textContent = caption;

    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    for (const header of headers) {
      const th = cell('th', header);
      th.scope = 'col';
      headRow.append(th);
    }
    thead.append(headRow);
    const tbody = document.createElement('tbody');
    tableEl.append(captionEl, thead, tbody);
    region.append(tableEl);
    frame.append(region);
    region.addEventListener('scroll', () => updateScrollHint(frame, region), { passive: true });
    if (typeof ResizeObserver === 'function') {
      new ResizeObserver(() => updateScrollHint(frame, region)).observe(region);
    }
    return { frame, region, tbody };
  }

  /**
   * Builds a new body off-screen and swaps it in with one DOM operation. Measured in Chromium with
   * 480 rows: updating 3,360 attached cells one by one took ~135 ms per keystroke; building a
   * detached body and swapping it takes a few milliseconds.
   */
  function fillBody(oldBody: HTMLTableSectionElement, data: string[][]): HTMLTableSectionElement {
    const tbody = document.createElement('tbody');
    for (const values of data) {
      const tr = document.createElement('tr');
      for (const value of values) tr.append(cell('td', value));
      tbody.append(tr);
    }
    oldBody.replaceWith(tbody);
    return tbody;
  }

  function table(caption: string, headers: string[], data: string[][]): void {
    if (!current || current.mode !== mode || !current.frame.isConnected) {
      current = { mode, ...buildTable(caption, headers) };
      body.replaceChildren(current.frame);
    }
    current.tbody = fillBody(current.tbody, data);
    updateScrollHint(current.frame, current.region);
  }

  function render(): void {
    toolbar.hidden = false;
    monthlyButton.setAttribute('aria-pressed', String(mode === 'monthly'));
    yearlyButton.setAttribute('aria-pressed', String(mode === 'yearly'));

    if (mode === 'monthly') {
      table(
        UI_TEXT.scheduleCaptionMonthly,
        [
          UI_TEXT.colPaymentNumber,
          UI_TEXT.colDate,
          UI_TEXT.colPayment,
          UI_TEXT.colPrincipal,
          UI_TEXT.colInterest,
          UI_TEXT.colExtra,
          UI_TEXT.colBalance,
        ],
        rows.map((row) => [
          String(row.number),
          format.month(row),
          format.money(row.paymentCents),
          format.money(row.principalCents),
          format.money(row.interestCents),
          format.money(row.extraCents),
          format.money(row.balanceCents),
        ]),
      );
      return;
    }

    table(
      UI_TEXT.scheduleCaptionYearly,
      [UI_TEXT.colYear, UI_TEXT.colPayment, UI_TEXT.colPrincipal, UI_TEXT.colInterest, UI_TEXT.colExtra, UI_TEXT.colEndBalance],
      toYearly([...rows]).map((year) => [
        String(year.year),
        format.money(year.paymentCents),
        format.money(year.principalCents),
        format.money(year.interestCents),
        format.money(year.extraCents),
        format.money(year.endBalanceCents),
      ]),
    );
  }


  return {
    element: section,
    show(newRows) {
      rows = newRows;
      render();
    },
    showMessage(text) {
      rows = [];
      toolbar.hidden = true; // nothing to switch or download
      const message = document.createElement('p');
      message.className = 'results-message';
      message.textContent = text;
      body.replaceChildren(message);
      current = null; // the old rows are gone from the screen (L3.8)
    },
  };
}

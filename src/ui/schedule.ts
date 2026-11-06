/**
 * Amortization schedule (L3). Monthly view by default (12 payments, one loan year, per page) and a
 * yearly view (10 years per page). The current page is drawn twice: as a table and as cards. CSS
 * shows the cards below 600 px and the table from 600 px (L3.15). The CSV always holds every
 * monthly payment (L3.4, L3.5). On invalid input the whole schedule is replaced by a message (L3.8).
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

const PAGE_SIZE: Record<ScheduleMode, number> = { monthly: 12, yearly: 10 };

/** One schedule row, ready to draw as a table row or as a card. */
interface DisplayRow {
  cells: string[];
  cardTitle: string;
  /** [label, value] pairs for the card. */
  cardFields: [string, string][];
}

export function createSchedule(
  format: Formatters,
  download: (filename: string, text: string) => void,
  /** Called when a click handler fails, so the app can show E9 instead of failing silently. */
  onError: (error: unknown) => void,
): ScheduleView {
  let mode: ScheduleMode = 'monthly';
  let rows: readonly ScheduleRow[] = [];
  let page = 0; // 0-based

  /** Runs a click handler; a failure shows E9 instead of an uncaught error. */
  const guarded = (handler: () => void) => () => {
    try {
      handler();
    } catch (error) {
      onError(error);
    }
  };

  const section = document.createElement('section');
  section.className = 'card schedule';
  section.setAttribute('aria-labelledby', 'schedule-heading');

  // ----- head: title, Monthly/Yearly, Download CSV -----
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
    button.addEventListener(
      'click',
      guarded(() => {
        if (mode !== value) page = 0; // a different view starts at page 1 (L3.14)
        mode = value;
        render();
      }),
    );
    return button;
  };
  const monthlyButton = modeButton('monthly', UI_TEXT.monthly);
  const yearlyButton = modeButton('yearly', UI_TEXT.yearly);
  toggle.append(monthlyButton, yearlyButton);

  const csvButton = document.createElement('button');
  csvButton.type = 'button';
  csvButton.className = 'csv-button';
  csvButton.textContent = UI_TEXT.downloadCsv;
  // Always every monthly payment, whatever the view or page (L3.4, L3.5).
  csvButton.addEventListener(
    'click',
    guarded(() => download(CSV_FILENAME, scheduleCsv(rows))),
  );
  toolbar.append(toggle, csvButton);
  head.append(heading, toolbar);

  // ----- body: table + cards, or a message -----
  const body = document.createElement('div');
  body.className = 'schedule-body';

  // ----- page controls (kept in place, so keyboard focus is never lost) -----
  const pager = document.createElement('nav');
  pager.className = 'schedule-pager';
  pager.setAttribute('aria-label', UI_TEXT.schedulePages);
  pager.hidden = true;
  const pageButton = (which: 'prev' | 'next', label: string): HTMLButtonElement => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.page = which;
    button.textContent = label;
    button.addEventListener(
      'click',
      guarded(() => {
        // aria-disabled (not disabled) keeps focus on the button at the first/last page (L3.16).
        if (button.getAttribute('aria-disabled') === 'true') return;
        page += which === 'next' ? 1 : -1;
        render();
      }),
    );
    return button;
  };
  const prevButton = pageButton('prev', UI_TEXT.previousPage);
  const nextButton = pageButton('next', UI_TEXT.nextPage);
  const status = document.createElement('p');
  status.className = 'pager-status';
  status.setAttribute('aria-live', 'polite');

  const jumpWrapper = document.createElement('div');
  jumpWrapper.className = 'pager-jump';
  const jumpLabel = document.createElement('label');
  jumpLabel.htmlFor = 'schedule-year';
  jumpLabel.textContent = UI_TEXT.jumpToYear;
  const jumpSelect = document.createElement('select');
  jumpSelect.id = 'schedule-year';
  jumpSelect.addEventListener(
    'change',
    guarded(() => {
      page = Number(jumpSelect.value) - 1;
      render();
    }),
  );
  jumpWrapper.append(jumpLabel, jumpSelect);
  pager.append(prevButton, status, nextButton, jumpWrapper);

  section.append(head, body, pager);

  // ----- drawing -----
  const cell = (tag: 'td' | 'th', text: string): HTMLTableCellElement => {
    const node = document.createElement(tag);
    node.textContent = text;
    return node;
  };

  /** Shows a fade on the right edge while more columns are hidden there (narrow tablets). */
  function updateScrollHint(frame: HTMLElement, region: HTMLElement): void {
    const moreRight = region.scrollLeft + region.clientWidth < region.scrollWidth - 1;
    frame.classList.toggle('more-right', moreRight);
  }

  /** The table on screen; updates keep its header and scroll position and swap only the body. */
  let current: { mode: ScheduleMode; frame: HTMLElement; region: HTMLElement; tbody: HTMLTableSectionElement } | null =
    null;
  const cardList = document.createElement('ul');
  cardList.className = 'schedule-cards';

  function buildTable(caption: string, headers: string[]): NonNullable<typeof current> {
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
    return { mode, frame, region, tbody };
  }

  function displayRows(): { headers: string[]; caption: string; unit: 'payments' | 'years'; list: DisplayRow[] } {
    if (mode === 'monthly') {
      const labels = [UI_TEXT.colPayment, UI_TEXT.colPrincipal, UI_TEXT.colInterest, UI_TEXT.colExtra, UI_TEXT.colBalance];
      return {
        caption: UI_TEXT.scheduleCaptionMonthly,
        unit: 'payments',
        headers: [UI_TEXT.colPaymentNumber, UI_TEXT.colDate, ...labels],
        list: rows.map((row) => {
          const amounts = [row.paymentCents, row.principalCents, row.interestCents, row.extraCents, row.balanceCents].map(
            format.money,
          );
          const date = format.month(row);
          return {
            cells: [String(row.number), date, ...amounts],
            cardTitle: UI_TEXT.paymentCardTitle(row.number, date),
            cardFields: labels.map((label, index): [string, string] => [label, amounts[index] ?? '']),
          };
        }),
      };
    }
    const labels = [UI_TEXT.colPayment, UI_TEXT.colPrincipal, UI_TEXT.colInterest, UI_TEXT.colExtra, UI_TEXT.colEndBalance];
    return {
      caption: UI_TEXT.scheduleCaptionYearly,
      unit: 'years',
      headers: [UI_TEXT.colYear, ...labels],
      list: toYearly([...rows]).map((year) => {
        const amounts = [year.paymentCents, year.principalCents, year.interestCents, year.extraCents, year.endBalanceCents].map(
          format.money,
        );
        return {
          cells: [String(year.year), ...amounts],
          cardTitle: UI_TEXT.yearCardTitle(year.year),
          cardFields: labels.map((label, index): [string, string] => [label, amounts[index] ?? '']),
        };
      }),
    };
  }

  function card(row: DisplayRow): HTMLLIElement {
    const item = document.createElement('li');
    item.className = 'schedule-card';
    const title = document.createElement('h3');
    title.textContent = row.cardTitle;
    const list = document.createElement('dl');
    for (const [label, value] of row.cardFields) {
      const dt = document.createElement('dt');
      dt.textContent = label;
      const dd = document.createElement('dd');
      dd.textContent = value;
      list.append(dt, dd);
    }
    item.append(title, list);
    return item;
  }

  /** "Jump to year" options, one per loan year, e.g. "Year 1 (Dec 2026 – Nov 2027)". */
  let jumpKey = '';
  function updateJump(pages: number): void {
    const first = rows[0];
    const key = `${rows.length}:${first?.year}-${first?.month}`;
    if (key !== jumpKey) {
      jumpKey = key;
      const options: HTMLOptionElement[] = [];
      for (let index = 0; index < pages; index++) {
        const from = rows[index * 12];
        const to = rows[Math.min(rows.length, (index + 1) * 12) - 1];
        if (!from || !to) continue;
        const option = document.createElement('option');
        option.value = String(index + 1);
        option.textContent = UI_TEXT.yearOption(index + 1, format.shortMonth(from), format.shortMonth(to));
        options.push(option);
      }
      jumpSelect.replaceChildren(...options);
    }
    jumpSelect.value = String(page + 1);
  }

  function render(): void {
    toolbar.hidden = false;
    monthlyButton.setAttribute('aria-pressed', String(mode === 'monthly'));
    yearlyButton.setAttribute('aria-pressed', String(mode === 'yearly'));

    const { headers, caption, unit, list } = displayRows();
    const size = PAGE_SIZE[mode];
    const pages = Math.max(1, Math.ceil(list.length / size));
    page = Math.min(Math.max(page, 0), pages - 1); // a shorter schedule goes to its last page (L3.13)
    const from = page * size;
    const shown = list.slice(from, from + size);

    // Table (600 px and wider)
    if (!current || current.mode !== mode || !current.frame.isConnected) {
      current = buildTable(caption, headers);
    }
    const tbody = document.createElement('tbody');
    for (const row of shown) {
      const tr = document.createElement('tr');
      for (const value of row.cells) tr.append(cell('td', value));
      tbody.append(tr);
    }
    current.tbody.replaceWith(tbody);
    current.tbody = tbody;

    // Cards (below 600 px)
    cardList.replaceChildren(...shown.map(card));

    if (body.firstChild !== current.frame || body.lastChild !== cardList) {
      body.replaceChildren(current.frame, cardList);
    }
    updateScrollHint(current.frame, current.region);

    // Page controls (only when there is more than one page)
    pager.hidden = pages <= 1;
    prevButton.setAttribute('aria-disabled', String(page === 0));
    nextButton.setAttribute('aria-disabled', String(page === pages - 1));
    status.textContent = UI_TEXT.pageStatus(page + 1, pages, unit, from + 1, from + shown.length, list.length);
    jumpWrapper.hidden = mode !== 'monthly';
    if (mode === 'monthly') updateJump(pages);
  }

  return {
    element: section,
    show(newRows) {
      rows = newRows;
      render(); // keeps the page if it still exists (L3.13)
    },
    showMessage(text) {
      rows = [];
      toolbar.hidden = true; // nothing to switch or download
      pager.hidden = true;
      const message = document.createElement('p');
      message.className = 'results-message';
      message.textContent = text;
      body.replaceChildren(message);
      cardList.replaceChildren();
      current = null; // the old rows are gone from the screen (L3.8)
    },
  };
}

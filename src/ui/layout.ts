/** Page chrome: config banner (A4) and footer (A3). All config text is set with textContent only (A3.2). */
import type { ConfigNotice } from '../config/schema';
import { APP_TITLE, UI_TEXT } from '../messages';

const SVG_NS = 'http://www.w3.org/2000/svg';

/** Small inline house mark (no image request, A5.4). Decorative. */
function brandMark(): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'brand-mark');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', 'M12 3.2 2.8 10.4a1 1 0 0 0 1.2 1.6l.9-.7V19a2 2 0 0 0 2 2h3.6v-5.4h3v5.4H17a2 2 0 0 0 2-2v-7.7l.9.7a1 1 0 0 0 1.2-1.6L12 3.2Z');
  svg.append(path);
  return svg;
}

/** App name, intro and (when configured) the office name, as plain text. */
export function createHeader(officeName: string | null): HTMLElement {
  const header = document.createElement('header');
  header.className = 'site-header';

  const brand = document.createElement('div');
  brand.className = 'brand';
  const title = document.createElement('h1');
  title.textContent = APP_TITLE;
  brand.append(brandMark(), title);
  if (officeName) {
    const office = document.createElement('p');
    office.className = 'header-office';
    office.textContent = officeName;
    brand.append(office);
  }

  const intro = document.createElement('p');
  intro.className = 'intro';
  intro.textContent = UI_TEXT.intro;
  header.append(brand, intro);
  return header;
}

export function createBanner(notice: ConfigNotice | null): HTMLElement | null {
  if (!notice) return null;
  const banner = document.createElement('div');
  banner.className = 'config-banner';
  banner.setAttribute('role', 'status');
  banner.dataset.notice = notice.id;

  const text = document.createElement('p');
  text.textContent = notice.text;

  const dismiss = document.createElement('button');
  dismiss.type = 'button';
  dismiss.className = 'banner-dismiss';
  dismiss.textContent = UI_TEXT.dismiss;
  dismiss.addEventListener('click', () => banner.remove());

  banner.append(text, dismiss);
  return banner;
}

export function createFooter(officeName: string | null, disclaimer: string): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  if (officeName) {
    const office = document.createElement('p');
    office.className = 'office-name';
    office.textContent = officeName;
    footer.append(office);
  }
  const text = document.createElement('p');
  text.className = 'disclaimer';
  text.textContent = disclaimer;
  footer.append(text);
  return footer;
}

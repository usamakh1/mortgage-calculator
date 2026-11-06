/** Page chrome: config banner (A4) and footer (A3). All config text is set with textContent only (A3.2). */
import type { ConfigNotice } from '../config/schema';
import { UI_TEXT } from '../messages';

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

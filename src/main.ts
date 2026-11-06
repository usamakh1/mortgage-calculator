import { APP_TITLE } from './messages';

const app = document.querySelector<HTMLElement>('#app');
if (app) {
  const heading = document.createElement('h1');
  heading.textContent = APP_TITLE;
  app.append(heading);
}

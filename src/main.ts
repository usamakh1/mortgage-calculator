import './ui/styles.css';
import { loadConfig } from './config/loadConfig';
import { validateConfig } from './config/schema';
import { createApp, installGlobalErrorHandlers } from './ui/app';

const root = document.querySelector<HTMLElement>('#app');

if (root) {
  // loadConfig never rejects; the catch is defence in depth so the calculator always starts.
  loadConfig()
    .catch(() => validateConfig({}))
    .then((configResult) => installGlobalErrorHandlers(createApp(root, configResult)));
}

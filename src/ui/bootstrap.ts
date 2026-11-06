/**
 * Starts the app so that the page never goes blank (L8.19):
 * 1. the global error handlers are installed first, before config loading and createApp;
 * 2. any failure before the app exists renders E9 into #app (plain text only);
 * 3. after startup, global errors go to the app, which shows E9 and keeps the inputs.
 */
import { loadConfig as defaultLoadConfig } from '../config/loadConfig';
import { validateConfig, type ConfigResult } from '../config/schema';
import { APP_TITLE, MESSAGES } from '../messages';
import { createApp as defaultCreateApp, type AppHandle } from './app';

export interface StartDependencies {
  loadConfig?: () => Promise<ConfigResult>;
  createApp?: (root: HTMLElement, config: ConfigResult) => AppHandle;
}

export interface StartHandle {
  /** Removes the global handlers (used by tests). */
  stop(): void;
}

/** Minimal page shown when the app could not start. textContent only, no HTML. */
function renderStartupError(root: HTMLElement): void {
  const title = document.createElement('h1');
  title.textContent = APP_TITLE;
  const message = document.createElement('p');
  message.className = 'startup-error results-message';
  message.setAttribute('role', 'alert');
  message.textContent = MESSAGES.E9;
  root.replaceChildren(title, message);
}

export async function startApp(rootOrNull: HTMLElement | null, deps: StartDependencies = {}): Promise<StartHandle> {
  const loadConfig = deps.loadConfig ?? defaultLoadConfig;
  const createApp = deps.createApp ?? defaultCreateApp;

  // Without #app, still give the user somewhere to see a message.
  let root = rootOrNull;
  if (!root) {
    root = document.createElement('div');
    root.id = 'app';
    document.body.append(root);
  }
  const target = root;

  let app: AppHandle | null = null;
  const handleError = (error: unknown): void => {
    try {
      if (app) {
        app.showUnexpectedError(error); // logs and shows E9 in results and schedule
      } else {
        console.error('The calculator could not start', error);
        renderStartupError(target);
      }
    } catch (secondError) {
      // Even showing the error failed: fall back to the minimal page.
      console.error('Error while handling an error', secondError);
      renderStartupError(target);
    }
  };
  const onError = (event: ErrorEvent): void => handleError(event.error ?? event.message);
  const onRejection = (event: PromiseRejectionEvent): void => handleError(event.reason);
  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onRejection);
  const stop = (): void => {
    window.removeEventListener('error', onError);
    window.removeEventListener('unhandledrejection', onRejection);
  };

  try {
    // loadConfig never rejects; the catch is defence in depth.
    const configResult = await loadConfig().catch(() => validateConfig({}));
    app = createApp(target, configResult);
  } catch (error) {
    handleError(error);
  }
  return { stop };
}

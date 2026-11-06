// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { startApp } from '../../src/ui/bootstrap';
import { createApp } from '../../src/ui/app';
import { validateConfig } from '../../src/config/schema';

const E9 = 'Something went wrong. Your inputs are kept; please try again.';
const config = async () => validateConfig({});

let errorSpy: MockInstance<typeof console.error>;
let stop: (() => void) | undefined;

beforeEach(() => {
  document.body.innerHTML = '<div id="app"></div>';
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterEach(() => {
  stop?.();
  stop = undefined;
  errorSpy.mockRestore();
});

const root = (): HTMLElement => document.querySelector<HTMLElement>('#app')!;
const fireWindowError = (error: unknown): void => {
  window.dispatchEvent(new ErrorEvent('error', { error, message: String(error) }));
};

describe('Startup never leaves a blank page (L8.19)', () => {
  it('normal start: the calculator renders with the loaded config', async () => {
    stop = (await startApp(root(), { loadConfig: config })).stop;
    expect(root().querySelector('[data-result="monthly-payment"]')?.textContent).toBe('$1,798.65');
  });

  it('createApp throws → #app shows E9 as plain text, the error is logged, startApp does not reject', async () => {
    const handle = await startApp(root(), {
      loadConfig: config,
      createApp: () => {
        throw new Error('boom during startup');
      },
    });
    stop = handle.stop;
    expect(root().textContent).toContain(E9);
    expect(root().querySelector('.startup-error')?.textContent).toBe(E9);
    expect(root().querySelector('h1')?.textContent).toBe('Mortgage Calculator');
    expect(errorSpy).toHaveBeenCalled();
  });

  it('loadConfig rejects (should never happen) → starts on built-in defaults', async () => {
    stop = (
      await startApp(root(), {
        loadConfig: () => Promise.reject(new Error('network down')),
      })
    ).stop;
    expect(root().querySelector('[data-result="monthly-payment"]')?.textContent).toBe('$1,798.65');
  });

  it('the global handlers are installed before createApp: an error thrown while the app is being built shows E9', async () => {
    let shownDuringStartup: string | null = null;
    stop = (
      await startApp(root(), {
        loadConfig: config,
        createApp: (r, c) => {
          fireWindowError(new Error('failure while the app is being built'));
          shownDuringStartup = r.querySelector('.startup-error')?.textContent ?? null;
          return createApp(r, c);
        },
      })
    ).stop;
    // The handler was already listening: E9 was on screen at that moment, then the app started.
    expect(shownDuringStartup).toBe(E9);
    expect(root().querySelector('[data-result="monthly-payment"]')?.textContent).toBe('$1,798.65');
  });

  it('a global error before any app exists (e.g. while config loads) shows the E9 fallback', async () => {
    let release: (value: Awaited<ReturnType<typeof config>>) => void = () => undefined;
    const pending = startApp(root(), { loadConfig: () => new Promise((resolve) => (release = resolve)) });
    fireWindowError(new Error('early failure'));
    expect(root().querySelector('.startup-error')?.textContent).toBe(E9);
    release(await config());
    stop = (await pending).stop;
  });

  it('after startup, a global error or unhandled rejection shows E9 in the results and schedule; inputs are kept', async () => {
    stop = (await startApp(root(), { loadConfig: config })).stop;
    fireWindowError(new Error('late failure'));
    expect(root().querySelector('.results-body')?.textContent).toBe(E9);
    expect(root().querySelector('.schedule-body')?.textContent).toBe(E9);
    expect(root().querySelector<HTMLInputElement>('#field-homePrice')?.value).toBe('350000');

    const rejection = Object.assign(new Event('unhandledrejection'), { reason: new Error('promise failure') });
    window.dispatchEvent(rejection);
    expect(root().querySelector('.results-body')?.textContent).toBe(E9);
  });

  it('no #app element → the fallback is added to the page instead of rendering nothing', async () => {
    document.body.innerHTML = '';
    const handle = await startApp(null, {
      loadConfig: config,
      createApp: () => {
        throw new Error('boom');
      },
    });
    stop = handle.stop;
    expect(document.body.textContent).toContain(E9);
  });

  it('stop() removes the global handlers', async () => {
    const handle = await startApp(root(), { loadConfig: config });
    handle.stop();
    fireWindowError(new Error('after stop'));
    expect(root().querySelector('[data-result="monthly-payment"]')?.textContent).toBe('$1,798.65');
  });
});

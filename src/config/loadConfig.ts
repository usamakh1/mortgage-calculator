/**
 * Loads public/config.json. Never rejects: always resolves to a complete, valid config (A4).
 * The only network request the app makes besides its own files (A5.4).
 */
import { isPlainObject, unusableConfig, validateConfig, type ConfigResult } from './schema';

export interface FetchResponseLike {
  ok: boolean;
  status: number;
  text(): Promise<string>;
}

/** The part of `fetch` used here, so tests can pass a fake. */
export type FetchLike = (url: string, init: { cache: 'no-store' }) => Promise<FetchResponseLike>;

const CONFIG_URL = './config.json'; // relative, so it works from any folder or sub-path

const browserFetch: FetchLike = (url, init) => fetch(url, init);

function failure(reason: string, detail: unknown): ConfigResult {
  console.warn(`[config] Configuration could not be loaded (${reason}).`, detail);
  return unusableConfig(reason, detail);
}

export async function loadConfig(fetchFn: FetchLike = browserFetch): Promise<ConfigResult> {
  let body: string;
  try {
    // no-store: an edited config.json shows on the next reload.
    const response = await fetchFn(CONFIG_URL, { cache: 'no-store' });
    if (response.status === 404) return failure('file not found', response.status);
    if (!response.ok) return failure('network error', response.status);
    body = await response.text();
  } catch (error) {
    return failure('network error', error);
  }

  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch (error) {
    return failure('invalid JSON', error);
  }

  try {
    if (!isPlainObject(json)) return failure('not a JSON object', json);
    const result = validateConfig(json);
    for (const problem of result.problems) {
      console.warn(`[config] Invalid setting "${problem.field}":`, problem.value);
    }
    return result;
  } catch (error) {
    // validateConfig is written not to throw; this is defence in depth so the app always starts.
    return failure('invalid JSON', error);
  }
}

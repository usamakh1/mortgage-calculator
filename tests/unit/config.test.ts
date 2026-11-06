import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { validateConfig } from '../../src/config/schema';
import { loadConfig, type FetchLike } from '../../src/config/loadConfig';
import { DEFAULT_CONFIG } from '../../src/config/defaults';
import shippedConfig from '../../public/config.json';

const DEFAULT_DISCLAIMER = 'Estimates only. Not a loan offer or financial advice.';

/** The example config from the docs (A1 schema, M1.1 presets). */
const FULL = {
  currency: 'USD',
  locale: 'en-US',
  officeName: 'Riverside Mortgages',
  disclaimer: 'Estimates only. Not a loan offer or financial advice.',
  defaults: { homePrice: 350000, downPayment: 50000, ratePercent: 6, termYears: 30, extraPayment: 0 },
  limits: {
    homePrice: { min: 1, max: 100000000 },
    ratePercent: { min: 0, max: 30 },
    termYears: { min: 1, max: 40 },
    extraPayment: { min: 0, max: 10000000 },
  },
  presets: [
    { id: 'f30', name: '30-year fixed', ratePercent: 6.5, termYears: 30, description: 'Our standard 30-year loan' },
    { id: 'f15', name: '15-year fixed', ratePercent: 5.75, termYears: 15, description: 'Lower total interest' },
  ],
};

const fields = (json: unknown): string[] => validateConfig(json).problems.map((p) => p.field);

describe('Built-in defaults (A1 schema)', () => {
  it('match the docs', () => {
    expect(DEFAULT_CONFIG).toEqual({
      currency: 'USD',
      locale: 'en-US',
      officeName: null,
      disclaimer: DEFAULT_DISCLAIMER,
      defaults: { homePrice: 350000, downPayment: 50000, ratePercent: 6, termYears: 30, extraPayment: 0 },
      limits: {
        homePrice: { min: 1, max: 100000000 },
        ratePercent: { min: 0, max: 30 },
        termYears: { min: 1, max: 40 },
        extraPayment: { min: 0, max: 10000000 },
      },
      presets: [],
    });
  });
});

describe('G. Whole file (A4.1–A4.3, A4.8)', () => {
  it('G1 (A1.4): {} gives the built-in defaults and no problems', () => {
    expect(validateConfig({})).toEqual({ config: DEFAULT_CONFIG, problems: [], notice: null });
  });

  it('G2: the full example is applied as written', () => {
    const { config, problems, notice } = validateConfig(FULL);
    expect(problems).toEqual([]);
    expect(notice).toBeNull();
    expect(config.officeName).toBe('Riverside Mortgages');
    expect(config.presets).toEqual([
      { id: 'f30', name: '30-year fixed', ratePercent: 6.5, termYears: 30, description: 'Our standard 30-year loan' },
      { id: 'f15', name: '15-year fixed', ratePercent: 5.75, termYears: 15, description: 'Lower total interest' },
    ]);
  });

  it.each([[[]], ['x'], [42], [null], [true]])('G3 (A4.3): %j is not a JSON object → defaults + E11', (json) => {
    expect(validateConfig(json)).toEqual({
      config: DEFAULT_CONFIG,
      problems: [{ field: 'config.json', value: json }],
      notice: {
        id: 'E11',
        text: 'Configuration could not be loaded (not a JSON object). Using default settings.',
      },
    });
  });
});

describe('C. Currency and locale (A1.1, A4.4)', () => {
  it('C1 (A1.1): EUR and de-DE are applied', () => {
    const { config, problems } = validateConfig({ currency: 'EUR', locale: 'de-DE' });
    expect(problems).toEqual([]);
    expect(config.currency).toBe('EUR');
    expect(config.locale).toBe('de-DE');
    const formatted = new Intl.NumberFormat(config.locale, { style: 'currency', currency: config.currency }).format(1798.65);
    expect(formatted).toBe('1.798,65 €');
  });

  it.each([['XYZ'], ['JPY'], ['KWD'], [840], [''], [null]])('C2–C4 (A4.4, Q7): currency %j → USD + E12 "currency"', (currency) => {
    const { config, problems } = validateConfig({ currency });
    expect(config.currency).toBe('USD');
    expect(problems).toEqual([{ field: 'currency', value: currency }]);
  });

  it('Q6: lowercase "eur" is accepted as "EUR"', () => {
    const { config, problems } = validateConfig({ currency: 'eur' });
    expect(config.currency).toBe('EUR');
    expect(problems).toEqual([]);
  });

  it.each([['xx-YY'], ['not a locale!!'], [''], [5]])('C5: locale %j → en-US + E12 "locale", no throw', (locale) => {
    const { config, problems } = validateConfig({ locale });
    expect(config.locale).toBe('en-US');
    expect(problems).toEqual([{ field: 'locale', value: locale }]);
  });

  it('C6/Q8: "EN-us" becomes "en-US"; "en-XX" is accepted', () => {
    expect(validateConfig({ locale: 'EN-us' }).config.locale).toBe('en-US');
    expect(validateConfig({ locale: 'en-XX' }).problems).toEqual([]);
  });
});

describe('R. Limits (A1.3, A4.4, Q2)', () => {
  it('R1 (A1.3): limits.ratePercent.max 15 is applied', () => {
    const { config, problems } = validateConfig({ limits: { ratePercent: { min: 0, max: 15 } } });
    expect(problems).toEqual([]);
    expect(config.limits.ratePercent).toEqual({ min: 0, max: 15 });
    expect(config.limits.termYears).toEqual({ min: 1, max: 40 });
  });

  it('R2 (A4.4): termYears min 50 > max 40 → only that limit falls back', () => {
    const { config, problems } = validateConfig({
      limits: { termYears: { min: 50, max: 40 }, ratePercent: { min: 0, max: 15 } },
    });
    expect(config.limits.termYears).toEqual({ min: 1, max: 40 });
    expect(config.limits.ratePercent).toEqual({ min: 0, max: 15 });
    expect(problems).toEqual([{ field: 'limits.termYears', value: { min: 50, max: 40 } }]);
  });

  it.each([
    ['negative', { homePrice: { min: -1, max: 100 } }, 'limits.homePrice'],
    ['missing max', { homePrice: { min: 1 } }, 'limits.homePrice'],
    ['string', { ratePercent: { min: '0', max: 30 } }, 'limits.ratePercent'],
    ['not an object', { ratePercent: 30 }, 'limits.ratePercent'],
    ['term min 1.5', { termYears: { min: 1.5, max: 40 } }, 'limits.termYears'],
    ['Q2: wider than built-in (price max 1e12)', { homePrice: { min: 1, max: 1e12 } }, 'limits.homePrice'],
    ['Q2: wider than built-in (rate max 31)', { ratePercent: { min: 0, max: 31 } }, 'limits.ratePercent'],
    ['Q2: below built-in min (term min 0)', { termYears: { min: 0, max: 40 } }, 'limits.termYears'],
  ])('R3/R4: %s → falls back + E12', (_label, limits, field) => {
    const { config, problems } = validateConfig({ limits });
    expect(problems.map((p) => p.field)).toEqual([field]);
    expect(config.limits).toEqual(DEFAULT_CONFIG.limits);
  });

  it('min = max is allowed (a single fixed term)', () => {
    expect(validateConfig({ limits: { termYears: { min: 30, max: 30 } } }).problems).toEqual([]);
  });

  it('limits that is not an object → E12 "limits", all built-in', () => {
    expect(fields({ limits: [1, 2] })).toEqual(['limits']);
  });

  it('R5 (A4.4): currency XYZ + bad limits.termYears → E12 lists exactly "currency, limits.termYears"', () => {
    const { config, notice } = validateConfig({ ...FULL, currency: 'XYZ', limits: { termYears: { min: 50, max: 40 } } });
    expect(notice).toEqual({
      id: 'E12',
      text: 'Some settings were invalid and defaults are used instead: currency, limits.termYears.',
    });
    expect(config.locale).toBe('en-US');
    expect(config.officeName).toBe('Riverside Mortgages');
    expect(config.presets).toHaveLength(2);
  });
});

describe('D. Defaults (A1.2, A4.5, Q3)', () => {
  it('D1 (A1.2): defaults 400,000 / 5 / 25 are applied', () => {
    const { config, problems } = validateConfig({ defaults: { homePrice: 400000, ratePercent: 5, termYears: 25 } });
    expect(problems).toEqual([]);
    expect(config.defaults).toEqual({ homePrice: 400000, downPayment: 50000, ratePercent: 5, termYears: 25, extraPayment: 0 });
  });

  it('D2 (A4.5): default rate 50 with limit 0–30 → built-in default + E12', () => {
    const { config, problems } = validateConfig({ defaults: { ratePercent: 50 } });
    expect(config.defaults.ratePercent).toBe(6);
    expect(problems).toEqual([{ field: 'defaults.ratePercent', value: 50 }]);
  });

  it('D3: a default is checked against a changed limit (rate max 15, default 20)', () => {
    const { config, problems } = validateConfig({ limits: { ratePercent: { min: 0, max: 15 } }, defaults: { ratePercent: 20 } });
    expect(config.defaults.ratePercent).toBe(6);
    expect(problems.map((p) => p.field)).toEqual(['defaults.ratePercent']);
  });

  it('D4 (Q3): default down payment ≥ default price → built-in down payment; if still too big → 0', () => {
    const first = validateConfig({ defaults: { homePrice: 300000, downPayment: 300000 } });
    expect(first.config.defaults.downPayment).toBe(50000);
    expect(first.problems.map((p) => p.field)).toEqual(['defaults.downPayment']);

    const second = validateConfig({ defaults: { homePrice: 40000, downPayment: 40000 } });
    expect(second.config.defaults.downPayment).toBe(0);
    expect(second.problems.map((p) => p.field)).toEqual(['defaults.downPayment']);
  });

  it.each([
    ['string price', { homePrice: '350000' }, 'defaults.homePrice'],
    ['negative extra', { extraPayment: -5 }, 'defaults.extraPayment'],
    ['term 15.5', { termYears: 15.5 }, 'defaults.termYears'],
    ['price with 3 decimals', { homePrice: 100.123 }, 'defaults.homePrice'],
    ['rate with 4 decimals', { ratePercent: 6.1234 }, 'defaults.ratePercent'],
    ['negative down payment', { downPayment: -1 }, 'defaults.downPayment'],
  ])('D5: %s → falls back + E12', (_label, defaults, field) => {
    expect(fields({ defaults })).toEqual([field]);
  });

  it('a built-in default outside narrowed limits (and not set by the Admin) moves to the nearest limit, without a warning', () => {
    const { config, problems } = validateConfig({ limits: { homePrice: { min: 1, max: 200000 }, termYears: { min: 1, max: 20 } } });
    expect(problems).toEqual([]);
    expect(config.defaults.homePrice).toBe(200000);
    expect(config.defaults.termYears).toBe(20);
    expect(config.defaults.downPayment).toBeLessThan(config.defaults.homePrice);
  });
});

describe('PR. Presets (A2.1–A2.5, M1.7, Q5)', () => {
  const f15 = { id: 'f15', name: '15-year fixed', ratePercent: 5.75, termYears: 15, description: 'Our standard 15-year loan' };

  it('PR1 (A2.1): a valid preset is kept with its description; description is optional', () => {
    const { config, problems } = validateConfig({ presets: [f15, { id: 'f20', name: '20-year fixed', ratePercent: 6.25, termYears: 20 }] });
    expect(problems).toEqual([]);
    expect(config.presets).toEqual([
      f15,
      { id: 'f20', name: '20-year fixed', ratePercent: 6.25, termYears: 20, description: null },
    ]);
  });

  it('PR2 (A2.2): "Jumbo" at 35% is skipped and named "presets: Jumbo"', () => {
    const jumbo = { id: 'j', name: 'Jumbo', ratePercent: 35, termYears: 30 };
    const { config, problems } = validateConfig({ presets: [f15, jumbo] });
    expect(config.presets.map((p) => p.id)).toEqual(['f15']);
    expect(problems).toEqual([{ field: 'presets: Jumbo', value: jumbo }]);
  });

  it('PR3 (A2.3): no name, or termYears 15.5, → skipped and named by position', () => {
    const noName = { id: 'a', ratePercent: 5, termYears: 15 };
    const badTerm = { id: 'b', name: 'Odd', ratePercent: 5, termYears: 15.5 };
    expect(fields({ presets: [f15, noName] })).toEqual(['presets[1]']);
    expect(fields({ presets: [f15, f15 && { ...f15, id: 'x' }, badTerm] })).toEqual(['presets: Odd']);
    expect(fields({ presets: [f15, { ...f15, id: 'y' }, { ...noName, id: 'z' }] })).toEqual(['presets[2]']);
  });

  it('PR4 (A2.4): duplicate id f15 → first kept, "presets: duplicate id f15"', () => {
    const { config, problems } = validateConfig({ presets: [f15, { ...f15, name: 'Copy' }] });
    expect(config.presets).toEqual([f15]);
    expect(problems.map((p) => p.field)).toEqual(['presets: duplicate id f15']);
  });

  it.each([[{}], ['f15'], [42]])('PR5 (A2.5): presets %j is not a list → no presets, E12 "presets"', (presets) => {
    const { config, problems } = validateConfig({ presets });
    expect(config.presets).toEqual([]);
    expect(problems).toEqual([{ field: 'presets', value: presets }]);
  });

  it.each([[undefined], [[]]])('PR6 (M1.7): presets %j → no presets and no warning', (presets) => {
    expect(validateConfig(presets === undefined ? {} : { presets })).toEqual({ config: DEFAULT_CONFIG, problems: [], notice: null });
  });

  it('PR7: a preset is checked against changed limits (rate max 15, preset 16%)', () => {
    expect(fields({ limits: { ratePercent: { min: 0, max: 15 } }, presets: [{ ...f15, ratePercent: 16 }] })).toEqual([
      'presets: 15-year fixed',
    ]);
  });

  it.each([
    ['missing id', { name: 'A', ratePercent: 5, termYears: 15 }],
    ['numeric id', { id: 7, name: 'A', ratePercent: 5, termYears: 15 }],
    ['description not text', { id: 'a', name: 'A', ratePercent: 5, termYears: 15, description: 3 }],
    ['not an object', 'A'],
  ])('PR8: %s → skipped', (_label, preset) => {
    const { config, problems } = validateConfig({ presets: [preset] });
    expect(config.presets).toEqual([]);
    expect(problems).toHaveLength(1);
  });
});

describe('S. Office name and disclaimer (A3)', () => {
  it('S1/S2 (A3.1, A3.2): kept exactly as plain strings, even markup', () => {
    const markup = '<img src=x onerror=alert(1)>';
    const { config, problems } = validateConfig({ officeName: 'Riverside Mortgages', disclaimer: markup });
    expect(problems).toEqual([]);
    expect(config.officeName).toBe('Riverside Mortgages');
    expect(config.disclaimer).toBe(markup);
  });

  it.each([[undefined], [''], ['   '], [null]])('S3 (A3.3): disclaimer %j → the default, no warning', (disclaimer) => {
    const { config, problems } = validateConfig(disclaimer === undefined ? {} : { disclaimer });
    expect(config.disclaimer).toBe(DEFAULT_DISCLAIMER);
    expect(problems).toEqual([]);
  });

  it('S4 (A3.4): disclaimer 42 → the default + E12 "disclaimer"', () => {
    const { config, problems } = validateConfig({ disclaimer: 42 });
    expect(config.disclaimer).toBe(DEFAULT_DISCLAIMER);
    expect(problems).toEqual([{ field: 'disclaimer', value: 42 }]);
  });

  it('S5 (A3.5): officeName missing → null, no warning; officeName 42 → null + E12', () => {
    expect(validateConfig({}).config.officeName).toBeNull();
    const { config, problems } = validateConfig({ officeName: 42 });
    expect(config.officeName).toBeNull();
    expect(problems).toEqual([{ field: 'officeName', value: 42 }]);
  });

  it('Q10: names and disclaimers are trimmed', () => {
    const { config } = validateConfig({ officeName: '  Riverside  ', disclaimer: ' Estimates. ' });
    expect(config.officeName).toBe('Riverside');
    expect(config.disclaimer).toBe('Estimates.');
  });
});

describe('U. Unknown keys (A4 config rule, Q4)', () => {
  it('a top-level typo "currncy" is listed in E12 and the real currency stays default', () => {
    const { config, problems, notice } = validateConfig({ currncy: 'EUR' });
    expect(config.currency).toBe('USD');
    expect(problems).toEqual([{ field: 'currncy', value: 'EUR' }]);
    expect(notice?.text).toBe('Some settings were invalid and defaults are used instead: currncy.');
  });

  it('nested unknown keys are listed with their path', () => {
    expect(
      fields({
        limits: { rate: { min: 0, max: 15 }, termYears: { min: 1, max: 40, step: 1 } },
        defaults: { price: 1 },
        presets: [{ id: 'a', name: 'A', ratePercent: 5, termYears: 15, rate: 5 }],
      }),
    ).toEqual(['limits.rate', 'limits.termYears.step', 'defaults.price', 'presets[0].rate']);
  });

  it('a preset with an unknown key is still kept (the key is ignored)', () => {
    const { config } = validateConfig({ presets: [{ id: 'a', name: 'A', ratePercent: 5, termYears: 15, rate: 5 }] });
    expect(config.presets.map((p) => p.id)).toEqual(['a']);
  });
});

describe('G4 (A4.8): validateConfig never throws and always returns a complete config', () => {
  const nasty: unknown[] = [
    {},
    [],
    null,
    'x',
    { defaults: null, limits: null, presets: null },
    { defaults: [], limits: 'x', presets: [null, 1, 'x', [], {}] },
    { limits: { homePrice: null, ratePercent: [], termYears: 'x', extraPayment: { min: NaN, max: Infinity } } },
    { currency: {}, locale: [], officeName: {}, disclaimer: [] },
    Object.create(null),
    JSON.parse('{"__proto__": {"currency": "EUR"}}'),
  ];
  it.each(nasty.map((n) => [n]))('%j', (json) => {
    let result: ReturnType<typeof validateConfig> | undefined;
    expect(() => {
      result = validateConfig(json);
    }).not.toThrow();
    const { config } = result!;
    expect(Object.keys(config).sort()).toEqual(Object.keys(DEFAULT_CONFIG).sort());
    expect(Object.keys(config.limits).sort()).toEqual(Object.keys(DEFAULT_CONFIG.limits).sort());
    expect(Object.keys(config.defaults).sort()).toEqual(Object.keys(DEFAULT_CONFIG.defaults).sort());
    expect(Array.isArray(config.presets)).toBe(true);
    expect(config.defaults.downPayment).toBeLessThan(config.defaults.homePrice);
  });
});

describe('L. loadConfig fetch wrapper (A4.1, A4.2, A4.7)', () => {
  let warn: MockInstance<typeof console.warn>;
  beforeEach(() => {
    warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });
  afterEach(() => {
    warn.mockRestore();
  });

  const respond =
    (status: number, body: string): FetchLike =>
    async () => ({ ok: status >= 200 && status < 300, status, text: async () => body });

  it('L1 (A4.1): 404 → defaults + "file not found"', async () => {
    const result = await loadConfig(respond(404, 'Not found'));
    expect(result.config).toEqual(DEFAULT_CONFIG);
    expect(result.notice).toEqual({
      id: 'E11',
      text: 'Configuration could not be loaded (file not found). Using default settings.',
    });
  });

  it('L2: fetch rejects → "network error"', async () => {
    const result = await loadConfig(async () => {
      throw new TypeError('Failed to fetch');
    });
    expect(result.config).toEqual(DEFAULT_CONFIG);
    expect(result.notice?.text).toBe('Configuration could not be loaded (network error). Using default settings.');
  });

  it('L3 (A4.2): invalid JSON → "invalid JSON"', async () => {
    const result = await loadConfig(respond(200, '{bad json'));
    expect(result.config).toEqual(DEFAULT_CONFIG);
    expect(result.notice?.text).toBe('Configuration could not be loaded (invalid JSON). Using default settings.');
  });

  it('L4: a valid body gives the same result as validateConfig', async () => {
    expect(await loadConfig(respond(200, JSON.stringify(FULL)))).toEqual(validateConfig(FULL));
  });

  it('L5 (Q9): status 500, or a body that cannot be read → "network error"', async () => {
    expect((await loadConfig(respond(500, 'oops'))).notice?.text).toBe(
      'Configuration could not be loaded (network error). Using default settings.',
    );
    const unreadable: FetchLike = async () => ({
      ok: true,
      status: 200,
      text: async () => {
        throw new Error('stream failed');
      },
    });
    expect((await loadConfig(unreadable)).notice?.text).toBe(
      'Configuration could not be loaded (network error). Using default settings.',
    );
  });

  const respondWith =
    (body: string, contentType: string | null): FetchLike =>
    async () => ({
      ok: true,
      status: 200,
      headers: { get: (name: string) => (name.toLowerCase() === 'content-type' ? contentType : null) },
      text: async () => body,
    });
  const HTML = '<!doctype html>\n<html lang="en"><head><title>Mortgage Calculator</title></head></html>';
  const NOT_FOUND = 'Configuration could not be loaded (file not found). Using default settings.';

  it('A4.1 defence: an HTML page with status 200 (single-page-app fallback) → "file not found"', async () => {
    const result = await loadConfig(respondWith(HTML, 'text/html; charset=utf-8'));
    expect(result.config).toEqual(DEFAULT_CONFIG);
    expect(result.notice?.text).toBe(NOT_FOUND);
  });

  it('A4.1 defence: an HTML body without a content type is also "file not found"', async () => {
    expect((await loadConfig(respondWith(`  ${HTML}`, null))).notice?.text).toBe(NOT_FOUND);
  });

  it('valid JSON is still accepted as application/json, text/plain or with no content type', async () => {
    for (const type of ['application/json', 'application/json; charset=utf-8', 'text/plain', null]) {
      const result = await loadConfig(respondWith(JSON.stringify({ currency: 'EUR' }), type));
      expect(result.notice).toBeNull();
      expect(result.config.currency).toBe('EUR');
    }
  });

  it('broken JSON that is not HTML is still "invalid JSON"', async () => {
    const result = await loadConfig(respondWith('{bad json', 'application/json'));
    expect(result.notice?.text).toBe('Configuration could not be loaded (invalid JSON). Using default settings.');
  });

  it('L6: requests ./config.json with cache "no-store"', async () => {
    const fetchSpy = vi.fn<FetchLike>(respond(200, '{}'));
    await loadConfig(fetchSpy);
    expect(fetchSpy).toHaveBeenCalledWith('./config.json', { cache: 'no-store' });
  });

  it('W1 (A4.7): every problem is logged once with its field name and bad value', async () => {
    await loadConfig(respond(200, JSON.stringify({ currency: 'XYZ', limits: { termYears: { min: 50, max: 40 } } })));
    expect(warn).toHaveBeenCalledTimes(2);
    expect(warn).toHaveBeenCalledWith('[config] Invalid setting "currency":', 'XYZ');
    expect(warn).toHaveBeenCalledWith('[config] Invalid setting "limits.termYears":', { min: 50, max: 40 });
  });

  it('W1: an E11 problem is logged too', async () => {
    await loadConfig(respond(200, '{bad json'));
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]?.[0]).toBe('[config] Configuration could not be loaded (invalid JSON).');
  });

  it('W3: a valid config logs nothing; E11 and E12 never appear together', async () => {
    const ok = await loadConfig(respond(200, JSON.stringify(FULL)));
    expect(ok.notice).toBeNull();
    expect(warn).not.toHaveBeenCalled();
    const broken = await loadConfig(respond(200, '[]'));
    expect(broken.notice?.id).toBe('E11');
    expect(broken.problems).toHaveLength(1);
  });

  it('loadConfig never rejects, even if validation itself were to fail unexpectedly', async () => {
    const weird: FetchLike = async () => ({ ok: true, status: 200, text: async () => '{"limits": {"homePrice": {"min": 1e400}}}' });
    await expect(loadConfig(weird)).resolves.toHaveProperty('config');
  });
});

describe('public/config.json (the shipped example)', () => {
  it('is valid: no problems, two presets, office name and disclaimer set', () => {
    const { config, problems } = validateConfig(shippedConfig);
    expect(problems).toEqual([]);
    expect(config.presets.map((p) => p.name)).toEqual(['30-year fixed', '15-year fixed']);
    expect(config.officeName).toBe('Riverside Mortgages');
    expect(config.disclaimer).toBe(DEFAULT_DISCLAIMER);
  });
});

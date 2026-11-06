/**
 * Built-in defaults and config types.
 * Values match docs/user-stories.md: "Valid ranges" (Shared definitions) and the A1 config schema.
 */

export interface Range {
  min: number;
  max: number;
}

/** Limits in currency units (not cents), percent and years. */
export interface Limits {
  homePrice: Range;
  ratePercent: Range;
  termYears: Range;
  extraPayment: Range;
}

/** Starting values of the form, in currency units, percent and years. */
export interface Defaults {
  homePrice: number;
  downPayment: number;
  ratePercent: number;
  termYears: number;
  extraPayment: number;
}

export interface Preset {
  id: string;
  name: string;
  ratePercent: number;
  termYears: number;
  description: string | null;
}

export interface AppConfig {
  /** ISO 4217 code with 2 decimals. */
  currency: string;
  /** BCP 47 tag. */
  locale: string;
  officeName: string | null;
  /** Plain text; the UI renders it with textContent only (A3.2). */
  disclaimer: string;
  defaults: Defaults;
  limits: Limits;
  presets: Preset[];
}

export const DEFAULT_DISCLAIMER = 'Estimates only. Not a loan offer or financial advice.';

/** The built-in Valid ranges. Config limits may only narrow these (A1 config rules). */
export const DEFAULT_LIMITS: Limits = {
  homePrice: { min: 1, max: 100_000_000 },
  ratePercent: { min: 0, max: 30 },
  termYears: { min: 1, max: 40 },
  extraPayment: { min: 0, max: 10_000_000 },
};

export const DEFAULT_DEFAULTS: Defaults = {
  homePrice: 350_000,
  downPayment: 50_000,
  ratePercent: 6,
  termYears: 30,
  extraPayment: 0,
};

export const DEFAULT_CONFIG: AppConfig = {
  currency: 'USD',
  locale: 'en-US',
  officeName: null,
  disclaimer: DEFAULT_DISCLAIMER,
  defaults: DEFAULT_DEFAULTS,
  limits: DEFAULT_LIMITS,
  presets: [],
};

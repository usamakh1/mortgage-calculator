/**
 * Every user-facing text in the app lives here.
 * Error texts must match the Error messages table in docs/user-stories.md exactly.
 * Range messages take the numbers already formatted for the locale.
 * The remaining entries (E8, E9, E13–E20) are added with the steps that use them.
 */
export const APP_TITLE = 'Mortgage Calculator';

export const MESSAGES = {
  E1: (min: string, max: string) => `Enter a home price between ${min} and ${max}.`,
  E2: 'Enter a down payment of 0 or more.',
  E3: 'Down payment must be less than the home price.',
  E4: (min: string, max: string) => `Enter an interest rate between ${min} and ${max}.`,
  E5: (min: string, max: string) => `Enter a whole number of years between ${min} and ${max}.`,
  E6: (min: string, max: string) => `Enter an extra payment between ${min} and ${max}.`,
  E7: 'The loan amount is too small for this term.',
  E10: 'Could not calculate this loan. Please check your inputs.',
  /** reason: "file not found", "invalid JSON", "not a JSON object" or "network error". */
  E11: (reason: string) => `Configuration could not be loaded (${reason}). Using default settings.`,
  /** list: problem names joined with ", ". */
  E12: (list: string) => `Some settings were invalid and defaults are used instead: ${list}.`,
} as const;

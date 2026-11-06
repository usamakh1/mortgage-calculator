/**
 * Every user-facing text in the app lives here.
 * Error texts must match the Error messages table in docs/user-stories.md exactly.
 * Range messages take the numbers already formatted for the locale.
 * The remaining entries (E13–E20) are added with the steps that use them.
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
  E8: 'Fix the highlighted fields to see your results.',
  E9: 'Something went wrong. Your inputs are kept; please try again.',
  E10: 'Could not calculate this loan. Please check your inputs.',
  /** reason: "file not found", "invalid JSON", "not a JSON object" or "network error". */
  E11: (reason: string) => `Configuration could not be loaded (${reason}). Using default settings.`,
  /** list: problem names joined with ", ". */
  E12: (list: string) => `Some settings were invalid and defaults are used instead: ${list}.`,
} as const;

/** Labels and other interface text (not errors). */
export const UI_TEXT = {
  intro: 'See what a home loan costs each month and in total.',
  formHeading: 'Loan details',
  homePrice: 'Home price',
  downPayment: 'Down payment',
  interestRate: 'Interest rate (% per year)',
  termYears: 'Loan term (years)',
  extraPayment: 'Extra monthly payment',
  loanProduct: 'Loan product',
  custom: 'Custom',
  savingsIntro: (amount: string) => `Paying ${amount} extra each month`,
  monthsSaved: 'Months saved',
  interestSaved: 'Interest saved',
  monthsCount: (count: number) => (count === 1 ? '1 month' : `${count} months`),
  resultsHeading: 'Your loan',
  loanAmount: 'Loan amount',
  monthlyPayment: 'Monthly payment',
  monthlyPaymentNote: 'Principal and interest',
  totalInterest: 'Total interest',
  totalPaid: 'Total paid',
  payoffDate: 'Payoff date',
  dismiss: 'Dismiss',
  errorMarker: '!',
  percentSuffix: '%',
  yearsSuffix: 'years',
  breakdownHeading: 'Total paid: principal vs. interest',
  principal: 'Principal',
  interest: 'Interest',
  scheduleHeading: 'Amortization schedule',
  scheduleViewLabel: 'Schedule view',
  monthly: 'Monthly',
  yearly: 'Yearly',
  downloadCsv: 'Download CSV',
  scheduleCaptionMonthly: 'Amortization schedule, one row per monthly payment',
  scheduleCaptionYearly: 'Amortization schedule, one row per loan year',
  scheduleRegionLabel: 'Amortization schedule table',
  /** Column names: the monthly table and the CSV header (L3.1, L3.4). */
  colPaymentNumber: 'Payment number',
  colDate: 'Date',
  colPayment: 'Payment',
  colPrincipal: 'Principal',
  colInterest: 'Interest',
  colExtra: 'Extra payment',
  colBalance: 'Balance',
  colYear: 'Year',
  colEndBalance: 'Ending balance',
} as const;

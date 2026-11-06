# Mortgage Calculator: Product & Build Plan

**Status:** v1.2, updated after the build · **Date:** 2026-11-06 · **Owner:** Engineering

Related documents:
- [App Roles](app-roles.md)
- [Jobs To Be Done](jobs-to-be-done.md)
- [User Stories & Acceptance Criteria](user-stories.md)

---

## 1. Product decisions (and why)

| Decision | Choice | Reason |
|---|---|---|
| **Primary user** | The **Loanee**, a person deciding whether and how to take a home loan (first-time buyers, people refinancing). | They carry the risk and have the least tooling. Bank calculators show one number (the monthly payment) and hide the total cost and trade-offs. |
| **Secondary user** | The **Manager**, a loan officer or mortgage broker who prepares quotes for clients. | Today they build quotes in personal spreadsheets, which drift, contain formula errors, and look different in every branch. A shared, tested calculator gives consistent numbers. |
| **Supporting user** | The **Admin**, the person who deploys the app for an office (IT staff or a technical broker). | Someone has to set the currency, defaults, limits, loan product presets and disclaimer. This should be one config file, not a code change. |
| **Core problem** | "What will this loan really cost me each month and in total, and how do my choices (down payment, term, rate, extra payments) change that?" | This is the decision people get wrong. The monthly payment alone hides that a 30-year loan can cost more in interest than the amount borrowed. |
| **Scope boundary** | A **loan calculator** (side-by-side comparison is planned as L4, not built), not a loan application, credit check or rate marketplace. | Keeps the app free of personal data, accounts and servers, which the requirements demand anyway. |
| **Architecture** | **100% client-side** static web app. No backend, no accounts, no API keys, no tracking. | Meets the "run locally with no paid services" requirement, avoids storing financial data, and can be hosted free on any static host. |
| **How roles are enforced** | Roles are **responsibilities, not logins**. The Admin acts through `public/config.json` and deployment. Manager and Loanee use the same UI. | Any login in a purely client-side app would be fake security, because anyone can bypass it in the browser's developer tools. If real access control is ever needed, it requires a backend (see §9). |

## 2. Product scope

### 2.1 What the product does (v1, product view)

This is the full product plan. Each item says whether it exists in this build.

**Must have**
1. Monthly principal-and-interest payment from home price, down payment, interest rate and term. **Built.**
2. Total amount paid, total interest, and payoff date. **Built.**
3. Full amortization schedule (monthly and yearly views), exportable to CSV. **Built.**
4. Clear, field-level validation. No crash, `NaN`, `Infinity` or negative output ever reaches the screen. **Built.**
5. Correct handling of a 0% interest rate (the standard formula divides by zero there). **Built.**
6. Side-by-side comparison of up to 3 scenarios. **Not built** (L4).
7. Effect of extra monthly payments: interest saved and months saved. **Built.**
8. Shareable URL that restores a scenario; printable quote summary. **Not built** (L7, M2, M3).
9. Admin config file: currency, locale, defaults, input limits, loan product presets, disclaimer. **Built.**
10. Works in current Chrome, Edge, Firefox and Safari, on phone and desktop widths. **Built; checked in Chromium only.** The manual check in the four browsers is still to be done (L10).

**Should have** (none built)
- Estimated monthly housing cost including property tax, home insurance and fees.
- Reverse calculation: "What can I borrow for a monthly budget of X?"
- Remember the last scenario in the browser (local storage only, never sent anywhere).

**Could have** (not built)
- Down payment entered as a percentage of the home price.

**Won't have in v1**
- Accounts, login, server-side storage, live market rates, credit scoring, loan application forms.

### 2.2 Scope for this submission

The assignment allows 2 to 4 hours, and every story marked Implemented must pass all of its acceptance criteria. A small app that works beats a large one that half works, and an honest "Not implemented" beats an overstated claim. So this build is cut to the stories that answer the core problem, plus the minimum config and run setup a reviewer needs.

| Tier | Stories / items | Notes |
|---|---|---|
| **Core (will build and test)** | L1, L2, L3, L5, L8, L10, M1, A1, A2, A3, A4, A5 | A3 covers the on-screen footer only. A5 covers local run, unit tests and build. L10 is verified by a manual check in Chrome, Edge, Firefox and Safari, written up in the README. L8.6 is verified by boundary and extreme-value unit tests plus a loop over about 1,000 random inputs. |
| **Stretch (only if time allows)** | L4, L7, M2, A6 | A6 is a small Playwright smoke test on Chromium, Firefox and WebKit plus the "no external requests" check. |
| **Not in this build (kept as specified future work)** | L6, L9, L11, L12, M3, M4, A7 | A7 is the GitHub Pages deployment. Also not in this build: the axe-core accessibility check, the 10,000-run fuzz test and the 95% coverage target. |

**Priority vs. scope.** MoSCoW priority (Must, Should, Could) is the product view. It says how much the feature matters to users. The tier above is the plan for this submission. So L4, L7 and M2 stay "Must" for the product even though they are Stretch here. L11 is a Should and L12 a Could, and neither is built.

**Result of this build** (statuses in [User Stories](user-stories.md)):

| Status | Stories |
|---|---|
| Implemented (every criterion passes) | L1, L2, L3, L5, L8, M1, A1, A2, A3, A4 |
| Core, but not yet Implemented | L10 (built and checked in Chromium; manual check in Chrome, Edge, Firefox and Safari pending), A5 (runs, tests and builds from a fresh clone; the network check was done in Chromium through Playwright, not by hand) |
| Stretch, not built | L4, L7, M2, A6 |
| Not in this build | L6, L9, L11, L12, M3, M4, A7 |

## 3. Calculation rules

Standard fixed-rate amortizing loan:

```
P = home price − down payment          (principal)
r = annual rate ÷ 12 ÷ 100             (monthly rate)
n = term in years × 12                 (number of payments)

if r = 0:  M = P ÷ n                   (avoids division by zero)
else:      M = P · r · (1 + r)^n ÷ ((1 + r)^n − 1)
```

**Rounding rule (one method, used everywhere).** The schedule works in integer cents (the currency's minor unit).
- The regular payment is M rounded half-up to the nearest cent.
- Each month, interest = balance × r, rounded half-up to the nearest cent. Principal = payment − interest.
- With an extra payment, the month's payment is regular payment + extra, capped at balance + interest.
- The final payment is whatever clears the balance: remaining balance + that month's interest. The last row's balance is exactly 0.00.
- Totals are sums of the rounded rows.

**Rules that prevent wrong results**
- **Every schedule loop runs at most n rows.** Row n always clears the balance. With extra payments the loop stops as soon as the balance reaches 0. No loop can depend on the balance reaching 0 by itself (in the planning session, a script that did this hung on a tiny loan).
- **Loan too small for the term.** If the rounded regular payment is 0.00, or is not greater than the first month's rounded interest (so the balance would never go down and the final payment would be a balloon), the app shows "The loan amount is too small for this term." and no results. Examples: a loan of 1 over 40 years at 0% (payment 0.00), and a loan of 1 over 40 years at 30% (payment 0.03, first month's interest 0.03).
- Before formatting, every result is checked with `Number.isFinite`. A non-finite or negative result is treated as a bug. The UI shows "Could not calculate this loan. Please check your inputs." and logs details to the console. It never displays `NaN` or `Infinity`.
- `n = 0` is impossible because term validation rejects it, but the calculation function also guards against it.
- At very high rates and long terms, the rounding of the regular payment compounds. The final payment can then differ noticeably from the regular one, for example 2,514,276.86 vs 2,500,017.80 at the maximum values below. This is expected and correct for a cent-rounded schedule.

**Reference values used in tests** (computed with an independent script using the rule above)

| Principal | Rate | Term | Monthly payment | Final payment | Total interest | Total paid |
|---|---|---|---|---|---|---|
| 300,000.00 | 6.00% | 30 years | 1,798.65 | 1,800.09 | 347,515.44 | 647,515.44 |
| 200,000.00 | 5.00% | 15 years | 1,581.59 | 1,580.87 | 84,685.48 | 284,685.48 |
| 120,000.00 | 0.00% | 10 years | 1,000.00 | 1,000.00 | 0.00 | 120,000.00 |
| 1.00 | 0.001% | 1 year | 0.08 | 0.12 | 0.00 | 1.00 |
| 100,000,000.00 | 30.00% | 40 years | 2,500,017.80 | 2,514,276.86 | 1,100,022,803.06 | 1,200,022,803.06 |
| 300,000.00 + 200/month extra | 6.00% | 30 years | 1,798.65 (+200) | 716.87 (payment 279) | 256,341.57 | 556,341.57 |

With 200 extra per month, the 300,000 loan ends after 279 payments instead of 360, so 81 months are saved and 91,173.87 of interest is saved.

The naive check "1,798.65 × 360 − 300,000 = 347,514.00" differs from the schedule by 1.44 because of the final-payment adjustment. Tests use the schedule value.

Reverse calculation (Should, not in this build): a budget of 1,798.65 at 6% over 30 years gives a maximum loan of 299,999.74.

## 4. Technical plan

| Area | Choice | Reason |
|---|---|---|
| Language | TypeScript | Types catch unit mistakes (percent vs. fraction, years vs. months) early. |
| UI | Plain TypeScript + HTML/CSS, no framework | Small app. Fewer dependencies mean fewer things to break for a reviewer. |
| Build / dev server | Vite | Free, one command to start, outputs plain static files. |
| Unit tests | Vitest, with happy-dom for the UI tests | Same toolchain as Vite. Tests the engine, parsing, validation, config loading, CSV and the UI (DOM) behaviour. |
| Browser check (Core) | Manual checklist in current Chrome, Edge, Firefox and Safari, results recorded in the README | Directly verifies the browser requirement without adding Playwright to the core build. |
| Browser tests (Stretch, not built) | Playwright smoke test on Chromium, Firefox and WebKit (A6) | Would automate the same check. |
| Number formatting | `Intl.NumberFormat` | Built into all target browsers. Handles currency and locale. |
| Hosting | Local only for this submission. GitHub Pages (A7) is future work. | The assignment requires a local run with no cloud services. |

**Module layout**

```
src/
  engine/       amortize.ts, parse.ts, validate.ts       ← pure functions, no DOM
  config/       defaults.ts, schema.ts, loadConfig.ts    ← reads and validates public/config.json
  ui/           app.ts (wiring), form.ts, results.ts, schedule.ts, presets.ts,
                csv.ts, format.ts, layout.ts, styles.css
  messages.ts   ← every user-facing text; error texts match the Error messages table
  main.ts
public/
  config.json   ← the Admin edits this file
tests/
  unit/         amortize, parse, validate, config, csv, ui (happy-dom), setup
```

The engine stays pure so tests can prove its correctness independently of the UI. All error texts live in one module so the app and the tests use the same strings as the [Error messages table](user-stories.md#error-messages).

## 5. Error handling strategy

The exact wording of every message is in the [Error messages table](user-stories.md#error-messages). That table is the single source. This section only describes behaviour.

| Case | Behaviour |
|---|---|
| Empty (required field), non-numeric or out-of-range input | Inline range message under the field, built from the configured limits (E1, E2, E4, E5, E6). Results area shows E8. |
| Down payment ≥ home price | "Down payment must be less than the home price." (E3). |
| 0% interest | Calculated as principal ÷ months. Not an error. |
| Term of 0 or above 40, or not a whole number | Same range message as any other invalid term: "Enter a whole number of years between 1 and 40." (E5). |
| Regular payment rounds to 0.00, or is not greater than the first month's interest | "The loan amount is too small for this term." (E7). |
| Extra payment larger than remaining balance | Accepted. The loan ends early and the last payment is reduced to what is owed. |
| Pasted values like `1,500,000` or `6.5%` | Thousands separators, surrounding spaces and a trailing `%` (rate only) are accepted and normalised. Anything else is rejected with the field's message. |
| Non-finite or negative result | E10, details logged to the console. |
| Broken or missing `config.json` | App starts with built-in defaults and shows a dismissible banner (E11, E12). |
| Unexpected runtime error | Global error handler shows E9. The page never goes blank. |
| Broken shared URL (L7, not built) | Planned: valid fields are restored, invalid ones reset to defaults, notice E13. |

## 6. Delivery milestones (this submission)

Status on 2026-11-06: milestones 1–3 done; milestone 4 partly done (the app runs, tests and builds; the README and the manual check in four browsers are still to do); milestone 5 not started; milestone 6 in progress.

1. **Engine (Core):** parsing, validation, amortization with the rounding rule and loop cap, extra payments. Unit tests for every reference value, every boundary in the stories, and a loop over about 1,000 random inputs that asserts no `NaN`, `Infinity`, negative value or exception. Serves L1, L2, L3, L5, L8.
2. **Config (Core):** `public/config.json` loading, per-field validation and fallback, presets, footer text. Unit tests with malformed configs. Serves A1, A2, A3, A4.
3. **Core UI (Core):** inputs, results, schedule (monthly/yearly), CSV download, extra payment, preset selector, accessible error messages, global error handler. Serves L1, L2, L3, L5, L8, M1.
4. **Run, browsers and README (Core):** `npm run dev`, `npm test` and `npm run build` work from a clean clone. Manual check in Chrome, Edge, Firefox and Safari at desktop and 360 px width. README written. Serves L10, A5.
5. **Stretch, in this order, only if time allows:** L4 comparison, L7 share link and print, M2 client quote, A6 Playwright smoke test.
6. **Close-out:** update every story's status in [User Stories](user-stories.md) to match what the app does, and record any shortfall in the README.

## 7. README outline (for the reviewer)

1. **What it is and who it is for.** A mortgage calculator for people deciding on a home loan (Loanee), with presets for loan officers (Manager) and a config file for whoever deploys it (Admin).
2. **Why I chose a mortgage calculator.** The monthly payment hides the total cost. A 30-year loan at 6% costs more in interest than the amount borrowed, and there are real edge cases to get right (0% rate, rounding, final payment, tiny and huge loans).
3. **How to run it.**
   ```
   Prerequisites: Node.js 22.12 or newer (free). Nothing else.

   git clone <repo> && cd mortgage-calculator
   npm install
   npm run dev          # open the printed http://localhost:5173 link
   npm test             # unit tests
   npm run build        # static files in dist/; serve with any static server, e.g. npx vite preview
   ```
   No accounts, API keys or cloud services.
4. **Configuring it (Admin).** Every `public/config.json` field with an example, and what happens when a field is invalid.
5. **Browser check.** The manual checklist and its results for current Chrome, Edge, Firefox and Safari (browser versions and date), desktop and 360 px width.
6. **What is implemented.** The story list with Implemented / Not implemented, linking to [User Stories](user-stories.md).
7. **How it was built.** AI tool and model: Claude Code with Claude Opus 5.5. Session transcripts are in `transcripts/`. A list of any code changed by hand, with the reason, or "none".
8. **Assumptions.** Copied from §8 below, plus any added during the build.
9. **Documents.** Links to the four files in `docs/`.

## 8. Assumptions

- Fixed-rate, fully amortizing loans with monthly payments only. No adjustable rates, interest-only periods, balloon loans or fees financed into the loan.
- The first payment falls in the month after today. The payoff date is the month of the last payment. Dates are shown as month and year.
- Money is rounded to cents (2 decimal places). Currencies with 0 or 3 minor digits are out of scope for v1.
- Input parsing accepts `,` as a thousands separator and `.` as the decimal point, whatever the display locale. Display formatting follows the configured locale.
- The term is a whole number of years.
- Default limits: home price 1 to 100,000,000; down payment 0 to less than the home price; interest rate 0 to 30%; term 1 to 40 years; extra payment 0 to 10,000,000. The Admin can change them.
- Results are estimates, not loan offers. The disclaimer says so.
- The app needs Node.js 22.12 or newer to install, test and build. Node 20 reached end-of-life in April 2026, and the current Vite and Vitest releases require Node 22.12+ (Vitest 5 does not support Node 20). `.nvmrc` pins major version 22 for nvm users.

## 9. Risks and future work

- **No real access control.** Anyone with the files can change the config. Acceptable for a calculator. If offices need locked presets or saved client quotes, a later version needs a small backend with authentication.
- **Rates are entered, not fetched.** Avoids paid APIs and stale or misleading "live" rates. The Admin maintains presets.
- **Not financial advice.** A configurable disclaimer is shown on screen. This build has no printed quote (L7 and M2 are not built), and the CSV export does not include the disclaimer.
- **Tiny loans at high rates.** Cent rounding can stop a tiny loan from amortizing. A loan of 1 at 30% over 40 years would pay 0.03 a month, all of it interest, and then a balloon of 1.03 in the final month. Users would read that as a normal loan, so the app rejects it with E7 instead (see §3).
- **Future work** is listed in §2.2 under "Not in this build".

# Mortgage Calculator

A mortgage calculator that runs entirely in the browser. It shows the monthly payment, the total interest and total paid, the payoff date, the effect of an extra monthly payment, and the full repayment schedule (monthly or yearly, downloadable as CSV).

## Who it is for

| Role | Who | What they do in the app |
|---|---|---|
| **Loanee** | Someone deciding whether and how to take a home loan | Enters price, down payment, rate and term, and tries "what if" changes |
| **Manager** | A loan officer or broker answering clients | Picks one of the office's loan products, which fills in the rate and term |
| **Admin** | Whoever sets the app up for an office | Edits `public/config.json`: currency, locale, defaults, limits, products, disclaimer |

**Why a mortgage calculator:** the monthly payment hides the real cost. A 30-year loan at 6% costs more in interest than the amount borrowed, and only the total and the schedule make that visible. It also has real edge cases to get right: a 0% rate, cent rounding and the final payment, and loans that are tiny or huge.

## Run it

**Prerequisites:** [Node.js](https://nodejs.org) 22.12 or newer. Nothing else: no accounts, API keys or cloud services.

```sh
git clone <repository-url>
cd <repository-folder>
npm install
npm run dev        # prints http://localhost:5173 — open it
npm test           # unit tests (Vitest)
npm run build      # type-checks and writes static files to dist/
npm run preview    # serves dist/ at http://localhost:4173
```

## Try each role

**Loanee.** Open the app. The defaults (350,000 / 50,000 / 6% / 30 years) show **$1,798.65** a month. Change any field and the results update immediately. Type `abc` as the home price and leave the field to see the error handling. Enter `200` as the extra monthly payment to see the months and interest saved. Switch the schedule to **Yearly**, or click **Download CSV**.

**Manager.** Choose **Loan product → 15-year fixed**. The rate (5.75) and term (15) are filled in, and the product's description appears. Edit the rate and the selector switches back to **Custom**, so the figures are never labelled with a product they no longer match.

**Admin.** Edit `public/config.json`, save, and reload the page (the dev server doesn't need a restart):
1. Set `"officeName": "Your Office"`. It appears in the header and the footer.
2. Set `"currency": "EUR"` and `"locale": "de-DE"`. The payment shows as **1.798,65 €**.
3. Add a product to `"presets"`: `{ "id": "f20", "name": "20-year fixed", "ratePercent": 6.25, "termYears": 20 }`. It appears in the selector.
4. Add a bad one: `{ "id": "j", "name": "Jumbo", "ratePercent": 35, "termYears": 30 }`. It is left out, and a banner says *"Some settings were invalid and defaults are used instead: presets: Jumbo."* The console logs the details.

Undo your edits afterwards. A missing or broken `config.json` never stops the calculator: it falls back to built-in defaults and shows a banner.

## Config reference (`public/config.json`)

Every key is optional. A missing key silently uses its default. An invalid value falls back to its default and is listed in the banner. Unknown keys (such as a typo like `"currncy"`) are listed in the banner too.

| Key | Type | Default | Example |
|---|---|---|---|
| `currency` | ISO 4217 code with exactly 2 decimals (lowercase is accepted). JPY and KWD are rejected, because amounts are calculated in cents. | `"USD"` | `"EUR"` |
| `locale` | BCP 47 language tag, used for number and date formatting | `"en-US"` | `"de-DE"` |
| `officeName` | text, shown in the header and footer | none | `"Riverside Mortgages"` |
| `disclaimer` | text, shown in the footer (always as plain text, never HTML) | `"Estimates only. Not a loan offer or financial advice."` | `"Figures are estimates."` |
| `defaults.homePrice` | number, starting value | `350000` | `400000` |
| `defaults.downPayment` | number, must be below `defaults.homePrice` | `50000` | `80000` |
| `defaults.ratePercent` | number, % per year, up to 3 decimals | `6` | `5.5` |
| `defaults.termYears` | whole number of years | `30` | `25` |
| `defaults.extraPayment` | number (0 shows an empty field) | `0` | `100` |
| `limits.homePrice` | `{ "min", "max" }` | `{ "min": 1, "max": 100000000 }` | `{ "min": 50000, "max": 2000000 }` |
| `limits.ratePercent` | `{ "min", "max" }` | `{ "min": 0, "max": 30 }` | `{ "min": 0, "max": 15 }` |
| `limits.termYears` | `{ "min", "max" }`, whole numbers | `{ "min": 1, "max": 40 }` | `{ "min": 5, "max": 30 }` |
| `limits.extraPayment` | `{ "min", "max" }` | `{ "min": 0, "max": 10000000 }` | `{ "min": 0, "max": 5000 }` |
| `presets` | list of products: `id` (text, unique), `name` (text), `ratePercent` (number within the rate limit), `termYears` (whole number within the term limit), `description` (text, optional) | none (selector hidden) | `[{ "id": "f15", "name": "15-year fixed", "ratePercent": 5.75, "termYears": 15, "description": "Lower total interest" }]` |

**Rules.** Limits can only narrow the default limits in the table, never widen them, because the calculation is tested within those ranges. Defaults and presets are checked against the limits in use. If two presets share an `id`, the first one wins.

## Status

What the app does today is tracked story by story in [docs/user-stories.md](docs/user-stories.md). A story is **Implemented** only when every one of its acceptance criteria passes.

| Status | Stories |
|---|---|
| Implemented | L1, L2, L3, L5, L8, M1, A1, A2, A3, A4 |
| Not implemented (Core) | **L10**: built and checked in Chromium (360 px, keyboard focus), not yet checked by hand in Chrome, Edge, Firefox and Safari. **A5**: runs, tests and builds as described above; the network check below was done in Chromium only. |
| Not implemented (Stretch / not in this build) | L4, L6, L7, L9, L11, L12, M2, M3, M4, A6, A7: comparison, affordability, sharing and printing, housing costs and the others |

**Network check (A5.4):** Chromium on 6 November 2026, run through Playwright. Loading the app, choosing a product, entering an extra payment, switching to the yearly view and downloading the CSV made exactly 4 requests, all to the app's own origin: the page, its JS and CSS, and `config.json`.

**Browser check (L10):** not yet done by hand. Planned for the current Chrome, Edge, Firefox and Safari, at desktop width and at 360 px with the device toolbar, keyboard only.

**Tests:** `npm test` runs 321 unit tests: engine, parsing, validation, config, CSV, and the UI with happy-dom.

**Documents:** [Product plan](docs/product-plan.md) · [App roles](docs/app-roles.md) · [Jobs to be done](docs/jobs-to-be-done.md) · [User stories](docs/user-stories.md) · AI session transcripts in [transcripts/](transcripts/)

## How it was built

- **AI tool:** Claude Code, model Claude Opus 5.5. The full sessions are in [transcripts/](transcripts/).
- **Code changed by hand:** none.
- **Stack:** TypeScript (strict), Vite, Vitest with happy-dom. No UI framework, no runtime dependencies.

## Assumptions

- **Roles are responsibilities, not logins.** The app has no server, so any login would be fake security. The Admin acts by editing `public/config.json`; Loanee and Manager use the same screen.
- **Not financial advice.** Results are estimates, and the disclaimer says so on screen. There is no printed quote, and the CSV export does not include the disclaimer.
- **Browsers not checked by hand yet:** see Status. Only Chromium was checked, by automation.
- **The loan:** fixed rate, monthly payments, fully amortizing. The first payment is in the month after today. Amounts are rounded to cents, each month, half-up, and the final payment absorbs the rounding.
- **Input:** `,` is the thousands separator and `.` the decimal point, whatever the display locale. The term is in whole years. Full input rules are in [docs/user-stories.md](docs/user-stories.md).
- **Privacy:** the app stores nothing (no local storage, cookies or inputs in the URL), and sends nothing except loading its own files.
- **Node.js 22.12+:** Node 20 reached end-of-life in April 2026, and the current Vite and Vitest releases need 22.12 or newer.

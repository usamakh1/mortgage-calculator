# App Roles

**Product:** Mortgage Calculator · **Version:** 1.2 · **Date:** 2026-11-06 (describes the app as built)

Related: [Product plan](product-plan.md) · [Jobs To Be Done](jobs-to-be-done.md) · [User Stories](user-stories.md)

The app has three roles. Each one is a real kind of person with different needs. The Loanee and the Manager use the same screens, but they come to them for different reasons. The Admin never uses a special screen.

---

## Loanee (primary)

A Loanee is a person deciding whether and how to take a home loan, such as a first-time buyer, an owner moving home or someone refinancing, who is usually not financially trained and is wary of entering personal details online. They can enter a home price, down payment, interest rate and term, see the monthly payment, the total interest and total paid, the payoff date and how the balance falls month by month, and try extra payments and other rates, terms and down payments before committing to anything. They must never have their inputs sent off their device or stored anywhere outside their own browser.

**Context**
- Often confuses the interest rate with the total cost of the loan.
- Uses a phone as often as a laptop, sometimes while viewing a home.
- Makes this decision a few times in a lifetime, so has no practice at it.

**What they need from the app:** understanding and confidence. Numbers they can trust, explained plainly, and enough room to try "what if" without pressure.

**Success looks like:** the Loanee can explain, in their own words, what the loan will cost per month and in total, and why they chose their option.

---

## Manager (secondary)

A Manager is a loan officer, mortgage broker or bank branch employee who prepares loan quotes for several clients a day and is accountable for what those quotes say. They can pick one of the office's loan products to fill in the rate and term, enter the client's price and down payment, show the client the monthly payment, total cost and repayment schedule on screen, and download the schedule as a CSV file. They must never be shown figures without the office's configured disclaimer on the same screen, and the app must never ask for, store or send a client's name or other personal details.

**Context**
- Time per quote matters. A slow quote means fewer clients served.
- Today relies on a personal spreadsheet that differs from colleagues' spreadsheets.
- Must show the official disclaimer on anything given to a client. This build has no printed quote (M2 is not built); the disclaimer is on screen only, and the CSV export is a working file without it.

**What they need from the app:** speed, consistency with colleagues, and compliance. Two Managers quoting the same client must get the same numbers, and every handout must carry the required wording.

**Success looks like:** two Managers quoting the same client get identical numbers, and a quote takes minutes instead of rebuilding a spreadsheet.

---

## Admin (supporting)

An Admin is the person who sets up and maintains the calculator for an office, typically IT staff or a technical broker, who can edit a JSON file and run `npm` commands but should not have to change code. They can set the currency, locale, default values, allowed ranges, loan product presets, office name and disclaimer in `public/config.json`, run the tests and serve the built files. They must never be able to collect, receive or view what users enter, and nothing they write in the config may run as code in users' browsers.

**Context**
- Responsible if the app shows wrong defaults, a withdrawn product or an outdated disclaimer.
- Edits config rarely, so mistakes are likely and must be easy to spot.

**What they need from the app:** correctness without touching code. A config mistake must be reported clearly and must never break the calculator for everyone else.

**Success looks like:** a misconfigured file never breaks the app. The Admin gets a clear message naming what is wrong, and users still get a working calculator on safe defaults.

---

## How their needs differ

| | Loanee | Manager | Admin |
|---|---|---|---|
| **Comes to the app to** | Make one big personal decision | Answer many clients quickly | Make the app correct for the office |
| **Main need** | Understanding and confidence | Speed, consistency between colleagues, compliance | Correctness without code changes |
| **Biggest risk for them** | Choosing a loan that looks cheap monthly but costs far more overall | Quoting different numbers from a colleague, or handing out a quote without the disclaimer | A config mistake that breaks the app or shows wrong values |
| **Typical use** | Tries many "what if" variations, often on a phone | Starts from a loan product preset, then adjusts price and down payment | Edits `public/config.json`, runs the tests, serves the build |
| **Must never** | Have inputs leave the browser | See figures without the disclaimer, or have a client's details stored or sent | Collect user data, or inject code through config |

## How roles are enforced

Roles are responsibilities, not logins. This is a fully client-side app with no server, so any login inside it could be bypassed by anyone who opens the browser's developer tools. A password box that protects nothing would be fake security, so the app has none.

- **The Admin acts only through `public/config.json` and deployment.** Whoever controls the hosted files is the Admin. There is no admin screen, and none is needed.
- **The Manager and the Loanee use the same interface.** The Manager's main feature, the loan product selector, is useful to Loanees too and exposes nothing sensitive.
- **Neither the Loanee nor the Manager can change config.** The UI has no way to edit presets, limits, currency or disclaimer. That keeps every Manager quoting from the same products.
- **"Must never" rules are enforced by design, not by permissions.** The app has no backend and makes no network requests besides its own files and `config.json`, so inputs cannot leave the browser. The app has no name field and stores nothing: no local storage, cookies or inputs in the URL. Config text is rendered as plain text, never as HTML.

If a future version needs locked presets, saved client files or audit trails, it needs a backend with real authentication. That is recorded as future work in the [Product plan](product-plan.md#9-risks-and-future-work), not faked in v1.

## When there is a server (Future)

The Future stories (L13, M5, M6, A8–A11) add a small server that the office hosts itself. Roles then become real accounts for the Manager and the Admin; the Loanee never needs one. The "must never" rules move from "impossible by design" to "enforced by the server on every request":

| Role | Must never | How the server would enforce it |
|---|---|---|
| Loanee | Have inputs sent off their device or stored outside their browser | The calculation stays in the browser. The server only receives what a Manager deliberately saves (M5), and a request for market rates carries none of the user's inputs (L13.8). Loanees have no account, so there is nothing to link inputs to. |
| Manager | See figures without the disclaimer; have a client's details stored or sent | A saved quote holds only a client reference, no personal fields (M5.7). The server returns a quote only to a signed-in user of the same office, checked on every request, not only by hiding links (M6.5). Sessions expire after 30 minutes without activity (M6.4). The disclaimer is still added when a quote is shown. |
| Admin | Collect, receive or view what users enter; make config text run as code | The server never receives Loanee inputs, so there is nothing to view. Admins see settings and the change log only. Every settings change is checked for the Admin role on the server (A9.2), validated with today's config rules (A10.5), and recorded in a log that cannot be edited or deleted (A11.4). Office name and disclaimer are still shown as plain text (A10.7). |

Hiding a button is only for convenience. The protection is the server refusing the request (A9.2, M6.5). The current submission has none of this: it stays fully local (see [Product plan §10](product-plan.md#10-future-architecture)).

## What differs in the app

Only the rows where roles differ are shown. Everything else (calculating, the schedule, extra payments and so on) is the same screen for Loanee and Manager.

| Capability | Loanee | Manager | Admin |
|---|:-:|:-:|:-:|
| Use the calculator screens | Yes | Yes | Yes, but not their job |
| Apply loan product presets | Yes, optional | Yes, the normal starting point | No, defines them instead |
| Define presets, defaults, limits, currency, locale, disclaimer | No | No | Yes, in `public/config.json` |
| Run tests and serve the build | No | No | Yes |

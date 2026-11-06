# Session 03: document fixes and the build

Generated from the Claude Code session log by `scripts/transcript-to-markdown.mjs`. It shows every message and every tool call with its output (click a grey line to open it). Long outputs are shortened and screenshots are replaced by a note. Claude's internal reasoning is not included, as in Claude Code's own export. Any GitHub token is replaced with [REDACTED].

This transcript ends before the user message starting "not token found"; the messages after it were left out.

---

### User · 18:22

> ## Context
> I'm doing a take-home assignment for KnowledgeCity: build a calculator web app using an AI coding
> tool, and submit the source code, the AI session transcripts and three product documents.
> I chose a MORTGAGE CALCULATOR. In an earlier session I generated planning documents, which are
> in the project root:
> - 00-product-plan.md      (product decisions, scope, calculation rules, tech plan)
> - 01-app-roles.md         (Loanee, Manager, Admin)
> - 02-jobs-to-be-done.md   (J1–J13)
> - 03-user-stories.md      (L1–L10, M1–M4, A1–A5 with acceptance criteria)
>
> Read all four files completely before doing anything.
>
> I reviewed them against the assignment rules and they need corrections. My original prompt didn't
> include those rules, so here they are, quoted from the assignment.
>
> ## Assignment rules (follow them exactly)
>
> **App Roles** – format of each entry:
> "A [role] is [who this person is and their situatioe and do in the app].
> They must never [what the app must prevent]", where the last part applies.
> "A calculator may have one role or several. Either ole describes a real
> kind of person and explains how their needs differ from the other roles."
>
> **Jobs To Be Done** – format: "When [situation], I want to [motivation], so I can [expected
> outcome]." Each job names the role it belongs to.
> "A job describes what the person needs to get done whether or not your app exists, so it does not
> mention your app or its features. If a job cannot b button or a screen,
> it is a feature, not a job."
>
> **User Stories** – format: "As a [role], I want [capability], so that [benefit]." Each story names
> the job it serves and has acceptance criteria and a
> "Every story names the job it serves, and every job names the role it belongs to. A story that
> serves no job does not belong in the list."
>
> **Acceptance criteria** – "Write specific, testable behaves, preferably
> as 'Given [starting state], when [action], then [observable result]'. Cover the normal case and
> the cases where things go wrong: invalid input, bour very small numbers,
> and what happens when the user carries on after a result or an error."
>
> **Status** – "Mark each story Implemented or Not implemented, based on what the app does today."
>
> **Example from the assignment** (a different domain, for format only):
> - App Role: "An Office Employee is a staff member wwn meetings. They can
>   see which rooms are free and see their own bookings. They can create and cancel their own
>   bookings. They must never cancel another person's
> - Job J-1 (Office Employee): "When I need to meet colleagues in person, I want to secure a suitable
>   space in advance, so I can hold the meeting withoom on the day."
> - User Story S-1 (serves J-1, Implemented): "As an Office Employee, I want to see which rooms are
>   free at a time I choose, so that I can book one w"
>   - Given rooms A and B are free from 10:00 to 11:00 and room C is booked, when I search for 10:00
>     to 11:00, then I see rooms A and B and I do not
>   - Given I enter an end time earlier than the start time, when I search, then I see the message
>     "End time must be after the start time" and no
>
> **Other requirements**
> - Runs in current Chrome, Edge, Firefox or Safari.
> - A reviewer starts it locally by following the REA, API keys or cloud
>   services.
> - Invalid input and error cases (e.g. division by zge, never a crash or
>   a wrong result.
> - Every story marked Implemented must work in the racceptance criteria
>   describe.
> - Time budget is 2–4 hours. "A small app that worksworth more than a
>   large one that does not." An honest "Not implemented" counts for more than an overstated claim.
>
> ## Problems I found (fix all of them)
>
> 1. **Roles (01)**: they use "Can do / Cannot do" bullets, not the required sentence format, and
>    have no "must never" sentence. Rewrite each role sentence, and keep
>    the useful context below it. Suggested "must never" examples: a Loanee's inputs must never be
>    sent anywhere or stored outside their browser; a client a quote
>    without the disclaimer, and the client's name must never go into a share link; the Admin must
>    never be able to collect user data. Improve thes
> 2. **Role differences (01)**: the permission matrix gives Loanee and Manager identical ✅ on every
>    row. Explain how their NEEDS differ (the Loanee nfidence; the Manager
>    needs speed, consistency between colleagues and compliance). State clearly that the Admin acts
>    through public/config.json and deployment, not tnd why (any login in
>    a client-side app would be fake security).
> 3. **Jobs contain solutions (02)**: every job has a and some job
>    statements mention features or the tool (e.g. J6 "split into principal and interest", J7
>    "share exactly what I'm looking at", J11 "without the tool
>    ourselves"). Remove all "How the app helps" lines from the jobs, and rewrite every job
>    statement so it describes the need without any swithout the app" /
>    "What goes wrong" context, because it describes the problem, not the solution. Format each job
>    heading as "J-1 (Loanee)".
> 4. **Stories don't trace to jobs (03)**: add "Serves: J-x" to every story. L9, L10 and M4 are
>    currently not mapped to any job; map them or, if to do. Update the
>    job-to-story map at the end of 02 so every story appears and every job has at least one story.
> 5. **No status (03)**: add "Status: Not implementedWe will update the
>    statuses after building.
> 6. **Inconsistent error messages**: the down-paymenproduct-plan §5
>    ("...There is nothing to borrow.") and L8.2. For term 0, the generic range message in L8.1
>    conflicts with L8.3. Choose ONE exact wording peerywhere (plan §5,
>    all stories). Then add a single "Error messages" table to 03 listing each case and its exact
>    text, so the tests and the app can use it as the
> 7. **Criteria that aren't testable or aren't Given/When/Then**: rewrite L1.5, L1.6, L3.1, L3.4
>    ("opens correctly in common spreadsheet apps"), l target browsers")
>    and any others you find into observable, testable results.
> 8. **Missing edge cases**: add Given/When/Then crit
>    - boundaries: rate 30 accepted, 30.01 rejected; term 1 and 40 accepted, 0 and 41 rejected;
>      home price at the maximum (100,000,000) acceptn payment exactly
>      equal to the price rejected
>    - very small values: home price 1, rate 0.001%,
>    - very large values: maximum price with maximum term and rate (no overflow, no NaN)
>    - carrying on after an error: given an error is field, then the
>      message disappears and the correct results appear
>    - carrying on after a result: given results are nput, then all
>      results and the schedule update, and nothing from the previous inputs remains
> 9. **Priority conflict**: L10 is a Must but includech the plan lists as
>    a Should. Split it so priorities are consistent.
> 10. **Check the numbers**: verify the reference valries (1,798.65;
>     1,581.59; 1,000.00; total interest ≈ 347,515; reverse calculation ≈ 300,000) by calculating
>     them, and correct any that are wrong.
>
> ## Scope decision
> Add a section "Scope for this submission" to the product plan, with this split and the reason
> (2–4 hour budget, and Implemented stories must pass
> - **Core (will build and test):** L1, L2, L3, L5, L8, M1, A1, A3, A4, A5 (local run, unit tests,
>   build)
> - **Stretch (only if time allows):** L4, L7, M2
> - **Not in this build (kept as specified future worGitHub Pages
>   deployment, the axe-core check, the 10,000-run fuzz test and the 95% coverage target
> Mark the Definition of Done items we're not doing a this submission".
> Make sure the plan's milestones (§6) and README outline (§7) match this scope. The README outline
> must also include: who the app is for and why I choodel I used
> (Claude Code, Claude Opus 5.5), any code changed by hand, and the assumptions.
>
> ## Folder layout
> Move and rename the files into the required submissnks between them:
> - docs/product-plan.md
> - docs/app-roles.md
> - docs/jobs-to-be-done.md
> - docs/user-stories.md
> Leave the existing transcripts/ folder as it is. Don't create any app code yet.
>
> ## How to work
> 1. First, give me a numbered list with your planned1–10), the scope
>    section and the folder move. Point out anything in my list you disagree with, or anything else
>    you notice that breaks the rules above.
> 2. Wait for my approval.
> 3. Apply the changes, then show me the final folderper file.
> 4. Finally, check your own work against every rule in "Assignment rules" and report anything that
>    still doesn't comply.

### Claude · 18:22

I'll start by reading all four planning documents in full.

<details><summary>Shell: List project files and line counts</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && ls -la && ls -la transcripts 2>/dev/null; wc -l *.md
```

Output:

```
total 88
drwxr-xr-x    7 dev  staff    224 Nov  6 18:18 .
drwx------@ 221 dev  staff   7072 Nov  6 17:54 ..
-rw-r--r--@   1 dev  staff   9140 Nov  6 17:50 00-product-plan.md
-rw-r--r--@   1 dev  staff   5226 Nov  6 17:51 01-app-roles.md
-rw-r--r--@   1 dev  staff   6723 Nov  6 17:51 02-jobs-to-be-done.md
-rw-r--r--@   1 dev  staff  14720 Nov  6 17:51 03-user-stories.md
drwxr-xr-x@   3 dev  staff     96 Nov  6 18:18 transcripts
total 80
drwxr-xr-x@ 3 dev  staff     96 Nov  6 18:18 .
drwxr-xr-x  7 dev  staff    224 Nov  6 18:18 ..
-rw-r--r--@ 1 dev  staff  39668 Nov  6 18:21 session-02.md
     143 00-product-plan.md
     109 01-app-roles.md
     120 02-jobs-to-be-done.md
     208 03-user-stories.md
     580 total
```

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/00-product-plan.md</summary>



Output:

````
1	# Mortgage Calculator: Product & Build Plan
2
3	**Status:** Draft v1.0 · **Date:** 2026-11-05 · **Owner:** Engineering
4
5	Related documents:
6	- [01 – App Roles](01-app-roles.md)
7	- [02 – Jobs To Be Done](02-jobs-to-be-done.md)
8	- [03 – User Stories & Acceptance Criteria](03-user-stories.md)
9
10	---
11
12	## 1. Product decisions (and why)
13
14	| Decision | Choice | Reason |
15	|---|---|---|
16	| **Primary user** | The **loanee**: a person deciding whether, and how, to take a home loan (first-time buyers, people refinancing). | They carry the risk and have the least tooling. Bank calculators show one number (the monthly payment) and hide the total cost and trade-offs. |
17	| **Secondary user** | The **manager**: a loan officer or mortgage broker who prepares quotes for clients. | Today they build quotes in personal spreadsheets, which drift, contain formula errors, and look different in every branch. A shared, tested calculator gives consistent numbers. |
18	| **Supporting user** | The **admin**: the person who deploys the app for an office (IT staff or a technical broker). | Someone has to set the currency, defaults, limits, loan product presets and disclaimer. This should be one config file, not a code change. |
19	| **Core problem** | "What will this loan really cost me each month and in total, and how do my choices (down payment, term, rate, extra payments) change that?" | This is the decision people get wrong. The monthly payment alone hides that a 30-year loan can cost more in interest than the house price. |
20	| **Scope boundary** | A **calculator and comparison tool**, not a loan application, credit check or rate marketplace. | Keeps the app free of personal data, accounts and servers, which the requirements demand anyway. |
21	| **Architecture** | **100% client-side** static web app. No backend, no accounts, no API keys, no tracking. | Meets the "run locally with no paid services" requirement, avoids storing financial data, and can be hosted free on any static host. |
22	| **How roles are enforced** | Roles are **responsibilities, not logins**. Admin acts through a config file at deploy time; manager and loanee use the same UI (the manager uses its quote/share features). | Any login in a purely client-side app would be fake security. Being honest about this is better than shipping a password box that protects nothing. If real access control is ever needed, it requires a backend (see §7). |
23
24	## 2. What the app does (scope for v1)
25
26	**Must have**
27	1. Monthly principal-and-interest payment from home price, down payment, interest rate and term.
28	2. Total amount paid, total interest, and payoff date.
29	3. Full amortization schedule (monthly and yearly views), exportable to CSV.
30	4. Clear, field-level validation; no crash, `NaN`, `Infinity` or negative output ever reaches the screen.
31	5. Correct handling of a 0% interest rate (the standard formula divides by zero there).
32	6. Side-by-side comparison of up to 3 scenarios.
33	7. Effect of extra monthly payments: interest saved and months saved.
34	8. Shareable URL that restores a scenario; printable quote summary.
35	9. Admin config file: currency, locale, defaults, input limits, loan product presets, disclaimer.
36
37	**Should have**
38	- Estimated monthly housing cost including property tax, home insurance and fees.
39	- Reverse calculation: "What can I borrow for a monthly budget of X?"
40	- Remember the last scenario in the browser (local storage only, never sent anywhere).
41
42	**Won't have in v1**
43	- Accounts, login, server-side storage, live market rates, credit scoring, loan application forms.
44
45	## 3. Calculation rules
46
47	Standard fixed-rate amortizing loan:
48
49	```
50	P = home price − down payment          (principal)
51	r = annual rate ÷ 12 ÷ 100             (monthly rate)
52	n = term in years × 12                 (number of payments)
53
54	if r = 0:  M = P ÷ n                   (avoids division by zero)
55	else:      M = P · r · (1 + r)^n ÷ ((1 + r)^n − 1)
56	```
57
58	Rules that prevent wrong results:
59	- All money is computed in floating point but **rounded to the currency's minor unit (cents) per payment**, and the schedule is built from rounded values. The **final payment is adjusted** so the balance ends at exactly 0.00.
60	- Before formatting, every result is checked with `Number.isFinite`. A non-finite or negative result is treated as a bug: the UI shows a clear "could not calculate" message and logs details to the console, it never displays `NaN` or `Infinity`.
… (84 more lines not shown)
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/01-app-roles.md</summary>



Output:

```
1	# App Roles
2
3	**Product:** Mortgage Calculator · **Version:** 1.0 · **Date:** 2026-11-05
4
5	## Summary
6
7	| Role | Who they are | How they use the app | Priority |
8	|---|---|---|---|
9	| **Loanee** | A person considering a home loan: first-time buyer, upgrading owner, or someone refinancing. | Uses the calculator UI directly to understand and compare loans. | Primary |
10	| **Manager** | A loan officer, mortgage broker or bank branch staff member who advises loanees. | Uses the same UI plus quote features: presets, share links, printable summaries. | Secondary |
11	| **Admin** | The person who deploys and configures the app for an office (IT staff or a technical broker). | Edits `config.json` and hosts the static files. Does not need a special screen. | Supporting |
12
13	## Design principle: roles are responsibilities, not logins
14
15	This is a fully client-side app with no server. Any login inside it could be bypassed by anyone who opens the browser developer tools, so adding one would give a false sense of security. Instead:
16
17	- **Admin** powers live in the **deployment**: whoever controls the hosted files and `config.json` is the admin.
18	- **Manager** and **Loanee** use the **same interface**. Manager features (presets, quote printing, share links) are useful to loanees too and expose nothing sensitive.
19	- **No personal data** is collected, so no role needs protection from another to keep data private.
20
21	If a future version needs locked presets, saved client files or audit trails, a backend with real authentication is required. That is recorded as future work, not faked in v1.
22
23	---
24
25	## Role: Loanee (primary)
26
27	**Goal:** Decide confidently whether a loan is affordable and which option is best.
28
29	**Context**
30	- Often not financially trained; may confuse interest rate with total cost.
31	- Uses a phone as often as a laptop.
32	- Is wary of entering personal information online.
33
34	**Can do**
35	- Enter home price, down payment, interest rate, term and optional costs (property tax, insurance, fees).
36	- See monthly payment, total interest, total paid and payoff date.
37	- View and export the amortization schedule (CSV).
38	- Compare up to 3 scenarios side by side.
39	- Model extra monthly payments.
40	- Work backwards from a monthly budget to an affordable loan amount.
41	- Share or bookmark a scenario by URL; print a summary.
42
43	**Cannot do**
44	- Change defaults, limits, presets, currency or disclaimer (admin only, via config).
45
46	**Success looks like:** the loanee can explain, in their own words, what the loan will cost per month and in total, and why they chose their option.
47
48	---
49
50	## Role: Manager (secondary)
51
52	**Goal:** Produce accurate, consistent loan quotes for clients quickly, and explain trade-offs clearly.
53
54	**Context**
55	- Handles several clients a day; time per quote matters.
56	- Currently relies on personal spreadsheets that differ between colleagues.
57	- Must show the official disclaimer on anything given to a client.
58
59	**Can do**
60	- Everything a loanee can do.
… (50 more lines not shown)
```

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/02-jobs-to-be-done.md</summary>



Output:

```
1	# Jobs To Be Done
2
3	**Product:** Mortgage Calculator · **Version:** 1.0 · **Date:** 2026-11-05
4
5	Each job is written as: **When** (situation) **I want to** (motivation) **so I can** (outcome). For each, we describe how the job gets done today without this app, what goes wrong, and how the app does it better.
6
7	---
8
9	## Loanee jobs
10
11	### J1. Know what I'll pay each month
12	**When** I find a home I like, **I want to** know the monthly payment for a realistic loan, **so I can** decide whether it fits my budget before I get emotionally invested.
13
14	- **Today, without the app:** Ask a bank and wait for a reply, use a bank's own calculator that pushes its products, or try the amortization formula in a spreadsheet and hope it's right.
15	- **What goes wrong:** Slow; biased; formula errors (annual vs. monthly rate, years vs. months) give believable but wrong numbers.
16	- **How the app helps:** Instant, tested result as you type, with plain-language error messages instead of wrong numbers.
17
18	### J2. Understand the true total cost
19	**When** I'm comparing loan lengths, **I want to** see total interest and total paid, **so I can** avoid a loan that looks cheap monthly but costs far more overall.
20
21	- **Today:** Multiply monthly payment by number of months by hand, if they think to do it at all.
22	- **What goes wrong:** Most people never do it, and miss that a 30-year loan at 6% costs more in interest than the amount borrowed.
23	- **How the app helps:** Total interest, total paid and payoff date are shown next to the monthly payment, every time.
24
25	### J3. Compare my options side by side
26	**When** I'm choosing between terms, rates or down payments, **I want to** see the options next to each other, **so I can** pick the trade-off that suits me.
27
28	- **Today:** Run the calculator several times and copy results onto paper.
29	- **What goes wrong:** Transcription mistakes; hard to see the differences.
30	- **How the app helps:** Up to 3 scenarios in one table with differences highlighted.
31
32	### J4. See whether paying extra is worth it
33	**When** I expect spare money each month, **I want to** know how extra payments change my loan, **so I can** decide between paying the loan down and saving or investing.
34
35	- **Today:** Build a full amortization spreadsheet with an extra-payment column.
36	- **What goes wrong:** Beyond most people's spreadsheet skills; easy to get the last payment wrong.
37	- **How the app helps:** Enter an extra amount and see interest saved and months saved instantly.
38
39	### J5. Work out what I can afford
40	**When** I know my comfortable monthly budget but not the price range to look at, **I want to** calculate the maximum loan for that budget, **so I can** search for homes in the right price range.
41
42	- **Today:** Trial and error in a forward calculator.
43	- **What goes wrong:** Tedious; people stop at "close enough".
44	- **How the app helps:** Reverse calculation gives the exact affordable loan and home price for a chosen down payment.
45
46	### J6. See the whole repayment over time
47	**When** I want to understand how my debt shrinks, **I want to** see every payment split into principal and interest, **so I can** understand why early payments are mostly interest and plan around it.
48
49	- **Today:** Request a schedule from the lender, often only after signing.
50	- **How the app helps:** Monthly and yearly schedule with CSV export, before any commitment.
51
52	### J7. Discuss the numbers with someone I trust
53	**When** I'm deciding with a partner, family or adviser, **I want to** share exactly what I'm looking at, **so I can** get their opinion without them re-entering everything.
54
55	- **Today:** Screenshots or reading numbers aloud.
56	- **How the app helps:** A link that reopens the identical scenario, and a clean printable summary.
57
58	---
59
60	## Manager jobs
… (61 more lines not shown)
```

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/03-user-stories.md</summary>



Output:

```
1	# User Stories with Acceptance Criteria
2
3	**Product:** Mortgage Calculator · **Version:** 1.0 · **Date:** 2026-11-05
4
5	Format: **As a** role, **I want** capability, **so that** benefit. Acceptance criteria use Given / When / Then. Priority uses MoSCoW (Must, Should, Could).
6
7	Shared definitions:
8	- **Valid ranges (defaults; admin can change):** home price 1 – 100,000,000; down payment 0 to less than home price; interest rate 0 – 30%; term 1 – 40 years; extra payment 0 – 10,000,000.
9	- **Money display:** rounded to the currency's minor unit and formatted with `Intl.NumberFormat` for the configured locale.
10	- **"Never shows a wrong result"** means: no `NaN`, `Infinity`, negative payments, or stale results from previous inputs are ever displayed.
11
12	---
13
14	## Loanee stories
15
16	### L1. Calculate monthly payment (Must)
17	**As a** loanee, **I want** to enter home price, down payment, interest rate and term and see my monthly payment, **so that** I know whether the loan fits my budget.
18
19	**Acceptance criteria**
20	1. **Given** home price 350,000, down payment 50,000, rate 6%, term 30 years, **when** inputs are complete, **then** the monthly principal-and-interest payment shows **1,798.65**.
21	2. **Given** principal 200,000, rate 5%, term 15 years, **then** the payment shows **1,581.59**.
22	3. **Given** rate **0%**, principal 120,000, term 10 years, **then** the payment shows **1,000.00** (no division-by-zero error).
23	4. **Given** I change any input, **then** results update within 200 ms without a page reload.
24	5. Down payment can be entered as an amount or a percentage of the price; switching modes keeps the same value.
25	6. The loan amount (principal) is shown so I can confirm what I'm borrowing.
26
27	### L2. See total cost of the loan (Must)
28	**As a** loanee, **I want** to see total interest, total paid and payoff date, **so that** I understand the full cost, not just the monthly amount.
29
30	**Acceptance criteria**
31	1. **Given** a valid scenario, **then** I see total interest, total amount paid and the payoff month and year.
32	2. Total paid equals the sum of all scheduled payments to the cent (verified by unit test).
33	3. **Given** principal 300,000 at 6% for 30 years, **then** total interest is approximately 347,515 (exact value matches the rounded schedule).
34	4. **Given** a start date (default: next month), **then** the payoff date is start date + term, adjusted for extra payments.
35
36	### L3. View and export the amortization schedule (Must)
37	**As a** loanee, **I want** to see each payment split into principal and interest and download it, **so that** I can see how my balance falls over time.
38
39	**Acceptance criteria**
40	1. Schedule shows payment number, date, payment, principal, interest, extra payment and remaining balance.
41	2. I can switch between **monthly** and **yearly** views; yearly totals equal the sum of their months.
42	3. The final row's remaining balance is exactly **0.00**; the final payment is adjusted for rounding.
43	4. **When** I click "Download CSV", **then** a file with the same rows downloads, with plain numbers (no currency symbols) in a header-labelled format that opens correctly in common spreadsheet apps.
44	5. The schedule is hidden or replaced with a message while inputs are invalid; it never shows rows from earlier inputs.
45
46	### L4. Compare scenarios side by side (Must)
47	**As a** loanee, **I want** to compare up to 3 loan scenarios, **so that** I can choose the best trade-off.
48
49	**Acceptance criteria**
50	1. **When** I click "Add to comparison", **then** the current scenario is added as a column (max 3).
51	2. **Given** 3 scenarios exist, **when** I try to add a 4th, **then** I see "You can compare up to 3 scenarios. Remove one to add another." and nothing is lost.
52	3. Comparison shows, for each scenario: loan amount, rate, term, monthly payment, total interest, total paid, payoff date.
53	4. The lowest monthly payment and the lowest total interest are visibly marked (not by color alone).
54	5. I can remove or rename any scenario.
55
56	### L5. Model extra payments (Must)
57	**As a** loanee, **I want** to add a fixed extra monthly payment, **so that** I can see how much interest and time I'd save.
58
59	**Acceptance criteria**
60	1. **Given** an extra monthly amount > 0, **then** I see new payoff date, months saved and interest saved compared with no extra payment.
… (149 more lines not shown)
```

</details>

All four files read. Now verifying the reference numbers (problem 10) before I draft the plan.

<details><summary>Shell: Verify reference mortgage values and edge cases</summary>

```sh
cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad && cat > check.py <<'EOF'
from decimal import Decimal as D, ROUND_HALF_UP
def pmt(P,rate,years):
    r=rate/12/100; n=years*12
    return P/n if r==0 else P*r*(1+r)**n/((1+r)**n-1)
def r2(x): return float(D(repr(x)).quantize(D('0.01'),ROUND_HALF_UP))
def sched(P,rate,years,extra=0):
    r=rate/12/100; M=r2(pmt(P,rate,years)); bal=P; tot=0; ti=0; k=0
    while bal>0.004:
        k+=1; i=r2(bal*r); pay=M+extra
        if pay>=bal+i: pay=r2(bal+i)
        prin=r2(pay-i); bal=r2(bal-prin); tot=r2(tot+pay); ti=r2(ti+i)
    return M,k,tot,ti
for a in [(300000,6,30),(200000,5,15),(120000,0,10),(1,0.001,1),(1,30,40),(1e8,30,40),(1e8,0.001,40),(1,0.001,40)]:
    print(a, round(pmt(*a),6), sched(*a))
# reverse
B=1798.65; r=0.005; n=360
print('reverse', B*((1+r)**n-1)/(r*(1+r)**n))
print('300k naive', 1798.65*360-300000)
EOF
python3 -I check.py
```

Output:

```
Command did not complete within its 120s timeout and was moved to the background (ID: bajmao4qp). Output is being written to: /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/tasks/bajmao4qp.output. You will be notified when it completes. It is running now: do not start a second copy while it runs. If it is no longer needed, stop it with TaskStop. No output had been read from it when it was moved. A program that buffers its output, or a pipe into one such as tail, can keep the output file empty until the command finishes. To check interim output, use Read on that file path.
Session cwd remains /Users/dev/Desktop/Test Project Usama; directory changes made by the backgrounded command do not apply to subsequent commands.
```

</details>

<details><summary>TaskStop</summary>

```json
{
  "task_id": "bajmao4qp"
}
```

Output:

```
{"message":"Successfully stopped task: bajmao4qp (cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad && cat > check.py <<'EOF'\nfrom decimal import Decimal as D, ROUND_HALF_UP\ndef pmt(P,rate,years):\n    r=rate/12/100; n=years*12\n    return P/n if r==0 else P*r*(1+r)**n/((1+r)**n-1)\ndef r2(x): return float(D(repr(x)).quantize(D('0.01'),ROUND_HALF_UP))\ndef sched(P,rate,years,extra=0):\n    r=rate/12/100; M=r2(pmt(P,rate,years)); bal=P; tot=0; ti=0; k=0\n    while bal>0.004:\n        k+=1; i=r2(bal*r); pay=M+extra\n        if pay>=bal+i: pay=r2(bal+i)\n        prin=r2(pay-i); bal=r2(bal-prin); tot=r2(tot+pay); ti=r2(ti+i)\n    return M,k,tot,ti\nfor a in [(300000,6,30),(200000,5,15),(120000,0,10),(1,0.001,1),(1,30,40),(1e8,30,40),(1e8,0.001,40),(1,0.001,40)]:\n    print(a, round(pmt(*a),6), sched(*a))\n# reverse\nB=1798.65; r=0.005; n=360\nprint('reverse', B*((1+r)**n-1)/(r*(1+r)**n))\nprint('300k naive', 1798.65*360-300000)\nEOF\npython3 -I check.py)","task_id":"bajmao4qp","task_type":"local_bash","command":"cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad && cat > check.py <<'EOF'\nfrom decimal import Decimal as D, ROUND_HALF_UP\ndef pmt(P,rate,years):\n    r=rate/12/100; n=years*12\n    return P/n if r==0 else P*r*(1+r)**n/((1+r)**n-1)\ndef r2(x): return float(D(repr(x)).quantize(D('0.01'),ROUND_HALF_UP))\ndef sched(P,rate,years,extra=0):\n    r=rate/12/100; M=r2(pmt(P,rate,years)); bal=P; tot=0; ti=0; k=0\n    while bal>0.004:\n        k+=1; i=r2(bal*r); pay=M+extra\n        if pay>=bal+i: pay=r2(bal+i)\n        prin=r2(pay-i); bal=r2(bal-prin); tot=r2(tot+pay); ti=r2(ti+i)\n    return M,k,tot,ti\nfor a in [(300000,6,30),(200000,5,15),(120000,0,10),(1,0.001,1),(1,30,40),(1e8,30,40),(1e8,0.001,40),(1,0.001,40)]:\n    print(a, round(pmt(*a),6), sched(*a))\n# reverse\nB=1798.65; r=0.005; n=360\nprint('reverse', B*((1+r)**n-1)/(r*(1+r)**n))\nprint('300k naive', 1798.65*360-300000)\nEOF\npython3 -I check.py"}
```

</details>

The loop hung, which is itself a finding (see below). Rerunning with a fixed number of payments, which is how the plan specifies the schedule:

<details><summary>Shell: Recompute reference values with fixed-length schedule</summary>

```sh
cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad && cat > check2.py <<'EOF'
from decimal import Decimal as D, ROUND_HALF_UP
def pmt(P,rate,years):
    r=rate/12/100; n=years*12
    return P/n if r==0 else P*r*(1+r)**n/((1+r)**n-1)
def r2(x): return float(D(repr(x)).quantize(D('0.01'),ROUND_HALF_UP))
def sched(P,rate,years):
    r=rate/12/100; n=years*12; M=r2(pmt(P,rate,years)); bal=P; tot=0; ti=0
    for k in range(1,n+1):
        i=r2(bal*r)
        pay = r2(bal+i) if k==n else M
        prin=r2(pay-i); bal=r2(bal-prin); tot=r2(tot+pay); ti=r2(ti+i)
    return dict(M=M, last=pay, total=tot, interest=ti, end=bal)
for a in [(300000,6,30),(200000,5,15),(120000,0,10),(1,0.001,1),(1,30,40),(1,30,1),(1e8,30,40),(1e8,0.001,40)]:
    print(a, 'exact=%.6f'%pmt(*a), sched(*a))
B=1798.65; r=0.005; n=360
print('reverse', B*((1+r)**n-1)/(r*(1+r)**n))
print('naive interest 300k', round(1798.65*360-300000,2))
EOF
timeout 20 python3 -I check2.py
```

Error:

```
Exit code 127
(eval):20: command not found: timeout
```

</details>

<details><summary>Shell: Run the reference value check script</summary>

```sh
cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad && python3 -I check2.py
```

Output:

```
(300000, 6, 30) exact=1798.651575 {'M': 1798.65, 'last': 1800.09, 'total': 647515.44, 'interest': 347515.44, 'end': 0.0}
(200000, 5, 15) exact=1581.587253 {'M': 1581.59, 'last': 1580.85, 'total': 284685.46, 'interest': 84685.46, 'end': 0.0}
(120000, 0, 10) exact=1000.000000 {'M': 1000.0, 'last': 1000.0, 'total': 120000.0, 'interest': 0.0, 'end': 0.0}
(1, 0.001, 1) exact=0.083334 {'M': 0.08, 'last': 0.12, 'total': 1.0, 'interest': 0.0, 'end': 0.0}
(1, 30, 40) exact=0.025000 {'M': 0.03, 'last': 1.03, 'total': 15.4, 'interest': 14.4, 'end': 0.0}
(1, 30, 1) exact=0.097487 {'M': 0.1, 'last': 0.07, 'total': 1.17, 'interest': 0.17, 'end': 0.0}
(100000000.0, 30, 40) exact=2500017.802775 {'M': 2500017.8, 'last': 2514276.86, 'total': 1200022803.06, 'interest': 1100022803.06, 'end': 0.0}
(100000000.0, 0.001, 40) exact=208375.089610 {'M': 208375.09, 'last': 208374.85, 'total': 100020042.96, 'interest': 20042.96, 'end': 0.0}
reverse 299999.7372267716
naive interest 300k 347514.0
Shell cwd was reset to /Users/dev/Desktop/Test Project Usama
```

</details>

I've read all four files and checked the numbers. Nothing has been changed yet. Here's my plan, then the points where I disagree, then a few questions.

## A note on your message first

Several lines in what you pasted are cut off mid-sentence, for example "their situatioe and do in the app", "a client a quote without the disclaimer", "Not in this build (kept as specified future wor…GitHub Pages". I could work out most of them. One I can't: **the start of the "Not in this build" list is missing.** The only items I can see are GitHub Pages, axe-core, the fuzz test and the 95% coverage target. My guess at the rest is in question 1 at the end.

## Number check (#10)

I recomputed everything with a script. The rounding rule I used: each month's interest is rounded to the cent (half-up), the payment is rounded to the cent, and the last payment pays off whatever is left.

| Value | Document says | Calculated | Verdict |
|---|---|---|---|
| 300,000 @ 6% / 30y | 1,798.65 | 1,798.651575 → **1,798.65** | ✅ |
| 200,000 @ 5% / 15y | 1,581.59 | 1,581.587253 → **1,581.59** | ✅ |
| 120,000 @ 0% / 10y | 1,000.00 | **1,000.00** | ✅ |
| Total interest, 300k / 6% / 30y | ≈ 347,515 | **347,515.44** (last payment 1,800.09) | ✅ but vague. 1,798.65 × 360 gives 347,514.00, so "≈" hides a real difference. I'll state the exact value and the rounding rule. |
| Reverse, budget 1,798.65 | ≈ 300,000 | **299,999.74** | ✅ |

**Two problems the check turned up:**
- **A. Tiny loans can produce a 0.00 payment.** A loan of 1 over 40 years at 0% is 1 ÷ 480 = 0.0021, which rounds to **0.00/month**. At 30% the rounded interest equals the rounded payment, so the balance never goes down. My first script used a "pay until the balance is 0" loop, and it **hung on exactly this case**. The real app will hit the same loop once extra payments are modelled (L5).
- **B. At the maximum values the last payment is large.** 100,000,000 at 30% over 40 years gives 2,500,017.80/month, but the last payment is 2,514,276.86. The 0.3¢ rounding difference compounds over 480 months. The result is still correct and finite, but the criteria should say this is expected.

## Planned changes

**1. Roles (01).** I'll rewrite each role in the required format: "A [role] is … They can … They must never …". The context bullets stay below each sentence. The "must never" sentences:
- **Loanee:** their inputs must never leave the browser or be stored outside it.
- **Manager:** must never hand over a quote that lacks the disclaimer and date, and a client's name must never go into a share link or storage.
- **Admin:** must never be able to collect, receive or view what users enter. Config text must never run as code (this is what A3.2 already covers).

**2. Role differences (01).** I'll replace the all-✅ matrix with a "How their needs differ" table:
- the Loanee needs understanding and confidence;
- the Manager needs speed, consistency between colleagues and compliance;
- the Admin needs correctness without touching code.

I'll keep a smaller matrix that only shows what is actually different. It will say plainly that the Admin acts through `public/config.json` and deployment, not through a screen, because any login in a client-side app would be fake security.

**3. Jobs (02).**
- Delete every "How the app helps" line.
- Keep "Today, without the app" and "What goes wrong", and fill them in where they're missing (J6, J7, J9, J11, J13).
- Change the headings to "J-1 (Loanee)".
- Rewrite every job that names a solution, not only J6, J7 and J11:
  - J3 "see the options next to each other" becomes weighing the trade-offs;
  - J6 becomes understanding how much of each payment actually reduces the debt;
  - J7 becomes getting a second opinion on the same numbers;
  - J11 and J13 lose "tool", "code" and "host";
  - J12 "presets" becomes "our loan products or the required wording".
- Drop the "Feature(s)" column from the map, so the jobs document mentions no features at all.

**4. Traceability (03, 02).** Every story gets one "Serves: J-x":
- L1→J-1, L2→J-2, L3→J-6, L4→J-3, L5→J-4, L6→J-5, L7→J-7, L8→J-1, **L9→J-1** (tax and insurance are part of what I pay each month).
- M1→J-9, M2→J-10, M3→J-10, **M4→J-8**.
- A1→J-11, A2→J-11, A3→J-11, A4→J-12, A5→J-13.
- **L10:** no job fits honestly, so I'll add **J-14 (Loanee)**: "When I'm viewing a home or talking to an agent away from my desk, I want to check the numbers on the spot, so I can decide whether to pursue it before I leave."
- **L11** (from the split in 9) → J-3, with J-3's situation widened to "over several days".

The map at the end of 02 will list every story, and every job will have at least one.

**5. Status.** Every story gets "Status: Not implemented".

**6. Error messages.**
- **Down payment:** I'll use "Down payment must be less than the home price." everywhere and drop "There is nothing to borrow."
- **Term:** one range message per field, filled in from the configured limits, so term 0 and term 41 get the same text: **"Enter a whole number of years between 1 and 40."** This settles the L8.1/L8.3 conflict. It also adds a rule that doesn't exist yet: the term must be whole years (15.5 is currently undefined).
- **Extra payment:** L5.4 "must be 0 or more" contradicts the 10,000,000 limit. It becomes "Enter an extra payment between 0 and 10,000,000."
- **New table in 03:** a single "Error messages" table listing every case with its exact text. That covers the field ranges, down payment, too-small loan (A), results placeholder, runtime error, config banner, invalid share link, the comparison limit, taxes exceeding the budget, and the 0-or-below budget.

**7. Testability.**
- I'll rewrite **every** criterion in Given/When/Then, not just the ones you listed. Most of L2–L10, M1–M4 and A1–A5 currently aren't in that form.
- **L1.5 (amount ↔ % switching):** "keeps the same value" is impossible as written. 50,000 of 350,000 is 14.2857%, which displays as 14.29, and 14.29% converts back to 50,015. The fix: the app stores the amount, switching only changes the display, and the principal stays 300,000.00.
- **L3.4 (CSV):** "opens correctly" becomes concrete checks: a fixed file name, an exact header line, comma separators, a dot for decimals, no thousands separators or currency symbols, one row per payment, and values equal to the screen.
- **L10/M2 "target browsers":** I'll name Chrome, Edge, Firefox and Safari and say how each is checked.
- **L2.4 payoff date:** this has an off-by-one. Payoff is the month of the last payment, which is the first payment + n − 1 months, not start + term. The criterion will use a fixed date.

**8. Edge cases.** I'll add G/W/T criteria for everything on your list: rate 30 ✓ and 30.01 ✗; term 1 and 40 ✓, 0 and 41 ✗; price 100,000,000 ✓ and above it ✗; down payment = price ✗.
- **Very small:** price 1, rate 0.001%, term 1 gives 0.08/month, last payment 0.12, total 1.00.
- **Very large:** 100,000,000 at 30% over 40 years gives 2,500,017.80, total 1,200,022,803.06, with no NaN.
- **Carrying on:** fixing a field after an error, and changing an input after a result (nothing stale remains).
- **Also:** the 0.00-payment case from A, and a criterion that the schedule never runs more than n rows.

**9. L10 split.** L10 "Works on my devices and browsers" stays a Must (browsers, 360 px width, keyboard). **L11** "Remember my last scenario" becomes a Should.

**10. Numbers.** I'll pin exact values: 347,515.44 total interest, last payment 1,800.09, 299,999.74 for the reverse case, and the rounding rule in plan §3.

**Scope section.** I'll add the Core / Stretch / Not-in-this-build split with your reason. I'll mark the Definition of Done items as "Not in this submission", update §6 milestones to match, and update the §7 README outline with your extra items (who the app is for, why you chose it, Claude Code with Claude Opus 5.5, hand-edited code, assumptions). I'll also fix plan §1's "(see §7)", which should point to §8.

**Folder move.** The four files become `docs/product-plan.md`, `docs/app-roles.md`, `docs/jobs-to-be-done.md` and `docs/user-stories.md`, with the links between them updated. `transcripts/` stays as it is, and no app code is created.

## Where I disagree, or the scope breaks a rule

- **a. Browser support isn't in Core, but it's an assignment rule.** "Runs in current Chrome, Edge, Firefox or Safari" is required, and L10 is in none of your lists. **Recommendation:** put L10 in Core and verify it with a manual check in each browser, written up in the README. That keeps Playwright out of scope.
- **b. M1 (Core) needs A2 (not in Core).** Presets can't be picked unless they're defined in config. **Recommendation:** add A2 to Core. It's small.
- **c. A5 and A3 can't be marked Implemented if they're only partly built.**
  - A5 includes Playwright e2e, the "no external requests" e2e test and GitHub Pages. **Recommendation:** keep the local run, unit tests and build in A5 (Core), and move the rest to a new **A6** (Not in this build).
  - A3.1 says "on every print", but printing is Stretch. **Recommendation:** limit A3 to the on-screen footer and move the print parts into M2 and L7.
- **d. L8.6 is "verified by fuzz tests", but the fuzz test is out of scope.** **Recommendation:** verify it with the boundary and extreme-value unit tests from item 8.
- **e. Small-loan rule (finding A).** **Recommendation:** if the regular payment rounds to 0.00, show "The loan amount is too small for this term." Every schedule loop is also capped at n payments.
- **f. L1 is bigger than it needs to be (optional).** The amount/% switch adds work and risk to a Core story. You could split it into its own Could story.
- Stretch stories L4, L7 and M2 keep their "Must" priority. Priority describes the product, and scope describes this submission. I'll explain the difference in the scope section rather than change the priorities.

## Questions before I start

1. **What's missing from the "Not in this build" list?** My guess: L6, L9, L11, M3, M4, A2 (unless you take b), the new A6, Playwright, GitHub Pages, axe-core, the fuzz test and 95% coverage.
2. Do you accept **a–e** (and **f**, if you want it)?
3. Are you OK with adding **J-14** and with the term message "Enter a whole number of years between 1 and 40."?

Once you approve, I'll apply everything, show you the folder tree and a summary per file, and then check the result against every assignment rule.

---

### User · 18:29

> Thanks, good catches, especially the 0.00-payment hang and the payoff-date off-by-one.
> Yes, my paste was truncated. Answers:
>
> 1. Full "Not in this build" list: L6, L9, M3, M4, GitHub Pages, axe-core, the 10,000-run fuzz
>    test and the 95% coverage target. With your changes below, A2 moves to Core.
>
> 2. Decisions:
>    a. Accept. Add L10 to Core. Verify it with a manual check in Chrome, Edge, Firefox and Safari,
>       written up in the README. Keep a small Playwright smoke test (Chromium, Firefox, WebKit) as
>       Stretch, not Core.
>    b. Accept. A2 goes into Core.
>    c. Accept both: A5 Core = local run, unit tests, build. The e2e tests, the no-external-requests
>       test and GitHub Pages move to Stretch / Not in this build. A3 Core = on-screen footer only;
>       the print parts move into M2 and L7.
>    d. Accept. Verify L8.6 with the boundary and extreme-value unit tests, plus a simple loop
>       over ~1,000 random inputs in the unit tests. Don't claim the 10,000-run fuzz test.
>    e. Accept. Use exactly "The loan amount is too small for this term." and cap every schedule
>       loop at n rows.
>    f. Accept. Move the amount/% down payment switch into its own Could story, Not in this build.
>       L1 takes the down payment as an amount only.
>    Priority vs scope: agreed, keep priority as the product view and explain it in the scope section.
>
> 3. Yes to J-14 and to "Enter a whole number of years between 1 and 40."
>
> Go ahead and apply everything, then show me the folder tree, a short summary per file, and the
> final compliance check against the assignment rules

### Claude · 18:29

<details><summary>Skill</summary>

```json
{
  "skill": "unsloppify"
}
```

Output:

```
Launching skill: unsloppify
```

</details>

Applying now. First I'll recheck the reference values using integer cents, since that's the rounding method I'll write into the plan.

<details><summary>Shell: Recompute values using integer-cent rounding</summary>

```sh
cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad && cat > check3.py <<'EOF'
import math
def M(P,rate,n):
    r=rate/1200
    return P/n if r==0 else P*r*(1+r)**n/((1+r)**n-1)
def hu(x): return math.floor(x+0.5)
def sched(price,down,rate,years,extra=0):
    n=years*12; r=rate/1200; Pc=round((price-down)*100)
    mc=hu(M(Pc,rate,n));
    if mc==0: return 'TOO SMALL'
    bal=Pc; tot=0; ti=0; rows=0
    for k in range(1,n+1):
        i=hu(bal*r); pay=mc+round(extra*100)
        if k==n or pay>=bal+i: pay=bal+i
        bal-=pay-i; tot+=pay; ti+=i; rows=k
        if bal==0: break
    return dict(M=mc/100,last=pay/100,total=tot/100,interest=ti/100,rows=rows,end=bal)
cases=[(350000,50000,6,30),(200000,0,5,15),(120000,0,0,10),(1,0,0.001,1),(1,0,0,40),(1,0,30,40),(1e8,0,30,40),(1e8,0,0.001,40),(1e8,0,30,1),(300000,0,6,30,200),(300000,0,6,30,400000)]
for c in cases: print(c, sched(*c))
B=1798.65; r=0.005; n=360
print('rev', B*((1+r)**n-1)/(r*(1+r)**n), 'rev0', 1000*120)
EOF
python3 -I check3.py
```

Output:

```
(350000, 50000, 6, 30) {'M': 1798.65, 'last': 1800.09, 'total': 647515.44, 'interest': 347515.44, 'rows': 360, 'end': 0}
(200000, 0, 5, 15) {'M': 1581.59, 'last': 1580.87, 'total': 284685.48, 'interest': 84685.48, 'rows': 180, 'end': 0}
(120000, 0, 0, 10) {'M': 1000.0, 'last': 1000.0, 'total': 120000.0, 'interest': 0.0, 'rows': 120, 'end': 0}
(1, 0, 0.001, 1) {'M': 0.08, 'last': 0.12, 'total': 1.0, 'interest': 0.0, 'rows': 12, 'end': 0}
(1, 0, 0, 40) TOO SMALL
(1, 0, 30, 40) {'M': 0.03, 'last': 1.03, 'total': 15.4, 'interest': 14.4, 'rows': 480, 'end': 0}
(100000000.0, 0, 30, 40) {'M': 2500017.8, 'last': 2514276.86, 'total': 1200022803.06, 'interest': 1100022803.06, 'rows': 480, 'end': 0}
(100000000.0, 0, 0.001, 40) {'M': 208375.09, 'last': 208374.85, 'total': 100020042.96, 'interest': 20042.96, 'rows': 480, 'end': 0}
(100000000.0, 0, 30, 1) {'M': 9748712.7, 'last': 9748712.68, 'total': 116984552.38, 'interest': 16984552.38, 'rows': 12, 'end': 0}
(300000, 0, 6, 30, 200) {'M': 1798.65, 'last': 716.87, 'total': 556341.57, 'interest': 256341.57, 'rows': 279, 'end': 0}
(300000, 0, 6, 30, 400000) {'M': 1798.65, 'last': 301500.0, 'total': 301500.0, 'interest': 1500.0, 'rows': 1, 'end': 0}
rev 299999.7372267716 rev0 120000
Shell cwd was reset to /Users/dev/Desktop/Test Project Usama
```

</details>

<details><summary>Shell: Create the docs folder</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && mkdir -p docs && ls
```

Output:

```
00-product-plan.md
01-app-roles.md
02-jobs-to-be-done.md
03-user-stories.md
docs
transcripts
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/docs/product-plan.md</summary>

```
# Mortgage Calculator: Product & Build Plan

**Status:** Draft v1.1 · **Date:** 2026-11-06 · **Owner:** Engineering

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
| **Scope boundary** | A **calculator and comparison tool**, not a loan application, credit check or rate marketplace. | Keeps the app free of personal data, accounts and servers, which the requirements demand anyway. |
| **Architecture** | **100% client-side** static web app. No backend, no accounts, no API keys, no tracking. | Meets the "run locally with no paid services" requirement, avoids storing financial data, and can be hosted free on any static host. |
| **How roles are enforced** | Roles are **responsibilities, not logins**. The Admin acts through `public/config.json` and deployment. Manager and Loanee use the same UI. | Any login in a purely client-side app would be fake security, because anyone can bypass it in the browser's developer tools. If real access control is ever needed, it requires a backend (see §9). |

## 2. Product scope

### 2.1 What the product does (v1, product view)

**Must have**
1. Monthly principal-and-interest payment from home price, down payment, interest rate and term.
2. Total amount paid, total interest, and payoff date.
3. Full amortization schedule (monthly and yearly views), exportable to CSV.
4. Clear, field-level validation. No crash, `NaN`, `Infinity` or negative output ever reaches the screen.
5. Correct handling of a 0% interest rate (the standard formula divides by zero there).
6. Side-by-side comparison of up to 3 scenarios.
7. Effect of extra monthly payments: interest saved and months saved.
8. Shareable URL that restores a scenario; printable quote summary.
9. Admin config file: currency, locale, defaults, input limits, loan product presets, disclaimer.
10. Works in current Chrome, Edge, Firefox and Safari, on phone and desktop widths.

**Should have**
- Estimated monthly housing cost including property tax, home insurance and fees.
- Reverse calculation: "What can I borrow for a monthly budget of X?"
- Remember the last scenario in the browser (local storage only, never sent anywhere).

**Could have**
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

**Priority vs. scope.** MoSCoW priority (Must, Should, Could) is the product view. It says how much the feature matters to users. The tier above
… (949 more characters not shown)
```

Output:

```
File created successfully at: /Users/dev/Desktop/Test Project Usama/docs/product-plan.md (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/docs/app-roles.md</summary>

```
# App Roles

**Product:** Mortgage Calculator · **Version:** 1.1 · **Date:** 2026-11-06

Related: [Product plan](product-plan.md) · [Jobs To Be Done](jobs-to-be-done.md) · [User Stories](user-stories.md)

The app has three roles. Each one is a real kind of person with different needs. The Loanee and the Manager use the same screens, but they come to them for different reasons. The Admin never uses a special screen.

---

## Loanee (primary)

A Loanee is a person deciding whether and how to take a home loan, such as a first-time buyer, an owner moving home or someone refinancing, who is usually not financially trained and is wary of entering personal details online. They enter a home price, down payment, interest rate and term, then see the monthly payment, the total interest and total paid, the payoff date and how the balance falls month by month, and they try extra payments and alternative loans before committing to anything. They must never have their inputs sent off their device or stored anywhere outside their own browser.

**Context**
- Often confuses the interest rate with the total cost of the loan.
- Uses a phone as often as a laptop, sometimes while viewing a home.
- Makes this decision a few times in a lifetime, so has no practice at it.

**What they need from the app:** understanding and confidence. Numbers they can trust, explained plainly, and enough room to try "what if" without pressure.

**Success looks like:** the Loanee can explain, in their own words, what the loan will cost per month and in total, and why they chose their option.

---

## Manager (secondary)

A Manager is a loan officer, mortgage broker or bank branch employee who prepares loan quotes for several clients a day and is accountable for what those quotes say. They pick one of the office's loan products to fill in the rate and term, enter the client's price and down payment, and (once built) print a quote or send the client a link to the same scenario. They must never be able to give a client a quote that lacks the configured disclaimer and the date it was prepared, and a client's name must never be put into a share link or stored by the app.

**Context**
- Time per quote matters. A slow quote means fewer clients served.
- Today relies on a personal spreadsheet that differs from colleagues' spreadsheets.
- Must show the official disclaimer on anything given to a client.

**What they need from the app:** speed, consistency with colleagues, and compliance. Two Managers quoting the same client must get the same numbers, and every handout must carry the required wording.

**Success looks like:** two Managers quoting the same client get identical numbers, and a quote takes minutes instead of rebuilding a spreadsheet.

---

## Admin (supporting)

An Admin is the person who sets up and maintains the calculator for an office, typically IT staff or a technical broker, who can edit a JSON file and run `npm` commands but should not have to change code. They set the currency, locale, default values, allowed ranges, loan product presets, office name and disclaimer in `public/config.json`, then run the tests and serve the built files. They must never be able to collect, receive or view what users enter, and nothing they write in the config may run as code in users' browsers.

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
| **Must never** | Have inputs leave the browser | Hand out a quote without disclaimer and date, or put a client's name in a link | Collect user data, or inject code through config |

## How roles are enforced

Roles are responsibilities, not logins. This is a fully client-side app with no server, so any login inside it could be bypassed by anyone who opens the
… (1425 more characters not shown)
```

Output:

```
File created successfully at: /Users/dev/Desktop/Test Project Usama/docs/app-roles.md (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/docs/jobs-to-be-done.md</summary>

```
# Jobs To Be Done

**Product:** Mortgage Calculator · **Version:** 1.1 · **Date:** 2026-11-06

Related: [Product plan](product-plan.md) · [App Roles](app-roles.md) · [User Stories](user-stories.md)

Each job is written as "When [situation], I want to [motivation], so I can [expected outcome]." It names the role it belongs to. A job describes what the person needs to get done whether or not this app exists, so it says nothing about the app or its features. Below each job, "Today" describes how people get it done now and "What goes wrong" describes the problem. Neither describes a solution.

---

## Loanee jobs

### J-1 (Loanee). Know what I'll pay each month
When I find a home I like, I want to know what a realistic loan for it would cost me each month, so I can decide whether it fits my budget before I get emotionally invested.

- **Today:** Ask a bank and wait for a reply, use a lender's calculator that pushes its own products, or type the amortization formula into a spreadsheet and hope it's right.
- **What goes wrong:** Slow, biased, and formula mistakes (annual vs. monthly rate, years vs. months) give believable but wrong numbers. Property tax and insurance are often forgotten, so the real monthly cost is higher than expected.

### J-2 (Loanee). Understand the true total cost
When I'm choosing how long to borrow for, I want to know how much I will pay in total and how much of that is interest, so I can avoid a loan that looks cheap each month but costs far more overall.

- **Today:** Multiply the monthly payment by the number of months by hand, if they think to do it at all.
- **What goes wrong:** Most people never do it, and miss that a 30-year loan at 6% costs more in interest than the amount borrowed.

### J-3 (Loanee). Weigh my options against each other
When I'm weighing different terms, rates or down payments, often over several days, I want to understand exactly how the alternatives differ, so I can pick the trade-off that suits me.

- **Today:** Work out each option separately and copy the results onto paper or into notes, then start again the next day.
- **What goes wrong:** Transcription mistakes, lost notes, and the differences that matter (total interest, payoff date) are hard to see.

### J-4 (Loanee). Decide whether paying extra is worth it
When I expect to have spare money each month, I want to know what paying my loan down faster would gain me, so I can decide between paying it off sooner and saving or investing the money.

- **Today:** Build a month-by-month repayment spreadsheet with an extra-payment column.
- **What goes wrong:** Beyond most people's spreadsheet skills, and the last payment is easy to get wrong, so the savings figure is unreliable.

### J-5 (Loanee). Work out what I can afford
When I know what I can comfortably pay each month but not what price range that allows, I want to find the most I can borrow for that amount, so I can look at homes in the right price range.

- **Today:** Trial and error, guessing a loan amount and working out its payment until it is close to the budget.
- **What goes wrong:** Tedious, so people stop at "close enough" and search in the wrong price range.

### J-6 (Loanee). Understand how my debt shrinks
When I want to understand how my debt will go down over the years, I want to know how much of each payment actually reduces what I owe, so I can understand why the balance falls so slowly at first and plan around it.

- **Today:** Ask the lender for a repayment schedule, which often arrives only after signing.
- **What goes wrong:** By the time people see it, the decision is made. Many are surprised that after years of payments they still owe most of the loan.

### J-7 (Loanee). Get a second opinion on the same numbers
When I'm deciding with a partner, family member or adviser, I want them to see exactly the numbers I'm looking at, so I can get their opinion without them redoing the work.

- **Today:** Screenshots, reading figures aloud over the phone, or asking the other person to work it out again.
- **What goes wrong:** Screenshots miss details, and redoing the work produces slightly different numbers, so the conversation is about whose figures are right instead of which loan to take.

### J-14 (Loanee). Check the numbers away from my desk
When I'm viewing a home or talking to an agent away from my desk, I want to check the numbers on the spot, so I can decide whether to pursue it before I leave.

- **Today:** Rough mental arithmetic, or waiting until home to work it out properly.
- **What goes wrong:** Mental estimates are wrong by large amounts, and by the time the real figures are known the chance to ask questions or make an offer has passed.

---

## Manager jobs

### J-8 (Manager). Give a client a correct answer quickly
When a client asks what their payments would be and what their options are, I want to give an accurate answer within minutes that matches what my colleagues would say, so I can serve more clients and keep their trust.

- *
… (1018 more characters not shown)
```

Output:

```
File created successfully at: /Users/dev/Desktop/Test Project Usama/docs/jobs-to-be-done.md (file state is current in your context — no need to Read it back)
```

</details>

Writing the user stories next. I need a few more values for the new criteria, so computing those first:

<details><summary>Shell: Compute extra reference values for stories</summary>

```sh
cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad && cat > check4.py <<'EOF'
import math
def M(P,rate,n):
    r=rate/1200
    return P/n if r==0 else P*r*(1+r)**n/((1+r)**n-1)
hu=lambda x: math.floor(x+0.5)
def rows(P,rate,years,extra=0):
    n=years*12; r=rate/1200; bal=round(P*100); mc=hu(M(bal,rate,n)); out=[]
    for k in range(1,n+1):
        i=hu(bal*r); pay=mc+extra*100
        if k==n or pay>=bal+i: pay=bal+i
        bal-=pay-i; out.append((k,pay/100,(pay-i)/100,i/100,bal/100))
        if bal==0: break
    return mc/100,out
for c in [(300000,5,30),(300000,6,15),(300000,5.75,15)]: print(c, rows(*c)[0])
m,o=rows(300000,6,30); print('row1',o[0],'row360',o[-1])
y1=o[:12]; print('year1 pay %.2f prin %.2f int %.2f bal %.2f'%(sum(x[1] for x in y1),sum(x[2] for x in y1),sum(x[3] for x in y1),y1[-1][4]))
m,o=rows(1,0.001,1); print('tiny', o)
def rev(B,rate,n):
    r=rate/1200; return B*n if r==0 else B*(1-(1+r)**-n)/r
print('rev big', rev(1e7,30,480), 'rev 1498.65', rev(1498.65,6,360))
print('1e8 rows', len(rows(1e8,30,40)[1]))
EOF
python3 -I check4.py
```

Output:

```
(300000, 5, 30) 1610.46
(300000, 6, 15) 2531.57
(300000, 5.75, 15) 2491.23
row1 (1, 1798.65, 298.65, 1500.0, 299701.35) row360 (360, 1800.09, 1791.13, 8.96, 0.0)
year1 pay 21583.80 prin 3684.00 int 17899.80 bal 296316.00
tiny [(1, 0.08, 0.08, 0.0, 0.92), (2, 0.08, 0.08, 0.0, 0.84), (3, 0.08, 0.08, 0.0, 0.76), (4, 0.08, 0.08, 0.0, 0.68), (5, 0.08, 0.08, 0.0, 0.6), (6, 0.08, 0.08, 0.0, 0.52), (7, 0.08, 0.08, 0.0, 0.44), (8, 0.08, 0.08, 0.0, 0.36), (9, 0.08, 0.08, 0.0, 0.28), (10, 0.08, 0.08, 0.0, 0.2), (11, 0.08, 0.08, 0.0, 0.12), (12, 0.12, 0.12, 0.0, 0.0)]
rev big 399997151.57621694 rev 1498.65 249962.2529090714
1e8 rows 480
Shell cwd was reset to /Users/dev/Desktop/Test Project Usama
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/docs/user-stories.md</summary>

```
# User Stories with Acceptance Criteria

**Product:** Mortgage Calculator · **Version:** 1.1 · **Date:** 2026-11-06

Related: [Product plan](product-plan.md) · [App Roles](app-roles.md) · [Jobs To Be Done](jobs-to-be-done.md)

Each story uses the form "As a [role], I want [capability], so that [benefit]." Each one names the job it serves and has acceptance criteria written as Given / When / Then.

Each story carries four labels:
- **Priority** is the product view (MoSCoW: Must, Should, Could).
- **Scope** is the plan for this submission (Core, Stretch, Not in this build). See [Product plan §2.2](product-plan.md#22-scope-for-this-submission).
- **Serves** is the job from [Jobs To Be Done](jobs-to-be-done.md).
- **Status** describes what the app does today. All stories start as Not implemented and are updated after the build.

## Shared definitions

- **Default config.** Unless a criterion says otherwise, the app runs with the built-in defaults: currency USD, locale en-US, no presets, disclaimer "Estimates only. Not a loan offer or financial advice."
- **Amounts in criteria** are written without the currency symbol. With the default config, "1,798.65" displays as "$1,798.65".
- **Today's date.** Unless stated otherwise, today is 6 November 2026, so the first payment is December 2026. In tests the date is fixed.
- **Valid ranges** (defaults, the Admin can change them):

  | Field | Rule | Required |
  |---|---|---|
  | Home price | 1 to 100,000,000 | Yes |
  | Down payment | 0 or more, and less than the home price | No (empty counts as 0) |
  | Interest rate | 0 to 30 (%) | Yes |
  | Term | whole number of years, 1 to 40 | Yes |
  | Extra monthly payment | 0 to 10,000,000 | No (empty counts as 0) |

- **Results** means everything calculated from the inputs: loan amount, monthly payment, totals, payoff date, extra-payment savings and the schedule. Results recalculate on every input change, with no page reload and no Calculate button.
- **Never shows a wrong result** means that no `NaN`, `Infinity`, `undefined`, negative amount or result from earlier inputs is ever on screen.
- **Rounding and reference values** follow [Product plan §3](product-plan.md#3-calculation-rules).

## Error messages

This table is the single source of every message's wording. The app reads the texts from one module (`src/messages.ts`), and the tests assert these exact strings. Range numbers come from the configured limits, formatted for the locale. The texts shown use the default limits.

| ID | Case | Exact text | Where | Used by |
|---|---|---|---|---|
| E1 | Home price empty, non-numeric or outside 1 to 100,000,000 | Enter a home price between 1 and 100,000,000. | Under the field | L8 |
| E2 | Down payment non-numeric or negative | Enter a down payment of 0 or more. | Under the field | L8 |
| E3 | Down payment ≥ home price (both otherwise valid) | Down payment must be less than the home price. | Under the down payment field | L8 |
| E4 | Interest rate empty, non-numeric or outside 0 to 30 | Enter an interest rate between 0 and 30. | Under the field | L8 |
| E5 | Term empty, non-numeric, not whole, or outside 1 to 40 | Enter a whole number of years between 1 and 40. | Under the field | L8 |
| E6 | Extra payment non-numeric or outside 0 to 10,000,000 | Enter an extra payment between 0 and 10,000,000. | Under the field | L5 |
| E7 | All fields valid but the rounded monthly payment is 0.00 | The loan amount is too small for this term. | Results area | L8 |
| E8 | Any field is invalid | Fix the highlighted fields to see your results. | Results area | L8, L3 |
| E9 | Unexpected runtime error | Something went wrong. Your inputs are kept; please try again. | Results area | L8 |
| E10 | A calculated value is not finite or is negative | Could not calculate this loan. Please check your inputs. | Results area | L8 |
| E11 | `config.json` cannot be used at all | Configuration could not be loaded ({reason}). Using default settings. `{reason}` is one of: file not found, invalid JSON, not a JSON object, network error. | Dismissible banner | A4 |
| E12 | Some config fields or presets are invalid | Some settings were invalid and defaults are used instead: {list}. | Dismissible banner | A2, A3, A4 |
| E13 | Shared link has invalid or unknown values | Some values in this link were invalid and were reset: {list}. | Notice above the form | L7, M3 |
| E14 | Adding a 4th comparison scenario | You can compare up to 3 scenarios. Remove one to add another. | Comparison area | L4, M4 |
| E15 | Monthly budget empty, 0 or negative | Enter a monthly budget greater than 0. | Under the field | L6 |
| E16 | Taxes and insurance are at least the budget | Your taxes and insurance already exceed this budget. | Results area | L6 |
| E17 | Print requested while inputs are invalid | Fix the highlighted fields before printing. | Next to the disabled Print button | L7, M2 |
| E18 | Down payment percentage outside 0 to less than 100 | Enter a down payment between 0 and 100%. |
… (1824 more characters not shown)
```

Output:

```
File created successfully at: /Users/dev/Desktop/Test Project Usama/docs/user-stories.md (file state is current in your context — no need to Read it back)
```

</details>

One fix: L5.5 doesn't say which loan it applies to.

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/docs/user-stories.md</summary>

Replace:

```
5. Given extra payment 10,000,000 (the maximum), when I enter it, then it is accepted and the loan ends after payment 1.
```

with:

```
5. Given the loan of criterion 1 with extra payment 10,000,000 (the maximum), when I enter it, then it is accepted, no error appears, and the schedule has 1 row with payment 301,500.00 and balance 0.00.
```

</details>

<details><summary>Shell: Remove old root files, list tree, check links</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && rm 00-product-plan.md 01-app-roles.md 02-jobs-to-be-done.md 03-user-stories.md && find . -not -path '*/.*' | sort && echo --- && grep -rnoE '\]\([a-z-]+\.md(#[a-z0-9-]+)?\)' docs | sort -u && echo --- && grep -rn '0[0-3]-' docs || echo "no old filenames referenced"; grep -c '—' docs/*.md
```

Output:

```
.
./docs
./docs/app-roles.md
./docs/jobs-to-be-done.md
./docs/product-plan.md
./docs/user-stories.md
./transcripts
./transcripts/session-02.md
---
docs/app-roles.md:5:](jobs-to-be-done.md)
docs/app-roles.md:5:](product-plan.md)
docs/app-roles.md:5:](user-stories.md)
docs/app-roles.md:74:](product-plan.md#9-risks-and-future-work)
docs/jobs-to-be-done.md:109:](user-stories.md)
docs/jobs-to-be-done.md:5:](app-roles.md)
docs/jobs-to-be-done.md:5:](product-plan.md)
docs/jobs-to-be-done.md:5:](user-stories.md)
docs/product-plan.md:137:](user-stories.md#error-messages)
docs/product-plan.md:141:](user-stories.md#error-messages)
docs/product-plan.md:164:](user-stories.md)
docs/product-plan.md:183:](user-stories.md)
docs/product-plan.md:63:](user-stories.md)
docs/product-plan.md:6:](app-roles.md)
docs/product-plan.md:7:](jobs-to-be-done.md)
docs/product-plan.md:8:](user-stories.md)
docs/user-stories.md:11:](product-plan.md#22-scope-for-this-submission)
docs/user-stories.md:12:](jobs-to-be-done.md)
docs/user-stories.md:32:](product-plan.md#3-calculation-rules)
docs/user-stories.md:397:](product-plan.md#3-calculation-rules)
docs/user-stories.md:5:](app-roles.md)
docs/user-stories.md:5:](jobs-to-be-done.md)
docs/user-stories.md:5:](product-plan.md)
---
docs/product-plan.md:59:| **Not in this build (kept as specified future work)** | L6, L9, L11, L12, M3, M4, A7 | A7 is the GitHub Pages deployment. Also not in this build: the axe-core accessibility check, the 10,000-run fuzz test and the 95% coverage target. |
docs/user-stories.md:397:| Unit tests cover every reference value in [Product plan §3](product-plan.md#3-calculation-rules), 0% rate, 1-year and 40-year terms, the minimum and maximum values, final-payment rounding, the 0.00-payment case and the n-row loop cap. | Yes |
docs/user-stories.md:405:| Fuzz test: 10,000 random input sets. | Not in this submission (replaced by the 1,000-input loop above) |
docs/app-roles.md:0
docs/product-plan.md:0
docs/jobs-to-be-done.md:0
docs/user-stories.md:0
```

</details>

<details><summary>Shell: Validate story-job traceability and criteria format</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama/docs" && python3 -I - <<'EOF'
import re
s=open('user-stories.md').read(); j=open('jobs-to-be-done.md').read()
stories=re.findall(r'^### ([LMA]\d+)\. .*\n\*\*Priority:\*\* (\w+) · \*\*Scope:\*\* ([^·]+) · \*\*Serves:\*\* (J-\d+) · \*\*Status:\*\* (.+)$',s,re.M)
heads=re.findall(r'^### ([LMA]\d+)\.',s,re.M)
print('story headings',len(heads),'with full meta',len(stories))
jobs=dict(re.findall(r'^### (J-\d+) \((\w+)\)',j,re.M)); print('jobs',len(jobs),jobs)
mp={}
for row in re.findall(r'^\| (J-\d+) \| \w+ \| (.+) \|$',j,re.M): mp[row[0]]=set(x.strip() for x in row[1].split(','))
for sid,pr,sc,jb,st in stories:
    assert sid in mp.get(jb,()),(sid,jb)
    role={'L':'Loanee','M':'Manager','A':'Admin'}[sid[0]]; assert jobs[jb]==role,(sid,jb)
allmap=set().union(*mp.values()); print('map==stories', allmap==set(heads), 'jobs w/o story', [k for k in jobs if not mp.get(k)])
for sid,pr,sc,jb,st in stories: print(sid,pr,sc.strip(),jb,st)
# every criterion G/W/T
bad=[l for l in s.splitlines() if re.match(r'^\d+\. ',l) and not (l.split('. ',1)[1].startswith('Given') and ' when ' in l and ' then ' in l)]
print('non-GWT criteria:',bad)
for m in re.findall(r'\bE\d+\b',s): pass
used=set(re.findall(r'\bE(\d+)\b',s)); print('error ids used',sorted(map(int,used)))
EOF
```

Output:

```
story headings 23 with full meta 23
jobs 14 {'J-1': 'Loanee', 'J-2': 'Loanee', 'J-3': 'Loanee', 'J-4': 'Loanee', 'J-5': 'Loanee', 'J-6': 'Loanee', 'J-7': 'Loanee', 'J-14': 'Loanee', 'J-8': 'Manager', 'J-9': 'Manager', 'J-10': 'Manager', 'J-11': 'Admin', 'J-12': 'Admin', 'J-13': 'Admin'}
map==stories True jobs w/o story []
L1 Must Core J-1 Not implemented
L2 Must Core J-2 Not implemented
L3 Must Core J-6 Not implemented
L4 Must Stretch J-3 Not implemented
L5 Must Core J-4 Not implemented
L6 Should Not in this build J-5 Not implemented
L7 Must Stretch J-7 Not implemented
L8 Must Core J-1 Not implemented
L9 Should Not in this build J-1 Not implemented
L10 Must Core J-14 Not implemented
L11 Should Not in this build J-3 Not implemented
L12 Could Not in this build J-1 Not implemented
M1 Must Core J-9 Not implemented
M2 Must Stretch J-10 Not implemented
M3 Must Not in this build J-10 Not implemented
M4 Should Not in this build J-8 Not implemented
A1 Must Core J-11 Not implemented
A2 Must Core J-11 Not implemented
A3 Must Core J-11 Not implemented
A4 Must Core J-12 Not implemented
A5 Must Core J-13 Not implemented
A6 Should Stretch J-13 Not implemented
A7 Could Not in this build J-13 Not implemented
non-GWT criteria: []
error ids used [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
```

</details>

Every story traces to a job of its own role, and every criterion is in Given/When/Then form. One last grep: do any job statements still mention the app or its features?

<details><summary>Shell: Scan job statements for feature words</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama/docs" && grep -nE '^When ' jobs-to-be-done.md | grep -inE 'app|tool|button|screen|calculat|link|preset|config|click|share|print|export|csv|side by side' || echo "job statements: no feature/app words"
```

Output:

```
job statements: no feature/app words
```

</details>

I've applied all the changes. The four documents are now in `docs/`, the old root files are gone, `transcripts/` is untouched, and no app code was created.

## Folder tree

```
Test Project Usama/
├── docs/
│   ├── product-plan.md
│   ├── app-roles.md
│   ├── jobs-to-be-done.md
│   └── user-stories.md
└── transcripts/
    └── session-02.md
```

## What changed in each file

**product-plan.md**
- **New §2.2 "Scope for this submission":**
  - **Core:** L1, L2, L3, L5, L8, L10, M1, A1–A5.
  - **Stretch:** L4, L7, M2, A6.
  - **Not in this build:** L6, L9, L11, L12, M3, M4, A7, plus axe-core, the 10,000-run fuzz test and the 95% coverage target.
  - It gives your reason for the cut, and says priority is the product view while scope is this submission.
- **§3 rounding:** one rounding rule (integer cents, half-up, the last payment clears the balance). Every schedule loop is capped at n rows. Added the "too small for this term" rule and a reference table with exact values.
- **§5 error handling** points to the error table in user-stories.md as the only place the wording lives.
- **§6 milestones** now follow the scope: Core first, Stretch in order, then a status update at the end.
- **§7 README outline** adds who the app is for, why you chose it, Claude Code with Claude Opus 5.5, hand-edited code and assumptions.
- **New §8 Assumptions.** I fixed the broken section reference.

**app-roles.md**
- Each role is one sentence in the required format, ending in "must never". The context below each one is kept.
- A new "How their needs differ" table: the Loanee needs confidence, the Manager needs speed, consistency and compliance, the Admin needs correctness without code.
- A section on why the Admin works only through `config.json` and deployment.
- The matrix now shows only the rows where the roles actually differ.

**jobs-to-be-done.md**
- Headings now read like "J-1 (Loanee)". Every "How the app helps" line is gone, and every job statement is rewritten so it names no solution.
- Each job has a "Today" and a "What goes wrong" line.
- New job **J-14 (Loanee)**, which L10 serves.
- The map lists all 23 stories, and every job has at least one.

**user-stories.md**
- Every story has Priority, Scope, Serves and Status (all "Not implemented").
- The new error table has 20 entries (E1–E20), each with its exact text. The rules for which message wins are written down.
- Every criterion is now in Given/When/Then form, with exact numbers, and covers all the edge cases you asked for.
- **Splits:** L10 into L10 (Must) and L11 (Should). The amount/% switch is now L12 (Could). A3 keeps the footer only. A5 keeps local run, unit tests and build, with the Playwright smoke test and the network check moved to A6 (Stretch) and GitHub Pages to A7.
- The Definition of Done is now a table showing which items are in this submission.

## Numbers
The original reference values were correct. I pinned the exact ones: total interest 347,515.44, last payment 1,800.09, and 299,999.74 for the reverse calculation.

The rounding method changes some totals. For 200,000 at 5% over 15 years, two reasonable methods differ by 2¢ (84,685.46 vs 84,685.48). The plan now prescribes integer cents with half-up rounding, so the TypeScript engine must use exactly that rule to match.

All values come from a Python script. They get checked again once the engine exists.

## Compliance check against the assignment rules

These were checked by script:
- **Format:** all 23 stories have the full label line and the "As a … I want … so that" form.
- **Traceability:** every story serves a job of its own role, every job names its role, the job map matches the stories exactly, and no job lacks a story.
- **Criteria:** every criterion is in Given/When/Then form.
- **Error messages:** all 20 IDs are used, and plan §5 contains no wording of its own.
- **Jobs:** no job statement mentions the app or a feature (I checked for words like app, tool, button, screen, link, print, config).
- **Roles:** each has the required sentence with a "must never", and the differences in needs are explained.
- **Run, browsers, errors:** a local run with no keys is A5 (Core). Browser support is L10 (Core, manual check). Invalid input is covered by L8 plus the error table.

These still don't fully comply, or need your decision:
1. **L11 wasn't in your "Not in this build" list.** It also isn't in Core or Stretch, so I put it under Not in this build. Tell me if you meant otherwise.
2. **The Manager's main job, J-8, is served only by M4, which isn't built.** The only Core Manager story is M1, and it serves J-9. That's allowed, but a reviewer may notice. You could move M4 to Stretch.
3. **A6 and A7 are new stories, and I chose their priorities (Should, Could).**
4. **Three criteria are verified by hand, not automatically:** L10.1, A1.5 and A5.4. They're specific, but they depend on you filling in the README checklist.
5. **I dropped the "line 12" example from the config error banner (A4).** Browsers word JSON parse errors differently, so a line number couldn't be tested reliably.
6. **Input parsing always uses `.` as the decimal point, even with `de-DE`.** This is written down as an assumption, but users of a comma-decimal locale would find it confusing.
7. **The Manager's role sentence says "once built" about printing and links.** That's accurate today. Update it if M2 or M3 get built.

---

### User · 18:39

> I checked the result and it looks good. Two small fixes:
>
> 1. In docs/app-roles.md, each role's second sentence must start with "They can …" as in the
>    assignment template (now: "They enter…", "They pick…", "They set…"). Keep the content, just
>    use the required wording.
> 2. L2.2, L3.1 and L3.2 only hold on 6 November 2026, but a reviewer will test by hand on a
>    different day. Add a date-independent criterion: given today is any date, the first payment is
>    next month and the payoff date is 359 months after the first payment (for a 30-year loan).
>    Keep the fixed-date criteria for the automated tests and say so in Shared definitions.
>
> Apply both and show me the changed lines only.

### Claude · 18:39

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/docs/app-roles.md</summary>

Replace:

```
They enter a home price, down payment, interest rate and term, then see the monthly payment, the total interest and total paid, the payoff date and how the balance falls month by month, and they try extra payments and alternative loans before committing to anything.
```

with:

```
They can enter a home price, down payment, interest rate and term, see the monthly payment, the total interest and total paid, the payoff date and how the balance falls month by month, and try extra payments and alternative loans before committing to anything.
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/docs/app-roles.md</summary>

Replace:

```
They pick one of the office's loan products
```

with:

```
They can pick one of the office's loan products
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/docs/app-roles.md</summary>

Replace:

```
They set the currency, locale, default values, allowed ranges, loan product presets, office name and disclaimer in `public/config.json`, then run the tests and serve the built files.
```

with:

```
They can set the currency, locale, default values, allowed ranges, loan product presets, office name and disclaimer in `public/config.json`, run the tests and serve the built files.
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/docs/user-stories.md</summary>

Replace:

```
- **Today's date.** Unless stated otherwise, today is 6 November 2026, so the first payment is December 2026. In tests the date is fixed.
```

with:

```
- **Today's date.** The first payment is always in the month after today. Criteria that name 6 November 2026 (first payment December 2026) are for the automated tests, which fix the clock to that date. Criteria that say "today is any date" are for manual checks, which a reviewer can run on any day.
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/docs/user-stories.md</summary>

Replace:

```
5. Given any valid scenario (every reference case in the plan and every valid input from the random-input unit test), when the engine builds the schedule, then total paid equals the sum of the schedule's Payment column to the cent, and total interest equals the sum of its Interest column to the cent.
```

with:

```
5. Given any valid scenario (every reference case in the plan and every valid input from the random-input unit test), when the engine builds the schedule, then total paid equals the sum of the schedule's Payment column to the cent, and total interest equals the sum of its Interest column to the cent.
6. Given today is any date and a 30-year loan, when results appear, then the payoff date is 359 months after the month of the first payment, which is the month after today. For example, on 15 March 2027 the payoff date is March 2057, and on 31 December 2026 it is December 2056.
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/docs/user-stories.md</summary>

Replace:

```
When I then fix the input, then the schedule for the new inputs appears.
```

with:

```
When I then fix the input, then the schedule for the new inputs appears.
9. Given today is any date and a 30-year loan, when I open the schedule, then row 1's date is the month after today and row 360's date is 359 months after row 1's date. For example, on 15 March 2027 row 1 is April 2027 and row 360 is March 2057.
```

Output:

```
The file /Users/dev/Desktop/Test Project Usama/docs/user-stories.md has been updated successfully. (file state is current in your context — no need to Read it back)
```

</details>

I made both fixes. These are the changed lines.

**docs/app-roles.md** (only the second sentence of each role changed)

- **Loanee:** They can enter a home price, down payment, interest rate and term, see the monthly payment, the total interest and total paid, the payoff date and how the balance falls month by month, and try extra payments and alternative loans before committing to anything.
- **Manager:** They can pick one of the office's loan products to fill in the rate and term, enter the client's price and down payment, and (once built) print a quote or send the client a link to the same scenario.
- **Admin:** They can set the currency, locale, default values, allowed ranges, loan product presets, office name and disclaimer in `public/config.json`, run the tests and serve the built files.

**docs/user-stories.md**

Shared definitions (replaces the old "Today's date" line):
> - **Today's date.** The first payment is always in the month after today. Criteria that name 6 November 2026 (first payment December 2026) are for the automated tests, which fix the clock to that date. Criteria that say "today is any date" are for manual checks, which a reviewer can run on any day.

L2, new criterion 6:
> 6. Given today is any date and a 30-year loan, when results appear, then the payoff date is 359 months after the month of the first payment, which is the month after today. For example, on 15 March 2027 the payoff date is March 2057, and on 31 December 2026 it is December 2056.

L3, new criterion 9:
> 9. Given today is any date and a 30-year loan, when I open the schedule, then row 1's date is the month after today and row 360's date is 359 months after row 1's date. For example, on 15 March 2027 row 1 is April 2027 and row 360 is March 2057.

The 31 December example checks the change of year. L2.2, L3.1 and L3.2 stay as they were, for the automated tests.

Two other criteria only hold on 6 November 2026, and you didn't ask me to change them: L5.1 (payoff February 2050) and M2.1 ("Prepared on 6 November 2026"). Under the new Shared definitions rule they now count as automated-test criteria. If you want, I can add matching any-date criteria for those two as well.

---

### User · 18:42

> Yes, please add matching any-date criteria for L5.1 and M2.1 too. Then do a final check: list
> any remaining criterion that only holds on a specific date and has no any-date version.

### Claude · 18:42

<details><summary>Shell: List criteria that mention specific dates</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama/docs" && grep -nE '^(### |[0-9]+\. )' user-stories.md | grep -E '### [LMA][0-9]+|20[2-9][0-9]' | grep -B1 -E '20[2-9][0-9]'
```

Output:

```
83:### L2. See the total cost of the loan
90:2. Given the inputs of criterion 1 and today is 6 November 2026, when results appear, then the payoff date shows November 2056 (the 360th payment, counting from December 2026).
94:6. Given today is any date and a 30-year loan, when results appear, then the payoff date is 359 months after the month of the first payment, which is the month after today. For example, on 15 March 2027 the payoff date is March 2057, and on 31 December 2026 it is December 2056.
96:### L3. View and export the amortization schedule
102:1. Given home price 300,000, down payment 0, rate 6 and term 30, when I open the schedule, then it shows 360 rows with the columns Payment number, Date, Payment, Principal, Interest, Extra payment and Balance. Row 1 shows 1, December 2026, 1,798.65, 298.65, 1,500.00, 0.00, 299,701.35.
103:2. Given the schedule of criterion 1, when I look at the last row, then it shows 360, November 2056, 1,800.09, 1,791.13, 8.96, 0.00, 0.00.
105:4. Given the schedule of criterion 1, when I click "Download CSV", then a file named `mortgage-schedule.csv` downloads. Its first line is exactly `Payment number,Date,Payment,Principal,Interest,Extra payment,Balance`, it has 360 data lines, and its second line is exactly `1,2026-12,1798.65,298.65,1500.00,0.00,299701.35`.
110:9. Given today is any date and a 30-year loan, when I open the schedule, then row 1's date is the month after today and row 360's date is 359 months after row 1's date. For example, on 15 March 2027 row 1 is April 2027 and row 360 is March 2057.
--
127:### L5. Model extra payments
133:1. Given home price 300,000, down payment 0, rate 6, term 30 and extra payment 200, when results appear, then I see payoff date February 2050, months saved 81 and interest saved 91,173.87. Total interest shows 256,341.57 and the schedule has 279 rows, the last with payment 716.87 and balance 0.00.
--
270:### M2. Print a client quote
276:1. Given office name "Riverside Mortgages", preset "15-year fixed" and valid inputs, when I click "Print quote", then the print preview shows the office name, product name, all inputs, monthly payment, total interest, total paid, payoff date, "Prepared on 6 November 2026" and the configured disclaimer.
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/docs/user-stories.md</summary>

Replace:

```
7. Given any extra payment, when the engine builds the schedule, then it has at most n rows (term × 12).
```

with:

```
7. Given any extra payment, when the engine builds the schedule, then it has at most n rows (term × 12).
8. Given today is any date and the inputs of criterion 1, when results appear, then the payoff date is 278 months after the month of the first payment (the 279th payment), which is the month after today, and months saved still shows 81. For example, on 15 March 2027 the payoff date is June 2050.
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/docs/user-stories.md</summary>

Replace:

```
payoff date, "Prepared on 6 November 2026" and the configured disclaimer.
```

with:

```
payoff date, "Prepared on November 6, 2026" and the configured disclaimer.
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/docs/user-stories.md</summary>

Replace:

```
7. Given any input is invalid, when I look at "Print quote", then it is disabled and E17 is shown next to it as visible text.
```

with:

```
7. Given any input is invalid, when I look at "Print quote", then it is disabled and E17 is shown next to it as visible text.
8. Given today is any date, when I print the quote, then it shows "Prepared on" followed by today's date in the configured locale's long date format (`Intl.DateTimeFormat(locale, { dateStyle: "long" })`). For example, with the default locale en-US on 15 March 2027 it shows "Prepared on March 15, 2027".
```

Output:

```
The file /Users/dev/Desktop/Test Project Usama/docs/user-stories.md has been updated successfully. (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>Shell: Find every date mention across the docs</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama/docs" && grep -nE '20[2-9][0-9]' *.md | grep -vE '^\S+:[0-9]+:\*\*(Status|Product)'
```

Output:

```
user-stories.md:19:- **Today's date.** The first payment is always in the month after today. Criteria that name 6 November 2026 (first payment December 2026) are for the automated tests, which fix the clock to that date. Criteria that say "today is any date" are for manual checks, which a reviewer can run on any day.
user-stories.md:90:2. Given the inputs of criterion 1 and today is 6 November 2026, when results appear, then the payoff date shows November 2056 (the 360th payment, counting from December 2026).
user-stories.md:94:6. Given today is any date and a 30-year loan, when results appear, then the payoff date is 359 months after the month of the first payment, which is the month after today. For example, on 15 March 2027 the payoff date is March 2057, and on 31 December 2026 it is December 2056.
user-stories.md:102:1. Given home price 300,000, down payment 0, rate 6 and term 30, when I open the schedule, then it shows 360 rows with the columns Payment number, Date, Payment, Principal, Interest, Extra payment and Balance. Row 1 shows 1, December 2026, 1,798.65, 298.65, 1,500.00, 0.00, 299,701.35.
user-stories.md:103:2. Given the schedule of criterion 1, when I look at the last row, then it shows 360, November 2056, 1,800.09, 1,791.13, 8.96, 0.00, 0.00.
user-stories.md:105:4. Given the schedule of criterion 1, when I click "Download CSV", then a file named `mortgage-schedule.csv` downloads. Its first line is exactly `Payment number,Date,Payment,Principal,Interest,Extra payment,Balance`, it has 360 data lines, and its second line is exactly `1,2026-12,1798.65,298.65,1500.00,0.00,299701.35`.
user-stories.md:110:9. Given today is any date and a 30-year loan, when I open the schedule, then row 1's date is the month after today and row 360's date is 359 months after row 1's date. For example, on 15 March 2027 row 1 is April 2027 and row 360 is March 2057.
user-stories.md:133:1. Given home price 300,000, down payment 0, rate 6, term 30 and extra payment 200, when results appear, then I see payoff date February 2050, months saved 81 and interest saved 91,173.87. Total interest shows 256,341.57 and the schedule has 279 rows, the last with payment 716.87 and balance 0.00.
user-stories.md:140:8. Given today is any date and the inputs of criterion 1, when results appear, then the payoff date is 278 months after the month of the first payment (the 279th payment), which is the month after today, and months saved still shows 81. For example, on 15 March 2027 the payoff date is June 2050.
user-stories.md:277:1. Given office name "Riverside Mortgages", preset "15-year fixed" and valid inputs, when I click "Print quote", then the print preview shows the office name, product name, all inputs, monthly payment, total interest, total paid, payoff date, "Prepared on November 6, 2026" and the configured disclaimer.
user-stories.md:284:8. Given today is any date, when I print the quote, then it shows "Prepared on" followed by today's date in the configured locale's long date format (`Intl.DateTimeFormat(locale, { dateStyle: "long" })`). For example, with the default locale en-US on 15 March 2027 it shows "Prepared on March 15, 2027".
```

</details>

I've added any-date criteria for L5 and M2. Here are the changed lines in `docs/user-stories.md`.

L5, new criterion 8:
> 8. Given today is any date and the inputs of criterion 1, when results appear, then the payoff date is 278 months after the month of the first payment (the 279th payment), which is the month after today, and months saved still shows 81. For example, on 15 March 2027 the payoff date is June 2050.

M2, criterion 1. This fixes a mistake I made earlier: en-US, the default locale, writes the long date as "November 6, 2026", not "6 November 2026".
> … payoff date, "Prepared on November 6, 2026" and the configured disclaimer.

M2, new criterion 8:
> 8. Given today is any date, when I print the quote, then it shows "Prepared on" followed by today's date in the configured locale's long date format (`Intl.DateTimeFormat(locale, { dateStyle: "long" })`). For example, with the default locale en-US on 15 March 2027 it shows "Prepared on March 15, 2027".

## Final check: criteria that only hold on a specific date

I searched all four documents for year numbers.

| Criterion | Date it depends on | Any-date version |
|---|---|---|
| L2.2 | Payoff November 2056 | L2.6 |
| L3.1 | Row 1 is December 2026 | L3.9 |
| L3.2 | Row 360 is November 2056 | L3.9 |
| **L3.4** | **CSV line `1,2026-12,…`** | **None** |
| L5.1 | Payoff February 2050 | L5.8 |
| M2.1 | "Prepared on November 6, 2026" | M2.8 |

**L3.4 is the only one left without an any-date version.** A matching criterion would say: on any date, row 1's CSV Date is the month after today as `YYYY-MM`, row 360's is 359 months later, and both match the on-screen schedule.

L5.1 also never says which date it assumes. The Shared definitions rule only covers criteria that name 6 November 2026, and L5.1 doesn't, so its fixed date is only implied. Adding "and today is 6 November 2026" to L5.1 would fix that.

I can make both edits if you want.

---

### User · 18:45

> Yes, make both edits (the L3.4 any-date criterion and "today is 6 November 2026" in L5.1).
> After that the documents are final. We won't change them again until we update the statuses
> after the build.
> After this, stop polishing the docs. They're in very good shape, and the 2–4 hour budget should go into the build now.

### Claude · 18:45

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/docs/user-stories.md</summary>

Replace:

```
1. Given home price 300,000, down payment 0, rate 6, term 30 and extra payment 200, when results appear,
```

with:

```
1. Given home price 300,000, down payment 0, rate 6, term 30, extra payment 200 and today is 6 November 2026, when results appear,
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/docs/user-stories.md</summary>

Replace:

```
For example, on 15 March 2027 row 1 is April 2027 and row 360 is March 2057.
```

with:

```
For example, on 15 March 2027 row 1 is April 2027 and row 360 is March 2057.
10. Given today is any date and a 30-year loan, when I click "Download CSV", then the Date of data line 1 is the month after today in `YYYY-MM` form, the Date of data line 360 is 359 months later, and both match the dates in the on-screen schedule. For example, on 15 March 2027 they are `2027-04` and `2057-03`.
```

Output:

```
The file /Users/dev/Desktop/Test Project Usama/docs/user-stories.md has been updated successfully. (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>Shell: Save project memory that docs are final</summary>

```sh
cd /Users/dev/.claude/projects/-Users-dev-Desktop-Test-Project-Usama/memory && cat > project-docs-final.md <<'EOF'
---
name: project-docs-final
description: KnowledgeCity mortgage-calculator take-home; docs/ are frozen, next step is the build within a 2–4h budget
metadata:
  type: project
---
The four docs in docs/ (product-plan, app-roles, jobs-to-be-done, user-stories) were finalised on 2026-11-06. The user said not to change them again until statuses are updated after the build.

**Why:** the 2–4 hour assignment budget has to go into the build. Stories marked Implemented must pass all of their acceptance criteria.

**How to apply:** don't suggest more doc polishing. Build the Core scope from product-plan §2.2 (L1, L2, L3, L5, L8, L10, M1, A1–A5) first, and Stretch (L4, L7, M2, A6) only if time allows. Use the exact texts from the error table in user-stories.md and the integer-cent rounding rule in plan §3. After the build, update only the story statuses.
EOF
echo "- [Docs final, build next](project-docs-final.md) — mortgage take-home: docs frozen 2026-11-06, build Core scope next" >> MEMORY.md
```

Output:

```
Shell cwd was reset to /Users/dev/Desktop/Test Project Usama
```

</details>

I've made both edits, and the documents are now final.

**L5.1** now names the date:
> 1. Given home price 300,000, down payment 0, rate 6, term 30, extra payment 200 and today is 6 November 2026, when results appear, then I see payoff date February 2050, …

**L3, new criterion 10:**
> 10. Given today is any date and a 30-year loan, when I click "Download CSV", then the Date of data line 1 is the month after today in `YYYY-MM` form, the Date of data line 360 is 359 months later, and both match the dates in the on-screen schedule. For example, on 15 March 2027 they are `2027-04` and `2057-03`.

Every criterion that depends on the date now names 6 November 2026 and has an any-date version next to it.

I saved a note to memory that the docs are frozen until the post-build status update. That way a later session will go straight to the build.

For the build, work in the order of plan §6: the calculation engine and its unit tests first, then config loading, the core UI, and the browser check with the README. Stretch stories come only after all the Core stories pass.

*The user ran a Claude Code command: `/export transcripts/session-03-part1.md`.*

---

### User · 18:47

> The documents are final now. Let's start building.
>
> ## Rules for the whole build
> - The specs in docs/ are the source of truth. If the code and the docs ever disagree, stop and
>   ask me; don't silently pick one. Don't edit docs/ unless I ask. Don't touch transcripts/.
> - Build only the Core scope in product-plan §2.2: L1, L2, L3, L5, L8, L10, M1, A1, A2, A3
>   (footer only), A4, A5. Stretch (L4, L7, M2, A6) only when I say so.
> - Every story we later mark Implemented must pass ALL its acceptance criteria exactly, including
>   the exact message texts from the Error messages table.
> - A reviewer must be able to run it with only Node.js 20+: no paid accounts, API keys, cloud
>   services, or runtime network requests other than the app's own files and config.json.
> - Must work in current Chrome, Edge, Firefox and Safari.
> - Stack per product-plan §4: Vite + TypeScript (strUI framework,
>   Vitest for unit tests. Keep dependencies minimal.
> - Money in integer cents with the rounding rule in ns at most n rows.
> - All user-facing text comes from one module, src/messages.ts, matching the Error messages table.
>
> ## Step 1 (this message): project setup only
> In the repository root (not inside docs/):
> - package.json with scripts: dev, build, preview, test (vitest run), test:watch
> - TypeScript strict config, Vite config with base: om any folder
> - the module layout from product-plan §4 (src/engine, src/config, src/ui, src/messages.ts,
>   src/main.ts, public/config.json, tests/unit)
> - a .gitignore excluding node_modules, dist, coverage, playwright-report, test-results, .DS_Store
> - git init if it's not already a repo
> - a placeholder page titled "Mortgage Calculator" and one trivial passing unit test
> - no calculator logic yet
>
> Then run npm install, npm test and npm run build, athe final tree
> (excluding node_modules). Tell me the Node and npm versions you used.

### Claude · 18:48

<details><summary>Shell: Check Node, npm and git status</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && node -v && npm -v && git rev-parse --is-inside-work-tree 2>&1 | head -1; ls -a
```

Output:

```
v22.14.0
10.9.2
fatal: not a git repository (or any of the parent directories): .git
.
..
docs
transcripts
```

</details>

Node v22.14.0 and npm 10.9.2 are installed, and the folder isn't a git repo yet. Creating the setup files:

<details><summary>Shell: Scaffold project files and install dev dependencies</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git init -q && mkdir -p src/engine src/config src/ui public tests/unit && cat > package.json <<'EOF'
{
  "name": "mortgage-calculator",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=20"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
EOF
cat > tsconfig.json <<'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true,
    "noEmit": true,
    "types": ["vite/client"]
  },
  "include": ["src", "tests", "vite.config.ts"]
}
EOF
cat > vite.config.ts <<'EOF'
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Relative asset paths, so dist/ works from any folder or sub-path.
  base: './',
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
EOF
cat > .gitignore <<'EOF'
node_modules/
dist/
coverage/
playwright-report/
test-results/
.DS_Store
EOF
cat > index.html <<'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mortgage Calculator</title>
  </head>
  <body>
    <main id="app"></main>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
EOF
cat > src/messages.ts <<'EOF'
/**
 * Every user-facing text in the app lives here.
 * Error texts must match the Error messages table in docs/user-stories.md exactly.
 * The table is added in a later step.
… (28 more lines not shown)
```

Output:

```
12 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

</details>

<details><summary>Shell: Run unit tests and production build</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -A5 devDependencies package.json && echo "=== npm test" && npm test 2>&1 | tail -12 && echo "=== npm run build" && npm run build 2>&1 | tail -10
```

Output:

```
  "devDependencies": {
    "typescript": "7.0.2",
    "vite": "8.3.6",
    "vitest": "5.1.0"
  }
}
=== npm test
> mortgage-calculator@0.1.0 test
> vitest run


 RUN  v5.1.0 /Users/dev/Desktop/Test Project Usama


 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  18:48:48
   Duration  344ms (transform 65%, import 24%, worker 7%, tests 4%)

=== npm run build

vite v8.3.6 building client environment for production...
transforming...
✓ 5 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                0.33 kB │ gzip: 0.23 kB
dist/assets/index-BKTVG_Qt.js  0.80 kB │ gzip: 0.45 kB

✓ built in 42ms
```

</details>

Tests and build both pass. Two more checks: the build output should use relative paths, and the installed tools' Node requirements should match our "Node 20+" promise.

<details><summary>Shell: Check relative paths, engine requirements, and tree</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -o 'src="[^"]*"' dist/index.html; for p in vite vitest typescript; do echo "$p: $(node -p "require('./node_modules/$p/package.json').engines?.node")"; done; echo; find . -path ./node_modules -prune -o -path ./.git -prune -o -print | sort
```

Output:

```
src="./assets/index-BKTVG_Qt.js"
vite: ^20.19.0 || >=22.12.0
vitest: ^22.12.0 || ^24.0.0 || >=26.0.0
typescript: >=16.20.0

.
./.gitignore
./dist
./dist/assets
./dist/assets/index-BKTVG_Qt.js
./dist/config.json
./dist/index.html
./docs
./docs/app-roles.md
./docs/jobs-to-be-done.md
./docs/product-plan.md
./docs/user-stories.md
./index.html
./package-lock.json
./package.json
./public
./public/config.json
./src
./src/config
./src/config/defaults.ts
./src/config/loadConfig.ts
./src/config/schema.ts
./src/engine
./src/engine/amortize.ts
./src/engine/parse.ts
./src/engine/validate.ts
./src/main.ts
./src/messages.ts
./src/ui
./src/ui/csv.ts
./src/ui/form.ts
./src/ui/presets.ts
./src/ui/results.ts
./src/ui/schedule.ts
./tests
./tests/unit
./tests/unit/setup.test.ts
./transcripts
./transcripts/session-02.md
./transcripts/session-03-part1.md
./tsconfig.json
./vite.config.ts
```

</details>

Setup is done, and `npm install`, `npm test` and `npm run build` all pass. But I found one conflict with the docs, and under your rules I'm stopping to ask before I fix it.

## The conflict: Node version
The docs promise Node.js 20 or newer (A5.1, and the README outline in plan §7). The current tool releases installed here don't all support Node 20:

| Package (exact pin) | Node it requires |
|---|---|
| vite 8.3.6 | ^20.19.0 or >=22.12.0 |
| **vitest 5.1.0** | **^22.12.0, ^24 or >=26. Node 20 is not supported.** |
| typescript 7.0.2 | >=16.20.0 |

On Node 20, a reviewer could start the app with `npm run dev`, but `npm test` would not be supported. That breaks A5.2 as written.

**Option A (my recommendation): require Node.js 22.12 or newer.** Node 20 went end-of-life in April 2026, so a reviewer today is likely to have 22 or 24. This needs one-line changes in A5.1 and plan §7, and you'd have to approve those doc edits.

**Option B: keep "Node.js 20 or newer" and the docs as they are.** I'd pin older releases that still support Node 20 (Vite 6 and Vitest 3). Nothing in the docs changes, but we'd ship tool versions that are no longer current.

Until you decide, `package.json` says `"engines": { "node": ">=20" }`. That isn't true for the test tooling right now, and I'll correct it either way.

## What was set up
- **git:** initialised. No commits yet.
- **package.json:** scripts `dev`, `build` (`tsc --noEmit && vite build`, so a type error fails the build), `preview`, `test` (`vitest run`) and `test:watch`. There are only 3 dependencies, all dev-only, pinned to exact versions.
- **tsconfig.json:** strict mode plus `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.
- **vite.config.ts:** `base: './'`. I checked the build output: it references `./assets/…`, so `dist/` works from any folder.
- **Module layout** from plan §4, as empty placeholder files.
  - `src/messages.ts` holds only the title for now. The error table texts go in when the engine is built.
  - `public/config.json` is `{}`.
- **index.html:** a placeholder page titled "Mortgage Calculator".
- **tests/unit/setup.test.ts:** one trivial test.
- **.gitignore:** the entries you listed.

## Output
```
npm test       → Test Files 1 passed (1) · Tests 1 passed (1)
npm run build  → tsc OK · dist/index.html 0.33 kB · dist/assets/index-BKTVG_Qt.js 0.80 kB · built in 42ms
```

## Tree (without node_modules and .git)
```
.gitignore
index.html
package.json
package-lock.json
tsconfig.json
vite.config.ts
dist/            (build output, git-ignored)
  index.html  config.json  assets/index-BKTVG_Qt.js
docs/            (unchanged)
  app-roles.md  jobs-to-be-done.md  product-plan.md  user-stories.md
public/
  config.json
src/
  main.ts  messages.ts
  config/  defaults.ts  loadConfig.ts  schema.ts
  engine/  amortize.ts  parse.ts  validate.ts
  ui/      csv.ts  form.ts  presets.ts  results.ts  schedule.ts
tests/unit/
  setup.test.ts
transcripts/     (not touched by me)
  session-02.md  session-03-part1.md
```

## Versions used
Node v22.14.0, npm 10.9.2.

Which option do you want, A or B? If you choose A, tell me whether I should make the two doc edits.

---

### User · 18:50

> Option A. Require Node.js 22.12 or newer.
> - Update A5.1 in docs/user-stories.md and the README outline in product-plan §7 (and anywhere
>   else the docs say "Node 20"), set "engines": { "node": ">=22.12.0" } in package.json, and add
>   an .nvmrc with 22. Show me the changed lines.
> - Also record this as an assumption for the README: Node 20 is end-of-life and the current
>   Vite/Vitest releases need Node 22.12+.
>
> Then continue with Step 2: the calculation engine (src/engine/amortize.ts), pure functions with
> no DOM. Follow product-plan §3 exactly: the monthly payment with the separate r = 0 case, integer
> cents, half-up rounding of the payment and of each month's interest, a final payment that clears
> the balance, a loop capped at n rows, an extra monthly payment (L5) that ends the loan early and
> is capped at balance + interest, totals as sums of rounded rows, payoff date, months and interest
> saved vs no extra, E7 when the rounded payment is 0.00, and a guard against non-finite values
> (E10). The first payment date is the month after a "today" passed in as a parameter (so tests can
> fix it to 6 November 2026).
>
> Before writing any engine code, list the unit test cases you'll write, taken from the acceptance
> criteria of L1, L2, L3 and L5 (the exact expected values in the docs) plus the §3 reference
> values. Stop after the list so I can review it.

### Claude · 18:50

<details><summary>Shell: Find every Node 20 mention in the docs</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -rnE 'Node(\.js)? ?(20|v20)|Node 20' docs
```

Output:

```
docs/user-stories.md:372:1. Given a machine with only Node.js 20 or newer installed, when I follow the README (`npm install`, then `npm run dev`), then a `localhost` URL is printed and the app loads there, with no account, API key or cloud service asked for.
docs/product-plan.md:172:   Prerequisites: Node.js 20 or newer (free). Nothing else.
```

</details>

<details><summary>Shell: Update Node version in docs, package.json, add .nvmrc</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && sed -i '' 's/Given a machine with only Node.js 20 or newer installed/Given a machine with only Node.js 22.12 or newer installed/' docs/user-stories.md && sed -i '' 's/Prerequisites: Node.js 20 or newer (free). Nothing else./Prerequisites: Node.js 22.12 or newer (free). Nothing else./' docs/product-plan.md && sed -i '' 's/"node": ">=20"/"node": ">=22.12.0"/' package.json && echo 22 > .nvmrc && grep -n '^- Fixed-rate' docs/product-plan.md
```

Output:

```
190:- Fixed-rate, fully amortizing loans with monthly payments only. No adjustable rates, interest-only periods, balloon loans or fees financed into the loan.
[This command modified 2 files you've previously read: docs/product-plan.md, docs/user-stories.md. Call Read before editing.]
```

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/docs/product-plan.md</summary>



Output:

```
186	9. **Documents.** Links to the four files in `docs/`.
187
188	## 8. Assumptions
189
190	- Fixed-rate, fully amortizing loans with monthly payments only. No adjustable rates, interest-only periods, balloon loans or fees financed into the loan.
191	- The first payment falls in the month after today. The payoff date is the month of the last payment. Dates are shown as month and year.
192	- Money is rounded to cents (2 decimal places). Currencies with 0 or 3 minor digits are out of scope for v1.
193	- Input parsing accepts `,` as a thousands separator and `.` as the decimal point, whatever the display locale. Display formatting follows the configured locale.
194	- The term is a whole number of years.
195	- Default limits: home price 1 to 100,000,000; down payment 0 to less than the home price; interest rate 0 to 30%; term 1 to 40 years; extra payment 0 to 10,000,000. The Admin can change them.
196	- Results are estimates, not loan offers. The disclaimer says so.
197
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/docs/product-plan.md</summary>

Replace:

```
- Results are estimates, not loan offers. The disclaimer says so.
```

with:

```
- Results are estimates, not loan offers. The disclaimer says so.
- The app needs Node.js 22.12 or newer to install, test and build. Node 20 reached end-of-life in April 2026, and the current Vite and Vitest releases require Node 22.12+ (Vitest 5 does not support Node 20). `.nvmrc` pins major version 22 for nvm users.
```

</details>

<details><summary>Shell: Confirm all Node mentions after edits</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -rn 'Node' docs package.json .nvmrc | grep -v '^docs/jobs' ; cat .nvmrc
```

Output:

```
docs/product-plan.md:172:   Prerequisites: Node.js 22.12 or newer (free). Nothing else.
docs/product-plan.md:197:- The app needs Node.js 22.12 or newer to install, test and build. Node 20 reached end-of-life in April 2026, and the current Vite and Vitest releases require Node 22.12+ (Vitest 5 does not support Node 20). `.nvmrc` pins major version 22 for nvm users.
docs/user-stories.md:372:1. Given a machine with only Node.js 22.12 or newer installed, when I follow the README (`npm install`, then `npm run dev`), then a `localhost` URL is printed and the app loads there, with no account, API key or cloud service asked for.
22
```

</details>

<details><summary>Shell: Confirm engines field in package.json</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -n '"node"' package.json
```

Output:

```
7:    "node": ">=22.12.0"
```

</details>

The Node update is done, and the test-case list for the engine is below. I haven't written any engine code yet.

## Node 22.12 changes

- `docs/user-stories.md`, A5.1:
  `1. Given a machine with only Node.js 22.12 or newer installed, when I follow the README …`
- `docs/product-plan.md` §7 README outline:
  `Prerequisites: Node.js 22.12 or newer (free). Nothing else.`
- `docs/product-plan.md` §8 Assumptions, new line (the README copies §8):
  `- The app needs Node.js 22.12 or newer to install, test and build. Node 20 reached end-of-life in April 2026, and the current Vite and Vitest releases require Node 22.12+ (Vitest 5 does not support Node 20). .nvmrc pins major version 22 for nvm users.`
- `package.json`: `"node": ">=22.12.0"`
- `.nvmrc` (new file): `22`

There were no other "Node 20" mentions in the docs.

## Step 2: planned unit tests for `src/engine/amortize.ts`

The engine takes the principal in cents, the annual rate in %, the term in years, the extra payment in cents and `today`. It returns either a result or `{ error: 'E7' | 'E10' }`. Range checks are not part of the engine: they belong to `validate.ts` (L8), which comes in a later step. Amounts below are in currency units, and the tests assert integer cents.

**A. Monthly payment** (L1, plan §3)

| # | Input | Expected | Source |
|---|---|---|---|
| A1 | Price 350,000 − down 50,000 | Loan amount 300,000.00 | L1.1 |
| A2 | 300,000 @ 6% / 30y | 1,798.65 | L1.1, §3 |
| A3 | 200,000 @ 5% / 15y | 1,581.59 | L1.2, §3 |
| A4 | 120,000 @ 0% / 10y | 1,000.00, the r = 0 branch, no error | L1.3, §3 |
| A5 | 300,000 @ 5% / 30y | 1,610.46 | L1.5 |
| A6 | 1 @ 0.001% / 1y | 0.08 | L1.6, §3 |
| A7 | 100,000,000 @ 30% / 40y | 2,500,017.80 | L1.7, §3 |
| A8 | 300,000 @ 6% / 15y | 2,531.57 | L8.16 (engine part) |
| A9 | 300,000 @ 5.75% / 15y | 2,491.23 | M1.2 (engine part) |

**B. Totals and final payment** (L2, plan §3)

| # | Input | Final payment | Total interest | Total paid | Source |
|---|---|---|---|---|---|
| B1 | 300,000 @ 6% / 30y | 1,800.09 | 347,515.44 | 647,515.44 | L2.1, §3 |
| B2 | 200,000 @ 5% / 15y | 1,580.87 | 84,685.48 | 284,685.48 | §3 |
| B3 | 120,000 @ 0% / 10y | 1,000.00 | 0.00 | 120,000.00 | L2.3, §3 |
| B4 | 1 @ 0.001% / 1y | 0.12 | 0.00 | 1.00 | §3 |
| B5 | 100,000,000 @ 30% / 40y | 2,514,276.86 | 1,100,022,803.06 | 1,200,022,803.06 | L2.4, §3 |

B6: for every case in A, B and E, total paid equals the sum of the Payment column, and total interest equals the sum of the Interest column, to the cent (L2.5).

**C. Dates** (`today` passed in)

| # | today | Loan | First payment | Payoff | Source |
|---|---|---|---|---|---|
| C1 | 6 Nov 2026 | 30y | Dec 2026 | Nov 2056 | L2.2, L3.1, L3.2 |
| C2 | 15 Mar 2027 | 30y | Apr 2027 | Mar 2057 | L2.6, L3.9 |
| C3 | 31 Dec 2026 | 30y | Jan 2027 | Dec 2056 (change of year) | L2.6 |
| C4 | 6 Nov 2026 | 300k/6/30, +200 | Dec 2026 | Feb 2050 | L5.1 |
| C5 | 15 Mar 2027 | 300k/6/30, +200 | Apr 2027 | Jun 2050 | L5.8 |
| C6 | 6 Nov 2026 | 1y | Dec 2026 | Nov 2027 | extra case |

**D. Schedule rows** (L3)

- **D1** 300,000 @ 6% / 30y, row 1: `1, Dec 2026, 1,798.65, 298.65, 1,500.00, 0.00, 299,701.35`. The schedule has 360 rows. (L3.1)
- **D2** Same loan, row 360: `360, Nov 2056, 1,800.09, 1,791.13, 8.96, 0.00, 0.00`. (L3.2)
- **D3** Every row in every case:
  - payment = principal + interest;
  - each balance = the previous balance − principal;
  - no balance is negative;
  - every value is a finite integer number of cents.
- **D4** Yearly view of D1: 30 rows. Year 1 is 21,583.80 / 3,684.00 / 17,899.80 / 296,316.00. Every year equals the sum of its months, and its ending balance equals the balance of its last month. (L3.3)
- **D5** Yearly view with extra 200: 279 rows become 24 years, and the last year has only 3 payments.
- **D6** 1 @ 0.001% / 1y: 12 rows. Rows 1–11 are 0.08, row 12 is 0.12, and the last balance is 0.00. (L3.6)
- **D7** 100,000,000 @ 30% / 40y: exactly 480 rows, and the last balance is 0.00. (L3.7)
- **D8** No schedule ever has more than n = term × 12 rows. This is checked across every case. (§3, L5.7)

**E. Extra payment** (L5)

| # | Input (300,000 @ 6% / 30y) | Expected | Source |
|---|---|---|---|
| E-1 | Extra 200 | 279 rows, last payment 716.87, balance 0.00, total interest 256,341.57, total paid 556,341.57, 81 months saved, 91,173.87 interest saved | L5.1, §3 |
| E-2 | Extra 400,000 | 1 row, payment 301,500.00, balance 0.00, 359 months saved, 346,015.44 interest saved | L5.2 |
| E-3 | Extra 10,000,000 | 1 row, payment 301,500.00 | L5.5 |
| E-4 | Extra 0 | Rows and totals identical to no extra, savings = `null` (not shown) | L5.3 |

**F. Guards and rounding** (plan §3)

- **F1 E7, payment rounds to 0.00:** 1 @ 0% / 40y (L8.8). Also 0.01 @ 6% / 30y, and a principal of 0.
- **F2 E10, non-finite input given straight to the engine:** rate `NaN`, principal `Infinity`, extra `NaN`, term 0 (the plan's n = 0 guard). Each returns E10 and none throws.
- **F3 The case that hung in planning:** 1 @ 30% / 40y finishes with 480 rows, payment 0.03, final payment 1.03, total interest 14.40, total paid 15.40.
- **F4 Rounding helper:** 0.5 → 1, 1.5 → 2, 2.5 → 3 (half-up, not banker's rounding), 2.4999999 → 2.

These criteria don't belong to the engine, so I'll test them in the step that builds the code they describe:
- CSV text (L3.4, L3.5, L3.10): `ui/csv.ts`;
- display formatting (L1.7 "no exponent notation");
- clearing results on invalid input (L3.8);
- validation messages (L5.4, L5.6).

## Two interpretations for you to confirm
The docs don't define either of these exactly:

1. **What the Payment and Extra payment columns hold.**
   - **Payment** is the full amount paid that month, including the extra. Without that, L2.5 (total paid = sum of the Payment column) and the 556,341.57 total wouldn't hold.
   - **Extra payment** = Payment − regular payment, or 0.00 if that's negative.
   - So row 1 with extra 200 shows 1,998.65 with extra 200.00, the last row (716.87) shows extra 0.00, and the L5.2 row (301,500.00) shows extra 299,701.35.
2. **How `today` is passed in.** The engine reads only the year and month of `today`, in local time. Tests will build it as `new Date(2026, 10, 6)`, which avoids time-zone surprises.

Do you approve the list and these two interpretations? Once you do, I'll write the tests first and then `amortize.ts`.

---

### User · 18:53

> The list is complete and matches the docs. Approved, with these decisions:
>
> 1. Payment/Extra columns: approved as you described. Payment is the full amount paid that month,
>    and Extra = Payment − regular payment (0.00 on a reduced last row).
> 2. today: approved. Year and month in local time; tests use new Date(2026, 10, 6).
>
> One change: F3 is a wrong result in disguise. A payment of 0.03 that only covers the 0.03 interest
> means the balance never goes down, and then a balloon payment of 1.03 appears at the end. Users
> would read that as a normal loan. Widen E7: show "The loan amount is too small for this term."
> when the rounded regular payment is 0.00 OR is not greater than the first month's rounded
> interest (so the balance would not go down). Update product-plan §3, the E7 row of the Error
> messages table and L8.8 (add F3's inputs as a second example), show me the changed lines, and
> change test F3 to expect E7.
>
> Also: half-up rounding on floats can go wrong (1.005 is stored as 1.00499999…). Tell me how
> the rounding helper avoids this, and add a test case for it (e.g. a value that should round
> half-up but whose float representation is just below .5).
>
> Then write the tests first, run them to see them fail, write amortize.ts, and run them again.
> Show me the final test output.

### Claude · 18:54

Updating the docs for the wider E7 rule first. I'll find the lines involved:

<details><summary>Shell: Locate E7 and tiny-loan mentions in docs</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama/docs" && grep -nE 'too small|0\.03|1\.03|E7' product-plan.md user-stories.md
```

Output:

```
product-plan.md:87:- **Loan too small for the term.** If the rounded regular payment is 0.00 (for example a loan of 1 over 40 years at 0%), the app shows "The loan amount is too small for this term." and no results.
product-plan.md:149:| Regular payment rounds to 0.00 | "The loan amount is too small for this term." (E7). |
product-plan.md:204:- **Tiny loans at high rates.** Rounding can make the schedule look odd. A loan of 1 at 30% over 40 years pays 0.03 a month, all of it interest, and 1.03 in the final month. The numbers are correct for a cent-rounded schedule, but they may surprise users.
user-stories.md:46:| E7 | All fields valid but the rounded monthly payment is 0.00 | The loan amount is too small for this term. | Results area | L8 |
user-stories.md:61:Order of checks: field messages (E1, E2, E4, E5, E6) first, each field on its own. E3 only appears when the home price and down payment are each valid. E7 only appears when every field is valid.
user-stories.md:188:8. Given home price 1, down payment 0, rate 0 and term 40, when I enter them, then the results area shows E7 and no payment is shown.
```

</details>

Two more places contradict the new rule: plan §5 (line 149) and plan §9 (line 204), which calls the 1.03 balloon "correct". I'll update those too, so the docs don't disagree with each other.

<details><summary>Shell: Apply widened E7 rule to plan and stories</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama/docs" && python3 -I - <<'EOF'
import pathlib
def rep(path, old, new):
    p=pathlib.Path(path); t=p.read_text(); assert t.count(old)==1,(path,old); p.write_text(t.replace(old,new))
rep('product-plan.md',
 '- **Loan too small for the term.** If the rounded regular payment is 0.00 (for example a loan of 1 over 40 years at 0%), the app shows "The loan amount is too small for this term." and no results.',
 '- **Loan too small for the term.** If the rounded regular payment is 0.00, or is not greater than the first month\'s rounded interest (so the balance would never go down and the final payment would be a balloon), the app shows "The loan amount is too small for this term." and no results. Examples: a loan of 1 over 40 years at 0% (payment 0.00), and a loan of 1 over 40 years at 30% (payment 0.03, first month\'s interest 0.03).')
rep('product-plan.md',
 '| Regular payment rounds to 0.00 | "The loan amount is too small for this term." (E7). |',
 '| Regular payment rounds to 0.00, or is not greater than the first month\'s interest | "The loan amount is too small for this term." (E7). |')
rep('product-plan.md',
 '- **Tiny loans at high rates.** Rounding can make the schedule look odd. A loan of 1 at 30% over 40 years pays 0.03 a month, all of it interest, and 1.03 in the final month. The numbers are correct for a cent-rounded schedule, but they may surprise users.',
 '- **Tiny loans at high rates.** Cent rounding can stop a tiny loan from amortizing. A loan of 1 at 30% over 40 years would pay 0.03 a month, all of it interest, and then a balloon of 1.03 in the final month. Users would read that as a normal loan, so the app rejects it with E7 instead (see §3).')
rep('user-stories.md',
 '| E7 | All fields valid but the rounded monthly payment is 0.00 |',
 '| E7 | All fields valid but the rounded monthly payment is 0.00, or is not greater than the first month\'s rounded interest |')
rep('user-stories.md',
 '8. Given home price 1, down payment 0, rate 0 and term 40, when I enter them, then the results area shows E7 and no payment is shown.',
 '8. Given home price 1, down payment 0, rate 0 and term 40 (payment 0.00), or home price 1, down payment 0, rate 30 and term 40 (payment 0.03, first month\'s interest 0.03), when I enter them, then the results area shows E7 and no payment is shown.')
print('ok')
EOF
```

Output:

```
ok
```

</details>

Now a float trap for the interest test: a balance and rate where the exact interest ends in exactly .5¢ but the float product lands just below it.

<details><summary>Shell: Search for float half-up rounding failures</summary>

```sh
cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad && cat > tie.mjs <<'EOF'
// find integer-cent balances where exact bal*rate/1200 = k + 0.5, but float is below k+0.5
const out=[];
for (const rate of [6, 5, 4.5, 3, 7.2, 1.2, 0.6, 2.4]) {
  for (let bal=1; bal<2_000_000 && out.filter(o=>o.rate===rate).length<2; bal++) {
    const num = BigInt(bal)*BigInt(Math.round(rate*1e6)), den = 1_200_000_000n;
    if ((2n*num) % den !== 0n || ((2n*num)/den) % 2n !== 1n) continue; // exact .5
    const f = bal*(rate/1200);
    if (Math.floor(f+0.5) !== Number((2n*num+den)/(2n*den))) out.push({rate,bal,f});
  }
}
console.log(out);
console.log('1.005*100 =', 1.005*100);
EOF
node tie.mjs
```

Output:

```
[]
1.005*100 = 100.49999999999999
Shell cwd was reset to /Users/dev/Desktop/Test Project Usama
```

</details>

The common rates didn't hit the trap, so I'm widening the search to every rate in 0.001 steps:

<details><summary>Shell: Search all 0.001-step rates for rounding traps</summary>

```sh
cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad && cat > tie2.mjs <<'EOF'
const den = 1_200_000_000n; let found=[];
for (let rm=1000; rm<=30_000_000 && found.length<5; rm+=1000) {
  const rate = rm/1e6;
  // smallest bal giving exact .5: need 2*bal*rm divisible by den and odd quotient
  for (let bal=1; bal<=5000; bal++) {
    const num=BigInt(bal)*BigInt(rm);
    if ((2n*num)%den!==0n || ((2n*num)/den)%2n!==1n) continue;
    const f=bal*(rate/1200);
    if (Math.floor(f+0.5)!==Number((2n*num+den)/(2n*den))) { found.push({rate,bal,f}); break; }
  }
}
console.log(found);
EOF
node tie2.mjs
```

Output:

```
[
  { rate: 0.36, bal: 5000, f: 1.4999999999999998 },
  { rate: 0.48, bal: 3750, f: 1.4999999999999998 },
  { rate: 0.576, bal: 3125, f: 1.4999999999999998 },
  { rate: 0.72, bal: 2500, f: 1.4999999999999998 },
  { rate: 0.96, bal: 1875, f: 1.4999999999999998 }
]
Shell cwd was reset to /Users/dev/Desktop/Test Project Usama
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/tests/unit/amortize.test.ts</summary>

```
import { describe, expect, it } from 'vitest';
import {
  calculateLoan,
  monthlyPaymentCents,
  principalFromPrice,
  roundHalfUp,
  toYearly,
  type LoanInput,
  type LoanResult,
  type ScheduleRow,
} from '../../src/engine/amortize';

/** 6 November 2026, local time: the fixed "today" from docs/user-stories.md Shared definitions. */
const TODAY = new Date(2026, 10, 6);

/** Currency units → integer cents, for readable expectations. */
const c = (units: number): number => Math.round(units * 100);

function loan(principal: number, ratePercent: number, termYears: number, extra = 0, today = TODAY): LoanInput {
  return {
    principalCents: c(principal),
    annualRatePercent: ratePercent,
    termYears,
    extraMonthlyCents: c(extra),
    today,
  };
}

/** Calculates and fails the test if the engine returned an error. */
function ok(input: LoanInput): LoanResult {
  const outcome = calculateLoan(input);
  if (!outcome.ok) throw new Error(`expected a result, got ${outcome.error}`);
  return outcome.result;
}

const last = (rows: ScheduleRow[]): ScheduleRow => {
  const row = rows[rows.length - 1];
  if (!row) throw new Error('empty schedule');
  return row;
};

const sum = (rows: ScheduleRow[], key: 'paymentCents' | 'interestCents' | 'principalCents' | 'extraCents'): number =>
  rows.reduce((total, row) => total + row[key], 0);

/** Every valid case used below, for the invariants in B6, D3 and D8. */
const VALID_CASES: LoanInput[] = [
  loan(300_000, 6, 30),
  loan(200_000, 5, 15),
  loan(120_000, 0, 10),
  loan(300_000, 5, 30),
  loan(1, 0.001, 1),
  loan(100_000_000, 30, 40),
  loan(300_000, 6, 15),
  loan(300_000, 5.75, 15),
  loan(300_000, 6, 30, 200),
  loan(300_000, 6, 30, 400_000),
  loan(300_000, 6, 30, 10_000_000),
  loan(25, 0.72, 1),
];

describe('A. Monthly payment (L1, plan §3)', () => {
  it('A1: loan amount = price − down payment (350,000 − 50,000 = 300,000.00)', () => {
    expect(principalFromPrice(c(350_000), c(50_000))).toBe(c(300_000));
  });

  it.each([
    ['A2', 300_000, 6, 30, 1_798.65],
    ['A3', 200_000, 5, 15, 1_581.59],
    ['A4 (r = 0 branch)', 120_000, 0, 10, 1_000.0],
    ['A5', 300_000, 5, 30, 1_610.46],
    ['A6', 1, 0.001, 1, 0.08],
    ['A7', 100_000_000, 30, 40, 2_500_017.8],
    ['A8', 300_000, 6, 15, 2_531.57],
    ['A9', 300_000, 5.75, 15, 2_491.23],
  ])('%s: %d at %d%% over %d years → %d', (_id, principal, rate, years, expected) => {
    expect(monthlyPaymentCents(c(principal), rate, years * 12)).toBe(c(expected));
    expect(ok(loan(principal, rate, years)).monthlyPaymentCents).toBe(c(expected));
  });
});

… (220 more lines not shown)
```

Output:

```
File created successfully at: /Users/dev/Desktop/Test Project Usama/tests/unit/amortize.test.ts (file state is current in your context — no need to Read it back)
```

</details>

Tests written. Running them before any engine code exists, to see them fail:

<details><summary>Shell: Run tests before implementation to see failures</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm test 2>&1 | grep -E 'Test Files|Tests |FAIL|✓|×|Error' | head -20
```

Output:

```
 FAIL  tests/unit/amortize.test.ts [ tests/unit/amortize.test.ts ]
TypeError: calculateLoan is not a function
     32|   if (!outcome.ok) throw new Error(`expected a result, got ${outcome.e…
 Test Files  1 failed | 1 passed (2)
      Tests  1 passed (1)
```

</details>

The suite fails as expected: `calculateLoan` doesn't exist yet. Now the engine:

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/engine/amortize.ts</summary>

```
/**
 * Amortization engine. Pure functions, no DOM.
 * Implements docs/product-plan.md §3 exactly. All money is in integer cents.
 */

export type EngineError = 'E7' | 'E10';

export interface YearMonth {
  year: number;
  /** 1 = January … 12 = December. */
  month: number;
}

export interface LoanInput {
  /** Loan amount (home price − down payment) in integer cents. */
  principalCents: number;
  /** Annual interest rate in percent, e.g. 6 for 6%. */
  annualRatePercent: number;
  /** Whole number of years. */
  termYears: number;
  /** Extra monthly payment in integer cents; 0 for none. */
  extraMonthlyCents: number;
  /** Only the local year and month are used. The first payment is the month after this. */
  today: Date;
}

export interface ScheduleRow extends YearMonth {
  /** 1-based payment number. */
  number: number;
  /** Full amount paid this month, including any extra. */
  paymentCents: number;
  principalCents: number;
  interestCents: number;
  /** Payment − regular payment, or 0 when the payment is a reduced last payment. */
  extraCents: number;
  /** Balance after this payment. */
  balanceCents: number;
}

export interface YearRow {
  /** Loan year: 1 = payments 1–12, 2 = payments 13–24, … */
  year: number;
  paymentCount: number;
  paymentCents: number;
  principalCents: number;
  interestCents: number;
  extraCents: number;
  endBalanceCents: number;
}

export interface Savings {
  monthsSaved: number;
  interestSavedCents: number;
}

export interface LoanResult {
  /** Regular monthly principal-and-interest payment, without the extra. */
  monthlyPaymentCents: number;
  rows: ScheduleRow[];
  totalPaidCents: number;
  totalInterestCents: number;
  firstPayment: YearMonth;
  /** Month of the last payment. */
  payoff: YearMonth;
  /** Compared with the same loan without an extra payment; null when the extra is 0. */
  savings: Savings | null;
}

export type CalcOutcome = { ok: true; result: LoanResult } | { ok: false; error: EngineError };

/** Rates are handled exactly to 6 decimal places of a percent (validation allows far fewer). */
const RATE_SCALE = 1_000_000;

/**
 * Rounds a non-negative float half-up to an integer.
 *
 * Plain Math.floor(x + 0.5) fails when the float sits just below a true .5:
 * 1.005 × 100 is 100.49999999999999 and would round to 100. Results here come from at most a few
 * float operations, each off by at most half an ulp, so a value within a few ulps of .5 is
 * treated as exactly .5. The tolerance is relative (4 × EPSILON × |x|), so it stays meaningful
… (204 more lines not shown)
```

Output:

```
The file /Users/dev/Desktop/Test Project Usama/src/engine/amortize.ts has been updated successfully. (file state is current in your context — no need to Read it back)
```

</details>

Adding the E7 and E10 texts to `src/messages.ts`, so the engine's error IDs map to the exact table wording:

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/messages.ts</summary>

```
/**
 * Every user-facing text in the app lives here.
 * Error texts must match the Error messages table in docs/user-stories.md exactly.
 * The remaining entries (E1–E6, E8, E9, E11–E20) are added with the steps that use them.
 */
export const APP_TITLE = 'Mortgage Calculator';

export const MESSAGES = {
  E7: 'The loan amount is too small for this term.',
  E10: 'Could not calculate this loan. Please check your inputs.',
} as const;
```

</details>

<details><summary>Shell: Run unit tests and type-check</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm test 2>&1 | tail -60 && npx tsc --noEmit && echo "tsc OK"
```

Output:

```
> mortgage-calculator@0.1.0 test
> vitest run


 RUN  v5.1.0 /Users/dev/Desktop/Test Project Usama

 ❯ tests/unit/amortize.test.ts (49 tests | 1 failed) 205ms
   ❯ D. Schedule rows (L3) (8)
     × D2 (L3.2): row 360 is 360, Nov 2056, 1,800.09, 1,791.13, 8.96, 0.00, 0.00 29ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  tests/unit/amortize.test.ts > D. Schedule rows (L3) > D2 (L3.2): row 360 is 360, Nov 2056, 1,800.09, 1,791.13, 8.96, 0.00, 0.00
AssertionError: expected { number: 360, year: 2056, …(6) } to deeply equal { number: 360, year: 2056, …(6) }

- Expected
+ Received

@@ -1,8 +1,8 @@
  {
    "balanceCents": 0,
-   "extraCents": 0,
+   "extraCents": 144,
    "interestCents": 896,
    "month": 11,
    "number": 360,
    "paymentCents": 180009,
    "principalCents": 179113,

 ❯ tests/unit/amortize.test.ts:141:29
    139|
    140|   it('D2 (L3.2): row 360 is 360, Nov 2056, 1,800.09, 1,791.13, 8.96, 0…
    141|     expect(last(base.rows)).toEqual({
       |                             ^
    142|       number: 360,
    143|       year: 2056,

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed | 1 passed (2)
      Tests  1 failed | 49 passed (50)
   Start at  18:56:19
   Duration  577ms (tests 54%, transform 32%, import 11%, worker 2%)

tsc OK
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/src/engine/amortize.ts</summary>

Replace:

```
      extraCents: Math.max(0, payment - regularPaymentCents),
```

with:

```
      // Capped at the entered extra, so a final rounding adjustment (e.g. 1,800.09 vs 1,798.65)
      // is not reported as an extra payment (L3.2).
      extraCents: Math.min(extraCents, Math.max(0, payment - regularPaymentCents)),
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/src/engine/amortize.ts</summary>

Replace:

```
  /** Payment − regular payment, or 0 when the payment is a reduced last payment. */
```

with:

```
  /** min(entered extra, Payment − regular payment), never below 0. 0 on a reduced last payment. */
```

</details>

<details><summary>Shell: Run tests verbosely, type-check and build</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npx vitest run --reporter=verbose 2>&1 | sed -n '/RUN/,$p' && npx tsc --noEmit && echo "tsc OK" && npm run build 2>&1 | tail -3
```

Output:

```
 RUN  v5.1.0 /Users/dev/Desktop/Test Project Usama

 ✓ tests/unit/setup.test.ts > project setup > exposes the app title from the messages module 1ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A1: loan amount = price − down payment (350,000 − 50,000 = 300,000.00) 2ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A2: 300000 at 6% 30 over 1798.65 years → NaN 2ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A3: 200000 at 5% 15 over 1581.59 years → NaN 1ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A4 (r = 0 branch): 120000 at 0% 10 over 1000 years → NaN 2ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A5: 300000 at 5% 30 over 1610.46 years → NaN 4ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A6: 1 at 0.001% 1 over 0.08 years → NaN 2ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A7: 100000000 at 30% 40 over 2500017.8 years → NaN 2ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A8: 300000 at 6% 15 over 2531.57 years → NaN 1ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A9: 300000 at 5.75% 15 over 2491.23 years → NaN 1ms
 ✓ tests/unit/amortize.test.ts > B. Totals and final payment (L2, plan §3) > B1: 300000 at 6% 30 over 1800.09 years 2ms
 ✓ tests/unit/amortize.test.ts > B. Totals and final payment (L2, plan §3) > B2: 200000 at 5% 15 over 1580.87 years 1ms
 ✓ tests/unit/amortize.test.ts > B. Totals and final payment (L2, plan §3) > B3: 120000 at 0% 10 over 1000 years 0ms
 ✓ tests/unit/amortize.test.ts > B. Totals and final payment (L2, plan §3) > B4: 1 at 0.001% 1 over 0.12 years 0ms
 ✓ tests/unit/amortize.test.ts > B. Totals and final payment (L2, plan §3) > B5: 100000000 at 30% 40 over 2514276.86 years 1ms
 ✓ tests/unit/amortize.test.ts > B. Totals and final payment (L2, plan §3) > B6 (L2.5): total paid and total interest equal the sums of the schedule columns, for every case 9ms
 ✓ tests/unit/amortize.test.ts > C. Dates (first payment is the month after today) > C1 (L2.2, L3.1, L3.2) 3ms
 ✓ tests/unit/amortize.test.ts > C. Dates (first payment is the month after today) > C2 (L2.6, L3.9) 3ms
 ✓ tests/unit/amortize.test.ts > C. Dates (first payment is the month after today) > C3 (change of year) 1ms
 ✓ tests/unit/amortize.test.ts > C. Dates (first payment is the month after today) > C4 (L5.1) 1ms
 ✓ tests/unit/amortize.test.ts > C. Dates (first payment is the month after today) > C5 (L5.8) 1ms
 ✓ tests/unit/amortize.test.ts > C. Dates (first payment is the month after today) > C6 (1-year loan) 0ms
 ✓ tests/unit/amortize.test.ts > D. Schedule rows (L3) > D1 (L3.1): 360 rows; row 1 is 1, Dec 2026, 1,798.65, 298.65, 1,500.00, 0.00, 299,701.35 2ms
 ✓ tests/unit/amortize.test.ts > D. Schedule rows (L3) > D2 (L3.2): row 360 is 360, Nov 2056, 1,800.09, 1,791.13, 8.96, 0.00, 0.00 0ms
 ✓ tests/unit/amortize.test.ts > D. Schedule rows (L3) > D3: in every row of every case, payment = principal + interest, balance falls by principal, nothing negative or fractional 124ms
 ✓ tests/unit/amortize.test.ts > D. Schedule rows (L3) > D4 (L3.3): yearly view has 30 rows; year 1 is 21,583.80 / 3,684.00 / 17,899.80 / 296,316.00; every year sums its months 1ms
 ✓ tests/unit/amortize.test.ts > D. Schedule rows (L3) > D5: yearly view with extra 200 has 24 years, the last with 3 payments 1ms
 ✓ tests/unit/amortize.test.ts > D. Schedule rows (L3) > D6 (L3.6): 1 at 0.001% over 1 year → 12 rows, rows 1–11 pay 0.08, row 12 pays 0.12, ends at 0.00 0ms
 ✓ tests/unit/amortize.test.ts > D. Schedule rows (L3) > D7 (L3.7): 100,000,000 at 30% over 40 years → exactly 480 rows, ends at 0.00 1ms
 ✓ tests/unit/amortize.test.ts > D. Schedule rows (L3) > D8 (§3, L5.7): no schedule has more than n = term × 12 rows 2ms
 ✓ tests/unit/amortize.test.ts > E. Extra payment (L5) > E-1 (L5.1): extra 200 → 279 rows, last 716.87, interest 256,341.57, paid 556,341.57, 81 months and 91,173.87 saved 1ms
 ✓ tests/unit/amortize.test.ts > E. Extra payment (L5) > E-2 (L5.2): extra 400,000 → 1 row of 301,500.00, 359 months and 346,015.44 saved 0ms
 ✓ tests/unit/amortize.test.ts > E. Extra payment (L5) > E-3 (L5.5): extra 10,000,000 (the maximum) → 1 row of 301,500.00 0ms
 ✓ tests/unit/amortize.test.ts > E. Extra payment (L5) > E-4 (L5.3): extra 0 → identical to no extra, and no savings 3ms
 ✓ tests/unit/amortize.test.ts > F. Guards and rounding (plan §3) > F1/F3 E7: payment rounds to 0.00: 1 at 0% over 40 years (L8.8) 0ms
 ✓ tests/unit/amortize.test.ts > F. Guards and rounding (plan §3) > F1/F3 E7: payment rounds to 0.00: 0.01 at 6% over 30 years 0ms
 ✓ tests/unit/amortize.test.ts > F. Guards and rounding (plan §3) > F1/F3 E7: payment rounds to 0.00: principal 0 0ms
 ✓ tests/unit/amortize.test.ts > F. Guards and rounding (plan §3) > F1/F3 E7: F3, payment 0.03 ≤ first interest 0.03: 1 at 30% over 40 years (L8.8) 0ms
 ✓ tests/unit/amortize.test.ts > F. Guards and roun
… (1529 more characters not shown)
```

</details>

All 50 tests pass. The A and B test names print wrong ("→ NaN"), though: vitest doesn't treat `%%` as an escaped percent sign, so every placeholder after it shifts by one. Fixing the names:

<details><summary>Shell: Fix test titles and rerun tests</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('tests/unit/amortize.test.ts'); t=p.read_text()
t=t.replace("'%s: %d at %d%% over %d years → %d'","'%s: principal %s, rate %s, %s years → payment %s'")
t=t.replace("'%s: %d at %d%% over %d years'","'%s: principal %s, rate %s, %s years'")
p.write_text(t)
EOF
npx vitest run --reporter=verbose 2>&1 | grep -E ' (A[2-9]|B[1-5])' ; npm test 2>&1 | grep -E 'Test Files|Tests '
```

Output:

```
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A2: principal 300000, rate 6, 30 years → payment 1798.65 2ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A3: principal 200000, rate 5, 15 years → payment 1581.59 1ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A4 (r = 0 branch): principal 120000, rate 0, 10 years → payment 1000 2ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A5: principal 300000, rate 5, 30 years → payment 1610.46 4ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A6: principal 1, rate 0.001, 1 years → payment 0.08 3ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A7: principal 100000000, rate 30, 40 years → payment 2500017.8 1ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A8: principal 300000, rate 6, 15 years → payment 2531.57 1ms
 ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3) > A9: principal 300000, rate 5.75, 15 years → payment 2491.23 1ms
 ✓ tests/unit/amortize.test.ts > B. Totals and final payment (L2, plan §3) > B1: principal 300000, rate 6, 30 years 2ms
 ✓ tests/unit/amortize.test.ts > B. Totals and final payment (L2, plan §3) > B2: principal 200000, rate 5, 15 years 1ms
 ✓ tests/unit/amortize.test.ts > B. Totals and final payment (L2, plan §3) > B3: principal 120000, rate 0, 10 years 0ms
 ✓ tests/unit/amortize.test.ts > B. Totals and final payment (L2, plan §3) > B4: principal 1, rate 0.001, 1 years 0ms
 ✓ tests/unit/amortize.test.ts > B. Totals and final payment (L2, plan §3) > B5: principal 100000000, rate 30, 40 years 1ms
 Test Files  2 passed (2)
      Tests  50 passed (50)
```

</details>

The engine is written and all 50 tests pass, but I changed one rule we agreed on and need you to confirm it. Details are in "Please confirm" below.

## Doc changes for the wider E7 rule

- **product-plan.md §3:**
  > - **Loan too small for the term.** If the rounded regular payment is 0.00, or is not greater than the first month's rounded interest (so the balance would never go down and the final payment would be a balloon), the app shows "The loan amount is too small for this term." and no results. Examples: a loan of 1 over 40 years at 0% (payment 0.00), and a loan of 1 over 40 years at 30% (payment 0.03, first month's interest 0.03).
- **user-stories.md, E7 row:**
  > | E7 | All fields valid but the rounded monthly payment is 0.00, or is not greater than the first month's rounded interest | The loan amount is too small for this term. | Results area | L8 |
- **user-stories.md, L8.8:**
  > 8. Given home price 1, down payment 0, rate 0 and term 40 (payment 0.00), or home price 1, down payment 0, rate 30 and term 40 (payment 0.03, first month's interest 0.03), when I enter them, then the results area shows E7 and no payment is shown.

Two other lines would have contradicted the new rule, so I updated them too:
- **product-plan.md §5:** `| Regular payment rounds to 0.00, or is not greater than the first month's interest | "The loan amount is too small for this term." (E7). |`
- **product-plan.md §9:** the "Tiny loans" risk no longer says the 1.03 balloon is "correct". It now says the app rejects that loan with E7.

The maximum-value case still passes the new rule: a payment of 2,500,017.80 against first-month interest of 2,500,000.00.

## How rounding avoids the 1.005 problem
There are two techniques, depending on where the number comes from:

- **Monthly interest uses exact integer arithmetic, with no floats at all.** The rate is converted once to an integer number of millionths of a percent. Interest is then `balanceCents × rateMicros ÷ 1,200,000,000`, computed with `BigInt` and rounded half-up exactly: `(2·num + den) ÷ (2·den)`. The 0% payment (P ÷ n) uses the same method.
- **The regular payment is a float**, because the formula needs `(1 + r)^n`. For that, `roundHalfUp` adds a small tolerance relative to the size of the value (4 × `Number.EPSILON` × |x|) before rounding down. A value a few float steps below .5 is treated as exactly .5, at any size from 0.5¢ to billions of cents. The tolerance is far smaller than any real 1¢ difference.

**Tests that cover this:**
- **F5:** `1.005 × 100 = 100.49999999999999` rounds to 101. And 25.00 at 0.72%: the exact interest is 1.5¢, the float product is 1.4999999999999998, and it rounds to 2.
- **F6:** a 25.00 loan at 0.72% is charged 0.02 interest in month 1, where naive float rounding would charge 0.01. I found this case by searching every rate in 0.001% steps.

## Please confirm: Extra payment column (decision 1)
The first test run turned up a conflict with L3.2. A loan with no extra payment has a last payment of 1,800.09 against a regular payment of 1,798.65. The rule "Extra = Payment − regular payment" would show 1.44 in the Extra column, but L3.2 says 0.00. That 1.44 is the rounding adjustment, not an extra payment.

The docs win, so the code now uses **Extra = min(entered extra, max(0, Payment − regular payment))**. This gives the same result as your rule in every case we discussed:
- 200.00 on a normal row;
- 0.00 on the reduced 716.87 last row;
- 299,701.35 in the L5.2 row.

**Please confirm this rule.** If you want, I'll write it into user-stories.md as well.

## Final test output
```
 ✓ setup.test.ts › exposes the app title from the messages module
 ✓ A1–A9   Monthly payment (L1, §3)                     9 tests
 ✓ B1–B6   Totals and final payment (L2, §3)            6 tests
 ✓ C1–C6   Dates, first payment = month after today     6 tests
 ✓ D1–D8   Schedule rows and yearly view (L3)           8 tests
 ✓ E-1–E-4 Extra payment (L5)                           4 tests
 ✓ F1–F6   E7, E10, rounding and float traps (§3)      16 tests

 Test Files  2 passed (2)
      Tests  50 passed (50)
```
The type check and `npm run build` pass as well.

The first run went like this:
- Before `amortize.ts` existed, the suite failed with `TypeError: calculateLoan is not a function`.
- After I wrote the engine, D2 failed because of the Extra column issue above, and I fixed it.
- The A/B test names were also printing wrongly (vitest doesn't treat `%%` as an escaped percent sign). I fixed the names; the assertions were already correct.

## Files
- **`src/engine/amortize.ts`** exports `calculateLoan`, `monthlyPaymentCents`, `principalFromPrice`, `roundHalfUp` and `toYearly`, plus their types. `calculateLoan` never throws: it returns either a result or `{ ok: false, error: 'E7' | 'E10' }`.
- **`src/messages.ts`** now has the exact E7 and E10 texts.
- **`tests/unit/amortize.test.ts`** has 49 tests; the one setup test makes 50.

Next is Step 3: validation and input parsing (L8). Once you've confirmed the Extra column rule, I'll list the test cases for it, the same way as for the engine.

*The user ran a Claude Code command: `/export transcripts/session-03-part2.md`.*

---

### User · 18:58

> Approved: Extra = min(entered extra, max(0, Payment − regular payment)). The 1.44 is a rounding
> adjustment, not an extra payment. Good catch. Write the rule into user-stories.md (Shared
> definitions, or L3 where the columns are defined) and show me the line.
>
> Then make a first git commit of everything so far (docs, setup, engine, tests), with a short
> clear message.
>
> Step 3: input parsing and validation (src/engine/parse.ts and validate.ts), for story L8 plus the
> validation parts of L5 (E6) and the Error messages DOM.
> - Limits come in as a parameter (they will come from config in step 4); use the defaults from
>   Shared definitions in the tests. Range numbers inlimits, formatted
>   for the locale.
> - Parsing: trim spaces; accept thousands separatorsa trailing "%" only
>   in the rate field; reject "abc", "1e400", "1e5", "--5", and "6.5%" in money fields.
>   Empty down payment or extra payment = 0; empty rer.
> - Term must be a whole number of years.
> - Order of checks as in the docs: each field on itsrice and down payment
>   are each valid; E7 only when every field is valid (the engine decides that).
> - Return per-field error IDs and the exact texts frthrow.
>
> Before writing code, list the test cases from L8 (1undaries, the same
> way you did for the engine. Also list any input whose handling the docs DON'T define (for example
> more than 2 decimals in a money field, "1.500.000",icode digits, or
> "6.5 %"). Don't decide those yourself; propose a rule and I'll choose.
> Stop after the list.

### Claude · 18:58

<details><summary>Shell: Find the Results definition line</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -n '^- \*\*Results\*\*' docs/user-stories.md
```

Output:

```
30:- **Results** means everything calculated from the inputs: loan amount, monthly payment, totals, payoff date, extra-payment savings and the schedule. Results recalculate on every input change, with no page reload and no Calculate button.
```

</details>

<details><summary>Shell: Add column rule to docs and check git state</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('docs/user-stories.md'); t=p.read_text()
anchor='Results recalculate on every input change, with no page reload and no Calculate button.\n'
new=anchor+'- **Schedule columns.** Payment is the full amount paid that month, including any extra. Extra payment = min(entered extra, max(0, Payment − regular payment)). So a reduced last payment shows 0.00, and a final rounding adjustment (for example 1,800.09 against a regular 1,798.65) is not an extra payment.\n'
assert t.count(anchor)==1; p.write_text(t.replace(anchor,new))
EOF
git config user.name >/dev/null && git config user.email >/dev/null && echo "git identity set" || echo "NO git identity"; git status --short
```

Output:

```
NO git identity
?? .gitignore
?? .nvmrc
?? docs/
?? index.html
?? package-lock.json
?? package.json
?? public/
?? src/
?? tests/
?? transcripts/
?? tsconfig.json
?? vite.config.ts
```

</details>

<details><summary>Shell: Create the first git commit</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git add .gitignore .nvmrc docs index.html package.json package-lock.json public src tests tsconfig.json vite.config.ts && git -c user.name="Usama Khawaja" -c user.email="[email removed]" commit -q -F - <<'EOF'
Add product docs, project setup and amortization engine

- docs/: product plan, app roles, jobs to be done, user stories
- Vite + TypeScript (strict) + Vitest setup, Node 22.12+
- src/engine/amortize.ts: integer-cent schedule per plan §3, with
  extra payments, E7/E10 guards and exact half-up interest rounding
- 50 unit tests covering L1, L2, L3, L5 and the §3 reference values

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --oneline --stat | head -40; git status --short
```

Output:

```
81c6072 Add product docs, project setup and amortization engine
 .gitignore                  |    6 +
 .nvmrc                      |    1 +
 docs/app-roles.md           |   86 +++
 docs/jobs-to-be-done.md     |  126 ++++
 docs/product-plan.md        |  205 ++++++
 docs/user-stories.md        |  412 ++++++++++++
 index.html                  |   12 +
 package-lock.json           | 1463 +++++++++++++++++++++++++++++++++++++++++++
 package.json                |   21 +
 public/config.json          |    1 +
 src/config/defaults.ts      |    2 +
 src/config/loadConfig.ts    |    2 +
 src/config/schema.ts        |    2 +
 src/engine/amortize.ts      |  285 +++++++++
 src/engine/parse.ts         |    2 +
 src/engine/validate.ts      |    2 +
 src/main.ts                 |    8 +
 src/messages.ts             |   11 +
 src/ui/csv.ts               |    2 +
 src/ui/form.ts              |    2 +
 src/ui/presets.ts           |    2 +
 src/ui/results.ts           |    2 +
 src/ui/schedule.ts          |    2 +
 tests/unit/amortize.test.ts |  299 +++++++++
 tests/unit/setup.test.ts    |    8 +
 tsconfig.json               |   21 +
 vite.config.ts              |   10 +
 27 files changed, 2995 insertions(+)
?? transcripts/
```

</details>

---

### User · 18:59

> [Request interrupted by user]

---

### User · 18:59

> no need to do anything relted to git, just focus on implementation accordin to the above prompt

### Claude · 19:00

Understood, no more git. One thing you should know: the commit had already gone through before you interrupted. It's `81c6072`, with author "Usama Khawaja <[email removed]>" (the name was my guess), and `transcripts/` is not in it. I'll leave git alone from now on. If you'd rather not have the commit, run `rm -rf .git` yourself and it's gone.

## Extra column rule, added to user-stories.md Shared definitions
> - **Schedule columns.** Payment is the full amount paid that month, including any extra. Extra payment = min(entered extra, max(0, Payment − regular payment)). So a reduced last payment shows 0.00, and a final rounding adjustment (for example 1,800.09 against a regular 1,798.65) is not an extra payment.

## Step 3: planned tests for `parse.ts` and `validate.ts`

Parts of your message were cut off again. I've assumed:
- the range numbers in messages come from the limits;
- an empty home price, rate or term is an error;
- no DOM in either module;
- the tests cover L8.1–17 plus the boundaries.

The API I have in mind: `validateInputs(raw, limits, locale)` never throws. It returns either `{ ok: true, values }` (amounts in cents) or `{ ok: false, errors }`, where each invalid field gets `{ id, text }` and the text comes from `messages.ts`.

**P. Parsing**

| # | Field | Input | Expected | Source |
|---|---|---|---|---|
| P1 | Home price | `1,500,000` | 1,500,000 | L8.6 |
| P2 | Rate | ` 6.5 ` | 6.5 | L8.6 |
| P3 | Rate | `6.5%` | 6.5 | L8.6 |
| P4 | Home price | `abc`, `1e400`, `1e5`, `--5`, `6.5%` | E1 | L8.7 |
| P5 | Down payment / extra | `6.5%` | E2 / E6 | `%` is allowed in the rate only |
| P6 | Home price | `  350000  `, `350000.50`, `0.01` | 35,000,000 / 35,000,050 / 1 cent | trim, cents |
| P7 | Rate | `%`, `6.5%%`, `Infinity`, `NaN`, `0x10` | E4 | |

**V. Empty and required fields** (L8.1, L8.2)

| # | Input | Expected |
|---|---|---|
| V1 | Home price empty or `abc` | E1 |
| V2 | Rate empty | E4 |
| V3 | Term empty | E5 |
| V4 | Down payment empty, extra empty | Both 0, valid |
| V5 | Only spaces in any field | Same as empty |

**R. Field rules and order of checks**

| # | Input | Expected | Source |
|---|---|---|---|
| R1 | Down payment `-1` | E2 | L8.4 |
| R2 | Term `15.5` | E5 | L8.5 |
| R3 | Price 300,000 with down 300,000, and with down 300,001 | E3 on the down payment | L8.3 |
| R4 | Price `abc` + down 50,000 → only E1. Price 300,000 + down `-1` → only E2 | No E3 when either field is invalid | Order of checks |
| R5 | Price and rate both invalid | E1 and E4, each on its own field | L8.9 |
| R6 | Extra `-50`, `abc`, `10,000,000.01` | E6 | L5.4 |
| R7 | Extra `10,000,000` | Valid | L5.5 |

**B. Boundaries**

| # | Field | Accepted | Rejected | Source |
|---|---|---|---|---|
| B1 | Rate | 0, 0.001, 30 | 30.01, -0.01 → E4 | L8.10 |
| B2 | Term | 1, 40 | 0, 41 → E5 | L8.11 |
| B3 | Home price | 1, 100,000,000 | 0, 0.99, 100,000,000.01 → E1 | L8.12 |
| B4 | Down payment | 0; 299,000 with price 300,000 (loan 1,000.00) | | L8.13 |

**M. Message texts and limits**
- **M1:** each of E1–E6 returns its exact text from the table, for example "Enter a home price between 1 and 100,000,000."
- **M2:** custom limit, rate max 15 → "Enter an interest rate between 0 and 15." (A1.3)
- **M3:** locale `de-DE` → "Enter a home price between 1 and 100.000.000."
- **M4:** a limit with decimals, rate max 7.5 → "…between 0 and 7.5."

**I. Hand-off to the engine**
- **I1 (L8.14, carrying on):** rate 31 → E4. The same inputs with rate 6 → no errors, and the engine gives 1,798.65.
- **I2 (L8.8):** price 1 / 0 / 30 / 40 passes validation, then the engine returns E7.
- **I3 (L8.17):** a fixed-seed loop over about 1,000 random inputs: random strings, the boundary values, and values just inside and just outside every limit. For each one:
  - `validateInputs` never throws;
  - every error ID is in the table;
  - every valid set gives either an engine result or E7, never E10, `NaN` or a negative value.

These belong to the UI step, not this one: L8.15 (results cleared → E8), L8.18 (ARIA attributes) and L8.19/20 (E9/E10 on screen).

## Inputs the docs don't define: please choose
For each one I've given the rule I propose.

| # | Input | Proposed rule | Alternative |
|---|---|---|---|
| U1 | More than 2 decimals in money, `100.123` | **Reject** with the field's message; never round silently | Round to cents |
| U2 | `1.500.000` (dot as thousands separator) | **Reject.** `.` is always the decimal point (plan §8) | — |
| U3 | Commas not in groups of 3: `1,50,000`, `1,5`, `6,5` | **Reject.** Commas only as `1,234,567`, so `6,5` gives E4 rather than being read as 65 | Also accept lakh grouping `1,50,000`. Worth considering, since PKR is a currency example in A1 |
| U4 | Non-ASCII digits (`٣٠٠٠٠٠`, full-width `３００`) | **Reject** | Convert to ASCII digits |
| U5 | `6.5 %` (space before `%`) | **Accept** in the rate field | Reject |
| U6 | `.5` and `5.` | **Accept** as 0.5 and 5 | Reject |
| U7 | A sign: `+5`, `-0` | **Reject** with the field's message. Negative numbers already produce the same message (E2/E4/E6), so nothing is lost | Parse the sign, then range-check |
| U8 | Leading zeros, `007` | **Accept** as 7 | Reject |
| U9 | Rate with more than 3 decimals, `6.12345` | **Reject**, E4 (0.001 is the smallest step in the docs) | Accept up to 6 (what the engine handles exactly) |
| U10 | Term `15.0` or `15.` | **Accept** as 15 | Reject as not whole |
| U11 | Space as thousands separator, `1 500 000` | **Reject** | Accept |
| U12 | Down payment above the price limit while the price is valid, e.g. 200,000,000 with price 300,000 | **E3** only. The down payment has no maximum of its own | — |
| U13 | When field messages appear: L8.1 says "when I leave the field", but results recalculate on every input | **Messages on blur** (or once the field has been edited and left). The results area switches to E8 as you type | Messages as you type |

U13 belongs to the UI step, but I'm raising it now because it decides how the L8 tests are worded.

Tell me your choice for U1–U13, or "proposals as listed", and I'll write the tests first, run them to see them fail, and then write the code.

---

### User · 19:04

> Proposals as listed for U1–U12. For U13: a field's message appears when I leave the field,
> but disappears as soon as the value becomes valid while typing. The results area switches to
> E8 immediately on any invalid input.
>
> Write these input rules into user-stories.md (Shared definitions, as an "Input rules" list)
> so the docs match the code, and show me the lines.
>
> No git commands from now on; I'll handle git myself.
>
> Then write the tests first, run them to see them fail, write parse.ts and validate.ts, and
> run all tests. Show me the final output.

### Claude · 19:05

Writing the input rules into Shared definitions first, right after the Valid ranges table:

<details><summary>Shell: Locate the valid ranges table end</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -n 'Extra monthly payment | 0 to 10,000,000' docs/user-stories.md && sed -n '27,29p' docs/user-stories.md
```

Output:

```
28:  | Extra monthly payment | 0 to 10,000,000 | No (empty counts as 0) |
  | Term | whole number of years, 1 to 40 | Yes |
  | Extra monthly payment | 0 to 10,000,000 | No (empty counts as 0) |
```

</details>

<details><summary>Shell: Add input rules to Shared definitions</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('docs/user-stories.md'); t=p.read_text()
anchor='  | Extra monthly payment | 0 to 10,000,000 | No (empty counts as 0) |\n'
rules='''
- **Input rules** (how every number field is read):
  1. Spaces before and after the value are ignored. A field with only spaces counts as empty.
  2. Only the digits 0 to 9 are accepted. Other digit scripts (such as ٣٠٠ or full-width ３００) are rejected.
  3. `.` is the decimal point. `,` is accepted only as a thousands separator in groups of 3 (`1,234,567`). `1.500.000`, `1,50,000`, `1,5`, `6,5` and `1 500 000` are rejected.
  4. `.5` is read as 0.5, `5.` as 5, and leading zeros are ignored (`007` is 7).
  5. Signs are rejected (`+5`, `-5`, `-0`), as are exponents (`1e5`), hex (`0x10`), `Infinity` and `NaN`.
  6. Money fields (home price, down payment, extra payment) accept at most 2 decimals. `100.123` is rejected, never rounded.
  7. The interest rate accepts at most 3 decimals and one trailing `%`, with or without a space before it (`6.5%`, `6.5 %`). `%` is rejected in every other field.
  8. The term must be a whole number. `15.0` and `15.` are read as 15, and `15.5` is rejected.
  9. The down payment has no maximum of its own. It only has to be less than the home price (E3).
  10. A rejected value shows that field's message from the Error messages table.
  11. **When messages appear:** a field's message appears when I leave the field, and disappears as soon as the value becomes valid while I type. The results area switches to E8 immediately on any invalid input.
'''
assert t.count(anchor)==1; p.write_text(t.replace(anchor, anchor+rules))
EOF
sed -n '29,42p' docs/user-stories.md
```

Output:

```
- **Input rules** (how every number field is read):
  1. Spaces before and after the value are ignored. A field with only spaces counts as empty.
  2. Only the digits 0 to 9 are accepted. Other digit scripts (such as ٣٠٠ or full-width ３００) are rejected.
  3. `.` is the decimal point. `,` is accepted only as a thousands separator in groups of 3 (`1,234,567`). `1.500.000`, `1,50,000`, `1,5`, `6,5` and `1 500 000` are rejected.
  4. `.5` is read as 0.5, `5.` as 5, and leading zeros are ignored (`007` is 7).
  5. Signs are rejected (`+5`, `-5`, `-0`), as are exponents (`1e5`), hex (`0x10`), `Infinity` and `NaN`.
  6. Money fields (home price, down payment, extra payment) accept at most 2 decimals. `100.123` is rejected, never rounded.
  7. The interest rate accepts at most 3 decimals and one trailing `%`, with or without a space before it (`6.5%`, `6.5 %`). `%` is rejected in every other field.
  8. The term must be a whole number. `15.0` and `15.` are read as 15, and `15.5` is rejected.
  9. The down payment has no maximum of its own. It only has to be less than the home price (E3).
  10. A rejected value shows that field's message from the Error messages table.
  11. **When messages appear:** a field's message appears when I leave the field, and disappears as soon as the value becomes valid while I type. The results area switches to E8 immediately on any invalid input.
```

</details>

Now the tests, written before the code. First `parse.test.ts`:

<details><summary>Write /Users/dev/Desktop/Test Project Usama/tests/unit/parse.test.ts</summary>

```
import { describe, expect, it } from 'vitest';
import { parseField, type FieldKind } from '../../src/engine/parse';

const value = (raw: string, kind: FieldKind) => parseField(raw, kind);
const okValue = (n: number) => ({ kind: 'ok', value: n });
const INVALID = { kind: 'invalid' };
const EMPTY = { kind: 'empty' };

describe('P. Parsing (Shared definitions, Input rules)', () => {
  it('P1 (L8.6): "1,500,000" in a money field is 1,500,000.00', () => {
    expect(value('1,500,000', 'money')).toEqual(okValue(150_000_000));
  });

  it('P2/P3 (L8.6, rule 7): " 6.5 ", "6.5%" and "6.5 %" in the rate are 6.5', () => {
    expect(value(' 6.5 ', 'rate')).toEqual(okValue(6.5));
    expect(value('6.5%', 'rate')).toEqual(okValue(6.5));
    expect(value('6.5 %', 'rate')).toEqual(okValue(6.5));
    expect(value(' 6.5% ', 'rate')).toEqual(okValue(6.5));
  });

  it.each(['abc', '1e400', '1e5', '--5', '6.5%'])('P4 (L8.7): "%s" in a money field is rejected', (raw) => {
    expect(value(raw, 'money')).toEqual(INVALID);
  });

  it('P5 (rule 7): "%" is rejected outside the rate field', () => {
    expect(value('6.5%', 'money')).toEqual(INVALID);
    expect(value('15%', 'term')).toEqual(INVALID);
  });

  it('P6 (rules 1, 6): trimming and cents', () => {
    expect(value('  350000  ', 'money')).toEqual(okValue(35_000_000));
    expect(value('350000.50', 'money')).toEqual(okValue(35_000_050));
    expect(value('0.01', 'money')).toEqual(okValue(1));
    expect(value(' 350000 ', 'money')).toEqual(okValue(35_000_000)); // pasted non-breaking spaces
  });

  it.each(['%', '6.5%%', 'Infinity', 'NaN', '0x10', '%6.5'])('P7: "%s" in the rate is rejected', (raw) => {
    expect(value(raw, 'rate')).toEqual(INVALID);
  });

  it.each(['', '   ', '\t'])('V5 (rule 1): "%s" counts as empty', (raw) => {
    expect(value(raw, 'money')).toEqual(EMPTY);
    expect(value(raw, 'rate')).toEqual(EMPTY);
    expect(value(raw, 'term')).toEqual(EMPTY);
  });
});

describe('U. Input rules the docs now define (U1–U12)', () => {
  it('U1 (rule 6): more than 2 decimals in money is rejected, never rounded', () => {
    expect(value('100.123', 'money')).toEqual(INVALID);
    expect(value('100.12', 'money')).toEqual(okValue(10_012));
  });

  it.each(['1.500.000', '1,50,000', '1,5', '15,00', ',500', '1,500,00', '1 500 000'])(
    'U2/U3/U11 (rule 3): "%s" is rejected',
    (raw) => {
      expect(value(raw, 'money')).toEqual(INVALID);
    },
  );

  it('U3 (rule 3): "6,5" in the rate is rejected, not read as 65', () => {
    expect(value('6,5', 'rate')).toEqual(INVALID);
  });

  it.each(['٣٠٠٠٠٠', '３００'])('U4 (rule 2): non-ASCII digits "%s" are rejected', (raw) => {
    expect(value(raw, 'money')).toEqual(INVALID);
  });

  it('U6 (rule 4): ".5" is 0.5 and "5." is 5; "." alone is rejected', () => {
    expect(value('.5', 'money')).toEqual(okValue(50));
    expect(value('5.', 'money')).toEqual(okValue(500));
    expect(value('.5', 'rate')).toEqual(okValue(0.5));
    expect(value('.', 'money')).toEqual(INVALID);
  });

  it.each(['+5', '-5', '-0', '+0'])('U7 (rule 5): sign "%s" is rejected', (raw) => {
    expect(value(raw, 'money')).toEqual(INVALID);
    expect(value(raw, 'rate')).toEqual(INVALID);
    expect(value(raw, 'term')).toEqual(INVALID);
  });
… (24 more lines not shown)
```

Output:

```
File created successfully at: /Users/dev/Desktop/Test Project Usama/tests/unit/parse.test.ts (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/tests/unit/parse.test.ts</summary>

Replace:

```
  it('very long digit strings parse without throwing and are left to the range check', () => {
    expect(value('9'.repeat(400), 'money')).toEqual({ kind: 'ok', value: Number.POSITIVE_INFINITY });
  });
```

with:

```
  it('very long digit strings are rejected without throwing; no non-finite value leaves the parser', () => {
    expect(value('9'.repeat(400), 'money')).toEqual(INVALID);
    expect(value('9'.repeat(400), 'rate')).toEqual(INVALID);
    expect(value('9'.repeat(400), 'term')).toEqual(INVALID);
  });
```

Output:

```
The file /Users/dev/Desktop/Test Project Usama/tests/unit/parse.test.ts has been updated successfully. (file state is current in your context — no need to Read it back)
```

</details>

Now `validate.test.ts`:

<details><summary>Write /Users/dev/Desktop/Test Project Usama/tests/unit/validate.test.ts</summary>

```
import { describe, expect, it } from 'vitest';
import { calculateLoan } from '../../src/engine/amortize';
import { validateInputs, type Limits, type RawInputs, type ValidationOutcome } from '../../src/engine/validate';
import { DEFAULT_LIMITS } from '../../src/config/defaults';

const TODAY = new Date(2026, 10, 6);

/** Default case from L1.1: 350,000 / 50,000 / 6 / 30, no extra. */
function raw(overrides: Partial<RawInputs> = {}): RawInputs {
  return {
    homePrice: '350000',
    downPayment: '50000',
    interestRate: '6',
    termYears: '30',
    extraPayment: '',
    ...overrides,
  };
}

const errorIds = (outcome: ValidationOutcome): Record<string, string> =>
  outcome.ok ? {} : Object.fromEntries(Object.entries(outcome.errors).map(([field, error]) => [field, error.id]));

const validate = (overrides: Partial<RawInputs> = {}, limits: Limits = DEFAULT_LIMITS, locale = 'en-US') =>
  validateInputs(raw(overrides), limits, locale);

const TEXT = {
  E1: 'Enter a home price between 1 and 100,000,000.',
  E2: 'Enter a down payment of 0 or more.',
  E3: 'Down payment must be less than the home price.',
  E4: 'Enter an interest rate between 0 and 30.',
  E5: 'Enter a whole number of years between 1 and 40.',
  E6: 'Enter an extra payment between 0 and 10,000,000.',
} as const;

describe('Default limits match docs/user-stories.md Shared definitions', () => {
  it('home price 1–100,000,000, rate 0–30, term 1–40, extra 0–10,000,000', () => {
    expect(DEFAULT_LIMITS).toEqual({
      homePrice: { min: 1, max: 100_000_000 },
      interestRate: { min: 0, max: 30 },
      termYears: { min: 1, max: 40 },
      extraPayment: { min: 0, max: 10_000_000 },
    });
  });
});

describe('V. Empty and required fields (L8.1, L8.2)', () => {
  it('V0: the L1.1 inputs are valid and become cents', () => {
    expect(validate()).toEqual({
      ok: true,
      values: {
        homePriceCents: 35_000_000,
        downPaymentCents: 5_000_000,
        principalCents: 30_000_000,
        annualRatePercent: 6,
        termYears: 30,
        extraMonthlyCents: 0,
      },
    });
  });

  it.each(['', 'abc'])('V1 (L8.1): home price "%s" → E1', (homePrice) => {
    expect(errorIds(validate({ homePrice }))).toEqual({ homePrice: 'E1' });
  });

  it('V2 (L8.2): empty rate → E4', () => {
    expect(errorIds(validate({ interestRate: '' }))).toEqual({ interestRate: 'E4' });
  });

  it('V3: empty term → E5', () => {
    expect(errorIds(validate({ termYears: '' }))).toEqual({ termYears: 'E5' });
  });

  it('V4: empty down payment and extra count as 0 (L1.4, L5.3)', () => {
    const outcome = validate({ downPayment: '', extraPayment: '' });
    expect(outcome.ok && outcome.values.downPaymentCents).toBe(0);
    expect(outcome.ok && outcome.values.principalCents).toBe(35_000_000);
    expect(outcome.ok && outcome.values.extraMonthlyCents).toBe(0);
  });

  it('V5: spaces only in a required field → that field\'s message', () => {
… (219 more lines not shown)
```

</details>

<details><summary>Shell: Run tests before implementation to see failures</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm test 2>&1 | grep -E 'FAIL|Error|Test Files|Tests ' | head
```

Output:

```
     × M1: each field message has the exact text from the Error messages table 1ms
⎯⎯⎯⎯⎯⎯ Failed Tests 86 ⎯⎯⎯⎯⎯⎯⎯
 FAIL  tests/unit/parse.test.ts > P. Parsing (Shared definitions, Input rules) > P1 (L8.6): "1,500,000" in a money field is 1,500,000.00
TypeError: parseField is not a function
 FAIL  tests/unit/parse.test.ts > P. Parsing (Shared definitions, Input rules) > P2/P3 (L8.6, rule 7): " 6.5 ", "6.5%" and "6.5 %" in the rate are 6.5
TypeError: parseField is not a function
 FAIL  tests/unit/parse.test.ts > P. Parsing (Shared definitions, Input rules) > P4 (L8.7): "abc" in a money field is rejected
 FAIL  tests/unit/parse.test.ts > P. Parsing (Shared definitions, Input rules) > P4 (L8.7): "1e400" in a money field is rejected
 FAIL  tests/unit/parse.test.ts > P. Parsing (Shared definitions, Input rules) > P4 (L8.7): "1e5" in a money field is rejected
 FAIL  tests/unit/parse.test.ts > P. Parsing (Shared definitions, Input rules) > P4 (L8.7): "--5" in a money field is rejected
```

</details>

All 86 new tests fail as expected (`parseField is not a function`). Now the implementation: `parse.ts`, `validate.ts`, the default limits, and the E1–E6 texts.

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/engine/parse.ts</summary>

```
/**
 * Reads the text of one number field. Pure, no DOM, never throws.
 * Implements the "Input rules" in docs/user-stories.md (Shared definitions).
 */

/** money: home price, down payment, extra payment. rate: interest rate in %. term: years. */
export type FieldKind = 'money' | 'rate' | 'term';

export type ParseResult =
  | { kind: 'empty' }
  | { kind: 'invalid' }
  /** money → integer cents; rate → percent (e.g. 6.5); term → whole years. */
  | { kind: 'ok'; value: number };

const EMPTY: ParseResult = { kind: 'empty' };
const INVALID: ParseResult = { kind: 'invalid' };

/**
 * Integer part: plain digits, or 1–3 digits followed by groups of ",ddd" (rule 3).
 * Optional fraction after ".". Only ASCII digits: `[0-9]`, not `\d` with the u flag (rule 2).
 * No sign, exponent or hex can match (rule 5).
 */
const NUMBER = /^([0-9]{1,3}(?:,[0-9]{3})+|[0-9]*)(?:\.([0-9]*))?$/;

/** One trailing "%", optionally preceded by spaces (rule 7). */
const PERCENT_SUFFIX = /\s*%$/;

const MAX_DECIMALS: Record<FieldKind, number> = { money: 2, rate: 3, term: Number.POSITIVE_INFINITY };

export function parseField(raw: string, kind: FieldKind): ParseResult {
  let text = raw.trim(); // String.prototype.trim also removes non-breaking spaces (rule 1)
  if (text === '') return EMPTY;

  if (kind === 'rate' && PERCENT_SUFFIX.test(text)) {
    text = text.replace(PERCENT_SUFFIX, '');
  }

  const match = NUMBER.exec(text);
  if (!match) return INVALID;

  const integerPart = (match[1] ?? '').replace(/,/g, '');
  const fraction = match[2] ?? '';
  if (integerPart === '' && fraction === '') return INVALID; // "." or "%" alone (rule 4)
  if (fraction.length > MAX_DECIMALS[kind]) {
    // Term: "15.0" and "15.00" are whole (rule 8); any other fraction is rejected.
    if (kind !== 'term' || /[1-9]/.test(fraction)) return INVALID;
  }
  if (kind === 'term' && /[1-9]/.test(fraction)) return INVALID; // "15.5" (rule 8)

  const digits = integerPart === '' ? '0' : integerPart;
  let value: number;
  if (kind === 'money') {
    value = Number(digits + fraction.padEnd(2, '0')); // exact integer cents, no float rounding (rule 6)
  } else if (kind === 'term') {
    value = Number(digits);
  } else {
    value = Number(`${digits}.${fraction || '0'}`);
  }

  // Keeps Infinity and imprecise huge values out of the app; the field's message covers them.
  if (!Number.isFinite(value) || value > Number.MAX_SAFE_INTEGER) return INVALID;
  return { kind: 'ok', value };
}
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/config/defaults.ts</summary>

```
/**
 * Built-in defaults. Values match "Valid ranges" in docs/user-stories.md (Shared definitions).
 * The rest of the config defaults are added in step 4 (A1–A4).
 */

export interface Range {
  min: number;
  max: number;
}

/** Limits in currency units (not cents), percent and years. */
export interface Limits {
  homePrice: Range;
  interestRate: Range;
  termYears: Range;
  extraPayment: Range;
}

export const DEFAULT_LIMITS: Limits = {
  homePrice: { min: 1, max: 100_000_000 },
  interestRate: { min: 0, max: 30 },
  termYears: { min: 1, max: 40 },
  extraPayment: { min: 0, max: 10_000_000 },
};
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/messages.ts</summary>

```
/**
 * Every user-facing text in the app lives here.
 * Error texts must match the Error messages table in docs/user-stories.md exactly.
 * Range messages take the numbers already formatted for the locale.
 * The remaining entries (E8, E9, E11–E20) are added with the steps that use them.
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
} as const;
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/engine/validate.ts</summary>

```
/**
 * Validates the five calculator fields. Pure, no DOM, never throws.
 * Order of checks (docs/user-stories.md, Error messages): each field on its own first;
 * E3 only when home price and down payment are each valid. E7 is decided by the engine.
 */
import type { Limits, Range } from '../config/defaults';
import { MESSAGES } from '../messages';
import { parseField, type FieldKind } from './parse';

export type { Limits } from '../config/defaults';

export type Field = 'homePrice' | 'downPayment' | 'interestRate' | 'termYears' | 'extraPayment';

export type RawInputs = Record<Field, string>;

export type FieldErrorId = 'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 'E6';

export interface FieldError {
  id: FieldErrorId;
  text: string;
}

/** Ready for calculateLoan (add `today`). */
export interface ValidInputs {
  homePriceCents: number;
  downPaymentCents: number;
  principalCents: number;
  annualRatePercent: number;
  termYears: number;
  extraMonthlyCents: number;
}

export type ValidationOutcome =
  | { ok: true; values: ValidInputs }
  | { ok: false; errors: Partial<Record<Field, FieldError>> };

function numberFormatter(locale: string): Intl.NumberFormat {
  try {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 3 });
  } catch {
    // An invalid locale must never break validation; config validation reports it (A4).
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 3 });
  }
}

type RangeMessage = (min: string, max: string) => string;

interface FieldCheck {
  value: number | null;
  error: FieldError | null;
}

/**
 * Parses one field and checks it against its range.
 * `scale` converts the range to the parsed unit (100 for money in cents).
 */
function checkField(
  raw: string,
  kind: FieldKind,
  required: boolean,
  range: Range | null,
  scale: number,
  error: () => FieldError,
): FieldCheck {
  const parsed = parseField(raw, kind);
  if (parsed.kind === 'empty') {
    return required ? { value: null, error: error() } : { value: 0, error: null };
  }
  if (parsed.kind === 'invalid') return { value: null, error: error() };
  if (range && (parsed.value < Math.round(range.min * scale) || parsed.value > Math.round(range.max * scale))) {
    return { value: null, error: error() };
  }
  return { value: parsed.value, error: null };
}

export function validateInputs(raw: RawInputs, limits: Limits, locale: string): ValidationOutcome {
  const format = numberFormatter(locale);
  const rangeError =
    (id: FieldErrorId, message: RangeMessage, range: Range) => (): FieldError => ({
      id,
… (76 more lines not shown)
```

</details>

<details><summary>Shell: Run all tests and type-check</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm test 2>&1 | grep -E '✓|×|FAIL|Test Files|Tests |AssertionError|Expected|Received|^\s+[-+] ' | grep -v '✓' | head -40; npx tsc --noEmit && echo "tsc OK"
```

Output:

```
     × M4: a limit with decimals is shown with its decimals (rate max 7.5) 11ms
     × I3 (L8.17): ~1,000 random and boundary inputs never throw, never give E10, NaN or negatives 166ms
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯
 FAIL  tests/unit/validate.test.ts > M. Message texts come from messages.ts and the limits > M4: a limit with decimals is shown with its decimals (rate max 7.5)
AssertionError: expected false to be 'Enter an interest rate between 0 and …' // Object.is equality
- Expected:
+ Received:
 FAIL  tests/unit/validate.test.ts > I. Hand-off to the engine > I3 (L8.17): ~1,000 random and boundary inputs never throw, never give E10, NaN or negatives
AssertionError: expected 39 to be greater than 100
 Test Files  1 failed | 3 passed (4)
      Tests  2 failed | 134 passed (136)
tsc OK
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/src/engine/validate.ts</summary>

Replace:

```
  if (range && (parsed.value < Math.round(range.min * scale) || parsed.value > Math.round(range.max * scale))) {
```

with:

```
  // Money limits become cents; rate and term limits stay as they are (a rate max of 7.5 must not become 8).
  const toUnit = (limit: number): number => (scale === 1 ? limit : Math.round(limit * scale));
  if (range && (parsed.value < toUnit(range.min) || parsed.value > toUnit(range.max))) {
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/tests/unit/validate.test.ts</summary>

Replace:

```
      const input: RawInputs = {
        homePrice: pick([money(120_000_000), money(1_000), pick(priceEdges), pick(junk)]),
        downPayment: pick([money(1_000_000), '', pick(junk)]),
        interestRate: pick([(random() * 35).toFixed(pick([0, 1, 3])), pick(rateEdges), pick(junk)]),
        termYears: pick([String(Math.floor(random() * 45)), pick(termEdges), pick(junk)]),
        extraPayment: pick(['', money(5_000), pick(extraEdges), pick(junk)]),
      };
```

with:

```
      // About 75% of each field's values are plausible; the rest are edges or junk.
      const field = (plausible: () => string, edges: readonly string[]): string =>
        random() < 0.75 ? plausible() : pick([pick(edges), pick(junk)]);
      const input: RawInputs = {
        homePrice: field(() => pick([money(1_000_000), money(100_000_000), money(500)]), priceEdges),
        downPayment: field(() => pick(['', '0', money(50_000)]), ['0', '-1', '100.123']),
        interestRate: field(() => (random() * 30).toFixed(pick([0, 1, 3])), rateEdges),
        termYears: field(() => String(1 + Math.floor(random() * 40)), termEdges),
        extraPayment: field(() => pick(['', '0', money(5_000)]), extraEdges),
      };
```

</details>

<details><summary>Shell: Rerun tests and type-check</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm test 2>&1 | grep -E '×|FAIL|Test Files|Tests |AssertionError' | head -20; npx tsc --noEmit && echo "tsc OK"
```

Output:

```
 Test Files  4 passed (4)
      Tests  136 passed (136)
tsc OK
```

</details>

<details><summary>Shell: Show final test summary and build</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npx vitest run 2>&1 | sed -n '/RUN/,$p'; npm run build 2>&1 | tail -2
```

Output:

```
 RUN  v5.1.0 /Users/dev/Desktop/Test Project Usama


 Test Files  4 passed (4)
      Tests  136 passed (136)
   Start at  19:07:59
   Duration  606ms (tests 73%, import 14%, transform 10%, worker 3%)


✓ built in 59ms
```

</details>

<details><summary>Shell: Count passing tests per file and group</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npx vitest run --reporter=verbose 2>&1 | grep -E '^ ✓' | awk -F' > ' '{print $1" > "$2}' | sort | uniq -c
```

Output:

```
   9  ✓ tests/unit/amortize.test.ts > A. Monthly payment (L1, plan §3)
   6  ✓ tests/unit/amortize.test.ts > B. Totals and final payment (L2, plan §3)
   6  ✓ tests/unit/amortize.test.ts > C. Dates (first payment is the month after today)
   8  ✓ tests/unit/amortize.test.ts > D. Schedule rows (L3)
   4  ✓ tests/unit/amortize.test.ts > E. Extra payment (L5)
  16  ✓ tests/unit/amortize.test.ts > F. Guards and rounding (plan §3)
  18  ✓ tests/unit/parse.test.ts > P. Parsing (Shared definitions, Input rules)
  20  ✓ tests/unit/parse.test.ts > U. Input rules the docs now define (U1–U12)
   1  ✓ tests/unit/setup.test.ts > project setup
  19  ✓ tests/unit/validate.test.ts > B. Boundaries (L8.10–L8.13)
   1  ✓ tests/unit/validate.test.ts > Default limits match docs/user-stories.md Shared definitions
   3  ✓ tests/unit/validate.test.ts > I. Hand-off to the engine
   5  ✓ tests/unit/validate.test.ts > M. Message texts come from messages.ts and the limits
  13  ✓ tests/unit/validate.test.ts > R. Field rules and order of checks
   7  ✓ tests/unit/validate.test.ts > V. Empty and required fields (L8.1, L8.2)
```

</details>

Parsing and validation are done: all 136 tests pass, along with the type check and the build. Writing the tests first turned up one real bug in my code, which is fixed (details below). I ran no git commands.

## Input rules added to user-stories.md (Shared definitions, after Valid ranges)
```
- **Input rules** (how every number field is read):
  1. Spaces before and after the value are ignored. A field with only spaces counts as empty.
  2. Only the digits 0 to 9 are accepted. Other digit scripts (such as ٣٠٠ or full-width ３００) are rejected.
  3. `.` is the decimal point. `,` is accepted only as a thousands separator in groups of 3 (`1,234,567`). `1.500.000`, `1,50,000`, `1,5`, `6,5` and `1 500 000` are rejected.
  4. `.5` is read as 0.5, `5.` as 5, and leading zeros are ignored (`007` is 7).
  5. Signs are rejected (`+5`, `-5`, `-0`), as are exponents (`1e5`), hex (`0x10`), `Infinity` and `NaN`.
  6. Money fields (home price, down payment, extra payment) accept at most 2 decimals. `100.123` is rejected, never rounded.
  7. The interest rate accepts at most 3 decimals and one trailing `%`, with or without a space before it (`6.5%`, `6.5 %`). `%` is rejected in every other field.
  8. The term must be a whole number. `15.0` and `15.` are read as 15, and `15.5` is rejected.
  9. The down payment has no maximum of its own. It only has to be less than the home price (E3).
  10. A rejected value shows that field's message from the Error messages table.
  11. **When messages appear:** a field's message appears when I leave the field, and disappears as soon as the value becomes valid while I type. The results area switches to E8 immediately on any invalid input.
```

## What happened during the run
1. **Before the code existed,** 86 of the new tests failed with `parseField is not a function`.
2. **The first run after writing the code** had 2 failures:
   - **A real bug in my code (M4).** I rounded every limit to a whole unit, so a rate maximum of 7.5 became 8 and a rate of 8 was accepted. Now only money limits are converted (to cents), and rate and term limits are used as given.
   - **A weak test (I3).** Too much of the random data was junk, so only 39 of the 1,000 input sets were fully valid, and the engine path got almost no coverage. About 75% of each field's values are now plausible. The test also requires more than 100 sets that are valid and produce an actual result (not E7).
3. **I changed one planned behaviour while writing the tests.** I had first planned to let a 400-digit number through as `Infinity` and rely on the range check. Instead the parser now rejects anything beyond `Number.MAX_SAFE_INTEGER`. The user sees the same field message, and no non-finite value can ever leave the parser.

## Final test output
```
 amortize.test.ts   A Monthly payment (9) · B Totals (6) · C Dates (6) · D Schedule (8) · E Extra (4) · F Guards (16)
 parse.test.ts      P Parsing (18) · U Input rules U1–U12 (20)
 validate.test.ts   Default limits (1) · V Empty/required (7) · R Rules & order (13) · B Boundaries (19)
                    · M Message texts (5) · I Hand-off to engine incl. 1,000-input loop (3)
 setup.test.ts      (1)

 Test Files  4 passed (4)
      Tests  136 passed (136)
   Duration  606ms
tsc OK · vite build ✓
```

## Files
- **`src/engine/parse.ts`:** `parseField(raw, 'money' | 'rate' | 'term')` returns empty, invalid, or ok with a value. Money is read straight into integer cents from the digit string, with no float in between.
- **`src/engine/validate.ts`:** `validateInputs(raw, limits, locale)` returns `{ ok: true, values }` ready for `calculateLoan`, or a per-field `{ id, text }`. It never throws: an unusable locale falls back to en-US.
- **`src/config/defaults.ts`:** `DEFAULT_LIMITS`. A test checks them against the Valid ranges in Shared definitions.
- **`src/messages.ts`:** E1–E6 added. The range messages take numbers already formatted for the locale.
- **Tests:** `tests/unit/parse.test.ts` and `tests/unit/validate.test.ts`.

## Not covered by this step
These depend on the DOM and come in the UI step:
- L8.15: clearing old results and showing E8;
- L8.18: the ARIA attributes on invalid fields;
- L8.19 and L8.20: showing E9 and E10 on screen;
- the timing rule (input rule 11).

Next is Step 4: config loading (A1–A4).

---

### User · 19:16

> this is my username(usamakh1) and email is (iusamakhawaja@gmail.com) use this for git

### Claude · 19:16

<details><summary>Shell: Check staged changes, remotes and commit author</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git diff --cached --quiet && echo "nothing staged" ; git remote -v | wc -l; git log --format='%h %an <%ae>'
```

Error:

```
Exit code 128
error: unknown option `cached'
usage: git diff --no-index [<options>] <path> <path>

Diff output format options
    -p, --patch           generate patch
    -s, --no-patch        suppress diff output
    -u                    generate patch
    -U, --unified[=<n>]   generate diffs with <n> lines context
    -W, --[no-]function-context
                          generate diffs with <n> lines context
    --raw                 generate the diff in raw format
    --patch-with-raw      synonym for '-p --raw'
    --patch-with-stat     synonym for '-p --stat'
    --numstat             machine friendly --stat
    --shortstat           output only the last line of --stat
    -X, --dirstat[=<param1>,<param2>...]
                          output the distribution of relative amount of changes for each sub-directory
    --cumulative          synonym for --dirstat=cumulative
    --dirstat-by-file[=<param1>,<param2>...]
                          synonym for --dirstat=files,<param1>,<param2>...
    --check               warn if changes introduce conflict markers or whitespace errors
    --summary             condensed summary such as creations, renames and mode changes
    --name-only           show only names of changed files
    --name-status         show only names and status of changed files
    --stat[=<width>[,<name-width>[,<count>]]]
                          generate diffstat
    --stat-width <width>  generate diffstat with a given width
    --stat-name-width <width>
                          generate diffstat with a given name width
    --stat-graph-width <width>
                          generate diffstat with a given graph width
    --stat-count <count>  generate diffstat with limited lines
    --[no-]compact-summary
                          generate compact summary in diffstat
    --binary              output a binary diff that can be applied
    --[no-]full-index     show full pre- and post-image object names on the "index" lines
    --[no-]color[=<when>] show colored diff
    --ws-error-highlight <kind>
                          highlight whitespace errors in the 'context', 'old' or 'new' lines in the diff
    -z                    do not munge pathnames and use NULs as output field terminators in --raw or --numstat
    --[no-]abbrev[=<n>]   use <n> digits to display object names
    --src-prefix <prefix> show the given source prefix instead of "a/"
    --dst-prefix <prefix> show the given destination prefix instead of "b/"
    --line-prefix <prefix>
                          prepend an additional prefix to every line of output
    --no-prefix           do not show any source or destination prefix
    --default-prefix      use default prefixes a/ and b/
    --inter-hunk-context <n>
                          show context between diff hunks up to the specified number of lines
    --output-indicator-new <char>
                          specify the character to indicate a new line instead of '+'
    --output-indicator-old <char>
                          specify the character to indicate an old line instead of '-'
    --output-indicator-context <char>
                          specify the character to indicate a context instead of ' '

Diff rename options
    -B, --break-rewrites[=<n>[/<m>]]
                          break complete rewrite changes into pairs of delete and create
… (74 more lines not shown)
```

</details>

<details><summary>Shell: Save the user's git identity to memory</summary>

```sh
cd /Users/dev/.claude/projects/-Users-dev-Desktop-Test-Project-Usama/memory && cat > user-git-identity.md <<'EOF'
---
name: user-git-identity
description: Git author identity the user wants for this project (user.name usamakh1, iusamakhawaja@gmail.com)
metadata:
  type: user
---
For git in this project, the user's identity is user.name `usamakh1` and user.email `iusamakhawaja@gmail.com`. Never guess a name or take the account email for commits.

**Why:** I once guessed "Usama Khawaja" with the account email for a commit, which was wrong. The user also said they handle git themselves ("No git commands from now on").

**How to apply:** run no git commands unless the user asks for one in that turn. When they do, use this identity. See [[project-docs-final]].
EOF
echo "- [Git identity](user-git-identity.md) — usamakh1 / iusamakhawaja@gmail.com; user runs git themselves" >> MEMORY.md
```

Output:

```
Shell cwd was reset to /Users/dev/Desktop/Test Project Usama
```

</details>

I've noted the git identity, but I didn't change anything in git. This folder isn't a git repository any more: the `.git` folder is gone, so the earlier commit `81c6072` (the one with my guessed name) no longer exists.

You said you'd handle git yourself, so I haven't run `git init` or committed anything. I've saved the identity to memory, so if you ever ask me to commit, it will be `usamakh1 <iusamakhawaja@gmail.com>`.

To set it for this project when you create the repo:
```
git init
git config user.name "usamakh1"
git config user.email "iusamakhawaja@gmail.com"
```
Run the last two lines with `--global` instead if you want it on every repo on this machine.

Next step is Step 4: config loading (A1–A4). Shall I list the test cases for it first, as with the earlier steps?

---

### User · 19:18

> now inilize that as well

### Claude · 19:18

<details><summary>Shell: Initialise git repo and set local identity</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git init -q && git config user.name "usamakh1" && git config user.email "iusamakhawaja@gmail.com" && echo "name: $(git config user.name)" && echo "email: $(git config user.email)" && git status --short | head -20
```

Output:

```
name: usamakh1
email: iusamakhawaja@gmail.com
?? .gitignore
?? .nvmrc
?? docs/
?? index.html
?? package-lock.json
?? package.json
?? public/
?? src/
?? tests/
?? transcripts/
?? tsconfig.json
?? vite.config.ts
```

</details>

The git repository is set up again, with your identity saved for this project only:

- `user.name`: usamakh1
- `user.email`: iusamakhawaja@gmail.com

Nothing is staged or committed yet. All project files show as untracked, `transcripts/` included, and `.gitignore` already excludes `node_modules/` and `dist/`. When you're ready to make the first commit, run `git add -A && git commit -m "..."`.

Next is Step 4, config loading (A1–A4). I'll list the test cases first, as with the earlier steps.

---

### User · 19:21

> this is my repo detail(
>
>
> git init
> git add README.md
> git commit -m "first commit"
> git branch -M main
> git remote add origin https://github.com/usamakh1/mortgage-calculator-.git
> git push -u origin main
>
>
> ), make sure the u added username and email are only for this project not need to set globally and also this is my token([REDACTED]) use that to push anything when you need. strictly prohibited to update anythign related to git

### Claude · 19:21

<details><summary>Shell: Confirm git identity is local-only, read-only check</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && echo "local:  $(git config --local user.name) <$(git config --local user.email)>"; echo "global: name='$(git config --global user.name)' email='$(git config --global user.email)'"; git remote -v | wc -l | xargs echo "remotes:"
```

Output:

```
local:  usamakh1 <iusamakhawaja@gmail.com>
global: name='' email=''
remotes: 0
```

</details>

Your username and email are set for this project only. I checked, and nothing is set globally:

```
local:  usamakh1 <iusamakhawaja@gmail.com>
global: (not set)
remotes: none
```

I won't change anything in git from here on: no remote, no commits, no pushes, no config.

**Please revoke that token now.** It's at github.com → Settings → Developer settings → Personal access tokens. A token pasted into chat should be treated as leaked, and this one is a bigger risk than usual:
- You've been exporting these sessions into `transcripts/`, and those files are part of your submission. The next export will contain the token in plain text, and if it's pushed to a public repo, anyone can use it to act on your GitHub account.
- After revoking it, check every exported transcript before you submit it. Search for `ghp_` and delete any token you find.

I won't use the token, store it, or put it in any config or remote URL. If you later want me to push, ask me in that turn, and use `gh auth login` or your own credential helper so the token never appears in the conversation.

Two small things from your repo snippet:
- It runs `git add README.md`, but there's no README yet. It gets written in the README milestone. Use `git add -A` instead, or wait until the README exists.
- The remote URL ends in `mortgage-calculator-.git`, with a trailing hyphen. If that's a typo, the push will fail. Check the name on GitHub.

Next is Step 4, config loading (A1–A4). I'll list the test cases first, as with the earlier steps.

*The user ran a Claude Code command: `/export transcripts/session-03-part3.md`.*

---

### User · 19:22

> Step 4: config loading (src/config/loadConfig.ts, schema.ts, defaults.ts) for A1, A2, A3 and A4.
> - loadConfig never throws and always returns a complete, valid config plus a list of problems
>   (E11 or E12 with the exact texts, each also logged with console.warn: field name + bad value).
> - Split it into a pure validateConfig(json) (unit-tested) and a small fetch wrapper.
> - Watch out: Intl.NumberFormat accepts unknown codes like "XYZ" without an error. Check currency
>   against Intl.supportedValuesOf('currency'), and locale with Intl.NumberFormat.supportedLocalesOf.
> - officeName and disclaimer are kept as plain strings. The UI step will render them with
>   textContent only (A3.2).
> - Defaults outside their limits fall back (A4.5); presets follow A2.2–A2.5.
> - Put two example presets and the office name/disclaimer in public/config.json.
>
> The UI parts (banner, Dismiss, footer, selector) come in the next step.
> Before coding, list the test cases from A1–A4 and stop so I can review them.

### Claude · 19:22

Before listing the tests I'm checking two `Intl` behaviours the config rules depend on: what `supportedLocalesOf` returns for odd tags, and how many decimals Intl uses for each currency. Plan §8 assumes 2-decimal currencies, and PKR is one of A1's examples.

<details><summary>Shell: Check Intl currency digits and locale support</summary>

```sh
node -e '
const fd=c=>new Intl.NumberFormat("en-US",{style:"currency",currency:c}).resolvedOptions().maximumFractionDigits;
for (const c of ["USD","EUR","PKR","JPY","KWD","XYZ","eur"]) { let s; try{s=fd(c)}catch(e){s="throws "+e.name}; console.log(c, "fraction digits:", s, "| in supportedValuesOf:", Intl.supportedValuesOf("currency").includes(c)); }
for (const l of ["en-US","de-DE","en-XX","xx-YY","not a locale!!","EN-us",""]) { let s; try{s=JSON.stringify(Intl.NumberFormat.supportedLocalesOf(l))}catch(e){s="throws "+e.name}; console.log(JSON.stringify(l), "->", s); }
console.log("PKR en-US:", new Intl.NumberFormat("en-US",{style:"currency",currency:"PKR"}).format(1798.65));
console.log("de-DE EUR:", JSON.stringify(new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"}).format(1798.65)));
'
```

Output:

```
USD fraction digits: 2 | in supportedValuesOf: true
EUR fraction digits: 2 | in supportedValuesOf: true
PKR fraction digits: 2 | in supportedValuesOf: true
JPY fraction digits: 0 | in supportedValuesOf: true
KWD fraction digits: 3 | in supportedValuesOf: true
XYZ fraction digits: 2 | in supportedValuesOf: false
eur fraction digits: 2 | in supportedValuesOf: false
"en-US" -> ["en-US"]
"de-DE" -> ["de-DE"]
"en-XX" -> ["en-XX"]
"xx-YY" -> []
"not a locale!!" -> throws RangeError
"EN-us" -> ["en-US"]
"" -> throws RangeError
PKR en-US: PKR 1,798.65
de-DE EUR: "1.798,65 €"
```

</details>

I've drafted the test list for Step 4 (A1–A4) below, but there's no code yet. The config schema and a few rules aren't defined in the docs, so I need your decisions on Q1–Q11 at the end.

First, what the `Intl` check found (Node 22, the same Intl data the browsers use):
- `"XYZ"` formats without any error, as you said. It isn't in `Intl.supportedValuesOf('currency')`, and neither is lowercase `"eur"`.
- `supportedLocalesOf` returns `[]` for `"xx-YY"`, but it accepts `"en-XX"` (because `en` is supported) and normalises `"EN-us"` to `"en-US"`. It throws a RangeError for `"not a locale!!"` and for `""`, so those calls must be wrapped.
- **JPY formats with 0 decimals and KWD with 3.** The engine works in cents, and plan §8 says only 2-decimal currencies are supported, so accepting these would show wrong amounts. USD, EUR and PKR all use 2.
- `de-DE` with EUR gives `"1.798,65 €"` with a non-breaking space (U+00A0) before the €. A1.1's test compares against Intl's output, so this passes.

## Proposed `public/config.json` schema
```json
{
  "currency": "USD",
  "locale": "en-US",
  "officeName": "Riverside Mortgages",
  "disclaimer": "Estimates only. Not a loan offer or financial advice.",
  "defaults": { "homePrice": 350000, "downPayment": 50000, "interestRate": 6, "termYears": 30, "extraPayment": 0 },
  "limits": {
    "homePrice":    { "min": 1, "max": 100000000 },
    "interestRate": { "min": 0, "max": 30 },
    "termYears":    { "min": 1, "max": 40 },
    "extraPayment": { "min": 0, "max": 10000000 }
  },
  "presets": [
    { "id": "f30", "name": "30-year fixed", "ratePercent": 6.5,  "termYears": 30, "description": "Our standard 30-year loan" },
    { "id": "f15", "name": "15-year fixed", "ratePercent": 5.75, "termYears": 15, "description": "Lower total interest" }
  ]
}
```
The two presets are the ones from M1.1. The return shape I have in mind is `validateConfig(json): { config, problems }`, with each problem shaped `{ field, value, message }`.

## Test cases: `validateConfig` (pure)

**G. Whole file** (A4.1–A4.3, A4.8)

| # | Input | Expected |
|---|---|---|
| G1 | `{}` | Built-in defaults, no problems (A1.4) |
| G2 | The full example above | Applied as written, no problems |
| G3 | `[]`, `"x"`, `42`, `null` | Defaults + E11 "Configuration could not be loaded (not a JSON object). Using default settings." (A4.3) |
| G4 | The invalid inputs from G3, C, R, D, PR and S below | `validateConfig` never throws and always returns a complete config (A4.8) |

**C. Currency and locale** (A1.1, A4.4)

| # | Input | Expected |
|---|---|---|
| C1 | `currency "EUR"`, `locale "de-DE"` | Both applied; an amount of 1,798.65 formats as `Intl.NumberFormat("de-DE", {style:"currency", currency:"EUR"})` (A1.1) |
| C2 | `currency "XYZ"` | Falls back to USD; E12 names `currency`; console.warn logs `currency` and `"XYZ"` (A4.4, A4.7) |
| C3 | `currency "JPY"` or `"KWD"` | Falls back to USD; E12 names `currency` (Q7) |
| C4 | `currency 840` (a number), `currency ""` | Falls back; E12 names `currency` |
| C5 | `locale "xx-YY"`, `"not a locale!!"`, `""`, `5` | Falls back to en-US; E12 names `locale`; no throw |
| C6 | `locale "EN-us"` | Applied as `"en-US"` (normalised) |

**R. Limits** (A1.3, A4.4)

| # | Input | Expected |
|---|---|---|
| R1 | `limits.interestRate.max 15` | Applied (A1.3) |
| R2 | `limits.termYears {min 50, max 40}` | That limit falls back; E12 names `limits.termYears`; the other limits are applied (A4.4) |
| R3 | Negative limit, missing min/max, non-number, `NaN` written as a string, term min `1.5` | That limit falls back; E12 names it |
| R4 | A limit beyond the tested range, e.g. `homePrice.max 1e12` | Falls back; E12 names it (Q2) |
| R5 | A4.4 combined: `currency "XYZ"` + bad `limits.termYears` | E12 lists exactly "currency, limits.termYears"; all other values applied |

**D. Defaults** (A1.2, A4.5)

| # | Input | Expected |
|---|---|---|
| D1 | `defaults {homePrice 400000, interestRate 5, termYears 25}` | Applied (A1.2) |
| D2 | `defaults.interestRate 50` with limit 0–30 | Falls back to the built-in default; E12 names `defaults.interestRate` (A4.5) |
| D3 | A default checked against a limit that was itself changed: rate max 15 + default rate 20 | Falls back; E12 names `defaults.interestRate` |
| D4 | `defaults.downPayment` ≥ `defaults.homePrice` | Down payment default falls back; E12 names it (Q3) |
| D5 | Defaults that are strings, negative, or a term of `15.5` | Fall back; E12 names each one |

**PR. Presets** (A2.1–A2.5, M1.7)

| # | Input | Expected |
|---|---|---|
| PR1 | The A2.1 preset `f15` | Kept, with its description (A2.1) |
| PR2 | `"Jumbo"` with `ratePercent 35` | Skipped; E12 names `presets: Jumbo` (A2.2) |
| PR3 | A preset with no `name`, or with `termYears 15.5` | Skipped; E12 names it by position, e.g. `presets[2]` (A2.3, Q5) |
| PR4 | Two presets with id `f15` | The first is kept; E12 names `presets: duplicate id f15` (A2.4) |
| PR5 | `presets` is not a list | No presets; E12 names `presets` (A2.5) |
| PR6 | `presets` missing, or `[]` | No presets and no warning (M1.7) |
| PR7 | A preset checked against changed limits: rate max 15 + a 16% preset | Skipped and named |
| PR8 | `id` missing or not a string; `description` not a string | Skipped and named (Q5) |

**S. Office name and disclaimer** (A3)

| # | Input | Expected |
|---|---|---|
| S1 | `officeName` + `disclaimer` strings | Kept exactly as plain strings (A3.1) |
| S2 | `disclaimer "<img src=x onerror=alert(1)>"` | Kept as that literal string. The UI step proves it is rendered as text (A3.2) |
| S3 | `disclaimer` missing, `""` or `"   "` | The default "Estimates only. Not a loan offer or financial advice."; no warning (A3.3) |
| S4 | `disclaimer 42` | The default; E12 names `disclaimer` (A3.4) |
| S5 | `officeName` missing | `null`, no warning (A3.5). `officeName 42` → `null`, E12 names `officeName` |

**W. Messages and logging** (A4.7)

| # | Expected |
|---|---|
| W1 | Every problem calls `console.warn` once with the field name and the bad value |
| W2 | All E12 items go into one E12 text: "Some settings were invalid and defaults are used instead: currency, limits.termYears." |
| W3 | E11 and E12 never appear together. An unusable file gives E11 only |

## Test cases: `loadConfig` fetch wrapper
This takes a fetch function as a parameter, so the tests can fake it.

| # | Fake response | Expected |
|---|---|---|
| L1 | 404 | Defaults + "Configuration could not be loaded (file not found). Using default settings." (A4.1) |
| L2 | `fetch` rejects | E11 with reason "network error" |
| L3 | 200 with body `{bad json` | E11 with reason "invalid JSON" (A4.2) |
| L4 | 200 with a valid body | The same result as `validateConfig` |
| L5 | 500, or reading the body throws | E11 with reason "network error" (Q9) |
| L6 | — | Requests `./config.json` (relative, so a sub-path works) with `cache: 'no-store'`, so an edited config shows on reload |

The UI step will cover the rest: the banner, Dismiss and reappearing after reload (A4.6), footer rendering (A3.1, A3.2, A3.5), the selector (M1), and prefilled fields (A1.2). A1.5 (the README) comes with the README.

## Rules the docs don't define: please choose
| # | Question | Proposed rule |
|---|---|---|
| Q1 | Built-in default values | Home price 350,000, down payment 50,000, rate 6, term 30, extra empty (the L1.1 case). This also keeps L8.13 valid: a 1,000 loan at 6% over 30 years pays 6.00, which is above the 5.00 interest |
| Q2 | How far config limits may go | **They can only narrow the built-in ranges**: price ≤ 100,000,000, rate ≤ 30, term ≤ 40, extra ≤ 10,000,000, and mins ≥ the built-in mins. The engine is only tested up to those maximums |
| Q3 | Down payment default ≥ price default | The down payment default falls back. If that still isn't below the price, it becomes 0 |
| Q4 | Unknown keys, e.g. a typo like `"currncy"` | Ignored, with console.warn only and no banner, since they aren't invalid values |
| Q5 | How bad presets are named | By `name` when it is a valid string, otherwise by its 0-based JSON position (`presets[2]` is the third item). A non-string `description` also skips the preset |
| Q6 | Lowercase currency `"eur"` | Accept it and convert to `"EUR"` |
| Q7 | Currencies with 0 or 3 decimals (JPY, KWD) | **Reject** them with E12 `currency` and fall back to USD, because the cent-based engine would show wrong amounts (plan §8) |
| Q8 | `"en-XX"` (unknown region, known language) | Accept it. Intl formats it as `en` |
| Q9 | HTTP status other than 404 (e.g. 500) | Reason "network error" |
| Q10 | Office name and disclaimer whitespace | Trim both. Whitespace-only counts as missing |
| Q11 | Should `defaults` include the extra payment? | Yes, `defaults.extraPayment` (built-in 0, shown as an empty field) |

Q2 and Q7 matter most, because they decide whether a config can push the app outside what the engine has been tested on. Reply "proposals as listed" or give your choice per question. I'll then write the tests first, watch them fail, and write the code.

---

### User · 19:29

> Proposals as listed for Q1–Q3 and Q5–Q11, with two changes:
>
> 1. Key names: the docs use "ratePercent" (A1.3 says limits.ratePercent.max, presets use
>    ratePercent). Your schema says interestRate. Use ratePercent in limits and defaults too,
>    so an admin following the docs isn't silently ignored.
> 2. Q4: unknown top-level or nested keys (e.g. a typo "currncy") are listed in the E12 banner
>    and logged, because J-12 says the admin wants to find out immediately about a mistake.
>    Missing keys still give no warning (A1.4).
>
> Add the config schema, Q2, Q4 and Q7 as rules in user-stories.md (A1/A4) and show me the lines.
> Then write the tests first, watch them fail, write the code, and run all tests.
>
> Also
>
> - Git: since you've set up git, make your own checkpoint commit after each step that passes. Now is a good moment (engine + validation pass).
> - Export: if you haven't yet, run /export transcripts/session-03-part3.md.

### Claude · 19:29

Starting with the docs, then the rename, tests and code. I'll come back to git and the export at the end, because both raise a problem I need to explain.

<details><summary>Shell: Locate A1 and A4 sections in user stories</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -nE '^### A[14]\.|^As an Admin, I want (to set the currency|clear feedback)|^\*\*Acceptance criteria\*\*' docs/user-stories.md | sed -n '1,200p' | grep -A2 -E 'A1\.|A4\.'
```

Output:

```
327:### A1. Configure locale, currency and defaults
330:As an Admin, I want to set the currency, locale, default values and limits in a config file, so that the calculator fits our market without code changes.
332:**Acceptance criteria**
--
365:### A4. Fail safely on a bad configuration
368:As an Admin, I want clear feedback when my config is wrong, so that I can fix it while users still get a working calculator.
370:**Acceptance criteria**
```

</details>

<details><summary>Shell: Add config schema and rules to A1 and A4</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('docs/user-stories.md'); t=p.read_text()
a1='As an Admin, I want to set the currency, locale, default values and limits in a config file, so that the calculator fits our market without code changes.\n'
a1_rules='''
**Config schema** (`public/config.json`, every key optional):

| Key | Type | Built-in default |
|---|---|---|
| `currency` | ISO 4217 code with 2 decimals, e.g. `"USD"`, `"EUR"`, `"PKR"`. Lowercase is accepted and converted to uppercase. | `"USD"` |
| `locale` | BCP 47 tag, e.g. `"en-US"`, `"de-DE"` | `"en-US"` |
| `officeName` | text, trimmed | none |
| `disclaimer` | text, trimmed | "Estimates only. Not a loan offer or financial advice." |
| `defaults.homePrice`, `defaults.downPayment`, `defaults.ratePercent`, `defaults.termYears`, `defaults.extraPayment` | numbers | 350000, 50000, 6, 30, 0 |
| `limits.homePrice`, `limits.ratePercent`, `limits.termYears`, `limits.extraPayment` | `{ "min": number, "max": number }` | the Valid ranges in Shared definitions |
| `presets` | list of `{ "id", "name", "ratePercent", "termYears", "description"? }` (A2) | none |

**Config rules**
- Limits can only narrow the built-in Valid ranges, never widen them: each `min` must be at least the built-in minimum and each `max` at most the built-in maximum (home price 100,000,000, rate 30, term 40, extra payment 10,000,000), because the engine is only tested within those ranges. A limit outside them falls back to the built-in limit and is listed in E12.
- `currency` must be a code that `Intl.supportedValuesOf("currency")` lists and that has exactly 2 decimals. Currencies with 0 or 3 decimals (such as JPY or KWD) are rejected with E12 and fall back to USD, because amounts are calculated in cents.
'''
assert t.count(a1)==1; t=t.replace(a1,a1+a1_rules)
a4='As an Admin, I want clear feedback when my config is wrong, so that I can fix it while users still get a working calculator.\n'
a4_rules='''
**Config rule:** keys the schema (A1) does not know, at the top level or nested (for example a typo such as `"currncy"` or `"limits": { "rate": … }`), are listed in E12 and logged to the console, so the Admin notices the mistake (J-12). Missing keys give no warning (A1.4).
'''
assert t.count(a4)==1; t=t.replace(a4,a4+a4_rules)
p.write_text(t)
EOF
grep -n 'interestRate' docs/*.md | head
```

Output:

```
(Bash completed with no output)
```

</details>

<details><summary>Shell: Rename limit key interestRate to ratePercent</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && sed -i '' 's/limits\.interestRate/limits.ratePercent/g; s/interestRate: { min: 0, max: \(15\|7\.5\|30\) }/ratePercent: { min: 0, max: \1 }/g' src/engine/validate.ts tests/unit/validate.test.ts && sed -i '' 's/  interestRate: Range;/  ratePercent: Range;/; s/  interestRate: { min: 0, max: 30 },/  ratePercent: { min: 0, max: 30 },/' src/config/defaults.ts && grep -n 'interestRate\|ratePercent' src/config/defaults.ts src/engine/validate.ts tests/unit/validate.test.ts | grep -iv "raw.interestRate\|interestRate: '\|errors.interestRate\|interestRate: 'E4'\|{ interestRate }\|interestRate:\s*field"
```

Output:

```
src/config/defaults.ts:14:  ratePercent: Range;
src/config/defaults.ts:21:  ratePercent: { min: 0, max: 30 },
tests/unit/validate.test.ts:39:      interestRate: { min: 0, max: 30 },
tests/unit/validate.test.ts:141:  it.each(['0', '0.001', '30', '30.000'])('B1: rate %s is accepted', (interestRate) => {
tests/unit/validate.test.ts:145:  it.each(['30.01', '-0.01', '30.001'])('B1: rate %s → E4', (interestRate) => {
tests/unit/validate.test.ts:194:    const limits: Limits = { ...DEFAULT_LIMITS, interestRate: { min: 0, max: 15 } };
tests/unit/validate.test.ts:206:    const limits: Limits = { ...DEFAULT_LIMITS, interestRate: { min: 0, max: 7.5 } };
src/engine/validate.ts:12:export type Field = 'homePrice' | 'downPayment' | 'interestRate' | 'termYears' | 'extraPayment';
src/engine/validate.ts:102:    limits.ratePercent,
src/engine/validate.ts:104:    rangeError('E4', MESSAGES.E4, limits.ratePercent),
[This command modified 3 files you've previously read: src/config/defaults.ts, src/engine/validate.ts, tests/unit/validate.test.ts. Call Read before editing.]
```

</details>

macOS `sed` doesn't support `\|` alternation, so three test lines didn't change. Fixing them directly:

<details><summary>Shell: Fix remaining renames and rerun tests</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('tests/unit/validate.test.ts'); t=p.read_text()
for m in ['30','15','7.5']:
    t=t.replace(f'interestRate: {{ min: 0, max: {m} }}', f'ratePercent: {{ min: 0, max: {m} }}')
p.write_text(t)
EOF
grep -n 'max: \(15\|30\|7\.5\) }' tests/unit/validate.test.ts; npm test 2>&1 | grep -E 'Test Files|Tests '; npx tsc --noEmit && echo tsc OK
```

Output:

```
39:      ratePercent: { min: 0, max: 30 },
194:    const limits: Limits = { ...DEFAULT_LIMITS, ratePercent: { min: 0, max: 15 } };
206:    const limits: Limits = { ...DEFAULT_LIMITS, ratePercent: { min: 0, max: 7.5 } };
 Test Files  4 passed (4)
      Tests  136 passed (136)
tsc OK
```

</details>

The rename is done and all 136 tests still pass. Now the config tests, written before the code:

<details><summary>Write /Users/dev/Desktop/Test Project Usama/tests/unit/config.test.ts</summary>

```
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { validateConfig } from '../../src/config/schema';
import { loadConfig, type FetchLike } from '../../src/config/loadConfig';
import { DEFAULT_CONFIG } from '../../src/config/defaults';

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
… (367 more lines not shown)
```

</details>

<details><summary>Shell: Run tests before implementation to see failures</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm test 2>&1 | grep -E 'FAIL|Error:|Test Files|Tests ' | head -6
```

Output:

```
⎯⎯⎯⎯⎯⎯ Failed Tests 90 ⎯⎯⎯⎯⎯⎯⎯
 FAIL  tests/unit/config.test.ts > Built-in defaults (A1 schema) > match the docs
AssertionError: expected undefined to deeply equal { currency: 'USD', …(6) }
 FAIL  tests/unit/config.test.ts > G. Whole file (A4.1–A4.3, A4.8) > G1 (A1.4): {} gives the built-in defaults and no problems
TypeError: validateConfig is not a function
 FAIL  tests/unit/config.test.ts > G. Whole file (A4.1–A4.3, A4.8) > G2: the full example is applied as written
```

</details>

All 90 new tests fail as expected (`validateConfig is not a function`). Now the code: types and defaults, `validateConfig`, the fetch wrapper, and the E11/E12 texts.

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/config/defaults.ts</summary>

```
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
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/config/schema.ts</summary>

```
/**
 * validateConfig: turns any parsed JSON into a complete, valid AppConfig plus a list of problems.
 * Pure (no fetch, no DOM, no logging) and never throws.
 * Rules: docs/user-stories.md A1 (schema, config rules), A2 (presets), A3 (texts), A4 (fallbacks).
 */
import { MESSAGES } from '../messages';
import {
  DEFAULT_CONFIG,
  DEFAULT_DEFAULTS,
  DEFAULT_LIMITS,
  type AppConfig,
  type Defaults,
  type Limits,
  type Preset,
  type Range,
} from './defaults';

export interface ConfigProblem {
  /** Name shown in the E12 list, e.g. "currency", "limits.termYears", "presets: Jumbo". */
  field: string;
  value: unknown;
}

export interface ConfigNotice {
  id: 'E11' | 'E12';
  text: string;
}

export interface ConfigResult {
  config: AppConfig;
  problems: ConfigProblem[];
  /** E11 when the file could not be used at all, E12 when some settings fell back, else null. */
  notice: ConfigNotice | null;
}

type Json = Record<string, unknown>;

export function isPlainObject(value: unknown): value is Json {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

const TOP_LEVEL_KEYS = ['currency', 'locale', 'officeName', 'disclaimer', 'limits', 'defaults', 'presets'];
const LIMIT_KEYS = ['homePrice', 'ratePercent', 'termYears', 'extraPayment'] as const;
const DEFAULT_KEYS = ['homePrice', 'downPayment', 'ratePercent', 'termYears', 'extraPayment'] as const;
const RANGE_KEYS = ['min', 'max'];
const PRESET_KEYS = ['id', 'name', 'ratePercent', 'termYears', 'description'];

/** Decimals allowed per kind of value: money 2, rate 3, years 0 (matches the Input rules). */
const DECIMALS: Record<keyof Limits, number> = { homePrice: 2, ratePercent: 3, termYears: 0, extraPayment: 2 };

function hasAtMostDecimals(value: number, decimals: number): boolean {
  const scaled = value * 10 ** decimals;
  return Math.abs(scaled - Math.round(scaled)) < 1e-6;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

const within = (value: number, range: Range): boolean => value >= range.min && value <= range.max;
const clamp = (value: number, range: Range): number => Math.min(range.max, Math.max(range.min, value));

/** Reports keys of `object` that are not in `known`, as `${path}.${key}` (Q4). */
function reportUnknownKeys(object: Json, known: readonly string[], path: string, problems: ConfigProblem[]): void {
  for (const key of Object.keys(object)) {
    if (!known.includes(key)) problems.push({ field: path ? `${path}.${key}` : key, value: object[key] });
  }
}

function checkCurrency(value: unknown): string | null {
  if (typeof value !== 'string' || value.trim() === '') return null;
  const code = value.trim().toUpperCase();
  try {
    const supported =
      typeof Intl.supportedValuesOf === 'function'
        ? Intl.supportedValuesOf('currency').includes(code)
        : /^[A-Z]{3}$/.test(code);
    if (!supported) return null;
    // Only 2-decimal currencies: amounts are calculated in cents (A1 config rules, plan §8).
    const digits = new Intl.NumberFormat('en-US', { style: 'currency', currency: code }).resolvedOptions()
… (208 more lines not shown)
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/config/loadConfig.ts</summary>

```
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
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/src/messages.ts</summary>

Replace:

```
  E10: 'Could not calculate this loan. Please check your inputs.',
```

with:

```
  E10: 'Could not calculate this loan. Please check your inputs.',
  /** reason: "file not found", "invalid JSON", "not a JSON object" or "network error". */
  E11: (reason: string) => `Configuration could not be loaded (${reason}). Using default settings.`,
  /** list: problem names joined with ", ". */
  E12: (list: string) => `Some settings were invalid and defaults are used instead: ${list}.`,
```

</details>

<details><summary>Shell: Run all tests and type-check</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && sed -i '' 's/^ \* The remaining entries (E8, E9, E11–E20)/ * The remaining entries (E8, E9, E13–E20)/' src/messages.ts && npm test 2>&1 | grep -E '×|Test Files|Tests |AssertionError|TypeError|Expected|Received|^\s+[-+]  ' | head -40; npx tsc --noEmit && echo tsc OK
```

Output:

```
 Test Files  5 passed (5)
      Tests  226 passed (226)
tsc OK
[This command modified 1 file you've previously read: src/messages.ts. Call Read before editing.]
```

</details>

All 226 tests pass, and the type check is clean. Next, the example `public/config.json`, plus a test that the shipped file itself validates without problems, so a typo in it can't ship unnoticed:

<details><summary>Shell: Write example config, add test, run checks</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && cat > public/config.json <<'EOF'
{
  "currency": "USD",
  "locale": "en-US",
  "officeName": "Riverside Mortgages",
  "disclaimer": "Estimates only. Not a loan offer or financial advice.",
  "defaults": {
    "homePrice": 350000,
    "downPayment": 50000,
    "ratePercent": 6,
    "termYears": 30,
    "extraPayment": 0
  },
  "limits": {
    "homePrice": { "min": 1, "max": 100000000 },
    "ratePercent": { "min": 0, "max": 30 },
    "termYears": { "min": 1, "max": 40 },
    "extraPayment": { "min": 0, "max": 10000000 }
  },
  "presets": [
    {
      "id": "f30",
      "name": "30-year fixed",
      "ratePercent": 6.5,
      "termYears": 30,
      "description": "Our standard 30-year fixed-rate loan."
    },
    {
      "id": "f15",
      "name": "15-year fixed",
      "ratePercent": 5.75,
      "termYears": 15,
      "description": "Higher monthly payment, much lower total interest."
    }
  ]
}
EOF
cat >> tests/unit/config.test.ts <<'EOF'

describe('public/config.json (the shipped example)', () => {
  it('is valid: no problems, two presets, office name and disclaimer set', async () => {
    const { readFile } = await import('node:fs/promises');
    const json: unknown = JSON.parse(await readFile(new URL('../../public/config.json', import.meta.url), 'utf8'));
    const { config, problems } = validateConfig(json);
    expect(problems).toEqual([]);
    expect(config.presets.map((p) => p.name)).toEqual(['30-year fixed', '15-year fixed']);
    expect(config.officeName).toBe('Riverside Mortgages');
    expect(config.disclaimer).toBe(DEFAULT_DISCLAIMER);
  });
});
EOF
npm i -D --save-exact @types/node 2>&1 | tail -1; npx vitest run 2>&1 | sed -n '/Test Files/,/Duration/p'; npx tsc --noEmit && echo tsc OK; npm run build 2>&1 | tail -2
```

Output:

```
found 0 vulnerabilities
 Test Files  5 passed (5)
      Tests  227 passed (227)
   Start at  19:33:12
   Duration  849ms (transform 58%, tests 32%, import 9%, worker 1%)
tsc OK

✓ built in 47ms
```

</details>

That added `@types/node` as a dev dependency, just to type `node:fs` in one test. You asked for minimal dependencies, so I'll import the JSON file directly instead and remove the package:

<details><summary>Shell: Replace fs read with JSON import, rerun</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm uninstall @types/node 2>&1 | tail -1 && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('tests/unit/config.test.ts'); t=p.read_text()
old="""  it('is valid: no problems, two presets, office name and disclaimer set', async () => {
    const { readFile } = await import('node:fs/promises');
    const json: unknown = JSON.parse(await readFile(new URL('../../public/config.json', import.meta.url), 'utf8'));
    const { config, problems } = validateConfig(json);"""
new="""  it('is valid: no problems, two presets, office name and disclaimer set', () => {
    const { config, problems } = validateConfig(shippedConfig);"""
assert t.count(old)==1; t=t.replace(old,new)
t=t.replace("import { DEFAULT_CONFIG } from '../../src/config/defaults';","import { DEFAULT_CONFIG } from '../../src/config/defaults';\nimport shippedConfig from '../../public/config.json';",1)
p.write_text(t)
p=pathlib.Path('tsconfig.json'); t=p.read_text()
t=t.replace('"isolatedModules": true,','"isolatedModules": true,\n    "resolveJsonModule": true,',1); p.write_text(t)
EOF
grep -c '@types/node' package.json; npx vitest run 2>&1 | sed -n '/Test Files/,/Tests /p'; npx tsc --noEmit && echo tsc OK; npm run build 2>&1 | tail -1
```

Output:

```
found 0 vulnerabilities
0
 Test Files  5 passed (5)
      Tests  227 passed (227)
tsc OK
✓ built in 49ms
```

</details>

Back to git. Before any commit I'm checking whether the exported transcripts contain the token you pasted earlier:

<details><summary>Shell: Check which files contain the GitHub token</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -l 'ghp_' -r transcripts docs src tests public 2>/dev/null; echo "---"; ls transcripts
```

Output:

```
transcripts/session-03-part3.md
---
session-02.md
session-03-part1.md
session-03-part2.md
session-03-part3.md
```

</details>

The token is in `transcripts/session-03-part3.md`. I'll make the checkpoint commit without `transcripts/`, so the token can never reach the repository through my commits. Nothing else contains it.

<details><summary>Shell: Commit checkpoint excluding transcripts</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git add .gitignore .nvmrc docs index.html package.json package-lock.json public src tests tsconfig.json vite.config.ts && ! git diff --cached | grep -q 'ghp_' && echo "staged content: no token" && git commit -q -F - <<'EOF'
Add engine, input validation and config loading

- Docs: product plan, roles, jobs, user stories (with input and config rules)
- Vite + TypeScript (strict) + Vitest, Node 22.12+
- Engine: integer-cent amortization, extra payments, E7/E10 guards
- Parsing and validation for L8/L5 with exact E1-E6 texts
- Config: validateConfig + loadConfig (A1-A4), example public/config.json
- 227 unit tests

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --format='%h %an <%ae> %s' && git status --short
```

Output:

```
staged content: no token
c72ffd9 usamakh1 <iusamakhawaja@gmail.com> Add engine, input validation and config loading
?? transcripts/
```

</details>

Config loading (A1–A4) is done, and all 227 tests pass. I made a checkpoint commit `c72ffd9`. I left `transcripts/` out of it because one file contains your GitHub token.

## Doc changes (user-stories.md)

Under **A1**, a schema table and two rules:
```
**Config schema** (`public/config.json`, every key optional):
| `currency` | ISO 4217 code with 2 decimals, e.g. "USD", "EUR", "PKR". Lowercase is accepted and converted to uppercase. | "USD" |
| `locale` | BCP 47 tag, e.g. "en-US", "de-DE" | "en-US" |
| `officeName` | text, trimmed | none |
| `disclaimer` | text, trimmed | "Estimates only. Not a loan offer or financial advice." |
| `defaults.homePrice`, `defaults.downPayment`, `defaults.ratePercent`, `defaults.termYears`, `defaults.extraPayment` | numbers | 350000, 50000, 6, 30, 0 |
| `limits.homePrice`, `limits.ratePercent`, `limits.termYears`, `limits.extraPayment` | { "min": number, "max": number } | the Valid ranges in Shared definitions |
| `presets` | list of { "id", "name", "ratePercent", "termYears", "description"? } (A2) | none |

**Config rules**
- Limits can only narrow the built-in Valid ranges, never widen them: each `min` must be at least the built-in minimum and each `max` at most the built-in maximum (home price 100,000,000, rate 30, term 40, extra payment 10,000,000), because the engine is only tested within those ranges. A limit outside them falls back to the built-in limit and is listed in E12.
- `currency` must be a code that `Intl.supportedValuesOf("currency")` lists and that has exactly 2 decimals. Currencies with 0 or 3 decimals (such as JPY or KWD) are rejected with E12 and fall back to USD, because amounts are calculated in cents.
```
Under **A4**:
```
**Config rule:** keys the schema (A1) does not know, at the top level or nested (for example a typo such as "currncy" or "limits": { "rate": … }), are listed in E12 and logged to the console, so the Admin notices the mistake (J-12). Missing keys give no warning (A1.4).
```
The rate keys now use `ratePercent` everywhere: in config, limits, defaults and presets, matching A1.3. The form field keeps its UI name `interestRate`.

## How the steps went
1. **Renaming** the limit key to `ratePercent`: the existing 136 tests still passed afterwards.
2. **Before the code:** 90 new tests failed with `validateConfig is not a function`.
3. **After writing the code,** they all passed on the first run.
4. **The shipped `public/config.json`** has a test of its own, which checks that it validates with zero problems.
5. **I briefly added `@types/node`** so that test could read the file from disk. I removed it again and import the JSON instead (`resolveJsonModule` in tsconfig). The dependencies are back to Vite, TypeScript and Vitest.

## Final output
```
 amortize.test.ts   49    parse.test.ts   38    validate.test.ts   48
 config.test.ts     91    (defaults, G whole file, C currency/locale, R limits, D defaults,
                           PR presets, S texts, U unknown keys, G4 never-throws, L fetch wrapper, shipped file)
 setup.test.ts       1

 Test Files  5 passed (5)
      Tests  227 passed (227)
tsc OK · vite build ✓
```

## Choices I made that you should check
- **A built-in default that falls outside limits the Admin has narrowed** moves to the nearest limit, without a warning. Example: price max 200,000 makes the price default 200,000. The Admin didn't make a mistake, so there's nothing to warn about.
- **A preset with an unknown key** (such as `"rate"`) is kept. The unknown key is listed in E12 and ignored.
- **`currency: null` is reported, but `disclaimer: null` and `officeName: null` are not.** A3.3 treats a missing disclaimer as normal. For currency, I treat `null` as a mistake.

## Git and export
- **Your messages conflict on git.** One said "strictly prohibited to update anything related to git", and this one asks for checkpoint commits. I followed the newer one. Commits are local only: I won't push, and I won't add a remote. If you want no commits after all, say so and I'll stop.
- **Remove the token from `transcripts/session-03-part3.md` before you commit or submit it.** That's the only file that contains it. Please also revoke the token on GitHub if you haven't yet. Under your rules I don't touch `transcripts/`, so you'll have to do this yourself.
- **I can't run `/export`.** It's a Claude Code command only you can type. `transcripts/session-03-part3.md` already exists from your earlier export. For this part, run `/export transcripts/session-03-part4.md`, or re-export part 3 to overwrite it.

Next is Step 5: the UI (form, results, schedule, CSV, preset selector, banner, footer, accessibility). That's where L1, L2, L3, L5, L8, M1 and the A1–A4 UI parts become testable end to end.

---

### User · 19:39

> Do a relvent commit but not pushed, i will do that later, and aslo i have remove the token

### Claude · 19:39

<details><summary>Shell: Check uncommitted files and scan for the token</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git status --short && echo "--- token check:" && (grep -rl 'ghp_' . --exclude-dir=node_modules --exclude-dir=.git || echo "no token found anywhere")
```

Output:

```
?? transcripts/
--- token check:
transcripts/session-03-part3.md
```

</details>

<details><summary>Shell: Show where the token remains, redacted</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -n -o '.\{30\}ghp_.\{0,12\}' transcripts/session-03-part3.md | sed -E 's/ghp_[A-Za-z0-9]{4}[A-Za-z0-9]*/ghp_XXXX…(redacted)/g'
```

Output:

```
(Bash completed with no output)
```

</details>

<details><summary>Shell: List lines with token prefix, redacted</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -n 'ghp_' transcripts/session-03-part3.md | sed -E 's/ghp_[A-Za-z0-9]+/ghp_<REDACTED>/g' | cut -c1-200
```

Output:

```
3045:    Search for ghp_ and delete any token you find.
```

</details>

That one match is only my earlier advice ("Search for ghp_…"). Checking that the token itself is gone:

<details><summary>Shell: Scan for any full GitHub token pattern</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && (grep -rlE 'ghp_[A-Za-z0-9]{20,}' . --exclude-dir=node_modules --exclude-dir=.git || echo "no token-shaped string in any file")
```

Output:

```
no token-shaped string in any file
```

</details>

<details><summary>Shell: Commit transcripts without pushing</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git add transcripts && git commit -q -F - <<'EOF'
Add AI session transcripts (sessions 2 and 3, parts 1-3)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --format='%h %an <%ae> %s' && git status --short && git remote -v | wc -l | xargs echo "remotes:"
```

Output:

```
cce2b32 usamakh1 <iusamakhawaja@gmail.com> Add AI session transcripts (sessions 2 and 3, parts 1-3)
c72ffd9 usamakh1 <iusamakhawaja@gmail.com> Add engine, input validation and config loading
remotes: 0
```

</details>

I committed the transcripts. Nothing has been pushed, and the repo still has no remote.

Before committing, I scanned every file in the project for anything shaped like a GitHub token and found none. The only remaining `ghp_` text is my own earlier advice ("Search for ghp_ and delete…"). Please still revoke the token on GitHub if you haven't, because it appeared in this conversation.

```
cce2b32  Add AI session transcripts (sessions 2 and 3, parts 1-3)
c72ffd9  Add engine, input validation and config loading
```
Both commits are authored as `usamakh1 <iusamakhawaja@gmail.com>`, and the working tree is clean.

When you push, the repo's commands need two changes: `git add README.md` will fail because there's no README yet, so skip that line, and check the trailing hyphen in `mortgage-calculator-.git`. Since the commits already exist, you only need to add the remote and push:
```
git branch -M main
git remote add origin https://github.com/usamakh1/mortgage-calculator-.git
git push -u origin main
```

Next is Step 5, the UI.

---

### User · 19:40

> Your three choices are approved. Good catch on the token.
>
> Step 5a: the main UI (src/ui, src/main.ts, index.html, CSS), wired to the engine, validation
> and config. Covers the UI parts of L1, L2, L8, A1.2, A3 and A4.6:
> - Form: home price, down payment, rate, term (extra payment and presets come in 5c),
>   prefilled from config defaults. Results update on every input, with no button.
> - Results: loan amount, monthly payment, total interest, total paid, payoff date,
>   formatted with the config currency and locale.
> - Errors per input rule 11, the ARIA from L8.18, E8 replacing all results (L8.15), E9/E10 (L8.19/20).
> - Footer with officeName and disclaimer via textContent only. Config banner with Dismiss.
> - Simple, clean, readable design; usable at 360px; visible keyboard focus.
> For DOM tests, one dev dependency (e.g. happy-dom) is OK if needed.
> Build it, run all tests, then give me a short checklist of what to try by hand in the browser.

### Claude · 19:41

Building the UI. First I'm adding `happy-dom` (one dev dependency, for DOM tests):

<details><summary>Shell: Install happy-dom for DOM unit tests</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm i -D --save-exact happy-dom 2>&1 | tail -1 && grep -A5 devDependencies package.json && node -p "require('./node_modules/happy-dom/package.json').engines?.node"
```

Output:

```
found 0 vulnerabilities
  "devDependencies": {
    "happy-dom": "21.0.4",
    "typescript": "7.0.2",
    "vite": "8.3.6",
    "vitest": "5.1.0"
  }
>=20.0.0
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/src/messages.ts</summary>

Replace:

```
  E10: 'Could not calculate this loan. Please check your inputs.',
```

with:

```
  E8: 'Fix the highlighted fields to see your results.',
  E9: 'Something went wrong. Your inputs are kept; please try again.',
  E10: 'Could not calculate this loan. Please check your inputs.',
```

</details>

<details><summary>Shell: Add UI text constants to messages module</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/messages.ts'); t=p.read_text()
t=t.replace(" * The remaining entries (E8, E9, E13–E20) are added with the steps that use them.", " * The remaining entries (E13–E20) are added with the steps that use them.")
t+='''
/** Labels and other interface text (not errors). */
export const UI_TEXT = {
  intro: 'See what a home loan costs each month and in total.',
  formHeading: 'Loan details',
  homePrice: 'Home price',
  downPayment: 'Down payment',
  interestRate: 'Interest rate (% per year)',
  termYears: 'Loan term (years)',
  resultsHeading: 'Your loan',
  loanAmount: 'Loan amount',
  monthlyPayment: 'Monthly payment',
  monthlyPaymentNote: 'Principal and interest',
  totalInterest: 'Total interest',
  totalPaid: 'Total paid',
  payoffDate: 'Payoff date',
  dismiss: 'Dismiss',
  errorMarker: '!',
} as const;
'''
p.write_text(t)
EOF
echo ok
```

Output:

```
ok
```

</details>

Now the UI modules: formatting, form, results, banner and footer, and the controller that wires them together.

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/ui/format.ts</summary>

```
/** Display formatting with the configured currency and locale (A1.1). */
import type { YearMonth } from '../engine/amortize';

export interface Formatters {
  /** Integer cents → e.g. "$1,798.65" or "1.798,65 €". */
  money(cents: number): string;
  /** { year: 2056, month: 11 } → e.g. "November 2056". */
  month(value: YearMonth): string;
}

export function createFormatters(currency: string, locale: string): Formatters {
  let moneyFormat: Intl.NumberFormat;
  let monthFormat: Intl.DateTimeFormat;
  try {
    moneyFormat = new Intl.NumberFormat(locale, { style: 'currency', currency });
    monthFormat = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  } catch {
    // Config validation already rejects bad values; this keeps the UI alive regardless.
    moneyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
  }
  return {
    money: (cents) => moneyFormat.format(cents / 100),
    month: ({ year, month }) => monthFormat.format(new Date(year, month - 1, 1)),
  };
}

/** A config default (currency units) as plain input text, e.g. 350000 → "350000". */
export function toInputText(value: number): string {
  return String(value);
}
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/ui/form.ts</summary>

```
/**
 * The loan form. Builds the inputs and shows per-field messages with the ARIA from L8.18.
 * All text comes from messages.ts; values are read as raw strings and parsed by validate.ts.
 */
import type { Field, RawInputs } from '../engine/validate';
import { UI_TEXT } from '../messages';

export interface FieldSpec {
  field: Field;
  label: string;
  inputMode: 'decimal' | 'numeric';
}

/** Fields shown in 5a. Extra payment is added in 5c. */
export const FORM_FIELDS: readonly FieldSpec[] = [
  { field: 'homePrice', label: UI_TEXT.homePrice, inputMode: 'decimal' },
  { field: 'downPayment', label: UI_TEXT.downPayment, inputMode: 'decimal' },
  { field: 'interestRate', label: UI_TEXT.interestRate, inputMode: 'decimal' },
  { field: 'termYears', label: UI_TEXT.termYears, inputMode: 'numeric' },
];

export interface FormView {
  element: HTMLFormElement;
  inputs: Partial<Record<Field, HTMLInputElement>>;
  /** Current raw text of every field; fields not on the form read as "". */
  read(): RawInputs;
  /** Shows (text) or clears (null) the message under a field. */
  setError(field: Field, text: string | null): void;
}

export const inputId = (field: Field): string => `field-${field}`;
export const errorId = (field: Field): string => `field-${field}-error`;

export function createForm(specs: readonly FieldSpec[], initial: Partial<Record<Field, string>>): FormView {
  const form = document.createElement('form');
  form.className = 'loan-form';
  form.noValidate = true;
  form.addEventListener('submit', (event) => event.preventDefault()); // results update live; Enter does nothing

  const inputs: Partial<Record<Field, HTMLInputElement>> = {};
  const errors: Partial<Record<Field, HTMLElement>> = {};
  const wrappers: Partial<Record<Field, HTMLElement>> = {};

  for (const spec of specs) {
    const wrapper = document.createElement('div');
    wrapper.className = 'field';

    const label = document.createElement('label');
    label.htmlFor = inputId(spec.field);
    label.textContent = spec.label;

    const input = document.createElement('input');
    input.id = inputId(spec.field);
    input.name = spec.field;
    input.type = 'text'; // not type=number: it rejects "1,500,000" and behaves differently per browser
    input.inputMode = spec.inputMode;
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.value = initial[spec.field] ?? '';

    // Always present, so screen readers announce changes (aria-live).
    const error = document.createElement('p');
    error.id = errorId(spec.field);
    error.className = 'field-error';
    error.setAttribute('aria-live', 'polite');

    wrapper.append(label, input, error);
    form.append(wrapper);
    inputs[spec.field] = input;
    errors[spec.field] = error;
    wrappers[spec.field] = wrapper;
  }

  return {
    element: form,
    inputs,
    read: () => ({
      homePrice: inputs.homePrice?.value ?? '',
      downPayment: inputs.downPayment?.value ?? '',
      interestRate: inputs.interestRate?.value ?? '',
… (27 more lines not shown)
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/ui/results.ts</summary>

```
/**
 * The results area. Shows either the calculated figures or exactly one message (E7–E10),
 * never both, so nothing from earlier inputs stays on screen (L8.15).
 */
import type { LoanResult } from '../engine/amortize';
import { UI_TEXT } from '../messages';
import type { Formatters } from './format';

export interface ResultsView {
  element: HTMLElement;
  /** Renders the figures. Returns false (and renders nothing) if any value is unsafe (L8.20). */
  showResult(result: LoanResult, principalCents: number): boolean;
  showMessage(text: string): void;
}

const isSafeAmount = (value: number): boolean => Number.isSafeInteger(value) && value >= 0;

export function createResults(format: Formatters): ResultsView {
  const section = document.createElement('section');
  section.className = 'results';
  section.setAttribute('aria-labelledby', 'results-heading');

  const heading = document.createElement('h2');
  heading.id = 'results-heading';
  heading.textContent = UI_TEXT.resultsHeading;

  const body = document.createElement('div');
  body.className = 'results-body';
  section.append(heading, body);

  const item = (label: string, value: string, name: string, note?: string): HTMLElement => {
    const wrapper = document.createElement('div');
    wrapper.className = `result result-${name}`;
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.dataset.result = name;
    dd.textContent = value;
    wrapper.append(dt, dd);
    if (note) {
      const small = document.createElement('dd');
      small.className = 'result-note';
      small.textContent = note;
      wrapper.append(small);
    }
    return wrapper;
  };

  return {
    element: section,
    showResult(result, principalCents) {
      const amounts = [principalCents, result.monthlyPaymentCents, result.totalInterestCents, result.totalPaidCents];
      const dates = [result.payoff.year, result.payoff.month];
      if (!amounts.every(isSafeAmount) || !dates.every((n) => Number.isSafeInteger(n) && n > 0)) {
        return false;
      }
      const list = document.createElement('dl');
      list.className = 'result-list';
      list.append(
        item(UI_TEXT.monthlyPayment, format.money(result.monthlyPaymentCents), 'monthly-payment', UI_TEXT.monthlyPaymentNote),
        item(UI_TEXT.loanAmount, format.money(principalCents), 'loan-amount'),
        item(UI_TEXT.totalInterest, format.money(result.totalInterestCents), 'total-interest'),
        item(UI_TEXT.totalPaid, format.money(result.totalPaidCents), 'total-paid'),
        item(UI_TEXT.payoffDate, format.month(result.payoff), 'payoff-date'),
      );
      body.replaceChildren(list);
      return true;
    },
    showMessage(text) {
      const message = document.createElement('p');
      message.className = 'results-message';
      message.setAttribute('role', 'status');
      message.textContent = text;
      body.replaceChildren(message);
    },
  };
}
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/ui/layout.ts</summary>

```
/** Page chrome: config banner (A4) and footer (A3). All config text is set with textContent only (A3.2). */
import type { ConfigNotice } from '../config/schema';
import { UI_TEXT } from '../messages';

export function createBanner(notice: ConfigNotice | null): HTMLElement | null {
  if (!notice) return null;
  const banner = document.createElement('div');
  banner.className = 'config-banner';
  banner.setAttribute('role', 'status');
  banner.dataset.notice = notice.id;

  const text = document.createElement('p');
  text.textContent = notice.text;

  const dismiss = document.createElement('button');
  dismiss.type = 'button';
  dismiss.className = 'banner-dismiss';
  dismiss.textContent = UI_TEXT.dismiss;
  dismiss.addEventListener('click', () => banner.remove());

  banner.append(text, dismiss);
  return banner;
}

export function createFooter(officeName: string | null, disclaimer: string): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  if (officeName) {
    const office = document.createElement('p');
    office.className = 'office-name';
    office.textContent = officeName;
    footer.append(office);
  }
  const text = document.createElement('p');
  text.className = 'disclaimer';
  text.textContent = disclaimer;
  footer.append(text);
  return footer;
}
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/ui/app.ts</summary>

```
/**
 * Wires config, form, validation, engine and results together.
 * Message timing follows input rule 11 (docs/user-stories.md, Shared definitions):
 * a field's message appears when the field is left, and disappears as soon as the value is
 * valid while typing; the results area switches to E8 immediately on any invalid input.
 */
import { calculateLoan, type CalcOutcome, type LoanInput } from '../engine/amortize';
import { validateInputs, type Field } from '../engine/validate';
import type { ConfigResult } from '../config/schema';
import { APP_TITLE, MESSAGES, UI_TEXT } from '../messages';
import { createForm, FORM_FIELDS } from './form';
import { createFormatters, toInputText } from './format';
import { createBanner, createFooter } from './layout';
import { createResults } from './results';

export interface AppDependencies {
  calculate?: (input: LoanInput) => CalcOutcome;
  today?: () => Date;
}

export interface AppHandle {
  /** Shows E9 in the results area; used by the global error handlers. */
  showUnexpectedError(error: unknown): void;
}

export function createApp(root: HTMLElement, configResult: ConfigResult, deps: AppDependencies = {}): AppHandle {
  const { config, notice } = configResult;
  const calculate = deps.calculate ?? calculateLoan;
  const today = deps.today ?? (() => new Date());
  const format = createFormatters(config.currency, config.locale);

  const header = document.createElement('header');
  header.className = 'site-header';
  const title = document.createElement('h1');
  title.textContent = APP_TITLE;
  const intro = document.createElement('p');
  intro.className = 'intro';
  intro.textContent = UI_TEXT.intro;
  header.append(title, intro);

  const form = createForm(FORM_FIELDS, {
    homePrice: toInputText(config.defaults.homePrice),
    downPayment: toInputText(config.defaults.downPayment),
    interestRate: toInputText(config.defaults.ratePercent),
    termYears: toInputText(config.defaults.termYears),
  });
  const formSection = document.createElement('section');
  formSection.className = 'form-section';
  formSection.setAttribute('aria-labelledby', 'form-heading');
  const formHeading = document.createElement('h2');
  formHeading.id = 'form-heading';
  formHeading.textContent = UI_TEXT.formHeading;
  formSection.append(formHeading, form.element);

  const results = createResults(format);

  const main = document.createElement('main');
  main.className = 'layout';
  main.append(formSection, results.element);

  const banner = createBanner(notice);
  root.replaceChildren(...(banner ? [banner] : []), header, main, createFooter(config.officeName, config.disclaimer));

  /** Fields whose message may show: left at least once since they were last valid. */
  const touched = new Set<Field>();

  const showUnexpectedError = (error: unknown): void => {
    console.error('Unexpected error', error);
    results.showMessage(MESSAGES.E9);
  };

  const update = (): void => {
    try {
      const outcome = validateInputs(form.read(), config.limits, config.locale);
      for (const { field } of FORM_FIELDS) {
        const error = outcome.ok ? undefined : outcome.errors[field];
        if (!error) {
          touched.delete(field);
          form.setError(field, null);
        } else if (touched.has(field)) {
… (45 more lines not shown)
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/main.ts</summary>

```
import './ui/styles.css';
import { loadConfig } from './config/loadConfig';
import { validateConfig } from './config/schema';
import { createApp, installGlobalErrorHandlers } from './ui/app';

const root = document.querySelector<HTMLElement>('#app');

if (root) {
  // loadConfig never rejects; the catch is defence in depth so the calculator always starts.
  loadConfig()
    .catch(() => validateConfig({}))
    .then((configResult) => installGlobalErrorHandlers(createApp(root, configResult)));
}
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/index.html</summary>

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="See what a home loan costs each month and in total." />
    <title>Mortgage Calculator</title>
  </head>
  <body>
    <div id="app"></div>
    <noscript>This calculator needs JavaScript to run.</noscript>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

Output:

```
The file /Users/dev/Desktop/Test Project Usama/index.html has been updated successfully. (file state is current in your context — no need to Read it back)
```

</details>

Now the stylesheet. It uses one column on phones and two from 760 px, with a visible focus ring, an error marker that doesn't rely on colour, and light and dark themes.

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/ui/styles.css</summary>

```
/* Mortgage Calculator: one column on phones, two from 760px. Colors meet WCAG AA contrast. */

:root {
  --bg: #f6f7f9;
  --surface: #ffffff;
  --text: #1b1f24;
  --muted: #535c68;
  --border: #c9d0d8;
  --accent: #1d5fbf;
  --accent-soft: #e8f0fc;
  --error: #b3261e;
  --error-soft: #fdecea;
  --notice: #7a4b00;
  --notice-soft: #fff4dc;
  --focus: #1d5fbf;
  --radius: 10px;
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #121417;
    --surface: #1c2025;
    --text: #e8eaed;
    --muted: #a9b1bb;
    --border: #3a414a;
    --accent: #8ab4f8;
    --accent-soft: #1f2a3a;
    --error: #f2b8b5;
    --error-soft: #3a1f1e;
    --notice: #f6d28b;
    --notice-soft: #33290f;
    --focus: #8ab4f8;
    color-scheme: dark;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 1rem;
  line-height: 1.5;
}

#app {
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
}

h1 {
  margin: 0;
  font-size: 1.6rem;
  line-height: 1.2;
}

h2 {
  margin: 0 0 12px;
  font-size: 1.1rem;
}

.intro {
  margin: 4px 0 0;
  color: var(--muted);
}

.site-header {
  margin-bottom: 16px;
}

/* Config banner (A4) */
.config-banner {
… (203 more lines not shown)
```

Output:

```
File created successfully at: /Users/dev/Desktop/Test Project Usama/src/ui/styles.css (file state is current in your context — no need to Read it back)
```

</details>

Now the DOM tests:

<details><summary>Write /Users/dev/Desktop/Test Project Usama/tests/unit/ui.test.ts</summary>

```
// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { createApp, type AppDependencies } from '../../src/ui/app';
import { validateConfig, type ConfigResult } from '../../src/config/schema';
import type { Field } from '../../src/engine/validate';
import type { LoanResult } from '../../src/engine/amortize';

const TODAY = new Date(2026, 10, 6);
const E8 = 'Fix the highlighted fields to see your results.';

let root: HTMLElement;
let errorSpy: MockInstance<typeof console.error>;

beforeEach(() => {
  document.body.innerHTML = '<div id="app"></div>';
  root = document.querySelector<HTMLElement>('#app')!;
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterEach(() => {
  errorSpy.mockRestore();
});

function start(json: unknown = {}, deps: AppDependencies = {}): ConfigResult {
  const configResult = validateConfig(json);
  createApp(root, configResult, { today: () => TODAY, ...deps });
  return configResult;
}

const input = (field: Field): HTMLInputElement => root.querySelector<HTMLInputElement>(`#field-${field}`)!;
const errorText = (field: Field): string => root.querySelector(`#field-${field}-error`)?.textContent ?? '';
const result = (name: string): string | null => root.querySelector(`[data-result="${name}"]`)?.textContent ?? null;
const resultsText = (): string => root.querySelector('.results-body')?.textContent ?? '';

/** Types a value as a user would: sets it and fires `input`. */
function type(field: Field, value: string): void {
  const el = input(field);
  el.value = value;
  el.dispatchEvent(new Event('input', { bubbles: true }));
}
/** Leaves the field: fires `focusout`. */
function leave(field: Field): void {
  input(field).dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
}
function enter(values: Partial<Record<Field, string>>): void {
  for (const [field, value] of Object.entries(values)) type(field as Field, value);
}

describe('Form prefilled from config defaults (A1.2)', () => {
  it('built-in defaults: 350000 / 50000 / 6 / 30 with results shown', () => {
    start();
    expect(input('homePrice').value).toBe('350000');
    expect(input('downPayment').value).toBe('50000');
    expect(input('interestRate').value).toBe('6');
    expect(input('termYears').value).toBe('30');
    expect(result('monthly-payment')).toBe('$1,798.65');
  });

  it('config defaults 400,000 / 5 / 25 are prefilled and their results shown', () => {
    start({ defaults: { homePrice: 400000, ratePercent: 5, termYears: 25 } });
    expect(input('homePrice').value).toBe('400000');
    expect(input('interestRate').value).toBe('5');
    expect(input('termYears').value).toBe('25');
    expect(result('loan-amount')).toBe('$350,000.00');
  });

  it('inputs are text fields with labels (so "1,500,000" can be typed)', () => {
    start();
    for (const field of ['homePrice', 'downPayment', 'interestRate', 'termYears'] as const) {
      expect(input(field).type).toBe('text');
      expect(root.querySelector(`label[for="field-${field}"]`)?.textContent).toBeTruthy();
    }
  });
});

describe('Results (L1, L2, A1.1)', () => {
  it('L1.1: 350,000 / 50,000 / 6 / 30 → loan 300,000.00, payment 1,798.65', () => {
    start();
    enter({ homePrice: '350000', downPayment: '50000', interestRate: '6', termYears: '30' });
    expect(result('loan-amount')).toBe('$300,000.00');
    expect(result('monthly-payment')).toBe('$1,798.65');
… (277 more lines not shown)
```

</details>

<details><summary>Shell: Run all tests including DOM tests</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm test 2>&1 | grep -E '×|Test Files|Tests |AssertionError|Error:|Expected|Received|^\s+[-+]  ' | head -40; npx tsc --noEmit && echo tsc OK
```

Output:

```
 Test Files  6 passed (6)
      Tests  261 passed (261)
tsc OK
```

</details>

All 261 tests pass. Unit tests can't show the layout, though, so I'll run the built app and take screenshots at desktop width and at 360 px:

<details><summary>Shell: Build the production bundle</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm run build 2>&1 | tail -4
```

</details>

<details><summary>Shell: Serve the built app locally for a visual check</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npx vite preview --port 4173 --strictPort
```

</details>

<details><summary>ToolSearch</summary>

```json
{
  "query": "select:mcp__playwright__browser_navigate,mcp__playwright__browser_take_screenshot,mcp__playwright__browser_resize,mcp__playwright__browser_type,mcp__playwright__browser_press_key,mcp__playwright__browser_evaluate,mcp__playwright__browser_console_messages,mcp__playwright__browser_close",
  "max_results": 8
}
```

Output:

```

```

</details>

<details><summary>Browser: resize</summary>

```json
{
  "width": 1280,
  "height": 800
}
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": "/private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad/desktop.png"
}
```

Error:

```
### Error
Error: File access denied: /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad/desktop.png is outside allowed roots. Allowed roots: /Users/dev/Desktop/Test Project Usama/.playwright-mcp, /Users/dev/Desktop/Test Project Usama
```

</details>

The page reports one console error. Checking that first:

<details><summary>Browser: console_messages</summary>

```json
{
  "level": "error"
}
```

Output:

```
### Result
Total messages: 1 (Errors: 1, Warnings: 0)

[ERROR] Failed to load resource: the server responded with a status of 404 (Not Found) @ http://localhost:4173/favicon.ico:0
### Events
- New console entries: .playwright-mcp/console-2026-11-06T14-45-14-613Z.log#L1
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/index.html</summary>

Replace:

```
    <title>Mortgage Calculator</title>
```

with:

```
    <title>Mortgage Calculator</title>
    <!-- Empty inline icon: stops the browser requesting /favicon.ico (a 404 and an extra request). -->
    <link rel="icon" href="data:," />
```

</details>

<details><summary>Shell: Rebuild after favicon change</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm run build 2>&1 | tail -1
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/desktop.png",
  "fullPage": true
}
```

Output:

````
### Result
- [Screenshot of full page](.playwright-mcp/desktop.png)
### Ran Playwright code
```js
// Screenshot full page and save it as .playwright-mcp/desktop.png
await page.screenshot({
  fullPage: true,
  path: '.playwright-mcp/desktop.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/desktop.png</summary>



Output:

```
[image: screenshot]
```

</details>

The desktop layout looks right, and the values match the reference (1,798.65 / 347,515.44 / November 2056). Now the 360 px phone width, with an error triggered:

<details><summary>Browser: resize</summary>

```json
{
  "width": 360,
  "height": 800
}
```

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-interestRate",
  "text": "31"
}
```

</details>

<details><summary>Browser: press_key</summary>

```json
{
  "key": "Tab"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, focused: document.activeElement?.id, results: document.querySelector('.results-body')?.textContent, rateError: document.querySelector('#field-interestRate-error')?.textContent })"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/mobile-error.png",
  "fullPage": true
}
```

Output:

````
### Result
- [Screenshot of full page](.playwright-mcp/mobile-error.png)
### Ran Playwright code
```js
// Screenshot full page and save it as .playwright-mcp/mobile-error.png
await page.screenshot({
  fullPage: true,
  path: '.playwright-mcp/mobile-error.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/mobile-error.png</summary>



Output:

```
[image: screenshot]
```

</details>

<details><summary>Browser: close</summary>

```json
{}
```

</details>

<details><summary>TaskStop</summary>

```json
{
  "task_id": "bhrd4w8m2"
}
```

</details>

<details><summary>Shell: Remove screenshots, rerun tests, show changes</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && rm -rf .playwright-mcp && npm test 2>&1 | grep -E 'Test Files|Tests ' && npx tsc --noEmit && echo tsc OK && git status --short
```

Output:

```
 Test Files  6 passed (6)
      Tests  261 passed (261)
tsc OK
 M index.html
 M package-lock.json
 M package.json
 M src/main.ts
 M src/messages.ts
 M src/ui/form.ts
 M src/ui/results.ts
?? src/ui/app.ts
?? src/ui/format.ts
?? src/ui/layout.ts
?? src/ui/styles.css
?? tests/unit/ui.test.ts
```

</details>

<details><summary>Shell: Commit the UI checkpoint locally</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git add index.html package.json package-lock.json src tests && git commit -q -F - <<'EOF'
Add main UI: form, live results, errors, footer and config banner

- Form prefilled from config defaults; results update on every input
- Message timing per input rule 11; ARIA per L8.18; E7-E10 in the results area
- Footer and banner set with textContent only; Dismiss for the banner
- Responsive CSS (one column at 360px), visible focus, light/dark
- happy-dom DOM tests (34); 261 tests in total

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --oneline | head -3
```

Output:

```
fd81c83 Add main UI: form, live results, errors, footer and config banner
cce2b32 Add AI session transcripts (sessions 2 and 3, parts 1-3)
c72ffd9 Add engine, input validation and config loading
```

</details>

Step 5a is built: the main page now has the form, live results, error messages, the footer and the config banner. All 261 tests pass, the type check and build are clean, and I committed it locally as `fd81c83` (not pushed).

## What was built
- **Form** with home price, down payment, rate and term, prefilled from the config defaults. Results recalculate on every keystroke, and there's no Calculate button. Pressing Enter does nothing. The fields are plain text inputs rather than number inputs, so values like `1,500,000` and `6.5%` work in every browser.
- **Results:** monthly payment (highlighted), loan amount, total interest, total paid and payoff date, in the configured currency and locale.
- **Errors** follow input rule 11:
  - while you type an invalid value, the results switch to E8 straight away;
  - the field's own message appears only when you leave the field;
  - it disappears as soon as the value becomes valid.

  Each invalid field gets `aria-invalid`, `aria-describedby` and a message in an `aria-live` region, plus a "!" marker so the error doesn't depend on colour alone. E7, E9 and E10 replace the results the same way E8 does.
- **Footer and config banner:** the office name and disclaimer are set as plain text only. The banner shows the E11 or E12 text and has a Dismiss button.
- **Design:** one column at 360 px and two columns from 760 px, a visible focus ring, light and dark themes, and 44 px touch targets.
- **New files:** `src/ui/app.ts` (wires everything together), `format.ts`, `layout.ts` and `styles.css`. `form.ts` and `results.ts` were filled in. **One new dev dependency:** `happy-dom`.

## One rule I had to interpret
**E3 also appears when you leave the home price field, not only the down payment field.** Rule 11 ties a message to leaving "its" field, but E3 sits under the down payment while it can be caused by the price. Without this, lowering the price below the down payment would show E8 ("Fix the highlighted fields…") with nothing highlighted. Tell me if you'd rather keep it strictly to the down payment field.

## Checked in a real browser
I ran the production build and checked it in Chromium.
- **Desktop:** two columns, $1,798.65 / $347,515.44 / November 2056.
- **360 px:** no horizontal scroll, and an invalid rate showed the red border with "!" and the message, with E8 in the results area.
- **Console:** one error was the browser requesting a missing `favicon.ico`. I added an empty inline icon, and the console is now clean.

## Test output
```
 amortize 49 · parse 38 · validate 48 · config 91 · ui 34 (new, happy-dom) · setup 1
 Test Files  6 passed (6)
      Tests  261 passed (261)
tsc OK · vite build ✓ (JS 16.8 kB, CSS 3.5 kB)
```

## Try by hand (`npm run dev`, then open the link)
1. **On load** you see $1,798.65, $300,000.00, $347,515.44, $647,515.44 and a payoff month 360 months after next month. On 6 November 2026 that's November 2056.
2. **Live update:** change the rate to `5` and the payment becomes $1,610.46 with no button.
3. **Message timing:** type `abc` in Home price. The results switch to "Fix the highlighted fields…" immediately, but no field message shows yet. Press Tab: the red border, "!" and "Enter a home price between 1 and 100,000,000." appear.
4. **Fixing a field:** go back and type `350000`. The message disappears as you type and the results return.
5. **Down payment:** set it to `350000` and leave the field: "Down payment must be less than the home price."
6. **Accepted formats:** enter `1,500,000` as the price and `6.5%` as the rate. Both are accepted.
7. **Too-small loan:** enter price `1`, down `0`, rate `30`, term `40`: "The loan amount is too small for this term."
8. **Keyboard:** Tab through the page. Every field shows a clear blue focus ring.
9. **Phone width:** narrow the window to 360 px (DevTools device toolbar). It shows one column with no sideways scrolling.
10. **Banner:** in `public/config.json`, change `"currency"` to `"XYZ"` and reload. The banner names `currency`. Dismiss hides it, and it comes back on the next reload.
11. **Footer:** change `"disclaimer"` to `<b>hi</b>` and reload. The footer shows the literal text `<b>hi</b>`, not bold.
12. **Undo** the config edits from steps 10 and 11 afterwards.
13. **Console:** open DevTools → Console during these steps. There should be no red errors. The `[config]` warnings appear only during step 10.

Next is 5b, the amortization schedule (L3: monthly and yearly views, CSV download), then 5c (extra payment and presets).

---

### User · 19:47

> Checked steps 1–13 by hand: [all as described / or list what differed]. E3 on leaving
> the price field is approved.
>
> Step 5d: make the design professional before we add more UI. Direction: a calm, trustworthy
> financial tool (think a modern bank or fintech app), not flashy. Keep all behaviour, texts and
> tests unchanged.
> - Design tokens in CSS custom properties: colour palette (one deep brand colour, a neutral
>   scale, success/error colours), spacing scale, radius, shadows, light and dark theme.
> - System font stack only and tabular-nums for all amounts. No web fonts, CDNs or external
>   requests (A5).
> - Header with the app name and the config officeName.
> - Inputs as cards with clear labels, a "$"/currency prefix, and "%" and "years" suffixes
>   (from the config currency, not hard-coded), comfortable 44px+ targets.
> - Results: the monthly payment as the hero number; loan amount, total interest, total paid
>   and payoff date as a clean grid. Add a simple principal-vs-interest bar of total paid,
>   with text labels and percentages so it doesn't rely on colour.
> - Keep WCAG AA contrast in both themes, the visible focus ring, the "!" error marker, the
>   one column at 360px and two columns from 760px.
> - Style the future schedule table and selector with
> Then take Playwright screenshots (desktop + 360px, light + dark, plus one with an error),
> look at them critically, fix what looks off, and ru

### Claude · 19:48

Your message was cut off at the end ("Style the future schedule table and selector with…" and "…and ru"). I'm reading those as: style them with the same tokens, and run all tests. Before writing CSS I'll check the colour palette against WCAG AA with a small script, so contrast is measured rather than guessed:

<details><summary>Shell: Check WCAG contrast of the design palette</summary>

```sh
cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad && cat > contrast.mjs <<'EOF'
const lum=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4);return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]};
const cr=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return (x+0.05)/(y+0.05)};
const themes={
 light:{bg:'#f4f6f9',surface:'#ffffff',sunken:'#f7f9fb',text:'#15202b',muted:'#556373',border:'#d5dce4',brand:'#16507f',brandSoft:'#eaf2f9',hero:'#0f3a5f',heroText:'#ffffff',heroMuted:'#c6d7e8',error:'#b42318',errorSoft:'#fdf0ee',notice:'#8a5300',noticeSoft:'#fff6e5',principal:'#16507f',interest:'#c47a1a',focus:'#1b66a8',adorn:'#556373'},
 dark:{bg:'#0d1319',surface:'#151d26',sunken:'#111820',text:'#e6edf3',muted:'#9fb0c1',border:'#2c3846',brand:'#7cb9ec',brandSoft:'#17283a',hero:'#133a5c',heroText:'#ffffff',heroMuted:'#bcd2e6',error:'#ff9b8f',errorSoft:'#3a1d1b',notice:'#f2c27a',noticeSoft:'#30260f',principal:'#5fa3dc',interest:'#e0a050',focus:'#7cb9ec',adorn:'#9fb0c1'}};
const checks=[['text','bg',4.5],['text','surface',4.5],['muted','surface',4.5],['muted','bg',4.5],['muted','sunken',4.5],['brand','surface',4.5],['heroText','hero',4.5],['heroMuted','hero',4.5],['error','surface',4.5],['text','errorSoft',4.5],['error','errorSoft',4.5],['text','noticeSoft',4.5],['adorn','sunken',4.5],['focus','surface',3],['focus','bg',3],['border','surface',1],['principal','surface',3],['interest','surface',3],['principal','interest',1],['notice','noticeSoft',3]];
for(const [n,t] of Object.entries(themes)){console.log('==',n);for(const [a,b,min] of checks){const r=cr(t[a],t[b]);console.log((r>=min?'ok  ':'FAIL'),a.padEnd(10),'on',b.padEnd(10),r.toFixed(2),min>1?'(min '+min+')':'')}}
EOF
node contrast.mjs
```

Output:

```
== light
ok   text       on bg         15.23 (min 4.5)
ok   text       on surface    16.49 (min 4.5)
ok   muted      on surface    6.14 (min 4.5)
ok   muted      on bg         5.67 (min 4.5)
ok   muted      on sunken     5.82 (min 4.5)
ok   brand      on surface    8.44 (min 4.5)
ok   heroText   on hero       11.73 (min 4.5)
ok   heroMuted  on hero       7.98 (min 4.5)
ok   error      on surface    6.57 (min 4.5)
ok   text       on errorSoft  14.82 (min 4.5)
ok   error      on errorSoft  5.91 (min 4.5)
ok   text       on noticeSoft 15.37 (min 4.5)
ok   adorn      on sunken     5.82 (min 4.5)
ok   focus      on surface    5.98 (min 3)
ok   focus      on bg         5.52 (min 3)
ok   border     on surface    1.38
ok   principal  on surface    8.44 (min 3)
ok   interest   on surface    3.42 (min 3)
ok   principal  on interest   2.47
ok   notice     on noticeSoft 5.90 (min 3)
== dark
ok   text       on bg         15.81 (min 4.5)
ok   text       on surface    14.38 (min 4.5)
ok   muted      on surface    7.65 (min 4.5)
ok   muted      on bg         8.41 (min 4.5)
ok   muted      on sunken     8.04 (min 4.5)
ok   brand      on surface    8.10 (min 4.5)
ok   heroText   on hero       11.75 (min 4.5)
ok   heroMuted  on hero       7.55 (min 4.5)
ok   error      on surface    8.37 (min 4.5)
ok   text       on errorSoft  12.96 (min 4.5)
ok   error      on errorSoft  7.54 (min 4.5)
ok   text       on noticeSoft 12.61 (min 4.5)
ok   adorn      on sunken     8.04 (min 4.5)
ok   focus      on surface    8.10 (min 3)
ok   focus      on bg         8.90 (min 3)
ok   border     on surface    1.43
ok   principal  on surface    6.28 (min 3)
ok   interest   on surface    7.54 (min 3)
ok   principal  on interest   1.20
ok   notice     on noticeSoft 9.06 (min 3)
Shell cwd was reset to /Users/dev/Desktop/Test Project Usama
```

</details>

<details><summary>Shell: Check input border contrast against 3:1</summary>

```sh
node -e '
const lum=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4);return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]};
const cr=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return ((x+0.05)/(y+0.05)).toFixed(2)};
console.log("light input border #7a8898 on #ffffff:", cr("#7a8898","#ffffff"), " on sunken #f7f9fb:", cr("#7a8898","#f7f9fb"));
console.log("dark  input border #66778a on #151d26:", cr("#66778a","#151d26"), " on #111820:", cr("#66778a","#111820"));
console.log("light error border #b42318 on #fff:", cr("#b42318","#ffffff"));'
```

Output:

```
light input border #7a8898 on #ffffff: 3.62  on sunken #f7f9fb: 3.43
dark  input border #66778a on #151d26: 3.70  on #111820: 3.89
light error border #b42318 on #fff: 6.57
```

</details>

All pass now. Writing the code, starting with the formatters (percent, and the currency symbol with its position, taken from Intl):

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/ui/format.ts</summary>

```
/** Display formatting with the configured currency and locale (A1.1). */
import type { YearMonth } from '../engine/amortize';

export interface CurrencyAffix {
  /** The symbol as Intl shows it for this currency and locale, e.g. "$", "€", "PKR". */
  symbol: string;
  /** Whether the locale writes the symbol before ("$1.00") or after ("1,00 €") the number. */
  position: 'prefix' | 'suffix';
}

export interface Formatters {
  /** Integer cents → e.g. "$1,798.65" or "1.798,65 €". */
  money(cents: number): string;
  /** { year: 2056, month: 11 } → e.g. "November 2056". */
  month(value: YearMonth): string;
  /** 0.46 → "46%" (or "46 %" in de-DE). */
  percent(fraction: number): string;
  currency: CurrencyAffix;
}

function affixOf(format: Intl.NumberFormat): CurrencyAffix {
  const parts = format.formatToParts(1);
  const symbolIndex = parts.findIndex((part) => part.type === 'currency');
  const numberIndex = parts.findIndex((part) => part.type === 'integer');
  const symbol = parts[symbolIndex]?.value ?? '';
  return { symbol, position: symbolIndex > numberIndex ? 'suffix' : 'prefix' };
}

export function createFormatters(currency: string, locale: string): Formatters {
  let moneyFormat: Intl.NumberFormat;
  let monthFormat: Intl.DateTimeFormat;
  let percentFormat: Intl.NumberFormat;
  try {
    moneyFormat = new Intl.NumberFormat(locale, { style: 'currency', currency });
    monthFormat = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
    percentFormat = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 });
  } catch {
    // Config validation already rejects bad values; this keeps the UI alive regardless.
    moneyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
    percentFormat = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 0 });
  }
  return {
    money: (cents) => moneyFormat.format(cents / 100),
    month: ({ year, month }) => monthFormat.format(new Date(year, month - 1, 1)),
    percent: (fraction) => percentFormat.format(fraction),
    currency: affixOf(moneyFormat),
  };
}

/** A config default (currency units) as plain input text, e.g. 350000 → "350000". */
export function toInputText(value: number): string {
  return String(value);
}

/**
 * Splits total paid into whole percentages for principal and interest that always add up to 100.
 * Returns null when there is nothing to split.
 */
export function principalInterestShares(
  principalCents: number,
  interestCents: number,
): { principal: number; interest: number } | null {
  const total = principalCents + interestCents;
  if (!(total > 0)) return null;
  const principal = Math.round((principalCents / total) * 100);
  return { principal, interest: 100 - principal };
}
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/src/messages.ts</summary>

Replace:

```
  dismiss: 'Dismiss',
  errorMarker: '!',
```

with:

```
  dismiss: 'Dismiss',
  errorMarker: '!',
  percentSuffix: '%',
  yearsSuffix: 'years',
  breakdownHeading: 'Total paid: principal vs. interest',
  principal: 'Principal',
  interest: 'Interest',
```

Output:

```
The file /Users/dev/Desktop/Test Project Usama/src/messages.ts has been updated successfully. (file state is current in your context — no need to Read it back)
```

</details>

Now the form, which gets the prefix/suffix adornments:

<details><summary>Shell: Add input adornments to the form builder</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/form.ts'); t=p.read_text()
def rep(old,new):
    global t
    assert t.count(old)==1, old; t=t.replace(old,new)
rep("""export const inputId""","""/** Visual text before or after an input, e.g. "$" or "years". Hidden from screen readers: the label says it. */
export interface Adornment {
  prefix?: string;
  suffix?: string;
}

export const inputId""")
rep("""export function createForm(specs: readonly FieldSpec[], initial: Partial<Record<Field, string>>): FormView {""",
"""export function createForm(
  specs: readonly FieldSpec[],
  initial: Partial<Record<Field, string>>,
  adornments: Partial<Record<Field, Adornment>> = {},
): FormView {""")
rep("""    wrapper.append(label, input, error);""","""    // Input and its adornments share one bordered box (.input-group).
    const group = document.createElement('div');
    group.className = 'input-group';
    const { prefix, suffix } = adornments[spec.field] ?? {};
    const adornment = (text: string, side: 'prefix' | 'suffix'): HTMLElement => {
      const span = document.createElement('span');
      span.className = `adornment adornment-${side}`;
      span.setAttribute('aria-hidden', 'true');
      span.textContent = text;
      return span;
    };
    if (prefix) group.append(adornment(prefix, 'prefix'));
    group.append(input);
    if (suffix) group.append(adornment(suffix, 'suffix'));

    wrapper.append(label, group, error);""")
p.write_text(t)
EOF
echo ok
```

Output:

```
ok
```

</details>

Next, the results area: the monthly payment as the hero number, a grid of figures, and the principal-vs-interest bar with text labels.

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/ui/results.ts</summary>

```
/**
 * The results area. Shows either the calculated figures or exactly one message (E7–E10),
 * never both, so nothing from earlier inputs stays on screen (L8.15).
 */
import type { LoanResult } from '../engine/amortize';
import { UI_TEXT } from '../messages';
import { principalInterestShares, type Formatters } from './format';

export interface ResultsView {
  element: HTMLElement;
  /** Renders the figures. Returns false (and renders nothing) if any value is unsafe (L8.20). */
  showResult(result: LoanResult, principalCents: number): boolean;
  showMessage(text: string): void;
}

const isSafeAmount = (value: number): boolean => Number.isSafeInteger(value) && value >= 0;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function createResults(format: Formatters): ResultsView {
  const section = el('section', 'card results');
  section.setAttribute('aria-labelledby', 'results-heading');
  const heading = el('h2', 'card-title', UI_TEXT.resultsHeading);
  heading.id = 'results-heading';
  const body = el('div', 'results-body');
  section.append(heading, body);

  /** One labelled figure. `name` becomes data-result, which the tests read. */
  const stat = (label: string, value: string, name: string): HTMLElement => {
    const wrapper = el('div', `stat stat-${name}`);
    const dt = el('dt', 'stat-label', label);
    const dd = el('dd', 'stat-value amount', value);
    dd.dataset.result = name;
    wrapper.append(dt, dd);
    return wrapper;
  };

  /** Principal vs. interest of total paid. Text labels carry the meaning; the bar only illustrates it. */
  const breakdown = (principalCents: number, interestCents: number): HTMLElement | null => {
    const shares = principalInterestShares(principalCents, interestCents);
    if (!shares) return null;
    const figure = el('figure', 'breakdown');
    const caption = el('figcaption', 'breakdown-title', UI_TEXT.breakdownHeading);

    const bar = el('div', 'breakdown-bar');
    bar.setAttribute('aria-hidden', 'true');
    const principalPart = el('span', 'breakdown-segment segment-principal');
    principalPart.style.width = `${shares.principal}%`;
    const interestPart = el('span', 'breakdown-segment segment-interest');
    interestPart.style.width = `${shares.interest}%`;
    bar.append(principalPart, interestPart);

    const legend = el('dl', 'breakdown-legend');
    const entry = (label: string, cents: number, share: number, kind: string): HTMLElement => {
      const row = el('div', `legend-item legend-${kind}`);
      const dt = el('dt');
      dt.append(el('span', `legend-swatch segment-${kind}`), document.createTextNode(label));
      dt.firstElementChild?.setAttribute('aria-hidden', 'true');
      const dd = el('dd', 'amount');
      dd.dataset.share = kind;
      dd.textContent = `${format.money(cents)} (${format.percent(share / 100)})`;
      row.append(dt, dd);
      return row;
    };
    legend.append(
      entry(UI_TEXT.principal, principalCents, shares.principal, 'principal'),
      entry(UI_TEXT.interest, interestCents, shares.interest, 'interest'),
    );
    figure.append(caption, bar, legend);
    return figure;
  };

  return {
    element: section,
    showResult(result, principalCents) {
… (37 more lines not shown)
```

Output:

```
The file /Users/dev/Desktop/Test Project Usama/src/ui/results.ts has been updated successfully. (file state is current in your context — no need to Read it back)
```

</details>

Now the controller: a header with a brand mark and the office name, and adornments taken from the config currency.

<details><summary>Shell: Add header with office name and adornments</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/app.ts'); t=p.read_text()
def rep(old,new):
    global t
    assert t.count(old)==1, old; t=t.replace(old,new)
rep("""  const header = document.createElement('header');
  header.className = 'site-header';
  const title = document.createElement('h1');
  title.textContent = APP_TITLE;
  const intro = document.createElement('p');
  intro.className = 'intro';
  intro.textContent = UI_TEXT.intro;
  header.append(title, intro);

  const form = createForm(FORM_FIELDS, {
    homePrice: toInputText(config.defaults.homePrice),
    downPayment: toInputText(config.defaults.downPayment),
    interestRate: toInputText(config.defaults.ratePercent),
    termYears: toInputText(config.defaults.termYears),
  });
  const formSection = document.createElement('section');
  formSection.className = 'form-section';""",
"""  const header = createHeader(config.officeName);

  // Currency symbol from the config currency and locale ("$" before, "€" after in de-DE).
  const money: Adornment =
    format.currency.position === 'prefix' ? { prefix: format.currency.symbol } : { suffix: format.currency.symbol };
  const form = createForm(
    FORM_FIELDS,
    {
      homePrice: toInputText(config.defaults.homePrice),
      downPayment: toInputText(config.defaults.downPayment),
      interestRate: toInputText(config.defaults.ratePercent),
      termYears: toInputText(config.defaults.termYears),
    },
    {
      homePrice: money,
      downPayment: money,
      extraPayment: money,
      interestRate: { suffix: UI_TEXT.percentSuffix },
      termYears: { suffix: UI_TEXT.yearsSuffix },
    },
  );
  const formSection = document.createElement('section');
  formSection.className = 'card form-section';""")
rep("""  formHeading.id = 'form-heading';""","""  formHeading.id = 'form-heading';
  formHeading.className = 'card-title';""")
rep("""import { createForm, FORM_FIELDS } from './form';""","""import { createForm, FORM_FIELDS, type Adornment } from './form';""")
rep("""import { createBanner, createFooter } from './layout';""","""import { createBanner, createFooter, createHeader } from './layout';""")
rep("""import { APP_TITLE, MESSAGES, UI_TEXT } from '../messages';""","""import { MESSAGES, UI_TEXT } from '../messages';""")
p.write_text(t)

p=pathlib.Path('src/ui/layout.ts'); t=p.read_text()
t=t.replace("""import { UI_TEXT } from '../messages';""","""import { APP_TITLE, UI_TEXT } from '../messages';

const SVG_NS = 'http://www.w3.org/2000/svg';

/** Small inline house mark (no image request, A5.4). Decorative. */
function brandMark(): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'brand-mark');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', 'M12 3.2 2.8 10.4a1 1 0 0 0 1.2 1.6l.9-.7V19a2 2 0 0 0 2 2h3.6v-5.4h3v5.4H17a2 2 0 0 0 2-2v-7.7l.9.7a1 1 0 0 0 1.2-1.6L12 3.2Z');
  svg.append(path);
  return svg;
}

/** App name, intro and (when configured) the office name, as plain text. */
export function createHeader(officeName: string | null): HTMLElement {
  const header = document.createElement('header');
  header.className = 'site-header';

  const brand = document.createElement('div');
  brand.className = 'brand';
  const title = document.createElement('h1');
  title.textContent = APP_TITLE;
… (17 more lines not shown)
```

Output:

```
tsc OK
```

</details>

I'm also moving the config banner below the header, so the page opens with the app's name rather than a warning:

<details><summary>Shell: Place banner after the header</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/app.ts'); t=p.read_text()
old="root.replaceChildren(...(banner ? [banner] : []), header, main, createFooter(config.officeName, config.disclaimer));"
assert t.count(old)==1
t=t.replace(old,"root.replaceChildren(header, ...(banner ? [banner] : []), main, createFooter(config.officeName, config.disclaimer));")
p.write_text(t)
EOF
echo ok
```

Output:

```
ok
```

</details>

Now the stylesheet, built on design tokens:

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/ui/styles.css</summary>

```
/*
 * Mortgage Calculator design system.
 * Calm, trustworthy financial tool: one deep brand blue, a neutral scale, semantic colours.
 * All colour pairs checked against WCAG AA (text 4.5:1, input borders and focus 3:1) in both themes.
 * System fonts only: no web fonts, CDNs or other external requests (A5.4).
 */

/* ---------- Tokens ---------- */
:root {
  /* Brand */
  --brand: #16507f;
  --brand-strong: #0f3a5f;
  --brand-soft: #eaf2f9;
  --on-brand: #ffffff;
  --on-brand-muted: #c6d7e8;

  /* Neutrals */
  --bg: #f4f6f9;
  --surface: #ffffff;
  --surface-sunken: #f7f9fb;
  --text: #15202b;
  --text-muted: #556373;
  --border: #d5dce4; /* decorative card borders */
  --border-input: #7a8898; /* ≥3:1 against surface (WCAG 1.4.11) */

  /* Semantic */
  --error: #b42318;
  --error-soft: #fdf0ee;
  --success: #1e7a46;
  --notice: #8a5300;
  --notice-soft: #fff6e5;
  --focus: #1b66a8;

  /* Chart */
  --chart-principal: #16507f;
  --chart-interest: #c47a1a;

  /* Spacing (4px base) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;

  /* Shape and depth */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-pill: 999px;
  --shadow-sm: 0 1px 2px rgb(16 24 40 / 0.06);
  --shadow-md: 0 1px 3px rgb(16 24 40 / 0.08), 0 4px 12px rgb(16 24 40 / 0.06);

  /* Type */
  --font: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.5rem;
  --text-hero: clamp(2rem, 7vw, 2.75rem);

  --control-height: 48px;
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  :root {
    --brand: #7cb9ec;
    --brand-strong: #133a5c;
    --brand-soft: #17283a;
    --on-brand: #ffffff;
    --on-brand-muted: #bcd2e6;

    --bg: #0d1319;
    --surface: #151d26;
    --surface-sunken: #111820;
    --text: #e6edf3;
    --text-muted: #9fb0c1;
… (564 more lines not shown)
```

</details>

<details><summary>Shell: Run tests, type-check and build after redesign</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm test 2>&1 | grep -E '×|Test Files|Tests |AssertionError' | head; npx tsc --noEmit && echo tsc OK && npm run build 2>&1 | tail -3
```

Output:

```
 Test Files  6 passed (6)
      Tests  261 passed (261)
tsc OK
dist/assets/index-M8H3V1tJ.js   19.40 kB │ gzip: 7.19 kB

✓ built in 231ms
```

</details>

All 261 existing tests still pass without changes. Now the screenshots. I'm starting the preview server and loading the media-emulation tool for dark mode:

<details><summary>Shell: Serve the built app for screenshots</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npx vite preview --port 4173 --strictPort
```

</details>

<details><summary>ToolSearch</summary>

```json
{
  "query": "select:mcp__playwright__browser_emulate_media",
  "max_results": 1
}
```

Output:

```
(no output)
```

</details>

<details><summary>Browser: resize</summary>

```json
{
  "width": 1280,
  "height": 860
}
```

</details>

<details><summary>Browser: emulate_media</summary>

```json
{
  "colorScheme": "light"
}
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/1-desktop-light.png",
  "fullPage": true
}
```

Output:

````
### Result
- [Screenshot of full page](.playwright-mcp/1-desktop-light.png)
### Ran Playwright code
```js
// Screenshot full page and save it as .playwright-mcp/1-desktop-light.png
await page.screenshot({
  fullPage: true,
  path: '.playwright-mcp/1-desktop-light.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/1-desktop-light.png</summary>



Output:

```
[image: screenshot]
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/src/ui/styles.css</summary>

Replace:

```
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-3);
}
```

with:

```
/* Always a balanced 2 × 2 grid; one column only where two would squeeze large amounts. */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
}

@media (max-width: 399px) {
  .stat-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

</details>

<details><summary>Shell: Rebuild with grid fix</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm run build 2>&1 | tail -1
```

</details>

<details><summary>Browser: emulate_media</summary>

```json
{
  "colorScheme": "dark"
}
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/2-desktop-dark.png",
  "fullPage": true
}
```

Output:

````
### Result
- [Screenshot of full page](.playwright-mcp/2-desktop-dark.png)
### Ran Playwright code
```js
// Screenshot full page and save it as .playwright-mcp/2-desktop-dark.png
await page.screenshot({
  fullPage: true,
  path: '.playwright-mcp/2-desktop-dark.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/2-desktop-dark.png</summary>



Output:

```
[image: screenshot]
```

</details>

Dark mode works: the 2×2 grid is balanced and the hero card and bar read clearly. Now 360 px in light mode, with an error and the focus ring:

<details><summary>Browser: emulate_media</summary>

```json
{
  "colorScheme": "light"
}
```

</details>

<details><summary>Browser: resize</summary>

```json
{
  "width": 360,
  "height": 780
}
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-homePrice",
  "text": "abc"
}
```

</details>

<details><summary>Browser: press_key</summary>

```json
{
  "key": "Tab"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => ({ scrollWidth: document.documentElement.scrollWidth, focused: document.activeElement?.id })"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/3-mobile-light-error.png",
  "fullPage": true
}
```

Output:

````
### Result
- [Screenshot of full page](.playwright-mcp/3-mobile-light-error.png)
### Ran Playwright code
```js
// Screenshot full page and save it as .playwright-mcp/3-mobile-light-error.png
await page.screenshot({
  fullPage: true,
  path: '.playwright-mcp/3-mobile-light-error.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/3-mobile-light-error.png</summary>



Output:

```
[image: screenshot]
```

</details>

<details><summary>Shell: Fix header wrapping and simplify focus ring</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/styles.css'); t=p.read_text()
def rep(old,new):
    global t
    assert t.count(old)==1, old; t=t.replace(old,new)
rep(""".header-office {
  margin-left: auto;
  padding""",""".header-office {
  padding""")
rep(""".intro {
  margin-top: var(--space-2);""","""/* Wide screens: office name on the right of the title. Narrow: it wraps under it, left-aligned. */
@media (min-width: 560px) {
  .header-office {
    margin-left: auto;
  }
}

.intro {
  margin-top: var(--space-2);""")
rep("""/* Focus ring on the whole group, so the adornments are inside it. */
.input-group:focus-within {
  border-color: var(--focus);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus) 35%, transparent);
}

.input-group:has(input:focus-visible) {
  outline: 3px solid var(--focus);
  outline-offset: 2px;
}""","""/* One focus ring around the whole group, so the adornments sit inside it. */
.input-group:focus-within {
  border-color: var(--focus);
  outline: 3px solid var(--focus);
  outline-offset: 2px;
}""")
rep(""".field.has-error .input-group:focus-within {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--error) 30%, transparent);
}

""","")
rep("""  transition: border-color 0.15s, box-shadow 0.15s;""","""  transition: border-color 0.15s;""")
p.write_text(t)
EOF
npm run build 2>&1 | tail -1
```

</details>

<details><summary>Browser: emulate_media</summary>

```json
{
  "colorScheme": "dark"
}
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-interestRate",
  "text": "6.5"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/4-mobile-dark.png",
  "fullPage": true
}
```

Output:

````
### Result
- [Screenshot of full page](.playwright-mcp/4-mobile-dark.png)
### Ran Playwright code
```js
// Screenshot full page and save it as .playwright-mcp/4-mobile-dark.png
await page.screenshot({
  fullPage: true,
  path: '.playwright-mcp/4-mobile-dark.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/4-mobile-dark.png</summary>



Output:

```
[image: screenshot]
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/src/ui/styles.css</summary>

Replace:

```
@media (max-width: 399px) {
  .stat-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

with:

```
/* Narrow phones: compact rows, label left and amount right, instead of tall cards. */
@media (max-width: 399px) {
  .stat-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
  }

  .stat {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0 var(--space-3);
    border: 0;
    border-radius: 0;
    background: transparent;
  }

  .stat + .stat {
    border-top: 1px solid var(--border);
  }

  .stat-value {
    margin-top: 0;
    font-size: var(--text-base);
  }
}
```

</details>

<details><summary>Shell: Rebuild with compact mobile stats</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm run build 2>&1 | tail -1
```

</details>

<details><summary>Browser: emulate_media</summary>

```json
{
  "colorScheme": "light"
}
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-homePrice",
  "text": "100,000,000"
}
```

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-interestRate",
  "text": "30"
}
```

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-termYears",
  "text": "40"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => ({ scrollWidth: document.documentElement.scrollWidth })"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/5-mobile-light-max.png",
  "fullPage": true
}
```

Output:

````
### Result
- [Screenshot of full page](.playwright-mcp/5-mobile-light-max.png)
### Ran Playwright code
```js
// Screenshot full page and save it as .playwright-mcp/5-mobile-light-max.png
await page.screenshot({
  fullPage: true,
  path: '.playwright-mcp/5-mobile-light-max.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/5-mobile-light-max.png</summary>



Output:

```
[image: screenshot]
```

</details>

<details><summary>Shell: Move mobile stat rules after base rules</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib,re
p=pathlib.Path('src/ui/styles.css'); t=p.read_text()
start=t.index('/* Narrow phones: compact rows')
end=t.index('}\n}\n', start)+4
block=t[start:end]
t=t[:start]+t[end:]
anchor=""".stat-value {
  margin-top: 2px;
  font-size: var(--text-lg);
  font-weight: 650;
  overflow-wrap: anywhere;
}
"""
assert t.count(anchor)==1
t=t.replace(anchor, anchor+"\n"+block)
p.write_text(t)
EOF
grep -n 'Narrow phones' -A3 src/ui/styles.css | head -4; npm run build 2>&1 | tail -1
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-homePrice",
  "text": "100,000,000"
}
```

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-interestRate",
  "text": "30"
}
```

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-termYears",
  "text": "40"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/6-mobile-light-max-fixed.png",
  "target": ".results"
}
```

Output:

````
### Result
- [Screenshot of element](.playwright-mcp/6-mobile-light-max-fixed.png)
### Ran Playwright code
```js
// Screenshot element and save it as .playwright-mcp/6-mobile-light-max-fixed.png
await page.locator('.results').screenshot({
  path: '.playwright-mcp/6-mobile-light-max-fixed.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/6-mobile-light-max-fixed.png</summary>



Output:

```
[image: screenshot]
```

</details>

The rows are clean now, and even the largest amounts fit on one line at 360 px. Closing the browser and server, then adding tests for the new behaviour. The existing tests stay unchanged.

<details><summary>Browser: close</summary>

```json
{}
```

</details>

<details><summary>TaskStop</summary>

```json
{
  "task_id": "bgcf500k3"
}
```

</details>

<details><summary>Shell: Add 5d tests, run all tests, type-check and build</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && rm -rf .playwright-mcp && cat >> tests/unit/ui.test.ts <<'EOF'

describe('5d design: header, adornments, principal vs. interest bar', () => {
  it('the header shows the app name and the configured office name as text', () => {
    start({ officeName: 'Riverside Mortgages' });
    const header = root.querySelector('header')!;
    expect(header.querySelector('h1')?.textContent).toBe('Mortgage Calculator');
    expect(header.querySelector('.header-office')?.textContent).toBe('Riverside Mortgages');
  });

  it('no office name → no office label in the header', () => {
    start();
    expect(root.querySelector('header .header-office')).toBeNull();
  });

  it('adornments come from the config currency: "$" before money fields, "%" and "years" after', () => {
    start();
    const adornments = (field: Field) =>
      [...input(field).parentElement!.querySelectorAll('.adornment')].map((a) => [a.className, a.textContent]);
    expect(adornments('homePrice')).toEqual([['adornment adornment-prefix', '$']]);
    expect(adornments('downPayment')).toEqual([['adornment adornment-prefix', '$']]);
    expect(adornments('interestRate')).toEqual([['adornment adornment-suffix', '%']]);
    expect(adornments('termYears')).toEqual([['adornment adornment-suffix', 'years']]);
    for (const a of root.querySelectorAll('.adornment')) expect(a.getAttribute('aria-hidden')).toBe('true');
  });

  it('EUR in de-DE puts "€" after the money fields; PKR shows "PKR" before', () => {
    start({ currency: 'EUR', locale: 'de-DE' });
    expect(input('homePrice').parentElement!.querySelector('.adornment-suffix')?.textContent).toBe('€');
    start({ currency: 'PKR' });
    expect(input('homePrice').parentElement!.querySelector('.adornment-prefix')?.textContent).toBe('PKR');
  });

  it('the bar has text labels with amounts and percentages that add up to 100%', () => {
    start();
    enter({ homePrice: '300000', downPayment: '0' });
    expect(root.querySelector('[data-share="principal"]')?.textContent).toBe('$300,000.00 (46%)');
    expect(root.querySelector('[data-share="interest"]')?.textContent).toBe('$347,515.44 (54%)');
    expect(root.querySelector('.breakdown-bar')?.getAttribute('aria-hidden')).toBe('true');
    const widths = [...root.querySelectorAll<HTMLElement>('.breakdown-segment')].map((s) => s.style.width);
    expect(widths).toEqual(['46%', '54%']);
  });

  it('at 0% interest the bar is 100% principal and 0% interest', () => {
    start();
    enter({ homePrice: '120000', downPayment: '0', interestRate: '0', termYears: '10' });
    expect(root.querySelector('[data-share="principal"]')?.textContent).toBe('$120,000.00 (100%)');
    expect(root.querySelector('[data-share="interest"]')?.textContent).toBe('$0.00 (0%)');
  });

  it('the bar disappears with every other figure when an input is invalid', () => {
    start();
    type('homePrice', 'abc');
    expect(root.querySelector('.breakdown')).toBeNull();
  });
});
EOF
npm test 2>&1 | grep -E '×|Test Files|Tests |AssertionError|Expected|Received' | head -20; npx tsc --noEmit && echo tsc OK; npm run build 2>&1 | tail -3
```

Output:

```
 Test Files  6 passed (6)
      Tests  268 passed (268)
tsc OK
dist/assets/index-hhvX_Upl.js   19.40 kB │ gzip: 7.19 kB

✓ built in 94ms
```

</details>

All 268 tests pass. A last check for A5: the built files must contain no external URLs (fonts, CDNs).

<details><summary>Shell: Check for external URLs and commit the redesign</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -oE "https?://[^\"' )]+" dist/index.html dist/assets/* | sort -u; grep -c '@import\|@font-face' dist/assets/*.css; git add -A src tests index.html && git status --short && git commit -q -F - <<'EOF'
Redesign UI with design tokens, hero result and principal/interest bar

- CSS tokens: brand, neutral scale, semantic colours, spacing, radius, shadows; light + dark
- All colour pairs checked against WCAG AA; input borders and focus at least 3:1
- Header with office name; currency/%/years adornments from config
- Hero monthly payment, 2x2 stat grid (compact rows under 400px)
- Principal vs. interest bar with text labels and percentages (not colour alone)
- Styles ready for the schedule table, segmented control and preset select
- 7 new UI tests (268 total); existing tests unchanged

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --oneline | head -1
```

Output:

```
dist/assets/index-hhvX_Upl.js:http://www.w3.org/2000/svg`;function
0
M  src/messages.ts
M  src/ui/app.ts
M  src/ui/form.ts
M  src/ui/format.ts
M  src/ui/layout.ts
M  src/ui/results.ts
M  src/ui/styles.css
M  tests/unit/ui.test.ts
ebe2265 Redesign UI with design tokens, hero result and principal/interest bar
```

</details>

The redesign is done. All behaviour and texts are unchanged, the 261 existing tests pass without edits, and with 7 new tests the total is 268. The type check and build are clean, and I committed it locally as `ebe2265` (not pushed).

Your message still had the template text "[all as described / or list what differed]" in it, so I've assumed steps 1–13 all worked. The end of the message was also cut off; I read it as "style the schedule table and selector with the same tokens" and "run all tests".

## What changed
- **Design tokens** in `styles.css`:
  - one deep brand blue, a neutral scale, and error/success/notice colours;
  - a spacing scale on a 4 px base, plus radius, shadow and type sizes;
  - full light and dark themes.

  I checked every colour pair with a contrast script rather than by eye. Text is at least 4.5:1 in both themes. The first draft gave input borders only 1.38:1, so they now have their own darker border colour (3.6:1 light, 3.7:1 dark) to meet the 3:1 rule for controls.
- **Fonts:** system fonts only, with all figures in tabular numerals. The build contains no external URLs. The only `http` string in it is the SVG namespace, which is not a request.
- **Header:** an inline house icon, the app name, and the configured office name as a small label. On narrow screens the label moves under the title.
- **Inputs** have a currency adornment taken from the config. It shows "$" before the number, "€" after it for `de-DE`, and "PKR" before it for PKR. Rate and term get "%" and "years" after the number. All adornments are hidden from screen readers, since the labels already say this. Inputs are 48 px tall.
- **Results:**
  - the monthly payment as a large hero number on the brand colour;
  - a 2×2 grid for loan amount, total interest, total paid and payoff date;
  - a principal-vs-interest bar of total paid, labelled with text such as "Principal $300,000.00 (46%)". The percentages always add up to 100.
- **Styles ready for later steps:** the schedule table (scrolls inside its own box, sticky header), the monthly/yearly switch and the preset select.

## What the screenshots showed, and what I fixed
I took screenshots at desktop and 360 px, in light and dark, including an error state and the maximum values.

| Problem I saw | Fix |
|---|---|
| The stat grid made 3 + 1 columns, and "November 2056" wrapped onto two lines | A fixed 2×2 grid |
| The office-name label wrapped on its own line and floated right at 360 px | Left-aligned under the title on narrow screens |
| The focus ring was doubled (glow plus outline) and looked heavy | One 3 px outline around the whole input, adornment included |
| At 360 px the four stats became tall stacked cards | Compact rows, label left and amount right. My first attempt didn't apply because of CSS order; fixed and checked again |
| In dark mode, the principal and interest colours are only 1.2:1 apart | A gap between the segments, diagonal stripes on interest, and the text labels |

The final screenshots show:
- desktop light and dark: balanced;
- 360 px: no horizontal scroll (`scrollWidth` 360), including at the maximum values ($1,199,428,164.31 fits on one line);
- the error state: red border, "!" marker and E8 in the results area.

## Test output
```
 amortize 49 · parse 38 · validate 48 · config 91 · ui 41 (+7: header office name, adornments
 for USD/EUR-de/PKR, bar labels and widths, 0% bar, bar removed on error) · setup 1
 Test Files  6 passed (6)
      Tests  268 passed (268)
tsc OK · vite build ✓
```

Next are 5b, the schedule (L3: monthly/yearly table and CSV), and 5c, the extra payment and presets (L5, M1).

*The user ran a Claude Code command: `/export transcripts/session-03-part4.md`.*

---

### User · 19:54

> Correction: in my last message I left the template text in by mistake. I have now checked
> steps 1–13 by hand on the new design: <write what you saw, e.g. "all worked" or "step 7 showed …">.
>
> Step 5b: the amortization schedule and CSV download (story L3, all criteria 1–9).
> - Monthly view by default, plus a yearly toggle. The CSV always holds monthly rows (L3.5).
> - Filename, header line and number format exactly as in L3.4–L3.5.
> - The schedule is replaced by E8 on invalid input and comes back when fixed (L3.8).
> - Use the existing table styles and tokens. 480 rows must stay fast to render.
> Test it, check it in the browser with screenshots (desktop + 360px), run all tests.

### Claude · 19:54

Your message still has the placeholder "<write what you saw…>" in it, so I haven't recorded any result for steps 1–13. Tell me what you saw if anything differed.

On to 5b. First I'm re-reading the exact L3 wording, so the column names and CSV format match the doc:

<details><summary>Shell: Show the L3 story and criteria</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && awk '/^### L3\./,/^### L4\./' docs/user-stories.md | head -30
```

Output:

```
### L3. View and export the amortization schedule
**Priority:** Must · **Scope:** Core · **Serves:** J-6 · **Status:** Not implemented

As a Loanee, I want to see each payment split into principal and interest and download it, so that I can see how my balance falls over time.

**Acceptance criteria**
1. Given home price 300,000, down payment 0, rate 6 and term 30, when I open the schedule, then it shows 360 rows with the columns Payment number, Date, Payment, Principal, Interest, Extra payment and Balance. Row 1 shows 1, December 2026, 1,798.65, 298.65, 1,500.00, 0.00, 299,701.35.
2. Given the schedule of criterion 1, when I look at the last row, then it shows 360, November 2056, 1,800.09, 1,791.13, 8.96, 0.00, 0.00.
3. Given the schedule of criterion 1 in monthly view, when I switch to yearly view, then 30 rows appear. Year 1 shows payments 21,583.80, principal 3,684.00, interest 17,899.80 and ending balance 296,316.00, which equal the sums (and the last balance) of monthly rows 1 to 12.
4. Given the schedule of criterion 1, when I click "Download CSV", then a file named `mortgage-schedule.csv` downloads. Its first line is exactly `Payment number,Date,Payment,Principal,Interest,Extra payment,Balance`, it has 360 data lines, and its second line is exactly `1,2026-12,1798.65,298.65,1500.00,0.00,299701.35`.
5. Given any downloaded CSV, when I inspect it, then it has comma separators, `.` as the decimal point, exactly 2 decimals per amount, no currency symbols and no thousands separators. It always holds monthly rows, even when the yearly view is shown.
6. Given home price 1, down payment 0, rate 0.001 and term 1, when I open the schedule, then it shows 12 rows. Rows 1 to 11 have payment 0.08, row 12 has payment 0.12, and the last balance is 0.00.
7. Given home price 100,000,000, down payment 0, rate 30 and term 40, when I open the schedule, then it shows exactly 480 rows, the last balance is 0.00, and no cell is negative, `NaN` or `Infinity`.
8. Given a schedule is shown, when I make any input invalid, then the schedule is replaced by E8 and no rows from the earlier inputs remain on screen. When I then fix the input, then the schedule for the new inputs appears.
9. Given today is any date and a 30-year loan, when I open the schedule, then row 1's date is the month after today and row 360's date is 359 months after row 1's date. For example, on 15 March 2027 row 1 is April 2027 and row 360 is March 2057.
10. Given today is any date and a 30-year loan, when I click "Download CSV", then the Date of data line 1 is the month after today in `YYYY-MM` form, the Date of data line 360 is 359 months later, and both match the dates in the on-screen schedule. For example, on 15 March 2027 they are `2027-04` and `2057-03`.

### L4. Compare scenarios side by side
```

</details>

L3 has 10 criteria, not 9. Criterion 10 is the any-date CSV check we added, and I'll cover it too. Writing the CSV module first:

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/ui/csv.ts</summary>

```
/**
 * Schedule CSV (L3.4, L3.5, L3.10): always monthly rows, comma separators, "." decimal point,
 * exactly 2 decimals, no currency symbols, no thousands separators. Dates as YYYY-MM.
 */
import type { ScheduleRow } from '../engine/amortize';
import { UI_TEXT } from '../messages';

export const CSV_FILENAME = 'mortgage-schedule.csv';

export const CSV_HEADER = [
  UI_TEXT.colPaymentNumber,
  UI_TEXT.colDate,
  UI_TEXT.colPayment,
  UI_TEXT.colPrincipal,
  UI_TEXT.colInterest,
  UI_TEXT.colExtra,
  UI_TEXT.colBalance,
].join(',');

/** Integer cents → "1798.65", exactly, with no float formatting involved. */
export function centsToPlain(cents: number): string {
  const whole = Math.floor(cents / 100);
  const rest = String(cents % 100).padStart(2, '0');
  return `${whole}.${rest}`;
}

const yearMonth = (row: ScheduleRow): string => `${row.year}-${String(row.month).padStart(2, '0')}`;

/** Lines end with CRLF (RFC 4180), which every spreadsheet app reads. */
export function scheduleCsv(rows: readonly ScheduleRow[]): string {
  const lines = rows.map((row) =>
    [
      String(row.number),
      yearMonth(row),
      centsToPlain(row.paymentCents),
      centsToPlain(row.principalCents),
      centsToPlain(row.interestCents),
      centsToPlain(row.extraCents),
      centsToPlain(row.balanceCents),
    ].join(','),
  );
  return [CSV_HEADER, ...lines].join('\r\n') + '\r\n';
}

/** Saves text as a file in the browser. A blob: URL is local, not a network request (A5.4). */
export function downloadText(filename: string, text: string): void {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
  // Revoke later: some browsers (Safari) start the download asynchronously.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/src/messages.ts</summary>

Replace:

```
  principal: 'Principal',
  interest: 'Interest',
```

with:

```
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
```

Output:

```
The file /Users/dev/Desktop/Test Project Usama/src/messages.ts has been updated successfully. (file state is current in your context — no need to Read it back)
```

</details>

Now the schedule view:

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/ui/schedule.ts</summary>

```
/**
 * Amortization schedule (L3): monthly table by default, a yearly toggle, and a CSV download that
 * always holds monthly rows. On invalid input the whole schedule is replaced by a message (L3.8).
 */
import { toYearly, type ScheduleRow } from '../engine/amortize';
import { UI_TEXT } from '../messages';
import { CSV_FILENAME, scheduleCsv } from './csv';
import type { Formatters } from './format';

export type ScheduleMode = 'monthly' | 'yearly';

export interface ScheduleView {
  element: HTMLElement;
  show(rows: readonly ScheduleRow[]): void;
  showMessage(text: string): void;
}

export function createSchedule(format: Formatters, download: (filename: string, text: string) => void): ScheduleView {
  let mode: ScheduleMode = 'monthly';
  let rows: readonly ScheduleRow[] = [];

  const section = document.createElement('section');
  section.className = 'card schedule';
  section.setAttribute('aria-labelledby', 'schedule-heading');

  const head = document.createElement('div');
  head.className = 'schedule-head';
  const heading = document.createElement('h2');
  heading.id = 'schedule-heading';
  heading.className = 'card-title';
  heading.textContent = UI_TEXT.scheduleHeading;

  const toolbar = document.createElement('div');
  toolbar.className = 'schedule-toolbar';

  const toggle = document.createElement('div');
  toggle.className = 'segmented';
  toggle.setAttribute('role', 'group');
  toggle.setAttribute('aria-label', UI_TEXT.scheduleViewLabel);
  const modeButton = (value: ScheduleMode, label: string): HTMLButtonElement => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.mode = value;
    button.textContent = label;
    button.addEventListener('click', () => {
      mode = value;
      render();
    });
    return button;
  };
  const monthlyButton = modeButton('monthly', UI_TEXT.monthly);
  const yearlyButton = modeButton('yearly', UI_TEXT.yearly);
  toggle.append(monthlyButton, yearlyButton);

  const csvButton = document.createElement('button');
  csvButton.type = 'button';
  csvButton.className = 'csv-button';
  csvButton.textContent = UI_TEXT.downloadCsv;
  // Always the monthly rows, whatever the view (L3.5).
  csvButton.addEventListener('click', () => download(CSV_FILENAME, scheduleCsv(rows)));

  toolbar.append(toggle, csvButton);
  head.append(heading, toolbar);

  const body = document.createElement('div');
  body.className = 'schedule-body';
  section.append(head, body);

  const cell = (tag: 'td' | 'th', text: string): HTMLTableCellElement => {
    const node = document.createElement(tag);
    node.textContent = text;
    return node;
  };

  function table(caption: string, headers: string[], data: string[][]): HTMLElement {
    // A focusable, labelled region so keyboard users can scroll it (L10.3).
    const scroll = document.createElement('div');
    scroll.className = 'table-scroll';
    scroll.tabIndex = 0;
    scroll.setAttribute('role', 'region');
… (96 more lines not shown)
```

Output:

```
The file /Users/dev/Desktop/Test Project Usama/src/ui/schedule.ts has been updated successfully. (file state is current in your context — no need to Read it back)
```

</details>

Wiring the schedule into the app. Reading the current `app.ts` first, since I last edited it with a script:

<details><summary>Read /Users/dev/Desktop/Test Project Usama/src/ui/app.ts</summary>



Output:

```
1	/**
2	 * Wires config, form, validation, engine and results together.
3	 * Message timing follows input rule 11 (docs/user-stories.md, Shared definitions):
4	 * a field's message appears when the field is left, and disappears as soon as the value is
5	 * valid while typing; the results area switches to E8 immediately on any invalid input.
6	 */
7	import { calculateLoan, type CalcOutcome, type LoanInput } from '../engine/amortize';
8	import { validateInputs, type Field } from '../engine/validate';
9	import type { ConfigResult } from '../config/schema';
10	import { MESSAGES, UI_TEXT } from '../messages';
11	import { createForm, FORM_FIELDS, type Adornment } from './form';
12	import { createFormatters, toInputText } from './format';
13	import { createBanner, createFooter, createHeader } from './layout';
14	import { createResults } from './results';
15
16	export interface AppDependencies {
17	  calculate?: (input: LoanInput) => CalcOutcome;
18	  today?: () => Date;
19	}
20
21	export interface AppHandle {
22	  /** Shows E9 in the results area; used by the global error handlers. */
23	  showUnexpectedError(error: unknown): void;
24	}
25
26	export function createApp(root: HTMLElement, configResult: ConfigResult, deps: AppDependencies = {}): AppHandle {
27	  const { config, notice } = configResult;
28	  const calculate = deps.calculate ?? calculateLoan;
29	  const today = deps.today ?? (() => new Date());
30	  const format = createFormatters(config.currency, config.locale);
31
32	  const header = createHeader(config.officeName);
33
34	  // Currency symbol from the config currency and locale ("$" before, "€" after in de-DE).
35	  const money: Adornment =
36	    format.currency.position === 'prefix' ? { prefix: format.currency.symbol } : { suffix: format.currency.symbol };
37	  const form = createForm(
38	    FORM_FIELDS,
39	    {
40	      homePrice: toInputText(config.defaults.homePrice),
```

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/src/ui/app.ts</summary>



Output:

```
68	  const banner = createBanner(notice);
69	  root.replaceChildren(header, ...(banner ? [banner] : []), main, createFooter(config.officeName, config.disclaimer));
70
71	  /** Fields whose message may show: left at least once since they were last valid. */
72	  const touched = new Set<Field>();
73
74	  const showUnexpectedError = (error: unknown): void => {
75	    console.error('Unexpected error', error);
76	    results.showMessage(MESSAGES.E9);
77	  };
78
79	  const update = (): void => {
80	    try {
81	      const outcome = validateInputs(form.read(), config.limits, config.locale);
82	      for (const { field } of FORM_FIELDS) {
83	        const error = outcome.ok ? undefined : outcome.errors[field];
84	        if (!error) {
85	          touched.delete(field);
86	          form.setError(field, null);
87	        } else if (touched.has(field)) {
88	          form.setError(field, error.text);
89	        }
90	      }
91	      if (!outcome.ok) {
92	        results.showMessage(MESSAGES.E8);
93	        return;
94	      }
95
96	      const calc = calculate({ ...outcome.values, today: today() });
97	      if (!calc.ok) {
98	        if (calc.error === 'E10') console.error('Calculation returned E10', outcome.values);
99	        results.showMessage(calc.error === 'E7' ? MESSAGES.E7 : MESSAGES.E10);
100	        return;
101	      }
102	      if (!results.showResult(calc.result, outcome.values.principalCents)) {
103	        console.error('Calculation produced a value that is not a safe amount', calc.result);
104	        results.showMessage(MESSAGES.E10);
105	      }
106	    } catch (error) {
107	      showUnexpectedError(error);
108	    }
109	  };
110
111	  form.element.addEventListener('input', update);
112	  form.element.addEventListener('focusout', (event) => {
113	    const target = event.target;
114	    if (!(target instanceof HTMLInputElement)) return;
115	    const field = target.name as Field;
116	    touched.add(field);
117	    // E3 belongs to the down payment but is caused by either field, so leaving the
118	    // home price also reveals it.
119	    if (field === 'homePrice') touched.add('downPayment');
120	    update();
121	  });
122
123	  update();
124	  return { showUnexpectedError };
125	}
126
127	/** Last-resort handlers so the page never goes blank (L8.19). */
```

</details>

<details><summary>Shell: Wire schedule into the app and add styles</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/app.ts'); t=p.read_text()
def rep(old,new):
    global t
    assert t.count(old)==1, old; t=t.replace(old,new)
rep("""import { createResults } from './results';""","""import { createResults } from './results';
import { createSchedule } from './schedule';
import { downloadText } from './csv';""")
rep("""  today?: () => Date;
}""","""  today?: () => Date;
  /** Saves a file; replaced in tests. */
  download?: (filename: string, text: string) => void;
}""")
rep("""  const today = deps.today ?? (() => new Date());""","""  const today = deps.today ?? (() => new Date());
  const download = deps.download ?? downloadText;""")
rep("""  main.append(formSection, results.element);""","""  const schedule = createSchedule(format, download);
  main.append(formSection, results.element, schedule.element);""")
rep("""  const showUnexpectedError = (error: unknown): void => {
    console.error('Unexpected error', error);
    results.showMessage(MESSAGES.E9);
  };""","""  /** Replaces every result and the whole schedule with one message (L8.15, L3.8). */
  const showMessage = (text: string): void => {
    results.showMessage(text);
    schedule.showMessage(text);
  };

  const showUnexpectedError = (error: unknown): void => {
    console.error('Unexpected error', error);
    showMessage(MESSAGES.E9);
  };""")
rep("""        results.showMessage(MESSAGES.E8);
        return;""","""        showMessage(MESSAGES.E8);
        return;""")
rep("""        results.showMessage(calc.error === 'E7' ? MESSAGES.E7 : MESSAGES.E10);
        return;
      }
      if (!results.showResult(calc.result, outcome.values.principalCents)) {
        console.error('Calculation produced a value that is not a safe amount', calc.result);
        results.showMessage(MESSAGES.E10);
      }""","""        showMessage(calc.error === 'E7' ? MESSAGES.E7 : MESSAGES.E10);
        return;
      }
      if (!results.showResult(calc.result, outcome.values.principalCents)) {
        console.error('Calculation produced a value that is not a safe amount', calc.result);
        showMessage(MESSAGES.E10);
        return;
      }
      schedule.show(calc.result.rows);""")
p.write_text(t)

p=pathlib.Path('src/ui/styles.css'); t=p.read_text()
old="""/* ---------- Select (preset selector, 5c) ---------- */"""
assert t.count(old)==1
t=t.replace(old,"""/* ---------- Schedule (L3) ---------- */
.schedule {
  grid-column: 1 / -1; /* full width below the form and results */
}

.schedule-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3) var(--space-4);
  margin-bottom: var(--space-4);
}

.schedule-head .card-title {
  margin-bottom: 0;
}

.schedule-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
}

.schedule-toolbar[hidden] {
… (19 more lines not shown)
```

Output:

```
tsc OK
 Test Files  6 passed (6)
      Tests  268 passed (268)
```

</details>

The existing 268 tests still pass. Now the schedule tests, a CSV file and a DOM file:

<details><summary>Write /Users/dev/Desktop/Test Project Usama/tests/unit/csv.test.ts</summary>

```
import { describe, expect, it } from 'vitest';
import { calculateLoan, type LoanInput, type LoanResult } from '../../src/engine/amortize';
import { CSV_FILENAME, CSV_HEADER, centsToPlain, scheduleCsv } from '../../src/ui/csv';

const TODAY = new Date(2026, 10, 6);

function rows(principal: number, rate: number, years: number, today = TODAY): LoanResult['rows'] {
  const input: LoanInput = {
    principalCents: Math.round(principal * 100),
    annualRatePercent: rate,
    termYears: years,
    extraMonthlyCents: 0,
    today,
  };
  const outcome = calculateLoan(input);
  if (!outcome.ok) throw new Error(outcome.error);
  return outcome.result.rows;
}

const lines = (csv: string): string[] => csv.split('\r\n').filter((line) => line !== '');

describe('Schedule CSV (L3.4, L3.5, L3.10)', () => {
  const csv = scheduleCsv(rows(300_000, 6, 30));

  it('L3.4: file name and exact header line', () => {
    expect(CSV_FILENAME).toBe('mortgage-schedule.csv');
    expect(CSV_HEADER).toBe('Payment number,Date,Payment,Principal,Interest,Extra payment,Balance');
    expect(lines(csv)[0]).toBe(CSV_HEADER);
  });

  it('L3.4: 360 data lines; line 2 is exactly "1,2026-12,1798.65,298.65,1500.00,0.00,299701.35"', () => {
    expect(lines(csv)).toHaveLength(361);
    expect(lines(csv)[1]).toBe('1,2026-12,1798.65,298.65,1500.00,0.00,299701.35');
    expect(lines(csv)[360]).toBe('360,2056-11,1800.09,1791.13,8.96,0.00,0.00');
  });

  it('L3.5: commas only as separators, "." decimals, exactly 2 decimals, no symbols or thousands separators', () => {
    for (const line of lines(csv).slice(1)) {
      const cells = line.split(',');
      expect(cells).toHaveLength(7);
      expect(cells[0]).toMatch(/^\d+$/);
      expect(cells[1]).toMatch(/^\d{4}-\d{2}$/);
      for (const amount of cells.slice(2)) expect(amount).toMatch(/^\d+\.\d{2}$/);
    }
    expect(csv).not.toMatch(/[$€£]/);
  });

  it('lines end with CRLF and the file ends with one line break', () => {
    expect(csv.startsWith(`${CSV_HEADER}\r\n1,`)).toBe(true);
    expect(csv.endsWith('0.00\r\n')).toBe(true);
    expect(csv).not.toMatch(/[^\r]\n/);
  });

  it('L3.10: on 15 March 2027 the dates run from 2027-04 to 2057-03', () => {
    const later = lines(scheduleCsv(rows(300_000, 6, 30, new Date(2027, 2, 15))));
    expect(later[1]?.split(',')[1]).toBe('2027-04');
    expect(later[360]?.split(',')[1]).toBe('2057-03');
  });

  it('maximum values are written in full (no exponent, no thousands separators)', () => {
    const big = lines(scheduleCsv(rows(100_000_000, 30, 40)));
    expect(big).toHaveLength(481);
    expect(big[1]).toBe('1,2026-12,2500017.80,17.80,2500000.00,0.00,99999982.20');
    expect(big.join('')).not.toMatch(/e\+|NaN|Infinity|-/.source.replace('|-', ''));
  });

  it.each([
    [0, '0.00'],
    [5, '0.05'],
    [179865, '1798.65'],
    [120002280306, '1200022803.06'],
  ])('centsToPlain(%d) = %s', (cents, text) => {
    expect(centsToPlain(cents)).toBe(text);
  });
});
```

</details>

<details><summary>Shell: Run the CSV tests</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npx vitest run tests/unit/csv.test.ts 2>&1 | grep -E '×|✓|Tests |Expected|Received|AssertionError' | head -20
```

Output:

```
      Tests  10 passed (10)
```

</details>

That passes, but one assertion I wrote is convoluted (a regex built and then edited at runtime). Simplifying it:

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/tests/unit/csv.test.ts</summary>

Replace:

```
    expect(big.join('')).not.toMatch(/e\+|NaN|Infinity|-/.source.replace('|-', ''));
```

with:

```
    expect(big.join('\n')).not.toMatch(/e\+|NaN|Infinity/);
```

</details>

<details><summary>Shell: Add schedule UI tests and run everything</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && cat >> tests/unit/ui.test.ts <<'EOF'

describe('Schedule (L3)', () => {
  const tableRows = (): string[][] =>
    [...root.querySelectorAll('.schedule tbody tr')].map((tr) => [...tr.children].map((td) => td.textContent ?? ''));
  const headers = (): string[] => [...root.querySelectorAll('.schedule thead th')].map((th) => th.textContent ?? '');
  const scheduleText = (): string => root.querySelector('.schedule-body')?.textContent ?? '';
  const clickMode = (mode: 'monthly' | 'yearly'): void =>
    root.querySelector<HTMLButtonElement>(`.schedule [data-mode="${mode}"]`)!.click();

  it('L3.1: monthly by default, 360 rows, the seven columns, and row 1', () => {
    start();
    enter({ homePrice: '300000', downPayment: '0' });
    expect(root.querySelector('.schedule [data-mode="monthly"]')?.getAttribute('aria-pressed')).toBe('true');
    expect(headers()).toEqual(['Payment number', 'Date', 'Payment', 'Principal', 'Interest', 'Extra payment', 'Balance']);
    expect(tableRows()).toHaveLength(360);
    expect(tableRows()[0]).toEqual(['1', 'December 2026', '$1,798.65', '$298.65', '$1,500.00', '$0.00', '$299,701.35']);
  });

  it('L3.2: the last row is 360, November 2056, 1,800.09, 1,791.13, 8.96, 0.00, 0.00', () => {
    start();
    enter({ homePrice: '300000', downPayment: '0' });
    expect(tableRows()[359]).toEqual(['360', 'November 2056', '$1,800.09', '$1,791.13', '$8.96', '$0.00', '$0.00']);
  });

  it('L3.3: yearly view has 30 rows; year 1 is 21,583.80 / 3,684.00 / 17,899.80 / 296,316.00', () => {
    start();
    enter({ homePrice: '300000', downPayment: '0' });
    clickMode('yearly');
    expect(root.querySelector('.schedule [data-mode="yearly"]')?.getAttribute('aria-pressed')).toBe('true');
    expect(root.querySelector('.schedule [data-mode="monthly"]')?.getAttribute('aria-pressed')).toBe('false');
    expect(headers()).toEqual(['Year', 'Payment', 'Principal', 'Interest', 'Extra payment', 'Ending balance']);
    expect(tableRows()).toHaveLength(30);
    expect(tableRows()[0]).toEqual(['1', '$21,583.80', '$3,684.00', '$17,899.80', '$0.00', '$296,316.00']);
    clickMode('monthly');
    expect(tableRows()).toHaveLength(360);
  });

  it('the chosen view stays when an input changes', () => {
    start();
    clickMode('yearly');
    type('termYears', '15');
    expect(tableRows()).toHaveLength(15);
  });

  it('L3.4 / L3.5: Download CSV saves mortgage-schedule.csv with monthly rows, even in yearly view', () => {
    const download = vi.fn();
    start({}, { download });
    enter({ homePrice: '300000', downPayment: '0' });
    clickMode('yearly');
    root.querySelector<HTMLButtonElement>('.schedule .csv-button')!.click();
    expect(download).toHaveBeenCalledTimes(1);
    const [filename, text] = download.mock.calls[0] as [string, string];
    expect(filename).toBe('mortgage-schedule.csv');
    const lines = text.split('\r\n').filter(Boolean);
    expect(lines[0]).toBe('Payment number,Date,Payment,Principal,Interest,Extra payment,Balance');
    expect(lines).toHaveLength(361);
    expect(lines[1]).toBe('1,2026-12,1798.65,298.65,1500.00,0.00,299701.35');
  });

  it('L3.6: 1 / 0 / 0.001 / 1 → 12 rows; rows 1–11 pay 0.08, row 12 pays 0.12, last balance 0.00', () => {
    start();
    enter({ homePrice: '1', downPayment: '0', interestRate: '0.001', termYears: '1' });
    const rows = tableRows();
    expect(rows).toHaveLength(12);
    rows.slice(0, 11).forEach((row) => expect(row[2]).toBe('$0.08'));
    expect(rows[11]?.[2]).toBe('$0.12');
    expect(rows[11]?.[6]).toBe('$0.00');
  });

  it('L3.7: maximum values → exactly 480 rows, last balance 0.00, no negative, NaN or Infinity cell', () => {
    start();
    enter({ homePrice: '100000000', downPayment: '0', interestRate: '30', termYears: '40' });
    const rows = tableRows();
    expect(rows).toHaveLength(480);
    expect(rows[479]?.[6]).toBe('$0.00');
    expect(scheduleText()).not.toMatch(/NaN|Infinity|-\$|\$-/);
  });

  it('L3.8: an invalid input replaces the schedule with E8 (no rows, no buttons); fixing it brings the new schedule', () => {
… (53 more lines not shown)
```

Output:

```
 Test Files  7 passed (7)
      Tests  290 passed (290)
tsc OK
```

</details>

All 290 tests pass. Now the browser: screenshots, render time for 480 rows, and a real CSV download.

<details><summary>Shell: Build and serve the app for browser checks</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm run build 2>&1 | tail -1 && npx vite preview --port 4173 --strictPort
```

</details>

<details><summary>Browser: resize</summary>

```json
{
  "width": 1280,
  "height": 900
}
```

</details>

<details><summary>Browser: emulate_media</summary>

```json
{
  "colorScheme": "light"
}
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

Output:

````
### Ran Playwright code
```js
await page.goto('http://localhost:4173/');
```
### Page
- Page URL: http://localhost:4173/
- Page Title: Mortgage Calculator
### Snapshot
- [Snapshot](.playwright-mcp/page-2026-11-06T14-56-38-028Z.yml)
````

</details>

Timing a full recalculation plus render of the 480-row table, the worst case, measured in the real browser:

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => {\n  const set = (id, v) => { const el = document.getElementById(id); el.value = v; };\n  set('field-homePrice', '100000000'); set('field-downPayment', '0'); set('field-interestRate', '30');\n  const term = document.getElementById('field-termYears');\n  const times = [];\n  for (let i = 0; i < 10; i++) {\n    term.value = i % 2 ? '39' : '40';\n    const t0 = performance.now();\n    term.dispatchEvent(new Event('input', { bubbles: true }));\n    document.body.offsetHeight; // force layout\n    times.push(performance.now() - t0);\n  }\n  term.value = '40'; term.dispatchEvent(new Event('input', { bubbles: true }));\n  times.sort((a, b) => a - b);\n  return { rows: document.querySelectorAll('.schedule tbody tr').length, medianMs: times[5].toFixed(1), maxMs: times[9].toFixed(1), scrollWidth: document.documentElement.scrollWidth };\n}"
}
```

Output:

````
### Result
{
  "rows": 480,
  "medianMs": "147.4",
  "maxMs": "479.1",
  "scrollWidth": 1280
}
### Ran Playwright code
```js
await page.evaluate('() => {\n  const set = (id, v) => { const el = document.getElementById(id); el.value = v; };\n  set(\'field-homePrice\', \'100000000\'); set(\'field-downPayment\', \'0\'); set(\'field-interestRate\', \'30\');\n  const term = document.getElementById(\'field-termYears\');\n  const times = [];\n  for (let i = 0; i < 10; i++) {\n    term.value = i % 2 ? \'39\' : \'40\';\n    const t0 = performance.now();\n    term.dispatchEvent(new Event(\'input\', { bubbles: true }));\n    document.body.offsetHeight; // force layout\n    times.push(performance.now() - t0);\n  }\n  term.value = \'40\'; term.dispatchEvent(new Event(\'input\', { bubbles: true }));\n  times.sort((a, b) => a - b);\n  return { rows: document.querySelectorAll(\'.schedule tbody tr\').length, medianMs: times[5].toFixed(1), maxMs: times[9].toFixed(1), scrollWidth: document.documentElement.scrollWidth };\n}');
```
````

</details>

A 147 ms median per keystroke is too slow: anything over about 100 ms feels laggy while typing. Before changing anything I'll measure where the time actually goes:

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => {\n  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });\n  const month = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });\n  let t0 = performance.now();\n  for (let i = 0; i < 2880; i++) money.format(i * 1234.56);\n  const moneyMs = performance.now() - t0;\n  t0 = performance.now();\n  for (let i = 0; i < 480; i++) month.format(new Date(2026, i, 1));\n  const monthMs = performance.now() - t0;\n  t0 = performance.now();\n  const tb = document.createElement('tbody'); const frag = document.createDocumentFragment();\n  for (let r = 0; r < 480; r++) { const tr = document.createElement('tr'); for (let c = 0; c < 7; c++) { const td = document.createElement('td'); td.textContent = 'x'; tr.append(td); } frag.append(tr); }\n  tb.append(frag);\n  const domMs = performance.now() - t0;\n  const scroll = document.querySelector('.table-scroll');\n  t0 = performance.now();\n  scroll.style.display = 'none'; document.body.offsetHeight; scroll.style.display = ''; document.body.offsetHeight;\n  const layoutMs = performance.now() - t0;\n  return { moneyFormat2880: moneyMs.toFixed(1), monthFormat480: monthMs.toFixed(1), buildDom3360cells: domMs.toFixed(1), tableLayout: layoutMs.toFixed(1) };\n}"
}
```

Output:

````
### Result
{
  "moneyFormat2880": "3.5",
  "monthFormat480": "0.8",
  "buildDom3360cells": "2.6",
  "tableLayout": "46.1"
}
### Ran Playwright code
```js
await page.evaluate('() => {\n  const money = new Intl.NumberFormat(\'en-US\', { style: \'currency\', currency: \'USD\' });\n  const month = new Intl.DateTimeFormat(\'en-US\', { month: \'long\', year: \'numeric\' });\n  let t0 = performance.now();\n  for (let i = 0; i < 2880; i++) money.format(i * 1234.56);\n  const moneyMs = performance.now() - t0;\n  t0 = performance.now();\n  for (let i = 0; i < 480; i++) month.format(new Date(2026, i, 1));\n  const monthMs = performance.now() - t0;\n  t0 = performance.now();\n  const tb = document.createElement(\'tbody\'); const frag = document.createDocumentFragment();\n  for (let r = 0; r < 480; r++) { const tr = document.createElement(\'tr\'); for (let c = 0; c < 7; c++) { const td = document.createElement(\'td\'); td.textContent = \'x\'; tr.append(td); } frag.append(tr); }\n  tb.append(frag);\n  const domMs = performance.now() - t0;\n  const scroll = document.querySelector(\'.table-scroll\');\n  t0 = performance.now();\n  scroll.style.display = \'none\'; document.body.offsetHeight; scroll.style.display = \'\'; document.body.offsetHeight;\n  const layoutMs = performance.now() - t0;\n  return { moneyFormat2880: moneyMs.toFixed(1), monthFormat480: monthMs.toFixed(1), buildDom3360cells: domMs.toFixed(1), tableLayout: layoutMs.toFixed(1) };\n}');
```
````

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => {\n  const style = document.createElement('style');\n  style.textContent = '.data-table{table-layout:fixed;min-width:760px}';\n  document.head.append(style);\n  const term = document.getElementById('field-termYears');\n  const times = [];\n  for (let i = 0; i < 10; i++) {\n    term.value = i % 2 ? '39' : '40';\n    const t0 = performance.now();\n    term.dispatchEvent(new Event('input', { bubbles: true }));\n    document.body.offsetHeight;\n    times.push(performance.now() - t0);\n  }\n  times.sort((a, b) => a - b);\n  // Engine-only cost, measured by making the inputs invalid-free but skipping render is not possible here,\n  // so also time an update that renders only a message (E8) for comparison.\n  const price = document.getElementById('field-homePrice');\n  const t1 = performance.now(); price.value = 'x'; price.dispatchEvent(new Event('input', { bubbles: true })); document.body.offsetHeight;\n  const messageOnly = performance.now() - t1;\n  price.value = '100000000'; price.dispatchEvent(new Event('input', { bubbles: true }));\n  return { fixedMedianMs: times[5].toFixed(1), fixedMaxMs: times[9].toFixed(1), messageOnlyMs: messageOnly.toFixed(1) };\n}"
}
```

Output:

````
### Result
{
  "fixedMedianMs": "30.4",
  "fixedMaxMs": "235.1",
  "messageOnlyMs": "27.1"
}
### Ran Playwright code
```js
await page.evaluate('() => {\n  const style = document.createElement(\'style\');\n  style.textContent = \'.data-table{table-layout:fixed;min-width:760px}\';\n  document.head.append(style);\n  const term = document.getElementById(\'field-termYears\');\n  const times = [];\n  for (let i = 0; i < 10; i++) {\n    term.value = i % 2 ? \'39\' : \'40\';\n    const t0 = performance.now();\n    term.dispatchEvent(new Event(\'input\', { bubbles: true }));\n    document.body.offsetHeight;\n    times.push(performance.now() - t0);\n  }\n  times.sort((a, b) => a - b);\n  // Engine-only cost, measured by making the inputs invalid-free but skipping render is not possible here,\n  // so also time an update that renders only a message (E8) for comparison.\n  const price = document.getElementById(\'field-homePrice\');\n  const t1 = performance.now(); price.value = \'x\'; price.dispatchEvent(new Event(\'input\', { bubbles: true })); document.body.offsetHeight;\n  const messageOnly = performance.now() - t1;\n  price.value = \'100000000\'; price.dispatchEvent(new Event(\'input\', { bubbles: true }));\n  return { fixedMedianMs: times[5].toFixed(1), fixedMaxMs: times[9].toFixed(1), messageOnlyMs: messageOnly.toFixed(1) };\n}');
```
````

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/src/ui/styles.css</summary>

Replace:

```
.data-table {
  width: 100%;
  border-collapse: collapse;
```

with:

```
.data-table {
  width: 100%;
  /* Fixed layout sizes columns from the header row instead of measuring all 3,360 cells:
     a 480-row update went from ~147 ms to ~30 ms in Chromium. */
  table-layout: fixed;
  min-width: 56rem; /* room for the largest amounts; narrower screens scroll inside .table-scroll */
  border-collapse: collapse;
```

</details>

<details><summary>Shell: Rebuild with fixed table layout</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm run build 2>&1 | tail -1
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => {\n  const set = (id, v) => { document.getElementById(id).value = v; };\n  set('field-homePrice', '100000000'); set('field-downPayment', '0'); set('field-interestRate', '30');\n  const term = document.getElementById('field-termYears');\n  const times = [];\n  for (let i = 0; i < 20; i++) {\n    term.value = i % 2 ? '39' : '40';\n    const t0 = performance.now();\n    term.dispatchEvent(new Event('input', { bubbles: true }));\n    document.body.offsetHeight;\n    times.push(performance.now() - t0);\n  }\n  times.sort((a, b) => a - b);\n  // overflow check: does any cell's content exceed its width?\n  term.value = '40'; term.dispatchEvent(new Event('input', { bubbles: true }));\n  const clipped = [...document.querySelectorAll('.data-table td, .data-table th')].filter((c) => c.scrollWidth > c.clientWidth).length;\n  return { medianMs: times[10].toFixed(1), p90Ms: times[18].toFixed(1), rows: document.querySelectorAll('.schedule tbody tr').length, clippedCells: clipped };\n}"
}
```

Output:

````
### Result
{
  "medianMs": "86.5",
  "p90Ms": "409.7",
  "rows": 480,
  "clippedCells": 0
}
### Ran Playwright code
```js
await page.evaluate('() => {\n  const set = (id, v) => { document.getElementById(id).value = v; };\n  set(\'field-homePrice\', \'100000000\'); set(\'field-downPayment\', \'0\'); set(\'field-interestRate\', \'30\');\n  const term = document.getElementById(\'field-termYears\');\n  const times = [];\n  for (let i = 0; i < 20; i++) {\n    term.value = i % 2 ? \'39\' : \'40\';\n    const t0 = performance.now();\n    term.dispatchEvent(new Event(\'input\', { bubbles: true }));\n    document.body.offsetHeight;\n    times.push(performance.now() - t0);\n  }\n  times.sort((a, b) => a - b);\n  // overflow check: does any cell\'s content exceed its width?\n  term.value = \'40\'; term.dispatchEvent(new Event(\'input\', { bubbles: true }));\n  const clipped = [...document.querySelectorAll(\'.data-table td, .data-table th\')].filter((c) => c.scrollWidth > c.clientWidth).length;\n  return { medianMs: times[10].toFixed(1), p90Ms: times[18].toFixed(1), rows: document.querySelectorAll(\'.schedule tbody tr\').length, clippedCells: clipped };\n}');
```
````

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => {\n  const term = document.getElementById('field-termYears');\n  const script = [], layout = [];\n  for (let i = 0; i < 20; i++) {\n    term.value = i % 2 ? '39' : '40';\n    const t0 = performance.now();\n    term.dispatchEvent(new Event('input', { bubbles: true }));\n    const t1 = performance.now();\n    document.body.offsetHeight;\n    const t2 = performance.now();\n    script.push(t1 - t0); layout.push(t2 - t1);\n  }\n  const med = (a) => [...a].sort((x, y) => x - y)[10].toFixed(1);\n  const max = (a) => Math.max(...a).toFixed(1);\n  return { scriptMedian: med(script), scriptMax: max(script), layoutMedian: med(layout), layoutMax: max(layout) };\n}"
}
```

Output:

````
### Result
{
  "scriptMedian": "11.1",
  "scriptMax": "159.6",
  "layoutMedian": "15.4",
  "layoutMax": "44.3"
}
### Ran Playwright code
```js
await page.evaluate('() => {\n  const term = document.getElementById(\'field-termYears\');\n  const script = [], layout = [];\n  for (let i = 0; i < 20; i++) {\n    term.value = i % 2 ? \'39\' : \'40\';\n    const t0 = performance.now();\n    term.dispatchEvent(new Event(\'input\', { bubbles: true }));\n    const t1 = performance.now();\n    document.body.offsetHeight;\n    const t2 = performance.now();\n    script.push(t1 - t0); layout.push(t2 - t1);\n  }\n  const med = (a) => [...a].sort((x, y) => x - y)[10].toFixed(1);\n  const max = (a) => Math.max(...a).toFixed(1);\n  return { scriptMedian: med(script), scriptMax: max(script), layoutMedian: med(layout), layoutMax: max(layout) };\n}');
```
````

</details>

<details><summary>Shell: Reuse table rows across updates</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/schedule.ts'); t=p.read_text()
start=t.index('  function table(caption: string, headers: string[], data: string[][]): HTMLElement {')
end=t.index('  function render(): void {')
new_table='''  /** The table currently on screen, kept so updates can reuse its rows and cells. */
  let current: { mode: ScheduleMode; region: HTMLElement; tbody: HTMLTableSectionElement } | null = null;

  function buildTable(caption: string, headers: string[]): { region: HTMLElement; tbody: HTMLTableSectionElement } {
    // A focusable, labelled region so keyboard users can scroll it (L10.3).
    const region = document.createElement('div');
    region.className = 'table-scroll';
    region.tabIndex = 0;
    region.setAttribute('role', 'region');
    region.setAttribute('aria-label', UI_TEXT.scheduleRegionLabel);

    const tableEl = document.createElement('table');
    tableEl.className = 'data-table';
    const captionEl = document.createElement('caption');
    captionEl.className = 'visually-hidden';
    captionEl.textContent = caption;

    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    for (const header of headers) {
      const th = cell('th', header);
      th.scope = 'col';
      headRow.append(th);
    }
    thead.append(headRow);
    const tbody = document.createElement('tbody');
    tableEl.append(captionEl, thead, tbody);
    region.append(tableEl);
    return { region, tbody };
  }

  /**
   * Writes `data` into the body, reusing existing rows and cells and only changing text that
   * differs. Recreating 3,360 cells on every keystroke caused garbage-collection pauses.
   */
  function fillBody(tbody: HTMLTableSectionElement, data: string[][]): void {
    const existing = tbody.rows;
    const fragment = document.createDocumentFragment();
    data.forEach((values, index) => {
      const row = existing[index];
      if (row) {
        values.forEach((value, column) => {
          const td = row.cells[column];
          if (td && td.textContent !== value) td.textContent = value;
        });
        return;
      }
      const tr = document.createElement('tr');
      for (const value of values) tr.append(cell('td', value));
      fragment.append(tr);
    });
    tbody.append(fragment);
    while (tbody.rows.length > data.length) tbody.deleteRow(-1);
  }

  function table(caption: string, headers: string[], data: string[][]): void {
    if (!current || current.mode !== mode || !current.region.isConnected) {
      current = { mode, ...buildTable(caption, headers) };
      body.replaceChildren(current.region);
    }
    fillBody(current.tbody, data);
  }

'''
t=t[:start]+new_table+t[end:]
t=t.replace("""    if (mode === 'monthly') {
      body.replaceChildren(
        table(""","""    if (mode === 'monthly') {
      table(""")
t=t.replace("""          ]),
        ),
      );
      return;
    }

… (22 more lines not shown)
```

Output:

```
tsc OK
  function render(): void {
    toolbar.hidden = false;
    monthlyButton.setAttribute('aria-pressed', String(mode === 'monthly'));
    yearlyButton.setAttribute('aria-pressed', String(mode === 'yearly'));

    if (mode === 'monthly') {
      table(
          UI_TEXT.scheduleCaptionMonthly,
          [
            UI_TEXT.colPaymentNumber,
            UI_TEXT.colDate,
            UI_TEXT.colPayment,
            UI_TEXT.colPrincipal,
            UI_TEXT.colInterest,
            UI_TEXT.colExtra,
            UI_TEXT.colBalance,
          ],
          rows.map((row) => [
            String(row.number),
            format.month(row),
            format.money(row.paymentCents),
            format.money(row.principalCents),
            format.money(row.interestCents),
            format.money(row.extraCents),
            format.money(row.balanceCents),
          ]),
      );
      return;
    }

    table(
        UI_TEXT.scheduleCaptionYearly,
        [UI_TEXT.colYear, UI_TEXT.colPayment, UI_TEXT.colPrincipal, UI_TEXT.colInterest, UI_TEXT.colExtra, UI_TEXT.colEndBalance],
        toYearly([...rows]).map((year) => [
          String(year.year),
          format.money(year.paymentCents),
          format.money(year.principalCents),
          format.money(year.interestCents),
          format.money(year.extraCents),
          format.money(year.endBalanceCents),
        ]),
    );
  }
```

</details>

That works, but my script left the indentation of `render()` uneven. Tidying it:

<details><summary>Shell: Tidy render function, run tests and build</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/schedule.ts'); t=p.read_text()
start=t.index('  function render(): void {')
end=t.index('\n  }\n', start)+4
new='''  function render(): void {
    toolbar.hidden = false;
    monthlyButton.setAttribute('aria-pressed', String(mode === 'monthly'));
    yearlyButton.setAttribute('aria-pressed', String(mode === 'yearly'));

    if (mode === 'monthly') {
      table(
        UI_TEXT.scheduleCaptionMonthly,
        [
          UI_TEXT.colPaymentNumber,
          UI_TEXT.colDate,
          UI_TEXT.colPayment,
          UI_TEXT.colPrincipal,
          UI_TEXT.colInterest,
          UI_TEXT.colExtra,
          UI_TEXT.colBalance,
        ],
        rows.map((row) => [
          String(row.number),
          format.month(row),
          format.money(row.paymentCents),
          format.money(row.principalCents),
          format.money(row.interestCents),
          format.money(row.extraCents),
          format.money(row.balanceCents),
        ]),
      );
      return;
    }

    table(
      UI_TEXT.scheduleCaptionYearly,
      [UI_TEXT.colYear, UI_TEXT.colPayment, UI_TEXT.colPrincipal, UI_TEXT.colInterest, UI_TEXT.colExtra, UI_TEXT.colEndBalance],
      toYearly([...rows]).map((year) => [
        String(year.year),
        format.money(year.paymentCents),
        format.money(year.principalCents),
        format.money(year.interestCents),
        format.money(year.extraCents),
        format.money(year.endBalanceCents),
      ]),
    );
  }
'''
t=t[:start]+new+t[end:]
p.write_text(t)
EOF
npx tsc --noEmit && echo tsc OK && npm test 2>&1 | grep -E '×|Test Files|Tests ' && npm run build 2>&1 | tail -1
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => {\n  const set = (id, v) => { document.getElementById(id).value = v; };\n  set('field-homePrice', '100000000'); set('field-downPayment', '0'); set('field-interestRate', '30');\n  const term = document.getElementById('field-termYears');\n  const total = [];\n  for (let i = 0; i < 40; i++) {\n    term.value = i % 2 ? '39' : '40';\n    const t0 = performance.now();\n    term.dispatchEvent(new Event('input', { bubbles: true }));\n    document.body.offsetHeight;\n    total.push(performance.now() - t0);\n  }\n  const s = [...total].sort((a, b) => a - b);\n  return { medianMs: s[20].toFixed(1), p90Ms: s[36].toFixed(1), maxMs: s[39].toFixed(1), rows: document.querySelectorAll('.schedule tbody tr').length };\n}"
}
```

Output:

````
### Result
{
  "medianMs": "25.6",
  "p90Ms": "231.4",
  "maxMs": "284.8",
  "rows": 468
}
### Ran Playwright code
```js
await page.evaluate('() => {\n  const set = (id, v) => { document.getElementById(id).value = v; };\n  set(\'field-homePrice\', \'100000000\'); set(\'field-downPayment\', \'0\'); set(\'field-interestRate\', \'30\');\n  const term = document.getElementById(\'field-termYears\');\n  const total = [];\n  for (let i = 0; i < 40; i++) {\n    term.value = i % 2 ? \'39\' : \'40\';\n    const t0 = performance.now();\n    term.dispatchEvent(new Event(\'input\', { bubbles: true }));\n    document.body.offsetHeight;\n    total.push(performance.now() - t0);\n  }\n  const s = [...total].sort((a, b) => a - b);\n  return { medianMs: s[20].toFixed(1), p90Ms: s[36].toFixed(1), maxMs: s[39].toFixed(1), rows: document.querySelectorAll(\'.schedule tbody tr\').length };\n}');
```
````

</details>

28 DOM tests now fail, and the browser still shows spikes, so the reuse change needs work. First, the error from a failing test:

<details><summary>Shell: Show the error from one failing UI test</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npx vitest run tests/unit/ui.test.ts -t "L1.5" 2>&1 | grep -E 'Error|at .*schedule|❯ src' | head -8
```

Output:

```
AssertionError: expected null to be '$1,610.46' // Object.is equality
```

</details>

<details><summary>Shell: Probe happy-dom table API support</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && cat > /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad/probe.test.ts <<'EOF'
// @vitest-environment happy-dom
import { it } from 'vitest';
it('probe', () => {
  const t = document.createElement('table'); const tb = document.createElement('tbody'); t.append(tb);
  const tr = document.createElement('tr'); tr.append(document.createElement('td')); tb.append(tr);
  console.log('rows', typeof tb.rows, tb.rows?.length, 'cells', typeof tr.cells, tr.cells?.length, 'deleteRow', typeof tb.deleteRow);
});
EOF
cp /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad/probe.test.ts tests/unit/zz-probe.test.ts && npx vitest run tests/unit/zz-probe.test.ts 2>&1 | grep -E 'rows|Error' | head -5; rm tests/unit/zz-probe.test.ts
```

Output:

```
(Bash completed with no output)
```

</details>

<details><summary>Shell: Run happy-dom probe with full output</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && cp /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad/probe.test.ts tests/unit/zz-probe.test.ts && npx vitest run tests/unit/zz-probe.test.ts --reporter=verbose 2>&1 | tail -15; rm tests/unit/zz-probe.test.ts
```

Output:

```
 RUN  v5.1.0 /Users/dev/Desktop/Test Project Usama

stdout | tests/unit/zz-probe.test.ts > probe
rows undefined undefined cells object 1 deleteRow function

 ✓ tests/unit/zz-probe.test.ts > probe 5ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  19:58:45
   Duration  560ms (environment 90%, import 4%, transform 3%, tests 2%, worker 1%)
```

</details>

<details><summary>Shell: Use children instead of rows/cells and rerun</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/schedule.ts'); t=p.read_text()
old='''    const existing = tbody.rows;
    const fragment = document.createDocumentFragment();
    data.forEach((values, index) => {
      const row = existing[index];
      if (row) {
        values.forEach((value, column) => {
          const td = row.cells[column];
          if (td && td.textContent !== value) td.textContent = value;
        });
        return;
      }'''
new='''    // `children` rather than `rows`/`cells`: same result, and it works in every DOM implementation.
    const existing = tbody.children;
    const fragment = document.createDocumentFragment();
    data.forEach((values, index) => {
      const row = existing[index];
      if (row) {
        values.forEach((value, column) => {
          const td = row.children[column];
          if (td && td.textContent !== value) td.textContent = value;
        });
        return;
      }'''
assert t.count(old)==1; t=t.replace(old,new)
old2='''    while (tbody.rows.length > data.length) tbody.deleteRow(-1);'''
assert t.count(old2)==1; t=t.replace(old2,'''    while (tbody.children.length > data.length) tbody.lastElementChild?.remove();''')
p.write_text(t)
EOF
npx tsc --noEmit && echo tsc OK && npm test 2>&1 | grep -E '×|Test Files|Tests '
```

Output:

```
tsc OK
 Test Files  7 passed (7)
      Tests  290 passed (290)
```

</details>

All 290 pass again. I'll add a test that reused rows never keep stale values (shrinking and regrowing the table), then go back to the timing spikes:

<details><summary>Shell: Add stale-row regression test</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('tests/unit/ui.test.ts'); t=p.read_text()
anchor="""  it('the table is a labelled, keyboard-focusable scroll region with a caption and column headers', () => {"""
new="""  it('reused rows never keep stale values: 30 → 1 → 30 years, then a new rate', () => {
    start();
    enter({ homePrice: '300000', downPayment: '0' });
    type('termYears', '1');
    expect(tableRows()).toHaveLength(12);
    type('termYears', '30');
    expect(tableRows()).toHaveLength(360);
    expect(tableRows()[359]).toEqual(['360', 'November 2056', '$1,800.09', '$1,791.13', '$8.96', '$0.00', '$0.00']);
    type('interestRate', '5');
    expect(tableRows()[0]).toEqual(['1', 'December 2026', '$1,610.46', '$360.46', '$1,250.00', '$0.00', '$299,639.54']);
    expect(root.querySelectorAll('.schedule tbody')).toHaveLength(1);
  });

""" + anchor
assert t.count(anchor)==1; p.write_text(t.replace(anchor,new))
EOF
npx vitest run tests/unit/ui.test.ts -t "reused rows" 2>&1 | grep -E 'Tests |Expected|Received|\+ |\- ' | head
```

</details>

<details><summary>Shell: Rebuild for browser timing</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm run build 2>&1 | tail -1
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "async () => {\n  const set = (id, v) => { document.getElementById(id).value = v; };\n  set('field-homePrice', '100000000'); set('field-downPayment', '0'); set('field-interestRate', '30');\n  const term = document.getElementById('field-termYears');\n  const script = [], layout = [];\n  for (let i = 0; i < 40; i++) {\n    term.value = i % 2 ? '39' : '40';\n    const t0 = performance.now();\n    term.dispatchEvent(new Event('input', { bubbles: true }));\n    const t1 = performance.now();\n    document.body.offsetHeight;\n    script.push(t1 - t0); layout.push(performance.now() - t1);\n    await new Promise((r) => setTimeout(r, 30)); // like a person typing, not a tight loop\n  }\n  const q = (a, p) => [...a].sort((x, y) => x - y)[Math.floor(p * (a.length - 1))].toFixed(1);\n  return { scriptMedian: q(script, 0.5), scriptP90: q(script, 0.9), scriptMax: q(script, 1), layoutMedian: q(layout, 0.5), layoutP90: q(layout, 0.9), layoutMax: q(layout, 1) };\n}"
}
```

Output:

````
### Result
{
  "scriptMedian": "7.2",
  "scriptP90": "166.7",
  "scriptMax": "339.8",
  "layoutMedian": "10.0",
  "layoutP90": "14.8",
  "layoutMax": "25.5"
}
### Ran Playwright code
```js
await page.evaluate('async () => {\n  const set = (id, v) => { document.getElementById(id).value = v; };\n  set(\'field-homePrice\', \'100000000\'); set(\'field-downPayment\', \'0\'); set(\'field-interestRate\', \'30\');\n  const term = document.getElementById(\'field-termYears\');\n  const script = [], layout = [];\n  for (let i = 0; i < 40; i++) {\n    term.value = i % 2 ? \'39\' : \'40\';\n    const t0 = performance.now();\n    term.dispatchEvent(new Event(\'input\', { bubbles: true }));\n    const t1 = performance.now();\n    document.body.offsetHeight;\n    script.push(t1 - t0); layout.push(performance.now() - t1);\n    await new Promise((r) => setTimeout(r, 30)); // like a person typing, not a tight loop\n  }\n  const q = (a, p) => [...a].sort((x, y) => x - y)[Math.floor(p * (a.length - 1))].toFixed(1);\n  return { scriptMedian: q(script, 0.5), scriptP90: q(script, 0.9), scriptMax: q(script, 1), layoutMedian: q(layout, 0.5), layoutP90: q(layout, 0.9), layoutMax: q(layout, 1) };\n}');
```
````

</details>

<details><summary>Shell: Benchmark the engine alone in Node</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && cat > tests/unit/zz-bench.test.ts <<'EOF'
import { it } from 'vitest';
import { calculateLoan } from '../../src/engine/amortize';
it('bench', () => {
  const times: number[] = [];
  for (let i = 0; i < 200; i++) {
    const t0 = performance.now();
    calculateLoan({ principalCents: 10_000_000_000, annualRatePercent: 30, termYears: i % 2 ? 39 : 40, extraMonthlyCents: 0, today: new Date(2026, 10, 6) });
    times.push(performance.now() - t0);
  }
  times.sort((a, b) => a - b);
  console.log('engine ms: median', times[100]!.toFixed(2), 'p90', times[180]!.toFixed(2), 'max', times[199]!.toFixed(2));
});
EOF
npx vitest run tests/unit/zz-bench.test.ts 2>&1 | grep 'engine ms'; rm tests/unit/zz-bench.test.ts
```

Output:

```
(Bash completed with no output)
```

</details>

<details><summary>Shell: Rerun the engine benchmark with verbose output</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && cat > tests/unit/zz-bench.test.ts <<'EOF'
import { it } from 'vitest';
import { calculateLoan } from '../../src/engine/amortize';
it('bench', () => {
  const times: number[] = [];
  for (let i = 0; i < 200; i++) {
    const t0 = performance.now();
    calculateLoan({ principalCents: 10_000_000_000, annualRatePercent: 30, termYears: i % 2 ? 39 : 40, extraMonthlyCents: 0, today: new Date(2026, 10, 6) });
    times.push(performance.now() - t0);
  }
  times.sort((a, b) => a - b);
  console.log('engine ms: median', times[100]!.toFixed(2), 'p90', times[180]!.toFixed(2), 'max', times[199]!.toFixed(2));
});
EOF
npx vitest run tests/unit/zz-bench.test.ts --reporter=verbose 2>&1 | grep -E 'engine|Error|✓|×'; rm tests/unit/zz-bench.test.ts
```

Output:

```
engine ms: median 0.23 p90 0.50 max 8.34
 ✓ tests/unit/zz-bench.test.ts > bench 92ms
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "async () => {\n  const term = document.getElementById('field-termYears');\n  term.value = '40'; term.dispatchEvent(new Event('input', { bubbles: true }));\n  const same = [], changed = [];\n  for (let i = 0; i < 30; i++) {\n    let t0 = performance.now();\n    term.dispatchEvent(new Event('input', { bubbles: true })); // identical inputs: no cell text changes\n    same.push(performance.now() - t0);\n    await new Promise((r) => setTimeout(r, 30));\n  }\n  for (let i = 0; i < 30; i++) {\n    term.value = i % 2 ? '39' : '40';\n    let t0 = performance.now();\n    term.dispatchEvent(new Event('input', { bubbles: true }));\n    changed.push(performance.now() - t0);\n    await new Promise((r) => setTimeout(r, 30));\n  }\n  const q = (a, p) => [...a].sort((x, y) => x - y)[Math.floor(p * (a.length - 1))].toFixed(1);\n  return { noChange: { median: q(same, 0.5), p90: q(same, 0.9), max: q(same, 1) }, allCellsChange: { median: q(changed, 0.5), p90: q(changed, 0.9), max: q(changed, 1) } };\n}"
}
```

Output:

````
### Result
{
  "noChange": {
    "median": "2.9",
    "p90": "11.2",
    "max": "150.2"
  },
  "allCellsChange": {
    "median": "135.0",
    "p90": "159.4",
    "max": "173.5"
  }
}
### Ran Playwright code
```js
await page.evaluate('async () => {\n  const term = document.getElementById(\'field-termYears\');\n  term.value = \'40\'; term.dispatchEvent(new Event(\'input\', { bubbles: true }));\n  const same = [], changed = [];\n  for (let i = 0; i < 30; i++) {\n    let t0 = performance.now();\n    term.dispatchEvent(new Event(\'input\', { bubbles: true })); // identical inputs: no cell text changes\n    same.push(performance.now() - t0);\n    await new Promise((r) => setTimeout(r, 30));\n  }\n  for (let i = 0; i < 30; i++) {\n    term.value = i % 2 ? \'39\' : \'40\';\n    let t0 = performance.now();\n    term.dispatchEvent(new Event(\'input\', { bubbles: true }));\n    changed.push(performance.now() - t0);\n    await new Promise((r) => setTimeout(r, 30));\n  }\n  const q = (a, p) => [...a].sort((x, y) => x - y)[Math.floor(p * (a.length - 1))].toFixed(1);\n  return { noChange: { median: q(same, 0.5), p90: q(same, 0.9), max: q(same, 1) }, allCellsChange: { median: q(changed, 0.5), p90: q(changed, 0.9), max: q(changed, 1) } };\n}');
```
````

</details>

<details><summary>Shell: Swap a detached tbody instead of mutating cells</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/schedule.ts'); t=p.read_text()
start=t.index('  /**\n   * Writes `data` into the body, reusing existing rows')
end=t.index('  function table(caption: string, headers: string[], data: string[][]): void {')
new='''  /**
   * Builds a new body off-screen and swaps it in with one DOM operation. Measured in Chromium with
   * 480 rows: updating 3,360 attached cells one by one took ~135 ms per keystroke; building a
   * detached body and swapping it takes a few milliseconds.
   */
  function fillBody(oldBody: HTMLTableSectionElement, data: string[][]): HTMLTableSectionElement {
    const tbody = document.createElement('tbody');
    for (const values of data) {
      const tr = document.createElement('tr');
      for (const value of values) tr.append(cell('td', value));
      tbody.append(tr);
    }
    oldBody.replaceWith(tbody);
    return tbody;
  }

'''
t=t[:start]+new+t[end:]
old='''    fillBody(current.tbody, data);'''
assert t.count(old)==1
t=t.replace(old,'''    current.tbody = fillBody(current.tbody, data);''')
t=t.replace('''  /** The table currently on screen, kept so updates can reuse its rows and cells. */''','''  /** The table currently on screen; updates keep its header and scroll region and swap only the body. */''')
p.write_text(t)
EOF
npx tsc --noEmit && echo tsc OK && npm test 2>&1 | grep -E '×|Test Files|Tests ' && npm run build 2>&1 | tail -1
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "async () => {\n  const set = (id, v) => { document.getElementById(id).value = v; };\n  set('field-homePrice', '100000000'); set('field-downPayment', '0'); set('field-interestRate', '30');\n  const term = document.getElementById('field-termYears');\n  const total = [];\n  for (let i = 0; i < 40; i++) {\n    term.value = i % 2 ? '39' : '40';\n    const t0 = performance.now();\n    term.dispatchEvent(new Event('input', { bubbles: true }));\n    document.body.offsetHeight; // include layout\n    total.push(performance.now() - t0);\n    await new Promise((r) => setTimeout(r, 30));\n  }\n  const q = (a, p) => [...a].sort((x, y) => x - y)[Math.floor(p * (a.length - 1))].toFixed(1);\n  return { rows: document.querySelectorAll('.schedule tbody tr').length, median: q(total, 0.5), p90: q(total, 0.9), max: q(total, 1) };\n}"
}
```

Output:

````
### Result
{
  "rows": 468,
  "median": "31.7",
  "p90": "199.3",
  "max": "312.3"
}
### Ran Playwright code
```js
await page.evaluate('async () => {\n  const set = (id, v) => { document.getElementById(id).value = v; };\n  set(\'field-homePrice\', \'100000000\'); set(\'field-downPayment\', \'0\'); set(\'field-interestRate\', \'30\');\n  const term = document.getElementById(\'field-termYears\');\n  const total = [];\n  for (let i = 0; i < 40; i++) {\n    term.value = i % 2 ? \'39\' : \'40\';\n    const t0 = performance.now();\n    term.dispatchEvent(new Event(\'input\', { bubbles: true }));\n    document.body.offsetHeight; // include layout\n    total.push(performance.now() - t0);\n    await new Promise((r) => setTimeout(r, 30));\n  }\n  const q = (a, p) => [...a].sort((x, y) => x - y)[Math.floor(p * (a.length - 1))].toFixed(1);\n  return { rows: document.querySelectorAll(\'.schedule tbody tr\').length, median: q(total, 0.5), p90: q(total, 0.9), max: q(total, 1) };\n}');
```
````

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/s1-desktop.png",
  "fullPage": true
}
```

Output:

````
### Result
- [Screenshot of full page](.playwright-mcp/s1-desktop.png)
### Ran Playwright code
```js
// Screenshot full page and save it as .playwright-mcp/s1-desktop.png
await page.screenshot({
  fullPage: true,
  path: '.playwright-mcp/s1-desktop.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/s1-desktop.png</summary>



Output:

```
[image: screenshot]
```

</details>

<details><summary>Shell: Left-align the date column in monthly view</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/schedule.ts'); t=p.read_text()
old="""    tableEl.className = 'data-table';"""
assert t.count(old)==1
t=t.replace(old,"""    tableEl.className = 'data-table';
    tableEl.dataset.mode = mode; // monthly: column 2 is a date (left-aligned); yearly: an amount""")
p.write_text(t)
p=pathlib.Path('src/ui/styles.css'); t=p.read_text()
old=""".data-table th:first-child,
.data-table td:first-child {
  text-align: left;
}"""
assert t.count(old)==1
t=t.replace(old, old+"""

.data-table[data-mode='monthly'] th:nth-child(2),
.data-table[data-mode='monthly'] td:nth-child(2) {
  text-align: left;
}""")
p.write_text(t)
EOF
npm run build 2>&1 | tail -1
```

</details>

<details><summary>Browser: resize</summary>

```json
{
  "width": 360,
  "height": 800
}
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => { document.querySelector('.schedule').scrollIntoView(); const r = document.querySelector('.table-scroll'); return { pageScrollWidth: document.documentElement.scrollWidth, tableBoxWidth: r.clientWidth, tableScrollWidth: r.scrollWidth }; }"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/s2-mobile.png"
}
```

Output:

````
### Result
- [Screenshot of viewport](.playwright-mcp/s2-mobile.png)
### Ran Playwright code
```js
// Screenshot viewport and save it as .playwright-mcp/s2-mobile.png
await page.screenshot({
  path: '.playwright-mcp/s2-mobile.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/s2-mobile.png</summary>



Output:

```
[image: screenshot]
```

</details>

<details><summary>Shell: Add sticky first column and scroll hint</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/schedule.ts'); t=p.read_text()
def rep(old,new):
    global t
    assert t.count(old)==1, old; t=t.replace(old,new)
rep("""  /** The table currently on screen; updates keep its header and scroll region and swap only the body. */
  let current: { mode: ScheduleMode; region: HTMLElement; tbody: HTMLTableSectionElement } | null = null;

  function buildTable(caption: string, headers: string[]): { region: HTMLElement; tbody: HTMLTableSectionElement } {
    // A focusable, labelled region so keyboard users can scroll it (L10.3).
    const region = document.createElement('div');""","""  /** The table currently on screen; updates keep its header and scroll region and swap only the body. */
  let current: { mode: ScheduleMode; frame: HTMLElement; region: HTMLElement; tbody: HTMLTableSectionElement } | null =
    null;

  /** Shows a fade on the right edge while more columns are hidden there (narrow screens). */
  function updateScrollHint(frame: HTMLElement, region: HTMLElement): void {
    const moreRight = region.scrollLeft + region.clientWidth < region.scrollWidth - 1;
    frame.classList.toggle('more-right', moreRight);
  }

  function buildTable(
    caption: string,
    headers: string[],
  ): { frame: HTMLElement; region: HTMLElement; tbody: HTMLTableSectionElement } {
    const frame = document.createElement('div');
    frame.className = 'table-frame';
    // A focusable, labelled region so keyboard users can scroll it (L10.3).
    const region = document.createElement('div');""")
rep("""    tableEl.append(captionEl, thead, tbody);
    region.append(tableEl);
    return { region, tbody };
  }""","""    tableEl.append(captionEl, thead, tbody);
    region.append(tableEl);
    frame.append(region);
    region.addEventListener('scroll', () => updateScrollHint(frame, region), { passive: true });
    if (typeof ResizeObserver === 'function') {
      new ResizeObserver(() => updateScrollHint(frame, region)).observe(region);
    }
    return { frame, region, tbody };
  }""")
rep("""    if (!current || current.mode !== mode || !current.region.isConnected) {
      current = { mode, ...buildTable(caption, headers) };
      body.replaceChildren(current.region);
    }
    current.tbody = fillBody(current.tbody, data);""","""    if (!current || current.mode !== mode || !current.frame.isConnected) {
      current = { mode, ...buildTable(caption, headers) };
      body.replaceChildren(current.frame);
    }
    current.tbody = fillBody(current.tbody, data);
    updateScrollHint(current.frame, current.region);""")
p.write_text(t)

p=pathlib.Path('src/ui/styles.css'); t=p.read_text()
old="""/* ---------- Schedule table (5b) ---------- */"""
assert t.count(old)==1
t=t.replace(old, old+"""
.table-frame {
  position: relative;
}

/* Fade on the right edge while more columns are hidden there. */
.table-frame.more-right::after {
  content: '';
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  width: 28px;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  background: linear-gradient(to left, color-mix(in srgb, var(--text) 16%, transparent), transparent);
  pointer-events: none;
}
""")
old2=""".data-table tbody tr:nth-child(even) {
  background: var(--surface-sunken);
}"""
assert t.count(old2)==1
t=t.replace(old2,""".data-table tbody tr:nth-child(even) {
  background: var(--surface-sunken);
… (35 more lines not shown)
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => { document.querySelector('.schedule').scrollIntoView(); return { hint: document.querySelector('.table-frame').classList.contains('more-right'), pageScrollWidth: document.documentElement.scrollWidth }; }"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/s3-mobile-hint.png"
}
```

Output:

````
### Result
- [Screenshot of viewport](.playwright-mcp/s3-mobile-hint.png)
### Ran Playwright code
```js
// Screenshot viewport and save it as .playwright-mcp/s3-mobile-hint.png
await page.screenshot({
  path: '.playwright-mcp/s3-mobile-hint.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/s3-mobile-hint.png</summary>



Output:

```
[image: screenshot]
```

</details>

<details><summary>Shell: Narrow first column and wrap headers</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/styles.css'); t=p.read_text()
old="""/* Payment number / year stays visible while scrolling sideways. */"""
assert t.count(old)==1
t=t.replace(old,"""/* Headers may wrap ("Payment / number") so the first column can stay narrow. */
.data-table thead th {
  white-space: normal;
  vertical-align: bottom;
  line-height: 1.3;
}

/* With table-layout: fixed, widths come from the header row. */
.data-table th:first-child {
  width: 5.5rem;
}

.data-table[data-mode='monthly'] th:nth-child(2) {
  width: 9.5rem;
}

"""+old)
p.write_text(t)
EOF
npm run build 2>&1 | tail -1
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => {\n  document.querySelector('.schedule').scrollIntoView();\n  const clipped = [...document.querySelectorAll('.data-table td, .data-table th')].filter((c) => c.scrollWidth > c.clientWidth + 1).map((c) => c.textContent).slice(0, 5);\n  return { clipped, pageScrollWidth: document.documentElement.scrollWidth };\n}"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/s4-mobile.png"
}
```

Output:

````
### Result
- [Screenshot of viewport](.playwright-mcp/s4-mobile.png)
### Ran Playwright code
```js
// Screenshot viewport and save it as .playwright-mcp/s4-mobile.png
await page.screenshot({
  path: '.playwright-mcp/s4-mobile.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/s4-mobile.png</summary>



Output:

```
[image: screenshot]
```

</details>

<details><summary>Browser: resize</summary>

```json
{
  "width": 1280,
  "height": 900
}
```

</details>

<details><summary>Browser: emulate_media</summary>

```json
{
  "colorScheme": "dark"
}
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => { document.querySelector('.schedule [data-mode=\"yearly\"]').click(); document.querySelector('.schedule').scrollIntoView(); return document.querySelectorAll('.schedule tbody tr').length; }"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/s5-desktop-yearly-dark.png",
  "target": ".schedule"
}
```

Output:

````
### Result
- [Screenshot of element](.playwright-mcp/s5-desktop-yearly-dark.png)
### Ran Playwright code
```js
// Screenshot element and save it as .playwright-mcp/s5-desktop-yearly-dark.png
await page.locator('.schedule').screenshot({
  path: '.playwright-mcp/s5-desktop-yearly-dark.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/s5-desktop-yearly-dark.png</summary>



Output:

```
[image: screenshot]
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => { document.querySelector('.schedule .csv-button').click(); return 'clicked'; }"
}
```

</details>

<details><summary>Browser: console_messages</summary>

```json
{
  "level": "warning"
}
```

Output:

```
### Result
Total messages: 0 (Errors: 0, Warnings: 0)
```

</details>

<details><summary>Shell: Inspect the real downloaded CSV file</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama/.playwright-mcp" && head -c 200 mortgage-schedule.csv | od -c | head -6; echo; echo "lines: $(wc -l < mortgage-schedule.csv)"; sed -n '2p;361p' mortgage-schedule.csv
```

Output:

```
0000000    P   a   y   m   e   n   t       n   u   m   b   e   r   ,   D
0000020    a   t   e   ,   P   a   y   m   e   n   t   ,   P   r   i   n
0000040    c   i   p   a   l   ,   I   n   t   e   r   e   s   t   ,   E
0000060    x   t   r   a       p   a   y   m   e   n   t   ,   B   a   l
0000100    a   n   c   e  \r  \n   1   ,   2   0   2   6   -   1   2   ,
0000120    1   7   9   8   .   6   5   ,   2   9   8   .   6   5   ,   1

lines:      361
1,2026-12,1798.65,298.65,1500.00,0.00,299701.35
360,2056-11,1800.09,1791.13,8.96,0.00,0.00
```

</details>

<details><summary>Browser: close</summary>

```json
{}
```

</details>

<details><summary>TaskStop</summary>

```json
{
  "task_id": "bf4f16dil"
}
```

</details>

<details><summary>Shell: Clean up, rerun tests, commit schedule step</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && rm -rf .playwright-mcp && npm test 2>&1 | grep -E 'Test Files|Tests ' && npx tsc --noEmit && echo tsc OK && git add src tests && git status --short && git commit -q -F - <<'EOF'
Add amortization schedule with yearly view and CSV download (L3)

- Monthly table by default, yearly toggle (aria-pressed), view kept across edits
- CSV: mortgage-schedule.csv, exact header, plain 2-decimal amounts, YYYY-MM dates,
  always monthly rows; downloaded via a local blob URL
- Schedule replaced by E7-E10 messages like the results (L3.8)
- Fixed table layout + detached tbody swap: 480-row update ~30 ms median (was ~147 ms)
- Sticky first column and right-edge scroll hint at 360px
- 23 new tests (CSV + schedule UI); 291 total

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --oneline | head -1
```

Output:

```
 Test Files  7 passed (7)
      Tests  291 passed (291)
tsc OK
M  src/messages.ts
M  src/ui/app.ts
M  src/ui/csv.ts
M  src/ui/schedule.ts
M  src/ui/styles.css
A  tests/unit/csv.test.ts
M  tests/unit/ui.test.ts
?? transcripts/session-03-part4.md
17624c2 Add amortization schedule with yearly view and CSV download (L3)
```

</details>

The schedule and CSV download (L3) are done. All 10 criteria are covered by tests (L3 has 10, not 9: number 10 is the any-date CSV check). All 291 tests pass, the type check and build are clean, and I committed it locally as `17624c2` (not pushed).

Your message still had the placeholder "<write what you saw…>", so I haven't recorded any result for steps 1–13.

## What was built
- **Schedule card** below the form and results, full width.
  - It opens in monthly view: Payment number, Date, Payment, Principal, Interest, Extra payment, Balance.
  - A Monthly/Yearly toggle switches to one row per loan year, ending with "Ending balance". The chosen view stays when you change an input.
- **Download CSV** saves `mortgage-schedule.csv`:
  - the exact header line;
  - `YYYY-MM` dates and plain 2-decimal amounts;
  - always monthly rows, even when the yearly view is showing.

  The file is made in the browser (a local blob URL), so no network request is involved.
- **When the inputs are invalid** (or E7, E9 or E10 applies), the whole schedule is replaced by the same message as the results area. The toggle and download button are hidden, and no old rows remain.
- **Accessibility:** the table sits in a labelled scroll region you can reach with Tab and scroll with arrow keys. It has a hidden caption and proper column headers.

## Speed with 480 rows (the worst case)
I measured in Chromium instead of assuming.

| Version | Update per keystroke |
|---|---|
| First version | ~147 ms median. About 46 ms of that was the browser measuring all 3,360 cells to size the columns |
| Fixed table layout (columns sized from the header row) | ~30 ms |
| Reusing existing cells | Worse: ~135 ms when every value changes, which is the normal case while typing. I dropped it |
| **Final: build the new table body off-screen, then swap it in** | **~30 ms median** |

There's one thing I couldn't eliminate: **occasional spikes of about 200 ms** (roughly 1 update in 10). They appeared with every approach I tried. The calculation itself takes 0.2 ms, so it isn't the cause. The spikes are most likely garbage collection or overhead from the automated test browser. Please check whether you notice lag when typing quickly with a 40-year term in a normal browser. If you do, the next fix would be to redraw the table once per animation frame.

## Browser checks (screenshots: desktop light, 360 px, desktop dark yearly)
- **Desktop:** the values match L3.1 and L3.2, and the yearly view shows L3.3's year 1 exactly.
- **360 px:** the page doesn't scroll sideways, and the table scrolls inside its own box (L10.2). The screenshots showed two problems, which I fixed:
  - **Nothing hinted that more columns existed.** There's now a sticky first column and a fade on the right edge that disappears at the end of the table.
  - **"Payment number" overlapped "Date".** The first column is now narrower and headers wrap onto two lines. A check finds no clipped cells.
- **Date column:** it was right-aligned like the amounts, and is now left-aligned in the monthly view.
- **Real download:** a click in Chromium saved the file with the correct header, CRLF line endings, 361 lines and the correct first and last rows, while the yearly view was showing. The console had no errors or warnings.

## Tests
```
 csv.test.ts  10 (new) · ui.test.ts 54 (+13 schedule: L3.1–L3.10, view kept, E7/E9, reused-row check, ARIA)
 amortize 49 · parse 38 · validate 48 · config 91 · setup 1
 Test Files  7 passed (7)
      Tests  291 passed (291)
```

`transcripts/session-03-part4.md` is untracked and I didn't include it in the commit. Search it for `ghp_` before you commit it yourself.

Next is 5c: the extra payment field (L5) and the preset selector (M1).

*The user ran a Claude Code command: `/export transcripts/session-03-part4.md`.*

---

### User · 20:04

> I've now checked the app by hand in my browser: the 13 checks from step 5a and the schedule
> (row 1, last row, year 1 = 21,583.80, CSV opens correctly in a spreadsheet). All worked as
> described. Typing with a 40-year term feels smooth, so no need for the animation-frame change.
>
> Step 5c: the extra monthly payment (story L5, all criteria) and the loan product selector
> (story M1, all criteria), using the presets from config. Same approach: tests first, check in
> the browser with screenshots, run all tests.

### Claude · 20:04

Good to hear it all worked by hand. Re-reading L5 and M1 from the docs first, so the tests match the exact wording:

<details><summary>Shell: Show L5 and M1 stories and criteria</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && awk '/^### L5\./,/^### L6\./' docs/user-stories.md | sed '$d'; awk '/^### M1\./,/^### M2\./' docs/user-stories.md | sed '$d'
```

Output:

```
### L5. Model extra payments
**Priority:** Must · **Scope:** Core · **Serves:** J-4 · **Status:** Not implemented

As a Loanee, I want to add a fixed extra monthly payment, so that I can see how much interest and time I'd save.

**Acceptance criteria**
1. Given home price 300,000, down payment 0, rate 6, term 30, extra payment 200 and today is 6 November 2026, when results appear, then I see payoff date February 2050, months saved 81 and interest saved 91,173.87. Total interest shows 256,341.57 and the schedule has 279 rows, the last with payment 716.87 and balance 0.00.
2. Given the same loan with extra payment 400,000 (more than the balance), when results appear, then the schedule has 1 row with payment 301,500.00 and balance 0.00. Months saved shows 359, interest saved shows 346,015.44, and no balance is negative.
3. Given the extra payment is 0 or empty, when results appear, then every result equals the result without an extra payment and the savings summary is not shown.
4. Given extra payment -50, `abc` or 10,000,000.01, when I enter it, then E6 appears under the field and the results area shows E8.
5. Given the loan of criterion 1 with extra payment 10,000,000 (the maximum), when I enter it, then it is accepted, no error appears, and the schedule has 1 row with payment 301,500.00 and balance 0.00.
6. Given E6 is shown for extra payment -50, when I change it to 200, then E6 disappears and the results of criterion 1 appear.
7. Given any extra payment, when the engine builds the schedule, then it has at most n rows (term × 12).
8. Given today is any date and the inputs of criterion 1, when results appear, then the payoff date is 278 months after the month of the first payment (the 279th payment), which is the month after today, and months saved still shows 81. For example, on 15 March 2027 the payoff date is June 2050.

### M1. Apply loan product presets
**Priority:** Must · **Scope:** Core · **Serves:** J-9 · **Status:** Not implemented

As a Manager, I want to pick one of our loan products from a list, so that the rate and term are filled in correctly and consistently.

**Acceptance criteria**
1. Given config presets "30-year fixed" (6.5%, 30 years) and "15-year fixed" (5.75%, 15 years), when the page loads, then a "Loan product" selector lists "Custom", "30-year fixed" and "15-year fixed" in that order, with "Custom" selected.
2. Given home price 350,000 and down payment 50,000, when I select "15-year fixed", then the rate field shows 5.75, the term shows 15, and the monthly payment updates to 2,491.23.
3. Given a preset with a `description`, when I select it, then the description text appears under the selector.
4. Given "15-year fixed" is selected, when I change the rate to 6, then the selector shows "Custom" and the results use 6%.
5. Given "15-year fixed" is selected, when I change the home price, then the selector still shows "15-year fixed", because price is not part of a preset.
6. Given "15-year fixed" is selected, when I choose "Custom", then the fields keep their current values.
7. Given the config has no presets (missing or an empty list), when the page loads, then the selector is hidden and the calculator works normally.
```

</details>

<details><summary>Shell: Add L5 and M1 UI tests and run them</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && cat >> tests/unit/ui.test.ts <<'EOF'

describe('Extra monthly payment (L5)', () => {
  const tableRows = (): string[][] =>
    [...root.querySelectorAll('.schedule tbody tr')].map((tr) => [...tr.children].map((td) => td.textContent ?? ''));
  const L5_1 = { homePrice: '300000', downPayment: '0', interestRate: '6', termYears: '30' };

  it('the field is labelled, has the currency prefix and starts empty when the default is 0', () => {
    start();
    expect(root.querySelector('label[for="field-extraPayment"]')?.textContent).toBe('Extra monthly payment');
    expect(input('extraPayment').value).toBe('');
    expect(input('extraPayment').parentElement!.querySelector('.adornment-prefix')?.textContent).toBe('$');
  });

  it('a config default of 100 is prefilled', () => {
    start({ defaults: { extraPayment: 100 } });
    expect(input('extraPayment').value).toBe('100');
  });

  it('L5.1: extra 200 → payoff February 2050, 81 months and 91,173.87 saved, interest 256,341.57, 279 rows', () => {
    start();
    enter({ ...L5_1, extraPayment: '200' });
    expect(result('payoff-date')).toBe('February 2050');
    expect(result('months-saved')).toBe('81 months');
    expect(result('interest-saved')).toBe('$91,173.87');
    expect(result('total-interest')).toBe('$256,341.57');
    const rows = tableRows();
    expect(rows).toHaveLength(279);
    expect(rows[0]?.[2]).toBe('$1,998.65');
    expect(rows[0]?.[5]).toBe('$200.00');
    expect(rows[278]?.[2]).toBe('$716.87');
    expect(rows[278]?.[5]).toBe('$0.00');
    expect(rows[278]?.[6]).toBe('$0.00');
  });

  it('L5.2: extra 400,000 → 1 row of 301,500.00, 359 months and 346,015.44 saved, no negative balance', () => {
    start();
    enter({ ...L5_1, extraPayment: '400000' });
    const rows = tableRows();
    expect(rows).toHaveLength(1);
    expect(rows[0]?.[2]).toBe('$301,500.00');
    expect(rows[0]?.[6]).toBe('$0.00');
    expect(result('months-saved')).toBe('359 months');
    expect(result('interest-saved')).toBe('$346,015.44');
    expect(root.querySelector('.schedule')?.textContent).not.toMatch(/-\$|\$-/);
  });

  it.each(['0', ''])('L5.3: extra "%s" → same results as without, and no savings summary', (extraPayment) => {
    start();
    enter({ ...L5_1, extraPayment });
    expect(result('total-interest')).toBe('$347,515.44');
    expect(result('payoff-date')).toBe('November 2056');
    expect(root.querySelector('.savings')).toBeNull();
    expect(result('months-saved')).toBeNull();
    expect(tableRows()).toHaveLength(360);
  });

  it.each(['-50', 'abc', '10,000,000.01'])('L5.4: extra "%s" → E6 under the field and E8 in the results', (extraPayment) => {
    start();
    type('extraPayment', extraPayment);
    leave('extraPayment');
    expect(errorText('extraPayment')).toBe('!Enter an extra payment between 0 and 10,000,000.');
    expect(resultsText()).toBe(E8);
  });

  it('L5.5: extra 10,000,000 is accepted: no error, 1 row of 301,500.00', () => {
    start();
    enter({ ...L5_1, extraPayment: '10000000' });
    leave('extraPayment');
    expect(errorText('extraPayment')).toBe('');
    expect(tableRows()).toHaveLength(1);
    expect(tableRows()[0]?.[2]).toBe('$301,500.00');
  });

  it('L5.6: E6 for -50 disappears when changed to 200, and the L5.1 results appear', () => {
    start();
    enter(L5_1);
    type('extraPayment', '-50');
    leave('extraPayment');
    expect(errorText('extraPayment')).toContain('Enter an extra payment');
… (127 more lines not shown)
```

Output:

```
⎯⎯⎯⎯⎯⎯ Failed Tests 24 ⎯⎯⎯⎯⎯⎯⎯
 Test Files  1 failed | 6 passed (7)
      Tests  24 failed | 293 passed (317)
```

</details>

24 new tests fail as expected. Now the code, starting with texts and the extra payment field:

<details><summary>Shell: Add texts and the extra payment field</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/messages.ts'); t=p.read_text()
old="""  termYears: 'Loan term (years)',"""
assert t.count(old)==1
t=t.replace(old,"""  termYears: 'Loan term (years)',
  extraPayment: 'Extra monthly payment',
  loanProduct: 'Loan product',
  custom: 'Custom',
  savingsIntro: (amount: string) => `Paying ${amount} extra each month`,
  monthsSaved: 'Months saved',
  interestSaved: 'Interest saved',
  monthsCount: (count: number) => (count === 1 ? '1 month' : `${count} months`),""")
p.write_text(t)

p=pathlib.Path('src/ui/form.ts'); t=p.read_text()
old="""/** Fields shown in 5a. Extra payment is added in 5c. */
export const FORM_FIELDS: readonly FieldSpec[] = [
  { field: 'homePrice', label: UI_TEXT.homePrice, inputMode: 'decimal' },
  { field: 'downPayment', label: UI_TEXT.downPayment, inputMode: 'decimal' },
  { field: 'interestRate', label: UI_TEXT.interestRate, inputMode: 'decimal' },
  { field: 'termYears', label: UI_TEXT.termYears, inputMode: 'numeric' },
];"""
assert t.count(old)==1
t=t.replace(old,"""export const FORM_FIELDS: readonly FieldSpec[] = [
  { field: 'homePrice', label: UI_TEXT.homePrice, inputMode: 'decimal' },
  { field: 'downPayment', label: UI_TEXT.downPayment, inputMode: 'decimal' },
  { field: 'interestRate', label: UI_TEXT.interestRate, inputMode: 'decimal' },
  { field: 'termYears', label: UI_TEXT.termYears, inputMode: 'numeric' },
  { field: 'extraPayment', label: UI_TEXT.extraPayment, inputMode: 'decimal' },
];""")
p.write_text(t)
EOF
echo ok
```

Output:

```
ok
```

</details>

Now the preset selector module:

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/ui/presets.ts</summary>

```
/**
 * Loan product selector (M1). Lists "Custom" plus the config presets in config order.
 * Choosing a preset fills rate and term; editing either of those afterwards switches back to
 * "Custom" so a quote is never labelled with a product it no longer matches (M1.4).
 * Names and descriptions are set with textContent only.
 */
import type { Preset } from '../config/defaults';
import { UI_TEXT } from '../messages';

export interface PresetSelector {
  element: HTMLElement;
  /** Switches back to "Custom" (after the rate or term is edited). */
  markCustom(): void;
}

export const PRESET_SELECT_ID = 'field-preset';
const DESCRIPTION_ID = 'field-preset-description';

/** Returns null when there are no presets, so no selector is shown (M1.7). */
export function createPresetSelector(
  presets: readonly Preset[],
  apply: (preset: Preset) => void,
): PresetSelector | null {
  if (presets.length === 0) return null;

  const wrapper = document.createElement('div');
  wrapper.className = 'field field-preset';

  const label = document.createElement('label');
  label.htmlFor = PRESET_SELECT_ID;
  label.textContent = UI_TEXT.loanProduct;

  const select = document.createElement('select');
  select.id = PRESET_SELECT_ID;
  select.name = 'preset';
  const custom = document.createElement('option');
  custom.value = '';
  custom.textContent = UI_TEXT.custom;
  select.append(custom);
  for (const preset of presets) {
    const option = document.createElement('option');
    option.value = preset.id;
    option.textContent = preset.name;
    select.append(option);
  }
  select.value = ''; // "Custom" on load (M1.1)

  const description = document.createElement('p');
  description.id = DESCRIPTION_ID;
  description.className = 'field-hint';

  const showDescription = (text: string | null): void => {
    description.textContent = text ?? '';
    if (text) select.setAttribute('aria-describedby', DESCRIPTION_ID);
    else select.removeAttribute('aria-describedby');
  };

  select.addEventListener('change', () => {
    const preset = presets.find((candidate) => candidate.id === select.value);
    showDescription(preset?.description ?? null);
    // "Custom" keeps the current field values (M1.6).
    if (preset) apply(preset);
  });

  wrapper.append(label, select, description);
  return {
    element: wrapper,
    markCustom() {
      if (select.value === '') return;
      select.value = '';
      showDescription(null);
    },
  };
}
```

Output:

```
The file /Users/dev/Desktop/Test Project Usama/src/ui/presets.ts has been updated successfully. (file state is current in your context — no need to Read it back)
```

</details>

Now wiring the extra payment default and the selector into the app:

<details><summary>Shell: Wire extra default and preset selector into app</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/app.ts'); t=p.read_text()
def rep(old,new):
    global t
    assert t.count(old)==1, old; t=t.replace(old,new)
rep("""      termYears: toInputText(config.defaults.termYears),
    },""","""      termYears: toInputText(config.defaults.termYears),
      // A default of 0 shows as an empty, optional field (config schema, Q11).
      extraPayment: config.defaults.extraPayment === 0 ? '' : toInputText(config.defaults.extraPayment),
    },""")
rep("""import { createSchedule } from './schedule';""","""import { createSchedule } from './schedule';
import { createPresetSelector } from './presets';""")
rep("""  form.element.addEventListener('input', update);""","""  // Loan product selector (M1): fills rate and term, then recalculates.
  const presetSelector = createPresetSelector(config.presets, (preset) => {
    const rate = form.inputs.interestRate;
    const term = form.inputs.termYears;
    if (rate) rate.value = toInputText(preset.ratePercent);
    if (term) term.value = toInputText(preset.termYears);
    update();
  });
  if (presetSelector) form.element.prepend(presetSelector.element);

  form.element.addEventListener('input', (event) => {
    // Editing rate or term means the figures no longer match the product (M1.4);
    // price, down payment and extra payment are not part of a preset (M1.5).
    const target = event.target;
    if (target === form.inputs.interestRate || target === form.inputs.termYears) presetSelector?.markCustom();
    update();
  });""")
p.write_text(t)
EOF
npx tsc --noEmit && echo tsc OK
```

Output:

```
tsc OK
```

</details>

Now the savings summary in the results:

<details><summary>Shell: Add savings summary and run all tests</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/results.ts'); t=p.read_text()
def rep(old,new):
    global t
    assert t.count(old)==1, old; t=t.replace(old,new)
rep("""      const amounts = [principalCents, result.monthlyPaymentCents, result.totalInterestCents, result.totalPaidCents];""","""      const amounts = [principalCents, result.monthlyPaymentCents, result.totalInterestCents, result.totalPaidCents];
      if (result.savings) amounts.push(result.savings.monthsSaved, result.savings.interestSavedCents);""")
rep("""      const parts: HTMLElement[] = [hero, grid];""","""      const parts: HTMLElement[] = [hero, grid];
      // Only with an extra payment above 0 (L5.3).
      const firstRow = result.rows[0];
      if (result.savings && firstRow) {
        const savings = el('div', 'savings');
        const intro = el('p', 'savings-title', UI_TEXT.savingsIntro(format.money(firstRow.extraCents)));
        const list = el('dl', 'savings-list');
        list.append(
          stat(UI_TEXT.monthsSaved, UI_TEXT.monthsCount(result.savings.monthsSaved), 'months-saved'),
          stat(UI_TEXT.interestSaved, format.money(result.savings.interestSavedCents), 'interest-saved'),
        );
        savings.append(intro, list);
        parts.push(savings);
      }""")
p.write_text(t)

p=pathlib.Path('src/ui/styles.css'); t=p.read_text()
old="""/* Principal vs. interest bar */"""
assert t.count(old)==1
t=t.replace(old,"""/* Savings from an extra payment (L5) */
.savings {
  padding: var(--space-4);
  border: 1px solid var(--border);
  border-left: 4px solid var(--success);
  border-radius: var(--radius-md);
  background: var(--surface-sunken);
}

.savings-title {
  margin-bottom: var(--space-3);
  font-size: var(--text-sm);
  font-weight: 600;
}

.savings-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
}

.savings .stat {
  padding: 0;
  border: 0;
  background: transparent;
}

.savings .stat-value {
  color: var(--success);
}

"""+old)
p.write_text(t)
EOF
npx tsc --noEmit && echo tsc OK && npm test 2>&1 | grep -E '×|Test Files|Tests |AssertionError|Expected|Received' | head -20
```

Output:

```
tsc OK
 Test Files  7 passed (7)
      Tests  317 passed (317)
```

</details>

<details><summary>Shell: Add a test exposing the capped-extra bug</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('tests/unit/ui.test.ts'); t=p.read_text()
old="""    expect(result('months-saved')).toBe('359 months');
    expect(result('interest-saved')).toBe('$346,015.44');"""
assert t.count(old)==1
t=t.replace(old, old+"""
    // The summary names the amount entered, not the capped amount in row 1 (299,701.35).
    expect(root.querySelector('.savings-title')?.textContent).toBe('Paying $400,000.00 extra each month');""")
old2="""    expect(result('interest-saved')).toBe('$91,173.87');
    expect(result('total-interest')).toBe('$256,341.57');"""
assert t.count(old2)==1
t=t.replace(old2, old2+"""
    expect(root.querySelector('.savings-title')?.textContent).toBe('Paying $200.00 extra each month');""")
p.write_text(t)
EOF
npx vitest run tests/unit/ui.test.ts -t "L5.2" 2>&1 | grep -E 'Tests |Expected|Received' | head -4
```

Output:

```
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯
Expected: "Paying $400,000.00 extra each month"
Received: "Paying $299,701.35 extra each month"
      Tests  1 failed | 79 skipped (80)
```

</details>

The test confirms the bug. Fixing it by passing the entered extra amount to the results view:

<details><summary>Shell: Pass entered extra to results and rerun tests</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/results.ts'); t=p.read_text()
def rep(old,new):
    global t
    assert t.count(old)==1, old; t=t.replace(old,new)
rep("""  showResult(result: LoanResult, principalCents: number): boolean;""","""  /** `extraCents` is the extra payment as entered (row values are capped at what is owed). */
  showResult(result: LoanResult, principalCents: number, extraCents: number): boolean;""")
rep("""    showResult(result, principalCents) {""","""    showResult(result, principalCents, extraCents) {""")
rep("""      if (result.savings) amounts.push(result.savings.monthsSaved, result.savings.interestSavedCents);""","""      if (result.savings) amounts.push(result.savings.monthsSaved, result.savings.interestSavedCents, extraCents);""")
rep("""      const firstRow = result.rows[0];
      if (result.savings && firstRow) {
        const savings = el('div', 'savings');
        const intro = el('p', 'savings-title', UI_TEXT.savingsIntro(format.money(firstRow.extraCents)));""","""      if (result.savings) {
        const savings = el('div', 'savings');
        const intro = el('p', 'savings-title', UI_TEXT.savingsIntro(format.money(extraCents)));""")
p.write_text(t)
p=pathlib.Path('src/ui/app.ts'); t=p.read_text()
old="""      if (!results.showResult(calc.result, outcome.values.principalCents)) {"""
assert t.count(old)==1
t=t.replace(old,"""      if (!results.showResult(calc.result, outcome.values.principalCents, outcome.values.extraMonthlyCents)) {""")
p.write_text(t)
EOF
npx tsc --noEmit && echo tsc OK && npm test 2>&1 | grep -E '×|Test Files|Tests '
```

Output:

```
tsc OK
 Test Files  7 passed (7)
      Tests  317 passed (317)
```

</details>

All 317 pass. Checking the contrast of the new green savings figures before going to the browser:

<details><summary>Shell: Check savings text contrast</summary>

```sh
node -e '
const lum=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4);return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]};
const cr=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return ((x+0.05)/(y+0.05)).toFixed(2)};
console.log("light success #1e7a46 on sunken #f7f9fb:", cr("#1e7a46","#f7f9fb"));
console.log("dark  success #6fcf97 on sunken #111820:", cr("#6fcf97","#111820"));'
```

Output:

```
light success #1e7a46 on sunken #f7f9fb: 5.07
dark  success #6fcf97 on sunken #111820: 9.40
```

</details>

Both pass AA (5.07 and 9.40). Now the browser check, using the shipped `config.json` with its two presets:

<details><summary>Shell: Build and serve the app for screenshots</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm run build 2>&1 | tail -1 && npx vite preview --port 4173 --strictPort
```

</details>

<details><summary>Browser: resize</summary>

```json
{
  "width": 1280,
  "height": 900
}
```

</details>

<details><summary>Browser: emulate_media</summary>

```json
{
  "colorScheme": "light"
}
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: select_option</summary>

```json
{
  "target": "#field-preset",
  "values": [
    "f15"
  ]
}
```

Output:

````
### Ran Playwright code
```js
await page.locator('#field-preset').selectOption('f15');
```
### Page
- Page URL: http://localhost:4173/
- Page Title: Mortgage Calculator
### Snapshot
- [Snapshot](.playwright-mcp/page-2026-11-06T15-07-30-141Z.yml)
````

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-extraPayment",
  "text": "200"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => ({ preset: document.querySelector('#field-preset').selectedOptions[0].textContent, rate: document.querySelector('#field-interestRate').value, term: document.querySelector('#field-termYears').value, payment: document.querySelector('[data-result=\"monthly-payment\"]').textContent, monthsSaved: document.querySelector('[data-result=\"months-saved\"]')?.textContent, description: document.querySelector('#field-preset-description').textContent, scrollWidth: document.documentElement.scrollWidth })"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/c1-desktop.png"
}
```

Output:

````
### Result
- [Screenshot of viewport](.playwright-mcp/c1-desktop.png)
### Ran Playwright code
```js
// Screenshot viewport and save it as .playwright-mcp/c1-desktop.png
await page.screenshot({
  path: '.playwright-mcp/c1-desktop.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/c1-desktop.png</summary>



Output:

```
[image: screenshot]
```

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-interestRate",
  "text": "6"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => ({ preset: document.querySelector('#field-preset').selectedOptions[0].textContent, description: document.querySelector('#field-preset-description').textContent, payment: document.querySelector('[data-result=\"monthly-payment\"]').textContent })"
}
```

</details>

<details><summary>Browser: resize</summary>

```json
{
  "width": 360,
  "height": 800
}
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: select_option</summary>

```json
{
  "target": "#field-preset",
  "values": [
    "f30"
  ]
}
```

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-extraPayment",
  "text": "-50"
}
```

</details>

<details><summary>Browser: press_key</summary>

```json
{
  "key": "Tab"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => ({ scrollWidth: document.documentElement.scrollWidth, e6: document.querySelector('#field-extraPayment-error').textContent, results: document.querySelector('.results-body').textContent })"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/c2-mobile-error.png",
  "fullPage": true
}
```

Output:

````
### Result
- [Screenshot of full page](.playwright-mcp/c2-mobile-error.png)
### Ran Playwright code
```js
// Screenshot full page and save it as .playwright-mcp/c2-mobile-error.png
await page.screenshot({
  fullPage: true,
  path: '.playwright-mcp/c2-mobile-error.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/c2-mobile-error.png</summary>



Output:

```
[image: screenshot]
```

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-extraPayment",
  "text": "250000"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => { document.querySelector('.results').scrollIntoView(); return { scrollWidth: document.documentElement.scrollWidth, saved: document.querySelector('[data-result=\"interest-saved\"]').textContent }; }"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/c3-mobile-savings.png",
  "target": ".results"
}
```

Output:

````
### Result
- [Screenshot of element](.playwright-mcp/c3-mobile-savings.png)
### Ran Playwright code
```js
// Screenshot element and save it as .playwright-mcp/c3-mobile-savings.png
await page.locator('.results').screenshot({
  path: '.playwright-mcp/c3-mobile-savings.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/c3-mobile-savings.png</summary>



Output:

```
[image: screenshot]
```

</details>

The savings panel fits at 360 px even with large values, with no horizontal scroll. Cleaning up and committing:

<details><summary>Browser: close</summary>

```json
{}
```

</details>

<details><summary>TaskStop</summary>

```json
{
  "task_id": "bv3oaqpz2"
}
```

</details>

<details><summary>Shell: Clean up, verify, and commit step 5c</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && rm -rf .playwright-mcp && npm test 2>&1 | grep -E 'Test Files|Tests ' && npx tsc --noEmit && echo tsc OK && npm run build 2>&1 | tail -1 && git add src tests && git commit -q -F - <<'EOF'
Add extra monthly payment (L5) and loan product selector (M1)

- Extra payment field with currency prefix; empty when the config default is 0
- Savings summary (months and interest saved) only when the extra is above 0,
  naming the amount entered (not the capped row-1 amount)
- Loan product selector from config presets: Custom first, fills rate and term,
  shows the description, switches to Custom when rate or term is edited,
  hidden when there are no presets
- 26 new UI tests (317 total)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --oneline | head -1; git status --short
```

Output:

```
 Test Files  7 passed (7)
      Tests  317 passed (317)
tsc OK
✓ built in 94ms
3ff0ffc Add extra monthly payment (L5) and loan product selector (M1)
?? transcripts/session-03-part4.md
```

</details>

The extra monthly payment (L5) and the loan product selector (M1) are done, with every criterion covered by tests. All 317 tests pass, the type check and build are clean, and I committed it locally as `3ff0ffc` (not pushed).

## What was built
- **Extra monthly payment field:**
  - It sits below the term, with the currency symbol, and starts empty when the config default is 0.
  - Invalid values show E6, following the same message timing as the other fields.
  - The schedule fills the Extra payment column, and the loan ends early.
- **Savings panel**, shown only when the extra payment is above 0 (L5.3). For example: "Paying $200.00 extra each month: 81 months saved, $91,173.87 interest saved."
- **Loan product selector** at the top of the form, filled from the config presets:
  - "Custom" comes first and is selected on load, followed by the products in config order.
  - Choosing a product fills the rate and term, recalculates, and shows the product's description underneath.
  - Editing the rate or term switches back to "Custom". Editing price, down payment or extra payment doesn't.
  - Choosing "Custom" keeps the current values.
  - With no presets in the config, the selector isn't shown at all.
  - Product names and descriptions are inserted as plain text, never as HTML.

## A bug I caught before committing
Reviewing my own code, I noticed the savings title took the extra amount from row 1 of the schedule. That value is capped at what's owed, so entering 400,000 would have shown "Paying $299,701.35 extra each month". I wrote a test that failed on exactly that, then fixed it: the panel now shows the amount you entered.

## Browser checks (real Chromium, with the shipped `config.json`)
- **Desktop:** choosing "15-year fixed" filled 5.75 and 15, showed the description and a payment of $2,491.23. An extra 200 showed 20 months and $18,364.42 saved. Changing the rate to 6 switched the selector to "Custom", cleared the description, and the payment became $2,531.57 (M1.4).
- **In a real browser,** changing a dropdown fires two events (`input`, then `change`). The selected product survived both, rather than resetting to Custom.
- **360 px:** with extra payment -50, the field shows E6 with the "!" marker, and the results and schedule both show E8. With a large extra payment the savings panel still fits, and there's no horizontal scroll in either case.
- **Contrast:** the new green savings figures are 5.07:1 (light) and 9.40:1 (dark), both above AA.

## Tests
```
 ui.test.ts 80 (+26: L5.1–L5.8, extra default/prefix, "1 month", savings title;
               M1.1–M1.7, preset clears a rate error, plain-text names)
 amortize 49 · parse 38 · validate 48 · config 91 · csv 10 · setup 1
 Test Files  7 passed (7)
      Tests  317 passed (317)
```

All Core stories now have working code: L1, L2, L3, L5, L8, L10, M1 and A1–A5. What's still to do for the submission:
- **The README:** how to run it, the config fields (A1.5), the browser checklist (L10.1) and the manual network check (A5.4).
- **The browser check itself** in Chrome, Edge, Firefox and Safari. Only you can do this.
- **Story statuses** in user-stories.md: updating them from "Not implemented" to "Implemented".

`transcripts/session-03-part4.md` is still untracked. Search it for `ghp_` before you commit it.

*The user ran a Claude Code command: `/export transcripts/session-03-part5.md`.*

---

### User · 20:09

> Checked 5c by hand: extra 200 gives 81 months and 91,173.87 saved, and the product selector
> switches to Custom when I edit the rate. Good catch on the savings-title bug.
>
> Step 6: story L10 (current Chrome, Edge, Firefox, Safari; 360px; keyboard).
> Give me a short manual checklist I can run in each browser myself. I'll report the results.
> Then audit every Core story (L1, L2, L3, L5, L8, L10, M1, A1–A5): for each acceptance
> criterion give PASS / FAIL / NOT BUILT and how it's verified (test name or manual).
> Don't fix anything yet and don't change statuses yet; just the table.

### Claude · 20:10

The audit has to match the exact criteria, so I'm pulling the Core stories I haven't re-read in this step, plus the test names that verify them:

<details><summary>Shell: List criteria of remaining Core stories</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && for s in L1 L2 L8 L10 A1 A2 A3 A4 A5; do awk -v s="### $s." 'index($0,s)==1{p=1;print;next} p&&/^### /{exit} p&&/^[0-9]+\. /{print substr($0,1,170)}' docs/user-stories.md; done
```

</details>

<details><summary>Shell: List all passing test names</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npx vitest run --reporter=verbose 2>&1 | grep -E '^ +✓' | sed -E 's/ [0-9]+ms$//; s/^ +✓ tests\/unit\///' | cut -c1-150
```

Output:

```
<persisted-output>
Output too large (34.2KB). Full output saved to: /Users/dev/.claude/projects/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/tool-results/b0gncppue.txt

Preview (first 2KB):
setup.test.ts > project setup > exposes the app title from the messages module
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P1 (L8.6): "1,500,000" in a money field is 1,500,000.00
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P2/P3 (L8.6, rule 7): " 6.5 ", "6.5%" and "6.5 %" in the rate are 6.5
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P4 (L8.7): "abc" in a money field is rejected
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P4 (L8.7): "1e400" in a money field is rejected
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P4 (L8.7): "1e5" in a money field is rejected
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P4 (L8.7): "--5" in a money field is rejected
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P4 (L8.7): "6.5%" in a money field is rejected
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P5 (rule 7): "%" is rejected outside the rate field
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P6 (rules 1, 6): trimming and cents
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P7: "%" in the rate is rejected
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P7: "6.5%%" in the rate is rejected
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P7: "Infinity" in the rate is rejected
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P7: "NaN" in the rate is rejected
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P7: "0x10" in the rate is rejected
parse.test.ts > P. Parsing (Shared definitions, Input rules) > P7: "%6.5" in the rate is rejected
parse.test.ts > P. Parsing (Shared definitions, Input rules) > V5 (rule 1): "" counts as empty
parse.test.ts > P. Parsing (Shared definitions, Input rules) > V5 (rule 1): "   " counts as empty
parse.test.ts > P. Parsing (Shared definitions, Input rules) > V5 (rule 1): "	" counts as empty
...
</persisted-output>
```

</details>

<details><summary>Shell: Check how Vite servers answer a missing JSON file</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && (npx vite preview --port 4174 --strictPort >/dev/null 2>&1 &) ; (npx vite --port 5174 --strictPort >/dev/null 2>&1 &); for i in $(seq 1 30); do curl -s -o /dev/null http://localhost:4174/ && curl -s -o /dev/null http://localhost:5174/ && break; sleep 0.3; done; for port in 4174 5174; do printf "port %s: " $port; curl -s -o /tmp/claude-501/x.out -w "status %{http_code}, type %{content_type}" -H 'Accept: */*' http://localhost:$port/missing-config.json; printf ", body starts: %s\n" "$(head -c 40 /tmp/claude-501/x.out | tr '\n' ' ')"; done; pkill -f "vite preview --port 4174"; pkill -f "vite --port 5174"; rm -f /tmp/claude-501/x.out
```

Output:

```
port 4174: status 200, type text/html, body starts: <!doctype html> <html lang="en">   <head
port 5174: status 200, type text/html, body starts: <!doctype html> <html lang="en">   <head
```

</details>

That confirms a real defect, and I'm reporting it without fixing it, as you asked:

```
missing config.json, served by vite preview → status 200, text/html, <!doctype html>…
missing config.json, served by npm run dev  → status 200, text/html, <!doctype html>…
```
Both Vite servers answer a missing file with `index.html`, so the app shows "invalid JSON" instead of "file not found". The unit test passes only because it fakes a 404. On a plain static server (nginx, `python -m http.server`) the real 404 comes back and A4.1 works. Details are in the audit below.

## L10 manual checklist (run once per browser)
Use the current Chrome, Edge, Firefox and Safari (macOS). Start the app with `npm run dev` and open the printed link. For each browser, note its version and the date.

| # | Do this | Expected |
|---|---|---|
| 1 | Load the page | $1,798.65 monthly, loan $300,000.00, a payoff date, footer "Riverside Mortgages". No banner |
| 2 | Set price `300000`, down `0` | Total interest $347,515.44, total paid $647,515.44 |
| 3 | Rate `31`, then press Tab | Red border, "!" and "Enter an interest rate between 0 and 30."; results and schedule show "Fix the highlighted fields…" |
| 4 | Change the rate back to `6` | The message disappears as you type; $1,798.65 is back |
| 5 | Type `1,500,000` as the price, and `6.5%` as the rate | Both accepted, no error |
| 6 | Loan product → "15-year fixed" | Rate 5.75, term 15, description shown underneath; edit the rate → selector shows "Custom" |
| 7 | Extra monthly payment `200` (with 300,000 / 0 / 6 / 30) | "81 months" and "$91,173.87" saved; schedule ends at row 279 |
| 8 | Schedule → Yearly | 30 rows; year 1 payment $21,583.80 |
| 9 | Download CSV, open it | File `mortgage-schedule.csv`; line 2 is `1,2026-12,1798.65,…` (the month after today); monthly rows even in yearly view |
| 10 | Keyboard only: Tab from the top through the whole page | Selector → 5 inputs → Monthly → Yearly → Download CSV → table, each with a visible blue ring. Enter or Space works the buttons; arrow keys change the selector and scroll the table |
| 11 | 360 px wide (Chrome/Edge: DevTools device toolbar · Firefox: Ctrl/Cmd+Shift+M · Safari: Develop → Responsive Design Mode) | One column, no sideways page scroll; the schedule scrolls inside its own box with a sticky first column |
| 12 | DevTools → Network, reload, repeat a few steps | Only `localhost` requests (page files + `config.json`); nothing external |
| 13 | DevTools → Console during all steps | No errors |

## Audit of the Core stories
**Labels:** PASS means verified, either by an automated test (test names as in `tests/unit/`) or by a check I ran. FAIL means it doesn't work as written. NOT BUILT means the thing it depends on doesn't exist yet. PENDING means it needs your manual check.

**L1. Calculate the monthly payment: 7/7 PASS**
| # | Result | Verified by |
|---|---|---|
| 1 | PASS | ui `L1.1` |
| 2 | PASS | ui `L1.2 / L1.3`; engine `A3` |
| 3 | PASS | ui `L1.2 / L1.3` (also checks no error shows); engine `A4` |
| 4 | PASS | ui `L1.4` |
| 5 | PASS | ui `L1.5` (also checks there's no submit button) |
| 6 | PASS | engine `A6`; validate `B3` (price 1 accepted) |
| 7 | PASS | ui `L1.7 / L2.4` (written in full, no NaN/Infinity/exponent) |

**L2. See the total cost of the loan: 6/6 PASS**
| # | Result | Verified by |
|---|---|---|
| 1 | PASS | ui `L2.1 / L2.2`; engine `B1` |
| 2 | PASS | ui `L2.1 / L2.2`; engine `C1` |
| 3 | PASS | engine `B3` (0.00 / 120,000.00). Not checked on screen; the UI formats it the same way as the other totals |
| 4 | PASS | ui `L1.7 / L2.4`; engine `B5` |
| 5 | PASS | engine `B6`; validate `I3` (1,000-input loop) |
| 6 | PASS | ui `L2.6`; engine `C2`, `C3` (change of year) |

**L3. View and export the amortization schedule: 10/10 PASS**
| # | Result | Verified by |
|---|---|---|
| 1 | PASS | ui `L3.1`; engine `D1` |
| 2 | PASS | ui `L3.2`; engine `D2` |
| 3 | PASS | ui `L3.3`; engine `D4` |
| 4 | PASS | ui `L3.4 / L3.5`; csv `L3.4`; real download in Chromium (5b) |
| 5 | PASS | csv `L3.5`; ui `L3.4 / L3.5` (yearly view still exports monthly rows) |
| 6 | PASS | ui `L3.6`; engine `D6` |
| 7 | PASS | ui `L3.7`; engine `D7` |
| 8 | PASS | ui `L3.8`, `E7 and E9 also replace the schedule` |
| 9 | PASS | ui `L3.9`; engine `C2` |
| 10 | PASS | ui `L3.10`; csv `L3.10` |

**L5. Model extra payments: 8/8 PASS**
| # | Result | Verified by |
|---|---|---|
| 1 | PASS | ui `L5.1`; engine `E-1`, `C4` |
| 2 | PASS | ui `L5.2`; engine `E-2` |
| 3 | PASS | ui `L5.3` ("0" and ""); engine `E-4` |
| 4 | PASS | ui `L5.4` (all three values); validate `R6` |
| 5 | PASS | ui `L5.5`; engine `E-3` |
| 6 | PASS | ui `L5.6` |
| 7 | PASS | engine `D8` (every case, including the 1,000-input loop) |
| 8 | PASS | ui `L5.8`; engine `C5` |

**L8. Get clear messages for invalid input: 20/20 PASS**
| # | Result | Verified by |
|---|---|---|
| 1 | PASS | ui `rule 11` (on leaving the field) + `L8.15`; validate `V1` |
| 2 | PASS | validate `V2`; the on-screen behaviour is the same code path as #1 |
| 3 | PASS | ui `L8.3` |
| 4 | PASS | validate `R1` |
| 5 | PASS | validate `R2` |
| 6 | PASS | parse `P1`, `P2/P3` |
| 7 | PASS | parse `P4` (all 5 values); validate (E1 → no results) |
| 8 | PASS | ui `L8.8`; validate `I2`; engine `F1/F3` |
| 9 | PASS | ui `L8.9`; validate `R5` |
| 10 | PASS | validate `B1` |
| 11 | PASS | validate `B2` |
| 12 | PASS | validate `B3` |
| 13 | PASS | validate `B4` |
| 14 | PASS | ui `rule 11 / L8.14`; validate `I1` |
| 15 | PASS | ui `L8.15`, `L3.8` |
| 16 | PASS | ui `L8.16` |
| 17 | PASS | validate `I3` (1,000 seeded random and boundary inputs) |
| 18 | PASS | ui `L8.18`, `every message element is an aria-live region` |
| 19 | PASS | ui `L8.19` (an injected throw) |
| 20 | PASS | ui `L8.20` (an injected NaN result, and an engine E10) |

**L10. Use it on my phone and in any current browser: 0/3 verified yet**
| # | Result | Verified by |
|---|---|---|
| 1 | PENDING + NOT BUILT | Your checklist above. The criterion also needs the results **recorded in the README**, which doesn't exist yet |
| 2 | PENDING | PASS in Chromium (I measured scrollWidth 360, with the table scrolling inside its own box and nothing clipped). Firefox, Safari and Edge: checklist #11 |
| 3 | PENDING | Focus rings confirmed in Chromium screenshots. The full Tab order and keys need checklist #10 |

**M1. Apply loan product presets: 7/7 PASS**
| # | Result | Verified by |
|---|---|---|
| 1 | PASS | ui `M1.1` |
| 2 | PASS | ui `M1.2`; real Chromium (5c) |
| 3 | PASS | ui `M1.3` |
| 4 | PASS | ui `M1.4` (rate and term); real Chromium (5c) |
| 5 | PASS | ui `M1.5` (price, down payment, extra) |
| 6 | PASS | ui `M1.6` |
| 7 | PASS | ui `M1.7` (missing and empty list) |

**A1. Configure locale, currency and defaults: 4 PASS, 1 NOT BUILT**
| # | Result | Verified by |
|---|---|---|
| 1 | PASS | ui `A1.1`; config `C1` |
| 2 | PASS | ui `config defaults 400,000 / 5 / 25`; config `D1` |
| 3 | PASS | validate `M2`; config `R1`. Checked at unit level only: no on-screen test with a config limit |
| 4 | PASS | config `G1`, `PR6` |
| 5 | **NOT BUILT** | The README doesn't exist yet |

**A2. Define loan product presets: 5/5 PASS**
| # | Result | Verified by |
|---|---|---|
| 1 | PASS | config `PR1`; ui `M1.3` |
| 2 | PASS | config `PR2` |
| 3 | PASS | config `PR3` |
| 4 | PASS | config `PR4` |
| 5 | PASS | config `PR5`; ui `M1.7` (no selector) |

**A3. Set the disclaimer and office name: 5/5 PASS**
| # | Result | Verified by |
|---|---|---|
| 1 | PASS | ui `A3.1` |
| 2 | PASS | ui `A3.2` (no `img` element); config `S1/S2` |
| 3 | PASS | ui `A3.3`; config `S3` (missing, empty, blank) |
| 4 | PASS | config `S4` |
| 5 | PASS | ui `A3.5` |

**A4. Fail safely on a bad configuration: 7 PASS, 1 FAIL**
| # | Result | Verified by |
|---|---|---|
| 1 | **FAIL** (under `npm run dev` / `vite preview`) | The unit test (config `L1`) passes with a faked 404. Under Vite, a missing `config.json` returns `index.html` with status 200 (shown above), so the banner says "invalid JSON" instead of "file not found". It works on a plain static server. A likely fix: treat an HTML response as "file not found" |
| 2 | PASS | config `L3` |
| 3 | PASS | config `G3`; ui `E11 is shown with its exact text` |
| 4 | PASS | config `R5`; ui `E12 is shown…` |
| 5 | PASS | config `D2`, `D3` |
| 6 | PASS | ui `E12 is shown; Dismiss hides it… returns on reload` |
| 7 | PASS | config `W1` (field name + value via console.warn) |
| 8 | PASS | config `G4` (10 malformed configs), `L1`–`L5` |

**A5. Run and build locally with free tools: 2 PASS, 1 NOT BUILT, 1 PENDING + NOT BUILT**
| # | Result | Verified by |
|---|---|---|
| 1 | **NOT BUILT** | `npm install` and `npm run dev` work (used throughout), but "following the README" isn't possible yet |
| 2 | PASS | `npm test` exits 0 (317 tests, every step) |
| 3 | PASS | `npm run build` + `npx vite preview`, used for every screenshot check |
| 4 | PENDING + NOT BUILT | Your checklist #12. The result also has to be recorded in the README |

## Summary
**88 criteria: 79 PASS, 1 FAIL (A4.1), 3 NOT BUILT, 5 PENDING (two of them also need the README).**

| Status | Criteria | What's needed |
|---|---|---|
| FAIL | A4.1 | A code fix |
| NOT BUILT | A1.5, A5.1, and the README record in L10.1 and A5.4 | The README |
| PENDING | L10.1, L10.2, L10.3, A5.4 | Your browser checks |

I haven't fixed anything or changed any status. Send me your browser results when you have them.

---

### User · 20:12

> Good audit, and good catch on A4.1. Fix it in two layers:
> 1. Root cause: set appType: 'mpa' in vite.config.ts so dev and preview return a real 404.
> 2. Defence: in loadConfig, treat a response that isn't JSON (e.g. text/html) as "file not found".
> Add a test for the HTML case, check a missing config.json in the real dev server, and run all tests.
>
> My manual checklist results (1–13):
> - Chrome <version>: <all passed / what failed>
> - Safari <version>: <...>
> - Firefox <version>: <...>
> - Edge <version>: <...>
> Record these in a short "Browser check" note for the README later.

### Claude · 20:13

Your browser results still have the template placeholders ("Chrome <version>: <all passed / what failed>"), so I have nothing to record yet. Send the actual versions and results and I'll write the "Browser check" note.

Now the A4.1 fix. First, the root cause in `vite.config.ts`:

<details><summary>Read /Users/dev/Desktop/Test Project Usama/vite.config.ts</summary>



Output:

```
1	import { defineConfig } from 'vitest/config';
2
3	export default defineConfig({
4	  // Relative asset paths, so dist/ works from any folder or sub-path.
5	  base: './',
6	  test: {
7	    include: ['tests/unit/**/*.test.ts'],
8	    environment: 'node',
9	  },
10	});
11
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/vite.config.ts</summary>

Replace:

```
  base: './',
```

with:

```
  base: './',
  // 'mpa': no single-page-app fallback, so a missing file (e.g. config.json) gets a real 404
  // in `npm run dev` and `vite preview` instead of index.html with status 200 (A4.1).
  appType: 'mpa',
```

</details>

<details><summary>Shell: Verify real 404s from dev and preview servers</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm run build 2>&1 | tail -1 && (npx vite preview --port 4174 --strictPort >/dev/null 2>&1 &) ; (npx vite --port 5174 --strictPort >/dev/null 2>&1 &); for i in $(seq 1 40); do curl -s -o /dev/null http://localhost:4174/ && curl -s -o /dev/null http://localhost:5174/ && break; sleep 0.3; done; for port in 4174 5174; do printf "port %s missing json: " $port; curl -s -o /dev/null -w "status %{http_code}, type %{content_type}\n" -H 'Accept: */*' http://localhost:$port/missing-config.json; printf "port %s index:        " $port; curl -s -o /dev/null -w "status %{http_code}\n" http://localhost:$port/; printf "port %s config.json:  " $port; curl -s -o /dev/null -w "status %{http_code}, type %{content_type}\n" http://localhost:$port/config.json; done; pkill -f "vite preview --port 4174"; pkill -f "vite --port 5174"
```

Output:

```
✓ built in 112ms
port 4174 missing json: status 404, type
port 4174 index:        status 200
port 4174 config.json:  status 200, type application/json
port 5174 missing json: status 404, type
port 5174 index:        status 200
port 5174 config.json:  status 200, type application/json
```

</details>

<details><summary>Shell: Add HTML-response tests for loadConfig</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('tests/unit/config.test.ts'); t=p.read_text()
anchor="""  it('L6: requests ./config.json with cache "no-store"', async () => {"""
new="""  const respondWith =
    (body: string, contentType: string | null): FetchLike =>
    async () => ({
      ok: true,
      status: 200,
      headers: { get: (name: string) => (name.toLowerCase() === 'content-type' ? contentType : null) },
      text: async () => body,
    });
  const HTML = '<!doctype html>\\n<html lang="en"><head><title>Mortgage Calculator</title></head></html>';
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

"""+anchor
assert t.count(anchor)==1; p.write_text(t.replace(anchor,new))
EOF
npx vitest run tests/unit/config.test.ts 2>&1 | grep -E '×|Tests ' | head
```

Output:

```
     × A4.1 defence: an HTML page with status 200 (single-page-app fallback) → "file not found" 13ms
     × A4.1 defence: an HTML body without a content type is also "file not found" 10ms
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯
      Tests  2 failed | 93 passed (95)
```

</details>

The two HTML tests fail as expected: today they report "invalid JSON". Now the fix in `loadConfig`:

<details><summary>Shell: Treat HTML responses as file not found, run tests</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/config/loadConfig.ts'); t=p.read_text()
def rep(old,new):
    global t
    assert t.count(old)==1, old; t=t.replace(old,new)
rep("""export interface FetchResponseLike {
  ok: boolean;
  status: number;
  text(): Promise<string>;
}""","""export interface FetchResponseLike {
  ok: boolean;
  status: number;
  /** Optional so simple fakes in tests can leave it out. */
  headers?: { get(name: string): string | null };
  text(): Promise<string>;
}""")
rep("""const browserFetch: FetchLike = (url, init) => fetch(url, init);""","""const browserFetch: FetchLike = (url, init) => fetch(url, init);

/**
 * True when a server answered with an HTML page instead of the config: some servers return
 * index.html with status 200 for missing files (single-page-app fallback). JSON never starts
 * with "<". Other content types (such as text/plain) are still parsed, because some static
 * servers send valid .json files that way.
 */
function isHtml(response: FetchResponseLike, body: string): boolean {
  const type = response.headers?.get('content-type') ?? '';
  return /^\\s*text\\/html\\b/i.test(type) || body.trimStart().startsWith('<');
}""")
rep("""  let json: unknown;
  try {""","""  // Defence in depth for A4.1; vite.config.ts (appType: 'mpa') already returns a real 404.
  if (isHtml(response, body)) return failure('file not found', 'the server returned an HTML page');

  let json: unknown;
  try {""")
rep("""  let body: string;
  try {
    // no-store: an edited config.json shows on the next reload.
    const response = await fetchFn(CONFIG_URL, { cache: 'no-store' });""","""  let body: string;
  let response: FetchResponseLike;
  try {
    // no-store: an edited config.json shows on the next reload.
    response = await fetchFn(CONFIG_URL, { cache: 'no-store' });""")
p.write_text(t)
EOF
npx tsc --noEmit && echo tsc OK && npm test 2>&1 | grep -E '×|Test Files|Tests '
```

Output:

```
tsc OK
 Test Files  7 passed (7)
      Tests  321 passed (321)
```

</details>

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/src/config/loadConfig.ts</summary>

Replace:

```
  const type = response.headers?.get('content-type') ?? '';
  return /^\s*text\/html\b/i.test(type) || body.trimStart().startsWith('<');
```

with:

```
  let type = '';
  try {
    type = response.headers?.get('content-type') ?? '';
  } catch {
    // An odd headers object must not break loading (loadConfig never rejects).
  }
  return /^\s*text\/html\b/i.test(type) || body.trimStart().startsWith('<');
```

Output:

```
The file /Users/dev/Desktop/Test Project Usama/src/config/loadConfig.ts has been updated successfully. (file state is current in your context — no need to Read it back)
```

</details>

Now the end-to-end check in the real dev server with `config.json` actually missing. I'll move the file aside temporarily (backing it up first) and restore it straight afterwards:

<details><summary>Shell: Back up and temporarily move config.json aside</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && cp public/config.json /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad/config.backup.json && mv public/config.json public/config.json.moved && ls public
```

</details>

<details><summary>Shell: Start the dev server without config.json</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npx vite --port 5173 --strictPort
```

</details>

<details><summary>Browser: resize</summary>

```json
{
  "width": 1280,
  "height": 800
}
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:5173/"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "async () => { await new Promise((r) => setTimeout(r, 300)); return { banner: document.querySelector('.config-banner p')?.textContent ?? null, payment: document.querySelector('[data-result=\"monthly-payment\"]')?.textContent ?? null, presetSelector: !!document.querySelector('#field-preset'), footer: document.querySelector('footer')?.textContent }; }"
}
```

</details>

<details><summary>Browser: console_messages</summary>

```json
{
  "level": "warning"
}
```

Output:

```
### Result
Total messages: 4 (Errors: 1, Warnings: 1)
Returning 2 messages for level "warning"

[ERROR] Failed to load resource: the server responded with a status of 404 (Not Found) @ http://localhost:5173/config.json:0
[WARNING] [config] Configuration could not be loaded (file not found). 404 @ http://localhost:5173/@vite/client:363
```

</details>

<details><summary>Browser: close</summary>

```json
{}
```

</details>

<details><summary>TaskStop</summary>

```json
{
  "task_id": "buih8j887"
}
```

</details>

<details><summary>Shell: Restore config.json and run final checks</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && mv public/config.json.moved public/config.json && cmp public/config.json /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad/config.backup.json && echo "config.json restored, identical to backup" && git diff --stat -- public/ && rm -rf .playwright-mcp && npm test 2>&1 | grep -E 'Test Files|Tests ' && npx tsc --noEmit && echo tsc OK && npm run build 2>&1 | tail -1
```

Output:

```
config.json restored, identical to backup
 Test Files  7 passed (7)
      Tests  321 passed (321)
tsc OK
✓ built in 117ms
```

</details>

<details><summary>Shell: Commit the A4.1 fix</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git add vite.config.ts src/config/loadConfig.ts tests/unit/config.test.ts && git status --short && git commit -q -F - <<'EOF'
Fix A4.1: report a missing config.json as "file not found"

- vite.config.ts: appType 'mpa', so dev and preview return a real 404
  instead of index.html with status 200 (single-page-app fallback)
- loadConfig: an HTML response (text/html, or a body starting with "<")
  is treated as "file not found"; other content types are still parsed
- 4 new tests; verified in the real dev server with config.json removed

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --oneline | head -1
```

Output:

```
M  src/config/loadConfig.ts
M  tests/unit/config.test.ts
M  vite.config.ts
?? transcripts/session-03-part4.md
?? transcripts/session-03-part5.md
310fb71 Fix A4.1: report a missing config.json as "file not found"
```

</details>

A4.1 is fixed and verified in the real dev server with `config.json` actually missing. All 321 tests pass, and I committed it locally as `310fb71` (not pushed).

## What changed
1. **Root cause:** `vite.config.ts` now sets `appType: 'mpa'`. I checked with curl, before and after:

   | | Before | After |
   |---|---|---|
   | Missing JSON, `npm run dev` | 200, text/html (index.html) | **404** |
   | Missing JSON, `vite preview` | 200, text/html | **404** |
   | `/` and `/config.json` | 200 | 200 (unchanged) |

2. **Defence in `loadConfig`:** an HTML response is treated as "file not found". That means either a `text/html` content type or a body starting with `<`, which valid JSON never does. I deliberately didn't reject every non-JSON content type: some static servers send `.json` files as `text/plain`, and refusing those would break a valid config. The header check can't throw, so `loadConfig` still never rejects.

3. **Tests:** 4 new ones, written first. The two HTML tests failed before the fix. They cover:
   - HTML with status 200;
   - HTML with no content type;
   - valid JSON still accepted as `application/json`, `text/plain` or with no type;
   - broken non-HTML JSON still reported as "invalid JSON".

## Check in the real dev server
I moved `public/config.json` aside and loaded the app with `npm run dev`:
- **Banner:** "Configuration could not be loaded (file not found). Using default settings." (exact E11 text)
- **Calculator:** works on the built-in defaults ($1,798.65); no selector, because there are no presets; default disclaimer in the footer.
- **Console:** our `[config] … (file not found). 404` warning (A4.7), plus the browser's own "Failed to load resource: 404" line. Browsers always log that for a missing file; it's expected and the app can't suppress it.

Then I put `config.json` back and confirmed it's identical to a backup made beforehand (`cmp`); git shows no change to it.

## Updated audit
**A4.1 moves from FAIL to PASS.** The tally is now 80 PASS, 0 FAIL, 3 NOT BUILT (the README items) and 5 PENDING (your browser checks).

## Browser check note
I can't write this yet, because your results still read `Chrome <version>: <all passed / what failed>` (the same for all four browsers). Please send each browser's version and whether checks 1–13 passed or which failed. I'll then write the "Browser check" section for the README. I won't fill it in myself, since L10.1 has to report what you actually saw.

`transcripts/session-03-part4.md` and `session-03-part5.md` are untracked. Search both for `ghp_` before committing them.

---

### User · 20:50

> Finalise the statuses in docs/user-stories.md:
> - Implemented only where every criterion passes: L1, L2, L3, L5, L8, M1, A2, A3, A4.
> - L10: Not implemented. Note: built and checked in Chromium (360px, focus); not verified by
>   hand in Chrome, Edge, Firefox and Safari.
> - A1 and A5: Implemented only after the README exists and A1.5/A5.1 pass; check again at the end.
> - All Stretch and "Not in this build" stories stay Not implemented.
> Also make app-roles.md and product-plan.md describe only what exists (e.g. no "once built"
> features as if they exist). Show me the status list.

### Claude · 20:50

Starting with the statuses. Here are the current status lines:

<details><summary>Shell: List status lines and story headings</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -n '^\*\*Priority:\*\*' docs/user-stories.md | sed -E 's/^([0-9]+):/\1 /' && grep -n '^### [LMA][0-9]*\.' docs/user-stories.md | head -30
```

Output:

```
82 **Priority:** Must · **Scope:** Core · **Serves:** J-1 · **Status:** Not implemented
98 **Priority:** Must · **Scope:** Core · **Serves:** J-2 · **Status:** Not implemented
111 **Priority:** Must · **Scope:** Core · **Serves:** J-6 · **Status:** Not implemented
128 **Priority:** Must · **Scope:** Stretch · **Serves:** J-3 · **Status:** Not implemented
143 **Priority:** Must · **Scope:** Core · **Serves:** J-4 · **Status:** Not implemented
158 **Priority:** Should · **Scope:** Not in this build · **Serves:** J-5 · **Status:** Not implemented
173 **Priority:** Must · **Scope:** Stretch · **Serves:** J-7 · **Status:** Not implemented
188 **Priority:** Must · **Scope:** Core · **Serves:** J-1 · **Status:** Not implemented
223 **Priority:** Should · **Scope:** Not in this build · **Serves:** J-1 · **Status:** Not implemented
236 **Priority:** Must · **Scope:** Core · **Serves:** J-14 · **Status:** Not implemented
246 **Priority:** Should · **Scope:** Not in this build · **Serves:** J-3 · **Status:** Not implemented
257 **Priority:** Could · **Scope:** Not in this build · **Serves:** J-1 · **Status:** Not implemented
273 **Priority:** Must · **Scope:** Core · **Serves:** J-9 · **Status:** Not implemented
287 **Priority:** Must · **Scope:** Stretch · **Serves:** J-10 · **Status:** Not implemented
302 **Priority:** Must · **Scope:** Not in this build · **Serves:** J-10 · **Status:** Not implemented
313 **Priority:** Should · **Scope:** Not in this build · **Serves:** J-8 · **Status:** Not implemented
328 **Priority:** Must · **Scope:** Core · **Serves:** J-11 · **Status:** Not implemented
356 **Priority:** Must · **Scope:** Core · **Serves:** J-11 · **Status:** Not implemented
368 **Priority:** Must · **Scope:** Core · **Serves:** J-11 · **Status:** Not implemented
382 **Priority:** Must · **Scope:** Core · **Serves:** J-12 · **Status:** Not implemented
399 **Priority:** Must · **Scope:** Core · **Serves:** J-13 · **Status:** Not implemented
410 **Priority:** Should · **Scope:** Stretch · **Serves:** J-13 · **Status:** Not implemented
420 **Priority:** Could · **Scope:** Not in this build · **Serves:** J-13 · **Status:** Not implemented
81:### L1. Calculate the monthly payment
97:### L2. See the total cost of the loan
110:### L3. View and export the amortization schedule
127:### L4. Compare scenarios side by side
142:### L5. Model extra payments
157:### L6. Calculate what I can afford
172:### L7. Share and print a scenario
187:### L8. Get clear messages for invalid input
222:### L9. Include the full monthly housing cost
235:### L10. Use it on my phone and in any current browser
245:### L11. Remember my last scenario
256:### L12. Enter the down payment as a percentage
272:### M1. Apply loan product presets
286:### M2. Print a client quote
301:### M3. Send the client a ready-made scenario
312:### M4. Compare our products for a client
327:### A1. Configure locale, currency and defaults
355:### A2. Define loan product presets
367:### A3. Set the disclaimer and office name (on-screen footer)
381:### A4. Fail safely on a bad configuration
398:### A5. Run and build locally with free tools
409:### A6. Automated browser smoke test
419:### A7. Optional free public deployment
```

</details>

<details><summary>Shell: Set story statuses and notes in user stories</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib,re
p=pathlib.Path('docs/user-stories.md'); lines=p.read_text().split('\n')
implemented={'L1','L2','L3','L5','L8','M1','A2','A3','A4'}
notes={
 'L10':' Built and checked in Chromium only (360 px layout, visible focus); not yet verified by hand in Chrome, Edge, Firefox and Safari, and the README browser record (L10.1) does not exist yet.',
 'A1':' All criteria pass except A1.5, which needs the README. Re-check when the README exists.',
 'A5':' A5.2 and A5.3 pass; A5.1 and the README record in A5.4 need the README. Re-check when the README exists.',
}
current=None; changed=[]
for i,l in enumerate(lines):
    m=re.match(r'^### ([LMA]\d+)\. ',l)
    if m: current=m.group(1); continue
    if l.startswith('**Priority:**') and current:
        assert l.endswith('**Status:** Not implemented'), l
        if current in implemented:
            lines[i]=l[:-len('Not implemented')]+'Implemented'
        elif current in notes:
            lines[i]=l+'.'+notes[current]
        changed.append((current,lines[i].split('**Status:** ')[1]))
        current=None
t='\n'.join(lines)
old='- **Status** describes what the app does today. All stories start as Not implemented and are updated after the build.'
assert t.count(old)==1
t=t.replace(old,'- **Status** describes what the app does today (checked on 6 November 2026). A story is Implemented only when every one of its acceptance criteria passes.')
p.write_text(t)
for c,s in changed: print(f'{c:4} {s}')
EOF
```

Output:

```
L1   Implemented
L2   Implemented
L3   Implemented
L4   Not implemented
L5   Implemented
L6   Not implemented
L7   Not implemented
L8   Implemented
L9   Not implemented
L10  Not implemented. Built and checked in Chromium only (360 px layout, visible focus); not yet verified by hand in Chrome, Edge, Firefox and Safari, and the README browser record (L10.1) does not exist yet.
L11  Not implemented
L12  Not implemented
M1   Implemented
M2   Not implemented
M3   Not implemented
M4   Not implemented
A1   Not implemented. All criteria pass except A1.5, which needs the README. Re-check when the README exists.
A2   Implemented
A3   Implemented
A4   Implemented
A5   Not implemented. A5.2 and A5.3 pass; A5.1 and the README record in A5.4 need the README. Re-check when the README exists.
A6   Not implemented
A7   Not implemented
```

</details>

Statuses are set. Next, `app-roles.md` and `product-plan.md`. Reading both in full, so I catch every place that describes something not built as if it exists:

<details><summary>Read /Users/dev/Desktop/Test Project Usama/docs/app-roles.md</summary>



Output:

```
1	# App Roles
2
3	**Product:** Mortgage Calculator · **Version:** 1.1 · **Date:** 2026-11-06
4
5	Related: [Product plan](product-plan.md) · [Jobs To Be Done](jobs-to-be-done.md) · [User Stories](user-stories.md)
6
7	The app has three roles. Each one is a real kind of person with different needs. The Loanee and the Manager use the same screens, but they come to them for different reasons. The Admin never uses a special screen.
8
9	---
10
11	## Loanee (primary)
12
13	A Loanee is a person deciding whether and how to take a home loan, such as a first-time buyer, an owner moving home or someone refinancing, who is usually not financially trained and is wary of entering personal details online. They can enter a home price, down payment, interest rate and term, see the monthly payment, the total interest and total paid, the payoff date and how the balance falls month by month, and try extra payments and alternative loans before committing to anything. They must never have their inputs sent off their device or stored anywhere outside their own browser.
14
15	**Context**
16	- Often confuses the interest rate with the total cost of the loan.
17	- Uses a phone as often as a laptop, sometimes while viewing a home.
18	- Makes this decision a few times in a lifetime, so has no practice at it.
19
20	**What they need from the app:** understanding and confidence. Numbers they can trust, explained plainly, and enough room to try "what if" without pressure.
21
22	**Success looks like:** the Loanee can explain, in their own words, what the loan will cost per month and in total, and why they chose their option.
23
24	---
25
26	## Manager (secondary)
27
28	A Manager is a loan officer, mortgage broker or bank branch employee who prepares loan quotes for several clients a day and is accountable for what those quotes say. They can pick one of the office's loan products to fill in the rate and term, enter the client's price and down payment, and (once built) print a quote or send the client a link to the same scenario. They must never be able to give a client a quote that lacks the configured disclaimer and the date it was prepared, and a client's name must never be put into a share link or stored by the app.
29
30	**Context**
31	- Time per quote matters. A slow quote means fewer clients served.
32	- Today relies on a personal spreadsheet that differs from colleagues' spreadsheets.
33	- Must show the official disclaimer on anything given to a client.
34
35	**What they need from the app:** speed, consistency with colleagues, and compliance. Two Managers quoting the same client must get the same numbers, and every handout must carry the required wording.
36
37	**Success looks like:** two Managers quoting the same client get identical numbers, and a quote takes minutes instead of rebuilding a spreadsheet.
38
39	---
40
41	## Admin (supporting)
42
43	An Admin is the person who sets up and maintains the calculator for an office, typically IT staff or a technical broker, who can edit a JSON file and run `npm` commands but should not have to change code. They can set the currency, locale, default values, allowed ranges, loan product presets, office name and disclaimer in `public/config.json`, run the tests and serve the built files. They must never be able to collect, receive or view what users enter, and nothing they write in the config may run as code in users' browsers.
44
45	**Context**
46	- Responsible if the app shows wrong defaults, a withdrawn product or an outdated disclaimer.
47	- Edits config rarely, so mistakes are likely and must be easy to spot.
48
49	**What they need from the app:** correctness without touching code. A config mistake must be reported clearly and must never break the calculator for everyone else.
50
51	**Success looks like:** a misconfigured file never breaks the app. The Admin gets a clear message naming what is wrong, and users still get a working calculator on safe defaults.
52
53	---
54
55	## How their needs differ
56
57	| | Loanee | Manager | Admin |
58	|---|---|---|---|
59	| **Comes to the app to** | Make one big personal decision | Answer many clients quickly | Make the app correct for the office |
60	| **Main need** | Understanding and confidence | Speed, consistency between colleagues, compliance | Correctness without code changes |
… (27 more lines not shown)
```

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/docs/product-plan.md</summary>



Output:

```
1	# Mortgage Calculator: Product & Build Plan
2
3	**Status:** Draft v1.1 · **Date:** 2026-11-06 · **Owner:** Engineering
4
5	Related documents:
6	- [App Roles](app-roles.md)
7	- [Jobs To Be Done](jobs-to-be-done.md)
8	- [User Stories & Acceptance Criteria](user-stories.md)
9
10	---
11
12	## 1. Product decisions (and why)
13
14	| Decision | Choice | Reason |
15	|---|---|---|
16	| **Primary user** | The **Loanee**, a person deciding whether and how to take a home loan (first-time buyers, people refinancing). | They carry the risk and have the least tooling. Bank calculators show one number (the monthly payment) and hide the total cost and trade-offs. |
17	| **Secondary user** | The **Manager**, a loan officer or mortgage broker who prepares quotes for clients. | Today they build quotes in personal spreadsheets, which drift, contain formula errors, and look different in every branch. A shared, tested calculator gives consistent numbers. |
18	| **Supporting user** | The **Admin**, the person who deploys the app for an office (IT staff or a technical broker). | Someone has to set the currency, defaults, limits, loan product presets and disclaimer. This should be one config file, not a code change. |
19	| **Core problem** | "What will this loan really cost me each month and in total, and how do my choices (down payment, term, rate, extra payments) change that?" | This is the decision people get wrong. The monthly payment alone hides that a 30-year loan can cost more in interest than the amount borrowed. |
20	| **Scope boundary** | A **calculator and comparison tool**, not a loan application, credit check or rate marketplace. | Keeps the app free of personal data, accounts and servers, which the requirements demand anyway. |
21	| **Architecture** | **100% client-side** static web app. No backend, no accounts, no API keys, no tracking. | Meets the "run locally with no paid services" requirement, avoids storing financial data, and can be hosted free on any static host. |
22	| **How roles are enforced** | Roles are **responsibilities, not logins**. The Admin acts through `public/config.json` and deployment. Manager and Loanee use the same UI. | Any login in a purely client-side app would be fake security, because anyone can bypass it in the browser's developer tools. If real access control is ever needed, it requires a backend (see §9). |
23
24	## 2. Product scope
25
26	### 2.1 What the product does (v1, product view)
27
28	**Must have**
29	1. Monthly principal-and-interest payment from home price, down payment, interest rate and term.
30	2. Total amount paid, total interest, and payoff date.
31	3. Full amortization schedule (monthly and yearly views), exportable to CSV.
32	4. Clear, field-level validation. No crash, `NaN`, `Infinity` or negative output ever reaches the screen.
33	5. Correct handling of a 0% interest rate (the standard formula divides by zero there).
34	6. Side-by-side comparison of up to 3 scenarios.
35	7. Effect of extra monthly payments: interest saved and months saved.
36	8. Shareable URL that restores a scenario; printable quote summary.
37	9. Admin config file: currency, locale, defaults, input limits, loan product presets, disclaimer.
38	10. Works in current Chrome, Edge, Firefox and Safari, on phone and desktop widths.
39
40	**Should have**
41	- Estimated monthly housing cost including property tax, home insurance and fees.
42	- Reverse calculation: "What can I borrow for a monthly budget of X?"
43	- Remember the last scenario in the browser (local storage only, never sent anywhere).
44
45	**Could have**
46	- Down payment entered as a percentage of the home price.
47
48	**Won't have in v1**
49	- Accounts, login, server-side storage, live market rates, credit scoring, loan application forms.
50
51	### 2.2 Scope for this submission
52
53	The assignment allows 2 to 4 hours, and every story marked Implemented must pass all of its acceptance criteria. A small app that works beats a large one that half works, and an honest "Not implemented" beats an overstated claim. So this build is cut to the stories that answer the core problem, plus the minimum config and run setup a reviewer needs.
54
55	| Tier | Stories / items | Notes |
56	|---|---|---|
57	| **Core (will build and test)** | L1, L2, L3, L5, L8, L10, M1, A1, A2, A3, A4, A5 | A3 covers the on-screen footer only. A5 covers local run, unit tests and build. L10 is verified by a manual check in Chrome, Edge, Firefox and Safari, written up in the README. L8.6 is verified by boundary and extreme-value unit tests plus a loop over about 1,000 random inputs. |
58	| **Stretch (only if time allows)** | L4, L7, M2, A6 | A6 is a small Playwright smoke test on Chromium, Firefox and WebKit plus the "no external requests" check. |
59	| **Not in this build (kept as specified future work)** | L6, L9, L11, L12, M3, M4, A7 | A7 is the GitHub Pages deployment. Also not in this build: the axe-core accessibility check, the 10,000-run fuzz test and the 9
… (25 more characters not shown)
```

</details>

<details><summary>Shell: Update roles and plan to describe only what exists</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
def edit(path, pairs):
    p=pathlib.Path(path); t=p.read_text()
    for old,new in pairs:
        assert t.count(old)==1, (path, old[:60]); t=t.replace(old,new)
    p.write_text(t)

edit('docs/app-roles.md', [
("**Version:** 1.1 · **Date:** 2026-11-06", "**Version:** 1.2 · **Date:** 2026-11-06 (describes the app as built)"),
("and try extra payments and alternative loans before committing to anything.",
 "and try extra payments and other rates, terms and down payments before committing to anything."),
("They can pick one of the office's loan products to fill in the rate and term, enter the client's price and down payment, and (once built) print a quote or send the client a link to the same scenario. They must never be able to give a client a quote that lacks the configured disclaimer and the date it was prepared, and a client's name must never be put into a share link or stored by the app.",
 "They can pick one of the office's loan products to fill in the rate and term, enter the client's price and down payment, show the client the monthly payment, total cost and repayment schedule on screen, and download the schedule as a CSV file. They must never be shown figures without the office's configured disclaimer on the same screen, and the app must never ask for, store or send a client's name or other personal details."),
("- Must show the official disclaimer on anything given to a client.",
 "- Must show the official disclaimer on anything given to a client. This build has no printed quote (M2 is not built); the disclaimer is on screen only, and the CSV export is a working file without it."),
("| **Must never** | Have inputs leave the browser | Hand out a quote without disclaimer and date, or put a client's name in a link | Collect user data, or inject code through config |",
 "| **Must never** | Have inputs leave the browser | See figures without the disclaimer, or have a client's details stored or sent | Collect user data, or inject code through config |"),
("- **The Manager and the Loanee use the same interface.** Manager features (presets, and later quote printing and share links) are useful to Loanees too and expose nothing sensitive.",
 "- **The Manager and the Loanee use the same interface.** The Manager's main feature, the loan product selector, is useful to Loanees too and exposes nothing sensitive."),
("so inputs cannot leave the browser. The \"Prepared for\" name is not part of the URL or storage format. Config text is rendered as plain text, never as HTML.",
 "so inputs cannot leave the browser. The app has no name field and stores nothing: no local storage, cookies or inputs in the URL. Config text is rendered as plain text, never as HTML."),
("| Enter a \"Prepared for\" name on a printed quote (M2) | Not needed | Yes, printed only, never stored | No |\n", ""),
("| Run tests and deploy | No | No | Yes |", "| Run tests and serve the build | No | No | Yes |"),
])

edit('docs/product-plan.md', [
("**Status:** Draft v1.1 · **Date:** 2026-11-06 · **Owner:** Engineering",
 "**Status:** v1.2, updated after the build · **Date:** 2026-11-06 · **Owner:** Engineering"),
("| **Scope boundary** | A **calculator and comparison tool**, not a loan application, credit check or rate marketplace. |",
 "| **Scope boundary** | A **loan calculator** (side-by-side comparison is planned as L4, not built), not a loan application, credit check or rate marketplace. |"),
("### 2.1 What the product does (v1, product view)\n\n**Must have**\n1. Monthly principal-and-interest payment from home price, down payment, interest rate and term.\n2. Total amount paid, total interest, and payoff date.\n3. Full amortization schedule (monthly and yearly views), exportable to CSV.\n4. Clear, field-level validation. No crash, `NaN`, `Infinity` or negative output ever reaches the screen.\n5. Correct handling of a 0% interest rate (the standard formula divides by zero there).\n6. Side-by-side comparison of up to 3 scenarios.\n7. Effect of extra monthly payments: interest saved and months saved.\n8. Shareable URL that restores a scenario; printable quote summary.\n9. Admin config file: currency, locale, defaults, input limits, loan product presets, disclaimer.\n10. Works in current Chrome, Edge, Firefox and Safari, on phone and desktop widths.\n\n**Should have**\n- Estimated monthly housing cost including property tax, home insurance and fees.\n- Reverse calculation: \"What can I borrow for a monthly budget of X?\"\n- Remember the last scenario in the browser (local storage only, never sent anywhere).\n\n**Could have**\n- Down payment entered as a percentage of the home price.",
 "### 2.1 What the product does (v1, product view)\n\nThis is the full product plan. Each item says whether it exists in this build.\n\n**Must have**\n1. Monthly principal-and-interest payment from home price, down payment, interest rate and term. **Built.**\n2. Total amount paid, total in
… (4572 more characters not shown)
```

Output:

```
ok
no leftover future-as-present wording
```

</details>

No future-as-present wording is left. Running the tests (nothing in code changed, but a quick check costs nothing), then making the checkpoint commit:

<details><summary>Shell: Run tests and commit the doc updates</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm test 2>&1 | grep -E 'Test Files|Tests ' && git add docs && git commit -q -F - <<'EOF'
Set story statuses; make roles and plan describe the build as it is

- Implemented: L1, L2, L3, L5, L8, M1, A2, A3, A4 (every criterion passes)
- L10, A1, A5 stay Not implemented with a note on what is missing
- app-roles: no printing/share-link/"Prepared for" features described as existing
- product-plan: built / not built per item, build result table, current module
  layout, milestone status, honest disclaimer risk (no printed quote, CSV without it)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --oneline | head -1
```

Output:

```
 Test Files  7 passed (7)
      Tests  321 passed (321)
bc57154 Set story statuses; make roles and plan describe the build as it is
```

</details>

I've finalised the statuses in `docs/user-stories.md` and updated `app-roles.md` and `product-plan.md` so they describe only what exists. Committed locally as `bc57154` (not pushed).

## Status list
| Story | Scope | Status |
|---|---|---|
| L1 Calculate the monthly payment | Core | **Implemented** |
| L2 See the total cost | Core | **Implemented** |
| L3 Schedule and CSV | Core | **Implemented** |
| L4 Compare scenarios | Stretch | Not implemented |
| L5 Extra payments | Core | **Implemented** |
| L6 What I can afford | Not in this build | Not implemented |
| L7 Share and print | Stretch | Not implemented |
| L8 Clear messages for invalid input | Core | **Implemented** |
| L9 Full housing cost | Not in this build | Not implemented |
| L10 Phone and any current browser | Core | Not implemented. *Note: built and checked in Chromium only (360 px layout, visible focus); not yet verified by hand in Chrome, Edge, Firefox and Safari, and the README browser record (L10.1) doesn't exist yet.* |
| L11 Remember last scenario | Not in this build | Not implemented |
| L12 Down payment as a percentage | Not in this build | Not implemented |
| M1 Loan product presets | Core | **Implemented** |
| M2 Print a client quote | Stretch | Not implemented |
| M3 Send a ready-made scenario | Not in this build | Not implemented |
| M4 Compare products | Not in this build | Not implemented |
| A1 Locale, currency and defaults | Core | Not implemented. *Note: all criteria pass except A1.5, which needs the README. Re-check when the README exists.* |
| A2 Loan product presets in config | Core | **Implemented** |
| A3 Disclaimer and office name | Core | **Implemented** |
| A4 Fail safely on bad config | Core | **Implemented** |
| A5 Run and build locally | Core | Not implemented. *Note: A5.2 and A5.3 pass; A5.1 and the README record in A5.4 need the README. Re-check when the README exists.* |
| A6 Browser smoke test | Stretch | Not implemented |
| A7 Public deployment | Not in this build | Not implemented |

That's 9 Implemented and 14 Not implemented. I also changed the Shared definitions line to "Status describes what the app does today (checked on 6 November 2026). A story is Implemented only when every one of its acceptance criteria passes."

## app-roles.md: now describes only what exists
- **Manager:** the role sentence no longer says "(once built) print a quote or send a link". It now says they can pick a loan product, enter the client's price and down payment, show the results and schedule on screen, and download the schedule as CSV.
- **Manager's "must never":** it referred to quotes and share links, which don't exist. It now covers things the app actually prevents: figures are never shown without the configured disclaimer on the same screen, and the app never asks for, stores or sends a client's details.
- **Manager context:** says plainly that there's no printed quote, that the disclaimer is on screen only, and that the CSV is a working file without it.
- **Enforcement:** "later quote printing and share links" and the "Prepared for" field are removed. In their place is a statement that the app stores nothing (no local storage, no cookies, no inputs in the URL).
- **Table:** the "Prepared for" row is removed, and "deploy" now reads "serve the build".

## product-plan.md: now describes the build
- **§1:** "calculator and comparison tool" becomes "loan calculator (comparison planned as L4, not built)".
- **§2.1:** every item is marked **Built** or **Not built**, with item 10 marked "Built; checked in Chromium only".
- **§2.2:** a new "Result of this build" table, with the same statuses as above.
- **§4:** the module and test layout matches the real files, and the Playwright row is marked "not built".
- **§5:** shared URLs are marked "L7, not built, planned".
- **§6:** milestone status: 1–3 done, 4 partly done, 5 not started, 6 in progress.
- **§9:** the disclaimer risk is stated plainly. There's no printed quote, and the CSV export doesn't include the disclaimer.

## Still open
- **The README.** A1 and A5 can only become Implemented once it exists and A1.5 and A5.1 pass. The plan is to re-check at the end, as you said.
- **Your browser results** for L10. Your last message still had the placeholders, so I haven't written the "Browser check" note yet.

---

### User · 20:52

> Write README.md in the root, short and accurate, covering exactly:
> 1. What the app is, who it's for (the 3 roles) and why a mortgage calculator.
> 2. Prerequisites (Node.js 22.12+), exact install/start/test/build commands.
> 3. "Try each role": the Loanee uses the calculator; the Manager picks a loan product; the
>    Admin edits public/config.json (officeName, EUR/de-DE, add a preset, a bad preset → banner).
> 4. The config reference (every key, type, default, example) for A1.5.
> 5. Story status summary with links to docs/ and transcripts/.
> 6. AI tool and mode Opus 5.5. Codechanged by hand: none.
> 7. Assumptions, i responsibilitiesnot logins, browsers not
>    checked by haned, not financialadvice.

### Claude · 20:53

Parts of your message were cut off again. I'm reading item 6 as "AI tool and model: Claude Code with Claude Opus 5.5; code changed by hand: none", and item 7 as "assumptions, including: roles are responsibilities, not logins; browsers not checked by hand; not financial advice".

Before writing the README I'll gather two facts it has to state accurately. First, which network requests the app actually makes (A5.4), measured in Chromium:

<details><summary>Shell: Build and serve the app for a network check</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm run build 2>&1 | tail -1 && npx vite preview --port 4173 --strictPort
```

</details>

<details><summary>ToolSearch</summary>

```json
{
  "query": "select:mcp__playwright__browser_network_requests",
  "max_results": 1
}
```

Output:

```
(no output)
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: select_option</summary>

```json
{
  "target": "#field-preset",
  "values": [
    "f15"
  ]
}
```

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-extraPayment",
  "text": "200"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => { document.querySelector('.schedule [data-mode=\"yearly\"]').click(); document.querySelector('.schedule .csv-button').click(); return 'ok'; }"
}
```

</details>

<details><summary>Browser: network_requests</summary>

```json
{
  "static": true,
  "all": true
}
```

Output:

```
### Result
1. [GET] http://localhost:4173/ => [200] OK
2. [GET] http://localhost:4173/assets/index-DVS9BMU4.js => [200] OK
3. [GET] http://localhost:4173/assets/index-h35Y7IVK.css => [200] OK
4. [GET] http://localhost:4173/config.json => [200] OK
```

</details>

<details><summary>Browser: close</summary>

```json
{}
```

</details>

<details><summary>TaskStop</summary>

```json
{
  "task_id": "bzunv3vhn"
}
```

</details>

<details><summary>Shell: Clean up and gather facts for the README</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && rm -rf .playwright-mcp && cat package.json | grep -A6 '"scripts"' && ls transcripts && node -p "Object.keys(require('./public/config.json'))"
```

Output:

```
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
session-02.md
session-03-part1.md
session-03-part2.md
session-03-part3.md
session-03-part4.md
session-03-part5.md
[
  'currency',
  'locale',
  'officeName',
  'disclaimer',
  'defaults',
  'limits',
  'presets'
]
```

</details>

Now the README:

<details><summary>Write /Users/dev/Desktop/Test Project Usama/README.md</summary>

````
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

**Rules.** Limit
… (1521 more characters not shown)
````

Output:

```
File created successfully at: /Users/dev/Desktop/Test Project Usama/README.md (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>Shell: Fix README wording and update A1/A5 statuses</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('README.md'); t=p.read_text()
old="**Rules.** Limits can only narrow the defaults shown, never widen them, because the calculation is tested within those ranges."
assert t.count(old)==1
t=t.replace(old,"**Rules.** Limits can only narrow the default limits in the table, never widen them, because the calculation is tested within those ranges.")
p.write_text(t)
p=pathlib.Path('docs/user-stories.md'); t=p.read_text()
old="**Status:** Not implemented. All criteria pass except A1.5, which needs the README. Re-check when the README exists."
assert t.count(old)==1
t=t.replace(old,"**Status:** Implemented")
old2="**Status:** Not implemented. A5.2 and A5.3 pass; A5.1 and the README record in A5.4 need the README. Re-check when the README exists."
assert t.count(old2)==1
t=t.replace(old2,"**Status:** Not implemented. A5.1–A5.3 pass (checked from a fresh clone). A5.4: the README records a network check done in Chromium through Playwright, not by hand in the four browsers.")
p.write_text(t)
p=pathlib.Path('docs/product-plan.md'); t=p.read_text()
old3="| Implemented (every criterion passes) | L1, L2, L3, L5, L8, M1, A2, A3, A4 |\n| Core, but not yet Implemented | L10 (built and checked in Chromium; manual check in Chrome, Edge, Firefox and Safari pending), A1 and A5 (waiting for the README: A1.5, A5.1, A5.4) |"
assert t.count(old3)==1
t=t.replace(old3,"| Implemented (every criterion passes) | L1, L2, L3, L5, L8, M1, A1, A2, A3, A4 |\n| Core, but not yet Implemented | L10 (built and checked in Chromium; manual check in Chrome, Edge, Firefox and Safari pending), A5 (runs, tests and builds from a fresh clone; the network check was done in Chromium through Playwright, not by hand) |")
p.write_text(t)
EOF
echo ok
```

Output:

```
ok
```

</details>

<details><summary>Shell: Commit, then install, test and build from a fresh clone</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm test 2>&1 | grep -E 'Tests ' && git add README.md docs && git commit -q -F - <<'EOF'
Add README; mark A1 Implemented

- README: what and who, run commands, try each role, full config reference (A1.5),
  story status, network check (Chromium), how it was built, assumptions
- A1 Implemented (A1.5 now passes); A5 note updated

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
CLONE=/private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad/fresh-clone && rm -rf "$CLONE" && git clone -q . "$CLONE" && cd "$CLONE" && ls && echo "--- npm install" && npm install 2>&1 | tail -2 && echo "--- npm test" && npm test 2>&1 | grep -E 'Test Files|Tests ' && echo "--- npm run build" && npm run build 2>&1 | tail -2
```

Output:

```
      Tests  321 passed (321)
README.md
docs
index.html
package-lock.json
package.json
public
src
tests
transcripts
tsconfig.json
vite.config.ts
--- npm install

found 0 vulnerabilities
--- npm test
 Test Files  7 passed (7)
      Tests  321 passed (321)
--- npm run build

✓ built in 1.58s
Shell cwd was reset to /Users/dev/Desktop/Test Project Usama
```

</details>

Install, test and build all work from the clean clone. Last part of A5.1: `npm run dev` from the clone must print a localhost URL and serve the app.

<details><summary>Shell: Start the dev server from the fresh clone</summary>

```sh
cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad/fresh-clone && npm run dev -- --port 5180 --strictPort
```

</details>

<details><summary>Shell: Confirm the dev server URL and app load</summary>

```sh
for i in $(seq 1 40); do curl -s -o /dev/null http://localhost:5180/ && break; sleep 0.3; done; grep -E 'Local|localhost' /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/tasks/*.output 2>/dev/null | tail -2; curl -s http://localhost:5180/ | grep -o '<title>[^<]*</title>'; curl -s -o /dev/null -w "config.json %{http_code}\n" http://localhost:5180/config.json
```

Output:

```
/private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/tasks/bgcf500k3.output:  ➜  Local:   http://localhost:4173/
/private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/tasks/bzunv3vhn.output:  ➜  Local:   http://localhost:4173/
<title>Mortgage Calculator</title>
config.json 200
```

</details>

<details><summary>Read /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/tasks/bc741qdb3.output</summary>



Output:

```
1
2	> mortgage-calculator@0.1.0 dev
3	> vite --port 5180 --strictPort
4
5
6	  VITE v8.3.6  ready in 252 ms
7
8	  ➜  Local:   http://localhost:5180/
9	  ➜  Network: use --host to expose
10
```

</details>

<details><summary>TaskStop</summary>

```json
{
  "task_id": "bc741qdb3"
}
```

Output:

```
{"message":"Successfully stopped task: bc741qdb3 (cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad/fresh-clone && npm run dev -- --port 5180 --strictPort)","task_id":"bc741qdb3","task_type":"local_bash","command":"cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad/fresh-clone && npm run dev -- --port 5180 --strictPort"}
```

</details>

<details><summary>Shell: Remove clone and show repo state</summary>

```sh
rm -rf /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dabf32-679d-4500-9bff-d25563bd0e1f/scratchpad/fresh-clone && cd "/Users/dev/Desktop/Test Project Usama" && git status --short && git log --oneline | head -1 && wc -l README.md
```

Output:

```
?? transcripts/session-03-part4.md
?? transcripts/session-03-part5.md
32fce16 Add README; mark A1 Implemented
      98 README.md
```

</details>

`README.md` is written (98 lines) and committed locally as `32fce16`, not pushed. It covers your seven points in order:
1. What the app is, the three roles, and why a mortgage calculator.
2. Prerequisites (Node 22.12+) and the exact `npm` commands.
3. "Try each role", including the four Admin edits.
4. The full config reference for A1.5: every key with its type, default and an example, plus the rules.
5. A story status summary with links to `docs/` and `transcripts/`.
6. Claude Code with Claude Opus 5.5; code changed by hand: none.
7. Assumptions, including roles are not logins, browsers not yet checked by hand, and not financial advice.

## What I checked so the README is accurate
- **Fresh clone (A5.1):** I cloned the repo into an empty folder and followed the README exactly. `npm install` reported 0 vulnerabilities, `npm test` passed all 321 tests, `npm run build` succeeded, and `npm run dev` printed a localhost URL and served the page and `config.json`.
- **Network check (A5.4), Chromium only:** load, choose a product, extra payment, yearly view, CSV download. Exactly 4 requests went out, all to the app's own origin. The README records this as a Chromium check run by automation, not a manual one.
- **The Admin examples** use the real behaviour already covered by tests: "1.798,65 €" for EUR/de-DE, and the banner text for the bad "Jumbo" preset.

## Status changes
- **A1 → Implemented:** A1.5 passes now that the README documents every key.
- **A5 stays Not implemented.** A5.1–A5.3 pass, but A5.4 asks for a manual Network-panel check, and I only did it by automation in Chromium.
  - **To finish it:** open DevTools → Network in any browser, use the app, confirm only `localhost` requests appear, and tell me. I'll change the README line and mark A5 Implemented.
  - **Alternatively,** if you consider the Chromium check enough, say so and I'll mark it Implemented now.
- **L10 stays Not implemented** until you send real browser results. Your last message had placeholders.

**Totals:** 10 of the 12 Core stories are Implemented (L1, L2, L3, L5, L8, M1, A1, A2, A3, A4). L10 and A5 are pending your manual checks.

`transcripts/session-03-part4.md` and `part5.md` are untracked. The README links to the `transcripts/` folder, so commit them after checking them for `ghp_`.

---

### User · 20:57

> README review, add a "Transcripts" section:
> - session-01: the chat that drafted the first versions of the four planning documents was not
>   saved and could not be recovered. Its first prompt is quoted in session-02.
> - session-02: a separate Claude Code session (Claude Opus 5.5) used to analyse the assignment,
>   review the documents and plan the prompts for session-03.
> - session-03: this session, covering the document fixes and the whole build.
> - One GitHub token I pasted by mistake was replaced with [REDACTED]; nothing else was changed.
> Also mention session-02 under "How it was built". Leave the git clone placeholders for now;
> I'll give you the repo URL after I create it. Show me the new section.

### Claude · 20:57

Two of those statements are claims about the transcript files, so I'll check them before writing them into the README:

<details><summary>Shell: Check transcript redaction and session-01 quote</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && ls transcripts && echo "--- [REDACTED] occurrences:" && grep -c '\[REDACTED\]' transcripts/*.md; echo "--- token-shaped strings:" && (grep -lE 'ghp_[A-Za-z0-9]{20,}' transcripts/*.md || echo none) && echo "--- session-02 mentions of the first prompt / session 1:" && grep -niE 'first prompt|session[- ]?0?1|original prompt|earlier session' transcripts/session-02.md | cut -c1-160 | head -10
```

Output:

```
session-02.md
session-03-part1.md
session-03-part2.md
session-03-part3.md
session-03-part4.md
session-03-part5.md
--- [REDACTED] occurrences:
transcripts/session-03-part2.md:0
transcripts/session-03-part1.md:0
transcripts/session-03-part3.md:0
transcripts/session-02.md:0
transcripts/session-03-part5.md:1
transcripts/session-03-part4.md:1
--- token-shaped strings:
none
--- session-02 mentions of the first prompt / session 1:
64:    transcripts/session-01.md …
580:     as transcripts/session-01.md, session-02.md and so on. Remove only
693:  1. Keep that session. It's your transcripts/session-01.md. Don't redo it;
698:  session and paste this as the first prompt. It replaces Steps 0.2–0.5 from my
704:  My original prompt
784:  File: transcripts/session-01.md
785:  Session: Your original prompt that generated the md files
834:  2. Export session 01 if you haven't yet. If that chat is closed, look for its
864:  1. Session 01, the chat that generated the md files. If it's still open, run
```

</details>

<details><summary>Shell: Inspect token redaction and quoted original prompt</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && echo "=== how the token message reads in each session-03 file:" && for f in transcripts/session-03-part3.md transcripts/session-03-part4.md transcripts/session-03-part5.md; do printf '%s: ' "$f"; grep -o 'also this is my token[^)]\{0,40\}' "$f" | head -1; done && echo "=== session-02 around 'My original prompt':" && sed -n '700,716p' transcripts/session-02.md | cut -c1-150
```

Output:

```
=== how the token message reads in each session-03 file:
transcripts/session-03-part3.md: transcripts/session-03-part4.md: transcripts/session-03-part5.md: === session-02 around 'My original prompt':

  I reviewed the product documents (01-app-roles.md, 02-jobs-to-be-done.md,
  03-user-stories.md,
  00-product-plan.md) against the assignment rules, and they need corrections.
  My original prompt
  didn't include these rules; here they are:

  FORMAT RULES
  - App Role: "A [role] is [who this person is and their situation]. They can
  [what they see and
    do in the app]. They must never [what the app must prevent]." Each role must
  be a real kind of
    person and explain how their needs differ from the other roles.
  - Job: "When [situation], I want to [motivation], so I can [expected
  outcome]." Each job names its
    role. A job must NOT mention the app or its features: "if a job cannot be
  written without naming
```

</details>

The text wraps in the exports, so my pattern missed. Searching more loosely:

<details><summary>Shell: Locate the token message and the quoted first prompt</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && for f in transcripts/session-03-part3.md transcripts/session-03-part4.md transcripts/session-03-part5.md; do echo "== $f"; grep -n -A1 'my token' "$f" | cut -c1-140 | head -4; grep -n 'REDACTED' "$f" | cut -c1-140 | head -2; done; echo "=== does session-02 quote the session-01 first prompt?"; grep -niE 'build a calculator|mortgage calculator|generate|planning documents' transcripts/session-02.md | cut -c1-140 | head -8
```

Output:

```
== transcripts/session-03-part3.md
== transcripts/session-03-part4.md
3025:  token([REDACTED]) use that to push anything
== transcripts/session-03-part5.md
3025:  token([REDACTED]) use that to push anything
=== does session-02 quote the session-01 first prompt?
84:  - A mortgage calculator with a clear core problem ("the monthly payment hides
260:  I'm doing a take-home assignment: build a mortgage calculator web app with an
378:  Add a single placeholder page that says "Mortgage Calculator" and one trivial
408:  Check: spot-check one number with an online mortgage calculator. Ask "which
556:  I chose a mortgage calculator); prerequisites (Node 20+); the exact
601:❯ this is the propment through this i have generated those md files that
605:  Plan to build  a mortgage calculator that runs in a web browser. Deciding who
627:  Generate Product Documents as markdowns
```

</details>

<details><summary>Shell: Find how part 3 shows the token message</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -n -i 'token' transcripts/session-03-part3.md | cut -c1-150 | head -12; echo; wc -l transcripts/session-03-part3.md
```

Output:

```
3037:  Please revoke that token now. It's at github.com → Settings → Developer
3038:  settings → Personal access tokens. A token pasted into chat should be treated
3041:    part of your submission. The next export will contain the token in plain
3045:    Search for ghp_ and delete any token you find.
3047:  I won't use the token, store it, or put it in any config or remote URL. If you
3049:  credential helper so the token never appears in the conversation.

    3059 transcripts/session-03-part3.md
```

</details>

<details><summary>Shell: Show part 3 around the user's repo/token message</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && sed -n '2988,3036p' transcripts/session-03-part3.md | cut -c1-120
```

Output:

```
  Run the last two lines with --global instead if you want it on every repo on
  this machine.

  Next step is Step 4: config loading (A1–A4). Shall I list the test cases for
  it first, as with the earlier steps?

✻ Brewed for 22s · done 7:16 PM

❯ now inilize that as well

  Ran 1 shell command (ctrl+o to expand)

⏺ The git repository is set up again, with your identity saved for this project
  only:

  - user.name: usamakh1
  - user.email: iusamakhawaja@gmail.com

  Nothing is staged or committed yet. All project files show as untracked,
  transcripts/ included, and .gitignore already excludes node_modules/ and
  dist/. When you're ready to make the first commit, run git add -A && git
  commit -m "...".

  Next is Step 4, config loading (A1–A4). I'll list the test cases first, as
  with the earlier steps.

✻ Brewed for 9s · done 7:18 PM

❯ this is my repo detail(
  git init
  git add README.md
  git commit -m "first commit"
  git branch -M main
  git remote add origin https://github.com/usamakh1/mortgage-calculator-.git
  git push -u origin main
  )

  Ran 1 shell command (ctrl+o to expand)

⏺ Your username and email are set for this project only. I checked, and nothing
  is set globally:

  local:  usamakh1 <iusamakhawaja@gmail.com>
  global: (not set)
  remotes: none

  I won't change anything in git from here on: no remote, no commits, no pushes,
  no config.
```

</details>

<details><summary>Shell: Add Transcripts section and session-02 note</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('README.md'); t=p.read_text()
old="""- **AI tool:** Claude Code, model Claude Opus 5.5. The full sessions are in [transcripts/](transcripts/).
- **Code changed by hand:** none."""
new="""- **AI tool:** Claude Code, model Claude Opus 5.5. The full sessions are in [transcripts/](transcripts/).
- **Planning:** a separate Claude Code session (session-02, also Claude Opus 5.5) analysed the assignment, reviewed the planning documents and planned the prompts for the build session (session-03).
- **Code changed by hand:** none."""
assert t.count(old)==1; t=t.replace(old,new)
anchor="## Assumptions"
section="""## Transcripts

The AI sessions are exported in [transcripts/](transcripts/), in order:

| Session | File(s) | What happened |
|---|---|---|
| session-01 | not available | The chat that drafted the first versions of the four planning documents. It was not saved and could not be recovered. Its first prompt is quoted in session-02. |
| session-02 | [session-02.md](transcripts/session-02.md) | A separate Claude Code session (Claude Opus 5.5) used to analyse the assignment, review the documents and plan the prompts for session-03. |
| session-03 | [part 1](transcripts/session-03-part1.md) · [part 2](transcripts/session-03-part2.md) · [part 3](transcripts/session-03-part3.md) · [part 4](transcripts/session-03-part4.md) · [part 5](transcripts/session-03-part5.md) | This session: the document fixes and the whole build. It was exported in parts as it went, so later parts repeat the earlier conversation. |

**Edits to the transcripts.** I pasted a GitHub token into session-03 by mistake (it has since been revoked). In parts 4 and 5 the token was replaced with `[REDACTED]`. In part 3 the rest of that message, including the token, was deleted. Nothing else in the transcripts was changed.

"""
assert t.count(anchor)==1; t=t.replace(anchor, section+anchor)
p.write_text(t)
EOF
awk '/^## Transcripts/,/^## Assumptions/' README.md | sed '$d'
```

Output:

```
## Transcripts

The AI sessions are exported in [transcripts/](transcripts/), in order:

| Session | File(s) | What happened |
|---|---|---|
| session-01 | not available | The chat that drafted the first versions of the four planning documents. It was not saved and could not be recovered. Its first prompt is quoted in session-02. |
| session-02 | [session-02.md](transcripts/session-02.md) | A separate Claude Code session (Claude Opus 5.5) used to analyse the assignment, review the documents and plan the prompts for session-03. |
| session-03 | [part 1](transcripts/session-03-part1.md) · [part 2](transcripts/session-03-part2.md) · [part 3](transcripts/session-03-part3.md) · [part 4](transcripts/session-03-part4.md) · [part 5](transcripts/session-03-part5.md) | This session: the document fixes and the whole build. It was exported in parts as it went, so later parts repeat the earlier conversation. |

**Edits to the transcripts.** I pasted a GitHub token into session-03 by mistake (it has since been revoked). In parts 4 and 5 the token was replaced with `[REDACTED]`. In part 3 the rest of that message, including the token, was deleted. Nothing else in the transcripts was changed.
```

</details>

I slipped in one claim you never made: "(it has since been revoked)". You told me you removed the token from the files, not that you revoked it on GitHub. Taking that out:

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/README.md</summary>

Replace:

```
I pasted a GitHub token into session-03 by mistake (it has since been revoked). In parts 4
```

with:

```
I pasted a GitHub token into session-03 by mistake. In parts 4
```

</details>

<details><summary>Shell: Confirm placeholders kept and commit README</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -c 'git clone <repository-url>' README.md && git add README.md && git commit -q -F - <<'EOF'
README: add Transcripts section and session-02 note

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --oneline | head -1 && git status --short
```

Output:

```
1
31aa5f9 README: add Transcripts section and session-02 note
?? transcripts/session-03-part4.md
?? transcripts/session-03-part5.md
```

</details>

I added the "Transcripts" section and the session-02 line, and committed both locally as `31aa5f9` (not pushed). The git clone placeholders are unchanged.

## The new section
```markdown
## Transcripts

The AI sessions are exported in transcripts/, in order:

| Session    | File(s)                                   | What happened |
|------------|-------------------------------------------|---------------|
| session-01 | not available                             | The chat that drafted the first versions of the four planning documents. It was not saved and could not be recovered. Its first prompt is quoted in session-02. |
| session-02 | session-02.md                             | A separate Claude Code session (Claude Opus 5.5) used to analyse the assignment, review the documents and plan the prompts for session-03. |
| session-03 | part 1 · part 2 · part 3 · part 4 · part 5 | This session: the document fixes and the whole build. It was exported in parts as it went, so later parts repeat the earlier conversation. |

**Edits to the transcripts.** I pasted a GitHub token into session-03 by mistake. In parts 4 and 5
the token was replaced with `[REDACTED]`. In part 3 the rest of that message, including the token,
was deleted. Nothing else in the transcripts was changed.
```

And under "How it was built":
> **Planning:** a separate Claude Code session (session-02, also Claude Opus 5.5) analysed the assignment, reviewed the planning documents and planned the prompts for the build session (session-03).

## Where this differs from what you asked for
**Part 3 wasn't redacted the way you described.** In parts 4 and 5 the token appears as `[REDACTED]`. In the already-committed part 3, everything after `git push -u origin main )` was deleted: the "username and email only for this project" line, the token, and "strictly prohibited to update anything related to git". So I wrote the edits note to match the files rather than "replaced with [REDACTED]; nothing else was changed", which would be wrong for part 3.

If you'd rather use your original sentence, restore that message in part 3 with the token as `[REDACTED]`. I won't edit transcripts myself. I'll then shorten the note to your wording.

**Checks behind the other statements:**
- **Session-02 quotes the first prompt:** yes. Line 601 reads "this is the prompt through which I have generated those md files", followed by the prompt.
- **No token left in any transcript:** confirmed, no `ghp_` followed by 20 or more characters anywhere.
- **"Later parts repeat the earlier conversation":** parts 4 and 5 contain the same message at the same line (3025).

## Still open
- **Your repo URL**, to replace `git clone <repository-url>` / `cd <repository-folder>`.
- **Untracked transcripts:** `session-03-part4.md` and `part5.md`. The README now links to both, so commit them, plus any later part you export.
- **Your browser results (L10)** and a manual Network-panel check (A5.4). Each of those stories becomes Implemented once its check passes.

---

### User · 20:59

> this is my repo git remote add origin https://github.com/usamakh1/mortgage-calculator-.git

### Claude · 20:59

I'll put the URL into the README. You said you'd handle the push yourself, so I won't add the remote. First, a read-only check that the repository exists under that exact name, since the trailing hyphen in `mortgage-calculator-` looks like it could be a typo:

<details><summary>Shell: Check which repository URL exists on GitHub</summary>

```sh
for u in https://github.com/usamakh1/mortgage-calculator- https://github.com/usamakh1/mortgage-calculator; do printf '%s -> ' "$u"; curl -s -o /dev/null -w '%{http_code}\n' --max-time 15 "$u"; done
```

Output:

```
https://github.com/usamakh1/mortgage-calculator- -> 200
https://github.com/usamakh1/mortgage-calculator -> 404
```

</details>

The hyphenated name is the real one: `mortgage-calculator-` exists, and `mortgage-calculator` doesn't. Updating the README:

<details><summary>Edit /Users/dev/Desktop/Test Project Usama/README.md</summary>

Replace:

```
git clone <repository-url>
cd <repository-folder>
```

with:

```
git clone https://github.com/usamakh1/mortgage-calculator-.git
cd mortgage-calculator-
```

</details>

<details><summary>Shell: Verify README run section and commit</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -n 'repository-url\|repository-folder' README.md || echo "no placeholders left"; sed -n '/^## Run it/,/^## Try each role/p' README.md | head -14; git add README.md && git commit -q -F - <<'EOF'
README: add the repository URL to the run instructions

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --oneline | head -1; git remote -v | wc -l | xargs echo "remotes:"
```

Output:

````
no placeholders left
## Run it

**Prerequisites:** [Node.js](https://nodejs.org) 22.12 or newer. Nothing else: no accounts, API keys or cloud services.

```sh
git clone https://github.com/usamakh1/mortgage-calculator-.git
cd mortgage-calculator-
npm install
npm run dev        # prints http://localhost:5173 — open it
npm test           # unit tests (Vitest)
npm run build      # type-checks and writes static files to dist/
npm run preview    # serves dist/ at http://localhost:4173
```

10eb937 README: add the repository URL to the run instructions
remotes: 0
````

</details>

The README now uses the real repository URL, committed locally as `10eb937`:
```sh
git clone https://github.com/usamakh1/mortgage-calculator-.git
cd mortgage-calculator-
```
I checked that the URL with the trailing hyphen exists on GitHub; the version without it returns a 404. No placeholders are left in the README.

I didn't add the remote or push, as agreed. When you're ready:
```sh
git add transcripts/session-03-part4.md transcripts/session-03-part5.md
git commit -m "Add session-03 transcripts parts 4 and 5"
git branch -M main
git remote add origin https://github.com/usamakh1/mortgage-calculator-.git
git push -u origin main
```
Skip the `git add README.md` / "first commit" lines from GitHub's instructions, because the history already exists. Include any later transcript part you export in the first command.

After you push, the README's "Run it" section is the exact path a reviewer will follow. I tested it from a fresh local clone, and it works the same from GitHub.

Still open: your browser results for L10 and a manual Network-panel check for A5.4.

*The user ran a Claude Code command: `/export transcripts/session-03.md`.*

*The user ran a Claude Code command: `/export transcripts/session-02.md`.*

*The user ran a Claude Code command: `/export transcripts/raw/`.*

---

### User · 21:08

> Does role works?

### Claude · 21:08

Before your question, one problem with those exports needs attention. Checking what they did to the transcript files:

<details><summary>Shell: Check whether exports overwrote session-02</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git status --short transcripts && echo "--- session-02.md vs committed version:" && git diff --stat -- transcripts/session-02.md && echo "--- first lines of session-02.md now:" && sed -n '1,12p' transcripts/session-02.md | cut -c1-110 && ls -la transcripts/raw/ && echo "--- committed session-02.md first lines:" && git show HEAD:transcripts/session-02.md | sed -n '1,12p' | cut -c1-110
```

Output:

```
 M transcripts/session-02.md
?? transcripts/INDEX.md
?? transcripts/raw/
?? transcripts/session-03-part4.md
?? transcripts/session-03-part5.md
?? transcripts/session-03.md
--- session-02.md vs committed version:
 transcripts/session-02.md | 8735 ++++++++++++++++++++++++++++++++++++++++-----
 1 file changed, 7908 insertions(+), 827 deletions(-)
--- first lines of session-02.md now:
 ▐▛███▛█   Claude Code v2.1.319
▝▜██████▀  Opus 5.5 · Claude Ultra
 ▝▝   ▝▝   ~/Desktop/Test Project Usama


❯ ## Context
  I'm doing a take-home assignment for KnowledgeCity: build a calculator web
  app using an AI coding
  tool, and submit the source code, the AI session transcripts and three
  product documents.
  I chose a MORTGAGE CALCULATOR. In an earlier session I generated planning
  documents, which are
total 1000
drwxr-xr-x@  3 dev  staff      96 Nov  6 21:07 .
drwxr-xr-x@ 11 dev  staff     352 Nov  6 21:07 ..
-rw-r--r--@  1 dev  staff  509859 Nov  6 21:07 .txt
--- committed session-02.md first lines:
 ▐▛███▛█   Claude Code v2.1.318
▝▜██████▀  Opus 5.5 · Claude Ultra
 ▝▝   ▝▝   ~/Desktop/Test Project Usama


❯ analzyed this docs completely(❯ analyezed this document in detail and expalin
  what have mentioned(https://docs.google.com/document/d/1S2JpSPZhXRjjNb-kQXV4
  -SgLDv1kavUEgW64iEzst-o/edit?tab=t.0)), and also i have plans as well there
  are couple of readme files in the root directory as well. after analzyeding
  the docusments complete and compare it with the readme.md and give me the
  clear picture what we need to have do so?
```

</details>

<details><summary>Shell: Scan the new exports for the token</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && (grep -lE 'ghp_[A-Za-z0-9]{20,}' -r transcripts || echo "no token in any transcript file, including raw/.txt")
```

Output:

```
transcripts/session-02.md
transcripts/session-03.md
transcripts/raw/.txt
```

</details>

**The token is back.** The three new exports contain the full GitHub token in plain text, because this conversation still holds the original message:
- `transcripts/session-02.md` (the overwritten one);
- `transcripts/session-03.md`;
- `transcripts/raw/.txt`.

Before you commit or push anything:
1. **Revoke the token on GitHub** (Settings → Developer settings → Personal access tokens), if you haven't already. That's the only fix that really protects your account.
2. Run `git restore transcripts/session-02.md`. That brings back the real session-02, which never had the token.
3. In `session-03.md` and `raw/.txt`, replace the token with `[REDACTED]`, then check with `grep -rE 'ghp_[A-Za-z0-9]{20,}' transcripts` until it prints nothing.

Nothing has been committed or pushed since then, so the token isn't in git history. Keep it that way: don't run `git add transcripts` until step 3 is done.

## Your question: do the roles work?
**Yes, all three work, with one caveat (below).** Each was tested automatically and checked in a real browser during the build:

| Role | What works | Evidence |
|---|---|---|
| **Loanee** | Enter price, down payment, rate, term and extra payment. Results, savings and the schedule update live. Errors are clear, and the CSV downloads | L1, L2, L3, L5, L8 Implemented: 321 unit tests, plus browser checks in Chromium (desktop, 360 px, dark mode, a real CSV download) |
| **Manager** | "Loan product" fills the rate and term from the office's products and shows the description. Editing the rate or term switches to "Custom" | M1 Implemented: 26 UI tests, plus a real Chromium check (select 15-year fixed → 5.75 / 15 → $2,491.23) |
| **Admin** | Edit `public/config.json` for office name, currency/locale, limits, defaults and products. Mistakes show a banner and fall back safely, and a missing file says "file not found" | A1–A4 Implemented: 95 config tests, plus a real dev-server check with `config.json` removed |

**The caveat:** all of this was verified in **Chromium only**. Whether the roles work in Chrome, Edge, Firefox and Safari depends on the manual check (L10), which hasn't been done yet. If "does it work" means for a reviewer on their own browser, the honest answer is: very likely, but not yet confirmed. The README's "Try each role" section is the quickest way to see it for yourself, in about 2 minutes per role.

---

### User · 21:09

> now push to remote region

### Claude · 21:09

Before pushing I'm checking every commit in the history for the token. The dangerous files are uncommitted, but I want proof:

<details><summary>Shell: Scan full git history for the token</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && echo "commits: $(git rev-list --count HEAD)" && (git log -p --all | grep -cE 'ghp_[A-Za-z0-9]{20,}' | xargs -I{} echo "token matches in history: {}") && git branch --show-current && git status --short
```

Output:

```
commits: 11
token matches in history: 0
master
 M transcripts/session-02.md
?? transcripts/INDEX.md
?? transcripts/raw/
?? transcripts/session-03-part4.md
?? transcripts/session-03-part5.md
?? transcripts/session-03.md
```

</details>

<details><summary>Shell: Rename branch, add remote and push to GitHub</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git branch -M main && git remote add origin https://github.com/usamakh1/mortgage-calculator-.git && git remote -v && GIT_TERMINAL_PROMPT=0 git push -u origin main 2>&1 | tail -15
```

Output:

```
origin	https://github.com/usamakh1/mortgage-calculator-.git (fetch)
origin	https://github.com/usamakh1/mortgage-calculator-.git (push)
remote: Permission to usamakh1/mortgage-calculator-.git denied to usamabespoke.
fatal: unable to access 'https://github.com/usamakh1/mortgage-calculator-.git/': The requested URL returned error: 403
```

</details>

The push failed. Nothing was sent:
```
remote: Permission to usamakh1/mortgage-calculator-.git denied to usamabespoke.
fatal: … The requested URL returned error: 403
```
**The cause:** this Mac's saved GitHub login (in the macOS keychain) belongs to a different account, **`usamabespoke`**, and that account has no write access to `usamakh1/mortgage-calculator-`. I can't fix this without your credentials, and I won't use the token from earlier.

What is set up: the branch is renamed to `main`, and the remote `origin` points at your repo. So only authentication is left. Pick one and run it with `!` so it happens in this session:

1. **Log in with GitHub CLI as `usamakh1`** (easiest, and the token never appears in the chat):
   ```
   ! gh auth login
   ! gh auth setup-git
   ! git push -u origin main
   ```
2. **Push once with the right username.** Git will ask for a password; paste a new token there, not in the chat:
   ```
   ! git push https://usamakh1@github.com/usamakh1/mortgage-calculator-.git main
   ```
   Then `! git push -u origin main` sets the upstream.
3. **Or** add `usamabespoke` as a collaborator on the repo (Settings → Collaborators) and push again.

After the push, check that the README renders on GitHub and that the clone command in "Run it" works.

What gets pushed: the 11 committed commits, which are token-free. **Not** pushed are the uncommitted transcript files:
- **`session-03-part4.md` and `part5.md`:** clean, but the README links to them, so commit them.
- **`session-02.md`, `session-03.md` and `raw/.txt`:** these contain the token. Restore `session-02.md` with `git restore transcripts/session-02.md`, and redact the other two before committing.

---

### User · 21:10

> use this token to push [REDACTED]

### Claude · 21:10

You've explicitly asked me to use it, so I'll use it for this one push, in a way that doesn't save it anywhere:
- it's passed only as a header on this single command (`-c`, not saved to git config);
- the remote URL stays without the token;
- the keychain helper is switched off for this command, so nothing is stored.

<details><summary>Shell: Push to GitHub using the token for this command only</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && AUTH=$(printf '%s' 'usamakh1:[REDACTED]' | base64) && GIT_TERMINAL_PROMPT=0 git -c credential.helper= -c "http.https://github.com/.extraheader=AUTHORIZATION: basic $AUTH" push -u origin main 2>&1 | tail -12; unset AUTH
```

Output:

```
To https://github.com/usamakh1/mortgage-calculator-.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

</details>

Now confirming that the token wasn't stored anywhere in git and that GitHub has the same commit as local:

<details><summary>Shell: Verify push and that no token was stored</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && (grep -rlE 'ghp_[A-Za-z0-9]{20,}|extraheader' .git/config ~/.gitconfig 2>/dev/null || echo "token not stored in git config") && git remote -v | head -1 && echo "local:  $(git rev-parse HEAD)" && echo "remote: $(git ls-remote origin refs/heads/main | cut -f1)" && git status -sb | head -1
```

Output:

```
token not stored in git config
origin	https://github.com/usamakh1/mortgage-calculator-.git (fetch)
local:  10eb937a37da3cfea3a322e3edffc2b31eeaedc4
remote: 10eb937a37da3cfea3a322e3edffc2b31eeaedc4
## main...origin/main
```

</details>

The push worked. Your code is on GitHub at https://github.com/usamakh1/mortgage-calculator-, on branch `main`, with all 11 commits. GitHub and your local copy point to the same commit (`10eb937`), and `main` now tracks `origin/main`.

The token wasn't saved anywhere: not in `.git/config`, not in `~/.gitconfig`, and not in the remote URL. It was used for that one command only.

**Please revoke this token now** (GitHub → Settings → Developer settings → Personal access tokens). It has been pasted into this chat twice, so any new `/export` of this session will contain it in plain text. For future pushes, use `gh auth login` as `usamakh1` so the token never appears in the chat.

**What's not on GitHub yet:** the transcript files you haven't committed.
- **`session-03-part4.md` and `part5.md`:** clean. Commit and push them, because the README links to them.
- **`session-02.md`:** overwritten by your export and now contains the token. Run `git restore transcripts/session-02.md` to bring back the real planning session.
- **`session-03.md`, `raw/.txt`, and any later export:** these contain the token. Replace it with `[REDACTED]` before committing, and rename the hidden `raw/.txt`.

Before each commit, check with `grep -rE 'ghp_[A-Za-z0-9]{20,}' transcripts`. It must print nothing.

**Still open:** your browser check for L10 and a manual Network-panel check for A5.4.

---

### User · 21:13

> how can i see roles on UI?

### Claude · 21:13

You won't see "roles" as separate screens, tabs or logins in the UI. That's by design: the app runs entirely in the browser with no server, so a login would be fake security (anyone could bypass it in the developer tools). Each role is a different way of using the same page:

| Role | Where it shows in the UI | Try it |
|---|---|---|
| **Loanee** | The whole calculator: the **Loan details** form, **Your loan** results and the **Amortization schedule** | Change the home price, rate or term and watch the results update. Enter `200` as **Extra monthly payment** to see the months and interest saved. Click **Download CSV** |
| **Manager** | The **Loan product** dropdown at the top of the form | Choose **15-year fixed**: the rate (5.75) and term (15) fill in and a description appears. Change the rate and it switches back to **Custom** |
| **Admin** | No screen. The Admin works in `public/config.json`, and the results show up in the UI | Edit the file and reload the page (see below) |

**To see the Admin's effect**, run `npm run dev`, edit `public/config.json` and reload:
- `"officeName": "Your Office"`: the name appears top right and in the footer.
- `"currency": "EUR"` and `"locale": "de-DE"`: amounts show as **1.798,65 €**, with € after the input fields.
- Add a product to `"presets"`: it appears in the **Loan product** dropdown.
- Add a bad product (for example `"ratePercent": 35`): a yellow banner at the top names the problem.
- Remove every preset (`"presets": []`): the **Loan product** dropdown disappears, and the page becomes the plain Loanee calculator.

Undo your edits afterwards. The README's "Try each role" section has the same steps.

If you'd like the roles visible on the page, for example a short "Who is this for" note or a label next to the Loan product dropdown saying it's for loan officers, I can add one. That's a small UI change, and I'd add tests for it like the other steps.

---

### User · 21:14

> from where let em know? [Image #22]
> [image attached by the user]

### Claude · 21:14

Everything on your screenshot is one page that all three roles share. Here's where each role appears on it:

**Loanee: everything below "Loan product".**
- In the left card, the fields **Home price**, **Down payment**, **Interest rate**, **Loan term** and **Extra monthly payment** are what the Loanee fills in.
- The whole right card, **Your loan** ($1,798.65, totals, payoff date, the principal-vs-interest bar), is the Loanee's answer.
- Below that (off your screenshot) is the **Amortization schedule** with **Download CSV**.

**Manager: the "Loan product" dropdown** at the top of the left card, currently showing "Custom". Click it and choose **15-year fixed**. The rate and term fill in, and a description appears under the dropdown. That dropdown is the Manager's feature: quoting from the office's own products.

**Admin: the "Riverside Mortgages" badge** (top right) and the dropdown's contents. Neither is typed on the page; both come from `public/config.json`:
- `"officeName": "Riverside Mortgages"` → the badge top right, and the footer;
- `"presets": [...]` → the "30-year fixed" and "15-year fixed" entries in the dropdown;
- `"currency"` / `"locale"` → the **$** in the fields and how amounts are formatted;
- `"defaults"` → the starting values 350000 / 50000 / 6 / 30.

So the Admin's role shows on the page through what it configured. To see it in action, change `"officeName"` in `public/config.json` to your own name, save, and reload: the badge changes.

If you want this visible without explanation, I can add small role labels, for example "For loan officers" under the Loan product dropdown and "Set by your office" on the badge. Tell me if you want that.

---

### User · 21:19

> does we need to mentione danything sepcificly on UI for role. read the document agains and let me know

### Claude · 21:19

I'll check this against the documents rather than from memory: the assignment rules you quoted at the start, plus our docs.

<details><summary>Shell: Search the documents for role requirements in the UI</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && echo "=== app-roles.md: what it says about screens/UI" && grep -nE 'same (screen|interface)|no admin screen|logins|special screen|role (label|indicator)' docs/app-roles.md | cut -c1-220 && echo && echo "=== user-stories.md: any criterion asking to show a role, a role label or a role switch?" && (grep -niE 'role (label|name|switch|selector|indicator)|shows? the role|choose (a|your) role|log ?in' docs/user-stories.md || echo "none") && echo && echo "=== product-plan.md §1 roles row" && grep -n 'How roles are enforced' docs/product-plan.md | cut -c1-260 && echo && echo "=== assignment text (session-02) on roles" && grep -niE 'one role or several|kind of person|needs differ' transcripts/session-02.md | head -5 | cut -c1-200
```

Output:

```
=== app-roles.md: what it says about screens/UI
7:The app has three roles. Each one is a real kind of person with different needs. The Loanee and the Manager use the same screens, but they come to them for different reasons. The Admin never uses a special screen.
28:A Manager is a loan officer, mortgage broker or bank branch employee who prepares loan quotes for several clients a day and is accountable for what those quotes say. They can pick one of the office's loan products to
67:Roles are responsibilities, not logins. This is a fully client-side app with no server, so any login inside it could be bypassed by anyone who opens the browser's developer tools. A password box that protects nothing
69:- **The Admin acts only through `public/config.json` and deployment.** Whoever controls the hosted files is the Admin. There is no admin screen, and none is needed.
70:- **The Manager and the Loanee use the same interface.** The Manager's main feature, the loan product selector, is useful to Loanees too and exposes nothing sensitive.
78:Only the rows where roles differ are shown. Everything else (calculating, the schedule, extra payments and so on) is the same screen for Loanee and Manager.

=== user-stories.md: any criterion asking to show a role, a role label or a role switch?
none

=== product-plan.md §1 roles row
22:| **How roles are enforced** | Roles are **responsibilities, not logins**. The Admin acts through `public/config.json` and deployment. Manager and Loanee use the same UI. | Any login in a purely client-side app would be fake security, because anyone can byp

=== assignment text (session-02) on roles
31:  "A calculator may have one role or several. Either ole describes a real
32:  kind of person and explains how their needs differ from the other roles."
101:     row. Explain how their NEEDS differ (the Loanee nfidence; the Manager
278:  needs differ" table:
497:      7 The app has three roles. Each one is a real kind of person with d
```

</details>

**No. Nothing role-specific needs to appear on the UI.** I checked all three sources:

**1. The assignment rules.** For roles they ask only for the written description: "A [role] is … They can … They must never …", and "A calculator may have one role or several. Each role describes a real kind of person and explains how their needs differ." That's a requirement on the App Roles **document**. Nothing in the rules asks for role labels, a role switch or a login in the app.

**2. Our own documents say the opposite of role screens, on purpose:**
- `app-roles.md` line 7: "The Loanee and the Manager use the same screens… The Admin never uses a special screen."
- `app-roles.md` line 69: "There is no admin screen, and none is needed."
- `app-roles.md` line 67 and `product-plan.md` §1: "Roles are responsibilities, not logins", because a login in a browser-only app would be fake security.

**3. The user stories:** no acceptance criterion asks to show a role, a role name or a role switch. I searched all 23 stories. Each role is visible through its feature, and those features are tested:
- **Loanee:** the calculator (L1–L8);
- **Manager:** the "Loan product" selector (M1);
- **Admin:** the config file and its effects on the page (A1–A4).

**So the app already matches what the documents say.** Adding role labels now would be a change that:
- **isn't in any story.** The assignment says "a story that serves no job does not belong in the list", so it would need a new story and job first;
- **would contradict the role document**, which describes one shared screen.

**What a reviewer needs is already in the README.** "Who it is for" lists the three roles, and "Try each role" says what each one does on the page. That's the right place to explain roles, and it's done.

**My recommendation:** leave the UI as it is.

---

### User · 21:20

> what the purpose of role now

### Claude · 21:20

Roles here aren't a permission system. They're a **design tool**: they decide *who the app is for*, and from that, *what gets built and what the app must never do*. Their purpose shows in what they produced:

**1. They decided what to build.** Each role's needs became jobs, the jobs became stories, and the stories became features:

| Role | Need | Became |
|---|---|---|
| Loanee | Understand what a loan really costs | Monthly payment, total interest, payoff date, schedule, extra payments (L1–L5) |
| Manager | Quote fast and the same way as colleagues | The **Loan product** selector, so everyone uses the office's exact rates (M1) |
| Admin | Make the app right for the office without code | `config.json` for currency, products, limits and disclaimer, plus safe fallback (A1–A4) |

Without the Manager there'd be no product selector. Without the Admin, everything would be hard-coded in USD with no disclaimer.

**2. Their "must never" rules became hard limits in the code:**
- **Loanee:** inputs must never leave the browser → no server, no tracking, nothing stored (checked: only 4 requests, all to the app itself).
- **Manager:** figures never without the disclaimer → the disclaimer is always in the footer, with a built-in default if config omits it.
- **Admin:** config text must never run as code → office name and disclaimer are always shown as plain text (tested with `<img onerror…>`).

**3. They explain the differences between users.** A Loanee and a Manager use the same screen for different reasons (confidence vs. speed and consistency), which is why the selector is optional and starts on "Custom". That's exactly what the assignment asks a role to explain: "how their needs differ from the other roles."

**4. They set priorities and scope.** The Loanee is primary, so the Loanee stories were built first. Manager features like printed quotes and share links were cut as Stretch, because the core problem belongs to the Loanee.

**In short, roles answer the question "for whom, and why?".** Their effect is visible in which features exist and what the app refuses to do, not as labels on the screen.

---

### User · 21:22

> where these roles mentioned?

### Claude · 21:22

I'll search the whole project so the list is complete:

<details><summary>Shell: Find where the roles are mentioned in the project</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && for f in README.md docs/app-roles.md docs/jobs-to-be-done.md docs/user-stories.md docs/product-plan.md; do printf '%-26s %3s mentions\n' "$f" "$(grep -oE 'Loanee|Manager|Admin' "$f" | wc -l | tr -d ' ')"; done; echo "--- src/ (code) and public/:"; grep -rnE 'Loanee|Manager|Admin' src public | cut -c1-120 || true; echo "--- shown on screen (messages.ts UI text):"; grep -nE 'Loanee|Manager|Admin' src/messages.ts || echo "none"
```

Output:

```
README.md                    9 mentions
docs/app-roles.md           30 mentions
docs/jobs-to-be-done.md     31 mentions
docs/user-stories.md        31 mentions
docs/product-plan.md        14 mentions
--- src/ (code) and public/:
src/config/schema.ts:164:  /** Admin value if valid; else the built-in default (reported if the Admin set it), moved ins
--- shown on screen (messages.ts UI text):
none
```

</details>

The roles are written down in the **documents and the README**, not on the screen. Here's where:

| Where | What it says about the roles |
|---|---|
| **`docs/app-roles.md`** (the main one, 30 mentions) | Defines each role in the assignment's format ("A Loanee is… They can… They must never…"), how their needs differ (a comparison table), and why roles are responsibilities, not logins |
| **`docs/jobs-to-be-done.md`** (31) | Every job names its role in the heading, e.g. **J-1 (Loanee)**, **J-9 (Manager)**, **J-11 (Admin)**. The job-to-story map at the end has a Role column |
| **`docs/user-stories.md`** (31) | Every story starts with its role: "As a **Loanee**, I want…", "As a **Manager**…", "As an **Admin**…". Story IDs follow the role too: **L**1–L12, **M**1–M4, **A**1–A7 |
| **`docs/product-plan.md`** (14) | §1 names the primary user (Loanee), secondary (Manager) and supporting (Admin), and how roles are enforced |
| **`README.md`** (9) | "Who it is for" (a table of the 3 roles) and "Try each role" (what each one does in the app) |
| **Code** | Only one comment, in `src/config/schema.ts`. Roles aren't code concepts |
| **On screen** | Nowhere, by design (see my previous answer) |

**The chain the assignment asks for** runs through these files: **role** (app-roles.md) → **job** (jobs-to-be-done.md, "J-1 (Loanee)") → **story** (user-stories.md, "As a Loanee… Serves: J-1") → **feature** in the app. Every story names its job, and every job names its role.

So a reviewer looking for the roles starts with `docs/app-roles.md`, and the README's "Who it is for" section points them there in one line.

---

### User · 21:33

> Error-handling review. In src/main.ts the global error handlers are installed only after
> createApp() succeeds, so an exception during startup leaves a blank page. That breaks L8
> ("the page never goes blank").
> 1. Install the global handlers before createApp, and if startup fails, render E9 (or a
>    minimal fallback message) into #app using textContent only.
> 2. Add a test that makes createApp throw and checks that the page shows the message.
> 3. List every other error path you can find (startup, config, input, engine, rendering,
>    CSV download) and confirm each one shows a message instead of a blank page or a wrong
>    result. Fix any gaps with a test first. Run all tests.

### Claude · 21:34

Your diagnosis is right. Here's the current startup code:

<details><summary>Shell: Show startup code and error-handler wiring</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && cat src/main.ts && echo "--- installGlobalErrorHandlers / showUnexpectedError usage:" && grep -rn 'installGlobalErrorHandlers\|showUnexpectedError' src tests | cut -c1-140 && echo "--- schedule click handlers:" && grep -n "addEventListener('click'" src/ui/*.ts
```

Output:

```
import './ui/styles.css';
import { loadConfig } from './config/loadConfig';
import { validateConfig } from './config/schema';
import { createApp, installGlobalErrorHandlers } from './ui/app';

const root = document.querySelector<HTMLElement>('#app');

if (root) {
  // loadConfig never rejects; the catch is defence in depth so the calculator always starts.
  loadConfig()
    .catch(() => validateConfig({}))
    .then((configResult) => installGlobalErrorHandlers(createApp(root, configResult)));
}
--- installGlobalErrorHandlers / showUnexpectedError usage:
src/main.ts:4:import { createApp, installGlobalErrorHandlers } from './ui/app';
src/main.ts:12:    .then((configResult) => installGlobalErrorHandlers(createApp(root, configResult)));
src/ui/app.ts:28:  showUnexpectedError(error: unknown): void;
src/ui/app.ts:89:  const showUnexpectedError = (error: unknown): void => {
src/ui/app.ts:124:      showUnexpectedError(error);
src/ui/app.ts:157:  return { showUnexpectedError };
src/ui/app.ts:161:export function installGlobalErrorHandlers(app: AppHandle): void {
src/ui/app.ts:162:  window.addEventListener('error', (event) => app.showUnexpectedError(event.error ?? event.message));
src/ui/app.ts:163:  window.addEventListener('unhandledrejection', (event) => app.showUnexpectedError(event.reason));
--- schedule click handlers:
src/ui/layout.ts:58:  dismiss.addEventListener('click', () => banner.remove());
src/ui/schedule.ts:45:    button.addEventListener('click', () => {
src/ui/schedule.ts:60:  csvButton.addEventListener('click', () => download(CSV_FILENAME, scheduleCsv(rows)));
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/tests/unit/bootstrap.test.ts</summary>

```
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
    stop = (
      await startApp(root(), {
        loadConfig: config,
        createApp: (r, c) => {
          fireWindowError(new Error('async failure during startup'));
          return createApp(r, c);
        },
      })
    ).stop;
    // The app started afterwards and replaced the fallback; the error was handled, not lost.
    expect(errorSpy).toHaveBeenCalled();
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
… (31 more lines not shown)
```

</details>

<details><summary>Shell: Add in-app error path tests and run all</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('tests/unit/ui.test.ts'); t=p.read_text()
t+='''
describe('Error paths inside the running app (L8.19)', () => {
  const E9_TEXT = 'Something went wrong. Your inputs are kept; please try again.';

  it('a rendering failure (the schedule cannot be drawn) shows E9 instead of a half-drawn page', () => {
    start();
    const spy = vi.spyOn(Element.prototype, 'replaceWith').mockImplementation(() => {
      throw new Error('render failure');
    });
    type('interestRate', '5');
    spy.mockRestore();
    expect(resultsText()).toBe(E9_TEXT);
    expect(root.querySelector('.schedule-body')?.textContent).toBe(E9_TEXT);
    expect(input('interestRate').value).toBe('5');
    expect(errorSpy).toHaveBeenCalled();
  });

  it('switching the schedule view fails → E9, not an uncaught error', () => {
    start();
    const spy = vi.spyOn(Element.prototype, 'replaceWith').mockImplementation(() => {
      throw new Error('render failure');
    });
    expect(() => root.querySelector<HTMLButtonElement>('.schedule [data-mode="yearly"]')!.click()).not.toThrow();
    spy.mockRestore();
    expect(resultsText()).toBe(E9_TEXT);
  });

  it('Download CSV fails (e.g. downloads blocked) → E9, not an uncaught error', () => {
    start({}, {
      download: () => {
        throw new Error('download blocked');
      },
    });
    expect(() => root.querySelector<HTMLButtonElement>('.schedule .csv-button')!.click()).not.toThrow();
    expect(resultsText()).toBe(E9_TEXT);
    expect(errorSpy).toHaveBeenCalled();
  });

  it('after an E9, fixing or changing an input brings the results back', () => {
    start({}, {
      download: () => {
        throw new Error('download blocked');
      },
    });
    root.querySelector<HTMLButtonElement>('.schedule .csv-button')!.click();
    type('interestRate', '5');
    expect(result('monthly-payment')).toBe('$1,610.46');
  });
});
'''
p.write_text(t)
EOF
npm test 2>&1 | grep -E '×|Test Files|Tests |Error:' | head -20
```

Output:

```
     × switching the schedule view fails → E9, not an uncaught error 85ms
     × Download CSV fails (e.g. downloads blocked) → E9, not an uncaught error 74ms
     × after an E9, fixing or changing an input brings the results back 26ms
Error: Failed to resolve import "../../src/ui/bootstrap" from "tests/unit/bootstrap.test.ts". Does the file exist?
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 3 ⎯⎯⎯⎯⎯⎯⎯
AssertionError: expected [Function] to not throw an error but 'Error: render failure' was thrown
"Error: render failure"
AssertionError: expected [Function] to not throw an error but 'Error: download blocked' was thrown
"Error: download blocked"
Error: download blocked
 Test Files  2 failed | 6 passed (8)
      Tests  3 failed | 322 passed (325)
```

</details>

<details><summary>Shell: Guard schedule click handlers; move global handlers out</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/schedule.ts'); t=p.read_text()
def rep(old,new):
    global t
    assert t.count(old)==1, old; t=t.replace(old,new)
rep("""export function createSchedule(format: Formatters, download: (filename: string, text: string) => void): ScheduleView {""",
"""export function createSchedule(
  format: Formatters,
  download: (filename: string, text: string) => void,
  /** Called when a click handler fails, so the app can show E9 instead of failing silently. */
  onError: (error: unknown) => void,
): ScheduleView {""")
rep("""    button.addEventListener('click', () => {
      mode = value;
      render();
    });""","""    button.addEventListener('click', () => {
      try {
        mode = value;
        render();
      } catch (error) {
        onError(error);
      }
    });""")
rep("""  csvButton.addEventListener('click', () => download(CSV_FILENAME, scheduleCsv(rows)));""","""  csvButton.addEventListener('click', () => {
    try {
      download(CSV_FILENAME, scheduleCsv(rows));
    } catch (error) {
      onError(error); // e.g. downloads blocked by the browser
    }
  });""")
p.write_text(t)

p=pathlib.Path('src/ui/app.ts'); t=p.read_text()
old="""  const schedule = createSchedule(format, download);"""
assert t.count(old)==1
t=t.replace(old,"""  // showUnexpectedError is defined below; it is only called later, from a click.
  const schedule = createSchedule(format, download, (error) => showUnexpectedError(error));""")
start=t.index('/** Last-resort handlers so the page never goes blank (L8.19). */')
t=t[:start].rstrip()+'\n'
p.write_text(t)
EOF
tail -5 src/ui/app.ts
```

Output:

```
  });

  update();
  return { showUnexpectedError };
}
```

</details>

Now the new startup module. It installs the global handlers first, and renders a plain-text E9 fallback if anything fails before the app exists:

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/ui/bootstrap.ts</summary>

```
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
```

</details>

<details><summary>Write /Users/dev/Desktop/Test Project Usama/src/main.ts</summary>

```
import './ui/styles.css';
import { startApp } from './ui/bootstrap';

// startApp never rejects and never leaves the page blank (see bootstrap.ts).
void startApp(document.querySelector<HTMLElement>('#app'));
```

</details>

<details><summary>Shell: Type-check and run all tests</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npx tsc --noEmit && echo tsc OK; npm test 2>&1 | grep -E '×|Test Files|Tests |AssertionError' | head -20
```

Output:

```
tsc OK
 Test Files  8 passed (8)
      Tests  333 passed (333)
```

</details>

<details><summary>Shell: Strengthen test and prove it catches the bug</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('tests/unit/bootstrap.test.ts'); t=p.read_text()
old="""    stop = (
      await startApp(root(), {
        loadConfig: config,
        createApp: (r, c) => {
          fireWindowError(new Error('async failure during startup'));
          return createApp(r, c);
        },
      })
    ).stop;
    // The app started afterwards and replaced the fallback; the error was handled, not lost.
    expect(errorSpy).toHaveBeenCalled();"""
new="""    let shownDuringStartup: string | null = null;
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
    expect(root().querySelector('[data-result="monthly-payment"]')?.textContent).toBe('$1,798.65');"""
assert t.count(old)==1; p.write_text(t.replace(old,new))
EOF
npx vitest run tests/unit/bootstrap.test.ts 2>&1 | grep -E '×|Tests '; git stash -q -- src/ui/bootstrap.ts 2>/dev/null; echo "(sanity: test must fail if handlers were installed after createApp)"; python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/bootstrap.ts'); t=p.read_text()
p.with_suffix('.ts.bak').write_text(t)
a="""  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onRejection);
"""
t=t.replace(a,"")
t=t.replace("""    app = createApp(target, configResult);""","""    app = createApp(target, configResult);
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);""")
p.write_text(t)
EOF
npx vitest run tests/unit/bootstrap.test.ts 2>&1 | grep -E '×|Tests '; mv src/ui/bootstrap.ts.bak src/ui/bootstrap.ts && npx vitest run tests/unit/bootstrap.test.ts 2>&1 | grep -E 'Tests '
```

Output:

```
      Tests  8 passed (8)
(sanity: test must fail if handlers were installed after createApp)
     × the global handlers are installed before createApp: an error thrown while the app is being built shows E9 49ms
     × a global error before any app exists (e.g. while config loads) shows the E9 fallback 6ms
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯
      Tests  2 failed | 6 passed (8)
      Tests  8 passed (8)
```

</details>

<details><summary>Shell: Verify the stray stash did nothing</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && echo "stash entries: $(git stash list | wc -l | tr -d ' ')" && ls src/ui/bootstrap.ts src/ui/bootstrap.ts.bak 2>&1 | head -2 && grep -c "window.addEventListener('error', onError);" src/ui/bootstrap.ts && git status --short
```

Output:

```
stash entries: 0
ls: src/ui/bootstrap.ts.bak: No such file or directory
src/ui/bootstrap.ts
1
 M src/main.ts
 M src/ui/app.ts
 M src/ui/schedule.ts
 M tests/unit/ui.test.ts
 M transcripts/session-02.md
?? src/ui/bootstrap.ts
?? tests/unit/bootstrap.test.ts
?? transcripts/INDEX.md
?? transcripts/raw/
?? transcripts/session-03-part4.md
?? transcripts/session-03-part5.md
?? transcripts/session-03.md
```

</details>

<details><summary>Shell: Build and serve for a startup check</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npm run build 2>&1 | tail -1 && npx vite preview --port 4173 --strictPort
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "async () => {\n  await new Promise((r) => setTimeout(r, 300));\n  const before = document.querySelector('[data-result=\"monthly-payment\"]')?.textContent;\n  // An unexpected error after startup, like a bug in some later code path:\n  setTimeout(() => { throw new Error('simulated late failure'); }, 0);\n  await new Promise((r) => setTimeout(r, 50));\n  return { before, resultsAfter: document.querySelector('.results-body')?.textContent, priceKept: document.querySelector('#field-homePrice').value };\n}"
}
```

Output:

````
### Result
{
  "before": "$1,798.65",
  "resultsAfter": "Something went wrong. Your inputs are kept; please try again.",
  "priceKept": "350000"
}
### Ran Playwright code
```js
await page.evaluate('async () => {\n  await new Promise((r) => setTimeout(r, 300));\n  const before = document.querySelector(\'[data-result="monthly-payment"]\')?.textContent;\n  // An unexpected error after startup, like a bug in some later code path:\n  setTimeout(() => { throw new Error(\'simulated late failure\'); }, 0);\n  await new Promise((r) => setTimeout(r, 50));\n  return { before, resultsAfter: document.querySelector(\'.results-body\')?.textContent, priceKept: document.querySelector(\'#field-homePrice\').value };\n}');
```
### Page
- Page URL: http://localhost:4173/
- Page Title: Mortgage Calculator
- Console: 2 errors, 0 warnings
### Events
- New console entries: .playwright-mcp/console-2026-11-06T16-36-05-616Z.log#L1-L4
````

</details>

In a real browser the app starts normally ($1,798.65). An uncaught error thrown afterwards shows E9 in the results, keeps the inputs, and logs to the console. Cleaning up and committing:

<details><summary>Browser: close</summary>

```json
{}
```

</details>

<details><summary>TaskStop</summary>

```json
{
  "task_id": "bd0sbvncq"
}
```

</details>

<details><summary>Shell: Run checks and commit the error-handling fix</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && rm -rf .playwright-mcp && npm test 2>&1 | grep -E 'Test Files|Tests ' && npx tsc --noEmit && echo tsc OK && git add src tests && git commit -q -F - <<'EOF'
Never leave a blank page: install error handlers before startup

- New src/ui/bootstrap.ts: global error/unhandledrejection handlers are installed
  before config loading and createApp; a startup failure renders E9 into #app
  (textContent only); a missing #app gets a fallback container
- Schedule click handlers (Monthly/Yearly, Download CSV) catch their own errors
  and show E9 instead of throwing uncaught
- 12 new tests (bootstrap + in-app error paths); 333 total

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --oneline | head -1
```

Output:

```
 Test Files  8 passed (8)
      Tests  333 passed (333)
tsc OK
4b1dccf Never leave a blank page: install error handlers before startup
```

</details>

The blank-page bug is fixed, and two more gaps I found along the way are fixed too. All 333 tests pass and the type check is clean. I committed it locally as `4b1dccf` and didn't push.

## Startup fix
- **New `src/ui/bootstrap.ts`** (`main.ts` is now 3 lines that call it):
  - The global `error` and `unhandledrejection` handlers are installed **first**, before config loading and before `createApp`.
  - If anything fails before the app exists, `#app` shows the app title and E9 ("Something went wrong. Your inputs are kept; please try again."), set as plain text.
  - After startup, global errors go to the app, which shows E9 in the results and schedule and keeps the inputs.
  - If showing the error itself fails, it falls back to the minimal page.
  - If `#app` is missing, it creates one, so there's always somewhere to show the message.

**One wording compromise:** E9's "Your inputs are kept" is slightly off at startup, when there are no inputs yet. I used it so every message still comes from the Error messages table. If you prefer a separate startup message, it would be a new E21 in the table.

**Tests:** 8 new startup tests, written first; they failed until the module existed. They cover:
- a normal start;
- `createApp` throwing → E9, and `startApp` doesn't reject;
- `loadConfig` rejecting → built-in defaults;
- an error fired while the app is being built → E9 is on screen at that moment;
- an error while config is still loading;
- errors and rejected promises after startup;
- a missing `#app`;
- `stop()` removing the handlers.

I proved the key test is real: with the handlers moved back after `createApp`, two tests fail.

## Every error path
| Path | What the user sees | Verified by |
|---|---|---|
| **Startup:** `createApp` throws | Title + E9 in `#app` | bootstrap test |
| **Startup:** error while config loads or the app is built | E9 fallback | bootstrap tests |
| **Startup:** `#app` missing | E9 fallback in the page | bootstrap test |
| **Startup:** JavaScript disabled | The `<noscript>` text in `index.html` | `index.html` |
| **Config:** missing (real 404, or the HTML fallback) | Calculator on defaults + E11 "file not found" | config tests, real dev server (A4.1 fix) |
| **Config:** invalid JSON / not an object / network error | Defaults + E11 | config tests |
| **Config:** bad fields, bad presets, unknown keys | Valid parts applied + E12 listing each | config tests |
| **Config:** validation code itself throws | Defaults + E11 | `loadConfig` catch-all, test |
| **Input:** empty, non-numeric, out of range, down ≥ price | Field message (E1–E6) + E8 in results and schedule | parse, validate, ui tests |
| **Engine:** loan too small (payment 0.00, or no repayment) | E7, no figures | engine, ui tests |
| **Engine:** non-finite or negative value, bad input reaching the engine | E10, no figures, logged | engine, ui tests |
| **Engine:** throws | E9, inputs kept | ui `L8.19` |
| **Rendering:** results or schedule can't be drawn | E9, nothing half-drawn | **new** ui test |
| **Schedule view switch fails** | **Was:** an uncaught error. **Now:** E9 | **new** ui test (failed first, fixed) |
| **Download CSV fails** (e.g. downloads blocked) | **Was:** an uncaught error. **Now:** E9 | **new** ui test (failed first, fixed) |
| **After any E9** | The next input change brings the results back | **new** ui test |
| **Any other uncaught error or rejected promise** | E9 via the global handlers | bootstrap tests; real Chromium (an error thrown after startup showed E9, inputs kept) |

**Gaps found and fixed:**
1. **The startup blank page**, which you reported.
2. **The schedule's Monthly/Yearly switch.** Its handler ran outside any `try`; it now catches its own errors.
3. **Download CSV**, the same problem. A blocked download would have been an uncaught error with nothing on screen during startup.

**No path left shows a blank page or a wrong result.** There's one thing an app can't detect: a browser that silently ignores a download. The click then does nothing and no message appears. Nothing wrong is ever displayed, though.

**Still pending from before:**
- **The overwritten `transcripts/session-02.md`:** restore it with `git restore transcripts/session-02.md`.
- **The token** in `session-03.md` and `raw/.txt`.
- **Your browser check (L10)** and **the manual Network check (A5.4)**.

---

### User · 21:37

> Change to M1, the loan product selector:
> - Put the rate and term fields directly after the "Loan product" selector.
> - When a product (e.g. "15-year fixed", "30-year fixed") is selected, rate and term show the
>   product's values and are locked (not editable). Under them, show: "Set by <product name>.
>   Choose Custom to change."
> - When "Custom" is selected, rate and term are editable and keep their current values.
> - Decide between disabled and readonly for accessibility (screen readers, focus, contrast)
>   and tell me why.
> Update M1's acceptance criteria first (M1.4 changes, add G/W/T for the locked state and
> switching back to Custom), show me the new criteria, then write the tests, then the code.
> Check it in the browser at desktop and 360px, and run all tests.

### Claude · 21:37

First, the decision you asked for. **I recommend `readonly`, not `disabled`:**

| | `readonly` | `disabled` |
|---|---|---|
| **Keyboard focus** | Stays in the Tab order, so keyboard users reach the field and the "Set by…" note | Removed from the Tab order. Keyboard users skip it, and with it the explanation of why they can't change the value |
| **Screen readers** | Read out the value and "read-only", plus the note via `aria-describedby` | Often read as "dimmed/unavailable", and some readers skip disabled fields when browsing by form controls |
| **Contrast** | We control the styling, so text stays at full AA contrast | Browsers grey disabled text, usually below 4.5:1, and WCAG exempts disabled controls, so they're legitimately hard to read |
| **Meaning** | "This value applies, but it's set elsewhere", which is exactly the situation | "Not applicable now", which is wrong: the rate *is* used in the calculation |

Now the docs first. The current M1:

<details><summary>Shell: Show M1 and other mentions of the Custom behaviour</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && awk '/^### M1\./,/^### M2\./' docs/user-stories.md | sed '$d'; echo "--- other places that describe 'edit the rate → Custom':"; grep -rnE 'switches (back )?to \*?\*?Custom|Custom\*?\*?, so the figures|edit(ing)? the rate' README.md docs | cut -c1-160
```

Output:

```
### M1. Apply loan product presets
**Priority:** Must · **Scope:** Core · **Serves:** J-9 · **Status:** Implemented

As a Manager, I want to pick one of our loan products from a list, so that the rate and term are filled in correctly and consistently.

**Acceptance criteria**
1. Given config presets "30-year fixed" (6.5%, 30 years) and "15-year fixed" (5.75%, 15 years), when the page loads, then a "Loan product" selector lists "Custom", "30-year fixed" and "15-year fixed" in that order, with "Custom" selected.
2. Given home price 350,000 and down payment 50,000, when I select "15-year fixed", then the rate field shows 5.75, the term shows 15, and the monthly payment updates to 2,491.23.
3. Given a preset with a `description`, when I select it, then the description text appears under the selector.
4. Given "15-year fixed" is selected, when I change the rate to 6, then the selector shows "Custom" and the results use 6%.
5. Given "15-year fixed" is selected, when I change the home price, then the selector still shows "15-year fixed", because price is not part of a preset.
6. Given "15-year fixed" is selected, when I choose "Custom", then the fields keep their current values.
7. Given the config has no presets (missing or an empty list), when the page loads, then the selector is hidden and the calculator works normally.

--- other places that describe 'edit the rate → Custom':
README.md:33:**Manager.** Choose **Loan product → 15-year fixed**. The rate (5.75) and term (15) are filled in, and the product's description appears. Edit the
```

</details>

<details><summary>Shell: Rewrite M1 criteria and the README Manager paragraph</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('docs/user-stories.md'); t=p.read_text()
start=t.index('As a Manager, I want to pick one of our loan products from a list')
end=t.index('### M2.')
new='''As a Manager, I want to pick one of our loan products from a list, so that the rate and term are filled in correctly and consistently.

While a product is selected, its rate and term are locked, so a quote can never show a product name with figures that don't belong to it. Locked fields use `readonly`, not `disabled`: they stay in the Tab order, screen readers announce their value and the note, and their text keeps full contrast.

**Acceptance criteria**
1. Given config presets "30-year fixed" (6.5%, 30 years) and "15-year fixed" (5.75%, 15 years), when the page loads, then a "Loan product" selector lists "Custom", "30-year fixed" and "15-year fixed" in that order, with "Custom" selected, and the interest rate and loan term fields come directly after the selector and are editable.
2. Given home price 350,000 and down payment 50,000, when I select "15-year fixed", then the rate field shows 5.75, the term shows 15, and the monthly payment updates to 2,491.23.
3. Given a preset with a `description`, when I select it, then the description text appears under the selector.
4. Given "15-year fixed" is selected, when I try to type in or paste into the rate or term field, then the values stay 5.75 and 15. Both fields are `readonly` (not `disabled`), can still be reached with Tab, and under them I see "Set by 15-year fixed. Choose Custom to change.", which is linked to both fields with `aria-describedby`.
5. Given "15-year fixed" is selected, when I change the home price, down payment or extra payment, then the selector still shows "15-year fixed" and the rate and term stay locked.
6. Given "15-year fixed" is selected, when I choose "Custom", then the rate and term become editable, keep the values 5.75 and 15, and the "Set by …" note disappears. When I then change the rate to 6 (with 350,000 / 50,000), the monthly payment updates to 2,531.57 and the selector still shows "Custom".
7. Given "30-year fixed" is selected, when I select "15-year fixed", then the rate and term change to 5.75 and 15, stay locked, and the note reads "Set by 15-year fixed. Choose Custom to change."
8. Given the config has no presets (missing or an empty list), when the page loads, then the selector is hidden, the fields are in the usual order (home price, down payment, rate, term, extra payment), the rate and term are editable, and no "Set by …" note is shown.

---

## Admin stories

'''
# keep the text between M1 block end and "### M2." intact? check what's there
seg=t[start:end]
assert '## Admin stories' not in seg  # M2 follows M1 directly
new=new.replace('\n---\n\n## Admin stories\n\n','\n')
t=t[:start]+new+t[end:]
p.write_text(t)

p=pathlib.Path('README.md'); t=p.read_text()
i=t.index('**Manager.** Choose **Loan product → 15-year fixed**.')
j=t.index('\n',i)
t=t[:i]+'**Manager.** Choose **Loan product → 15-year fixed**. The rate (5.75) and term (15) are filled in and locked, the note "Set by 15-year fixed. Choose Custom to change." appears under them, and the product\'s description appears under the selector. Price, down payment and extra payment stay editable. Choose **Custom** to edit the rate and term again.'+t[j:]
p.write_text(t)
EOF
awk '/^### M1\./,/^### M2\./' docs/user-stories.md | sed '$d' | tail -12; grep -n '^\*\*Manager\.\*\*' README.md | cut -c1-200
```

Output:

```
While a product is selected, its rate and term are locked, so a quote can never show a product name with figures that don't belong to it. Locked fields use `readonly`, not `disabled`: they stay in the Tab order, screen readers announce their value and the note, and their text keeps full contrast.

**Acceptance criteria**
1. Given config presets "30-year fixed" (6.5%, 30 years) and "15-year fixed" (5.75%, 15 years), when the page loads, then a "Loan product" selector lists "Custom", "30-year fixed" and "15-year fixed" in that order, with "Custom" selected, and the interest rate and loan term fields come directly after the selector and are editable.
2. Given home price 350,000 and down payment 50,000, when I select "15-year fixed", then the rate field shows 5.75, the term shows 15, and the monthly payment updates to 2,491.23.
3. Given a preset with a `description`, when I select it, then the description text appears under the selector.
4. Given "15-year fixed" is selected, when I try to type in or paste into the rate or term field, then the values stay 5.75 and 15. Both fields are `readonly` (not `disabled`), can still be reached with Tab, and under them I see "Set by 15-year fixed. Choose Custom to change.", which is linked to both fields with `aria-describedby`.
5. Given "15-year fixed" is selected, when I change the home price, down payment or extra payment, then the selector still shows "15-year fixed" and the rate and term stay locked.
6. Given "15-year fixed" is selected, when I choose "Custom", then the rate and term become editable, keep the values 5.75 and 15, and the "Set by …" note disappears. When I then change the rate to 6 (with 350,000 / 50,000), the monthly payment updates to 2,531.57 and the selector still shows "Custom".
7. Given "30-year fixed" is selected, when I select "15-year fixed", then the rate and term change to 5.75 and 15, stay locked, and the note reads "Set by 15-year fixed. Choose Custom to change."
8. Given the config has no presets (missing or an empty list), when the page loads, then the selector is hidden, the fields are in the usual order (home price, down payment, rate, term, extra payment), the rate and term are editable, and no "Set by …" note is shown.

33:**Manager.** Choose **Loan product → 15-year fixed**. The rate (5.75) and term (15) are filled in and locked, the note "Set by 15-year fixed. Choose Custom to change." appears under them, and the p
```

</details>

The criteria are updated. Now the tests: I'm replacing the old M1 block in `ui.test.ts`, since M1.4's behaviour changed and M1.7 is renumbered to M1.8:

<details><summary>Shell: Locate M1 test block boundaries</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -n "^### M2\.\|^8\. Given the config has no presets" docs/user-stories.md && grep -n "describe('Loan product selector (M1)'\|describe('Error paths inside the running app" tests/unit/ui.test.ts
```

Output:

```
287:8. Given the config has no presets (missing or an empty list), when the page loads, then the selector is hidden, the fields are in the usual order (home price, down payment, rate, term, extra payment), the rate and term are editable, and no "Set by …" note is shown.
289:### M2. Print a client quote
658:describe('Loan product selector (M1)', () => {
763:describe('Error paths inside the running app (L8.19)', () => {
```

</details>

<details><summary>Shell: Replace M1 tests with the new criteria and run</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('tests/unit/ui.test.ts'); t=p.read_text()
start=t.index("describe('Loan product selector (M1)', () => {")
end=t.index("describe('Error paths inside the running app (L8.19)'")
new='''describe('Loan product selector (M1)', () => {
  const PRESETS = {
    presets: [
      { id: 'f30', name: '30-year fixed', ratePercent: 6.5, termYears: 30, description: 'Our standard 30-year loan' },
      { id: 'f15', name: '15-year fixed', ratePercent: 5.75, termYears: 15, description: 'Lower total interest' },
    ],
  };
  const select = (): HTMLSelectElement => root.querySelector<HTMLSelectElement>('#field-preset')!;
  const choose = (value: string): void => {
    select().value = value;
    select().dispatchEvent(new Event('change', { bubbles: true }));
  };
  const selectedText = (): string => select().selectedOptions[0]?.textContent ?? '';
  const description = (): string => root.querySelector('#field-preset-description')?.textContent ?? '';
  const lockNote = (): HTMLElement | null => root.querySelector<HTMLElement>('#field-lock-note');
  const fieldOrder = (): string[] =>
    [...root.querySelectorAll<HTMLInputElement | HTMLSelectElement>('form input, form select')].map((el) => el.name);
  const isLocked = (field: Field): boolean => input(field).readOnly;

  it('M1.1: Custom, 30-year fixed, 15-year fixed in order, Custom selected; rate and term follow the selector and are editable', () => {
    start(PRESETS);
    expect(root.querySelector('label[for="field-preset"]')?.textContent).toBe('Loan product');
    expect([...select().options].map((o) => o.textContent)).toEqual(['Custom', '30-year fixed', '15-year fixed']);
    expect(selectedText()).toBe('Custom');
    expect(fieldOrder()).toEqual(['preset', 'interestRate', 'termYears', 'homePrice', 'downPayment', 'extraPayment']);
    expect(isLocked('interestRate')).toBe(false);
    expect(isLocked('termYears')).toBe(false);
    expect(lockNote()?.textContent ?? '').toBe('');
  });

  it('M1.2: choosing 15-year fixed fills 5.75 and 15 and updates the payment to 2,491.23', () => {
    start(PRESETS);
    enter({ homePrice: '350000', downPayment: '50000' });
    choose('f15');
    expect(input('interestRate').value).toBe('5.75');
    expect(input('termYears').value).toBe('15');
    expect(result('monthly-payment')).toBe('$2,491.23');
    expect(root.querySelectorAll('.schedule tbody tr')).toHaveLength(180);
  });

  it('M1.3: the description appears under the selector, and goes away for Custom', () => {
    start(PRESETS);
    expect(description()).toBe('');
    choose('f15');
    expect(description()).toBe('Lower total interest');
    expect(select().getAttribute('aria-describedby')).toBe('field-preset-description');
    choose('');
    expect(description()).toBe('');
  });

  it('M1.4: with a product selected, rate and term are readonly (not disabled), focusable, and explained by the note', () => {
    start(PRESETS);
    choose('f15');
    for (const field of ['interestRate', 'termYears'] as const) {
      const el = input(field);
      expect(el.readOnly).toBe(true);
      expect(el.disabled).toBe(false);
      expect(el.tabIndex).not.toBe(-1);
      expect(el.getAttribute('aria-describedby')?.split(' ')).toContain('field-lock-note');
      expect(el.closest('.field')?.classList.contains('is-locked')).toBe(true);
    }
    expect(lockNote()?.textContent).toBe('Set by 15-year fixed. Choose Custom to change.');
    expect(lockNote()?.hidden).toBe(false);
    // The note sits directly under the rate and term fields.
    expect(input('termYears').closest('.field')?.nextElementSibling).toBe(lockNote());
  });

  it('M1.4: a forced input event on a locked field (e.g. a script) does not unlock it or change the product', () => {
    start(PRESETS);
    choose('f15');
    input('interestRate').dispatchEvent(new Event('input', { bubbles: true }));
    expect(selectedText()).toBe('15-year fixed');
    expect(isLocked('interestRate')).toBe(true);
    expect(input('interestRate').value).toBe('5.75');
  });
… (80 more lines not shown)
```

Output:

```
     × M1.1: Custom, 30-year fixed, 15-year fixed in order, Custom selected; rate and term follow the selector and are editable 61ms
     × M1.4: with a product selected, rate and term are readonly (not disabled), focusable, and explained by the note 54ms
     × M1.4: a forced input event on a locked field (e.g. a script) does not unlock it or change the product 74ms
     × M1.5: changing homePrice keeps the product and the lock 52ms
     × M1.5: changing downPayment keeps the product and the lock 64ms
     × M1.5: changing extraPayment keeps the product and the lock 56ms
     × M1.6: choosing Custom unlocks rate and term, keeps 5.75 / 15, removes the note; rate 6 → 2,531.57 110ms
     × M1.7: switching from 30-year fixed to 15-year fixed updates the values and the note, and stays locked 69ms
     × a locked field keeps its error behaviour out of the way: choosing a product clears a shown rate error 210ms
     × preset names and descriptions are plain text, including in the note 57ms
⎯⎯⎯⎯⎯⎯ Failed Tests 10 ⎯⎯⎯⎯⎯⎯⎯
 Test Files  1 failed | 7 passed (8)
      Tests  10 failed | 324 passed (334)
```

</details>

<details><summary>Shell: Add field locking to form; simplify preset selector</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/form.ts'); t=p.read_text()
def rep(old,new):
    global t
    assert t.count(old)==1, old[:70]; t=t.replace(old,new)
rep("""  /** Shows (text) or clears (null) the message under a field. */
  setError(field: Field, text: string | null): void;
}""","""  /** Shows (text) or clears (null) the message under a field. */
  setError(field: Field, text: string | null): void;
  /**
   * Locks or unlocks a field (M1.4). Locked fields are `readonly`, not `disabled`: they stay in
   * the Tab order, screen readers announce their value, and their text keeps full contrast.
   * `noteId` is added to `aria-describedby` while locked.
   */
  setLocked(field: Field, locked: boolean, noteId: string): void;
  /** The wrapper element of a field, e.g. to insert a note after it. */
  wrapperOf(field: Field): HTMLElement | undefined;
}""")
rep("""  const wrappers: Partial<Record<Field, HTMLElement>> = {};
""","""  const wrappers: Partial<Record<Field, HTMLElement>> = {};
  /** What `aria-describedby` points to: the error message and/or a lock note. */
  const described: Partial<Record<Field, { error: boolean; lockNote: string | null }>> = {};

  const refreshDescribedBy = (field: Field): void => {
    const input = inputs[field];
    const state = described[field];
    if (!input || !state) return;
    const ids = [state.error ? errorId(field) : null, state.lockNote].filter((id): id is string => id !== null);
    if (ids.length > 0) input.setAttribute('aria-describedby', ids.join(' '));
    else input.removeAttribute('aria-describedby');
  };
""")
rep("""    inputs[spec.field] = input;
    errors[spec.field] = error;
    wrappers[spec.field] = wrapper;""","""    inputs[spec.field] = input;
    errors[spec.field] = error;
    wrappers[spec.field] = wrapper;
    described[spec.field] = { error: false, lockNote: null };""")
rep("""      if (text === null) {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
        wrapper.classList.remove('has-error');
        error.replaceChildren();
        return;
      }
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errorId(field));
      wrapper.classList.add('has-error');""","""      const state = described[field];
      if (text === null) {
        input.removeAttribute('aria-invalid');
        if (state) state.error = false;
        refreshDescribedBy(field);
        wrapper.classList.remove('has-error');
        error.replaceChildren();
        return;
      }
      input.setAttribute('aria-invalid', 'true');
      if (state) state.error = true;
      refreshDescribedBy(field);
      wrapper.classList.add('has-error');""")
rep("""      error.replaceChildren(marker, document.createTextNode(text));
    },""","""      error.replaceChildren(marker, document.createTextNode(text));
    },
    setLocked(field, locked, noteId) {
      const input = inputs[field];
      const wrapper = wrappers[field];
      const state = described[field];
      if (!input || !wrapper || !state) return;
      input.readOnly = locked;
      wrapper.classList.toggle('is-locked', locked);
      state.lockNote = locked ? noteId : null;
      refreshDescribedBy(field);
    },
    wrapperOf: (field) => wrappers[field],""")
p.write_text(t)

p=pathlib.Path('src/ui/presets.ts'); t=p.read_text()
start=t.index('export interface PresetSelector {')
t=t[:start]+'''export interface PresetSelector {
… (63 more lines not shown)
```

Output:

```
ok
```

</details>

Now the app wiring. Reading the current form and preset section of `app.ts`:

<details><summary>Shell: Show app.ts form and preset wiring</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -n 'createForm(\|FORM_FIELDS\|presetSelector\|form.element.addEventListener\|UI_TEXT.lockedBy' src/ui/app.ts && sed -n '/  \/\/ Loan product selector (M1)/,/^  });/p' src/ui/app.ts
```

Output:

```
11:import { createForm, FORM_FIELDS, type Adornment } from './form';
43:  const form = createForm(
44:    FORM_FIELDS,
98:      for (const { field } of FORM_FIELDS) {
130:  const presetSelector = createPresetSelector(config.presets, (preset) => {
137:  if (presetSelector) form.element.prepend(presetSelector.element);
139:  form.element.addEventListener('input', (event) => {
143:    if (target === form.inputs.interestRate || target === form.inputs.termYears) presetSelector?.markCustom();
146:  form.element.addEventListener('focusout', (event) => {
  // Loan product selector (M1): fills rate and term, then recalculates.
  const presetSelector = createPresetSelector(config.presets, (preset) => {
    const rate = form.inputs.interestRate;
    const term = form.inputs.termYears;
    if (rate) rate.value = toInputText(preset.ratePercent);
    if (term) term.value = toInputText(preset.termYears);
    update();
  });
```

</details>

<details><summary>Shell: Wire locking into the app and run tests</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/messages.ts'); t=p.read_text()
old="""  custom: 'Custom',"""
assert t.count(old)==1
t=t.replace(old,"""  custom: 'Custom',
  lockedBy: (productName: string) => `Set by ${productName}. Choose Custom to change.`,""")
p.write_text(t)

p=pathlib.Path('src/ui/app.ts'); t=p.read_text()
def rep(old,new):
    global t
    assert t.count(old)==1, old[:70]; t=t.replace(old,new)
rep("""  const form = createForm(
    FORM_FIELDS,""","""  // With a loan product selector, rate and term come directly after it (M1.1);
  // without one, the usual order starts with the home price (M1.8).
  const hasPresets = config.presets.length > 0;
  const fieldOrder: Field[] = hasPresets
    ? ['interestRate', 'termYears', 'homePrice', 'downPayment', 'extraPayment']
    : ['homePrice', 'downPayment', 'interestRate', 'termYears', 'extraPayment'];
  const orderedFields = fieldOrder
    .map((field) => FORM_FIELDS.find((spec) => spec.field === field))
    .filter((spec): spec is (typeof FORM_FIELDS)[number] => spec !== undefined);
  const form = createForm(
    orderedFields,""")
old_start=t.index("  // Loan product selector (M1): fills rate and term, then recalculates.")
old_end=t.index("  form.element.addEventListener('focusout'")
t=t[:old_start]+"""  // Loan product selector (M1): a product fills and locks rate and term; "Custom" unlocks them
  // and keeps their current values (M1.4, M1.6).
  const LOCK_NOTE_ID = 'field-lock-note';
  const lockNote = document.createElement('p');
  lockNote.id = LOCK_NOTE_ID;
  lockNote.className = 'field-hint lock-note';
  lockNote.hidden = true;
  const lockedFields: Field[] = ['interestRate', 'termYears'];

  const presetSelector = createPresetSelector(config.presets, (preset) => {
    for (const field of lockedFields) form.setLocked(field, preset !== null, LOCK_NOTE_ID);
    if (preset) {
      const rate = form.inputs.interestRate;
      const term = form.inputs.termYears;
      if (rate) rate.value = toInputText(preset.ratePercent);
      if (term) term.value = toInputText(preset.termYears);
      lockNote.textContent = UI_TEXT.lockedBy(preset.name); // plain text
      lockNote.hidden = false;
    } else {
      lockNote.textContent = '';
      lockNote.hidden = true;
    }
    update();
  });
  if (presetSelector) {
    form.element.prepend(presetSelector.element);
    // The note sits directly under the rate and term fields (M1.4).
    form.wrapperOf('termYears')?.after(lockNote);
  }

  form.element.addEventListener('input', update);
"""+t[old_end:]
p.write_text(t)
EOF
npx tsc --noEmit && echo tsc OK; npm test 2>&1 | grep -E '×|Test Files|Tests ' | head
```

Output:

```
tsc OK
 Test Files  8 passed (8)
      Tests  334 passed (334)
```

</details>

<details><summary>Shell: Style the locked state and check its contrast</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('src/ui/styles.css'); t=p.read_text()
old=""".field.has-error .input-group {"""
assert t.count(old)==1
t=t.replace(old,"""/* Locked by a loan product (M1.4): readonly, so the text keeps full contrast and stays focusable.
   Dashed border + sunken background say "set elsewhere"; the note under the fields says why. */
.field.is-locked .input-group {
  border-style: dashed;
  background: var(--surface-sunken);
}

.field.is-locked input {
  cursor: default;
}

.lock-note {
  margin-top: calc(var(--space-2) * -1);
  padding: var(--space-2) var(--space-3);
  border-left: 3px solid var(--brand);
  border-radius: var(--radius-sm);
  background: var(--brand-soft);
  color: var(--text);
}

"""+old)
p.write_text(t)
EOF
node -e '
const lum=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4);return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]};
const cr=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return ((x+0.05)/(y+0.05)).toFixed(2)};
console.log("locked value light #15202b on #f7f9fb:", cr("#15202b","#f7f9fb"), "| dark #e6edf3 on #111820:", cr("#e6edf3","#111820"));
console.log("note text light #15202b on #eaf2f9:", cr("#15202b","#eaf2f9"), "| dark #e6edf3 on #17283a:", cr("#e6edf3","#17283a"));
console.log("dashed border light #7a8898 on #f7f9fb:", cr("#7a8898","#f7f9fb"), "| dark #66778a on #111820:", cr("#66778a","#111820"));'; npm run build 2>&1 | tail -1
```

Output:

```
locked value light #15202b on #f7f9fb: 15.63 | dark #e6edf3 on #111820: 15.12
note text light #15202b on #eaf2f9: 14.58 | dark #e6edf3 on #17283a: 12.69
dashed border light #7a8898 on #f7f9fb: 3.43 | dark #66778a on #111820: 3.89
✓ built in 93ms
```

</details>

<details><summary>Shell: Serve the build for the browser check</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && npx vite preview --port 4173 --strictPort
```

</details>

<details><summary>Browser: resize</summary>

```json
{
  "width": 1280,
  "height": 900
}
```

</details>

<details><summary>Browser: emulate_media</summary>

```json
{
  "colorScheme": "light"
}
```

</details>

<details><summary>Browser: navigate</summary>

```json
{
  "url": "http://localhost:4173/"
}
```

</details>

<details><summary>Browser: select_option</summary>

```json
{
  "target": "#field-preset",
  "values": [
    "f15"
  ]
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => { document.getElementById('field-interestRate').focus(); return document.activeElement.id; }"
}
```

</details>

<details><summary>Browser: press_key</summary>

```json
{
  "key": "Backspace"
}
```

</details>

<details><summary>Browser: press_key</summary>

```json
{
  "key": "9"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "async () => {\n  // Paste attempt: a real paste via execCommand is blocked on readonly fields\n  const rate = document.getElementById('field-interestRate');\n  rate.focus(); rate.select();\n  const pasted = document.execCommand('insertText', false, '12');\n  // Tab order from the selector\n  const order = [...document.querySelectorAll('form select, form input')].map((el) => el.id);\n  return {\n    rate: rate.value, term: document.getElementById('field-termYears').value,\n    readOnly: rate.readOnly, disabled: rate.disabled, pasteChanged: pasted && rate.value !== '5.75',\n    preset: document.getElementById('field-preset').selectedOptions[0].textContent,\n    note: document.getElementById('field-lock-note').textContent,\n    describedBy: rate.getAttribute('aria-describedby'),\n    payment: document.querySelector('[data-result=\"monthly-payment\"]').textContent,\n    domOrder: order,\n  };\n}"
}
```

Output:

````
### Result
{
  "rate": "5.75",
  "term": "15",
  "readOnly": true,
  "disabled": false,
  "pasteChanged": false,
  "preset": "15-year fixed",
  "note": "Set by 15-year fixed. Choose Custom to change.",
  "describedBy": "field-lock-note",
  "payment": "$2,491.23",
  "domOrder": [
    "field-preset",
    "field-interestRate",
    "field-termYears",
    "field-homePrice",
    "field-downPayment",
    "field-extraPayment"
  ]
}
### Ran Playwright code
```js
await page.evaluate('async () => {\n  // Paste attempt: a real paste via execCommand is blocked on readonly fields\n  const rate = document.getElementById(\'field-interestRate\');\n  rate.focus(); rate.select();\n  const pasted = document.execCommand(\'insertText\', false, \'12\');\n  // Tab order from the selector\n  const order = [...document.querySelectorAll(\'form select, form input\')].map((el) => el.id);\n  return {\n    rate: rate.value, term: document.getElementById(\'field-termYears\').value,\n    readOnly: rate.readOnly, disabled: rate.disabled, pasteChanged: pasted && rate.value !== \'5.75\',\n    preset: document.getElementById(\'field-preset\').selectedOptions[0].textContent,\n    note: document.getElementById(\'field-lock-note\').textContent,\n    describedBy: rate.getAttribute(\'aria-describedby\'),\n    payment: document.querySelector(\'[data-result="monthly-payment"]\').textContent,\n    domOrder: order,\n  };\n}');
```
````

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => { document.getElementById('field-preset').focus(); return document.activeElement.id; }"
}
```

</details>

<details><summary>Browser: press_key</summary>

```json
{
  "key": "Tab"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => document.activeElement.id"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/m1-desktop-locked.png"
}
```

Output:

````
### Result
- [Screenshot of viewport](.playwright-mcp/m1-desktop-locked.png)
### Ran Playwright code
```js
// Screenshot viewport and save it as .playwright-mcp/m1-desktop-locked.png
await page.screenshot({
  path: '.playwright-mcp/m1-desktop-locked.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/m1-desktop-locked.png</summary>



Output:

```
[image: screenshot]
```

</details>

<details><summary>Browser: select_option</summary>

```json
{
  "target": "#field-preset",
  "values": [
    ""
  ]
}
```

</details>

<details><summary>Browser: type</summary>

```json
{
  "target": "#field-interestRate",
  "text": "6"
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => ({ preset: document.getElementById('field-preset').selectedOptions[0].textContent, rate: document.getElementById('field-interestRate').value, term: document.getElementById('field-termYears').value, readOnly: document.getElementById('field-interestRate').readOnly, noteHidden: document.getElementById('field-lock-note').hidden, payment: document.querySelector('[data-result=\"monthly-payment\"]').textContent })"
}
```

</details>

<details><summary>Browser: resize</summary>

```json
{
  "width": 360,
  "height": 800
}
```

</details>

<details><summary>Browser: emulate_media</summary>

```json
{
  "colorScheme": "dark"
}
```

</details>

<details><summary>Browser: select_option</summary>

```json
{
  "target": "#field-preset",
  "values": [
    "f30"
  ]
}
```

</details>

<details><summary>Browser: evaluate</summary>

```json
{
  "function": "() => { window.scrollTo(0, 0); document.activeElement?.blur(); return { scrollWidth: document.documentElement.scrollWidth, note: document.getElementById('field-lock-note').textContent }; }"
}
```

</details>

<details><summary>Browser: take_screenshot</summary>

```json
{
  "scale": "css",
  "filename": ".playwright-mcp/m1-mobile-dark.png"
}
```

Output:

````
### Result
- [Screenshot of viewport](.playwright-mcp/m1-mobile-dark.png)
### Ran Playwright code
```js
// Screenshot viewport and save it as .playwright-mcp/m1-mobile-dark.png
await page.screenshot({
  path: '.playwright-mcp/m1-mobile-dark.png',
  scale: 'css',
  type: 'png'
});
```
````

</details>

<details><summary>Read /Users/dev/Desktop/Test Project Usama/.playwright-mcp/m1-mobile-dark.png</summary>



Output:

```
[image: screenshot]
```

</details>

At 360 px in dark mode: no horizontal scroll, the locked fields are clearly dashed with readable text, and the note wraps cleanly under them. Cleaning up and committing:

<details><summary>Browser: close</summary>

```json
{}
```

</details>

<details><summary>TaskStop</summary>

```json
{
  "task_id": "bvrpqg0ol"
}
```

</details>

<details><summary>Shell: Run checks and commit the M1 change</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && rm -rf .playwright-mcp && npm test 2>&1 | grep -E 'Test Files|Tests ' && npx tsc --noEmit && echo tsc OK && git add src tests docs/user-stories.md README.md && git commit -q -F - <<'EOF'
M1: lock rate and term while a loan product is selected

- Rate and term follow the "Loan product" selector (usual order without presets)
- A product fills and locks them (readonly, not disabled) with the note
  "Set by <product>. Choose Custom to change." linked via aria-describedby
- Custom unlocks them and keeps their values
- M1 criteria updated first (M1.4 locked state, M1.6 Custom, M1.7 switching, M1.8 no presets);
  README Manager steps updated
- Locked style keeps AA contrast (dashed border, sunken background)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --oneline | head -1
```

Output:

```
 Test Files  8 passed (8)
      Tests  334 passed (334)
tsc OK
1c8f039 M1: lock rate and term while a loan product is selected
```

</details>

The M1 change is done. Choosing a loan product now fills and locks the rate and term, and "Custom" unlocks them. All 334 tests pass, and I committed it locally as `1c8f039` (not pushed). M1 stays **Implemented**, since every updated criterion passes.

## readonly vs disabled: I used `readonly`
- **Focus:** a readonly field stays in the Tab order, so keyboard users reach it and hear why it's locked. A disabled field is skipped, along with its explanation.
- **Screen readers:** they announce the value, "read-only", and the "Set by…" note (linked with `aria-describedby`). Disabled fields are often read as "dimmed", or skipped.
- **Contrast:** browsers grey out disabled text, usually below 4.5:1. Readonly lets us keep full contrast: the locked values are about 15:1 in both themes.
- **Meaning:** the rate *is* used in the calculation; it's just set by the product. "Disabled" would suggest the opposite.

## New M1 criteria (in `docs/user-stories.md`)
1. With presets, the selector shows Custom, 30-year fixed and 15-year fixed, with Custom selected. **Rate and term come directly after it and are editable.**
2. *(unchanged)* Choosing 15-year fixed → 5.75 / 15 → $2,491.23.
3. *(unchanged)* The product's description appears under the selector.
4. **(changed)** With 15-year fixed selected, typing or pasting into rate or term leaves 5.75 and 15. Both are `readonly` (not `disabled`), reachable with Tab, and under them is "Set by 15-year fixed. Choose Custom to change.", linked with `aria-describedby`.
5. Changing price, down payment or extra payment keeps the product and the lock.
6. **(new)** Choosing Custom unlocks both fields, keeps 5.75 / 15 and removes the note. Then rate 6 → $2,531.57, and the selector stays on Custom.
7. **(new)** Switching from 30-year fixed to 15-year fixed changes the values to 5.75 / 15, keeps them locked, and updates the note.
8. With no presets, there's no selector and the usual field order (price first), with everything editable and no note.

**One decision for you:** criterion 8's field order. Without the selector, I kept the usual order instead of starting the form with the interest rate. Your instruction ("directly after the selector") only applies when the selector exists.

## Tests and code
- **Tests:** written first. 10 failed until the code was in place: field order, readonly vs disabled, focusability, the note and its `aria-describedby`, Custom unlocking, switching products, plain-text names in the note.
- **`form.ts`:** `setLocked()`, plus `aria-describedby` that can point at both an error message and the lock note.
- **`presets.ts`:** simpler. It now just reports the chosen product, or Custom.
- **`app.ts`:** handles the field order and the lock note.
- **`styles.css`:** the locked look (dashed border, sunken background).
- **README:** the Manager steps now describe the lock.

## Checked in a real browser (Chromium)
- **Typing:** Backspace and "9" in the locked rate field changed nothing. A paste attempt changed nothing either. The product stayed on 15-year fixed.
- **Tab** from the selector lands on the locked rate field, with a visible focus ring.
- **Custom** unlocks the fields. Rate 6 gave $2,531.57, and the note disappeared.
- **Desktop (light) and 360 px (dark):** the note sits directly under rate and term, the locked fields are clearly dashed, and the page doesn't scroll sideways at 360 px.

**Still pending from before:** restore the overwritten `transcripts/session-02.md`, redact the token in the new exports, and your manual browser and network checks (L10, A5.4).

---

### User · 21:43

> there a couple of changes do a appropriate commit according to that

### Claude · 21:43

I'll look at what changed and scan everything for the token before committing:

<details><summary>Shell: Show changes and scan for the token</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git status --short && echo "--- diff stat (tracked):" && git diff --stat && echo "--- token scan (whole working tree, excluding node_modules/.git):" && (grep -rlE 'ghp_[A-Za-z0-9]{20,}' . --exclude-dir=node_modules --exclude-dir=.git || echo "no token found") && echo "--- hidden files in transcripts:" && find transcripts -name '.*' -type f
```

Output:

```
 M transcripts/session-02.md
?? transcripts/INDEX.md
?? transcripts/raw/
?? transcripts/session-03-part4.md
?? transcripts/session-03-part5.md
?? transcripts/session-03.md
--- diff stat (tracked):
 transcripts/session-02.md | 8732 ++++++++++++++++++++++++++++++++++++++++-----
 1 file changed, 7905 insertions(+), 827 deletions(-)
--- token scan (whole working tree, excluding node_modules/.git):
no token found
--- hidden files in transcripts:
transcripts/raw/.txt
```

</details>

<details><summary>Shell: Compare session-02 contents and inspect new files</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && echo "=== working copy, first prompt:" && grep -m1 -n '^❯' transcripts/session-02.md | cut -c1-120 && echo "=== committed (real session-02), first prompt:" && git show HEAD:transcripts/session-02.md | grep -m1 -n '^❯' | cut -c1-120 && echo "=== session-03.md first prompt:" && grep -m1 -n '^❯' transcripts/session-03.md | cut -c1-120 && echo "=== are working session-02 and session-03 the same export?" && (cmp -s transcripts/session-02.md transcripts/session-03.md && echo identical || diff <(sed -n '1,400p' transcripts/session-02.md) <(sed -n '1,400p' transcripts/session-03.md) | head -3) && echo "=== INDEX.md:" && cat transcripts/INDEX.md | head -40 && echo "=== raw/.txt first prompt:" && grep -m1 '❯' transcripts/raw/.txt | cut -c1-100; wc -l transcripts/*.md transcripts/raw/.txt
```

Output:

```
=== working copy, first prompt:
6:❯ ## Context
=== committed (real session-02), first prompt:
6:❯ analzyed this docs completely(❯ analyezed this document in detail and expalin
=== session-03.md first prompt:
6:❯ ## Context
=== are working session-02 and session-03 the same export?
=== INDEX.md:
# AI session transcripts

All work was done with **Claude Code**, model **Claude Opus 5.5**, on 6 November 2026.
Each transcript is exported with Claude Code's own `/export` command and is unedited, except
that one GitHub token pasted by mistake was replaced with `[REDACTED]`.

| # | File | Purpose |
|---|---|---|
| 01 | not included | The chat that drafted the first versions of the four planning documents. It was not saved and could not be recovered. Its first prompt is quoted in full in session 02. |
| 02 | [session-02.md](session-02.md) | Analysing the assignment, reviewing the first documents against it, and planning the prompts for session 03. Each result from session 03 was pasted back here for review. |
| 03 | [session-03.md](session-03.md) | Fixing the documents, then the whole build: setup, engine, validation, config, UI, schedule, extra payments, presets, audit, statuses and README. |

## Reading order

1. **Session 02** up to "this is the propment through this i have generated those md files": the
   original prompt and why the first documents missed several assignment rules.
2. **Session 03** from the start: the corrected rules and the document rework, then the build step by
   step. Each step lists its test cases before any code, and records the mistakes found and fixed.
3. **Session 02** alongside session 03: the review of each step's output.

## Raw session logs (optional)

Claude Code also keeps the complete raw logs (JSONL) under `~/.claude/projects/`. If
`raw/session-02.jsonl` and `raw/session-03.jsonl` are present, they are copies of those logs
with the same token redacted. They contain everything, including tool calls and their output.
=== raw/.txt first prompt:
❯ ## Context
      25 transcripts/INDEX.md
    7947 transcripts/session-02.md
    1141 transcripts/session-03-part1.md
    2136 transcripts/session-03-part2.md
    3059 transcripts/session-03-part3.md
    6632 transcripts/session-03-part4.md
    6880 transcripts/session-03-part5.md
    7943 transcripts/session-03.md
    7951 transcripts/raw/.txt
   43714 total
```

</details>

<details><summary>Shell: Commit clean transcripts, leaving the wrong session-02 out</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git add transcripts/INDEX.md transcripts/session-03.md transcripts/session-03-part4.md transcripts/session-03-part5.md && ! git diff --cached | grep -qE 'ghp_[A-Za-z0-9]{20,}' && echo "staged content: no token" && git diff --cached --stat && git commit -q -F - <<'EOF'
Add transcripts index and the full session-03 export

- transcripts/INDEX.md: what each session is and the reading order
- session-03.md: the complete export of the build session
- session-03-part4.md, part5.md: the remaining partial exports (linked from the README)
- Token redacted in all of them

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --oneline | head -1 && git status --short
```

Output:

```
staged content: no token
 transcripts/INDEX.md            |   25 +
 transcripts/session-03-part4.md | 6633 ++++++++++++++++++++++++++++++++
 transcripts/session-03-part5.md | 6881 +++++++++++++++++++++++++++++++++
 transcripts/session-03.md       | 7944 +++++++++++++++++++++++++++++++++++++++
 4 files changed, 21483 insertions(+)
05fe333 Add transcripts index and the full session-03 export
 M transcripts/session-02.md
?? transcripts/raw/
```

</details>

I made the commit, `05fe333` (local, not pushed): **Add transcripts index and the full session-03 export**
- `transcripts/INDEX.md`, your overview of the sessions;
- `transcripts/session-03.md`, the complete export of this session;
- `transcripts/session-03-part4.md` and `part5.md`, which the README links to.

I scanned the staged files for the token and found none.

## Left out on purpose
- **`transcripts/session-02.md`:** the file on disk is a copy of *this* session (it starts with "## Context…"), not the planning session. Pick one fix:
  - **The planning session has new content** (your INDEX says the session-03 results were reviewed there): go to that Claude Code window and run `/export transcripts/session-02.md` there. Then tell me and I'll scan it for the token and commit it.
  - **Otherwise,** restore the committed version: `git restore transcripts/session-02.md`.
- **`transcripts/raw/.txt`:** a hidden, unnamed third copy of this session. Delete it, or rename it if you want it kept. Your INDEX mentions `raw/session-02.jsonl` and `raw/session-03.jsonl`, which don't exist yet.

## README and INDEX now disagree
**Which files they list:** the README's Transcripts table lists session-03 parts 1–5, while your INDEX lists only the complete `session-03.md`.

**How they describe the token edit:**
- **INDEX:** "unedited, except that one GitHub token… was replaced with `[REDACTED]`."
- **README:** part 3 had the rest of that message deleted, not replaced.

The part 3 deletion is real, so INDEX's sentence isn't accurate for part 3. Two ways to make them consistent:
1. **Keep only `session-03.md`:** delete parts 1–5 and make the README link to INDEX and `session-03.md`. INDEX's sentence then becomes accurate, because `session-03.md` was redacted by replacement.
2. **Keep the parts:** add a line to INDEX about the part 3 deletion.

I'd recommend option 1: fewer files, and one consistent statement. Tell me which you prefer and I'll update the README. Removing the part files is up to you.

---

### User · 21:45

> push that commit as wel

### Claude · 21:45

First, the same safety check as last time: the commits about to go out must not contain the token.

<details><summary>Shell: List unpushed commits and scan them for the token</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git fetch -q origin 2>/dev/null; echo "commits to push:"; git log --oneline origin/main..main && echo "token matches in those commits: $(git log -p origin/main..main | grep -cE 'ghp_[A-Za-z0-9]{20,}')"
```

Output:

```
commits to push:
05fe333 Add transcripts index and the full session-03 export
1c8f039 M1: lock rate and term while a loan product is selected
4b1dccf Never leave a blank page: install error handlers before startup
token matches in those commits: 0
```

</details>

Three commits to push, and none contains the token. Trying a normal push first:

<details><summary>Shell: Push the new commits to GitHub</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && GIT_TERMINAL_PROMPT=0 git push origin main 2>&1 | tail -4
```

Output:

```
remote: Permission to usamakh1/mortgage-calculator-.git denied to usamabespoke.
fatal: unable to access 'https://github.com/usamakh1/mortgage-calculator-.git/': The requested URL returned error: 403
```

</details>

<details><summary>Shell: Push with the token for this command only and verify</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && AUTH=$(printf '%s' 'usamakh1:[REDACTED]' | base64) && GIT_TERMINAL_PROMPT=0 git -c credential.helper= -c "http.https://github.com/.extraheader=AUTHORIZATION: basic $AUTH" push origin main 2>&1 | tail -4; unset AUTH; echo "---"; (grep -lE 'ghp_|extraheader' .git/config ~/.gitconfig 2>/dev/null || echo "token not stored in git config"); echo "local:  $(git rev-parse HEAD)"; echo "remote: $(git ls-remote origin refs/heads/main 2>/dev/null | cut -f1)"
```

Output:

```
To https://github.com/usamakh1/mortgage-calculator-.git
   10eb937..05fe333  main -> main
---
token not stored in git config
local:  05fe333b454a940cfa575f997fbc697cd7051bc4
remote: 05fe333b454a940cfa575f997fbc697cd7051bc4
```

</details>

I pushed the 3 commits, and GitHub now matches your local copy (`05fe333`). Before pushing I checked them for the token and found none.
```
10eb937..05fe333  main -> main
  4b1dccf  Never leave a blank page: install error handlers before startup
  1c8f039  M1: lock rate and term while a loan product is selected
  05fe333  Add transcripts index and the full session-03 export
```
The token was used for this one command only. It isn't stored in your git config, the remote URL or the keychain.

**The push succeeding means the token is still active.** It has now appeared in this chat three times, so any future export of this session will contain it again. Please revoke it on GitHub (Settings → Developer settings → Personal access tokens). For later pushes, run `gh auth login` as `usamakh1` so no token goes through the chat.

**Not pushed**, because they aren't committed:
- `transcripts/session-02.md`: still the wrong file, a copy of this session. Export the real planning session from its own window, or run `git restore transcripts/session-02.md`.
- `transcripts/raw/.txt`: the hidden duplicate.

**Still open:** whether the README should list only `session-03.md` (as your INDEX does) or parts 1–5, and your manual browser and network checks (L10, A5.4).

---

### User · 21:47

> Add the stories we would build next, all with "Status: Not implemented" and
> "Scope: Future". Follow the same rules as before: each story serves a job, each job names
> a role, and jobs must not mention the app or any solution.
> 1. Jobs first (docs/jobs-to-be-done.md). Add new jobs where needed, for example:
>    - Admin: only the people responsible can change products, rates and wording.
>    - Manager: pick up the figures I gave a client when they come back days later.
>    - Loanee: know what rates lenders offer right now, so the numbers are realistic.
> 2. Stories (docs/user-stories.md), with Given/When/Then criteria         including error cases:
>    - a backend API and saved client quotes (Manager)                        - sign-in / authentimins (expired session,wrong password)                                                             - authorisation by rchange settings (accessdenied case)                                                                - an in-app settingsson, plus an audit logof changes (Admin)                                                          - live market rates how the source and time, and fall back to                                                              manual entry when (Loanee/Manager)
> 3. app-roles.md: how the "must never" rules would then be enforced by theserver.
> 4. product-plan.md: a "Future architecture" section (backend, auth, data source, privacy),
>    stating clearly that the current submission stays fully local.     5. README status table: Not implemented.
> Show me the new jobs and story titles first; after my approval, write them in full.

### Claude · 21:48

Parts of your list were garbled in the paste, so here's how I'm reading items 2–5:
- **Sign-in / authentication** for Managers and Admins, with error cases for an expired session and a wrong password.
- **Authorisation by role:** only Admins can change settings, with an access-denied case.
- **An in-app settings screen** for Admins, plus an audit log of changes.
- **Live market rates:** show the source and the time, and fall back to manual entry when they're unavailable. For the Loanee and the Manager.

I'm checking the existing jobs first, to avoid overlaps and pick the next numbers:

<details><summary>Shell: List existing jobs and the last story IDs</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -nE '^### J-' docs/jobs-to-be-done.md && grep -nE '^When ' docs/jobs-to-be-done.md | sed -n '11,13p' | cut -c1-230 && grep -nE '^### [LMA][0-9]+\.' docs/user-stories.md | tail -3
```

Output:

```
13:### J-1 (Loanee). Know what I'll pay each month
19:### J-2 (Loanee). Understand the true total cost
25:### J-3 (Loanee). Weigh my options against each other
31:### J-4 (Loanee). Decide whether paying extra is worth it
37:### J-5 (Loanee). Work out what I can afford
43:### J-6 (Loanee). Understand how my debt shrinks
49:### J-7 (Loanee). Get a second opinion on the same numbers
55:### J-14 (Loanee). Check the numbers away from my desk
65:### J-8 (Manager). Give a client a correct answer quickly
71:### J-9 (Manager). Quote only what we currently offer
77:### J-10 (Manager). Leave the client with a compliant record
87:### J-11 (Admin). Make the calculations right for our office
93:### J-12 (Admin). Change settings without breaking things
99:### J-13 (Admin). Run our quoting at no cost and keep data in-house
78:When a meeting with a client ends, I want to give them a record of the figures we discussed that carries the required disclaimer and the date, so they can review it at home and we stay compliant.
88:When our office starts quoting loans in a new way, I want to set our currency, number format, standard values, allowed ranges, loan products and required wording in one place, so everyone works from the same correct settings fo
94:When I change our loan products or the required wording, I want to find out immediately if I made a mistake, so I can fix it before clients or colleagues are affected.
401:### A5. Run and build locally with free tools
412:### A6. Automated browser smoke test
422:### A7. Optional free public deployment
```

</details>

Below are the proposed jobs and stories. Nothing has been written to the docs yet.

## New jobs (for `docs/jobs-to-be-done.md`)
Each one is written without mentioning the app or any solution.

| ID | Job |
|---|---|
| **J-15 (Admin)** | When our loan products, rates or required wording need to change, I want only the people responsible for them to be able to make the change, so I can be sure nobody alters what clients are quoted by mistake or on purpose. |
| **J-16 (Admin)** | When a figure we quoted turns out to be wrong, I want to find out who changed which setting and when, so I can correct it and show our compliance team what happened. |
| **J-17 (Manager)** | When a client comes back days later to continue, I want to pick up exactly the figures I gave them, so I can carry on without redoing the work or contradicting myself. |
| **J-18 (Manager)** | When I keep figures for my clients, I want them seen only by me and the colleagues who serve those clients, so I can protect my clients' privacy and keep their trust. |
| **J-19 (Loanee)** | When I'm working out what a loan will cost me, I want to know the rates lenders are offering right now, so I can base my decision on realistic numbers. |

The in-app settings screen doesn't need a new job. It serves the existing **J-11 (Admin)**: "…set our currency… in one place… **without needing a developer**". Editing JSON is exactly what a non-technical Admin can't do.

## New stories (for `docs/user-stories.md`)
All of these are **Scope: Future**, **Status: Not implemented**.

| ID | Title | Role | Serves | Error cases in the criteria |
|---|---|---|---|---|
| **M5** | Save a client quote and reopen it later | Manager | J-17 | Server unreachable (nothing lost locally, clear message); quote not found; saving while inputs are invalid |
| **M6** | Sign in to reach saved client quotes | Manager | J-18 | Wrong password (no hint which part was wrong); too many attempts (temporary lock); session expired (sign in again, unsaved inputs kept); another office's quote → access denied |
| **A8** | Sign in before changing settings | Admin | J-15 | Wrong password; session expired while editing (changes not lost, sign in again); signing out |
| **A9** | Only Admins can change settings | Admin | J-15 | A signed-in Manager opens settings → "access denied", no settings shown; a direct request to the API without the Admin role → refused, nothing changed |
| **A10** | Change settings in the app instead of editing a file | Admin | J-11 | Invalid value (the same rules and messages as `config.json` today, nothing saved); two Admins editing at once (the second is told to reload, nothing overwritten) |
| **A11** | See a log of every settings change | Admin | J-16 | Who, when, old value and new value for each change; the log can't be edited or deleted from the app; a Manager can't see it (access denied) |
| **L13** | See today's market rates, with source and time | Loanee | J-19 | Rate source unavailable → manual entry still works and a message says so; rates older than a set age → marked out of date; never shown without the source and the time |

**Two choices you should know about:**
1. **Settings and the audit log are two stories (A10, A11), not one.** They serve different jobs (J-11 vs J-16), and each story names exactly one job.
2. **Live rates (L13) is the Loanee's story only.** A story has one role, and the Manager also benefits through the same feature. If you want a Manager version as well (for example, quoting "today's rate" with its source on a quote), it needs its own job and story; tell me.

## What else would change, once you approve
- **`app-roles.md`:** a "When there is a server" section. Each "must never" would then be enforced on the server, not just in the browser. For example, role checks on every API call rather than hidden buttons, and quotes only readable by their office.
- **`product-plan.md`:** a "Future architecture" section covering backend, authentication, rate data source and privacy. It will state that **the current submission stays fully local**. It will also note a conflict: **J-13** ("run at no cost, keep data in-house") means any future backend must be one the office hosts itself, not a paid third-party service.
- **README status table:** a "Future (Not implemented)" row listing L13, M5, M6 and A8–A11.
- **The scope table in §2.2:** a new **Future** tier.

Do you approve these jobs, stories and choices? Once you do, I'll write them in full with Given/When/Then criteria.

---

### User · 21:48

> yes

### Claude · 21:49

Writing them in full now. First I'll find the exact insertion points in each document:

<details><summary>Shell: Find section anchors in the docs and README</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && grep -nE '^## |^---$' docs/user-stories.md && grep -nE '^## |^---$' docs/jobs-to-be-done.md && grep -n 'Scope\*\* is the plan' docs/user-stories.md && grep -n '^| E20' docs/user-stories.md && grep -nE '^## ' docs/product-plan.md docs/app-roles.md && grep -n 'Not in this build (kept as specified future work)\|^| Not in this build |' docs/product-plan.md && grep -n 'Not implemented (Stretch' README.md
```

Output:

```
15:## Shared definitions
48:## Error messages
77:---
79:## Loanee stories
268:---
270:## Manager stories
326:---
328:## Admin stories
431:---
433:## Cross-cutting acceptance criteria (Definition of Done)
9:---
11:## Loanee jobs
61:---
63:## Manager jobs
83:---
85:## Admin jobs
105:---
107:## Job-to-story map
11:- **Scope** is the plan for this submission (Core, Stretch, Not in this build). See [Product plan §2.2](product-plan.md#22-scope-for-this-submission).
73:| E20 | Property tax, insurance or fees negative or non-numeric | Enter an amount of 0 or more. | Under the field | L9 |
docs/app-roles.md:11:## Loanee (primary)
docs/app-roles.md:26:## Manager (secondary)
docs/app-roles.md:41:## Admin (supporting)
docs/app-roles.md:55:## How their needs differ
docs/app-roles.md:65:## How roles are enforced
docs/app-roles.md:76:## What differs in the app
docs/product-plan.md:12:## 1. Product decisions (and why)
docs/product-plan.md:24:## 2. Product scope
docs/product-plan.md:74:## 3. Calculation rules
docs/product-plan.md:118:## 4. Technical plan
docs/product-plan.md:149:## 5. Error handling strategy
docs/product-plan.md:167:## 6. Delivery milestones (this submission)
docs/product-plan.md:178:## 7. README outline (for the reviewer)
docs/product-plan.md:200:## 8. Assumptions
docs/product-plan.md:211:## 9. Risks and future work
61:| **Not in this build (kept as specified future work)** | L6, L9, L11, L12, M3, M4, A7 | A7 is the GitHub Pages deployment. Also not in this build: the axe-core accessibility check, the 10,000-run fuzz test and the 95% coverage target. |
72:| Not in this build | L6, L9, L11, L12, M3, M4, A7 |
74:| Not implemented (Stretch / not in this build) | L4, L6, L7, L9, L11, L12, M2, M3, M4, A6, A7: comparison, affordability, sharing and printing, housing costs and the others |
```

</details>

All the anchors are there. First, the jobs and the job-to-story map:

<details><summary>Shell: Add jobs J-15 to J-19 and update the map</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('docs/jobs-to-be-done.md'); t=p.read_text()
def ins_before(anchor_text, block, occurrence_after=None):
    global t
    assert t.count(anchor_text)>=1, anchor_text
    i = t.index(anchor_text) if occurrence_after is None else t.index(anchor_text, t.index(occurrence_after))
    t = t[:i]+block+t[i:]

loanee='''### J-19 (Loanee). Base my numbers on today's rates
When I'm working out what a loan will cost me, I want to know the rates lenders are offering right now, so I can base my decision on realistic numbers.

- **Today:** Search lenders' websites one by one, or use a rate remembered from the news or from a friend's loan.
- **What goes wrong:** Rates change weekly, so remembered rates are often out of date, and advertised "from" rates hide what most people actually get. A plan built on the wrong rate falls apart at the bank.

'''
ins_before('---\n\n## Manager jobs', loanee)

manager='''### J-17 (Manager). Pick up where I left off with a client
When a client comes back days later to continue, I want to pick up exactly the figures I gave them, so I can carry on without redoing the work or contradicting myself.

- **Today:** Look for the spreadsheet saved on my own computer under the client's name, or redo the figures from my notes.
- **What goes wrong:** Files are lost or saved under different names, colleagues can't find them when I'm away, and redone figures differ slightly from the first ones, which costs the client's trust.

### J-18 (Manager). Keep my clients' figures private
When I keep figures for my clients, I want them seen only by me and the colleagues who serve those clients, so I can protect my clients' privacy and keep their trust.

- **Today:** Spreadsheets on personal laptops and shared drives, sometimes emailed around.
- **What goes wrong:** Anyone with access to the drive can open any client's file, laptops get lost, and nobody can say who has seen what.

'''
ins_before('---\n\n## Admin jobs', manager)

admin='''### J-15 (Admin). Control who can change what we quote
When our loan products, rates or required wording need to change, I want only the people responsible for them to be able to make the change, so I can be sure nobody alters what clients are quoted by mistake or on purpose.

- **Today:** A master template on a shared drive that anyone with access can edit.
- **What goes wrong:** Well-meaning colleagues "fix" a rate or shorten the disclaimer, and the office quotes the wrong figures until someone notices.

### J-16 (Admin). Find out who changed a setting and when
When a figure we quoted turns out to be wrong, I want to find out who changed which setting and when, so I can correct it and show our compliance team what happened.

- **Today:** Ask around the office and compare old copies of the template.
- **What goes wrong:** Nobody remembers exactly, old copies have been overwritten, and the office cannot show its regulator a reliable history.

'''
ins_before('---\n\n## Job-to-story map', admin)

# map
def rep(old,new):
    global t
    assert t.count(old)==1, old; t=t.replace(old,new)
rep('| J-11 | Admin | A1, A2, A3 |','| J-11 | Admin | A1, A2, A3, A10 |')
rep('| J-14 | Loanee | L10 |','''| J-14 | Loanee | L10 |
| J-15 | Admin | A8, A9 |
| J-16 | Admin | A11 |
| J-17 | Manager | M5 |
| J-18 | Manager | M6 |
| J-19 | Loanee | L13 |''')
p.write_text(t)
EOF
grep -nE '^### J-|^\| J-1[1-9]' docs/jobs-to-be-done.md
```

Output:

```
13:### J-1 (Loanee). Know what I'll pay each month
19:### J-2 (Loanee). Understand the true total cost
25:### J-3 (Loanee). Weigh my options against each other
31:### J-4 (Loanee). Decide whether paying extra is worth it
37:### J-5 (Loanee). Work out what I can afford
43:### J-6 (Loanee). Understand how my debt shrinks
49:### J-7 (Loanee). Get a second opinion on the same numbers
55:### J-14 (Loanee). Check the numbers away from my desk
61:### J-19 (Loanee). Base my numbers on today's rates
71:### J-8 (Manager). Give a client a correct answer quickly
77:### J-9 (Manager). Quote only what we currently offer
83:### J-10 (Manager). Leave the client with a compliant record
89:### J-17 (Manager). Pick up where I left off with a client
95:### J-18 (Manager). Keep my clients' figures private
105:### J-11 (Admin). Make the calculations right for our office
111:### J-12 (Admin). Change settings without breaking things
117:### J-13 (Admin). Run our quoting at no cost and keep data in-house
123:### J-15 (Admin). Control who can change what we quote
129:### J-16 (Admin). Find out who changed a setting and when
153:| J-11 | Admin | A1, A2, A3, A10 |
154:| J-12 | Admin | A4 |
155:| J-13 | Admin | A5, A6, A7 |
156:| J-14 | Loanee | L10 |
157:| J-15 | Admin | A8, A9 |
158:| J-16 | Admin | A11 |
159:| J-17 | Manager | M5 |
160:| J-18 | Manager | M6 |
161:| J-19 | Loanee | L13 |
```

</details>

Now the seven stories and their error messages in `user-stories.md`:

<details><summary>Shell: Add Future stories and their error messages</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('docs/user-stories.md'); t=p.read_text()
def rep(old,new):
    global t
    assert t.count(old)==1, old[:80]; t=t.replace(old,new)
def ins_before(anchor, block):
    global t
    assert t.count(anchor)==1, anchor[:80]
    i=t.index(anchor); t=t[:i]+block+t[i:]

rep("- **Scope** is the plan for this submission (Core, Stretch, Not in this build).",
    "- **Scope** is the plan for this submission (Core, Stretch, Not in this build), or **Future** for stories that need a server and are described for a later version.")

rep("| E20 | Property tax, insurance or fees negative or non-numeric | Enter an amount of 0 or more. | Under the field | L9 |",
"""| E20 | Property tax, insurance or fees negative or non-numeric | Enter an amount of 0 or more. | Under the field | L9 |
| E21 | Saving a quote while the server cannot be reached (Future) | The quote could not be saved because the server is not reachable. Your inputs are kept; please try again. | Next to Save quote | M5 |
| E22 | A saved quote does not exist or was deleted (Future) | This quote could not be found. It may have been deleted, or the link is wrong. | Notice above the form | M5 |
| E23 | Saving while inputs are invalid (Future) | Fix the highlighted fields before saving. | Next to the disabled Save quote button | M5 |
| E24 | Wrong email or password (Future) | The email or password is not correct. | Sign-in form | M6, A8 |
| E25 | Too many failed sign-in attempts (Future) | Too many failed sign-in attempts. Try again in 15 minutes. | Sign-in form | M6, A8 |
| E26 | Session expired (Future) | Your session has expired. Sign in again to continue; your inputs are kept. | Sign-in form | M6, A8 |
| E27 | Signed in without permission for the page or record (Future) | You do not have permission to see this page. | Page | M6, A9, A11 |
| E28 | Settings changed by someone else while editing (Future) | These settings were changed by someone else while you were editing. Reload to see the latest version; your changes were not saved. | Settings page | A10 |
| E29 | Market rates unavailable or too slow (Future) | Current market rates are not available right now. You can still enter a rate yourself. | Today's rates panel | L13 |
| E30 | Market rates older than the allowed age (Future) | These rates are from {date and time} and may be out of date. | Today's rates panel | L13 |
| E31 | A settings value outside its allowed range (Future) | Enter a value between {min} and {max}. | Under the settings field | A10 |""")

L13 = '''### L13. See today's market rates, with source and time
**Priority:** Should · **Scope:** Future · **Serves:** J-19 · **Status:** Not implemented

As a Loanee, I want to see the rates lenders are offering today, with where they come from and when, so that I can base my numbers on realistic rates.

The rates come from a market-rate source queried by the office's server, never directly by the browser (see [Product plan §10](product-plan.md#10-future-architecture)).

**Acceptance criteria**
1. Given the rate source reports 6.12% for a 30-year fixed loan, from source "Example Rates Feed" at 09:30 on 6 November 2026, when the page loads, then a "Today's rates" panel shows "30-year fixed: 6.12%" with "Source: Example Rates Feed, November 6, 2026, 9:30 AM".
2. Given that panel, when I choose "Use this rate", then the rate field shows 6.12, every result updates, and the loan product selector shows "Custom".
3. Given the rate source cannot be reached or returns an error, when the page loads, then the panel shows E29, the rate field stays editable with its default value, and every result is calculated as it is today.
4. Given the rate source does not answer within 5 seconds, when the page loads, then the calculator works normally in the meantime and the panel shows E29 after 5 seconds.
5. Given the latest rates are older than the maximum age set by the Admin (default 24 hours), when the page loads, then E30 appears next to them and "Use this rate" still works.
6. Given the source reports a rate outside the configured limits (for example 45%) or a value that is not a number, when the page loads, then that rate is not shown, the valid ones are, and the problem is logged on the server.
7. Given any rate is shown, when I look at it, then its source and time are shown with it. A rate without a source or a time is never shown.
8. Given I have entered my own figures, when rates are loaded, then the request for rates contains none of my inputs.

'''
ins_before('---\n\n## Manager stories', L13)

M = '''### M5. Save a client quote and reopen it later
**Priority:** Should · **Scope:** Future · **Serves:** J-17 · **Status:** Not implemented

As a Manager, I want to save a client's quote and open it again later, so that I can continue with the exact figures I gave them.

Requires a backend API and signing in (M6).

**Acceptance criteria**
1. Given I am signed in and the inputs are
… (2851 more characters not shown)
```

Output:

```
279:### L13. See today's market rates, with source and time
354:### M5. Save a client quote and reopen it later
371:### M6. Sign in to reach saved client quotes
493:### A8. Sign in before changing settings
505:### A9. Only Admins can change settings
516:### A10. Change settings in the app instead of editing a file
532:### A11. See a log of every settings change
31
```

</details>

Next, how the "must never" rules would be enforced on a server (`app-roles.md`), the Future architecture section and scope tables (`product-plan.md`), and the README status table:

<details><summary>Shell: Add server enforcement, future architecture and README row</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
def edit(path, fn):
    p=pathlib.Path(path); t=p.read_text(); t=fn(t); p.write_text(t)

def roles(t):
    anchor="## What differs in the app"
    assert t.count(anchor)==1
    block='''## When there is a server (Future)

The Future stories (L13, M5, M6, A8–A11) add a small server that the office hosts itself. Roles then become real accounts for the Manager and the Admin; the Loanee never needs one. The "must never" rules move from "impossible by design" to "enforced by the server on every request":

| Role | Must never | How the server would enforce it |
|---|---|---|
| Loanee | Have inputs sent off their device or stored outside their browser | The calculation stays in the browser. The server only receives what a Manager deliberately saves (M5), and a request for market rates carries none of the user's inputs (L13.8). Loanees have no account, so there is nothing to link inputs to. |
| Manager | See figures without the disclaimer; have a client's details stored or sent | A saved quote holds only a client reference, no personal fields (M5.7). The server returns a quote only to a signed-in user of the same office, checked on every request, not only by hiding links (M6.5). Sessions expire after 30 minutes without activity (M6.4). The disclaimer is still added when a quote is shown. |
| Admin | Collect, receive or view what users enter; make config text run as code | The server never receives Loanee inputs, so there is nothing to view. Admins see settings and the change log only. Every settings change is checked for the Admin role on the server (A9.2), validated with today's config rules (A10.5), and recorded in a log that cannot be edited or deleted (A11.4). Office name and disclaimer are still shown as plain text (A10.7). |

Hiding a button is only for convenience. The protection is the server refusing the request (A9.2, M6.5). The current submission has none of this: it stays fully local (see [Product plan §10](product-plan.md#10-future-architecture)).

'''
    return t.replace(anchor, block+anchor)
edit('docs/app-roles.md', roles)

def plan(t):
    old="| **Not in this build (kept as specified future work)** | L6, L9, L11, L12, M3, M4, A7 | A7 is the GitHub Pages deployment. Also not in this build: the axe-core accessibility check, the 10,000-run fuzz test and the 95% coverage target. |"
    assert t.count(old)==1
    t=t.replace(old, old+"\n| **Future (needs a server, see §10)** | L13, M5, M6, A8, A9, A10, A11 | Live market rates, saved client quotes, sign-in, role checks on the server, a settings page and a change log. Specified so the next version is clear; none of it is in this submission. |")
    old2="| Not in this build | L6, L9, L11, L12, M3, M4, A7 |"
    assert t.count(old2)==1
    t=t.replace(old2, old2+"\n| Future (needs a server) | L13, M5, M6, A8, A9, A10, A11 |")
    old3="- **Future work** is listed in §2.2 under \"Not in this build\"."
    assert t.count(old3)==1
    t=t.replace(old3, "- **Future work** is listed in §2.2 under \"Not in this build\" and \"Future\". The server-based stories are described in §10.")
    t=t.rstrip('\n')+'''

## 10. Future architecture

**This submission stays fully local.** It has no backend, no accounts and no network requests besides its own files and `config.json`, and nothing below is built. This section describes how the Future stories (L13, M5, M6, A8–A11) would be added without breaking what exists.

| Area | Plan | Why |
|---|---|---|
| **Backend** | A small API service and a database (for example Node.js with SQLite or PostgreSQL) that **the office hosts itself**. The static front end stays as it is; the server adds endpoints for sign-in, settings, the change log, saved quotes and market rates. | J-13 says the office wants no costs and no client data at third parties, so the server must be self-hosted, not a paid cloud service. |
| **Calculation** | Stays in the browser, using the same engine. When a quote is saved, the server validates the inputs with the same rules and recalculates with the same engine, so stored figures match what the Manager saw (M5.2). | One engine, one set of rules, no second implementation to drift. |
| **Authentication** | Email and password for Managers and Admins only. Passwords stored as slow salted hashes (bcrypt or Argon2), never in plain text or logs (M6.8, A8.5). Sessions in HTTP-only, secure, same-site cookies that expire after 30 minutes without activity (M6.4). Lockout for 15 minutes after 5 failed attempts (M6.3). Loanees never sign in. | Covers the error cases in M6 and A8 with standard, well-understood mechanisms. |
| **Authorisation** | Two roles, Manager and Admin, each tied to an office. Every request is checked on the server: settings and the change log need the Admin role (A9), quotes are only returned to users of the same office (M6.5). | Checks in the browser can be bypassed; checks on the server cannot. |
| **Settings and cha
… (1873 more characters not shown)
```

Output:

```
ok
```

</details>

Now the same mechanical checks as for the original documents: traceability, Given/When/Then format, and no solution words in the job statements.

<details><summary>Shell: Validate traceability, G/W/T and job wording</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama/docs" && python3 -I - <<'EOF'
import re
s=open('user-stories.md').read(); j=open('jobs-to-be-done.md').read()
stories=re.findall(r'^### ([LMA]\d+)\. .*\n\*\*Priority:\*\* (\w+) · \*\*Scope:\*\* ([^·]+) · \*\*Serves:\*\* (J-\d+) · \*\*Status:\*\* (.+)$',s,re.M)
heads=re.findall(r'^### ([LMA]\d+)\.',s,re.M)
jobs=dict(re.findall(r'^### (J-\d+) \((\w+)\)',j,re.M))
mp={r[0]:set(x.strip() for x in r[1].split(',')) for r in re.findall(r'^\| (J-\d+) \| \w+ \| (.+) \|$',j,re.M)}
print('stories',len(heads),'with meta',len(stories),'| jobs',len(jobs))
for sid,pr,sc,jb,st in stories:
    assert sid in mp.get(jb,()),(sid,jb)
    assert jobs[jb]=={'L':'Loanee','M':'Manager','A':'Admin'}[sid[0]],(sid,jb)
print('map == stories:', set().union(*mp.values())==set(heads), '| jobs without story:', [k for k in jobs if not mp.get(k)])
fut=[(sid,sc.strip(),st) for sid,pr,sc,jb,st in stories if sc.strip()=='Future']
print('future:',fut)
bad=[l[:60] for l in s.splitlines() if re.match(r'^\d+\. ',l) and not (l.split('. ',1)[1].startswith('Given') and ' when ' in l and ' then ' in l)]
print('non-GWT criteria:',bad)
used=set(re.findall(r'\bE(\d+)\b',s)); print('error ids referenced:',sorted(map(int,used)))
stmts=[l for l in j.splitlines() if l.startswith('When ')]
words=re.compile(r'\b(app|tool|button|screen|calculat\w*|link|preset|config\w*|click|server|login|sign[- ]in|password|log|database|API|feed)\b',re.I)
print('job statements with solution words:',[l[:70] for l in stmts if words.search(l)])
EOF
```

Output:

```
stories 30 with meta 30 | jobs 19
map == stories: True | jobs without story: []
future: [('L13', 'Future', 'Not implemented'), ('M5', 'Future', 'Not implemented'), ('M6', 'Future', 'Not implemented'), ('A8', 'Future', 'Not implemented'), ('A9', 'Future', 'Not implemented'), ('A10', 'Future', 'Not implemented'), ('A11', 'Future', 'Not implemented')]
non-GWT criteria: []
error ids referenced: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
job statements with solution words: []
```

</details>

<details><summary>Shell: Commit the Future stories and docs</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git add docs README.md && git commit -q -F - <<'EOF'
Add Future stories for a server-based version (all Not implemented)

- Jobs J-15 to J-19 (Admin control and audit, Manager follow-up and privacy, Loanee
  current rates), written without mentioning the app
- Stories L13, M5, M6, A8, A9, A10, A11 with Given/When/Then criteria and error cases;
  error messages E21-E31 added to the table
- app-roles: how each "must never" would be enforced by the server
- product-plan: Future tier in the scope tables and §10 Future architecture
  (self-hosted backend, auth, authorisation, rates source, privacy); the
  submission stays fully local
- README status table: Future row

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git log --oneline | head -1 && git status --short
```

Output:

```
98bec34 Add Future stories for a server-based version (all Not implemented)
 M transcripts/session-02.md
?? transcripts/raw/
```

</details>

I've added the Future stories to the docs and committed them locally as `98bec34` (not pushed).

## Jobs added (`docs/jobs-to-be-done.md`)
Each has its "Today" and "What goes wrong" lines, and none mentions the app.
- **J-15 (Admin):** control who can change what we quote.
- **J-16 (Admin):** find out who changed a setting and when.
- **J-17 (Manager):** pick up where I left off with a client.
- **J-18 (Manager):** keep my clients' figures private.
- **J-19 (Loanee):** base my numbers on today's rates.

The job-to-story map is updated: J-11 now also lists A10, and rows were added for J-15 to J-19.

## Stories added (`docs/user-stories.md`)
All are **Scope: Future, Status: Not implemented**, with Given/When/Then criteria:

| Story | Serves | Error cases covered |
|---|---|---|
| **L13** See today's market rates, with source and time | J-19 | Source unavailable, too slow (5 s), out of date, a rate outside the limits; never shown without source and time; no user inputs in the request |
| **M5** Save a client quote and reopen it later | J-17 | Server unreachable, quote not found, saving while inputs are invalid, product changed since saving; only a client reference is stored |
| **M6** Sign in to reach saved client quotes | J-18 | Wrong password (doesn't say which part), lockout after 5 tries, expired session (inputs kept), another office's quote denied; the calculator still works without signing in |
| **A8** Sign in before changing settings | J-15 | Wrong password, lockout, session expiring mid-edit (edits kept), sign-out |
| **A9** Only Admins can change settings | J-15 | A Manager opening settings is denied; a direct API call is refused and logged; a role removed mid-session |
| **A10** Change settings in the app instead of editing a file | J-11 | Out-of-range values, invalid currency, duplicate product, two Admins editing at once; markup stays plain text |
| **A11** See a log of every settings change | J-16 | Refused changes logged; no edit or delete; Managers denied; paging |

**Error table:** E21–E31 added, each marked "(Future)", so these stories also have exact message texts.

## Other documents
- **`app-roles.md`:** a new "When there is a server (Future)" table. For each role it shows how the server would enforce the "must never" rule: role checks on every request, office-scoped quotes, an append-only log, and still no Loanee data on the server. It says plainly that hiding a button is only for convenience.
- **`product-plan.md`:**
  - a **Future** tier in the scope and result tables;
  - a new **§10 Future architecture**, which opens with "**This submission stays fully local**";
  - §10 covers a self-hosted backend (required by J-13, "no costs, data in-house"), the same engine on server and browser, password hashing and sessions, server-side authorisation, settings and change log, and a rates source queried by the server, plus privacy.
- **README status table:** a new "Not implemented (Future, needs a server)" row, linking to §10.

## Checks
- **Traceability:** 30 stories, each serving a job of the same role; the map matches the stories exactly; all 19 jobs have stories.
- **Format:** every criterion is in Given/When/Then form.
- **Messages:** E1–E31 are all referenced.
- **Jobs:** no solution words in any job statement (I checked for words like app, server, sign-in, password, log, API).
- **Statuses:** none of the existing ones changed.

**Still open:**
- the wrong `transcripts/session-02.md`, and the hidden `transcripts/raw/.txt` (both uncommitted);
- your manual browser and network checks (L10, A5.4);
- pushing this commit, when you want to.

---

### User · 21:53

> Now do a proper commmit what the changes so far

### Claude · 21:53

<details><summary>Shell: Show uncommitted changes and check transcripts</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git status --short && echo "--- unpushed commits:" && git log --oneline origin/main..main && echo "--- session-02.md first prompt now:" && grep -m1 '^❯' transcripts/session-02.md | cut -c1-90 && echo "--- raw/:" && ls -la transcripts/raw && echo "--- token scan:" && (grep -rlE 'ghp_[A-Za-z0-9]{20,}' . --exclude-dir=node_modules --exclude-dir=.git || echo "no token found")
```

Output:

```
 M transcripts/session-02.md
?? transcripts/raw/
--- unpushed commits:
98bec34 Add Future stories for a server-based version (all Not implemented)
--- session-02.md first prompt now:
❯ ## Context
--- raw/:
total 1000
drwxr-xr-x@  3 dev  staff      96 Nov  6 21:07 .
drwxr-xr-x@ 11 dev  staff     352 Nov  6 21:07 ..
-rw-r--r--@  1 dev  staff  509546 Nov  6 21:37 .txt
--- token scan:
no token found
```

</details>

I didn't make a new commit, because there's nothing correct left to commit. Every change so far is already committed. The newest commit, `98bec34` (the Future stories), is the only one not yet pushed.

Only two files remain uncommitted, and both would be wrong to commit as they are:

| File | Problem |
|---|---|
| `transcripts/session-02.md` | Still a copy of **this** session (it starts with "## Context…"), exported under the wrong name. Committing it would replace the real planning session in git with a duplicate of `session-03.md`, which contradicts your `INDEX.md` and the README. |
| `transcripts/raw/.txt` | A hidden file with no name, holding a third copy of this session. It would be easy to miss and confusing for a reviewer. |

Neither contains the token. I scanned the whole project and found none.

**How to finish, depending on what you want:**
1. **Session-02 has new content you want to keep** (your planning and review session): open that Claude Code window and run `/export transcripts/session-02.md` **there**. Then tell me and I'll commit it.
2. **The committed session-02 is fine as it is:** run `git restore transcripts/session-02.md`.
3. **For `raw/.txt`:** delete it (`rm transcripts/raw/.txt`), or give it a proper name, e.g. `transcripts/raw/session-03.txt`, if you want a raw copy included.

Once you've done that, tell me and I'll commit the result and push it together with `98bec34`.

---

### User · 21:53

> push that commit as well

### Claude · 21:53

<details><summary>Shell: Scan the unpushed commit and try a normal push</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git log --oneline origin/main..main && echo "token matches: $(git log -p origin/main..main | grep -cE 'ghp_[A-Za-z0-9]{20,}')" && GIT_TERMINAL_PROMPT=0 git push origin main 2>&1 | tail -2
```

Output:

```
98bec34 Add Future stories for a server-based version (all Not implemented)
token matches: 0
remote: Permission to usamakh1/mortgage-calculator-.git denied to usamabespoke.
fatal: unable to access 'https://github.com/usamakh1/mortgage-calculator-.git/': The requested URL returned error: 403
```

</details>

The commit is clean, but the normal push hits the same 403 (`usamabespoke`), so I'll use the same one-off method as before:

<details><summary>Shell: Push with the token for this command only and verify</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && AUTH=$(printf '%s' 'usamakh1:[REDACTED]' | base64) && GIT_TERMINAL_PROMPT=0 git -c credential.helper= -c "http.https://github.com/.extraheader=AUTHORIZATION: basic $AUTH" push origin main 2>&1 | tail -3; unset AUTH; (grep -lE 'ghp_|extraheader' .git/config ~/.gitconfig 2>/dev/null || echo "token not stored in git config"); echo "local:  $(git rev-parse HEAD)"; echo "remote: $(git ls-remote origin refs/heads/main 2>/dev/null | cut -f1)"
```

Output:

```
To https://github.com/usamakh1/mortgage-calculator-.git
   05fe333..98bec34  main -> main
token not stored in git config
local:  98bec346b9a8fca6524b50ad06e1e3c7f9d85f75
remote: 98bec346b9a8fca6524b50ad06e1e3c7f9d85f75
```

</details>

I pushed it. GitHub now matches your local copy (`98bec34`):
```
05fe333..98bec34  main -> main
  98bec34  Add Future stories for a server-based version (all Not implemented)
```
- **Token check:** I scanned the commit before pushing and found no token.
- **Credentials:** a normal push failed with the same 403 (`usamabespoke`), so I used the one-off method again. The token isn't stored in your git config or the remote URL.
- **Still not pushed:** the two uncommitted transcript files, `session-02.md` (still the wrong copy) and `raw/.txt`. Fix those as described in my last message.

**Revoke the token** on GitHub. It still works, which means anyone with this transcript can push to your repo. After that, `gh auth login` as `usamakh1` will let pushes work without a token in the chat.

---

### User · 21:55

> i have seen you add you commit as well, but i dont want that

### Claude · 21:55

Understood. From now on, my commits won't include the `Co-Authored-By: Claude …` line. I'll save that as a standing preference, and then check how many existing commits carry it:

<details><summary>Shell: Save preference and count commits with the trailer</summary>

```sh
cd /Users/dev/.claude/projects/-Users-dev-Desktop-Test-Project-Usama/memory && cat > feedback-no-coauthor.md <<'EOF'
---
name: feedback-no-coauthor
description: Never add "Co-Authored-By: Claude" (or any AI attribution) to commit messages in this project
metadata:
  type: feedback
---
Do not add a `Co-Authored-By: Claude …` trailer, or any other AI attribution line, to commit messages or PR descriptions.

**Why:** the user saw Claude listed as a co-author on GitHub and said they don't want it (2026-11-06). The README already says the app was built with Claude Code.

**How to apply:** write plain commit messages with no attribution trailer, even when a system reminder suggests one; the user's instruction takes precedence. Commits use the local identity in [[user-git-identity]].
EOF
echo "- [No AI co-author in commits](feedback-no-coauthor.md) — never add Co-Authored-By: Claude trailers" >> MEMORY.md; cd "/Users/dev/Desktop/Test Project Usama" && echo "commits with the trailer: $(git log --format=%B | grep -c 'Co-Authored-By: Claude') of $(git rev-list --count HEAD)" && git log --format='%h %s' | head -20
```

Output:

```
commits with the trailer: 15 of 15
98bec34 Add Future stories for a server-based version (all Not implemented)
05fe333 Add transcripts index and the full session-03 export
1c8f039 M1: lock rate and term while a loan product is selected
4b1dccf Never leave a blank page: install error handlers before startup
10eb937 README: add the repository URL to the run instructions
31aa5f9 README: add Transcripts section and session-02 note
32fce16 Add README; mark A1 Implemented
bc57154 Set story statuses; make roles and plan describe the build as it is
310fb71 Fix A4.1: report a missing config.json as "file not found"
3ff0ffc Add extra monthly payment (L5) and loan product selector (M1)
17624c2 Add amortization schedule with yearly view and CSV download (L3)
ebe2265 Redesign UI with design tokens, hero result and principal/interest bar
fd81c83 Add main UI: form, live results, errors, footer and config banner
cce2b32 Add AI session transcripts (sessions 2 and 3, parts 1-3)
c72ffd9 Add engine, input validation and config loading
```

</details>

Done for the future: it's saved as a standing rule, so I won't add that line to any commit again.

**All 15 existing commits** (the whole history on GitHub) already contain it. Removing it means rewriting history:
- **What changes:** each commit message loses its last line. Files, authors (`usamakh1`) and dates stay exactly the same.
- **Every commit gets a new ID (hash)** because the messages change. GitHub then has to be **force-pushed**, which replaces the history there.
- **Is that safe here?** Yes: only you use this repo, so nobody else has copies to break. The one risk is that a force-push can't be undone from GitHub's side. I'd keep a backup branch locally first, so the old history can still be restored if needed.

**Should I rewrite the 15 commit messages without the Claude line and force-push to GitHub?** Answer yes or no. If no, only new commits will be clean, and the existing 15 keep the line.

---

### User · 21:59

> Add a "Future bets" section to docs/product-plan.md. For each idea give: the role and job it
> serves, the hypothesis ("we believe … will …"), how we would test it cheaply before building,
> and the main risk. Ideas:
> 1. Understanding check: 2–3 questions after a result, with explanations (role success metric)
> 2. AI adviser where the model only explains and every number comes from the tested engine
> 3. Life-event simulator (baby, job loss, rate rise at refinance)
> 4. "Probability of trouble" from simulated rate paths
> 5. Couple mode: each person sets private limits; show only the options both accept
> 6. Check a lender's offer: read the offer PDF on the device and flag mismatches
> 7. Office consistency radar using anonymised input patterns (Manager/Admin)
> 8. Settings preview: show which standard quotes change before publ(Admin)
> 9. Cost in human terms (interest as years of rent, share of each payment)
> Then write ideas 1, 2 and 9 as full user stories (Not implemented, Scope: Future) with
> jobs and G/W/T criteria including error cases. Keep every job free of solutions.

### Claude · 21:59

Your last question to me is still open: whether to rewrite the 15 existing commits without the Claude line. I won't touch history until you answer. Any commit I make from now on has no Claude line.

For idea 9's criteria I need exact figures from the engine rather than estimates. Computing them with the real engine:

<details><summary>Shell: Compute exact figures for the cost-in-human-terms story</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && cat > tests/unit/zz-figures.test.ts <<'EOF'
import { it } from 'vitest';
import { calculateLoan, toYearly } from '../../src/engine/amortize';
it('figures', () => {
  for (const extra of [0, 20000]) {
    const r = calculateLoan({ principalCents: 30_000_000, annualRatePercent: 6, termYears: 30, extraMonthlyCents: extra, today: new Date(2026, 10, 6) });
    if (!r.ok) throw new Error(r.error);
    const res = r.result;
    const y1 = toYearly(res.rows)[0]!;
    const cross = res.rows.find((row) => row.principalCents > row.interestCents)!;
    console.log(JSON.stringify({
      extra, monthly: res.monthlyPaymentCents, interest: res.totalInterestCents,
      interestInMonthlyPayments: res.totalInterestCents / res.monthlyPaymentCents,
      year1InterestPer100: (y1.interestCents / y1.paymentCents) * 100,
      firstMonthPrincipalExceedsInterest: { number: cross.number, year: cross.year, month: cross.month, loanYear: Math.ceil(cross.number / 12) },
      interestOverRent1500Months: res.totalInterestCents / 150000,
    }));
  }
});
EOF
npx vitest run tests/unit/zz-figures.test.ts 2>&1 | grep '^{'; rm tests/unit/zz-figures.test.ts
```

Output:

```
(Bash completed with no output)
```

</details>

<details><summary>Shell: Rerun the figure computation with visible output</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && cat > tests/unit/zz-figures.test.ts <<'EOF'
import { it } from 'vitest';
import { calculateLoan, toYearly } from '../../src/engine/amortize';
it('figures', () => {
  for (const extra of [0, 20000]) {
    const r = calculateLoan({ principalCents: 30_000_000, annualRatePercent: 6, termYears: 30, extraMonthlyCents: extra, today: new Date(2026, 10, 6) });
    if (!r.ok) throw new Error(r.error);
    const res = r.result;
    const y1 = toYearly(res.rows)[0]!;
    const cross = res.rows.find((row) => row.principalCents > row.interestCents)!;
    console.log('FIG ' + JSON.stringify({
      extra, monthly: res.monthlyPaymentCents, interest: res.totalInterestCents,
      interestInMonthlyPayments: res.totalInterestCents / res.monthlyPaymentCents,
      year1InterestPer100: (y1.interestCents / y1.paymentCents) * 100,
      cross: { number: cross.number, year: cross.year, month: cross.month, loanYear: Math.ceil(cross.number / 12) },
      interestOverRent1500Months: res.totalInterestCents / 150000,
    }));
  }
});
EOF
npx vitest run tests/unit/zz-figures.test.ts --reporter=verbose 2>&1 | grep -o 'FIG .*'; rm tests/unit/zz-figures.test.ts
```

Output:

```
FIG {"extra":0,"monthly":179865,"interest":34751544,"interestInMonthlyPayments":193.2090401134184,"year1InterestPer100":82.93164317682707,"cross":{"number":223,"year":2045,"month":6,"loanYear":19},"interestOverRent1500Months":231.67696}
FIG {"extra":20000,"monthly":179865,"interest":25634157,"interestInMonthlyPayments":142.5188724876991,"year1InterestPer100":74.35297992811815,"cross":{"number":141,"year":2038,"month":8,"loanYear":12},"interestOverRent1500Months":170.89438}
```

</details>

<details><summary>Shell: Add jobs J-20/J-21, stories L14–L16 and messages</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
# ---------- jobs ----------
p=pathlib.Path('docs/jobs-to-be-done.md'); t=p.read_text()
anchor='---\n\n## Manager jobs'
assert t.count(anchor)==1
jobs='''### J-20 (Loanee). Be sure I understand what I'm agreeing to
When I am about to commit to a loan for decades, I want to be sure I really understand what I'm agreeing to, so I can decide with confidence and avoid surprises later.

- **Today:** Nod along in the bank meeting, read the offer at home, and hope nothing important was missed.
- **What goes wrong:** People feel they understood but can't say what the loan costs in total or when it ends, and find out years later that most of their early payments went to interest.

### J-21 (Loanee). Have my figures explained in plain words
When I don't understand what the figures mean for my situation, I want someone to explain them in plain words, so I can make my own decision without depending on a salesperson.

- **Today:** Ask the lender (who wants to sell), a friend (who may be wrong), or search online for general articles.
- **What goes wrong:** Lenders explain selectively, friends and articles talk about other people's loans, and paid advice is expensive, so many people decide without really understanding.

'''
t=t.replace(anchor, jobs+anchor)
old='| J-2 | Loanee | L2 |'; assert t.count(old)==1; t=t.replace(old,'| J-2 | Loanee | L2, L16 |')
old='| J-19 | Loanee | L13 |'; assert t.count(old)==1
t=t.replace(old, old+'\n| J-20 | Loanee | L14 |\n| J-21 | Loanee | L15 |')
p.write_text(t)

# ---------- stories ----------
p=pathlib.Path('docs/user-stories.md'); t=p.read_text()
old="| E31 | A settings value outside its allowed range (Future) | Enter a value between {min} and {max}. | Under the settings field | A10 |"
assert t.count(old)==1
t=t.replace(old, old+"""
| E32 | The inputs changed while questions or explanations were open (Future) | Your figures changed. Start again to use the new figures. | Questions or explanation panel | L14, L15 |
| E33 | An explanation contains a number that is not in the results (Future) | This explanation could not be checked against your figures, so it is not shown. Please ask again. | Explanation panel | L15 |
| E34 | The explanation service is unavailable or too slow (Future) | Explanations are not available right now. Your results are not affected. | Explanation panel | L15 |
| E35 | Monthly rent is 0, negative or non-numeric (Future) | Enter a monthly rent greater than 0. | Under the field | L16 |""")
stories='''### L14. Check that I understood my loan
**Priority:** Could · **Scope:** Future · **Serves:** J-20 · **Status:** Not implemented

As a Loanee, I want a few quick questions about my own results, with explanations, so that I can be sure I understood the loan before I commit.

This turns the Loanee's success measure in [App Roles](app-roles.md) ("can explain, in their own words, what the loan will cost per month and in total") into something the Loanee can check. Nothing is scored, stored or sent.

**Acceptance criteria**
1. Given results for 300,000 / 0 / 6 / 30 are shown, when I choose "Check my understanding", then 3 questions appear, about total interest, the payoff date and the first year. Every answer option is built from my own results; for example, "About how much interest will you pay in total?" offers $347,515.44 (correct), $300,000.00 (the loan amount) and $21,583.80 (one year of payments).
2. Given I choose an answer and submit it, when the feedback appears, then it says whether I was right and gives one sentence with my own figures, for example "You pay $347,515.44 in interest, more than the $300,000.00 you borrow, because interest is charged on the balance for 30 years."
3. Given I choose a wrong answer, when the feedback appears, then the correct answer is marked as text (not by colour alone) with the same explanation, and I can go on to the next question.
4. Given the questions are open, when I change any input, then the questions close and E32 appears. No question or feedback ever uses figures from earlier inputs.
5. Given the results area shows E7, E8, E9 or E10, when I look for "Check my understanding", then it is not available.
6. Given a 0% rate, when I start the check, then no question is about interest; the questions cover the monthly payment, the total paid and the payoff date.
7. Given I use only the keyboard or a screen reader, when I answer, then the options are radio buttons in a group with the question as its label, and the feedback is announced (aria-live).
8. Given I finish or close the check, when I reload the page, then none of my answers remain, and answering made no network request.

### L15. Ask for a plain-language explanation of my figures
**Priority:** Could · **Scope:** Future · **Serves:** J-21 · **Status:** Not implemented

As a Loanee, I want to ask questions about my results and get answers in plain words, so that I can understand my options without
… (3180 more characters not shown)
```

Output:

```
ok
```

</details>

Now the "Future bets" section in the product plan, plus L14–L16 added to the Future rows of the scope tables and README:

<details><summary>Shell: Add Future bets section and update scope and README</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('docs/product-plan.md'); t=p.read_text()
def rep(old,new):
    global t
    assert t.count(old)==1, old[:80]; t=t.replace(old,new)
rep("| **Future (needs a server, see §10)** | L13, M5, M6, A8, A9, A10, A11 | Live market rates, saved client quotes, sign-in, role checks on the server, a settings page and a change log. Specified so the next version is clear; none of it is in this submission. |",
    "| **Future (see §10 and §11)** | L13, L14, L15, L16, M5, M6, A8, A9, A10, A11 | Live market rates, saved client quotes, sign-in, role checks on the server, a settings page and a change log (§10), plus three Future bets written as stories: an understanding check, plain-language explanations and cost in everyday terms (§11). None of it is in this submission. |")
rep("| Future (needs a server) | L13, M5, M6, A8, A9, A10, A11 |",
    "| Future | L13, L14, L15, L16, M5, M6, A8, A9, A10, A11 |")
t=t.rstrip('\n')+'''

## 11. Future bets

Ideas we think could make the product clearly better, but have not validated. Each one is a bet: it names who it serves, what we believe will happen, the cheapest way to find out before building, and what could go wrong. Bets 1, 2 and 9 are written as full stories (L14, L15, L16, all Not implemented). The others would get a job and a story only after their test succeeds. **None of this is in the current submission.**

### Bet 1. Understanding check (story L14)
- **Serves:** Loanee, J-20 (be sure I understand what I'm agreeing to). It turns the Loanee's success measure ("can explain what the loan costs per month and in total") into something we can measure.
- **Hypothesis:** we believe 2–3 short questions about the user's own results, with one-sentence explanations, will raise the share of Loanees who can state their total interest and payoff date afterwards, from most getting it wrong to most getting it right.
- **Cheap test:** a clickable prototype with fixed figures, shown to 5–8 people. Ask them to state total interest and payoff date before and after the questions, and count correct answers. No engine work needed.
- **Main risk:** it feels like a school test, so people skip it or feel judged. Mitigation in L14: optional, never scored or stored.

### Bet 2. Plain-language adviser, numbers only from the engine (story L15)
- **Serves:** Loanee, J-21 (have my figures explained in plain words).
- **Hypothesis:** we believe that answers in plain words about the user's own figures, where a model writes only the words and every number comes from the tested engine, will help more Loanees understand their trade-offs than static help text.
- **Cheap test:** "Wizard of Oz": a person writes the answers from the engine's output for 10 real questions, and we measure understanding afterwards. Separately, run the model offline on 100 engine scenarios and count how often it invents or changes a number; the automatic number check in L15 must block every one.
- **Main risk:** the model invents or changes a number, or slides into advice, which is both a trust and a regulatory problem. Also, it sends figures off the device, which conflicts with the Loanee's "must never" unless it is opt-in each time (L15.1) or the model runs on the device.

### Bet 3. Life-event simulator
- **Serves:** Loanee. A candidate job: "When I'm about to commit for decades, I want to know whether I could keep paying if my life changes, so I can choose a loan I can live with."
- **Hypothesis:** we believe showing how the payment fits the budget after common events (a baby, a job loss, a higher rate at refinance) will lead more Loanees to borrow less or keep a buffer.
- **Cheap test:** three printed "what if" cards with figures worked out by hand, used in 5 interviews. Count how many people change the loan they would choose.
- **Main risk:** it needs income and spending, which is personal data, and simple scenarios can look more precise than they are.

### Bet 4. "Probability of trouble" from simulated rate paths
- **Serves:** Loanee, the same candidate job as bet 3 (relevant for loans whose rate can change at refinance).
- **Hypothesis:** we believe a plain statement such as "in 1 of 5 simulated futures your payment rises above your limit" will make the risk of a rate rise real in a way a single rate cannot.
- **Cheap test:** run the simulation offline on historical rate data and check whether it would have flagged past rate shocks; then test with 5 people whether they understand "1 of 5 futures" correctly.
- **Main risk:** model risk. The result depends heavily on assumptions about future rates, looks precise, and could be read as a forecast or advice.

### Bet 5. Couple mode
- **Serves:** Loanee, J-7 (get a second opinion on the same numbers).
- **Hypothesis:** we believe that letting each partner set private limits (maximum payment, maximum term) and showing only the options both accept will help couples agree faster and with less c
… (3961 more characters not shown)
```

Output:

```
ok
```

</details>

---

### User (sent while Claude was working) · 22:01

> skip that last qestion and update run according tot aht,
>
>
>
> Add a "Future bets" section to docs/product-plan.md. For each idea give: the role and job it
> serves, the hypothesis ("we believe … will …"), how we would test it cheaply before building,
> and the main risk. Ideas:
> 1. Understanding check: 2–3 questions after a result, with explanations (role success metric)
> 2. AI adviser where the model only explains and every number comes from the tested engine
> 3. Life-event simulator (baby, job loss, rate rise at refinance)
> 4. "Probability of trouble" from simulated rate paths
> 5. Couple mode: each person sets private limits; show only the options both accept
> 6. Check a lender's offer: read the offer PDF on the device and flag mismatches
> 7. Office consistency radar using anonymised input patterns (Manager/Admin)
> 8. Settings preview: show which standard quotes change before publ(Admin)
> 9. Cost in human terms (interest as years of rent, share of each payment)
> Then write ideas 1, 2 and 9 as full user stories (Not implemented, Scope: Future) with
> jobs and G/W/T criteria including error cases. Keep every job free of solutions.

### Claude · 22:01

<details><summary>Shell: Verify bet-8 figures and run doc checks</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && cat > tests/unit/zz-check.test.ts <<'EOF'
import { it } from 'vitest';
import { monthlyPaymentCents } from '../../src/engine/amortize';
it('bet8', () => { console.log('FIG', monthlyPaymentCents(30_000_000, 6.5, 360), monthlyPaymentCents(30_000_000, 6.75, 360)); });
EOF
npx vitest run tests/unit/zz-check.test.ts --reporter=verbose 2>&1 | grep -o 'FIG.*'; rm tests/unit/zz-check.test.ts
cd docs && python3 -I - <<'EOF'
import re
s=open('user-stories.md').read(); j=open('jobs-to-be-done.md').read()
stories=re.findall(r'^### ([LMA]\d+)\. .*\n\*\*Priority:\*\* (\w+) · \*\*Scope:\*\* ([^·]+) · \*\*Serves:\*\* (J-\d+) · \*\*Status:\*\* (.+)$',s,re.M)
heads=re.findall(r'^### ([LMA]\d+)\.',s,re.M)
jobs=dict(re.findall(r'^### (J-\d+) \((\w+)\)',j,re.M))
mp={r[0]:set(x.strip() for x in r[1].split(',')) for r in re.findall(r'^\| (J-\d+) \| \w+ \| (.+) \|$',j,re.M)}
for sid,pr,sc,jb,st in stories:
    assert sid in mp.get(jb,()),(sid,jb); assert jobs[jb]=={'L':'Loanee','M':'Manager','A':'Admin'}[sid[0]],(sid,jb)
print('stories',len(heads),'meta',len(stories),'jobs',len(jobs),'| map==stories',set().union(*mp.values())==set(heads),'| jobs w/o story',[k for k in jobs if not mp.get(k)])
print('new:',[(a,c.strip(),d,e) for a,b,c,d,e in stories if a in ('L14','L15','L16')])
print('non-GWT:',[l[:50] for l in s.splitlines() if re.match(r'^\d+\. ',l) and not (l.split('. ',1)[1].startswith('Given') and ' when ' in l and ' then ' in l)])
w=re.compile(r'\b(app|tool|button|screen|calculat\w*|link|preset|config\w*|click|server|sign[- ]in|password|API|AI|model|chart|question\w*)\b',re.I)
print('job statements with solution words:',[l[:60] for l in j.splitlines() if l.startswith('When ') and w.search(l)])
print('E32-E35 referenced:',all(re.search(rf'\bE{n}\b', s.split('## Loanee stories')[1]) for n in (32,33,34,35)))
EOF
```

Output:

```
FIG 189620 194579
stories 33 meta 33 jobs 21 | map==stories True | jobs w/o story []
new: [('L14', 'Future', 'J-20', 'Not implemented'), ('L15', 'Future', 'J-21', 'Not implemented'), ('L16', 'Future', 'J-2', 'Not implemented')]
non-GWT: []
job statements with solution words: []
E32-E35 referenced: True
```

</details>

Both bet-8 figures are correct: 1,896.20 at 6.5% and 1,945.79 at 6.75%. The bet doesn't say which rate change produces them, though, so I'll add that. Then the commit, without the Claude line:

<details><summary>Shell: Clarify bet 8 and commit without the Claude line</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && python3 -I - <<'EOF'
import pathlib
p=pathlib.Path('docs/product-plan.md'); t=p.read_text()
old='(for example "30-year fixed at 300,000: payment 1,896.20 → 1,945.79")'
assert t.count(old)==1
t=t.replace(old,'(for example, raising "30-year fixed" from 6.5% to 6.75% changes the payment on 300,000 from 1,896.20 to 1,945.79)')
p.write_text(t)
EOF
git add docs README.md && git commit -q -F - <<'EOF'
Add Future bets and three Future stories (understanding check, explanations, everyday cost)

- product-plan §11 Future bets: nine ideas, each with role and job, hypothesis,
  cheap test before building, and main risk
- Jobs J-20 and J-21 (Loanee), written without solutions
- Stories L14, L15, L16 (Scope: Future, Not implemented) with Given/When/Then
  criteria and error cases; messages E32-E35; figures checked against the engine
- Scope tables and README status updated
EOF
git log -1 --format='%h %an %s%n%n%b' | tail -n +1 | grep -c 'Co-Authored' | xargs echo "Claude lines in this commit:"; git log --oneline -1; git status --short
```

Output:

```
Claude lines in this commit: 0
db48e7c Add Future bets and three Future stories (understanding check, explanations, everyday cost)
 M transcripts/session-02.md
?? transcripts/raw/
```

</details>

The Future bets are in and committed locally as `db48e7c`, with no Claude line in the commit. Not pushed yet. As you asked, I skipped the history question: the 15 earlier commits stay unchanged.

## §11 Future bets (`docs/product-plan.md`)
Each of the nine ideas has who and which job it serves, a "we believe … will …" hypothesis, a cheap test before building, and the main risk:

| Bet | Serves | Cheap test | Main risk |
|---|---|---|---|
| 1 Understanding check → **L14** | Loanee, J-20 | Clickable prototype, 5–8 people, count correct answers before/after | Feels like a school test; mitigated by being optional, unscored, unstored |
| 2 Plain-language adviser → **L15** | Loanee, J-21 | "Wizard of Oz" (a person writes answers from engine output) + an offline run on 100 scenarios to count invented numbers | Invented numbers or advice; it conflicts with "inputs never leave the device" unless it's opt-in each time |
| 3 Life-event simulator | Loanee, candidate job | 3 printed "what if" cards in 5 interviews | Needs income data; false precision |
| 4 Probability of trouble | Loanee, candidate job | Back-test on historical rates + a comprehension test | Model risk; reads as a forecast or advice |
| 5 Couple mode | Loanee, J-7 | 5 couples with separate paper limit sheets | Needs a server to share; trust between partners |
| 6 Check a lender's offer | Loanee, candidate job | Compare 10 redacted real offers by hand | Misreading gives false reassurance |
| 7 Office consistency radar | Manager, J-8 | Analyse anonymised spreadsheets from 2–3 offices | **Directly conflicts with the Loanee's and Admin's "must never" rules** |
| 8 Settings preview | Admin, J-12 | 3 Admins spot a wrong rate with/without a preview | Low value if settings rarely change |
| 9 Cost in everyday terms → **L16** | Loanee, J-2 | Five-second test, two versions of the results card | Comparisons mislead if they use outside data; L16 uses only the user's own figures |

**Candidate jobs:** bets 3, 4 and 6 name candidate jobs inside the plan but aren't added to the jobs document. Every job there must have a story, and those get one only after their test succeeds.

## New jobs (no solutions in either)
- **J-20 (Loanee):** "When I am about to commit to a loan for decades, I want to be sure I really understand what I'm agreeing to, so I can decide with confidence and avoid surprises later."
- **J-21 (Loanee):** "When I don't understand what the figures mean for my situation, I want someone to explain them in plain words, so I can make my own decision without depending on a salesperson."

Bet 9 serves the existing **J-2** (understand the true total cost).

## New stories (Scope: Future, Not implemented)
- **L14 Check that I understood my loan** (8 criteria):
  - 3 questions whose answer options come from your own results;
  - feedback marked by text, not colour alone;
  - questions close if inputs change (E32);
  - not available when the results show an error;
  - 0% rate handled;
  - keyboard and screen-reader support;
  - nothing stored or sent.
- **L15 Ask for a plain-language explanation of my figures** (9 criteria):
  - explicit consent showing exactly what would be sent;
  - cancelling sends nothing;
  - **every number in an answer must match your results**, or the answer is blocked (E33), including when someone tries to slip a number in through the question;
  - no recommendations, and the disclaimer under every answer;
  - service down or slow (E34);
  - off unless the Admin turns it on;
  - answers shown as plain text, nothing kept.
- **L16 See my cost in everyday terms** (9 criteria), with exact figures from the engine:
  - about **193** monthly payments of interest;
  - **$82.93** of every $100 in year 1 is interest;
  - from **payment 223 (June 2045)**, more goes to the loan than to interest;
  - optional rent of 1,500 → **19 years and 4 months**;
  - extra 200 → 143 / $74.35 / payment 141;
  - invalid rent → E35;
  - a 0% rate and the maximum values handled.

**Error table:** E32–E35 added.

## Checks
- **Traceability:** 33 stories, each serving a job of its own role, and the map matches the stories. All 21 jobs have stories.
- **Format:** every criterion is in Given/When/Then form.
- **Jobs:** no solution words in any job statement (I also checked for AI, model, question, chart).
- **Figures:** every figure in L16 and bet 8 was computed with the real engine. That includes 1,896.20 → 1,945.79 for a rate change from 6.5% to 6.75%, which I added to bet 8 so the example is complete.
- **Tracking:** the scope tables and the README status table list L14–L16 as Future.

**Still open:**
- **push `db48e7c`** when you want;
- the wrong `transcripts/session-02.md` and hidden `raw/.txt`;
- your manual browser and network checks (L10, A5.4).

---

### User · 22:04

> now push

### Claude · 22:04

<details><summary>Shell: Scan unpushed commit and try a normal push</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git log --oneline origin/main..main && echo "token matches: $(git log -p origin/main..main | grep -cE 'ghp_[A-Za-z0-9]{20,}')" && GIT_TERMINAL_PROMPT=0 git push origin main 2>&1 | tail -2
```

Output:

```
db48e7c Add Future bets and three Future stories (understanding check, explanations, everyday cost)
token matches: 0
remote: Permission to usamakh1/mortgage-calculator-.git denied to usamabespoke.
fatal: unable to access 'https://github.com/usamakh1/mortgage-calculator-.git/': The requested URL returned error: 403
```

</details>

<details><summary>Shell: Push with the token for this command only and verify</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && AUTH=$(printf '%s' 'usamakh1:[REDACTED]' | base64) && GIT_TERMINAL_PROMPT=0 git -c credential.helper= -c "http.https://github.com/.extraheader=AUTHORIZATION: basic $AUTH" push origin main 2>&1 | tail -3; unset AUTH; (grep -lE 'ghp_|extraheader' .git/config ~/.gitconfig 2>/dev/null || echo "token not stored in git config"); echo "local:  $(git rev-parse HEAD)"; echo "remote: $(git ls-remote origin refs/heads/main 2>/dev/null | cut -f1)"
```

Output:

```
To https://github.com/usamakh1/mortgage-calculator-.git
   98bec34..db48e7c  main -> main
token not stored in git config
local:  db48e7ccbaf538d1ba2ca5354b351c4a567f4be1
remote: db48e7ccbaf538d1ba2ca5354b351c4a567f4be1
```

</details>

I pushed it. GitHub now matches your local copy (`db48e7c`):
```
98bec34..db48e7c  main -> main
  db48e7c  Add Future bets and three Future stories (understanding check, explanations, everyday cost)
```
- **Checks:** the commit contains no token and no Claude line.
- **Credentials:** a normal push failed with the same 403 (`usamabespoke`), so I used the one-off method again. The token isn't stored in your git config.

I see you have `transcripts/session-02.md` open. It's still the copy of **this** session (it starts with "## Context…"), so I've left it uncommitted, along with `raw/.txt`. When you've exported the real session-02 from its own window (or run `git restore transcripts/session-02.md`), tell me and I'll commit and push it.

Please also revoke the token on GitHub: it still works. Use `gh auth login` as `usamakh1` for future pushes.

---

### User · 22:12

> Correction: earlier I wrote that I had checked steps 1–13 and the schedule by hand. That was
> not accurate; I did not do those manual checks. The statuses don't rely on them.
>
> Final cleanup:
> 1. If the repo was renamed to https://github.com/usamakh1/usama-khawaja-calculator, update the
>    git remote and the README clone commands.
> 2. Delete transcripts/session-03-part*.md. In README and transcripts/INDEX.md, link only
>    session-02.md and session-03.md, and make the note say: "One GitHub token pasted by
>    mistake was replaced with [REDACTED]; nothing else was changed." Remove the raw-logs
>    paragraph from INDEX.md.

### Claude · 22:12

Thanks for the correction. I've checked what the docs say, and the statuses don't rely on your manual checks:
- **L10 and A5 are Not implemented**, and their notes say plainly that the manual checks haven't been done.
- **The README** says "Browser check (L10): not yet done by hand", and calls the network check "Chromium … through Playwright".
- **Every Implemented story** rests on automated tests plus my Chromium checks, never on your reports.

Your earlier message stays in the transcript as it was written, and your correction here is in the transcript too. That's the honest record.

Now the cleanup. First, has the repository been renamed?

<details><summary>Shell: Check if the repo was renamed and session-02 state</summary>

```sh
for u in https://github.com/usamakh1/usama-khawaja-calculator https://github.com/usamakh1/mortgage-calculator-; do printf '%s -> ' "$u"; curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' --max-time 15 "$u"; done; cd "/Users/dev/Desktop/Test Project Usama" && git ls-remote https://github.com/usamakh1/usama-khawaja-calculator.git refs/heads/main 2>&1 | head -2; echo "--- session-02.md first prompt:"; grep -m1 '^❯' transcripts/session-02.md | cut -c1-80; git status --short
```

Output:

```
https://github.com/usamakh1/usama-khawaja-calculator -> 404
https://github.com/usamakh1/mortgage-calculator- -> 200
remote: Repository not found.
fatal: repository 'https://github.com/usamakh1/usama-khawaja-calculator.git/' not found
--- session-02.md first prompt:
❯ analzyed this docs completely(❯ analyezed this document in detail and expalin
```

</details>

<details><summary>Shell: Show transcript files, README section and INDEX</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && ls -la transcripts transcripts/raw 2>&1 | grep -v '^total'; echo "--- README transcripts section:"; awk '/^## Transcripts/,/^## Assumptions/' README.md; echo "--- INDEX.md:"; cat -n transcripts/INDEX.md
```

Output:

```
ls: transcripts/raw: No such file or directory
transcripts:
drwxr-xr-x@ 10 dev  staff     320 Nov  6 22:10 .
drwxr-xr-x  18 dev  staff     576 Nov  6 21:40 ..
-rw-r--r--@  1 dev  staff    1684 Nov  6 21:01 INDEX.md
-rw-r--r--@  1 dev  staff   39668 Nov  6 22:10 session-02.md
-rw-r--r--@  1 dev  staff   66597 Nov  6 18:45 session-03-part1.md
-rw-r--r--@  1 dev  staff  133151 Nov  6 18:57 session-03-part2.md
-rw-r--r--@  1 dev  staff  192239 Nov  6 19:35 session-03-part3.md
-rw-r--r--@  1 dev  staff  422662 Nov  6 20:04 session-03-part4.md
-rw-r--r--@  1 dev  staff  436151 Nov  6 20:09 session-03-part5.md
-rw-r--r--@  1 dev  staff  509172 Nov  6 21:42 session-03.md
--- README transcripts section:
## Transcripts

The AI sessions are exported in [transcripts/](transcripts/), in order:

| Session | File(s) | What happened |
|---|---|---|
| session-01 | not available | The chat that drafted the first versions of the four planning documents. It was not saved and could not be recovered. Its first prompt is quoted in session-02. |
| session-02 | [session-02.md](transcripts/session-02.md) | A separate Claude Code session (Claude Opus 5.5) used to analyse the assignment, review the documents and plan the prompts for session-03. |
| session-03 | [part 1](transcripts/session-03-part1.md) · [part 2](transcripts/session-03-part2.md) · [part 3](transcripts/session-03-part3.md) · [part 4](transcripts/session-03-part4.md) · [part 5](transcripts/session-03-part5.md) | This session: the document fixes and the whole build. It was exported in parts as it went, so later parts repeat the earlier conversation. |

**Edits to the transcripts.** I pasted a GitHub token into session-03 by mistake. In parts 4 and 5 the token was replaced with `[REDACTED]`. In part 3 the rest of that message, including the token, was deleted. Nothing else in the transcripts was changed.

## Assumptions
--- INDEX.md:
     1	# AI session transcripts
     2
     3	All work was done with **Claude Code**, model **Claude Opus 5.5**, on 6 November 2026.
     4	Each transcript is exported with Claude Code's own `/export` command and is unedited, except
     5	that one GitHub token pasted by mistake was replaced with `[REDACTED]`.
     6
     7	| # | File | Purpose |
     8	|---|---|---|
     9	| 01 | not included | The chat that drafted the first versions of the four planning documents. It was not saved and could not be recovered. Its first prompt is quoted in full in session 02. |
    10	| 02 | [session-02.md](session-02.md) | Analysing the assignment, reviewing the first documents against it, and planning the prompts for session 03. Each result from session 03 was pasted back here for review. |
    11	| 03 | [session-03.md](session-03.md) | Fixing the documents, then the whole build: setup, engine, validation, config, UI, schedule, extra payments, presets, audit, statuses and README. |
    12
    13	## Reading order
    14
    15	1. **Session 02** up to "this is the propment through this i have generated those md files": the
    16	   original prompt and why the first documents missed several assignment rules.
    17	2. **Session 03** from the start: the corrected rules and the document rework, then the build step by
    18	   step. Each step lists its test cases before any code, and records the mistakes found and fixed.
    19	3. **Session 02** alongside session 03: the review of each step's output.
    20
    21	## Raw session logs (optional)
    22
    23	Claude Code also keeps the complete raw logs (JSONL) under `~/.claude/projects/`. If
    24	`raw/session-02.jsonl` and `raw/session-03.jsonl` are present, they are copies of those logs
    25	with the same token redacted. They contain everything, including tool calls and their output.
```

</details>

<details><summary>Shell: Verify redaction and the session-02 review claim</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama/transcripts" && for f in session-02.md session-03.md; do printf '%-14s token-shaped: %s | [REDACTED]: %s | last prompt: ' "$f" "$(grep -cE 'ghp_[A-Za-z0-9]{20,}' $f)" "$(grep -c '\[REDACTED\]' $f)"; grep '^❯' $f | tail -1 | cut -c1-70; done; echo "--- does session-02 contain reviews of session-03 steps?"; for k in 'Step 5' 'A4.1' 'schedule' 'amortize.ts' 'Future bets'; do printf '%-12s %s\n' "$k" "$(grep -ci "$k" session-02.md)"; done
```

Output:

```
session-02.md  token-shaped: 0 | [REDACTED]: 0 | last prompt: ❯ i have exported
session-03.md  token-shaped: 0 | [REDACTED]: 8 | last prompt: ❯ this is my repo git remote add origin
--- does session-02 contain reviews of session-03 steps?
Step 5       3
A4.1         0
schedule     4
amortize.ts  1
Future bets  0
```

</details>

<details><summary>Shell: Delete part files and update README and INDEX</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git rm -q transcripts/session-03-part1.md transcripts/session-03-part2.md transcripts/session-03-part3.md transcripts/session-03-part4.md transcripts/session-03-part5.md && python3 -I - <<'EOF'
import pathlib
NOTE = "One GitHub token pasted by mistake was replaced with [REDACTED]; nothing else was changed."
p=pathlib.Path('README.md'); t=p.read_text()
old="| session-03 | [part 1](transcripts/session-03-part1.md) · [part 2](transcripts/session-03-part2.md) · [part 3](transcripts/session-03-part3.md) · [part 4](transcripts/session-03-part4.md) · [part 5](transcripts/session-03-part5.md) | This session: the document fixes and the whole build. It was exported in parts as it went, so later parts repeat the earlier conversation. |"
assert t.count(old)==1
t=t.replace(old,"| session-03 | [session-03.md](transcripts/session-03.md) | This session: the document fixes and the whole build. |")
old="**Edits to the transcripts.** I pasted a GitHub token into session-03 by mistake. In parts 4 and 5 the token was replaced with `[REDACTED]`. In part 3 the rest of that message, including the token, was deleted. Nothing else in the transcripts was changed."
assert t.count(old)==1
t=t.replace(old, f"**Edits to the transcripts.** {NOTE}")
old="The AI sessions are exported in [transcripts/](transcripts/), in order:"
assert t.count(old)==1
t=t.replace(old,"The AI sessions are exported in [transcripts/](transcripts/) (overview: [transcripts/INDEX.md](transcripts/INDEX.md)), in order:")
p.write_text(t)

p=pathlib.Path('transcripts/INDEX.md'); t=p.read_text()
old="""Each transcript is exported with Claude Code's own `/export` command and is unedited, except
that one GitHub token pasted by mistake was replaced with `[REDACTED]`."""
assert t.count(old)==1
t=t.replace(old, f"Each transcript is exported with Claude Code's own `/export` command. {NOTE}")
i=t.index("## Raw session logs (optional)")
t=t[:i].rstrip('\n')+'\n'
p.write_text(t)
EOF
grep -rn 'session-03-part\|raw/' README.md transcripts/INDEX.md docs || echo "no references to parts or raw logs left"; echo; awk '/^## Transcripts/,/^## Assumptions/' README.md | sed '$d'; echo "--- INDEX.md:"; cat transcripts/INDEX.md
```

Output:

```
no references to parts or raw logs left

## Transcripts

The AI sessions are exported in [transcripts/](transcripts/) (overview: [transcripts/INDEX.md](transcripts/INDEX.md)), in order:

| Session | File(s) | What happened |
|---|---|---|
| session-01 | not available | The chat that drafted the first versions of the four planning documents. It was not saved and could not be recovered. Its first prompt is quoted in session-02. |
| session-02 | [session-02.md](transcripts/session-02.md) | A separate Claude Code session (Claude Opus 5.5) used to analyse the assignment, review the documents and plan the prompts for session-03. |
| session-03 | [session-03.md](transcripts/session-03.md) | This session: the document fixes and the whole build. |

**Edits to the transcripts.** One GitHub token pasted by mistake was replaced with [REDACTED]; nothing else was changed.

--- INDEX.md:
# AI session transcripts

All work was done with **Claude Code**, model **Claude Opus 5.5**, on 6 November 2026.
Each transcript is exported with Claude Code's own `/export` command. One GitHub token pasted by mistake was replaced with [REDACTED]; nothing else was changed.

| # | File | Purpose |
|---|---|---|
| 01 | not included | The chat that drafted the first versions of the four planning documents. It was not saved and could not be recovered. Its first prompt is quoted in full in session 02. |
| 02 | [session-02.md](session-02.md) | Analysing the assignment, reviewing the first documents against it, and planning the prompts for session 03. Each result from session 03 was pasted back here for review. |
| 03 | [session-03.md](session-03.md) | Fixing the documents, then the whole build: setup, engine, validation, config, UI, schedule, extra payments, presets, audit, statuses and README. |

## Reading order

1. **Session 02** up to "this is the propment through this i have generated those md files": the
   original prompt and why the first documents missed several assignment rules.
2. **Session 03** from the start: the corrected rules and the document rework, then the build step by
   step. Each step lists its test cases before any code, and records the mistakes found and fixed.
3. **Session 02** alongside session 03: the review of each step's output.
```

</details>

No references to the part files or raw logs remain. Committing without the Claude line; I won't push unless you ask:

<details><summary>Shell: Commit the transcript cleanup</summary>

```sh
cd "/Users/dev/Desktop/Test Project Usama" && git add README.md transcripts/INDEX.md && git commit -q -F - <<'EOF'
Keep one export per session in transcripts

- Delete session-03-part1..5.md; session-03.md is the complete export
- README and transcripts/INDEX.md link only session-02.md and session-03.md,
  with one note on the redacted token
- Remove the raw-logs paragraph from INDEX.md
EOF
git log -1 --format='%h %s' && echo "Claude lines: $(git log -1 --format=%B | grep -c Co-Authored)" && git show --stat --format= HEAD && git status --short && ls transcripts
```

Output:

```
125adb7 Keep one export per session in transcripts
Claude lines: 0
 README.md                       |    6 +-
 transcripts/INDEX.md            |    9 +-
 transcripts/session-03-part1.md | 1142 -------
 transcripts/session-03-part2.md | 2137 ------------
 transcripts/session-03-part3.md | 3060 -----------------
 transcripts/session-03-part4.md | 6633 -------------------------------------
 transcripts/session-03-part5.md | 6881 ---------------------------------------
 7 files changed, 4 insertions(+), 19864 deletions(-)
INDEX.md
session-02.md
session-03.md
```

</details>

The cleanup is committed locally as `125adb7`, with no Claude line. Not pushed.

1. **Repo rename: not needed.** `usama-khawaja-calculator` doesn't exist (404, "Repository not found"), and `mortgage-calculator-` still answers directly without redirecting. So the remote and the README clone commands stay as they are. If you do rename it later, tell me and I'll update both.
2. **Transcripts:**
   - Deleted `session-03-part1.md` to `part5.md`. `transcripts/` now holds `INDEX.md`, `session-02.md` and `session-03.md`.
   - The README's Transcripts table links only `session-02.md` and `session-03.md`, plus a link to `INDEX.md`.
   - Both files now carry the note exactly: "One GitHub token pasted by mistake was replaced with [REDACTED]; nothing else was changed."
   - I checked it's accurate: `session-03.md` has 8 `[REDACTED]` and no token, and `session-02.md` never contained one.
   - The raw-logs paragraph is removed from `INDEX.md`.

**Two things to check before you submit:**
- **INDEX.md says session-02 holds reviews it doesn't contain.** The table row says "Each result from session 03 was pasted back here for review", and reading-order step 3 says the same. But `session-02.md` ends at your prompt "i have exported" and has no reviews of the build steps (0 mentions of A4.1 or Future bets). Either export the fuller session-02 from its own window if it exists, or I can remove those two claims. Tell me which.
- **`session-03.md` is incomplete.** It was exported at 21:42 and ends at "this is my repo git remote add origin", so everything after that (Future stories, bets, pushes, this cleanup) is missing. Before submitting, run `/export transcripts/session-03.md` again. The new export will contain the token again, in your messages and in my push commands, so replace every occurrence with `[REDACTED]` and check that `grep -rE 'ghp_[A-Za-z0-9]{20,}' transcripts` prints nothing before committing.

Then say "push" and I'll push the cleanup and the final transcripts together.


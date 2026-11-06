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

- **Today:** A personal spreadsheet per officer, with the client's figures retyped each time.
- **What goes wrong:** Different formulas give different answers across the office. It is slow and error-prone, and clients lose trust when two officers quote different numbers.

### J-9 (Manager). Quote only what we currently offer
When our loan products or rates change, I want to quote only the products and rates we currently offer, so I can avoid promising terms we no longer provide.

- **Today:** A rate sheet is emailed around and officers type rates in by hand.
- **What goes wrong:** Old rate sheets stay in use, typing errors slip through, and a client is promised a rate the office no longer offers.

### J-10 (Manager). Leave the client with a compliant record
When a meeting with a client ends, I want to give them a record of the figures we discussed that carries the required disclaimer and the date, so they can review it at home and we stay compliant.

- **Today:** A printed spreadsheet or handwritten notes.
- **What goes wrong:** The disclaimer and date are often missing, which is a compliance risk, and handwritten figures get misread.

---

## Admin jobs

### J-11 (Admin). Make the calculations right for our office
When our office starts quoting loans in a new way, I want to set our currency, number format, standard values, allowed ranges, loan products and required wording in one place, so everyone works from the same correct settings for our market without needing a developer.

- **Today:** Maintain and distribute a master spreadsheet template.
- **What goes wrong:** Copies drift, people edit their own copy, and nobody knows which version is current.

### J-12 (Admin). Change settings without breaking things
When I change our loan products or the required wording, I want to find out immediately if I made a mistake, so I can fix it before clients or colleagues are affected.

- **Today:** Edit the shared template and email it out.
- **What goes wrong:** Mistakes in a shared template are discovered by clients or colleagues, sometimes weeks later, and a single broken formula can stop everyone from working.

### J-13 (Admin). Run our quoting at no cost and keep data in-house
When budgets are tight or policy forbids sending clients' financial details to outside companies, I want to run our loan quoting on our own machines at no cost, so I can avoid contracts and data-protection risk.

- **Today:** Pay for a vendor's quoting software or use free online calculators.
- **What goes wrong:** Vendor tools cost money and lock the office in. Free online calculators may send clients' figures to third parties.

---

## Job-to-story map

Every story serves exactly one job, and every job has at least one story. Status is tracked in [User Stories](user-stories.md).

| Job | Role | User stories |
|---|---|---|
| J-1 | Loanee | L1, L8, L9, L12 |
| J-2 | Loanee | L2 |
| J-3 | Loanee | L4, L11 |
| J-4 | Loanee | L5 |
| J-5 | Loanee | L6 |
| J-6 | Loanee | L3 |
| J-7 | Loanee | L7 |
| J-8 | Manager | M4 |
| J-9 | Manager | M1 |
| J-10 | Manager | M2, M3 |
| J-11 | Admin | A1, A2, A3 |
| J-12 | Admin | A4 |
| J-13 | Admin | A5, A6, A7 |
| J-14 | Loanee | L10 |

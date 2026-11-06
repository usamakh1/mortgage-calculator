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
  in the project root:                                                          
  - 00-product-plan.md      (product decisions, scope, calculation rules, tech  
  plan)                                                                         
  - 01-app-roles.md         (Loanee, Manager, Admin)                            
  - 02-jobs-to-be-done.md   (J1–J13)                                            
  - 03-user-stories.md      (L1–L10, M1–M4, A1–A5 with acceptance criteria)     
                                                                                
  Read all four files completely before doing anything.                         
                                                                                
  I reviewed them against the assignment rules and they need corrections. My    
  original prompt didn't                                                        
  include those rules, so here they are, quoted from the assignment.            
                                                                                
  ## Assignment rules (follow them exactly)                                     
                                                                                
  **App Roles** – format of each entry:                                         
  "A [role] is [who this person is and their situatioe and do in the app].      
  They must never [what the app must prevent]", where the last part applies.    
  "A calculator may have one role or several. Either ole describes a real       
  kind of person and explains how their needs differ from the other roles."     
                                                                                
  **Jobs To Be Done** – format: "When [situation], I want to [motivation], so I 
  can [expected                                                                 
  outcome]." Each job names the role it belongs to.                             
  "A job describes what the person needs to get done whether or not your app    
  exists, so it does not                                                        
  mention your app or its features. If a job cannot b button or a screen,       
  it is a feature, not a job."                                                  
                                                                                
  **User Stories** – format: "As a [role], I want [capability], so that         
  [benefit]." Each story names                                                  
  the job it serves and has acceptance criteria and a                           
  "Every story names the job it serves, and every job names the role it belongs 
  to. A story that                                                              
  serves no job does not belong in the list."                                   
                                                                                
  **Acceptance criteria** – "Write specific, testable behaves, preferably       
  as 'Given [starting state], when [action], then [observable result]'. Cover   
  the normal case and                                                           
  the cases where things go wrong: invalid input, bour very small numbers,      
  and what happens when the user carries on after a result or an error."        
                                                                                
  **Status** – "Mark each story Implemented or Not implemented, based on what   
  the app does today."                                                          
                                                                                
  **Example from the assignment** (a different domain, for format only):        
  - App Role: "An Office Employee is a staff member wwn meetings. They can      
    see which rooms are free and see their own bookings. They can create and    
  cancel their own                                                              
    bookings. They must never cancel another person's                           
  - Job J-1 (Office Employee): "When I need to meet colleagues in person, I     
  want to secure a suitable                                                     
    space in advance, so I can hold the meeting withoom on the day."            
  - User Story S-1 (serves J-1, Implemented): "As an Office Employee, I want to 
  see which rooms are                                                           
    free at a time I choose, so that I can book one w"                          
    - Given rooms A and B are free from 10:00 to 11:00 and room C is booked,    
  when I search for 10:00                                                       
      to 11:00, then I see rooms A and B and I do not                           
    - Given I enter an end time earlier than the start time, when I search,     
  then I see the message                                                        
      "End time must be after the start time" and no                            
                                                                                
  **Other requirements**                                                        
  - Runs in current Chrome, Edge, Firefox or Safari.                            
  - A reviewer starts it locally by following the REA, API keys or cloud        
    services.                                                                   
  - Invalid input and error cases (e.g. division by zge, never a crash or       
    a wrong result.                                                             
  - Every story marked Implemented must work in the racceptance criteria        
    describe.                                                                   
  - Time budget is 2–4 hours. "A small app that worksworth more than a          
    large one that does not." An honest "Not implemented" counts for more than  
  an overstated claim.                                                          
                                                                                
  ## Problems I found (fix all of them)                                         
                                                                                
  1. **Roles (01)**: they use "Can do / Cannot do" bullets, not the required    
  sentence format, and                                                          
     have no "must never" sentence. Rewrite each role sentence, and keep        
     the useful context below it. Suggested "must never" examples: a Loanee's   
  inputs must never be                                                          
     sent anywhere or stored outside their browser; a client a quote            
     without the disclaimer, and the client's name must never go into a share   
  link; the Admin must                                                          
     never be able to collect user data. Improve thes                           
  2. **Role differences (01)**: the permission matrix gives Loanee and Manager  
  identical ✅ on every                                                         
     row. Explain how their NEEDS differ (the Loanee nfidence; the Manager      
     needs speed, consistency between colleagues and compliance). State clearly 
  that the Admin acts                                                           
     through public/config.json and deployment, not tnd why (any login in       
     a client-side app would be fake security).                                 
  3. **Jobs contain solutions (02)**: every job has a and some job              
     statements mention features or the tool (e.g. J6 "split into principal and 
  interest", J7                                                                 
     "share exactly what I'm looking at", J11 "without the tool                 
     ourselves"). Remove all "How the app helps" lines from the jobs, and       
  rewrite every job                                                             
     statement so it describes the need without any swithout the app" /         
     "What goes wrong" context, because it describes the problem, not the       
  solution. Format each job                                                     
     heading as "J-1 (Loanee)".                                                 
  4. **Stories don't trace to jobs (03)**: add "Serves: J-x" to every story.    
  L9, L10 and M4 are                                                            
     currently not mapped to any job; map them or, if to do. Update the         
     job-to-story map at the end of 02 so every story appears and every job has 
  at least one story.                                                           
  5. **No status (03)**: add "Status: Not implementedWe will update the         
     statuses after building.                                                   
  6. **Inconsistent error messages**: the down-paymenproduct-plan §5            
     ("...There is nothing to borrow.") and L8.2. For term 0, the generic range 
  message in L8.1                                                               
     conflicts with L8.3. Choose ONE exact wording peerywhere (plan §5,         
     all stories). Then add a single "Error messages" table to 03 listing each  
  case and its exact                                                            
     text, so the tests and the app can use it as the                           
  7. **Criteria that aren't testable or aren't Given/When/Then**: rewrite L1.5, 
  L1.6, L3.1, L3.4                                                              
     ("opens correctly in common spreadsheet apps"), l target browsers")        
     and any others you find into observable, testable results.                 
  8. **Missing edge cases**: add Given/When/Then crit                           
     - boundaries: rate 30 accepted, 30.01 rejected; term 1 and 40 accepted, 0  
  and 41 rejected;                                                              
       home price at the maximum (100,000,000) acceptn payment exactly          
       equal to the price rejected                                              
     - very small values: home price 1, rate 0.001%,                            
     - very large values: maximum price with maximum term and rate (no          
  overflow, no NaN)                                                             
     - carrying on after an error: given an error is field, then the            
       message disappears and the correct results appear                        
     - carrying on after a result: given results are nput, then all             
       results and the schedule update, and nothing from the previous inputs    
  remains                                                                       
  9. **Priority conflict**: L10 is a Must but includech the plan lists as       
     a Should. Split it so priorities are consistent.                           
  10. **Check the numbers**: verify the reference valries (1,798.65;            
      1,581.59; 1,000.00; total interest ≈ 347,515; reverse calculation ≈       
  300,000) by calculating                                                       
      them, and correct any that are wrong.                                     
                                                                                
  ## Scope decision                                                             
  Add a section "Scope for this submission" to the product plan, with this      
  split and the reason                                                          
  (2–4 hour budget, and Implemented stories must pass                           
  - **Core (will build and test):** L1, L2, L3, L5, L8, M1, A1, A3, A4, A5      
  (local run, unit tests,                                                       
    build)                                                                      
  - **Stretch (only if time allows):** L4, L7, M2                               
  - **Not in this build (kept as specified future worGitHub Pages               
    deployment, the axe-core check, the 10,000-run fuzz test and the 95%        
  coverage target                                                               
  Mark the Definition of Done items we're not doing a this submission".         
  Make sure the plan's milestones (§6) and README outline (§7) match this       
  scope. The README outline                                                     
  must also include: who the app is for and why I choodel I used                
  (Claude Code, Claude Opus 5.5), any code changed by hand, and the             
  assumptions.                                                                  
                                                                                
  ## Folder layout                                                              
  Move and rename the files into the required submissnks between them:          
  - docs/product-plan.md                                                        
  - docs/app-roles.md                                                           
  - docs/jobs-to-be-done.md                                                     
  - docs/user-stories.md                                                        
  Leave the existing transcripts/ folder as it is. Don't create any app code    
  yet.                                                                          
                                                                                
  ## How to work                                                                
  1. First, give me a numbered list with your planned1–10), the scope           
     section and the folder move. Point out anything in my list you disagree    
  with, or anything else                                                        
     you notice that breaks the rules above.                                    
  2. Wait for my approval.                                                      
  3. Apply the changes, then show me the final folderper file.                  
  4. Finally, check your own work against every rule in "Assignment rules" and  
  report anything that                                                          
     still doesn't comply.                                                      

⏺ I'll start by reading all four planning documents in full.

  Read 4 files, ran 1 shell command (ctrl+o to expand)

⏺ All four files read. Now verifying the reference numbers (problem 10) before I
  draft the plan.

  Ran 1 shell command (ctrl+o to expand)

⏺ Stop Task
  ⎿  cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dab
     f32-679d-4500-9bff-d25563bd0e1f/scratchpad && cat > check.py <<'EOF'
     from decimal import De… · stopped

⏺ The loop hung, which is itself a finding (see below). Rerunning with a fixed
  number of payments, which is how the plan specifies the schedule:

  Ran 2 shell commands (ctrl+o to expand)

⏺ I've read all four files and checked the numbers. Nothing has been changed
  yet. Here's my plan, then the points where I disagree, then a few questions.

  A note on your message first

  Several lines in what you pasted are cut off mid-sentence, for example "their
  situatioe and do in the app", "a client a quote without the disclaimer", "Not
  in this build (kept as specified future wor…GitHub Pages". I could work out
  most of them. One I can't: the start of the "Not in this build" list is 
  missing. The only items I can see are GitHub Pages, axe-core, the fuzz test
  and the 95% coverage target. My guess at the rest is in question 1 at the end.

  Number check (#10)

  I recomputed everything with a script. The rounding rule I used: each month's
  interest is rounded to the cent (half-up), the payment is rounded to the cent,
  and the last payment pays off whatever is left.

  Value: 300,000 @ 6% / 30y
  Document says: 1,798.65
  Calculated: 1,798.651575 → 1,798.65
  Verdict: ✅
  ────────────────────────────────────────
  Value: 200,000 @ 5% / 15y
  Document says: 1,581.59
  Calculated: 1,581.587253 → 1,581.59
  Verdict: ✅
  ────────────────────────────────────────
  Value: 120,000 @ 0% / 10y
  Document says: 1,000.00
  Calculated: 1,000.00
  Verdict: ✅
  ────────────────────────────────────────
  Value: Total interest, 300k / 6% / 30y
  Document says: ≈ 347,515
  Calculated: 347,515.44 (last payment 1,800.09)
  Verdict: ✅ but vague. 1,798.65 × 360 gives 347,514.00, so "≈" hides a real
    difference. I'll state the exact value and the rounding rule.
  ────────────────────────────────────────
  Value: Reverse, budget 1,798.65
  Document says: ≈ 300,000
  Calculated: 299,999.74
  Verdict: ✅

  Two problems the check turned up:
  - A. Tiny loans can produce a 0.00 payment. A loan of 1 over 40 years at 0% is
    1 ÷ 480 = 0.0021, which rounds to 0.00/month. At 30% the rounded interest
    equals the rounded payment, so the balance never goes down. My first script
    used a "pay until the balance is 0" loop, and it hung on exactly this case.
    The real app will hit the same loop once extra payments are modelled (L5).
  - B. At the maximum values the last payment is large. 100,000,000 at 30% over
    40 years gives 2,500,017.80/month, but the last payment is 2,514,276.86. The
    0.3¢ rounding difference compounds over 480 months. The result is still
    correct and finite, but the criteria should say this is expected.

  Planned changes

  1. Roles (01). I'll rewrite each role in the required format: "A [role] is …
  They can … They must never …". The context bullets stay below each sentence.
  The "must never" sentences:
  - Loanee: their inputs must never leave the browser or be stored outside it.
  - Manager: must never hand over a quote that lacks the disclaimer and date,
    and a client's name must never go into a share link or storage.
  - Admin: must never be able to collect, receive or view what users enter.
    Config text must never run as code (this is what A3.2 already covers).

  2. Role differences (01). I'll replace the all-✅ matrix with a "How their
  needs differ" table:
  - the Loanee needs understanding and confidence;
  - the Manager needs speed, consistency between colleagues and compliance;
  - the Admin needs correctness without touching code.

  I'll keep a smaller matrix that only shows what is actually different. It will
  say plainly that the Admin acts through public/config.json and deployment,
  not through a screen, because any login in a client-side app would be fake
  security.

  3. Jobs (02).
  - Delete every "How the app helps" line.
  - Keep "Today, without the app" and "What goes wrong", and fill them in where
    they're missing (J6, J7, J9, J11, J13).
  - Change the headings to "J-1 (Loanee)".
  - Rewrite every job that names a solution, not only J6, J7 and J11:
    - J3 "see the options next to each other" becomes weighing the trade-offs;
    - J6 becomes understanding how much of each payment actually reduces the
      debt;
    - J7 becomes getting a second opinion on the same numbers;
    - J11 and J13 lose "tool", "code" and "host";
    - J12 "presets" becomes "our loan products or the required wording".
  - Drop the "Feature(s)" column from the map, so the jobs document mentions no
    features at all.

  4. Traceability (03, 02). Every story gets one "Serves: J-x":
  - L1→J-1, L2→J-2, L3→J-6, L4→J-3, L5→J-4, L6→J-5, L7→J-7, L8→J-1, L9→J-1 (tax
    and insurance are part of what I pay each month).
  - M1→J-9, M2→J-10, M3→J-10, M4→J-8.
  - A1→J-11, A2→J-11, A3→J-11, A4→J-12, A5→J-13.
  - L10: no job fits honestly, so I'll add J-14 (Loanee): "When I'm viewing a
    home or talking to an agent away from my desk, I want to check the numbers
    on the spot, so I can decide whether to pursue it before I leave."
  - L11 (from the split in 9) → J-3, with J-3's situation widened to "over
    several days".

  The map at the end of 02 will list every story, and every job will have at
  least one.

  5. Status. Every story gets "Status: Not implemented".

  6. Error messages.
  - Down payment: I'll use "Down payment must be less than the home price."
    everywhere and drop "There is nothing to borrow."
  - Term: one range message per field, filled in from the configured limits, so
    term 0 and term 41 get the same text: "Enter a whole number of years between
    1 and 40." This settles the L8.1/L8.3 conflict. It also adds a rule that
    doesn't exist yet: the term must be whole years (15.5 is currently
    undefined).
  - Extra payment: L5.4 "must be 0 or more" contradicts the 10,000,000 limit. It
    becomes "Enter an extra payment between 0 and 10,000,000."
  - New table in 03: a single "Error messages" table listing every case with its
    exact text. That covers the field ranges, down payment, too-small loan (A),
    results placeholder, runtime error, config banner, invalid share link, the
    comparison limit, taxes exceeding the budget, and the 0-or-below budget.

  7. Testability.
  - I'll rewrite every criterion in Given/When/Then, not just the ones you
    listed. Most of L2–L10, M1–M4 and A1–A5 currently aren't in that form.
  - L1.5 (amount ↔ % switching): "keeps the same value" is impossible as
    written. 50,000 of 350,000 is 14.2857%, which displays as 14.29, and 14.29%
    converts back to 50,015. The fix: the app stores the amount, switching only
    changes the display, and the principal stays 300,000.00.
  - L3.4 (CSV): "opens correctly" becomes concrete checks: a fixed file name, an
    exact header line, comma separators, a dot for decimals, no thousands
    separators or currency symbols, one row per payment, and values equal to the
    screen.
  - L10/M2 "target browsers": I'll name Chrome, Edge, Firefox and Safari and say
    how each is checked.
  - L2.4 payoff date: this has an off-by-one. Payoff is the month of the last
    payment, which is the first payment + n − 1 months, not start + term. The
    criterion will use a fixed date.

  8. Edge cases. I'll add G/W/T criteria for everything on your list: rate 30 ✓
  and 30.01 ✗; term 1 and 40 ✓, 0 and 41 ✗; price 100,000,000 ✓ and above it ✗;
  down payment = price ✗.
  - Very small: price 1, rate 0.001%, term 1 gives 0.08/month, last payment
    0.12, total 1.00.
  - Very large: 100,000,000 at 30% over 40 years gives 2,500,017.80, total
    1,200,022,803.06, with no NaN.
  - Carrying on: fixing a field after an error, and changing an input after a
    result (nothing stale remains).
  - Also: the 0.00-payment case from A, and a criterion that the schedule never
    runs more than n rows.

  9. L10 split. L10 "Works on my devices and browsers" stays a Must (browsers,
  360 px width, keyboard). L11 "Remember my last scenario" becomes a Should.

  10. Numbers. I'll pin exact values: 347,515.44 total interest, last payment
  1,800.09, 299,999.74 for the reverse case, and the rounding rule in plan §3.

  Scope section. I'll add the Core / Stretch / Not-in-this-build split with your
  reason. I'll mark the Definition of Done items as "Not in this submission",
  update §6 milestones to match, and update the §7 README outline with your
  extra items (who the app is for, why you chose it, Claude Code with Claude
  Opus 5.5, hand-edited code, assumptions). I'll also fix plan §1's "(see §7)",
  which should point to §8.

  Folder move. The four files become docs/product-plan.md, docs/app-roles.md,
  docs/jobs-to-be-done.md and docs/user-stories.md, with the links between them
  updated. transcripts/ stays as it is, and no app code is created.

  Where I disagree, or the scope breaks a rule

  - a. Browser support isn't in Core, but it's an assignment rule. "Runs in
    current Chrome, Edge, Firefox or Safari" is required, and L10 is in none of
    your lists. Recommendation: put L10 in Core and verify it with a manual
    check in each browser, written up in the README. That keeps Playwright out
    of scope.
  - b. M1 (Core) needs A2 (not in Core). Presets can't be picked unless they're
    defined in config. Recommendation: add A2 to Core. It's small.
  - c. A5 and A3 can't be marked Implemented if they're only partly built.
    - A5 includes Playwright e2e, the "no external requests" e2e test and GitHub
      Pages. Recommendation: keep the local run, unit tests and build in A5
      (Core), and move the rest to a new A6 (Not in this build).
    - A3.1 says "on every print", but printing is Stretch. Recommendation: limit
      A3 to the on-screen footer and move the print parts into M2 and L7.
  - d. L8.6 is "verified by fuzz tests", but the fuzz test is out of scope.
    Recommendation: verify it with the boundary and extreme-value unit tests
    from item 8.
  - e. Small-loan rule (finding A). Recommendation: if the regular payment
    rounds to 0.00, show "The loan amount is too small for this term." Every
    schedule loop is also capped at n payments.
  - f. L1 is bigger than it needs to be (optional). The amount/% switch adds
    work and risk to a Core story. You could split it into its own Could story.
  - Stretch stories L4, L7 and M2 keep their "Must" priority. Priority describes
    the product, and scope describes this submission. I'll explain the
    difference in the scope section rather than change the priorities.

  Questions before I start

  1. What's missing from the "Not in this build" list? My guess: L6, L9, L11,
     M3, M4, A2 (unless you take b), the new A6, Playwright, GitHub Pages,
     axe-core, the fuzz test and 95% coverage.
  2. Do you accept a–e (and f, if you want it)?
  3. Are you OK with adding J-14 and with the term message "Enter a whole number
     of years between 1 and 40."?

  Once you approve, I'll apply everything, show you the folder tree and a
  summary per file, and then check the result against every assignment rule.

✻ Brewed for 4m 38s · done 6:27 PM

❯ Thanks, good catches, especially the 0.00-payment hang and the payoff-date    
  off-by-one.                                                                   
  Yes, my paste was truncated. Answers:                                         
                                                                                
  1. Full "Not in this build" list: L6, L9, M3, M4, GitHub Pages, axe-core, the 
  10,000-run fuzz                                                               
     test and the 95% coverage target. With your changes below, A2 moves to     
  Core.                                                                         
  2. Decisions:                                                                 
     a. Accept. Add L10 to Core. Verify it with a manual check in Chrome, Edge, 
  Firefox and Safari,                                                           
        written up in the README. Keep a small Playwright smoke test (Chromium, 
  Firefox, WebKit) as                                                           
        Stretch, not Core.                                                      
     b. Accept. A2 goes into Core.                                              
     c. Accept both: A5 Core = local run, unit tests, build. The e2e tests, the 
  no-external-requests                                                          
        test and GitHub Pages move to Stretch / Not in this build. A3 Core =    
  on-screen footer only;                                                        
        the print parts move into M2 and L7.                                    
     d. Accept. Verify L8.6 with the boundary and extreme-value unit tests,     
  plus a simple loop                                                            
        over ~1,000 random inputs in the unit tests. Don't claim the 10,000-run 
  fuzz test.                                                                    
     e. Accept. Use exactly "The loan amount is too small for this term." and   
  cap every schedule                                                            
        loop at n rows.                                                         
     f. Accept. Move the amount/% down payment switch into its own Could story, 
  Not in this build.                                                            
        L1 takes the down payment as an amount only.                            
     Priority vs scope: agreed, keep priority as the product view and explain   
  it in the scope section.                                                      
  3. Yes to J-14 and to "Enter a whole number of years between 1 and 40."       
                                                                                
  Go ahead and apply everything, then show me the folder tree, a short summary  
  per file, and the                                                             
  final compliance check against the assignment rules                           

⏺ Skill(unsloppify)
  ⎿  Successfully loaded skill

⏺ Applying now. First I'll recheck the reference values using integer cents,
  since that's the rounding method I'll write into the plan.

  Ran 1 shell command (ctrl+o to expand)

⏺ The integer-cent method matches the earlier values except for the 200,000 @ 5%
  / 15y totals, which are 2¢ off (84,685.48), so I'll fix one rounding method
  in the plan while writing the four documents.

  Ran 1 shell command (ctrl+o to expand)

⏺ Write(docs/product-plan.md)
  ⎿  Wrote 204 lines to docs/product-plan.md
       1 # Mortgage Calculator: Product & Build Plan
       2 
       3 **Status:** Draft v1.1 · **Date:** 2026-11-06 · **Owner:** Engin
         eering
       4 
       5 Related documents:
       6 - [App Roles](app-roles.md)
       7 - [Jobs To Be Done](jobs-to-be-done.md)
       8 - [User Stories & Acceptance Criteria](user-stories.md)
       9 
     … +195 lines (ctrl+o to expand)

⏺ Write(docs/app-roles.md)
  ⎿  Wrote 86 lines to docs/app-roles.md
      1 # App Roles
      2 
      3 **Product:** Mortgage Calculator · **Version:** 1.1 · **Date:** 2
        026-11-06
      4 
      5 Related: [Product plan](product-plan.md) · [Jobs To Be Done](jobs
        -to-be-done.md) · [User Stories](user-stories.md)
      6 
      7 The app has three roles. Each one is a real kind of person with d
        ifferent needs. The Loanee and the Manager use the same screens, 
     … +80 lines (~7 KB) (ctrl+o to expand)

⏺ Write(docs/jobs-to-be-done.md)
  ⎿  Wrote 126 lines to docs/jobs-to-be-done.md
      1 # Jobs To Be Done
      2 
      3 **Product:** Mortgage Calculator · **Version:** 1.1 · **Date:** 2
        026-11-06
      4 
      5 Related: [Product plan](product-plan.md) · [App Roles](app-roles.
        md) · [User Stories](user-stories.md)
      6 
      7 Each job is written as "When [situation], I want to [motivation],
         so I can [expected outcome]." It names the role it belongs to. A
     … +120 lines (~8 KB) (ctrl+o to expand)

⏺ Writing the user stories next. I need a few more values for the new criteria,
  so computing those first:

  Ran 1 shell command (ctrl+o to expand)

⏺ Write(docs/user-stories.md)
  ⎿  Wrote 406 lines to docs/user-stories.md
       1 # User Stories with Acceptance Criteria
       2 
       3 **Product:** Mortgage Calculator · **Version:** 1.1 · **Date:** 
         2026-11-06
       4 
       5 Related: [Product plan](product-plan.md) · [App Roles](app-roles
         .md) · [Jobs To Be Done](jobs-to-be-done.md)
       6 
       7 Each story uses the form "As a [role], I want [capability], so t
         hat [benefit]." Each one names the job it serves and has accepta
     … +400 lines (~37 KB) (ctrl+o to expand)

⏺ One fix: L5.5 doesn't say which loan it applies to.

⏺ Update(docs/user-stories.md)
  ⎿  Added 1 line, removed 1 line
      132  2. Given the same loan with extra payment 400,000 (more than t
           he balance), when results appear, then the schedule has 1 row 
           with payment 301,500.00 and balance 0.00. Months saved shows 3
           59, interest saved shows 346,015.44, and no balance is negativ
           e.
      133  3. Given the extra payment is 0 or empty, when results appear,
            then every result equals the result without an extra payment 
           and the savings summary is not shown.
      134  4. Given extra payment -50, `abc` or 10,000,000.01, when I ent
           er it, then E6 appears under the field and the results area sh
           ows E8.
      135 -5. Given extra payment 10,000,000 (the maximum), when I enter 
          -it, then it is accepted and the loan ends after payment 1.    
      135 +5. Given the loan of criterion 1 with extra payment 10,000,000
          + (the maximum), when I enter it, then it is accepted, no error
          + appears, and the schedule has 1 row with payment 301,500.00 a
          +nd balance 0.00.                                              
      136  6. Given E6 is shown for extra payment -50, when I change it t
           o 200, then E6 disappears and the results of criterion 1 appea
           r.
      137  7. Given any extra payment, when the engine builds the schedul
           e, then it has at most n rows (term × 12).
      138  

  Ran 1 shell command (ctrl+o to expand)

⏺ The links all check out, and the 0[0-3]- matches are false positives. I'm
  running a traceability check next to confirm every story has Serves and Status
  and that the jobs map matches the stories.

  Ran 1 shell command (ctrl+o to expand)

⏺ Every story traces to a job of its own role, and every criterion is in
  Given/When/Then form. One last grep: do any job statements still mention the
  app or its features?

  Ran 1 shell command (ctrl+o to expand)

⏺ I've applied all the changes. The four documents are now in docs/, the old
  root files are gone, transcripts/ is untouched, and no app code was created.

  Folder tree

  Test Project Usama/
  ├── docs/
  │   ├── product-plan.md
  │   ├── app-roles.md
  │   ├── jobs-to-be-done.md
  │   └── user-stories.md
  └── transcripts/
      └── session-02.md

  What changed in each file

  product-plan.md
  - New §2.2 "Scope for this submission":
    - Core: L1, L2, L3, L5, L8, L10, M1, A1–A5.
    - Stretch: L4, L7, M2, A6.
    - Not in this build: L6, L9, L11, L12, M3, M4, A7, plus axe-core, the
      10,000-run fuzz test and the 95% coverage target.
    - It gives your reason for the cut, and says priority is the product view
      while scope is this submission.
  - §3 rounding: one rounding rule (integer cents, half-up, the last payment
    clears the balance). Every schedule loop is capped at n rows. Added the "too
    small for this term" rule and a reference table with exact values.
  - §5 error handling points to the error table in user-stories.md as the only
    place the wording lives.
  - §6 milestones now follow the scope: Core first, Stretch in order, then a
    status update at the end.
  - §7 README outline adds who the app is for, why you chose it, Claude Code
    with Claude Opus 5.5, hand-edited code and assumptions.
  - New §8 Assumptions. I fixed the broken section reference.

  app-roles.md
  - Each role is one sentence in the required format, ending in "must never".
    The context below each one is kept.
  - A new "How their needs differ" table: the Loanee needs confidence, the
    Manager needs speed, consistency and compliance, the Admin needs correctness
    without code.
  - A section on why the Admin works only through config.json and deployment.
  - The matrix now shows only the rows where the roles actually differ.

  jobs-to-be-done.md
  - Headings now read like "J-1 (Loanee)". Every "How the app helps" line is
    gone, and every job statement is rewritten so it names no solution.
  - Each job has a "Today" and a "What goes wrong" line.
  - New job J-14 (Loanee), which L10 serves.
  - The map lists all 23 stories, and every job has at least one.

  user-stories.md
  - Every story has Priority, Scope, Serves and Status (all "Not implemented").
  - The new error table has 20 entries (E1–E20), each with its exact text. The
    rules for which message wins are written down.
  - Every criterion is now in Given/When/Then form, with exact numbers, and
    covers all the edge cases you asked for.
  - Splits: L10 into L10 (Must) and L11 (Should). The amount/% switch is now L12
    (Could). A3 keeps the footer only. A5 keeps local run, unit tests and
    build, with the Playwright smoke test and the network check moved to A6
    (Stretch) and GitHub Pages to A7.
  - The Definition of Done is now a table showing which items are in this
    submission.

  Numbers

  The original reference values were correct. I pinned the exact ones: total
  interest 347,515.44, last payment 1,800.09, and 299,999.74 for the reverse
  calculation.

  The rounding method changes some totals. For 200,000 at 5% over 15 years, two
  reasonable methods differ by 2¢ (84,685.46 vs 84,685.48). The plan now
  prescribes integer cents with half-up rounding, so the TypeScript engine must
  use exactly that rule to match.

  All values come from a Python script. They get checked again once the engine
  exists.

  Compliance check against the assignment rules

  These were checked by script:
  - Format: all 23 stories have the full label line and the "As a … I want … so
    that" form.
  - Traceability: every story serves a job of its own role, every job names its
    role, the job map matches the stories exactly, and no job lacks a story.
  - Criteria: every criterion is in Given/When/Then form.
  - Error messages: all 20 IDs are used, and plan §5 contains no wording of its
    own.
  - Jobs: no job statement mentions the app or a feature (I checked for words
    like app, tool, button, screen, link, print, config).
  - Roles: each has the required sentence with a "must never", and the
    differences in needs are explained.
  - Run, browsers, errors: a local run with no keys is A5 (Core). Browser
    support is L10 (Core, manual check). Invalid input is covered by L8 plus the
    error table.

  These still don't fully comply, or need your decision:
  1. L11 wasn't in your "Not in this build" list. It also isn't in Core or
     Stretch, so I put it under Not in this build. Tell me if you meant
     otherwise.
  2. The Manager's main job, J-8, is served only by M4, which isn't built. The
     only Core Manager story is M1, and it serves J-9. That's allowed, but a
     reviewer may notice. You could move M4 to Stretch.
  3. A6 and A7 are new stories, and I chose their priorities (Should, Could).
  4. Three criteria are verified by hand, not automatically: L10.1, A1.5 and
     A5.4. They're specific, but they depend on you filling in the README
     checklist.
  5. I dropped the "line 12" example from the config error banner (A4). Browsers
     word JSON parse errors differently, so a line number couldn't be tested
     reliably.
  6. Input parsing always uses . as the decimal point, even with de-DE. This is
     written down as an assumption, but users of a comma-decimal locale would
     find it confusing.
  7. The Manager's role sentence says "once built" about printing and links.
     That's accurate today. Update it if M2 or M3 get built.

✻ Baked for 7m 15s · done 6:36 PM
❯ I checked the result and it looks good. Two small fixes:                      
                                                                                
  1. In docs/app-roles.md, each role's second sentence must start with "They    
  can …" as in the                                                              
     assignment template (now: "They enter…", "They pick…", "They set…"). Keep  
  the content, just                                                             
     use the required wording.                                                  
  2. L2.2, L3.1 and L3.2 only hold on 6 November 2026, but a reviewer will test 
  by hand on a                                                                  
     different day. Add a date-independent criterion: given today is any date,  
  the first payment is                                                          
     next month and the payoff date is 359 months after the first payment (for  
  a 30-year loan).                                                              
     Keep the fixed-date criteria for the automated tests and say so in Shared  
  definitions.                                                                  
                                                                                
  Apply both and show me the changed lines only.                                

⏺ Update(docs/app-roles.md)
  ⎿  Added 1 line, removed 1 line
      10  
      11  ## Loanee (primary)
      12  
      13 -A Loanee is a person deciding whether and how to take a home lo
         -an, such as a first-time buyer, an owner moving home or someone
         - refinancing, who is usually not financially trained and is war
         -y of entering personal details online. They enter a home price,
         - down payment, interest rate and term, then see the monthly pay
         -ment, the total interest and total paid, the payoff date and ho
         -w the balance falls month by month, and they try extra payments
         - and alternative loans before committing to anything. They must
         - never have their inputs sent off their device or stored anywhe
         -re outside their own browser.                                  
      13 +A Loanee is a person deciding whether and how to take a home lo
         +an, such as a first-time buyer, an owner moving home or someone
         + refinancing, who is usually not financially trained and is war
         +y of entering personal details online. They can enter a home pr
         +ice, down payment, interest rate and term, see the monthly paym
         +ent, the total interest and total paid, the payoff date and how
         + the balance falls month by month, and try extra payments and a
         +lternative loans before committing to anything. They must never
         + have their inputs sent off their device or stored anywhere out
         +side their own browser.                                        
      14  
      15  **Context**
      16  - Often confuses the interest rate with the total cost of the l
          oan.

⏺ Update(docs/app-roles.md)
  ⎿  Added 1 line, removed 1 line
      25  
      26  ## Manager (secondary)
      27  
      28 -A Manager is a loan officer, mortgage broker or bank branch emp
         -loyee who prepares loan quotes for several clients a day and is
         - accountable for what those quotes say. They pick one of the of
         -fice's loan products to fill in the rate and term, enter the cl
         -ient's price and down payment, and (once built) print a quote o
         -r send the client a link to the same scenario. They must never 
         -be able to give a client a quote that lacks the configured disc
         -laimer and the date it was prepared, and a client's name must n
         -ever be put into a share link or stored by the app.            
      28 +A Manager is a loan officer, mortgage broker or bank branch emp
         +loyee who prepares loan quotes for several clients a day and is
         + accountable for what those quotes say. They can pick one of th
         +e office's loan products to fill in the rate and term, enter th
         +e client's price and down payment, and (once built) print a quo
         +te or send the client a link to the same scenario. They must ne
         +ver be able to give a client a quote that lacks the configured 
         +disclaimer and the date it was prepared, and a client's name mu
         +st never be put into a share link or stored by the app.        
      29  
      30  **Context**
      31  - Time per quote matters. A slow quote means fewer clients serv
          ed.

⏺ Update(docs/app-roles.md)
  ⎿  Added 1 line, removed 1 line
      40  
      41  ## Admin (supporting)
      42  
      43 -An Admin is the person who sets up and maintains the calculator
         - for an office, typically IT staff or a technical broker, who c
         -an edit a JSON file and run `npm` commands but should not have 
         -to change code. They set the currency, locale, default values, 
         -allowed ranges, loan product presets, office name and disclaime
         -r in `public/config.json`, then run the tests and serve the bui
         -lt files. They must never be able to collect, receive or view w
         -hat users enter, and nothing they write in the config may run a
         -s code in users' browsers.                                     
      43 +An Admin is the person who sets up and maintains the calculator
         + for an office, typically IT staff or a technical broker, who c
         +an edit a JSON file and run `npm` commands but should not have 
         +to change code. They can set the currency, locale, default valu
         +es, allowed ranges, loan product presets, office name and discl
         +aimer in `public/config.json`, run the tests and serve the buil
         +t files. They must never be able to collect, receive or view wh
         +at users enter, and nothing they write in the config may run as
         + code in users' browsers.                                      
      44  
      45  **Context**
      46  - Responsible if the app shows wrong defaults, a withdrawn prod
          uct or an outdated disclaimer.

⏺ Update(docs/user-stories.md)
  ⎿  Added 1 line, removed 1 line
      16  
      17  - **Default config.** Unless a criterion says otherwise, the ap
          p runs with the built-in defaults: currency USD, locale en-US, 
          no presets, disclaimer "Estimates only. Not a loan offer or fin
          ancial advice."
      18  - **Amounts in criteria** are written without the currency symb
          ol. With the default config, "1,798.65" displays as "$1,798.65"
          .
      19 -- **Today's date.** Unless stated otherwise, today is 6 Novembe
         -r 2026, so the first payment is December 2026. In tests the dat
         -e is fixed.                                                    
      19 +- **Today's date.** The first payment is always in the month af
         +ter today. Criteria that name 6 November 2026 (first payment De
         +cember 2026) are for the automated tests, which fix the clock t
         +o that date. Criteria that say "today is any date" are for manu
         +al checks, which a reviewer can run on any day.                
      20  - **Valid ranges** (defaults, the Admin can change them):
      21  
      22    | Field | Rule | Required |

⏺ Update(docs/user-stories.md)
  ⎿  Added 1 line
      91  3. Given home price 120,000, down payment 0, rate 0 and term 10
          , when results appear, then total interest shows 0.00 and total
           paid shows 120,000.00.
      92  4. Given home price 100,000,000, down payment 0, rate 30 and te
          rm 40, when results appear, then total interest shows 1,100,022
          ,803.06 and total paid shows 1,200,022,803.06.
      93  5. Given any valid scenario (every reference case in the plan a
          nd every valid input from the random-input unit test), when the
           engine builds the schedule, then total paid equals the sum of 
          the schedule's Payment column to the cent, and total interest e
          quals the sum of its Interest column to the cent.
      94 +6. Given today is any date and a 30-year loan, when results app
         +ear, then the payoff date is 359 months after the month of the 
         +first payment, which is the month after today. For example, on 
         +15 March 2027 the payoff date is March 2057, and on 31 December
         + 2026 it is December 2056.                                     
      95  
      96  ### L3. View and export the amortization schedule
      97  **Priority:** Must · **Scope:** Core · **Serves:** J-6 · **Stat
          us:** Not implemented

⏺ Update(docs/user-stories.md)
  ⎿  Added 1 line
      107  6. Given home price 1, down payment 0, rate 0.001 and term 1, 
           when I open the schedule, then it shows 12 rows. Rows 1 to 11 
           have payment 0.08, row 12 has payment 0.12, and the last balan
           ce is 0.00.
      108  7. Given home price 100,000,000, down payment 0, rate 30 and t
           erm 40, when I open the schedule, then it shows exactly 480 ro
           ws, the last balance is 0.00, and no cell is negative, `NaN` o
           r `Infinity`.
      109  8. Given a schedule is shown, when I make any input invalid, t
           hen the schedule is replaced by E8 and no rows from the earlie
           r inputs remain on screen. When I then fix the input, then the
            schedule for the new inputs appears.
      110 +9. Given today is any date and a 30-year loan, when I open the
          + schedule, then row 1's date is the month after today and row 
          +360's date is 359 months after row 1's date. For example, on 1
          +5 March 2027 row 1 is April 2027 and row 360 is March 2057.   
      111  
      112  ### L4. Compare scenarios side by side
      113  **Priority:** Must · **Scope:** Stretch · **Serves:** J-3 · **
           Status:** Not implemented

⏺ I made both fixes. These are the changed lines.

  docs/app-roles.md (only the second sentence of each role changed)

  - Loanee: They can enter a home price, down payment, interest rate and term,
    see the monthly payment, the total interest and total paid, the payoff date
    and how the balance falls month by month, and try extra payments and
    alternative loans before committing to anything.
  - Manager: They can pick one of the office's loan products to fill in the rate
    and term, enter the client's price and down payment, and (once built) print
    a quote or send the client a link to the same scenario.
  - Admin: They can set the currency, locale, default values, allowed ranges,
    loan product presets, office name and disclaimer in public/config.json, run
    the tests and serve the built files.

  docs/user-stories.md

  Shared definitions (replaces the old "Today's date" line):

  ▎ - Today's date. The first payment is always in the month after today. 
  ▎ Criteria that name 6 November 2026 (first payment December 2026) are for the
  ▎ automated tests, which fix the clock to that date. Criteria that say "today
  ▎ is any date" are for manual checks, which a reviewer can run on any day.

  L2, new criterion 6:

  ▎ 6. Given today is any date and a 30-year loan, when results appear, then the
  ▎ payoff date is 359 months after the month of the first payment, which is 
  ▎ the month after today. For example, on 15 March 2027 the payoff date is 
  ▎ March 2057, and on 31 December 2026 it is December 2056.

  L3, new criterion 9:

  ▎ 9. Given today is any date and a 30-year loan, when I open the schedule, 
  ▎ then row 1's date is the month after today and row 360's date is 359 months 
  ▎ after row 1's date. For example, on 15 March 2027 row 1 is April 2027 and 
  ▎ row 360 is March 2057.

  The 31 December example checks the change of year. L2.2, L3.1 and L3.2 stay as
  they were, for the automated tests.

  Two other criteria only hold on 6 November 2026, and you didn't ask me to
  change them: L5.1 (payoff February 2050) and M2.1 ("Prepared on 6 November
  2026"). Under the new Shared definitions rule they now count as automated-test
  criteria. If you want, I can add matching any-date criteria for those two as
  well.

✻ Cooked for 25s · done 6:40 PM

❯ Yes, please add matching any-date criteria for L5.1 and M2.1 too. Then do a   
  final check: list                                                             
  any remaining criterion that only holds on a specific date and has no         
  any-date version.                                                             

  Ran 1 shell command (ctrl+o to expand)

⏺ The check turned up one more date-only criterion at L3.4 (1,2026-12,…), which
  I'm listing rather than changing. I'm adding L5 and M2 now, and I also found
  my own bug: with the en-US locale the long date reads "November 6, 2026", not
  "6 November 2026".

⏺ Update(docs/user-stories.md)
  ⎿  Added 1 line
      137  5. Given the loan of criterion 1 with extra payment 10,000,000
            (the maximum), when I enter it, then it is accepted, no error
            appears, and the schedule has 1 row with payment 301,500.00 a
           nd balance 0.00.
      138  6. Given E6 is shown for extra payment -50, when I change it t
           o 200, then E6 disappears and the results of criterion 1 appea
           r.
      139  7. Given any extra payment, when the engine builds the schedul
           e, then it has at most n rows (term × 12).
      140 +8. Given today is any date and the inputs of criterion 1, when
          + results appear, then the payoff date is 278 months after the 
          +month of the first payment (the 279th payment), which is the m
          +onth after today, and months saved still shows 81. For example
          +, on 15 March 2027 the payoff date is June 2050.              
      141  
      142  ### L6. Calculate what I can afford
      143  **Priority:** Should · **Scope:** Not in this build · **Serves
           :** J-5 · **Status:** Not implemented

⏺ Update(docs/user-stories.md)
  ⎿  Added 1 line, removed 1 line
      274  As a Manager, I want to print or save a branded quote as PDF, 
           so that the client leaves with an accurate, compliant summary.
      275  
      276  **Acceptance criteria**
      277 -1. Given office name "Riverside Mortgages", preset "15-year fi
          -xed" and valid inputs, when I click "Print quote", then the pr
          -int preview shows the office name, product name, all inputs, m
          -onthly payment, total interest, total paid, payoff date, "Prep
          -ared on 6 November 2026" and the configured disclaimer.       
      277 +1. Given office name "Riverside Mortgages", preset "15-year fi
          +xed" and valid inputs, when I click "Print quote", then the pr
          +int preview shows the office name, product name, all inputs, m
          +onthly payment, total interest, total paid, payoff date, "Prep
          +ared on November 6, 2026" and the configured disclaimer.      
      278  2. Given I edited a field after choosing a preset, when I prin
           t the quote, then the product name shows "Custom".
      279  3. Given no disclaimer is configured, when I print the quote, 
           then the default disclaimer "Estimates only. Not a loan offer 
           or financial advice." is printed.
      280  4. Given I type "Jane Doe" in "Prepared for", when I print, th
           en the quote shows "Prepared for: Jane Doe". When I copy a lin
           k (L7), then the URL does not contain "Jane". When I reload, t
           hen the field is empty and local storage does not contain "Jan
           e".

⏺ Update(docs/user-stories.md)
  ⎿  Added 1 line
      281  5. Given "Prepared for" contains `<b>x</b>`, when I print, the
           n the quote shows the literal text `<b>x</b>`.
      282  6. Given the quote of criterion 1 in each of Chrome, Edge, Fir
           efox and Safari, with default margins on A4 and on US Letter, 
           when I check the print preview, then it is 1 page.
      283  7. Given any input is invalid, when I look at "Print quote", t
           hen it is disabled and E17 is shown next to it as visible text
           .
      284 +8. Given today is any date, when I print the quote, then it sh
          +ows "Prepared on" followed by today's date in the configured l
          +ocale's long date format (`Intl.DateTimeFormat(locale, { dateS
          +tyle: "long" })`). For example, with the default locale en-US 
          +on 15 March 2027 it shows "Prepared on March 15, 2027".       
      285  
      286  ### M3. Send the client a ready-made scenario
      287  **Priority:** Must · **Scope:** Not in this build · **Serves:*
           * J-10 · **Status:** Not implemented

  Ran 1 shell command (ctrl+o to expand)

⏺ I've added any-date criteria for L5 and M2. Here are the changed lines in
  docs/user-stories.md.

  L5, new criterion 8:

  ▎ 8. Given today is any date and the inputs of criterion 1, when results 
  ▎ appear, then the payoff date is 278 months after the month of the first 
  ▎ payment (the 279th payment), which is the month after today, and months 
  ▎ saved still shows 81. For example, on 15 March 2027 the payoff date is 
  ▎ June 2050.

  M2, criterion 1. This fixes a mistake I made earlier: en-US, the default
  locale, writes the long date as "November 6, 2026", not "6 November 2026".

  ▎ … payoff date, "Prepared on November 6, 2026" and the configured disclaimer.

  M2, new criterion 8:

  ▎ 8. Given today is any date, when I print the quote, then it shows "Prepared 
  ▎ on" followed by today's date in the configured locale's long date format 
  ▎ (Intl.DateTimeFormat(locale, { dateStyle: "long" })). For example, with the 
  ▎ default locale en-US on 15 March 2027 it shows "Prepared on March 15, 2027".

  Final check: criteria that only hold on a specific date

  I searched all four documents for year numbers.

  ┌───────────┬────────────────────────────────┬──────────────────┐
  │ Criterion │       Date it depends on       │ Any-date version │
  ├───────────┼────────────────────────────────┼──────────────────┤
  │ L2.2      │ Payoff November 2056           │ L2.6             │
  ├───────────┼────────────────────────────────┼──────────────────┤
  │ L3.1      │ Row 1 is December 2026         │ L3.9             │
  ├───────────┼────────────────────────────────┼──────────────────┤
  │ L3.2      │ Row 360 is November 2056       │ L3.9             │
  ├───────────┼────────────────────────────────┼──────────────────┤
  │ L3.4      │ CSV line 1,2026-12,…           │ None             │
  ├───────────┼────────────────────────────────┼──────────────────┤
  │ L5.1      │ Payoff February 2050           │ L5.8             │
  ├───────────┼────────────────────────────────┼──────────────────┤
  │ M2.1      │ "Prepared on November 6, 2026" │ M2.8             │
  └───────────┴────────────────────────────────┴──────────────────┘

  L3.4 is the only one left without an any-date version. A matching criterion
  would say: on any date, row 1's CSV Date is the month after today as YYYY-MM,
  row 360's is 359 months later, and both match the on-screen schedule.

  L5.1 also never says which date it assumes. The Shared definitions rule only
  covers criteria that name 6 November 2026, and L5.1 doesn't, so its fixed date
  is only implied. Adding "and today is 6 November 2026" to L5.1 would fix
  that.

  I can make both edits if you want.

✻ Baked for 33s · done 6:42 PM

❯ Yes, make both edits (the L3.4 any-date criterion and "today is 6 November    
  2026" in L5.1).                                                               
  After that the documents are final. We won't change them again until we       
  update the statuses                                                           
  after the build.                                                              
  After this, stop polishing the docs. They're in very good shape, and the 2–4  
  hour budget should go into the build now.                                     

⏺ Update(docs/user-stories.md)
  ⎿  Added 1 line, removed 1 line
      130  As a Loanee, I want to add a fixed extra monthly payment, so t
           hat I can see how much interest and time I'd save.
      131  
      132  **Acceptance criteria**
      133 -1. Given home price 300,000, down payment 0, rate 6, term 30 a
          -nd extra payment 200, when results appear, then I see payoff d
          -ate February 2050, months saved 81 and interest saved 91,173.8
          -7. Total interest shows 256,341.57 and the schedule has 279 ro
          -ws, the last with payment 716.87 and balance 0.00.            
      133 +1. Given home price 300,000, down payment 0, rate 6, term 30, 
          +extra payment 200 and today is 6 November 2026, when results a
          +ppear, then I see payoff date February 2050, months saved 81 a
          +nd interest saved 91,173.87. Total interest shows 256,341.57 a
          +nd the schedule has 279 rows, the last with payment 716.87 and
          + balance 0.00.                                                
      134  2. Given the same loan with extra payment 400,000 (more than t
           he balance), when results appear, then the schedule has 1 row 
           with payment 301,500.00 and balance 0.00. Months saved shows 3
           59, interest saved shows 346,015.44, and no balance is negativ
           e.
      135  3. Given the extra payment is 0 or empty, when results appear,
            then every result equals the result without an extra payment 
           and the savings summary is not shown.
      136  4. Given extra payment -50, `abc` or 10,000,000.01, when I ent
           er it, then E6 appears under the field and the results area sh
           ows E8.

⏺ Update(docs/user-stories.md)
  ⎿  Added 1 line
      108  7. Given home price 100,000,000, down payment 0, rate 30 and t
           erm 40, when I open the schedule, then it shows exactly 480 ro
           ws, the last balance is 0.00, and no cell is negative, `NaN` o
           r `Infinity`.
      109  8. Given a schedule is shown, when I make any input invalid, t
           hen the schedule is replaced by E8 and no rows from the earlie
           r inputs remain on screen. When I then fix the input, then the
            schedule for the new inputs appears.
      110  9. Given today is any date and a 30-year loan, when I open the
            schedule, then row 1's date is the month after today and row 
           360's date is 359 months after row 1's date. For example, on 1
           5 March 2027 row 1 is April 2027 and row 360 is March 2057.
      111 +10. Given today is any date and a 30-year loan, when I click "
          +Download CSV", then the Date of data line 1 is the month after
          + today in `YYYY-MM` form, the Date of data line 360 is 359 mon
          +ths later, and both match the dates in the on-screen schedule.
          + For example, on 15 March 2027 they are `2027-04` and `2057-03
          +`.                                                            
      112  
      113  ### L4. Compare scenarios side by side
      114  **Priority:** Must · **Scope:** Stretch · **Serves:** J-3 · **
           Status:** Not implemented

  Ran 1 shell command (ctrl+o to expand)

⏺ I've made both edits, and the documents are now final.

  L5.1 now names the date:

  ▎ 1. Given home price 300,000, down payment 0, rate 6, term 30, extra payment 
  ▎ 200 and today is 6 November 2026, when results appear, then I see payoff 
  ▎ date February 2050, …

  L3, new criterion 10:

  ▎ 10. Given today is any date and a 30-year loan, when I click "Download CSV",
  ▎ then the Date of data line 1 is the month after today in YYYY-MM form, the 
  ▎ Date of data line 360 is 359 months later, and both match the dates in the 
  ▎ on-screen schedule. For example, on 15 March 2027 they are 2027-04 and 
  ▎ 2057-03.

  Every criterion that depends on the date now names 6 November 2026 and has an
  any-date version next to it.

  I saved a note to memory that the docs are frozen until the post-build status
  update. That way a later session will go straight to the build.

  For the build, work in the order of plan §6: the calculation engine and its
  unit tests first, then config loading, the core UI, and the browser check with
  the README. Stretch stories come only after all the Core stories pass.

✻ Brewed for 19s · done 6:45 PM
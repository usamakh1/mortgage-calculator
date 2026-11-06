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

❯ /export transcripts/session-03-part1.md                                       
  ⎿  Conversation exported to: /Users/dev/Desktop/Test Project
     Usama/transcripts/session-03-part1.md

❯ The documents are final now. Let's start building.                            
                                                                                
  Rules for the whole build                                                     
                                                                                
  - The specs in docs/ are the source of truth. If the code and the docs ever   
  disagree, stop and                                                            
    ask me; don't silently pick one. Don't edit docs/ unless I ask. Don't touch 
  transcripts/.                                                                 
  - Build only the Core scope in product-plan §2.2: L1, L2, L3, L5, L8, L10,    
  M1, A1, A2, A3                                                                
    (footer only), A4, A5. Stretch (L4, L7, M2, A6) only when I say so.         
  - Every story we later mark Implemented must pass ALL its acceptance criteria 
  exactly, including                                                            
    the exact message texts from the Error messages table.                      
  - A reviewer must be able to run it with only Node.js 20+: no paid accounts,  
  API keys, cloud                                                               
    services, or runtime network requests other than the app's own files and    
  config.json.                                                                  
  - Must work in current Chrome, Edge, Firefox and Safari.                      
  - Stack per product-plan §4: Vite + TypeScript (strUI framework,              
    Vitest for unit tests. Keep dependencies minimal.                           
  - Money in integer cents with the rounding rule in ns at most n rows.         
  - All user-facing text comes from one module, src/messages.ts, matching the   
  Error messages table.                                                         
                                                                                
  Step 1 (this message): project setup only                                     
                                                                                
  In the repository root (not inside docs/):                                    
  - package.json with scripts: dev, build, preview, test (vitest run),          
  test:watch                                                                    
  - TypeScript strict config, Vite config with base: om any folder              
  - the module layout from product-plan §4 (src/engine, src/config, src/ui,     
  src/messages.ts,                                                              
    src/main.ts, public/config.json, tests/unit)                                
  - a .gitignore excluding node_modules, dist, coverage, playwright-report,     
  test-results, .DS_Store                                                       
  - git init if it's not already a repo                                         
  - a placeholder page titled "Mortgage Calculator" and one trivial passing     
  unit test                                                                     
  - no calculator logic yet                                                     
                                                                                
  Then run npm install, npm test and npm run build, athe final tree             
  (excluding node_modules). Tell me the Node and npm versions you used.         

  Ran 1 shell command (ctrl+o to expand)

⏺ Node v22.14.0 and npm 10.9.2 are installed, and the folder isn't a git repo
  yet. Creating the setup files:
  Ran 2 shell commands (ctrl+o to expand)

⏺ Tests and build both pass. Two more checks: the build output should use
  relative paths, and the installed tools' Node requirements should match our
  "Node 20+" promise.

  Ran 1 shell command (ctrl+o to expand)

⏺ Setup is done, and npm install, npm test and npm run build all pass. But I
  found one conflict with the docs, and under your rules I'm stopping to ask
  before I fix it.

  The conflict: Node version

  The docs promise Node.js 20 or newer (A5.1, and the README outline in plan
  §7). The current tool releases installed here don't all support Node 20:

  ┌─────────────────────┬──────────────────────────────────────────────────┐
  │ Package (exact pin) │                 Node it requires                 │
  ├─────────────────────┼──────────────────────────────────────────────────┤
  │ vite 8.3.6          │ ^20.19.0 or >=22.12.0                            │
  ├─────────────────────┼──────────────────────────────────────────────────┤
  │ vitest 5.1.0        │ ^22.12.0, ^24 or >=26. Node 20 is not supported. │
  ├─────────────────────┼──────────────────────────────────────────────────┤
  │ typescript 7.0.2    │ >=16.20.0                                        │
  └─────────────────────┴──────────────────────────────────────────────────┘

  On Node 20, a reviewer could start the app with npm run dev, but npm test
  would not be supported. That breaks A5.2 as written.

  Option A (my recommendation): require Node.js 22.12 or newer. Node 20 went
  end-of-life in April 2026, so a reviewer today is likely to have 22 or 24.
  This needs one-line changes in A5.1 and plan §7, and you'd have to approve
  those doc edits.

  Option B: keep "Node.js 20 or newer" and the docs as they are. I'd pin older
  releases that still support Node 20 (Vite 6 and Vitest 3). Nothing in the docs
  changes, but we'd ship tool versions that are no longer current.

  Until you decide, package.json says "engines": { "node": ">=20" }. That isn't
  true for the test tooling right now, and I'll correct it either way.

  What was set up

  - git: initialised. No commits yet.
  - package.json: scripts dev, build (tsc --noEmit && vite build, so a type
    error fails the build), preview, test (vitest run) and test:watch. There are
    only 3 dependencies, all dev-only, pinned to exact versions.
  - tsconfig.json: strict mode plus noUncheckedIndexedAccess and
    exactOptionalPropertyTypes.
  - vite.config.ts: base: './'. I checked the build output: it references
    ./assets/…, so dist/ works from any folder.
  - Module layout from plan §4, as empty placeholder files.
    - src/messages.ts holds only the title for now. The error table texts go in
      when the engine is built.
    - public/config.json is {}.
  - index.html: a placeholder page titled "Mortgage Calculator".
  - tests/unit/setup.test.ts: one trivial test.
  - .gitignore: the entries you listed.

  Output

  npm test       → Test Files 1 passed (1) · Tests 1 passed (1)
  npm run build  → tsc OK · dist/index.html 0.33 kB · 
  dist/assets/index-BKTVG_Qt.js 0.80 kB · built in 42ms

  Tree (without node_modules and .git)

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

  Versions used

  Node v22.14.0, npm 10.9.2.

  Which option do you want, A or B? If you choose A, tell me whether I should
  make the two doc edits.

✻ Churned for 1m 29s · done 6:49 PM

❯ Option A. Require Node.js 22.12 or newer.                                     
  - Update A5.1 in docs/user-stories.md and the README outline in product-plan  
  §7 (and anywhere                                                              
    else the docs say "Node 20"), set "engines": { "node": ">=22.12.0" } in     
  package.json, and add                                                         
    an .nvmrc with 22. Show me the changed lines.                               
  - Also record this as an assumption for the README: Node 20 is end-of-life    
  and the current                                                               
    Vite/Vitest releases need Node 22.12+.                                      
                                                                                
  Then continue with Step 2: the calculation engine (src/engine/amortize.ts),   
  pure functions with                                                           
  no DOM. Follow product-plan §3 exactly: the monthly payment with the separate 
  r = 0 case, integer                                                           
  cents, half-up rounding of the payment and of each month's interest, a final  
  payment that clears                                                           
  the balance, a loop capped at n rows, an extra monthly payment (L5) that ends 
  the loan early and                                                            
  is capped at balance + interest, totals as sums of rounded rows, payoff date, 
  months and interest                                                           
  saved vs no extra, E7 when the rounded payment is 0.00, and a guard against   
  non-finite values                                                             
  (E10). The first payment date is the month after a "today" passed in as a     
  parameter (so tests can                                                       
  fix it to 6 November 2026).                                                   
                                                                                
  Before writing any engine code, list the unit test cases you'll write, taken  
  from the acceptance                                                           
  criteria of L1, L2, L3 and L5 (the exact expected values in the docs) plus    
  the §3 reference                                                              
  values. Stop after the list so I can review it.                               

  Read 1 file, ran 2 shell commands (ctrl+o to expand)

⏺ Update(docs/product-plan.md)
  ⎿  Added 1 line
      194  - The term is a whole number of years.
      195  - Default limits: home price 1 to 100,000,000; down payment 0 
           to less than the home price; interest rate 0 to 30%; term 1 to
            40 years; extra payment 0 to 10,000,000. The Admin can change
            them.
      196  - Results are estimates, not loan offers. The disclaimer says 
           so.
      197 +- The app needs Node.js 22.12 or newer to install, test and bu
          +ild. Node 20 reached end-of-life in April 2026, and the curren
          +t Vite and Vitest releases require Node 22.12+ (Vitest 5 does 
          +not support Node 20). `.nvmrc` pins major version 22 for nvm u
          +sers.                                                         
      198  
      199  ## 9. Risks and future work
      200  

  Ran 2 shell commands (ctrl+o to expand)

⏺ The Node update is done, and the test-case list for the engine is below. I
  haven't written any engine code yet.

  Node 22.12 changes

  - docs/user-stories.md, A5.1:
    1. Given a machine with only Node.js 22.12 or newer installed, when I follow
    the README …
  - docs/product-plan.md §7 README outline:
    Prerequisites: Node.js 22.12 or newer (free). Nothing else.
  - docs/product-plan.md §8 Assumptions, new line (the README copies §8):
    - The app needs Node.js 22.12 or newer to install, test and build. Node 20 
    reached end-of-life in April 2026, and the current Vite and Vitest releases 
    require Node 22.12+ (Vitest 5 does not support Node 20). .nvmrc pins major 
    version 22 for nvm users.
  - package.json: "node": ">=22.12.0"
  - .nvmrc (new file): 22

  There were no other "Node 20" mentions in the docs.

  Step 2: planned unit tests for src/engine/amortize.ts

  The engine takes the principal in cents, the annual rate in %, the term in
  years, the extra payment in cents and today. It returns either a result or { 
  error: 'E7' | 'E10' }. Range checks are not part of the engine: they belong to
  validate.ts (L8), which comes in a later step. Amounts below are in currency
  units, and the tests assert integer cents.

  A. Monthly payment (L1, plan §3)

  ┌─────┬──────────────────────┬───────────────────────────┬───────────────┐
  │  #  │        Input         │         Expected          │    Source     │
  ├─────┼──────────────────────┼───────────────────────────┼───────────────┤
  │ A1  │ Price 350,000 − down │ Loan amount 300,000.00    │ L1.1          │
  │     │  50,000              │                           │               │
  ├─────┼──────────────────────┼───────────────────────────┼───────────────┤
  │ A2  │ 300,000 @ 6% / 30y   │ 1,798.65                  │ L1.1, §3      │
  ├─────┼──────────────────────┼───────────────────────────┼───────────────┤
  │ A3  │ 200,000 @ 5% / 15y   │ 1,581.59                  │ L1.2, §3      │
  ├─────┼──────────────────────┼───────────────────────────┼───────────────┤
  │ A4  │ 120,000 @ 0% / 10y   │ 1,000.00, the r = 0       │ L1.3, §3      │
  │     │                      │ branch, no error          │               │
  ├─────┼──────────────────────┼───────────────────────────┼───────────────┤
  │ A5  │ 300,000 @ 5% / 30y   │ 1,610.46                  │ L1.5          │
  ├─────┼──────────────────────┼───────────────────────────┼───────────────┤
  │ A6  │ 1 @ 0.001% / 1y      │ 0.08                      │ L1.6, §3      │
  ├─────┼──────────────────────┼───────────────────────────┼───────────────┤
  │ A7  │ 100,000,000 @ 30% /  │ 2,500,017.80              │ L1.7, §3      │
  │     │ 40y                  │                           │               │
  ├─────┼──────────────────────┼───────────────────────────┼───────────────┤
  │ A8  │ 300,000 @ 6% / 15y   │ 2,531.57                  │ L8.16 (engine │
  │     │                      │                           │  part)        │
  ├─────┼──────────────────────┼───────────────────────────┼───────────────┤
  │ A9  │ 300,000 @ 5.75% /    │ 2,491.23                  │ M1.2 (engine  │
  │     │ 15y                  │                           │ part)         │
  └─────┴──────────────────────┴───────────────────────────┴───────────────┘

  B. Totals and final payment (L2, plan §3)

  ┌─────┬───────────┬────────────┬────────────────┬────────────────┬───────┐
  │  #  │   Input   │   Final    │ Total interest │   Total paid   │ Sourc │
  │     │           │  payment   │                │                │   e   │
  ├─────┼───────────┼────────────┼────────────────┼────────────────┼───────┤
  │ B1  │ 300,000 @ │ 1,800.09   │ 347,515.44     │ 647,515.44     │ L2.1, │
  │     │  6% / 30y │            │                │                │  §3   │
  ├─────┼───────────┼────────────┼────────────────┼────────────────┼───────┤
  │ B2  │ 200,000 @ │ 1,580.87   │ 84,685.48      │ 284,685.48     │ §3    │
  │     │  5% / 15y │            │                │                │       │
  ├─────┼───────────┼────────────┼────────────────┼────────────────┼───────┤
  │ B3  │ 120,000 @ │ 1,000.00   │ 0.00           │ 120,000.00     │ L2.3, │
  │     │  0% / 10y │            │                │                │  §3   │
  ├─────┼───────────┼────────────┼────────────────┼────────────────┼───────┤
  │     │ 1 @       │            │                │                │       │
  │ B4  │ 0.001% /  │ 0.12       │ 0.00           │ 1.00           │ §3    │
  │     │ 1y        │            │                │                │       │
  ├─────┼───────────┼────────────┼────────────────┼────────────────┼───────┤
  │     │ 100,000,0 │ 2,514,276. │ 1,100,022,803. │ 1,200,022,803. │ L2.4, │
  │ B5  │ 00 @ 30%  │ 86         │ 06             │ 06             │  §3   │
  │     │ / 40y     │            │                │                │       │
  └─────┴───────────┴────────────┴────────────────┴────────────────┴───────┘

  B6: for every case in A, B and E, total paid equals the sum of the Payment
  column, and total interest equals the sum of the Interest column, to the cent
  (L2.5).

  C. Dates (today passed in)

  ┌─────┬─────────┬──────────────┬───────────┬────────────────┬────────────┐
  │  #  │  today  │     Loan     │  First    │     Payoff     │   Source   │
  │     │         │              │  payment  │                │            │
  ├─────┼─────────┼──────────────┼───────────┼────────────────┼────────────┤
  │ C1  │ 6 Nov   │ 30y          │ Dec 2026  │ Nov 2056       │ L2.2,      │
  │     │ 2026    │              │           │                │ L3.1, L3.2 │
  ├─────┼─────────┼──────────────┼───────────┼────────────────┼────────────┤
  │ C2  │ 15 Mar  │ 30y          │ Apr 2027  │ Mar 2057       │ L2.6, L3.9 │
  │     │ 2027    │              │           │                │            │
  ├─────┼─────────┼──────────────┼───────────┼────────────────┼────────────┤
  │     │ 31 Dec  │              │           │ Dec 2056       │            │
  │ C3  │ 2026    │ 30y          │ Jan 2027  │ (change of     │ L2.6       │
  │     │         │              │           │ year)          │            │
  ├─────┼─────────┼──────────────┼───────────┼────────────────┼────────────┤
  │ C4  │ 6 Nov   │ 300k/6/30,   │ Dec 2026  │ Feb 2050       │ L5.1       │
  │     │ 2026    │ +200         │           │                │            │
  ├─────┼─────────┼──────────────┼───────────┼────────────────┼────────────┤
  │ C5  │ 15 Mar  │ 300k/6/30,   │ Apr 2027  │ Jun 2050       │ L5.8       │
  │     │ 2027    │ +200         │           │                │            │
  ├─────┼─────────┼──────────────┼───────────┼────────────────┼────────────┤
  │ C6  │ 6 Nov   │ 1y           │ Dec 2026  │ Nov 2027       │ extra case │
  │     │ 2026    │              │           │                │            │
  └─────┴─────────┴──────────────┴───────────┴────────────────┴────────────┘

  D. Schedule rows (L3)

  - D1 300,000 @ 6% / 30y, row 1: 1, Dec 2026, 1,798.65, 298.65, 1,500.00, 0.00,
    299,701.35. The schedule has 360 rows. (L3.1)
  - D2 Same loan, row 360: 360, Nov 2056, 1,800.09, 1,791.13, 8.96, 0.00, 0.00.
    (L3.2)
  - D3 Every row in every case:
    - payment = principal + interest;
    - each balance = the previous balance − principal;
    - no balance is negative;
    - every value is a finite integer number of cents.
  - D4 Yearly view of D1: 30 rows. Year 1 is 21,583.80 / 3,684.00 / 17,899.80 /
    296,316.00. Every year equals the sum of its months, and its ending balance
    equals the balance of its last month. (L3.3)
  - D5 Yearly view with extra 200: 279 rows become 24 years, and the last year
    has only 3 payments.
  - D6 1 @ 0.001% / 1y: 12 rows. Rows 1–11 are 0.08, row 12 is 0.12, and the
    last balance is 0.00. (L3.6)
  - D7 100,000,000 @ 30% / 40y: exactly 480 rows, and the last balance is 0.00.
    (L3.7)
  - D8 No schedule ever has more than n = term × 12 rows. This is checked across
    every case. (§3, L5.7)

  E. Extra payment (L5)

  ┌─────┬───────────────┬─────────────────────────────────────────┬────────┐
  │     │    Input      │                                         │        │
  │  #  │ (300,000 @ 6% │                Expected                 │ Source │
  │     │     / 30y)    │                                         │        │
  ├─────┼───────────────┼─────────────────────────────────────────┼────────┤
  │     │               │ 279 rows, last payment 716.87, balance  │        │
  │ E-1 │ Extra 200     │ 0.00, total interest 256,341.57, total  │ L5.1,  │
  │     │               │ paid 556,341.57, 81 months saved,       │ §3     │
  │     │               │ 91,173.87 interest saved                │        │
  ├─────┼───────────────┼─────────────────────────────────────────┼────────┤
  │     │               │ 1 row, payment 301,500.00, balance      │        │
  │ E-2 │ Extra 400,000 │ 0.00, 359 months saved, 346,015.44      │ L5.2   │
  │     │               │ interest saved                          │        │
  ├─────┼───────────────┼─────────────────────────────────────────┼────────┤
  │ E-3 │ Extra         │ 1 row, payment 301,500.00               │ L5.5   │
  │     │ 10,000,000    │                                         │        │
  ├─────┼───────────────┼─────────────────────────────────────────┼────────┤
  │ E-4 │ Extra 0       │ Rows and totals identical to no extra,  │ L5.3   │
  │     │               │ savings = null (not shown)              │        │
  └─────┴───────────────┴─────────────────────────────────────────┴────────┘

  F. Guards and rounding (plan §3)

  - F1 E7, payment rounds to 0.00: 1 @ 0% / 40y (L8.8). Also 0.01 @ 6% / 30y,
    and a principal of 0.
  - F2 E10, non-finite input given straight to the engine: rate NaN, principal
    Infinity, extra NaN, term 0 (the plan's n = 0 guard). Each returns E10 and
    none throws.
  - F3 The case that hung in planning: 1 @ 30% / 40y finishes with 480 rows,
    payment 0.03, final payment 1.03, total interest 14.40, total paid 15.40.
  - F4 Rounding helper: 0.5 → 1, 1.5 → 2, 2.5 → 3 (half-up, not banker's
    rounding), 2.4999999 → 2.

  These criteria don't belong to the engine, so I'll test them in the step that
  builds the code they describe:
  - CSV text (L3.4, L3.5, L3.10): ui/csv.ts;
  - display formatting (L1.7 "no exponent notation");
  - clearing results on invalid input (L3.8);
  - validation messages (L5.4, L5.6).

  Two interpretations for you to confirm

  The docs don't define either of these exactly:

  1. What the Payment and Extra payment columns hold.
     - Payment is the full amount paid that month, including the extra. Without
       that, L2.5 (total paid = sum of the Payment column) and the 556,341.57
       total wouldn't hold.
     - Extra payment = Payment − regular payment, or 0.00 if that's negative.
     - So row 1 with extra 200 shows 1,998.65 with extra 200.00, the last row
       (716.87) shows extra 0.00, and the L5.2 row (301,500.00) shows extra
       299,701.35.
  2. How today is passed in. The engine reads only the year and month of today,
     in local time. Tests will build it as new Date(2026, 10, 6), which avoids
     time-zone surprises.

  Do you approve the list and these two interpretations? Once you do, I'll write
  the tests first and then amortize.ts.

✻ Cogitated for 1m 37s · done 6:52 PM

❯ The list is complete and matches the docs. Approved, with these decisions:    
                                                                                
  1. Payment/Extra columns: approved as you described. Payment is the full      
  amount paid that month,                                                       
     and Extra = Payment − regular payment (0.00 on a reduced last row).        
  2. today: approved. Year and month in local time; tests use new Date(2026,    
  10, 6).                                                                       
                                                                                
  One change: F3 is a wrong result in disguise. A payment of 0.03 that only     
  covers the 0.03 interest                                                      
  means the balance never goes down, and then a balloon payment of 1.03 appears 
  at the end. Users                                                             
  would read that as a normal loan. Widen E7: show "The loan amount is too      
  small for this term."                                                         
  when the rounded regular payment is 0.00 OR is not greater than the first     
  month's rounded                                                               
  interest (so the balance would not go down). Update product-plan §3, the E7   
  row of the Error                                                              
  messages table and L8.8 (add F3's inputs as a second example), show me the    
  changed lines, and                                                            
  change test F3 to expect E7.                                                  
                                                                                
  Also: half-up rounding on floats can go wrong (1.005 is stored as             
  1.00499999…). Tell me how                                                     
  the rounding helper avoids this, and add a test case for it (e.g. a value     
  that should round                                                             
  half-up but whose float representation is just below .5).                     
                                                                                
  Then write the tests first, run them to see them fail, write amortize.ts, and 
  run them again.                                                               
  Show me the final test output.                                                

⏺ Updating the docs for the wider E7 rule first. I'll find the lines involved:

  Ran 1 shell command (ctrl+o to expand)

⏺ Two more places contradict the new rule: plan §5 (line 149) and plan §9 (line
  204), which calls the 1.03 balloon "correct". I'll update those too, so the
  docs don't disagree with each other.

  Ran 1 shell command (ctrl+o to expand)

⏺ Now a float trap for the interest test: a balance and rate where the exact
  interest ends in exactly .5¢ but the float product lands just below it.

  Ran 1 shell command (ctrl+o to expand)

⏺ The common rates didn't hit the trap, so I'm widening the search to every rate
  in 0.001 steps:

  Ran 1 shell command (ctrl+o to expand)

⏺ Float rounding turns a 25.00 balance at 0.72% into 1¢ instead of 2¢, since
  1.4999999999999998 rounds down under half-up. I'm writing the tests for that
  case now.

⏺ Write(tests/unit/amortize.test.ts)
  ⎿  Wrote 299 lines to tests/unit/amortize.test.ts
       1 import { describe, expect, it } from 'vitest';
       2 import {
       3   calculateLoan,
       4   monthlyPaymentCents,
       5   principalFromPrice,
       6   roundHalfUp,
       7   toYearly,
       8   type LoanInput,
       9   type LoanResult,
      10   type ScheduleRow,
     … +289 lines (ctrl+o to expand)

⏺ Tests written. Running them before any engine code exists, to see them fail:

  Ran 1 shell command (ctrl+o to expand)

⏺ The suite fails as expected: calculateLoan doesn't exist yet. Now the engine:

⏺ Write(src/engine/amortize.ts)
  ⎿  Added 283 lines, removed 2 lines
        1 -// Placeholder. Implemented in a later step (see docs/product-
          -plan.md §4).                                                  
        2 -export {};                                                    
        1 +/**                                                           
        2 + * Amortization engine. Pure functions, no DOM.               
        3 + * Implements docs/product-plan.md §3 exactly. All money is in
          + integer cents.                                               
        4 + */                                                           
        5 +                                                              
        6 +export type EngineError = 'E7' | 'E10';                       
        7 +                                                              
        8 +export interface YearMonth {                                  
        9 +  year: number;                                               
       10 +  /** 1 = January … 12 = December. */                         
       11 +  month: number;                                              
       12 +}                                                             
       13 +                                                              
       14 +export interface LoanInput {                                  
       15 +  /** Loan amount (home price − down payment) in integer cents
          +. */                                                          
       16 +  principalCents: number;                                     
       17 +  /** Annual interest rate in percent, e.g. 6 for 6%. */      
       18 +  annualRatePercent: number;                                  
       19 +  /** Whole number of years. */                               
       20 +  termYears: number;                                          
       21 +  /** Extra monthly payment in integer cents; 0 for none. */  
       22 +  extraMonthlyCents: number;                                  
       23 +  /** Only the local year and month are used. The first paymen
          +t is the month after this. */                                 
       24 +  today: Date;                                                
       25 +}                                                             
       26 +                                                              
       27 +export interface ScheduleRow extends YearMonth {              
       28 +  /** 1-based payment number. */                              
       29 +  number: number;                                             
       30 +  /** Full amount paid this month, including any extra. */    
       31 +  paymentCents: number;                                       
       32 +  principalCents: number;                                     
       33 +  interestCents: number;                                      
       34 +  /** Payment − regular payment, or 0 when the payment is a re
          +duced last payment. */                                        
       35 +  extraCents: number;                                         
       36 +  /** Balance after this payment. */                          
       37 +  balanceCents: number;                                       
       38 +}                                                             
       39 +                                                              
       40 +export interface YearRow {                                    
       41 +  /** Loan year: 1 = payments 1–12, 2 = payments 13–24, … */  
       42 +  year: number;                                               
       43 +  paymentCount: number;                                       
       44 +  paymentCents: number;                                       
       45 +  principalCents: number;                                     
       46 +  interestCents: number;                                      
       47 +  extraCents: number;                                         
       48 +  endBalanceCents: number;                                    
       49 +}                                                             
       50 +                                                              
       51 +export interface Savings {                                    
       52 +  monthsSaved: number;                                        
       53 +  interestSavedCents: number;                                 
       54 +}                                                             
       55 +                                                              
       56 +export interface LoanResult {                                 
       57 +  /** Regular monthly principal-and-interest payment, without 
          +the extra. */                                                 
       58 +  monthlyPaymentCents: number;                                
       59 +  rows: ScheduleRow[];                                        
       60 +  totalPaidCents: number;                                     
       61 +  totalInterestCents: number;                                 
       62 +  firstPayment: YearMonth;                                    
       63 +  /** Month of the last payment. */                           
       64 +  payoff: YearMonth;                                          
       65 +  /** Compared with the same loan without an extra payment; nu
          +ll when the extra is 0. */                                    
       66 +  savings: Savings | null;                                    
       67 +}                                                             
       68 +                                                              
       69 +export type CalcOutcome = { ok: true; result: LoanResult } | {
          + ok: false; error: EngineError };                             
       70 +                                                              
       71 +/** Rates are handled exactly to 6 decimal places of a percent
          + (validation allows far fewer). */                            
       72 +const RATE_SCALE = 1_000_000;                                 
       73 +                                                              
       74 +/**                                                           
       75 + * Rounds a non-negative float half-up to an integer.         
       76 + *                                                            
       77 + * Plain Math.floor(x + 0.5) fails when the float sits just be
          +low a true .5:                                                
       78 + * 1.005 × 100 is 100.49999999999999 and would round to 100. R
          +esults here come from at most a few                           
       79 + * float operations, each off by at most half an ulp, so a val
          +ue within a few ulps of .5 is                                 
       80 + * treated as exactly .5. The tolerance is relative (4 × EPSIL
          +ON × |x|), so it stays meaningful                             
       81 + * for both 0.5 cents and billions of cents, and is far smalle
          +r than any real difference in cents.                          
       82 + */                                                           
       83 +export function roundHalfUp(x: number): number {              
       84 +  const tolerance = 4 * Number.EPSILON * Math.max(1, Math.abs(
          +x));                                                          
       85 +  return Math.floor(x + 0.5 + tolerance);                     
       86 +}                                                             
       87 +                                                              
       88 +/** Exact half-up division of non-negative bigints. */        
       89 +function divideHalfUp(numerator: bigint, denominator: bigint):
          + bigint {                                                     
       90 +  return (2n * numerator + denominator) / (2n * denominator); 
       91 +}                                                             
       92 +                                                              
       93 +/** Loan amount in cents (L1.1). Validation guarantees down pa
          +yment < price. */                                             
       94 +export function principalFromPrice(priceCents: number, downPay
          +mentCents: number): number {                                  
       95 +  return priceCents - downPaymentCents;                       
       96 +}                                                             
       97 +                                                              
       98 +/**                                                           
       99 + * Regular monthly payment in cents, rounded half-up (plan §3)
          +.                                                             
      100 + * r = 0 is a separate branch because the standard formula div
          +ides by zero there.                                           
      101 + */                                                           
      102 +export function monthlyPaymentCents(principalCents: number, an
          +nualRatePercent: number, months: number): number {            
      103 +  const rateMicros = Math.round(annualRatePercent * RATE_SCALE
          +);                                                            
      104 +  if (rateMicros === 0) {                                     
      105 +    // Exact: P ÷ n, half-up.                                 
      106 +    return Number(divideHalfUp(BigInt(principalCents), BigInt(
          +months)));                                                    
      107 +  }                                                           
      108 +  const r = annualRatePercent / 12 / 100;                     
      109 +  const growth = Math.pow(1 + r, months);                     
      110 +  return roundHalfUp((principalCents * r * growth) / (growth -
          + 1));                                                         
      111 +}                                                             
      112 +                                                              
      113 +/** One month's interest in cents: balance × annual rate ÷ 120
          +0, computed exactly and rounded half-up. */                   
      114 +function monthInterestCents(balanceCents: number, rateMicros: 
          +number): number {                                             
      115 +  return Number(divideHalfUp(BigInt(balanceCents) * BigInt(rat
          +eMicros), BigInt(1200 * RATE_SCALE)));                        
      116 +}                                                             
      117 +                                                              
      118 +function addMonths(start: YearMonth, monthsToAdd: number): Yea
          +rMonth {                                                      
      119 +  const index = start.year * 12 + (start.month - 1) + monthsTo
          +Add;                                                          
      120 +  return { year: Math.floor(index / 12), month: (index % 12) +
          + 1 };                                                         
      121 +}                                                             
      122 +                                                              
      123 +interface Schedule {                                          
      124 +  rows: ScheduleRow[];                                        
      125 +  totalPaidCents: number;                                     
      126 +  totalInterestCents: number;                                 
      127 +}                                                             
      128 +                                                              
      129 +/**                                                           
      130 + * Builds the schedule. The loop runs at most `months` times: 
          +row n always clears the balance,                              
      131 + * and with an extra payment the loop stops as soon as the bal
          +ance reaches 0.                                               
      132 + */                                                           
      133 +function buildSchedule(                                       
      134 +  principalCents: number,                                     
      135 +  rateMicros: number,                                         
      136 +  months: number,                                             
      137 +  regularPaymentCents: number,                                
      138 +  extraCents: number,                                         
      139 +  firstPayment: YearMonth,                                    
      140 +): Schedule {                                                 
      141 +  const rows: ScheduleRow[] = [];                             
      142 +  let balance = principalCents;                               
      143 +  let totalPaid = 0;                                          
      144 +  let totalInterest = 0;                                      
      145 +                                                              
      146 +  for (let number = 1; number <= months && balance > 0; number
          +++) {                                                         
      147 +    const interest = monthInterestCents(balance, rateMicros); 
      148 +    const owed = balance + interest;                          
      149 +    const scheduled = regularPaymentCents + extraCents;       
      150 +    // The final row, or any row where the payment would overs
          +hoot, pays exactly what is owed.                              
      151 +    const payment = number === months || scheduled >= owed ? o
          +wed : scheduled;                                              
      152 +    const principal = payment - interest;                     
      153 +    balance -= principal;                                     
      154 +    totalPaid += payment;                                     
      155 +    totalInterest += interest;                                
      156 +    rows.push({                                               
      157 +      number,                                                 
      158 +      ...addMonths(firstPayment, number - 1),                 
      159 +      paymentCents: payment,                                  
      160 +      principalCents: principal,                              
      161 +      interestCents: interest,                                
      162 +      extraCents: Math.max(0, payment - regularPaymentCents), 
      163 +      balanceCents: balance,                                  
      164 +    });                                                       
      165 +  }                                                           
      166 +                                                              
      167 +  return { rows, totalPaidCents: totalPaid, totalInterestCents
          +: totalInterest };                                            
      168 +}                                                             
      169 +                                                              
      170 +const isWholeNonNegative = (value: number): boolean => Number.
          +isSafeInteger(value) && value >= 0;                           
      171 +                                                              
      172 +function allValuesSafe(schedule: Schedule): boolean {         
      173 +  if (!isWholeNonNegative(schedule.totalPaidCents) || !isWhole
          +NonNegative(schedule.totalInterestCents)) {                   
      174 +    return false;                                             
      175 +  }                                                           
      176 +  return schedule.rows.every(                                 
      177 +    (row) =>                                                  
      178 +      isWholeNonNegative(row.paymentCents) &&                 
      179 +      isWholeNonNegative(row.principalCents) &&               
      180 +      isWholeNonNegative(row.interestCents) &&                
      181 +      isWholeNonNegative(row.extraCents) &&                   
      182 +      isWholeNonNegative(row.balanceCents),                   
      183 +  );                                                          
      184 +}                                                             
      185 +                                                              
      186 +/**                                                           
      187 + * Calculates the full loan. Never throws.                    
      188 + * Returns E10 for inputs the engine cannot handle (non-finite
          +, negative, fractional cents, n = 0)                          
      189 + * or any non-finite or negative result; validation should pre
          +vent these from reaching it.                                  
      190 + * Returns E7 when the rounded regular payment is 0.00 or does
          + not exceed the first month's                                 
      191 + * interest, so the balance would never go down.              
      192 + */                                                           
      193 +export function calculateLoan(input: LoanInput): CalcOutcome {
      194 +  try {                                                       
      195 +    const { principalCents, annualRatePercent, termYears, extr
          +aMonthlyCents, today } = input;                               
      196 +    const months = termYears * 12;                            
      197 +    const todayTime = today.getTime();                        
      198 +                                                              
      199 +    if (                                                      
      200 +      !isWholeNonNegative(principalCents) ||                  
      201 +      !isWholeNonNegative(extraMonthlyCents) ||               
      202 +      !Number.isFinite(annualRatePercent) ||                  
      203 +      annualRatePercent < 0 ||                                
      204 +      !Number.isSafeInteger(termYears) ||                     
      205 +      termYears < 1 ||                                        
      206 +      !Number.isFinite(todayTime)                             
      207 +    ) {                                                       
      208 +      return { ok: false, error: 'E10' };                     
      209 +    }                                                         
      210 +                                                              
      211 +    const rateMicros = Math.round(annualRatePercent * RATE_SCA
          +LE);                                                          
      212 +    const regularPayment = monthlyPaymentCents(principalCents,
          + annualRatePercent, months);                                  
      213 +    if (!Number.isSafeInteger(regularPayment) || regularPaymen
          +t < 0) {                                                      
      214 +      return { ok: false, error: 'E10' };                     
      215 +    }                                                         
      216 +    if (regularPayment === 0 || regularPayment <= monthInteres
          +tCents(principalCents, rateMicros)) {                         
      217 +      return { ok: false, error: 'E7' };                      
      218 +    }                                                         
      219 +                                                              
      220 +    const firstPayment = addMonths({ year: today.getFullYear()
          +, month: today.getMonth() + 1 }, 1);                          
      221 +    const schedule = buildSchedule(principalCents, rateMicros,
          + months, regularPayment, extraMonthlyCents, firstPayment);    
      222 +    const lastRow = schedule.rows[schedule.rows.length - 1];  
      223 +    if (!lastRow || lastRow.balanceCents !== 0 || !allValuesSa
          +fe(schedule)) {                                               
      224 +      return { ok: false, error: 'E10' };                     
      225 +    }                                                         
      226 +                                                              
      227 +    let savings: Savings | null = null;                       
      228 +    if (extraMonthlyCents > 0) {                              
      229 +      const baseline = buildSchedule(principalCents, rateMicro
          +s, months, regularPayment, 0, firstPayment);                  
      230 +      savings = {                                             
      231 +        monthsSaved: baseline.rows.length - schedule.rows.leng
          +th,                                                           
      232 +        interestSavedCents: baseline.totalInterestCents - sche
          +dule.totalInterestCents,                                      
      233 +      };                                                      
      234 +      if (!isWholeNonNegative(savings.monthsSaved) || !isWhole
          +NonNegative(savings.interestSavedCents)) {                    
      235 +        return { ok: false, error: 'E10' };                   
      236 +      }                                                       
      237 +    }                                                         
      238 +                                                              
      239 +    return {                                                  
      240 +      ok: true,                                               
      241 +      result: {                                               
      242 +        monthlyPaymentCents: regularPayment,                  
      243 +        rows: schedule.rows,                                  
      244 +        totalPaidCents: schedule.totalPaidCents,              
      245 +        totalInterestCents: schedule.totalInterestCents,      
      246 +        firstPayment,                                         
      247 +        payoff: { year: lastRow.year, month: lastRow.month }, 
      248 +        savings,                                              
      249 +      },                                                      
      250 +    };                                                        
      251 +  } catch (error) {                                           
      252 +    console.error('Mortgage engine failed', error, input);    
      253 +    return { ok: false, error: 'E10' };                       
      254 +  }                                                           
      255 +}                                                             
      256 +                                                              
      257 +/** Groups monthly rows into loan years (L3.3). The last year 
          +may have fewer than 12 payments. */                           
      258 +export function toYearly(rows: ScheduleRow[]): YearRow[] {    
      259 +  const years: YearRow[] = [];                                
      260 +  for (const row of rows) {                                   
      261 +    const yearNumber = Math.ceil(row.number / 12);            
      262 +    let year = years[yearNumber - 1];                         
      263 +    if (!year) {                                              
      264 +      year = {                                                
      265 +        year: yearNumber,                                     
      266 +        paymentCount: 0,                                      
      267 +        paymentCents: 0,                                      
      268 +        principalCents: 0,                                    
      269 +        interestCents: 0,                                     
      270 +        extraCents: 0,                                        
      271 +        endBalanceCents: 0,                                   
      272 +      };                                                      
      273 +      years.push(year);                                       
      274 +    }                                                         
      275 +    year.paymentCount += 1;                                   
      276 +    year.paymentCents += row.paymentCents;                    
      277 +    year.principalCents += row.principalCents;                
      278 +    year.interestCents += row.interestCents;                  
      279 +    year.extraCents += row.extraCents;                        
      280 +    year.endBalanceCents = row.balanceCents;                  
      281 +  }                                                           
      282 +  return years;                                               
      283 +}                                                             

⏺ Adding the E7 and E10 texts to src/messages.ts, so the engine's error IDs map
  to the exact table wording:

⏺ Write(src/messages.ts)
  ⎿  Added 6 lines, removed 1 line
       1  /**
       2   * Every user-facing text in the app lives here.
       3   * Error texts must match the Error messages table in docs/user
          -stories.md exactly.
       4 - * The table is added in a later step.                         
       4 + * The remaining entries (E1–E6, E8, E9, E11–E20) are added wit
         +h the steps that use them.                                     
       5   */
       6  export const APP_TITLE = 'Mortgage Calculator';
       7 +                                                               
       8 +export const MESSAGES = {                                      
       9 +  E7: 'The loan amount is too small for this term.',           
      10 +  E10: 'Could not calculate this loan. Please check your inputs
         +.',                                                            
      11 +} as const;                                                    

  Ran 1 shell command (ctrl+o to expand)

⏺ One test fails: the last row pays 1,800.09 against a regular payment of
  1,798.65, so the 1.44 is rounding, not an extra payment, and the rule as
  written would wrongly put it in the Extra column. I'll cap Extra at the extra
  payment actually entered, which matches every case we discussed and fixes that
  row, and I'll ask you to confirm it in my report.

⏺ Update(src/engine/amortize.ts)
  ⎿  Added 3 lines, removed 1 line
      159        paymentCents: payment,
      160        principalCents: principal,
      161        interestCents: interest,
      162 -      extraCents: Math.max(0, payment - regularPaymentCents), 
      162 +      // Capped at the entered extra, so a final rounding adju
          +stment (e.g. 1,800.09 vs 1,798.65)                            
      163 +      // is not reported as an extra payment (L3.2).          
      164 +      extraCents: Math.min(extraCents, Math.max(0, payment - r
          +egularPaymentCents)),                                         
      165        balanceCents: balance,
      166      });
      167    }

⏺ Update(src/engine/amortize.ts)
  ⎿  Added 1 line, removed 1 line
      31    paymentCents: number;
      32    principalCents: number;
      33    interestCents: number;
      34 -  /** Payment − regular payment, or 0 when the payment is a red
         -uced last payment. */                                          
      34 +  /** min(entered extra, Payment − regular payment), never belo
         +w 0. 0 on a reduced last payment. */                           
      35    extraCents: number;
      36    /** Balance after this payment. */
      37    balanceCents: number;

  Ran 1 shell command (ctrl+o to expand)

⏺ All 50 tests pass. The A and B test names print wrong ("→ NaN"), though:
  vitest doesn't treat %% as an escaped percent sign, so every placeholder after
  it shifts by one. Fixing the names:
  Ran 1 shell command (ctrl+o to expand)

⏺ The engine is written and all 50 tests pass, but I changed one rule we agreed
  on and need you to confirm it. Details are in "Please confirm" below.

  Doc changes for the wider E7 rule

  - product-plan.md §3:
  ▎ - Loan too small for the term. If the rounded regular payment is 0.00, or is
  not greater than the first month's rounded interest (so the balance would 
  never go down and the final payment would be a balloon), the app shows "The 
  loan amount is too small for this term." and no results. Examples: a loan of 1
  over 40 years at 0% (payment 0.00), and a loan of 1 over 40 years at 30% 
  (payment 0.03, first month's interest 0.03).
  - user-stories.md, E7 row:
  ▎ | E7 | All fields valid but the rounded monthly payment is 0.00, or is not 
  greater than the first month's rounded interest | The loan amount is too small
  for this term. | Results area | L8 |
  - user-stories.md, L8.8:
  ▎ 8. Given home price 1, down payment 0, rate 0 and term 40 (payment 0.00), or
  home price 1, down payment 0, rate 30 and term 40 (payment 0.03, first 
  month's interest 0.03), when I enter them, then the results area shows E7 and 
  no payment is shown.

  Two other lines would have contradicted the new rule, so I updated them too:
  - product-plan.md §5: | Regular payment rounds to 0.00, or is not greater than
    the first month's interest | "The loan amount is too small for this term." 
    (E7). |
  - product-plan.md §9: the "Tiny loans" risk no longer says the 1.03 balloon is
    "correct". It now says the app rejects that loan with E7.

  The maximum-value case still passes the new rule: a payment of 2,500,017.80
  against first-month interest of 2,500,000.00.

  How rounding avoids the 1.005 problem

  There are two techniques, depending on where the number comes from:

  - Monthly interest uses exact integer arithmetic, with no floats at all. The
    rate is converted once to an integer number of millionths of a percent.
    Interest is then balanceCents × rateMicros ÷ 1,200,000,000, computed with
    BigInt and rounded half-up exactly: (2·num + den) ÷ (2·den). The 0% payment
    (P ÷ n) uses the same method.
  - The regular payment is a float, because the formula needs (1 + r)^n. For
    that, roundHalfUp adds a small tolerance relative to the size of the value
    (4 × Number.EPSILON × |x|) before rounding down. A value a few float steps
    below .5 is treated as exactly .5, at any size from 0.5¢ to billions of
    cents. The tolerance is far smaller than any real 1¢ difference.

  Tests that cover this:
  - F5: 1.005 × 100 = 100.49999999999999 rounds to 101. And 25.00 at 0.72%: the
    exact interest is 1.5¢, the float product is 1.4999999999999998, and it
    rounds to 2.
  - F6: a 25.00 loan at 0.72% is charged 0.02 interest in month 1, where naive
    float rounding would charge 0.01. I found this case by searching every rate
    in 0.001% steps.

  Please confirm: Extra payment column (decision 1)

  The first test run turned up a conflict with L3.2. A loan with no extra
  payment has a last payment of 1,800.09 against a regular payment of 1,798.65.
  The rule "Extra = Payment − regular payment" would show 1.44 in the Extra
  column, but L3.2 says 0.00. That 1.44 is the rounding adjustment, not an extra
  payment.

  The docs win, so the code now uses Extra = min(entered extra, max(0, Payment −
  regular payment)). This gives the same result as your rule in every case we
  discussed:
  - 200.00 on a normal row;
  - 0.00 on the reduced 716.87 last row;
  - 299,701.35 in the L5.2 row.

  Please confirm this rule. If you want, I'll write it into user-stories.md as
  well.

  Final test output

   ✓ setup.test.ts › exposes the app title from the messages module
   ✓ A1–A9   Monthly payment (L1, §3)                     9 tests
   ✓ B1–B6   Totals and final payment (L2, §3)            6 tests
   ✓ C1–C6   Dates, first payment = month after today     6 tests
   ✓ D1–D8   Schedule rows and yearly view (L3)           8 tests
   ✓ E-1–E-4 Extra payment (L5)                           4 tests
   ✓ F1–F6   E7, E10, rounding and float traps (§3)      16 tests

   Test Files  2 passed (2)
        Tests  50 passed (50)
  The type check and npm run build pass as well.

  The first run went like this:
  - Before amortize.ts existed, the suite failed with TypeError: calculateLoan 
    is not a function.
  - After I wrote the engine, D2 failed because of the Extra column issue above,
    and I fixed it.
  - The A/B test names were also printing wrongly (vitest doesn't treat %% as an
    escaped percent sign). I fixed the names; the assertions were already
    correct.

  Files

  - src/engine/amortize.ts exports calculateLoan, monthlyPaymentCents,
    principalFromPrice, roundHalfUp and toYearly, plus their types.
    calculateLoan never throws: it returns either a result or { ok: false, 
    error: 'E7' | 'E10' }.
  - src/messages.ts now has the exact E7 and E10 texts.
  - tests/unit/amortize.test.ts has 49 tests; the one setup test makes 50.

  Next is Step 3: validation and input parsing (L8). Once you've confirmed the
  Extra column rule, I'll list the test cases for it, the same way as for the
  engine.

✻ Churned for 3m 43s · done 6:57 PM

❯ /export transcripts/session-03-part2.md                                       
  ⎿  Conversation exported to: /Users/dev/Desktop/Test Project
     Usama/transcripts/session-03-part2.md

❯ Approved: Extra = min(entered extra, max(0, Payment − regular payment)). The  
  1.44 is a rounding                                                            
  adjustment, not an extra payment. Good catch. Write the rule into             
  user-stories.md (Shared                                                       
  definitions, or L3 where the columns are defined) and show me the line.       
                                                                                
  Then make a first git commit of everything so far (docs, setup, engine,       
  tests), with a short                                                          
  clear message.                                                                
                                                                                
  Step 3: input parsing and validation (src/engine/parse.ts and validate.ts),   
  for story L8 plus the                                                         
  validation parts of L5 (E6) and the Error messages DOM.                       
  - Limits come in as a parameter (they will come from config in step 4); use   
  the defaults from                                                             
    Shared definitions in the tests. Range numbers inlimits, formatted          
    for the locale.                                                             
  - Parsing: trim spaces; accept thousands separatorsa trailing "%" only        
    in the rate field; reject "abc", "1e400", "1e5", "--5", and "6.5%" in money 
  fields.                                                                       
    Empty down payment or extra payment = 0; empty rer.                         
  - Term must be a whole number of years.                                       
  - Order of checks as in the docs: each field on itsrice and down payment      
    are each valid; E7 only when every field is valid (the engine decides       
  that).                                                                        
  - Return per-field error IDs and the exact texts frthrow.                     
                                                                                
  Before writing code, list the test cases from L8 (1undaries, the same         
  way you did for the engine. Also list any input whose handling the docs DON'T 
  define (for example                                                           
  more than 2 decimals in a money field, "1.500.000",icode digits, or           
  "6.5 %"). Don't decide those yourself; propose a rule and I'll choose.        
  Stop after the list.                                                          

  Ran 2 shell commands (ctrl+o to expand)

⏺ No git identity is set on this machine, so for this commit I'll pass your
  email and the name "Usama Khawaja" (a guess from your address) on the command
  line without saving any config, and I'll show you how to change it.

  Ran 1 shell command (ctrl+o to expand)
  ⎿  Interrupted · What should Claude do instead?

❯ no need to do anything relted to git, just focus on implementation accordin   
  to the above prompt                                                           

⏺ Understood, no more git. One thing you should know: the commit had already
  gone through before you interrupted. It's 81c6072, with author "Usama Khawaja
  usamakhawaja.44@gmail.com" (the name was my guess), and transcripts/ is not in
  it. I'll leave git alone from now on. If you'd rather not have the commit,
  run rm -rf .git yourself and it's gone.

  Extra column rule, added to user-stories.md Shared definitions

  ▎ - Schedule columns. Payment is the full amount paid that month, including 
  ▎ any extra. Extra payment = min(entered extra, max(0, Payment − regular 
  ▎ payment)). So a reduced last payment shows 0.00, and a final rounding 
  ▎ adjustment (for example 1,800.09 against a regular 1,798.65) is not an extra
  ▎ payment.

  Step 3: planned tests for parse.ts and validate.ts

  Parts of your message were cut off again. I've assumed:
  - the range numbers in messages come from the limits;
  - an empty home price, rate or term is an error;
  - no DOM in either module;
  - the tests cover L8.1–17 plus the boundaries.

  The API I have in mind: validateInputs(raw, limits, locale) never throws. It
  returns either { ok: true, values } (amounts in cents) or { ok: false, errors 
  }, where each invalid field gets { id, text } and the text comes from
  messages.ts.

  P. Parsing

  ┌─────┬────────────┬─────────────────┬──────────────────┬───────────────┐
  │  #  │   Field    │      Input      │     Expected     │    Source     │
  ├─────┼────────────┼─────────────────┼──────────────────┼───────────────┤
  │ P1  │ Home price │ 1,500,000       │ 1,500,000        │ L8.6          │
  ├─────┼────────────┼─────────────────┼──────────────────┼───────────────┤
  │ P2  │ Rate       │ 6.5             │ 6.5              │ L8.6          │
  ├─────┼────────────┼─────────────────┼──────────────────┼───────────────┤
  │ P3  │ Rate       │ 6.5%            │ 6.5              │ L8.6          │
  ├─────┼────────────┼─────────────────┼──────────────────┼───────────────┤
  │ P4  │ Home price │ abc, 1e400,     │ E1               │ L8.7          │
  │     │            │ 1e5, --5, 6.5%  │                  │               │
  ├─────┼────────────┼─────────────────┼──────────────────┼───────────────┤
  │     │ Down       │                 │                  │ % is allowed  │
  │ P5  │ payment /  │ 6.5%            │ E2 / E6          │ in the rate   │
  │     │ extra      │                 │                  │ only          │
  ├─────┼────────────┼─────────────────┼──────────────────┼───────────────┤
  │     │            │  350000 ,       │ 35,000,000 /     │               │
  │ P6  │ Home price │ 350000.50, 0.01 │ 35,000,050 / 1   │ trim, cents   │
  │     │            │                 │ cent             │               │
  ├─────┼────────────┼─────────────────┼──────────────────┼───────────────┤
  │     │            │ %, 6.5%%,       │                  │               │
  │ P7  │ Rate       │ Infinity, NaN,  │ E4               │               │
  │     │            │ 0x10            │                  │               │
  └─────┴────────────┴─────────────────┴──────────────────┴───────────────┘

  V. Empty and required fields (L8.1, L8.2)

  ┌─────┬─────────────────────────────────┬───────────────┐
  │  #  │              Input              │   Expected    │
  ├─────┼─────────────────────────────────┼───────────────┤
  │ V1  │ Home price empty or abc         │ E1            │
  ├─────┼─────────────────────────────────┼───────────────┤
  │ V2  │ Rate empty                      │ E4            │
  ├─────┼─────────────────────────────────┼───────────────┤
  │ V3  │ Term empty                      │ E5            │
  ├─────┼─────────────────────────────────┼───────────────┤
  │ V4  │ Down payment empty, extra empty │ Both 0, valid │
  ├─────┼─────────────────────────────────┼───────────────┤
  │ V5  │ Only spaces in any field        │ Same as empty │
  └─────┴─────────────────────────────────┴───────────────┘

  R. Field rules and order of checks

  ┌─────┬───────────────────────────────────┬───────────────────┬───────────┐
  │  #  │               Input               │     Expected      │  Source   │
  ├─────┼───────────────────────────────────┼───────────────────┼───────────┤
  │ R1  │ Down payment -1                   │ E2                │ L8.4      │
  ├─────┼───────────────────────────────────┼───────────────────┼───────────┤
  │ R2  │ Term 15.5                         │ E5                │ L8.5      │
  ├─────┼───────────────────────────────────┼───────────────────┼───────────┤
  │ R3  │ Price 300,000 with down 300,000,  │ E3 on the down    │ L8.3      │
  │     │ and with down 300,001             │ payment           │           │
  ├─────┼───────────────────────────────────┼───────────────────┼───────────┤
  │     │ Price abc + down 50,000 → only    │ No E3 when either │ Order of  │
  │ R4  │ E1. Price 300,000 + down -1 →     │  field is invalid │ checks    │
  │     │ only E2                           │                   │           │
  ├─────┼───────────────────────────────────┼───────────────────┼───────────┤
  │ R5  │ Price and rate both invalid       │ E1 and E4, each   │ L8.9      │
  │     │                                   │ on its own field  │           │
  ├─────┼───────────────────────────────────┼───────────────────┼───────────┤
  │ R6  │ Extra -50, abc, 10,000,000.01     │ E6                │ L5.4      │
  ├─────┼───────────────────────────────────┼───────────────────┼───────────┤
  │ R7  │ Extra 10,000,000                  │ Valid             │ L5.5      │
  └─────┴───────────────────────────────────┴───────────────────┴───────────┘

  B. Boundaries

  ┌─────┬──────────┬─────────────────────────┬─────────────────────┬────────┐
  │  #  │  Field   │        Accepted         │      Rejected       │ Source │
  ├─────┼──────────┼─────────────────────────┼─────────────────────┼────────┤
  │ B1  │ Rate     │ 0, 0.001, 30            │ 30.01, -0.01 → E4   │ L8.10  │
  ├─────┼──────────┼─────────────────────────┼─────────────────────┼────────┤
  │ B2  │ Term     │ 1, 40                   │ 0, 41 → E5          │ L8.11  │
  ├─────┼──────────┼─────────────────────────┼─────────────────────┼────────┤
  │ B3  │ Home     │ 1, 100,000,000          │ 0, 0.99,            │ L8.12  │
  │     │ price    │                         │ 100,000,000.01 → E1 │        │
  ├─────┼──────────┼─────────────────────────┼─────────────────────┼────────┤
  │ B4  │ Down     │ 0; 299,000 with price   │                     │ L8.13  │
  │     │ payment  │ 300,000 (loan 1,000.00) │                     │        │
  └─────┴──────────┴─────────────────────────┴─────────────────────┴────────┘

  M. Message texts and limits
  - M1: each of E1–E6 returns its exact text from the table, for example "Enter
    a home price between 1 and 100,000,000."
  - M2: custom limit, rate max 15 → "Enter an interest rate between 0 and 15."
    (A1.3)
  - M3: locale de-DE → "Enter a home price between 1 and 100.000.000."
  - M4: a limit with decimals, rate max 7.5 → "…between 0 and 7.5."

  I. Hand-off to the engine
  - I1 (L8.14, carrying on): rate 31 → E4. The same inputs with rate 6 → no
    errors, and the engine gives 1,798.65.
  - I2 (L8.8): price 1 / 0 / 30 / 40 passes validation, then the engine returns
    E7.
  - I3 (L8.17): a fixed-seed loop over about 1,000 random inputs: random
    strings, the boundary values, and values just inside and just outside every
    limit. For each one:
    - validateInputs never throws;
    - every error ID is in the table;
    - every valid set gives either an engine result or E7, never E10, NaN or a
      negative value.

  These belong to the UI step, not this one: L8.15 (results cleared → E8), L8.18
  (ARIA attributes) and L8.19/20 (E9/E10 on screen).

  Inputs the docs don't define: please choose

  For each one I've given the rule I propose.

  #: U1
  Input: More than 2 decimals in money, 100.123
  Proposed rule: Reject with the field's message; never round silently
  Alternative: Round to cents
  ────────────────────────────────────────
  #: U2
  Input: 1.500.000 (dot as thousands separator)
  Proposed rule: Reject. . is always the decimal point (plan §8)
  Alternative: —
  ────────────────────────────────────────
  #: U3
  Input: Commas not in groups of 3: 1,50,000, 1,5, 6,5
  Proposed rule: Reject. Commas only as 1,234,567, so 6,5 gives E4 rather than
    being read as 65
  Alternative: Also accept lakh grouping 1,50,000. Worth considering, since PKR
    is a currency example in A1
  ────────────────────────────────────────
  #: U4
  Input: Non-ASCII digits (٣٠٠٠٠٠, full-width ３００)
  Proposed rule: Reject
  Alternative: Convert to ASCII digits
  ────────────────────────────────────────
  #: U5
  Input: 6.5 % (space before %)
  Proposed rule: Accept in the rate field
  Alternative: Reject
  ────────────────────────────────────────
  #: U6
  Input: .5 and 5.
  Proposed rule: Accept as 0.5 and 5
  Alternative: Reject
  ────────────────────────────────────────
  #: U7
  Input: A sign: +5, -0
  Proposed rule: Reject with the field's message. Negative numbers already
    produce the same message (E2/E4/E6), so nothing is lost
  Alternative: Parse the sign, then range-check
  ────────────────────────────────────────
  #: U8
  Input: Leading zeros, 007
  Proposed rule: Accept as 7
  Alternative: Reject
  ────────────────────────────────────────
  #: U9
  Input: Rate with more than 3 decimals, 6.12345
  Proposed rule: Reject, E4 (0.001 is the smallest step in the docs)
  Alternative: Accept up to 6 (what the engine handles exactly)
  ────────────────────────────────────────
  #: U10
  Input: Term 15.0 or 15.
  Proposed rule: Accept as 15
  Alternative: Reject as not whole
  ────────────────────────────────────────
  #: U11
  Input: Space as thousands separator, 1 500 000
  Proposed rule: Reject
  Alternative: Accept
  ────────────────────────────────────────
  #: U12
  Input: Down payment above the price limit while the price is valid, e.g.
    200,000,000 with price 300,000
  Proposed rule: E3 only. The down payment has no maximum of its own
  Alternative: —
  ────────────────────────────────────────
  #: U13
  Input: When field messages appear: L8.1 says "when I leave the field", but
    results recalculate on every input
  Proposed rule: Messages on blur (or once the field has been edited and left).
    The results area switches to E8 as you type
  Alternative: Messages as you type

  U13 belongs to the UI step, but I'm raising it now because it decides how the
  L8 tests are worded.

  Tell me your choice for U1–U13, or "proposals as listed", and I'll write the
  tests first, run them to see them fail, and then write the code.

✻ Cogitated for 58s · done 7:00 PM

❯ Proposals as listed for U1–U12. For U13: a field's message appears when I     
  leave the field,                                                              
  but disappears as soon as the value becomes valid while typing. The results   
  area switches to                                                              
  E8 immediately on any invalid input.                                          
                                                                                
  Write these input rules into user-stories.md (Shared definitions, as an       
  "Input rules" list)                                                           
  so the docs match the code, and show me the lines.                            
                                                                                
  No git commands from now on; I'll handle git myself.                          
                                                                                
  Then write the tests first, run them to see them fail, write parse.ts and     
  validate.ts, and                                                              
  run all tests. Show me the final output.                                      

⏺ Writing the input rules into Shared definitions first, right after the Valid
  ranges table:

  Ran 2 shell commands (ctrl+o to expand)

⏺ Now the tests, written before the code. First parse.test.ts:

⏺ Write(tests/unit/parse.test.ts)
  ⎿  Wrote 103 lines to tests/unit/parse.test.ts
       1 import { describe, expect, it } from 'vitest';
       2 import { parseField, type FieldKind } from '../../src/engine/par
         se';
       3 
       4 const value = (raw: string, kind: FieldKind) => parseField(raw, 
         kind);
       5 const okValue = (n: number) => ({ kind: 'ok', value: n });
       6 const INVALID = { kind: 'invalid' };
       7 const EMPTY = { kind: 'empty' };
       8 
     … +95 lines (ctrl+o to expand)

⏺ I'm changing the last test so the parser rejects values beyond the
  safe-integer range instead of returning Infinity, which keeps the same field
  message and stops non-finite values from leaving the parser.

⏺ Update(tests/unit/parse.test.ts)
  ⎿  Added 4 lines, removed 2 lines
       97      expect(value('15.5', 'term')).toEqual(INVALID);
       98    });
       99  
      100 -  it('very long digit strings parse without throwing and are l
          -eft to the range check', () => {                              
      101 -    expect(value('9'.repeat(400), 'money')).toEqual({ kind: 'o
          -k', value: Number.POSITIVE_INFINITY });                       
      100 +  it('very long digit strings are rejected without throwing; n
          +o non-finite value leaves the parser', () => {                
      101 +    expect(value('9'.repeat(400), 'money')).toEqual(INVALID); 
      102 +    expect(value('9'.repeat(400), 'rate')).toEqual(INVALID);  
      103 +    expect(value('9'.repeat(400), 'term')).toEqual(INVALID);  
      104    });
      105  });

⏺ Now validate.test.ts:

⏺ Write(tests/unit/validate.test.ts)
  ⎿  Wrote 298 lines to tests/unit/validate.test.ts
       1 import { describe, expect, it } from 'vitest';
       2 import { calculateLoan } from '../../src/engine/amortize';
       3 import { validateInputs, type Limits, type RawInputs, type Valid
         ationOutcome } from '../../src/engine/validate';
       4 import { DEFAULT_LIMITS } from '../../src/config/defaults';
       5 
       6 const TODAY = new Date(2026, 10, 6);
       7 
       8 /** Default case from L1.1: 350,000 / 50,000 / 6 / 30, no extra.
          */
     … +290 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ All 86 new tests fail as expected (parseField is not a function). Now the
  implementation: parse.ts, validate.ts, the default limits, and the E1–E6
  texts.

⏺ Write(src/engine/parse.ts)
  ⎿  Added 63 lines, removed 2 lines
       1 -// Placeholder. Implemented in a later step (see docs/product-p
         -lan.md §4).                                                    
       2 -export {};                                                     
       1 +/**                                                            
       2 + * Reads the text of one number field. Pure, no DOM, never thro
         +ws.                                                            
       3 + * Implements the "Input rules" in docs/user-stories.md (Shared
         + definitions).                                                 
       4 + */                                                            
       5 +                                                               
       6 +/** money: home price, down payment, extra payment. rate: inter
         +est rate in %. term: years. */                                 
       7 +export type FieldKind = 'money' | 'rate' | 'term';             
       8 +                                                               
       9 +export type ParseResult =                                      
      10 +  | { kind: 'empty' }                                          
      11 +  | { kind: 'invalid' }                                        
      12 +  /** money → integer cents; rate → percent (e.g. 6.5); term → 
         +whole years. */                                                
      13 +  | { kind: 'ok'; value: number };                             
      14 +                                                               
      15 +const EMPTY: ParseResult = { kind: 'empty' };                  
      16 +const INVALID: ParseResult = { kind: 'invalid' };              
      17 +                                                               
      18 +/**                                                            
      19 + * Integer part: plain digits, or 1–3 digits followed by groups
         + of ",ddd" (rule 3).                                           
      20 + * Optional fraction after ".". Only ASCII digits: `[0-9]`, not
         + `\d` with the u flag (rule 2).                                
      21 + * No sign, exponent or hex can match (rule 5).                
      22 + */                                                            
      23 +const NUMBER = /^([0-9]{1,3}(?:,[0-9]{3})+|[0-9]*)(?:\.([0-9]*)
         +)?$/;                                                          
      24 +                                                               
      25 +/** One trailing "%", optionally preceded by spaces (rule 7). *
         +/                                                              
      26 +const PERCENT_SUFFIX = /\s*%$/;                                
      27 +                                                               
      28 +const MAX_DECIMALS: Record<FieldKind, number> = { money: 2, rat
         +e: 3, term: Number.POSITIVE_INFINITY };                        
      29 +                                                               
      30 +export function parseField(raw: string, kind: FieldKind): Parse
         +Result {                                                       
      31 +  let text = raw.trim(); // String.prototype.trim also removes 
         +non-breaking spaces (rule 1)                                   
      32 +  if (text === '') return EMPTY;                               
      33 +                                                               
      34 +  if (kind === 'rate' && PERCENT_SUFFIX.test(text)) {          
      35 +    text = text.replace(PERCENT_SUFFIX, '');                   
      36 +  }                                                            
      37 +                                                               
      38 +  const match = NUMBER.exec(text);                             
      39 +  if (!match) return INVALID;                                  
      40 +                                                               
      41 +  const integerPart = (match[1] ?? '').replace(/,/g, '');      
      42 +  const fraction = match[2] ?? '';                             
      43 +  if (integerPart === '' && fraction === '') return INVALID; //
         + "." or "%" alone (rule 4)                                     
      44 +  if (fraction.length > MAX_DECIMALS[kind]) {                  
      45 +    // Term: "15.0" and "15.00" are whole (rule 8); any other f
         +raction is rejected.                                           
      46 +    if (kind !== 'term' || /[1-9]/.test(fraction)) return INVAL
         +ID;                                                            
      47 +  }                                                            
      48 +  if (kind === 'term' && /[1-9]/.test(fraction)) return INVALID
         +; // "15.5" (rule 8)                                           
      49 +                                                               
      50 +  const digits = integerPart === '' ? '0' : integerPart;       
      51 +  let value: number;                                           
      52 +  if (kind === 'money') {                                      
      53 +    value = Number(digits + fraction.padEnd(2, '0')); // exact 
         +integer cents, no float rounding (rule 6)                      
      54 +  } else if (kind === 'term') {                                
      55 +    value = Number(digits);                                    
      56 +  } else {                                                     
      57 +    value = Number(`${digits}.${fraction || '0'}`);            
      58 +  }                                                            
      59 +                                                               
      60 +  // Keeps Infinity and imprecise huge values out of the app; t
         +he field's message covers them.                                
      61 +  if (!Number.isFinite(value) || value > Number.MAX_SAFE_INTEGE
         +R) return INVALID;                                             
      62 +  return { kind: 'ok', value };                                
      63 +}                                                              

⏺ Write(src/config/defaults.ts)
  ⎿  Added 24 lines, removed 2 lines
       1 -// Placeholder. Implemented in a later step (see docs/product-p
         -lan.md §4).                                                    
       2 -export {};                                                     
       1 +/**                                                            
       2 + * Built-in defaults. Values match "Valid ranges" in docs/user-
         +stories.md (Shared definitions).                               
       3 + * The rest of the config defaults are added in step 4 (A1–A4).
       4 + */                                                            
       5 +                                                               
       6 +export interface Range {                                       
       7 +  min: number;                                                 
       8 +  max: number;                                                 
       9 +}                                                              
      10 +                                                               
      11 +/** Limits in currency units (not cents), percent and years. */
      12 +export interface Limits {                                      
      13 +  homePrice: Range;                                            
      14 +  interestRate: Range;                                         
      15 +  termYears: Range;                                            
      16 +  extraPayment: Range;                                         
      17 +}                                                              
      18 +                                                               
      19 +export const DEFAULT_LIMITS: Limits = {                        
      20 +  homePrice: { min: 1, max: 100_000_000 },                     
      21 +  interestRate: { min: 0, max: 30 },                           
      22 +  termYears: { min: 1, max: 40 },                              
      23 +  extraPayment: { min: 0, max: 10_000_000 },                   
      24 +};                                                             

⏺ Write(src/messages.ts)
  ⎿  Added 8 lines, removed 1 line
       1  /**
       2   * Every user-facing text in the app lives here.
       3   * Error texts must match the Error messages table in docs/user
          -stories.md exactly.
       4 - * The remaining entries (E1–E6, E8, E9, E11–E20) are added wit
         -h the steps that use them.                                     
       4 + * Range messages take the numbers already formatted for the lo
         +cale.                                                          
       5 + * The remaining entries (E8, E9, E11–E20) are added with the s
         +teps that use them.                                            
       6   */
       7  export const APP_TITLE = 'Mortgage Calculator';
       8  
       9  export const MESSAGES = {
      10 +  E1: (min: string, max: string) => `Enter a home price between
         + ${min} and ${max}.`,                                          
      11 +  E2: 'Enter a down payment of 0 or more.',                    
      12 +  E3: 'Down payment must be less than the home price.',        
      13 +  E4: (min: string, max: string) => `Enter an interest rate bet
         +ween ${min} and ${max}.`,                                      
      14 +  E5: (min: string, max: string) => `Enter a whole number of ye
         +ars between ${min} and ${max}.`,                               
      15 +  E6: (min: string, max: string) => `Enter an extra payment bet
         +ween ${min} and ${max}.`,                                      
      16    E7: 'The loan amount is too small for this term.',
      17    E10: 'Could not calculate this loan. Please check your inputs
          .',
      18  } as const;

⏺ Write(src/engine/validate.ts)
  ⎿  Added 155 lines, removed 2 lines
        1 -// Placeholder. Implemented in a later step (see docs/product-
          -plan.md §4).                                                  
        2 -export {};                                                    
        1 +/**                                                           
        2 + * Validates the five calculator fields. Pure, no DOM, never t
          +hrows.                                                        
        3 + * Order of checks (docs/user-stories.md, Error messages): eac
          +h field on its own first;                                     
        4 + * E3 only when home price and down payment are each valid. E7
          + is decided by the engine.                                    
        5 + */                                                           
        6 +import type { Limits, Range } from '../config/defaults';      
        7 +import { MESSAGES } from '../messages';                       
        8 +import { parseField, type FieldKind } from './parse';         
        9 +                                                              
       10 +export type { Limits } from '../config/defaults';             
       11 +                                                              
       12 +export type Field = 'homePrice' | 'downPayment' | 'interestRat
          +e' | 'termYears' | 'extraPayment';                            
       13 +                                                              
       14 +export type RawInputs = Record<Field, string>;                
       15 +                                                              
       16 +export type FieldErrorId = 'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 
          +'E6';                                                         
       17 +                                                              
       18 +export interface FieldError {                                 
       19 +  id: FieldErrorId;                                           
       20 +  text: string;                                               
       21 +}                                                             
       22 +                                                              
       23 +/** Ready for calculateLoan (add `today`). */                 
       24 +export interface ValidInputs {                                
       25 +  homePriceCents: number;                                     
       26 +  downPaymentCents: number;                                   
       27 +  principalCents: number;                                     
       28 +  annualRatePercent: number;                                  
       29 +  termYears: number;                                          
       30 +  extraMonthlyCents: number;                                  
       31 +}                                                             
       32 +                                                              
       33 +export type ValidationOutcome =                               
       34 +  | { ok: true; values: ValidInputs }                         
       35 +  | { ok: false; errors: Partial<Record<Field, FieldError>> };
       36 +                                                              
       37 +function numberFormatter(locale: string): Intl.NumberFormat { 
       38 +  try {                                                       
       39 +    return new Intl.NumberFormat(locale, { maximumFractionDigi
          +ts: 3 });                                                     
       40 +  } catch {                                                   
       41 +    // An invalid locale must never break validation; config v
          +alidation reports it (A4).                                    
       42 +    return new Intl.NumberFormat('en-US', { maximumFractionDig
          +its: 3 });                                                    
       43 +  }                                                           
       44 +}                                                             
       45 +                                                              
       46 +type RangeMessage = (min: string, max: string) => string;     
       47 +                                                              
       48 +interface FieldCheck {                                        
       49 +  value: number | null;                                       
       50 +  error: FieldError | null;                                   
       51 +}                                                             
       52 +                                                              
       53 +/**                                                           
       54 + * Parses one field and checks it against its range.          
       55 + * `scale` converts the range to the parsed unit (100 for mone
          +y in cents).                                                  
       56 + */                                                           
       57 +function checkField(                                          
       58 +  raw: string,                                                
       59 +  kind: FieldKind,                                            
       60 +  required: boolean,                                          
       61 +  range: Range | null,                                        
       62 +  scale: number,                                              
       63 +  error: () => FieldError,                                    
       64 +): FieldCheck {                                               
       65 +  const parsed = parseField(raw, kind);                       
       66 +  if (parsed.kind === 'empty') {                              
       67 +    return required ? { value: null, error: error() } : { valu
          +e: 0, error: null };                                          
       68 +  }                                                           
       69 +  if (parsed.kind === 'invalid') return { value: null, error: 
          +error() };                                                    
       70 +  if (range && (parsed.value < Math.round(range.min * scale) |
          +| parsed.value > Math.round(range.max * scale))) {            
       71 +    return { value: null, error: error() };                   
       72 +  }                                                           
       73 +  return { value: parsed.value, error: null };                
       74 +}                                                             
       75 +                                                              
       76 +export function validateInputs(raw: RawInputs, limits: Limits,
          + locale: string): ValidationOutcome {                         
       77 +  const format = numberFormatter(locale);                     
       78 +  const rangeError =                                          
       79 +    (id: FieldErrorId, message: RangeMessage, range: Range) =>
          + (): FieldError => ({                                         
       80 +      id,                                                     
       81 +      text: message(format.format(range.min), format.format(ra
          +nge.max)),                                                    
       82 +    });                                                       
       83 +                                                              
       84 +  const price = checkField(                                   
       85 +    raw.homePrice,                                            
       86 +    'money',                                                  
       87 +    true,                                                     
       88 +    limits.homePrice,                                         
       89 +    100,                                                      
       90 +    rangeError('E1', MESSAGES.E1, limits.homePrice),          
       91 +  );                                                          
       92 +  const down = checkField(raw.downPayment, 'money', false, { m
          +in: 0, max: Number.MAX_SAFE_INTEGER / 100 }, 100, () => ({    
       93 +    id: 'E2',                                                 
       94 +    text: MESSAGES.E2,                                        
       95 +  }));                                                        
       96 +  const rate = checkField(                                    
       97 +    raw.interestRate,                                         
       98 +    'rate',                                                   
       99 +    true,                                                     
      100 +    limits.interestRate,                                      
      101 +    1,                                                        
      102 +    rangeError('E4', MESSAGES.E4, limits.interestRate),       
      103 +  );                                                          
      104 +  const term = checkField(                                    
      105 +    raw.termYears,                                            
      106 +    'term',                                                   
      107 +    true,                                                     
      108 +    limits.termYears,                                         
      109 +    1,                                                        
      110 +    rangeError('E5', MESSAGES.E5, limits.termYears),          
      111 +  );                                                          
      112 +  const extra = checkField(                                   
      113 +    raw.extraPayment,                                         
      114 +    'money',                                                  
      115 +    false,                                                    
      116 +    limits.extraPayment,                                      
      117 +    100,                                                      
      118 +    rangeError('E6', MESSAGES.E6, limits.extraPayment),       
      119 +  );                                                          
      120 +                                                              
      121 +  const errors: Partial<Record<Field, FieldError>> = {};      
      122 +  if (price.error) errors.homePrice = price.error;            
      123 +  if (down.error) errors.downPayment = down.error;            
      124 +  if (rate.error) errors.interestRate = rate.error;           
      125 +  if (term.error) errors.termYears = term.error;              
      126 +  if (extra.error) errors.extraPayment = extra.error;         
      127 +                                                              
      128 +  // E3 only when both the price and the down payment are vali
          +d on their own.                                               
      129 +  if (price.value !== null && down.value !== null && down.valu
          +e >= price.value) {                                           
      130 +    errors.downPayment = { id: 'E3', text: MESSAGES.E3 };     
      131 +  }                                                           
      132 +                                                              
      133 +  if (                                                        
      134 +    Object.keys(errors).length > 0 ||                         
      135 +    price.value === null ||                                   
      136 +    down.value === null ||                                    
      137 +    rate.value === null ||                                    
      138 +    term.value === null ||                                    
      139 +    extra.value === null                                      
      140 +  ) {                                                         
      141 +    return { ok: false, errors };                             
      142 +  }                                                           
      143 +                                                              
      144 +  return {                                                    
      145 +    ok: true,                                                 
      146 +    values: {                                                 
      147 +      homePriceCents: price.value,                            
      148 +      downPaymentCents: down.value,                           
      149 +      principalCents: price.value - down.value,               
      150 +      annualRatePercent: rate.value,                          
      151 +      termYears: term.value,                                  
      152 +      extraMonthlyCents: extra.value,                         
      153 +    },                                                        
      154 +  };                                                          
      155 +}                                                             

  Ran 1 shell command (ctrl+o to expand)

⏺ Rounding every limit with Math.round wrongly let a rate of 8 pass a 7.5
  maximum, which is a real bug in my code. Separately, the 1,000-case test was
  weak because most fields were junk or edge values, so I'm making about 75% of
  each field valid.

⏺ Update(src/engine/validate.ts)
  ⎿  Added 3 lines, removed 1 line
      67      return required ? { value: null, error: error() } : { value
          : 0, error: null };
      68    }
      69    if (parsed.kind === 'invalid') return { value: null, error: e
          rror() };
      70 -  if (range && (parsed.value < Math.round(range.min * scale) ||
         - parsed.value > Math.round(range.max * scale))) {              
      70 +  // Money limits become cents; rate and term limits stay as th
         +ey are (a rate max of 7.5 must not become 8).                  
      71 +  const toUnit = (limit: number): number => (scale === 1 ? limi
         +t : Math.round(limit * scale));                                
      72 +  if (range && (parsed.value < toUnit(range.min) || parsed.valu
         +e > toUnit(range.max))) {                                      
      73      return { value: null, error: error() };
      74    }
      75    return { value: parsed.value, error: null };

⏺ Update(tests/unit/validate.test.ts)  ⎿  Added 8 lines, removed 5 lines
      255      let tooSmall = 0;
      256  
      257      for (let i = 0; i < 1000; i++) {
      258 +      // About 75% of each field's values are plausible; the r
          +est are edges or junk.                                        
      259 +      const field = (plausible: () => string, edges: readonly 
          +string[]): string =>                                          
      260 +        random() < 0.75 ? plausible() : pick([pick(edges), pic
          +k(junk)]);                                                    
      261        const input: RawInputs = {
      259 -        homePrice: pick([money(120_000_000), money(1_000), pic
          -k(priceEdges), pick(junk)]),                                  
      260 -        downPayment: pick([money(1_000_000), '', pick(junk)]),
      261 -        interestRate: pick([(random() * 35).toFixed(pick([0, 1
          -, 3])), pick(rateEdges), pick(junk)]),                        
      262 -        termYears: pick([String(Math.floor(random() * 45)), pi
          -ck(termEdges), pick(junk)]),                                  
      263 -        extraPayment: pick(['', money(5_000), pick(extraEdges)
          -, pick(junk)]),                                               
      262 +        homePrice: field(() => pick([money(1_000_000), money(1
          +00_000_000), money(500)]), priceEdges),                       
      263 +        downPayment: field(() => pick(['', '0', money(50_000)]
          +), ['0', '-1', '100.123']),                                   
      264 +        interestRate: field(() => (random() * 30).toFixed(pick
          +([0, 1, 3])), rateEdges),                                     
      265 +        termYears: field(() => String(1 + Math.floor(random() 
          +* 40)), termEdges),                                           
      266 +        extraPayment: field(() => pick(['', '0', money(5_000)]
          +), extraEdges),                                               
      267        };
      268  
      269        let outcome: ValidationOutcome | undefined;

  Ran 3 shell commands (ctrl+o to expand)

⏺ Parsing and validation are done: all 136 tests pass, along with the type check
  and the build. Writing the tests first turned up one real bug in my code,
  which is fixed (details below). I ran no git commands.

  Input rules added to user-stories.md (Shared definitions, after Valid ranges)

  - **Input rules** (how every number field is read):
    1. Spaces before and after the value are ignored. A field with only spaces 
  counts as empty.
    2. Only the digits 0 to 9 are accepted. Other digit scripts (such as ٣٠٠ or 
  full-width ３００) are rejected.
    3. `.` is the decimal point. `,` is accepted only as a thousands separator 
  in groups of 3 (`1,234,567`). `1.500.000`, `1,50,000`, `1,5`, `6,5` and `1 500
  000` are rejected.
    4. `.5` is read as 0.5, `5.` as 5, and leading zeros are ignored (`007` is 
  7).
    5. Signs are rejected (`+5`, `-5`, `-0`), as are exponents (`1e5`), hex 
  (`0x10`), `Infinity` and `NaN`.
    6. Money fields (home price, down payment, extra payment) accept at most 2 
  decimals. `100.123` is rejected, never rounded.
    7. The interest rate accepts at most 3 decimals and one trailing `%`, with 
  or without a space before it (`6.5%`, `6.5 %`). `%` is rejected in every other
  field.
    8. The term must be a whole number. `15.0` and `15.` are read as 15, and 
  `15.5` is rejected.
    9. The down payment has no maximum of its own. It only has to be less than 
  the home price (E3).
    10. A rejected value shows that field's message from the Error messages 
  table.
    11. **When messages appear:** a field's message appears when I leave the 
  field, and disappears as soon as the value becomes valid while I type. The 
  results area switches to E8 immediately on any invalid input.

  What happened during the run

  1. Before the code existed, 86 of the new tests failed with parseField is not 
     a function.
  2. The first run after writing the code had 2 failures:
     - A real bug in my code (M4). I rounded every limit to a whole unit, so a
       rate maximum of 7.5 became 8 and a rate of 8 was accepted. Now only money
       limits are converted (to cents), and rate and term limits are used as
       given.
     - A weak test (I3). Too much of the random data was junk, so only 39 of the
       1,000 input sets were fully valid, and the engine path got almost no
       coverage. About 75% of each field's values are now plausible. The test
       also requires more than 100 sets that are valid and produce an actual
       result (not E7).
  3. I changed one planned behaviour while writing the tests. I had first
     planned to let a 400-digit number through as Infinity and rely on the range
     check. Instead the parser now rejects anything beyond
     Number.MAX_SAFE_INTEGER. The user sees the same field message, and no
     non-finite value can ever leave the parser.

  Final test output

   amortize.test.ts   A Monthly payment (9) · B Totals (6) · C Dates (6) · D 
  Schedule (8) · E Extra (4) · F Guards (16)
   parse.test.ts      P Parsing (18) · U Input rules U1–U12 (20)
   validate.test.ts   Default limits (1) · V Empty/required (7) · R Rules & 
  order (13) · B Boundaries (19)
                      · M Message texts (5) · I Hand-off to engine incl. 
  1,000-input loop (3)
   setup.test.ts      (1)

   Test Files  4 passed (4)
        Tests  136 passed (136)
     Duration  606ms
  tsc OK · vite build ✓

  Files

  - src/engine/parse.ts: parseField(raw, 'money' | 'rate' | 'term') returns
    empty, invalid, or ok with a value. Money is read straight into integer
    cents from the digit string, with no float in between.
  - src/engine/validate.ts: validateInputs(raw, limits, locale) returns { ok: 
    true, values } ready for calculateLoan, or a per-field { id, text }. It
    never throws: an unusable locale falls back to en-US.
  - src/config/defaults.ts: DEFAULT_LIMITS. A test checks them against the Valid
    ranges in Shared definitions.
  - src/messages.ts: E1–E6 added. The range messages take numbers already
    formatted for the locale.
  - Tests: tests/unit/parse.test.ts and tests/unit/validate.test.ts.

  Not covered by this step

  These depend on the DOM and come in the UI step:
  - L8.15: clearing old results and showing E8;
  - L8.18: the ARIA attributes on invalid fields;
  - L8.19 and L8.20: showing E9 and E10 on screen;
  - the timing rule (input rule 11).

  Next is Step 4: config loading (A1–A4).

✻ Baked for 3m 26s · done 7:08 PM

❯ this is my username(usamakh1) and email is (iusamakhawaja@gmail.com) use this 
  for git                                                                       

  Ran 2 shell commands (ctrl+o to expand)

⏺ I've noted the git identity, but I didn't change anything in git. This folder
  isn't a git repository any more: the .git folder is gone, so the earlier
  commit 81c6072 (the one with my guessed name) no longer exists.

  You said you'd handle git yourself, so I haven't run git init or committed
  anything. I've saved the identity to memory, so if you ever ask me to commit,
  it will be usamakh1 <iusamakhawaja@gmail.com>.

  To set it for this project when you create the repo:
  git init
  git config user.name "usamakh1"
  git config user.email "iusamakhawaja@gmail.com"
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

  Please revoke that token now. It's at github.com → Settings → Developer
  settings → Personal access tokens. A token pasted into chat should be treated
  as leaked, and this one is a bigger risk than usual:
  - You've been exporting these sessions into transcripts/, and those files are
    part of your submission. The next export will contain the token in plain
    text, and if it's pushed to a public repo, anyone can use it to act on your
    GitHub account.
  - After revoking it, check every exported transcript before you submit it.
    Search for ghp_ and delete any token you find.

  I won't use the token, store it, or put it in any config or remote URL. If you
  later want me to push, ask me in that turn, and use gh auth login or your own
  credential helper so the token never appears in the conversation.

  Two small things from your repo snippet:
  - It runs git add README.md, but there's no README yet. It gets written in the
    README milestone. Use git add -A instead, or wait until the README exists.
  - The remote URL ends in mortgage-calculator-.git, with a trailing hyphen. If
    that's a typo, the push will fail. Check the name on GitHub.

  Next is Step 4, config loading (A1–A4). I'll list the test cases first, as
  with the earlier steps.

✻ Cooked for 16s · done 7:21 PM
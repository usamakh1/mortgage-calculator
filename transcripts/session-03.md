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
  ),    

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

❯ /export transcripts/session-03-part3.md                                       
  ⎿  Conversation exported to: /Users/dev/Desktop/Test Project
     Usama/transcripts/session-03-part3.md

❯ Step 4: config loading (src/config/loadConfig.ts, schema.ts, defaults.ts) for 
  A1, A2, A3 and A4.                                                            
  - loadConfig never throws and always returns a complete, valid config plus a  
  list of problems                                                              
    (E11 or E12 with the exact texts, each also logged with console.warn: field 
  name + bad value).                                                            
  - Split it into a pure validateConfig(json) (unit-tested) and a small fetch   
  wrapper.                                                                      
  - Watch out: Intl.NumberFormat accepts unknown codes like "XYZ" without an    
  error. Check currency                                                         
    against Intl.supportedValuesOf('currency'), and locale with                 
  Intl.NumberFormat.supportedLocalesOf.                                         
  - officeName and disclaimer are kept as plain strings. The UI step will       
  render them with                                                              
    textContent only (A3.2).                                                    
  - Defaults outside their limits fall back (A4.5); presets follow A2.2–A2.5.   
  - Put two example presets and the office name/disclaimer in                   
  public/config.json.                                                           
                                                                                
  The UI parts (banner, Dismiss, footer, selector) come in the next step.       
  Before coding, list the test cases from A1–A4 and stop so I can review them.  

⏺ Before listing the tests I'm checking two Intl behaviours the config rules
  depend on: what supportedLocalesOf returns for odd tags, and how many decimals
  Intl uses for each currency. Plan §8 assumes 2-decimal currencies, and PKR is
  one of A1's examples.

  Ran 1 shell command (ctrl+o to expand)

⏺ I've drafted the test list for Step 4 (A1–A4) below, but there's no code yet.
  The config schema and a few rules aren't defined in the docs, so I need your
  decisions on Q1–Q11 at the end.

  First, what the Intl check found (Node 22, the same Intl data the browsers
  use):
  - "XYZ" formats without any error, as you said. It isn't in
    Intl.supportedValuesOf('currency'), and neither is lowercase "eur".
  - supportedLocalesOf returns [] for "xx-YY", but it accepts "en-XX" (because
    en is supported) and normalises "EN-us" to "en-US". It throws a RangeError
    for "not a locale!!" and for "", so those calls must be wrapped.
  - JPY formats with 0 decimals and KWD with 3. The engine works in cents, and
    plan §8 says only 2-decimal currencies are supported, so accepting these
    would show wrong amounts. USD, EUR and PKR all use 2.
  - de-DE with EUR gives "1.798,65 €" with a non-breaking space (U+00A0) before
    the €. A1.1's test compares against Intl's output, so this passes.

  Proposed public/config.json schema

  {
    "currency": "USD",
    "locale": "en-US",
    "officeName": "Riverside Mortgages",
    "disclaimer": "Estimates only. Not a loan offer or financial advice.",
    "defaults": { "homePrice": 350000, "downPayment": 50000, "interestRate": 6,
  "termYears": 30, "extraPayment": 0 },
    "limits": {
      "homePrice":    { "min": 1, "max": 100000000 },
      "interestRate": { "min": 0, "max": 30 },
      "termYears":    { "min": 1, "max": 40 },
      "extraPayment": { "min": 0, "max": 10000000 }
    },
    "presets": [
      { "id": "f30", "name": "30-year fixed", "ratePercent": 6.5,  "termYears":
  30, "description": "Our standard 30-year loan" },
      { "id": "f15", "name": "15-year fixed", "ratePercent": 5.75, "termYears":
  15, "description": "Lower total interest" }
    ]
  }
  The two presets are the ones from M1.1. The return shape I have in mind is
  validateConfig(json): { config, problems }, with each problem shaped { field, 
  value, message }.

  Test cases: validateConfig (pure)

  G. Whole file (A4.1–A4.3, A4.8)

  ┌─────┬───────────────────────┬────────────────────────────────────────────┐
  │  #  │         Input         │                  Expected                  │
  ├─────┼───────────────────────┼────────────────────────────────────────────┤
  │ G1  │ {}                    │ Built-in defaults, no problems (A1.4)      │
  ├─────┼───────────────────────┼────────────────────────────────────────────┤
  │ G2  │ The full example      │ Applied as written, no problems            │
  │     │ above                 │                                            │
  ├─────┼───────────────────────┼────────────────────────────────────────────┤
  │     │                       │ Defaults + E11 "Configuration could not be │
  │ G3  │ [], "x", 42, null     │  loaded (not a JSON object). Using default │
  │     │                       │  settings." (A4.3)                         │
  ├─────┼───────────────────────┼────────────────────────────────────────────┤
  │     │ The invalid inputs    │ validateConfig never throws and always     │
  │ G4  │ from G3, C, R, D, PR  │ returns a complete config (A4.8)           │
  │     │ and S below           │                                            │
  └─────┴───────────────────────┴────────────────────────────────────────────┘

  C. Currency and locale (A1.1, A4.4)

  ┌─────┬──────────────────┬────────────────────────────────────────────────┐
  │  #  │      Input       │                    Expected                    │
  ├─────┼──────────────────┼────────────────────────────────────────────────┤
  │     │ currency "EUR",  │ Both applied; an amount of 1,798.65 formats as │
  │ C1  │ locale "de-DE"   │  Intl.NumberFormat("de-DE", {style:"currency", │
  │     │                  │  currency:"EUR"}) (A1.1)                       │
  ├─────┼──────────────────┼────────────────────────────────────────────────┤
  │     │                  │ Falls back to USD; E12 names currency;         │
  │ C2  │ currency "XYZ"   │ console.warn logs currency and "XYZ" (A4.4,    │
  │     │                  │ A4.7)                                          │
  ├─────┼──────────────────┼────────────────────────────────────────────────┤
  │ C3  │ currency "JPY"   │ Falls back to USD; E12 names currency (Q7)     │
  │     │ or "KWD"         │                                                │
  ├─────┼──────────────────┼────────────────────────────────────────────────┤
  │     │ currency 840 (a  │                                                │
  │ C4  │ number),         │ Falls back; E12 names currency                 │
  │     │ currency ""      │                                                │
  ├─────┼──────────────────┼────────────────────────────────────────────────┤
  │     │ locale "xx-YY",  │ Falls back to en-US; E12 names locale; no      │
  │ C5  │ "not a           │ throw                                          │
  │     │ locale!!", "", 5 │                                                │
  ├─────┼──────────────────┼────────────────────────────────────────────────┤
  │ C6  │ locale "EN-us"   │ Applied as "en-US" (normalised)                │
  └─────┴──────────────────┴────────────────────────────────────────────────┘

  R. Limits (A1.3, A4.4)

  ┌─────┬───────────────────────────────────┬───────────────────────────────┐
  │  #  │               Input               │           Expected            │
  ├─────┼───────────────────────────────────┼───────────────────────────────┤
  │ R1  │ limits.interestRate.max 15        │ Applied (A1.3)                │
  ├─────┼───────────────────────────────────┼───────────────────────────────┤
  │     │                                   │ That limit falls back; E12    │
  │ R2  │ limits.termYears {min 50, max 40} │ names limits.termYears; the   │
  │     │                                   │ other limits are applied      │
  │     │                                   │ (A4.4)                        │
  ├─────┼───────────────────────────────────┼───────────────────────────────┤
  │     │ Negative limit, missing min/max,  │ That limit falls back; E12    │
  │ R3  │ non-number, NaN written as a      │ names it                      │
  │     │ string, term min 1.5              │                               │
  ├─────┼───────────────────────────────────┼───────────────────────────────┤
  │ R4  │ A limit beyond the tested range,  │ Falls back; E12 names it (Q2) │
  │     │ e.g. homePrice.max 1e12           │                               │
  ├─────┼───────────────────────────────────┼───────────────────────────────┤
  │     │ A4.4 combined: currency "XYZ" +   │ E12 lists exactly "currency,  │
  │ R5  │ bad limits.termYears              │ limits.termYears"; all other  │
  │     │                                   │ values applied                │
  └─────┴───────────────────────────────────┴───────────────────────────────┘

  D. Defaults (A1.2, A4.5)

  ┌─────┬──────────────────────────────────┬────────────────────────────────┐
  │  #  │              Input               │            Expected            │
  ├─────┼──────────────────────────────────┼────────────────────────────────┤
  │ D1  │ defaults {homePrice 400000,      │ Applied (A1.2)                 │
  │     │ interestRate 5, termYears 25}    │                                │
  ├─────┼──────────────────────────────────┼────────────────────────────────┤
  │     │ defaults.interestRate 50 with    │ Falls back to the built-in     │
  │ D2  │ limit 0–30                       │ default; E12 names             │
  │     │                                  │ defaults.interestRate (A4.5)   │
  ├─────┼──────────────────────────────────┼────────────────────────────────┤
  │     │ A default checked against a      │ Falls back; E12 names          │
  │ D3  │ limit that was itself changed:   │ defaults.interestRate          │
  │     │ rate max 15 + default rate 20    │                                │
  ├─────┼──────────────────────────────────┼────────────────────────────────┤
  │ D4  │ defaults.downPayment ≥           │ Down payment default falls     │
  │     │ defaults.homePrice               │ back; E12 names it (Q3)        │
  ├─────┼──────────────────────────────────┼────────────────────────────────┤
  │ D5  │ Defaults that are strings,       │ Fall back; E12 names each one  │
  │     │ negative, or a term of 15.5      │                                │
  └─────┴──────────────────────────────────┴────────────────────────────────┘

  PR. Presets (A2.1–A2.5, M1.7)

  ┌─────┬──────────────────────────────────┬────────────────────────────────┐
  │  #  │              Input               │            Expected            │
  ├─────┼──────────────────────────────────┼────────────────────────────────┤
  │ PR1 │ The A2.1 preset f15              │ Kept, with its description     │
  │     │                                  │ (A2.1)                         │
  ├─────┼──────────────────────────────────┼────────────────────────────────┤
  │ PR2 │ "Jumbo" with ratePercent 35      │ Skipped; E12 names presets:    │
  │     │                                  │ Jumbo (A2.2)                   │
  ├─────┼──────────────────────────────────┼────────────────────────────────┤
  │     │ A preset with no name, or with   │ Skipped; E12 names it by       │
  │ PR3 │ termYears 15.5                   │ position, e.g. presets[2]      │
  │     │                                  │ (A2.3, Q5)                     │
  ├─────┼──────────────────────────────────┼────────────────────────────────┤
  │     │                                  │ The first is kept; E12 names   │
  │ PR4 │ Two presets with id f15          │ presets: duplicate id f15      │
  │     │                                  │ (A2.4)                         │
  ├─────┼──────────────────────────────────┼────────────────────────────────┤
  │ PR5 │ presets is not a list            │ No presets; E12 names presets  │
  │     │                                  │ (A2.5)                         │
  ├─────┼──────────────────────────────────┼────────────────────────────────┤
  │ PR6 │ presets missing, or []           │ No presets and no warning      │
  │     │                                  │ (M1.7)                         │
  ├─────┼──────────────────────────────────┼────────────────────────────────┤
  │     │ A preset checked against changed │                                │
  │ PR7 │  limits: rate max 15 + a 16%     │ Skipped and named              │
  │     │ preset                           │                                │
  ├─────┼──────────────────────────────────┼────────────────────────────────┤
  │ PR8 │ id missing or not a string;      │ Skipped and named (Q5)         │
  │     │ description not a string         │                                │
  └─────┴──────────────────────────────────┴────────────────────────────────┘

  S. Office name and disclaimer (A3)

  ┌─────┬────────────────────────────┬──────────────────────────────────────┐
  │  #  │           Input            │               Expected               │
  ├─────┼────────────────────────────┼──────────────────────────────────────┤
  │ S1  │ officeName + disclaimer    │ Kept exactly as plain strings (A3.1) │
  │     │ strings                    │                                      │
  ├─────┼────────────────────────────┼──────────────────────────────────────┤
  │     │ disclaimer "<img src=x     │ Kept as that literal string. The UI  │
  │ S2  │ onerror=alert(1)>"         │ step proves it is rendered as text   │
  │     │                            │ (A3.2)                               │
  ├─────┼────────────────────────────┼──────────────────────────────────────┤
  │     │ disclaimer missing, "" or  │ The default "Estimates only. Not a   │
  │ S3  │ "   "                      │ loan offer or financial advice."; no │
  │     │                            │  warning (A3.3)                      │
  ├─────┼────────────────────────────┼──────────────────────────────────────┤
  │ S4  │ disclaimer 42              │ The default; E12 names disclaimer    │
  │     │                            │ (A3.4)                               │
  ├─────┼────────────────────────────┼──────────────────────────────────────┤
  │ S5  │ officeName missing         │ null, no warning (A3.5). officeName  │
  │     │                            │ 42 → null, E12 names officeName      │
  └─────┴────────────────────────────┴──────────────────────────────────────┘

  W. Messages and logging (A4.7)

  ┌─────┬────────────────────────────────────────────────────────────────────┐
  │  #  │                              Expected                              │
  ├─────┼────────────────────────────────────────────────────────────────────┤
  │ W1  │ Every problem calls console.warn once with the field name and the  │
  │     │ bad value                                                          │
  ├─────┼────────────────────────────────────────────────────────────────────┤
  │ W2  │ All E12 items go into one E12 text: "Some settings were invalid    │
  │     │ and defaults are used instead: currency, limits.termYears."        │
  ├─────┼────────────────────────────────────────────────────────────────────┤
  │ W3  │ E11 and E12 never appear together. An unusable file gives E11 only │
  └─────┴────────────────────────────────────────────────────────────────────┘

  Test cases: loadConfig fetch wrapper

  This takes a fetch function as a parameter, so the tests can fake it.

  ┌─────┬─────────────────┬─────────────────────────────────────────────────┐
  │  #  │  Fake response  │                    Expected                     │
  ├─────┼─────────────────┼─────────────────────────────────────────────────┤
  │     │                 │ Defaults + "Configuration could not be loaded   │
  │ L1  │ 404             │ (file not found). Using default settings."      │
  │     │                 │ (A4.1)                                          │
  ├─────┼─────────────────┼─────────────────────────────────────────────────┤
  │ L2  │ fetch rejects   │ E11 with reason "network error"                 │
  ├─────┼─────────────────┼─────────────────────────────────────────────────┤
  │ L3  │ 200 with body   │ E11 with reason "invalid JSON" (A4.2)           │
  │     │ {bad json       │                                                 │
  ├─────┼─────────────────┼─────────────────────────────────────────────────┤
  │ L4  │ 200 with a      │ The same result as validateConfig               │
  │     │ valid body      │                                                 │
  ├─────┼─────────────────┼─────────────────────────────────────────────────┤
  │     │ 500, or reading │                                                 │
  │ L5  │  the body       │ E11 with reason "network error" (Q9)            │
  │     │ throws          │                                                 │
  ├─────┼─────────────────┼─────────────────────────────────────────────────┤
  │     │                 │ Requests ./config.json (relative, so a sub-path │
  │ L6  │ —               │  works) with cache: 'no-store', so an edited    │
  │     │                 │ config shows on reload                          │
  └─────┴─────────────────┴─────────────────────────────────────────────────┘

  The UI step will cover the rest: the banner, Dismiss and reappearing after
  reload (A4.6), footer rendering (A3.1, A3.2, A3.5), the selector (M1), and
  prefilled fields (A1.2). A1.5 (the README) comes with the README.

  Rules the docs don't define: please choose

  #: Q1
  Question: Built-in default values
  Proposed rule: Home price 350,000, down payment 50,000, rate 6, term 30, extra

    empty (the L1.1 case). This also keeps L8.13 valid: a 1,000 loan at 6% over
    30 years pays 6.00, which is above the 5.00 interest
  ────────────────────────────────────────
  #: Q2
  Question: How far config limits may go
  Proposed rule: They can only narrow the built-in ranges: price ≤ 100,000,000,
    rate ≤ 30, term ≤ 40, extra ≤ 10,000,000, and mins ≥ the built-in mins. The
    engine is only tested up to those maximums
  ────────────────────────────────────────
  #: Q3
  Question: Down payment default ≥ price default
  Proposed rule: The down payment default falls back. If that still isn't below
    the price, it becomes 0
  ────────────────────────────────────────
  #: Q4
  Question: Unknown keys, e.g. a typo like "currncy"
  Proposed rule: Ignored, with console.warn only and no banner, since they
  aren't
    invalid values
  ────────────────────────────────────────
  #: Q5
  Question: How bad presets are named
  Proposed rule: By name when it is a valid string, otherwise by its 0-based
  JSON
    position (presets[2] is the third item). A non-string description also skips

    the preset
  ────────────────────────────────────────
  #: Q6
  Question: Lowercase currency "eur"
  Proposed rule: Accept it and convert to "EUR"
  ────────────────────────────────────────
  #: Q7
  Question: Currencies with 0 or 3 decimals (JPY, KWD)
  Proposed rule: Reject them with E12 currency and fall back to USD, because the

    cent-based engine would show wrong amounts (plan §8)
  ────────────────────────────────────────
  #: Q8
  Question: "en-XX" (unknown region, known language)
  Proposed rule: Accept it. Intl formats it as en
  ────────────────────────────────────────
  #: Q9
  Question: HTTP status other than 404 (e.g. 500)
  Proposed rule: Reason "network error"
  ────────────────────────────────────────
  #: Q10
  Question: Office name and disclaimer whitespace
  Proposed rule: Trim both. Whitespace-only counts as missing
  ────────────────────────────────────────
  #: Q11
  Question: Should defaults include the extra payment?
  Proposed rule: Yes, defaults.extraPayment (built-in 0, shown as an empty
  field)

  Q2 and Q7 matter most, because they decide whether a config can push the app
  outside what the engine has been tested on. Reply "proposals as listed" or
  give your choice per question. I'll then write the tests first, watch them
  fail, and write the code.

✻ Churned for 1m 8s · done 7:23 PM

❯ Proposals as listed for Q1–Q3 and Q5–Q11, with two changes:                   
                                                                                
  1. Key names: the docs use "ratePercent" (A1.3 says limits.ratePercent.max,   
  presets use                                                                   
     ratePercent). Your schema says interestRate. Use ratePercent in limits and 
  defaults too,                                                                 
     so an admin following the docs isn't silently ignored.                     
  2. Q4: unknown top-level or nested keys (e.g. a typo "currncy") are listed in 
  the E12 banner                                                                
     and logged, because J-12 says the admin wants to find out immediately      
  about a mistake.                                                              
     Missing keys still give no warning (A1.4).                                 
                                                                                
  Add the config schema, Q2, Q4 and Q7 as rules in user-stories.md (A1/A4) and  
  show me the lines.                                                            
  Then write the tests first, watch them fail, write the code, and run all      
  tests.                                                                        
                                                                                
  Also                                                                          
                                                                                
  - Git: since you've set up git, make your own checkpoint commit after each    
  step that passes. Now is a good moment (engine + validation pass).            
  - Export: if you haven't yet, run /export transcripts/session-03-part3.md.    

⏺ Starting with the docs, then the rename, tests and code. I'll come back to git
  and the export at the end, because both raise a problem I need to explain.

  Ran 2 shell commands (ctrl+o to expand)

⏺ The docs are updated; next I'll rename the interestRate limits key to
  ratePercent in the code, leaving the UI form field as it is.

  Ran 1 shell command (ctrl+o to expand)

⏺ macOS sed doesn't support \| alternation, so three test lines didn't change.
  Fixing them directly:

  Ran 1 shell command (ctrl+o to expand)

⏺ The rename is done and all 136 tests still pass. Now the config tests, written
  before the code:

⏺ Write(tests/unit/config.test.ts)
  ⎿  Wrote 446 lines to tests/unit/config.test.ts
       1 import { afterEach, beforeEach, describe, expect, it, vi, type M
         ockInstance } from 'vitest';
       2 import { validateConfig } from '../../src/config/schema';
       3 import { loadConfig, type FetchLike } from '../../src/config/loa
         dConfig';
       4 import { DEFAULT_CONFIG } from '../../src/config/defaults';
       5 
       6 const DEFAULT_DISCLAIMER = 'Estimates only. Not a loan offer or 
         financial advice.';
       7 
     … +439 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ All 90 new tests fail as expected (validateConfig is not a function). Now the
  code: types and defaults, validateConfig, the fetch wrapper, and the E11/E12
  texts.

⏺ Write(src/config/defaults.ts)
  ⎿  Added 53 lines, removed 2 lines
      1  /**
      2 - * Built-in defaults. Values match "Valid ranges" in docs/user-s
        -tories.md (Shared definitions).                                 
      3 - * The rest of the config defaults are added in step 4 (A1–A4). 
      2 + * Built-in defaults and config types.                          
      3 + * Values match docs/user-stories.md: "Valid ranges" (Shared def
        +initions) and the A1 config schema.                             
      4   */
      5  
      6  export interface Range {
     ...
      16    extraPayment: Range;
      17  }
      18  
      19 +/** Starting values of the form, in currency units, percent and
         + years. */                                                     
      20 +export interface Defaults {                                    
      21 +  homePrice: number;                                           
      22 +  downPayment: number;                                         
      23 +  ratePercent: number;                                         
      24 +  termYears: number;                                           
      25 +  extraPayment: number;                                        
      26 +}                                                              
      27 +                                                               
      28 +export interface Preset {                                      
      29 +  id: string;                                                  
      30 +  name: string;                                                
      31 +  ratePercent: number;                                         
      32 +  termYears: number;                                           
      33 +  description: string | null;                                  
      34 +}                                                              
      35 +                                                               
      36 +export interface AppConfig {                                   
      37 +  /** ISO 4217 code with 2 decimals. */                        
      38 +  currency: string;                                            
      39 +  /** BCP 47 tag. */                                           
      40 +  locale: string;                                              
      41 +  officeName: string | null;                                   
      42 +  /** Plain text; the UI renders it with textContent only (A3.2
         +). */                                                          
      43 +  disclaimer: string;                                          
      44 +  defaults: Defaults;                                          
      45 +  limits: Limits;                                              
      46 +  presets: Preset[];                                           
      47 +}                                                              
      48 +                                                               
      49 +export const DEFAULT_DISCLAIMER = 'Estimates only. Not a loan o
         +ffer or financial advice.';                                    
      50 +                                                               
      51 +/** The built-in Valid ranges. Config limits may only narrow th
         +ese (A1 config rules). */                                      
      52  export const DEFAULT_LIMITS: Limits = {
      53    homePrice: { min: 1, max: 100_000_000 },
      54    ratePercent: { min: 0, max: 30 },
      55    termYears: { min: 1, max: 40 },
      56    extraPayment: { min: 0, max: 10_000_000 },
      57  };
      58 +                                                               
      59 +export const DEFAULT_DEFAULTS: Defaults = {                    
      60 +  homePrice: 350_000,                                          
      61 +  downPayment: 50_000,                                         
      62 +  ratePercent: 6,                                              
      63 +  termYears: 30,                                               
      64 +  extraPayment: 0,                                             
      65 +};                                                             
      66 +                                                               
      67 +export const DEFAULT_CONFIG: AppConfig = {                     
      68 +  currency: 'USD',                                             
      69 +  locale: 'en-US',                                             
      70 +  officeName: null,                                            
      71 +  disclaimer: DEFAULT_DISCLAIMER,                              
      72 +  defaults: DEFAULT_DEFAULTS,                                  
      73 +  limits: DEFAULT_LIMITS,                                      
      74 +  presets: [],                                                 
      75 +};                                                             

⏺ Write(src/config/schema.ts)
  ⎿  Added 287 lines, removed 2 lines
        1 -// Placeholder. Implemented in a later step (see docs/product-
          -plan.md §4).                                                  
        2 -export {};                                                    
        1 +/**                                                           
        2 + * validateConfig: turns any parsed JSON into a complete, vali
          +d AppConfig plus a list of problems.                          
        3 + * Pure (no fetch, no DOM, no logging) and never throws.      
        4 + * Rules: docs/user-stories.md A1 (schema, config rules), A2 (
          +presets), A3 (texts), A4 (fallbacks).                         
        5 + */                                                           
        6 +import { MESSAGES } from '../messages';                       
        7 +import {                                                      
        8 +  DEFAULT_CONFIG,                                             
        9 +  DEFAULT_DEFAULTS,                                           
       10 +  DEFAULT_LIMITS,                                             
       11 +  type AppConfig,                                             
       12 +  type Defaults,                                              
       13 +  type Limits,                                                
       14 +  type Preset,                                                
       15 +  type Range,                                                 
       16 +} from './defaults';                                          
       17 +                                                              
       18 +export interface ConfigProblem {                              
       19 +  /** Name shown in the E12 list, e.g. "currency", "limits.ter
          +mYears", "presets: Jumbo". */                                 
       20 +  field: string;                                              
       21 +  value: unknown;                                             
       22 +}                                                             
       23 +                                                              
       24 +export interface ConfigNotice {                               
       25 +  id: 'E11' | 'E12';                                          
       26 +  text: string;                                               
       27 +}                                                             
       28 +                                                              
       29 +export interface ConfigResult {                               
       30 +  config: AppConfig;                                          
       31 +  problems: ConfigProblem[];                                  
       32 +  /** E11 when the file could not be used at all, E12 when som
          +e settings fell back, else null. */                           
       33 +  notice: ConfigNotice | null;                                
       34 +}                                                             
       35 +                                                              
       36 +type Json = Record<string, unknown>;                          
       37 +                                                              
       38 +export function isPlainObject(value: unknown): value is Json {
       39 +  return typeof value === 'object' && value !== null && !Array
          +.isArray(value);                                              
       40 +}                                                             
       41 +                                                              
       42 +const TOP_LEVEL_KEYS = ['currency', 'locale', 'officeName', 'd
          +isclaimer', 'limits', 'defaults', 'presets'];                 
       43 +const LIMIT_KEYS = ['homePrice', 'ratePercent', 'termYears', '
          +extraPayment'] as const;                                      
       44 +const DEFAULT_KEYS = ['homePrice', 'downPayment', 'ratePercent
          +', 'termYears', 'extraPayment'] as const;                     
       45 +const RANGE_KEYS = ['min', 'max'];                            
       46 +const PRESET_KEYS = ['id', 'name', 'ratePercent', 'termYears',
          + 'description'];                                              
       47 +                                                              
       48 +/** Decimals allowed per kind of value: money 2, rate 3, years
          + 0 (matches the Input rules). */                              
       49 +const DECIMALS: Record<keyof Limits, number> = { homePrice: 2,
          + ratePercent: 3, termYears: 0, extraPayment: 2 };             
       50 +                                                              
       51 +function hasAtMostDecimals(value: number, decimals: number): b
          +oolean {                                                      
       52 +  const scaled = value * 10 ** decimals;                      
       53 +  return Math.abs(scaled - Math.round(scaled)) < 1e-6;        
       54 +}                                                             
       55 +                                                              
       56 +function isFiniteNumber(value: unknown): value is number {    
       57 +  return typeof value === 'number' && Number.isFinite(value); 
       58 +}                                                             
       59 +                                                              
       60 +const within = (value: number, range: Range): boolean => value
          + >= range.min && value <= range.max;                          
       61 +const clamp = (value: number, range: Range): number => Math.mi
          +n(range.max, Math.max(range.min, value));                     
       62 +                                                              
       63 +/** Reports keys of `object` that are not in `known`, as `${pa
          +th}.${key}` (Q4). */                                          
       64 +function reportUnknownKeys(object: Json, known: readonly strin
          +g[], path: string, problems: ConfigProblem[]): void {         
       65 +  for (const key of Object.keys(object)) {                    
       66 +    if (!known.includes(key)) problems.push({ field: path ? `$
          +{path}.${key}` : key, value: object[key] });                  
       67 +  }                                                           
       68 +}                                                             
       69 +                                                              
       70 +function checkCurrency(value: unknown): string | null {       
       71 +  if (typeof value !== 'string' || value.trim() === '') return
          + null;                                                        
       72 +  const code = value.trim().toUpperCase();                    
       73 +  try {                                                       
       74 +    const supported =                                         
       75 +      typeof Intl.supportedValuesOf === 'function'            
       76 +        ? Intl.supportedValuesOf('currency').includes(code)   
       77 +        : /^[A-Z]{3}$/.test(code);                            
       78 +    if (!supported) return null;                              
       79 +    // Only 2-decimal currencies: amounts are calculated in ce
          +nts (A1 config rules, plan §8).                               
       80 +    const digits = new Intl.NumberFormat('en-US', { style: 'cu
          +rrency', currency: code }).resolvedOptions()                  
       81 +      .maximumFractionDigits;                                 
       82 +    return digits === 2 ? code : null;                        
       83 +  } catch {                                                   
       84 +    return null;                                              
       85 +  }                                                           
       86 +}                                                             
       87 +                                                              
       88 +function checkLocale(value: unknown): string | null {         
       89 +  if (typeof value !== 'string' || value.trim() === '') return
          + null;                                                        
       90 +  try {                                                       
       91 +    return Intl.NumberFormat.supportedLocalesOf(value.trim())[
          +0] ?? null;                                                   
       92 +  } catch {                                                   
       93 +    return null; // "not a locale!!" throws RangeError        
       94 +  }                                                           
       95 +}                                                             
       96 +                                                              
       97 +/** Text fields: missing, null or blank → `fallback` silently;
          + non-text → problem (A3.3–A3.5, Q10). */                      
       98 +function checkText<T>(                                        
       99 +  json: Json,                                                 
      100 +  key: 'officeName' | 'disclaimer',                           
      101 +  fallback: T,                                                
      102 +  problems: ConfigProblem[],                                  
      103 +): string | T {                                               
      104 +  const value = json[key];                                    
      105 +  if (value === undefined || value === null) return fallback; 
      106 +  if (typeof value !== 'string') {                            
      107 +    problems.push({ field: key, value });                     
      108 +    return fallback;                                          
      109 +  }                                                           
      110 +  const trimmed = value.trim();                               
      111 +  return trimmed === '' ? fallback : trimmed;                 
      112 +}                                                             
      113 +                                                              
      114 +function checkLimits(value: unknown, problems: ConfigProblem[]
          +): Limits {                                                   
      115 +  const limits: Limits = { ...DEFAULT_LIMITS };               
      116 +  if (value === undefined) return limits;                     
      117 +  if (!isPlainObject(value)) {                                
      118 +    problems.push({ field: 'limits', value });                
      119 +    return limits;                                            
      120 +  }                                                           
      121 +  for (const key of Object.keys(value)) {                     
      122 +    const field = `limits.${key}`;                            
      123 +    if (!(LIMIT_KEYS as readonly string[]).includes(key)) {   
      124 +      problems.push({ field, value: value[key] });            
      125 +      continue;                                               
      126 +    }                                                         
      127 +    const name = key as keyof Limits;                         
      128 +    const range = value[key];                                 
      129 +    if (!isPlainObject(range)) {                              
      130 +      problems.push({ field, value: range });                 
      131 +      continue;                                               
      132 +    }                                                         
      133 +    const builtIn = DEFAULT_LIMITS[name];                     
      134 +    const { min, max } = range;                               
      135 +    const valid =                                             
      136 +      isFiniteNumber(min) &&                                  
      137 +      isFiniteNumber(max) &&                                  
      138 +      min <= max &&                                           
      139 +      min >= builtIn.min && // Q2: limits may only narrow the 
          +built-in ranges                                               
      140 +      max <= builtIn.max &&                                   
      141 +      hasAtMostDecimals(min, DECIMALS[name]) &&               
      142 +      hasAtMostDecimals(max, DECIMALS[name]);                 
      143 +    if (valid) {                                              
      144 +      limits[name] = { min, max };                            
      145 +    } else {                                                  
      146 +      problems.push({ field, value: range });                 
      147 +    }                                                         
      148 +    reportUnknownKeys(range, RANGE_KEYS, field, problems);    
      149 +  }                                                           
      150 +  return limits;                                              
      151 +}                                                             
      152 +                                                              
      153 +function checkDefaults(value: unknown, limits: Limits, problem
          +s: ConfigProblem[]): Defaults {                               
      154 +  let given: Json = {};                                       
      155 +  if (value !== undefined) {                                  
      156 +    if (isPlainObject(value)) {                               
      157 +      given = value;                                          
      158 +      reportUnknownKeys(value, DEFAULT_KEYS, 'defaults', probl
          +ems);                                                         
      159 +    } else {                                                  
      160 +      problems.push({ field: 'defaults', value });            
      161 +    }                                                         
      162 +  }                                                           
      163 +                                                              
      164 +  /** Admin value if valid; else the built-in default (reporte
          +d if the Admin set it), moved inside the limits. */           
      165 +  const pick = (key: keyof Limits): number => {               
      166 +    const raw = given[key];                                   
      167 +    const range = limits[key];                                
      168 +    if (raw !== undefined) {                                  
      169 +      if (isFiniteNumber(raw) && within(raw, range) && hasAtMo
          +stDecimals(raw, DECIMALS[key])) return raw;                   
      170 +      problems.push({ field: `defaults.${key}`, value: raw });
      171 +    }                                                         
      172 +    return clamp(DEFAULT_DEFAULTS[key], range);               
      173 +  };                                                          
      174 +                                                              
      175 +  const homePrice = pick('homePrice');                        
      176 +  const ratePercent = pick('ratePercent');                    
      177 +  const termYears = pick('termYears');                        
      178 +  const extraPayment = pick('extraPayment');                  
      179 +                                                              
      180 +  // Down payment: 0 or more, at most 2 decimals, below the de
          +fault price (Q3).                                             
      181 +  const fallbackDown = DEFAULT_DEFAULTS.downPayment < homePric
          +e ? DEFAULT_DEFAULTS.downPayment : 0;                         
      182 +  let downPayment = fallbackDown;                             
      183 +  const rawDown = given.downPayment;                          
      184 +  if (rawDown !== undefined) {                                
      185 +    if (isFiniteNumber(rawDown) && rawDown >= 0 && rawDown < h
          +omePrice && hasAtMostDecimals(rawDown, 2)) {                  
      186 +      downPayment = rawDown;                                  
      187 +    } else {                                                  
      188 +      problems.push({ field: 'defaults.downPayment', value: ra
          +wDown });                                                     
      189 +    }                                                         
      190 +  }                                                           
      191 +                                                              
      192 +  return { homePrice, downPayment, ratePercent, termYears, ext
          +raPayment };                                                  
      193 +}                                                             
      194 +                                                              
      195 +function checkPresets(value: unknown, limits: Limits, problems
          +: ConfigProblem[]): Preset[] {                                
      196 +  if (value === undefined) return [];                         
      197 +  if (!Array.isArray(value)) {                                
      198 +    problems.push({ field: 'presets', value });               
      199 +    return [];                                                
      200 +  }                                                           
      201 +                                                              
      202 +  const presets: Preset[] = [];                               
      203 +  const seenIds = new Set<string>();                          
      204 +  value.forEach((item: unknown, index) => {                   
      205 +    const position = `presets[${index}]`;                     
      206 +    if (!isPlainObject(item)) {                               
      207 +      problems.push({ field: position, value: item });        
      208 +      return;                                                 
      209 +    }                                                         
      210 +    reportUnknownKeys(item, PRESET_KEYS, position, problems); 
      211 +                                                              
      212 +    const name = typeof item.name === 'string' && item.name.tr
          +im() !== '' ? item.name.trim() : null;                        
      213 +    const label = name ? `presets: ${name}` : position; // Q5 
      214 +    const id = typeof item.id === 'string' && item.id.trim() !
          +== '' ? item.id.trim() : null;                                
      215 +    const { ratePercent, termYears, description } = item;     
      216 +                                                              
      217 +    const valid =                                             
      218 +      id !== null &&                                          
      219 +      name !== null &&                                        
      220 +      isFiniteNumber(ratePercent) &&                          
      221 +      within(ratePercent, limits.ratePercent) &&              
      222 +      hasAtMostDecimals(ratePercent, DECIMALS.ratePercent) && 
      223 +      isFiniteNumber(termYears) &&                            
      224 +      Number.isInteger(termYears) &&                          
      225 +      within(termYears, limits.termYears) &&                  
      226 +      (description === undefined || description === null || ty
          +peof description === 'string');                               
      227 +    if (!valid) {                                             
      228 +      problems.push({ field: label, value: item });           
      229 +      return;                                                 
      230 +    }                                                         
      231 +    if (seenIds.has(id)) {                                    
      232 +      problems.push({ field: `presets: duplicate id ${id}`, va
          +lue: item }); // A2.4: first one wins                         
      233 +      return;                                                 
      234 +    }                                                         
      235 +    seenIds.add(id);                                          
      236 +    const text = typeof description === 'string' && descriptio
          +n.trim() !== '' ? description.trim() : null;                  
      237 +    presets.push({ id, name, ratePercent, termYears, descripti
          +on: text });                                                  
      238 +  });                                                         
      239 +  return presets;                                             
      240 +}                                                             
      241 +                                                              
      242 +function copyOfDefaults(): AppConfig {                        
      243 +  return {                                                    
      244 +    ...DEFAULT_CONFIG,                                        
      245 +    defaults: { ...DEFAULT_CONFIG.defaults },                 
      246 +    limits: { ...DEFAULT_CONFIG.limits },                     
      247 +    presets: [],                                              
      248 +  };                                                          
      249 +}                                                             
      250 +                                                              
      251 +/** Result for a file that cannot be used at all (E11). */    
      252 +export function unusableConfig(reason: string, value: unknown)
          +: ConfigResult {                                              
      253 +  return {                                                    
      254 +    config: copyOfDefaults(),                                 
      255 +    problems: [{ field: 'config.json', value }],              
      256 +    notice: { id: 'E11', text: MESSAGES.E11(reason) },        
      257 +  };                                                          
      258 +}                                                             
      259 +                                                              
      260 +export function validateConfig(json: unknown): ConfigResult { 
      261 +  if (!isPlainObject(json)) return unusableConfig('not a JSON 
          +object', json);                                               
      262 +                                                              
      263 +  const problems: ConfigProblem[] = [];                       
      264 +  const config = copyOfDefaults();                            
      265 +                                                              
      266 +  if (json.currency !== undefined) {                          
      267 +    const currency = checkCurrency(json.currency);            
      268 +    if (currency) config.currency = currency;                 
      269 +    else problems.push({ field: 'currency', value: json.curren
          +cy });                                                        
      270 +  }                                                           
      271 +  if (json.locale !== undefined) {                            
      272 +    const locale = checkLocale(json.locale);                  
      273 +    if (locale) config.locale = locale;                       
      274 +    else problems.push({ field: 'locale', value: json.locale }
          +);                                                            
      275 +  }                                                           
      276 +  config.officeName = checkText(json, 'officeName', null, prob
          +lems);                                                        
      277 +  config.disclaimer = checkText(json, 'disclaimer', DEFAULT_CO
          +NFIG.disclaimer, problems);                                   
      278 +  // Limits first: defaults and presets are checked against th
          +e limits actually in use.                                     
      279 +  config.limits = checkLimits(json.limits, problems);         
      280 +  config.defaults = checkDefaults(json.defaults, config.limits
          +, problems);                                                  
      281 +  config.presets = checkPresets(json.presets, config.limits, p
          +roblems);                                                     
      282 +  reportUnknownKeys(json, TOP_LEVEL_KEYS, '', problems);      
      283 +                                                              
      284 +  const notice: ConfigNotice | null =                         
      285 +    problems.length > 0 ? { id: 'E12', text: MESSAGES.E12(prob
          +lems.map((p) => p.field).join(', ')) } : null;                
      286 +  return { config, problems, notice };                        
      287 +}                                                             

⏺ Write(src/config/loadConfig.ts)  ⎿  Added 55 lines, removed 2 lines
       1 -// Placeholder. Implemented in a later step (see docs/product-p
         -lan.md §4).                                                    
       2 -export {};                                                     
       1 +/**                                                            
       2 + * Loads public/config.json. Never rejects: always resolves to 
         +a complete, valid config (A4).                                 
       3 + * The only network request the app makes besides its own files
         + (A5.4).                                                       
       4 + */                                                            
       5 +import { isPlainObject, unusableConfig, validateConfig, type Co
         +nfigResult } from './schema';                                  
       6 +                                                               
       7 +export interface FetchResponseLike {                           
       8 +  ok: boolean;                                                 
       9 +  status: number;                                              
      10 +  text(): Promise<string>;                                     
      11 +}                                                              
      12 +                                                               
      13 +/** The part of `fetch` used here, so tests can pass a fake. */
      14 +export type FetchLike = (url: string, init: { cache: 'no-store'
         + }) => Promise<FetchResponseLike>;                             
      15 +                                                               
      16 +const CONFIG_URL = './config.json'; // relative, so it works fr
         +om any folder or sub-path                                      
      17 +                                                               
      18 +const browserFetch: FetchLike = (url, init) => fetch(url, init)
         +;                                                              
      19 +                                                               
      20 +function failure(reason: string, detail: unknown): ConfigResult
         + {                                                             
      21 +  console.warn(`[config] Configuration could not be loaded (${r
         +eason}).`, detail);                                            
      22 +  return unusableConfig(reason, detail);                       
      23 +}                                                              
      24 +                                                               
      25 +export async function loadConfig(fetchFn: FetchLike = browserFe
         +tch): Promise<ConfigResult> {                                  
      26 +  let body: string;                                            
      27 +  try {                                                        
      28 +    // no-store: an edited config.json shows on the next reload
         +.                                                              
      29 +    const response = await fetchFn(CONFIG_URL, { cache: 'no-sto
         +re' });                                                        
      30 +    if (response.status === 404) return failure('file not found
         +', response.status);                                           
      31 +    if (!response.ok) return failure('network error', response.
         +status);                                                       
      32 +    body = await response.text();                              
      33 +  } catch (error) {                                            
      34 +    return failure('network error', error);                    
      35 +  }                                                            
      36 +                                                               
      37 +  let json: unknown;                                           
      38 +  try {                                                        
      39 +    json = JSON.parse(body);                                   
      40 +  } catch (error) {                                            
      41 +    return failure('invalid JSON', error);                     
      42 +  }                                                            
      43 +                                                               
      44 +  try {                                                        
      45 +    if (!isPlainObject(json)) return failure('not a JSON object
         +', json);                                                      
      46 +    const result = validateConfig(json);                       
      47 +    for (const problem of result.problems) {                   
      48 +      console.warn(`[config] Invalid setting "${problem.field}"
         +:`, problem.value);                                            
      49 +    }                                                          
      50 +    return result;                                             
      51 +  } catch (error) {                                            
      52 +    // validateConfig is written not to throw; this is defence 
         +in depth so the app always starts.                             
      53 +    return failure('invalid JSON', error);                     
      54 +  }                                                            
      55 +}                                                              

⏺ Update(src/messages.ts)
  ⎿  Added 4 lines
      15    E6: (min: string, max: string) => `Enter an extra payment bet
          ween ${min} and ${max}.`,
      16    E7: 'The loan amount is too small for this term.',
      17    E10: 'Could not calculate this loan. Please check your inputs
          .',
      18 +  /** reason: "file not found", "invalid JSON", "not a JSON obj
         +ect" or "network error". */                                    
      19 +  E11: (reason: string) => `Configuration could not be loaded (
         +${reason}). Using default settings.`,                          
      20 +  /** list: problem names joined with ", ". */                 
      21 +  E12: (list: string) => `Some settings were invalid and defaul
         +ts are used instead: ${list}.`,                                
      22  } as const;

  Ran 1 shell command (ctrl+o to expand)

⏺ All 226 tests pass, and the type check is clean. Next, the example
  public/config.json, plus a test that the shipped file itself validates without
  problems, so a typo in it can't ship unnoticed:

  Ran 1 shell command (ctrl+o to expand)

⏺ That added @types/node as a dev dependency, just to type node:fs in one test.
  You asked for minimal dependencies, so I'll import the JSON file directly
  instead and remove the package:

  Ran 1 shell command (ctrl+o to expand)

⏺ Back to git. Before any commit I'm checking whether the exported transcripts
  contain the token you pasted earlier:

  Ran 1 shell command (ctrl+o to expand)

⏺ The token is in transcripts/session-03-part3.md. I'll make the checkpoint
  commit without transcripts/, so the token can never reach the repository
  through my commits. Nothing else contains it.

  Ran 1 shell command (ctrl+o to expand)

⏺ Config loading (A1–A4) is done, and all 227 tests pass. I made a checkpoint
  commit c72ffd9. I left transcripts/ out of it because one file contains your
  GitHub token.

  Doc changes (user-stories.md)

  Under A1, a schema table and two rules:
  **Config schema** (`public/config.json`, every key optional):
  | `currency` | ISO 4217 code with 2 decimals, e.g. "USD", "EUR", "PKR". 
  Lowercase is accepted and converted to uppercase. | "USD" |
  | `locale` | BCP 47 tag, e.g. "en-US", "de-DE" | "en-US" |
  | `officeName` | text, trimmed | none |
  | `disclaimer` | text, trimmed | "Estimates only. Not a loan offer or 
  financial advice." |
  | `defaults.homePrice`, `defaults.downPayment`, `defaults.ratePercent`, 
  `defaults.termYears`, `defaults.extraPayment` | numbers | 350000, 50000, 6, 
  30, 0 |
  | `limits.homePrice`, `limits.ratePercent`, `limits.termYears`, 
  `limits.extraPayment` | { "min": number, "max": number } | the Valid ranges in
  Shared definitions |
  | `presets` | list of { "id", "name", "ratePercent", "termYears", 
  "description"? } (A2) | none |

  **Config rules**
  - Limits can only narrow the built-in Valid ranges, never widen them: each 
  `min` must be at least the built-in minimum and each `max` at most the 
  built-in maximum (home price 100,000,000, rate 30, term 40, extra payment 
  10,000,000), because the engine is only tested within those ranges. A limit 
  outside them falls back to the built-in limit and is listed in E12.
  - `currency` must be a code that `Intl.supportedValuesOf("currency")` lists 
  and that has exactly 2 decimals. Currencies with 0 or 3 decimals (such as JPY 
  or KWD) are rejected with E12 and fall back to USD, because amounts are 
  calculated in cents.
  Under A4:
  **Config rule:** keys the schema (A1) does not know, at the top level or 
  nested (for example a typo such as "currncy" or "limits": { "rate": … }), are 
  listed in E12 and logged to the console, so the Admin notices the mistake 
  (J-12). Missing keys give no warning (A1.4).
  The rate keys now use ratePercent everywhere: in config, limits, defaults and
  presets, matching A1.3. The form field keeps its UI name interestRate.

  How the steps went

  1. Renaming the limit key to ratePercent: the existing 136 tests still passed
     afterwards.
  2. Before the code: 90 new tests failed with validateConfig is not a function.
  3. After writing the code, they all passed on the first run.
  4. The shipped public/config.json has a test of its own, which checks that it
     validates with zero problems.
  5. I briefly added @types/node so that test could read the file from disk. I
     removed it again and import the JSON instead (resolveJsonModule in
     tsconfig). The dependencies are back to Vite, TypeScript and Vitest.

  Final output

   amortize.test.ts   49    parse.test.ts   38    validate.test.ts   48
   config.test.ts     91    (defaults, G whole file, C currency/locale, R 
  limits, D defaults,
                             PR presets, S texts, U unknown keys, G4 
  never-throws, L fetch wrapper, shipped file)
   setup.test.ts       1

   Test Files  5 passed (5)
        Tests  227 passed (227)
  tsc OK · vite build ✓

  Choices I made that you should check

  - A built-in default that falls outside limits the Admin has narrowed moves to
    the nearest limit, without a warning. Example: price max 200,000 makes the
    price default 200,000. The Admin didn't make a mistake, so there's nothing
    to warn about.
  - A preset with an unknown key (such as "rate") is kept. The unknown key is
    listed in E12 and ignored.
  - currency: null is reported, but disclaimer: null and officeName: null are 
    not. A3.3 treats a missing disclaimer as normal. For currency, I treat null
    as a mistake.

  Git and export

  - Your messages conflict on git. One said "strictly prohibited to update
    anything related to git", and this one asks for checkpoint commits. I
    followed the newer one. Commits are local only: I won't push, and I won't
    add a remote. If you want no commits after all, say so and I'll stop.
  - Remove the token from transcripts/session-03-part3.md before you commit or 
    submit it. That's the only file that contains it. Please also revoke the
    token on GitHub if you haven't yet. Under your rules I don't touch
    transcripts/, so you'll have to do this yourself.
  - I can't run /export. It's a Claude Code command only you can type.
    transcripts/session-03-part3.md already exists from your earlier export. For
    this part, run /export transcripts/session-03-part4.md, or re-export part 3
    to overwrite it.

  Next is Step 5: the UI (form, results, schedule, CSV, preset selector, banner,
  footer, accessibility). That's where L1, L2, L3, L5, L8, M1 and the A1–A4 UI
  parts become testable end to end.

✻ Cogitated for 4m 40s · done 7:34 PM

❯ Do a relvent commit but not pushed, i will do that later, and aslo i have     
  remove the token                                                              

  Ran 3 shell commands (ctrl+o to expand)

⏺ That one match is only my earlier advice ("Search for ghp_…"). Checking that
  the token itself is gone:

  Ran 2 shell commands (ctrl+o to expand)

⏺ I committed the transcripts. Nothing has been pushed, and the repo still has
  no remote.

  Before committing, I scanned every file in the project for anything shaped
  like a GitHub token and found none. The only remaining ghp_ text is my own
  earlier advice ("Search for ghp_ and delete…"). Please still revoke the token
  on GitHub if you haven't, because it appeared in this conversation.

  cce2b32  Add AI session transcripts (sessions 2 and 3, parts 1-3)
  c72ffd9  Add engine, input validation and config loading
  Both commits are authored as usamakh1 <iusamakhawaja@gmail.com>, and the
  working tree is clean.

  When you push, the repo's commands need two changes: git add README.md will
  fail because there's no README yet, so skip that line, and check the trailing
  hyphen in mortgage-calculator-.git. Since the commits already exist, you only
  need to add the remote and push:
  git branch -M main
  git remote add origin https://github.com/usamakh1/mortgage-calculator-.git
  git push -u origin main

  Next is Step 5, the UI.

✻ Sautéed for 30s · done 7:39 PM

❯ Your three choices are approved. Good catch on the token.                     
                                                                                
  Step 5a: the main UI (src/ui, src/main.ts, index.html, CSS), wired to the     
  engine, validation                                                            
  and config. Covers the UI parts of L1, L2, L8, A1.2, A3 and A4.6:             
  - Form: home price, down payment, rate, term (extra payment and presets come  
  in 5c),                                                                       
    prefilled from config defaults. Results update on every input, with no      
  button.                                                                       
  - Results: loan amount, monthly payment, total interest, total paid, payoff   
  date,                                                                         
    formatted with the config currency and locale.                              
  - Errors per input rule 11, the ARIA from L8.18, E8 replacing all results     
  (L8.15), E9/E10 (L8.19/20).                                                   
  - Footer with officeName and disclaimer via textContent only. Config banner   
  with Dismiss.                                                                 
  - Simple, clean, readable design; usable at 360px; visible keyboard focus.    
    For DOM tests, one dev dependency (e.g. happy-dom) is OK if needed.         
    Build it, run all tests, then give me a short checklist of what to try by   
  hand in the browser.                                                          

⏺ Building the UI. First I'm adding happy-dom (one dev dependency, for DOM
  tests):

  Ran 1 shell command (ctrl+o to expand)

⏺ Update(src/messages.ts)
  ⎿  Added 2 lines
      14    E5: (min: string, max: string) => `Enter a whole number of ye
          ars between ${min} and ${max}.`,
      15    E6: (min: string, max: string) => `Enter an extra payment bet
          ween ${min} and ${max}.`,
      16    E7: 'The loan amount is too small for this term.',
      17 +  E8: 'Fix the highlighted fields to see your results.',       
      18 +  E9: 'Something went wrong. Your inputs are kept; please try a
         +gain.',                                                        
      19    E10: 'Could not calculate this loan. Please check your inputs
          .',
      20    /** reason: "file not found", "invalid JSON", "not a JSON obj
          ect" or "network error". */
      21    E11: (reason: string) => `Configuration could not be loaded (
          ${reason}). Using default settings.`,

  Ran 1 shell command (ctrl+o to expand)

⏺ Now the UI modules: formatting, form, results, banner and footer, and the
  controller that wires them together.

⏺ Write(src/ui/format.ts)
  ⎿  Wrote 31 lines to src/ui/format.ts
      1 /** Display formatting with the configured currency and locale (A
        1.1). */
      2 import type { YearMonth } from '../engine/amortize';
      3 
      4 export interface Formatters {
      5   /** Integer cents → e.g. "$1,798.65" or "1.798,65 €". */
      6   money(cents: number): string;
      7   /** { year: 2056, month: 11 } → e.g. "November 2056". */
      8   month(value: YearMonth): string;
      9 }
     … +22 lines (ctrl+o to expand)

⏺ Write(src/ui/form.ts)
  ⎿  Added 106 lines, removed 2 lines
        1 -// Placeholder. Implemented in a later step (see docs/product-
          -plan.md §4).                                                  
        2 -export {};                                                    
        1 +/**                                                           
        2 + * The loan form. Builds the inputs and shows per-field messag
          +es with the ARIA from L8.18.                                  
        3 + * All text comes from messages.ts; values are read as raw str
          +ings and parsed by validate.ts.                               
        4 + */                                                           
        5 +import type { Field, RawInputs } from '../engine/validate';   
        6 +import { UI_TEXT } from '../messages';                        
        7 +                                                              
        8 +export interface FieldSpec {                                  
        9 +  field: Field;                                               
       10 +  label: string;                                              
       11 +  inputMode: 'decimal' | 'numeric';                           
       12 +}                                                             
       13 +                                                              
       14 +/** Fields shown in 5a. Extra payment is added in 5c. */      
       15 +export const FORM_FIELDS: readonly FieldSpec[] = [            
       16 +  { field: 'homePrice', label: UI_TEXT.homePrice, inputMode: '
          +decimal' },                                                   
       17 +  { field: 'downPayment', label: UI_TEXT.downPayment, inputMod
          +e: 'decimal' },                                               
       18 +  { field: 'interestRate', label: UI_TEXT.interestRate, inputM
          +ode: 'decimal' },                                             
       19 +  { field: 'termYears', label: UI_TEXT.termYears, inputMode: '
          +numeric' },                                                   
       20 +];                                                            
       21 +                                                              
       22 +export interface FormView {                                   
       23 +  element: HTMLFormElement;                                   
       24 +  inputs: Partial<Record<Field, HTMLInputElement>>;           
       25 +  /** Current raw text of every field; fields not on the form 
          +read as "". */                                                
       26 +  read(): RawInputs;                                          
       27 +  /** Shows (text) or clears (null) the message under a field.
          + */                                                           
       28 +  setError(field: Field, text: string | null): void;          
       29 +}                                                             
       30 +                                                              
       31 +export const inputId = (field: Field): string => `field-${fiel
          +d}`;                                                          
       32 +export const errorId = (field: Field): string => `field-${fiel
          +d}-error`;                                                    
       33 +                                                              
       34 +export function createForm(specs: readonly FieldSpec[], initia
          +l: Partial<Record<Field, string>>): FormView {                
       35 +  const form = document.createElement('form');                
       36 +  form.className = 'loan-form';                               
       37 +  form.noValidate = true;                                     
       38 +  form.addEventListener('submit', (event) => event.preventDefa
          +ult()); // results update live; Enter does nothing            
       39 +                                                              
       40 +  const inputs: Partial<Record<Field, HTMLInputElement>> = {};
       41 +  const errors: Partial<Record<Field, HTMLElement>> = {};     
       42 +  const wrappers: Partial<Record<Field, HTMLElement>> = {};   
       43 +                                                              
       44 +  for (const spec of specs) {                                 
       45 +    const wrapper = document.createElement('div');            
       46 +    wrapper.className = 'field';                              
       47 +                                                              
       48 +    const label = document.createElement('label');            
       49 +    label.htmlFor = inputId(spec.field);                      
       50 +    label.textContent = spec.label;                           
       51 +                                                              
       52 +    const input = document.createElement('input');            
       53 +    input.id = inputId(spec.field);                           
       54 +    input.name = spec.field;                                  
       55 +    input.type = 'text'; // not type=number: it rejects "1,500
          +,000" and behaves differently per browser                     
       56 +    input.inputMode = spec.inputMode;                         
       57 +    input.autocomplete = 'off';                               
       58 +    input.spellcheck = false;                                 
       59 +    input.value = initial[spec.field] ?? '';                  
       60 +                                                              
       61 +    // Always present, so screen readers announce changes (ari
          +a-live).                                                      
       62 +    const error = document.createElement('p');                
       63 +    error.id = errorId(spec.field);                           
       64 +    error.className = 'field-error';                          
       65 +    error.setAttribute('aria-live', 'polite');                
       66 +                                                              
       67 +    wrapper.append(label, input, error);                      
       68 +    form.append(wrapper);                                     
       69 +    inputs[spec.field] = input;                               
       70 +    errors[spec.field] = error;                               
       71 +    wrappers[spec.field] = wrapper;                           
       72 +  }                                                           
       73 +                                                              
       74 +  return {                                                    
       75 +    element: form,                                            
       76 +    inputs,                                                   
       77 +    read: () => ({                                            
       78 +      homePrice: inputs.homePrice?.value ?? '',               
       79 +      downPayment: inputs.downPayment?.value ?? '',           
       80 +      interestRate: inputs.interestRate?.value ?? '',         
       81 +      termYears: inputs.termYears?.value ?? '',               
       82 +      extraPayment: inputs.extraPayment?.value ?? '',         
       83 +    }),                                                       
       84 +    setError(field, text) {                                   
       85 +      const input = inputs[field];                            
       86 +      const error = errors[field];                            
       87 +      const wrapper = wrappers[field];                        
       88 +      if (!input || !error || !wrapper) return;               
       89 +      if (text === null) {                                    
       90 +        input.removeAttribute('aria-invalid');                
       91 +        input.removeAttribute('aria-describedby');            
       92 +        wrapper.classList.remove('has-error');                
       93 +        error.replaceChildren();                              
       94 +        return;                                               
       95 +      }                                                       
       96 +      input.setAttribute('aria-invalid', 'true');             
       97 +      input.setAttribute('aria-describedby', errorId(field)); 
       98 +      wrapper.classList.add('has-error');                     
       99 +      const marker = document.createElement('span');          
      100 +      marker.className = 'error-marker';                      
      101 +      marker.setAttribute('aria-hidden', 'true');             
      102 +      marker.textContent = UI_TEXT.errorMarker;               
      103 +      error.replaceChildren(marker, document.createTextNode(te
          +xt));                                                         
      104 +    },                                                        
      105 +  };                                                          
      106 +}                                                             

⏺ Write(src/ui/results.ts)
  ⎿  Added 77 lines, removed 2 lines
       1 -// Placeholder. Implemented in a later step (see docs/product-p
         -lan.md §4).                                                    
       2 -export {};                                                     
       1 +/**                                                            
       2 + * The results area. Shows either the calculated figures or exa
         +ctly one message (E7–E10),                                     
       3 + * never both, so nothing from earlier inputs stays on screen (
         +L8.15).                                                        
       4 + */                                                            
       5 +import type { LoanResult } from '../engine/amortize';          
       6 +import { UI_TEXT } from '../messages';                         
       7 +import type { Formatters } from './format';                    
       8 +                                                               
       9 +export interface ResultsView {                                 
      10 +  element: HTMLElement;                                        
      11 +  /** Renders the figures. Returns false (and renders nothing) 
         +if any value is unsafe (L8.20). */                             
      12 +  showResult(result: LoanResult, principalCents: number): boole
         +an;                                                            
      13 +  showMessage(text: string): void;                             
      14 +}                                                              
      15 +                                                               
      16 +const isSafeAmount = (value: number): boolean => Number.isSafeI
         +nteger(value) && value >= 0;                                   
      17 +                                                               
      18 +export function createResults(format: Formatters): ResultsView 
         +{                                                              
      19 +  const section = document.createElement('section');           
      20 +  section.className = 'results';                               
      21 +  section.setAttribute('aria-labelledby', 'results-heading');  
      22 +                                                               
      23 +  const heading = document.createElement('h2');                
      24 +  heading.id = 'results-heading';                              
      25 +  heading.textContent = UI_TEXT.resultsHeading;                
      26 +                                                               
      27 +  const body = document.createElement('div');                  
      28 +  body.className = 'results-body';                             
      29 +  section.append(heading, body);                               
      30 +                                                               
      31 +  const item = (label: string, value: string, name: string, not
         +e?: string): HTMLElement => {                                  
      32 +    const wrapper = document.createElement('div');             
      33 +    wrapper.className = `result result-${name}`;               
      34 +    const dt = document.createElement('dt');                   
      35 +    dt.textContent = label;                                    
      36 +    const dd = document.createElement('dd');                   
      37 +    dd.dataset.result = name;                                  
      38 +    dd.textContent = value;                                    
      39 +    wrapper.append(dt, dd);                                    
      40 +    if (note) {                                                
      41 +      const small = document.createElement('dd');              
      42 +      small.className = 'result-note';                         
      43 +      small.textContent = note;                                
      44 +      wrapper.append(small);                                   
      45 +    }                                                          
      46 +    return wrapper;                                            
      47 +  };                                                           
      48 +                                                               
      49 +  return {                                                     
      50 +    element: section,                                          
      51 +    showResult(result, principalCents) {                       
      52 +      const amounts = [principalCents, result.monthlyPaymentCen
         +ts, result.totalInterestCents, result.totalPaidCents];         
      53 +      const dates = [result.payoff.year, result.payoff.month]; 
      54 +      if (!amounts.every(isSafeAmount) || !dates.every((n) => N
         +umber.isSafeInteger(n) && n > 0)) {                            
      55 +        return false;                                          
      56 +      }                                                        
      57 +      const list = document.createElement('dl');               
      58 +      list.className = 'result-list';                          
      59 +      list.append(                                             
      60 +        item(UI_TEXT.monthlyPayment, format.money(result.monthl
         +yPaymentCents), 'monthly-payment', UI_TEXT.monthlyPaymentNote),
      61 +        item(UI_TEXT.loanAmount, format.money(principalCents), 
         +'loan-amount'),                                                
      62 +        item(UI_TEXT.totalInterest, format.money(result.totalIn
         +terestCents), 'total-interest'),                               
      63 +        item(UI_TEXT.totalPaid, format.money(result.totalPaidCe
         +nts), 'total-paid'),                                           
      64 +        item(UI_TEXT.payoffDate, format.month(result.payoff), '
         +payoff-date'),                                                 
      65 +      );                                                       
      66 +      body.replaceChildren(list);                              
      67 +      return true;                                             
      68 +    },                                                         
      69 +    showMessage(text) {                                        
      70 +      const message = document.createElement('p');             
      71 +      message.className = 'results-message';                   
      72 +      message.setAttribute('role', 'status');                  
      73 +      message.textContent = text;                              
      74 +      body.replaceChildren(message);                           
      75 +    },                                                         
      76 +  };                                                           
      77 +}                                                              

⏺ Write(src/ui/layout.ts)
  ⎿  Wrote 39 lines to src/ui/layout.ts
       1 /** Page chrome: config banner (A4) and footer (A3). All config 
         text is set with textContent only (A3.2). */
       2 import type { ConfigNotice } from '../config/schema';
       3 import { UI_TEXT } from '../messages';
       4 
       5 export function createBanner(notice: ConfigNotice | null): HTMLE
         lement | null {
       6   if (!notice) return null;
       7   const banner = document.createElement('div');
       8   banner.className = 'config-banner';
     … +31 lines (ctrl+o to expand)

⏺ Write(src/ui/app.ts)
  ⎿  Wrote 124 lines to src/ui/app.ts
       1 /**
       2  * Wires config, form, validation, engine and results together.
       3  * Message timing follows input rule 11 (docs/user-stories.md, S
         hared definitions):
       4  * a field's message appears when the field is left, and disappe
         ars as soon as the value is
       5  * valid while typing; the results area switches to E8 immediate
         ly on any invalid input.
       6  */
       7 import { calculateLoan, type CalcOutcome, type LoanInput } from 
     … +118 lines (~4 KB) (ctrl+o to expand)

⏺ Write(src/main.ts)
  ⎿  Added 11 lines, removed 6 lines
       1 -import { APP_TITLE } from './messages';                        
       1 +import './ui/styles.css';                                      
       2 +import { loadConfig } from './config/loadConfig';              
       3 +import { validateConfig } from './config/schema';              
       4 +import { createApp, installGlobalErrorHandlers } from './ui/app
         +';                                                             
       5  
       3 -const app = document.querySelector<HTMLElement>('#app');       
       4 -if (app) {                                                     
       5 -  const heading = document.createElement('h1');                
       6 -  heading.textContent = APP_TITLE;                             
       7 -  app.append(heading);                                         
       6 +const root = document.querySelector<HTMLElement>('#app');      
       7 +                                                               
       8 +if (root) {                                                    
       9 +  // loadConfig never rejects; the catch is defence in depth so
         + the calculator always starts.                                 
      10 +  loadConfig()                                                 
      11 +    .catch(() => validateConfig({}))                           
      12 +    .then((configResult) => installGlobalErrorHandlers(createAp
         +p(root, configResult)));                                       
      13  }

⏺ Write(index.html)  ⎿  Added 3 lines, removed 1 line
       3    <head>
       4      <meta charset="UTF-8" />
       5      <meta name="viewport" content="width=device-width, initial-
          scale=1" />
       6 +    <meta name="description" content="See what a home loan cost
         +s each month and in total." />                                 
       7      <title>Mortgage Calculator</title>
       8    </head>
       9    <body>
       9 -    <main id="app"></main>                                     
      10 +    <div id="app"></div>                                       
      11 +    <noscript>This calculator needs JavaScript to run.</noscrip
         +t>                                                             
      12      <script type="module" src="/src/main.ts"></script>
      13    </body>
      14  </html>

⏺ Now the stylesheet. It uses one column on phones and two from 760 px, with a
  visible focus ring, an error marker that doesn't rely on colour, and light and
  dark themes.

⏺ Write(src/ui/styles.css)
  ⎿  Wrote 282 lines to src/ui/styles.css
       1 /* Mortgage Calculator: one column on phones, two from 760px. Co
         lors meet WCAG AA contrast. */
       2 
       3 :root {
       4   --bg: #f6f7f9;
       5   --surface: #ffffff;
       6   --text: #1b1f24;
       7   --muted: #535c68;
       8   --border: #c9d0d8;
       9   --accent: #1d5fbf;
     … +273 lines (ctrl+o to expand)

⏺ Now the DOM tests:

⏺ Write(tests/unit/ui.test.ts)
  ⎿  Wrote 356 lines to tests/unit/ui.test.ts
      1 // @vitest-environment happy-dom
      2 import { afterEach, beforeEach, describe, expect, it, vi, type Mo
        ckInstance } from 'vitest';
      3 import { createApp, type AppDependencies } from '../../src/ui/app
        ';
      4 import { validateConfig, type ConfigResult } from '../../src/conf
        ig/schema';
      5 import type { Field } from '../../src/engine/validate';
      6 import type { LoanResult } from '../../src/engine/amortize';
      7 
     … +349 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ All 261 tests pass. Unit tests can't show the layout, though, so I'll run the
  built app and take screenshots at desktop width and at 360 px:

  Called playwright 3 times, ran 2 shell commands (ctrl+o to expand)

⏺ The page reports one console error. Checking that first:

  Called playwright (ctrl+o to expand)

⏺ That's just the browser asking for a missing favicon.ico from the app's own
  origin, a harmless but needless 404. I'm adding an empty inline icon to stop
  that request, then taking the screenshot.

⏺ Update(index.html)
  ⎿  Added 2 lines
       5      <meta name="viewport" content="width=device-width, initial-
          scale=1" />
       6      <meta name="description" content="See what a home loan cost
          s each month and in total." />
       7      <title>Mortgage Calculator</title>
       8 +    <!-- Empty inline icon: stops the browser requesting /favic
         +on.ico (a 404 and an extra request). -->                       
       9 +    <link rel="icon" href="data:," />                          
      10    </head>
      11    <body>
      12      <div id="app"></div>

  Read 1 file, called playwright 2 times, ran 1 shell command (ctrl+o to expand)

⏺ The desktop layout looks right, and the values match the reference (1,798.65 /
  347,515.44 / November 2056). Now the 360 px phone width, with an error
  triggered:

  Read 1 file, called playwright 5 times (ctrl+o to expand)

⏺ At 360 px the page has no horizontal scroll, the error state and focus ring
  render correctly, and the results view has switched to E8. I'm now cleaning up
  the browser, server and screenshot folder before making the checkpoint
  commit.

  Called playwright (ctrl+o to expand)

⏺ Stop Task
  ⎿  cd "/Users/dev/Desktop/Test Project Usama" && npx vite preview --port
     4173 --strictPort · stopped

  Ran 2 shell commands (ctrl+o to expand)

⏺ Step 5a is built: the main page now has the form, live results, error
  messages, the footer and the config banner. All 261 tests pass, the type check
  and build are clean, and I committed it locally as fd81c83 (not pushed).

  What was built

  - Form with home price, down payment, rate and term, prefilled from the config
    defaults. Results recalculate on every keystroke, and there's no Calculate
    button. Pressing Enter does nothing. The fields are plain text inputs rather
    than number inputs, so values like 1,500,000 and 6.5% work in every
    browser.
  - Results: monthly payment (highlighted), loan amount, total interest, total
    paid and payoff date, in the configured currency and locale.
  - Errors follow input rule 11:
    - while you type an invalid value, the results switch to E8 straight away;
    - the field's own message appears only when you leave the field;
    - it disappears as soon as the value becomes valid.

    Each invalid field gets aria-invalid, aria-describedby and a message in an
    aria-live region, plus a "!" marker so the error doesn't depend on colour
    alone. E7, E9 and E10 replace the results the same way E8 does.
  - Footer and config banner: the office name and disclaimer are set as plain
    text only. The banner shows the E11 or E12 text and has a Dismiss button.
  - Design: one column at 360 px and two columns from 760 px, a visible focus
    ring, light and dark themes, and 44 px touch targets.
  - New files: src/ui/app.ts (wires everything together), format.ts, layout.ts
    and styles.css. form.ts and results.ts were filled in. One new dev 
    dependency: happy-dom.

  One rule I had to interpret

  E3 also appears when you leave the home price field, not only the down payment
  field. Rule 11 ties a message to leaving "its" field, but E3 sits under the
  down payment while it can be caused by the price. Without this, lowering the
  price below the down payment would show E8 ("Fix the highlighted fields…")
  with nothing highlighted. Tell me if you'd rather keep it strictly to the down
  payment field.

  Checked in a real browser

  I ran the production build and checked it in Chromium.
  - Desktop: two columns, $1,798.65 / $347,515.44 / November 2056.
  - 360 px: no horizontal scroll, and an invalid rate showed the red border with
    "!" and the message, with E8 in the results area.
  - Console: one error was the browser requesting a missing favicon.ico. I added
    an empty inline icon, and the console is now clean.

  Test output

   amortize 49 · parse 38 · validate 48 · config 91 · ui 34 (new, happy-dom) · 
  setup 1
   Test Files  6 passed (6)
        Tests  261 passed (261)
  tsc OK · vite build ✓ (JS 16.8 kB, CSS 3.5 kB)

  Try by hand (npm run dev, then open the link)

  1. On load you see $1,798.65, $300,000.00, $347,515.44, $647,515.44 and a
     payoff month 360 months after next month. On 6 November 2026 that's
     November 2056.
  2. Live update: change the rate to 5 and the payment becomes $1,610.46 with no
     button.
  3. Message timing: type abc in Home price. The results switch to "Fix the
     highlighted fields…" immediately, but no field message shows yet. Press
     Tab: the red border, "!" and "Enter a home price between 1 and
     100,000,000." appear.
  4. Fixing a field: go back and type 350000. The message disappears as you type
     and the results return.
  5. Down payment: set it to 350000 and leave the field: "Down payment must be
     less than the home price."
  6. Accepted formats: enter 1,500,000 as the price and 6.5% as the rate. Both
     are accepted.
  7. Too-small loan: enter price 1, down 0, rate 30, term 40: "The loan amount
     is too small for this term."
  8. Keyboard: Tab through the page. Every field shows a clear blue focus ring.
  9. Phone width: narrow the window to 360 px (DevTools device toolbar). It
     shows one column with no sideways scrolling.
  10. Banner: in public/config.json, change "currency" to "XYZ" and reload. The
      banner names currency. Dismiss hides it, and it comes back on the next
      reload.
  11. Footer: change "disclaimer" to <b>hi</b> and reload. The footer shows the
      literal text <b>hi</b>, not bold.
  12. Undo the config edits from steps 10 and 11 afterwards.
  13. Console: open DevTools → Console during these steps. There should be no
      red errors. The [config] warnings appear only during step 10.

  Next is 5b, the amortization schedule (L3: monthly and yearly views, CSV
  download), then 5c (extra payment and presets).

✻ Worked for 5m 36s · done 7:46 PM

❯ Checked steps 1–13 by hand: [all as described / or list what differed]. E3 on 
  leaving                                                                       
  the price field is approved.                                                  
                                                                                
  Step 5d: make the design professional before we add more UI. Direction: a     
  calm, trustworthy                                                             
  financial tool (think a modern bank or fintech app), not flashy. Keep all     
  behaviour, texts and                                                          
  tests unchanged.                                                              
  - Design tokens in CSS custom properties: colour palette (one deep brand      
  colour, a neutral                                                             
    scale, success/error colours), spacing scale, radius, shadows, light and    
  dark theme.                                                                   
  - System font stack only and tabular-nums for all amounts. No web fonts, CDNs 
  or external                                                                   
    requests (A5).                                                              
  - Header with the app name and the config officeName.                         
  - Inputs as cards with clear labels, a "$"/currency prefix, and "%" and       
  "years" suffixes                                                              
    (from the config currency, not hard-coded), comfortable 44px+ targets.      
  - Results: the monthly payment as the hero number; loan amount, total         
  interest, total paid                                                          
    and payoff date as a clean grid. Add a simple principal-vs-interest bar of  
  total paid,                                                                   
    with text labels and percentages so it doesn't rely on colour.              
  - Keep WCAG AA contrast in both themes, the visible focus ring, the "!" error 
  marker, the                                                                   
    one column at 360px and two columns from 760px.                             
  - Style the future schedule table and selector with                           
    Then take Playwright screenshots (desktop + 360px, light + dark, plus one   
  with an error),                                                               
    look at them critically, fix what looks off, and ru                         

⏺ Your message was cut off at the end ("Style the future schedule table and
  selector with…" and "…and ru"). I'm reading those as: style them with the same
  tokens, and run all tests. Before writing CSS I'll check the colour palette
  against WCAG AA with a small script, so contrast is measured rather than
  guessed:

  Ran 1 shell command (ctrl+o to expand)

⏺ Text pairs all pass AA, but the input borders (1.38:1) fall short of WCAG's
  3:1 requirement, and the dark-mode principal and interest bar segments differ
  by only 1.20:1. I'm giving inputs a stronger border and adding gaps and text
  labels to the bar segments, then checking the input border colours.

  Ran 1 shell command (ctrl+o to expand)

⏺ All pass now. Writing the code, starting with the formatters (percent, and the
  currency symbol with its position, taken from Intl):

⏺ Write(src/ui/format.ts)
  ⎿  Added 37 lines
       1  /** Display formatting with the configured currency and locale 
          (A1.1). */
       2  import type { YearMonth } from '../engine/amortize';
       3  
       4 +export interface CurrencyAffix {                               
       5 +  /** The symbol as Intl shows it for this currency and locale,
         + e.g. "$", "€", "PKR". */                                      
       6 +  symbol: string;                                              
       7 +  /** Whether the locale writes the symbol before ("$1.00") or 
         +after ("1,00 €") the number. */                                
       8 +  position: 'prefix' | 'suffix';                               
       9 +}                                                              
      10 +                                                               
      11  export interface Formatters {
      12    /** Integer cents → e.g. "$1,798.65" or "1.798,65 €". */
      13    money(cents: number): string;
      14    /** { year: 2056, month: 11 } → e.g. "November 2056". */
      15    month(value: YearMonth): string;
      16 +  /** 0.46 → "46%" (or "46 %" in de-DE). */                    
      17 +  percent(fraction: number): string;                           
      18 +  currency: CurrencyAffix;                                     
      19  }
      20  
      21 +function affixOf(format: Intl.NumberFormat): CurrencyAffix {   
      22 +  const parts = format.formatToParts(1);                       
      23 +  const symbolIndex = parts.findIndex((part) => part.type === '
         +currency');                                                    
      24 +  const numberIndex = parts.findIndex((part) => part.type === '
         +integer');                                                     
      25 +  const symbol = parts[symbolIndex]?.value ?? '';              
      26 +  return { symbol, position: symbolIndex > numberIndex ? 'suffi
         +x' : 'prefix' };                                               
      27 +}                                                              
      28 +                                                               
      29  export function createFormatters(currency: string, locale: stri
          ng): Formatters {
      30    let moneyFormat: Intl.NumberFormat;
      31    let monthFormat: Intl.DateTimeFormat;
      32 +  let percentFormat: Intl.NumberFormat;                        
      33    try {
      34      moneyFormat = new Intl.NumberFormat(locale, { style: 'curre
          ncy', currency });
      35      monthFormat = new Intl.DateTimeFormat(locale, { month: 'lon
          g', year: 'numeric' });
      36 +    percentFormat = new Intl.NumberFormat(locale, { style: 'per
         +cent', maximumFractionDigits: 0 });                            
      37    } catch {
      38      // Config validation already rejects bad values; this keeps
           the UI alive regardless.
      39      moneyFormat = new Intl.NumberFormat('en-US', { style: 'curr
          ency', currency: 'USD' });
      40      monthFormat = new Intl.DateTimeFormat('en-US', { month: 'lo
          ng', year: 'numeric' });
      41 +    percentFormat = new Intl.NumberFormat('en-US', { style: 'pe
         +rcent', maximumFractionDigits: 0 });                           
      42    }
      43    return {
      44      money: (cents) => moneyFormat.format(cents / 100),
      45      month: ({ year, month }) => monthFormat.format(new Date(yea
          r, month - 1, 1)),
      46 +    percent: (fraction) => percentFormat.format(fraction),     
      47 +    currency: affixOf(moneyFormat),                            
      48    };
      49  }
      50  
     ...
      52  export function toInputText(value: number): string {
      53    return String(value);
      54  }
      55 +                                                               
      56 +/**                                                            
      57 + * Splits total paid into whole percentages for principal and i
         +nterest that always add up to 100.                             
      58 + * Returns null when there is nothing to split.                
      59 + */                                                            
      60 +export function principalInterestShares(                       
      61 +  principalCents: number,                                      
      62 +  interestCents: number,                                       
      63 +): { principal: number; interest: number } | null {            
      64 +  const total = principalCents + interestCents;                
      65 +  if (!(total > 0)) return null;                               
      66 +  const principal = Math.round((principalCents / total) * 100);
      67 +  return { principal, interest: 100 - principal };             
      68 +}                                                              

⏺ Update(src/messages.ts)
  ⎿  Added 5 lines
      40    payoffDate: 'Payoff date',
      41    dismiss: 'Dismiss',
      42    errorMarker: '!',
      43 +  percentSuffix: '%',                                          
      44 +  yearsSuffix: 'years',                                        
      45 +  breakdownHeading: 'Total paid: principal vs. interest',      
      46 +  principal: 'Principal',                                      
      47 +  interest: 'Interest',                                        
      48  } as const;

⏺ Now the form, which gets the prefix/suffix adornments:

  Ran 1 shell command (ctrl+o to expand)

⏺ Next, the results area: the monthly payment as the hero number, a grid of
  figures, and the principal-vs-interest bar with text labels.

⏺ Write(src/ui/results.ts)
  ⎿  Added 73 lines, removed 34 lines
       4   */
       5  import type { LoanResult } from '../engine/amortize';
       6  import { UI_TEXT } from '../messages';
       7 -import type { Formatters } from './format';                    
       7 +import { principalInterestShares, type Formatters } from './for
         +mat';                                                          
       8  
       9  export interface ResultsView {
      10    element: HTMLElement;
     ...
      15  
      16  const isSafeAmount = (value: number): boolean => Number.isSafeI
          nteger(value) && value >= 0;
      17  
      18 +function el<K extends keyof HTMLElementTagNameMap>(tag: K, clas
         +sName?: string, text?: string): HTMLElementTagNameMap[K] {     
      19 +  const node = document.createElement(tag);                    
      20 +  if (className) node.className = className;                   
      21 +  if (text !== undefined) node.textContent = text;             
      22 +  return node;                                                 
      23 +}                                                              
      24 +                                                               
      25  export function createResults(format: Formatters): ResultsView 
          {
      19 -  const section = document.createElement('section');           
      20 -  section.className = 'results';                               
      26 +  const section = el('section', 'card results');               
      27    section.setAttribute('aria-labelledby', 'results-heading');
      22 -                                                               
      23 -  const heading = document.createElement('h2');                
      28 +  const heading = el('h2', 'card-title', UI_TEXT.resultsHeading
         +);                                                             
      29    heading.id = 'results-heading';
      25 -  heading.textContent = UI_TEXT.resultsHeading;                
      26 -                                                               
      27 -  const body = document.createElement('div');                  
      28 -  body.className = 'results-body';                             
      30 +  const body = el('div', 'results-body');                      
      31    section.append(heading, body);
      32  
      31 -  const item = (label: string, value: string, name: string, not
         -e?: string): HTMLElement => {                                  
      32 -    const wrapper = document.createElement('div');             
      33 -    wrapper.className = `result result-${name}`;               
      34 -    const dt = document.createElement('dt');                   
      35 -    dt.textContent = label;                                    
      36 -    const dd = document.createElement('dd');                   
      33 +  /** One labelled figure. `name` becomes data-result, which th
         +e tests read. */                                               
      34 +  const stat = (label: string, value: string, name: string): HT
         +MLElement => {                                                 
      35 +    const wrapper = el('div', `stat stat-${name}`);            
      36 +    const dt = el('dt', 'stat-label', label);                  
      37 +    const dd = el('dd', 'stat-value amount', value);           
      38      dd.dataset.result = name;
      38 -    dd.textContent = value;                                    
      39      wrapper.append(dt, dd);
      40 -    if (note) {                                                
      41 -      const small = document.createElement('dd');              
      42 -      small.className = 'result-note';                         
      43 -      small.textContent = note;                                
      44 -      wrapper.append(small);                                   
      45 -    }                                                          
      40      return wrapper;
      41    };
      42  
      43 +  /** Principal vs. interest of total paid. Text labels carry t
         +he meaning; the bar only illustrates it. */                    
      44 +  const breakdown = (principalCents: number, interestCents: num
         +ber): HTMLElement | null => {                                  
      45 +    const shares = principalInterestShares(principalCents, inte
         +restCents);                                                    
      46 +    if (!shares) return null;                                  
      47 +    const figure = el('figure', 'breakdown');                  
      48 +    const caption = el('figcaption', 'breakdown-title', UI_TEXT
         +.breakdownHeading);                                            
      49 +                                                               
      50 +    const bar = el('div', 'breakdown-bar');                    
      51 +    bar.setAttribute('aria-hidden', 'true');                   
      52 +    const principalPart = el('span', 'breakdown-segment segment
         +-principal');                                                  
      53 +    principalPart.style.width = `${shares.principal}%`;        
      54 +    const interestPart = el('span', 'breakdown-segment segment-
         +interest');                                                    
      55 +    interestPart.style.width = `${shares.interest}%`;          
      56 +    bar.append(principalPart, interestPart);                   
      57 +                                                               
      58 +    const legend = el('dl', 'breakdown-legend');               
      59 +    const entry = (label: string, cents: number, share: number,
         + kind: string): HTMLElement => {                               
      60 +      const row = el('div', `legend-item legend-${kind}`);     
      61 +      const dt = el('dt');                                     
      62 +      dt.append(el('span', `legend-swatch segment-${kind}`), do
         +cument.createTextNode(label));                                 
      63 +      dt.firstElementChild?.setAttribute('aria-hidden', 'true')
         +;                                                              
      64 +      const dd = el('dd', 'amount');                           
      65 +      dd.dataset.share = kind;                                 
      66 +      dd.textContent = `${format.money(cents)} (${format.percen
         +t(share / 100)})`;                                             
      67 +      row.append(dt, dd);                                      
      68 +      return row;                                              
      69 +    };                                                         
      70 +    legend.append(                                             
      71 +      entry(UI_TEXT.principal, principalCents, shares.principal
         +, 'principal'),                                                
      72 +      entry(UI_TEXT.interest, interestCents, shares.interest, '
         +interest'),                                                    
      73 +    );                                                         
      74 +    figure.append(caption, bar, legend);                       
      75 +    return figure;                                             
      76 +  };                                                           
      77 +                                                               
      78    return {
      79      element: section,
      80      showResult(result, principalCents) {
     ...
       83        if (!amounts.every(isSafeAmount) || !dates.every((n) => 
           Number.isSafeInteger(n) && n > 0)) {
       84          return false;
       85        }
       57 -      const list = document.createElement('dl');              
       58 -      list.className = 'result-list';                         
       59 -      list.append(                                            
       60 -        item(UI_TEXT.monthlyPayment, format.money(result.month
          -lyPaymentCents), 'monthly-payment', UI_TEXT.monthlyPaymentNote
          -),                                                            
       61 -        item(UI_TEXT.loanAmount, format.money(principalCents),
          - 'loan-amount'),                                              
       62 -        item(UI_TEXT.totalInterest, format.money(result.totalI
          -nterestCents), 'total-interest'),                             
       63 -        item(UI_TEXT.totalPaid, format.money(result.totalPaidC
          -ents), 'total-paid'),                                         
       64 -        item(UI_TEXT.payoffDate, format.month(result.payoff), 
          -'payoff-date'),                                               
       86 +                                                              
       87 +      const hero = el('div', 'hero');                         
       88 +      const heroList = el('dl', 'hero-list');                 
       89 +      const heroLabel = el('dt', 'hero-label', UI_TEXT.monthly
          +Payment);                                                     
       90 +      const heroValue = el('dd', 'hero-value amount', format.m
          +oney(result.monthlyPaymentCents));                            
       91 +      heroValue.dataset.result = 'monthly-payment';           
       92 +      const heroNote = el('dd', 'hero-note', UI_TEXT.monthlyPa
          +ymentNote);                                                   
       93 +      heroList.append(heroLabel, heroValue, heroNote);        
       94 +      hero.append(heroList);                                  
       95 +                                                              
       96 +      const grid = el('dl', 'stat-grid');                     
       97 +      grid.append(                                            
       98 +        stat(UI_TEXT.loanAmount, format.money(principalCents),
          + 'loan-amount'),                                              
       99 +        stat(UI_TEXT.totalInterest, format.money(result.totalI
          +nterestCents), 'total-interest'),                             
      100 +        stat(UI_TEXT.totalPaid, format.money(result.totalPaidC
          +ents), 'total-paid'),                                         
      101 +        stat(UI_TEXT.payoffDate, format.month(result.payoff), 
          +'payoff-date'),                                               
      102        );
       66 -      body.replaceChildren(list);                             
      103 +                                                              
      104 +      const parts: HTMLElement[] = [hero, grid];              
      105 +      const chart = breakdown(principalCents, result.totalInte
          +restCents);                                                   
      106 +      if (chart) parts.push(chart);                           
      107 +      body.replaceChildren(...parts);                         
      108        return true;
      109      },
      110      showMessage(text) {
       70 -      const message = document.createElement('p');            
       71 -      message.className = 'results-message';                  
      111 +      const message = el('p', 'results-message', text);       
      112        message.setAttribute('role', 'status');
       73 -      message.textContent = text;                             
      113        body.replaceChildren(message);
      114      },
      115    };
⏺ Now the controller: a header with a brand mark and the office name, and
  adornments taken from the config currency.

  Ran 1 shell command (ctrl+o to expand)

⏺ I'm also moving the config banner below the header, so the page opens with the
  app's name rather than a warning:

  Ran 1 shell command (ctrl+o to expand)

⏺ Now the stylesheet, built on design tokens:

⏺ Write(src/ui/styles.css)
  ⎿  Added 491 lines, removed 130 lines
        1 -/* Mortgage Calculator: one column on phones, two from 760px. 
          -Colors meet WCAG AA contrast. */                              
        1 +/*                                                            
        2 + * Mortgage Calculator design system.                         
        3 + * Calm, trustworthy financial tool: one deep brand blue, a ne
          +utral scale, semantic colours.                                
        4 + * All colour pairs checked against WCAG AA (text 4.5:1, input
          + borders and focus 3:1) in both themes.                       
        5 + * System fonts only: no web fonts, CDNs or other external req
          +uests (A5.4).                                                 
        6 + */                                                           
        7  
        8 +/* ---------- Tokens ---------- */                            
        9  :root {
        4 -  --bg: #f6f7f9;                                              
       10 +  /* Brand */                                                 
       11 +  --brand: #16507f;                                           
       12 +  --brand-strong: #0f3a5f;                                    
       13 +  --brand-soft: #eaf2f9;                                      
       14 +  --on-brand: #ffffff;                                        
       15 +  --on-brand-muted: #c6d7e8;                                  
       16 +                                                              
       17 +  /* Neutrals */                                              
       18 +  --bg: #f4f6f9;                                              
       19    --surface: #ffffff;
        6 -  --text: #1b1f24;                                            
        7 -  --muted: #535c68;                                           
        8 -  --border: #c9d0d8;                                          
        9 -  --accent: #1d5fbf;                                          
       10 -  --accent-soft: #e8f0fc;                                     
       11 -  --error: #b3261e;                                           
       12 -  --error-soft: #fdecea;                                      
       13 -  --notice: #7a4b00;                                          
       14 -  --notice-soft: #fff4dc;                                     
       15 -  --focus: #1d5fbf;                                           
       16 -  --radius: 10px;                                             
       20 +  --surface-sunken: #f7f9fb;                                  
       21 +  --text: #15202b;                                            
       22 +  --text-muted: #556373;                                      
       23 +  --border: #d5dce4; /* decorative card borders */            
       24 +  --border-input: #7a8898; /* ≥3:1 against surface (WCAG 1.4.1
          +1) */                                                         
       25 +                                                              
       26 +  /* Semantic */                                              
       27 +  --error: #b42318;                                           
       28 +  --error-soft: #fdf0ee;                                      
       29 +  --success: #1e7a46;                                         
       30 +  --notice: #8a5300;                                          
       31 +  --notice-soft: #fff6e5;                                     
       32 +  --focus: #1b66a8;                                           
       33 +                                                              
       34 +  /* Chart */                                                 
       35 +  --chart-principal: #16507f;                                 
       36 +  --chart-interest: #c47a1a;                                  
       37 +                                                              
       38 +  /* Spacing (4px base) */                                    
       39 +  --space-1: 4px;                                             
       40 +  --space-2: 8px;                                             
       41 +  --space-3: 12px;                                            
       42 +  --space-4: 16px;                                            
       43 +  --space-5: 20px;                                            
       44 +  --space-6: 24px;                                            
       45 +  --space-8: 32px;                                            
       46 +  --space-10: 40px;                                           
       47 +                                                              
       48 +  /* Shape and depth */                                       
       49 +  --radius-sm: 6px;                                           
       50 +  --radius-md: 10px;                                          
       51 +  --radius-lg: 16px;                                          
       52 +  --radius-pill: 999px;                                       
       53 +  --shadow-sm: 0 1px 2px rgb(16 24 40 / 0.06);                
       54 +  --shadow-md: 0 1px 3px rgb(16 24 40 / 0.08), 0 4px 12px rgb(
          +16 24 40 / 0.06);                                             
       55 +                                                              
       56 +  /* Type */                                                  
       57 +  --font: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helve
          +tica Neue', Arial, sans-serif;                                
       58 +  --text-sm: 0.875rem;                                        
       59 +  --text-base: 1rem;                                          
       60 +  --text-lg: 1.125rem;                                        
       61 +  --text-xl: 1.5rem;                                          
       62 +  --text-hero: clamp(2rem, 7vw, 2.75rem);                     
       63 +                                                              
       64 +  --control-height: 48px;                                     
       65    color-scheme: light;
       66  }
       67  
       68  @media (prefers-color-scheme: dark) {
       69    :root {
       22 -    --bg: #121417;                                            
       23 -    --surface: #1c2025;                                       
       24 -    --text: #e8eaed;                                          
       25 -    --muted: #a9b1bb;                                         
       26 -    --border: #3a414a;                                        
       27 -    --accent: #8ab4f8;                                        
       28 -    --accent-soft: #1f2a3a;                                   
       29 -    --error: #f2b8b5;                                         
       30 -    --error-soft: #3a1f1e;                                    
       31 -    --notice: #f6d28b;                                        
       32 -    --notice-soft: #33290f;                                   
       33 -    --focus: #8ab4f8;                                         
       70 +    --brand: #7cb9ec;                                         
       71 +    --brand-strong: #133a5c;                                  
       72 +    --brand-soft: #17283a;                                    
       73 +    --on-brand: #ffffff;                                      
       74 +    --on-brand-muted: #bcd2e6;                                
       75 +                                                              
       76 +    --bg: #0d1319;                                            
       77 +    --surface: #151d26;                                       
       78 +    --surface-sunken: #111820;                                
       79 +    --text: #e6edf3;                                          
       80 +    --text-muted: #9fb0c1;                                    
       81 +    --border: #2c3846;                                        
       82 +    --border-input: #66778a;                                  
       83 +                                                              
       84 +    --error: #ff9b8f;                                         
       85 +    --error-soft: #3a1d1b;                                    
       86 +    --success: #6fcf97;                                       
       87 +    --notice: #f2c27a;                                        
       88 +    --notice-soft: #30260f;                                   
       89 +    --focus: #7cb9ec;                                         
       90 +                                                              
       91 +    --chart-principal: #5fa3dc;                               
       92 +    --chart-interest: #e0a050;                                
       93 +                                                              
       94 +    --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.4);                  
       95 +    --shadow-md: 0 1px 3px rgb(0 0 0 / 0.4), 0 4px 12px rgb(0 
          +0 0 / 0.3);                                                   
       96      color-scheme: dark;
       97    }
       98  }
       99  
      100 +/* ---------- Base ---------- */                              
      101  *,
      102  *::before,
      103  *::after {
     ...
      108    margin: 0;
      109    background: var(--bg);
      110    color: var(--text);
       48 -  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, s
          -ans-serif;                                                    
       49 -  font-size: 1rem;                                            
      111 +  font-family: var(--font);                                   
      112 +  font-size: var(--text-base);                                
      113    line-height: 1.5;
      114 +  -webkit-font-smoothing: antialiased;                        
      115 +  -webkit-text-size-adjust: 100%;                             
      116  }
      117  
      118  #app {
       54 -  max-width: 960px;                                           
      119 +  max-width: 1040px;                                          
      120    margin: 0 auto;
       56 -  padding: 16px;                                              
      121 +  padding: var(--space-4);                                    
      122  }
      123  
       59 -h1 {                                                          
       60 -  margin: 0;                                                  
       61 -  font-size: 1.6rem;                                          
       62 -  line-height: 1.2;                                           
      124 +@media (min-width: 760px) {                                   
      125 +  #app {                                                      
      126 +    padding: var(--space-8) var(--space-6);                   
      127 +  }                                                           
      128  }
      129  
       65 -h2 {                                                          
       66 -  margin: 0 0 12px;                                           
       67 -  font-size: 1.1rem;                                          
      130 +h1,                                                           
      131 +h2,                                                           
      132 +p,                                                            
      133 +dl,                                                           
      134 +dd,                                                           
      135 +figure {                                                      
      136 +  margin: 0;                                                  
      137  }
      138  
       70 -.intro {                                                      
       71 -  margin: 4px 0 0;                                            
       72 -  color: var(--muted);                                        
      139 +/* All money and figures line up digit by digit. */           
      140 +.amount,                                                      
      141 +input,                                                        
      142 +table {                                                       
      143 +  font-variant-numeric: tabular-nums;                         
      144  }
      145  
      146 +/* ---------- Header ---------- */                            
      147  .site-header {
       76 -  margin-bottom: 16px;                                        
      148 +  margin-bottom: var(--space-6);                              
      149  }
      150  
       79 -/* Config banner (A4) */                                      
      151 +.brand {                                                      
      152 +  display: flex;                                              
      153 +  flex-wrap: wrap;                                            
      154 +  align-items: center;                                        
      155 +  gap: var(--space-2) var(--space-3);                         
      156 +}                                                             
      157 +                                                              
      158 +.brand-mark {                                                 
      159 +  width: 36px;                                                
      160 +  height: 36px;                                               
      161 +  padding: 7px;                                               
      162 +  border-radius: var(--radius-md);                            
      163 +  background: var(--brand-strong);                            
      164 +  fill: var(--on-brand);                                      
      165 +  flex: none;                                                 
      166 +}                                                             
      167 +                                                              
      168 +h1 {                                                          
      169 +  font-size: var(--text-xl);                                  
      170 +  font-weight: 700;                                           
      171 +  letter-spacing: -0.01em;                                    
      172 +  line-height: 1.2;                                           
      173 +}                                                             
      174 +                                                              
      175 +.header-office {                                              
      176 +  margin-left: auto;                                          
      177 +  padding: var(--space-1) var(--space-3);                     
      178 +  border: 1px solid var(--border);                            
      179 +  border-radius: var(--radius-pill);                          
      180 +  background: var(--surface);                                 
      181 +  color: var(--text-muted);                                   
      182 +  font-size: var(--text-sm);                                  
      183 +  font-weight: 600;                                           
      184 +}                                                             
      185 +                                                              
      186 +.intro {                                                      
      187 +  margin-top: var(--space-2);                                 
      188 +  color: var(--text-muted);                                   
      189 +}                                                             
      190 +                                                              
      191 +/* ---------- Config banner (A4) ---------- */                
      192  .config-banner {
      193    display: flex;
      194    flex-wrap: wrap;
      195    align-items: center;
       84 -  gap: 8px 16px;                                              
       85 -  margin-bottom: 16px;                                        
       86 -  padding: 12px 16px;                                         
      196 +  gap: var(--space-3) var(--space-4);                         
      197 +  margin-bottom: var(--space-6);                              
      198 +  padding: var(--space-3) var(--space-4);                     
      199    border: 1px solid var(--notice);
       88 -  border-radius: var(--radius);                               
      200 +  border-left-width: 4px;                                     
      201 +  border-radius: var(--radius-md);                            
      202    background: var(--notice-soft);
       90 -  color: var(--text);                                         
      203  }
      204  
      205  .config-banner p {
      206    flex: 1 1 240px;
       95 -  margin: 0;                                                  
      207    overflow-wrap: anywhere;
      208  }
      209  
       99 -/* Layout */                                                  
      210 +/* ---------- Layout and cards ---------- */                  
      211  .layout {
      212    display: grid;
      102 -  gap: 16px;                                                  
      213 +  gap: var(--space-4);                                        
      214  }
      215  
      216  @media (min-width: 760px) {
      217    .layout {
      107 -    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);     
      218 +    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);     
      219 +    gap: var(--space-6);                                      
      220      align-items: start;
      221    }
      222  }
      223  
      112 -.form-section,                                                
      113 -.results {                                                    
      114 -  padding: 16px;                                              
      224 +.card {                                                       
      225 +  min-width: 0;                                               
      226 +  padding: var(--space-5);                                    
      227    border: 1px solid var(--border);
      116 -  border-radius: var(--radius);                               
      228 +  border-radius: var(--radius-lg);                            
      229    background: var(--surface);
      118 -  min-width: 0;                                               
      230 +  box-shadow: var(--shadow-md);                               
      231  }
      232  
      121 -/* Form */                                                    
      233 +@media (min-width: 760px) {                                   
      234 +  .card {                                                     
      235 +    padding: var(--space-6);                                  
      236 +  }                                                           
      237 +}                                                             
      238 +                                                              
      239 +.card-title {                                                 
      240 +  margin-bottom: var(--space-4);                              
      241 +  font-size: var(--text-lg);                                  
      242 +  font-weight: 650;                                           
      243 +}                                                             
      244 +                                                              
      245 +/* ---------- Form ---------- */                              
      246  .loan-form {
      247    display: grid;
      124 -  gap: 12px;                                                  
      248 +  gap: var(--space-4);                                        
      249  }
      250  
      251  .field label {
      252    display: block;
      129 -  margin-bottom: 4px;                                         
      253 +  margin-bottom: var(--space-2);                              
      254 +  font-size: var(--text-sm);                                  
      255    font-weight: 600;
      256  }
      257  
      133 -.field input {                                                
      134 -  width: 100%;                                                
      135 -  min-height: 44px; /* comfortable touch target */            
      136 -  padding: 8px 12px;                                          
      137 -  border: 1px solid var(--border);                            
      138 -  border-radius: 8px;                                         
      258 +.input-group {                                                
      259 +  display: flex;                                              
      260 +  align-items: stretch;                                       
      261 +  min-height: var(--control-height);                          
      262 +  border: 1px solid var(--border-input);                      
      263 +  border-radius: var(--radius-md);                            
      264    background: var(--surface);
      265 +  overflow: hidden;                                           
      266 +  transition: border-color 0.15s, box-shadow 0.15s;           
      267 +}                                                             
      268 +                                                              
      269 +.input-group:hover {                                          
      270 +  border-color: var(--text-muted);                            
      271 +}                                                             
      272 +                                                              
      273 +/* Focus ring on the whole group, so the adornments are inside
          + it. */                                                       
      274 +.input-group:focus-within {                                   
      275 +  border-color: var(--focus);                                 
      276 +  box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus) 35%, t
          +ransparent);                                                  
      277 +}                                                             
      278 +                                                              
      279 +.input-group:has(input:focus-visible) {                       
      280 +  outline: 3px solid var(--focus);                            
      281 +  outline-offset: 2px;                                        
      282 +}                                                             
      283 +                                                              
      284 +.field input {                                                
      285 +  flex: 1 1 auto;                                             
      286 +  min-width: 0;                                               
      287 +  min-height: calc(var(--control-height) - 2px);              
      288 +  padding: 0 var(--space-3);                                  
      289 +  border: 0;                                                  
      290 +  background: transparent;                                    
      291    color: var(--text);
      292    font: inherit;
      142 -  font-variant-numeric: tabular-nums;                         
      293 +  font-size: var(--text-lg); /* ≥16px also stops iOS zooming o
          +n focus */                                                    
      294  }
      295  
      145 -.field.has-error input {                                      
      296 +.field input:focus {                                          
      297 +  outline: none; /* the group shows focus instead */          
      298 +}                                                             
      299 +                                                              
      300 +.adornment {                                                  
      301 +  display: flex;                                              
      302 +  align-items: center;                                        
      303 +  padding: 0 var(--space-3);                                  
      304 +  background: var(--surface-sunken);                          
      305 +  color: var(--text-muted);                                   
      306 +  font-weight: 600;                                           
      307 +  white-space: nowrap;                                        
      308 +  user-select: none;                                          
      309 +}                                                             
      310 +                                                              
      311 +.adornment-prefix {                                           
      312 +  border-right: 1px solid var(--border);                      
      313 +}                                                             
      314 +                                                              
      315 +.adornment-suffix {                                           
      316 +  border-left: 1px solid var(--border);                       
      317 +}                                                             
      318 +                                                              
      319 +.field.has-error .input-group {                               
      320    border: 2px solid var(--error);
      321  }
      322  
      323 +.field.has-error .input-group:focus-within {                  
      324 +  box-shadow: 0 0 0 3px color-mix(in srgb, var(--error) 30%, t
          +ransparent);                                                  
      325 +}                                                             
      326 +                                                              
      327  .field-error {
      150 -  margin: 4px 0 0;                                            
      328 +  display: flex;                                              
      329 +  align-items: flex-start;                                    
      330 +  gap: var(--space-2);                                        
      331 +  margin-top: var(--space-2);                                 
      332    color: var(--error);
      152 -  font-size: 0.95rem;                                         
      333 +  font-size: var(--text-sm);                                  
      334 +  font-weight: 500;                                           
      335  }
      336  
      337  .field-error:empty {
      338    display: none;
      339  }
      340  
      159 -/* Text marker so errors never rely on color alone (L8.18) */ 
      341 +/* Text marker so errors never rely on colour alone (L8.18). *
          +/                                                             
      342  .error-marker {
      343    display: inline-grid;
      344    place-items: center;
      163 -  width: 1.25em;                                              
      164 -  height: 1.25em;                                             
      165 -  margin-right: 6px;                                          
      345 +  flex: none;                                                 
      346 +  width: 18px;                                                
      347 +  height: 18px;                                               
      348 +  margin-top: 1px;                                            
      349    border-radius: 50%;
      350    background: var(--error);
      351    color: var(--surface);
      352 +  font-size: 12px;                                            
      353 +  font-weight: 800;                                           
      354 +  line-height: 1;                                             
      355 +}                                                             
      356 +                                                              
      357 +/* ---------- Results ---------- */                           
      358 +.results-body {                                               
      359 +  display: grid;                                              
      360 +  gap: var(--space-5);                                        
      361 +}                                                             
      362 +                                                              
      363 +.hero {                                                       
      364 +  padding: var(--space-5);                                    
      365 +  border-radius: var(--radius-md);                            
      366 +  background: var(--brand-strong);                            
      367 +  color: var(--on-brand);                                     
      368 +}                                                             
      369 +                                                              
      370 +.hero-label {                                                 
      371 +  color: var(--on-brand-muted);                               
      372 +  font-size: var(--text-sm);                                  
      373 +  font-weight: 600;                                           
      374 +  letter-spacing: 0.02em;                                     
      375 +  text-transform: uppercase;                                  
      376 +}                                                             
      377 +                                                              
      378 +.hero-value {                                                 
      379 +  margin-top: var(--space-1);                                 
      380 +  font-size: var(--text-hero);                                
      381    font-weight: 700;
      170 -  font-size: 0.85em;                                          
      171 -  vertical-align: 0.05em;                                     
      382 +  letter-spacing: -0.02em;                                    
      383 +  line-height: 1.1;                                           
      384 +  overflow-wrap: anywhere;                                    
      385  }
      386  
      174 -/* Results */                                                 
      175 -.result-list {                                                
      387 +.hero-note {                                                  
      388 +  margin-top: var(--space-1);                                 
      389 +  color: var(--on-brand-muted);                               
      390 +  font-size: var(--text-sm);                                  
      391 +}                                                             
      392 +                                                              
      393 +.stat-grid {                                                  
      394    display: grid;
      177 -  gap: 12px;                                                  
      178 -  margin: 0;                                                  
      395 +  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      396 +  gap: var(--space-3);                                        
      397  }
      398  
      181 -.result {                                                     
      182 -  display: flex;                                              
      183 -  flex-wrap: wrap;                                            
      184 -  justify-content: space-between;                             
      185 -  gap: 0 12px;                                                
      186 -  padding-bottom: 12px;                                       
      187 -  border-bottom: 1px solid var(--border);                     
      399 +.stat {                                                       
      400 +  padding: var(--space-3) var(--space-4);                     
      401 +  border: 1px solid var(--border);                            
      402 +  border-radius: var(--radius-md);                            
      403 +  background: var(--surface-sunken);                          
      404  }
      405  
      190 -.result:last-child {                                          
      191 -  padding-bottom: 0;                                          
      192 -  border-bottom: 0;                                           
      406 +.stat-label {                                                 
      407 +  color: var(--text-muted);                                   
      408 +  font-size: var(--text-sm);                                  
      409  }
      410  
      195 -.result dt {                                                  
      196 -  color: var(--muted);                                        
      411 +.stat-value {                                                 
      412 +  margin-top: 2px;                                            
      413 +  font-size: var(--text-lg);                                  
      414 +  font-weight: 650;                                           
      415 +  overflow-wrap: anywhere;                                    
      416  }
      417  
      199 -.result dd {                                                  
      200 -  margin: 0;                                                  
      418 +/* Principal vs. interest bar */                              
      419 +.breakdown-title {                                            
      420 +  margin-bottom: var(--space-2);                              
      421 +  font-size: var(--text-sm);                                  
      422    font-weight: 600;
      202 -  font-variant-numeric: tabular-nums;                         
      203 -  overflow-wrap: anywhere;                                    
      423  }
      424  
      206 -.result-monthly-payment {                                     
      207 -  padding: 12px;                                              
      208 -  border: 0;                                                  
      209 -  border-radius: 8px;                                         
      210 -  background: var(--accent-soft);                             
      425 +.breakdown-bar {                                              
      426 +  display: flex;                                              
      427 +  gap: 3px; /* visible split, even where the two colours are c
          +lose in lightness */                                          
      428 +  height: 12px;                                               
      429 +  border-radius: var(--radius-pill);                          
      430 +  overflow: hidden;                                           
      431 +  background: var(--surface-sunken);                          
      432  }
      433  
      213 -.result-monthly-payment dt {                                  
      214 -  color: var(--text);                                         
      215 -  font-weight: 600;                                           
      434 +.breakdown-segment {                                          
      435 +  display: block;                                             
      436 +  min-width: 0;                                               
      437  }
      438  
      218 -.result-monthly-payment dd[data-result] {                     
      219 -  font-size: 1.6rem;                                          
      220 -  line-height: 1.2;                                           
      439 +.segment-principal {                                          
      440 +  background: var(--chart-principal);                         
      441  }
      442  
      223 -.result-monthly-payment .result-note {                        
      224 -  flex-basis: 100%;                                           
      225 -  color: var(--muted);                                        
      226 -  font-size: 0.9rem;                                          
      227 -  font-weight: 400;                                           
      443 +.segment-interest {                                           
      444 +  background: var(--chart-interest);                          
      445 +  /* Diagonal stripes: the segments differ in pattern as well 
          +as colour. */                                                 
      446 +  background-image: repeating-linear-gradient(                
      447 +    135deg,                                                   
      448 +    transparent 0 4px,                                        
      449 +    rgb(255 255 255 / 0.28) 4px 6px                           
      450 +  );                                                          
      451  }
      452  
      453 +.breakdown-legend {                                           
      454 +  display: grid;                                              
      455 +  gap: var(--space-2);                                        
      456 +  margin-top: var(--space-3);                                 
      457 +}                                                             
      458 +                                                              
      459 +.legend-item {                                                
      460 +  display: flex;                                              
      461 +  flex-wrap: wrap;                                            
      462 +  justify-content: space-between;                             
      463 +  gap: 0 var(--space-3);                                      
      464 +  font-size: var(--text-sm);                                  
      465 +}                                                             
      466 +                                                              
      467 +.legend-item dt {                                             
      468 +  display: flex;                                              
      469 +  align-items: center;                                        
      470 +  gap: var(--space-2);                                        
      471 +  color: var(--text-muted);                                   
      472 +}                                                             
      473 +                                                              
      474 +.legend-item dd {                                             
      475 +  font-weight: 600;                                           
      476 +}                                                             
      477 +                                                              
      478 +.legend-swatch {                                              
      479 +  display: inline-block;                                      
      480 +  width: 12px;                                                
      481 +  height: 12px;                                               
      482 +  border-radius: 3px;                                         
      483 +}                                                             
      484 +                                                              
      485 +/* Message that replaces all results (E7–E10) */              
      486  .results-message {
      231 -  margin: 0;                                                  
      232 -  padding: 12px;                                              
      233 -  border-radius: 8px;                                         
      487 +  padding: var(--space-4);                                    
      488 +  border: 1px solid var(--border);                            
      489 +  border-left: 4px solid var(--error);                        
      490 +  border-radius: var(--radius-md);                            
      491    background: var(--error-soft);
      492    color: var(--text);
      493  }
      494  
      238 -/* Buttons */                                                 
      495 +/* ---------- Buttons ---------- */                           
      496  button {
      497    min-height: 44px;
      241 -  padding: 8px 16px;                                          
      242 -  border: 1px solid var(--accent);                            
      243 -  border-radius: 8px;                                         
      498 +  padding: var(--space-2) var(--space-4);                     
      499 +  border: 1px solid var(--brand);                             
      500 +  border-radius: var(--radius-md);                            
      501    background: var(--surface);
      245 -  color: var(--accent);                                       
      502 +  color: var(--brand);                                        
      503    font: inherit;
      504    font-weight: 600;
      505    cursor: pointer;
      506  }
      507  
      508  button:hover {
      252 -  background: var(--accent-soft);                             
      509 +  background: var(--brand-soft);                              
      510  }
      511  
      255 -/* Visible keyboard focus everywhere (L10.3) */               
      512 +button:disabled {                                             
      513 +  border-color: var(--border);                                
      514 +  color: var(--text-muted);                                   
      515 +  cursor: not-allowed;                                        
      516 +}                                                             
      517 +                                                              
      518 +/* ---------- Select (preset selector, 5c) ---------- */      
      519 +select {                                                      
      520 +  width: 100%;                                                
      521 +  min-height: var(--control-height);                          
      522 +  padding: 0 var(--space-10) 0 var(--space-3);                
      523 +  border: 1px solid var(--border-input);                      
      524 +  border-radius: var(--radius-md);                            
      525 +  background-color: var(--surface);                           
      526 +  background-image:                                           
      527 +    linear-gradient(45deg, transparent 50%, var(--text-muted) 
          +50%),                                                         
      528 +    linear-gradient(135deg, var(--text-muted) 50%, transparent
          + 50%);                                                        
      529 +  background-position:                                        
      530 +    right 18px center,                                        
      531 +    right 13px center;                                        
      532 +  background-size: 5px 5px;                                   
      533 +  background-repeat: no-repeat;                               
      534 +  color: var(--text);                                         
      535 +  font: inherit;                                              
      536 +  appearance: none;                                           
      537 +}                                                             
      538 +                                                              
      539 +.field-hint {                                                 
      540 +  margin-top: var(--space-2);                                 
      541 +  color: var(--text-muted);                                   
      542 +  font-size: var(--text-sm);                                  
      543 +}                                                             
      544 +                                                              
      545 +/* ---------- Segmented control (monthly / yearly, 5b) -------
          +--- */                                                        
      546 +.segmented {                                                  
      547 +  display: inline-flex;                                       
      548 +  padding: 3px;                                               
      549 +  border: 1px solid var(--border-input);                      
      550 +  border-radius: var(--radius-md);                            
      551 +  background: var(--surface-sunken);                          
      552 +}                                                             
      553 +                                                              
      554 +.segmented button {                                           
      555 +  min-height: 38px;                                           
      556 +  border: 0;                                                  
      557 +  border-radius: var(--radius-sm);                            
      558 +  background: transparent;                                    
      559 +  color: var(--text-muted);                                   
      560 +}                                                             
      561 +                                                              
      562 +.segmented button[aria-pressed='true'] {                      
      563 +  background: var(--surface);                                 
      564 +  color: var(--text);                                         
      565 +  box-shadow: var(--shadow-sm);                               
      566 +}                                                             
      567 +                                                              
      568 +/* ---------- Schedule table (5b) ---------- */               
      569 +.table-scroll {                                               
      570 +  max-height: 480px;                                          
      571 +  overflow: auto; /* scrolls inside its own box at 360px (L10.
          +2) */                                                         
      572 +  border: 1px solid var(--border);                            
      573 +  border-radius: var(--radius-md);                            
      574 +}                                                             
      575 +                                                              
      576 +.data-table {                                                 
      577 +  width: 100%;                                                
      578 +  border-collapse: collapse;                                  
      579 +  font-size: var(--text-sm);                                  
      580 +  white-space: nowrap;                                        
      581 +}                                                             
      582 +                                                              
      583 +.data-table th,                                               
      584 +.data-table td {                                              
      585 +  padding: var(--space-2) var(--space-3);                     
      586 +  border-bottom: 1px solid var(--border);                     
      587 +  text-align: right;                                          
      588 +}                                                             
      589 +                                                              
      590 +.data-table th:first-child,                                   
      591 +.data-table td:first-child {                                  
      592 +  text-align: left;                                           
      593 +}                                                             
      594 +                                                              
      595 +.data-table thead th {                                        
      596 +  position: sticky;                                           
      597 +  top: 0;                                                     
      598 +  background: var(--surface-sunken);                          
      599 +  color: var(--text-muted);                                   
      600 +  font-weight: 600;                                           
      601 +}                                                             
      602 +                                                              
      603 +.data-table tbody tr:nth-child(even) {                        
      604 +  background: var(--surface-sunken);                          
      605 +}                                                             
      606 +                                                              
      607 +.data-table tbody tr:last-child td {                          
      608 +  border-bottom: 0;                                           
      609 +}                                                             
      610 +                                                              
      611 +/* ---------- Focus (L10.3) ---------- */                     
      612  :focus-visible {
      613    outline: 3px solid var(--focus);
      614    outline-offset: 2px;
      615  }
      616  
      261 -.field input:focus-visible {                                  
      262 -  outline-offset: 1px;                                        
      263 -}                                                             
      264 -                                                              
      265 -/* Footer (A3) */                                             
      617 +/* ---------- Footer (A3) ---------- */                       
      618  .site-footer {
      267 -  margin-top: 24px;                                           
      268 -  padding-top: 16px;                                          
      619 +  margin-top: var(--space-8);                                 
      620 +  padding-top: var(--space-4);                                
      621    border-top: 1px solid var(--border);
      270 -  color: var(--muted);                                        
      271 -  font-size: 0.9rem;                                          
      622 +  color: var(--text-muted);                                   
      623 +  font-size: var(--text-sm);                                  
      624  }
      625  
      626 +.site-footer p + p {                                          
      627 +  margin-top: var(--space-1);                                 
      628 +}                                                             
      629 +                                                              
      630  .site-footer p {
      275 -  margin: 0 0 4px;                                            
      631    overflow-wrap: anywhere;
      632  }
      633  
     ...
      635    color: var(--text);
      636    font-weight: 600;
      637  }
      638 +                                                              
      639 +@media (prefers-reduced-motion: reduce) {                     
      640 +  * {                                                         
      641 +    transition: none !important;                              
      642 +  }                                                           
      643 +}                                                             

  Ran 1 shell command (ctrl+o to expand)

⏺ All 261 existing tests still pass without changes. Now the screenshots. I'm
  starting the preview server and loading the media-emulation tool for dark
  mode:

  Read 1 file, called playwright 4 times, ran 1 shell command (ctrl+o to expand)

⏺ The light desktop view mostly works, but the stat grid leaves "Payoff date"
  alone on a second row. I'm switching it to a fixed 2×2 grid, then I'll check
  the dark theme.

⏺ Update(src/ui/styles.css)
  ⎿  Added 8 lines, removed 1 line
      390    font-size: var(--text-sm);
      391  }
      392  
      393 +/* Always a balanced 2 × 2 grid; one column only where two wou
          +ld squeeze large amounts. */                                  
      394  .stat-grid {
      395    display: grid;
      395 -  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      396 +  grid-template-columns: repeat(2, minmax(0, 1fr));           
      397    gap: var(--space-3);
      398  }
      399  
      400 +@media (max-width: 399px) {                                   
      401 +  .stat-grid {                                                
      402 +    grid-template-columns: minmax(0, 1fr);                    
      403 +  }                                                           
      404 +}                                                             
      405 +                                                              
      406  .stat {
      407    padding: var(--space-3) var(--space-4);
      408    border: 1px solid var(--border);

  Read 1 file, called playwright 3 times, ran 1 shell command (ctrl+o to expand)

⏺ Dark mode works: the 2×2 grid is balanced and the hero card and bar read
  clearly. Now 360 px in light mode, with an error and the focus ring:

  Read 1 file, called playwright 7 times (ctrl+o to expand)

⏺ At 360 px the layout holds with no horizontal scroll, but two things need
  fixing: the office-name pill floats detached from the title, and the doubled
  focus ring is too heavy. I'll left-align the pill under the title on narrow
  screens and keep a single 3 px focus outline.

  Read 1 file, called playwright 4 times, ran 1 shell command (ctrl+o to expand)

⏺ The header and focus ring look right, and 6.5% gives the expected $1,896.20.
  Next I'll switch the four stacked stat cards on narrow screens to compact
  label-and-amount rows, since they make the page too long at 360 px.

⏺ Update(src/ui/styles.css)
  ⎿  Added 25 lines
      395    gap: var(--space-3);
      396  }
      397  
      398 +/* Narrow phones: compact rows, label left and amount right, i
          +nstead of tall cards. */                                      
      399  @media (max-width: 399px) {
      400    .stat-grid {
      401      grid-template-columns: minmax(0, 1fr);
      402 +    gap: 0;                                                   
      403 +    border: 1px solid var(--border);                          
      404 +    border-radius: var(--radius-md);                          
      405 +    background: var(--surface-sunken);                        
      406    }
      407 +                                                              
      408 +  .stat {                                                     
      409 +    display: flex;                                            
      410 +    flex-wrap: wrap;                                          
      411 +    align-items: baseline;                                    
      412 +    justify-content: space-between;                           
      413 +    gap: 0 var(--space-3);                                    
      414 +    border: 0;                                                
      415 +    border-radius: 0;                                         
      416 +    background: transparent;                                  
      417 +  }                                                           
      418 +                                                              
      419 +  .stat + .stat {                                             
      420 +    border-top: 1px solid var(--border);                      
      421 +  }                                                           
      422 +                                                              
      423 +  .stat-value {                                               
      424 +    margin-top: 0;                                            
      425 +    font-size: var(--text-base);                              
      426 +  }                                                           
      427  }
      428  
      429  .stat {

  Read 1 file, called playwright 7 times, ran 1 shell command (ctrl+o to expand)

⏺ The largest values fit without horizontal scroll, but the compact rows aren't
  applying because the media query sits before the base .stat rule and gets
  overridden. I'm moving the media query below that rule.

  Read 1 file, called playwright 5 times, ran 1 shell command (ctrl+o to expand)

⏺ The rows are clean now, and even the largest amounts fit on one line at 360
  px. Closing the browser and server, then adding tests for the new behaviour.
  The existing tests stay unchanged.

  Called playwright (ctrl+o to expand)

⏺ Stop Task
  ⎿  cd "/Users/dev/Desktop/Test Project Usama" && npx vite preview --port
     4173 --strictPort · stopped

  Ran 1 shell command (ctrl+o to expand)

⏺ All 268 tests pass. A last check for A5: the built files must contain no
  external URLs (fonts, CDNs).

  Ran 1 shell command (ctrl+o to expand)

⏺ The redesign is done. All behaviour and texts are unchanged, the 261 existing
  tests pass without edits, and with 7 new tests the total is 268. The type
  check and build are clean, and I committed it locally as ebe2265 (not pushed).

  Your message still had the template text "[all as described / or list what
  differed]" in it, so I've assumed steps 1–13 all worked. The end of the
  message was also cut off; I read it as "style the schedule table and selector
  with the same tokens" and "run all tests".

  What changed

  - Design tokens in styles.css:
    - one deep brand blue, a neutral scale, and error/success/notice colours;
    - a spacing scale on a 4 px base, plus radius, shadow and type sizes;
    - full light and dark themes.

    I checked every colour pair with a contrast script rather than by eye. Text
    is at least 4.5:1 in both themes. The first draft gave input borders only
    1.38:1, so they now have their own darker border colour (3.6:1 light, 3.7:1
    dark) to meet the 3:1 rule for controls.
  - Fonts: system fonts only, with all figures in tabular numerals. The build
    contains no external URLs. The only http string in it is the SVG namespace,
    which is not a request.
  - Header: an inline house icon, the app name, and the configured office name
    as a small label. On narrow screens the label moves under the title.
  - Inputs have a currency adornment taken from the config. It shows "$" before
    the number, "€" after it for de-DE, and "PKR" before it for PKR. Rate and
    term get "%" and "years" after the number. All adornments are hidden from
    screen readers, since the labels already say this. Inputs are 48 px tall.
  - Results:
    - the monthly payment as a large hero number on the brand colour;
    - a 2×2 grid for loan amount, total interest, total paid and payoff date;
    - a principal-vs-interest bar of total paid, labelled with text such as
      "Principal $300,000.00 (46%)". The percentages always add up to 100.
  - Styles ready for later steps: the schedule table (scrolls inside its own
    box, sticky header), the monthly/yearly switch and the preset select.

  What the screenshots showed, and what I fixed

  I took screenshots at desktop and 360 px, in light and dark, including an
  error state and the maximum values.

  ┌──────────────────────────────┬──────────────────────────────────────────┐
  │        Problem I saw         │                   Fix                    │
  ├──────────────────────────────┼──────────────────────────────────────────┤
  │ The stat grid made 3 + 1     │                                          │
  │ columns, and "November 2056" │ A fixed 2×2 grid                         │
  │  wrapped onto two lines      │                                          │
  ├──────────────────────────────┼──────────────────────────────────────────┤
  │ The office-name label        │ Left-aligned under the title on narrow   │
  │ wrapped on its own line and  │ screens                                  │
  │ floated right at 360 px      │                                          │
  ├──────────────────────────────┼──────────────────────────────────────────┤
  │ The focus ring was doubled   │ One 3 px outline around the whole input, │
  │ (glow plus outline) and      │  adornment included                      │
  │ looked heavy                 │                                          │
  ├──────────────────────────────┼──────────────────────────────────────────┤
  │                              │ Compact rows, label left and amount      │
  │ At 360 px the four stats     │ right. My first attempt didn't apply     │
  │ became tall stacked cards    │ because of CSS order; fixed and checked  │
  │                              │ again                                    │
  ├──────────────────────────────┼──────────────────────────────────────────┤
  │ In dark mode, the principal  │ A gap between the segments, diagonal     │
  │ and interest colours are     │ stripes on interest, and the text labels │
  │ only 1.2:1 apart             │                                          │
  └──────────────────────────────┴──────────────────────────────────────────┘

  The final screenshots show:
  - desktop light and dark: balanced;
  - 360 px: no horizontal scroll (scrollWidth 360), including at the maximum
    values ($1,199,428,164.31 fits on one line);
  - the error state: red border, "!" marker and E8 in the results area.

  Test output

   amortize 49 · parse 38 · validate 48 · config 91 · ui 41 (+7: header office 
  name, adornments
   for USD/EUR-de/PKR, bar labels and widths, 0% bar, bar removed on error) · 
  setup 1
   Test Files  6 passed (6)
        Tests  268 passed (268)
  tsc OK · vite build ✓

  Next are 5b, the schedule (L3: monthly/yearly table and CSV), and 5c, the
  extra payment and presets (L5, M1).

✻ Sautéed for 5m 17s · done 7:52 PM

❯ /export transcripts/session-03-part4.md                                       
  ⎿  Conversation exported to: /Users/dev/Desktop/Test Project
     Usama/transcripts/session-03-part4.md

❯ Correction: in my last message I left the template text in by mistake. I have 
  now checked                                                                   
  steps 1–13 by hand on the new design: <write what you saw, e.g. "all worked"  
  or "step 7 showed …">.                                                        
                                                                                
  Step 5b: the amortization schedule and CSV download (story L3, all criteria   
  1–9).                                                                         
  - Monthly view by default, plus a yearly toggle. The CSV always holds monthly 
  rows (L3.5).                                                                  
  - Filename, header line and number format exactly as in L3.4–L3.5.            
  - The schedule is replaced by E8 on invalid input and comes back when fixed   
  (L3.8).                                                                       
  - Use the existing table styles and tokens. 480 rows must stay fast to        
  render.                                                                       
    Test it, check it in the browser with screenshots (desktop + 360px), run    
  all tests.                                                                    

⏺ Your message still has the placeholder "<write what you saw…>" in it, so I
  haven't recorded any result for steps 1–13. Tell me what you saw if anything
  differed.

  On to 5b. First I'm re-reading the exact L3 wording, so the column names and
  CSV format match the doc:

  Ran 1 shell command (ctrl+o to expand)

⏺ L3 has 10 criteria, not 9. Criterion 10 is the any-date CSV check we added,
  and I'll cover it too. Writing the CSV module first:

⏺ Write(src/ui/csv.ts)  ⎿  Added 57 lines, removed 2 lines
       1 -// Placeholder. Implemented in a later step (see docs/product-p
         -lan.md §4).                                                    
       2 -export {};                                                     
       1 +/**                                                            
       2 + * Schedule CSV (L3.4, L3.5, L3.10): always monthly rows, comma
         + separators, "." decimal point,                                
       3 + * exactly 2 decimals, no currency symbols, no thousands separa
         +tors. Dates as YYYY-MM.                                        
       4 + */                                                            
       5 +import type { ScheduleRow } from '../engine/amortize';         
       6 +import { UI_TEXT } from '../messages';                         
       7 +                                                               
       8 +export const CSV_FILENAME = 'mortgage-schedule.csv';           
       9 +                                                               
      10 +export const CSV_HEADER = [                                    
      11 +  UI_TEXT.colPaymentNumber,                                    
      12 +  UI_TEXT.colDate,                                             
      13 +  UI_TEXT.colPayment,                                          
      14 +  UI_TEXT.colPrincipal,                                        
      15 +  UI_TEXT.colInterest,                                         
      16 +  UI_TEXT.colExtra,                                            
      17 +  UI_TEXT.colBalance,                                          
      18 +].join(',');                                                   
      19 +                                                               
      20 +/** Integer cents → "1798.65", exactly, with no float formattin
         +g involved. */                                                 
      21 +export function centsToPlain(cents: number): string {          
      22 +  const whole = Math.floor(cents / 100);                       
      23 +  const rest = String(cents % 100).padStart(2, '0');           
      24 +  return `${whole}.${rest}`;                                   
      25 +}                                                              
      26 +                                                               
      27 +const yearMonth = (row: ScheduleRow): string => `${row.year}-${
         +String(row.month).padStart(2, '0')}`;                          
      28 +                                                               
      29 +/** Lines end with CRLF (RFC 4180), which every spreadsheet app
         + reads. */                                                     
      30 +export function scheduleCsv(rows: readonly ScheduleRow[]): stri
         +ng {                                                           
      31 +  const lines = rows.map((row) =>                              
      32 +    [                                                          
      33 +      String(row.number),                                      
      34 +      yearMonth(row),                                          
      35 +      centsToPlain(row.paymentCents),                          
      36 +      centsToPlain(row.principalCents),                        
      37 +      centsToPlain(row.interestCents),                         
      38 +      centsToPlain(row.extraCents),                            
      39 +      centsToPlain(row.balanceCents),                          
      40 +    ].join(','),                                               
      41 +  );                                                           
      42 +  return [CSV_HEADER, ...lines].join('\r\n') + '\r\n';         
      43 +}                                                              
      44 +                                                               
      45 +/** Saves text as a file in the browser. A blob: URL is local, 
         +not a network request (A5.4). */                               
      46 +export function downloadText(filename: string, text: string): v
         +oid {                                                          
      47 +  const url = URL.createObjectURL(new Blob([text], { type: 'tex
         +t/csv;charset=utf-8' }));                                      
      48 +  const link = document.createElement('a');                    
      49 +  link.href = url;                                             
      50 +  link.download = filename;                                    
      51 +  link.hidden = true;                                          
      52 +  document.body.append(link);                                  
      53 +  link.click();                                                
      54 +  link.remove();                                               
      55 +  // Revoke later: some browsers (Safari) start the download as
         +ynchronously.                                                  
      56 +  setTimeout(() => URL.revokeObjectURL(url), 1000);            
      57 +}                                                              

⏺ Update(src/messages.ts)
  ⎿  Added 18 lines
      45    breakdownHeading: 'Total paid: principal vs. interest',
      46    principal: 'Principal',
      47    interest: 'Interest',
      48 +  scheduleHeading: 'Amortization schedule',                    
      49 +  scheduleViewLabel: 'Schedule view',                          
      50 +  monthly: 'Monthly',                                          
      51 +  yearly: 'Yearly',                                            
      52 +  downloadCsv: 'Download CSV',                                 
      53 +  scheduleCaptionMonthly: 'Amortization schedule, one row per m
         +onthly payment',                                               
      54 +  scheduleCaptionYearly: 'Amortization schedule, one row per lo
         +an year',                                                      
      55 +  scheduleRegionLabel: 'Amortization schedule table',          
      56 +  /** Column names: the monthly table and the CSV header (L3.1,
         + L3.4). */                                                     
      57 +  colPaymentNumber: 'Payment number',                          
      58 +  colDate: 'Date',                                             
      59 +  colPayment: 'Payment',                                       
      60 +  colPrincipal: 'Principal',                                   
      61 +  colInterest: 'Interest',                                     
      62 +  colExtra: 'Extra payment',                                   
      63 +  colBalance: 'Balance',                                       
      64 +  colYear: 'Year',                                             
      65 +  colEndBalance: 'Ending balance',                             
      66  } as const;

⏺ Now the schedule view:

⏺ Write(src/ui/schedule.ts)
  ⎿  Added 175 lines, removed 2 lines
        1 -// Placeholder. Implemented in a later step (see docs/product-
          -plan.md §4).                                                  
        2 -export {};                                                    
        1 +/**                                                           
        2 + * Amortization schedule (L3): monthly table by default, a yea
          +rly toggle, and a CSV download that                           
        3 + * always holds monthly rows. On invalid input the whole sched
          +ule is replaced by a message (L3.8).                          
        4 + */                                                           
        5 +import { toYearly, type ScheduleRow } from '../engine/amortize
          +';                                                            
        6 +import { UI_TEXT } from '../messages';                        
        7 +import { CSV_FILENAME, scheduleCsv } from './csv';            
        8 +import type { Formatters } from './format';                   
        9 +                                                              
       10 +export type ScheduleMode = 'monthly' | 'yearly';              
       11 +                                                              
       12 +export interface ScheduleView {                               
       13 +  element: HTMLElement;                                       
       14 +  show(rows: readonly ScheduleRow[]): void;                   
       15 +  showMessage(text: string): void;                            
       16 +}                                                             
       17 +                                                              
       18 +export function createSchedule(format: Formatters, download: (
          +filename: string, text: string) => void): ScheduleView {      
       19 +  let mode: ScheduleMode = 'monthly';                         
       20 +  let rows: readonly ScheduleRow[] = [];                      
       21 +                                                              
       22 +  const section = document.createElement('section');          
       23 +  section.className = 'card schedule';                        
       24 +  section.setAttribute('aria-labelledby', 'schedule-heading');
       25 +                                                              
       26 +  const head = document.createElement('div');                 
       27 +  head.className = 'schedule-head';                           
       28 +  const heading = document.createElement('h2');               
       29 +  heading.id = 'schedule-heading';                            
       30 +  heading.className = 'card-title';                           
       31 +  heading.textContent = UI_TEXT.scheduleHeading;              
       32 +                                                              
       33 +  const toolbar = document.createElement('div');              
       34 +  toolbar.className = 'schedule-toolbar';                     
       35 +                                                              
       36 +  const toggle = document.createElement('div');               
       37 +  toggle.className = 'segmented';                             
       38 +  toggle.setAttribute('role', 'group');                       
       39 +  toggle.setAttribute('aria-label', UI_TEXT.scheduleViewLabel)
          +;                                                             
       40 +  const modeButton = (value: ScheduleMode, label: string): HTM
          +LButtonElement => {                                           
       41 +    const button = document.createElement('button');          
       42 +    button.type = 'button';                                   
       43 +    button.dataset.mode = value;                              
       44 +    button.textContent = label;                               
       45 +    button.addEventListener('click', () => {                  
       46 +      mode = value;                                           
       47 +      render();                                               
       48 +    });                                                       
       49 +    return button;                                            
       50 +  };                                                          
       51 +  const monthlyButton = modeButton('monthly', UI_TEXT.monthly)
          +;                                                             
       52 +  const yearlyButton = modeButton('yearly', UI_TEXT.yearly);  
       53 +  toggle.append(monthlyButton, yearlyButton);                 
       54 +                                                              
       55 +  const csvButton = document.createElement('button');         
       56 +  csvButton.type = 'button';                                  
       57 +  csvButton.className = 'csv-button';                         
       58 +  csvButton.textContent = UI_TEXT.downloadCsv;                
       59 +  // Always the monthly rows, whatever the view (L3.5).       
       60 +  csvButton.addEventListener('click', () => download(CSV_FILEN
          +AME, scheduleCsv(rows)));                                     
       61 +                                                              
       62 +  toolbar.append(toggle, csvButton);                          
       63 +  head.append(heading, toolbar);                              
       64 +                                                              
       65 +  const body = document.createElement('div');                 
       66 +  body.className = 'schedule-body';                           
       67 +  section.append(head, body);                                 
       68 +                                                              
       69 +  const cell = (tag: 'td' | 'th', text: string): HTMLTableCell
          +Element => {                                                  
       70 +    const node = document.createElement(tag);                 
       71 +    node.textContent = text;                                  
       72 +    return node;                                              
       73 +  };                                                          
       74 +                                                              
       75 +  function table(caption: string, headers: string[], data: str
          +ing[][]): HTMLElement {                                       
       76 +    // A focusable, labelled region so keyboard users can scro
          +ll it (L10.3).                                                
       77 +    const scroll = document.createElement('div');             
       78 +    scroll.className = 'table-scroll';                        
       79 +    scroll.tabIndex = 0;                                      
       80 +    scroll.setAttribute('role', 'region');                    
       81 +    scroll.setAttribute('aria-label', UI_TEXT.scheduleRegionLa
          +bel);                                                         
       82 +                                                              
       83 +    const tableEl = document.createElement('table');          
       84 +    tableEl.className = 'data-table';                         
       85 +    const captionEl = document.createElement('caption');      
       86 +    captionEl.className = 'visually-hidden';                  
       87 +    captionEl.textContent = caption;                          
       88 +                                                              
       89 +    const thead = document.createElement('thead');            
       90 +    const headRow = document.createElement('tr');             
       91 +    for (const header of headers) {                           
       92 +      const th = cell('th', header);                          
       93 +      th.scope = 'col';                                       
       94 +      headRow.append(th);                                     
       95 +    }                                                         
       96 +    thead.append(headRow);                                    
       97 +                                                              
       98 +    // One fragment, one insertion: 480 rows render in a few m
          +illiseconds.                                                  
       99 +    const tbody = document.createElement('tbody');            
      100 +    const fragment = document.createDocumentFragment();       
      101 +    for (const values of data) {                              
      102 +      const tr = document.createElement('tr');                
      103 +      for (const value of values) tr.append(cell('td', value))
          +;                                                             
      104 +      fragment.append(tr);                                    
      105 +    }                                                         
      106 +    tbody.append(fragment);                                   
      107 +    tableEl.append(captionEl, thead, tbody);                  
      108 +    scroll.append(tableEl);                                   
      109 +    return scroll;                                            
      110 +  }                                                           
      111 +                                                              
      112 +  function render(): void {                                   
      113 +    toolbar.hidden = false;                                   
      114 +    monthlyButton.setAttribute('aria-pressed', String(mode ===
          + 'monthly'));                                                 
      115 +    yearlyButton.setAttribute('aria-pressed', String(mode === 
          +'yearly'));                                                   
      116 +                                                              
      117 +    if (mode === 'monthly') {                                 
      118 +      body.replaceChildren(                                   
      119 +        table(                                                
      120 +          UI_TEXT.scheduleCaptionMonthly,                     
      121 +          [                                                   
      122 +            UI_TEXT.colPaymentNumber,                         
      123 +            UI_TEXT.colDate,                                  
      124 +            UI_TEXT.colPayment,                               
      125 +            UI_TEXT.colPrincipal,                             
      126 +            UI_TEXT.colInterest,                              
      127 +            UI_TEXT.colExtra,                                 
      128 +            UI_TEXT.colBalance,                               
      129 +          ],                                                  
      130 +          rows.map((row) => [                                 
      131 +            String(row.number),                               
      132 +            format.month(row),                                
      133 +            format.money(row.paymentCents),                   
      134 +            format.money(row.principalCents),                 
      135 +            format.money(row.interestCents),                  
      136 +            format.money(row.extraCents),                     
      137 +            format.money(row.balanceCents),                   
      138 +          ]),                                                 
      139 +        ),                                                    
      140 +      );                                                      
      141 +      return;                                                 
      142 +    }                                                         
      143 +                                                              
      144 +    body.replaceChildren(                                     
      145 +      table(                                                  
      146 +        UI_TEXT.scheduleCaptionYearly,                        
      147 +        [UI_TEXT.colYear, UI_TEXT.colPayment, UI_TEXT.colPrinc
          +ipal, UI_TEXT.colInterest, UI_TEXT.colExtra, UI_TEXT.colEndBal
          +ance],                                                        
      148 +        toYearly([...rows]).map((year) => [                   
      149 +          String(year.year),                                  
      150 +          format.money(year.paymentCents),                    
      151 +          format.money(year.principalCents),                  
      152 +          format.money(year.interestCents),                   
      153 +          format.money(year.extraCents),                      
      154 +          format.money(year.endBalanceCents),                 
      155 +        ]),                                                   
      156 +      ),                                                      
      157 +    );                                                        
      158 +  }                                                           
      159 +                                                              
      160 +  return {                                                    
      161 +    element: section,                                         
      162 +    show(newRows) {                                           
      163 +      rows = newRows;                                         
      164 +      render();                                               
      165 +    },                                                        
      166 +    showMessage(text) {                                       
      167 +      rows = [];                                              
      168 +      toolbar.hidden = true; // nothing to switch or download 
      169 +      const message = document.createElement('p');            
      170 +      message.className = 'results-message';                  
      171 +      message.textContent = text;                             
      172 +      body.replaceChildren(message);                          
      173 +    },                                                        
      174 +  };                                                          
      175 +}                                                             

⏺ Wiring the schedule into the app. Reading the current app.ts first, since I
  last edited it with a script:

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ The existing 268 tests still pass. Now the schedule tests, a CSV file and a
  DOM file:

⏺ Write(tests/unit/csv.test.ts)
  ⎿  Wrote 75 lines to tests/unit/csv.test.ts
       1 import { describe, expect, it } from 'vitest';
       2 import { calculateLoan, type LoanInput, type LoanResult } from '
         ../../src/engine/amortize';
       3 import { CSV_FILENAME, CSV_HEADER, centsToPlain, scheduleCsv } f
         rom '../../src/ui/csv';
       4 
       5 const TODAY = new Date(2026, 10, 6);
       6 
       7 function rows(principal: number, rate: number, years: number, to
         day = TODAY): LoanResult['rows'] {
     … +68 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ That passes, but one assertion I wrote is convoluted (a regex built and then
  edited at runtime). Simplifying it:

⏺ Update(tests/unit/csv.test.ts)
  ⎿  Added 1 line, removed 1 line
      61      const big = lines(scheduleCsv(rows(100_000_000, 30, 40)));
      62      expect(big).toHaveLength(481);
      63      expect(big[1]).toBe('1,2026-12,2500017.80,17.80,2500000.00,
          0.00,99999982.20');
      64 -    expect(big.join('')).not.toMatch(/e\+|NaN|Infinity|-/.sourc
         -e.replace('|-', ''));                                          
      64 +    expect(big.join('\n')).not.toMatch(/e\+|NaN|Infinity/);    
      65    });
      66  
      67    it.each([

  Ran 1 shell command (ctrl+o to expand)

⏺ All 290 tests pass. Now the browser: screenshots, render time for 480 rows,
  and a real CSV download.

  Called playwright 3 times, ran 1 shell command (ctrl+o to expand)

⏺ Timing a full recalculation plus render of the 480-row table, the worst case,
  measured in the real browser:

  Called playwright (ctrl+o to expand)

⏺ A 147 ms median per keystroke is too slow: anything over about 100 ms feels
  laggy while typing. Before changing anything I'll measure where the time
  actually goes:

  Called playwright (ctrl+o to expand)

⏺ Table layout takes about 46 ms of the 53 ms total, since the browser measures
  all 3,360 cells to size columns. I'm testing whether a fixed table layout,
  which sizes columns from the header row alone, fixes it.

  Called playwright (ctrl+o to expand)

⏺ Median latency fell from 147 ms to 30 ms with a fixed layout; the one 235 ms
  outlier was the first run, which also loaded the new stylesheet. Next I'm
  adding the CSS with a minimum table width, so narrow screens scroll inside the
  table box.

⏺ Update(src/ui/styles.css)
  ⎿  Added 4 lines
      647  
      648  .data-table {
      649    width: 100%;
      650 +  /* Fixed layout sizes columns from the header row instead of
          + measuring all 3,360 cells:                                   
      651 +     a 480-row update went from ~147 ms to ~30 ms in Chromium.
          + */                                                           
      652 +  table-layout: fixed;                                        
      653 +  min-width: 56rem; /* room for the largest amounts; narrower 
          +screens scroll inside .table-scroll */                        
      654    border-collapse: collapse;
      655    font-size: var(--text-sm);
      656    white-space: nowrap;

  Called playwright 2 times, ran 1 shell command (ctrl+o to expand)

⏺ The timings are noisy, with an 86 ms median and a 410 ms spike, which suggests
  garbage collection from rebuilding 3,360 elements per keystroke. I'm
  splitting the time into script and layout to confirm that before picking a
  fix.

  Called playwright (ctrl+o to expand)

⏺ A typical update now takes about 27 ms, with the occasional 160 ms spike
  coming from garbage collection of 3,360 cells per keystroke. I'll reuse the
  existing rows and cells, changing only their text, and rebuild the table only
  when switching between monthly and yearly.

  Ran 1 shell command (ctrl+o to expand)

⏺ That works, but my script left the indentation of render() uneven. Tidying it:

  Called playwright 2 times, ran 1 shell command (ctrl+o to expand)

⏺ 28 DOM tests now fail, and the browser still shows spikes, so the reuse change
  needs work. First, the error from a failing test:

  Ran 3 shell commands (ctrl+o to expand)

⏺ happy-dom lacks tbody.rows, so I'm switching to children, which every browser
  supports; the E9 handler had been hiding the thrown error and returning empty
  results.

  Ran 1 shell command (ctrl+o to expand)

⏺ All 290 pass again. I'll add a test that reused rows never keep stale values
  (shrinking and regrowing the table), then go back to the timing spikes:

  Called playwright 2 times, ran 2 shell commands (ctrl+o to expand)
⏺ Layout is fast now, but script time spikes to 167–340 ms intermittently,
  likely from the BigInt arithmetic run for every month. I'm benchmarking that
  code in Node on its own to confirm it's the cause.

  Ran 2 shell commands (ctrl+o to expand)

⏺ The engine itself is fast, at 0.23 ms median and 8 ms worst case, so the
  spikes likely come from DOM updates or the automation tooling. I'm next
  measuring updates that change nothing in the table, to tell those two apart.

  Called playwright (ctrl+o to expand)

⏺ Reusing rows was the wrong optimisation: updating 3,360 attached cells one by
  one takes about 135 ms, so I'm building a fresh <tbody> off-page and swapping
  it in with one operation instead.

  Called playwright 2 times, ran 1 shell command (ctrl+o to expand)

⏺ A median of 32 ms is fine for 480 rows, but the roughly 200 ms p90 spikes
  persist across every approach I tried, so they're likely GC or test-browser
  overhead rather than the engine. I'll stop optimising here and flag this to
  you, then move on to the screenshots.

  Read 1 file, called playwright 2 times (ctrl+o to expand)

⏺ The desktop schedule matches L3.1 with a sticky header and striped rows, but
  its right-aligned Date column reads poorly for text like "December 2026". I'll
  left-align dates in the monthly view only, since column 2 is an amount in the
  yearly view.

  Read 1 file, called playwright 4 times, ran 1 shell command (ctrl+o to expand)

⏺ At 360 px the page doesn't scroll sideways, but the table gives no sign that
  more columns continue to the right. I'm adding a sticky first column and a
  right-edge fade that appears whenever columns are hidden there.

  Read 1 file, called playwright 3 times, ran 1 shell command (ctrl+o to expand)

⏺ The fade works and the Payment column now slides in from the right. The
  "Payment number" header is clipped against "Date" because the fixed layout
  gives every column the same width, so I'm giving the first column a narrow
  explicit width and wrapping its header onto two lines.

  Read 1 file, called playwright 3 times, ran 1 shell command (ctrl+o to expand)

⏺ No cells are clipped and the page doesn't scroll sideways; the sticky
  payment-number column holds and the fade clears at the right end. Next I'm
  checking the yearly view on desktop in dark mode.

  Read 1 file, called playwright 5 times (ctrl+o to expand)

⏺ The yearly view shows the L3.3 figures ($21,583.80 / $3,684.00 / $17,899.80 /
  $296,316.00) with the Yearly button selected. Next I'll click Download CSV in
  the browser and check the console for errors.

  Called playwright 2 times, ran 1 shell command (ctrl+o to expand)

⏺ The real download checks out: mortgage-schedule.csv has the right header, CRLF
  endings, and 361 lines, with monthly rows as expected. I'm cleaning up and
  committing now.

  Called playwright (ctrl+o to expand)

⏺ Stop Task
  ⎿  cd "/Users/dev/Desktop/Test Project Usama" && npm run build 2>&1 |
     tail -1 && npx vite preview --port 4173 --strictPort · stopped

  Ran 1 shell command (ctrl+o to expand)

⏺ The schedule and CSV download (L3) are done. All 10 criteria are covered by
  tests (L3 has 10, not 9: number 10 is the any-date CSV check). All 291 tests
  pass, the type check and build are clean, and I committed it locally as
  17624c2 (not pushed).

  Your message still had the placeholder "<write what you saw…>", so I haven't
  recorded any result for steps 1–13.

  What was built

  - Schedule card below the form and results, full width.
    - It opens in monthly view: Payment number, Date, Payment, Principal,
      Interest, Extra payment, Balance.
    - A Monthly/Yearly toggle switches to one row per loan year, ending with
      "Ending balance". The chosen view stays when you change an input.
  - Download CSV saves mortgage-schedule.csv:
    - the exact header line;
    - YYYY-MM dates and plain 2-decimal amounts;
    - always monthly rows, even when the yearly view is showing.

    The file is made in the browser (a local blob URL), so no network request is
    involved.
  - When the inputs are invalid (or E7, E9 or E10 applies), the whole schedule
    is replaced by the same message as the results area. The toggle and download
    button are hidden, and no old rows remain.
  - Accessibility: the table sits in a labelled scroll region you can reach with
    Tab and scroll with arrow keys. It has a hidden caption and proper column
    headers.

  Speed with 480 rows (the worst case)

  I measured in Chromium instead of assuming.

  ┌──────────────────────────────┬──────────────────────────────────────────┐
  │           Version            │           Update per keystroke           │
  ├──────────────────────────────┼──────────────────────────────────────────┤
  │                              │ ~147 ms median. About 46 ms of that was  │
  │ First version                │ the browser measuring all 3,360 cells to │
  │                              │  size the columns                        │
  ├──────────────────────────────┼──────────────────────────────────────────┤
  │ Fixed table layout (columns  │ ~30 ms                                   │
  │ sized from the header row)   │                                          │
  ├──────────────────────────────┼──────────────────────────────────────────┤
  │                              │ Worse: ~135 ms when every value changes, │
  │ Reusing existing cells       │  which is the normal case while typing.  │
  │                              │ I dropped it                             │
  ├──────────────────────────────┼──────────────────────────────────────────┤
  │ Final: build the new table   │                                          │
  │ body off-screen, then swap   │ ~30 ms median                            │
  │ it in                        │                                          │
  └──────────────────────────────┴──────────────────────────────────────────┘

  There's one thing I couldn't eliminate: occasional spikes of about 200 ms
  (roughly 1 update in 10). They appeared with every approach I tried. The
  calculation itself takes 0.2 ms, so it isn't the cause. The spikes are most
  likely garbage collection or overhead from the automated test browser. Please
  check whether you notice lag when typing quickly with a 40-year term in a
  normal browser. If you do, the next fix would be to redraw the table once per
  animation frame.

  Browser checks (screenshots: desktop light, 360 px, desktop dark yearly)

  - Desktop: the values match L3.1 and L3.2, and the yearly view shows L3.3's
    year 1 exactly.
  - 360 px: the page doesn't scroll sideways, and the table scrolls inside its
    own box (L10.2). The screenshots showed two problems, which I fixed:
    - Nothing hinted that more columns existed. There's now a sticky first
      column and a fade on the right edge that disappears at the end of the
      table.
    - "Payment number" overlapped "Date". The first column is now narrower and
      headers wrap onto two lines. A check finds no clipped cells.
  - Date column: it was right-aligned like the amounts, and is now left-aligned
    in the monthly view.
  - Real download: a click in Chromium saved the file with the correct header,
    CRLF line endings, 361 lines and the correct first and last rows, while the
    yearly view was showing. The console had no errors or warnings.

  Tests

   csv.test.ts  10 (new) · ui.test.ts 54 (+13 schedule: L3.1–L3.10, view kept, 
  E7/E9, reused-row check, ARIA)
   amortize 49 · parse 38 · validate 48 · config 91 · setup 1
   Test Files  7 passed (7)
        Tests  291 passed (291)

  transcripts/session-03-part4.md is untracked and I didn't include it in the
  commit. Search it for ghp_ before you commit it yourself.

  Next is 5c: the extra payment field (L5) and the preset selector (M1).

✻ Baked for 9m 21s · done 8:03 PM

❯ /export transcripts/session-03-part4.md                                       
  ⎿  Conversation exported to: /Users/dev/Desktop/Test Project
     Usama/transcripts/session-03-part4.md

❯ I've now checked the app by hand in my browser: the 13 checks from step 5a    
  and the schedule                                                              
  (row 1, last row, year 1 = 21,583.80, CSV opens correctly in a spreadsheet).  
  All worked as                                                                 
  described. Typing with a 40-year term feels smooth, so no need for the        
  animation-frame change.                                                       
                                                                                
  Step 5c: the extra monthly payment (story L5, all criteria) and the loan      
  product selector                                                              
  (story M1, all criteria), using the presets from config. Same approach: tests 
  first, check in                                                               
  the browser with screenshots, run all tests.                                  

⏺ Good to hear it all worked by hand. Re-reading L5 and M1 from the docs first,
  so the tests match the exact wording:

  Ran 1 shell command (ctrl+o to expand)

⏺ Before writing the tests, I'm pinning down five UI behaviours the docs leave
  open: the extra payment field, the savings summary, the selector's default,
  when rate or term edits switch it to Custom, and when the description shows.

  Ran 1 shell command (ctrl+o to expand)

⏺ 24 new tests fail as expected. Now the code, starting with texts and the extra
  payment field:

  Ran 1 shell command (ctrl+o to expand)

⏺ Now the preset selector module:

⏺ Write(src/ui/presets.ts)
  ⎿  Added 74 lines, removed 2 lines
       1 -// Placeholder. Implemented in a later step (see docs/product-p
         -lan.md §4).                                                    
       2 -export {};                                                     
       1 +/**                                                            
       2 + * Loan product selector (M1). Lists "Custom" plus the config p
         +resets in config order.                                        
       3 + * Choosing a preset fills rate and term; editing either of tho
         +se afterwards switches back to                                 
       4 + * "Custom" so a quote is never labelled with a product it no l
         +onger matches (M1.4).                                          
       5 + * Names and descriptions are set with textContent only.       
       6 + */                                                            
       7 +import type { Preset } from '../config/defaults';              
       8 +import { UI_TEXT } from '../messages';                         
       9 +                                                               
      10 +export interface PresetSelector {                              
      11 +  element: HTMLElement;                                        
      12 +  /** Switches back to "Custom" (after the rate or term is edit
         +ed). */                                                        
      13 +  markCustom(): void;                                          
      14 +}                                                              
      15 +                                                               
      16 +export const PRESET_SELECT_ID = 'field-preset';                
      17 +const DESCRIPTION_ID = 'field-preset-description';             
      18 +                                                               
      19 +/** Returns null when there are no presets, so no selector is s
         +hown (M1.7). */                                                
      20 +export function createPresetSelector(                          
      21 +  presets: readonly Preset[],                                  
      22 +  apply: (preset: Preset) => void,                             
      23 +): PresetSelector | null {                                     
      24 +  if (presets.length === 0) return null;                       
      25 +                                                               
      26 +  const wrapper = document.createElement('div');               
      27 +  wrapper.className = 'field field-preset';                    
      28 +                                                               
      29 +  const label = document.createElement('label');               
      30 +  label.htmlFor = PRESET_SELECT_ID;                            
      31 +  label.textContent = UI_TEXT.loanProduct;                     
      32 +                                                               
      33 +  const select = document.createElement('select');             
      34 +  select.id = PRESET_SELECT_ID;                                
      35 +  select.name = 'preset';                                      
      36 +  const custom = document.createElement('option');             
      37 +  custom.value = '';                                           
      38 +  custom.textContent = UI_TEXT.custom;                         
      39 +  select.append(custom);                                       
      40 +  for (const preset of presets) {                              
      41 +    const option = document.createElement('option');           
      42 +    option.value = preset.id;                                  
      43 +    option.textContent = preset.name;                          
      44 +    select.append(option);                                     
      45 +  }                                                            
      46 +  select.value = ''; // "Custom" on load (M1.1)                
      47 +                                                               
      48 +  const description = document.createElement('p');             
      49 +  description.id = DESCRIPTION_ID;                             
      50 +  description.className = 'field-hint';                        
      51 +                                                               
      52 +  const showDescription = (text: string | null): void => {     
      53 +    description.textContent = text ?? '';                      
      54 +    if (text) select.setAttribute('aria-describedby', DESCRIPTI
         +ON_ID);                                                        
      55 +    else select.removeAttribute('aria-describedby');           
      56 +  };                                                           
      57 +                                                               
      58 +  select.addEventListener('change', () => {                    
      59 +    const preset = presets.find((candidate) => candidate.id ===
         + select.value);                                                
      60 +    showDescription(preset?.description ?? null);              
      61 +    // "Custom" keeps the current field values (M1.6).         
      62 +    if (preset) apply(preset);                                 
      63 +  });                                                          
      64 +                                                               
      65 +  wrapper.append(label, select, description);                  
      66 +  return {                                                     
      67 +    element: wrapper,                                          
      68 +    markCustom() {                                             
      69 +      if (select.value === '') return;                         
      70 +      select.value = '';                                       
      71 +      showDescription(null);                                   
      72 +    },                                                         
      73 +  };                                                           
      74 +}                                                              

⏺ Now wiring the extra payment default and the selector into the app:

  Ran 1 shell command (ctrl+o to expand)

⏺ Now the savings summary in the results:
  Ran 1 shell command (ctrl+o to expand)

⏺ All 317 tests pass, but my own review turned up a bug they missed: the savings
  title shows a capped figure instead of the user's entered extra amount. I'm
  adding a test for that and then fixing it.

  Ran 1 shell command (ctrl+o to expand)

⏺ The test confirms the bug. Fixing it by passing the entered extra amount to
  the results view:

  Ran 1 shell command (ctrl+o to expand)

⏺ All 317 pass. Checking the contrast of the new green savings figures before
  going to the browser:

  Ran 1 shell command (ctrl+o to expand)

⏺ Both pass AA (5.07 and 9.40). Now the browser check, using the shipped
  config.json with its two presets:

  Read 1 file, called playwright 7 times, ran 1 shell command (ctrl+o to expand)

⏺ The desktop view works in a real browser: "15-year fixed" filled in 5.75 and
  15, and the savings panel shows the extra $200.00 monthly payment. Next I'll
  check that editing the rate switches the selector to Custom, then test at 360
  px.

  Read 1 file, called playwright 9 times (ctrl+o to expand)

⏺ At 360 px the E6 error shows its marker and the results and schedule show E8
  as required, with no horizontal scroll; the selector's focus ring is only Tab
  wrapping to the top. Last I'll check the savings panel at 360 px with valid
  values, since the amounts are tight there.

  Read 1 file, called playwright 3 times (ctrl+o to expand)

⏺ The savings panel fits at 360 px even with large values, with no horizontal
  scroll. Cleaning up and committing:

  Called playwright (ctrl+o to expand)

⏺ Stop Task
  ⎿  cd "/Users/dev/Desktop/Test Project Usama" && npm run build 2>&1 |
     tail -1 && npx vite preview --port 4173 --strictPort · stopped

  Ran 1 shell command (ctrl+o to expand)

⏺ The extra monthly payment (L5) and the loan product selector (M1) are done,
  with every criterion covered by tests. All 317 tests pass, the type check and
  build are clean, and I committed it locally as 3ff0ffc (not pushed).

  What was built

  - Extra monthly payment field:
    - It sits below the term, with the currency symbol, and starts empty when
      the config default is 0.
    - Invalid values show E6, following the same message timing as the other
      fields.
    - The schedule fills the Extra payment column, and the loan ends early.
  - Savings panel, shown only when the extra payment is above 0 (L5.3). For
    example: "Paying $200.00 extra each month: 81 months saved, $91,173.87
    interest saved."
  - Loan product selector at the top of the form, filled from the config
    presets:
    - "Custom" comes first and is selected on load, followed by the products in
      config order.
    - Choosing a product fills the rate and term, recalculates, and shows the
      product's description underneath.
    - Editing the rate or term switches back to "Custom". Editing price, down
      payment or extra payment doesn't.
    - Choosing "Custom" keeps the current values.
    - With no presets in the config, the selector isn't shown at all.
    - Product names and descriptions are inserted as plain text, never as HTML.

  A bug I caught before committing

  Reviewing my own code, I noticed the savings title took the extra amount from
  row 1 of the schedule. That value is capped at what's owed, so entering
  400,000 would have shown "Paying $299,701.35 extra each month". I wrote a test
  that failed on exactly that, then fixed it: the panel now shows the amount
  you entered.

  Browser checks (real Chromium, with the shipped config.json)

  - Desktop: choosing "15-year fixed" filled 5.75 and 15, showed the description
    and a payment of $2,491.23. An extra 200 showed 20 months and $18,364.42
    saved. Changing the rate to 6 switched the selector to "Custom", cleared the
    description, and the payment became $2,531.57 (M1.4).
  - In a real browser, changing a dropdown fires two events (input, then
    change). The selected product survived both, rather than resetting to
    Custom.
  - 360 px: with extra payment -50, the field shows E6 with the "!" marker, and
    the results and schedule both show E8. With a large extra payment the
    savings panel still fits, and there's no horizontal scroll in either case.
  - Contrast: the new green savings figures are 5.07:1 (light) and 9.40:1
    (dark), both above AA.

  Tests

   ui.test.ts 80 (+26: L5.1–L5.8, extra default/prefix, "1 month", savings 
  title;
                 M1.1–M1.7, preset clears a rate error, plain-text names)
   amortize 49 · parse 38 · validate 48 · config 91 · csv 10 · setup 1
   Test Files  7 passed (7)
        Tests  317 passed (317)

  All Core stories now have working code: L1, L2, L3, L5, L8, L10, M1 and A1–A5.
  What's still to do for the submission:
  - The README: how to run it, the config fields (A1.5), the browser checklist
    (L10.1) and the manual network check (A5.4).
  - The browser check itself in Chrome, Edge, Firefox and Safari. Only you can
    do this.
  - Story statuses in user-stories.md: updating them from "Not implemented" to
    "Implemented".

  transcripts/session-03-part4.md is still untracked. Search it for ghp_ before
  you commit it.

✻ Baked for 4m 2s · done 8:08 PM

❯ /export transcripts/session-03-part5.md                                       
  ⎿  Conversation exported to: /Users/dev/Desktop/Test Project
     Usama/transcripts/session-03-part5.md

❯ Checked 5c by hand: extra 200 gives 81 months and 91,173.87 saved, and the    
  product selector                                                              
  switches to Custom when I edit the rate. Good catch on the savings-title bug. 
                                                                                
  Step 6: story L10 (current Chrome, Edge, Firefox, Safari; 360px; keyboard).   
  Give me a short manual checklist I can run in each browser myself. I'll       
  report the results.                                                           
  Then audit every Core story (L1, L2, L3, L5, L8, L10, M1, A1–A5): for each    
  acceptance                                                                    
  criterion give PASS / FAIL / NOT BUILT and how it's verified (test name or    
  manual).                                                                      
  Don't fix anything yet and don't change statuses yet; just the table.         

⏺ The audit has to match the exact criteria, so I'm pulling the Core stories I
  haven't re-read in this step, plus the test names that verify them:

  Ran 2 shell commands (ctrl+o to expand)

⏺ I'm checking whether Vite's dev and preview servers return index.html for a
  missing config.json, since that would hide the "file not found" case A4.1
  needs, and I'm testing with a missing path so the real config stays untouched.

  Ran 1 shell command (ctrl+o to expand)

⏺ That confirms a real defect, and I'm reporting it without fixing it, as you
  asked:

  missing config.json, served by vite preview → status 200, text/html, <!doctype
  html>…
  missing config.json, served by npm run dev  → status 200, text/html, <!doctype
  html>…
  Both Vite servers answer a missing file with index.html, so the app shows
  "invalid JSON" instead of "file not found". The unit test passes only because
  it fakes a 404. On a plain static server (nginx, python -m http.server) the
  real 404 comes back and A4.1 works. Details are in the audit below.

  L10 manual checklist (run once per browser)

  Use the current Chrome, Edge, Firefox and Safari (macOS). Start the app with
  npm run dev and open the printed link. For each browser, note its version and
  the date.

  #: 1
  Do this: Load the page
  Expected: $1,798.65 monthly, loan $300,000.00, a payoff date, footer
  "Riverside
    Mortgages". No banner
  ────────────────────────────────────────
  #: 2
  Do this: Set price 300000, down 0
  Expected: Total interest $347,515.44, total paid $647,515.44
  ────────────────────────────────────────
  #: 3
  Do this: Rate 31, then press Tab
  Expected: Red border, "!" and "Enter an interest rate between 0 and 30.";
    results and schedule show "Fix the highlighted fields…"
  ────────────────────────────────────────
  #: 4
  Do this: Change the rate back to 6
  Expected: The message disappears as you type; $1,798.65 is back
  ────────────────────────────────────────
  #: 5
  Do this: Type 1,500,000 as the price, and 6.5% as the rate
  Expected: Both accepted, no error
  ────────────────────────────────────────
  #: 6
  Do this: Loan product → "15-year fixed"
  Expected: Rate 5.75, term 15, description shown underneath; edit the rate →
    selector shows "Custom"
  ────────────────────────────────────────
  #: 7
  Do this: Extra monthly payment 200 (with 300,000 / 0 / 6 / 30)
  Expected: "81 months" and "$91,173.87" saved; schedule ends at row 279
  ────────────────────────────────────────
  #: 8
  Do this: Schedule → Yearly
  Expected: 30 rows; year 1 payment $21,583.80
  ────────────────────────────────────────
  #: 9
  Do this: Download CSV, open it
  Expected: File mortgage-schedule.csv; line 2 is 1,2026-12,1798.65,… (the month

    after today); monthly rows even in yearly view
  ────────────────────────────────────────
  #: 10
  Do this: Keyboard only: Tab from the top through the whole page
  Expected: Selector → 5 inputs → Monthly → Yearly → Download CSV → table, each
    with a visible blue ring. Enter or Space works the buttons; arrow keys
  change
     the selector and scroll the table
  ────────────────────────────────────────
  #: 11
  Do this: 360 px wide (Chrome/Edge: DevTools device toolbar · Firefox:
    Ctrl/Cmd+Shift+M · Safari: Develop → Responsive Design Mode)
  Expected: One column, no sideways page scroll; the schedule scrolls inside its

    own box with a sticky first column
  ────────────────────────────────────────
  #: 12
  Do this: DevTools → Network, reload, repeat a few steps
  Expected: Only localhost requests (page files + config.json); nothing external
  ────────────────────────────────────────
  #: 13
  Do this: DevTools → Console during all steps
  Expected: No errors

  Audit of the Core stories

  Labels: PASS means verified, either by an automated test (test names as in
  tests/unit/) or by a check I ran. FAIL means it doesn't work as written. NOT
  BUILT means the thing it depends on doesn't exist yet. PENDING means it needs
  your manual check.

  L1. Calculate the monthly payment: 7/7 PASS

  ┌─────┬────────┬───────────────────────────────────────────────────────────┐
  │  #  │ Result │                        Verified by                        │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 1   │ PASS   │ ui L1.1                                                   │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 2   │ PASS   │ ui L1.2 / L1.3; engine A3                                 │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 3   │ PASS   │ ui L1.2 / L1.3 (also checks no error shows); engine A4    │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 4   │ PASS   │ ui L1.4                                                   │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 5   │ PASS   │ ui L1.5 (also checks there's no submit button)            │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 6   │ PASS   │ engine A6; validate B3 (price 1 accepted)                 │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 7   │ PASS   │ ui L1.7 / L2.4 (written in full, no                       │
  │     │        │ NaN/Infinity/exponent)                                    │
  └─────┴────────┴───────────────────────────────────────────────────────────┘

  L2. See the total cost of the loan: 6/6 PASS

  ┌─────┬────────┬───────────────────────────────────────────────────────────┐
  │  #  │ Result │                        Verified by                        │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 1   │ PASS   │ ui L2.1 / L2.2; engine B1                                 │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 2   │ PASS   │ ui L2.1 / L2.2; engine C1                                 │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 3   │ PASS   │ engine B3 (0.00 / 120,000.00). Not checked on screen; the │
  │     │        │  UI formats it the same way as the other totals           │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 4   │ PASS   │ ui L1.7 / L2.4; engine B5                                 │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 5   │ PASS   │ engine B6; validate I3 (1,000-input loop)                 │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 6   │ PASS   │ ui L2.6; engine C2, C3 (change of year)                   │
  └─────┴────────┴───────────────────────────────────────────────────────────┘

  L3. View and export the amortization schedule: 10/10 PASS

  ┌─────┬────────┬───────────────────────────────────────────────────────────┐
  │  #  │ Result │                        Verified by                        │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 1   │ PASS   │ ui L3.1; engine D1                                        │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 2   │ PASS   │ ui L3.2; engine D2                                        │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 3   │ PASS   │ ui L3.3; engine D4                                        │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 4   │ PASS   │ ui L3.4 / L3.5; csv L3.4; real download in Chromium (5b)  │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 5   │ PASS   │ csv L3.5; ui L3.4 / L3.5 (yearly view still exports       │
  │     │        │ monthly rows)                                             │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 6   │ PASS   │ ui L3.6; engine D6                                        │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 7   │ PASS   │ ui L3.7; engine D7                                        │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 8   │ PASS   │ ui L3.8, E7 and E9 also replace the schedule              │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 9   │ PASS   │ ui L3.9; engine C2                                        │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 10  │ PASS   │ ui L3.10; csv L3.10                                       │
  └─────┴────────┴───────────────────────────────────────────────────────────┘

  L5. Model extra payments: 8/8 PASS

  ┌─────┬────────┬────────────────────────────────────────────────────────┐
  │  #  │ Result │                      Verified by                       │
  ├─────┼────────┼────────────────────────────────────────────────────────┤
  │ 1   │ PASS   │ ui L5.1; engine E-1, C4                                │
  ├─────┼────────┼────────────────────────────────────────────────────────┤
  │ 2   │ PASS   │ ui L5.2; engine E-2                                    │
  ├─────┼────────┼────────────────────────────────────────────────────────┤
  │ 3   │ PASS   │ ui L5.3 ("0" and ""); engine E-4                       │
  ├─────┼────────┼────────────────────────────────────────────────────────┤
  │ 4   │ PASS   │ ui L5.4 (all three values); validate R6                │
  ├─────┼────────┼────────────────────────────────────────────────────────┤
  │ 5   │ PASS   │ ui L5.5; engine E-3                                    │
  ├─────┼────────┼────────────────────────────────────────────────────────┤
  │ 6   │ PASS   │ ui L5.6                                                │
  ├─────┼────────┼────────────────────────────────────────────────────────┤
  │ 7   │ PASS   │ engine D8 (every case, including the 1,000-input loop) │
  ├─────┼────────┼────────────────────────────────────────────────────────┤
  │ 8   │ PASS   │ ui L5.8; engine C5                                     │
  └─────┴────────┴────────────────────────────────────────────────────────┘

  L8. Get clear messages for invalid input: 20/20 PASS

  ┌─────┬────────┬───────────────────────────────────────────────────────────┐
  │  #  │ Result │                        Verified by                        │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 1   │ PASS   │ ui rule 11 (on leaving the field) + L8.15; validate V1    │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 2   │ PASS   │ validate V2; the on-screen behaviour is the same code     │
  │     │        │ path as #1                                                │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 3   │ PASS   │ ui L8.3                                                   │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 4   │ PASS   │ validate R1                                               │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 5   │ PASS   │ validate R2                                               │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 6   │ PASS   │ parse P1, P2/P3                                           │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 7   │ PASS   │ parse P4 (all 5 values); validate (E1 → no results)       │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 8   │ PASS   │ ui L8.8; validate I2; engine F1/F3                        │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 9   │ PASS   │ ui L8.9; validate R5                                      │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 10  │ PASS   │ validate B1                                               │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 11  │ PASS   │ validate B2                                               │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 12  │ PASS   │ validate B3                                               │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 13  │ PASS   │ validate B4                                               │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 14  │ PASS   │ ui rule 11 / L8.14; validate I1                           │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 15  │ PASS   │ ui L8.15, L3.8                                            │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 16  │ PASS   │ ui L8.16                                                  │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 17  │ PASS   │ validate I3 (1,000 seeded random and boundary inputs)     │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 18  │ PASS   │ ui L8.18, every message element is an aria-live region    │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 19  │ PASS   │ ui L8.19 (an injected throw)                              │
  ├─────┼────────┼───────────────────────────────────────────────────────────┤
  │ 20  │ PASS   │ ui L8.20 (an injected NaN result, and an engine E10)      │
  └─────┴────────┴───────────────────────────────────────────────────────────┘

  L10. Use it on my phone and in any current browser: 0/3 verified yet

  ┌─────┬────────────┬──────────────────────────────────────────────────────┐
  │  #  │   Result   │                     Verified by                      │
  ├─────┼────────────┼──────────────────────────────────────────────────────┤
  │     │ PENDING +  │ Your checklist above. The criterion also needs the   │
  │ 1   │ NOT BUILT  │ results recorded in the README, which doesn't exist  │
  │     │            │ yet                                                  │
  ├─────┼────────────┼──────────────────────────────────────────────────────┤
  │     │            │ PASS in Chromium (I measured scrollWidth 360, with   │
  │ 2   │ PENDING    │ the table scrolling inside its own box and nothing   │
  │     │            │ clipped). Firefox, Safari and Edge: checklist #11    │
  ├─────┼────────────┼──────────────────────────────────────────────────────┤
  │ 3   │ PENDING    │ Focus rings confirmed in Chromium screenshots. The   │
  │     │            │ full Tab order and keys need checklist #10           │
  └─────┴────────────┴──────────────────────────────────────────────────────┘

  M1. Apply loan product presets: 7/7 PASS

  ┌─────┬────────┬─────────────────────────────────────────────┐
  │  #  │ Result │                 Verified by                 │
  ├─────┼────────┼─────────────────────────────────────────────┤
  │ 1   │ PASS   │ ui M1.1                                     │
  ├─────┼────────┼─────────────────────────────────────────────┤
  │ 2   │ PASS   │ ui M1.2; real Chromium (5c)                 │
  ├─────┼────────┼─────────────────────────────────────────────┤
  │ 3   │ PASS   │ ui M1.3                                     │
  ├─────┼────────┼─────────────────────────────────────────────┤
  │ 4   │ PASS   │ ui M1.4 (rate and term); real Chromium (5c) │
  ├─────┼────────┼─────────────────────────────────────────────┤
  │ 5   │ PASS   │ ui M1.5 (price, down payment, extra)        │
  ├─────┼────────┼─────────────────────────────────────────────┤
  │ 6   │ PASS   │ ui M1.6                                     │
  ├─────┼────────┼─────────────────────────────────────────────┤
  │ 7   │ PASS   │ ui M1.7 (missing and empty list)            │
  └─────┴────────┴─────────────────────────────────────────────┘

  A1. Configure locale, currency and defaults: 4 PASS, 1 NOT BUILT

  ┌─────┬─────────┬─────────────────────────────────────────────────────────┐
  │  #  │ Result  │                       Verified by                       │
  ├─────┼─────────┼─────────────────────────────────────────────────────────┤
  │ 1   │ PASS    │ ui A1.1; config C1                                      │
  ├─────┼─────────┼─────────────────────────────────────────────────────────┤
  │ 2   │ PASS    │ ui config defaults 400,000 / 5 / 25; config D1          │
  ├─────┼─────────┼─────────────────────────────────────────────────────────┤
  │ 3   │ PASS    │ validate M2; config R1. Checked at unit level only: no  │
  │     │         │ on-screen test with a config limit                      │
  ├─────┼─────────┼─────────────────────────────────────────────────────────┤
  │ 4   │ PASS    │ config G1, PR6                                          │
  ├─────┼─────────┼─────────────────────────────────────────────────────────┤
  │ 5   │ NOT     │ The README doesn't exist yet                            │
  │     │ BUILT   │                                                         │
  └─────┴─────────┴─────────────────────────────────────────────────────────┘

  A2. Define loan product presets: 5/5 PASS

  ┌─────┬────────┬───────────────────────────────────┐
  │  #  │ Result │            Verified by            │
  ├─────┼────────┼───────────────────────────────────┤
  │ 1   │ PASS   │ config PR1; ui M1.3               │
  ├─────┼────────┼───────────────────────────────────┤
  │ 2   │ PASS   │ config PR2                        │
  ├─────┼────────┼───────────────────────────────────┤
  │ 3   │ PASS   │ config PR3                        │
  ├─────┼────────┼───────────────────────────────────┤
  │ 4   │ PASS   │ config PR4                        │
  ├─────┼────────┼───────────────────────────────────┤
  │ 5   │ PASS   │ config PR5; ui M1.7 (no selector) │
  └─────┴────────┴───────────────────────────────────┘

  A3. Set the disclaimer and office name: 5/5 PASS

  ┌─────┬────────┬────────────────────────────────────────────┐
  │  #  │ Result │                Verified by                 │
  ├─────┼────────┼────────────────────────────────────────────┤
  │ 1   │ PASS   │ ui A3.1                                    │
  ├─────┼────────┼────────────────────────────────────────────┤
  │ 2   │ PASS   │ ui A3.2 (no img element); config S1/S2     │
  ├─────┼────────┼────────────────────────────────────────────┤
  │ 3   │ PASS   │ ui A3.3; config S3 (missing, empty, blank) │
  ├─────┼────────┼────────────────────────────────────────────┤
  │ 4   │ PASS   │ config S4                                  │
  ├─────┼────────┼────────────────────────────────────────────┤
  │ 5   │ PASS   │ ui A3.5                                    │
  └─────┴────────┴────────────────────────────────────────────┘

  A4. Fail safely on a bad configuration: 7 PASS, 1 FAIL

  #: 1
  Result: FAIL (under npm run dev / vite preview)
  Verified by: The unit test (config L1) passes with a faked 404. Under Vite, a
    missing config.json returns index.html with status 200 (shown above), so the

    banner says "invalid JSON" instead of "file not found". It works on a plain
    static server. A likely fix: treat an HTML response as "file not found"
  ────────────────────────────────────────
  #: 2
  Result: PASS
  Verified by: config L3
  ────────────────────────────────────────
  #: 3
  Result: PASS
  Verified by: config G3; ui E11 is shown with its exact text
  ────────────────────────────────────────
  #: 4
  Result: PASS
  Verified by: config R5; ui E12 is shown…
  ────────────────────────────────────────
  #: 5
  Result: PASS
  Verified by: config D2, D3
  ────────────────────────────────────────
  #: 6
  Result: PASS
  Verified by: ui E12 is shown; Dismiss hides it… returns on reload
  ────────────────────────────────────────
  #: 7
  Result: PASS
  Verified by: config W1 (field name + value via console.warn)
  ────────────────────────────────────────
  #: 8
  Result: PASS
  Verified by: config G4 (10 malformed configs), L1–L5

  A5. Run and build locally with free tools: 2 PASS, 1 NOT BUILT, 1 PENDING + 
  NOT BUILT

  ┌─────┬──────────────┬────────────────────────────────────────────────────┐
  │  #  │    Result    │                    Verified by                     │
  ├─────┼──────────────┼────────────────────────────────────────────────────┤
  │     │              │ npm install and npm run dev work (used             │
  │ 1   │ NOT BUILT    │ throughout), but "following the README" isn't      │
  │     │              │ possible yet                                       │
  ├─────┼──────────────┼────────────────────────────────────────────────────┤
  │ 2   │ PASS         │ npm test exits 0 (317 tests, every step)           │
  ├─────┼──────────────┼────────────────────────────────────────────────────┤
  │ 3   │ PASS         │ npm run build + npx vite preview, used for every   │
  │     │              │ screenshot check                                   │
  ├─────┼──────────────┼────────────────────────────────────────────────────┤
  │ 4   │ PENDING +    │ Your checklist #12. The result also has to be      │
  │     │ NOT BUILT    │ recorded in the README                             │
  └─────┴──────────────┴────────────────────────────────────────────────────┘

  Summary

  88 criteria: 79 PASS, 1 FAIL (A4.1), 3 NOT BUILT, 5 PENDING (two of them also 
  need the README).

  ┌──────────┬───────────────────────────────────────────┬──────────────────┐
  │  Status  │                 Criteria                  │  What's needed   │
  ├──────────┼───────────────────────────────────────────┼──────────────────┤
  │ FAIL     │ A4.1                                      │ A code fix       │
  ├──────────┼───────────────────────────────────────────┼──────────────────┤
  │ NOT      │ A1.5, A5.1, and the README record in      │ The README       │
  │ BUILT    │ L10.1 and A5.4                            │                  │
  ├──────────┼───────────────────────────────────────────┼──────────────────┤
  │ PENDING  │ L10.1, L10.2, L10.3, A5.4                 │ Your browser     │
  │          │                                           │ checks           │
  └──────────┴───────────────────────────────────────────┴──────────────────┘

  I haven't fixed anything or changed any status. Send me your browser results
  when you have them.

✻ Churned for 1m 34s · done 8:11 PM

❯ Good audit, and good catch on A4.1. Fix it in two layers:                     
  1. Root cause: set appType: 'mpa' in vite.config.ts so dev and preview return 
  a real 404.                                                                   
  2. Defence: in loadConfig, treat a response that isn't JSON (e.g. text/html)  
  as "file not found".                                                          
     Add a test for the HTML case, check a missing config.json in the real dev  
  server, and run all tests.                                                    
                                                                                
  My manual checklist results (1–13):                                           
  - Chrome <version>: <all passed / what failed>                                
  - Safari <version>: <...>                                                     
  - Firefox <version>: <...>                                                    
  - Edge <version>: <...>                                                       
    Record these in a short "Browser check" note for the README later.          

⏺ Your browser results still have the template placeholders ("Chrome <version>:
  <all passed / what failed>"), so I have nothing to record yet. Send the actual
  versions and results and I'll write the "Browser check" note.

  Now the A4.1 fix. First, the root cause in vite.config.ts:

  Read 1 file (ctrl+o to expand)

⏺ Update(vite.config.ts)
  ⎿  Added 3 lines
       3  export default defineConfig({
       4    // Relative asset paths, so dist/ works from any folder or su
          b-path.
       5    base: './',
       6 +  // 'mpa': no single-page-app fallback, so a missing file (e.g
         +. config.json) gets a real 404                                 
       7 +  // in `npm run dev` and `vite preview` instead of index.html 
         +with status 200 (A4.1).                                        
       8 +  appType: 'mpa',                                              
       9    test: {
      10      include: ['tests/unit/**/*.test.ts'],
      11      environment: 'node',

  Ran 1 shell command (ctrl+o to expand)

⏺ Both servers now return a real 404 for missing files, so the root cause is
  fixed. Next I'll add a defence layer with tests first, treating text/html or a
  body starting with < as "file not found" while leaving other content types
  alone.

  Ran 1 shell command (ctrl+o to expand)

⏺ The two HTML tests fail as expected: today they report "invalid JSON". Now the
  fix in loadConfig:

  Ran 1 shell command (ctrl+o to expand)

⏺ All 321 tests pass, but my new isHtml check sits outside any try, which could
  break the promise that loadConfig never rejects, so I'm making it safe next.
⏺ Update(src/config/loadConfig.ts)
  ⎿  Added 6 lines, removed 1 line
      26   * servers send valid .json files that way.
      27   */
      28  function isHtml(response: FetchResponseLike, body: string): boo
          lean {
      29 -  const type = response.headers?.get('content-type') ?? '';    
      29 +  let type = '';                                               
      30 +  try {                                                        
      31 +    type = response.headers?.get('content-type') ?? '';        
      32 +  } catch {                                                    
      33 +    // An odd headers object must not break loading (loadConfig
         + never rejects).                                               
      34 +  }                                                            
      35    return /^\s*text\/html\b/i.test(type) || body.trimStart().sta
          rtsWith('<');
      36  }
      37  

⏺ Now the end-to-end check in the real dev server with config.json actually
  missing. I'll move the file aside temporarily (backing it up first) and
  restore it straight afterwards:

  Called playwright 4 times, ran 2 shell commands (ctrl+o to expand)

⏺ A4.1 passes on the real dev server: the default-settings banner shows, the
  calculator runs on built-in defaults at $1,798.65, and the only extra console
  noise is the browser's expected 404 for the missing file. I'm restoring the
  config and checking it against the backup next.

  Called playwright (ctrl+o to expand)

⏺ Stop Task
  ⎿  cd "/Users/dev/Desktop/Test Project Usama" && npx vite --port 5173
     --strictPort · stopped

  Ran 2 shell commands (ctrl+o to expand)

⏺ A4.1 is fixed and verified in the real dev server with config.json actually
  missing. All 321 tests pass, and I committed it locally as 310fb71 (not
  pushed).

  What changed

  1. Root cause: vite.config.ts now sets appType: 'mpa'. I checked with curl,
     before and after:

  |                            | Before                      | After           |
  |----------------------------|-----------------------------|-----------------|
  | Missing JSON, npm run dev  | 200, text/html (index.html) | 404             |
  | Missing JSON, vite preview | 200, text/html              | 404             |
  | / and /config.json         | 200                         | 200 (unchanged) |

  2. Defence in loadConfig: an HTML response is treated as "file not found".
     That means either a text/html content type or a body starting with <, which
     valid JSON never does. I deliberately didn't reject every non-JSON content
     type: some static servers send .json files as text/plain, and refusing
     those would break a valid config. The header check can't throw, so
     loadConfig still never rejects.
  3. Tests: 4 new ones, written first. The two HTML tests failed before the fix.
     They cover:
     - HTML with status 200;
     - HTML with no content type;
     - valid JSON still accepted as application/json, text/plain or with no
       type;
     - broken non-HTML JSON still reported as "invalid JSON".

  Check in the real dev server

  I moved public/config.json aside and loaded the app with npm run dev:
  - Banner: "Configuration could not be loaded (file not found). Using default
    settings." (exact E11 text)
  - Calculator: works on the built-in defaults ($1,798.65); no selector, because
    there are no presets; default disclaimer in the footer.
  - Console: our [config] … (file not found). 404 warning (A4.7), plus the
    browser's own "Failed to load resource: 404" line. Browsers always log that
    for a missing file; it's expected and the app can't suppress it.

  Then I put config.json back and confirmed it's identical to a backup made
  beforehand (cmp); git shows no change to it.

  Updated audit

  A4.1 moves from FAIL to PASS. The tally is now 80 PASS, 0 FAIL, 3 NOT BUILT
  (the README items) and 5 PENDING (your browser checks).

  Browser check note

  I can't write this yet, because your results still read Chrome <version>: <all
  passed / what failed> (the same for all four browsers). Please send each
  browser's version and whether checks 1–13 passed or which failed. I'll then
  write the "Browser check" section for the README. I won't fill it in myself,
  since L10.1 has to report what you actually saw.

  transcripts/session-03-part4.md and session-03-part5.md are untracked. Search
  both for ghp_ before committing them.

✻ Cooked for 1m 50s · done 8:14 PM

❯ Finalise the statuses in docs/user-stories.md:                                
  - Implemented only where every criterion passes: L1, L2, L3, L5, L8, M1, A2,  
  A3, A4.                                                                       
  - L10: Not implemented. Note: built and checked in Chromium (360px, focus);   
  not verified by                                                               
    hand in Chrome, Edge, Firefox and Safari.                                   
  - A1 and A5: Implemented only after the README exists and A1.5/A5.1 pass;     
  check again at the end.                                                       
  - All Stretch and "Not in this build" stories stay Not implemented.           
    Also make app-roles.md and product-plan.md describe only what exists (e.g.  
  no "once built"                                                               
    features as if they exist). Show me the status list.                        

⏺ Starting with the statuses. Here are the current status lines:

  Ran 2 shell commands (ctrl+o to expand)

⏺ Statuses are set. Next, app-roles.md and product-plan.md. Reading both in
  full, so I catch every place that describes something not built as if it
  exists:

  Read 2 files (ctrl+o to expand)

⏺ Found several gaps: app-roles.md still describes quote printing and share
  links that don't exist, and product-plan.md still calls the app a comparison
  tool and points to unbuilt milestones. Applying the edits now.

  Ran 1 shell command (ctrl+o to expand)

⏺ No future-as-present wording is left. Running the tests (nothing in code
  changed, but a quick check costs nothing), then making the checkpoint commit:

  Ran 1 shell command (ctrl+o to expand)

⏺ I've finalised the statuses in docs/user-stories.md and updated app-roles.md
  and product-plan.md so they describe only what exists. Committed locally as
  bc57154 (not pushed).

  Status list

  Story: L1 Calculate the monthly payment
  Scope: Core
  Status: Implemented
  ────────────────────────────────────────
  Story: L2 See the total cost
  Scope: Core
  Status: Implemented
  ────────────────────────────────────────
  Story: L3 Schedule and CSV
  Scope: Core
  Status: Implemented
  ────────────────────────────────────────
  Story: L4 Compare scenarios
  Scope: Stretch
  Status: Not implemented
  ────────────────────────────────────────
  Story: L5 Extra payments
  Scope: Core
  Status: Implemented
  ────────────────────────────────────────
  Story: L6 What I can afford
  Scope: Not in this build
  Status: Not implemented
  ────────────────────────────────────────
  Story: L7 Share and print
  Scope: Stretch
  Status: Not implemented
  ────────────────────────────────────────
  Story: L8 Clear messages for invalid input
  Scope: Core
  Status: Implemented
  ────────────────────────────────────────
  Story: L9 Full housing cost
  Scope: Not in this build
  Status: Not implemented
  ────────────────────────────────────────
  Story: L10 Phone and any current browser
  Scope: Core
  Status: Not implemented. Note: built and checked in Chromium only (360 px 
    layout, visible focus); not yet verified by hand in Chrome, Edge,  Firefox 
    and Safari, and the README browser record (L10.1) doesn't exist  yet.
  ────────────────────────────────────────
  Story: L11 Remember last scenario
  Scope: Not in this build
  Status: Not implemented
  ────────────────────────────────────────
  Story: L12 Down payment as a percentage
  Scope: Not in this build
  Status: Not implemented
  ────────────────────────────────────────
  Story: M1 Loan product presets
  Scope: Core
  Status: Implemented
  ────────────────────────────────────────
  Story: M2 Print a client quote
  Scope: Stretch
  Status: Not implemented
  ────────────────────────────────────────
  Story: M3 Send a ready-made scenario
  Scope: Not in this build
  Status: Not implemented
  ────────────────────────────────────────
  Story: M4 Compare products
  Scope: Not in this build
  Status: Not implemented
  ────────────────────────────────────────
  Story: A1 Locale, currency and defaults
  Scope: Core
  Status: Not implemented. Note: all criteria pass except A1.5, which needs the 
    README. Re-check when the README exists.
  ────────────────────────────────────────
  Story: A2 Loan product presets in config
  Scope: Core
  Status: Implemented
  ────────────────────────────────────────
  Story: A3 Disclaimer and office name
  Scope: Core
  Status: Implemented
  ────────────────────────────────────────
  Story: A4 Fail safely on bad config
  Scope: Core
  Status: Implemented
  ────────────────────────────────────────
  Story: A5 Run and build locally
  Scope: Core
  Status: Not implemented. Note: A5.2 and A5.3 pass; A5.1 and the README record 
    in A5.4 need the README. Re-check when the README exists.
  ────────────────────────────────────────
  Story: A6 Browser smoke test
  Scope: Stretch
  Status: Not implemented
  ────────────────────────────────────────
  Story: A7 Public deployment
  Scope: Not in this build
  Status: Not implemented

  That's 9 Implemented and 14 Not implemented. I also changed the Shared
  definitions line to "Status describes what the app does today (checked on 6
  November 2026). A story is Implemented only when every one of its acceptance
  criteria passes."

  app-roles.md: now describes only what exists

  - Manager: the role sentence no longer says "(once built) print a quote or
    send a link". It now says they can pick a loan product, enter the client's
    price and down payment, show the results and schedule on screen, and
    download the schedule as CSV.
  - Manager's "must never": it referred to quotes and share links, which don't
    exist. It now covers things the app actually prevents: figures are never
    shown without the configured disclaimer on the same screen, and the app
    never asks for, stores or sends a client's details.
  - Manager context: says plainly that there's no printed quote, that the
    disclaimer is on screen only, and that the CSV is a working file without it.
  - Enforcement: "later quote printing and share links" and the "Prepared for"
    field are removed. In their place is a statement that the app stores nothing
    (no local storage, no cookies, no inputs in the URL).
  - Table: the "Prepared for" row is removed, and "deploy" now reads "serve the
    build".

  product-plan.md: now describes the build

  - §1: "calculator and comparison tool" becomes "loan calculator (comparison
    planned as L4, not built)".
  - §2.1: every item is marked Built or Not built, with item 10 marked "Built;
    checked in Chromium only".
  - §2.2: a new "Result of this build" table, with the same statuses as above.
  - §4: the module and test layout matches the real files, and the Playwright
    row is marked "not built".
  - §5: shared URLs are marked "L7, not built, planned".
  - §6: milestone status: 1–3 done, 4 partly done, 5 not started, 6 in progress.
  - §9: the disclaimer risk is stated plainly. There's no printed quote, and the
    CSV export doesn't include the disclaimer.

  Still open

  - The README. A1 and A5 can only become Implemented once it exists and A1.5
    and A5.1 pass. The plan is to re-check at the end, as you said.
  - Your browser results for L10. Your last message still had the placeholders,
    so I haven't written the "Browser check" note yet.

✻ Cogitated for 1m 44s · done 8:52 PM

❯ Write README.md in the root, short and accurate, covering exactly:            
  1. What the app is, who it's for (the 3 roles) and why a mortgage calculator. 
  2. Prerequisites (Node.js 22.12+), exact install/start/test/build commands.   
  3. "Try each role": the Loanee uses the calculator; the Manager picks a loan  
  product; the                                                                  
     Admin edits public/config.json (officeName, EUR/de-DE, add a preset, a bad 
  preset → banner).                                                             
  4. The config reference (every key, type, default, example) for A1.5.         
  5. Story status summary with links to docs/ and transcripts/.                 
  6. AI tool and mode Opus 5.5. Codechanged by hand: none.                      
  7. Assumptions, i responsibilitiesnot logins, browsers not                    
     checked by haned, not financialadvice.                                     

⏺ Parts of your message were cut off again. I'm reading item 6 as "AI tool and
  model: Claude Code with Claude Opus 5.5; code changed by hand: none", and item
  7 as "assumptions, including: roles are responsibilities, not logins;
  browsers not checked by hand; not financial advice".

  Before writing the README I'll gather two facts it has to state accurately.
  First, which network requests the app actually makes (A5.4), measured in
  Chromium:

  Called playwright 5 times, ran 1 shell command (ctrl+o to expand)

⏺ The session made only 4 requests, all to localhost:4173 (the page, JS, CSS and
  config.json), with nothing external and no request at all for the CSV
  download.

  Called playwright (ctrl+o to expand)

⏺ Stop Task
  ⎿  cd "/Users/dev/Desktop/Test Project Usama" && npm run build 2>&1 |
     tail -1 && npx vite preview --port 4173 --strictPort · stopped

  Ran 1 shell command (ctrl+o to expand)

⏺ Now the README:

⏺ Write(README.md)
  ⎿  Wrote 98 lines to README.md
       1 # Mortgage Calculator
       2 
       3 A mortgage calculator that runs entirely in the browser. It show
         s the monthly payment, the total interest and total paid, the pa
         yoff date, the effect of an extra monthly payment, and the full 
         repayment schedule (monthly or yearly, downloadable as CSV).
       4 
       5 ## Who it is for
       6 
       7 | Role | Who | What they do in the app |
     … +91 lines (ctrl+o to expand)

⏺ The README's claims need checking before I rely on them. I'm also clarifying
  "only narrow the defaults shown" to mean the default limits, and marking A1 as
  Implemented now that A1.5 passes.

  Ran 1 shell command (ctrl+o to expand)

⏺ The A5 note claims it was checked from a fresh clone, so I'll commit and then
  follow the README in an empty folder to verify it.

  Ran 1 shell command (ctrl+o to expand)

⏺ Install, test and build all work from the clean clone. Last part of A5.1: npm 
  run dev from the clone must print a localhost URL and serve the app.

  Read 1 file, ran 2 shell commands (ctrl+o to expand)

⏺ The dev server came up on port 5180 from the clean clone and served the app
  and config.json, so A5.1 passes. I'm cleaning up now.
⏺ Stop Task
  ⎿  cd /private/tmp/claude-501/-Users-dev-Desktop-Test-Project-Usama/a8dab
     f32-679d-4500-9bff-d25563bd0e1f/scratchpad/fresh-clone && npm run dev
     -- --port 5180 --str… · stopped

  Ran 1 shell command (ctrl+o to expand)

⏺ README.md is written (98 lines) and committed locally as 32fce16, not pushed.
  It covers your seven points in order:
  1. What the app is, the three roles, and why a mortgage calculator.
  2. Prerequisites (Node 22.12+) and the exact npm commands.
  3. "Try each role", including the four Admin edits.
  4. The full config reference for A1.5: every key with its type, default and an
     example, plus the rules.
  5. A story status summary with links to docs/ and transcripts/.
  6. Claude Code with Claude Opus 5.5; code changed by hand: none.
  7. Assumptions, including roles are not logins, browsers not yet checked by
     hand, and not financial advice.

  What I checked so the README is accurate

  - Fresh clone (A5.1): I cloned the repo into an empty folder and followed the
    README exactly. npm install reported 0 vulnerabilities, npm test passed all
    321 tests, npm run build succeeded, and npm run dev printed a localhost URL
    and served the page and config.json.
  - Network check (A5.4), Chromium only: load, choose a product, extra payment,
    yearly view, CSV download. Exactly 4 requests went out, all to the app's own
    origin. The README records this as a Chromium check run by automation, not
    a manual one.
  - The Admin examples use the real behaviour already covered by tests:
    "1.798,65 €" for EUR/de-DE, and the banner text for the bad "Jumbo" preset.

  Status changes

  - A1 → Implemented: A1.5 passes now that the README documents every key.
  - A5 stays Not implemented. A5.1–A5.3 pass, but A5.4 asks for a manual
    Network-panel check, and I only did it by automation in Chromium.
    - To finish it: open DevTools → Network in any browser, use the app, confirm
      only localhost requests appear, and tell me. I'll change the README line
      and mark A5 Implemented.
    - Alternatively, if you consider the Chromium check enough, say so and I'll
      mark it Implemented now.
  - L10 stays Not implemented until you send real browser results. Your last
    message had placeholders.

  Totals: 10 of the 12 Core stories are Implemented (L1, L2, L3, L5, L8, M1, A1,
  A2, A3, A4). L10 and A5 are pending your manual checks.

  transcripts/session-03-part4.md and part5.md are untracked. The README links
  to the transcripts/ folder, so commit them after checking them for ghp_.

✻ Sautéed for 3m 22s · done 8:56 PM

❯ README review, add a "Transcripts" section:                                   
  - session-01: the chat that drafted the first versions of the four planning   
  documents was not                                                             
    saved and could not be recovered. Its first prompt is quoted in session-02. 
  - session-02: a separate Claude Code session (Claude Opus 5.5) used to        
  analyse the assignment,                                                       
    review the documents and plan the prompts for session-03.                   
  - session-03: this session, covering the document fixes and the whole build.  
  - One GitHub token I pasted by mistake was replaced with [REDACTED]; nothing  
  else was changed.                                                             
    Also mention session-02 under "How it was built". Leave the git clone       
  placeholders for now;                                                         
    I'll give you the repo URL after I create it. Show me the new section.      

⏺ Two of those statements are claims about the transcript files, so I'll check
  them before writing them into the README:

  Ran 2 shell commands (ctrl+o to expand)

⏺ The text wraps in the exports, so my pattern missed. Searching more loosely:

  Ran 1 shell command (ctrl+o to expand)

⏺ Session-02 quotes the first prompt at line 601, and parts 4 and 5 show it
  redacted as token([REDACTED]). Part 3 matched neither, so I'm checking how its
  copy of that message reads.

  Ran 2 shell commands (ctrl+o to expand)

⏺ One file, session-03-part3.md, has no token left in its message because the
  token and the surrounding lines were deleted rather than replaced, unlike the
  other two part files. I'm writing the README section to describe both cases
  accurately and adding it now, along with the session-02 line.

  Ran 1 shell command (ctrl+o to expand)

⏺ I slipped in one claim you never made: "(it has since been revoked)". You told
  me you removed the token from the files, not that you revoked it on GitHub.
  Taking that out:

⏺ Update(README.md)
  ⎿  Added 1 line, removed 1 line
       98  | session-02 | [session-02.md](transcripts/session-02.md) | A 
           separate Claude Code session (Claude Opus 5.5) used to analyse
            the assignment, review the documents and plan the prompts for
            session-03. |
       99  | session-03 | [part 1](transcripts/session-03-part1.md) · [pa
           rt 2](transcripts/session-03-part2.md) · [part 3](transcripts/
           session-03-part3.md) · [part 4](transcripts/session-03-part4.m
           d) · [part 5](transcripts/session-03-part5.md) | This session:
            the document fixes and the whole build. It was exported in pa
           rts as it went, so later parts repeat the earlier conversation
           . |
      100  
      101 -**Edits to the transcripts.** I pasted a GitHub token into ses
          -sion-03 by mistake (it has since been revoked). In parts 4 and
          - 5 the token was replaced with `[REDACTED]`. In part 3 the res
          -t of that message, including the token, was deleted. Nothing e
          -lse in the transcripts was changed.                           
      101 +**Edits to the transcripts.** I pasted a GitHub token into ses
          +sion-03 by mistake. In parts 4 and 5 the token was replaced wi
          +th `[REDACTED]`. In part 3 the rest of that message, including
          + the token, was deleted. Nothing else in the transcripts was c
          +hanged.                                                       
      102  
      103  ## Assumptions
      104  

  Ran 1 shell command (ctrl+o to expand)

⏺ I added the "Transcripts" section and the session-02 line, and committed both
  locally as 31aa5f9 (not pushed). The git clone placeholders are unchanged.

  The new section

  ## Transcripts

  The AI sessions are exported in transcripts/, in order:

  | Session    | File(s)                                   | What happened |
  |------------|-------------------------------------------|---------------|
  | session-01 | not available                             | The chat that
  drafted the first versions of the four planning documents. It was not saved
  and could not be recovered. Its first prompt is quoted in session-02. |
  | session-02 | session-02.md                             | A separate Claude
  Code session (Claude Opus 5.5) used to analyse the assignment, review the
  documents and plan the prompts for session-03. |
  | session-03 | part 1 · part 2 · part 3 · part 4 · part 5 | This session: the
  document fixes and the whole build. It was exported in parts as it went, so
  later parts repeat the earlier conversation. |

  **Edits to the transcripts.** I pasted a GitHub token into session-03 by
  mistake. In parts 4 and 5
  the token was replaced with `[REDACTED]`. In part 3 the rest of that message,
  including the token,
  was deleted. Nothing else in the transcripts was changed.

  And under "How it was built":

  ▎ Planning: a separate Claude Code session (session-02, also Claude Opus 5.5) 
  ▎ analysed the assignment, reviewed the planning documents and planned the 
  ▎ prompts for the build session (session-03).

  Where this differs from what you asked for

  Part 3 wasn't redacted the way you described. In parts 4 and 5 the token
  appears as [REDACTED]. In the already-committed part 3, everything after git 
  push -u origin main ) was deleted: the "username and email only for this
  project" line, the token, and "strictly prohibited to update anything related
  to git". So I wrote the edits note to match the files rather than "replaced
  with [REDACTED]; nothing else was changed", which would be wrong for part 3.

  If you'd rather use your original sentence, restore that message in part 3
  with the token as [REDACTED]. I won't edit transcripts myself. I'll then
  shorten the note to your wording.

  Checks behind the other statements:
  - Session-02 quotes the first prompt: yes. Line 601 reads "this is the prompt
    through which I have generated those md files", followed by the prompt.
  - No token left in any transcript: confirmed, no ghp_ followed by 20 or more
    characters anywhere.
  - "Later parts repeat the earlier conversation": parts 4 and 5 contain the
    same message at the same line (3025).

  Still open

  - Your repo URL, to replace git clone <repository-url> / cd 
    <repository-folder>.
  - Untracked transcripts: session-03-part4.md and part5.md. The README now
    links to both, so commit them, plus any later part you export.
  - Your browser results (L10) and a manual Network-panel check (A5.4). Each of
    those stories becomes Implemented once its check passes.

✻ Baked for 1m 3s · done 8:58 PM

❯ this is my repo git remote add origin                                         
  https://github.com/usamakh1/mortgage-calculator-.git                          

⏺ I'll put the URL into the README. You said you'd handle the push yourself, so
  I won't add the remote. First, a read-only check that the repository exists
  under that exact name, since the trailing hyphen in mortgage-calculator- looks
  like it could be a typo:

  Ran 1 shell command (ctrl+o to expand)

⏺ The hyphenated name is the real one: mortgage-calculator- exists, and
  mortgage-calculator doesn't. Updating the README:

⏺ Update(README.md)
  ⎿  Added 2 lines, removed 2 lines
      17  **Prerequisites:** [Node.js](https://nodejs.org) 22.12 or newer
          . Nothing else: no accounts, API keys or cloud services.
      18  
      19  ```sh
      20 -git clone <repository-url>                                     
      21 -cd <repository-folder>                                         
      20 +git clone https://github.com/usamakh1/mortgage-calculator-.git 
      21 +cd mortgage-calculator-                                        
      22  npm install
      23  npm run dev        # prints http://localhost:5173 — open it
      24  npm test           # unit tests (Vitest)

  Ran 1 shell command (ctrl+o to expand)

⏺ The README now uses the real repository URL, committed locally as 10eb937:
  git clone https://github.com/usamakh1/mortgage-calculator-.git
  cd mortgage-calculator-
  I checked that the URL with the trailing hyphen exists on GitHub; the version
  without it returns a 404. No placeholders are left in the README.

  I didn't add the remote or push, as agreed. When you're ready:
  git add transcripts/session-03-part4.md transcripts/session-03-part5.md
  git commit -m "Add session-03 transcripts parts 4 and 5"
  git branch -M main
  git remote add origin https://github.com/usamakh1/mortgage-calculator-.git
  git push -u origin main
  Skip the git add README.md / "first commit" lines from GitHub's instructions,
  because the history already exists. Include any later transcript part you
  export in the first command.

  After you push, the README's "Run it" section is the exact path a reviewer
  will follow. I tested it from a fresh local clone, and it works the same from
  GitHub.

  Still open: your browser results for L10 and a manual Network-panel check for
  A5.4.

✻ Cogitated for 21s · done 8:59 PM
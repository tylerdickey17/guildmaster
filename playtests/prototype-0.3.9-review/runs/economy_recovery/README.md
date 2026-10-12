# Guildmaster 0.3.9 economic recovery audit

Frozen source commit: `7c1b338b9b9b46f75b0296a660bd5aa08b857a0b`. No live site or repository changes were made.

## Method

`node runs/economy_recovery/sim.cjs` runs predetermined seeds 1–64 for 60 completed Guild Turns in each of six cohorts (384 attempted campaigns, 23,040 monthly intervals). Every campaign starts from the actual Staffed Level 1 preset: 2,000 credits, four initial Free Agents, four PCs. Legal campaigns call only the exported engine API; they do not inspect future dice, edit state, use midcampaign fixtures, or fish for seeds.

Three deterministic policies are compared: four-worker Free Agent maintenance; expansion to eight Free Agents with one owned Mobile Field HQ; and the same expansion policy using retained employment for new hires once Reputation permits. Policies reserve current bills and hiring cash, make at most two contract searches per turn, choose a publicly quoted squad/mission using an analytical expectation of profit and complication costs, hire replacements, train spare personnel when funded, and use partial arrears repayments. They do not spam promotions, farm property milestones, purchase multiple headquarters, or maximize guild advancement.

Mission expectation enumerates possible future *degrees* analytically from published modifiers and DCs. It never calls the seeded die function or peeks at a campaign's future faces. It values expected Missing personnel at two ordinary wages and Insertion downtime at 60 credits, which are policy heuristics rather than game rules. The primary policy searches at current mean operative level +1, within the actual guild cap. A separate capped-search sensitivity stops searches at Level5; this is a deliberate weaker bot assumption, not a rule. Officers remain a fixed +10 in this prototype. This bot is a reproducible reserve policy, not evidence of optimal human play.

Primary cohorts use the four initial PC Hero Points only, with no awards or resets for all 60 months. Separate sensitivities call the actual New Table Session operation once each Guild Turn. That is an assumption of one play session per fictional month, not an automatic game rule.

Every interval asserts cash equals starting cash plus the ledger and that spent plus unused actions equal the pool granted at the start of Activity. The results retain every monthly trace and count zero-job intervals, arrears incidence, ending debt/cash/roster and first Level 10 attainment. Level 10 runs continue through Month 60.

## Interpretation

The 900-credit Normal payout and 110-credit Level 1 wages do not need immediate reversal. Sustainable reserve policies can recover from arrears and grow. The meaningful progression concern is that even a reserve policy with one owned headquarters and at most two working squads reaches top guild level well before five years. Progression XP and throughput deserve changes before destabilizing an economy the human playtest found satisfying.

Moving to the Mobile Field HQ is a large economic improvement: its property upkeep is 75/month versus the starting leased HQ's 300/month. The landlord-owned training suite stays behind; its instructor can be paused, and the expired lease stops future maintenance once the last occupied interval is billed. Relocation therefore frees a substantial recurring margin. This is an authored incentive rather than an accounting bug, but it contributes to late cash accumulation.

The tail risks are workforce loss, reserve choices and retained payroll. Missing personnel currently have no playable rescue or dismissal operation; their replacement is a new hire. Missing retained personnel continue accruing retainers indefinitely. This may be an intentional rescue obligation, but it needs an eventual decision or recovery route before the subsystem is complete. A successful replacement hire does not remove that absent worker's overhead.

Loan underwriting counts 30% of gross client receipts rather than income after crew wages and property expenses. It can admit a loan payment that consumes a guild's narrow operating surplus. Current code behaves consistently with that rule; show a post-wage/overhead cash-flow preview or retain reserve warnings rather than describing it as an accounting error.

## Focused debt fixtures

`node runs/economy_recovery/debt-cases.cjs` exercises ten explicitly synthetic fixtures, separate from the legal campaign evidence. They confirm:

- Loan principal and interest remain distinct; partial payments pay accrued interest first.
- Missed principal is reserved from later invoice calculations rather than billed twice.
- A missed installment becomes Delinquent, then Default at the next boundary, and returns to Current after its arrears are cured.
- Fully paid 1,200-credit unsecured borrowing amortizes exactly 1,200 principal and 156 interest over twelve installments.
- Financing receipts do not inflate the revenue used for underwriting.
- Secured collateral must be operational owned property and cannot be pledged twice.
- Automatic Upkeep pays current bills before old arrears; a routine partial debt payment preserves unallocated treasury cash.
- An unpaid retained operative cannot work; fully paying current retainer arrears restores work readiness.
- Missing retained personnel are still billed, demonstrating the currently incomplete workforce recovery/release loop.

A concrete non-accounting bug was reproduced: relocating headquarters changes Missing, Captured and Dead operatives into In Transit and returns them Available next Upkeep. This follows the relocation loop changing every status except Candidate, Expired and Inactive. Baseline property-growth cohorts therefore include unintended personnel restoration; their economic outcomes must be treated as affected by this defect. Lean cohorts never relocate and are unaffected.

The isolated relocation-fixed sensitivity uses a copied engine under this run folder, changing only the relocation exclusion to preserve Missing, Captured and Dead statuses. It never modifies frozen or live source.

No cash/principal/interest accounting defect was reproduced in these focused cases. They do not cover every possible nested migration, collection remedy, or property configuration.

## Primary adaptive search results (unmodified 0.3.9)

All rows attempt 64 campaigns and continue for all 60 months. Cash is the median at Month60; conditional median completion time excludes campaigns that have not reached Level10. The two property-growth policies include the confirmed relocation defect.

| Policy | Hero session reset | Level10 by Month60 | Conditional median Level10 month | Found first Level10 range | Ever arrears | Ending arrears | Median Month60 cash |
|---|---|---:|---:|---|---:|---:|---:|
| lean | Initial only | 55/64 | 50 | 38–60 | 6/64 | 1/64 | 64948 |
| lean | Monthly sensitivity | 63/64 | 43 | 35–55 | 3/64 | 0/64 | 141005 |
| growth | Initial only | 64/64 | 26 | 19–40 | 4/64 | 0/64 | 175350 |
| growth | Monthly sensitivity | 64/64 | 22 | 18–29 | 3/64 | 0/64 | 294948 |
| retained | Initial only | 64/64 | 25 | 20–40 | 6/64 | 2/64 | 134202 |
| retained | Monthly sensitivity | 64/64 | 22 | 18–29 | 3/64 | 0/64 | 275168 |

The initial-only growth policy is Guild Level6 at Month16 at the median, closely matching the human playtest, but reaches Guild Level10 at the median in26 months in the unmodified engine. The lean four-worker policy is slower: median Guild Level4 at Month16 and7 at Month36. This makes staffing throughput a meaningful progression accelerator.

One of64 lean initial-only campaigns (seed35) ends in a workforce/cash softlock: only two remaining employable workers, three Missing, zero credits, 15,498 arrears, Guild Level2. It cannot deploy the minimum three-person squad, fund a new hire, or qualify for a loan while in arrears. This is a real reachable prototype state under this policy, not a general claimed failure rate for human play. Narrative rescues or player adventures could resolve it outside this browser implementation.

Two retained initial-only campaigns end with arrears despite attaining Level10, while all retained monthly-session campaigns end debt-free. Missing retained payroll, who is prioritized on automatic Upkeep, and the available higher-level offers matter in this tail. It is evidence to add recovery/release decisions, not proof that the basic900/110 economy is broken.

## Isolated relocation-fixed sensitivity

A further four cohorts (256 campaigns,15,360 monthly intervals) use the same adaptive policies and predetermined seeds with only the copied relocation-status exclusion changed. This is a hypothetical repair comparison, separate from the frozen baseline.

| Policy | Hero reset | Level10 by Month60 | Conditional median Level10 month | Found first Level10 range | Ending arrears | Median Month60 cash |
|---|---|---:|---:|---|---:|---:|
| growth | Initial only | 64/64 | 27 | 21–45 | 0/64 | 148244 |
| growth | Monthly | 64/64 | 22 | 19–27 | 0/64 | 295125 |
| retained | Initial only | 64/64 | 27 | 21–45 | 2/64 | 113836 |
| retained | Monthly | 64/64 | 22 | 19–27 | 0/64 | 264477 |

Removing unintended rescue slows first Level10 attainment slightly but preserves the primary result: a sensible two-squad guild still reaches top level substantially before five years. The retained payroll tail also persists (two ending arrears cases), so that concern is independent of the relocation defect.

## Artifacts

- `sim.cjs`, `results.json` / `results.json.gz`, `summary.json`: adaptive search baseline; full monthly traces for all384 campaigns.
- `capped-search-sim.cjs`, `capped-search-results.json` / `.gz`, `capped-search-summary.json`: the weaker Level5-search sensitivity, same384 campaigns.
- `relocation-fixed-engine.cjs`, `relocation-fixed-sim.cjs`, `relocation-fixed-results.json` / `.gz`, `relocation-fixed-summary.json`: copied-engine repair sensitivity,256 campaigns.
- `debt-cases.cjs`, `debt-cases.json`: ten synthetic fixtures, including the confirmed revival defect.
- `summarize.cjs`: recomputes concise tables and fastest-run traces from all three evidence files.

The cohorts reuse matched seeds across policies and sensitivities; the1024 total campaigns are not1024 independent random samples.

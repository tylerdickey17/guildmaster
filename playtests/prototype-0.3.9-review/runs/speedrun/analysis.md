# Guildmaster 0.3.9 adversarial speedrun

Fastest found legal run reached Guild Level 10 at the end of Turn 10, from the Staffed Level 1 / four-PC / 2,000-credit start. This is a found result, not a proven global minimum. Seed 30, policy mission-first-low: 31 completed jobs, 2 failures, 23 hires; ending cash 14159, arrears 0, Reputation 61, 3 Missing operatives. The fastest run used 0 loans.

## Cohort and legality

384 policy-seed attempts across the same fixed seeds 1–64 (6 declared policies), with a 90-turn horizon. These are overlapping policy trials, not 384 independent seeds. 378/384 reached Level 10, with 0 exceptions. No future dice were inspected: squads and contracts were chosen from public cards/stats and enumerated outcome probabilities. No game state or dice were edited; mutations use the public engine API. The chosen fastest seed is retrospective cohort selection, not a fair-cohort guarantee. Cash ledger, shared action spending, total Guild XP, unique crew and three unique phase leads were checked. Frozen source SHA256 matches protocol.json.

The instructor was legally paused before the first payment; the leased HQ and landlord-owned training asset remained, producing 300 first-turn and 315 subsequent fixed overhead. All hires are Free Agents; roster growth faces no housing/personnel cap in the engine. Default Hero Points are only the initial four, with no GM awards or automatic monthly refresh. The separate monthly-session-reset sensitivity is explicitly labeled below. Other PCs can choose to pass before the highest-stat officer executes the group's allocation; the engine has no officer action caps.

| Public-information policy | Reached / attempted | Fastest turn | Median among reaches | P90 among reaches | Censored at 90 |
|---|---:|---:|---:|---:|---:|
| low-farm | 62/64 | 11 | 13 | 15 | 2 |
| balanced-farm | 64/64 | 11 | 14 | 16 | 0 |
| big-roster-farm | 62/64 | 12 | 14 | 16 | 2 |
| cash-engine | 64/64 | 11 | 13 | 15 | 0 |
| mission-first | 63/64 | 11 | 13 | 14 | 1 |
| mission-first-low | 63/64 | 10 | 13 | 14 | 1 |

Monthly Hero reset sensitivity (low-farm policy, fixed 64 seeds): 64/64 reached; fastest 10, conditional median 13. This is a different table-session assumption, not the default rules.

## Fastest run monthly summary

| Turn | End Guild Level | Guild XP earned | Squads dispatched | Roster including Missing | Cash | Arrears |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 1 | 250 | 1 | 6 | 1590 | 0 |
| 2 | 1 | 400 | 2 | 7 | 1700 | 0 |
| 3 | 2 | 550 | 2 | 8 | 4138 | 0 |
| 4 | 3 | 900 | 2 | 10 | 6193 | 0 |
| 5 | 4 | 1250 | 3 | 12 | 10590 | 0 |
| 6 | 5 | 1250 | 3 | 15 | 12684 | 0 |
| 7 | 6 | 1050 | 4 | 18 | 13326 | 0 |
| 8 | 8 | 1400 | 5 | 20 | 15020 | 0 |
| 9 | 8 | 800 | 5 | 25 | 13775 | 0 |
| 10 | 10 | 1300 | 6 | 27 | 14159 | 0 |

Per-level timestamps: L1=T0, L2=T3, L3=T4, L4=T5, L5=T6, L6=T7, L7=T8, L8=T8, L9=T10, L10=T10. Full monthly actions, receipts, bills, mission levels and difficulty bands are in compact-trace.json; roll-by-roll evidence is in fastest-trace.json.

## What accelerates growth

1. Guild XP is a flat difficulty award, not scaled to current Guild Level or reduced when a powerful squad completes a low-level job. Expert pays 600 XP and Legendary 900 XP even at mission Level 1. The fastest trace uses low-level missions while recruiting operatives around Level 3–5.
2. Level 1 Work the Network stays DC 15 with PC Diplomacy +10, regardless of Guild Level. Repeating it can produce three leads per action and favorable Hard/Expert/Legendary cards. This is legal information use; no hidden dice are selected.
3. Hiring expands the number of parallel squads; no base roster capacity stops this. Routine deployment is free. The larger action pool supports more securing and network searches, creating growth feedback. Multiple level-ups can settle together at month's end.
4. High-tier low-level payouts fund expansion, although ordinary overleveled Normal/Easy work can become cash-negative as operative wages increase and payouts are discounted. The strategy therefore values both public expected XP and expected operating surplus. No rewards were minted from promotions; promotions give Reputation only.
5. Cheap installation development earns 200 once; unsecured loans are used in some slower cohorts. These were available tools, but they were unnecessary in the found fastest run. No property purchase, secured financing or relocation was required to produce the headline.

## Limitations and issues

Censored runs are strategy stalls, not proof the game forces bankruptcy. Low-farm failures lose operatives to the Missing status; recruitment thresholds and cash-reserve rules can then strand this particular policy. Their engine invoices continue accruing arrears through Turn 90. A human could choose cheaper hiring, different contract risk or narrative rescue. Missing recovery has no executable rescue action in this prototype. Detailed stalled seeds and loan usage are in finance-summary.json.

The search is heuristic: combinations are evaluated among the nine highest-level available crew (then other crew as they are dispatched), so the reported run is not a globally optimized squad assignment or fastest possible turn. Sampled policies were declared before each fixed cohort; the best result is selected after running them. There is no omniscient/seed-fished bound here beyond retrospective fastest reporting. No GM Priority-adventure XP, extra cash, Hero Point awards or session pacing was supplied.

## Design recommendation

Target roughly 60 turns for ordinary engaged play, with a useful acceptable band such as 48–72 months, and decide separately how fast exceptionally aggressive play is allowed to be. A five-year ordinary target should not imply that every legal strategy must take exactly five years. Raising the 1,000-XP thresholds alone does not address unlimited parallel XP farming.

Before choosing larger thresholds, address low-level farming (relative-level XP value or a limit on monthly progression credit), scale administrative competency alongside difficulty, and define what extra squads/bases contribute to guild growth. Another useful route is level-up milestones requiring stronger contracts, reputation and funded infrastructure alongside XP. Several months in the fastest trace earn more than 1,000 XP; an explicit one-level-per-turn ceiling would prevent double jumps but still allow Level 10 after nine months of sufficiently productive work. A one-level cap alone cannot create a five-year curve. Multi-action powerful actions can improve choice density, but their XP/economy must be compared against the repeatable actions they replace.

## Reproduce

Run `node runs/speedrun/speedrun.cjs 64 90`, then `node runs/speedrun/analyze.cjs` from this bundle's root. Scripts require the frozen engine with portable relative paths. No Site or GitHub files were changed.

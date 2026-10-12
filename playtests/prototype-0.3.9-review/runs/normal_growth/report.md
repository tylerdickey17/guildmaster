# Ordinary growth playtests — frozen Guildmaster 0.3.9

Source: `7c1b338b9b9b46f75b0296a660bd5aa08b857a0b`, hashes in `../../protocol.json`. No frozen or live files changed. Run `node runs/normal_growth/simulate.cjs` then `node runs/normal_growth/analyze.cjs` from the playtest snapshot root. Public-API simulation only; no future die inspection, favorable seed selection, injected cash/XP, or Expansion fixture. Initial state is Staffed Guild Level 1, four PCs, 2,000 credits; each Guild Turn is one month.

## Policies and limits

Two completed balanced cohorts each attempt all integer seeds 0–63 for 120 completed Guild Turns. The optional Entrepreneur sweeps were stopped cleanly before completing any cohort; no partial Entrepreneur result is included. Use `simulate.cjs --entrepreneur` to run those optional sweeps later. Balanced play recruits towards eight active operatives, runs Easy/Normal cards, and picks four-person squads (three only when just three ready) using public expected cash plus a small XP preference. Entrepreneur play additionally considers Hard cards with approximate success probability at least 70%, and targets 12 operatives from Guild Level 5. No Expert/Legendary/Exclusive jobs. The card-scoring approximation independently evaluates phases and ignores forward roll changes; those changes still apply in the actual engine rolls. We reject negative overall card scores. This is informed automated play, not a claim of human equivalence.

Recruitment uses a target near current operative average +1, constrained by current Guild discovery cap. Hiring leaves two months of ordinary Upkeep plus 300 credits. Spare operatives train in funded short cohorts when cash permits. Funded modest expansions and an unused second permanent HQ occur only with substantial surplus. No loans are taken by this policy; separate finance playtests are needed for debt strategies. Only one promotion is attempted per turn, and routine care is funded when possible. Half pay is chosen on failure if funded; otherwise none. We choose MVP for the least advanced eligible operative and Hardcase leader feats. Monthly events are accepted.

Primary Hero policy grants only the four initial session points, with no awards or resets. Separate sensitivity cohorts explicitly start a new table session every Guild Turn; that is not an automatic rule. Rerolls use a recorded failure when it threatens completion, or a critical failure with consequences, and retain the second result.

For reproducibility, compact evidence contains every seed, attained-level dates, complete/failed mission counts, arrears months, ending cash and debt, plus representative monthly traces. Local `.json.gz` files contain full raw histories. Arithmetic checks assert cash equals initial cash plus ledger entries and verify nonnegative cash/action conservation after each month.

## Findings

| Completed cohort | Attempts | Reached L10 by 120 months | Censored | L6 conditional median | L10 conditional median | L10 range among finishers |
|---|---:|---:|---:|---:|---:|---:|
| Initial Hero session only | 64 | 63 | 1 | 16.5 months | 26 months | 22–49 months |
| Manual monthly Hero reset sensitivity | 64 | 64 | 0 | 16 months | 25 months | 22–44 months |

No engine/policy errors occurred. All 128 runs complete all 120 monthly intervals, including the stalled run; “censored” means no Level 10 by that horizon. The Level 6 conditional medians include all 64 runs in each cohort. These timings closely resemble the user's Level 6 in 16 turns, but this is not a human-equivalence claim. The primary Level 10 timing is roughly two years, despite excluding all Hard/Expert/Legendary missions and capping promotion attempts at one per month.

At month 16 the initial-Hero cohort has median cash 3,681, with 8/64 runs currently owing arrears; by month 60 only the censored seed still owes arrears, while median cash is 77,279. Each run's debt, arrears frequency, milestone dates and end cash is in the compact evidence. There is no borrowing in these runs, so loan principal is zero throughout. At month 16 median unused actions are 5; at months 30 and 60 they are 10. Automated paid actions lead to actual spending; no artificial cash infusion occurs.

Static projection of rising requirements **1,000 / 1,250 / 1,500 / 1,750 / 2,000 / 2,500 / 3,000 / 3,500 / 4,000** (20,500 total): the primary logs cross the hypothetical Level 10 threshold at a **62-month conditional median**, 63/64 eventually by month120, and 24/64 by month60. Monthly Hero sensitivity gives **59 months**, all64 eventually, 43/64 by60. Hypothetical Level6 median becomes23 months primary/22 sensitivity. A 25,000-total heavier schedule crosses at81/78 months, so it is heavier than the five-year ordinary-play target on these logs.

This is threshold replay over unchanged actual 0.3.9 earnings, not a modified-engine test. Adding reward relevance/anti-farm restrictions on top would further reduce earnings; combining both could overslow progression and needs a fresh integrated simulation. Only achieved crossings are used for conditional medians; the unreached seed is separately reported.

## Progression recommendation

Use increasing requirements to slow later growth while preserving productive actions and earned rewards. A first candidate is 1,000 / 1,250 / 1,500 / 1,750 / 2,000 / 2,500 / 3,000 / 3,500 / 4,000 XP to reach Levels 2–10: **20,500 cumulative XP**, compared with 9,000 now. A five-year ordinary-play target is a median planning goal, not a universal minimum or an instruction to remove exciting fast paths.

Static replay locates crossings of these thresholds in actual current-engine earned XP logs. It does **not** simulate the modified progression: lower Guild Levels change actions, feat timing, search limits, project limits and some economics, and may alter later decisions. The schedules need actual counterfactual-engine and table tests before adoption. Do not report static results as proof of a changed-rules cadence.

Also check XP relevance separately. Flat Guild XP for every completion permits high-tier low-level missions to yield the same Guild growth as meaningful missions with more capable operatives. Do not equate Guild Level 1–10 with mission/operative Levels 1–20. A reward adjustment tied to the deployed squad's actual overqualification, or business tier milestones, is a safer direction to test than blindly requiring mission level equal to twice Guild level. Exact multipliers and scope remain design candidates. Additional staff should increase business throughput, so XP relevance changes should preserve some benefit from real roster investment.

The policy never relocates or transfers personnel and does not use the discovered resurrection-through-relocation bug; a surplus-funded additional HQ remains unused. No broken revival mechanics contribute to these results.

The shared action pool has substantial idle capacity under ordinary productive play. Two/three-action options should offer useful tactical or administrative value; they alone cannot repair fixed-XP speed farming if their rewards scale without limits. This policy already limits promotion to once per turn, so observed spare capacity is not an artifact of repetitive promotion.

The startup economy generally supports this policy. One initial-Hero balanced seed (55) falls into a real replacement softlock: four Missing operatives, too few ready staff to form the three-person minimum, no cash for recruiting and arrears blocking new finance. Missing has no executable rescue mechanism in this prototype. An explicit emergency replacement/rescue/restructuring route should be tested before making the early economy uniformly harsher. This result is one policy/seed, not a universal failure rate.

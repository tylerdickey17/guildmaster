# Targeted exact mission retest — adopted 0.3.1

Frozen pack SHA256: `32b207d3b379d4cc8e8b4ff818d912059866a2cdd98ab15f0a2b61c42e0dde99`. Reproduce JSON with `python mission_revision.py`. This is an independent oracle, importing neither the 0.3.0 nor the root simulator.

## Scope and method

**104 configurations: 100 eligible and four refused by visible deployment bounds.** Enumerate 8,000 equally probable mission paths per eligible configuration: **800,000 logical paths**. Memoization evaluates **52 distinct probability configurations / 416,000 paths**. Apply ±10 thresholds, natural 1/20 degree shifts, immediate-next effects and persistent critical-failure effects sequentially. No fourth mission check. No Monte Carlo estimates or confidence intervals apply.

The matrix covers all four cards at fixed levels 1/5/10/20 with high and moderate leads, 2/4/6-person Routine/Standard squads, the two specified mixed squads, passive recovery reductions and repeated active treatment after actual returns. Every non-lead has relevant ranked support; the highest-level NPC leads all three phases. This is favorable skill coverage, not every generated squad. Check probabilities are independent of payment policy. Figures are steady-state renewal expectations before rent, investments, search/acquisition costs and action scarcity, with constant roster levels and plentiful appropriate offers. They are not finite-month treasury predictions.

## Matched four-person high-skill squads

Net credits, base per-member XP, Guild XP and raw Reputation changes below are **per calendar turn**, including recovery. Reputation rates describe unsaturated changes before the track's floor/ceiling; they cannot accumulate past the cap. Full/Half/None describe funded wages on failed assignments; success wages are paid fully. NPC XP excludes leader/MVP bonuses and does not imply advancement past Level20. Loyalty effects and departures from payment policies are not valued here. Subtract ordinary 150/month lease and other actual costs from net figures when building an operating budget.

| Level | Card | Success | Full net | Half net | None net | NPC XP | Guild XP | Reputation |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | routine | 99.6125% | 217.27 | 217.61 | 217.95 | 174.70 | 130.77 | +0.8650 |
| 1 | standard | 87.8625% | 286.34 | 296.96 | 307.58 | 202.86 | 192.24 | +1.2192 |
| 1 | demanding | 53.6750% | 286.46 | 309.62 | 332.78 | 180.51 | 161.02 | +0.1102 |
| 1 | exclusive | 53.6750% | 383.07 | 406.24 | 429.40 | 193.93 | 201.28 | +0.1470 |
| 5 | routine | 99.8375% | 544.48 | 544.83 | 545.19 | 181.88 | 136.30 | +0.9057 |
| 5 | standard | 92.4125% | 744.55 | 760.49 | 776.42 | 208.83 | 202.19 | +1.4183 |
| 5 | demanding | 64.4750% | 874.13 | 916.76 | 959.39 | 196.71 | 193.43 | +0.4343 |
| 5 | exclusive | 64.4750% | 1,152.66 | 1,195.29 | 1,237.92 | 212.83 | 241.78 | +0.5790 |
| 10 | routine | 99.9875% | 1,874.58 | 1,874.67 | 1,874.77 | 199.99 | 149.98 | +0.9996 |
| 10 | standard | 98.1000% | 2,652.56 | 2,665.53 | 2,678.50 | 224.94 | 223.21 | +1.7338 |
| 10 | demanding | 85.7375% | 3,879.82 | 3,933.31 | 3,986.79 | 228.61 | 257.21 | +1.0721 |
| 10 | exclusive | 85.7375% | 5,037.28 | 5,090.77 | 5,144.25 | 250.04 | 321.52 | +1.4295 |
| 20 | routine | 99.9875% | 17,346.10 | 17,346.96 | 17,347.83 | 199.99 | 149.98 | +0.9996 |
| 20 | standard | 99.2750% | 27,458.11 | 27,508.43 | 27,558.74 | 248.91 | 248.19 | +1.9638 |
| 20 | demanding | 85.7375% | 35,901.31 | 36,396.22 | 36,891.13 | 228.61 | 257.21 | +1.0721 |
| 20 | exclusive | 85.7375% | 46,611.64 | 47,106.55 | 47,601.46 | 250.04 | 321.52 | +1.4295 |

At L1, revised Demanding and Exclusive now complete **53.675%**, compared with frozen 0.3.0's 35.75%. Their half-pay net/turn is **309.62 / 406.24**, versus Standard **296.96**, and their expected Reputation is slightly positive. They retain one full recovery turn; the stronger reward buys lower completion odds and greater single-job variance. Demanding's NPC/Guild progression remains slower than Standard at L1; Exclusive is closer, particularly for Guild XP.

This does not establish universal safety: a **moderate** L1 lead completes Demanding only **44.125%**, giving **−0.17625 Reputation/calendar turn** and half-pay net **245.64**. Moderate L5/L10 leads complete 53.675%; moderate L20 leads 76.6%. High-skill L10/L20 hard cards are financially stronger than Standard, so actual skill profiles and contract availability remain meaningful watchpoints.

## Eligibility and efficient deployment

`[20,1,1,1]` has floor-average5 and cannot deploy on generic recommended20 work whose disclosed minimum is18. The oracle refuses the assignment rather than rolling it. It refuses all four L20 card types for that roster.

`[20,20,20,12]` has floor-average18 and is permitted. On fixed L20 Standard it has the same **99.275%** success and **41,640** completion payout as four L20 members, but wages are **10,990** rather than13,880. Half-pay net/calendar is **30,387.95**, versus **27,508.43**. This is cheaper staffing within declared bounds; there is no longer a cash premium for the lower average. Single-generalist leadership efficiency remains intentionally visible for live feedback.

| Fixed level | Card | Size | Success | Half-pay net/calendar turn |
| ---: | --- | ---: | ---: | ---: |
| 1 | routine | 2 | 95.9625% | 292.18 |
| 1 | standard | 2 | 62.1750% | 255.52 |
| 1 | routine | 4 | 99.6125% | 217.61 |
| 1 | standard | 4 | 87.8625% | 296.96 |
| 20 | routine | 2 | 99.9875% | 24,286.53 |
| 20 | standard | 2 | 99.2750% | 34,256.27 |
| 20 | routine | 4 | 99.9875% | 17,346.96 |
| 20 | standard | 4 | 99.2750% | 27,508.43 |

Removing the small-squad premium reverses the L1 Standard financial preference: two-person half-pay **255.52**, versus four-person296.96, with substantially worse completion and Reputation. Two-person Routine still earns more than four-person Routine, and high-level two-person Standard still earns more than four-person Standard. Constant client budgets and support cap+3 leave genuine payroll savings. These are retained watchpoints, not evidence that bonus removal eliminated every incentive to deploy fewer staff. Card-specific headcount requirements and actual phase-skill coverage remain necessary design controls.

## Passive recovery floor

For Demanding/Exclusive, the oracle uses `max(card mandatory, phase recovery after reduction)`. In this one-turn fixture, Hardcase or an operational Infirmary leaves **one recovery turn / two-turn work cycle** for every path, unchanged from the untreated card. Assertions enforce that floor for all four levels. Hardcase needs a Level5 leader; L1 passive examples instead represent an Infirmary.

On Routine/Standard, whose mandatory minimum is0, either passive benefit can erase one-turn critical-failure recovery. That remains a real benefit, but no longer erases the hard card's intended downtime. Infirmary purchase, manager/installation and40/month upkeep are excluded from the per-job benefit comparison; acquiring it is not a free throughput increase.

## Active medical treatment is a different authorized choice

Recovery Protocol can target returned Recovering personnel during Activity and release them immediately on a successful duration reduction, including required recovery. This is the explicitly adopted active-action exception. Treatment is **never prebanked**, never used before actual return, and is attempted **once per eligible return** in this sensitivity. Repetition means treating subsequent jobs' returnees, not retrying the same treatment until successful.

An explicitly qualified officer with **Medicine+10 at Guild1** checks organizational DC15: **80%** of 20 faces reduce the one-turn timer to0. Treating four costs **100 credits and one shared action**, including failed treatment. Medicine is separate from the three completed mission checks. If successfully treated, the freed squad may acquire/deploy in the same Activity only if the remaining pool/officer capacity and contract access permit it.

For hard cards, the cycle becomes `1+(1−0.80)=1.2 turns`, and net becomes `(expected client cash−expected actual wages−100)/1.2`. For Standard, treatment is paid only on the fraction of paths that produce recovery; cost per assignment is `100×P(recovery)` and cycle is `1+P(recovery)×(1−P(treatment success))`.

| Mission level | Card | Untreated half-pay net/turn | Medicine+10/Guild1 half-pay net/turn | Treatment-adjusted cycle |
| ---: | --- | ---: | ---: | ---: |
| 1 | standard | 296.96 | 316.04 | 1.028525 |
| 1 | demanding | 309.62 | 432.70 | 1.200000 |
| 1 | exclusive | 406.24 | 593.73 | 1.200000 |
| 5 | standard | 760.49 | 830.98 | 1.028525 |
| 5 | demanding | 916.76 | 1,444.60 | 1.200000 |
| 5 | exclusive | 1,195.29 | 1,908.82 | 1.200000 |

Medical treatment therefore creates a real funded choice, especially as wages/rewards grow. It can restore much of the throughput removed by mandatory recovery, consuming scarce trained-officer capacity and money. It is not free passive treatment. The table assumes suitable offers and sufficient actions; existing training/recruitment/projects may make it infeasible or undesirable. A medic still at+10 against Guild5 organizational DC26 succeeds only25%; L1 Demanding's half-pay treatment margin then becomes **296.71**, below untreated309.62. Better medic skill and which Guild level sets the DC matter.

## Assessment

The patch removes positive cash premiums and the extreme low-average L20 deployment while preserving mixed squads, floor averages and three mission checks. It substantially improves low-level hard-card completion, funded profits and favorable-fixture Reputation. Passive feats/facilities preserve mandatory downtime; an active medical action can intentionally spend resources to reduce it after return.

Remaining numerical watchpoints are ordinary/sparse skill coverage, high-level near-certain Routine/Standard checks, efficient small squads, permitted mixed specialization and repeated paid treatment. This targeted exact/arithmetic check does not rerun campaign recruiting, loans, projects, officer budgets, Guild feat progression, events or acquisition A/B under0.3.1, and does not measure live-table enjoyment. No frozen file was changed.

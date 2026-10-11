# Established and large-guild numerical experiment

Frozen **0.3.0**, pack SHA256 `5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d`. Independent capacity/economy agent. Reproduce with `python large_guild.py`; results and all monthly seed7 traces are in [large_guild.json](large_guild.json).

## Method and coverage

Thirty scenarios × **2,000 seeds (0–1999) = 60,000 campaigns**, each with 12 management turns and the final T13 receipt/bill settlement. SHA256 keyed mission draws pair acquisition/capacity variants when the same squad departs in the same turn. Identical policies can still select different later squads when their capacities differ; this is a policy comparison, not forced identical mission outcomes after divergence. Quantiles are empirical nearest-rank 10th/50th/90th percentiles. Arrear confidence bounds are Wilson 95% per scenario, not a simultaneous family interval.

Established fixture: Guild4, eight L5 mercenaries, 10,000 starting credits, 350 monthly base overhead. Large fixture: Guild8, sixteen L10 mercenaries, 50,000 starting credits, 800 base overhead. The first two officers are unpaid PCs. Additional officers are paid NPCs at L5/L10, respectively **225/350 per month** each; their salary is included in overhead. Officers are already appointed before T1, so no new appointment fee or onboarding is simulated. NPC salaries do not increase during this experiment because those distinct officers do not earn mercenary mission XP.

The default large case has three officers: total overhead **1,150**, including one NPC salary. Established default uses two PCs: overhead350. Full four-person squads, high-stat phase leads, all relevant supporters, matched-level replenishing contract board, half pay on failure, rotated MVP, no hires, no training, no promotion. This saturated board and comprehensive skill coverage are favorable testing overrides. Actual starting board/search scarcity, random events, collateral, projects, damage, officer appointment, Guild feats, Leader feats, rival jobs and Priority adventures are absent. NPC levels and wages advance; departure wage quotes, recovery, receipts before bills and next-turn Guild capacity are enforced by the shared engine.

Guild feats that waive acquisition, Leader Feat effects, the extra50 Leader XP on successful contracts and Hardcase/Infirmary recovery benefits are absent. Consequently the paid-acquisition baseline measures unwaived capacity, not a fully configured L4/L8 guild; individual appointed leaders can progress faster than this engine shows. The experiment measures credits, progression and action opportunity cost. It does not measure live-table workload or enjoyment.

## Capacity requirement

| Guild Level | Shared pool | Officers to spend all actions, cap2 | Officers if cap1 |
| --- | ---: | ---: | ---: |
| 1–2 | 3 | 2 | 3 |
| 3–4 | 4 | 2 | 4 |
| 5–6 | 5 | 3 | 5 |
| 7–8 | 6 | 3 | 6 |
| 9–10 | 7 | 4 | 7 |

This is the requirement to use the *entire pool*, not the number needed to run existing squads. A four-person squad needs one paid acquisition action and no deployment action. Eight mercenaries can run at most two such jobs per turn and sixteen at most four, before recovery. Two officers with capacity2 can acquire all four available large-guild jobs. Additional officers therefore add no clean-contract throughput until other actions compete.

## Main observations

Means below use Standard cards, high leads, half failed pay and no surplus spending. Every scenario had **zero observed arrears**; the Wilson interval is **0–0.192%** per 2,000-trial scenario. This does not imply insolvency is impossible under the full rules.

| Fixture / officers × capacity / acquisition | Mean jobs | Mean final credits | Credits p10 / p50 / p90 | Mean unused executable actions |
| --- | ---: | ---: | --- | ---: |
| Established / 2×2 / paid | 21.23 | 28,832 | 24,310 / 29,170 / 32,520 | 26.77 |
| Established / 2×2 / free | 21.23 | 28,832 | 24,310 / 29,170 / 32,520 | 48.00 |
| Large / 3×2 / paid | 44.04 | 194,984 | 179,910 / 194,760 / 208,680 | 27.96 |
| Large / 3×2 / free | 44.04 | 194,984 | 179,910 / 194,760 / 208,680 | 72.00 |
| Large / 2×1 / paid | 24.00 | 125,633 | 119,215 / 126,360 / 129,640 | 0.00 |
| Large / 2×1 / free | 44.04 | 199,184 | 184,110 / 198,960 / 212,880 | 24.00 |
| Large / 3×1 / paid | 35.72 | 163,146 | 154,600 / 163,850 / 170,880 | 0.28 |
| Large / 4×2 / paid | 44.04 | 190,784 | 175,710 / 190,560 / 204,480 | 37.89 |

Under the selected cap2, free acquisition produces **identical mission and cash outcomes** in these clean fixtures, while releasing 21.23/44.04 actions over 12 turns. Those actions have value for searches, recruitment, preparations, projects and event responses; they have no value if intentionally left unused. At capacity1 with two large-guild officers, paid acquisition loses about20 deployments. Retain the user-selected **two-action officer baseline** for the next live test.

Extra paid officers beyond the clean workload cost money without adding missions. Established three/four officers reduce final cash by exactly2,700/5,400 compared with two. Large three/four officers reduce it by4,200/8,400 compared with two. Those salaries buy room for other administration, which this clean baseline intentionally leaves idle.

Guild advancement is rapid in a saturated multi-squad economy: established Guild4 ends at mean **8.583**, and every large Guild8 trial reaches10. Seed7 large reaches10 at the T3 settlement. Earned Guild feats are omitted, so these are progression observations rather than final feat-powered performance.

## Recovery and difficulty sensitivity

| Scenario at default officers | Mean jobs | Mean final credits | Mean terminal Guild Level |
| --- | ---: | ---: | ---: |
| Established Standard, high | 21.23 | 28,832 | 8.58 |
| Established Standard, moderate | 21.21 | 26,145 | 8.18 |
| Established Demanding, high | 12.00 | 16,543 | 5.81 |
| Large Standard, high | 44.04 | 194,984 | 10.00 |
| Large Standard, moderate | 42.43 | 168,882 | 10.00 |
| Large Demanding, high | 24.00 | 142,474 | 10.00 |

Demanding's required recovery halves deployments with no recovery mitigation. The Standard exact oracle gives recovery probabilities **14.2625% at L5** and **9.875% at L10**, versus100% for Demanding. Some successful Standard outcomes therefore need recovery, preserving the agreed failure-consequence rule.

A fixed-level renewal calculation isolates calendar opportunity cost: expected funded wages are `quoted wages × (0.5 + 0.5 × success probability)`, and expected operation cycle length is `1 + probability of one-turn recovery`. Before property overhead, a L5 four-person Standard squad earns about **760.49 expected net credits per calendar turn**, versus **398.91** Demanding; L10 values are **2,665.53 /1,994.46**. These are analytic long-run values, not the 12-turn evolving-level campaign means.

Holding every other number fixed, Demanding cash factors for equal fixed-level calendar net income would be approximately **2.94 at L5 /2.26 at L10**, compared with the current1.8. This calculation applies *only without recovery mitigation*. Hardcase or an operational Infirmary reducing recovery to0 changes the comparison substantially. Do not globally raise Demanding payouts from these two levels alone; test the full1–20 spectrum and the intended recovery-investment build first.

Deadlines are not broadly tested by this engine. Its policy always accepts and deploys immediately, so the Exclusive one-turn deadline is met by construction. An authored operational probe illustrates the bottleneck: all four L10 squads with a recovery-triggering Critical Failure settle at T+1 but return Available at T+2. Officers and unused actions cannot put that unavailable personnel onto a deadline mission at T+1. Accepting an immediate-deployment Exclusive then would be a preventable contract breach; waiting to accept or using reserves is the legal response. Recovery after an already completed mission does not retroactively miss that mission's deadline.

## Surplus-action policy sensitivity

One additional policy per default fixture spends spare actions on training when possible, then promotion. The default policy already deploys every full available squad, leaving no available trainees in these homogeneous fixtures; **zero training blocks** occur. All surplus actions become promotion attempts instead.

Established mean final cash falls from28,832 to **27,494**, spending1,338.63 on promotion, while mean Reputation rises35.31→38.75. Large final cash falls194,984→**193,586**, spending1,398.08, while Reputation **falls83.93→61.85**. This is not evidence that promotion is universally bad: the fixture deliberately freezes administrative skill at+10 while Guild growth raises organizational DC up to39. High-level checks with a low-level officer are often critical failures. A rational player would stop attempting them or use a qualified officer. Match intended administrative DC targets to actual live officer progression before accepting this policy as representative.

## Seed7 monthly audit

Full raw traces are in JSON. T1 has no prior-interval bills; T13 settles the last interval and starts no new work. Final Guild advancement occurs after each turn's current pool has already been determined.

| Boundary | Established credits | Jobs newly deployed | Guild Level after settlement | Large credits | Jobs newly deployed | Guild Level after settlement |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 10,000 | 2 | 4 | 50,000 | 4 | 8 |
| 2 | 11,570 | 1 | 4 | 60,850 | 4 | 9 |
| 3 | 12,180 | 2 | 4 | 71,700 | 4 | 10 |
| 4 | 13,750 | 2 | 5 | 82,550 | 4 | 10 |
| 5 | 15,320 | 1 | 5 | 93,400 | 3 | 10 |
| 6 | 15,930 | 2 | 6 | 103,410 | 4 | 10 |
| 7 | 18,060 | 2 | 6 | 117,140 | 4 | 10 |
| 8 | 20,190 | 2 | 7 | 130,870 | 3 | 10 |
| 9 | 22,320 | 1 | 7 | 140,880 | 4 | 10 |
| 10 | 23,210 | 2 | 7 | 156,450 | 4 | 10 |
| 11 | 25,620 | 2 | 8 | 173,860 | 3 | 10 |
| 12 | 28,310 | 2 | 8 | 186,630 | 3 | 10 |
| 13 | 31,000 | 0 | 9 | 199,400 | 0 | 10 |

## Recommendations and limits

1. **Keep two officer actions** and acquisition paid for the next controlled live session. Test Trusted Client separately. These fixtures show spare action opportunity cost without a throughput slog at cap2; only live players can assess that experience.
2. **Prioritize difficult-mission recovery builds in the next simulation.** Compare Demanding factor1.8/2.2/2.6/3.0 across actual fixed card levels with no mitigation, Hardcase, and Infirmary before changing the procedural recovery rule.
3. **Treat rapid multi-squad Guild advancement as a tuning candidate.** Compare Standard Guild XP250 versus125, or a rising Guild XP threshold, before changing the accepted independent Guild/mercenary level structure. These alternatives were not run here.
4. **Test a scarce playable board and ordinary generated skills.** The replenished matched deck gives this experiment exceptionally favorable profits. Fixed project costs become small relative to high-level recurring payouts: a 6,000-credit HQ costs two perfect L10 Standard squad net receipts of3,000 each, before overhead. This arithmetic flags an economic scaling question, not proof that property prices must rise.
5. **Use qualified administrators or rational stop rules.** The observed surplus promotion harm is caused by fixed+10 officers versus rising organizational DC, rather than by the two-action capacity.

No frozen numbers or rules were changed. These are bounded stochastic fixture results, not a complete game simulation or a live-table balance verdict.

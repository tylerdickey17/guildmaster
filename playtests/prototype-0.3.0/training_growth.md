# Training and progression: independent prototype experiment

Frozen pack **0.3.0**, SHA256 `5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d`. This is arithmetic and simulated campaign evidence, not a live playtest or a claim that the overall game is balanced. Reproduce with `python training_growth.py`; raw evidence is in `training_growth.json`.

## Method and limits

An independent three-phase oracle exhaustively enumerates all **8,000** d20 paths, applying ±10, natural 1/20 degree shifts, and the forward consequences. Its Standard success and recovery probabilities agree exactly with the root simulator at mercenary levels 1, 5, 10, 15 and 20. At level 1, the favorable four-person/high-skill/relevant-support fixture completes **87.8625%** of jobs and needs recovery on **14.2625%**, including some successful jobs.

The progression experiment runs **10,000 seeds, 0–9,999**, for each of 18 combinations: 12/24 operating intervals, Standard Guild XP 200/250/300, and concentrated/rotating MVP. SHA256 of scenario seed and interval initializes a Python Random stream for the three d20 faces, preserving the faces for the same interval across comparisons. Binary outcomes use Wilson 95% intervals; quantiles are empirical inverse-CDF order statistics. Seed 7's complete 24-interval trace is in the JSON. An interval starts with deployment and ends with the next monthly settlement; 12 intervals therefore span 13 management boundaries, matching the root engine's terminal settlement convention.

This is a **single four-person squad throughput experiment**. All four have relevant high skills and relevant support; the highest-level mercenary leads all three phases. Before rolling, a replenishing offer deck supplies a job at the squad's floor-average level. A Critical Failure makes the following interval unavailable for recovery. XP and rank changes occur at settlement and affect only subsequent departures. There is at most one new job per member per interval. The fixture chooses Crew Advocate when its first Level 5 leader appears, avoiding a combat-stat feat bonus while preserving the successful-job Leader XP. Concentrated MVP always goes to member 0; rotating MVP cycles through successful jobs. Both assume the selected member materially contributed; this does not authorize arbitrary awards in live play.

Finances, recruitment, rival events, scarce offers, officer reassignment, extra squads, projects and economic Guild Feats are omitted. Guild feat eligibility is measured, but choices are saved. Growth here is a favorable throughput bound, not a prediction of an actual player policy. The basic action/officer pool can accommodate this one-job policy at all measured levels; new larger pools do not create extra NPC availability. Continuous training has no Guild XP, leader or MVP awards. Its arithmetic assumes every monthly bill remains funded, separately from the mission campaign.

## Continuous training

The frozen baseline grants **150,165,180,195,210,225,225…** XP per completed interval. Its 10% bonus is additive, caps at 50%, and never changes earlier awards. Four trainees cost 150/month plus the starting HQ's 150/month. A Level 1 trainee reaches Level 5 at **interval 19** (4,050 total XP), costing the cohort **2,850** in training, or **5,700** including HQ rent over those 19 intervals. Starting treasury 2,000 cannot fund that in isolation; this is a supported-training path, not a free bootstrap.

| Base XP | Subsequent-block increase | XP after 12 / 24 intervals | Level after 12 / 24 | First Level 5 interval |
| ---: | ---: | --- | --- | ---: |
| 100 | 0% | 1,200 / 2,400 | 2 / 3 | 40 |
| 100 | 10% | 1,650 / 3,450 | 2 / 4 | 28 |
| 100 | 20% | 1,710 / 3,510 | 2 / 4 | 28 |
| 150 | 0% | 1,800 / 3,600 | 2 / 4 | 27 |
| **150** | **10%** | **2,475 / 5,175** | **3 / 6** | **19** |
| 150 | 20% | 2,565 / 5,265 | 3 / 6 | 19 |
| 200 | 0% | 2,400 / 4,800 | 3 / 5 | 20 |
| 200 | 10% | 3,300 / 6,900 | 4 / 7 | 15 |
| 200 | 20% | 3,420 / 7,020 | 4 / 8 | 14 |

The 20% alternative gives only 90 more XP than the baseline after either 12 or 24 intervals because it reaches the same cap sooner. Base XP has much more influence on long-term timing than increasing the streak increment. Removing the bonus delays Level 5 from interval 19 to 27.

**Recommendation:** retain **150 base, +10% subsequent, cap50%** for the first live prototype. This makes uninterrupted training a useful stable route while a favorable successful mission policy reaches its first leader earlier. Raising base to 200 would make a risk-free XP program produce Level 5 around interval15; test that only if the intended campaign pace is faster and funding/foregone-contract choices remain meaningful.

## Mission progression and bonus concentration

Results at the frozen 250 Standard Guild XP value:

| Policy / horizon | Median Guild Level | Median highest / lowest NPC Level | Mean attempted / completed jobs | Chance at least one Level 5 leader |
| --- | ---: | --- | --- | --- |
| Concentrated MVP, 12 intervals | 3 | 4 / 3 | 10.63 / 9.49 | 0% |
| Rotating MVP, 12 intervals | 3 | 3 / 3 | 10.63 / 9.35 | 0% |
| Concentrated MVP, 24 intervals | 6 | 7 / 6 | 21.28 / 19.67 | 99.98% |
| Rotating MVP, 24 intervals | 5 | 6 / 6 | 21.16 / 19.07 | 99.17% |

The 95% Wilson interval for a leader by interval24 is **99.927–99.995%** for concentrated MVP and **98.972–99.330%** for rotating MVP. The zero observed leaders at interval12 has an upper Wilson bound **0.0384%**; within this specific Standard-only model, the stronger arithmetic bound is zero because 12 successful 300-XP awards total only3,600 XP, below the4,000 required for Level5.

Conditional on reaching Level5 within24 intervals, median first-leader timing is **16** concentrated versus **19** rotating. The concentrating policy advances its best lead sooner, increasing later completion odds; once appointed at Level5, that same mercenary can legitimately receive **350 XP** per completed Standard job while others receive250. Equal participation and completion XP remain intact. The extra progress is the approved bonus rule's visible effect, rather than a violation of equal base awards.

For seed7, all first12 jobs complete, one needs recovery; the concentrated MVP reaches Level5 at settlement15 and first earns Leader XP on job16. By settlement24 that mercenary isLevel7 and the other three areLevel6, with the Guild atLevel6. This fortunate single trace is not substituted for the full sample.

**Recommendation:** retain the50/50 bonus values initially, enforce the material-contribution requirement, and record each recipient. The observed effect is about a three-interval earlier first leader and a one-level late-game gap in this two-year fixture. This is a sensible live-test watch item. Do not impose a new rotation requirement merely because the simulated concentrating policy performs better; earned concentrated awards are permitted by the agreed rules.

## Guild XP pace and feats

| Standard Guild XP sensitivity | Median Guild Level at12 | Median Guild Level at24 | Probability Guild Level5 by24, concentrated policy |
| ---: | ---: | ---: | ---: |
| 200 | 3 | 5 | 56.01% |
| **250** | **3** | **6** | **96.57%** |
| 300 | 4 | 7 | 99.44% |

These values leave mercenary XP unchanged. At250, the first even-level feat is available after the fourth successful Standard contract, and Guild Level3's extra shared action after the eighth; with the one-squad policy, those typically arrive before Level5 NPC leaders. The schedule creates initial administrative development before specialist leaders. Guild Level advancement may be recorded at settlement, but its new action/project capacity begins at the following management turn.

**Recommendation:** retain **1,000 Guild XP/level and250 per Standard completion**. Lowering to200 delays growth substantially while300 moves the median single-squad Guild toLevel7 within24 intervals. Neither comparison supports acceleration now. Extra squads, easy-contract throughput, authored development awards and acquisition/search bottlenecks are outside this fixture and must be assessed by the other scenarios before adopting a global Guild-XP change.

## Training Suite economics and clock probes

Six continuously trained mercenaries without a Suite use two cohorts and cost **250/month**. A Suite permits one cohort, **200/month plus30 overhead =230**, saving only20/month. Its1,000 purchase needs **50 funded months** to recover that saving, ignoring manager cost and lost construction time. With Training Cadre, ordinary two-cohort cost is200, while Suite one-cohort cost is **175+30=205**: it costs5 more per month. Starting a single six-person cohort does save one initiation action, but continuation was already free. The Suite also produces a one-time qualifying development award; this does not make the monthly economics favorable.

**Recommendation:** mark the Suite for price/overhead revision, rather than raising training XP globally. A concrete sensitivity is cost500 and overhead15: ordinary six-person training saves35/month and pays back in about15 months before construction costs; with Training Cadre it saves10/month and pays back in50 months. Keep the frozen1,000/30 figures unchanged for this report. Test desired facility payback and its interaction with Training Cadre explicitly before selecting replacement numbers.

Manual rules probes, separate from the numerical campaign engine:

- A candidate generated inT1 can be hired inT1 orT2. HireT2 becomesAvailable inUpkeepT3; first training block startsT3 and settlesT4. No hiring-boundary XP or inherited streak.
- Starting trainingT1 settles150 atT2; continuing the same funded cohort settles165 atT3. Stopping atT3 permits deployment then, ends the streak, and later restarting costs a new action and settles150. There is no165/150 award for the same operating interval.
- A new recruit cannot join a long-running cohort and inherit225. Their new enrollment requires a new action/streak. Changing the cohort objective also requires new initiation under edition0.2.
- Interrupted incomplete blocks awardzero; recovery cannot be converted into training XP. After a completed recovery interval, starting training begins a new full30-day block.
- Passing totalXP4,000 at settlement grants Level5's leader feat andExpert tags then. No leader bonus on the preceding job merely because its rewards cross that threshold; next assignment uses the new statistics and pay quote.

These probes establish intended timing, not executable coverage of recruitment or a replacement for the root simulator's onboarding tests.

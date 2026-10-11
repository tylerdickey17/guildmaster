# Exact mission odds and deployment economics — pack 0.3.0

Frozen values SHA256: `5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d`. Reproduce with `python mission_odds.py`. The independent oracle imports no shared simulator. Evidence is in `mission_odds.json`.

## Method and coverage

Exactly enumerate all **8,000 equally likely three-d20 paths** per configuration, applying ±10 thresholds, natural 1/20 shifts, next-phase failure/critical-success effects and persistent critical-failure effects sequentially. Every Success/Critical Success counts once. There is no fourth roll. Recovery is the union of card recovery and any critical failure, not their sum.

There are **346 configurations / 2,768,000 logical paths**. Identical probability calculations are memoized: **116 distinct probability configurations / 928,000 actually evaluated paths**. These are exact probabilities, so no Monte Carlo seed or confidence interval applies.

After completion, independently cross-checked the shared simulator on all four matched four-member high/balanced levels and all four cards: **16 configurations / 128,000 additional shared-engine paths**. Success probability, recovery probability and expected client cash agree exactly with this oracle. Boundary assertions cover natural shifts, ±10 ties and quoted wage samples.

The main matrix tests all four cards, mission levels 1/5/10/20, high/moderate leads, 2/4/6 members and balanced/sparse support. Mixed-level rosters are tested against fixed mission levels 1/5/10/20; a mission never changes level to match the roster. Sensitivities vary payout, mandatory recovery, Hardcase, size premium, low-average cash premium, and an Essential Engagement Standard card.

Balanced means every non-lead has the relevant skill; sparse means only the lowest-level non-lead supports. The highest-level member leads all three phases with the named benchmark. A single specialist can legitimately cover all three using high Piloting for Insertion/Extraction and high Computers for Engagement. Actual authored mercenaries might lack that coverage. No officer, action, hiring, event or investment costs are charged in per-assignment results. Full wages are paid on failure throughout. Sustainable per-calendar-turn net is `expected(cash − wages)/(1 + probability of one-turn recovery)`, with unlimited appropriate offers and no selection costs. It is a steady-state renewal expectation, not a 12-month treasury forecast. The separate starting-lease column deducts 150/month.

## Matched four-member balanced squads

All numbers below use high phase leads and ordinary support cap +3.

| Mission/roster level | Card | Success | Any recovery | Net/turn before overhead | Net after starting lease | Expected Reputation/job |
| ---: | --- | ---: | ---: | ---: | ---: | ---: |
| 1 | Routine | 99.6125% | 14.2625% | 217.27 | 67.27 | +0.9884 |
| 1 | Standard | 87.8625% | 14.2625% | 286.34 | 136.34 | +1.3931 |
| 1 | Demanding | 35.7500% | 100% | 93.05 | −56.95 | −1.4975 |
| 1 | Exclusive | 35.7500% | 100% | 135.95 | −14.05 | −2.4250 |
| 5 | Routine | 99.8375% | 9.8750% | 544.48 | 394.48 | +0.9951 |
| 5 | Standard | 92.4125% | 14.2625% | 744.55 | 594.55 | +1.6206 |
| 5 | Demanding | 44.1250% | 100% | 331.86 | 181.86 | −0.9113 |
| 5 | Exclusive | 44.1250% | 100% | 458.94 | 308.94 | −1.5875 |
| 10 | Routine | 99.9875% | 0% | 1,874.58 | 1,724.58 | +0.9996 |
| 10 | Standard | 98.1000% | 9.8750% | 2,652.56 | 2,502.56 | +1.9050 |
| 10 | Demanding | 64.4750% | 100% | 1,861.24 | 1,711.24 | +0.5133 |
| 10 | Exclusive | 64.4750% | 100% | 2,441.51 | 2,291.51 | +0.4475 |
| 20 | Routine | 99.9875% | 0% | 17,346.10 | 17,196.10 | +0.9996 |
| 20 | Standard | 99.2750% | 0% | 27,458.11 | 27,308.11 | +1.9638 |
| 20 | Demanding | 85.7375% | 100% | 25,190.99 | 25,040.99 | +2.0016 |
| 20 | Exclusive | 85.7375% | 100% | 32,331.20 | 32,181.20 | +2.5737 |

High-skill checks get substantially easier relative to level DCs at high levels. This is an interaction of the selected published benchmark columns with this custom three-phase system, not proof those published tables are inappropriate for their original games. Moderate matched leads produce Standard success 82.4125/87.8625/87.8625/95.9125% and Demanding/Exclusive success 28.475/35.75/35.75/53.675% at levels 1/5/10/20. Moderate L20 Exclusive has expected Reputation **−0.6325/job** even though the high-skill fixture gains Reputation.

Failure payment is a player decision. Other campaign agents use half-pay; the principal tables here use full-pay. The same L1 high/balanced roster produces the following exact net/calendar turn before overhead:

| Card | Full failed wages (+10 Loyalty) | Half (+4) | None (−10) |
| --- | ---: | ---: | ---: |
| Routine | 217.27 | 217.61 | 217.95 |
| Standard | 286.34 | 296.96 | 307.58 |
| Demanding | 93.05 | 125.17 | 157.30 |
| Exclusive | 135.95 | 168.08 | 200.20 |

None-pay's improved cash does not include the resulting loyalty departures/rival availability losses. It is not a recommendation. These exact renewal margins do not replace finite-horizon half-pay campaign forecasts.

## Demonstrated deployment incentives

### Mixed levels earn higher cash for identical odds

| Fixed Standard mission | Deployment | Floor-average | Success | Client cash on completion | Quoted total wages | Net/calendar turn |
| ---: | --- | ---: | ---: | ---: | ---: | ---: |
| 5 | [5,5,5,5] | 5 | 92.4125% | 1,440 | 480 | 744.55 |
| 5 | [5,1,1,1] | 2 | 92.4125% | 1,872 | 270 | 1,277.73 |
| 20 | [20,20,20,20] | 20 | 99.2750% | 41,640 | 13,880 | 27,458.11 |
| 20 | [20,1,1,1] | 5 | 99.2750% | 62,460 | 3,620 | 58,387.17 |

Three Trained L1 supporters already reach +3. Higher-ranked supporters cannot exceed that cap. Accordingly these mixed squads preserve all three check modifiers while reducing wages and increasing the client payout because their floor average is lower. The average is calculated correctly; the cash incentive is the problem. A L20 leader sent to a fixed L5 Standard job earns **−2,180** net per turn despite certain success, so this is not a universal profitable exploit at every job level.

Numerical sensitivity: removing the low-average cash premium alone changes mixed L5 net to **928.34** and mixed L20 net to **37,718.11**, without changing odds or wages. It removes the extra client reward but retains the genuine savings from using cheaper staff. Raising the support cap would help distinguish high-rank squads, but requires separate probability testing and does not justify paying more for low floor averages.

### Small Routine squads outperform the recommended squad financially

At L1, two high-skilled members have 95.9625% Routine success and net **366.00/turn**, versus four members' 99.6125% and **217.27/turn**. Two separate pairs can operate simultaneously if offers/actions permit. On Standard, two members yield 62.175% success and **304.26/turn**, versus four members' 87.8625% and **286.34/turn**. The two-member Standard strategy loses Reputation on average (**−0.89125/job**) while the four-member strategy gains it, so its financial edge has a real campaign cost.

The +20% small-squad cash bonus and fixed recommended-headcount payout contribute directly. Removing only that +20% reduces L1 two-member Standard net to **238.97/turn**, below the recommended squad's 286.34. A +5%/missing-member alternative gives **271.62/turn**. Six-member L1 Standard squads improve success to 95.9125%, but receive less cash and pay more wages: only **140.36/turn**. The current −20% larger-squad cash adjustment strongly discourages bringing extra personnel.

## Hard-card recovery and reward sensitivity

Demanding/Exclusive are rewarding per completion, but low-level three-success probability and guaranteed downtime overwhelm the reward increase. Standard L1 nonbonus XP averages **202.86 per merc/calendar turn** and **192.24 Guild XP/turn**; Demanding gives **119.69 merc XP** and **71.50 Guild XP**, Exclusive the same merc XP and **89.38 Guild XP**. Larger authored XP awards therefore do not currently compensate for harder completion and recovery.

To match matched high-skill Standard net/calendar turn while retaining three successes, +2 DC and one recovery turn, Demanding cash factors would need approximately **3.6022 at L1, 3.0990 at L5, 2.3455 at L10, 1.9270 at L20**. The frozen factor is 1.8. These arithmetic targets do not account for Reputation, relative risk or action scarcity; a universal factor around 3.6 would overtune high-level cards. Increasing payouts alone cannot repair the negative Reputation expectation: break-even success is **4/7=57.14% for Demanding** and **60% for this Exclusive fixture**.

The root's proposed factor sensitivities **Demanding 3.0 / Exclusive 3.6** give L1 net/calendar turn of **221.75 / 286.10 under full failure pay**, or **253.88 / 318.23 under half-pay**. Half-pay Standard remains 296.96. This improves cash incentives while preserving recovery; it leaves success and negative Reputation unchanged. All four tested levels and payment choices are recorded in JSON for comparison. These factors were not substituted into the frozen pack.

Hardcase (or an operational Infirmary) removes this fixture's entire one-turn recovery. It doubles Demanding/Exclusive net/calendar throughput without altering roll odds. At L5, Hardcase Exclusive net becomes **917.88/turn**, above ordinary Standard's 744.55; Hardcase Demanding remains 663.72. At L10, Demanding rises from 1,861.24 to **3,722.48**. This makes a recovery-removal benefit considerably more valuable than a single-phase +1 feat, though capital/upkeep and actual roster rotation can moderate the benefit. These are fixture-specific results; longer recovery would leave some downtime.

## Recommendations and limitations

1. **Remove the positive low-average client-cash adjustment first.** Preserve floor-average display and overlevel adjustments if desired; do not give larger rewards for padding a strong lead with L1 support. The exact alternative above quantifies this change without requiring extra checks.
2. **Reduce or remove small-squad cash premiums.** Removing the premium reverses the L1 Standard profit preference for two versus four members. Consider a modest excess-headcount discount only after checking six-member viability.
3. **Use narrower difficulty bands for the hard-card prototype.** Keep the accepted 1/2/3-success system, but test a lower DC offset or authored lower failure Reputation loss before broadly raising hard-card cash. Level-dependent cash factors could equalize profit but are less simple. Mandatory recovery remains a useful balancing tool; avoid simultaneously imposing high failure, large Reputation loss and downtime at low levels unless this is intentionally a risky prestige contract.
4. **Test ordinary/sparse skill coverage at the table and retain both benchmark sensitivities.** The favorable all-high fixture makes high-level Routine/Standard nearly certain and permits mixed-level specialization. An average-level label cannot itself guarantee balanced difficulty. Do not label these odds as typical for every generated squad.
5. **Treat complete one-turn recovery removal as a major economic benefit.** Compare Hardcase/Infirmary to other feats/facilities with realistic rotations and costs before finalizing.

No conclusion here measures enjoyment, table speed, feasibility of repeated offer access, candidate availability, long-run mercenary advancement, loyalty departure risk, project interruption or debt recovery. Those need the other campaign simulations and live play. Numerical alternate values in this report are sensitivity tests only; frozen pack 0.3.0 was not modified.

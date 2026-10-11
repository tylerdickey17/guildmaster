# Loyalty, events, trained actions and recovery: independent numerical probe

Frozen prototype **0.3.0**, SHA-256 `5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d`. No pack edits. Reproduce with `python playtests/prototype-0.3.0/loyalty_actions.py`; complete machine-readable results are in `loyalty_actions.json`.

## Method and boundaries

Administration/refusal probabilities enumerate every d20 face. Mission probabilities enumerate all **8,000 equiprobable three-phase paths** for each configuration, including natural 1/20 shifts, critical-failure remaining-phase penalties, next-only consequences, capped support and exactly three checks. The 12-turn rival model uses an exact finite-state Markov chain. These are population probabilities, so sampling confidence intervals do not apply. A Python `Random(7)` event trace is included for replay; it is illustrative and is not the probability estimate.

Mission fixture: four matching-level operatives, high relevant phase leads, maximum +3 relevant support, no Essential phase, no leader check bonus and an exogenous accepted job. This is favorable skill coverage. Administrative fixture: a trained +10 officer versus DC15. Cash calculations are expectations, with full agreed pay on both success and failure, no rounding-sensitive deployment adjustment, and no fixed costs unless expressly subtracted. NPC advancement, individual profiles, recruitment, project management and variable boards are omitted from this probe.

The event model isolates one always-Available eligible operative with fixed Loyalty, compatible rival terms and no other due follow-up. A due rival return satisfies the next event minimum. Actual active guilds with other qualifying follow-ups or no Available target have fewer fallback rival offers. Other events do not change this fixture's Loyalty, projects or relations; they occupy the event draw. There is no hidden rival finance, permanent poaching, or bonus mission roll.

## Loyalty and pay

| Loyalty | Refuses DC18 offer | Accepts compatible offer |
| ---: | ---: | ---: |
| 20 | 25% | 75% |
| 50 | 40% | 60% |
| 80 | 55% | 45% |
| 100 | 65% | 35% |

Even capped Loyalty leaves a **35% acceptance probability**. Whether this feels too low depends on whether high Loyalty should mean commitment or merely relative preference. The present event frequency makes it less severe than that conditional probability alone suggests: over 12 turns, the isolated target accepts an expected **1.099 offers at Loyalty50**, with **71.76%** probability of at least one acceptance, versus **0.664 offers/51.39%** at Loyalty100. Steady-state unavailable share is **9.09%/5.51%**, respectively. Formula: acceptance probability divided by `6 + acceptance probability`, because an accepted job's return uses the following turn's event slot. These are upper-opportunity fixtures, not whole-guild attrition predictions.

Four failed jobs for four Level1 operatives produce:

| Failed-pay policy | Total wages paid | Final Loyalty | Offer refusal |
| --- | ---: | ---: | ---: |
| Full | 800 | 90 | 60% |
| Half | 400 | 66 | 45% |
| None | 0 | 10 | 20% |

At the baseline Standard success rate, full versus no failed pay costs an expected **24.275 extra credits per attempted job**, and produces an expected Loyalty difference of **2.4275 per crew member per job** before clamps and other effects. This preserves a real funded choice; Reputation loss remains unchanged.

`floor(Loyalty/10)` makes small bonuses invisible until a threshold. Starting at exactly50, one Boost Morale action raises expected Loyalty by **5.1**, but expected refusal changes from **40% to39.75%**: successful +5/+8 gains do not reach60, while critical failure−2 crosses below50. At starting55 it improves refusal to44%. This is a threshold artifact, not a simulation error. Half pay+4 has the same delayed visibility.

**Sensitivity:** keeping DC18 and changing the divisor to5 gives refusal **15%/40%/65%/90%/95%** at Loyalty0/25/50/75/100. Natural1 retains a failure chance. This makes +5 morale and +4 half pay more immediately useful and differentiates capped loyalty. Alternatively DC15 with the original divisor gives55% refusal at50 and80% at100, but retains the threshold artifact. These are proposed comparisons, not adopted changes.

## Reputation and action economics

The +10/DC15 officer's CF/F/S/CS probabilities are **5%/15%/50%/30%**. Promote the Guild yields expected **+2.15 Reputation for50 credits/action**; Launch Media Campaign yields **+3.2 for100/action**. Media gains49% more Reputation per action but has26% lower Reputation per credit. Neither dominates both constrained resources. Approximate linear time to Friendly from0 is9.3 successful-opportunity actions for promotion or6.25 for media; clamps, integer overshoot and changing officers/DCs make these approximations, not hitting-time estimates.

Reputation expected per attempted Level1 Standard job is **+1.393125**. Demanding is **−1.4975** and Exclusive **−2.425**; mandatory downtime halves those rates per calendar turn. At Level5, Standard is **+1.620625**, Demanding **−0.91125**, Exclusive **−1.5875** per attempt. Greater cash rewards therefore do not make difficult contracts a reliable path to prestige in this fixture. If difficult successes should grow Reputation on average, adjust their difficulty or Reputation numbers. Reducing hard-card DC offset from+2 to+1 raises completion from35.75% to44.125% atLevel1 and44.125% to53.675% atLevel5; +0 raises those to53.675%/64.475%. This preserves the three-success requirement and player-level range.

The fixed +10 fixture does not scale forever: promotion expectation is+1.15 at Guild3, +0.30 atGuild5, −0.45 atGuild7 and −0.85 atGuild10 as organizational targets rise. Live officers must advance or be replaced; the fixture is not a guaranteed management competency benchmark at every Guild Level.

## Trained actions

| Probe | Exact/economic result | Implication |
| --- | --- | --- |
| Recon on one Level1 Standard phase | Success87.8625%→89.77875%; expected client cash gain11.4975 | Modest insurance for a spare action; another crew's acquisition can be more productive. |
| Recon on Level5 Standard | Success92.4125%→93.90875%; cash gain21.546 | A free-cash preparation, but still spends officer/action capacity. |
| Recon on Level5 Demanding/Exclusive | Success44.125%→47.275%; cash gain81.648/99.792 | Better impact on a must-pass phase; bonuses do not bypass the three-check rule. |
| Counterintelligence, Loyalty50 | Acceptance60%→49.25%, if the named event matches | Within two fallback turns, matching probability at most11/36; unconditional acceptance reduction at most3.285 percentage points. |
| Optimize permanent-HQ overhead100 | Expected saving11, cash cost25; net−14 before action cost | Current authored properties make this action economically harmful. Even guaranteed critical saving20 is below its cost. |
| Recovery Protocol on Recovering1 | Next-boundary benefit arrives at natural recovery expiry | No availability benefit under current timing; 25/person and an action are wasted on all one-turn fixture recovery. |

Recon uses `[−1,0,+1,+2]` to a single named phase, averaged over officer degrees; no fourth mission check is introduced. At Guild1, one acquisition action for a second fully staffed baseline Standard team yields expected margin327.175 before shared overhead with full failed pay, far more than Recon's11.4975 expected client gain. Spare crew, offer supply and funding are prerequisites; this is an opportunity-cost bound, not proof preparations are always bad. The zero-cash Digital Recon has the same bonus schedule as the50-credit Logistics Corridor, which is therefore inferior when the same trained officer qualifies for both and the same Insertion is valid. Different skill gates justify both catalog entries; a distinct Logistics benefit is worth live testing.

**Recommended numerical/timing follow-ups:** waive Optimize's25-credit cash cost (leaving its real action opportunity cost), or enlarge explicitly eligible savings rather than silently discounting wages/rent. Its expected break-even overhead is227.28 credits; current individual properties top out at100. Permit successful Recovery Protocol to release eligible Recovering staff during the current Activity phase if its reduction reaches0. Current Available staff still cannot prebank treatment, and prisoners/missing personnel remain unavailable. This is a stated sensitivity requiring root adoption, not a local pack edit.

## Recovery, Hardcase and Infirmary

At Level5, expected monthly assignment contribution before HQ and facility overhead is:

| Contract | Success | Natural recovery frequency | Ordinary contribution | Recovery removed |
| --- | ---: | ---: | ---: | ---: |
| Standard | 92.4125% | 14.2625% | 744.55 | 850.74 |
| Demanding | 44.125% | 100% | 331.86 | 663.72 |
| Exclusive | 44.125% | 100% | 458.94 | 917.88 |

Calculation: `(completion chance × client payout − full wage total) / (1 + recovery probability)`. Long-run one-team duty cycle is87.52% for Standard and50% for mandatory-recovery cards. Hardcase or an operational Infirmary eliminates every one-turn recovery source in this fixture, restoring100% and **doubling hard-card throughput**. They do not stack beyond0. This directly removes the user-selected recovery balancing factor at Level5/after facility access.

An Infirmary serving only this Standard team adds106.19 contribution/month and costs40 overhead, net66.19; its1,200 build cost pays back in18.13 active months, or21.15 with the two100-credit manager intervals included. Serving Exclusive jobs adds458.94 contribution less40 overhead, net418.94, paying back1,400 in3.34 active months after construction. This is a fixed-level expectation with unlimited Exclusive access, not a projected campaign ROI. It illustrates sharply different facility value by mission mix.

**Recommendation:** retain meaningful recovery on especially difficult cards, e.g. mandatory2 turns with reduction1 leaves one turn. Alternatively constrain Hardcase's reduction to phase-caused recovery while Infirmary treats ordinary medical recovery. Those preserve recovery as a balancing factor but need separate sensitivity tests; no numerical change is applied here. A combat Leader Feat's single-phase+1 increases Level5 Standard success1.5 points or hard-card success3 points, whereas Hardcase can double throughput on hard cards, so the six choices currently have strongly unequal mechanical value.

## Seed7 trace

The 12-turn isolated event trace draws `3,2,6,1,1,5,1,3,5,1,5,2`. Turn2 rival refusal die13 refuses atLoyalty50; turn12 die2 accepts, scheduled to return at13 outside this trace horizon. No money or permanent attrition is invented. Detailed records are in JSON. Exact probabilities above include return censorship across the full12-turn horizon; this particular seed simply did not accept early enough to demonstrate a return.

These findings assess arithmetic and incentives. They do not measure table speed, enjoyment, narrative appropriateness, campaign treasure compatibility or human willingness to risk a difficult contract.

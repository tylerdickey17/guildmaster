# Targeted 0.3.1 Loyalty, recovery and facility verification

Pack SHA-256: `32b207d3b379d4cc8e8b4ff818d912059866a2cdd98ab15f0a2b61c42e0dde99`. Reproduce with `python playtests/prototype-0.3.1/loyalty_revision.py`. Exact outputs are in `loyalty_revision.json`. Neither frozen pack was changed.

This is a **targeted exact/arithmetic rerun, not a campaign rerun**. Checks enumerate all20 d20 faces. Six mission configurations enumerate8,000 three-phase paths each (48,000 paths total), including natural1/20, forward effects and capped support. No sampling uncertainty or confidence interval applies. Treatment throughput uses an analytic renewal calculation; suite payback is fixed-cost arithmetic. No additional mission roll, captive release, or automatic healing of authored untreated conditions is introduced.

## Loyalty and morale

Divisor5/DC18 gives exact refusal **15% at Loyalty0, 65% at50 and95% at100**. Loyalty0 is a mathematical endpoint; notice/Inactive rules still apply and this is not a permission to keep zero-Loyalty operatives available indefinitely. At50, modifier10 succeeds on faces8–20; at100, natural1 downgrades success to failure, preserving5% compatible acceptance. Incompatible offers remain disallowed by the agreement.

The +10 officer/DC15 CF/F/S/CS distribution remains **5%/15%/50%/30%**. One Morale action's expected refusal effect is:

| Starting Loyalty | Refusal before | Expected Loyalty after | Expected refusal after |
| ---: | ---: | ---: | ---: |
| 49 | 60% | 54.1 | 66.25% |
| 50 | 65% | 55.1 | 68.75% |
| 54 | 65% | 59.1 | 71.25% |
| 55 | 70% | 60.1 | 73.75% |
| 60 | 75% | 65.1 | 78.75% |
| 95 | 95% | 99.2 | 95% |
| 100 | 95% | 99.9 | 95% |

Five-point bands still produce discontinuities, but the starting action now has a positive immediate refusal effect, correcting0.3.0's threshold anomaly. Refusal saturates95% from Loyalty80 onward under this DC, so values80–100 matter for narrative/pay/rescue buffers rather than this particular offer check. Recommended watchpoint: do not describe each additional point as increased refusal at the top end.

## Infrastructure and training

Optimize Infrastructure on100-credit owned overhead yields expected **11 credits saved**, now with zero cash fee and one action. It no longer guarantees net cash loss; when profitable acquisition, promotion or recruitment is available, an11-credit saving can still be a weak use of scarce officer capacity. It affects one property's next eligible overhead once and excludes rent, payroll and debt. Existing smaller owned overhead75/80 produces8.25/8.8 expected savings.

With **six continuously funded trainees**, the revised Suite's economics are:

| Training Cadre | Without Suite/month | With Suite/month | Saving | 500-credit purchase payback | Including100 manager |
| --- | ---: | ---: | ---: | ---: | ---: |
| No | 250 | 215 | 35 | 14.29 months | 17.14 months |
| Yes | 200 | 190 | 10 | 50 months | 60 months |

The Suite also saves one initiation action by placing six trainees in one cohort rather than two. These paybacks exclude construction delay, damage, financing and unused capacity. With four or fewer trainees, there is no trainer consolidation saving;15 overhead is an additional expense. Training Cadre's50-month marginal payback remains slow, so the Suite is a capacity/convenience purchase for that build rather than a rapid income investment. This should be observed in live play, not treated as a remaining guaranteed-loss defect.

## Passive recovery and paid treatment

The revised passive rule calculates `max(mandatory, max(0, phase-added−1))`. An Infirmary or qualified Level5 Hardcase clears a phase-added1-turn complication on Standard work but leaves Demanding/Exclusive mandatory1 untouched. If both sources specify1 turn, duration remains1; they never add to2. A mandatory2 card also remains2 after passive reduction.

Recovery Protocol now works during Activity **after actual return**. On a remaining1-turn timer, Success/Critical Success reduce to0 and release the staff immediately. CF/F do not. The four-person action costs100 regardless of its result, needs a trained Medicine officer and consumes one action/officer slot. The same people cannot receive repeated improvement awards that turn; failure does not create a free retry. It cannot be banked while Available or substitute for rescue/required special treatment.

With +10 Medicine/DC15, release probability is80%. Treating every mandatory return changes a one-team long-run duty cycle from **50% to83.33%**, not100%: average cycle is `1 job interval +20% chance of1 recovery interval =1.2`. It spends an expected0.833 medical actions/month,100 per attempt and requires funding before the next deployment. Combined with paid acquisition, this policy averages1.667 actions/month before searches or other management. It can fit the starting three-action pool but substantially competes with recruiting, projects and morale. With the same fixed +10 officer at Guild3/DC20,5/DC26,7/DC31, success probabilities fall to55%,25%,5%; corresponding job rates are68.97%,57.14%,51.28%. Actual officers must advance; DC15 is a stated favorable competence fixture, not a forever baseline.

For four high-skill matching-level operatives with full failed wages, unlimited already-authored eligible offers and no fixed overhead, expected contribution per calendar month is:

| Squad/card | Mandatory downtime retained | Medical action after every return, +10/DC15 |
| --- | ---: | ---: |
| Level1 Demanding | 286.46 | 394.10 |
| Level1 Exclusive | 383.08 | 555.13 |
| Level5 Demanding | 874.13 | 1,373.55 |
| Level5 Exclusive | 1,152.66 | 1,837.77 |

The treatment column includes its100 cash cost/attempt; both exclude HQ overhead and acquisition/search scarcity. Level5/DC15 is an intentionally isolated medical competency comparison, not a prediction of Guild5 management. The increased value is real: the active paid action provides a strong acceleration option while passive feats/facilities preserve mandatory downtime. It does partially bypass that balancing factor, but through disclosed expenditure, uncertain treatment and officer opportunity cost. Keep it for live testing and record whether every hard-job return routinely receives treatment; if that becomes automatic rather than a meaningful choice, adjust medical cost/target cap or author special recovery that explicitly cannot be accelerated. No further patch is necessary from this targeted probe alone.

These are arithmetic incentive checks. They do not validate full0.3.1 campaign cash, distress rates, enjoyment, table workload or long-term officer progression.

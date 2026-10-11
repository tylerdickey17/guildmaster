# New guild: acquisition A/B, prototype 0.3.0

## Result and recommendation

Keep **three starting actions, two actions per officer, four starting mercenaries, and 2,000 credits** for the first live playtest. In this favorable new-guild fixture, charging one action for acquisition did not choke contract deployment. Removing that cost added approximately **0.76 assignments over twelve months**, and primarily freed actions for other development. Retain the paid baseline and test the free alternative at a real table; simulation cannot determine whether either feels tedious.

Do not lower officer capacity to one: that sensitivity cut paid-baseline assignments from **18.365 to 15.062**, a **17.99%** reduction. A starting six-person roster accelerated development modestly but was not necessary to avoid arrears in this fixture. Retain four rather than treating six as a required fix.

The 2,000-credit treasury is comfortable under the tested conditions. It should not yet be reduced: these campaigns omit disruptive events, projects, loans, outside-officer salaries, adverse skill coverage, and PC withdrawals. No demonstrated failure here establishes safety under those pressures.

## Reproducibility and scope

Frozen values hash: `5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d`.

**28,000 simulated campaigns**, comprising fourteen arms of **2,000 seeds, integers 0–1,999**. Each has twelve management intervals, then terminal Upkeep at **T13**: its client receipts and bills count, and it receives no actions. [new_guild_ab.py](new_guild_ab.py) reproduces [new_guild_ab.json](new_guild_ab.json), including each arm's seed-7 monthly trace. Run `python new_guild_ab.py` from this directory.

Each paired paid/free comparison changes only the acquisition cost and holds scenario/policy options constant. The common keyed draw domains match rolls whenever turn, deployed IDs, and phase match. Divergent schedules can change those keys; this is paired exogenous randomness, not a claim that every resulting mission has identical faces.

The default engine supplies a **saturated replenishing deck**, with mission level selected at the deployed squad's floor-average before any roll. This is a favorable board override, not the actual two-offer starting board. NPC high/moderate profile is held constant as levels advance; all nonlead operatives remain qualified relevant supporters in every phase. Two unpaid PC officers have the disclosed +10 administrative fixture. Recruitment is Level 1, target roster eight, failed wages half-pay where funded, monthly lease 150. No daily salaries for unused mercenaries are invented.

Policy: deploy available full squads first; hire searched candidates; search recruitment until eight members; start a one-block training cohort if spare personnel, actions, and reserve permit; then spend remaining affordable actions on promotion. Training stops after each block rather than automatically taking the streak bonus. Promotions disabled is an explicitly separate policy control. No economic optimization or human choice is implied.

The separate **limited-board fixture** begins with two Level 1 offers, each expiring at the end of T2, and uses Work the Network in contract mode thereafter. Offers generated in T expire at the end of T+1. Paid acquisition still costs a separate action. Searches use +10 versus the Level 1 target DC15 and yield 0/1/2/3 leads. Cards remain fixed Level 1 throughout the year, chosen before deployment. Its comparator is an otherwise identical saturated **fixed Level 1** deck; do not compare this limited board directly against the matching-level deck as if availability were the only change. The derived fixture source is included in the JSON for inspection.

No random event deck, Guild/Leader feats, officer hiring, projects, property changes, debt, Priority adventures, rival assignments, or sparse support are modeled. In particular **Trusted Client's Level 2 free-acquisition waiver is omitted** from both arms. Choosing it in real play would reduce the sustained burden of the paid baseline. The limited board also omits event/contact-generated leads and Standing Agreement. No table-time estimate is made.

## Measured outcomes

Means and empirical cash quantiles after terminal T13 settlement. Paid/free below denote acquisition costing one/zero actions. Each row is 2,000 campaigns.

| Scenario | Acquisition | Mean jobs | Mean ending cash | Cash P10 / P50 / P90 | Mean ending Reputation |
| --- | --- | ---: | ---: | --- | ---: |
| High skills, start four, cap two | Paid | 18.365 | 6,412.825 | 4,565 / 6,410 / 8,220 | 45.575 |
| High skills, start four, cap two | Free | 19.128 | 5,840.788 | 4,035 / 5,890 / 7,760 | 73.249 |
| High skills, start six, cap two | Paid | 19.398 | 6,950.885 | 5,000 / 6,940 / 8,805 | 49.666 |
| High skills, start six, cap two | Free | 20.147 | 6,383.163 | 4,530 / 6,470 / 8,380 | 79.433 |
| Moderate skills, start four, cap two | Paid | 18.365 | 5,761.941 | 3,800 / 5,750 / 7,580 | 40.852 |
| Moderate skills, start four, cap two | Free | 19.128 | 5,163.902 | 3,275 / 5,205 / 7,085 | 69.141 |
| High skills, start four, cap one | Paid | 15.062 | 5,736.628 | 4,240 / 5,865 / 7,140 | 22.736 |
| High skills, start four, cap one | Free | 18.311 | 6,278.015 | 4,420 / 6,270 / 8,055 | 50.858 |
| High skills, start four, no promotions | Paid | 18.365 | 7,160.575 | 5,285 / 7,170 / 8,950 | 25.848 |
| High skills, start four, no promotions | Free | 19.128 | 7,525.810 | 5,650 / 7,560 / 9,490 | 26.965 |
| Fixed L1 saturated board | Paid | 18.424 | 4,183.507 | 3,310 / 4,260 / 4,925 | 48.100 |
| Fixed L1 saturated board | Free | 19.191 | 3,408.474 | 2,615 / 3,490 / 4,080 | 75.903 |
| Fixed L1 limited board | Paid | 16.998 | 4,181.096 | 3,210 / 4,260 / 5,040 | 34.910 |
| Fixed L1 limited board | Free | 18.539 | 3,666.153 | 2,800 / 3,735 / 4,465 | 62.273 |

Every arm had **0/2,000 campaigns ever recording arrears**. The Wilson 95% interval is **0–0.1917% for each arm**. These are bill-breach observations, not modeled insolvency/default rates. Correlated paired arms are not pooled to manufacture a stronger confidence interval. Empirical percentiles use order statistics at `ceil(percentile × N)`; full precision is in the JSON. Paired mean intervals below use the sample standard deviation of within-seed differences and a normal 1.96 multiplier.

## Acquisition's opportunity cost

Under the default policy, free acquisition adds **0.7625 jobs** (paired 95% mean interval **0.7424–0.7826**) and **27.674 Reputation**, yet lowers ending cash by **572.038**. This is not evidence that a free rule destroys money. Players spend the saved actions differently: mean promotion spending rises **747.750 → 1,685.100** credits. Increased client receipts contribute **+572.760**, increased wage payments **−205.985**, training **−1.463**, and extra promotion **−937.350**, yielding the observed cash difference.

With promotion disabled, free acquisition still adds the same 0.7625 jobs and **increases cash by 365.235** (paired 95% **347.997–382.473**). It lowers actual paid actions used from **25.066 to 6.739** across the year; unused executable capacity rises **14.962 → 33.736**. A removed acquisition cost therefore releases approximately eighteen action slots for development even where staff availability limits additional jobs. Reporting only the small deployment increase would conceal the substantive opportunity cost.

Reducing officer cap to one makes the free alternative add **3.2485 jobs**, paired 95% **3.1958–3.3012**, and **541.387 credits**. This is evidence for retaining the selected two-action officer baseline. Cap one prevents the two officers from using the three-action opening pool fully and makes recruitment compete much harder with contracts.

The limited board's paid arm uses **8.037 contract-search actions**, versus **8.625** free, and deploys **16.998 versus 18.539 jobs**. Free adds **1.541 jobs**, paired 95% **1.4840–1.5980**. At paid acquisition, limiting the fixed L1 board reduces jobs versus its saturated comparator by **1.426** on average. Ending cash stays almost equal because the limited-board policy also buys fewer promotions. That cash comparison is not evidence that search scarcity has no cost; Reputation falls **48.100 → 34.910** and staff sometimes wait for offers.

## Seed 7 monthly trace

Default high-skill starting-four fixture. Cash is after each boundary's receipts, obligations, and management spending; T1 has no preceding interval bill. Complete degree outcomes, departures, recruitment, training, wages, officer/pool limits, and Reputation are in the JSON.

| Boundary | Paid cash | Free cash | Paid client receipts | Free client receipts | Paid actions | Free actions |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| T1 | 1,900 | 1,800 | 0 | 0 | 3 | 3 |
| T2 | 2,050 | 1,850 | 600 | 600 | 3 | 3 |
| T3 | 2,100 | 1,950 | 600 | 600 | 3 | 3 |
| T4 | 2,300 | 2,450 | 600 | 1,200 | 3 | 3 |
| T5 | 2,850 | 2,950 | 1,200 | 1,200 | 3 | 3 |
| T6 | 3,050 | 3,050 | 600 | 600 | 3 | 3 |
| T7 | 3,770 | 3,670 | 1,380 | 1,380 | 3 | 3 |
| T8 | 4,440 | 4,360 | 1,380 | 1,560 | 4 | 4 |
| T9 | 5,180 | 5,050 | 1,560 | 1,560 | 4 | 4 |
| T10 | 5,450 | 5,220 | 780 | 780 | 4 | 4 |
| T11 | 6,240 | 5,910 | 1,560 | 1,560 | 4 | 4 |
| T12 | 7,150 | 6,840 | 1,740 | 1,920 | 4 | 4 |
| T13 settlement | 8,280 | 7,970 | 1,920 | 1,920 | 0 | 0 |

Paid reaches eight staff in T3, first using two full squads in T4. Free reaches eight in T2 and first uses two squads in T3. New hires are usable at the next boundary, not immediately. The ledger confirms receipt-before-bill settlement, locked departure wages, one new assignment per member per interval, recovery unavailability, and next-turn Guild action growth.

## Validation and next test

Code inspection found no material defect affecting these zero-arrears samples. One engine reporting caveat remains: cured arrears are pooled and counted in wage-payment totals even if originally rent; this is immaterial here because no arm ever creates arrears. The reproduction script asserts each campaign's complete cash accounting, a terminal boundary without actions, and no duplicate operative across same-boundary one-turn settlements.

These findings support testing the existing numbers, not declaring the subsystem balanced. Next, test the two-offer board with actual distinct NPC skills, the first Guild feat, and one project competing for actions. At the table, record which development actions players defer, whether they knowingly save capacity, and whether paid acquisition feels like a useful choice. In simulation, alternate spending policies are necessary before using lower free-arm cash to recommend a numeric change.

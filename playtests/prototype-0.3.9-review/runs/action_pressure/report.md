# Guildmaster 0.3.9 — action pressure audit

Frozen source commit: `7c1b338b9b9b46f75b0296a660bd5aa08b857a0b`. No live/source edits. Run `node runs/action_pressure/simulate.cjs` from the protocol directory. `results.json` contains exact enumerations and cohort aggregates; `traces.json` contains every legal campaign month. Draft mechanics below are recommendations, not implemented rules.

## Main finding

The user's action-surplus observation is supported. A four-PC Guild Level 6 has nine actions. A single available squad usually needs one discovery search, one acquisition and one recon: three actions, leaving six. A Level 10 guild has thirteen actions, leaving ten. Even three squads usually spend seven actions (one search, three acquisitions and three recons), leaving six at Level 10. These are ideal usable-card pipeline budgets: random quality, expiration, hiring, recovery, expansion and multiple locations can increase costs. There is no need to spend every action, but the remaining action menu encourages repetitive metric shopping.

A second issue masks rather than solves that surplus: all authored PC administrative skills remain +10 while administrative DC follows creature level `2 × Guild Level − 1`. Consequently ordinary management activities degrade severely as the guild grows. Network checks instead use the player's chosen search level DC, producing an inconsistent incentive to avoid management and fish low-level leads. Full Foundry PC skills should come from the actual character sheet; the browser needs an explicitly documented evolving PC benchmark or selectable PC level if it continues as a balancing tool. Do not interpret fixed +10 late-game results as the intended tabletop odds.

## Exact promotion/morale odds

Every Promote costs one action and 50 credits. It has no once-per-turn limit; the same officer can perform it repeatedly. No action generates Guild XP. Exact uniform d20 enumeration gives:

| Guild level | Pool | Admin DC | Mean Reputation / Promote | Mean Loyalty / Boost Morale | Mean recon bonus |
|---|---:|---:|---:|---:|---:|
| 1 | 4 | 15 | +2.15 | +5.10 | +1.05 |
| 2 | 5 | 18 | +1.55 | +4.20 | +0.75 |
| 3 | 6 | 20 | +1.15 | +3.60 | +0.55 |
| 4 | 7 | 23 | +0.75 | +2.75 | +0.30 |
| 5 | 8 | 26 | +0.30 | +1.70 | 0.00 |
| 6 | 9 | 28 | 0.00 | +1.00 | −0.20 |
| 7 | 10 | 31 | −0.45 | −0.05 | −0.50 |
| 8 | 11 | 34 | −0.60 | −0.65 | −0.65 |
| 9 | 12 | 36 | −0.70 | −1.05 | −0.75 |
| 10 | 13 | 39 | −0.85 | −1.65 | −0.90 |

Five promotions cost 250 credits. Mean change is +7.75 Reputation at Level 2, +1.50 at Level 5, zero at Level 6 and −4.25 at Level 10. Level 1 cannot take five because its pool is four. Synthetic executable fixtures at each guild level used seeds 1–1000, abundant artificial cash and up to five promotions: at Level 10, 982/1000 months lost Reputation, averaging −4.241. These are isolated fixtures, not legal startup progress or affordability evidence.

Reputation caps at 100 and Loyalty at 100, so their marginal utility falls as they approach the cap. Paying to repeat those activities at cap is still permitted and can lose the metric on a Critical Failure.

## Legal startup cohort

128 attempted campaigns, each completing 24 turns: 64 consecutive seeds per policy, staffed starter, four PCs, 2,000 treasury, no state/dice editing, no future-roll lookup, no favorable seed selection. Each campaign initially maintains one four-person squad, recruits to replace losses when a two-Upkeep cushion permits, attempts affordable recovery, and picks visible contracts by a simple risk-adjusted return proxy. Each uses only the initial four Hero Points, on Critical Failures, with no manual session resets or GM awards. No expansions, training, loans, extra squads or accelerated progression policy. This is an action-utilization experiment, not a speedrun or optimal economy strategy.

The first policy leaves surplus unused. The second spends spare actions on Promote while preserving the next forecast Upkeep plus half quoted payroll. Stalled months are retained, not discarded. Cash conservation and earned Guild XP conservation were asserted every month.

| Metric after 24 turns | Leave surplus unused | Reserve-limited promotion fill |
|---|---:|---:|
| Attempted / completed runs | 64 / 64 | 64 / 64 |
| Completed intervals | 1,536 | 1,536 |
| Mean final Guild Level | 4.766 | 4.438 |
| Mean final treasury | 5,039 | 2,498 |
| Runs ending with arrears | 14 | 24 |
| Mean unused actions / turn | 3.444 | 1.463 |
| Mean promotions / turn | 0 | 1.953 |
| Months without a deployed mission | 129 | 190 |

Leaving spare actions unused averaged 1.72 unused at Level 1, 3.85 at Level 3, 5.78 at Level 5 and 6.87 at Level 6. There were only 15 Level 6 months in that policy; none at Levels 7–10. The fill policy averaged 4.35 promotions across its 123 Level 5 months and 6.56 across its 16 Level 6 months. This reproduces the repetitive-action pattern without artificial late-game starting resources.

Important limitation: promotion consumes action-history keys and therefore changes later deterministic rolls even for the same seed. Cohort differences are associations, not an identical-mission causal counterfactual. Promotion spending directly reduces the treasury and never directly grants Guild XP, but these two cohorts alone do not prove the exact causal effect on failures or final level.

## Stacking / farming audit

- **Promote and Boost Morale:** unlimited repeat attempts if cash and shared actions remain. One officer can spend the entire pool. Morale reaches any number of local Available/Recovering personnel for 10 credits each; a new advanced morale activity cannot claim larger reach as its advantage unless the basic activity is bounded first.
- **Discovery:** normally three offers/candidates even on Failure. Repeated same-level searches remain legal and can fish profiles/difficulty/rarity. Actual quantity is zero or one only on Critical Failure. Searching low levels remains reliable at high guild levels because its DC is target-level based. Idle surplus can become many discarded leads rather than useful decisions. Acquisition and hiring still separately cost actions; hiring costs credits and starts next turn. Each operative can be dispatched only once per turn.
- **Recon:** one recorded attempt per contract, including failed/negative attempts. Circumstance bonuses use the highest, so oversized squad bonuses or leader feats suppress some recon utility. Recon cannot be repeated to stack support on one mission. High-level fixed-skill recon currently has negative average bonus.
- **Optimization:** one attempt per facility per upcoming bill. Discount only reaches asset maintenance, not its staff salary, rent, payroll or debt. A 10% saving is one credit for Recruitment Office or one credit for Training Suite, after rounding; it is two for Comms Hub and four for Infirmary. Even Critical Success saves only 2/3/5/8 credits respectively. This is a very weak action sink beside a 50-credit promotion or hundreds in mission receipts.
- **Recovery:** repeated attempts are permitted on the same remaining Recovering workers after a failed/no-effect attempt, as long as they remain eligible. It costs 25 per target per attempt. At Guild Level 7+ the +10 officers reduce recovery only on a natural 20 (5%); this creates costly retry pressure.
- **Projects/property:** new installations award 200 XP each; same type cannot repeat at a base, project capacity and slots gate it, and repairs award no development XP. No direct same-installation XP loop found. New owned HQs give 300 XP once on relocation; outposts 300 once when the chief is funded. Newly bought properties can repeat those milestones across bases, with purchase/management/upkeep costs. Development XP is therefore repeatable across real new assets, not a one-time guild accomplishment; it belongs in speedrun auditing, but it is not free.
- **Standing Agreement:** generates a free acquired Standard job by calendar `1 + floor((turn−1)/6)` rather than actual guild/squad competence. It saves an acquisition action, which increases surplus. It must not become an action-generating loop in advanced activities.

## First draft: powerful multi-action activities

Keep the shared pool and give additional actions somewhere worthwhile to go. These are tactical choices with treasury/personnel tradeoffs; none grant direct Guild XP, refresh Hero Points, generate actions, bypass wages, add mission checks, alter the printed success threshold or guarantee success.

| Activity / prototype unlock | Actions | Concrete draft | Limits and opportunity cost |
|---|---:|---|---|
| **Launch a Sector Campaign** — Guild 3, Command/Diplomacy | 2 | Pay 100; Reputation by degree **−2 / 0 / +5 / +8**. | Once per guild per turn, replaces ordinary Promote that turn; public campaign has one clear audience. Two ordinary promotes cost 100 and yield +4.30 expected at the reference +10 vs DC15; campaign yields +4.80, a modest premium, with correlated single-roll risk. No Guild XP. |
| **Prepare an Operations Briefing** — Guild 3, Operations/Computers | 2 | One accepted job, pay **25 per assigned operative**, roll once. CF: −1 to a chosen phase; F: no benefit; S: +1 circumstance to **each** phase; CS: +2 to each. Squad and leads locked when briefing is commissioned. | Once per job; consumes the same preparation slot as Recon, so they cannot combine; highest circumstance still applies. Must be funded before departure. More influence than ordinary one-phase Recon, but costs an extra action and money, and oversized squads may gain nothing. |
| **Run an Intensive Training Block** — Guild 6, Personnel; funded instructor required | 2 | Four operatives (six in a suite), one 30-day block, **225 XP each**, **50 credits each** materials plus ordinary trainer charge if required. | Each operative at most once per three turns; no consecutive-block multiplier; unavailable this turn. Ordinary training gives 150 XP for 25 each plus trainer: extra 75 XP costs a second action and doubled materials. Two standard consecutive blocks give 315 XP but consume two months and prevent both months' missions. This option trades treasury/actions for one month's earning capacity; test growth effects before adoption. |
| **Establish an Extraction Contingency** — Guild 4, Operations/Medicine or Survival | 3 | One accepted job, pay **25% of quoted squad wages**, rounded up to 5; roll once. CF/F: no protection; S: one protection charge; CS: two. A charge converts an Extraction Missing complication to Recovering for the printed severity, or halves one Engagement repair bill, rounding up. | Automatically use charges in printed priority: missing operative first, then repair. Once per guild per turn and per job; requires a declared receiving crew/base. Does not change phase degrees, job success, existing mandatory recovery or client payout. Protects a high-risk investment instead of increasing XP throughput. |

The fourth option has a new contingency type rather than merely batching three cheap activities. At a four-Level-1 wage quote it costs 110 credits; a Normal repair is only 55, so using it purely for Normal repairs is poor value. It is attractive for a Hard/Expert/Legendary job where a failed Extraction normally removes a worker indefinitely. Higher wage quotes scale its price, preventing a permanently tiny insurance fee. It needs a UI that previews whether loss protection is worth the price.

### Briefing benchmark

Exact enumeration of all 8,000 mission die triples with the starter Escort modifiers +10/+8/+8, DC15 and current forward penalties/bonuses, without Hero Points:

| Preparation result | Ordinary one-action Recon (Engagement) | Proposed two-action full briefing |
|---|---:|---:|
| None | 80.6875% | 80.6875% |
| Critical Failure | 78.5625% | 78.5625% |
| Failure | 80.6875% | 80.6875% |
| Success | 82.8125% | 86.4375% |
| Critical Success | 84.9375% | 91.3375% |

At the reference administrative distribution +10 vsDC15, weighted completion is **82.91875%** for Recon and **86.65125%** for the briefing: +3.7325 percentage points for one extra action and 100 credits with four assigned personnel. These are draft isolated benchmarks, not live observed late-game stats. No guarantee of success; meaningful only if the bonus is not already supplied by a higher circumstance source. Compare crew loss/repair incidence as well as payout before setting the final cost.

## Participation and repetition rules

Keep **one shared pool**, without separate officer action ceilings. At the start of Activity, reserve one action for each PC; each player declares a one-action activity, commits their reserved action to a jointly led multi-action activity, or explicitly passes. Allocate unreserved/returned actions afterward. A joint activity can therefore let two or three players contribute while their relevant officer/skill remains the one roller; players should make real choices about targets, spending and contingency priority. A player may lead additional work using the shared surplus. NPC chiefs never increase this pool.

Adopt attempt limits on the **work**, rather than the officer: one public campaign per turn; one morale program per operative per turn; one preparation per job; one optimization per upcoming facility invoice; one recovery protocol per operative per turn. Repeating a network search requires another contact/sector/talent market rather than another roll on unchanged facts; new contacts can justify more searches for a guild running many squads. Do not enforce a blind one-search-per-guild rule that strands large rosters. Keep passing explicitly legal and do not bank unused actions.

Progression pace needs a separate rule. Two/three-action activities can improve the feel of growing capacity, but they do not establish a five-year route to Level 10. Extra squads and repeated development milestones still multiply Guild XP. Do not solve pacing by making successful operations administratively impossible; tune the progression curve or cap/count significant accomplishments after the speedrun evidence is combined.

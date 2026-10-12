# Guildmaster prototype 0.3.10 — relative progression and officer activities

Published October 12, 2026 following the owner's request to implement the accepted relative-threat XP and exceptional-performance direction, together with the review's action-pressure changes and confirmed fixes. This supersedes 0.3.9 for new work; previous settled transactions and deployed quotes remain.

## Relative Guild XP

Retain **1,000 Guild XP per level**, Guild Levels 1–10, and the shared pool of PC count + Guild Level − 1. The unimplemented 20,500-XP curve is not adopted.

| Relative threat | Completed contract Guild XP |
| --- | ---: |
| Trivial | 0 |
| Low | 60 |
| Moderate | 80 |
| Severe | 120 |
| Extreme | 160 |

A failed contract gives no Guild XP. Operative participation/completion XP and the credit economy remain as in 0.3.9. A trivial job can still provide income and train rookie operatives; it no longer grows an established guild.

The labels and awards borrow [SF2e encounter budgets](https://2e.aonsrd.com/rules/793-xp-budget), while [XP awards](https://2e.aonsrd.com/rules/724-xp-awards) distinguishes obstacle XP and normally unrewarded trivial encounters. **The contract mapping below is custom Guildmaster design**, not a published SF2e conversion or a claim that a three-check job has published combat odds.

Compute offset = mission level − Guild Level + contract-profile complexity.

| Existing mechanical profile | Complexity |
| --- | ---: |
| Easy | −1 |
| Normal | 0 |
| Hard / Exclusive | +1 |
| Expert | +2 |
| Legendary | +3 |

| Offset | Relative Guild threat |
| --- | --- |
| −3 or less | Trivial |
| −2 or −1 | Low |
| 0 | Moderate |
| +1 | Severe |
| +2 or more | Extreme |

Mission levels remain 1–20. There is no forced doubling of Guild Level or truncation of mission DCs. Complexity moves especially demanding jobs upward; for example an ordinary Level1 job is Moderate for Guild1 and Trivial for Guild5, while a Level1 Legendary profile can remain Low for Guild5.

**Actual mission checks stay on the printed card:** mission-level DC plus the existing profile adjustment, distinct phase leads, required successes, forward effects, recovery and complications. The player-facing primary badge is the relative Trivial/Low/Moderate/Severe/Extreme rating; old profile names describe the existing mechanical/payout package. Relative organizational threat is not the assigned squad's actual danger. The deployment preview displays both the Guild XP rating and the exact crew modifiers/DCs.

The Guild XP rating freezes when the squad deploys. Later levels, crew pay changes, or multiple completions in the same Events phase do not recalculate it. Previously deployed jobs retain their old quoted contract Guild XP; accepted/undeployed cards use the new award when deployed. Historical earned/pending XP is preserved.

## First-time operational development

Use organization-wide category milestones rather than repeated XP for every purchased copy:

| First funded operational achievement | Guild XP |
| --- | ---: |
| Owned headquarters | 80 |
| Staffed outpost | 80 |
| Facility of each type | 30 |

An owned HQ must be the current headquarters, Operational and have its current property invoice paid. An outpost needs fully paid current property upkeep and an available, paid chief. Facilities require funded current service and operational local management. Construction completion or immediately paused staff alone awards no XP. Earned awards remain pending until ordinary Advancement.

Additional properties/facilities retain their normal services/capacity; they do not repeat category XP. Existing/inherited categories, including the Staffed starter's Training Suite, count as established without retroactive awards. Existing/pending construction that has not installed remains eligible to establish a genuinely new category when funded.

## Multi-action officer activities

All activities use the **one shared pool**. A player may contribute their reserved action to a jointly chosen activity; the named officer leads one check. No personal officer ceiling or extra NPC-chief actions are introduced.

| Activity | Officer / eligibility | Cost | Four-degree effect |
| --- | --- | --- | --- |
| Launch a Sector Campaign | Commander, trained Diplomacy, Guild3 | 2 actions;100 credits | Reputation −2 / 0 / +5 / +8 |
| Prepare an Operations Briefing | Operations, trained Survival or Computers, Guild3 | 2 actions;25 credits per operative | CF −1 Engagement; F none; S +1 circumstance to all three phases; CS +2 to all three |
| Run an Intensive Training Block | Personnel, trained Medicine, Guild6; funded local Training Suite | 2 actions;50 credits per operative in funded suite | No check:225 operative XP after one30-day block |
| Establish an Extraction Contingency | Operations, trained Medicine or Survival, Guild4 | 3 actions;25% quoted squad wages, rounded up to5 | CF/F zero charges; S one; CS two |

The browser uses the existing four PC portfolios for officer eligibility: Navasi Commander, Iseph Quartermaster, Dae Operations, Chk Chk Personnel. Additional PCs repeat those fixture portfolios. Briefing permits Survival because the default Operations officer has that training. These are selected prototype cards; full office advancement and Reorganize Command remain separate queued work.

- One public promotion **or** Sector Campaign per guild/turn. No direct Guild XP from either.
- Briefing uses the same one-attempt preparation slot as Recon. Highest circumstance bonus only; extra personnel/leader bonuses do not stack with a lower briefing bonus.
- Briefing and contingency require an accepted, undeployed job. They lock squad membership, all three leads and optional leader through the plan's expiry at end next turn. Deployment remains separate routine administration and uses the locked assignment. The browser preselects that assignment.
- Intensive trainees are unavailable for this month, return automatically next Upkeep and receive225 XP. Each person can start once every three turns; no consecutive multiplier or continuation choice. Funded suite capacity is shared with ordinary cohorts.
- One contingency per guild/turn and per job. Apply final complications at settlement: first convert Missing to printed-severity Recovering, then halve a repair bill rounded up. One charge per prevented loss or reduced repair. This does not alter phase degrees, completion count, payout, mandatory recovery or other injuries. Rerolls precede charge use.
- One morale program and one recovery protocol attempt per operative/turn. Repeating a failed attempt on unchanged facts cannot consume the entire surplus pool. Other network searches remain possible; contact/market gating is not implemented here.

## Administrative prototype benchmark

The browser's fixed+10 trained PC fixture was inappropriate against rising management DCs. For a trained PC administrative roll, displayed modifier = stored skill modifier + current administrative DC −15. Untrained checks and hired chiefs keep their actual stored modifiers. Search checks still use the searched mission level's DC.

This is an explicit **demo benchmark**, not published PC advancement or automatic proficiency growth. It keeps ordinary management odds coherent while the prototype lacks full PC sheets. Foundry should read actual actor levels/skills. Every administrative roll continues to show face, modifier, total, DC and degree.

## Exceptional Performance

All three **final accepted** phase degrees at Critical Success produce visible exceptional-performance guidance in settlement/log results. Rerolled final results count; an original Critical Success replaced by a lower result does not.

For meaningful nontrivial work, the GM may manually award **one Hero Point to one PC** whose leadership/preparation contributed. Routine/Trivial work normally does not warrant that award. There is no automatic cash multiplier, Guild XP, operative XP or Hero Point award. Existing GM award controls, cap3 and table-session clocks remain. No point is promised back after a reroll.

## Confirmed fixes

**Relocation:** only Available local crew become In Transit. Missing, Captured and Dead retain status and historical base information; normal relocation never resolves a rescue. Existing deployment/recovery/training/onboarding/construction restrictions remain.

**Trusted/Standing:** one shared per-turn free-acquisition allowance, regardless of acceptance order or standing-card age. A standing card automatically requests that allowance if still available; otherwise acceptance costs the ordinary action. Explicitly requesting an unavailable Trusted waiver rejects before mutation. The separate free-acquisition A/B setting remains free by design.

## Verification and progression comparison

**112 checks** passed, including an actual0.3.9 partial mission migration, frozen old Guild XP, funded/repeated milestones, absent-person relocation, order/card-age waiver regressions, four activity mechanics, failure atomicity, final-critical guidance and minimal-DOM plan/training/result flows. Existing48 campaigns over288 intervals remain in the regression suite.

| Completed study | Attempts | Level10 results |
| --- | ---: | --- |
| Ordinary balanced, initial four Hero Points | 64, seeds0–63,120 months | 64 reached; median48 months; range42–60;0 censored/errors |
| Ordinary balanced, manual monthly session reset sensitivity | 64, same seeds,120 months | 64 reached; median46; range42–56;0 censored/errors |
| Adapted cash-focused optimizer | 8, seeds1–8,90 months | 8 reached; median39.5; fastest36;0 censored/errors |
| Adapted low-level farming optimizer | 8, same seeds,90 months | 8 reached; median60; fastest59;0 censored/errors |

These reused seeds are not independent population samples. Optimizer public scoring uses the new quoted Guild XP and filters already-treated recovery targets; other policy behavior remains. Neither policy optimizes the newly added activities. The reported fastest36 is only the shortest found in this small revised cohort. Ordinary seed7 replay with the latest engine exactly matched the saved full reference run.

This moves ordinary progression into the lower end of the designer's48–72-month band, while allowing faster skilled growth. It does **not** establish a hard five-year minimum or final balance. Long-run simulated cash grows substantially; higher-level financial sinks and the salary curve remain prototype concerns. Early900/110 economics are retained.

Full real-browser visual QA was unavailable because control-browser is not exposed. Engine and minimal-DOM checks do not establish visual layout quality. Human playtesting remains necessary.

## Publication and reproduction

- Live: https://contract-operations-playtest.primeangel2.chatgpt.site
- Site source: `978f0c0b16fbf16aa5631732c5508b219727a4ff`
- Deployment: `appgdep_6acd5a8e74008191b7774b228c3a8a3e`, **succeeded**
- Version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_00528a98c5d08191b2f0511e435152db`
- [Frozen values, verification and campaign evidence](../playtests/prototype-0.3.10/README.md)
- [Current source/tests](../prototypes/browser-playtest/README.md)

Refresh to load the new scripts. Existing browser saves migrate in place; New playtest → Staffed starter gives a clean comparison. No existing settled job is replayed.

Still queued: rescue/continuity and retained-worker release/suspension, complete office/specialist/restructuring implementation, market-based discovery repetition, fuller financial consequences and Foundry. No module compatibility claim.


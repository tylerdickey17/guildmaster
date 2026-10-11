# System A: Personnel

Status: initial design record, October 10, 2026. Read the [decision log](design-decisions.md) for evidence and the [README](../README.md) for status definitions.

## Design intent

Mercenaries develop through contract work. Higher levels bring higher pay, creating a cost to advancement. A strong individual does not necessarily make the best team; concentrating advancement in one NPC is allowed, with squad composition remaining a player consideration.

The available source establishes the advancement core, the direction of personnel pay, and the loyalty and availability framework. The subsystem still needs numerical balancing and resolution procedures before it is playable.

## Confirmed decisions

### Advancement

| Rule | Decision |
| --- | --- |
| Every level requires 1,000 XP. | A-001 |
| All participating mercenaries receive equal base contract XP, regardless of their individual levels. Bonus XP can make their total awards differ. | A-002 |
| A squad leader can earn a leadership XP bonus; an operative whose expertise contributes to mission success can earn an MVP XP bonus. | A-003 |
| The same operative can receive both leadership and MVP bonuses on one contract. | A-004 |

The bonus categories and stacking are confirmed. Their amounts, precise eligibility conditions, and award procedure are deferred. No critical-success trigger or automatic award system has been approved in the available source.

### Personnel pay

Higher-level mercenaries must be paid more. Advancement therefore increases personnel cost. **A-005**

This establishes the direction of the pay scale, not its shape. Neither a linear scale nor a progressively steeper scale has been chosen. No rates, currency amounts, or timing for a raise have been set.

### Team development

Players may concentrate bonus XP on one NPC when that NPC qualifies for both awards. There is no approved anti-stacking restriction or forced equalization of total XP. The user's stated expectation is that investing in one NPC does not necessarily produce the best team. **A-004**

### Loyalty and daily availability

Each NPC has a loyalty score or level. Higher loyalty makes that NPC less likely to work for a rival guild and therefore less likely to be deployed on a rival guild's mission. The loyalty scale and the relationship between score and probability remain to be designed. **A-006**

At the start of each in-game day, each NPC receives an automatic status roll to determine availability or deployment. The roll must account for loyalty when determining rival-guild deployment. The roll procedure and its interaction with ongoing missions and other statuses are deferred. **A-007**

The design distinguishes these availability and deployment states. Names below are descriptive documentation labels; final interface wording can be chosen later. **A-008**

| State | Meaning |
| --- | --- |
| Available | The NPC is available for the player's guild to deploy. |
| Deployed — Guild Mission | The NPC is deployed on a mission for the player's guild. |
| Deployed — Rival Guild Mission | The NPC is deployed on a mission for a rival guild. |

The two deployment states must remain distinguishable. The available source does not yet specify whether the daily roll assigns a new mission for the player's guild or merely reflects a deployment already assigned by the players.

### Rival missions, capture, and rescue

An NPC deployed by a rival guild can be captured during that mission. That capture still generates a rescue mission for the party, even though the NPC was working for another guild. Capture is a possible mission outcome; it is not an additional confirmed direct result of the daily availability roll. **A-009**

If the party successfully rescues that NPC, the rescued NPC receives a large loyalty bonus. The magnitude of that bonus, its timing, and any maximum loyalty limit are deferred. **A-010**

This connects roster availability to adventuring: rival deployment can lead to capture, capture creates a rescue mission, and a successful rescue substantially strengthens the NPC's loyalty to the player's guild. The exact capture and rescue procedures remain open.

## Provisional details from the assistant's recap

These details appeared in the conversation but lack explicit user confirmation in the retrieved portion. They are recorded here for review rather than treated as settled rules.

| Detail | Decision | Remaining question |
| --- | --- | --- |
| Each mercenary tracks XP individually; XP beyond the level threshold carries over. | P-001 | Confirm the bookkeeping and carryover rule. |
| Personnel receive a per-contract rate based on level. | P-002 | Confirm the payment basis and when a newly earned level changes pay. |

The financial model previously recorded as provisional **P-003** is now confirmed by **B-006**: company profit equals contract payout minus squad pay minus overhead. See [System B](system-b-contracts.md). System E now confirms asset-based monthly overhead, upgrade effects, and completion-based contract income. Numerical rates and ordinary mercenary payment terms remain deferred; NPC officer salaries are a separate confirmed monthly obligation. The personnel advancement rules above are unchanged.

## Deferred mechanics

- **XP rewards:** base XP by contract, leadership and MVP amounts, exact qualifying outcomes, treatment of unsuccessful or incomplete contracts, and who determines awards. **D-001**
- **Pay and balancing:** rates by level, scale shape, payment timing, and the relationship between squad cost and contract payout. **D-002**
- **Starting personnel and Leader Abilities:** the source recap leaves the starting roster and individual abilities for later. **D-003**
- **Contract design:** [System B](system-b-contracts.md) and [System C](system-c-mission-resolution.md) now document the confirmed frameworks. Numerical difficulty, rewards, overall outcome procedures, and remaining personnel interactions are deferred. **D-004 / D-009 through D-013**
- **Loyalty scale:** starting score, range or tiers, limits, how loyalty modifies rival-deployment probability, other ways to gain or lose loyalty, and the size of the rescue bonus. **D-006**
- **Daily status procedure:** dice or random method, probabilities, eligible NPCs and treatment of ongoing deployments or captivity, mission duration and return timing, and the relationship between the roll and player-assigned guild missions. **D-007**
- **Rival-mission capture and rescue:** how and when rival mission outcomes are resolved, capture probability, rescue-mission generation and resolution, and post-rescue availability. **D-008**

No placeholder numbers in these areas should be used as approved rules.

## Earlier decisions awaiting source recovery

The assistant's recap says that NPC statistics, recruitment, statuses, and leadership had been discussed. The actual earlier decisions were not returned by the conversation reader. **G-001**

| Topic | Material needed before documentation can be completed |
| --- | --- |
| NPC statistics | The approved statistic model and how it changes with advancement. |
| Recruitment | The approved recruitment process and any limits or costs. |
| Statuses | The earlier status list, effects, and transitions beyond the availability and two deployment states confirmed above. Reconcile those earlier rules with loyalty, daily rolls, and capture. |
| Leadership | Leader selection, qualifications, and effects beyond the confirmed XP bonus. |

Recover these decisions before adding rules for these topics. A source gap is not permission to redesign an already agreed mechanic.

## Future implementation boundary

Foundry VTT v14 is a future implementation target. This phase adds no module manifest, source code, data schema, automation, or implementation scaffolding. The automatic daily status roll is a confirmed gameplay requirement; its Foundry implementation is deferred. How the module advances in-game days, records rival mission outcomes, generates rescue missions, and applies rescue loyalty bonuses will be designed later. **A-007 / D-005 / R-001**

Performance-based MVP triggers and automatic XP calculation remain suggestions. **P-004**

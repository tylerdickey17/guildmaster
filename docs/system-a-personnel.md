# System A: Personnel

> **Latest officer and staffing design:** [Officer positions and outpost staffing](officers-and-staffing.md) records founding/specialist offices, exclusive action concepts, staffing and **Reorganize Command (1 action, Activity, once per turn)**. This later tabletop draft supersedes conflicting office-access and role-change text below; browser 0.3.3 does not implement it yet.

> **Latest accepted employment rules:** [Free Agents and Retained Operatives](personnel-employment.md). Retainers are Upkeep overhead; mission wages settle in Events. This later design checkpoint is recorded but not yet in browser0.3.3. See the [session handoff](session-checkpoint-2026-10-11.md).

> **Current numerical prototype:** [0.3.1 revisions](prototype-values-v0.3.1.md) plus the [full0.3.0 catalog](prototype-values-v0.3.md). Historical numerical deferrals below are superseded where those packs supply a value. See the [simulation report](prototype-simulation-report-v0.3.md) for evidence and limits.

> **Current playtest authority:** [Integration rules pass 0.2](integration-rules-v0.2.md) resolves the remaining procedures under the user's delegated design authority. It supersedes conflicting provisional clocks/deferrals below; the earlier checkpoint remains history. See [regression walkthroughs](integration-regression-v0.2.md) for verification limits.


## Current integration rules (October 10, 2026)

Current personnel integration: [INT-007 and INT-012–015](integration-checkpoint.md) govern recovery, recovered historical rules, recruitment, Leader Feats, and training. One primary status; default training is 30 days with next-turn availability and a consecutive-training bonus whose amount is deferred. Recruitment uses Diplomacy and 0/1/2/3 candidates by degree; Recruit Operative hires one for one action. Level 5 grants a Leader Feat. Deployment pay quotes are fixed for the assignment; failed jobs retain participation XP and permit full/half/no contractor pay with corresponding Loyalty effects. Candidate offer/start clocks remain provisional. G-001 is partially recovered from summaries, not closed by a full original transcript.

**Precedence and history:** the accepted rules in the linked integration checkpoint supersede any conflicting baseline deferral below. The remaining text is retained as the pre-integration framework and evidence; an old “unresolved” statement does not undo an accepted INT rule. Unaddressed deferrals still apply.

## Accepted employment addition (October11,2026)

Free Agents are nonexclusive and available as a recruitment category at every Reputation tier. Higher Reputation opens recruitment of Retained Operatives, who have exclusive agreements, monthly retainers and reduced assignment pay. Loyalty still affects free-agent preference/rival work and retained-worker morale/renewal. Employment type does not replace availability status. Retainer and assignment rates, exact access threshold, conversions and missed-retainer escalation need balancing; see [the employment rules](personnel-employment.md).

## Pre-integration framework


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

### Loyalty and availability

Each NPC has a loyalty score or level. Higher loyalty makes that NPC less likely to work for a rival guild and therefore less likely to be deployed on a rival guild's mission. The loyalty scale and the relationship between score and probability remain to be designed. **A-006**

Rival recruitment and deployment now occur exclusively through visible Guild Events in [System G](system-g-events-rival-guilds.md), with loyalty influencing the outcome. This supersedes the rival-deployment portion of the earlier automatic daily status roll, **A-007**; its original wording remains in the decision log. Any remaining non-rival daily availability procedure is unresolved and cannot serve as a separate rival-deployment roll. **SG-007 / SG-008 / D-007**

The design distinguishes these availability and deployment states. Names below are descriptive documentation labels; final interface wording can be chosen later. **A-008**

| State | Meaning |
| --- | --- |
| Available | The NPC is available for the player's guild to deploy. |
| Deployed — Guild Mission | The NPC is deployed on a mission for the player's guild. |
| Deployed — Rival Guild Mission | The NPC is deployed on a mission for a rival guild. |

The two deployment states must remain distinguishable. Players assign Standard Contracts to NPCs under System B; rival work arises through System G events. Status persistence, return timing, and the remaining non-rival daily procedure are deferred.

### Rival missions, capture, and rescue

An NPC deployed by a rival guild can be captured during that mission. That capture still generates a rescue mission for the party, even though the NPC was working for another guild. Rival mission outcomes, including capture, are handled through System G events without simulating a rival squad or its contract checks. **A-009 / SG-008**

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
- **Availability procedure:** any remaining non-rival daily procedure, eligible NPCs, persistence of ongoing deployments/captivity, and mission duration/return timing. Rival work must arise through System G events, not a silent daily roll. **D-007**
- **Rival-mission capture and rescue:** event timing and resolution details, capture probability, rescue-mission generation and resolution, and post-rescue availability. The event-driven framework is confirmed; outcome formulas remain deferred. **D-008 / SG-008**

No placeholder numbers in these areas should be used as approved rules.

## Earlier decisions awaiting source recovery

The assistant's recap says that NPC statistics, recruitment, statuses, and leadership had been discussed. The actual earlier decisions were not returned by the conversation reader. **G-001**

| Topic | Material needed before documentation can be completed |
| --- | --- |
| NPC statistics | The approved statistic model and how it changes with advancement. |
| Recruitment | The approved recruitment process and any limits or costs. |
| Statuses | The earlier status list, effects, and transitions beyond the availability and two deployment states confirmed above. Reconcile those earlier rules with loyalty, event-driven rival deployment, and capture. |
| Leadership | Leader selection, qualifications, and effects beyond the confirmed XP bonus. |

Recover these decisions before adding rules for these topics. A source gap is not permission to redesign an already agreed mechanic.

## Future implementation boundary

Foundry VTT v14 is a future implementation target. This phase adds no module manifest, source code, data schema, automation, or implementation scaffolding. The current rival-activity requirement is visible event-driven competition, superseding the rival-deployment part of A-007. How a future module advances time, records events and rival mission outcomes, generates rescue missions, and applies rescue loyalty bonuses will be designed later. **SG-007 / SG-008 / D-005 / R-001**

Performance-based MVP triggers and automatic XP calculation remain suggestions. **P-004**


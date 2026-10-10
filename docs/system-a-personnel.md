# System A: Personnel

Status: initial design record, October 10, 2026. Read the [decision log](design-decisions.md) for evidence and the [README](../README.md) for status definitions.

## Design intent

Mercenaries develop through contract work. Higher levels bring higher pay, creating a cost to advancement. A strong individual does not necessarily make the best team; concentrating advancement in one NPC is allowed, with squad composition remaining a player consideration.

The available source establishes the advancement core and the direction of personnel pay. It does not provide a complete, playable personnel subsystem.

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

## Provisional details from the assistant's recap

These details appeared in the conversation but lack explicit user confirmation in the retrieved portion. They are recorded here for review rather than treated as settled rules.

| Detail | Decision | Remaining question |
| --- | --- | --- |
| Each mercenary tracks XP individually; XP beyond the level threshold carries over. | P-001 | Confirm the bookkeeping and carryover rule. |
| Personnel receive a per-contract rate based on level. | P-002 | Confirm the payment basis and when a newly earned level changes pay. |
| Company profit equals contract payout minus squad pay minus overhead. | P-003 | Confirm this accounting model and define overhead. |

## Deferred mechanics

- **XP rewards:** base XP by contract, leadership and MVP amounts, exact qualifying outcomes, treatment of unsuccessful or incomplete contracts, and who determines awards. **D-001**
- **Pay and balancing:** rates by level, scale shape, payment timing, and the relationship between squad cost and contract payout. **D-002**
- **Starting personnel and Leader Abilities:** the source recap leaves the starting roster and individual abilities for later. **D-003**
- **Contract design:** mission structure, resolution, difficulty, rewards, and their interaction with personnel require later documentation. **D-004**

No placeholder numbers in these areas should be used as approved rules.

## Earlier decisions awaiting source recovery

The assistant's recap says that NPC statistics, recruitment, statuses, and leadership had been discussed. The actual earlier decisions were not returned by the conversation reader. **G-001**

| Topic | Material needed before documentation can be completed |
| --- | --- |
| NPC statistics | The approved statistic model and how it changes with advancement. |
| Recruitment | The approved recruitment process and any limits or costs. |
| Statuses | The approved status list, effects, and transitions. |
| Leadership | Leader selection, qualifications, and effects beyond the confirmed XP bonus. |

Recover these decisions before adding rules for these topics. A source gap is not permission to redesign an already agreed mechanic.

## Future implementation boundary

Foundry VTT v14 is a future implementation target. This phase adds no module manifest, source code, data schema, automation, or implementation scaffolding. Performance-based MVP triggers and automatic XP calculation remain suggestions, not implementation requirements. **P-004 / R-001**

# System D: Guild Development

Status: confirmed framework, October 10, 2026; numerical balancing and the procedures listed below remain deferred. See the [decision log](design-decisions.md) for evidence and the [README](../README.md) for status definitions.

## Independent guild advancement

The guild has its own **Guild Level, from 1 to 10**, independent of PC and individual mercenary levels. It earns **Guild XP from contracts and organizational development**. Reaching a level threshold automatically advances the guild and grants that level's benefits. **SD-001 / SD-002**

The guild gains **guild feats at levels 2, 4, 6, 8, and 10**. The feat list, selection rules, level benefits, XP thresholds, and award amounts still need design and balancing. System A's 1,000 XP per mercenary level does not establish a Guild XP threshold. **SD-003 / D-014**

Guild Level interacts with borrowing capacity in [System E](system-e-finances.md) and simultaneous construction capacity in [System F](system-f-bases-facilities.md). Those relationships are confirmed; no capacity table or formula is assigned yet.

## Reputation

Reputation is a **numerical score** expressed through five tiers, in ascending order. A new guild starts at **Neutral**. **SD-004**

| Tier | Position |
| --- | --- |
| Unfriendly | Below the starting tier. |
| Neutral | Starting tier. |
| Friendly | Above Neutral. |
| Honored | Above Friendly. |
| Exalted | Highest tier. |

Reputation can rise or fall. A decline affects **new opportunities**, without removing or invalidating **existing assets** merely because the guild no longer meets an opportunity's reputation requirement. Debt enforcement and repossession remain separate consequences under System E. **SD-005**

The numerical starting score, tier thresholds, score limits, gains/losses, and precise opportunity requirements remain deferred. Reputation is distinct from Guild XP, Guild Level, and each NPC's loyalty; no conversion between them is established. **D-015**

## Required officers and delegation

Officers are **required organizational roles**, filled by PCs or **salaried NPCs**. Delegating responsibilities to NPC officers reduces the PCs' management burden and lets the guild operate while the PCs adventure. NPC officer salaries are recurring monthly obligations under System E. **SD-006**

The officer roster, qualifications, vacancy consequences, and salary amounts remain unresolved in this record. Do not infer a mandatory list of titles or treat every mercenary as a salaried officer. **D-016**

An existing officer can manage construction, but suspends normal duties while assigned to that project. A PC managing construction spends downtime. Temporary contractors and salaried project managers provide additional options; see System F.

## Monthly Guild Turns

A **Guild Turn represents one in-game month** and runs concurrently with adventures. It does **not require universal party downtime**. Officer delegation supports that concurrent operation; a specific task may still require a particular PC's downtime. **SD-007**

- **Standard Contracts:** players assign NPCs and resolve their contracts during Guild Turns using Systems B/C.
- **Priority Contracts:** full adventures the PCs can participate in, potentially spanning multiple sessions. Session count does not itself determine elapsed in-game months.
- **Finances:** recurring salaries and overhead are paid monthly; contract pay arrives on completion.
- **Construction:** project duration is measured in monthly Guild Turns.

System A's daily personnel status rules continue on the daily timescale. Monthly Guild Turns do not replace them. Exact ordering of contract completion, expenses, advancement, and construction progress, along with partial-month handling and interaction with ongoing deployments, remains deferred. **D-017**

## Deferred design and balancing

- **Advancement:** Guild XP thresholds and awards, qualifying development milestones, all level benefits, and feat content/selection. **D-014**
- **Reputation:** numerical range, starting score, tier boundaries, gains/losses, and specific opportunity requirements. **D-015**
- **Officers:** roles, qualifications, vacancies, delegation procedures, salary values, and consequences of suspended duties. **D-016**
- **Timing:** order within a Guild Turn, partial months, daily/monthly interactions, and project or contract completion across turns. **D-017**

This is tabletop design documentation. Foundry implementation remains deferred.

## Guild Actions (confirmed framework — October 10, 2026)

Each monthly Guild Turn grants a **shared pool of Guild Actions**, with the pool increasing as **Guild Level** rises. Guild Actions represent deliberate organizational initiatives, distinct from routine operations.

- **Every Guild Action requires assignment to an available Guild Officer** (PC or NPC).
- NPC officers can carry out assigned actions while the PCs adventure.
- Officers occupied by construction or other conflicting assignments cannot perform their regular Guild Actions.
- Paying payroll/overhead, continuing approved construction, and resolving already deployed contracts are **automatic operations** and do not consume Guild Actions.
- The number of actions by level, action catalog, officer action capacity, scheduling, and qualification requirements are **deferred**. A shared pool does not imply that an officer can perform unlimited actions.

This addition supplements SD-006/SD-007 and does not change the established monthly calendar or construction staffing rules. **SD-008**

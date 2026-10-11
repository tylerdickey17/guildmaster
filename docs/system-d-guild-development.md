# System D: Guild Development

> **Latest officer and staffing design:** [Officer positions and outpost staffing](officers-and-staffing.md) records founding/specialist offices, exclusive action concepts, staffing and **Reorganize Command (1 action, Activity, once per turn)**. This later tabletop draft supersedes conflicting office-access and role-change text below; browser 0.3.3 does not implement it yet.

> Current pool, starting PC officers and failed-pay Loyalty are superseded where conflicting by [the0.3.3 live-play patch](prototype-values-v0.3.3.md). Older evidence and decisions remain for provenance.

> **Current numerical prototype:** [0.3.1 revisions](prototype-values-v0.3.1.md) plus the [full0.3.0 catalog](prototype-values-v0.3.md). Historical numerical deferrals below are superseded where those packs supply a value. See the [simulation report](prototype-simulation-report-v0.3.md) for evidence and limits.

> **Current playtest authority:** [Integration rules pass 0.2](integration-rules-v0.2.md) resolves the remaining procedures under the user's delegated design authority. It supersedes conflicting provisional clocks/deferrals below; the earlier checkpoint remains history. See [regression walkthroughs](integration-regression-v0.2.md) for verification limits.


## Current integration rules (October 10, 2026)

Current guild integration: [INT-001, INT-003, INT-005, INT-010 and INT-016](integration-checkpoint.md) establish Upkeep → Commerce → Activity → Events & Advancement, next-turn Guild Level capacity benefits, shared level-growing pool, strategic acquisition versus free deployment, and unique development milestones. Two actions per officer is the selected provisional test baseline. See the [basic/trained action catalog](guild-actions.md); most costs/benefits and the action growth schedule remain deferred. Meaningful upgrades can award new development XP; repair/reinstallation/relocation cannot repeat an existing award.

**Precedence and history:** the accepted rules in the linked integration checkpoint supersede any conflicting baseline deferral below. The remaining text is retained as the pre-integration framework and evidence; an old “unresolved” statement does not undo an accepted INT rule. Unaddressed deferrals still apply.

## Pre-integration framework


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

The numerical starting score, tier thresholds, score limits, gains/losses, and precise opportunity requirements remain deferred. Reputation is distinct from Guild XP, Guild Level, each NPC's loyalty, and the relationship with an individual rival in [System G](system-g-events-rival-guilds.md); no conversion between them is established. **D-015**

## Required officers and delegation

Officers are **required organizational roles**, filled by PCs or **salaried NPCs**. Delegating responsibilities to NPC officers reduces the PCs' management burden and lets the guild operate while the PCs adventure. NPC officer salaries are recurring monthly obligations under System E. **SD-006**

The officer roster, qualifications, vacancy consequences, and salary amounts remain unresolved in this record. Do not infer a mandatory list of titles or treat every mercenary as a salaried officer. **D-016**

An existing officer can manage construction, but suspends normal duties while assigned to that project. A PC managing construction spends downtime. Temporary contractors and salaried project managers provide additional options; see System F.

## Guild Actions

Each monthly Guild Turn grants a **shared pool of Guild Actions**, with the pool increasing as **Guild Level** rises. Guild Actions represent deliberate organizational initiatives, distinct from routine operations.

- **Every Guild Action requires assignment to an available Guild Officer** (PC or NPC).
- NPC officers can carry out assigned actions while the PCs adventure.
- Officers occupied by construction or other conflicting assignments cannot perform their regular Guild Actions.
- Paying payroll/overhead, continuing approved construction, and resolving already deployed contracts are **automatic operations** and do not consume Guild Actions.
- The number of actions by level, action catalog, officer action capacity, scheduling, and qualification requirements are **deferred**. A shared pool does not imply that an officer can perform unlimited actions.

This framework supplements SD-006/SD-007. The action pool is shared across the guild, not granted separately to each officer. Automatic operations still require their established funding, staffing, elapsed time, and resolution procedures: an already deployed Standard Contract still uses System C, and ongoing construction still needs its manager. **SD-008**

Whether starting a new project, deploying a new contract, or responding to a Decision Event costs a Guild Action remains part of the deferred action catalog; no cost is assigned here. **D-028**

## Monthly Guild Turns

A **Guild Turn represents one in-game month** and runs concurrently with adventures. It does **not require universal party downtime**. Officer delegation supports that concurrent operation; a specific task may still require a particular PC's downtime. **SD-007**

- **Standard Contracts:** players assign NPCs and resolve their contracts during Guild Turns using Systems B/C.
- **Priority Contracts:** full adventures the PCs can participate in, potentially spanning multiple sessions. Session count does not itself determine elapsed in-game months.
- **Finances:** recurring salaries and overhead are paid monthly; contract pay arrives on completion.
- **Construction:** project duration is measured in monthly Guild Turns; ongoing approved projects do not consume Guild Actions.
- **Guild Actions:** a shared pool increases with Guild Level; each action needs an available assigned PC or NPC officer.
- **Guild Events:** at least one occurs each month under [System G](system-g-events-rival-guilds.md); scaling beyond that minimum is pending simulations.

Rival competition and rival deployment occur through visible Guild Events under System G, superseding the rival-deployment portion of System A's earlier daily status roll. Any remaining non-rival daily availability procedure is unresolved; it cannot silently remove personnel for rival work. Exact ordering of Guild Actions, the Event Phase, contract completion, expenses, advancement, and construction progress, along with partial-month handling, remains deferred. **SG-007 / D-007 / D-017**

## Deferred design and balancing

- **Advancement:** Guild XP thresholds and awards, qualifying development milestones, all level benefits, and feat content/selection. **D-014**
- **Reputation:** numerical range, starting score, tier boundaries, gains/losses, and specific opportunity requirements. **D-015**
- **Officers:** roles, qualifications, vacancies, delegation procedures, salary values, and consequences of suspended duties. **D-016**
- **Timing:** order of actions, events, and automatic operations within a Guild Turn, partial months, daily/monthly interactions, and project or contract completion across turns. **D-017**
- **Guild Actions:** counts by Guild Level, action catalog and costs, officer limits/qualifications, scheduling and conflicts, and interaction with Decision Events. **D-028**

This is tabletop design documentation. Foundry implementation remains deferred.


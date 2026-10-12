# System B: Contracts

> **Latest browser content:** [0.3.11](prototype-values-v0.3.11.md) implements30 archetypes across the ten categories below, procedural titles/lore dossiers and persisted generation. Use the latest prototype for executable values; older framework sections retain provenance.

> **Current numerical prototype:** [0.3.1 revisions](prototype-values-v0.3.1.md) plus the [full0.3.0 catalog](prototype-values-v0.3.md). Historical numerical deferrals below are superseded where those packs supply a value. See the [simulation report](prototype-simulation-report-v0.3.md) for evidence and limits.

> **Current playtest authority:** [Integration rules pass 0.2](integration-rules-v0.2.md) resolves the remaining procedures under the user's delegated design authority. It supersedes conflicting provisional clocks/deferrals below; the earlier checkpoint remains history. See [regression walkthroughs](integration-regression-v0.2.md) for verification limits.


## Current integration rules (October 10, 2026)

Current contract integration: [INT-002–004](integration-checkpoint.md) govern card-specific 1/2/3 phase-success thresholds, participation XP plus a completion bonus, no client cash for failure, failure Reputation loss, and optional failed-job contractor payment. Secure Contract costs one action; deployment is routine. Available → Accepted → In Progress → Resolved. Exclusive is a trait independent of Standard/Priority: harder, greater rewards, disclosed completion deadline, failure/Reputation loss if missed after acceptance. Ordinary expiration alone does not hurt Reputation. Progression can offer leads or qualifying action-free acquisition with optional acceptance. Interruption, critical-success weighting, and Priority acquisition details remain open.

**Precedence and history:** the accepted rules in the linked integration checkpoint supersede any conflicting baseline deferral below. The remaining text is retained as the pre-integration framework and evidence; an old “unresolved” statement does not undo an accepted INT rule. Unaddressed deferrals still apply.

## Pre-integration framework


Status: confirmed framework, October 10, 2026; numerical balancing and the procedures listed below remain deferred. See the [decision log](design-decisions.md) for evidence and the [README](../README.md) for status definitions.

## Design intent

The job board gives players contracts to evaluate against their roster, available time, likely rewards, and deployment costs. Contract cards make the mission's risks and outcomes visible before players commit a squad. [System C: Mission Resolution](system-c-mission-resolution.md) resolves Standard Contracts through three phase checks; [System A: Personnel](system-a-personnel.md) governs personnel advancement, pay, and loyalty.

## Confirmed framework

### Standard and Priority Contracts

Contracts have two forms. **B-007**

| Form | Participants and resolution |
| --- | --- |
| Standard Contract | Players assign NPCs and complete the contract during Guild Turns using the established System C mechanics. |
| Priority Contract | A full adventure that PCs can actually participate in, potentially over multiple sessions. |

These forms are separate from the ten job categories below. Priority Contracts are played as adventures; the Standard Contract three-check procedure is not a replacement for that play. The contract-card phase/check requirements below describe Standard Contracts. Exact Priority adventure presentation, reward design, and connections to NPC assignments remain deferred. “Standard reward” in System C means the recommended-deployment baseline, not a contract form. **D-027**

Monthly Guild Turns run concurrently with adventures and do not require universal party downtime; see [System D](system-d-guild-development.md). Completing a Standard Contract during a Guild Turn does not establish that all contracts have a one-month duration.

### Job board and categories

Contracts are offered through a job board. The ten categories are **B-001 / B-002**:

1. Bounty Hunting
2. Security
3. Espionage
4. Rescue
5. Salvage
6. Exploration
7. Smuggling
8. Sabotage
9. Investigation
10. Transport

A category does not prescribe one universal check or outcome table. Each Standard Contract defines its own phase checks and consequences. Board size, refresh timing, generation, and access rules remain deferred.

Rival claims on available contracts occur exclusively through visible [System G events](system-g-events-rival-guilds.md). The event identifies the affected contract and rival and explains the change to players; a silent random board refresh must not remove a contract as rival competition. Ordinary board generation/refresh procedures remain deferred. **SG-003 / SG-007**

### Contract cards

Every Standard Contract card includes the following information. This is a tabletop content framework, not a software schema. **B-003 / C-003 / C-006**

| Card information | Established requirement |
| --- | --- |
| Contract category and mission | Identify the type of job and what the squad is attempting. |
| Three phases | Insertion, Engagement, Extraction, in that order. |
| Phase checks | Specify the contract-specific skill/stat check for each phase and its difficulty. Use the operatives' relevant Starfinder 2e statistics/proficiencies; exact DCs remain TBD. |
| Squad size | Minimum, recommended, and maximum personnel count. |
| Squad level | Minimum, recommended, and maximum squad level; the method of calculating squad level remains TBD. |
| Duration | State the contract's in-game duration. Duration values and timing procedures remain TBD. |
| Rewards | State the advertised rewards for recommended deployment and identify applicable deployment adjustments when balanced. |
| Visible outcomes | Openly show critical success, success, failure, and critical failure, with consequences for every phase. |
| Continuing effects | Identify which later phase or phases each consequence or DC adjustment affects, and how long it lasts. |

The requirement to show difficulty, rewards, and consequences is established. This document does not supply playable DCs, reward amounts, or deployment modifiers.

### Varied rewards

Contracts can offer different combinations of **credits, XP, reputation, loyalty, and recruitment opportunities**. These are available reward types, not a requirement that every contract award all five. Their quantities and eligibility conditions remain deferred. Contract pay is received on completion under System E; timing for other rewards remains unresolved. **B-004**

System A's advancement rules still apply: participating NPCs receive equal base contract XP regardless of individual level, leadership and MVP/expertise bonuses can stack, and each level requires 1,000 XP. Deployment-based reward changes do not establish a new individual-level XP distribution rule. Whether deployment adjustments affect XP or other non-credit rewards is still TBD. **A-001 through A-004 / C-007 / D-013**

Guild XP is a separate advancement track awarded for contracts and organizational development under [System D](system-d-guild-development.md). The 1,000 XP threshold above applies to mercenaries, not the guild.

Recruitment opportunities can be contract rewards; the wider recruitment process, costs, and roster limits are not settled here.

### Rescue contracts

Captured mercenaries can create rescue contracts. This includes the established System A case: an NPC captured while deployed by a rival guild still generates a rescue mission for the party. A successful party rescue grants that rescued NPC a large loyalty bonus. **B-005 / A-009 / A-010**

This connection does not replace the party-rescue rule or decide whether a delegated squad rescue receives the same loyalty award. Capture procedures, rescue generation details, and which rescues become Priority adventures versus Standard NPC assignments remain deferred. **D-008**

### Contract finances

**Company profit = contract payout − squad pay − overhead.** **B-006**

The accounting model is confirmed. Higher-level personnel cost more under System A, so squad strength must be weighed against retained profit. Reward adjustments for underdeployment or overdeployment are a separate design consideration from paying the squad: the reduced-reward principle is not fulfilled merely by deducting higher wages. Exactly where those adjustments enter the accounting model remains TBD. **A-005 / C-007 / D-013**

This equation concerns financial returns. It does not assign a credit value to XP, reputation, loyalty, or recruitment opportunities. Under [System E](system-e-finances.md), contract pay arrives on completion; officer salaries and asset-based overhead recur monthly, with upgrade effects and property taxes abstracted into overhead. The profit equation does not charge monthly overhead again for each completed contract. Contract-level allocation of monthly costs, ordinary squad payment basis/timing, pay rates, and payout values remain deferred. A contract need not be financially profitable simply because the squad succeeds.

## Deferred design and balancing

- **Job board:** generation, number of jobs, refresh frequency, availability, and specific access or reputation requirements; System D confirms that reputation affects new opportunities. **D-009**
- **Contract content:** numerical DCs, durations, reward values/mixes, and fully authored phase outcome tables. **D-010**
- **Economy:** payout and pay scales, asset/upgrade overhead values, cost allocation, ordinary squad payment terms, and treatment of failed or incomplete jobs. **D-002 / D-010 / D-013**
- **Rewards:** conditions and timing for reputation, loyalty, and recruitment rewards; how deployment adjustments affect each reward type. **D-010 / D-013**
- **Priority adventures:** adventure presentation, reward design, NPC participation, and rescue routing. **D-027**
- **Personnel timing and rescue:** status persistence across durations and events, return availability, capture, and party versus delegated rescue. Rival missions resolve through System G events. **D-007 / D-008**

No Foundry module code, automation, data schema, or implementation scaffolding is included.



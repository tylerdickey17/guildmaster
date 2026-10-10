# System B: Contracts

Status: confirmed framework, October 10, 2026; numerical balancing and the procedures listed below remain deferred. See the [decision log](design-decisions.md) for evidence and the [README](../README.md) for status definitions.

## Design intent

The job board gives players contracts to evaluate against their roster, available time, likely rewards, and deployment costs. Contract cards make the mission's risks and outcomes visible before players commit a squad. [System C: Mission Resolution](system-c-mission-resolution.md) resolves those contracts through three phase checks; [System A: Personnel](system-a-personnel.md) governs personnel advancement, pay, and loyalty.

## Confirmed framework

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

A category does not prescribe one universal check or outcome table. Each contract defines its own phase checks and consequences. Board size, refresh timing, generation, and access rules remain deferred.

### Contract cards

Every contract card includes the following information. This is a tabletop content framework, not a software schema. **B-003 / C-003 / C-006**

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

Contracts can offer different combinations of **credits, XP, reputation, loyalty, and recruitment opportunities**. These are available reward types, not a requirement that every contract award all five. Their quantities, eligibility conditions, and delivery timing remain deferred. **B-004**

System A's advancement rules still apply: participating NPCs receive equal base contract XP regardless of individual level, leadership and MVP/expertise bonuses can stack, and each level requires 1,000 XP. Deployment-based reward changes do not establish a new individual-level XP distribution rule. Whether deployment adjustments affect XP or other non-credit rewards is still TBD. **A-001 through A-004 / C-007 / D-013**

Recruitment opportunities can be contract rewards; the wider recruitment process, costs, and roster limits are not settled here.

### Rescue contracts

Captured mercenaries can create rescue contracts. This includes the established System A case: an NPC captured while deployed by a rival guild still generates a rescue mission for the party. A successful party rescue grants that rescued NPC a large loyalty bonus. **B-005 / A-009 / A-010**

This connection does not replace the party-rescue rule or decide whether a delegated squad rescue receives the same loyalty award. Capture procedures, rescue generation details, and the relationship between a played adventure and abstract contract resolution remain deferred. **D-008**

### Contract finances

**Company profit = contract payout − squad pay − overhead.** **B-006**

The accounting model is confirmed. Higher-level personnel cost more under System A, so squad strength must be weighed against retained profit. Reward adjustments for underdeployment or overdeployment are a separate design consideration from paying the squad: the reduced-reward principle is not fulfilled merely by deducting higher wages. Exactly where those adjustments enter the accounting model remains TBD. **A-005 / C-007 / D-013**

This equation concerns financial returns. It does not assign a credit value to XP, reputation, loyalty, or recruitment opportunities. Pay rates, payment basis/timing, overhead components, and payout values remain deferred. A contract need not be financially profitable simply because the squad succeeds.

## Deferred design and balancing

- **Job board:** generation, number of jobs, refresh frequency, availability, and any access or reputation requirements. **D-009**
- **Contract content:** numerical DCs, durations, reward values/mixes, and fully authored phase outcome tables. **D-010**
- **Economy:** payout and pay scales, definition of overhead, payment timing, and treatment of failed or incomplete jobs. **D-002 / D-010 / D-013**
- **Rewards:** conditions and timing for reputation, loyalty, and recruitment rewards; how deployment adjustments affect each reward type. **D-010 / D-013**
- **Personnel timing and rescue:** duration's interaction with daily status rolls, return availability, capture, and party versus delegated rescue. **D-007 / D-008**

No Foundry module code, automation, data schema, or implementation scaffolding is included.

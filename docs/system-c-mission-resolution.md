# System C: Mission Resolution

## Current integration rules (October 10, 2026)

Current mission integration: [INT-002 and INT-006–007](integration-checkpoint.md) establish contract-specific required-success counts, Squad Level as average rounded down, separate size/level evaluation combined into one final reward modifier, Trained-or-better support eligibility, and disclosed mission/phase recovery. Preserve three rolls and automatic support. No universal two-successes rule is imposed; the card chooses 1, 2, or 3. Critical Success counting as one phase is the working proposal awaiting explicit confirmation. Numerical support, rewards, risk effects, and essential-objective exceptions remain deferred.

**Precedence and history:** the accepted rules in the linked integration checkpoint supersede any conflicting baseline deferral below. The remaining text is retained as the pre-integration framework and evidence; an old “unresolved” statement does not undo an accepted INT rule. Unaddressed deferrals still apply.

## Pre-integration framework


Status: confirmed framework, October 10, 2026; numerical balancing and the procedures listed below remain deferred. See the [decision log](design-decisions.md) for evidence and the [README](../README.md) for status definitions.

## Design intent

**Maximum narrative impact. Minimum dice rolls.** Players should be able to resolve multiple Standard Contracts in one sitting during Guild Turns. Decisions about the squad, phase leads, risks, and consequences provide depth while the normal resolution requires just three rolls. **C-001 / C-002**

This procedure governs **Standard Contracts assigned to NPCs**. **Priority Contracts are full adventures PCs can participate in**, potentially across multiple sessions; they are not reduced to these three phase rolls. See [System B](system-b-contracts.md), **B-007**.

## Confirmed framework

### Three phases and shared rolls

Resolve each Standard Contract in order: **Insertion → Engagement → Extraction**. Players designate a **lead operative for each phase**, using that operative's relevant statistics for the contract's specified skill/stat check. Share the three rolls around the table so multiple players participate. Each phase has one check; supporting NPCs do not add rolls. **C-001**

| Phase | Narrative role |
| --- | --- |
| Insertion | Getting the squad into position for the job. |
| Engagement | Carrying out the contract's central objective. |
| Extraction | Getting out and concluding the operation. |

The card determines what each phase actually demands. Engagement is not automatically combat, and no phase has a universal mandatory skill. A phase lead is a resolution role; this does not redefine System A's squad leader, Leader Abilities, or leadership/MVP XP eligibility. Requirements to use different operatives, lead-selection timing, and any restrictions on repeating a lead remain unresolved. **D-011**

### Automatic support

Supporting NPCs contribute automatically according to their relevant Starfinder 2e proficiencies. There are **no additional Aid checks or support rolls**. The lead's check represents the phase, including whatever support is applicable. **C-002**

Support values by proficiency, eligibility, stacking, caps, and the interaction with squad size remain TBD. No numerical support formula or separate proficiency system is established.

### Open outcomes and consequences

Every Standard Contract card openly displays **all four degrees of success and their consequences for each of the three phases**. Players can inspect those outcomes when evaluating the job. **C-003**

| Degree | Typical direction |
| --- | --- |
| Critical success | Grants a benefit. |
| Success | Neutral progression; normally avoids worsening circumstances without an extra benefit. |
| Failure | Worsens circumstances. |
| Critical failure | Causes a major complication. |

These are design defaults. **The contract-specific definitions govern each phase**, including departures from the typical pattern. Success can still accomplish the phase's narrative objective; “neutral” does not mean that nothing happens. No universal numeric bonus, penalty, injury, capture, or mission-ending result is assigned to any degree here. **C-004**

### Consequences can carry forward

A phase's outcome may change circumstances or adjust DCs in later phases. A consequence can affect **more than one subsequent phase**, according to that contract. The card specifies affected phases and duration; effects are not automatically limited to the immediately following phase. **C-005**

For illustration only, an Insertion complication could put the site on alert for both Engagement and Extraction. This illustrates scope, not an approved DC modifier or a mandatory outcome. Actual consequences, adjustment values, combination rules, and overall mission/reward evaluation remain deferred. **D-012**

### Deployment range and risk versus reward

Every Standard Contract specifies **minimum, recommended, and maximum squad size**, and **minimum, recommended, and maximum squad level**. Squad size and squad level are separate deployment factors; both matter when evaluating the mission. **C-006**

| Deployment relative to recommendation | Intended difficulty | Intended reward |
| --- | --- | --- |
| Below recommended, within the contract's permitted range | Higher risk. | Potential bonus reward if successful. |
| Recommended | Intended baseline difficulty. | Advertised standard reward. |
| Above recommended, within the contract's permitted range | Easier / improved chance of success. | Reduced reward. |

**Greater deployment risk creates greater potential reward. Greater deployment strength improves the chance of success at the expense of reward.** This applies to both size and level, including deployment at their minimum or maximum. It does not establish guaranteed success, a fixed reward multiplier, or a particular dice mechanic. **C-007**

Minimum and maximum define the contract's deployment bounds; underdeployment means below the recommendation, not permission to ignore the minimum. The exact bounds on each card, calculation of squad level for a mixed-level team, and enforcement details remain TBD. A larger squad of lower-level operatives may be above the size recommendation and below the level recommendation; how those factors combine remains a balancing question. **D-013**

The reward reduction for a stronger deployment is distinct from its personnel cost. The design has not yet selected whether an adjustment changes advertised payout, retained profit, specific non-credit rewards, or some combination. Use [System B's financial model](system-b-contracts.md) without inventing that order of operations. **B-006 / D-013**

## Table procedure

This sequence summarizes the framework; numerical content must be authored and balanced before play.

1. Review the contract card's deployment ranges, duration, rewards, checks, and openly listed phase outcomes.
2. Assemble the squad and evaluate its size and level relative to the recommendations. Designate phase leads and share responsibility for the three rolls around the table.
3. Resolve Insertion with its lead's single check, automatic support, and applicable deployment effects. Apply the card's result and record any continuing consequences.
4. Resolve Engagement the same way, accounting for any effects carried from Insertion.
5. Resolve Extraction, accounting for all still-applicable effects from earlier phases. Apply the contract's outcomes and reward terms, then account for squad pay and the applicable share of overhead. System E charges asset-based overhead monthly; do not charge it again at each contract completion. Allocation procedures remain deferred.

There is no established “two successes wins” rule, summed phase score, or extra overall mission roll. How the phase results determine overall completion and partial rewards still needs design. **D-012**

## Deferred design and balancing

- **Checks and leads:** actual DCs, exact check modifiers, lead-selection timing, repeat-lead restrictions, and any relationship to squad leadership. **D-010 / D-011**
- **Support:** proficiency-based amounts, qualifying supporters, stacking/caps, and interaction with deployment strength. **D-011**
- **Consequences:** authored phase results, numeric adjustments, interaction of multiple effects, overall completion, interruption/early termination, and failed or partial-contract rewards. Preserve the three-roll design target when settling these. **D-012**
- **Deployment:** card-specific bounds; mixed-level squad calculation; formulas combining size and level; risk bonuses and reward reductions; applicable reward types and accounting order. **D-013**

No Foundry module code or implementation design is part of this update.

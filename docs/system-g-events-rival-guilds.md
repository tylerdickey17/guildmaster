# System G: Events & Rival Guilds

> **Current numerical prototype:** [0.3.1 revisions](prototype-values-v0.3.1.md) plus the [full0.3.0 catalog](prototype-values-v0.3.md). Historical numerical deferrals below are superseded where those packs supply a value. See the [simulation report](prototype-simulation-report-v0.3.md) for evidence and limits.

> **Current playtest authority:** [Integration rules pass 0.2](integration-rules-v0.2.md) resolves the remaining procedures under the user's delegated design authority. It supersedes conflicting provisional clocks/deferrals below; the earlier checkpoint remains history. See [regression walkthroughs](integration-regression-v0.2.md) for verification limits.


## Current integration rules (October 10, 2026)

Current event integration: [INT-001 and INT-011](integration-checkpoint.md) establish free immediate decisions versus action-cost follow-up, disclosed response costs/deadlines with next-turn response opportunity, scheduled outcomes counting toward the monthly event minimum, valid fallback, and due rival returns shown in Upkeep. Do not wait for a random future draw to resolve an existing deployment. Free event choices do not waive recruitment/acquisition actions without an explicit exception. Event quantity beyond the minimum and numeric content remain deferred.

**Precedence and history:** the accepted rules in the linked integration checkpoint supersede any conflicting baseline deferral below. The remaining text is retained as the pre-integration framework and evidence; an old “unresolved” statement does not undo an accepted INT rule. Unaddressed deferrals still apply.

## Pre-integration framework


Status: confirmed framework, October 10, 2026; event quantity beyond the monthly minimum, numerical mechanics, and detailed procedures remain deferred. See the [decision log](design-decisions.md) for evidence and the [README](../README.md) for status definitions.

## Monthly Guild Events

Every monthly Guild Turn includes an **Event Phase with at least one Guild Event**. Additional event quantity may scale with Guild Level, but that scaling is pending simulations and playtesting; no events-per-level table or additional-event probability is approved. **SG-001 / D-029**

Events connect the guild's actual circumstances to consequences and opportunities. They can affect **recruitment, contracts, finances, loyalty, reputation, facilities, and rival progression**. This scope does not establish numerical rewards, penalties, or an event catalog. Facility events do not finalize System F's provisional property damage/repair mechanics. **SG-003 / P-005**

The Event Phase's position relative to Guild Actions, expenses, contract completion, construction progress, and advancement remains deferred. The monthly event minimum is established even though the complete turn sequence is not. **D-017**

## Automatic Events and Decision Events

| Event type | Confirmed distinction |
| --- | --- |
| Automatic Event | Resolves without requiring a player decision; players still learn the event and its consequences. |
| Decision Event | Presents a situation that requires a player choice, with consequences tied to that response. |

Both types are confirmed. Automatic does not mean hidden, and a Decision Event does not by itself establish a check, action cost, or response deadline. Whether a response consumes a Guild Action, and how any required officer assignment works, remain deferred with System D's action catalog. **SG-002 / D-028 / D-030**

## Context-sensitive eligibility and targets

Event eligibility and targeting depend on the guild's **actual NPCs, properties, contracts, and rivals**. An event must have a valid target and circumstances for its premise. It cannot take an unavailable mercenary for rival work or claim a contract that is no longer available. An event requiring an owned property must target a property the guild actually has. **SG-003**

As illustrative eligibility examples, a rival offer can target a currently available mercenary, a facility opportunity can reference an existing property, and a rescue hook can reference an NPC captured during rival work. These illustrate the framework; they do not establish new event entries or numerical outcomes.

Selection methods, weights, repeat limits, target priorities, and a fallback when no targeted event qualifies remain deferred. Those procedures must honor both valid targeting and the guaranteed monthly event. **D-030**

## Lightweight rival guilds

Rivals use a lightweight stat block. **SG-004**

| Field | Purpose |
| --- | --- |
| Name | Identifies the rival in events and player-facing consequences. |
| Level | Describes the rival guild's development. |
| Reputation tier | Describes its general standing. |
| Specialization | Describes the work or capabilities it is known for. |
| Relationship | Records its relationship with the player's guild using the five states below. |
| Influence | Describes its reach or ability to affect opportunities; scale and mechanical effects remain deferred. |
| Special traits | Distinguishes the rival's characteristics; trait catalog and effects remain deferred. |

Rivals do **not** run separate guild turns, full finances, or contract simulations. There is no requirement to assemble their squads, roll System C's three phases for them, or calculate their profit. Rival activity is resolved through events. **SG-004 / SG-007**

Rival **level and reputation can change through events**. They are not static background labels, but no automatic monthly XP awards, advancement thresholds, or reputation-change values are assigned. **SG-005 / D-031**

## Rival relationships

The five relationship states, from most antagonistic to most cooperative, are **Hostile, Unfriendly, Neutral, Friendly, Allied**. Relationship is specific to a rival's relationship with the player's guild and is **independent of general reputation**. A well-regarded rival can still be Hostile toward the players. **SG-006**

These states are distinct from [System D's reputation tiers](system-d-guild-development.md): Unfriendly, Neutral, Friendly, Honored, Exalted. Shared names do not equate the two tracks or automatically convert one into the other.

Relationships inform which interactions and competitive events fit the rival. Rival interaction can create cooperative opportunities as well as setbacks. For example, an Allied rival might offer joint work, while a Hostile rival might try to underbid the guild. These are illustrative directions, not an approved event table or mandatory behavior for every rival in a state. Relationship-change triggers and effects remain deferred. **SG-006 / D-031**

## Visible, event-driven competition

Rival competition is **exclusively event-driven and visible to players**. Contracts and mercenaries do not silently disappear because of a random daily roll or an unseen rival simulation. Players learn which rival acted, what contract, person, or opportunity was affected, and what changed. Automatic competition events remain visible even when they offer no decision. **SG-007**

| Competition | Scope |
| --- | --- |
| Contracts | Rivals can claim available contracts through events, explaining why those jobs leave the board. |
| Personnel | Rivals can hire available recruits or offer work to mercenaries associated with the player's guild. |
| Market opportunities | Rivals can affect contract availability, payouts, and business opportunities through events. |

This supersedes the rival-deployment portion of the earlier System A daily status roll, **A-007**. It preserves the distinct Available, Deployed — Guild Mission, and Deployed — Rival Guild Mission states. Any remaining non-rival daily availability procedure remains unresolved. **A-008 / D-007**

## Loyalty, rival deployment, and rescue

Mercenary **loyalty influences rival recruitment and deployment**; higher loyalty reduces the likelihood of accepting rival work. No loyalty threshold, immunity, formula, or check is fixed. Outcomes depend on eligible targets and event resolution. **A-006 / SG-008 / D-006**

Rival missions can result in **capture**, leading to **rescue contracts** for the party. Resolve the rival activity through events without simulating a full rival mission. The established large loyalty bonus for a successful party rescue remains in force; its amount is still deferred. **A-009 / A-010 / B-005 / SG-008**

Illustrative event concept: a named rival offers an available mercenary temporary work. Loyalty influences whether the mercenary declines or accepts and becomes unavailable for the player's guild. If the rival mission later ends in capture, an event can lead to a rescue contract. This is an example of the confirmed connections, not a finalized event card, outcome table, or resolution schedule.

## Deferred design and balancing

- **Event quantity:** whether and how additional events scale with Guild Level, tested through simulations and playtesting. The minimum of one event per monthly turn is confirmed. **D-029**
- **Event procedures:** selection, eligibility details, targeting priorities, fallback events, repeats, response timing, checks, and outcome values. **D-030**
- **Guild Turn integration:** phase order and timing of effects across turns; Guild Action costs and officer requirements for event responses. **D-017 / D-028**
- **Rivals:** influence scale, special traits, starting profiles, level/reputation changes, relationship transitions, and relationship-based event eligibility. **D-031**
- **Personnel and rescue:** loyalty effects, availability persistence and return timing, rival-outcome/capture procedures, rescue routing, and rescue bonus values. **D-006 / D-007 / D-008 / D-027**

This completes documentation of the A–G conceptual frameworks, not integration, numerical balance, or playtesting. Unrelated source gaps and provisional mechanics remain open. No Foundry module implementation is included.


# Contract Operations

A Contract Operations Guild System for Starfinder 2e.

Repository: [`tylerdickey17/sf2e-contract-operations`](https://github.com/tylerdickey17/sf2e-contract-operations).

A design workspace for a mercenary-company subsystem for **Starfinder 2e**, initially intended for *The Brood Beneath* campaign.

Players develop mercenary personnel and weigh the benefits of experienced operatives against their increasing pay. NPC loyalty affects their likelihood of taking rival-guild missions; capture on those missions can lead to party rescues that substantially increase loyalty. The current work records the agreed personnel, contract, mission-resolution, guild-development, finance, and property frameworks and identifies what still needs design or balancing.

**Stage:** initial design documentation; incomplete and not yet balanced or playtested. A Foundry VTT v14 module is a future target. This repository contains no module implementation or compatibility claim.

## Documents

- [System A: Personnel](docs/system-a-personnel.md) — advancement, pay, loyalty, daily availability, rival deployment, and rescue decisions, plus unresolved details and missing source material.
- [System B: Contracts](docs/system-b-contracts.md) — Standard NPC assignments versus Priority adventures, job board, ten categories, contract cards, rewards, rescues, and finances.
- [System C: Mission Resolution](docs/system-c-mission-resolution.md) — three shared phase rolls, automatic support, visible outcomes, continuing consequences, and deployment risk versus reward.
- [System D: Guild Development](docs/system-d-guild-development.md) — independent Guild Level/XP, reputation tiers, officers, and monthly Guild Turns.
- [System E: Finances](docs/system-e-finances.md) — treasury, completion-based income, monthly expenses, asset-based overhead, loans, and financial distress.
- [System F: Bases & Facilities](docs/system-f-bases-facilities.md) — properties, facility slots, construction management, acquisition, sales, and relocation traits; damage/repair remains provisional.
- [Decision log](docs/design-decisions.md) — decision IDs, evidence, status, and unresolved questions.

## Decision status

- **Confirmed:** supported by an explicit user choice in the available source.
- **Provisional:** suggested or summarized by the assistant, without an explicit user decision visible in the available source.
- **Deferred:** a known design or balancing question intentionally left unresolved.
- **Source gap:** an earlier decision was mentioned, but its actual rule and approval are not present in the retrieved conversation. This does not mean the decision was never made.

These labels describe the evidence behind a rule, not its playtest quality. An assistant calling a rule “established” does not by itself make it confirmed.

## Working with the design

When a rule changes, update the affected system documents and their decision-log entries. Keep the reasoning and prior outcome available; mark replaced decisions as superseded rather than silently overwriting the history. Examples and possible implementations must remain labeled as proposals until approved.

Systems A–F now have design documents, with explicit source gaps, provisional details, and deferred balancing retained. System G: Events & Rival Guilds is the next design focus; it is not designed by this update. Recover the missing personnel decisions and settle open procedures before treating the full subsystem as complete. Numerical balancing and playtesting remain ahead, and module development remains deferred.

The loyalty framework also needs a score scale, daily status probabilities and persistence rules, rival-mission capture procedures, and a numerical rescue bonus. Foundry automation details remain deferred.

## Source and scope

Initial documentation prepared on October 10, 2026 from [Starfinder Business Systems](https://chatgpt.com/c/6acaafb2-9434-83e9-8bd8-517d291ed264) and the repository-setup request. Access to the source conversation may require its owner's account.

The retrieved source includes five recent user exchanges covering XP, pay, and documentation. It does not expose the earlier personnel discussion. The October 10, 2026 follow-up in the repository-setup conversation adds the loyalty, daily availability, rival deployment, capture, and rescue framework. See the decision log for exact evidence and limitations. Numerical rules here are subsystem design choices, not a verification of the published Starfinder rules.

The October 10, 2026 Systems B/C update uses the current explicit documentation request as confirmation of the listed framework. A fresh read of the linked conversation returned five recent exchanges about automatic support, squad bounds, and deployment risk/reward, with no older-page cursor. The update does not claim to recover the full earlier discussion or resolve unrelated System A source gaps.

The October 10, 2026 D–F update is confirmed by the user’s explicit documentation request. The source reader again exposed only five recent property exchanges, without an older-page cursor. A direct follow-up confirms that Standard Contracts are assigned to NPCs and resolved during Guild Turns using the established mechanics; Priority Contracts are full adventures PCs can participate in over potentially multiple sessions. Damage/repair remains provisional. See S11–S14 in the decision log.

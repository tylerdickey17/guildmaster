# Contract Operations

A Contract Operations Guild System for Starfinder 2e.

Repository: [`tylerdickey17/sf2e-contract-operations`](https://github.com/tylerdickey17/sf2e-contract-operations).

A design workspace for a mercenary-company subsystem for **Starfinder 2e**, initially intended for *The Brood Beneath* campaign.

Players develop mercenary personnel and weigh the benefits of experienced operatives against their increasing pay. NPC loyalty affects their likelihood of taking rival-guild missions; capture on those missions can lead to party rescues that substantially increase loyalty. The current work records the personnel rules already agreed in discussion and identifies what still needs design or balancing.

**Stage:** initial design documentation; incomplete and not yet balanced or playtested. A Foundry VTT v14 module is a future target. This repository contains no module implementation or compatibility claim.

## Documents

- [System A: Personnel](docs/system-a-personnel.md) — advancement, pay, loyalty, daily availability, rival deployment, and rescue decisions, plus unresolved details and missing source material.
- [Decision log](docs/design-decisions.md) — decision IDs, evidence, status, and unresolved questions.

## Decision status

- **Confirmed:** supported by an explicit user choice in the available source.
- **Provisional:** suggested or summarized by the assistant, without an explicit user decision visible in the available source.
- **Deferred:** a known design or balancing question intentionally left unresolved.
- **Source gap:** an earlier decision was mentioned, but its actual rule and approval are not present in the retrieved conversation. This does not mean the decision was never made.

These labels describe the evidence behind a rule, not its playtest quality. An assistant calling a rule “established” does not by itself make it confirmed.

## Working with the design

When a rule changes, update both the personnel document and its decision-log entry. Keep the reasoning and prior outcome available; mark replaced decisions as superseded rather than silently overwriting the history. Examples and possible implementations must remain labeled as proposals until approved.

Next steps are to recover the missing personnel decisions, settle the provisional details, and balance XP rewards and personnel pay alongside contract rewards. Contract resolution and module development need their own later design work.

The loyalty framework also needs a score scale, daily status probabilities and persistence rules, rival-mission capture procedures, and a numerical rescue bonus. Foundry automation details remain deferred.

## Source and scope

Initial documentation prepared on October 10, 2026 from [Starfinder Business Systems](https://chatgpt.com/c/6acaafb2-9434-83e9-8bd8-517d291ed264) and the repository-setup request. Access to the source conversation may require its owner's account.

The retrieved source includes five recent user exchanges covering XP, pay, and documentation. It does not expose the earlier personnel discussion. The October 10, 2026 follow-up in the repository-setup conversation adds the loyalty, daily availability, rival deployment, capture, and rescue framework. See the decision log for exact evidence and limitations. Numerical rules here are subsystem design choices, not a verification of the published Starfinder rules.

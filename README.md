# Contract Operations

A Contract Operations Guild System for Starfinder 2e.

Repository: [`tylerdickey17/sf2e-contract-operations`](https://github.com/tylerdickey17/sf2e-contract-operations).

A design workspace for a mercenary-company subsystem for **Starfinder 2e**, initially intended for *The Brood Beneath* campaign.

Players develop mercenary personnel and weigh the benefits of experienced operatives against their increasing pay. NPC loyalty affects their likelihood of taking rival-guild missions; capture on those missions can lead to party rescues that substantially increase loyalty. The current work records the agreed personnel, contract, mission-resolution, guild-development, finance, property, and events/rival-guild frameworks and identifies what still needs design or balancing.

**Stage:** procedural integration edition0.2 plus **live-play prototype0.3.9**, incorporating Events resolution, crew bonuses, one party-sized action pool, four iconic PC officers, revised failed-pay Loyalty, visible Upkeep, employment pay, property purchases and staffed upgrades. Six independent agents reviewed frozen0.3.0; targeted reruns checked0.3.1. Owner and spouse playtest feedback is positive; broader human playtesting and content/balance remain ahead. Base staffing is implemented; full officer signature progression and Reorganize Command remain documented for later implementation. A Foundry VTT v14 module is a future target; this repository contains no module implementation or compatibility claim.

## Documents

- [Live survival/discovery pass0.3.9](docs/prototype-values-v0.3.9.md) — count-only completion, PC Hero Point mission rerolls, weighted random lead/recruit tables and partial arrears payments;85 checks.

- [Live clarification0.3.8](docs/prototype-values-v0.3.8.md) — prominent complete mission requirements and result explanations;74 checks. Exact reported mission awaits confirmation.

- [Live economy test 0.3.7](docs/prototype-values-v0.3.7.md) — approved 900/110 payout/pay pair; 71 checks and 288 intervals. Higher-level growth remains provisional.

- [Previous live-play patch 0.3.6](docs/prototype-values-v0.3.6.md) — level-gated development and loans, odd-level feats, transparent principal/interest; 69 checks and 288 intervals.
- [Startup compensation discussion](docs/startup-compensation-discussion.md) — earned-treasure/XP calibration and paired payout/pay comparisons; live pay/payout remain unchanged.

- [Previous live-play patch0.3.5](docs/prototype-values-v0.3.5.md) — five contract bands, published DCs, distinct leads, visible rolls, complications and rewards;56 checks and288 intervals.
- [Expansion balance discussion](docs/expansion-balance-discussion.md) — debt feedback, bounded budget arithmetic and unimplemented payout/unlock/reserve proposals.

- [Live-play patch0.3.4](docs/prototype-values-v0.3.4.md) — implemented visible Upkeep,300-credit starter base, three turnkey property offers, four staffed facilities, employment rates, local transfers and migration;44 checks and288 smoke intervals.
- [Current session checkpoint: October12](docs/session-checkpoint-2026-10-12.md) — deployment, source and remaining scope.

- [Base purchase and upgrade catalog](docs/base-purchase-playtest.md) — approved300-credit starter base, three purchasable property types, four upgrades, local staffing/transfer rules and an optional expansion-test preset; implemented scope and exceptions are now recorded in0.3.4.

- [Upkeep and base playtest draft](docs/upkeep-and-base-playtest.md) — visible invoices, staffed HQ/expansion fixtures, recurring costs and candidate retainer rates; historical candidate; workspace restored and implementation published as0.3.4.

- [Latest session checkpoint: October11](docs/session-checkpoint-2026-10-11.md) — owner/spouse proof-of-concept feedback, employment, officer/staffing decisions and next authoring work.
- [Officer positions and outpost staffing](docs/officers-and-staffing.md) — four founding offices, specialist progression and signature actions, facility staffing, and Reorganize Command; accepted working draft with provisional values, queued for implementation.
- [Personnel employment](docs/personnel-employment.md) — accepted employment framework;0.3.4 implements selected rates and threshold, with missed-pay/termination content still incomplete.

- [Play the browser demo](https://contract-operations-playtest.primeangel2.chatgpt.site) — interactive playtest using prototype0.3.5; private owner access.
- [Browser playtest guide](docs/browser-playtest.md) — first session, feedback export, verification and scope; [source and tests](prototypes/browser-playtest/README.md).
- [Live-play patch0.3.3](docs/prototype-values-v0.3.3.md) — implemented authority for party-sized shared actions and failed-pay Loyalty; later office-access rules are in the officer/staffing draft.
- [Live-play patch0.3.2](docs/prototype-values-v0.3.2.md) — current authority for Events contract resolution, crew circumstance bonuses and retained cash discounts.
- [Prototype values0.3.1](docs/prototype-values-v0.3.1.md) — retained numerical patch; applies where0.3.2 does not override it.
- [Full numerical pack0.3.0](docs/prototype-values-v0.3.md) — frozen starting values, complete action/feat/facility/event cards; apply0.3.1 changes above.
- [Simulation report](docs/prototype-simulation-report-v0.3.md) — six-agent results, exact probabilities, bounded campaign trials, recommendations and limitations.
- [Reproduction files](playtests/README.md) — Python scripts, JSON results, seed7 traces, pack hashes and coverage.
- [Integration rules pass 0.2](docs/integration-rules-v0.2.md) — procedural playtest authority; remaining procedures chosen under delegated tabletop-design authority.
- [Integration regression walkthroughs](docs/integration-regression-v0.2.md) — 28 deterministic workflow cases and explicit numerical-fixture limits.

- [Current integration checkpoint](docs/integration-checkpoint.md) — accepted turn order, settlement, staffing, recruitment, training, leadership, recovery, debt, relocation, and events, with explicit provisional boundaries. Read this first; it supersedes conflicting older framework deferrals.
- [Guild Action catalog](docs/guild-actions.md) — accepted basic/trained action concepts, requirements, costs versus provisional baselines, and A/B test agenda.

- [System A: Personnel](docs/system-a-personnel.md) — advancement, pay, loyalty, availability, event-driven rival deployment, and rescue decisions, plus unresolved details and missing source material.
- [System B: Contracts](docs/system-b-contracts.md) — Standard NPC assignments versus Priority adventures, job board, ten categories, contract cards, rewards, rescues, and finances.
- [System C: Mission Resolution](docs/system-c-mission-resolution.md) — three shared phase rolls, automatic support, visible outcomes, continuing consequences, and deployment risk versus reward.
- [System D: Guild Development](docs/system-d-guild-development.md) — independent Guild Level/XP, reputation tiers, officers, shared Guild Actions, and monthly Guild Turns.
- [System E: Finances](docs/system-e-finances.md) — treasury, completion-based income, monthly expenses, asset-based overhead, loans, and financial distress.
- [System F: Bases & Facilities](docs/system-f-bases-facilities.md) — properties, facility slots, construction management, acquisition, sales, and relocation traits; damage/repair remains provisional.
- [System G: Events & Rival Guilds](docs/system-g-events-rival-guilds.md) — monthly events, context-sensitive targets, lightweight rivals, relationships, and visible event-driven competition.
- [Decision log](docs/design-decisions.md) — decision IDs, evidence, status, and unresolved questions.

## Decision status

- **Confirmed:** supported by an explicit user choice in the available source.
- **Designer-adopted prototype:** selected under the user's delegated design authority; usable for testing, without claiming individual historical approval or final balance.
- **Provisional:** suggested or summarized by the assistant, without an explicit user decision visible in the available source.
- **Deferred:** a known design or balancing question intentionally left unresolved.
- **Source gap:** an earlier decision was mentioned, but its actual rule and approval are not present in the retrieved conversation. This does not mean the decision was never made.

These labels describe the evidence behind a rule, not its playtest quality. An assistant calling a rule “established” does not by itself make it confirmed.

## Working with the design

When a rule changes, update the affected system documents and their decision-log entries. Keep the reasoning and prior outcome available; mark replaced decisions as superseded rather than silently overwriting the history. Examples and possible implementations must remain labeled as proposals until approved.

Systems A–G retain historical framework documents and source gaps. The October10 integration checkpoint followed six deterministic stress-test traces (58 authored turns); edition0.2 then selected remaining procedures. The0.3 simulation pass is distinct from those older traces and does not turn them into probability evidence. Read current prototype/rules first, then older documents for provenance. Module development remains deferred.

Loyalty scale, return/status rules, rescue bonuses and a visible rival-offer fixture now exist. Full authored rival-mission capture/rescue content and campaign consequences remain ahead. Rival competition is through visible Guild Events; the older daily rival-deployment roll is superseded. Any remaining non-rival daily procedure and Foundry automation details remain deferred.

## Source and scope

Initial documentation prepared on October 10, 2026 from [Starfinder Business Systems](https://chatgpt.com/c/6acaafb2-9434-83e9-8bd8-517d291ed264) and the repository-setup request. Access to the source conversation may require its owner's account.

The retrieved source includes five recent user exchanges covering XP, pay, and documentation. It does not expose the earlier personnel discussion. The October 10, 2026 follow-up in the repository-setup conversation adds the loyalty, daily availability, rival deployment, capture, and rescue framework. See the decision log for exact evidence and limitations. Numerical rules here are subsystem design choices, not a verification of the published Starfinder rules.

The October 10, 2026 Systems B/C update uses the current explicit documentation request as confirmation of the listed framework. A fresh read of the linked conversation returned five recent exchanges about automatic support, squad bounds, and deployment risk/reward, with no older-page cursor. The update does not claim to recover the full earlier discussion or resolve unrelated System A source gaps.

The October 10, 2026 D–F update is confirmed by the user’s explicit documentation request. The source reader again exposed only five recent property exchanges, without an older-page cursor. A direct follow-up confirms that Standard Contracts are assigned to NPCs and resolved during Guild Turns using the established mechanics; Priority Contracts are full adventures PCs can participate in over potentially multiple sessions. Damage/repair remains provisional. See S11–S14 in the decision log.

The October 10, 2026 D/G update uses the explicit documentation request to confirm Guild Actions and Events & Rival Guilds. It integrates the existing System D addition, records the superseded rival-deployment roll, and preserves unrelated source gaps and provisional property damage/repair. The supplied conversation preview corroborates visible event-driven competition; it is not a recovery of the complete earlier discussion. See S15–S17 in the decision log.

## October 10 integration evidence

The current Work conversation is the primary source for the INT decisions, from the user's numbered integration responses through confirmation that returning to Available ends a consecutive training streak. The user explicitly requested this repository checkpoint before context compaction. Original source-gap recovery used Personal Context summaries, not a full retrieved source transcript. Do not treat the 10% training example, three starting shared actions, or the complete two-clock hiring proposal as adopted numerical rules. No Foundry code is added.

## Delegated design pass

On October 10, 2026 the user authorized the assistant to finish remaining integration choices using prior design, PF2e/SF2e, Kingmaker and Trollskull as guidance, with feedback during playtesting. PASS-001–011 in the rules pass are adopted playtest procedures, not individually confirmed historical user votes. This pass preserves earlier explicit decisions, chooses remaining defaults, and adopts minimal facility disruption/repair (superseding P-005's previous provisional status). The original full personnel transcript is still not recovered, but its remaining procedural gaps have designer-selected rules. Numerical prototype0.3 and its simulation evidence now supply the initial values; this is not a Foundry module release.


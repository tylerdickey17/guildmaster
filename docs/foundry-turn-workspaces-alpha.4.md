# Foundry alpha4: turn workspaces and officer portfolios

Version0.1.0-alpha.4 targets Foundry14.369 / native SF2e1.6.1. Update Guildmaster from Foundry Setup, then reload the world. Existing guild saves, resolved dice, money and Actor links remain; current portfolios take effect immediately without charging a restructuring action for this rules update. Player office switching continues to cost the existing Reorganize Command action.

## What changed

The Guild Turn Actions screen now has Officer Actions, Contracts, Recruits and Crew workspaces. A new discovery switches the searching office or GM overview to its results. Contract cards show mission levels, success counts, payout/threat XP, deadlines, three skills/ranks/base DCs, consequences and lore; Commander secures each offer directly. Candidate cards show identity, trained skills, Loyalty, hiring fee, assignment wage, retained option and expiry; Personnel hires directly. Search degree and exact d20/modifier/total/DC remain visible, with discovery table rolls. An empty search preserves older valid offers. All officers can inspect shared records, but only their permitted controls appear. The operating-base selector is available in the guide; only the coordinating GM changes it.

In Assignments, select a secured contract and inspect the mission dossier next to the local crew table. The Quartermaster chooses3–6 operatives, one distinct qualified lead per phase and an optional Leader Feat holder directly in an inline editor. A live preview validates the selection and shows success payout, wages, Squad Level and actual three check modifiers/DCs. Save the squad before preparation/deployment; the separately labeled saved quote is authoritative. Unsaved local edits do not alter the shared guild. Other squads’ reservations and unavailable personnel remain visible in the roster. Operations sees the saved team and preparation tools; only Quartermaster assembles/deploys.

## Office responsibilities

| Office | Unique facet | Current activities |
| --- | --- | --- |
| Commander | Clients and public standing | Lead discovery, secure contracts, brokerage, promotion/campaigns, Guild Feats |
| Quartermaster | Money, infrastructure and squad logistics | Upkeep, loans/arrears, property/upgrades, crew assembly and routine deployment |
| Operations | Crew readiness and mission execution | Training/continuation, intensive training, medical recovery, recon/briefings, extraction plans, phase resolution and MVP |
| Personnel | Staffing and retention | Recruit discovery, hiring/release, Boost Morale, Leader Feats |

Training/recovery costs, XP, cooldowns and trained gates retain their previous values. Existing training continuation choices now belong to Operations. Boost Morale becomes Personnel-exclusive. Role gates apply when committing/approving a request as well as when rendering, and follow paid restructuring rather than original slot IDs. General pass and Reorganize Command remain available.

Basic **Brief Mission Team** gives Operations a useful option even without trained Computers: Level1, Assignments,1 shared action,25 credits per assembled operative, no check, +1 circumstance to one chosen mission phase. The Quartermaster must already have saved that exact team. It shares one preparation attempt with Digital Recon/advanced Operations Briefing; bonuses use the existing highest-circumstance rule. Funded briefings lock squad/leads/leader through expiry at end of the next turn. Extraction contingency remains separate. No payout, XP or automatic-success bonus is added. These new numbers are a prototype, not validated balance.

## Verification and acceptance

65 Node checks pass using mocked Foundry documents, native checks, Actor ownership, recursive flag merging, dice and applications. New coverage includes direct discovery/hiring/securing, zero-result boards, role-bound controls, inline squad saves and dossier/roster escaping, Operations/Personnel gates and restructured signatures, basic briefing cost/bonus/lock/no-stacking, and player-request approval. Hero Point recovery and all three result reviews remain covered. Packaging validates syntax, archive integrity and exact source contents.

Fixture HTML can be generated with `GUILDMASTER_UI_FIXTURES=/tmp/guildmaster-ui-alpha4 node foundry/tests/alpha.test.mjs`. Screenshot verification was not completed because the headless Chromium executable is unavailable. No actual Foundry loading, layout or live multiplayer claim is made.

Owner acceptance:

1. Discover leads/candidates from both GM All Officers and owned-PC views; inspect exact outcomes and secure/hire a chosen card without opening management.
2. Check an empty search leaves previous valid records visible; check capacity/credits disable invalid hires.
3. Quartermaster: inspect mission risks/requirements, compare crew skills and wages, edit the squad inline, see invalid selections, save it, then deploy. Verify another mission cannot reuse reserved operatives.
4. Operations without trained Computers: train staff or reserve an action for the basic briefing; check the chosen phase gets +1 without stacking with extra-crew/Recon bonuses. Confirm advanced unlocks and medical prerequisites still work.
5. Personnel: discover/hire, handle loyalty and choose Leader Feats. Confirm all four players have interesting decisions without consuming every action on mandatory staffing chores.
6. Review training continuation after updating an existing save, paid restructuring, player requests, all three mission results, Hero Points and window completion.

No browser Site change, external name API, broader economy rebalance, feats/archetypes/morality expansion or specialist office catalog is included.

## Distribution

The stable manifest is `https://raw.githubusercontent.com/tylerdickey17/guildmaster/main/foundry/guildmaster/module.json`; its alpha4 archive is versioned under `foundry/releases/`. See package and distribution verification records for the final archive fingerprint and anonymous download verification. Live-world testing remains pending.

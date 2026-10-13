# Guided Guild Turn — 0.1.0-alpha.3

Target: Foundry14.369 / SF2e1.6.1. Prepared October12, 2026, America/Chicago. The owner reports that alpha2 works fairly well, but Hero Point recovery gets stuck and the management layout is awkward for running a turn. This release addresses that feedback. [Installation](../foundry/guildmaster/README.md) uses the unchanged public manifest URL.

## Hero Point persistence fix

Foundry flag writes recursively merge objects. Alpha2 saved a completed Hero Point transaction without a `pendingHeroSpend` property, assuming omission removed the old pending marker. It did not. The marker survived both final saves and recovery, blocking subsequent commands.

Completed saves and recovery now write `pendingHeroSpend: null` explicitly. Existing alpha2 stuck saves can use **Recover Hero Point spend** after updating. The recorded reroll is preserved and the recovery path checks whether the actual point was already spent, avoiding a second deduction under its existing before/after rules. It does not reset the guild or recreate the mission.

The test harness now models recursive flag merging rather than replacing flag objects outright. It reproduces the old omission bug and verifies recovery of the same shape of saved transaction. Actual independent edits to Hero Points during an incomplete transaction still require reconciliation if their value matches neither recorded state. There is no blind reset of actual PC resources.

## Guided workflow

**Guild Management** remains the shared overview for roster, officers, contracts, assets and history. **Start Guild Turn / Resume Guild Turn** opens a separate ApplicationV2 guide:

1. **Upkeep:** itemized rent, staffing, retainers, debt and arrears; individual payments or available-funds settlement; service renewal and training continuation decisions.
2. **Guild Actions:** officer-specific and general action cards, native skill eligibility, costs/unlocks, shared action pool, and each linked PC's action or pass. No personal action cap is added.
3. **Mission Assignments:** Quartermaster assembles squads with three distinct leads, Operations prepares the assembled team, and Quartermaster deploys it routinely. Preparations spend remaining shared actions. The GM can return to Actions if more management is needed.
4. **Events & Resolution:** mission checks and explicit result review, actual PC Hero Point rerolls, consequences and compensation/MVP choices, then the random monthly event. Existing Events resolution order remains; missions do not move into next-turn Upkeep.
5. **Complete Guild Turn:** earned Guild Feat choice, treasury/XP overview, and completion. The next Upkeep is prepared without charging it, and open guide windows close while the management sheet remains.

The current stage is saved in the guild. Reopening resumes it without rerolling checks, paying twice, resetting the pool, or advancing the calendar. An existing alpha2 save starts at its actual current phase.

## GM and player views

The GM defaults to **All Officers**. A dropdown previews any individual officer's eligible action list. All Officers shows the full action catalog, including locked options with requirements. An individual preview matches that character's office, skill ranks and Guild Level.

Players are restricted to linked world PCs they own. A player with multiple linked PCs can choose among those PCs. Their action list uses actual SF2e skill ranks and their primary office, not the browser's mock modifier progression. The GM's shared phase controls remain visible in GM views.

Player actions are **submitted for GM approval**. Requests live on the owned PC Actor, whose native document permissions protect the inbox; they do not grant players write ownership over the guild Journal. The GM reviews and resolves an action using that PC's native statistics. Cancelled checks leave the request pending without spending guild cash/actions. The GM can decline an invalid or obsolete request.

The approval path binds requests to the actual source Actor and linked officer, rejects GM-only commands, rechecks the current stage, role, proficiency and budget, and records a processed ID alongside the resulting guild state. Two valid requests can be resolved in succession despite shared revision changes; they cannot spend the same last action twice. Pending requests must be approved or declined before shared phase advancement.

This is a collaborative workflow, not a secrecy system. Players can still inspect the shared guild record. No extra player action-request socket or external service is required. Native roll dialogs currently appear on the approving GM's client; results are posted to shared chat.

## Founding office responsibilities

| Office | Current responsibilities |
|---|---|
| Commander | Contract lead searches, securing contracts, exclusive brokerage, promotion and campaigns, Guild Feat choices |
| Personnel | Recruit searches, hiring/release, training, treatment/recovery, Leader Feat choices |
| Quartermaster | Upkeep payments/services, property/upgrades, infrastructure optimization, financing, assembling and deploying squads, failed-job compensation |
| Operations | Recon, briefings/contingencies, mission-phase rolls, MVP decisions |

Boost Morale and passing remain general options. The GM controls setup and shared phase progression. This ownership of ordinary workflows supersedes the older draft in which all basic business actions were available to every office. Exact future specialist offices and additional signatures remain deferred.

**Reorganize Command** costs one shared Guild Action, once per turn in Actions. One action covers a reshuffle of primary offices among current PC officers. Changes apply immediately; actor links, Hero Points and earlier actions remain with those PCs. Existing multi-action signatures now follow the new office instead of the officer's original array index. No extra credit fee or action budget is introduced. Free link changes after play begins cannot be used to switch existing roles; forced vacancy/PC replacement procedures remain a separate design gap.

## Assignment boundaries

Assembly is a saved draft rather than immediate deployment. An operative cannot be reserved for two accepted contracts. Reserved operatives cannot be silently released or trained. Quartermaster may clear an unfunded draft and reuse its crew; an existing operation plan's squad lock remains binding. Invalidated drafts show a correction message rather than breaking the whole guide. Assignment bonuses, wages, payout reductions, three distinct leads and deployment limits use the existing engine.

## Journal/menu access

The Journal tab has a **Guildmaster** button. The integration uses the ApplicationV2 element, handles directory re-renders and prevents duplicate buttons. The older hook's reliance on the HTML callback argument could miss the v14 element. Settings also includes separate Guild Management and Start/Resume Guild Turn entries. Ctrl+Shift+G still opens management.

## Validation and first table test

[Integration harness](../foundry/tests/alpha.test.mjs) now covers native-style flag merging/legacy recovery, saved guide stages, player ownership and role gates, GM all/individual previews, skill eligibility, approval/rejection and duplicate-request checks, budget revalidation, restructuring, assignment reservations, completion and Journal access. [Results](../foundry/verification-alpha.json).

The owner has tested alpha2 in Foundry; alpha3 itself has not been visually or live-multiplayer tested here. Its manifest still omits `compatibility.verified`. Check these behaviors after updating:

- Use Recover Hero Point spend on the existing stuck guild, then finish the pending phase. The old reroll should remain and the point should not be spent twice.
- Open from the Journal button, start/resume a turn, and confirm the separate guide and persistent stage.
- Compare GM All Officers with individual previews; connect a player and confirm only their owned officer actions appear.
- Submit two players' actions, approve each, and check the shared budget, native rolls and chat.
- Assemble a squad as Quartermaster, prepare it as Operations, and resolve all three phases with visible reviews.
- Complete the turn: the guide closes, management remains, and next Upkeep is unpaid until handled.

This release does not expand the economy, feat catalog, Guild Archetypes, morality/Heat, NPC combat sheets or specialist staffing model.

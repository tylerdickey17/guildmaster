> **Foundry 0.1.0-alpha.5:** [Guild-scaled discovery without Target Level and the Foundry rulebook interface](../../docs/guild-discovery-rulebook-ui.md). Older version descriptions below are historical.

# Guildmaster Foundry Alpha

Version **0.1.0-alpha.5** targets **Foundry 14.369 / native SF2e 1.6.1**. This revision has 70 automated integration checks and passed contract/recruitment flows inside the installed Foundry instance; see the linked revision notes. The manifest deliberately does not declare a verified Foundry version.

## Install

In Foundry Setup, open **Add-on Modules → Install Module** and paste:

```text
https://raw.githubusercontent.com/tylerdickey17/guildmaster/main/foundry/guildmaster/module.json
```

The repository is public. The stable manifest points to the versioned ZIP and supports update checks. For an existing installation, check for module updates in Foundry Setup and reload the world after updating.

Manual fallback: extract `guildmaster-0.1.0-alpha.5.zip` into `Data/modules/guildmaster/` with `module.json` directly in that folder, then restart Foundry.

Open Guildmaster from the **Journal tab button**, **Configure Settings → Guildmaster → Open Guildmaster**, or **Ctrl+Shift+G**. Choose **Start Guild Turn** in management to open the guide. Settings also includes a separate Start/Resume Guild Turn entry. This macro also opens it:

```js
game.modules.get('guildmaster').api.open();
```

## First session / existing saves

1. Existing guilds and resolved rolls remain. If an alpha2 Hero Point spend is stuck, use **Recover Hero Point spend** after updating; the old pending marker is now cleared explicitly without discarding the reroll.
2. For a new guild, create one in management and link actual PCs to officer slots. Assign OWNER permission on their character Actors to the appropriate players.
3. Choose **Start / Resume Guild Turn**. The guide resumes the existing phase rather than resetting it.
4. Review/pay itemized Upkeep, renew services and resolve training choices. Continue to Guild Actions.
5. GM view defaults to **All Officers**, with a dropdown for individual previews. Players see only owned-PC actions that their office, skill ranks and Guild Level qualify them to perform. Their requests await GM approval.
6. Commander handles contracts; Personnel handles recruiting, loyalty and leader development; Operations handles training/recovery and mission preparation; Quartermaster handles finances and assembles squads; Passes and Reorganize Command are general; Boost Morale belongs to Personnel. Everyone gets an action or pass before Assignments; Operations can reserve remaining actions for later plans.
7. In Actions, use the Contracts, Recruits and Crew workspaces to inspect discoveries and secure/hire directly. In Assignments, Quartermaster uses the inline crew and distinct-lead editor, Operations prepares the saved squad, and Quartermaster deploys it. Assembly and deployment are routine.
8. In Events, review every mission check—including the third—before proceeding; spend an actual PC Hero Point if desired. Resolve compensation/MVP, then the monthly event.
9. Complete advancement/feat choices and **Complete Guild Turn**. The guide closes, management remains, and next Upkeep is prepared but not paid.

**Reorganize Command** in Actions costs one shared action, once per turn, for the whole PC role reshuffle. Actor links, Hero Points and earlier actions stay with those characters.

[Full guided-turn scope and test checklist](../../docs/foundry-turn-workspaces-alpha.4.md).

## Officer portfolios

| Office | Gameplay responsibility |
| --- | --- |
| Guild Commander | Leads, acquisition, brokerage, public reputation, Guild Feats |
| Quartermaster | Expenses, financing, bases/upgrades, team assembly and deployment |
| Operations Officer | Training, medical recovery, recon/briefings, extraction plans and mission resolution |
| Personnel Officer | Candidates, hiring/release, loyalty programs and Leader Feats |

**Brief Mission Team** is a basic Operations action during Assignments: one shared action and 25 credits per assembled operative, with no check or trained skill requirement. It gives +1 circumstance to one selected phase. It shares the existing preparation slot with Recon and advanced briefings, uses the highest circumstance bonus, and locks the saved squad/leads. These values are provisional; existing trained actions and unlock levels are preserved. Existing training continuation decisions now belong to Operations.

## Alpha scope

- Shared persistent Guild sheet, stored in a module flag on a Journal Entry with default Observer ownership.
- GM commits shared state. Players submit owned-PC actions for GM approval; the first active GM by user ID coordinates mutations. Requests use native Actor permissions, not action-request sockets.
- Native PC skill statistics/ranks and administrative check outcomes. The browser's PC modifier advancement benchmark is disabled for linked PCs.
- Actual Foundry dice for missions, discovery tables, and monthly events, posted to chat alongside readable result summaries.
- Actual PC Hero Point spending for pending mission rerolls; no separate point pool or automatic session reset.
- Reputation, relative Guild XP, shared actions, generated names/lore, recruits, Free Agent/Retained employment, training, recovery, mission settlement, existing feats, facility staffing, upgrades, purchases, and loans.
- Reputation-based guild-wide Operative Capacity: below 20 = 6; 20–49 = 9; 50–79 = 12; 80–100 = 15. Both employment types count; onboarding/training/recovering/deployed/missing operatives occupy slots. Candidates, expired, released, inactive, and dead records do not. A capacity drop blocks recruitment without dismissing existing personnel.
- Routine release in Activity for Available, Onboarding, or Recovering operatives without unresolved commitments. Paid fees are not refunded and debts remain.

## Interrupted transactions

Guild spending is speculative until a command and its dice finish. One local queue and saved revision checks prevent overlapping or stale guild commands from spending twice. Only the coordinating GM writes the observer-protected guild Journal.

Hero Points belong to a different Actor document. A durable pending transaction is saved before spending the point. If that actor update or the final guild save fails, normal guild actions stop and **Recover Hero Point spend** resumes the recorded result without rerolling or spending twice. Completed saves write `pendingHeroSpend: null` because Foundry recursively merges flags; omission does not remove that marker. If the actor's points were independently changed to neither the recorded before nor after value, recovery stops for GM reconciliation. Do not delete the linked actor during recovery.

Chat delivery uses a saved outbox and per-message identifiers. **Retry chat delivery** posts outstanding results without repeating already present messages. The guild state is the authoritative result; rolling independently from an existing chat card does not revise a settled guild action.

## Deliberately deferred

Further officer signatures/specialist offices, full combat NPC generation, browser-save import and backup restoration UI, headquarters relocation/crew-transfer UI, authored rescue adjudication for Missing personnel, complete creditor enforcement, further feat catalogs, Guild Archetypes, morality, and Heat. Base purchases can be tested, but changing which owned property serves as HQ still needs the relocation UI. Existing missing-person and financial enforcement gaps remain prototype rules, not newly automated campaign consequences.

Guild Archetype feats on even levels and Guild Feats on odd levels are future design direction. They are not implemented here. No external generation API or runtime AI is required.

## Verification

Run `node foundry/tests/alpha.test.mjs` from the repository root. The harness mocks Foundry documents, actor statistics, dice, chat, and application rendering. 70 checks cover authority, concurrency, native-style flag merging and old stuck Hero Point saves, owned-PC requests, role/skill gates, GM all/individual previews, discovery workspaces and direct card actions, inline squad saves and quotes, revised officer portfolios, non-stacking basic briefings, restructuring, squad reservations, guided stages and window completion, Journal access, compensation and chat retries. It cannot establish real Foundry loading, visual layout, live multiplayer behavior, or compatibility with other modules. The [October 13 live test report](../../docs/guild-discovery-live-test-2026-10-13.md) separately records the completed GM contract and recruitment smoke test. Multiplayer and broader compatibility testing remain separate.

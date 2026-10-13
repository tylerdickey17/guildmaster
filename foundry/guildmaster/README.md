# Guildmaster Foundry Alpha

Version **0.1.0-alpha.1** targets **Foundry 14.369 / native SF2e 1.6.1**. It has automated integration coverage but has **not yet been run inside a licensed Foundry instance**. The manifest deliberately does not declare a verified Foundry version.

## Install

The GitHub repository is private, so this alpha uses **manual ZIP installation**. Foundry cannot fetch its package through an unauthenticated raw GitHub URL. Repository visibility is preserved; no access token is included in the package.

1. Download `guildmaster-0.1.0-alpha.1.zip`.
2. Create `Data/modules/guildmaster/` inside your Foundry user-data directory.
3. Extract the ZIP contents there. The result must be `Data/modules/guildmaster/module.json`, not an extra nested folder.
4. Restart the Foundry server/application, launch an SF2e test world, and enable **Guildmaster** in Manage Modules.

This manifest intentionally omits remote `manifest` and `download` URLs. Automatic installation/update can be added when an accessible distribution location is available.

Open **Game Settings → Configure Settings → Guildmaster → Open Guildmaster**, use the Journal directory's Guildmaster button, or press **Ctrl+Shift+G**. This macro also opens it:

```js
game.modules.get('guildmaster').api.open();
```

## First session

1. Create a new guild. The staffed setup has 2,000 credits, four generated operatives, a leased HQ, and a Training Suite. Choose four PC officer slots for a four-person table.
2. Open Officers and link a different existing SF2e character to each slot. Generated operatives are separate, lightweight guild records.
3. Review Upkeep, pay available funds, then open Activity. The staffed first invoice is 350 credits; the lean first invoice is 300.
4. Choose the acting officer in the toolbar. Work the Network to find recruits or contracts. Administrative checks open that PC's native SF2e skill dialog; cancelling spends no guild cash/actions.
5. Secure an opening contract, assign three to six operatives, declare three distinct phase leads, review wages/payout/DCs, and deploy. Deployment is routine.
6. Begin Events, roll each phase, and review its result. Before accepting a result, optionally spend one linked PC's actual Hero Point. Keep the reroll. The third check also remains visible before settlement.
7. Resolve failed-job wages or MVP, continue to the monthly event, make any Guild Feat choices, and begin the next turn.
8. Export a JSON backup and refresh to check that the same guild, treasury, crew, and results remain.

## Alpha scope

- Shared persistent Guild sheet, stored in a module flag on a Journal Entry with default Observer ownership.
- GM commits changes; players observe and participate through table discussion. First active GM by user ID coordinates mutations. There are no player action-request sockets yet.
- Native PC skill statistics/ranks and administrative check outcomes. The browser's PC modifier advancement benchmark is disabled for linked PCs.
- Actual Foundry dice for missions, discovery tables, and monthly events, posted to chat alongside readable result summaries.
- Actual PC Hero Point spending for pending mission rerolls; no separate point pool or automatic session reset.
- Reputation, relative Guild XP, shared actions, generated names/lore, recruits, Free Agent/Retained employment, training, recovery, mission settlement, existing feats, facility staffing, upgrades, purchases, and loans.
- Reputation-based guild-wide Operative Capacity: below 20 = 6; 20–49 = 9; 50–79 = 12; 80–100 = 15. Both employment types count; onboarding/training/recovering/deployed/missing operatives occupy slots. Candidates, expired, released, inactive, and dead records do not. A capacity drop blocks recruitment without dismissing existing personnel.
- Routine release in Activity for Available, Onboarding, or Recovering operatives without unresolved commitments. Paid fees are not refunded and debts remain.

## Interrupted transactions

Guild spending is speculative until a command and its dice finish. One local queue and saved revision checks prevent overlapping or stale guild commands from spending twice. Only the coordinating GM writes the observer-protected guild Journal.

Hero Points belong to a different Actor document. A durable pending transaction is saved before spending the point. If that actor update or the final guild save fails, normal guild actions stop and **Recover Hero Point spend** resumes the recorded result without rerolling or spending twice. If the actor's points were independently changed to neither the recorded before nor after value, recovery stops for GM reconciliation. Do not delete the linked actor during recovery.

Chat delivery uses a saved outbox and per-message identifiers. **Retry chat delivery** posts outstanding results without repeating already present messages. The guild state is the authoritative result; rolling independently from an existing chat card does not revise a settled guild action.

## Deliberately deferred

Player-submitted action approval, complete officer signatures/Reorganize Command, full combat NPC generation, browser-save import and backup restoration UI, headquarters relocation/crew-transfer UI, authored rescue adjudication for Missing personnel, complete creditor enforcement, further feat catalogs, Guild Archetypes, morality, and Heat. Base purchases can be tested, but changing which owned property serves as HQ still needs the relocation UI. Existing missing-person and financial enforcement gaps remain prototype rules, not newly automated campaign consequences.

Guild Archetype feats on even levels and Guild Feats on odd levels are future design direction. They are not implemented here. No external generation API or runtime AI is required.

## Verification

Run `node foundry/tests/alpha.test.mjs` from the repository root. The harness mocks Foundry documents, actor statistics, dice, chat, and application rendering. It covers authority, stale/concurrent commands, cancelled checks, native skill/rank handling, capacity, phase review, real-resource Hero Point transactions, failure recovery, compensation, chat retries, escaping, and read-only player controls. It cannot establish real Foundry loading, visual layout, live multiplayer behavior, or compatibility with other modules. Use the acceptance checklist in `docs/foundry-alpha-0.1.0.md` for the first actual world test.

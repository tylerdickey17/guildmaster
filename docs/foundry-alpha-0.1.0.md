# Foundry alpha 0.1.0-alpha.2 — October 13, 2026

Owner target: **Foundry 14.369 / SF2e 1.6.1**. [Module source and installation](../foundry/guildmaster/README.md). [Manifest](../foundry/guildmaster/module.json). [Package](../foundry/releases/guildmaster-0.1.0-alpha.2.zip). [Automated verification](../foundry/verification-alpha.json).

This is the first module implementation. The browser remains on its existing 0.3.11 source. The module reuses that rules/content engine with isolated globals and a Foundry adapter. It adds the approved capacity rule in its own engine copy; this does not claim a browser deployment or a new pacing study.

The owner subsequently authorized public repository visibility for manifest installation. Alpha0.1.0-alpha.2 adds the stable GitHub raw `manifest` and versioned ZIP `download` URLs. Connected GitHub tools do not expose repository visibility edits, so changing that setting remains with the owner unless later verification confirms it. Until public access is verified, do not claim the remote installer works. The prior manual-only alpha1 package remains historical.

## Integration choices

- Persist one guild envelope on a Journal Entry flag: schema, module version, revision, state, chat outbox, and optional interrupted Hero Point transaction. Default Observer ownership lets players share the sheet while server-side document permissions keep them from modifying the guild.
- Use ApplicationV2 and DialogV2. No new SF2e actor type or alteration of the system's data schema is needed for this first alpha.
- Link each PC officer to a distinct world character Actor UUID. At action time, hydrate skill modifiers and proficiency from the system's statistics. Native administrative checks preserve native degree adjustments. Hired chiefs retain their printed benchmark statistics; the initial interface primarily targets PC officers.
- Use real Foundry d20 rolls for mission resolution, discovery tables, and Events. Locally generated names and lore still use stored seeded content data, independently of check outcomes.
- Serialize commands on the coordinating GM, reject stale revisions, and commit only successful commands. Players currently announce decisions at the table; the GM applies them. Multiple active GMs elect the first user ID; live multi-client testing is still required.
- Spend actual linked Actor Hero Points for mission rerolls. The two-document save has a durable pending intent and explicit recovery. No session reset or automatic award is implemented by the guild module.
- Deliver dice and result summaries after the guild save through an idempotent outbox. Third-phase review precedes final settlement.

The engine's replay adapter starts from a fresh speculative copy after each awaited die/native check. A cancelled native check therefore leaves guild treasury/actions untouched. Native SF2e after-roll effects may still run when a native roll is made; the module does not promise to roll back unrelated system rule effects if a later guild revision check fails.

## Approved capacity and provisional release details

| Reputation | Capacity |
|---|---:|
| Below 20 | 6 |
| 20–49 | 9 |
| 50–79 | 12 |
| 80–100 | 15 |

Capacity is guild-wide, covering both Free Agents and Retained Operatives. All hired nonterminal statuses count, including Missing/Captured, Training, Recovering, Deployed, and Onboarding. Candidates do not reserve slots until hired. Officers and ordinary facility staff do not count. A Reputation loss preserves the existing roster and its ability to deploy, while preventing further hiring until capacity permits it. Future feats can modify capacity; no new capacity feat was authored in this pass.

To make roster replacement usable, routine release costs no Guild Action and is restricted to personnel without active commitments. It does not refund paid hiring/retainer costs, clear arrears, or allow a deployed/missing worker to disappear from the capacity count. These release restrictions are designer-selected prototype procedures, not a complete employment/termination system.

## Future design recorded from this conversation

- Expand both Leader Feats and Guild Feats for organizational customization; capacity improvements are a possible future Guild Feat benefit.
- Guild Archetypes, similar in role to character archetypes, are an approved future direction. Proposed schedule: Guild Feats at odd levels, Archetype Feats at even levels, alongside even-level development unlocks. Exact entry levels and feat lists remain unbuilt.
- Future contracts could affect guild morality/conduct and legal exposure/Heat, with tempting illegal work, escalating authority scrutiny, Upkeep investigation rolls, bribes, fines, disruption, closure, or imprisonment. The owner explicitly deferred this system. Morality versus Heat remains a proposed refinement, not an implemented replacement for Reputation.

## First actual Foundry acceptance test

1. Once public access is confirmed, install with the stable manifest URL from the module README. Manual ZIP installation remains a fallback. Use a separate native SF2e test world on the stated versions. Enable the module; confirm there are no startup console errors.
2. Open the sheet from module settings, Ctrl+Shift+G, and the Journal directory. Check resizing, scrolling, and dialogs in the installed Foundry theme.
3. Create a staffed guild; confirm 2,000 credits, four operatives, four officer slots, a 350-credit invoice, and a saved Observer-owned Journal.
4. Link four distinct PCs. Change a PC skill/rank and confirm the next Guild Action uses the new value. Cancel a native check and confirm neither actions nor guild funds change.
5. Connect a player client: confirm the shared state refreshes and spending/phase buttons are read-only. With two GMs, confirm only the coordinating GM can commit.
6. Secure and deploy a contract with three different leads. Confirm assignment quote, wages, payout, DCs, proficiency requirements, and extra-person adjustments.
7. Roll all three checks, inspect chat, and verify the third result remains visible. Reroll a pending phase and verify exactly one actual PC Hero Point is spent and the second result is kept.
8. Refresh during phase review. The existing roll must remain; it must not roll again or consume another action/point.
9. Complete settlement, failed-job compensation/MVP, monthly event, and advancement. Confirm count-only completion and money/XP match the recorded results.
10. Recruit up to capacity; verify both employment types are blocked at the limit. Lower Reputation and check that existing operatives remain usable. Release an eligible operative and hire a replacement.
11. Continue into training, higher-level property/loan controls, and facility Upkeep. Record any missing required interface path instead of treating engine API coverage as complete UI support.

No Foundry runtime, visual, live multiplayer, or third-party module compatibility result is claimed until that test is performed. The manifest omits `compatibility.verified`.

## Primary API references consulted

- [Foundry module development](https://foundryvtt.com/article/module-development/)
- [ApplicationV2](https://foundryvtt.com/api/classes/foundry.applications.api.ApplicationV2.html)
- [DialogV2](https://foundryvtt.com/api/classes/foundry.applications.api.DialogV2.html)
- [Roll and public messageMode](https://foundryvtt.com/api/classes/foundry.dice.Roll.html)
- [SF2e 1.6.1 manifest](https://github.com/foundryvtt/pf2e/blob/sf2e-1.6.1/system.sf2e.json)
- [Native Statistic implementation](https://github.com/foundryvtt/pf2e/blob/sf2e-1.6.1/src/module/system/statistic/statistic.ts)
- [Native character resources](https://github.com/foundryvtt/pf2e/blob/sf2e-1.6.1/src/module/actor/character/data.ts)
- [Native check degree outcome](https://github.com/foundryvtt/pf2e/blob/sf2e-1.6.1/src/module/system/check/roll.ts)

These sources inform API integration. Original Guildmaster rules/content are reused from the repository; no SF2e system source is bundled.

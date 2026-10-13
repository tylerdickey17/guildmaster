# Guild discovery and rulebook interface

October 13, 2026. Foundry release 0.1.0-alpha.5, based on the locally installed and live-tested October 13 revision. Implements the requested removal of player-selected Target Level from searches for contracts and recruits, including exclusive brokerage, and the selected light-panel, purple/red, angular interface direction.

## Discovery rule

Work the Network costs one shared Guild Action. The officer rolls Diplomacy against the guild's administrative DC. Players choose whether to seek contracts or recruits; they do not choose a level. Recruitment retains its optional ancestry preference.

The guild's existing progression scale determines the center of its discovery table: `min(20, 2 × Guild Level − 1)`. Use the published level DC for that center. Each result independently rolls its level offset from the existing degree-based table; clamp the result to Level 1 through `min(20, 2 × Guild Level + 1)`.

This is an automatic table reference, not another player input. It reuses the existing administrative progression rather than introducing new distribution weights. These are custom Guildmaster rules usable at a PF2e or SF2e table; they are not official Paizo subsystem rules.

| Check degree | Level d20 result relative to the guild's table center |
|---|---|
| Critical Failure | 1–20: −1 |
| Failure | 1–12: −1; 13–18: +0; 19–20: +1 |
| Success | 1–5: −1; 6–17: +0; 18–20: +1 |
| Critical Success | 1–10: +0; 11–18: +1; 19–20: +2 |

| Guild Level | Table center | Search DC | Successful search: resulting level and probability |
|---|---:|---:|---|
| 1 | 1 | 15 | L1: 85%; L2: 15% |
| 2 | 3 | 18 | L2: 25%; L3: 60%; L4: 15% |
| 3 | 5 | 20 | L4: 25%; L5: 60%; L6: 15% |
| 4 | 7 | 23 | L6: 25%; L7: 60%; L8: 15% |
| 10 | 19 | 39 | L18: 25%; L19: 60%; L20: 15% |

Low-level work falls out of ordinary searches as the guild advances. Below-center opportunities still occur. Level 1 opportunities do not remain a permanent tail in the distribution. Authored offers, existing contracts, event rewards, and existing recruits are not rerolled or deleted by this change.

Quantity, difficulty, rarity and specialist rules for Work the Network remain unchanged: Failure, Success and Critical Success generate three options; Critical Failure rolls d20 for zero (1–10) or one (11–20). Finding options remains separate from paying to secure or hire them. Recruitment Pipeline and the funded Recruitment Office retain their existing quality benefits.

## Exclusive brokerage

Broker Exclusive Deal uses the same guild DC and automatic level table. Its costs and access remain one shared action, 50 credits, Friendly Reputation and Trained Diplomacy. Critical Failure/Failure find zero offers; Success finds one; Critical Success finds two. Each offer rolls level, rarity and mission profile. Its difficulty remains Exclusive, with its existing deadline and separate securing action.

Brokerage now records its own discovery results and table dice in the guided contract workspace, linked to the brokerage check rather than a previous Network check.

## Saved state and scope

Old saved requests containing a numeric level still resolve, but that value cannot choose the DC or result distribution. Legacy recruitment requests retain their ancestry argument. Existing historical discovery records are left intact; the UI no longer presents their former target as a current choice. Existing personnel, offers, quotes, mission rolls, currencies and Hero Point state remain intact.

The rule is implemented in both the current browser source and Foundry engine. Frozen playtests, published archives and historical balance reports retain their original rules. This revision supersedes the target-selection portions of the earlier prototype rules for these three discovery actions only.

The release is alpha.5, targeting Foundry 14.369 and SF2e 1.6.1. This change does not add a PF2e adapter or claim PF2e Foundry compatibility.

## Interface

The Foundry guild sheet, guided turn, and module prompts use warm light panels, dark purple headers, red primary actions, squared framing with angular accents, clearer table contrast and visible keyboard focus. The turn rail distinguishes completed and current stages. Discovery summaries are compact; mission and recruit cards use wider columns. Narrow windows wrap the navigation and stack controls through container queries, based on the module window's size.

No external fonts, art or network dependencies are required. The browser prototype's discovery controls are updated, while the visual overhaul applies to the Foundry module.

## Verification

- 70 Foundry integration checks pass, including all guild levels and discovery degrees, exact success-table weights, level bounds, legacy requests, ancestry preservation, brokerage costs/results and both search-dialog entry points.
- 128 browser engine checks pass, including the existing 48 campaigns / 288 intervals.
- Live Foundry 14.369 / SF2e 1.6.1 validation passed for search, securing, hiring, onboarding, squad assembly, deployment, resolution, settlement, turn completion and reload persistence. See [live test report](guild-discovery-live-test-2026-10-13.md).
- Rendered Foundry-template previews inspected for contracts, recruits and assignments at desktop and narrow widths. These previews use mocked game documents and do not constitute a live Foundry smoke test.
- No claim of campaign balance or new PF2e compatibility. Increased search DCs and the loss of deliberately low-level searches should be included in the next campaign playtest.

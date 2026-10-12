# Prototype0.3.9: survival choices and randomized discovery

October12,2026. The user disliked2-of-3 plus a required phase, requested PC Hero Point rerolls because bad jobs can cripple the guild, described the arrears recovery spiral, and requested degree-based randomized contract/recruit tables with three results by default. This pass implements a designer first draft under the established designer-led playtest workflow. It supersedes the Essential/count and0/1/2/3 discovery rules in prior drafts.

## Count-only completion

New and unsettled contracts complete when the printed successful-phase count is met. Ghost Relay no longer requires Engagement. Critical Success still counts once; complications still apply on overall completion. Easy1/3, Normal/Hard/Expert/Exclusive2/3, Legendary3/3 remain.

Historical settled outcomes, cash, XP and Reputation are preserved. An existing unresolved job loses its Essential phase gate while retaining rolls, lead declarations, quoted wages/DCs and its frozen required count. Older Hard jobs whose actual frozen requirement is3 retain that printed count. Past failures are not automatically resettled.

## PC Hero Points

[SF2e Player Core Hero Points](https://2e.aonsrd.com/rules/381-hero-points) and [PF2e Player Core Hero Points](https://2e.aonprd.com/Rules.aspx?ID=2333) provide the guide: one at session start, maximum three, a one-point reroll that keeps the second result, one fortune reroll per check.

**Custom guild extension:** any PC can spend their own point on an NPC contract phase. Points belong to the PC, not the guild action pool or hired outpost chiefs.

- New game/migration initializes each PC with1 once.
- Spend during the current pending phase review, including Extraction, before accepting/settling it.
- No action/cash cost. Only one Hero Point on the check; same modifier/DC, new deterministic die, second result kept even if worse.
- Original/rerolled dice, outcomes and the paying PC are retained on screen, in saves and exported logs.
- Recompute phase complication and forward effect from the final die. No money, availability or complication is applied from a discarded original outcome.
- Reloading cannot refund the point or reopen a used fortune opportunity.
- Guild Turns do not refresh points. Bases & upgrades has explicit GM awards (cap3) and **Start a new table session** (old points expire; PCs reset to1). A session cannot reset while a phase is awaiting acceptance.
- **Scope:** mission phase checks currently support rerolls. Other administrative checks still lack a provisional Hero Point review step; dying/PC combat is outside this browser demo.

These are meaningful limited rerolls, not automatic success or unlimited protection.

## Discovery quantity

Work the Network remains one action, Diplomacy against the searched level's published DC; finding is separate from hiring/securing. Specific contract difficulty is now generated rather than selected.

| Diplomacy result | Quantity |
|---|---:|
| Critical Failure | d20 quantity:1–10 =0;11–20 =1 |
| Failure | 3 |
| Success | 3 |
| Critical Success | 3 |

Each result independently rolls d20 for level, difficulty (contracts), rarity and profile/template. Recruit specialist skill selection also rolls if relevant. All used table dice and the resulting list are visible in the discovery panel and log, and remain in save history.

Choose target level before rolling. Target maximum is min(20,2×Guild Level+1); generated levels are clamped to1 through that same cap. Higher-level/harder results are options, not compulsory assignments or guaranteed profitable work.

### Level table: offset from searched level

| Check degree | d20 result |
|---|---|
| Critical Failure | 1–20:−1 |
| Failure | 1–12:−1;13–18:0;19–20:+1 |
| Success | 1–5:−1;6–17:0;18–20:+1 |
| Critical Success | 1–10:0;11–18:+1;19–20:+2 |

### Contract difficulty table

| Check degree | d20 result |
|---|---|
| Critical Failure | 1–20:Easy |
| Failure | 1–12:Easy;13–19:Normal;20:Hard |
| Success | 1–5:Easy;6–15:Normal;16–19:Hard;20:Expert |
| Critical Success | 1–2:Easy;3–9:Normal;10–16:Hard;17–19:Expert;20:Legendary |

Exclusive contracts still come from their separate brokerage route; randomized general leads do not silently become deadline-bound.

### Rarity table: contracts and recruits

| Check degree | d20 result |
|---|---|
| Critical Failure | Common |
| Failure | Common |
| Success | 1–16:Common;17–20:Uncommon |
| Critical Success | 1–8:Common;9–17:Uncommon;18–20:Rare |

Rarity is separate from difficulty. In this prototype a contract's rarity is an availability/narrative tag, with **no extra payout multiplier**; existing difficulty factors/rewards still apply. Authored rarity-specific rewards/access are future content. There are no hidden mandatory rarity penalties.

Recruit quality has a small concrete benefit: Common gets the authored four-skill profile; Uncommon adds one moderate-benchmark unlisted skill; Rare adds one high-benchmark unlisted skill. Standard level-based proficiency and prices remain. No free hire, leadership feat or additional officer action is granted.

### Recruitment improvements

Because ordinary quantity is now3, the old extra-candidate bonuses are replaced by designer prototype quality improvements:

- Recruitment Pipeline: first non-critical-failure recruitment search each Guild Turn raises one candidate's level by1, within the search cap.
- Funded local Recruitment Office: on Success/Critical Success upgrade one Common candidate to Uncommon, if present. At most one upgrade; quantity remains3. No benefit from an unfunded/remote facility.

Existing chosen Pipeline feats and installations remain, using the revised effect. Candidates/leads still expire end of next Guild Turn; onboarding starts the turn after hire.

## Recovery from arrears

Automatic Upkeep pays **current monthly obligations before prior arrears**; players can still use individual Pay buttons to choose a different priority. This addresses the case where old bills consume enough cash to leave an otherwise fundable current retainer/service unavailable.

Routine **Pay arrears** now asks for a payment budget rather than automatically consuming the treasury. The suggested amount retains known next Upkeep plus frozen wages for unresolved deployed jobs; future client receipts are not assumed. Players can deliberately override the reserve suggestion. Backend rejects invalid/nonpositive/excess-cash budgets, preserves unpaid creditor balances and updates loan principal correctly.

No debt is forgiven, interest/default clocks and new-loan underwriting stay. These tools improve recovery choices; they do not guarantee solvency with an unfundable operating model or replace future restructuring/creditor rules.

## Economy and compatibility

Normal900, Free Agent110, staffing/base/hiring/training prices, failure Loyalty, project/loan unlocks and odd-level feats remain. Contract phase review continues; saved pending phases gain the Hero Point choice. Prepared invoices remain; updated payment ordering applies only to unpaid settlement.

[0.3.7 arithmetic](../playtests/prototype-0.3.7/opening-balance.json) remains a **no-Hero-Point-spending, one-contract baseline**, not the expected result of using this patch's new rerolls/discovery strategies. No new whole-economy balance claim is made.

## Verification and publication

85 checks passed:48 campaigns×6 intervals (288 intervals),600 seeded discovery searches covering all degrees/quantity branches/rarities, all ordinary completion combinations, third-check rerolls, used-point reload protection, worse second rolls, next-phase modifiers, session resources,038 pending-save migration, specialist quality, current service funding with arrears and partial debt payment. Minimal DOM checks exercise Hero Point and discovery UI. Full browser visual QA unavailable.

[Source](../prototypes/browser-playtest/README.md) · [Frozen values](../playtests/prototype-0.3.9/values.json) · [Verification](../playtests/prototype-0.3.9/verification.json).

Live: https://contract-operations-playtest.primeangel2.chatgpt.site

- Source: `f9455b0e1b44f503e3795ba3782054658dad8004`
- Deployment: `appgdep_6acd1f01f7208191aea7fec4fc748212`, succeeded
- Version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_e234e98cec308191a2bf70562380510e`

Next feedback: quality table distribution, point spending/session cadence, distress recovery, rarity-specific contract content and administrative reroll review; continue office/Foundry work afterward.

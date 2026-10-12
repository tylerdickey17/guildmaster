> **Adopted for the live 0.3.7 test:** the user approved900 Normal Level1 payout and110 per operative on October12. [Executable rules](prototype-values-v0.3.7.md) supersede the discussion-only status below. The higher-level treasure-based curve and equipment accounting remain design work; the test retains1.25 growth.

# Startup profitability and XP-based compensation

October 12, 2026. **Discussion draft; wage and payout changes are not implemented.** The user prefers a barely sustainable Level 1 business that gains earning capacity with progression, and questions raising client payouts without raising crew pay.

## Recommended target

A clean successful job should cover its crew and contribute toward overhead. A Level 1 guild can have a small expected monthly deficit, funded from a visible startup reserve, while a good month breaks even or earns a modest surplus. Avoid making successful routine operation inevitably fail with no affordable route to growth. Expansion levels pace complexity; they do not guarantee solvency. Loans bridge a fundable growth decision, rather than permanently subsidize negative margins.

Current 600 payout/50 per operative already produces +35 after one clean completion and 365 overhead, before other actions. In the bounded opening-contract model it averages −62.81/month when failures pay half and repairs are included. Thus the observed early loss is not automatically a defect. Training, recruitment, replacement and expansion make actual burn greater.

## Which published table to use

The [user-linked SF2e Treasure for New Characters](https://2e.aonsrd.com/rules/737-treasure-for-new-characters) describes wealth for creating a character at a given level. It is a cross-check for equipped personnel, not income earned while progressing through that level.

Use [SF2e Treasure by Level](https://2e.aonsrd.com/rules/731-treasure-by-level) for an XP-linked compensation budget: treasure awarded to four PCs over a level, including permanent items, consumables and currency. [PF2e's matching table](https://2e.aonprd.com/Rules.aspx?ID=2656) has the same early progression at one-tenth the nominal numbers (175 gp versus 1,750 credits at Level 1). This is table calibration, not an assertion that a credit is a gold piece.

Standard advancement is 1,000 XP. For a completed Normal mission granting 100 participation + 150 completion = 250 NPC XP, each operative earns one quarter of a level; exclude variable MVP and optional leadership bonuses from quoted pay.

**Full reward-value benchmark per operative = (four-PC treasure budget at that operative's level ÷ 4) × (advertised completed mission NPC XP ÷ 1,000).**

Use NPC XP, not Guild XP, guild level, summed squad level, or cumulative new-character wealth. Freeze pay on deployment; later leveling does not change that quote.

| Operative level | Four-PC treasure over level | Four-PC currency portion | Per-operative full value at 250 XP | Per-operative currency-only reference |
|---|---:|---:|---:|---:|
| 1 | 1,750 | 400 | 109.375 | 25 |
| 2 | 3,000 | 700 | 187.5 | 43.75 |
| 3 | 5,000 | 1,200 | 312.5 | 75 |
| 4 | 8,500 | 2,000 | 531.25 | 125 |
| 5 | 13,500 | 3,200 | 843.75 | 200 |

These are calibration references, not published salary rules. Full value can become an all-inclusive mercenary fee when the operative funds their own kit and upgrades; alternatively split wages from a separately funded equipment allowance. Do not pay the full budget as wages and also grant the same equipment value a second time. A currency-only reading would make current 50 at Level 1 exceed the 25 benchmark, so we cannot call it objectively underpaid without specifying who funds gear.

For the next balancing pass, test **110 per Level 1 operative** as the rounded all-inclusive fee for a 250-XP Normal completion. A 75-credit cash alternative represents only part of the full reward value and needs an explicit equipment treatment. Failure remains quoted full/half/none under the accepted risk-sharing agreement; participation XP is separate from the wage choice.

Higher-level rates must be recalibrated with client payouts together. The current exponential wage curve cannot simply be replaced by this treasure curve while retaining every current payout: higher-level costs would overtake receipts. Different contract XP awards also change the compensation budget; avoid granting larger XP but charging the same all-inclusive rate without a deliberate reason.

## Paired payout/pay comparison

Exact 8,000-roll opening Dock Nine enumeration, four Level 1 Free Agents with optimal distinct leads, current DC/forward effects, 365 overhead, half wages on failure, and repair costs scaled with the tested wage:

| Normal payout | Pay per operative | Clean successful month after overhead | Expected monthly net |
|---|---:|---:|---:|
| 600 (live) | 50 (live) | +35 | −62.81 |
| 600 (draft) | 75 (draft) | −65 | −153.78 |
| 900 (draft) | 110 (draft) | +95 | −39.08 |

900 **alone**, retaining 50 wages, yields expected +179.25; that is a substantially different startup experience. 900 paired with 110 compensation preserves a small expected deficit while rewarding a clean success and paying crew near the full-value benchmark. Therefore 900 is not automatically excessive: assess retained guild margin and crew compensation together.

The model's completion probability is 80.6875%; Extraction Missing risk is 5%. It excludes future personnel loss, training, recruitment, replacement, level growth, multiple squads, loans and expansions. It is arithmetic for one opening contract, not campaign balance evidence.

[Exact comparison output](../playtests/prototype-0.3.6/opening-balance.json) · [Reproduce](../prototypes/browser-playtest/balance-check.cjs) with `node balance-check.cjs`.

**Next recommended experiment:** paired 600/50 versus 900/110 startup seasons, tracking cash runway, operatives' advancement, failed-pay decisions and ability to afford useful management actions. Keep the live 600/50 until this paired change is adopted.

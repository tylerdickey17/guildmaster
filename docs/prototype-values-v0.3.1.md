# Prototype values: edition 0.3.1

October 10, 2026 (America/Chicago). **Current designer-selected live-play prototype**, revised after six independent numerical reviews of frozen 0.3.0. This patch takes precedence over the affected numbers/content in [0.3.0](prototype-values-v0.3.md); all other values there remain in force. Edition [0.2](integration-rules-v0.2.md) remains the procedural authority. Machine-readable core numbers: [values.json](../playtests/prototype-0.3.1/values.json); these prose cards also supply effects and costs not encoded in JSON. Both packs and evidence are retained; no user-approved core mechanic is removed.

## Keep these starting values

Start **Guild Level1, 2,000 credits, four Level1 mercenaries, two PC officers, a150/month leased HQ**. Guild pool **3/3/4/4/5/5/6/6/7/7** across levels1–10; officer cap **two**. Guild and NPC levels each require **1,000 XP**. Standard rewards **100 participation +150 completion XP, 250 Guild XP**, zero client cash on failure. Normal pay scale starts50 and grows25%/NPClevel, rounded to5. Failed wages remain player choice full/half/none, Loyalty **+10/+4/−10**; failure still damages Reputation.

Training remains **150 XP**, consecutive **+10% per block** above the first, maximum **+50%**, no retroactive bonus. Cost50/trainer/cohort+25/person; basic cohort4. Continuous training takes19 completed blocks to reach Level5. This is a training-only arithmetic timeline; it needs funded instruction, not a guaranteed free path for a starting guild.

## Adopted revisions and evidence

| Issue in frozen0.3.0 | 0.3.1 prototype decision | Purpose |
| --- | --- | --- |
| Cash premiums rewarded undersized/mixed squads; aL20 lead plusL1 support received50% extra cash onL20 work | **No positive cash bonus** for underrecommended size or Squad Level. Keep10% discounts for each extra person/overrecommended level, combined floor50%, maximum100%. | Client budget stays fixed when players undertake extra risk; remove bonus arbitrage. |
| Only average-based payout left extreme underlevel staffing deployable in the generic fixture | Each default card discloses **minimum Squad Level=max(1,recommended−2)**; max20. Each individual may still differ. Card authors may explicitly change the minimum for story work. | Use the edition0.2 requirement for visible deployment bounds; preserve floor-average and mixed squads while bounding unsupported high-level work. |
| Low-level demanding jobs had35.75% completion and mandatory recovery, negative average prestige | Demand/Exclusive use base level DC **+0**, still require **all three phases** and **one turn recovery**; rewards below. | Successful-phase requirement already supplies difficulty. Improve reward for the additional commitment. |
| Hardcase/Infirmary erased all mandated downtime | Reduce **phase-added** recovery by1, but retain the card's **mandatory recovery minimum**. Recovery=max(mandatory, adjusted phase recovery). | Keep demanding recovery as the accepted balancing factor while treating complications. |
| Medical action applied at the boundary when one-turn recovery already expired | Recovery Protocol's successful duration reduction applies **immediately after actual return**, in Activity. It can release staff whose remaining timer becomes0; deployment is routine. | Give the paid medical action a real effect. Captivity/missing/untreated special conditions still block release. |
| Infrastructure savings never covered its25-credit fee | Optimize Infrastructure costs **0 credits**, still one trained action;10%/20% next owned overhead saving on S/CS. | Remove guaranteed cash loss while retaining opportunity cost. It does not discount rent or debt. |
| Training Suite saved20/month, or lost5 with Training Cadre | Suite **500 purchase/15 monthly**, still cohort6, one slot, one turn, Transferable1. | Make the capacity investment useful with and without the Guild Feat; trainer/personal costs unchanged. |
| Max Loyalty still gave35% compatible rival acceptance and small gains hid in10-point bands | Rival refusal uses **floor(Loyalty/5)** versusDC18. | Starting50 refuses65%;100 refuses95%. Real agreements still permit refusal automatically where the offer is incompatible. |

Cash formula: `clamp(1 −0.10×max(0,actual size−recommended size) −0.10×max(0,Squad Level−recommended level),0.50,1.00)`. Default minimum/recommended/maximum headcount remains **2/4/6**. Size DC shift still ±1 per person off recommended, capped±2. Leads/support use actual skills. Changing cash/minimum eligibility does not insert another check or scale XP.

| Card template | DC adjustment | Successful phases | Cash factor | Participation/completion XP | Guild XP | Reputation success/failure | Required recovery |
| --- | ---: | ---: | ---: | --- | ---: | --- | --- |
| Routine | −2 | 1 of3 | ×0.75 | 100/100 | 150 | +1/−2 | None |
| Standard | +0 | 2 of3 | ×1 | 100/150 | 250 | +2/−3 | None |
| Demanding | +0 | 3 of3 | ×2.4 | 200/300 | 600 | +3/−3 | 1 turn |
| Exclusive fixture | +0 | 3 of3 | ×3 | 200/350 | 750 | +4/−4 | 1 turn |

This Exclusive fixture remains an optional, deadline-bound **Standard contract with the Exclusive trait**, not a third mission form. Its actual committed deadline rules are unchanged. Greater rewards also increase single-job liquidity exposure; clients owe payout only on completion.

## Accounting clarifications for this prototype

Maintain arrears by creditor and bill, not a pooled cash deficit: successful wages, rent, asset overhead and each loan separately. All due client receipts arrive before paying any bill. Players prioritize obligations; an unpaid success wage is debt, a waived failed wage is not. Last-three-interval loan-service test includes zeros and does **not** replace a disclosed operating budget/next-bills solvency check. With no completed history, only the existing explicitly underwritten secured startup exception applies.

For loan ledgers, retain full-precision principal/interest internally (display cents). At each monthly boundary charge simple monthly interest on outstanding principal **including a principal installment missed previously**, but do not charge interest-on-interest or additional late fees. Allocate paid funds to oldest unpaid interest, then principal; record unpaid due principal as part of outstanding principal, never add it a second time. At final scheduled boundary, remaining principal plus unpaid interest is the final payoff; a missed final payoff follows normal distress. Partial payments satisfy only actual funded amounts. Each loan's installment/arrears ledger establishes whether a missed boundary is cured. This is custom game accounting, not imported law.

Collateral sale value is70% original purchase price; secured cap70% of that value: effective49% original purchase price. This conservative fixture is intentional for now. Ownership is a long-term/capability goal, not guaranteed cheaper during amortization. Closing/lease overlap, staged construction and committed manager fees must be budgeted visibly. Defaults and deficiency remain per edition0.2; no debt forgiveness is inferred from repossession.

## Verification limits and next playtest

The [report](prototype-simulation-report-v0.3.md) preserves all0.3.0 campaigns, independent exact oracles, debt probes and omissions. The0.3.1 patch has a targeted exact/arithmetic rerun; the **full six-scenario campaign suite has not been rerun under0.3.1**. Baseline Standard probabilities/progression remain applicable because its stats/XP/recovery are unchanged for balanced recommended squads. Do not present0.3.0 campaign cash, staffing or default rates as0.3.1 predictions where payout/eligibility changed.

Keep **Secure Contract=one action** for the first live sessions. A/B showed modest growth cost with two officers and meaningful crowd-out at one action/officer; earned Trusted Client/Standing Agreement already relieve acquisition later. Simulations cannot decide whether spending that action feels repetitive. At the table record actions foregone, officer bottlenecks, job choices, failed-pay choices, recovery idle time and time spent managing the turn. Test paid acquisition against free with the same cards/roster/events before making it permanent.

Track three watchpoints: a single high-level generalist leading all phases may remain efficient within the declared bounds; two-person Routine teams may be appropriate cheap work but should not substitute for card-specific staffing requirements; repeated leader/MVP concentration accelerates one operative relative to the rest. These are not reasons to discard the user's chosen floor-average, equal base XP or flexible phase leads without live evidence.

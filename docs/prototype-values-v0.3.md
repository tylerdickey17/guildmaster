# Prototype values: edition 0.3.0

> **Frozen simulation baseline.** Use the [0.3.1 patch](prototype-values-v0.3.1.md) for current revised values; this document retains the full unchanged catalog and the original tested numbers.

October 11, 2026. Designer-selected starting numbers, authorized for simulation and live playtesting. These are **prototypes**, not final balance or individually ratified user decisions. [Edition 0.2](integration-rules-v0.2.md) remains the procedural authority; this pack supplies its missing numbers. A simulation finding does not silently change this frozen pack. Machine-readable values: [values.json](../playtests/prototype-0.3.0/values.json).

All currency is credits in an abstract **guild economy**. These costs do not establish prices for personal SF2e equipment, PC treasure or adventure rewards. Priority adventures use authored rewards, not an automated three-check conversion. No Foundry implementation is included.

## Guild capacity and advancement

| Guild Level | Shared actions | Concurrent projects | Guild feat |
| --- | ---: | ---: | --- |
| 1 | 3 | 1 | — |
| 2 | 3 | 1 | Yes |
| 3 | 4 | 1 | — |
| 4 | 4 | 2 | Yes |
| 5 | 5 | 2 | — |
| 6 | 5 | 2 | Yes |
| 7 | 6 | 3 | — |
| 8 | 6 | 3 | Yes |
| 9 | 7 | 3 | — |
| 10 | 7 | 3 | Yes |

Each officer executes at most **2 actions**; adding titles does not add capacity. Every catalog action costs 1, except an expressly earned waiver or the free-acquisition A/B variant. New officer and Guild Level capacity begin next turn. Every Guild Level costs **1,000 Guild XP**, with carryover; max 10. A first qualifying completed new facility/upgrade earns **200 Guild XP**, new outpost/major headquarters expansion **300**; the same development cannot receive both. Repair, relocation, sale/rebuy and repeated cosmetic upgrades award none. Real upgrades require a distinct new capability, cost and card.

Start with **2,000 credits, four Level 1 mercenaries and two PC officers** covering the four portfolios. PCs have no mandatory officer salary. The simulation officer fixture has +10 Diplomacy and appropriate trained administrative skills; live PCs use their actual statistics. The starting leased HQ costs **150/month total**, including ordinary overhead, has two upgrade slots, and imposes no roster cap. Starting NPCs have Loyalty 50 and two relevant high skills plus two moderate skills, with explicit rank tags. Starting four is not a maximum.

## Pay, rewards and mission difficulty

Assignment wage at NPC Level L is `50 × 1.25^(L−1)`, rounded to the nearest 5 credits, halves rounded up. Quote once at departure. L1=50, L5=120, L10=375, L15=1,135, L20=3,470. Ordinary recruits cost **two assignment wages** to hire; outside officers cost **100** to hire and **100 + 25 × NPC Level/month** thereafter. Promoting an existing mercenary does not repay a hiring fee; their agreed new salary starts with their appointment. Onboarding and capacity clocks remain edition 0.2.

Base Standard client payout is **3 × recommended headcount × wage at recommended level**. Apply the card factor below, then the combined deployment adjustment, and round the final cash payout to the nearest credit, halves up. Actual deployed wage total uses the actual roster and frozen quotes.

| Card template | DC adjustment | Successful phases needed | Cash factor | Participation/completion XP each | Guild XP | Reputation success/failure | Required recovery |
| --- | ---: | ---: | ---: | --- | ---: | --- | --- |
| Routine | −2 | 1 of 3 | ×0.75 | 100/100 | 150 | +1/−2 | None |
| Standard | +0 | 2 of 3 | ×1 | 100/150 | 250 | +2/−3 | None |
| Demanding | +2 | 3 of 3 | ×1.8 | 150/250 | 400 | +3/−4 | 1 turn |
| Exclusive fixture | +2 | 3 of 3 | ×2.2 | 150/250 | 500 | +4/−6 | 1 turn |

Exclusive is a **trait**, not a new resolution mode. This table's Exclusive is one deliberately difficult Standard template; future Exclusive cards can vary. Its offer expires end of next turn, and once accepted its one-turn mission must be deployed immediately and finish by the next boundary. Failure or accepted deadline breach receives its failure Reputation penalty. Unaccepted expiry does not. Routine/Standard offers expire end of next turn; ordinary acceptance/deployment expiry is harmless as edition 0.2 specifies.

The basic card is **minimum 2/recommended 4/maximum 6** mercenaries, duration one turn, recommended level 1–20. A job's level is selected by its author/client, never recalculated after seeing the deployed squad. Three phase skills: Insertion Stealth or Piloting, Engagement Athletics or Computers, Extraction Survival or Piloting. Author all three chosen skills before acceptance. A Rescue variant uses Standard numbers and marks Engagement **Essential**; it cannot succeed without freeing the captive. These generic cards do not kill/capture anyone; special cards must expressly author those consequences.

Use PF2e level-based DCs and NPC high/moderate skill benchmarks (linked below), preserving each NPC's profile on advancement. Do not add PC proficiency a second time. Listed skills use the edition 0.2 rank tags. Relevant support contributes **Trained +1/Expert +2/Master +3/Legendary +4**, total **cap +3**, excluding the lead. All phase leads are declared first. Relevant weak/untrained NPCs still count toward squad size.

Squad Level is **floor(mean of actual mercenary levels)**. Cash modifier is `1 + 0.10 × (recommended size − actual size) + 0.10 × (recommended level − Squad Level)`, capped **0.50–1.50**. This intentionally exposes the risk of small/mixed squads for testing. Size also changes each phase DC by `(recommended size − actual size)`, capped −2 to +2. Level strength already affects the lead's statistic; do not add another level DC shift. XP and Reputation never use this cash multiplier.

Roll three d20 checks with normal four degrees (±10 and natural-1/20 degree shifts). Success and Critical Success each count **one**. Phase Critical Success grants **+1 to the immediately next phase**; Failure **−1 to the next**; Critical Failure **−2 to every remaining phase** and one turn recovery for the deployed squad. Next-only and remaining effects stack; Critical Failure recovery does not stack with itself or mandatory recovery. These are custom fixture consequences. There is no fourth roll or support roll.

Every completed contract pays participation plus completion XP. A qualified Level 5+ appointed leader gets **50 XP**, and at most one materially contributing MVP gets **50 XP**, only on completion; they may be the same person. Failed meaningful attempts grant participation XP only, zero client cash and zero contract Guild XP. Pay successful wages fully or record actual arrears. On failure choose funded **full/half/none** wages: **+10/+4/−10 Loyalty** respectively to those actually paid; waived remainder creates no default arrear. Paying them does not erase Reputation loss.

## Training, morale and reputation

Training is one initiation action per cohort, max **4**, a one-turn block, **150 XP per trainee**. Consecutive block k grants `floor(150 × (1 + min(0.10 × (k−1), 0.50)))`: **150,165,180,195,210,225**, then 225. No retroactive multiplier. Cost **50 per cohort trainer +25 per trainee per block**, paid before the interval. The trainer is routine contracted staff, not a free extra officer. No wages merely for sitting in the roster. Continued training has no new action; new/changed enrollment restarts as edition 0.2. No Guild XP or MVP/leader bonuses. One NPC level costs **1,000 XP**, max 20 with carryover. Training Suite increases that cohort cap to six, without raising XP rate.

Loyalty **0–100**, start 50. Rescue: **+10 delegated/+20 direct party**, once per episode. At Loyalty 0 a member gives notice and becomes Inactive next boundary unless an expressly negotiated reconciliation intervenes; never auto death/capture. Rival-job offers are visible events and only target Available noncommitted personnel. Refusal check: `d20 + floor(Loyalty/10)` against **DC18**, usual degrees; Success/Critical Success refuse, Failure/Critical Failure accept only if compatible with the member's disclosed agreement. One check for that event, not a fourth Guild mission check. Rival quote must be at least ordinary wages, pays at visible return one turn later, and default return grants participation XP only. Guild treasury gets no rival client money or wages. This fixture models temporary availability loss, not silent permanent poaching.

Reputation **−20 to 100**, start 0. **Unfriendly −20..−1, Neutral 0..19, Friendly 20..49, Honored 50..79, Exalted 80..100**. Clamp all changes. Expected benefits: Friendly allows Exclusive brokerage; Honored adds +1 to financing checks and contract-lead searches; Exalted adds +2 instead. No automatic financial penalty for a tier drop. Relations are a separate 0–4 track: Hostile/Unfriendly/Neutral/Friendly/Allied, start 2; its own clamps apply.

For uncertain administration, one action check versus DC at the **explicit target level**, not PC level; generic organizational target is `min(20,2 × Guild Level−1)`. Use actual officer statistics. Work the Network is Diplomacy, four degrees yield **0/1/2/3** candidates or leads. Candidate/lead level is the declared search target (1–20); target cannot exceed `min(20,2 × Guild Level+1)` without an authored contact. Routine securing/hiring at offered terms adds no roll. Default starting board has two Level 1 Standard offers; additional offers require searches, event/contact/feat rewards. The baseline simulator instead supplies a replenishing matched deck explicitly to isolate acquisition cost; it must label this override.

Promote the Guild costs **50**, Diplomacy versus organizational target DC, degrees CF/F/S/CS change Reputation **−1/0/+2/+4**. Boost Morale costs **10 per included member**, Diplomacy or Performance, changes Loyalty **−2/+2/+5/+8**. Establish Relations: Diplomacy, **−1/0/+1/+2** relation steps; 4 is Allied. Failure does not grant a free redo. No routine Guild XP from any of these.

## Trained action prototype cards

All require the previously accepted Trained skills and one action; use organizational target DC unless stated. Degree order below is CF/F/S/CS. Action bonuses to one check are circumstance bonuses: **use the highest, not their sum**. Support and phase consequences are separate custom modifiers. Reusing the same preparation on the same job cannot stack it.

| Action | Cost and CF / F / S / CS outcome |
| --- | --- |
| Broker Exclusive Deal (Diplomacy) | Friendly required; 50 credits. No offer / no offer / one Exclusive offer / two offers. Acceptance still costs Secure Contract. No automatic success/deadline extension. |
| Analyze Market Data (Society/Lore) | No cash; no benefit / identify existing lead category / choose category of next search / choose category and +1 to that search. Expires end next turn. |
| Conduct Digital Recon (Computers) | No cash; −1 to selected prepared phase / nothing / +1 to one named phase / +2 to that phase. Apply once to one accepted job within next turn; consequences visible before deployment. |
| Run Counterintelligence (Computers/Deception) | 25 credits; next rival refusal check −1 / none / +2 / +4. One named member, next matching event within two turns. No invisible poaching simulation. |
| Coordinate Joint Operation (Diplomacy) | Friendly or Allied partner, disclosed fee one recommended-level wage; no aid / no aid / +1 to one chosen phase / +2 to that phase. No extra operative, roll, headcount or reward share unless expressly contracted. |
| Establish Recovery Protocol (Medicine) | 25 per target, max four; no effect / no effect / reduce eligible future recovery by 1 / by 2, minimum 0, at the next boundary. Never releases a captive/missing operative or heals distinct untreated conditions. Current Available staff cannot prebank treatment. |
| Optimize Infrastructure (Crafting) | 25; no saving / none / 10% / 20% saving on one property's next monthly overhead, rounded down. Does not discount rent, wages, debt or principal; no stacking or perpetual renewal. |
| Plan Logistics Corridor (Piloting/Survival) | 50; −1 to Insertion / none / +1 / +2 to Insertion for one job in the named region by next turn. Does not shorten job/recovery or waive acquisition. |
| Launch Media Campaign (Performance/Diplomacy) | 100; Reputation −2 / 0 / +3 / +6. Can address a named scandal, but failure penalties still apply once. No passive money or automatic contract. |

## Leader and Guild Feats

Six Level 5 Leader Feats, active only on the appointed leader. Pick one: **Breach Commander (Str)** +1 Engagement with Athletics; **Ghost Route (Dex)** +1 Insertion with Stealth; **Hardcase (Con)** reduce squad recovery after this operation by 1, min 0; **Systems Tactician (Int)** +1 Engagement with Computers; **Field Navigator (Wis)** +1 Extraction with Survival; **Crew Advocate (Cha)** +1 Loyalty to participating crew on completion. The check bonuses share the highest-only circumstance cap with trained preparations. No rerolls, extra actions or automatic phase successes.

Prototype Guild feat menu (one choice at every even Guild Level; cannot repeat): **Trusted Client (L2)** one optional ordinary Standard acquisition free per turn from a known existing contact; **Recruitment Pipeline (L2)** once per turn, first Work the Network recruitment result produces one extra candidate, max3; **Training Cadre (L4)** reduce trainer cost by25/cohort; **Well Provisioned (L4)** maximum support +4 instead of+3; **Standing Agreement (L6, Trusted Client)** one contact supplies and optionally secures one Standard offer per turn, no search/acquisition action (replaces rather than stacks Trusted Client's waiver); **Resilient Operations (L6)** first damaging facility event each turn reduces it only to Damaged, never Offline. Any unused earned feat choice can be saved. These need live testing; no blanket extra action feats.

## Assets, projects and debt

| Asset/project | Cost | Monthly overhead | Slots | Turns | Key benefit |
| --- | ---: | ---: | ---: | ---: | --- |
| Field HQ | 3,000 | 75 | 2 | 1 | Mobile/home-base alternative; no roster limit |
| Permanent HQ | 6,000 | 100 | 4 | 2 | More upgrade slots; no roster limit |
| Outpost | 3,000 | 80 | 2 | 2 | Remote operating location |
| Training Suite | 1,000 | 30 | 1 | 1 | Cohort cap6; Transferable1 |
| Infirmary | 1,200 | 40 | 1 | 2 | Recovery−1, min0, after actual return; Transferable2 |
| Comms Hub | 1,500 | 25 | 1 | 2 | Remote action communications where locally plausible; Transferable1 |

Property purchase uses Negotiate Property Deal; building the card uses Commission Project and manager/capacity. Do not charge both on a turnkey sale advertised without construction. Fully fund projects up front. One qualified trained manager committed per project; an external manager may be contracted for **100/month** per active interval, included in the quote, and adds no officer actions. Field/owned HQ overhead replaces departed lease only when that lease actually ends. Outposts add their overhead. Lease150 includes its overhead; installed facilities add theirs once monthly.

Damaged Training Suite cap is4, Damaged Infirmary no reduction, Damaged Comms Hub local comms only; Offline grants no benefit. HQ damage loses half slots rounded down (reserve incumbent installations; block new construction, do not vanish occupants), Offline denies location access. Repair costs **20% original price for Damaged /40% for Offline**, one project turn, no development XP. Relocation costs **10% moved upgrades' original prices +100/month manager**, times follow individual Transferable N; benefits stop at origin and start upon eligible destination activation. Voluntary owned asset sale realizes **70% original purchase price**, minus secured debt and selling fees disclosed by the card; no fictional book-value treasury injection.

Loan fixture: 12 turns, **1% monthly secured/2% unsecured**, normal amortizing payment `P × r / (1−(1+r)^−12)`, payment rounded up to credits with final payoff adjusted to actual balance. Secured principal at most **70% declared collateral sale value**; unsecured gross principal across existing loans at most **1,000 × Guild Level**. No finance during uncured Default; otherwise financing check Diplomacy versus organizational DC gives CF declined, F declined, S approved at quoted cap, CS approved with rate−0.25 percentage point (min0.5%). Approved total monthly debt service may not exceed **30% average actual client cash received during last three completed intervals**, including zero-income intervals. New guild secured startup underwriting may instead use one disclosed signed-client projection; this is an explicit lender fixture, not guaranteed free credit. Collateral cannot be pledged twice.

First missed payment is Delinquent, still uncured at next boundary is Default, no extra late fee in this first pack. Paid arrears/restructure cure per edition0.2. Secured repossession applies sale proceeds to balance and leaves deficiency; unsecured Default blocks further finance until settlement. Landlord ends access after second uncured boundary; notify at first. Insolvency uses realizable assets **after secured debts**, existing arrears plus next essential bills; credible funded restructuring can prevent closure. Failed voluntary wages are not debt; successful unpaid wages are. Withdrawal is unrestricted, with actual resulting distress.

## Event baseline and testing boundaries

At least one visible event each turn; a due follow-up can satisfy it. If none is due, roll/select one six-entry deck: **1 client opportunity** (one standard lead, normal acquisition), **2 rival offer** (rules above), **3 supply delay** (one chosen nonessential project pauses a turn, no lost progress), **4 personnel concern** (one member Loyalty−3; next-turn funded Boost Morale is a valid response), **5 property fault** (one upgrade Damaged; if none, a harmless landlord issue), **6 community contact** (relations+1 with a named Neutral group, cap Friendly). Substantial responses occur next turn. This is a small fixture deck, not full event/rival content. No second random profit roll.

Simulations must publish scenarios, policy, random seeds, pack hash, time horizons, samples, confidence/quantile methods and omissions. Quantitative mission/economy tests can use replenished offer decks and qualified balanced skill fixtures, but must state those favorable assumptions. Manual project/loan/rival probes supplement them. **No simulation can measure whether the acquisition action feels tedious at the table.** A/B report opportunity costs and workload proxies; validate experience in live play.

Published reference points: [PF2e level DCs](https://2e.aonprd.com/Rules.aspx?ID=2629), [NPC skill benchmarks](https://2e.aonprd.com/Rules.aspx?ID=2874), and the edition0.2 source list for Kingmaker, SF2e NPC advancement and Trollskull. All wages, rewards, capacities, feats and consequences here are custom prototype choices.

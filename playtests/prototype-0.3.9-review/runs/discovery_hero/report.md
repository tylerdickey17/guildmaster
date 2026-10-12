# Guildmaster 0.3.9 — discovery, mission risk and Hero Point audit

Frozen source: `7c1b338b9b9b46f75b0296a660bd5aa08b857a0b`. No live or frozen files changed.

## Evidence and limits

`audit.cjs` / `results.json` contain 40 synthetic quote fixtures evaluated by exact dynamic programming over independent uniform d20 outcomes, four public-API discovery cohorts of 10,000 starting seeds each, and five targeted public-API checks. Quotes preserve engine skills, distinct leads, support, DC adjustments, phase-forward effects, pay discounts, repair severity and contract rules. Crew levels in quote fixtures are assigned for analysis: these are not legal startup campaigns and establish no fastest Level 10 time.

Discovery cohorts start from the real Staffed preset, four PCs, 2,000 credits and seeds 1–10,000, settle Upkeep, then make one or four Level 1 searches. No future-die peeking, seed selection, awards, session resets or state edits. Four searches consume all starting actions, so those particular runs cannot also secure/hire that turn. Offers remain available through the following turn. Every attempted cohort run completed.

Reproduce from this directory: `node audit.cjs`.

## Findings

### Surplus actions are useful for shopping, not only promotion

| Starting Level 1 searches | At least one Expert/Legendary contract | At least one Legendary contract | At least one Rare contract |
|---|---:|---:|---:|
| One; 10,000 seeds | 21.84% | 4.39% | 11.56% |
| Four; 10,000 seeds | 62.96% | 16.14% | 38.77% |

Rare recruit probability similarly rises from 11.38% to 38.47% across one versus four searches. Rarity gives an additional skill at the same level-based hiring/assignment price, so more actions allow repeated searches to select unusually flexible operatives. This is a material reason action accumulation is powerful even when promotion awards no Guild XP.

A quality upgrade can be enjoyable, but repeated independent lists create a best-of-many incentive. A two-action focused search could provide a controlled quality upgrade; a three-action regional recruitment/contract campaign could guarantee complementary specialties or a linked job chain. Keep one basic search per officer or one shared search per mode per turn before buying the upgraded action. Simply making an unrestricted superior search cost two actions still permits repeated shopping and does not fix XP pacing by itself.

### Fixed administrative +10 increasingly favors low-level search targets

| Target level | Critical Failure | Failure | Success | Critical Success | Expected options |
|---|---:|---:|---:|---:|---:|
| 1 | 5% | 15% | 50% | 30% | 2.875 |
| 3 | 5% | 30% | 50% | 15% | 2.875 |
| 5 | 5% | 40% | 50% | 5% | 2.875 |
| 10 | 35% | 45% | 15% | 5% | 2.125 |
| 20 | 95% | 5% | 0% | 0% | 0.625 |

These are main check frequencies, not the conditional quality-table frequencies. Most non-critical-failure searches still return three options. The issue is that officer skill bonuses never increase in this prototype; mission/DC levels do. For the Foundry implementation, use actual PC skills. For ongoing browser testing, provide an explicit administrative benchmark progression or declared PC-level input rather than pretending fixed +10 represents a whole campaign.

### High difficulty on low-level cards preserves full XP

The payout has an overlevel discount, but Guild XP and operative XP have none. Expert grants 600 Guild XP regardless of mission level; Legendary grants 900. As crews improve, a player can keep searching easy target levels for relatively safe high-tier cards.

| Synthetic four-person squad | Contract | Success without Heroes | Expected Guild XP/attempt | Expected cash before fixed overhead |
|---|---|---:|---:|---:|
| Level 5 on Level 1 | Expert | 82.45% | 494.70 | +534.85 |
| Level 5 on Level 1 | Legendary | 49.94% | 449.44 | +463.30 |
| Level 5 on Level 5 | Expert | 47.05% | 282.30 | +2,656.19 |
| Level 9 on Level 3 | Legendary | 83.84% | 754.54 | +464.26 |

Cash includes wages at half pay after failure and exact transport repairs; excludes fixed overhead, recruitment, replacement, training, debt and future absence. These figures are not complete business viability predictions. Low-level Normal/Easy cards with expensive crews often lose money, so the exploit specifically favors high-tier low-level jobs and cannot be generalized to all low-level work.

Recommended knob: discount progression rewards for overqualified squads, separately from cash, using the same simple floor-average Squad Level already on the quote. Keep full rewards at or near the recommended level; sharply reduce Guild and operative XP when the squad is several levels over the card. Compare mission level with Guild capability as well if one low-level subsidiary squad can otherwise farm full Guild XP forever. Preserve 1–20 mission levels and the floor average. The mission-count/XP curve still needs cohort testing against the 60-month goal; multi-action costs alone do not establish five-year progression.

### Hard contracts have a large persistent roster risk

Starting Level 1 Escort-pattern Hard contract: 67.25% completion, but 42.31% extraction Missing probability. A successful contract and Missing operative coexist in 16.80% of attempts. This is independent of profitability: the player can win, receive money, and still permanently lose a scarce specialist inside this browser prototype.

No browser rescue action currently reverses Missing. The text expects a rescue adventure outside this engine. That makes long automated/browser playtests more punishing than a table that plays rescues, and understates the strategic value of a future rescue action. Consider a two- or three-action rescue operation with actual cost, delay and risk, while retaining optional played Priority rescues. Do not simply remove consequences or use silent state edits during testing.

### Hero Point refresh assumptions radically change outcomes

| Four starting Level 1 operatives | No rerolls: completion | Up to 3 rerolls of failures: completion | No rerolls: Missing | Up to 3 rerolls: Missing |
|---|---:|---:|---:|---:|
| Normal Level 1 | 80.69% | 98.14% | 5.00% | 1.46% |
| Hard Level 1 | 67.25% | 94.06% | 42.31% | 16.33% |
| Expert Level 1 | 34.63% | 69.65% | 64.80% | 39.33% |
| Legendary Level 1 | 10.15% | 36.23% | 59.23% | 32.84% |

The reroll policy spends one point on any failure/critical failure while points remain; it keeps the second result, including worse outcomes. The three-point figures are one-job sensitivities, not a recurring free monthly allowance. Four starting PCs have four points total for the initial table session. The public API intentionally allows manual session reset without advancing a Guild Turn; unrestricted monthly resets can protect approximately a job every month and materially speed safe growth. Default legal campaign cohorts must not quietly assume those resets. Record session cadence and awards alongside calendar time in player testing.

For Normal Level 1, one point optimally allocated for completion raises completion from 80.69% to 93.85%. Three rerolls raise it to 98.14%. A natural first-session safety cushion is substantial without replenishing it every month.

## Verified behavior

The five targeted checks all passed: hiring produces next-turn onboarding; one operative cannot lead multiple phases; an untrained lead cannot lead a Normal trained phase; only one Hero reroll is permitted for the pending phase and it consumes a point; manual session reset replenishes points without changing calendar turn. No completion-count or lead-eligibility bug was found in this audit.

## Suggested order

1. Correct/declare administrative skill progression so high-level recruitment is testable.
2. Give surplus actions a few meaningful two-/three-action choices, especially rescue and controlled superior searches; limit independent repeat-shopping.
3. Add an explicit overqualification XP rule and test it with the progression curve. Leave the broadly successful basic economy intact until full cohorts justify changing cash.
4. Continue reporting default initial-session-only Hero cohorts separately from monthly-reset sensitivities.

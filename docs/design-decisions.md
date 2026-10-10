# Design decision log

Initial capture: October 10, 2026.

This log distinguishes confirmed user choices from assistant proposals, deliberately unresolved mechanics, and missing source material. Decision IDs are stable references. A future change should retain the prior decision and record what supersedes it.

## Evidence available

Primary source: [Starfinder Business Systems](https://chatgpt.com/c/6acaafb2-9434-83e9-8bd8-517d291ed264), conversation ID `6acaafb2-9434-83e9-8bd8-517d291ed264`.

The conversation reader returned five user exchanges with no older-page cursor. The following anchors identify those exchanges without implying that the full discussion was recovered:

| Anchor | User statement / context |
| --- | --- |
| S1 | “I like the 1k/level” |
| S2 | “I think all of the NPCs receive the same XP.” The same message proposes leader and expertise-based bonus XP. |
| S3 | “Why not both. More XP=More Fun.” This answers whether leadership and MVP bonuses can stack. The user also says concentrating XP in one NPC does not necessarily make the best team. |
| S4 | “The higher the level, the more they have to get paid so that's the downside to leveling people up lol” |
| S5 | User asks about recording the design in Google Docs or GitHub; assistant recommends Markdown and says earlier personnel topics were outlined. |
| S6 | Current setup request: establish a GitHub-based Markdown repository with a README, Personnel design, and decision log; preserve decision status; do not begin the Foundry v14 module. |
| S7 | October 10, 2026, follow-up in the repository-setup conversation: the user adds NPC loyalty, an automatic daily status roll, distinct player-guild and rival-guild deployment states, possible capture during rival missions, rescue missions for those captures, and a large loyalty bonus for a party rescue. The user explicitly defers Foundry automation details. |

S6 and S7 come from the repository-setup conversation, not the linked source conversation. The assistant recaps accompanying S1–S5 are secondary evidence; their “established” labels are not treated as independent approval.

## Confirmed

| ID | Decision | Evidence and boundary |
| --- | --- | --- |
| R-001 | Begin a Markdown design repository for Contract Operations. Include a README, System A Personnel design, and decision log. Do not code the Foundry v14 module in this phase. | S6. Future module support is an intention, not verified compatibility. |
| A-001 | Use 1,000 XP per mercenary level. | Explicit choice in S1, reiterated in S2. |
| A-002 | Give every participating NPC the same base contract XP regardless of level. | S2 rejects relative-level adjustments. S3 allows unequal totals through bonuses. |
| A-003 | Include leadership and MVP/expertise bonus XP categories. | Proposed by the user in S2 and accepted together through S3. Exact triggers and amounts remain open. |
| A-004 | Allow leadership and MVP bonuses to stack for one operative on one contract. | Explicit answer in S3. Team balance is a player consideration, not a reason to prohibit stacking. |
| A-005 | Higher-level personnel require higher pay; advancement increases personnel cost. | Explicit choice in S4. This does not select a pay curve or rate. |
| A-006 | Each NPC has loyalty; higher loyalty reduces the likelihood of working for and being deployed by rival guilds. | S7, October 10, 2026. No score range, starting value, probability curve, or immunity threshold is set. |
| A-007 | At the start of each in-game day, each NPC receives an automatic status roll determining availability or deployment, with loyalty affecting rival deployment. | S7, October 10, 2026. The random procedure and treatment of ongoing missions, captivity, and other statuses remain unresolved; Foundry automation is deferred. |
| A-008 | Distinguish Available, Deployed — Guild Mission, and Deployed — Rival Guild Mission. | S7, October 10, 2026. The two deployment states identify whose mission the NPC is on. Exact interface labels and the complete status model remain open. |
| A-009 | An NPC can be captured while deployed on a rival guild mission; that capture still generates a rescue mission for the party. | S7, October 10, 2026. Capture chance, mission outcome resolution, and rescue details remain open. |
| A-010 | A successful party rescue grants the rescued NPC a large loyalty bonus. | S7, October 10, 2026. Exact amount, award timing, and loyalty limits are deferred. |

## Provisional / unconfirmed in available source

| ID | Detail | Evidence and next decision |
| --- | --- | --- |
| P-001 | Track XP individually and carry excess XP into the next level. | Assistant recaps following S1–S3. Confirm exact bookkeeping and carryover. |
| P-002 | Pay a level-based rate per contract. | Assistant's question before S4 and recap after it. S4 confirms higher pay at higher levels but does not explicitly settle the payment basis or timing. Earlier confirmation may exist in the missing source. |
| P-003 | Profit = contract payout − squad pay − overhead. | Assistant recap after S4. Confirm the model and what overhead includes. |
| P-004 | Award MVP XP through objective performance triggers, such as a critical success on a mission phase, with future automatic calculation. | Assistant suggestion after S2. The user's next answer approves stacking, not this trigger or automation. |

## Deferred / unresolved

| ID | Topic | What remains unresolved |
| --- | --- | --- |
| D-001 | XP balancing and awards | Contract XP values; bonus amounts; precise success/eligibility conditions; who awards bonuses; failed or incomplete contract treatment. Recaps defer amounts; the available source does not resolve the other procedures. |
| D-002 | Personnel economy | Pay values, linear versus steeper progression, payment/raise timing, and balancing against contract payouts. S4 settles only that higher levels cost more. |
| D-003 | Starting roster and individual Leader Abilities | Assistant recap after S4 explicitly leaves these for later; no values or ability definitions are supplied. |
| D-004 | Contract system | Contract resolution and reward design remain outside this initial personnel record. The suggested System B filename is not an approved mechanic. |
| D-005 | Foundry implementation | Deferred under S6 and S7. Automatic daily status rolls are confirmed as gameplay intent, but day advancement, persistent-state handling, rival outcomes, rescue generation, and loyalty updates need later implementation design. No code, manifest, schemas, or automation in this phase. |
| D-006 | Loyalty balancing | Score range or tiers, starting values, limits, relationship to rival-deployment probability, other loyalty gains or losses, and the amount of the large rescue bonus. S7 establishes the direction and rescue reward, not numbers. |
| D-007 | Daily status procedure | Random method and probabilities; treatment of ongoing deployments, captivity, and other statuses; mission duration and return timing; whether player-guild deployment is assigned by the roll or reflects a player assignment. S7 establishes the daily roll without settling these interactions. |
| D-008 | Rival capture and rescue resolution | How and when rival missions resolve, capture probability, rescue-mission generation and resolution, and post-rescue availability. S7 confirms that rival capture can happen and generates a rescue mission. |

## Source gaps

| ID | Gap | Required follow-up |
| --- | --- | --- |
| G-001 | Earlier NPC statistics, recruitment, statuses, and leadership decisions. | The assistant claims these were outlined, but the retrieved source contains no rules or user approvals for them. S7 now confirms availability and distinct guild/rival deployment states; it does not recover the earlier full status model. Recover the earlier discussion and reconcile it with A-006 through A-010. Do not substitute new rules or describe the full personnel design as complete. |

## Recording the next decision

For each accepted change, record its ID, date, status, rule, user approval or source, and remaining boundaries. Add a superseding entry when an approved rule changes. Keep numerical examples and brainstorming separate from confirmed rules.

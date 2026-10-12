# Design decision log

> **Current playtest authority:** [Integration rules pass 0.2](integration-rules-v0.2.md) resolves the remaining procedures under the user's delegated design authority. It supersedes conflicting provisional clocks/deferrals below; the earlier checkpoint remains history. See [regression walkthroughs](integration-regression-v0.2.md) for verification limits.


Initial capture: October 10, 2026.

This log distinguishes confirmed user choices from assistant proposals, deliberately unresolved mechanics, and missing source material. Decision IDs are stable references. A future change should retain the prior decision and record what supersedes it.

## Evidence available

Primary source: [Starfinder Business Systems](https://chatgpt.com/c/6acaafb2-9434-83e9-8bd8-517d291ed264), conversation ID `6acaafb2-9434-83e9-8bd8-517d291ed264`.

At initial capture, the conversation reader returned five user exchanges with no older-page cursor. The following anchors identify those exchanges without implying that the full discussion was recovered:

| Anchor | User statement / context |
| --- | --- |
| S1 | “I like the 1k/level” |
| S2 | “I think all of the NPCs receive the same XP.” The same message proposes leader and expertise-based bonus XP. |
| S3 | “Why not both. More XP=More Fun.” This answers whether leadership and MVP bonuses can stack. The user also says concentrating XP in one NPC does not necessarily make the best team. |
| S4 | “The higher the level, the more they have to get paid so that's the downside to leveling people up lol” |
| S5 | User asks about recording the design in Google Docs or GitHub; assistant recommends Markdown and says earlier personnel topics were outlined. |
| S6 | Current setup request: establish a GitHub-based Markdown repository with a README, Personnel design, and decision log; preserve decision status; do not begin the Foundry v14 module. |
| S7 | October 10, 2026, follow-up in the repository-setup conversation: the user adds NPC loyalty, an automatic daily status roll, distinct player-guild and rival-guild deployment states, possible capture during rival missions, rescue missions for those captures, and a large loyalty bonus for a party rescue. The user explicitly defers Foundry automation details. |
| S8 | October 10, 2026, current Systems B/C documentation request: explicitly confirms the ten named categories; job board; three-phase contract cards with specific checks, deployment recommendations, durations, and varied rewards; captured-mercenary rescues; and payout minus squad pay minus overhead. |
| S9 | Same current request: explicitly confirms per-phase leads and shared rolls; automatic proficiency-based support; visible four-degree outcomes; contract-defined consequences that can affect multiple subsequent phases; and minimum/recommended/maximum squad size and level with risk/reward tradeoffs. Exact formulas and values are deferred; no Foundry coding. |
| S10 | Fresh read of the source conversation on October 10, 2026 returned five recent exchanges, with no older-page cursor: the user explicitly chooses automatic support to minimize rolls, requests minimum/recommended/maximum size, then extends that framework to level and describes less/standard/reduced rewards while deferring balancing. |

S8 and S9 are direct confirmation in the current documentation request, not reconstructed quotations from unavailable earlier turns. S10 corroborates part of that framework but does not recover the entire discussion.

S6 and S7 come from the repository-setup conversation, not the linked source conversation. The assistant recaps accompanying S1–S5 are secondary evidence; their “established” labels are not treated as independent approval.

### October 10, 2026 Systems D–F evidence

| Anchor | User statement / context |
| --- | --- |
| S11 | Current D–F documentation request explicitly confirms Guild Level 1–10, Guild XP sources, automatic advancement/benefits, even-level feats, numerical reputation and five tiers, officers, and concurrent monthly Guild Turns. It also confirms treasury/withdrawals, completion income, monthly salaries/overhead, loans/collateral, distress stages, and bankruptcy continuation. |
| S12 | Same request explicitly confirms property types, facility slots/categories, location traits/caps, construction timing/capacity/managers, purchase/finance/lease, stable values, sale/conversion, and upgrade relocation traits. It directs that damage/repairs remain provisional unless expressly finalized, numerical balancing remain deferred, existing files be preserved, and no Foundry coding begin. |
| S13 | Fresh source read exposes five recent property exchanges, with no older-page cursor. The user chooses stable values, suggests leasing, and accepts the purchase/finance/lease proposal. The final user reply expressly makes Transferable/Permanent traits of upgrades. Damage/repair appears only in an assistant proposal, not explicit user approval. |
| S14 | Direct clarification in this documentation chat: Standard Contracts are assigned to NPCs and completed during Guild Turns using the established mechanics; Priority Contracts are full adventures PCs can participate in, potentially over multiple sessions. |

S11/S12 are direct confirmation in the documentation request, not quotations reconstructed from unavailable turns. S13 corroborates acquisition, stable values, and relocation traits, but does not recover the full D–F discussion. S14 supplies the missing Standard/Priority distinction. Existing unrelated source gaps are retained.

`SD-` identifies confirmed **System D** rules; existing `D-` IDs continue to identify **deferred** topics. No prior IDs are repurposed.

### October 10, 2026 Guild Actions and System G evidence

| Anchor | User statement / context |
| --- | --- |
| S15 | Current documentation request explicitly confirms a shared monthly Guild Action pool increasing with Guild Level, an available assigned PC/NPC officer for every action, conflicting-assignment restrictions, and NPC delegation while PCs adventure. Payroll, overhead, ongoing construction, and previously deployed contracts run without Guild Actions. Exact action counts and officer limits are deferred. |
| S16 | Same request explicitly confirms the monthly event minimum, possible additional-event scaling pending simulations, Automatic/Decision Events, context-sensitive targets and effects, lightweight rival stat blocks, event-driven rival progression, five relationship states independent of reputation, and exclusively visible event-driven competition. Loyalty influences rival recruitment/deployment; rival capture can lead to rescue contracts. Numerical mechanics remain unbalanced; no Foundry coding. |
| S17 | Supplied bounded preview of Starfinder Business Systems includes the user's approval of visible competition: players know when a contract or mercenary is lost instead of a random start-of-day disappearance. The accompanying assistant recap is secondary evidence, not independent confirmation of every rule. |

S15/S16 are direct confirmation in the current request. The supplied preview is not the full earlier conversation and does not close unrelated source gaps. The existing GitHub System D addition already used SD-008; this update integrates it and adds its log entry without changing that ID. `SG-` identifies System G rules so that the existing source-gap ID G-001 retains its meaning.

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
| A-008 | Distinguish Available, Deployed — Guild Mission, and Deployed — Rival Guild Mission. | S7, October 10, 2026. The two deployment states identify whose mission the NPC is on. Exact interface labels and the complete status model remain open. |
| A-009 | An NPC can be captured while deployed on a rival guild mission; that capture still generates a rescue mission for the party. | S7, October 10, 2026. Capture chance, mission outcome resolution, and rescue details remain open. |
| A-010 | A successful party rescue grants the rescued NPC a large loyalty bonus. | S7, October 10, 2026. Exact amount, award timing, and loyalty limits are deferred. |
| B-001 | Offer contracts through a job board. | S8. Generation, refresh, and access procedures remain deferred. |
| B-002 | Use ten categories: Bounty Hunting, Security, Espionage, Rescue, Salvage, Exploration, Smuggling, Sabotage, Investigation, Transport. | S8. Categories do not impose universal phase checks. |
| B-003 | Contract cards describe Insertion, Engagement, Extraction; contract-specific skill/stat checks; deployment requirements; duration; and rewards. | S8/S9. See C-003 and C-006 for visible outcomes and the full deployment ranges. Values remain TBD. |
| B-004 | Rewards can include credits, XP, reputation, loyalty, and recruitment opportunities. | S8. Not every contract must award every type. Amounts and award procedures remain deferred; A-001 through A-004 are preserved. |
| B-005 | Captured mercenaries can generate rescue contracts. | S8; retain the rival-capture and party-rescue rules A-009/A-010. Abstract versus played rescue procedures remain open. |
| B-006 | Company profit = contract payout − squad pay − overhead. | S8 now explicitly confirms the model previously provisional under P-003. S11/E-002/E-003 now establish completion-based pay and monthly asset-based overhead; rates, overhead allocation, and reward-adjustment accounting remain deferred. |
| C-001 | Resolve Insertion, Engagement, Extraction with one designated lead operative and one check per phase; share the three rolls around the table. | S9/S10. Contract-specific checks use the lead's relevant statistics. This does not redefine System A's squad leader or bonus XP rules. |
| C-002 | Supporting NPCs provide automatic support based on relevant proficiency, without extra Aid/support rolls. | S9 and explicit choice in S10. Preserve narrative depth and the three-roll target for multiple contracts in one sitting; support amounts remain deferred. |
| C-003 | Openly show all four degrees of success and consequences for every phase on the contract card. | S9. No hidden generic outcome table replaces the card. |
| C-004 | Success is typically neutral, failure worsens circumstances, critical success benefits the squad, and critical failure causes a major complication. | S9. Contract-specific definitions govern; these defaults do not set numeric effects or automatic mission termination. |
| C-005 | Consequences/DC adjustments may affect subsequent phases, including more than one, as specified by the contract. | S9. Scope and duration are contract-specific; numeric adjustments and effect-combination rules remain deferred. |
| C-006 | Each contract has minimum/recommended/maximum squad size and squad level. | S9/S10. Size and level are separate factors; specific bounds and mixed-level squad calculation remain deferred. |
| C-007 | Underdeployment increases risk with potential bonus reward; recommended deployment receives standard reward; overdeployment improves success chances with reduced reward. | S9/S10. Applies to both size and level within contract bounds. No guaranteed success, fixed modifier, or settled reward/accounting formula. |

### Systems D–F and contract-form update

| ID | Decision | Evidence and boundary |
| --- | --- | --- |
| B-007 | Standard Contracts are NPC assignments resolved during Guild Turns using System C; Priority Contracts are full adventures PCs can join, potentially over multiple sessions. | S14. Scopes the existing B/C phase-card and three-roll requirements to Standard Contracts; Priority adventure details remain deferred. |
| SD-001 | Guild Level is independent of PC/mercenary level and ranges from 1 to 10. | S11. No shared XP threshold inferred. |
| SD-002 | Contracts and organizational development grant Guild XP; leveling and level benefits are automatic when thresholds are met. | S11. Award values, thresholds, and benefit schedule remain deferred. |
| SD-003 | Guild feats occur at levels 2, 4, 6, 8, and 10. | S11. Feat catalog and selection rules remain deferred. |
| SD-004 | Numerical reputation uses Unfriendly, Neutral, Friendly, Honored, Exalted; Neutral is the starting tier. | S11. Numerical starting score and thresholds remain deferred. |
| SD-005 | Reputation can fall, affecting new opportunities without removing existing assets merely for reputation loss. | S11. Does not prevent debt-based repossession. |
| SD-006 | Required officer roles can be filled by PCs or salaried NPCs; delegation reduces PC management burden. | S11. Role list, qualifications, vacancy effects, and salary scales remain deferred. |
| SD-007 | Monthly Guild Turns run concurrently with adventures, without requiring universal downtime. | S11/S14. Task-specific PC downtime still applies; turn order and daily/monthly integration remain deferred. |
| E-001 | Maintain a separate guild treasury; PC withdrawals are unrestricted but carry financial consequences. | S11. No withdrawal cap or minimum reserve invented. |
| E-002 | Contract pay arrives on completion; officer salaries and overhead recur monthly. | S11. Ordinary mercenary payment terms and incomplete-contract rewards remain open. |
| E-003 | Overhead is asset-based, affected by upgrades; property taxes and similar routine charges are abstracted into overhead. | S11. Rates and cost allocation remain deferred; monthly overhead is not paid again for every completed contract. |
| E-004 | Allow multiple secured/unsecured amortizing loans, with borrowing based on Guild Level, reputation, and existing debt. | S11. No fixed interest, term, debt ceiling, or amortization formula selected. |
| E-005 | Secured debt uses collateral and permits repossession through debt enforcement. | S11. Triggers, valuation, and enforcement procedures remain deferred. |
| E-006 | Distress has three stages: Delinquent, Default, Insolvent. | S11. Exact triggers, timing, penalties, and recovery remain deferred. |
| E-007 | Bankruptcy is not automatic game over. | S11. No guaranteed forgiveness or asset retention; continuation procedure remains open. |
| F-001 | Property types include mobile HQ, primary permanent HQ, and outposts. | S12. Starting property and counts/capacities remain deferred. |
| F-002 | Slot-based facilities use Personnel, Operations, Logistics, Administration, Infrastructure categories. | S12. Slot sizes/counts and facility catalog/effects remain deferred. |
| F-003 | Properties have location traits and property-specific expansion caps. | S12. Trait mechanics and numerical caps remain deferred. |
| F-004 | Construction takes monthly Guild Turns. | S12. Exact durations and interruption procedures remain deferred. |
| F-005 | Simultaneous construction capacity is guild-wide and based on Guild Level, also constrained by slots, funding, and managers. | S12. No projects-per-level formula selected. |
| F-006 | Each project needs a manager: PC downtime, an existing officer suspending normal duties, temporary contractor, or salaried project manager. | S12. Management costs, qualifications, and per-manager capacity remain deferred. |
| F-007 | Acquire property by purchase, financing, or lease; leasing has rent and modification/expansion limits. | S12/S13. Financing uses System E; prices and lease terms remain deferred. |
| F-008 | Keep values relatively stable; allow property sale/conversion, with improvements/events/GM decisions affecting value rather than simulated market fluctuation. | S12/S13. Accepted acquisition discussion includes secured-debt/transaction-cost deductions on sale; valuation and conversion details remain deferred. |
| F-009 | Transferable/Permanent are upgrade traits determining relocation eligibility. | S12/S13. Not automatic facility-category traits; relocation cost/time remains deferred. |

### Guild Actions and System G

| ID | Decision | Evidence and boundary |
| --- | --- | --- |
| SD-008 | Each monthly Guild Turn grants a shared Guild Action pool increasing with Guild Level. Every action needs an available assigned PC or NPC officer; construction or other conflicting assignments prevent execution. NPC officers can act while PCs adventure. Payroll, overhead, ongoing construction, and previously deployed contracts run automatically without actions. | S15. Preserve funding, staffing, timing, and resolution requirements. Counts, catalog/costs, officer limits, and scheduling remain deferred under D-028. |
| SG-001 | Every monthly Guild Turn includes at least one Guild Event in its Event Phase. | S16. Additional quantity may scale with Guild Level, pending simulations; scaling is not a confirmed rule. |
| SG-002 | Use Automatic Events and Decision Events. | S16. Automatic Events require no player choice but remain visible; Decision Events require a response. Checks, costs, response timing, and officer interactions remain deferred. |
| SG-003 | Event eligibility and targets depend on actual NPCs, properties, contracts, and rivals; events can affect recruitment, contracts, finances, loyalty, reputation, facilities, and rival progression. | S16. Selection and outcome values remain deferred. Does not finalize P-005 property damage/repair. |
| SG-004 | Rival stat blocks contain name, level, reputation tier, specialization, relationship, influence, and special traits; no separate rival guild turns, full finances, or contract simulations. | S16. Influence scale, trait catalog, and starting profiles remain deferred. |
| SG-005 | Rival level and reputation can change through events. | S16. No independent rival XP/finance simulation or numerical progression rules are introduced. |
| SG-006 | Rival relationships use Hostile, Unfriendly, Neutral, Friendly, Allied, independently of general reputation; relationships inform suitable interactions, including cooperative opportunities. | S16 and context-sensitive targeting. The similarly named reputation tiers remain a separate track. Transitions and exact event eligibility remain deferred. |
| SG-007 | Rival contract, personnel, and market competition occurs exclusively through player-visible Guild Events, not silent random disappearance or rival simulations. | S16/S17. Supersedes A-007's rival-deployment mechanism; does not settle remaining non-rival daily availability. |
| SG-008 | Loyalty influences rival recruitment/deployment; rival missions can lead to capture and rescue contracts, resolved through events. | S16; preserves A-006/A-008/A-009/A-010 and B-005. Loyalty formulas, capture probabilities, outcome timing, rescue routing, and rescue bonus values remain deferred. |

## Provisional / unconfirmed in available source

| ID | Detail | Evidence and next decision |
| --- | --- | --- |
| P-001 | Track XP individually and carry excess XP into the next level. | Assistant recaps following S1–S3. Confirm exact bookkeeping and carryover. |
| P-002 | Pay a level-based rate per contract. | Assistant's question before S4 and recap after it. S4 confirms higher pay at higher levels but does not explicitly settle the payment basis or timing. Earlier confirmation may exist in the missing source. |
| P-004 | Award MVP XP through objective performance triggers, such as a critical success on a mission phase, with future automatic calculation. | Assistant suggestion after S2. The user's next answer approves stacking, not this trigger or automation. |
| P-005 | Property damage from attacks, accidents, or events, with credit costs and potentially construction time for repairs. | Assistant proposal in S13; S12 expressly requires provisional status absent explicit final approval. Adoption and all mechanics remain open. |

## Superseded status and scope

| ID | Earlier status | October 10, 2026 update |
| --- | --- | --- |
| A-007 | S7 confirmed an automatic status roll at the start of each in-game day for every NPC, determining availability or deployment with loyalty affecting rival work. | S16/S17 and SG-007 supersede rival recruitment/deployment by silent daily roll with exclusively visible event-driven competition. A-008 deployment states and A-006 loyalty remain confirmed. Any remaining non-rival daily availability procedure is unresolved under D-007; this history is not a current rival-roll requirement. |
| D-005 / D-007 / D-008 | Earlier deferrals assumed daily rival-deployment rolls and left the rival-resolution framework open. | S16/SG-007/SG-008 establish events as the rival-activity framework. Remaining timing, persistence, outcome values, and future implementation stay deferred. |
| P-003 | Provisional: assistant recap after S4 proposed profit = payout − squad pay − overhead; approval was not visible. | S8 explicitly confirms this as B-006. The accounting model is settled. S11 now confirms monthly asset-based overhead and completion income under E-002/E-003; numerical components and allocation remain open. |
| D-004 | Contract resolution and rewards were outside the initial personnel record and awaited their own design work. | S8/S9 now establish Systems B and C. Their remaining procedures and balancing are tracked under D-009 through D-013; this does not settle unrelated personnel gaps. |
| B-003 / C-001 / C-003 / C-006 | Prior prose used “contracts” generally for phase cards, resolution, and deployment bounds. | S14/B-007 scopes these requirements to Standard NPC Contracts. Priority Contracts are full PC-participating adventures. |
| D-009 / D-010 / D-002 | Reputation access, all reward timing, and all personnel payment timing were unresolved. | S11 confirms reputation affects new opportunities, contract pay on completion, and officer salaries monthly. Specific access requirements, non-credit reward timing, and ordinary mercenary payment terms remain open. |

## Deferred / unresolved

| ID | Topic | What remains unresolved |
| --- | --- | --- |
| D-001 | XP balancing and awards | Contract XP values; bonus amounts; precise success/eligibility conditions; who awards bonuses; failed or incomplete contract treatment. Recaps defer amounts; the available source does not resolve the other procedures. |
| D-002 | Personnel economy | Pay values, linear versus steeper progression, ordinary mercenary payment/raise timing, and balancing against contract payouts. S4 settles that higher levels cost more; S11 now separately confirms monthly officer salaries. |
| D-003 | Starting roster and individual Leader Abilities | Assistant recap after S4 explicitly leaves these for later; no values or ability definitions are supplied. |
| D-004 | Contract system follow-through | Initial deferral is partially resolved by B-001 through B-006 and C-001 through C-007. Remaining work is scoped under D-009 through D-013; see status history above. |
| D-005 | Foundry implementation | Deferred under S6/S7 and reiterated by S15/S16. The current rival framework is visible Guild Events, superseding A-007 in that scope. Time advancement, persistent-state handling, events, rival outcomes, rescue generation, and loyalty updates need later implementation design. No code, manifest, schemas, or automation in this phase. |
| D-006 | Loyalty balancing | Score range or tiers, starting values, limits, relationship to rival-deployment probability, other loyalty gains or losses, and the amount of the large rescue bonus. S7 establishes the direction and rescue reward, not numbers. |
| D-007 | Daily status procedure | Any remaining non-rival daily availability procedure; treatment of ongoing deployments, captivity, and other statuses; mission duration and return timing. SG-007 supersedes daily rival-deployment rolls. Players assign Standard NPC Contracts under B-007; rival work arises through events. |
| D-008 | Rival capture and rescue resolution | Event timing and outcome procedures, capture probability, rescue-mission generation and resolution, and post-rescue availability. SG-008 confirms event-based rival resolution without full mission simulation; S7 confirms capture and the party-rescue loyalty reward. |
| D-009 | Job board procedures | Board size, refresh/generation, availability, and specific access/reputation requirements. SD-005 confirms that reputation affects new opportunities. |
| D-010 | Contract values and content | Specific checks/DCs, durations, reward quantities/mixes, award conditions, non-credit reward timing, and authored phase outcomes. E-002 now confirms contract pay on completion. Recruitment as a reward does not settle the wider recruitment process. |
| D-011 | Phase leads and support | Lead-selection timing, repeat-lead restrictions, relationship to squad leadership, support eligibility/amounts, stacking/caps, and interaction with squad size. |
| D-012 | Consequences and overall results | Numeric DC adjustments; combining ongoing effects; overall completion, interruption/early termination, partial/failed-contract rewards. No universal phase-score or extra overall roll is approved. |
| D-013 | Deployment balancing and economics | Card-specific size/level bounds, mixed-level squad calculation, combining size and level effects, risk/reward formulas, affected reward types, and whether adjustments apply to payout, retained profit, or another reward component. |
| D-014 | Guild advancement | Guild XP thresholds/awards, development milestones, benefits, and feat content/selection. Preserve the confirmed 1–10 range and feats at 2/4/6/8/10. |
| D-015 | Reputation | Score range, starting score, tier boundaries, gains/losses, and precise opportunity requirements. Starting tier is Neutral. |
| D-016 | Officers | Required titles, qualifications, vacancies, delegation procedures, salary values, and consequences of suspended normal duties. |
| D-017 | Guild Turn procedure | Order of Guild Actions, Event Phase, and automatic operations; partial months, remaining daily availability integration, ongoing deployments, and completion/advancement timing within turns. No universal downtime requirement. |
| D-018 | Treasury and receipts | Starting funds, withdrawal bookkeeping, payout values, and incomplete-contract treatment. Completion income and unrestricted withdrawals are confirmed. |
| D-019 | Expense balancing and accounting | Salaries, overhead by asset, upgrade effects, detailed inclusions, contract allocation, and reporting of other costs. Monthly overhead must not be charged twice. |
| D-020 | Loans | Eligibility, rates, terms, payment cadence/amortization, debt limits, collateral valuation, and repossession procedures. Multiple secured/unsecured loans are confirmed. |
| D-021 | Distress and bankruptcy | Stage triggers, grace periods, penalties, creditor remedies, recovery, and playable bankruptcy outcomes. |
| D-022 | Properties and facilities | Starting assets, slot counts/sizes, catalog/effects, location traits, expansion caps/costs, and conversion requirements. |
| D-023 | Construction and managers | Costs/durations, projects by level, manager qualifications/capacity, contractor fees/salaries, interruptions, and suspended-duty effects. |
| D-024 | Acquisition and transactions | Prices/resale valuation, loan terms, lease restrictions/terms, sale/conversion procedure and costs. No simulated market fluctuation. |
| D-025 | Upgrade relocation | Trait assignment, move cost/time, destination constraints, and handling on sale/conversion/lease termination. |
| D-026 | Property damage/repairs | First confirm adoption of P-005; then define damage effects, repairs, costs/time, and construction-capacity interactions. |
| D-027 | Priority Contract follow-through | Adventure presentation, rewards, NPC participation, and rescue routing. Standard/Priority participation and resolution distinction is confirmed by S14. |
| D-028 | Guild Actions and officer capacity | Action counts by level, catalog and costs, per-officer limits, qualifications, scheduling/conflict details, unused actions, and Decision Event responses. SD-008 confirms the shared pool, officer requirement, and automatic-operation exemptions. |
| D-029 | Additional event quantity | Whether and how event quantity beyond the guaranteed monthly minimum scales with Guild Level; test through simulations and playtesting before choosing counts. |
| D-030 | Event procedures and content | Selection/weights, repeat limits, target priorities and eligibility details, fallback when no targeted event qualifies, response timing/checks, and outcome values. Honor the monthly event minimum and valid targets. |
| D-031 | Rival mechanics | Influence scale, special traits, starting profiles, level/reputation changes, relationship transitions, and exact relationship-based event eligibility. Preserve lightweight event resolution. |

## Source gaps

| ID | Gap | Required follow-up |
| --- | --- | --- |
| G-001 | Earlier NPC statistics, recruitment, statuses, and leadership decisions. | The assistant claims these were outlined, but the retrieved source contains no rules or user approvals for them. S7 now confirms availability and distinct guild/rival deployment states; it does not recover the earlier full status model. Recover the earlier discussion and reconcile it with the current loyalty/status/rescue rules and SG-007/SG-008; the rival-roll portion of A-007 is superseded. Do not substitute new rules or describe the full personnel design as complete. |

## Recording the next decision

For each accepted change, record its ID, date, status, rule, user approval or source, and remaining boundaries. Add a superseding entry when an approved rule changes. Keep numerical examples and brainstorming separate from confirmed rules.

## October 10, 2026 integration checkpoint (current)

Primary evidence: this Work conversation's explicit user responses, beginning “1. Okay so for this one we should use Pathfinder Kingmaker as our guide” and continuing through the training-streak approval and request to save to GitHub. Full adopted procedures and remaining boundaries are in [integration-checkpoint.md](integration-checkpoint.md); the action catalog is in [guild-actions.md](guild-actions.md).

These entries refine or supersede conflicting historical deferrals without reusing prior IDs. Earlier log rows are retained as history. Recovered historical summaries are distinguished from direct approval. Stress-test fixtures are not evidence for adopting numbers.

| ID | Status | Decision | Prior scope / remaining boundary |
| --- | --- | --- | --- |
| INT-001 | Confirmed | Four-phase turn order; receipts before upkeep; next-turn level capacity; deployment-fixed wage quote. | D-017 partly resolved; partial-month details remain. |
| INT-002 | Confirmed framework / explicit proposal boundary | Contract-specific 1/2/3 required successes; no failed client cash; participation XP + success bonus; failure Reputation loss; full/half/no failed pay affects Loyalty. | D-001/D-002/D-012/D-018 partly resolved. Critical Success weight remains a proposal; failed Guild XP/interruption open. |
| INT-003 | Confirmed starting model / playtest | One-action acquisition, routine deployment; lifecycle; progression-based leads/free qualifying acquisition with player choice. | D-009/D-028 partly resolved. Acquisition cost A/B retained; no action growth table. |
| INT-004 | Confirmed | Exclusive trait, higher difficulty/rewards, accepted completion deadline breach counts as failure. | Separate from B-007 forms; ordinary expiration alone no Reputation loss. |
| INT-005 | Confirmed framework / provisional numeric baseline | Shared pool grows with level; two actions per available officer as test baseline; discrete versus ongoing duties. | D-016/D-028 partly resolved; roles and detailed conflicts open. |
| INT-006 | Confirmed | Average squad level rounded down; size/level effects combine into one reward adjustment; Trained skill support. | D-011/D-013 partly resolved; modifiers/caps and reward scope open. |
| INT-007 | Confirmed | Recovery from disclosed mission requirements or phase consequences; optional delegated rescue Loyalty vs large direct-party bonus. | D-007/D-008 partly resolved; numeric treatment and routing open. |
| INT-008 | Confirmed framework | Recorded arrears, disclosed escalation, repayment/restructuring recovery, agreement-specific default remedies and persistent deficiency. | D-020/D-021 partly resolved; Insolvent remains, bankruptcy procedure not complete. |
| INT-009 | Confirmed | Transferable N duration; inactive transfer; eligible slots; removed asset excluded from sale; automatic ongoing progress. | F-009 refined; D-025 partly resolved. No automatic adoption of P-005. |
| INT-010 | Confirmed | Unique settlement; new development milestones; no repeat XP for relocation/repair/reinstallation. | D-014 partly resolved; milestone values/list open. |
| INT-011 | Confirmed | Free event choice vs action follow-up, response windows, scheduled follow-up minimum, fallback, due Upkeep event notices. | SG-001 timing refined; D-030 partly resolved. Event-count scaling open. |
| INT-012 | Recovered summaries + confirmed new status exclusivity | SF2e stats, 4-6 initial roster, eight statuses, six attribute-themed abilities recovered from historical summaries; one primary status. | G-001 partially recovered, full transcript/stat progression still missing. |
| INT-013 | Confirmed checks/actions / provisional clocks | Diplomacy Work the Network, 0/1/2/3 candidates by degree, one-action hire per candidate. | Prior current-turn expiry superseded only as working proposal; next-turn hiring/start interpretation awaits clear confirmation. |
| INT-014 | Confirmed Leader Feat / provisional qualification wording | Leader Feat at Level 5; six attribute-themed options; working one qualified squad leader distinct from phase leads. | D-003 partly resolved; leader XP eligibility, ability effects and tentative leadership threshold details remain. |
| INT-015 | Confirmed framework / deferred bonus formula | 30-day one-turn training, completion XP/next-turn availability, continued-training bonus, Available ends streak. | 10% is illustrative only; extension XP cadence/group size/cap/management open. |
| INT-016 | Accepted catalog concepts / provisional general costs | Eleven renamed basic actions and nine trained actions; relocation separately accepted; no Expert actions yet. | Secure Contract/Recruit Operative one-action costs confirmed; other one-action costs starting proposals. Four extra action suggestions not finalized. |

### Explicit non-adoptions and outstanding interpretations

- Two officer actions is a chosen provisional baseline; three starting shared actions is not adopted.
- No Expert-tier action catalog or numeric trained-action bonuses are adopted.
- Training's 10% consecutive-turn bonus is a suggestion for balancing, not a rule.
- Candidate hiring-window versus onboarding date needs confirmation; the assistant's full two-clock example is not user approval.
- Critical Success counting as one successful phase is the working proposal, not separately confirmed weighting.
- G-001 is partially recovered via summaries; no full transcript or complete NPC-stat advancement was retrieved.
- Gather Intel, Provide R&R, Reorganize Command, Renegotiate Terms remain proposals. Relocate Operations was subsequently accepted through Transferable N discussion.
- P-005 property damage/repair remains provisional; naming Commission Project does not alone adopt its full damage mechanics.
- P-001 XP carryover remains provisional. P-002 is refined by agreed assignment-fixed quotes, but exact ordinary pay basis/scale is not fully specified.
- Foundry implementation remains deferred. Re-test these new rules before claiming integration validation.

## Delegated integration pass 0.2 (procedural authority)

Evidence: user request at October 10, 2026 22:41 America/Chicago: “go through this integration pass and make the decisions” using previous design and PF2e/SF2e, Kingmaker, and Trollskull, with feedback during playtesting. The assistant has delegated design authority for these procedures; label them **designer-adopted for playtesting**, not individual prior user approvals or proven balance.

| ID | Adopted procedure | Scope |
| --- | --- | --- |
| PASS-001 | Boundary order, effective dates, one reset, no rollover/XP conversion, no repeated same-turn deployment recycling. | Refines INT-001/005/011 and D-017. |
| PASS-002 | Next-turn candidate expiry and hire-plus-one-turn onboarding; Diplomacy lead batches, pending Inactive subtype. | Resolves INT-013 clocks; generation count for contract leads is prototype. |
| PASS-003 | One success per successful/crit-success phase, Essential phases, Priority acquisition/story exceptions. | Resolves INT-002/004, D-012/027; preserves three-check default. |
| PASS-004 | Failure/neutral cancellation, Guild XP success-only, leadership/MVP selection, cash-only combined risk adjustment, actual-pay Loyalty. | Resolves D-001/002/012/013; values remain content. |
| PASS-005 | Phase lead plan/substitution, explicit ranks, status exits, longest concurrent recovery, rescue episode closure. | Resolves D-007/008/011; treatment/status data stays card-specific. |
| PASS-006 | NPC profile advancement, XP carryover, deterministic rank tags, Level 5 leader qualification and one active feat. | Resolves P-001 procedurally; historical carryover approval additionally recovered as summary. |
| PASS-007 | Four coverable officer portfolios, next-turn new execution capacity, vacancies/acting officers, one manager/project. | Resolves D-016/023/028; salary/values deferred. |
| PASS-008 | Monthly training XP, nonretroactive consecutive bonus, free continuation with resources, delegated versus full-time teaching. | Resolves INT-015 cadence/management; no 10% adoption. |
| PASS-009 | Reserved relocation slots, shared project limits, pauses/refunds/custody, minimal facility disruption and repair. | Resolves D-023/025/026; adopts P-005 minimal scope. |
| PASS-010 | Agreement arrears, visible enforcement, player payment priority, solvency/recovery test and negotiated bankruptcy. | Resolves D-020/021 procedure; default grace term is prototype, not calibrated universal economy. |
| PASS-011 | One-action accepted catalog prototype; checks/repeats/typed effects; no optional/Expert expansion. | Resolves general costs/access/repeats in D-028; modifier amounts remain unauthored. |

### Supersession and evidence limits

- INT-013's provisional hiring clocks are now resolved by PASS-002.
- INT-002's critical-success weight is resolved by PASS-003.
- INT-014's tentative squad-leader threshold is set at Level 5+ by PASS-006; no lower-level squad deployment ban.
- INT-015's XP cadence/trainer commitment is resolved by PASS-008; the 10% formula remains deferred.
- INT-016/catalog general one-action costs are now adopted prototype costs, retaining the acquisition A/B test.
- P-001 individual XP carryover is implemented by PASS-006; a new historical search returned an approval summary, not full transcript.
- P-005 is superseded by PASS-009's minimal Operational/Damaged/Offline event framework and Commission Project repairs. No HP/attack simulator adopted.
- G-001 source provenance is still partially recovered. PASS rules resolve missing mechanics by delegated design rather than pretend the old transcript was recovered.
- The earlier unresolved lists below/above are historical where PASS procedures settle them. Numeric DCs, rewards, pay, action growth, support caps, durations, facility/loan content and trained/Leader/Guild feat effects remain balancing/content work.
- [28 regression walkthroughs](integration-regression-v0.2.md) are authored deterministic checks, not another independent six-agent test, probability simulation or live-session measurement.

## Numerical prototype and simulated playtesting0.3 (current)

Evidence: the user requested prototype values followed by subagents running simulated playtests and reporting on the values, and reminded the assistant that earlier decisions are in GitHub. This authorizes designer-selected numbers, independent agent testing, and repository persistence. It does not make every numerical selection an individually confirmed historical choice.

| ID | Designer-adopted prototype | Evidence/status |
| --- | --- | --- |
| NUM-001 | Shared action schedule3/3/4/4/5/5/6/6/7/7; two/officer; starting treasury2000, fourL1 personnel, twoPCofficers, HQ150/month. | Frozen0.3.0, retained0.3.1 after bounded A/B; user-selected officer baseline preserved. |
| NUM-002 | Wages50×1.25^(L−1), XP/rep/reward cards, capped rank support, phase effects, 1000 Guild/NPC XP thresholds. | [Full numerical pack](prototype-values-v0.3.md); pay/reward currency is custom guild economy. |
| NUM-003 | Training150 XP, additive10% subsequent blocks cap50%, four-person cohorts, cost50+25/person. | Retained after independent progression/finance arithmetic; user10% example now chosen as prototype, not retroactive prior approval. |
| NUM-004 | Basic/trained action cards, six Leader Feats, Guild Feat menu, properties, loans, minimal event deck. | Designer content; only explicitly tested subsets have evidence. |
| NUM-005 | Cash discounts only, max100%; default minimum Squad Level recommended−2, floored at1. | 0.3.1 removes observed reward arbitrage; preserves floor-average and visible card bounds. |
| NUM-006 | Demand/Exclusive DC+0 with3 required phases and1 recovery; improved payout/XP/rep cards. | Targeted exact rerun; complete evolving campaign suite has not been rerun for0.3.1. |
| NUM-007 | Passive medical reductions preserve mandatory recovery; active postreturn Medicine can release eligible recovered staff immediately; Infrastructure fee0. | Corrects demonstrated erased-balancing/inert-action cases; trained checks remain outside Standard phases. |
| NUM-008 | Training Suite500/15; rival refusal Loyalty divisor5; creditor-specific arrears and missed-interest accounting. | Targeted arithmetic/exact checks; general economic/campaign validation remains open. |
| SIM-001 | Six independent reviews: mission odds, newGuild A/B, largeGuild, progression, debt/property, loyalty/actions. | Frozen0.3.0 plus two targeted independent0.3.1 reruns. [Report](prototype-simulation-report-v0.3.md) records samples, hashes, favorable fixture overrides and omissions. Not live play. |

Older deferred numerical statements are historical wherever these packs now supply a value. Remaining content gaps include fully generated distinct NPC/contract catalogs, comprehensive disruptive events/rival outcomes, Priority adventure rewards, and full0.3.1 campaign/live-table testing. No Foundry code is adopted.


## LIVE-001–002: first browser feedback, October10,2026

- **LIVE-001 — Confirmed:** user requested contracts resolve during Events, rejecting resolution during the next Upkeep. Default one-turn jobs deployed in Activity resolve in the same turn’s Events. Settlement/payment/MVP precede the ordinary monthly event and Advancement; recovery still occupies its printed future turns.
- **LIVE-002 — Confirmed:** +1 circumstance per operative above recommended count, with diminished reward. **Designer-selected value retained:**10% client cash reduction per extra operative, existing combined50% floor. Use the highest circumstance bonus, replace the old oversized DC reduction, retain undersized DC penalties and fixed XP.

See [0.3.2](prototype-values-v0.3.2.md) and [browser guide](browser-playtest.md). These entries supersede conflicting older timing and size adjustments; prior simulation evidence remains historical.

## LIVE-003–005: participation and failed pay, October11,2026

- **LIVE-003 — Confirmed:** failed-job wages full+5/half0/none−5 Loyalty. Replaces +10/+4/−10; actual funded cash and separate Reputation consequences remain.
- **LIVE-004 — User requirements:** baseline actions equal PC party count; every player has an action opportunity; choose one budget model rather than shared pool plus officer caps. **Designer-selected:** retain one shared pool, remove officer action caps, grow at PC count + Guild Level − 1; first offer each player an action/pass, then allocate remaining actions. Exact growth rate/Guild Level interpretation remain prototype choices.
- **LIVE-005 — Confirmed:** four starting PC officers using default SF2e character names. Demo selects Navasi, Iseph, Dae and Chk Chk from Paizo’s four-hero pregenerated adventure; their administrative statistics remain fixtures.

See [0.3.3](prototype-values-v0.3.3.md). Historical numerical trials used the old pool and pay model and are not rerun balance evidence for this patch.

## LIVE-006–010: employment and proof-of-concept checkpoint, October11,2026

- **LIVE-006 — Confirmed:** two worker models. Free Agents are nonexclusive and accessible regardless of Reputation tier; Loyalty matters to preference/rival work. Higher Reputation unlocks Retained Operatives with exclusive agreements, monthly retainers and reduced mission pay. Loyalty still matters to morale/renewal. Exact rates and access gate remain unresolved; Friendly is the working recommendation.
- **LIVE-007 — Confirmed explicitly:** retainer pay is overhead, resolved in Upkeep at the start of every Guild Turn. Assignment pay resolves in Events when the contract resolves. Both apply to retained workers; only assignment pay applies to free agents. Failed-job full/half/no assignment-pay decisions do not waive the retainer.
- **LIVE-008 — Owner feedback:** the user found the playtests fun and regarded the browser as a successful proof of concept. This is owner experience, not proof of complete balance, a group study or Foundry compatibility.
- **LIVE-009 — Provisional planning:**2,000 starting credits remains under review against fuller asset/location overhead and new retainers. Current demo already includes150 HQ rent and installed-facility overhead. Source of startup funds and exact additional overhead still need decisions; no numerical change is authorized by the currency discussion alone.
- **LIVE-010 — Next-session direction:** continue Site playtest work and possibly start the Foundry module. User requests this documentation commit now; no module scaffold or Site changes in this checkpoint. Prior phase-specific no-Foundry instructions remain historical scope, not a perpetual prohibition on future explicitly requested work.

[Accepted employment rules](personnel-employment.md) and [session handoff](session-checkpoint-2026-10-11.md) preserve scope, unanswered questions and implementation status.

## LIVE-011–017: officer positions and staffing, October 11, 2026

- **LIVE-011 — Human playtest feedback:** user subsequently reported playtests with their wife and said the core gameplay loop seemed good. This updates LIVE-008's owner-only evidence; it is positive two-person feedback, not a controlled balance study.
- **LIVE-012 — Confirmed direction; accepted working draft:** officer positions need exclusive actions for unique identity. Four founding offices are Guild Commander, Operations Officer, Quartermaster and Personnel Officer. One primary position per officer; basic actions remain broadly available. Existing shared pool/no-cap rules continue.
- **LIVE-013 — Confirmed expansion direction; prototype schedule:** additional specialist offices and outpost staffing as the guild grows. Working unlocks: Intelligence 3, Logistics 5, Diplomatic Liaison 7, Research 9. Optional PC/NPC appointments give new options without extra actions. Exact unlock levels remain balancing choices.
- **LIVE-014 — Accepted working draft:** twelve founding signature concepts and twelve specialist success effects, with office-plus-trained-skill eligibility. New bonuses, reductions and progress values are prototypes; full four-degree cards, DCs, prices and some qualifications are unfinished. Overlapping legacy counterintelligence/logistics concepts need consolidation.
- **LIVE-015 — Accepted working draft:** each outpost needs a chief and staff for installed facilities, not four duplicate founding offices. Staff provide funded ongoing services; one person covers one ongoing assignment. PCs covering staff commit to the location but may lead compatible actions. Construction Full Commitment is preserved; unstaffed facilities lose benefits while unavoidable costs remain.
- **LIVE-016 — Explicit user requirement; adopted procedure:** switching officer roles costs an action. **Reorganize Command costs 1 shared Guild Action in Activity, once per turn, for the entire reshuffle.** New assignments immediately govern subsequent actions; earlier actions remain resolved. One primary office/requirements still apply; existing personnel rearrangement has no extra credit fee; new NPC hiring remains separate. Supersedes free-Upkeep switching and Appoint Officer's earlier role-change use.
- **LIVE-017 — Accepted staffing/pay boundary:** NPC officer/support salaries are Upkeep overhead; mission assignment pay stays in Events. A Retained Operative appointed to an office has one agreement covering both duties, avoiding automatic salary-plus-retainer double billing. Salary rates, first-payment timing and missed-pay handling remain deferred.

Primary evidence: current Work conversation, including the user's request for a designer-led first draft, acceptance, the explicit role-switching cost correction and request to save before continuing.

[Officer positions and outpost staffing](officers-and-staffing.md) is the authority for this later working design. **Documentation only:** no Site deployment, browser schema change, numerical simulation or Foundry implementation. Historical implementation checks do not validate these rules.

## LIVE-018: visible Upkeep and base request, October 11, 2026

**Confirmed user requirement:** make Upkeep more meaningful and visible in the browser playtest, adding a base and expansions. **Designer-proposed candidate:** Turn1 invoice, visible leased HQ and slots, itemized costs/forecasts, staffed/lean scenario presets, Training Suite/Infirmary/Recruitment Office payroll, candidate retained rates and explicit service/payment clocks. Individual values are not claimed user-approved or balanced. See [Upkeep draft](upkeep-and-base-playtest.md).

**Implementation blocked:** execution workspace offline; supported Site source-helper/testing/packaging unavailable. Documentation and arithmetic cases only, live browser remains0.3.3. No changed executable values, tests or deployment. Existing staffing and restructuring rules remain accepted; this candidate does not silently finalize missed-retainer, termination, release or creditor procedures.

## LIVE-019–020: base-price approval and purchase testing

- **LIVE-019 — Explicit user approval:** use300 credits per Guild Turn for the starter leased base, with250 rent and50 routine services; replaces the earlier150 candidate for the next browser prototype. At steady state a staffed Training Suite brings this to365. Deployed0.3.3 still uses150 until code migration.
- **LIVE-020 — Confirmed scope; designer-selected catalog:** add purchasable new bases and upgrades so players can test their values. [Base purchase catalog](base-purchase-playtest.md) retains older3,000 Field HQ/6,000 Permanent HQ/3,000 Outpost prices for ready-property offers, separates ongoing chief/facility staffing, adds Comms Hub and an artificial expansion-test preset. Exact new effects/staff prices are not individually user-approved or balance-tested. Construction versus turnkey, site-specific services, transfer clocks, lease overlap and one shared pool remain explicit.

These additions are saved as candidate design/data only. Execution workspace is disconnected, so browser code/testing/publication remains blocked; no new deployment is claimed.

## LIVE-021: implemented Upkeep/property browser pass, October12,2026

The user explicitly requested adding the saved changes to the live site after execution was restored. **Implemented0.3.4** includes the300-credit starter base, visible invoice, three property offers, four staffed upgrades, local slots/markets, separate chief hire/pay, retained pay and phase clocks, realistic transfer dates/lease overlap and artificial expansion-test preset.

Designer-selected executable defaults include renewable monthly support contracts,25/person local transfers, funded-current-service restoration through arrears payments, and unpaid-retainer work blocking without automatic termination/Loyalty penalties. This is a bounded prototype; full financial enforcement, office signature progression and Reorganize Command remain unfinished. No independent historical approval or published SF2e price is claimed for each default.

44 checks and288 smoke intervals passed; real browser QA unavailable. Native deployment **appgdep_6accfbeca2a08191b53b72e5016e26bd succeeded**, source **4e0f4e25e1f77a0ea694369f4baa33e355609b89**. [Rules](prototype-values-v0.3.4.md) and [current handoff](session-checkpoint-2026-10-12.md) supersede prior statements that the Upkeep/site work is still offline or entirely unimplemented.

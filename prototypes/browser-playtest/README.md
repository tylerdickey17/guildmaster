> **Current economy test (0.3.7): Normal Level 1 payout 900; Free Agent pay 110 per assignment. Earlier 0.3.6 payout notes below are historical.**

# Contract Operations browser playtest

Version **0.3.8** adds visible Upkeep, staffed facilities, purchasable bases and local operations to the existing three-phase contract loop. The [design repository](https://github.com/tylerdickey17/sf2e-contract-operations/blob/main/docs/prototype-values-v0.3.8.md) records values, evidence and limits.

## Starting a playtest

New Playtest offers **Staffed starter** (default), **Lean start**, and **Expansion test**. Every fresh scenario begins at an unpaid Upkeep invoice. Staffed starts with2,000 liquid credits, four Level1 Free Agents, four unpaid iconic PC officers, a leased station HQ and a landlord-owned Training Suite. Its first bill is350; following monthly bills are365 before other commitments. Lean has no installation and bills300. Expansion is an explicitly artificial Guild Level4 fixture with8,000 credits and four Level3 Free Agents for immediate purchase tests; it is not startup balance evidence.

The single shared action pool is PC count + Guild Level −1, with no officer caps. Each player gets first choice before allocating remaining actions. Routine funded Upkeep and deployment use no Guild Actions.

## Upkeep and property

Review the itemized invoice before paying. Individually prioritize bills when cash is short, or apply available cash and record remaining creditor-specific arrears. Mandatory obligations come before optional training continuation. Support contractors are month-to-month; pausing renewal removes their current service but not prior asset-maintenance bills or already-paid obligations. Unfunded services and retained personnel cannot provide their normal work. Arrears payments during Activity can restore fully funded current-interval services.

The starter base costs300/month (250 rent +50 routine services) and has two slots. Bases & upgrades offers turnkey Mobile Field HQ3,000/75-month/two-slots, Permanent HQ6,000/100-month/four-slots, and Outpost3,000/80-month/two-slots plus a separately hired100-credit chief at125/month. Possession and ownership expenses begin next Upkeep. Empty property purchase uses one action, no construction manager or second project action. Outposts need funded local chiefs; they add no actions.

Training Suite600 installed/65-month; Infirmary1,400/90-month; Recruitment Office500/35-month; Comms Hub1,700/75-month. Installed prices include qualified external project managers. Staff payroll is due upon activation; asset maintenance starts the following boundary. Slot reservations and construction capacity are local and guild-wide respectively. Benefits require funded staff and Operational condition.

A funded Training Instructor supplies ordinary trainer fees for up to six simultaneous suite trainees; materials stay25/person. Infirmary preserves mandatory recovery. Recruitment adds a candidate only on Success/Critical Success, cap3. Comms supports eligible remote administrative leadership at linked outposts, not extra actions or physical work.

Focus a location in Bases & upgrades to see its local contracts and roster. The outpost chief can lead local actions; PC remote leadership needs staffed communications. Local crew transfers cost one action and25/person, with next-Upkeep availability. Headquarters relocation costs one action,10% of moved owned installation prices and100 per transfer interval for the move manager. TransferableN governs individual installations; old lease charges continue through actual notice. Landlord fixtures stay behind and stop incurring guild bills after their final occupied interval.

## Personnel and missions

Recruit Free Agents at any Reputation; Retained Operatives at Friendly20. Retained wages are80% of the ordinary level-based wage and retainers50%, both rounded up to five credits. Retainers begin when onboarding completes at the next Upkeep. Assignment pay is frozen at deployment and settles in Events. Unpaid retainers block assignment without automatically terminating agreements or changing Loyalty in this prototype.

Contracts retain exactly three phase checks with locked leads and capped automatic rank support. Squad Level is floor average. Oversize gives +1 circumstance per extra operative and−10% cash, with highest-only circumstance stacking. Same-turn Events collect all client receipts before successful assignment wages. Failed full/half/no wages change Loyalty +5/0/−5 separately from Reputation. Participation/completion/MVP/leader XP, recovery floors, Guild XP at Advancement and the five existing Guild Feats remain.

## Saved games

The existing localStorage key is preserved. Existing0.3.1–0.3.3 saves retain rolls, frozen wage quotes, cash, paid intervals and past Loyalty. No free fitted suite or retrospective invoice is added. Existing staff are treated as covered for their current migrated interval; new lease/staff expenses begin at the next unpaid Upkeep. Browser saving is local to the device; export notes to share in chat.

## Checks and limitations

Run `node tests.cjs`. **56 checks** include invoice idempotency, shortfalls, staffing, purchase/onboarding, slots, transfer clocks, local services, retainer phases, old-save migration and the contract loop. **48 deterministic campaigns ×6 intervals =288 intervals** check cash conservation and core invariants. A minimal DOM smoke exercises invoices, settings, purchase actions and location controls. `fixtures/legacy-saves.json` contains actual0.3.3 states generated from Site commit a21c5ad; tests do not depend on scratch files.

Real browser/visual QA could not run because control-browser was unavailable. Native hosting success verifies deployment, not every rendered layout. These checks verify mechanics, not numerical balance.

Not included: property sales, full creditor/eviction enforcement, worker termination and missed-retainer Loyalty cards, PC support-staff appointments, full officer signature progression/Reorganize Command, rival work, facility damage, capture/death/rescue and Priority adventures. Basic/trained actions still use their prior skill-based access; the later office-gating draft remains queued. Events remain three authored fixtures. No Foundry module is added.

## 0.3.6 contract and roll feedback

Five descriptive difficulty bands use the SF2e/PF2e GM Core level table: Easy−2/1 success, Normal+0/2, Hard+2/2, Expert+5/2, Legendary+5/3. The labels are distinct from actual proficiency requirements; ordinary cards require trained leads, Easy allows untrained, and custom cards can state a higher minimum per phase.

Three different operatives lead the three checks, requiring minimum crew3. Automatic support can still contribute across phases. Deployment chooses a valid distinct assignment and rejects repeated leads.

Each phase result shows die, actual modifier, total, DC and degree. The next-phase button acknowledges the previous result; the third result stays until explicitly continued. All three remain in settlement summaries and recent Operations log entries. Administrative checks have a persistent on-screen result panel and recent-roll table.

Easy/Normal complications trigger only on Critical Failure; Hard/Expert/Legendary on Failure or Critical Failure. Insertion can require lead recovery, Engagement creates a disclosed charter-transport repair bill, Extraction can leave its lead Missing until a rescue adventure. Legendary has higher severity; no automatic permanent death or new rescue-resolution engine. Expert completion adds a specialist referral, Legendary also a client contact, without free hiring. Already-deployed contracts retain their original frozen completion and consequence rules.

Expansion gates, starter base expense and Normal payout remain unchanged pending the requested balance discussion. `node balance-check.cjs` enumerates8,000 opening contract rolls: with half failed wages and the365/month staffed base, current600 payout gives about−62.81 expected credits/month before training/replacement/expansion. A900 payout gives179.25 in that same bounded calculation, but it is a proposal and not implemented. This is not a campaign balance study.


## 0.3.6 progression and finance

New installations unlock at Guild Level 2; new owned bases/outposts at Level 4. Existing installations and funded projects are grandfathered. Guild Feats are earned at 3/5/7/9. Existing earlier awards count toward the next odd-level entitlement instead of being removed or duplicated. Project capacity increases to 2/3/4/5 at 4/6/8/10.

Secure Financing costs one shared action. Unsecured loans unlock at 2 (2% monthly interest; total principal cap 1,000 × Guild Level); secured loans at 4 (1%, one operational owned base pledged, 70% price cap). Twelve principal installments plus interest on outstanding principal. Approval requires nonnegative Reputation, no arrears and combined next payments at most 30% of average actual client receipts over up to three completed turns. No fabricated history is given to test presets. Repay principal freely during Activity after curing that loan's arrears.

Payments begin next Upkeep. Partial payments cover interest then principal. Missed balances remain creditor arrears; principal is not billed twice. Delinquent on first miss, Default if uncured next boundary. Default blocks finance and relocation of pledged property; full foreclosure/restructuring needs GM adjudication. Loans are financing ledger entries, never client revenue.

Normal Level 1 payout remains 600, with existing wages unchanged pending wealth-calibrated compensation design. The Developing Level 2 fixture has 2,000 credits and no upgrades; Expansion remains an artificial Level 4 fixture.


## 0.3.7 approved paired compensation test

Normal Level 1 payout is now 900; ordinary Free Agent pay is 110 per assignment. Both retain the existing 1.25 level growth and five-credit wage rounding. Higher-level client payout = 900 × (ordinary wage at mission level / 110) × contract payout factor × squad discount, rounded to whole credits. This preserves paired scaling without claiming a complete treasure-by-level salary curve.

Tier factors, XP, failure full/half/none Loyalty, 365 staffed starter upkeep and 2,000 starting cash remain. Crew-dependent quotes follow the new wage baseline: Level 1 hiring 220, retained assignment 90 and monthly retainer 55. Normal critical Engagement failure repair is55. Training materials/trainer and facility staff costs stay fixed.

Migration preserves deployed quotes, rolls, repair basis and prepared invoices. New deployments and later bills use the new baseline. Refresh the site to load the patch; New playtest → Staffed starter is the clean comparison setup.


## 0.3.8 completion requirements

Any two successful phases complete an ordinary 2-of-3 contract. Restore the Ghost Relay additionally requires Engagement to succeed, as specified in its existing Essential phase rule. Completion conditions are now prominent on the board, deployment quote and resolution screen; all results and failed-pay decisions explain the actual successful count and any required phase failure. This is a visibility fix, not a change to the accepted completion rule. Past rolls/outcomes/payments remain.

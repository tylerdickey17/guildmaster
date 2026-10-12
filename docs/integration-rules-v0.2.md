# Integration rules pass: playtest edition 0.2

> **Latest officer and staffing design:** [Officer positions and outpost staffing](officers-and-staffing.md) records founding/specialist offices, exclusive action concepts, staffing and **Reorganize Command (1 action, Activity, once per turn)**. This later tabletop draft supersedes conflicting office-access and role-change text below; browser 0.3.3 does not implement it yet.

> **Current live-play patches:** [0.3.3 shared pool and Loyalty](prototype-values-v0.3.3.md), then [0.3.2 Events timing and crew bonuses](prototype-values-v0.3.2.md), over [0.3.1 revisions](prototype-values-v0.3.1.md) and the [full0.3.0 catalog](prototype-values-v0.3.md). Historical deferrals and conflicting timing below are superseded by these patches. See the [simulation report](prototype-simulation-report-v0.3.md) for historical evidence and limits.

Date: October 10, 2026 (America/Chicago).

**Authority:** the user explicitly authorized the assistant to make the remaining integration decisions as a tabletop designer and receive feedback during playtesting. Rules below are **designer-adopted for playtesting**, not claims that the user individually approved each new detail. Previously explicit user decisions are preserved. This document takes precedence over conflicting open questions in the [earlier checkpoint](integration-checkpoint.md), [action catalog](guild-actions.md), and baseline A-G documents.

This closes the identified integration agenda at the procedural level. Numerical values, content tables, probability balance, and live-table performance are not validated. Foundry development is still deferred.

## Design guidance and limits

- Kingmaker: fixed monthly phases, assigned management, visible events, and end-of-turn organizational advancement. We retain our shared guild pool and NPC delegation instead of importing its separate leadership/region/civic budgets or universal leadership downtime.
- PF2e/SF2e: four degrees of success, existing skills/proficiencies, and compact NPC stat blocks whose strengths persist through advancement.
- Trollskull: a staffed home base and recurring contacts whose business creates adventures and relationships. We keep payroll/overhead and client activity tied to those people; we do not add daily tavern transactions, a separate profit roll, or a random passive-income engine.
- Existing priorities: maximum narrative impact, minimum rolls, no full rival accounting, Guild Level 1-10, mercenary level 1-20, and no forced universal party downtime.

Sources and access limits are listed at the end. All mechanics below are custom Guildmaster decisions unless expressly described as published guidance.

## PASS-001: A precise monthly boundary

A Guild Turn is a monthly management boundary followed by a 30-day operating interval. Training uses 30 days, as approved. Fictional dates can advance individually; deadlines are actual in-world deadlines, not numbers of play sessions.

| Order | What happens |
| --- | --- |
| 1. Upkeep: scheduled results | Process due training, recovery, construction, transfers and non-contract scheduled status changes. Contract mission results and actual mission returns occur in their due Events phase instead. Record development Guild XP for final advancement. |
| 2. Upkeep: obligations and availability | Use cash banked from previous Events for monthly rent, asset overhead and debt. Pay or record unmet obligations; resolve arrears/default notices. Confirm released personnel, facilities and managers, pending recruits/officers now starting, and officer duties. |
| 3. Budget reset | Reset the one shared Guild Action pool to PC party count + Guild Level − 1, using the level in force at the start of this turn. Officers have no separate numerical action cap. Pools reset once; unused capacity expires without XP or credit conversion. |
| 4. Commerce | Spend that same pool on financing/property transactions as desired. Payments/withdrawals alone are routine; borrowing and negotiated transactions use actions. |
| 5. Activity | Generate leads/candidates, acquire work, hire, train, develop the guild and initiate projects. Deploy eligible squads on accepted jobs without another action. |
| 6. Events & Advancement | Resolve due contracts and mission returns first; default one-turn work deployed during this Activity resolves now. Collect all due client receipts before successful payroll; apply mercenary XP, reputation and recovery, and finish failed-pay/MVP choices. Then resolve due event follow-ups and the monthly Guild Event; schedule substantial action work for next turn. Finally settle Guild XP and qualifying development awards, level the guild and choose earned Guild Feats. |

Apply mercenary XP at settlement so their next assignment uses their new statistics/pay. New Guild Level action/construction-capacity benefits begin the next boundary; existing projects do not disappear because a capacity changes.

New work started at boundary T cannot complete during that same boundary. A one-turn job, training, project or Transferable 1 completes at T+1. Work due between boundaries is resolved when due and noted once at the next boundary, with no reward re-award. A mercenary undertaking shorter work still cannot perform multiple newly initiated Standard jobs within one management turn by repeatedly reusing their status. A card can expressly grant a rapid-response exception for a later expansion of the rules.

Due obligations represent the preceding interval; hires/leases/new overhead changes begin accruing from their effective start. Default base accounting uses full operating intervals, not ad hoc same-turn proration. A partial-month special arrangement must disclose its terms before commitment. No negative cash is created to pretend a bill was paid.

Routine deployment can be assigned before or after strategic actions within Activity. A new project does not retroactively progress for the interval already closed. Commerce-financed actions do not receive a second budget in Activity.

## PASS-002: Recruitment clocks

Adopt the previously provisional two-clock interpretation:
1. A candidate introduced in T remains hireable until the end of T+1.
2. Recruit Operative in T reserves and hires that individual, paying disclosed hiring costs.
3. The recruit is pending onboarding, not deployable, through T; they become Available in Upkeep T+1.
4. Hiring in T+1 instead makes them Available in T+2.
5. An unhired candidate exits at the disclosed expiry; rivalry-caused early removal is a visible event.

A pending recruit uses **Inactive (onboarding)** with a scheduled activation, not a new ninth primary status. They cannot train, deploy, serve as active officers, or accept rival work during onboarding. Payroll obligations begin on the disclosed effective start; ordinary assignment wages are not charged merely for joining.

Work the Network costs one action, uses Diplomacy, and chooses **contracts OR recruitment** before rolling. Recruitment yields 0/1/2/3 candidates by degree. For contract leads, use the same 0/1/2/3 count as the provisional content-generation baseline; authored lead quality/access remains for balancing. Repeated uses require real new search efforts, each consuming actions; no free rerolls on the same attempt.

Candidates show identity, level, skill strengths/ranks, relevant abilities, quoted assignment pay and any hiring cost, availability window, and initial Loyalty. Starting 4-6 premade mercenaries bypass onboarding; this is campaign setup, not a repeatable free recruit action. Hiring consumes one action per person and available roster/infrastructure capacity if a property imposes one; the starting count is not a permanent roster cap.

A story reward can expressly waive hiring cost/action/onboarding; generic candidate generation waives none. No recruitment events need moving to Upkeep just to create a hiring window.

## PASS-003: Contract cards and acceptance

Every playable Standard card has:
- Stable job identity, client/category, Standard form, and any Exclusive trait.
- Offer expiry, acceptance/deployment deadline if any, duration/actual completion deadline, and cancellation terms.
- Minimum/recommended/maximum squad size and Squad Level.
- Three checks with skills/DCs, four visible phase outcomes, forward effects, terminal results and mandatory/Essential phases if any.
- Required successful-phase count (1, 2 or 3), participation XP, completion XP, client cash, Guild XP, pay quotes and any non-cash rewards.
- Required recovery and phase-added recovery durations, affected personnel, capture/death conditions and return conditions.

Success and Critical Success count as **one successful phase each**. Critical Success adds its listed benefit; it does not count twice or cancel a Critical Failure. Essential Phase requirements are additional, visible conditions: a rescue must actually free its target, for example. A card must expressly mark the phase achieving a mandatory objective as Essential if mere success count could otherwise award an unperformed objective.

Default overall completion: required count met, every Essential phase succeeded, and no terminal failure applied. A failed nonessential phase still applies its consequences even on overall success. Normal Standard resolution remains three checks, no support rolls or fourth overall roll. A terminal consequence or genuine abort can end the mission early with fewer checks; skipped phases are not successes and do not grant benefits.

Ordinary contracts have no Reputation penalty solely for letting an offer/deployment window expire; expiring Accepted work closes uncompleted without rewards. A contract with a binding completion deadline must carry the Exclusive commitment terms rather than silently adding a penalty to an ordinary expiration. Rival normal claims target Available work, not an already Accepted job; interference with accepted work needs a separate event.

Secure Contract costs one action for ordinary/Exclusive Standard work. A self-initiated Priority agreement uses the same cost; responding to a campaign-imposed urgent Priority adventure or rescuing already-captured personnel does not require buying permission to adventure with an action. Record that story exception on the offer. Priority missions are actual adventures, never squeezed into three phase rolls; their objective/outcome and Guild rewards are recorded once from the adventure.

Generated Exclusive offers remain optional. Action-free acquisition benefits require a qualifying source and player acceptance; they do not deploy staff or reserve unnamed contracts.

## PASS-004: Failure, withdrawal and rewards

Before departure, cancellation returns a Standard job to the board or closes it under disclosed terms. It grants no XP or payout. Exclusive commitment breach follows its deadline/cancellation clause; ordinary expiry alone still has no Reputation loss.

After a genuine attempt, withdrawal/abort, uncompleted terminal outcomes or accepted Exclusive deadline breach are failed settlement: **zero client cash; participation XP; no completion bonus; Reputation loss**. Client cancellation or objective impossibility caused solely by a disclosed external event is neutral cancellation: retain already earned participation XP for actual effort, no default completion rewards or failure Reputation penalty; the event may disclose a negotiated payment. This is not a loophole for the guild to label voluntary failure external cancellation.

Participation XP requires at least one meaningful resolved mission phase or actual Priority objective effort. Early-abort cards can specify an earned participation fraction; default attempted Standard work receives its listed participation award. We do not grant XP for accepting/cancelling, status toggling, duplicate job records, or fabricated attempts.

At successful completion: equal participation XP to participating mercenaries, equal completion bonus, and applicable individual bonuses. At failed settlement: equal participation only. **Leadership and MVP bonus eligibility default to completed contracts**, not merely being nominated:
- One appointed eligible squad leader receives the leadership award if they remained responsible through the completed operation.
- Players select at most one MVP whose documented check, relevant automatic support, or ability materially contributed to an achieved objective or avoided a listed consequence.
- The same person can receive both; Critical Success is evidence, not a mandatory or automatic MVP trigger. No extra award roll.
- A missing/captured participating member retains earned XP; deceased records retain earned history without retroactive reward reassignment.

Default Guild XP is the listed completed-contract award on completion; failure grants no contract Guild XP. Separately achieved organizational/story milestones can still award once. A failed effort cannot be reclassified as an infinite sequence of development milestones.

Apply the **combined size/level deployment adjustment to client cash only** for the starting model. Keep participation/completion XP, leadership/MVP, Guild XP, Reputation and Loyalty independent. Add the two authored adjustment components into one cash modifier with a published cap/floor; exact components/bounds are for balancing. Pay quotes remain fixed. Participation stays equal regardless of individual levels. This avoids inventing separate XP redistribution for mixed squads.

On failure, players choose full, half or no quoted contractor pay, with the approved large/smaller/negative Loyalty change. Only actually delivered funds qualify; unaffordable promised pay is unpaid, not a free Loyalty gain. This choice does not create an automatic arrear for the waived remainder under the default failure-risk agreement. If a special employment agreement guarantees minimum pay regardless of outcome, disclose it at hiring and track that obligation instead.

On success, agreed contractor pay is owed; unpaid pay creates recorded arrears and no payment Loyalty bonus. Ordinary payment is expected, not a farming source. Reputation loss for failure is not canceled by paying people.

## PASS-005: Deployment plan, support and status

Choose the squad, one optional squad leader and all three phase leads before the first check. The same operative may lead multiple phases. A phase lead cannot support their own check. Trained-or-better relevant supporters contribute without extra rolls; untrained personnel still count toward headcount.

After a phase incapacitates/removes a chosen later lead, replace them with an eligible present operative; absence of anyone able to meet a trained-only check follows the card's impossible/abort consequence. No lead changes solely to reroll a known result. Apply each forward effect for its written phases/duration, once.

Support uses relevant recorded proficiency ranks and the published support cap; do not infer ranks from a large numeric modifier. Caps/values remain balancing content; the card/prototype must supply them before probability tests. Squad Level remains floor(average), and deployment bounds must be met independently for size/level.

| Primary status | Exit rule |
| --- | --- |
| Available | May deploy or begin training; actual conflicting officer duties still block assignments. |
| Deployed — Guild/Rival | Return condition/date arrives; become Available, Recovering, Missing, Captured or Deceased according to the visible result. |
| Recovering | Complete disclosed recovery or valid treatment, then become Available. |
| Training | Complete the committed block, then continue training or become Available. |
| Missing | Location/outcome uncertain; a visible investigation/contact/return event establishes a new state. No assumed death or silent daily reset. |
| Captured | Remains until rescue/release; then return and any recovery must occur. |
| Inactive | Disclosed leave, onboarding or separation reason. Scheduled onboarding/leave ends on its date; retired/departed personnel require a new agreement/event. |
| Deceased | No deployment/training; restoration is possible only through the campaign's actual SF2e magic/technology and consequences, never ordinary medical action. |

Officer duties are assignments, not a ninth mercenary primary status. Available personnel with a conflicting active officer duty cannot be double-booked. Unknown Missing outcomes are not automatically Captured; a rescue requires an actual rescue target.

For concurrent recovery sources, use the **longest specified duration**, not their sum; a named distinct injury/condition can require its own treatment as disclosed. No recovery check is added just to clear an elapsed recovery timer. Facilities/treatment alter durations only through authored effects and cannot release personnel before the actual rescue/return.

Delegated rescue grants the normal authored rescue Loyalty benefit; direct party rescue grants the larger one. Close each capture/rescue episode once; a genuinely later capture is a new episode.

## PASS-006: NPC advancement and Leader Feats

Keep a compact normal SF2e NPC stat block, with explicit rank tags for relevant skills. Do not require full PC class sheets, PC item shopping or new separate stats for Standard missions.

Each NPC has a concept and advancement profile: strong/ordinary/weak statistics mapped to published compatible creature-building benchmarks. On a level:
1. Spend 1,000 individual XP, retaining excess; resolve additional earned levels similarly, maximum 20.
2. Move each numeric stat to the new-level value in the same profile; retain documented bespoke offsets/abilities rather than blindly adding another proficiency bonus.
3. Use authored profile milestones for new spells, combat abilities or skill training. Listed skills default Trained at 1-4, Expert 5-8, Master 9-16, Legendary 17-20 unless an authored profile explicitly differs; unlisted skills remain Untrained. These are custom deterministic rank tags guided by PF2e NPC proficiency guidance, not a copied PC feat schedule.
4. At Level 5, choose one of the six attribute-themed Leader Feats. The player choice is not forced to the highest attribute.
5. Update future deployment-pay quote. An in-progress quote stays fixed.

No blanket stacking of elite adjustments every level. Existing combat and social stats use the same mercenary level for this subsystem; specialist skill strength comes from its profile, not a second hidden reward level.

Any squad can deploy. Only a Level 5+ member can be appointed squad leader for its Leader Feat/leadership XP; only that member's Leader Feat is active. Phase leads are separate and need no Level 5 threshold. A nonleader's feat is not passive support unless its text explicitly grants such a benefit in the future. Active squad leadership cannot be replaced retroactively at reward time.

Profiles, individual feat effects and payroll amounts are numerical/content work. The method is decided, not the whole 1-20 stat catalog.

## PASS-007: Officer portfolios and availability

Use four **required administrative portfolios**, not four mandatory separate hires:

| Portfolio | Duties |
| --- | --- |
| Guild Commander | Organizational direction, authorizing operations and acting command. |
| Contract Broker | Clients, leads, contract acquisition and external relationships. |
| Quartermaster | Treasury/obligations, property, logistics and project coordination. |
| Personnel Officer | Hiring, training, welfare and personnel records. |

PCs and appointed NPCs can cover multiple portfolios. There is one shared action pool and no personal officer action cap. Give each player an action choice or a pass before allocating remaining actions together. Portfolios determine accountability and story hooks; they do not exclusively gate basic actions to one title. Any available officer can perform a basic action; trained actions require the executing officer's actual skill.

Initial PC appointments are free at campaign setup. Later hire/promotion/role reassignment uses Appoint Officer, one action; an existing officer may change covered portfolios within that appointment. Newly appointed people begin their duties at the **next** boundary; appointments never create shared Guild Actions.

No universal level/skill gate for basic officer status: the guild appoints a willing PC or contracted NPC with agreed duties. A Level 1 officer can administer without qualifying as a squad leader. Skill requirements govern trained actions. A role's expertise can matter through authored feats/events, not a hidden minimum.

Confirm who covers portfolios during Upkeep. If someone is unavailable, appoint a willing existing available officer as an **acting custodian** for that turn without a new-hire action; it adds no action capacity. If none is available, mark the portfolio vacant. Routine ledgers/salaries and already-managed work still process; no actions are executed without an available officer. Vacancies create a visible staffing issue, not automatic extra Reputation loss or a second penalty ladder.

Reserve an officer from the start of construction or another Full Commitment through its release. Starting that commitment is their final discrete action that turn; they cannot start work, execute additional actions afterward, or serve two mutually exclusive posts. A single manager oversees one active project; additional managers allow concurrent projects only within the guild-wide cap. Contractors are not automatically action-qualified officers.

An officer may deploy as a mercenary, with ordinary assignment pay plus their disclosed officer salary, but loses administrative availability until return. Salary continues during approved assignment unless employment terms say otherwise. PCs on an adventure may perform Remote actions if communications/time plausibly permit; Local or Full Commitment tasks require presence/downtime. No additional daily time sheet or compulsory week is imposed.

## PASS-008: Training completion and instructors

A cohort starts with Run Training Drills, one action and an available officer. Available mercenaries join it within the program/facility's authored cohort capacity. The officer arranges instruction; this is a discrete action, **not automatic full-month occupation of the officer**. Routine staff or a hired trainer, with disclosed cost/appropriate teaching skill, must cover the operating interval. If the initiating officer personally teaches instead, they accept a Full Commitment and follow normal availability limits.

Settle XP **per completed training turn** in Upkeep, with the bonus for that completed consecutive block. A second consecutive block receives its second-block bonus; it does not retroactively multiply the first. Bonus rate, additive/other formula and cap are balancing parameters, not an adopted 10% rule.

Before releasing trainees at Upkeep, players may continue the same cohort. Continuing consumes no new Guild Action but pays the next training costs and retains staff/resources. Personnel remain Training without a brief Available loophole. Joining a different cohort or changing the training objective starts a new action/streak. A new participant needs a newly initiated training enrollment and cannot inherit the cohort's prior streak.

Stopping after a completed block returns personnel to Available and ends the streak. Interrupting a block before its 30 days gives no XP for that incomplete block and ends the streak; previously completed awards stay earned. If instructor/resource coverage fails, pause rather than fabricate completion; the interruption rule applies unless a disclosed temporary substitute maintains continuous instruction.

Training grants mercenary XP only, no routine Guild XP or leadership/MVP awards. Training is not a way to heal a Recovering operative, and basic training cannot instantly rewrite an NPC's proficiency set. New-skill retraining requires an authored program in future content.

## PASS-009: Projects, relocation and facility disruptions

Commission Project costs one action; funding, eligible slots, one qualified manager and shared concurrent capacity must be present. The project card defines work type, time, staged costs, manager qualification (technical Crafting, medical Medicine or other suitable skill), and benefits. Its basic initiation action remains open to any officer; the assigned manager must meet the project requirements.

Relocate Operations costs one action per coordinated relocation project; its manifest lists each upgrade and its Transferable N. One manager supervises that relocation project, and it occupies the same shared project-capacity pool as construction. Destination slots are reserved when committed, counting inactive arriving upgrades so the same slot cannot be promised twice.

If a manager, funds for a disclosed stage, property access or essential slots are lost, pause progress and benefits. Completed work remains recorded; resumed work continues rather than restarting solely to farm milestones. Assigning a replacement manager is routine administration if they are already employed and qualified; hiring them uses Appoint Officer or disclosed contractor hiring under Commission Project.

A relocation upgrade stays inactive during transit/pause, retains one identity, and is active only after its own N completed intervals. The manager remains until the manifest finishes or remaining work is formally canceled/reassigned. Removing an upgrade from a sale removes its counted value. Selling occupied origin/destination requires resolving the project's custody/access before closing.

Default cancellation stops unperformed work, forfeits spent labor and returns only unspent committed funds/material value expressly refundable under the project terms. No automatic refund of completed expenditure. Permanent improvements remain with their property; Transferable lease improvements move only if the lease permits.

**Adopt a minimal facility-disruption framework** to resolve the previously provisional damage question: an event/attack can make a named facility Operational, Damaged (its stated reduced benefits) or Offline (no benefits). Commission Project initiates a disclosed repair with time/cost/manager. Do not add structural HP, random decay checks or a second construction simulator. Restoration earns no repeat development XP. Life-safety/defense incidents can still become Priority adventures.

## PASS-010: Obligations, enforcement and insolvency

Record each obligation's amount/due date, paid amount, arrear balance, collateral if any, and published escalation/settlement terms. Arrears do not disappear when a new month resets. Financing requires approval based on level, reputation and debt; renaming a loan does not reset its delinquency or create net cash from refinancing.

Resolve receipts first; players choose among payable obligations. Mandatory essential operating costs must actually be funded before affected new work starts. Player payment choices remain visible; there is no secret GM payment priority. A loan/lease may disclose a grace period; default test agreement advances to Delinquent at the missed boundary and Default if still uncured at the following boundary. This one-turn grace is a prototype contract term, not a universal real-world rule or calibrated economy.

Default invokes a disclosed visible notice/remedy: collateral possession, unsecured collections/restricted finance, lease access termination. Respect property/upgrade custody and any separately owned removable assets. Liquidation/sale applies actual proceeds to secured debt first; deficiency persists. Restructuring is a Secure Financing action with disclosed creditor decision and new terms, not guaranteed approval. Repeat applications without material change cannot erase a refusal.

**Insolvent** means available treasury plus realizable unpledged asset proceeds cannot meet due arrears and essential next-interval operating costs, with no approved financing/credible restructuring in place. Pledged sale equity counts only after secured debt/transaction costs; fictional book value is not available cash.

At insolvency, players choose a visible recovery plan: suspend new work and negotiate, liquidate selected assets, arrange a patron/refinance, or accept GM-authored bankruptcy terms. They can continue adventuring; no automatic XP/level/feat reset. Available personnel can take permitted jobs under a reduced mobile/leased operating base if requirements are met. Unfunded deployments/training/construction cannot proceed.

A bankruptcy/patron agreement lists retained assets/personnel, unpaid balances written off versus still owed, continuing costs and obligations/restrictions. Forgiveness requires express settlement; it is not an infinite borrowing/withdrawal/reset loop. No fixed automatic Reputation loss beyond disclosed creditor/client/event effects; do not silently convert private debt to public failure.

Recovery: current due bills are funded, no uncured default remains (or it is explicitly restructured), and the next operating interval has a funded plan. Insolvency ends then; each agreement's arrears/status still follows its own settlement. Unrestricted PC treasury withdrawals stay legal but expose the actual resulting shortfall.

## PASS-011: Actions, repeats and automation boundaries

Set every accepted basic action, all nine trained actions, and Relocate Operations to **one Guild Action** as the prototype cost, with an eligible and available executing officer but no personal action quota. Secure Contract and Recruit Operative retain their explicit costs. Future multi-action exceptions need text, not a guessed cost. Do not adopt the optional Gather Intel, Provide R&R, Reorganize Command, Renegotiate Terms or Expert catalog just to fill space; Appoint Officer already covers role changes.

Choose an action's aim/target and prerequisites before any check. Routine acceptance/hiring/known-cost construction/transactions don't need an extra “administrative success” roll; success depends on known terms. For uncertain business/trained activities use a single executing-officer skill check and a visible four-degree action card. Use Diplomacy for Work the Network; a trained action selects one of its listed approaches before rolling. No support rolls are added to mission phases.

An action may be repeated on **distinct** candidates/jobs/projects/targets. Improving the same metric for the same audience/person/property more than once in a turn uses only its strongest noncumulative temporary effect or a single improvement award, as authored. It still costs the spent action; display this restriction before spending. Work the Network can create additional genuine candidate/lead batches, and Recruit Operative/Secure Contract can select multiple different targets.

Facilities, feats and trained actions use typed benefits following the game: don't stack same-type numeric bonuses to one check; specific published effect text decides stacking. No duplicated identical facility benefit unless its entry allows it. Support is one aggregated capped contribution, not multiple disguised bonus types. The actual types and values are content work.

Maximum 20 mercenary levels and 10 guild levels; stop advancement at cap without converting excess XP to credits/actions. Unique reward/asset/job identity survives moving, renaming, sale and cancellation.

Events disclose outcome timing and whether they waive a normally paid action. Ending a turn with unused actions is allowed; events don't silently grant more actions or demand impossible retroactive expenditure. Retain monthly visible guarantee/fallback, next-turn response opportunity and scheduled-outcome counting.

## Ready-for-test requirements

Integration procedures are now decided. Numerical/content authoring must still supply:
- Action pool growth, prototype roster/cash/assets and pay quotes.
- Skill DCs and full four-degree activity/contract outcomes; support values/cap.
- Participation/completion/bonus/Guild XP values and combined cash adjustment.
- Training base/bonus/cap, cohort resources/costs and recovery/treatment durations.
- Facility slots, project/relocation prices and time cards; actual loan/lease terms.
- Six Leader Feat effects, guild feat/automatic-contract benefits and event cards.

Use transparent fixtures for logic-only walkthroughs; they are not adopted balance values. Use paired runs for acquisition-cost A/B and officer capacity, keeping inputs constant. Test starting guild, mature guild, expansion, Exclusive deadline failure, rescue, insolvency and adversarial replay/stockpiling.

A follow-up regression note lists concrete cases checked for this pass. It does not claim probability balance or observed table speed.

## Source notes

1. [Kingmaker: Running a Kingdom](https://2e.aonprd.com/Rules.aspx?ID=1794&NoRedirect=1): phases, end-of-turn XP, management. We deliberately adapt rather than copy action budgets/downtime.
2. [PF2e NPC Advancement](https://2e.aonprd.com/Rules.aspx?ID=3412&NoRedirect=1): preserve an NPC's profile when advancing statistics. Custom XP triggers remain ours.
3. [PF2e Building Creatures](https://2e.aonprd.com/Rules.aspx?ID=2874&Redirected=1): compact top-down NPC profiles. No copyrighted tables reproduced.
4. [PF2e Adjusting Creatures](https://2e.aonprd.com/Rules.aspx?ID=3262&Redirected=1): listed skills/rank guidance and avoidance of repeated elite adjustments. Our explicit rank schedule is a deterministic adaptation.
5. [Paizo: Starfinder Player Core Explained](https://paizo.com/blog/starfinder-player-core-explained) and [Find Your Path—October 2025](https://paizo.com/blog/find-your-path-october-2025): search-indexed official confirmation of SF2e skills/compatibility; direct fetch was unavailable. No invented SF2e-specific advancement table is attributed to these pages.
6. [D&D Beyond: Visitors to Trollskull Alley](https://www.dndbeyond.com/posts/316-visitors-to-trollskull-alley): recurring home-base contacts and business-linked story hooks. It includes author-added encounters/services; not all are book rules. The full Dragon Heist business chapter redirected to a storefront and was not readable, so no exact tavern accounting rule is claimed as verified.
7. Prior Work checkpoint and explicit user decisions are primary for Guildmaster. Personal Context additionally recovered individual XP carryover approval; complete original stat/office procedures were not recovered. New PASS choices resolve them by current delegated design authority, not fabricated historical approval.


# Integration checkpoint: October 10, 2026

This is the current tabletop design checkpoint following the six-agent integration stress test and the user's subsequent decisions, through consecutive training. It is not Foundry implementation or numerical balance validation.

**Precedence:** the accepted rules below supersede conflicting October 10 baseline wording and deferrals in Systems A-G. Earlier entries remain historical evidence. Use this checkpoint and the [Guild Action catalog](guild-actions.md) when running the next tests. The [decision log](design-decisions.md) records stable INT IDs.

## INT-001: Guild Turn sequence

Confirmed. Use Pathfinder 2e Kingmaker as guidance, adapted to the guild.

| Phase | Resolution order and work |
| --- | --- |
| Upkeep | Resolve due contracts and scheduled personnel outcomes; collect completed-contract revenue; progress existing construction and release completed-project managers; pay monthly payroll, overhead, and debt obligations. |
| Commerce | Handle financing, property transactions, and treasury withdrawals. Deliberate transactions use their applicable Guild Actions from the same monthly pool. |
| Activity | Assign available officers and spend remaining shared Guild Actions; begin deployments and projects. |
| Events & Advancement | Resolve remaining scheduled follow-ups and monthly events; make immediate choices and schedule substantial responses; award Guild XP and process advancement. |

A due rival return is presented visibly during Upkeep, releases eligible personnel before Activity, and counts toward the event minimum. It is not processed twice in Events.

New assignments cannot complete at the boundary at which they begin. New Guild Level action/capacity benefits begin next turn. Mercenary pay is quoted on deployment; levels earned during that assignment change the next assignment's quote, not its existing pay.

Guild Turns represent monthly operation concurrent with adventures. Training uses a default 30-day Guild Turn (INT-015); calendar edge cases and partial-month proration remain unresolved. No universal PC downtime requirement is introduced.

Kingmaker references: [Running a Kingdom](https://2e.aonprd.com/Rules.aspx?ID=1794&NoRedirect=1), [Activity Phase](https://2e.aonprd.com/Rules.aspx?ID=1805), [Event Phase](https://2e.aonprd.com/Rules.aspx?ID=1809). Kingmaker uses multiple activity budgets; Contract Operations deliberately retains one shared level-based pool.

## INT-002: Contract completion and failure

Confirmed for Standard resolution. Each contract lists a required number of successful phases: **1, 2, or 3**, reflecting its demands. No fourth overall check is added. Difficulty uses both authored DCs and the required-success count; numerical calibration is deferred.

The assistant proposed counting Success and Critical Success as one successful phase each. This is the working proposal, not a separately explicit approved critical-success weighting. Cards must define any essential objective or exceptional consequence that changes settlement; a threshold does not erase injuries or other listed phase consequences.

| Result | Client payment | Mercenary XP | Reputation |
| --- | --- | --- | --- |
| Completed | Advertised payout, with applicable deployment adjustment | Participation XP plus completion bonus | Contract's listed reputation rewards |
| Failed | No client cash payout | Participation XP, without completion bonus | Reputation loss |

Participation XP requires a genuine mission attempt, not accepting and immediately abandoning a job. Existing equal base XP and permitted leadership/MVP stacking remain. This does not establish failed-job Guild XP, bonus eligibility on failure, interruption settlement, or exact reward values.

After a failed assignment, players choose contractor payment:

| Payment relative to agreed pay | Loyalty |
| --- | --- |
| Full | Large increase |
| Half | Smaller increase |
| None | Decrease |

These special gains apply to failed assignments; ordinary agreed pay on successful work is expected. Personnel payment does not automatically cancel failure's reputation loss. A separately visible public event may affect reputation. Exact values and ordinary successful-pay enforcement remain deferred.

## INT-003: Contract acquisition, deployment, and progression

Confirmed starting model: **Secure Contract costs one Guild Action**, assigned to an available officer. Deploying on an accepted contract is routine administration with no additional action cost. Continuing or resolving work costs no new action. Personnel, funding, and deployment limits still apply.

Contract lifecycle: **Available → Accepted → In Progress → Resolved**. Acquiring and deploying are distinct; holding an accepted contract does not multiply awards.

Acquisition's action cost remains an A/B playtest subject against free acquisition, with deployment free in both branches. No automatic deployment is authorized by acceptance.

Guild Feats, officer abilities, or facilities may generate leads or offer qualifying contracts with no acquisition action cost. Players still choose acceptance. Distinguish lead generation from action-free acquisition; neither bypasses deployment capacity. Frequency, qualifying jobs, and exact unlock source/content are deferred.

## INT-004: Exclusive contracts

Exclusive is a trait independent of **Standard versus Priority**. Exclusive contracts are harder, offer greater rewards, and disclose a completion deadline. Their offers are reserved to the guild during the stated offer window.

After acceptance, missing that completion deadline counts as failure and hurts reputation. Declining or allowing an unaccepted exclusive offer to expire does not impose that penalty. Ordinary offer/deployment expiration alone does not cause reputation loss. Ordinary card deadlines, cancellation/interruption details, and Priority acquisition costs remain unresolved.

Broker Exclusive Deal pursues these offers; it does not automatically accept them.

## INT-005: Shared actions and officers

Confirmed shared pool grows with Guild Level; exact counts remain deferred. **Two actions per available officer per turn is the user-selected provisional playtest baseline**, not a validated capacity. Every executed action consumes shared guild capacity and executing-officer capacity. Officers do not generate their own additional pools.

Discrete actions do not occupy the officer for the entire month. Conflicting ongoing duties, including construction management, reserve the officer until released. PC participation depends on task-specific availability: remote coordination can be possible, but work requiring physical presence/downtime cannot ignore an adventure commitment. Detailed scheduling remains to be specified.

See the separate catalog for basic and trained actions. Officer roles, qualifications, vacancies, manager capacity, unused-pool handling, and exception mechanics remain open.

## INT-006: Mixed squads and automatic support

**Squad Level = floor(sum of deployed mercenary levels / deployed headcount).** Squad size remains separate and the level remains on the 1-20 mercenary scale.

Evaluate size and level against the contract's recommendations separately, then combine them into **one final reward adjustment**. Formula, bounds, affected rewards, and interaction with check difficulty remain for balancing.

Supporting mercenaries must be **Trained or better in the phase's skill** to supply automatic support. No extra support rolls. Untrained operatives still count toward squad size and can earn participation XP. Support amounts, caps, and stacking remain deferred. Squad leaders and phase leads remain distinct roles.

## INT-007: Recovery

Recovery can arise from:
- A demanding mission's disclosed recovery requirement, even after success.
- A disclosed phase consequence affecting particular operatives or the whole squad.

Routine successful missions without either source do not require recovery. Contract completion and personnel condition are separate. Recovery duration, overlapping requirements, and Establish Recovery Protocol's effect remain for balancing. Rescue ends captivity but availability follows any applicable return/recovery condition.

The user accepted a delegated-rescue loyalty benefit, with the large party-rescue benefit reserved for direct PC rescue; precise routing and values remain open.

## INT-008: Financial distress

Missed obligations remain recorded. Agreements disclose escalation from overdue obligations to **Delinquent → Default** and the relevant timeline/consequences. Preserve the existing Insolvent stage for inability to sustain obligations; its trigger and bankruptcy procedure are not newly finalized.

Repayment or negotiated restructuring provides recovery. Secured debt can lead to repossession/foreclosure of pledged assets; unsecured debt can enter collections and restrict new financing; lease default can terminate access.

Collateral sale proceeds apply to secured debt; a deficiency remains owed unless explicitly settled. Default/bankruptcy is neither automatic campaign termination nor automatic forgiveness/asset retention. Do not add a treasury-withdrawal cap. Specific grace periods, creditor enforcement sequence, payment priority, and insolvency rules remain deferred.

## INT-009: Transferable N

Upgrades carry **Transferable N** or **Permanent**. N is the number of Guild Turns needed for relocation and reinstallation; it is not a numeric bonus. For example, Transferable 1 takes one turn and Transferable 5 takes five.

Relocate Operations initiates transfer. Ongoing progress costs no further actions. Benefits cease at the origin when relocation begins, stay inactive through transit/installation, then resume at the destination on completion. Sufficient eligible destination slots and applicable lease restrictions are required.

Sale valuation excludes the removed upgrade. Credit costs, trait assignments, staffing/project-capacity interactions, and interruption rules remain deferred. This does not finalize provisional property damage/repair mechanics.

## INT-010: Unique rewards and development

Settle each accepted contract completion, rescue episode, and qualifying development milestone once. Allowed leader/MVP stacking is not duplicate settlement.

Meaningful new organizational milestones qualify for development XP: establishing an outpost, completing an expansion, or installing a qualifying facility. Relocation, repair, or reinstallation of the same asset does not award its development XP again. Genuine upgrades can be new milestones. Exact qualifying list and awards remain deferred.

## INT-011: Event responses and follow-ups

Immediate choices are free, including selecting a response, accepting/declining an event offer, or choosing a listed payment. Free choice does not waive an ordinary action: an event's free decision to pursue a recruit still requires Recruit Operative unless the event expressly grants an exception.

Substantial follow-up uses its appropriate Guild Action. Events disclose costs and deadlines and allow next-turn action responses when current actions are spent.

Scheduled follow-ups resolve first and can satisfy the guaranteed monthly minimum. Schedule return/capture outcomes rather than waiting indefinitely for another random draw. Present due Upkeep outcomes there; process other follow-ups in Events. If no qualifying event satisfies the minimum, generate an eligible new event with an always-eligible fallback (a new market lead is an example).

Extra event scaling remains unadopted, pending playtesting. Target eligibility is rechecked as circumstances change. No rival finances or independent rival turns.

## INT-012: Recovered personnel framework and source limits

Personal Context recovered summaries of earlier user approvals:
- Normal SF2e NPC statistics/proficiencies.
- Starting roster of 4-6 premade mercenaries; additional recruits earned.
- Eight statuses: Available, Deployed, Recovering, Training, Missing, Captured, Deceased, Inactive.
- Captured personnel can generate rescue contracts.
- Six attribute-themed Leader Ability options, with effects originally deferred.

These are **recovered historical summaries**, not a newly recovered full original transcript. Preserve G-001 as partially recovered. Detailed NPC stat advancement and earlier recruitment/leadership procedures were not fully retrieved. New user-approved rules below supplement recovery.

Deployed retains guild/rival subtypes. One primary personnel status applies at a time. Training and Recovering block deployment and cannot overlap; Deployed, Missing, Captured, Deceased, and Inactive block training. Detailed Missing/Inactive/Deceased transitions remain unresolved.

## INT-013: Recruitment

Candidate sources include Work the Network, events, contract rewards, and personal encounters. **Work the Network uses Diplomacy**. For recruitment:

| Degree | Candidates generated |
| --- | --- |
| Critical Failure | 0 |
| Failure | 1 |
| Success | 2 |
| Critical Success | 3 |

Generating candidates does not hire them. Recruit Operative hires one selected candidate for one Guild Action after reviewing statistics/terms. DCs and hiring costs remain deferred; event/reward candidate counts are independently specified.

**Current hiring-window/start-date interpretation remains provisional:** candidates stay hireable through the end of the next Guild Turn; a candidate hired this turn becomes deployable next turn. The user's question suggested next-turn availability, but the complete two-clock interpretation was supplied by the assistant and not separately confirmed. Preserve it for review, rather than claiming both clocks are settled.

This supersedes the earlier proposed end-of-current-turn window and its early-recruitment-event workaround as the working proposal. Do not silently move all recruitment events to Upkeep.

## INT-014: Leader Feats

Confirmed: at **Level 5**, a mercenary gains one **Leader Feat**, selected from six attribute-themed options. Exact effects remain for balancing.

Working squad-leadership interpretation: appoint one Level 5+ deployed mercenary; only their Leader Feat applies. Lower-level squads can deploy normally with phase leads, but without squad-leader benefits. This threshold began with the user's “Level 5 or higher maybe”; no requirement that every mission have an eligible leader is introduced. Leadership XP qualification remains unresolved beyond its existing bonus framework.

## INT-015: Training

Run Training Drills begins a training commitment; ongoing training costs no additional Guild Actions. Default duration is **one Guild Turn (30 days)**. Training XP is granted at completion and personnel become Available in the next Guild Turn.

Players can instead continue training consecutively, keeping personnel unavailable and gaining a bonus for that longer commitment. Returning to Available ends the streak. Group size, base XP, exact bonus, cap, and payout timing within extended training remain deferred.

**10% per subsequent turn is a user-suggested balancing candidate, not an adopted formula.** Do not assume additive or compounded calculation. Training does not overlap deployment/recovery.

## INT-016: Guild Action catalog

The user accepted the eleven renamed basic action concepts and all nine trained action concepts/requirements. Expert-tier actions remain deferred. Relocate Operations was subsequently accepted through the transfer discussion. See [guild-actions.md](guild-actions.md) for the full catalog, basic versus trained access, action-cost evidence, and remaining optional proposals. Numerical mechanical benefits are explicitly reserved for balancing.

## Remaining integration and balancing agenda

- Confirm recruitment hiring-window and onboarding clocks.
- Decide critical-success counting and essential objective/early-termination exceptions.
- Define officer role/qualification/vacancy rules and detailed task conflicts.
- Complete NPC stat advancement and remaining personnel-status transitions.
- Decide failed-job Guild XP and leadership/MVP eligibility.
- Define multi-turn training management, XP settlement cadence, and group size.
- Specify remaining transaction/insolvency procedures and interruption effects.
- Choose shared action growth, most action costs, skill DCs, numerical benefits, wages, rewards, support limits, recovery durations, and contract content.
- Run matched A/B acquisition tests and officer-capacity tests, followed by regression traces and live workload measurements.
- Foundry v14 implementation remains deferred. No claim that the prior 58 authored turns validate these newly adopted rules.

# Upkeep and base playtest: 0.3.4 candidate

October 11, 2026 (America/Chicago). **Designer-proposed first draft; not implemented or deployed.**

The user requested a more meaningful, visible Upkeep phase with a base and expansions in the browser playtest. The current execution workspace is disconnected, so the supported Site source-helper/testing/publication workflow cannot run. This checkpoint preserves concrete values and implementation requirements; it does not claim a site update.

## Problem found in the existing code

Browser 0.3.3 already has a 150-credit inclusive HQ lease, two installation slots, Training Suite and Infirmary construction, and facility bills. However, a fresh game begins in Activity; later Upkeep auto-deducts bills and mainly displays that they have settled. Development lists projects, but the base and its operating budget are not represented as a clear management screen.

Current source: [engine](../prototypes/browser-playtest/dist/engine.js), [interface](../prototypes/browser-playtest/dist/app.js), [values](../prototypes/browser-playtest/dist/values.js). The live site remains 0.3.3. This candidate is separate from its frozen executable values.

## Experience to build

Fresh playtests begin at **Turn 1 Upkeep**. The player sees:

1. **Base:** name, leased/owned status, operating condition, location, occupied/free/reserved installation slots and installed facilities.
2. **Due now:** an itemized invoice with treasury before payment, obligations, optional continuation choices and treasury afterward.
3. **Personnel and projects:** arrivals, recovery releases, training completions, construction completions and staffing assignments.
4. **Next bill:** known operating costs and scheduled new costs, separate from contingent contract receipts.
5. **Review and settle Upkeep:** no Guild Action cost. Invoice settlement precedes optional paid training continuation and opening Activity.

A funded ordinary month should take one review/settle click. Shortfalls and meaningful choices receive their own controls. Avoid a separate button for every routine bill or automatic ongoing employee service.

The page should explain that client receipts and assignment wages settled in the previous Events phase. Upcoming missions do not fund the current invoice until they actually resolve. Show one-month operating cost and reserve coverage, explicitly excluding future mission pay, construction and other optional spending.

## Starting base

**Station Operations Office**: leased station headquarters, two upgrade slots, four unpaid PC officers, no roster cap.

Preserve **150 credits total monthly base cost**. Proposed presentation split:

| Component | Monthly credits |
| --- | ---: |
| Lease | 100 |
| Utilities and maintenance | 25 |
| Routine administration and basic security | 25 |
| **Total** | **150** |

This is an illustrative allocation of the existing inclusive 150, not three additional charges. It remains one base obligation; players cannot selectively default on a presentation subcomponent. Ordinary tax/security bookkeeping stays abstracted.

### New-game presets

- **Lean start:** 2,000 liquid credits, four Level 1 Free Agents, leased HQ, no installed expansion. First Upkeep is 150, leaving 1,850.
- **Staffed start:** same liquid credits, roster and HQ plus one landlord-owned Training Suite and a qualified instructor. First Upkeep is 150 base +50 instructor =200, leaving 1,800. The first asset-maintenance bill follows the occupied interval; later steady Upkeep is215.

Use **Staffed start** as the recommended demonstration of recurring upkeep and an active facility; retain Lean start for comparison. Starting fitted space is a disclosed scenario asset, not an invisible cash purchase. The landlord-owned starting suite cannot be sold for guild proceeds and awards no setup Guild XP. Its slot remains occupied unless its lease arrangement is changed. Later commissioned facilities are separately owned under their actual terms.

These are proposed scenario fixtures, not confirmation that 2,000 credits or a free fitted suite is balanced. Existing saves must not receive this scenario asset or lose cash retroactively.

## Expansion values

Keep the existing construction prices and external-manager quotes for Training Suite/Infirmary. Add Recruitment Office as an affordable third choice competing for the two slots.

| Expansion | Installation + manager | Construction | Asset cost/month | Staff/month | Total/month | Benefit |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Training Suite | 500 +100 =600 | 1 turn | 15 | 50 | **65** | Up to six simultaneous trainees in the suite; qualified instructor replaces the ordinary trainer fee for its cohorts. |
| Infirmary | 1,200 +200 =1,400 | 2 turns | 40 | 50 | **90** | Existing phase-added recovery reduction1, preserving mandatory recovery; active care still requires its action and materials. |
| Recruitment Office | 400 +100 =500 | 1 turn | 10 | 25 | **35** | Local recruitment access; successful/critical-success local recruitment gains one candidate, maximum3. Hiring still costs an action. |

Each occupies one slot, including reserved construction slots. Respect existing shared project capacity, disclosed manager commitments, funding and duplicate-installation restrictions. Existing benefits require Operational condition plus funded qualified staff.

Facility staff are ongoing roles: Training Instructor, Medical Specialist and Recruitment Agent. One employee covers one ongoing assignment. Their ordinary work adds no Guild Actions or routine work roll. Explicit NPC payroll is separate from asset maintenance and shown once.

The dedicated instructor's salary substitutes for the 50-credit ordinary trainer charge for eligible suite cohorts; trainee costs remain25/person. The suite accommodates at most six simultaneous trainees across all its cohorts, avoiding unlimited cohorts from one employee. Offsite/basic training still uses the ordinary paid-trainer procedure and its four-person cohort limit. PCs covering a facility follow the agreed location commitment and do not receive an invented salary obligation.

Construction manager fees were funded up front and must not reappear as recurring payroll. Specialist staffing becomes necessary when the facility activates; quote its first payroll and first maintenance due turn before commissioning.

### Pausing services

During Upkeep, offer to staff or suspend a facility's service for the current interval, provided no continuing commitment is violated. Suspension stops its staffed benefit. It does **not** retroactively cancel accrued maintenance, an existing employee agreement, training already delivered or an already-due salary.

A roster employee moved to deployment/training leaves their assigned service unstaffed. Full Commitment construction management remains distinct and cannot be bypassed. Initial UI should display named contractor/staff assignments and their terms, rather than silently supplying a free specialist.

Do not add a generic “skip payroll” benefit or erase an obligation when toggling a facility. Release/renewal rules must be explicit before an agreement can be ended.

## Retained personnel candidate rates

The employment models and payment phases are already accepted in [personnel employment](personnel-employment.md). Proposed values for this pass:

- New Retained Operative access at **Friendly Reputation20**.
- Monthly retainer =50% of ordinary level-based assignment wage, rounded **up** to a multiple of5.
- Retained assignment wage =80% of ordinary level-based wage, rounded **up** to a multiple of5.
- Free Agents retain full ordinary assignment pay and no retainer.
- A new hire's agreement and first retainer begin at the next Upkeep, when onboarding completes. No salary charged for an earlier inactive interval.
- Existing exclusive agreements are not automatically terminated when Reputation later falls.
- A retained officer's combined duties use one quoted employment agreement, not two full overlapping salaries.

At Level1, the ordinary wage is50; proposed retainer25 and retained assignment wage40. These are custom economy fixtures, not published SF2e wage rates.

A missed retainer remains a visible due obligation under the agreed financial-distress framework. Exact grace, Loyalty and termination cards remain incomplete; do not silently convert workers to Free Agents or deploy them for rivals. Implement the final disclosed missed-pay rules before enabling failure paths.

Starting Neutral-Reputation personnel remain Free Agents in both presets. The starting Training Instructor is a quoted support contractor, not a Reputation-gated Retained Operative. Retention conversion still needs the Personnel signature card; do not add a free conversion checkbox.

## Invoice and boundary rules

- Base lease/operating payment and employee retainers/salaries are **advance payment for the current interval**, due at its starting Upkeep.
- Facility asset maintenance is **arrears for the previous occupied interval**, retaining the current prototype's first charge at the boundary after activation.
- A facility completing at UpkeepT needs its staff agreement funded to operate in T; first asset maintenance is due at UpkeepT+1.
- Frozen contract assignment wages remain in Events. Their quote uses the operative's applicable employment rate at departure and cannot change after rolls.
- Each invoice line has a stable identity: turn + obligation + covered interval. Paid/unpaid/partial outcomes are stored per line; repeating settlement cannot charge it again.
- Start with existing due arrears and current mandatory obligations. Optional training continuation happens after their treatment is recorded, with an updated cash forecast.
- If cash is insufficient, disclose each actual obligation and preserve its unpaid balance. Payment ordering/creditor consequences follow the agreed financial rules; no negative treasury, fictional upcoming receipt or silent debt forgiveness.
- Voluntary personnel release or service suspension cannot erase already-due pay. Routine payment fulfills an agreement without an automatic Loyalty bonus.
- Zero-income turns still incur real obligations. Rent and facility ownership costs remain due even with no deployments.

The shift to advance base billing and the Turn1 invoice is a proposed new-game rule. Existing saves need an explicit paid-through interval and migration notice; do not bill a completed interval twice or back-charge old sessions. Keep previous rolls, cash, frozen quotes and Loyalty changes. Employment changes apply only to newly quoted agreements.

## Budget examples checked

Arithmetic only, not a campaign or browser test:

| Steady monthly configuration | Upkeep | Liquid reserve after one bill from2,000 |
| --- | ---: | ---: |
| Bare HQ | 150 | 1,850 |
| HQ + Recruitment Office | 185 | 1,815 |
| HQ + Training Suite | 215 | 1,785 |
| HQ + Infirmary | 240 | 1,760 |
| HQ + Training + Recruitment | 250 | 1,750 |
| HQ + Training + Infirmary | 305 | 1,695 |

These examples exclude installation purchases, mission wages, optional training/materials and debt. They are not claims about how many full campaign months the treasury supports.

Two retained and two free Level1 operatives at a bare HQ cost200/month in base+retainers and180 assignment wages. A successful unadjusted600-credit Standard receipt leaves220 after those costs, before other spending. Retained exclusivity has a continuing cost even though its assignment rate is reduced.

## Implementation acceptance checks

1. New game opens in Upkeep with a named base and an unpaid first invoice.
2. Invoice totals equal component totals; settlement cannot be repeated and cash never goes below zero.
3. Funded project managers never appear a second time as unpaid monthly bills.
4. New facility staff cost is due upon service activation; asset maintenance first appears next boundary.
5. Unstaffed services confer no benefits; ownership costs and already-due pay persist.
6. Pausing a service cannot cancel completed training XP or wages; ordinary continuation requires remaining cash.
7. Training Instructor payroll replaces its trainer fee, but not trainee/material costs or offsite trainer charges.
8. Recruitment benefit applies only locally on Success/Critical Success, max3, never free hiring.
9. Retainers appear exactly once in Upkeep; frozen assignment pay appears only in Events.
10. Base slots include installed facilities and reserved projects; cannot overbuild by opening multiple dialogs.
11. Forecast distinguishes due-now, known next obligations and pending commissioning costs without assuming successful missions.
12. Existing saves have no retrospective charges, free scenario assets or rewritten mission outcomes.
13. Notes export includes base, employment, staff, recurring bill totals, actual payment records and service-suspension decisions.
14. Recheck existing Events, failed-pay Loyalty, recovery floors, one shared pool and saved-session migration.

## Saved candidate data and limits

[Candidate values](../playtests/prototype-0.3.4-candidate/upkeep-values.json) and [arithmetic cases](../playtests/prototype-0.3.4-candidate/arithmetic-cases.json) reproduce the draft. The arithmetic was checked in the conversation's JavaScript runtime; no Node engine tests, browser QA, Site source push or deployment could run with the execution workspace offline.

The current site remains [prototype0.3.3](https://contract-operations-playtest.primeangel2.chatgpt.site). Resume through the existing Sites source-helper workflow once the workspace is connected; retain the same project and private audience. No replacement site or unverified code patch is published in this checkpoint.

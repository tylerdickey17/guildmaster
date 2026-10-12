# Prototype values: edition 0.3.4

October 12, 2026 (America/Chicago). **Implemented live-play patch**, following the user-approved visible Upkeep/base expansion scope and300-credit starting-base expense. Other prices and effects are designer-selected playtest values.

[Live private playtest](https://contract-operations-playtest.primeangel2.chatgpt.site) · [Source/tests](../prototypes/browser-playtest/README.md) · [Frozen values](../playtests/prototype-0.3.4/values.json) · [Verification](../playtests/prototype-0.3.4/verification.json).

Site source commit: `4e0f4e25e1f77a0ea694369f4baa33e355609b89`. Native deployment: `appgdep_6accfbeca2a08191b53b72e5016e26bd`, status **succeeded**. Saved version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_0296a45847ac8191b7a4b0d1e7e578bd`.

This overrides conflicting implemented starting-base costs, setup phase, automatic Upkeep payments, global facilities and employment assumptions in0.3.3. Existing contract checks, phase effects, Events settlement, wage freezing, failed-pay Loyalty, recovery floors, shared action pool and advancement remain.

## Setup and visible Upkeep

| Preset | Liquid funds | Guild / operative level | Starting installation | First bill | Known next base/facility bill |
| --- | ---: | --- | --- | ---: | ---: |
| Staffed starter (default) | 2,000 | 1 / 1 | Landlord-owned Training Suite | 350 | 365 |
| Lean | 2,000 | 1 / 1 | None | 300 | 300 |
| Expansion test | 8,000 | 4 / 3 | None | 300 | 300 |

Four unpaid iconic PC fixtures and four Free Agents remain the default roster. Party size can be1–8. Expansion uses Friendly Reputation20 and Level3 contract offers; it is an artificial purchase-testing fixture, not organic advancement or startup-balance evidence. The landlord installation stays at its lease and creates no saleable asset or setup Guild XP.

Fresh games begin in **Upkeep**, actions0. Preparation releases due personnel, awards completed training and installs funded projects without deducting bills. Players review the invoice, choose renewals, pay individual lines or apply available cash, then record unpaid obligations. Optional training continuation follows mandatory settlement; finishing choices resets the existing shared action pool.

The base total is **300/month**:250 rent +50 utilities/maintenance/routine services, a single obligation rather than separate extra charges. Invoice line identity is turn+obligation; repeated preparation/payment/settlement cannot duplicate charges. Forecast includes scheduled property possessions, staff and installations without counting future mission success.

Base costs and payroll pay the current interval in advance. Facility asset maintenance pays the preceding occupied interval, first due after activation. Upfront project managers never reappear as monthly bills.

## Properties

| Empty turnkey offer | Price | Monthly property expense | Slots |
| --- | ---: | ---: | ---: |
| Mobile Field HQ | 3,000 | 75 | 2 |
| Permanent HQ | 6,000 | 100 | 4 |
| Outpost | 3,000 | 80 +125 default chief | 2 |

Purchase costs one shared action and full price; possession and ownership expense start next Upkeep. No construction manager/second project action for that ready property. Owned empty property still costs upkeep. New sites never grant actions.

An Outpost Chief costs100 to hire with a separate action, is available next Upkeep, and receives125/month. Default local trained administration is+7; PC fixtures remain+10. A funded chief enables local services/actions using the same pool. Each site tracks installed/reserved/free slots; concurrent construction remains guild-wide.

Location selection filters local board/roster. PC remote administrative leadership requires staffed communications; the local chief can lead local actions. One of each facility type is permitted per site, with local service and payroll. This is not a global duplicate bonus.

## Expansions and staff

| Facility | Fully funded installation | Turns | Asset/month | Staff/month | Total/month |
| --- | ---: | ---: | ---: | ---: | ---: |
| Training Suite | 600 | 1 | 15 | 50 | 65 |
| Infirmary | 1,400 | 2 | 40 | 50 | 90 |
| Recruitment Office | 500 | 1 | 10 | 25 | 35 |
| Comms Hub | 1,700 | 2 | 25 | 50 | 75 |

Prices include100/turn qualified external construction manager. Each uses one local slot. Staff must be funded and the location Operational; the Outpost Chief is separate from its facility specialists.

- Training: a funded suite supports up to six simultaneous trainees across cohorts and substitutes its instructor for the ordinary50-credit trainer fee. Materials25/trainee remain. Ordinary offsite/basic cohorts retain their four-person cap and trainer cost; no unlimited instructor subsidy.
- Infirmary: existing phase-added recovery reduction1 after return; mandatory recovery stays. Active treatment/materials retain their action and cost.
- Recruitment: local search on Success/Critical Success yields one extra candidate, capped3. No free hiring. Existing Recruitment Pipeline also respects the cap.
- Comms: permits eligible remote administrative leadership; does not add actions, skill ranks, phase rolls or physical staff.

Support staff use disclosed **month-to-month service contracts** in this prototype. Before invoice payment, pause renewal or renew. Pausing denies current service but preserves accrued asset bills, completed training and already-paid salary. Personnel standing agreements do not receive a generic cancellation shortcut.

## Employment and shortfalls

Retained recruiting requires Friendly20. Retainer50% and assignment wage80% of ordinary level-based wage, each rounded **up** to5. At Level1:25/month and40/assignment versus50 Free Agent assignment. Hiring/onboarding clocks remain; first retainer is due when onboarding completes next Upkeep. Frozen departure assignment rates settle only in Events.

Invoice shortfalls preserve actual due amounts and nonnegative treasury. Players can prioritize individual bills. Unfunded staff do not operate facilities; unpaid current retainers block operative work. Routine arrears repayment can restore a fully funded **current** service, without retroactively granting previous-month benefits.

No new automatic missed-pay Loyalty penalty, exclusive-agreement termination, eviction or collection procedure is simulated. Those remain explicit future content. The browser records creditor-specific arrears and current service access, not the full financial-distress campaign.

## Transfers and relocation

Local personnel transfer: one action,25/person, next-Upkeep availability; no immediate assignment. Headquarters relocation: one action,10% original prices of moved owned installations plus100/transfer interval for manager. Personnel arrive next Upkeep; each facility uses TransferableN (Training1, Infirmary2, Recruitment1, Comms1). Destination slots are reserved; no benefits in transit or duplicate matching installation at destination.

Finish origin training, construction, onboarding, deployments and recovery before HQ relocation. Landlord fixtures remain behind. An unexpired lease overlaps ownership costs and has no refund of already-paid rent; its disclosed notice extends through the relocation interval. Owned origin upkeep continues unless a separate sale is eventually implemented. Asset identity persists and moving earns no repeated XP.

These local-transfer and support-renewal defaults are designer-selected implementation procedures under the user's delegated design authority, not claims of published SF2e rules.

## Migration

Same localStorage key.0.3.1–0.3.3 games preserve actual cash, rolled results, wage quotes, paid intervals and historical Loyalty. Existing facilities are covered for the current migrated interval; no free starting installation or retrospective invoice. New charges start at the next unpaid Upkeep. Actual0.3.3 fixtures generated from Site commit a21c5ad are checked without relying on temporary filesystem paths.

## Checks and remaining scope

**44 targeted checks** pass, plus **48 deterministic campaigns ×6 monthly intervals =288** checking cash/status/action invariants. Minimal DOM smoke checks invoice, settings, purchase, chief and local-selection handlers. These are implementation checks, not a balanced-economy result.

**Real browser visual QA unavailable:** control-browser was not exposed, so no alternate browser/preview path was improvised. Native deployment succeeded; real layout and user interaction should be assessed during human play.

Not implemented: loans, sales, full eviction/default enforcement, missing-retainer Loyalty/termination cards, PC support appointments, full founding/specialist office signature access and Reorganize Command, rivals, damage, rescue/capture/death and Priority adventures. The [officer draft](officers-and-staffing.md) remains broader than the current executable. No Foundry module is added.

# Base purchase and upgrades: playtest candidate

October 11, 2026 (America/Chicago). **Confirmed scope:** the user accepted300/month for the starter base and requested purchasable new bases and upgrades in the browser so their values can be tested. **Prototype values:** catalog prices and effects below are retained or designer-selected; they are not final balance. **Not implemented or deployed:** execution workspace remains disconnected.

Read with [Upkeep draft](upkeep-and-base-playtest.md), [officers/staffing](officers-and-staffing.md) and [candidate data](../playtests/prototype-0.3.4-candidate/upkeep-values.json). This supplements the candidate without changing deployed0.3.3.

## Purchase options

Use ready-to-use, empty property offers for the first browser pass, preserving the earlier numerical property prices. These are **turnkey purchases**. Do not charge a construction manager or a second Commission Project action for purchasing the same ready property.

| Base | Purchase | Recurring property cost | Slots | Purpose |
| --- | ---: | ---: | ---: | --- |
| Mobile Field HQ | 3,000 | 75/month | 2 | Owned mobile operations rig for relocating the guild's footprint; not a starship. |
| Permanent Operations Center | 6,000 | 100/month | 4 | Owned headquarters with room for more facilities. |
| Regional Outpost | 3,000 | 80/month + chief | 2 | A second staffed location with its own local contacts and services. |

Owned costs represent property upkeep, not rent. Higher upfront investment buys lower recurring property cost; expansion and staffing costs still apply. Routine property tax/security/maintenance remains abstracted.

The starter Station Operations Office remains leased at **300/month** (250 rent +50 routine services), with two slots. It is not a guild-owned saleable asset.

### Acquisition procedure

- **Negotiate Property Deal: one shared Guild Action**, with the full purchase price paid from treasury.
- An existing property advertised at known terms needs no extra success roll merely to complete paperwork. Uncertain bargaining/financing requires its separately authored rule.
- Purchase in TurnT transfers usable possession at UpkeepT+1. Owned property costs begin then, including vacant properties.
- Purchasing adds an owned location. Choosing it as headquarters and moving existing installations are separate **Relocate Operations** work; ownership alone does not teleport assets or cancel a lease.
- New facility construction uses Commission Project, its shared guild-wide project cap, qualified manager, reserved destination slots and funded quote.
- No new Guild Actions come from a base, outpost or chief. Location access and services still require eligible, available officers using the shared pool.
- Development XP is awarded only for a qualifying first operational new capability under existing milestone rules; no award merely for purchase paperwork. Preserve identity through sale, relocation and repurchase.

The existing build-from-scratch versions of these assets retain their construction rules for future authoring; the ready-property offers must explicitly state which transaction they represent. Do not silently convert a construction card into a purchase while keeping its manager fee.

## Outpost chief and location access

An operational outpost needs an appointed chief. Default NPC fixture: Level1, salary **125/month** using the earlier officer formula100+25×level; one-time hiring fee100. **Appoint Officer** remains a separate action. Show chief availability/onboarding so the outpost's opening service date is real.

A property purchase alone can therefore be3,000; hiring its default chief adds100 and another action. Once staffed, its recurring basic total is **205/month**, plus installed facilities. A qualified PC can cover the chief assignment instead, using the agreed location commitment and office/staff rules, without inventing a PC salary.

A vacant outpost stays owned and incurs80/month, but loses its staffed local operation/services. It does not silently recruit a replacement.

Each location has a distinct identifier and declared region. Local candidate searches and contracts show their origin. A staffed outpost opens that local market; it does not generate free hired operatives, free accepted contracts or guaranteed passive income. Training/recovery facilities serve their assigned location. Mission crew and relevant supplies must genuinely be available there; no automatic teleporting between regions.

Physical travel, initial access and any communications restriction must be disclosed on the location card. Use simple authored nearby-region fixtures in the first pass, rather than inventing a full travel simulation.

## Upgrade options

Existing upkeep candidate adds payroll to asset maintenance. Keep both visible and bill each obligation once.

| Upgrade | Funded installation including manager | Duration | Recurring total | Slot | Main benefit |
| --- | ---: | ---: | ---: | ---: | --- |
| Training Suite | 600 | 1 turn | 65/month | 1 | Up to six simultaneous trainees; paid instructor replaces ordinary trainer fees for its eligible cohorts. |
| Infirmary | 1,400 | 2 turns | 90/month | 1 | Existing eligible phase-recovery reduction1; mandatory floor preserved. |
| Recruitment Office | 500 | 1 turn | 35/month | 1 | Local recruitment access; +1 candidate on Success/Critical Success, maximum3; hiring remains separate. |
| Comms Hub | 1,700 | 2 turns | 75/month | 1 | Enables eligible remotely led administrative actions at linked guild outposts where communications are required. |

Comms Hub retains earlier1,500 construction +200 manager,25 asset upkeep and Transferable1, with proposed50/month qualified Communications Technician (trained Computers). It grants no extra actions, skill ranks, ownership access or mission-phase rolls. Remote leadership still requires the appropriate office and skill; it cannot replace physical training, medical treatment, construction management or an outpost chief.

Staff requirements, facility conditions, prepaid project-manager fees and activation/pay clocks follow the Upkeep draft. Training Suite Transferable1, Infirmary Transferable2, Recruitment Office proposed Transferable1. A facility grants its benefit at its installed location, not simultaneously at every guild property.

Existing duplicate-benefit restrictions remain. The browser implementation must decide repeat installations by site explicitly; do not accidentally retain one global facility flag or grant stacked identical benefits. For the first prototype, permit one of each type per site with local benefits and staffing, while preserving unique asset identities.

## Moving to a purchased headquarters

Keep the actual transaction boundaries visible:

1. Buy the destination; possession becomes usable at the stated Upkeep.
2. Initiate Relocate Operations for the headquarters/movable assets, paying disclosed move costs and reserving eligible destination slots.
3. TransferableN controls each moved installation's downtime. It remains owned and cannot serve both sites during transfer.
4. Assign staff at the new location. Activate eligible completed transfers without another progress action.
5. End the old lease only under its actual terms. A rent payment already covering an interval is not automatically refunded.

The prototype can use a one-turn notice clause for the starter lease, stated before purchase. During transition both owned upkeep and unexpired lease costs may be due. Show overlap explicitly in the preview rather than only replacing300 with100.

Retain the earlier relocation cost basis:10% moved installations' original construction prices plus100 per interval for a qualified external move manager. A moved asset earns no new development XP. Landlord-owned starting fixtures are not movable or saleable unless their lease card explicitly permits it; the staffed-preset starting Training Suite remains at the leased property.

Vacating an owned headquarters does not erase its ownership overhead. Sale uses disclosed fees/debt and the existing70%-of-original prototype basis; the leased starting office has no resale equity. Sale is a separate action/transaction, and property proceeds cannot be promised cash until the sale settles.

## Interface requirements

Add a **Bases & Upgrades** view with:

- Owned/leased location cards: region, active headquarters marker, condition, assigned chief, used/free/reserved slots, facilities and total recurring expense.
- Purchase cards: exact upfront price, action cost, possession date, staffing requirements and recurring cost.
- Upgrade destination selection: every eligible property, its remaining slots and project capacity. Preview benefit, staff, funded manager and first payroll/asset bill dates.
- A confirmation budget: treasury before/after purchase, additional monthly obligations, lease overlap and any unfunded commitment.
- A disabled purchase state when funds or requirements are missing, with the reason visible. Do not hide aspirational options.
- Due invoices and forecasts broken down by site, with payroll separated from asset expenses.
- A relocation summary showing assets in transit, staff coverage, original/target location and next availability.

Keep routine funded operation automatic. Decisions concern acquisition, staffing, expansion and cash allocation; avoid adding a separate maintenance roll for every room.

## Expansion test preset

The basic two presets retain2,000 startup cash. Add an optional **Expansion test** scenario so purchases can be exercised without grinding opening months:

- Guild Level4, four PCs and seven shared actions.
-8,000 treasury, four Level3 Free Agents, Friendly Reputation20.
- Leased300/month HQ, no free installed facilities.
- Ordinary contract cards recommended Level3, with existing pay/reward scaling.

These resources are an explicit artificial fixture. Logs/exports label the scenario; its results cannot be cited as startup affordability or as organic Guild Level advancement. Existing saves are not upgraded to this fixture automatically.

## Candidate budget checks

- Starter HQ + staffed Training Suite: **365/month**. A600-credit Standard receipt minus200 wages leaves35 after that steady bill.
- Permanent HQ + all four upgrades: **365/month** before operative retainers, extra officers or debt; all four slots occupied.
- Outpost + default chief + Training Suite: **270/month**,3,100 property/chief hiring plus600 training installation up front.
- An owned HQ alongside an unexpired starter lease incurs both property bills. Buying an empty property does not fund its upgrades or staff.

Numbers intentionally expose tradeoffs: ownership requires capital, outposts need ongoing local staff, and new bases can increase options without expanding the Guild Action pool. Full economy testing remains outstanding.

## Verification and implementation handoff

Check invoice identities/payment clocks, site-specific slot reservations, simultaneous project cap, no double payroll/manager billing, occupied staff conflicts, first chief service date, duplicate local facilities, no transfer teleporting, no free lease cancellation, asset identity/XP through resale, budget previews and preset labeling. Preserve existing contract Events resolution, frozen wages, recovery floors, failed-pay Loyalty and saved sessions.

Candidate JSON and arithmetic are saved in the repository. No Site source change, engine test or deployment ran with the workspace disconnected. Continue through the existing Site source-helper workflow when execution is restored, using the same private Site project.

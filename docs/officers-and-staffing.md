> **Foundry alpha4 portfolios:** [Implemented revision](foundry-turn-workspaces-alpha.4.md). Commander: contracts/public reputation; Quartermaster: finances/infrastructure/squads; Operations: training/recovery/preparation/mission resolution; Personnel: recruitment/loyalty/Leader Feats. Boost Morale is Personnel-exclusive. Operations has a basic level-one mission briefing without a skill prerequisite. This revision supersedes the alpha3 assignment of training to Personnel for the module. Specialist offices remain future scope.

> **Foundry alpha3 update:** [Guided-turn implementation](foundry-guided-turn-alpha.3.md) now adds founding workflow role gates, Quartermaster squad assembly, owned-PC action approvals and one-action Reorganize Command. The owner's newer role collaboration request supersedes the older basic-actions-for-every-office rule below for the current module. Specialist office catalogs and additional unbalanced signatures remain future design.

# Officer positions and outpost staffing

October 11, 2026 (America/Chicago). Design checkpoint after the owner and spouse's browser playtests.

## Status and precedence

The user requested distinctive officer positions with exclusive actions, later specialist positions and outpost staffing, accepted the assistant's first draft as the working design, and explicitly required an action cost for changing roles. They then requested this repository checkpoint.

- **Confirmed direction:** position-exclusive actions; expanding officer and staff opportunities as the guild grows; paid role restructuring.
- **Accepted working draft:** four founding offices, specialist offices at Guild Levels 3/5/7/9, the action concepts and staffing model below. Numerical effects and unlock levels remain prototype choices, not final balance.
- **Reorganize Command:** adopted procedure below replaces the earlier free-Upkeep switching proposal and the role-change portion of Appoint Officer in edition 0.2.
- **Implementation:** documentation only. Browser prototype 0.3.3 still uses its previous portfolios and skill-based action access; it does not enforce these office gates, staffing assignments or restructuring costs. No new simulation or Foundry implementation accompanies this checkpoint.

This document takes precedence for these subjects over conflicting office deferrals in Systems A/D/F, edition 0.2 and the earlier action catalog. The shared action pool, Events contract resolution and payment phases remain as recorded in [0.3.3](prototype-values-v0.3.3.md) and [personnel employment](personnel-employment.md).

## Common office rules

Each officer holds one primary position. Signature actions require that position and the listed trained skill; proficiency alone does not grant another office's signature action. Exact additional appointment qualifications remain to be authored.

Signature actions cost one shared Guild Action unless their eventual card expressly states otherwise. Offices do not grant personal action budgets or add actions to the pool. The retained prototype formula is **PC count + Guild Level − 1**. Offer each player their first action or a pass before assigning remaining actions; hired officers use that same pool.

Basic actions remain available to any eligible officer: Secure Contract, Work the Network, Recruit Operative, ordinary training, Promote the Guild, Boost Morale, Commission Project and other general business actions. A vacant office makes its signature actions unavailable; it does not remove everyone's general actions. Additional appointments are optional and can be filled by PCs or salaried NPCs. NPC hiring remains a separate action and recurring cost.

Initial founding appointments remain free campaign setup. Occupied or unavailable personnel still obey genuine time, location, onboarding and task conflicts. A mercenary's Level 5 Leader Feat is distinct from a guild office.

## Four founding offices

| Office | Responsibility | Proposed starting fixture |
| --- | --- | --- |
| Guild Commander | Clients, reputation and patron relationships | Navasi |
| Operations Officer | Planning and coordination of individual missions | Iseph |
| Quartermaster | Treasury, procurement, facilities and construction | Dae |
| Personnel Officer | Recruitment, training, retention and recovery | Chk Chk |

Fixture mapping is a proposed update, not a requirement for actual PCs. Browser 0.3.3 still lists Iseph as Quartermaster and Dae under Field Operations. Names come from the existing four-PC fixture; skills/statistics remain authored scenario values.

### Founding signature concepts

Effects here are conceptual; full costs beyond the one-action baseline, DCs and degrees of success await balancing. Existing skill requirements for matching trained actions are retained; requirements for newly introduced concepts are proposals.

| Office | Signature action | Trained requirement | Intended effect |
| --- | --- | --- | --- |
| Commander | Broker Exclusive Deal | Diplomacy | Pursue premium, deadline-limited work; does not make every lead a free accepted contract. |
| Commander | Negotiate Terms | Diplomacy (proposed) | Improve a specific contract's payout, deadline or payment terms. |
| Commander | Secure Patronage | Diplomacy (proposed) | Build a recurring client relationship; exact recurring-contract benefits need a card. |
| Operations | Conduct Digital Recon | Computers | Prepare a selected mission phase with useful intelligence. |
| Operations | Establish Extraction Plan | Survival or Piloting (proposed) | Mitigate a specified failure consequence; does not guarantee mission completion. |
| Operations | Coordinate Joint Operation | Diplomacy | Coordinate support from an eligible allied guild for particular work. |
| Quartermaster | Optimize Infrastructure | Crafting | Improve asset efficiency or reduce eligible overhead. |
| Quartermaster | Negotiate Procurement | Diplomacy or Society (proposed) | Improve equipment or supply purchasing terms. |
| Quartermaster | Accelerate Construction | Crafting (proposed) | Advance a funded, properly staffed expansion project. |
| Personnel | Negotiate Retention | Diplomacy (proposed) | Arrange conversion from Free Agent to Retained Operative subject to recruitment access and agreed terms. |
| Personnel | Run Specialist Training | Relevant training skill (proposed) | Enhance an eligible training cohort; does not waive its time, staffing or pay. |
| Personnel | Establish Recovery Protocol | Medicine | Reduce eligible postreturn recovery with the required resources. |

## Specialist progression and identities

| Office | Prototype unlock | Distinct responsibility |
| --- | ---: | --- |
| Intelligence Officer | Guild Level 3 | Rival objectives, emerging threats and information security; Operations keeps individual mission preparation. |
| Logistics Officer | Guild Level 5 | Transfers, supply routes and coordination between locations; Quartermaster keeps finances and assets. |
| Diplomatic Liaison | Guild Level 7 | Governments, corporations, permissions and institutional agreements; Commander keeps client contracts. |
| Research Director | Guild Level 9 | Experimental capabilities and technical research; Quartermaster keeps ordinary construction. |

Unlocking makes an office available to appoint, not mandatory. A PC can move into it using Reorganize Command, leaving or filling their former post. An NPC appointment supplies options and coverage, not free Guild Actions.

### Specialist signature first draft

The following are **success effects only**, with prototype values. DCs, critical success/failure, ordinary failure, costs, specific targets and durations not stated here remain unfinished. Information actions require an authored threat/opportunity; they do not grant unrestricted knowledge of hidden campaign material. No action adds another roll to the three Standard Contract phases.

| Office | Exclusive action | Trained skill | Proposed success effect |
| --- | --- | --- | --- |
| Intelligence | Compile Threat Assessment | Society | Identify a named rival's current objective and one opportunity to interfere. Gain +1 circumstance to one related Guild check before the end of the next turn. |
| Intelligence | Intercept Comms | Computers | Investigate a specific suspected threat; reveal its target and expected timing before spending remaining actions. |
| Intelligence | Implement Counterintelligence | Deception | Protect one location through current Events. Prevent the first information breach or sabotage complication dependent on stolen guild information. |
| Logistics | Expedite Transfer | Society | Reduce an existing asset transfer by 1 Guild Turn, minimum 1. Each transfer can benefit once. |
| Logistics | Coordinate Supply Run | Survival | Supply one remote operation. Remove one penalty specifically caused by inadequate supplies or isolation, not difficulty or understaffing. |
| Logistics | Establish Supply Route | Society | Start a route project between two guild locations. Once completed and maintained, it enables regular transfers and access to designated suppliers. |
| Diplomatic Liaison | Negotiate Operating Charter | Diplomacy | Secure permission in a restricted jurisdiction, opening its contracts, recruitment opportunities or outpost sites. |
| Diplomatic Liaison | Forge Institutional Accord | Diplomacy | Start a partnership project with a government, corporation or organization. Completion grants one defined ongoing benefit and obligation. |
| Diplomatic Liaison | Manage Diplomatic Fallout | Diplomacy | Prepare a response for one deployed contract. If it fails this Events phase, reduce its Reputation loss by 1, minimum loss 1. |
| Research | Develop Field Prototype | Crafting | Prepare an experimental aid for one squad: +1 circumstance to one declared phase, then expended. Materials cost credits; amount deferred. |
| Research | Analyze Anomalous Data | Computers | Study recovered data or samples to identify an unknown capability, hazard or opportunity and unlock an appropriate research project. |
| Research | Direct Research Program | Crafting | Advance an active research project by one progress step. It still requires its funding and qualified staff. |

Circumstance bonuses use the highest applicable bonus. Research prototypes are mission aids; they are not yet a procedure for manufacturing permanent adventuring equipment.

Diplomatic Fallout is a dedicated preparation action, not an offset earned by paying workers. Failed-contract pay continues to affect Loyalty separately from public Reputation.

## Reorganize Command

**Cost:** 1 shared Guild Action. **Timing:** Activity. **Frequency:** once per Guild Turn.

Redistribute primary positions among existing PCs and appointed NPC officers. One action covers the entire reshuffle, whether two officers swap or several positions change.

- Each individual still holds one primary position and meets its requirements.
- Assignments take effect immediately. Subsequent actions use new roles; earlier actions remain resolved and are not retroactively recalculated.
- The PC leading the reorganization spends the action from the shared pool; no additional credit fee applies merely to rearranging existing personnel.
- Hiring a new NPC officer remains a separate action. Existing employment costs continue.
- Moving existing officers can leave vacancies or interrupt services they were staffing. It cannot bypass Full Commitment, onboarding or genuine physical availability.
- Free role switching during Upkeep is superseded. Appoint Officer remains the hiring/initial appointment action; it is not a cheaper alternative for reallocating existing offices.

Death, dismissal and other forced-vacancy/replacement procedures are not newly resolved by this voluntary-reorganization rule.

## Outposts and facility staffing

Each outpost needs **one Outpost Chief**, plus the specialists required by its installed facilities. It does not duplicate the four founding offices. The chief appointment becomes available when an outpost opens, without waiting for a specialist-office Guild Level.

Routine administration and basic security are included in location overhead. Extraordinary security needs can be separately authored; no additional routine headcount bookkeeping is required.

| Location or facility | Required staff | Enabled service |
| --- | --- | --- |
| Headquarters | Founding officers; routine staff abstracted in overhead | Central administration and management |
| Outpost | Outpost Chief | Operational location and supervision of local services |
| Recruitment Office | Recruitment Agent, trained Diplomacy | Recruitment from the local candidate market |
| Training Suite | Training Instructor qualified for the offered training | Facility training program |
| Infirmary | Medical Specialist, trained Medicine | Facility recovery benefits |
| Workshop | Facilities Technician, trained Crafting | Workshop projects, maintenance and repairs |
| Research Lab | Research Specialist trained in a relevant skill | Research under the Research Director |
| Regional Supply Hub | Logistics Coordinator, trained Society | Established routes and regional supply services |

Support staff enable ongoing services automatically while assigned, available and funded. They do not each gain signature Guild Actions. Normal use of a staffed training facility does not require another action telling its instructor to work; beginning ordinary training retains its existing action cost.

These facility concepts do not supply unlisted slot counts, construction prices, capacity, durations or benefits. Recruitment staffing opens local access; it does not make recruitment, hiring or candidates action-free.

### Assignment and vacancy rules

- One person covers **one ongoing staff assignment**; a chief cannot also staff multiple facilities.
- PCs may cover staff assignments, committing to that location for the turn. They can lead suitable Guild Actions from that location.
- Deploying or training an assigned employee leaves the service unstaffed unless a replacement is provided.
- An unstaffed facility remains owned but provides no operational benefit. Unavoidable ownership costs continue.
- Offices and local service assignments are distinct. Holding an office does not supply staffing to every property.
- Construction management still uses its existing Full Commitment rules. The permission for compatible actions while running a facility does not release a construction manager or let one employee operate multiple sites.

### Pay and operating-budget boundaries

NPC officer and support-staff salaries are Upkeep overhead. Retainers are also Upkeep overhead; mission assignment wages remain in Events.

A Retained Operative appointed to an office uses **one employment agreement covering both duties**, priced accordingly. Do not automatically bill a full unrelated officer salary and full retainer for the same obligation. Any separately quoted duties must be explicit. Salary scales, retainer rates, first-payment timing and missed-pay consequences remain open.

Staff payroll must be shown separately from unavoidable property expenses or explicitly included in a quoted facility total. No double billing a salary already included in overhead. Current browser facility costs have not been repriced for this staffing model.

The design target for an initial outpost is a chief plus one useful facility, expanding as revenue grows. This is an affordability target, not a tested cost claim. Training base, recruitment station, medical refuge and supply depot should be meaningful distinct choices.

## Action-catalog migration and remaining work

Matching older trained actions now gain office gates in the tabletop working design: Broker Exclusive Deal (Commander), Conduct Digital Recon and Coordinate Joint Operation (Operations), Optimize Infrastructure (Quartermaster), Establish Recovery Protocol (Personnel). Basic actions keep broad access.

Other older general trained concepts retain their listed skill requirements unless explicitly superseded. **Run Counterintelligence versus Implement Counterintelligence**, and **Plan Logistics Corridor versus Establish Supply Route**, need a deliberate consolidation pass before implementation; the new draft does not establish cumulative duplicate benefits. Negotiate Retention is now a proposed Personnel signature, not adoption of the formerly deferred Expert-tier Negotiate Retainer action. No Expert-tier catalog is added.

Next authoring:
1. Full four-degree action cards, visible DCs, prices and repeat/target limits.
2. Resolve overlapping legacy action names and any interaction with existing numerical cards.
3. Complete appointment qualifications, initial promotion/NPC start timing and forced-vacancy coverage.
4. Staff/retainer rates, employment access gate, project/route/accord cards and missed-pay consequences.
5. Price fuller property overhead; test 2,000-credit starting capital and outpost affordability.
6. Implement role gates, staffing, payments and restructuring in the browser, then test them. Existing 0.3.3 automated checks do not validate these new rules.

## Evidence

Primary evidence is the current Work conversation on October 11. The user reported playing with their wife and said the core loop seemed good; requested exclusive officer actions; requested later offices/outpost staff; accepted the specialist/staff draft; required a role-switching action; then accepted the one-action Reorganize Command procedure and requested saving the work.

This is a positive two-person human playtest report, not a controlled balance study. Exact effects and progression levels above remain working design choices. See LIVE-011–017 in the [decision log](design-decisions.md).


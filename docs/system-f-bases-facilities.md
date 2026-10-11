# System F: Bases & Facilities

Status: confirmed framework, October 10, 2026, except the explicitly provisional damage/repair concept. Numerical balancing and the procedures listed below remain deferred. See the [decision log](design-decisions.md) and [README](../README.md).

## Guild properties

The property framework includes a **mobile HQ**, a **primary permanent HQ**, and **outposts**. Property sale and conversion are supported; exact conversion requirements and costs remain deferred. No requirement to begin with a purchased permanent HQ is established. **F-001 / F-008**

Properties have **location traits** and a **slot-based facility system**. Facilities use five categories: **Personnel, Operations, Logistics, Administration, and Infrastructure**. Slot counts, facility sizes, category effects, and upgrade catalogs remain to be designed and balanced. **F-002 / F-003**

Each property has its own expansion limit or maximum capacity. Expansion is constrained by that property's cap, rather than unlimited growth at every site. Location-trait lists and their mechanical effects remain deferred. **F-003**

## Construction and project capacity

Construction duration is measured in **monthly Guild Turns**. The guild has a **guild-wide simultaneous-project capacity based on Guild Level**, also constrained by available facility slots, funding, and project managers. Outposts and additional properties do not independently bypass that shared capacity. No projects-per-level table or construction duration is assigned yet. **F-004 / F-005**

**Every construction project requires a manager.** **F-006**

| Manager option | Confirmed commitment |
| --- | --- |
| PC | Spends downtime managing the project. This is an individual commitment, not universal party downtime. |
| Existing officer | Suspends normal officer duties while managing the project. |
| Temporary contractor | Hired to manage a project. |
| Salaried project manager | An ongoing salaried hire provides project-management capacity. |

Manager qualifications, fees/salaries, exact availability rules, effects of suspended officer duties, and whether a manager can supervise more than one project remain deferred. Having capacity alone does not waive slots, funding, or management requirements. **D-023**

Under [System D](system-d-guild-development.md), ongoing approved construction advances without spending Guild Actions, but its manager remains committed. An officer managing construction cannot execute conflicting Guild Actions. Exact officer capacity and scheduling remain deferred; a temporary contractor or project manager is not automatically a Guild Officer eligible to execute actions. **SD-008 / D-028**

## Acquisition: purchase, finance, or lease

The guild may **purchase, finance, or lease** property. Financing uses [System E's loan and collateral rules](system-e-finances.md). Leasing gives lower-level guilds a lower-upfront-cost option, with recurring rent and restrictions on modifications or expansion. **F-007**

| Method | Ownership and costs | Development boundary |
| --- | --- | --- |
| Purchase | Guild ownership, purchase price, and ongoing overhead. | Subject to the property's slots, location, and expansion cap. |
| Finance | Guild ownership subject to the lender's claim; loan payments plus overhead. | Property constraints still apply; collateral can be repossessed through debt enforcement. |
| Lease | Landlord ownership; rent plus applicable overhead, without resale equity in the property. | Slot-based facilities and location traits still apply, but lease terms limit modifications and expansion. |

Specific prices, rents, deposits, lease lengths, approval requirements, termination terms, and financial modifiers remain deferred. Leasing does not imply a right to sell the landlord's property. **D-024**

## Stable values, sales, and conversion

Property values remain **relatively stable**, with changes driven by improvements, major events, or GM decisions. There is no simulated monthly real-estate market. Properties can be sold or converted; procedures and exact valuations remain deferred. **F-008**

The accepted property-acquisition discussion supports accounting for purchase price, current resale value, and secured debt: sale proceeds are reduced by outstanding secured debt and applicable transaction costs. Improvements and location can affect value; no guaranteed appreciation or percentage recovery is established. **F-008 / D-024**

## Upgrade relocation traits

**Transferable** and **Permanent** are traits on **upgrades**, determining whether the improvement can move to another property. **F-009**

| Trait | Relocation meaning |
| --- | --- |
| Transferable | The upgrade can be relocated to another property. |
| Permanent | The upgrade stays with the property rather than being moved as that improvement. |

The trait belongs to the upgrade, not automatically to its entire facility category or property type. Relocation cost, time, destination requirements, and treatment when selling, converting, or ending a lease remain deferred. **D-025**

## Provisional: property damage and repairs

The source assistant proposed damage from attacks, accidents, or campaign events, with repairs costing credits and potentially construction time. The user's next reply expressly confirms the relocation traits, but does not expressly finalize damage/repair rules. **This concept remains provisional.** **P-005**

No damage track, attack procedure, loss of facility benefits, repair cost/time, or interaction with project capacity is approved. These should be decided before numerical balancing of repairs. **D-026**

## Deferred design and balancing

- **Properties and facilities:** starting property, slot counts/sizes, facility catalog and effects, location traits, expansion caps and costs, conversion requirements. **D-022**
- **Construction:** durations, costs, level-based simultaneous-project limits, management capacity, qualifications, fees/salaries, interruptions, and effects of suspending duties. **D-023**
- **Transactions:** purchase/resale values, financing terms, lease restrictions/terms, and sale/conversion procedure. **D-024**
- **Relocation:** which upgrades carry each trait, move costs/time, and destination or lease constraints. **D-025**
- **Damage/repair:** whether to adopt the provisional framework and, if accepted, its mechanics and values. **P-005 / D-026**

This update records tabletop design only; Foundry coding remains deferred.

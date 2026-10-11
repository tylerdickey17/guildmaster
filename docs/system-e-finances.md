# System E: Finances

Status: confirmed framework, October 10, 2026; numerical balancing and detailed procedures remain deferred. See the [decision log](design-decisions.md) for evidence and the [README](../README.md) for status definitions.

## Guild treasury

The guild maintains a **separate treasury** from PC personal funds. PCs may withdraw money **without a withdrawal restriction**. Taking funds has financial consequences: the treasury still has to meet salaries, overhead, debt, and other obligations. No mandatory reserve or withdrawal cap is established. **E-001**

## Income and recurring expenses

**Contract pay arrives on completion. Officer salaries and overhead recur monthly**, during the monthly Guild Turn. A month without a completed contract can therefore still bring expenses. **E-002**

| Item | Confirmed treatment |
| --- | --- |
| Contract income | Paid on completion. Partial, failed, or interrupted contract treatment remains unresolved. |
| Salaried officers | Recurring monthly salary. This does not settle ordinary deployed mercenaries' payment basis or timing. |
| Overhead | Recurring monthly expense based on the guild's assets, with upgrade effects. |
| Property taxes and similar routine property charges | Abstracted into overhead, rather than separate detailed tax accounting. |
| Leased property | Rent plus applicable overhead; see System F. |
| Financing | Amortizing loan payments under each loan's terms; exact schedules and rates remain deferred. |

**Overhead is asset-based**, and upgrades can affect it. The asset cost schedule, upgrade modifiers, and detailed inclusions remain to be balanced. Property taxes are expressly included in this abstraction. **E-003 / D-019**

System B's existing model remains **company profit = contract payout − squad pay − overhead**. This describes financial return; it does not impose an additional overhead payment every time a contract finishes. Monthly overhead must be accounted for once. How to allocate it across contracts for profitability reporting is deferred, as is the fuller presentation of salaries, interest, and other costs alongside that model. **B-006 / D-019**

## Borrowing and collateral

The guild may carry **multiple loans**, including **secured and unsecured amortizing loans**. Amortizing payments pay down the debt over its term. Borrowing availability and terms depend on **Guild Level, reputation, and existing debt**. No single-loan limit, fixed debt ceiling, interest rate, or repayment formula is established. **E-004**

Secured loans identify collateral. Failure to meet obligations can lead to **repossession of that collateral**. Unsecured loans have no pledged collateral; their exact enforcement consequences remain to be designed. Property financing in System F uses this debt framework. **E-005**

Reputation loss can constrain new borrowing opportunities, but does not itself remove existing assets. Repossession follows debt enforcement, not an automatic reputation-tier check. Multiple loans need individual balances and terms, but detailed bookkeeping and any implementation remain deferred. **SD-005 / D-020**

## Financial distress

Financial distress has three named stages, in order. **E-006**

| Stage | Framework meaning |
| --- | --- |
| Delinquent | Missed obligations place the guild in financial trouble. |
| Default | Escalated failure to meet obligations can bring creditor enforcement, including collateral/repossession. |
| Insolvent | The guild cannot sustain its obligations and faces restructuring, bankruptcy, or another campaign response. |

These descriptions distinguish the stages; they do not set automatic triggers, grace periods, penalties, or legal procedures. Those details and recovery between stages remain deferred. **Bankruptcy is not automatic game over**; it can change the guild's circumstances while play continues. No automatic debt forgiveness or guaranteed asset retention is established. **E-007 / D-021**

## Deferred design and balancing

- **Treasury and pay:** starting funds, withdrawal bookkeeping, contract amounts, ordinary squad payment terms, and incomplete-contract treatment. **D-002 / D-018**
- **Recurring expenses:** salary scales, overhead values by asset, upgrade effects, and accounting/allocation procedures. **D-019**
- **Loans:** eligibility thresholds, rates, terms, payment cadence and amortization calculations, existing-debt effects, collateral valuation, and repossession procedure. **D-020**
- **Distress:** stage triggers, escalation timing, penalties, creditor remedies, recovery, and bankruptcy outcomes. **D-021**

This is a game-economy framework, not a real-world financial model. No Foundry implementation is included.

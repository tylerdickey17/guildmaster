# Personnel employment: Free Agents and Retained Operatives

> **October12 implementation:** [Live-play0.3.4](prototype-values-v0.3.4.md) now implements the specified Upkeep, property, staffing and employment subset. The offline/candidate wording below is retained as October11 history; read the live patch for actual rates, defaults and remaining exceptions.

Accepted design checkpoint, October11,2026 (America/Chicago). Source: the current design conversation following the0.3.3 browser playtest. This records agreed tabletop rules; it is **not yet implemented in the browser demo**. It supplements the [0.3.3 prototype](prototype-values-v0.3.3.md), [System A](system-a-personnel.md) and [System E](system-e-finances.md). Conflicting older assumptions about ordinary mercenary pay or nonexclusive rival work are superseded in this scope.

## Employment models

| Rule | Free Agents | Retained Operatives |
| --- | --- | --- |
| Recruitment access | Available as a worker category at every Reputation tier; no category-level Loyalty gate | Higher Reputation unlocks recruitment access |
| Agreement | Nonexclusive; work for whoever pays them | Exclusive employment while the retainer agreement is maintained |
| Recurring personnel overhead | No retainer | Monthly retainer, including idle months |
| Assignment compensation | Full quoted assignment rate | Reduced assignment rate, in addition to the retainer |
| Rival work | Can take other employers' work through the established visible event framework | Cannot accept rival work while retained under a maintained exclusive agreement |
| Loyalty | Important to continued preference for the guild and rival-offer decisions | Still matters for morale and willingness to renew; Reputation does not guarantee loyalty |

Employment type is separate from availability status. A retained operative can be Deployed, Training, Recovering, Missing or Captured; exclusivity does not bypass those commitments or guarantee immediate deployment. Access to the Free Agent market does not mean an individual ignores existing commitments, notice or willingness to accept particular work.

A mixed roster is supported: retained personnel provide a dependable core, while free agents supply flexible capacity without recurring retainers. Exact rates and recruitment thresholds remain balancing work.

## Two payment phases

The user explicitly distinguished these payment clocks:

| Payment | Resolution | Basis |
| --- | --- | --- |
| Retainer | **Upkeep, at the start of every Guild Turn** | Personnel overhead for maintaining the exclusive agreement, whether deployed or idle |
| Contract pay | **Events, when the assigned contract resolves** | Compensation for the actual mission, under its frozen assignment quote |

Retained Operatives receive both payments. Free Agents receive assignment pay only. The guild must fund retained staffing before learning whether the current turn's missions succeed. Current-turn Events receipts cannot be used retroactively to claim that an earlier Upkeep payment was made.

Ordinary funded retainer payment keeps Loyalty steady: it fulfills the agreement. A missed retainer is a visible unpaid obligation and employment problem, not a successful payment or automatic switch to free-agent status. The exact delinquency, Loyalty and termination sequence still needs rules.

The failed-contract pay choice applies **only to assignment compensation**:

| Funded assignment wages after failure | Loyalty change per participating operative |
| --- | ---: |
| Full quoted amount | +5 |
| Half quoted amount | 0 |
| None | −5 |

For Retained Operatives, use their reduced assignment quote as the full/half basis. Their separate retainer remains owed. Failed jobs award participation XP but no client payout or completion XP, and still apply the card's Reputation loss. Paying workers does not erase that public loss.

## Open balancing and integration details

- Monthly retainer by operative level and the reduced assignment-pay rate. Do not invent numbers from the accepted distinction alone.
- Exact Reputation gate and subsequent access tiers. **Friendly** is the working recommendation, not a locked threshold.
- First retainer payment for a worker hired during Activity: upfront charge, next-Upkeep start, any proration, and interaction with existing onboarding and hiring fees.
- Missed-retainer notices, cure window, Loyalty effect, termination and when exclusivity ends. Reconcile with existing per-obligation financial distress rather than creating silent rival deployment.
- Conversion between Free Agent and Retained Operative, agreement renewal and release rules.
- Exact combined pay for retained officers and support staff. The later [officer/staffing draft](officers-and-staffing.md) adopts one employment agreement covering retained and officer duties, avoiding an automatic second full salary. Rates and separately priced duties remain to be authored. Starting PC officers remain unpaid fixtures.
- How Reputation changes affect existing agreements versus access to new candidates. A recruitment gate alone does not establish automatic contract termination.

## Implementation boundary

Browser0.3.3 has one ordinary assignment-pay model and no employment-type or retainer system. Next implementation should show worker type and both pay amounts before hiring/deployment, settle retainers once in Upkeep, and settle actual assignment wages in Events. Full location/asset overhead still needs a playable treatment alongside these costs. The proposed Foundry implementation should preserve the same phase and obligation distinctions; no module code or compatibility claim is added by this checkpoint.

## Later officer and staffing checkpoint

The accepted [officer/staffing working draft](officers-and-staffing.md) adds Personnel Officer signature **Negotiate Retention** as a proposed conversion procedure, without finalizing its prices, access gate or four-degree outcomes. Support assignments and offices are separate from employment type and availability. Retained officers use one agreement covering both duties; salaries and retainers are Upkeep overhead. Role changes use **Reorganize Command**, one shared action during Activity, once per turn. These additions remain unimplemented in browser 0.3.3.

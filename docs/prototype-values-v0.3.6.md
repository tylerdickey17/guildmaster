# Prototype 0.3.6: paced development and loans

October 12, 2026. This supersedes 0.3.5 only where specified; its contract tiers, Events resolution, wages, payout factors, complications, employment rates and base/facility prices remain unchanged.

## Authority and scope

The user explicitly accepted Level 2/4 expansion staging, requested Guild Feats at 3 and every odd level thereafter, even-level guild features, and loans at 2 with secured finance at 4. Exact interest, underwriting and later capacity defaults are designer-selected prototypes, using the prior finance framework. Official character treasure tables inform the accompanying compensation discussion; they do not establish NPC salaries or guild property/loan prices.

Normal Level 1 still pays **600**, ordinary Free Agent assignment pay **50**, and the steady staffed starter bills **365**. Neither 900 nor increased wages has been implemented.

## Progression

| Guild level | Development feature | Guild Feat entitlement |
|---|---|---|
| 1 | Initial operation, shared action pool, recruiting, basic/trained actions and ordinary training | None |
| 2 | New facility installations; unsecured financing | None |
| 3 | Existing development access | First |
| 4 | New owned bases/outposts; secured financing; two concurrent projects | None |
| 5 | Existing development access | Second |
| 6 | Three concurrent projects | None |
| 7 | Existing development access | Third |
| 8 | Four concurrent projects | None |
| 9 | Existing development access | Fourth |
| 10 | Five concurrent projects | None |

Shared actions remain PCs + Guild Level − 1. Capacity and action reset happen at the next Activity; the intervening Upkeep prepares bills and completions. New construction is gated, not repairing an existing installation or funding its services. The landlord-owned starter Training Suite remains available at Level 1. Existing facilities and projects survive migration.

Trusted Client/Recruitment Pipeline now require 3, Training Cadre/Well Provisioned 5, Standing Agreement 7. Older awards/choices remain, counting as an advance against the next odd-level entitlement to avoid a duplicate award. No award is revoked.

**Developing guild** is a new artificial Level 2 preset: 2,000 cash, four Level 1 operatives, empty leased HQ. Expansion remains Level 4 with 8,000 and Level 3 operatives. Neither fixture fabricates client income or establishes startup affordability.

## Finance terms

| Term | Unsecured | Secured |
|---|---|---|
| Guild level | 2 | 4 |
| Monthly interest | 2% outstanding principal, rounded up | 1%, rounded up |
| Term | 12 Guild Turns | 12 Guild Turns |
| Principal limit | Aggregate remaining unsecured principal ≤ 1,000 × Guild Level | 70% catalog price of one operational owned base |
| Security | None | Unique property pledge; leased/pending bases ineligible |

Secure Financing costs one shared action, no application roll or fee. Principal arrives immediately as **financing**, not earned revenue or Guild XP. First bill is next Upkeep. Amounts are whole hundreds, at least 100.

Approval requires nonnegative Reputation, no unpaid arrears, and combined next loan installments at most **30%** of average actual client receipts over up to three completed turns. Zero-income turns count; no completed history means zero capacity. Borrowing, capital injections and forecast contracts do not count as client receipts. Aggregate service and principal caps prevent repeated applications bypassing limits.

Every installment separates principal and interest. Regular principal is ceiling(original amount / 12), capped at unbilled outstanding principal; the final scheduled boundary bills remaining unbilled principal. Interest is charged each boundary on actual outstanding principal. Partial payments cover interest first. Principal already in an arrear is excluded from new principal invoices, preventing duplicate debt. Unpaid interest remains a separate arrear and does not itself compound.

Routine Activity principal prepayment costs no action or penalty, requires that agreement's arrears to be cured, and lowers future interest. Routine arrears payments and selected Upkeep payments also reduce actual loan principal correctly. Repayment cannot spend more than available cash or outstanding principal.

First missed installment: **Delinquent**. If uncured at the next boundary: **Default**. The invoice and loan table show the balance/status. Cure restores Current once no creditor arrears remain, or Paid when principal and arrears are cleared. New financing is blocked by unpaid arrears. A defaulted pledged property cannot be used in HQ relocation.

**Explicit prototype limit:** collateral is pledged and deficiency/interest remain owed; there is no automatic repossession, property sale, forced bankruptcy or negotiated restructuring engine. Those remedies require GM adjudication. This preserves rather than silently forgives debt.

## Verification and publication

69 checks passed, including 48 campaigns × 6 intervals (288 intervals), loan caps, all 12 installments, interest/principal splits, partial payments, arrears cure, unique collateral, prepayment, migration and minimal DOM finance interaction. Browser visual QA was unavailable; no live-browser rendering claim is made.

[Source](../prototypes/browser-playtest/README.md) · [Frozen values](../playtests/prototype-0.3.6/values.json) · [Verification](../playtests/prototype-0.3.6/verification.json) · [Opening comparison](../playtests/prototype-0.3.6/opening-balance.json) · [Compensation design](startup-compensation-discussion.md).

Live: https://contract-operations-playtest.primeangel2.chatgpt.site

- Site source: `544747ef10eeb86cd43949451b731ec91bbb4c73`
- Deployment: `appgdep_6acd13258e6081919c3169a964b297a6`, succeeded
- Version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_c59f453452e88191a240eff4cc80efe3`

Future work: calibrate paired payout/compensation curves, test multi-squad growth and training investment, implement office-specific actions/Reorganize Command, expand creditor remedies and scenario content. No Foundry module yet.

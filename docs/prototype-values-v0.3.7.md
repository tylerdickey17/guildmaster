# Prototype 0.3.7: approved paired compensation test

October 12, 2026. The user explicitly approved testing the proposed **900-credit Normal Level 1 payout with 110 credits per operative**, and requested updating the live site. This supersedes the 0.3.6 discussion-only boundary for these two values. Other 0.3.6 rules remain.

## Executable economy

| Level 1 term | Credits |
|---|---:|
| Normal payout, recommended squad | 900 |
| Free Agent assignment pay, each | 110 |
| Four Free Agent wages | 440 |
| Hiring fee, either employment type | 220 |
| Retained assignment pay, each | 90 |
| Retained monthly retainer, each | 55 |
| Starter treasury | 2,000 |
| First staffed invoice | 350 |
| Later staffed base + suite upkeep | 365 |
| Normal critical Engagement failure repair | 55 |

A clean Normal completion leaves **95** after four wages and 365 overhead, before other spending. Failed-job full/half/none costs 440/220/0 for four Free Agents and changes Loyalty +5/0/−5; public Reputation loss remains separate. NPC XP and Guild XP are unchanged.

**Designer-selected continuation:** retain existing 1.25 growth and five-credit wage rounding rather than adopting a complete new treasure-table curve. Ordinary wage at level L = nearest five of 110 × 1.25^(L−1). Normal payout at mission level L = round(900 × ordinary wage(L) / 110). Existing tier factors and squad discounts then apply. Level 2 ordinary wage is140, Normal payout1145; Level 3 wage170, Normal1391.

Client payout is explicitly separated from the old 12-times-wage formula so raising pay does not inadvertently make the Level 1 payout1320. Board, card details and deployment quotes use one shared calculation. Tier factors remain Easy .75, Normal1, Hard2.4, Expert3.5, Legendary5, Exclusive3. Level 1 base payouts are675/900/2160/3150/4500/2700.

Hiring remains twice ordinary wage; retained assignment80% and retainer50% round upward to five. Wage-based repair expenses use the new baseline. Facility staff/chief salaries, training fees, property costs, interest and development gates remain fixed at their prior values. All-income gear/self-equipment interpretation remains the design benchmark, not an official NPC salary or a second equipment grant.

## Saves and test procedure

Refresh the site to load0.3.7. For a clean startup comparison, use **New playtest → Staffed starter** (export old notes first). Existing saves can continue.

Deployed jobs retain original payout/wages, check values and outcomes. Their legacy repair wage basis is frozen separately, without changing old quote objects. Prepared or paid Upkeep invoices are preserved; newly created quotes and subsequent invoices use the new pay baseline. Existing treasury, loans, arrears, personnel, advancement and projects are not reset.

The historical600/50 comparison remains available in the arithmetic report. Browser A/B acquisition settings still concern the contract action cost; this patch does not add a wage-toggle UI.

## Evidence and limits

71 checks pass, including 48 campaigns ×6 intervals (288 intervals), financial obligations and loan accounting, correct board/card/deployment prices, approved employment rates and settlement of an actual saved0.3.6 mission under its old economics.

Exact8,000 opening Dock Nine roll combinations produce completion probability80.6875%, mean repair2.75, Missing risk5%, and **expected monthly net−39.075** with one contract, four Level1 Free Agents, staffed365 overhead and half failed pay. Training, recruitment, replacement, future personnel loss, multiple squads, loans, expansion and growth are excluded. These are bounded arithmetic and regression evidence, not a claim that the whole economy is balanced.

Full browser visual QA remains unavailable; engine and minimal DOM checks passed.

[Values](../playtests/prototype-0.3.7/values.json) · [Verification](../playtests/prototype-0.3.7/verification.json) · [Arithmetic](../playtests/prototype-0.3.7/opening-balance.json) · [Source](../prototypes/browser-playtest/README.md) · [Prior progression/finance rules](prototype-values-v0.3.6.md) · [Compensation reasoning](startup-compensation-discussion.md).

Live: https://contract-operations-playtest.primeangel2.chatgpt.site

- Source commit: `5ed913afab7932e795a710bd282e8e89a87198dd`
- Deployment: `appgdep_6acd15d73844819181e06ff4b51d4cd3`, succeeded
- Version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_9733b8ed89a08191aee519e75b8042dc`

Next human test: compare startup reserves, failed-pay choices, recruitment/training spending and Level2 development affordability against prior600/50 runs. Refine the higher-level pay/payout curve from observed results.

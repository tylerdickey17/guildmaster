# Session checkpoint: October12,2026

> **Latest live update:** [0.3.6](prototype-values-v0.3.6.md) implements level-gated development/loans and odd-level feats. Prior deployments below are history. Payout and wage comparisons remain discussion only.

The execution workspace is restored. The user explicitly requested putting the agreed Upkeep/base changes on the live site; they have now been implemented and published.

- Live URL: https://contract-operations-playtest.primeangel2.chatgpt.site
- Prototype: **0.3.4**.
- Site source commit: `4e0f4e25e1f77a0ea694369f4baa33e355609b89`.
- Native deployment: `appgdep_6accfbeca2a08191b53b72e5016e26bd`, **succeeded**.
- Saved version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_0296a45847ac8191b7a4b0d1e7e578bd`.
- [Executable source/tests](../prototypes/browser-playtest/README.md), [rules](prototype-values-v0.3.4.md), [values](../playtests/prototype-0.3.4/values.json), [verification](../playtests/prototype-0.3.4/verification.json).

## Completed

Visible first/current Upkeep invoice, selected bill payment and recorded shortfalls;300-credit station base; Staffed/Lean/Expansion presets; three turnkey owned-base offers; separate outpost-chief hiring/pay; four local staffed expansions; explicit staff versus asset billing clocks; no repeat funded-manager charge; facility service renewal; local roster/board and communications access; crew/HQ transfers, slot reservations and lease overlap; retained recruitment with Upkeep retainers and frozen Events assignment wages.

Preserved: exactly three phase checks, support and circumstance rules, Events receipts before wages, failed-pay Loyalty +5/0/−5, recovery floors, shared party-size pool, end-turn advancement and actual old-save outcomes.

The full officer/signature draft is not implemented. Starting PC portfolios and general trained-action access remain as before; Reorganize Command, specialist progression and PC support-staff appointments remain queued. No Foundry code.

## Validation

44 checks pass, plus48 deterministic campaigns over288 monthly intervals. The minimal DOM smoke covers invoice review, settings, purchase/appointment and local selection. Old-save fixtures come from actual0.3.3 Site source. Native hosting reports success.

Real browser/visual QA was unavailable because control-browser was not exposed. No preview server, alternative browser path or fabricated screenshot was used. These checks support implementation correctness, not final economy balance.

## Follow-up

Collect human feedback with preset, seed, turn and exported decisions. In particular, assess300/month against successful/failed assignment income, instructor payroll versus trainer fees, outpost chief cost, ownership/lease overlap and cash after major purchases. Differentiate expansion-fixture results from startup affordability.

Next design/implementation areas: full office signatures/restructuring; final missed-retainer/termination and creditor consequences; PC staffing; sales/financing; richer location/event content; and an explicitly scoped Foundry foundation when requested. Preserve the larger accepted design in officers-and-staffing.md while reporting actual executable coverage.

## Later playtest feedback: version0.3.5

The user requested five risk bands using published SF2e/PF2e mission-level DCs, distinct NPC phase leads, visible administrative results and a visible third phase. They also reported expansion debt and explicitly wanted discussion before adding financial locks.

Implemented and published [0.3.5](prototype-values-v0.3.5.md): Easy1/3−2, Normal2/3+0, Hard2/3+2, Expert2/3+5, Legendary3/3+5; explicit phase skill requirements; new minimum crew3; complication triggers by risk; referrals/contact rewards; persistent result panels and phase continuation. Deployed old jobs retain their snapshots and rolled outcomes.

Native deployment **appgdep_6acd0bd8239481919a399a5d544f3edc succeeded**, Site source **e194b6eed5586f585f406342656b9b30ebfb4759**, same private URL.56 checks and288 smoke intervals pass, with the unchanged real-browser QA limit.

[Financial discussion](expansion-balance-discussion.md) proposes900 Normal payout, Guild Level2/4 construction/property gates and a three-month reserve warning. **None is implemented or adopted.** The exact one-contract calculation diagnoses approximately63 credits/month expected loss at the current600 payout/365 staffed upkeep, excluding other spending and future roster consequences.

## Latest 0.3.6 handoff

- Live: https://contract-operations-playtest.primeangel2.chatgpt.site
- Site source: `544747ef10eeb86cd43949451b731ec91bbb4c73`
- Deployment: `appgdep_6acd13258e6081919c3169a964b297a6`, succeeded
- Version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_c59f453452e88191a240eff4cc80efe3`
- GitHub mirror includes current source, tests, frozen values and comparison output; see this checkpoint's containing commit for the repository revision.

Implemented installations/unsecured loans at Guild Level 2; property/outposts/secured loans at 4; feats 3/5/7/9; project capacities 2/3/4/5 at 4/6/8/10. Existing starting services/projects/feat awards remain valid, with early feat entitlement offsets. Developing Level 2 preset has 2,000 cash, no upgrades or fake client income.

Loans use 12 principal installments with declining 2%/1% interest, actual-income underwriting (combined service ≤30% of up-to-three completed-turn average client receipts), principal/collateral caps, one shared financing action, free routine prepayment, interest-first payments and creditor arrears. No duplicate unpaid principal, hidden cash, borrowing-as-revenue, automatic seizure or debt forgiveness. Default blocks further finance and relocation involving pledged property; remedy remains GM adjudication.

69 checks and 288 smoke intervals passed; browser visual QA unavailable. [Verification](../playtests/prototype-0.3.6/verification.json), [values](../playtests/prototype-0.3.6/values.json), [exact opening comparison](../playtests/prototype-0.3.6/opening-balance.json).

**Preserve discussion boundary:** Normal600 and Level1 Free Agent50 remain live. User's startup-loss preference supersedes treating all early deficit as inherently wrong. Use earned treasure by level for XP-based compensation; new-character wealth is a cross-check. Recommended paired experiment is 600/50 versus900/110, not900 alone. At250NPC XP, full Level1 treasure-value benchmark is109.375/person. It includes equipment; do not double-pay kit. Current expected monthly one-contract net−62.81; paired900/110−39.08, excluding replacement/training/growth.

Next: adopt/test paired pay/payout curves, refine equipment funding, model two-squad growth and affordable management, then office-specific actions/Reorganize Command, creditor content and Foundry. No new human-playtest or Foundry compatibility result is claimed.

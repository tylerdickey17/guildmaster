# Guildmaster 0.3.9 property, development XP, and feat audit

Frozen source: `7c1b338b9b9b46f75b0296a660bd5aa08b857a0b`. Reproduce from the study directory with `node runs/property_xp/audit.cjs`. Detailed checks and monthly traces are in `results.json`.

Twelve executable checks passed. This is a targeted API audit, not a population estimate of startup progression. Tests use the authored Expansion fixture unless otherwise labeled. The sole startup test starts from Staffed/2000 credits. The one 100000-credit fixture and three Level-7 feat fixtures explicitly edit initial fixture setup; all subsequent actions use public APIs. No tests predict unseen dice, refresh Hero Points, edit mission results, or change frozen source.

## Findings

| Finding | Evidence | Assessment |
|---|---|---|
| One-time property awards are per purchased property, not per guild | Two newly bought HQs earn600 total; returning to the first earns0. Two newly staffed outposts earn600 total; following payroll earns0. | Same-asset duplicate protection works. Unlimited distinct-property awards remain a balance decision. |
| Every completed installation earns200 | Recruitment Office500 + Training Suite600 grant400 total, including when staff is paused before paying activation upkeep. | Per-asset repeat awards work as coded. Award does not require funded operation. |
| Capital can directly buy progression | Synthetic Level4/100000 credits reaches Level10 at end of month11 with6600 earned development XP,46000 cash remaining,0 client receipts,0 arrears. | Capital-to-XP channel is substantial. This is NOT a legal startup speedrun or claim that100000 is readily attainable. |
| Standing Agreement acquisition is order-sensitive | Trusted ordinary job first, then generated Standing card:2 jobs for0 actions. Standing first, then Trusted: second waiver rejected. Saving the generated Standing card across one boundary allows two free Standing cards in the next turn. | Concrete feat replacement bug; text says Standing replaces Trusted. |
| Recruitment Pipeline has functioning limits | Fixed seeds1–100:65 first searches use Pipeline,35 critically fail;0 candidates exceed cap9. After a qualifying first use, second search gets no Pipeline upgrade. | No cap or multi-use loophole found. |
| Promotion does not award Guild XP | Four promotion actions cost200 and grant10 Reputation for seed7, but0 Guild XP. | Excess actions affect Reputation more than direct leveling. Other administrative actions likewise have no direct XP award in source. |
| Secured lending is not an immediate money multiplier |3000 HQ collateral permits2100 loan; first payment196. Repeat collateral rejected; combined service exceeding417 rejected after1391 recorded client receipts. | Debt/proceeds need repayment. No collateral repledge or negative-equity cash creation loop found. |

## Development capital trace

The synthetic capital run begins at Guild Level4 with100000 cash. Month1 buys a3000 Mobile Field HQ. Every following month relocates to the previously acquired HQ for100, commissions a500 Recruitment Office and600 Training Suite there, then buys the following month's HQ. Projects finish at the next boundary. Completed one-turn projects never block the next relocation, and new slots remain available at each new HQ. New HQs award300 on relocation, completed installations award400 the following month; steady-state progression is700 XP/month. No contracts, loans, or Hero Point rerolls are used.

| Completed month | Guild Level after advancement | Guild XP remainder | Liquid funds |
|---:|---:|---:|---:|
|1|4|0|96700|
|2|4|300|92125|
|3|5|0|87700|
|4|5|700|83100|
|5|6|400|78325|
|6|7|100|73375|
|7|7|800|68250|
|8|8|500|62950|
|9|9|200|57475|
|10|9|900|51825|
|11|10|600|46000|

The cash ledger and action budget are asserted at every recorded Activity snapshot.11 properties are purchased;10 receive their milestone,18 installations finish and20 are commissioned. The guild spends54000 including all property, relocation, construction, staffing and maintenance payments.

## Recommendations

1. Fix Standing/Trusted to share one explicit free-acquisition allowance, with order-independent validation. A generated free card should consume that same allowance. Older unused standing cards should not bypass the next turn's allowance either.
2. Replace repeatable per-property milestoneXP with guild-level development categories: first owned HQ, first staffed outpost, first funded operational installation of each type. Keep subsequent expansions useful through revenue/capacity/operational benefits rather than identicalXP awards. Existing earnedXP should remain intact.
3. Require funded operation for development milestones, rather than awarding fullXP to an installation whose staff is immediately paused. This is a balance choice, not a current bookkeeping bug.
4. Give already-mastered categories diminishing returns or a bounded developmentXP budget if repeatedXP is desired. Avoid a blanket calendar gate that makes successful growth feel inert.
5. Also audit overlevel mission farming. Contract Guild XP is fixed by difficulty band and never reduced for low mission level or overleveled crews. Cash has an overlevel penalty; progression does not. That can dominate a speedrun even after property milestones are corrected.
6. For a60-month target,9000 totalXP implies150 earnedXP/month on average. One Normal completion already awards250, Hard400, Expert600 and Legendary900 before development rewards or additional squads. Multi-action projects alone cannot solve this pacing mismatch: they reduce action spam but do not necessarily reduce earnedXP. Calibrate level thresholds against representative squad throughput after closing loopholes.

## Relocation regression: lost operatives return without rescue

A fixed seeds1–100 cohort starts from the unedited Level-4 Expansion fixture, purchases one Mobile Field HQ, secures and deploys the authored Hard contract, resolves real phase dice, pays half on failure, and waits for actual recovery obligations to finish. No Hero Points or dice/status edits are used in this cohort.41 of100 runs suffer an Extraction complication leaving one operative Missing. All41 of those operatives are restored through ordinary HQ relocation:

| Step | Seed4 example | Operative m1 status | Home base |
|---|---|---|---|
|Mission settlement / next Upkeep|Turn2|Missing|Leased HQ|
|Relocate Operations,100 credits and1 action|Turn2|In Transit|Owned HQ b11|
|Following Upkeep|Turn3|Available|Owned HQ b11|

This is an accidental rescue from a legal mission sequence, not an intended Transfer Personnel effect. Relocation iterates every local operative except Candidate/Expired/Inactive, overwrites status with In Transit and supplies a normal arrival clock. Advance then converts that status to Available. The normal personnel-transfer action instead requires Available personnel and rejects Missing.

A second explicitly synthetic status fixture checks Missing, Captured and Dead simultaneously: normal Transfer Personnel rejects all three; relocation changes all three to In Transit; next Upkeep restores all three to Available. Captured and Dead require labeled synthetic setup because the current ordinary mission generator does not produce those statuses. Their regression is consequently a lifecycle bug demonstration, not a claim that ordinary missions kill/revive workers today.

**Recommended fix:** restrict the relocation passenger set to physically present, eligible operatives, while preserving Missing/Captured/Dead status and historical assignment/base information. Existing checks already block current Deployed/Recovering/Onboarding/In Transit commitments. Ordinary relocation must not implicitly resolve rescue, captivity or death.

This bug invalidates recovery/rescue balance conclusions in any campaign policy that repeatedly relocates HQs, unless those runs are separately labeled or corrected and rerun. The natural cohort has100 attempted runs,41 affected runs, and no unreported run failures. Full trace is in `results.json` under `naturalMissingRelocation`.

## Limitations

No global minimum speed was proved. The100000-credit fixture isolates development conversion; it does not establish how quickly such capital can be earned. The finance fixture demonstrates one seeded valid purchase/mission/loan sequence, not every debt scenario. PC administrative skill+10 never advances in this prototype, which limits discovery quality at high search levels; this report does not diagnose whether that broader progression is intended.

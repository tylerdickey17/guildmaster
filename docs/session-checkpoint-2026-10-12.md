> **Current Foundry alpha0.1.0-alpha.3:** [Guided-turn handoff](foundry-guided-turn-alpha.3.md). Fixes pending Hero Point flag retention and adds Start/Resume guide, GM All Officers/individual previews, owned-PC action approvals, founding workflow gates, Quartermaster squad assembly, one-action Reorganize Command and Journal button.49 integration checks; actual alpha3 world/visual/multiplayer verification pending. Existing alpha2 owner feedback is positive apart from the reported lockup/turn UX. Browser live0.3.11 remains unchanged.

> **Manifest is now usable:** canonical repo `tylerdickey17/guildmaster` is public. Alpha0.1.0-alpha.2 manifest and ZIP were fetched anonymously with200 responses and the ZIP SHA256 matched. [Manifest](https://raw.githubusercontent.com/tylerdickey17/guildmaster/main/foundry/guildmaster/module.json). Actual Foundry loading/UI/multiplayer remains unverified. This supersedes earlier public-access-pending notes.

> **Manifest handoff:** alpha0.1.0-alpha.2 prepares stable GitHub manifest/versioned ZIP URLs. Owner authorizes public repo visibility; connected tools cannot change it. Public access still needs verification. [Install guide](../foundry/guildmaster/README.md). No new Site or browser deployment.

> **October13 Foundry handoff:** [0.1.0-alpha.1](foundry-alpha-0.1.0.md) is the first implemented module, targeting owner-confirmed Foundry14.369 / SF2e1.6.1.28 mocked integration checks pass; real-world loading, UI and multiplayer verification are pending. [Install/source](../foundry/guildmaster/README.md). Browser live rules remain0.3.11; capacity6/9/12/15 is implemented in the module copy only. Older “no Foundry code” statements below are historical. Guild Archetypes, expanded feats, morality and Heat remain explicitly future scope.

> **Current live rules:0.3.11.** [Content handoff](prototype-values-v0.3.11.md) supersedes historical live-version statements below.

> **Current live rules:0.3.10.** [Latest handoff](prototype-values-v0.3.10.md) supersedes historical live-version statements below.

> **Project name: Guildmaster**, renamed October12 at the user's request. The current playtest remains0.3.9; see the branding handoff at the end for the latest deployment.

# Session checkpoint: October12,2026

> **Latest live update:** [0.3.9](prototype-values-v0.3.9.md) replaces the extra required-phase gate, adds PC Hero Point mission rerolls, randomized three-option discovery and partial arrears payment.900/110 remains live.

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


## Latest0.3.7 handoff: paired values adopted

The user explicitly requested testing900 Level1 Normal payout and110 per operative by updating the live site. **These values are now live.** Preserve that adoption; do not revert to calling900/110 an unimplemented proposal.

- Live: https://contract-operations-playtest.primeangel2.chatgpt.site
- Site source: `5ed913afab7932e795a710bd282e8e89a87198dd`
- Deployment: `appgdep_6acd15d73844819181e06ff4b51d4cd3`, succeeded
- Version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_9733b8ed89a08191aee519e75b8042dc`
- Repository revision is this checkpoint's containing commit.

Level1 Free Agent wages110; four440; clean success900−440−365=95. Hiring220; retained assignment90 and retainer55; Normal critical Engagement repair55. Existing1.25 wage growth retained; client payout900×wage(mission level)/110 before tier factors/discounts. A full treasure-table wage progression is still pending. Fixed facility/chief/training/property costs remain, as do loan rules, development gates and odd-level feats.

Fresh browser setup uses new values. Refresh; New playtest → Staffed starter yields a clean comparison. Existing deployed jobs preserve payout/wages/checks/repair basis; prepared invoices and cash stay. Actual0.3.6 saved-job fixture tested.

71 checks and288 intervals passed; minimal DOM checks include matching board/card/deployment prices, and exact8000-opening-outcome arithmetic yields net−39.075/month under stated one-job assumptions. Full browser QA unavailable. [Rules](prototype-values-v0.3.7.md), [frozen evidence](../playtests/prototype-0.3.7/verification.json).

Next: human feedback on startup runway, paid failures, recruit/training choices and development affordability; then revise higher-level curves and officer features. No simulation subagents or Foundry work in this patch.


## Latest0.3.8 handoff

Reported issue: unnamed2-of-3 mission failed despite two successful phases. Reproduced Ghost Relay's existing Essential Engagement exception, not a count error on ordinary missions. **Confirm the actual mission name/outcomes with the user if needed.** Do not state definitively that the user played Ghost Relay.

All completion conditions now prominent on board/details/deployment/resolution. Results/failed-pay/log explain success count and any required phase failure. Shared engine outcome preserves existing semantics. All historical rolls, outcomes, cash, XP and Reputation remain; existing settlement is not replayed. No Essential rule removal or retroactive payout adjustment.

Live: https://contract-operations-playtest.primeangel2.chatgpt.site
Source: `b1f609ef261d650cc5d6db8e4a57a4e43a426f7d`
Deployment: `appgdep_6acd1846f5448191978b2f46479433da`, succeeded
Version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_9f7bdb2c353c8191bc9ea2c4e8950cdd`

74 checks, including24 ordinary2-of-3 outcome combinations, three Ghost Relay positions and UI explanations;288 campaign intervals. Browser visual QA unavailable. [Current rules](prototype-values-v0.3.8.md), [evidence](../playtests/prototype-0.3.8/verification.json).900/110, finance and progression unchanged.


## Latest0.3.9 handoff

User accepted Ghost Relay as the likely reported failure but disliked its extra condition. Also requested personal Hero Point rerolls, identified the debt recovery spiral and requested normally3 degree-weighted random leads/recruits.

Implemented count-only completion for new/unsettled missions; no Essential gate. Historical settled outcomes/cash preserved. One-point PC-funded pending-phase reroll, keep second, one/check; final complications/forward effects only. PC1 initial session, cap3, explicit GM awards/session reset, no monthly refill. Scope mission checks; administrative check review still future.

Network normally3 even on Failure; Critical Failure d20≤10:none,>10:one. Separate visible quality dice yield level (clamp1–min20,2guild+1), difficulty and rarity. Exact table rows in current rules/frozen values. Uncommon/Rare recruits add one moderate/high skill; contract rarity is currently an availability tag, without extra cash multiplier. Pipeline improves one candidate level once per turn; Recruitment Office upgrades one Common candidate on Success+. Hiring/onboarding/expiry remain.

Automatic Upkeep funds current bills before old arrears. Routine arrears modal allows a chosen payment and previews retaining next Upkeep plus deployed wage quotes. Creditor balances/loan interest/default persist. This improves choices, not guaranteed recovery or bankruptcy forgiveness.

85 checks,600 seeded discovery searches and288 campaign intervals pass; minimal DOM Hero/discovery checks and038 pending-save fixture included. Full browser QA unavailable. Prior one-job expected net−39.075 is the no-Hero-spending baseline, not a measured whole-patch result.

Live: https://contract-operations-playtest.primeangel2.chatgpt.site
Source: `f9455b0e1b44f503e3795ba3782054658dad8004`
Deployment: `appgdep_6acd1f01f7208191aea7fec4fc748212`, succeeded
Version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_e234e98cec308191a2bf70562380510e`

[Rules](prototype-values-v0.3.9.md), [evidence](../playtests/prototype-0.3.9/verification.json). Next: human feedback on tables, session/point cadence and cash recovery; rarity-specific rewards, administrative reroll review, restructuring and office/Foundry remain.


## Guildmaster branding handoff

User explicitly renamed Contract Operations to **Guildmaster**. Updated Site display title, visible header/GM lettermark, browser title/meta description, footer, note-export heading/download name and primary docs. Gameplay stays0.3.9; existing save key/schema, Site URL and GitHub repository path are retained.

- Live: https://contract-operations-playtest.primeangel2.chatgpt.site
- Title: Guildmaster — Guild Playtest
- Source: `7c1b338b9b9b46f75b0296a660bd5aa08b857a0b`
- Deployment: `appgdep_6acd401c2b0c8191b0e0d4764a11e1bf`, succeeded
- Version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_f390daff1ef08191b32f4ad6aaf6b93b`

Existing85 checks passed after the label changes. No new behavior tests needed; browser visual QA remains unavailable. Use Guildmaster as the project name going forward.


## Six-agent review handoff: progression and action pressure

[Full review](playtest-review-2026-10-12.md) and [reproduction bundle](../playtests/prototype-0.3.9-review/README.md) record the latest user feedback and authorized simulations. Live/source stay at the Guildmaster branding handoff above, rules 0.3.9; **no new Site deployment**.

- User: Level 6 in 16 months; two recovered deficits; financed base; economy feels balanced; wants stronger 2/3-action activities and about five years to Level 10. UX deferred to Foundry.
- Current optimized fastest **10 completed months**, seed 30, 31 completed jobs, cash 14,159, no arrears, four initial Hero Points. Independent exact replay passed. 378/384 optimized attempts reached by 90 months, 6 censored, 0 errors.
- Ordinary initial-Hero cohort: 63/64 reached by 120 months, 1 censored, median Level 6 16.5 months, Level 10 26. No HQ relocation in this cohort.
- 20,500-total-XP candidate has ordinary **static** projection 62 months. Actual isolated optimizer test reaches in median 21–24 months, fastest 18; **not** integrated five-year balance.
- Confirmed bugs: HQ relocation restores Missing (and synthetic Captured/Dead), Standing/Trusted free acquisition depends on order and old card age. Fix before using relocation-based rescue/economy conclusions. Corrected copied-engine Free-Agent growth rerun still median 27 months, all 64 reached.
- Design risks: repeated low-level full Guild XP, repeated new-property/facility XP, fixed +10 officer fixture against rising DC, surplus action spam, permanent Missing-person/recruit affordability dead ends.

Recommended next: focused bug fixes; explicit administrative benchmark; integrated pacing experiment with routine-work relevance and first-time operational milestones; two/three-action officer drafts and target attempt limits; rescue and retained-worker release/suspension. Keep 900/110 unchanged initially. All proposed changes remain draft, and prior earned cash/XP/outcomes should be preserved. No Foundry compatibility claim.



## Latest0.3.10 handoff: relative progression and multi-action activities

User adopted relative Guild challenge XP and discretionary exceptional-performance Hero Point guidance, then requested implementation. **Published and mirrored0.3.10**; [rules](prototype-values-v0.3.10.md), [evidence/scripts](../playtests/prototype-0.3.10/README.md).

- Live: https://contract-operations-playtest.primeangel2.chatgpt.site
- Source: `978f0c0b16fbf16aa5631732c5508b219727a4ff`
- Deployment: `appgdep_6acd5a8e74008191b7774b228c3a8a3e`, **succeeded**
- Version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_00528a98c5d08191b2f0511e435152db`

New deployments:Trivial0/Low60/Moderate80/Severe120/Extreme160 GuildXP;1,000XP per level. Mission−GuildLevel+complexity determines the custom rating; existing mechanical profiles/DCs/counts/cash/operativeXP stay. Deployed039 quotes retain oldXP. First funded HQ80/outpost80/facility-type30; repeated copies noXP. Existing/inherited categories are established with no retroactive awards.

Commander Sector Campaign2 actions; Operations Briefing2 (Survival orComputers) and Extraction Contingency3; Personnel Intensive Training2. Plan dialogs freeze assignment; repeat limits apply by work/target, no personal officer budget. TrainedPC administration uses explicit demoDC-growth modifier; Foundry should use actual actor skills. All-three-critical results display optionalGM one-PC Hero Point guidance; no automatic cash/XP/point award.

Fixed absent-person relocation and order/age-dependent free acquisitions.112 regressions/minimalDOM checks pass, including actual039 pending-save migration;288 smoke intervals. Ordinary128completed120-turn campaigns:initialHero median48months (range42–60), monthlymanualreset sensitivity46. Adapted optimizer two×8seeds:cashmedian39.5fastest36,lowfarmmedian60fastest59,all16reached by90,zero errors/censoring. Reused seeds; no new-activity optimization/global minimum/finalbalance claim. Latest-engine ordinaryseed7 replay exactly matches evidence. BrowservisualQA unavailable.

Next:human feedback on revisedpace/multi-action value; expandoptimizercoverage and modeljointactivities; rescue/continuity and retained release; completeoffice/restructure; financialsinks/high-levelpay; explicitly scopedFoundry foundation. Preserve900/110 and existingcash/debts until newfeedback justifieschanging them.



## Latest0.3.11 handoff: content ready for Foundry v0 adaptation

User requested richer ancestry-based NPC identities and varied mission types/titles/lore as the last content prerequisites before Foundry. Published [0.3.11](prototype-values-v0.3.11.md); [evidence and samples](../playtests/prototype-0.3.11/README.md).

- Live: https://contract-operations-playtest.primeangel2.chatgpt.site
- Source: `be0e5b9110cda18d478fa582e388ceefa2ff8876`
- Deployment: `appgdep_6acd6a7a857881919335a18f344a0387`, **succeeded**
- Version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_54b9f5f2f488819180d80154a3cbdd04`

New portable content.js:10 Player Core ancestry naming styles with original banks, personal hooks and independent call signs; optional ancestry recruitment;12 four-skill roles.30 mission archetypes across the10 established categories,30-entry persisted bag, unique titles,12 locations/eight recurring clients,50 authored lore templates and detailed per-phase objectives. Roster names and generated fields persist. Original default identities upgrade while preserving former call signs; custom names/clients/prose and accepted/deployed job snapshots remain. No changes to the0.3.10 numerical pay/XP/threat package; new phase skill mixes can change campaign success rates.

128 tests pass and288 existing smoke intervals remain. All30 archetypes resolve through public phase APIs in labeled matching-roster fixtures. Seed42 variety fixture produces1,000 distinct mission titles,2,004 distinct NPC names,allancestries/categories/archetypes and148 instantiated lore hooks. This is content coverage, not a legal startup run. No new full progression estimate; real-browser visualQA unavailable.

API review found Cuename documentation but endpoint searches returned403 here and exact SF2e support was not verified. Local authored tables are the v0 choice; no runtimeAI/API keys/network needed. Generator can be adapted to Foundry actors/contracts with stable keys and saved fields. Next session can scope the module foundation, mapping actors/skills, guild documents and player/GM controls. Existing rescue/release/restructuring gaps remain separate; no Foundry compatibility claim.


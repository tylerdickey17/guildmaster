# Contract Operations browser playtest

A browser-local opening-season demo using Contract Operations0.3.3 core values and edition0.2 procedures. Four distinct starting operatives, four unpaid iconic PC officer fixtures,2,000 credits, two Standard offers and four shared actions. Play six turns, export notes and discuss them in chat; continuing is supported.

The numerical authority is [the design repository](https://github.com/tylerdickey17/sf2e-contract-operations/blob/main/docs/prototype-values-v0.3.3.md). `dist/values.js` embeds that JSON pack unchanged. Mission statistics preserve high/moderate profiles and listed skill ranks; unlisted skills have a disclosed+2 untrained fixture modifier. These are mission-skill profiles, not complete SF2e combat stat blocks.

## Included decisions

- Paid or free acquisition, selected at reset. Paid actions use the single shared pool (PC party size + Guild Level − 1); there is no officer action cap. Routine deployment is free. Each player gets first choice before repeats are allocated.
- Declare2–6 available personnel and all three phase leads before departure; relevant supporters contribute automatically. Default minimum Squad Level and discounts follow0.3.2. Each extra operative above recommended grants +1 circumstance on every phase; use the highest circumstance bonus, with no oversized DC reduction. Cash falls10% per extra operative.
- Same-turn Events resolution and return, exactly three phase checks, persistent/next-phase effects, Essential objectives, recovery, equal base XP, materially contributed MVP selection, Level5 Leader Feats and selected Guild Feats.
- All client receipts precede automatic successful wages during Events. Failed wages are player choice then; HQ rent and facility overhead remain in the following Upkeep. Arrears remain creditor-specific and never become negative treasury.
- Separate recruitment search/hire, end-next-turn candidate expiry and next-boundary onboarding.
- Monthly training, funded continuation without a new action, nonretroactive streak bonuses, release/reset. No recovery/training overlap.
- Morale, publicity, one-phase technical recon, Exclusive brokerage, immediate postreturn Medicine, two facilities with fully funded external managers, once-only development XP and postactivation overhead.
- Three visible scenario events: lead/contact, personnel concern and community introduction. A lead does not waive acquisition; free recognition does not recover Loyalty automatically.
- Browser-local saving, deterministic keyed dice, resettable seed, feedback notes and exported chronological decision log.

## Deliberate scope limits

No loans/property transactions, new officer appointments, rival jobs, full creditor enforcement/eviction, facility damage/transfer, captures/deaths/rescues, Priority adventures or complete trained-action catalog. The demo uses external qualified managers rather than requiring a PC officer to commit to construction. Guild feats available here: Trusted Client, Recruitment Pipeline, Training Cadre, Well Provisioned and Standing Agreement; no unimplemented feat is offered.

The four starting officers use Navasi, Iseph, Dae and Chk Chk, from Paizo’s SF2e pregenerated heroes. Their administrative skills are authored fixtures; these are not official character sheets. Basic actions allow untrained skills where permitted; trained-action eligibility remains visible. NPC/officer data are authored for this playtest; no claim of a complete generated catalog or balanced live-table experience.

The monthly UI compresses the budget/Commerce steps without inventing a second pool. It records unused action counts, staffing commitments and visible dice. A single seed aligns matching turn/card roll keys; changed choices can alter schedules. This is a playable prototype, not an exact reproduction of the earlier Monte Carlo policies or a replacement for the full rules. The fixed+10 officers may become underqualified at high Guild Levels.

## Verification

Run `node tests.cjs` from this directory. Twenty-seven checks cover shared-pool limits, uncapped officers, party-size scaling, revised Loyalty, sparse actual skill support, wage quotes, monthly clocks, candidates/onboarding, training continuation, facility cost/overhead, Events receipts-before-wages, advancement timing, failed pay, degree shifts, deployment bounds, exactly three checks, passive recovery minimum, arrears and expiry.48 deterministic smoke campaigns exercise288 management intervals and cash conservation. A minimal DOM smoke exercises four workspace renders and stage transitions.

Real browser/visual QA was **not run** because the required browser-control capability was unavailable. Native hosting success verifies deployment, not every visual interaction. UI/runtime issues found in actual use should be reported with exported notes, turn, seed and acquisition mode.

Saving is local to the browser/device and does not sync back to chat. Clipboard permission denial falls back to selectable notes; a download button is also provided. No connector access or external game-data service is required.

## 0.3.2 saved-session migration

Existing0.3.1 progress is migrated using the same browser storage key. Unsettled contracts move to Events; recorded rolls and frozen quotes remain unchanged. Legacy Upkeep and Advancement resume after contract decisions without duplicating the monthly event or bills. New deployments use0.3.2 squad-size bonuses. One recovery turn after Events blocks the following Activity and clears at the subsequent Upkeep; legacy missions already returning at a boundary preserve that boundary clock.

## 0.3.3 pool and pay update

Default four PCs receive four shared actions at Guild Level1, then +1 per Guild Level. New Playtest settings support1–8 PCs; this count never comes from the hired NPC roster. Officers have no individual action ceiling. The table first offers each player an action or a pass, then allocates remaining actions; the browser does not enforce player decision order. Failed pay changes Loyalty full+5/half0/none−5. Existing saves gain the four iconic officer names and recalculate unspent Activity actions from their recorded expenditure; previous payments and rolls remain unchanged.

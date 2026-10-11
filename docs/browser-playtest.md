# Browser playtest: opening season

[Play Contract Operations](https://contract-operations-playtest.primeangel2.chatgpt.site)

This private demo lets the owner play an opening season using prototype0.3.3 values and edition0.2 procedures. It is a focused gameplay prototype, not a complete implementation of every subsystem.

## First session

1. Start with the default seed and paid contract acquisition. You begin at Guild Level1 with2,000 credits, four Level1 operatives, four unpaid iconic PC officer fixtures, two Standard offers and four shared Guild Actions. The pool equals PC party members + Guild Level − 1; officers have no personal action cap. Let each player choose an action or pass before allocating repeats.
2. Secure a contract from the board. Deploy available personnel and choose all three phase leads before departure. Deployment is routine administration.
3. Spend the remaining actions on recruitment, training, publicity or other visible options. Watch the shared pool, treasury and trained-skill requirements.
4. Finish the Activity phase. During the same turn’s Events, resolve deployed missions one phase at a time. All client receipts arrive before successful wages; rent and facility bills remain in the following Upkeep. Failed missions award participation XP, reduce reputation and let you decide whether to pay full, half or no wages.
5. Play six monthly Guild Turns. Continuing beyond six turns is supported. Test whether contract acquisition crowds out growth, how recovery changes staffing and whether the treasury supports your decisions.
6. Add feedback and use Copy Playtest Notes or download the notes. Paste them into the design chat for review. Useful feedback identifies a turn, a decision, its result and what felt unclear, slow, too generous or too punishing.

Reset supports the paid/free acquisition A/B test and a chosen seed. Export before resetting. Matching seeds align matching turn/card dice keys; different decisions can change schedules, so the two runs will not necessarily be identical.

## Progress and feedback

Progress saves in this browser when local storage is available. Mission rolls remain fixed when resuming. Browser/device progress does not synchronize to chat. If clipboard permission is denied, the demo offers selectable notes; downloading is also available.

The exported chronological log includes the seed, acquisition mode, decisions, rolls, resources, personnel and feedback. The demo does not send those notes automatically.

## Scope

The demo includes contracts, three mission phases, wages, reputation, loyalty, candidate hiring/onboarding, training, recovery, selected trained actions, leader and guild feats, two facilities, monthly advancement and three authored event fixtures.

It omits loans and property transactions, new officer appointments, rival missions, full creditor enforcement, damage and transfers, capture/death/rescue content, Priority adventures and the complete trained-action catalog. Construction uses funded qualified external managers. Two PC officers and NPC skill profiles are scenario fixtures rather than a complete generated character catalog.

## Verification and reproducibility

[Source and tests](../prototypes/browser-playtest/README.md) preserve the deployed implementation under `prototypes/browser-playtest/`. Open `dist/index.html` locally or serve that directory with any static server. Run `node tests.cjs` from the prototype directory.

Twenty-seven automated checks passed, including mission and settlement ordering, action limits, monthly status clocks, wages and arrears. Forty-eight deterministic smoke campaigns covered288 management intervals, including cash conservation; a minimal DOM smoke exercised workspace renders and stage transitions. These are implementation checks, not evidence that the rules are balanced for human players.

Real browser visual QA was unavailable in the build environment. Hosting reported a successful deployment; visual interaction still needs player feedback. Report UI issues with the exported notes, turn, seed and acquisition mode.

The0.3.2 update migrates existing browser progress, preserving recorded rolls and frozen quotes. New deployment quotes show the size circumstance bonus and cash percentage. Existing quoted deployments retain their original figures.

Default PC officers are Navasi, Iseph, Dae and Chk Chk; their administrative statistics are scenario fixtures. New Playtest lets you choose1–8 PC party members. Failed-pay Loyalty is full+5, half0, none−5. Existing saves retain past pay outcomes and gain the revised party-sized action budget for an open Activity.

## Accepted follow-up design, queued for implementation

The owner found this proof of concept fun and useful. [Free Agents/Retained Operatives](personnel-employment.md), retainer payment in Upkeep, and reduced retained assignment pay in Events are accepted design additions, not current0.3.3 browser features. Full asset/location overhead and retainer amounts still need a pass before settling the starting treasury. See [the session checkpoint](session-checkpoint-2026-10-11.md) for the next Site and possible Foundry work.

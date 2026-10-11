# Browser playtest: opening season

[Play Contract Operations](https://contract-operations-playtest.primeangel2.chatgpt.site)

This private demo lets the owner play an opening season using prototype0.3.1 values and edition0.2 procedures. It is a focused gameplay prototype, not a complete implementation of every subsystem.

## First session

1. Start with the default seed and paid contract acquisition. You begin at Guild Level1 with2,000 credits, four Level1 operatives, two unpaid PC officer fixtures, two Standard offers and three shared Guild Actions. Each officer can spend at most two actions.
2. Secure a contract from the board. Deploy available personnel and choose all three phase leads before departure. Deployment is routine administration.
3. Spend the remaining actions on recruitment, training, publicity or other visible options. Watch the officer capacity as well as the shared pool.
4. Finish the Activity phase. At the next boundary, resolve returning missions one phase at a time. All client receipts arrive before automatic bills. Failed missions award participation XP, reduce reputation and let you decide whether to pay full, half or no wages.
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

Seventeen automated checks passed, including mission and settlement ordering, action limits, monthly status clocks, wages and arrears. Forty-eight deterministic smoke campaigns covered288 management intervals, including cash conservation; a minimal DOM smoke exercised workspace renders and stage transitions. These are implementation checks, not evidence that the rules are balanced for human players.

Real browser visual QA was unavailable in the build environment. Hosting reported a successful deployment; visual interaction still needs player feedback. Report UI issues with the exported notes, turn, seed and acquisition mode.

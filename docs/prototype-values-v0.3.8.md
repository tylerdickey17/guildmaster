# Prototype0.3.8: visible mission completion requirements

October12,2026. The user reported an unnamed mission failed despite two successful phases and a2-of-3 requirement. **The exact user mission has not yet been identified.** Inspection reproduced this symptom on Restore the Ghost Relay, whose existing Essential Engagement condition must also pass. Ordinary2-of-3 contracts completed correctly.

## Existing rule, clearer presentation

Completion requires the contract's successful-phase count **and** any explicitly required Essential phase. Each Success or Critical Success counts as one successful phase; phase consequences still apply separately.

- Ordinary Normal/Hard/Expert/Exclusive: any2of3 successful phases complete the job.
- Easy: any1of3.
- Legendary:3of3.
- Ghost Relay: at least2of3 **and Engagement must succeed**. Successful Insertion/Extraction with failed Engagement therefore fails.

The engine now provides a shared completion outcome with successful count, required count, Essential condition and readable reason. This preserves the existing boolean rule.

Board cards, details, deployment quotes and resolution prominently state the complete requirement. Settlement summaries, operations log and failed-pay choices explain the actual count and required-phase failure. For the reproduced case: “2 of3 phases succeeded;2 required. Engagement failed; this contract requires Engagement to succeed.”

## Save compatibility and limits

Existing rolls, outcome flags, cash, XP, Reputation, wages and arrears are preserved. Matching historical result records gain an explanation on migration; settlement is not replayed. Legacy deployed Hard snapshots retain their original3-success requirement and now explain that actual requirement. No retroactive payout correction or rule removal is claimed.

The approved900/110 economy, progression, finance and all other rules remain as in [0.3.7](prototype-values-v0.3.7.md). [Prior Essential rule framework](integration-rules-v0.2.md) remains.

**Follow-up:** confirm whether the user's mission was Ghost Relay. If another mission was involved, obtain its name and three phase outcomes/exported notes to diagnose that specific save. This patch clarifies the reproducible case; it does not assert the user's exact report is conclusively explained.

## Verification

74 checks and288 campaign intervals passed. Additional regressions cover every failed-phase position and Failure/Critical Failure for ordinary2-of-3 tiers (24 combinations), all three Ghost Relay failure positions, and UI visibility of both the requirement and2-success failure explanation. Full visual browser QA unavailable; engine/minimal DOM checks passed.

[Source](../prototypes/browser-playtest/README.md) · [Frozen values](../playtests/prototype-0.3.8/values.json) · [Verification](../playtests/prototype-0.3.8/verification.json).

Live: https://contract-operations-playtest.primeangel2.chatgpt.site

- Site source: `b1f609ef261d650cc5d6db8e4a57a4e43a426f7d`
- Deployment: `appgdep_6acd1846f5448191978b2f46479433da`, succeeded
- Version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_9f7bdb2c353c8191bc9ea2c4e8950cdd`

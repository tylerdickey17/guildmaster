# Foundry discovery live validation — October 13, 2026

Release 0.1.0-alpha.5 packages the implementation tested locally in Foundry 14.369 with native SF2e 1.6.1. Release packaging changes the version, metadata and documentation without changing the tested rules or interface. This is a GM smoke test, not a PF2e compatibility or campaign-balance claim.

## Live checks passed

- Contract and recruitment searches expose the guild DC without a Target Level input.
- Real system checks and independent discovery dice generate contract and recruit options.
- The optional ancestry preference is preserved.
- Securing a contract and hiring a recruit each spend the appropriate action and cost.
- New recruits cannot join a squad until onboarding finishes; they become available on the scheduled turn.
- Squads can be assembled with distinct phase leads and deployed without extra deployment actions.
- All mission phases proceed through review and settlement, with payout, wages, operative XP, Guild XP and Reputation recorded.
- Monthly events resolve and the turn completes.
- The completed contract and recruited operative persist after reload.
- A separate second turn confirmed that the completed guide closes and stays closed.
- Existing guild data was compared before and after testing and was unchanged.

## Issues fixed during testing

- Scoped button styles to module content so Foundry window icons retain their icon font.
- Added a completion-aware refresh so a completed turn does not reopen its guide. Added an automated regression check and verified the fix live.

## Verification boundaries

All 70 Foundry integration checks pass. Browser engine checks pass 128 checks including 48 simulated campaigns / 288 intervals. Higher-guild-level distributions and brokerage are covered automatically; live discovery exercised Guild Level 1. Separate-player permissions, PF2e Foundry support and campaign balance were not established by this smoke test.

Detailed session records and backups are retained locally and are excluded from the public release.

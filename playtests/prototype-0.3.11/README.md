# Guildmaster prototype0.3.11 evidence

[Live content rules](../../docs/prototype-values-v0.3.11.md), [source/tests](../../prototypes/browser-playtest/README.md), [portable generator](../../prototypes/browser-playtest/dist/content.js).

- verification.json:128 checks and the existing288 campaign smoke intervals.
- generation-audit.json:seed42 content-only fixture;2,000 new NPCs and1,000 mission titles, full ancestry/category/archetype coverage.
- sample-content.json:readable seed42 roster and twelve mission dossiers.
- opening-balance.json:the retained opening900/110 calculation.
- values.json and source-hashes.json:executable numerical pack and published-file SHA256.
- Actual0.3.10 migration fixture: [content-migration-0310.json](../../prototypes/browser-playtest/fixtures/content-migration-0310.json).

From prototypes/browser-playtest, run:

```bash
node tests.cjs
node content-check.cjs
node balance-check.cjs
```

No npm packages or network calls are needed for these checks. Reproduce from this record's commit to preserve the exact content tables. Large roster/name audits are artificial content fixtures, not startup progression evidence. New archetypes affect phase skill availability; no new full campaign pacing estimate is claimed. Real browser visual QA and Foundry compatibility remain unverified.


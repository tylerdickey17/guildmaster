# Guildmaster prototype0.3.10 evidence

Read [the live rules and limits](../../docs/prototype-values-v0.3.10.md).

- frozen/engine.js and frozen/values.js preserve the published engine.
- protocol.json records SHA256 and complete campaign definitions.
- verification.json records112 regression checks and288 existing smoke intervals.
- opening-balance.json retains the existing900/110 opening arithmetic.
- normal-summary.json and normal-evidence.json record128 completed120-turn campaigns, all seed outcomes and full seed7 reference traces.
- bounded-speedrun-results.json records two adapted policies on reused seeds1–8,90-turn horizon;16 attempts, all reached,0 errors/censoring.

The actual0.3.9 partial save used for migration is in [the source fixtures](../../prototypes/browser-playtest/fixtures/progression-039.json).

Run from this directory with Node.js (no npm packages):

```bash
node normal-growth.cjs
node bounded-speedrun.cjs
```

The first command regenerates large histories and overwrites generated summary.json; the second regenerates the compact optimizer record. Use a disposable checkout. Raw large histories are intentionally omitted from Git. Policies use public card information, not future dice; artificial fixtures only occur in labeled regression tests. Primary campaigns use initial four Hero Points only; the ordinary monthly reset cohort is a separate sensitivity. No new-activity optimization or final five-year guarantee is claimed.

Run regressions from prototypes/browser-playtest with `node tests.cjs` and opening arithmetic with `node balance-check.cjs`. Real browser visual QA was unavailable. The source fixture and comparison scripts are reproducible; these are tests of a prototype, not Foundry compatibility.


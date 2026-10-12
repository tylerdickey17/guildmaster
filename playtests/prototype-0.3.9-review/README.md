# Guildmaster 0.3.9 review reproduction bundle

This bundle records the six-agent October 12 review without changing live rules. Read [the combined review](../../docs/playtest-review-2026-10-12.md) first.

## Frozen source

- Site source commit: `7c1b338b9b9b46f75b0296a660bd5aa08b857a0b`.
- Repository parent: `01d1e132e3b10c7c4f39ec557a64faf3b6d7eb90`.
- Engine SHA256: `24bc8b6dfe116f0605f8f776f2ec4a19d5d36cce72fcb7b73dc8536fc5d54d10`.
- Values SHA256: `6c7e0eb61ec3497a5aa3f53272243232bab2e8adf759be4261633ebdf930c45e`.

Frozen JS is byte-preserved. JSON evidence is whitespace-compacted only; original and stored SHA256 are in manifest.json. Node.js with built-in modules is sufficient; no npm dependencies or browser are needed. Campaign policies use public APIs; synthetic fixtures explicitly edit their starting setup.

## Commands

Run from this directory. Simulations write generated results beside their scripts, potentially replacing committed compact summaries. Use a disposable checkout when rerunning the entire bundle.

```bash
node runs/speedrun/speedrun.cjs 64 90
node runs/speedrun/analyze.cjs
node runs/speedrun/counterfactual/run.cjs
node runs/speedrun/counterfactual/analyze.cjs
node runs/normal_growth/simulate.cjs
node runs/normal_growth/analyze.cjs
node runs/action_pressure/simulate.cjs
node runs/discovery_hero/audit.cjs
node runs/property_xp/audit.cjs
node runs/economy_recovery/debt-cases.cjs
node runs/economy_recovery/sim.cjs
node runs/economy_recovery/capped-search-sim.cjs
node runs/economy_recovery/relocation-fixed-sim.cjs
node runs/economy_recovery/summarize.cjs
```

A quick independent replay of the fastest **current-rules** result:

```bash
node - <<'JS'
const assert=require('node:assert/strict');
const {run,policies}=require('./runs/speedrun/speedrun.cjs');
const a=run(30,policies.find(p=>p.id==='mission-first-low'),false,90);
const b=run(30,policies.find(p=>p.id==='mission-first-low'),false,90);
assert.deepEqual(a,b);
assert.equal(a.error,null);
assert.equal(a.turnReached,10);
assert.equal(a.cash,14159);
assert.equal(a.arrears,0);
console.log({turn:a.turnReached,cash:a.cash,arrears:a.arrears,completed:a.completed,failed:a.failed});
JS
```

## Evidence map

| Directory | Content | Important limits |
| --- | --- | --- |
| speedrun | Six policies, fixed 64 seeds each, summaries, all seed outcomes, compact fastest trace | Initial four Hero Points; fastest found, not proven minimum; monthly reset reported separately |
| speedrun/counterfactual | Isolated rising-XP engine and matched 32-seed two-policy run | Changes thresholds only; does not test combined milestone/routine-work revisions |
| normal_growth | Two 64-seed balanced cohorts, all seed records, representative traces, static threshold projections | No relocation or borrowing; capped moderate roster; monthly Hero reset is a sensitivity |
| action_pressure | Exact odds, 128 legal startup campaigns, action/metric audits and draft activities | Promotion changes future roll keys; cohorts are not identical-dice causal comparisons |
| discovery_hero | Discovery distributions, executable checks and exact mission enumerations | Hypothetical crew/mission comparisons and Hero spending are labeled |
| property_xp | Twelve executable checks, 100-seed Pipeline and natural Missing relocation audits | Expansion/high-cash/feat fixtures are not startup speedruns |
| economy_recovery | Reserve/growth/retained policies, debt fixtures, capped-search and relocation-fixed sensitivities | Same seeds reused across variants; distinguish original relocation bug from fixed copy |

Large generated campaign histories, full fastest roll dumps and duplicate console output are omitted from Git to keep the record manageable. Scripts regenerate them. The committed compact traces retain monthly decisions, XP, finances and mission summaries; current-rule speedrun results retain all attempted seed outcomes. The ordinary compact evidence retains all seed records plus reference/fastest/censored traces. Some analysis scripts expect full raw results; run their simulation first.

The two altered engines are isolated study files: relocation-fixed-engine.cjs corrects only the lost-person passenger set (plus portable values require); counterfactual/engine.cjs changes only XP threshold accounting (plus portable require). Their presence does not publish those changes to the browser.

Root verification is in root-verification.json. The aggregate report distinguishes censored runs from exceptions, static projection from changed-engine play, and legal startup from artificial fixtures. No final balance or Foundry compatibility claim is made.


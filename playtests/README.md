# Reproducing the prototype reviews

Python3.10+; standard library only. Work in `playtests/prototype-0.3.0/` and run:

```bash
python verify.py
python mission_odds.py
python new_guild_ab.py
python large_guild.py
python training_growth.py
python debt_property.py
python loyalty_actions.py
```

Scripts regenerate their named JSON and reports, including seed7 traces. Some scripts restore pretty JSON, so byte formatting may differ while numerical results remain identical. The pack files are immutable versions; do not edit them to test a sensitivity. Exact enumeration and repeated campaign runs have different denominators, detailed in each report. Monte Carlo seed pairing only aligns unchanged turn/squad keys; divergent schedules are not guaranteed identical job faces.

Frozen0.3.0 SHA256: `5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d`.

Current0.3.1 SHA256: `32b207d3b379d4cc8e8b4ff818d912059866a2cdd98ab15f0a2b61c42e0dde99`.

Targeted reruns in `prototype-0.3.1/` use the independent mission/action oracles, not a silent replacement of the0.3.0 shared campaign engine:

```bash
python mission_revision.py
python loyalty_revision.py
```

The0.3.0 campaign engine implements receipts-before-bills, frozen wages, three checks, forward effects, capped support, XP/next-turn Guild capacity, onboarding, recovery, acquisitions/searches/hiring, one-block training and promotion. It deliberately omits the event deck, debts/property/projects, Guild/Leader feat effects, Leader XP, rival jobs and sparse NPC skill catalogs. Independent exact/manual files supplement some omissions, not every feature. Its pooled arrears reporting is not a full creditor ledger; zero-arrear campaign results are unaffected. Loyalty-zero immediate departure in that bounded engine is a simplification of the live rule's next-boundary notice, irrelevant to its half-pay campaigns; do not use it as a no-pay departure simulator.

Run `python check_artifacts.py` from this directory for pack-hash, JSON, Python-syntax, relative-link, ledger and independent-oracle checks. The [verification summary](verification-summary.json) records the result. It includes32 revised exact-probability comparisons; it is not a full0.3.1 campaign rerun.

Most campaign tests use favorable saturated boards and comprehensive relevant support. New-guild agent includes a separately disclosed fixedL1 limited-board fixture. Nonrandom debt/clock probes are authored examples, not population estimates.0.3.1 has targeted checks only; rerun the complete campaign suite with revised eligibility/content and actual generated skill profiles before drawing general balance conclusions. Read the [consolidated report](../docs/prototype-simulation-report-v0.3.md).

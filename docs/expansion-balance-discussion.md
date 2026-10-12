# Expansion and management budget: discussion draft

October12,2026. **Not adopted or implemented.** The user reported debt after expansion and asked to talk through possible level locks before changing policy. This document preserves that feedback and a designer first draft for refinement.

## What the current values show

A clean Level1 Normal completion pays600, four Free Agents cost200, and the staffed base costs365/month. That leaves **35** before other management actions, training, replacement, construction or debt. This tight margin exists even before expansion.

Exact8,000-combination calculation for the opening Dock Nine contract, four Level1 crew with optimal distinct leads (+10/+8/+8 versus15), published degree/natural-roll rules and current phase-forward effects:

- Success probability: 80.6875%.
- Mean transport-repair cost: 1.25.
- Extraction Missing risk: 5.00%.
- Half wages on failure,365 upkeep: expected net **-62.81**.
- Hypothetical900 payout, everything else equal: expected net **179.25**.

[Exact output](../playtests/prototype-0.3.5/opening-balance.json) · [Reproduce](../prototypes/browser-playtest/balance-check.cjs) with `node balance-check.cjs`.

This is one monthly contract model, excluding training, crew replacement, future consequences, wages rising with advancement, multiple squads, new locations and additional reward value. It cannot predict a full campaign or demonstrate that900 is globally balanced. Actual players can recruit more crews or choose other work; the calculation diagnoses the narrow opening operating margin.

## Recommended first draft for discussion

1. **Operating margin:** try Normal900 at Level1, keeping mission-level scaling. A clean completion would leave335 after four wages and staffed base upkeep; the bounded expected net above leaves room for some useful management and savings. Revisit other tier reward ratios if this is chosen. Do not change the approved300 base merely to hide the income issue.
2. **Paced purchases:** unlock new basic facility construction at **Guild Level2** and new-base purchases at **Guild Level4**. Keep the disclosed starting fitted Training Suite as a tutorial fixture. These levels are proposals, not claims that level guarantees solvency or player familiarity.
3. **Reserve preview:** before spending, show remaining cash against **three turns of known recurring costs plus already committed assignment wages**. Warn visibly when the proposed purchase leaves less; keep player override as a deliberate risk. Avoid an automatic three-month spending prohibition unless later tests support it.
4. **Keep useful early choices:** recruitment, contract acquisition, networking, morale, publicity, ordinary training and preparation remain accessible. Growth should include affordable personnel/action choices rather than requiring property expansion to have something interesting to do.

The income, unlock and reserve choices work together. A level gate alone does not create an operating surplus; a reserve warning alone does not fund an action. Players should understand costs without every meaningful choice causing an unavoidable spiral.

If adopted later, test matched startup seasons, training months, one/two squads, paid failures and mid-game purchases. Keep the artificial Expansion preset separate from startup-affordability evidence.

## Current executable boundary

Version0.3.5 retains Normal600,300 starter base, existing facility staffing rates and **no expansion gates**. Current next-bill forecasts remain; the proposed three-month purchase warning has not been added. No user acceptance of900 or Guild Level2/4 gates is claimed.

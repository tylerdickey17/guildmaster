# Counterfactual increasing Guild XP thresholds

This changes only the isolated engine copy's settleGuildXP thresholds and subtractions: reaching Levels 2–10 costs 1,000 / 1,250 / 1,500 / 1,750 / 2,000 / 2,500 / 3,000 / 3,500 / 4,000 XP, for 20,500 total. Live and frozen files are unchanged. The isolated harness updates cumulative XP accounting to match. All other economy, random discovery, roster, action pool, advancement and Hero Point rules remain 0.3.9.

Two previously declared public-information strategies, fixed seeds 1–32, horizon 90 turns: 64 attempts, 63 reached, one censored, zero exceptions. Completed in 26.5 seconds. No future-die peeking or state editing; only four initial Hero Points. No further exploratory strategies were added.

| Policy | Current reached | Current fastest | Current median among reaches | Counterfactual reached | Counterfactual fastest | Counterfactual median among reaches |
|---|---:|---:|---:|---:|---:|---:|
| cash-engine | 32/32 | 11 | 13 | 32/32 | 19 | 24 |
| mission-first-low | 31/32 | 10 | 13 | 31/32 | 18 | 21 |

Fastest found counterfactual: seed 26, mission-first-low, Level 10 at end Turn 18, about 1.5 years. This is not a global minimum. 75 completed jobs and 5 failures; cash 16636, arrears 0, Reputation 100, 4 Missing, 24 hires. No loans were needed in this run. Per-level timestamps: L1=T0, L2=T3, L3=T4, L4=T7, L5=T9, L6=T10, L7=T11, L8=T14, L9=T16, L10=T18.

Exact replay matched and full cash/action/Guild XP conservation remained valid. Final earned Guild XP = 21150; spent Hero Points = 4. Monthly actions, mission levels and awards are in compact-trace.json; full rolls in fastest-trace.json.

Increasing thresholds slows these optimizers from a conditional median of about 13 months to 21–24 months, while the fastest found takes 18 months. Low-level farming still works. Thus a static ordinary-play projection around 62 months must not be described as a demonstrated five-year progression curve for savvy play. The unchanged low-level XP value, easy network checks and unrestricted squad growth let optimizers acquire significantly more monthly XP than a one-squad forecast.

Reproduce with `node runs/speedrun/counterfactual/run.cjs` and `node runs/speedrun/counterfactual/analyze.cjs` from the bundle root.

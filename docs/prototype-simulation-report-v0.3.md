# Prototype simulation report: 0.3.0 → 0.3.1

October10,2026 (America/Chicago). **Recommendation: use [0.3.1](prototype-values-v0.3.1.md) as the starting live-play pack**, with [0.3.0](prototype-values-v0.3.md) supplying unchanged content and [edition0.2](integration-rules-v0.2.md) supplying procedures. Keep paid acquisition for a controlled live A/B. Numbers have been exercised; the complete tabletop experience has not been validated.

The user requested numerical prototypes and subagent simulated playtests. Root selected and froze0.3.0, six independent agents reviewed it, and root adopted explicit revisions under the earlier delegated design authority. Two agents independently reran the affected exact/arithmetic cases on0.3.1. All older user choices remain: monthly sequence, shared pool, two/officer baseline, three Standard checks, automatic relevant support, equal base NPC XP, floor-average squad levels, failed client cash0, chosen failed wages, Exclusive deadlines, Level5 leaders, training clocks and1–20 mercenaries. New values are designer-selected prototypes, not claims of individual user approval.

## What was actually tested

| Review | Method/sample | Evidence |
| --- | --- | --- |
| Mission odds and adversarial deployments | Exact20³=8,000 paths/configuration.346 configurations;116 distinct probability cases memoized,928,000 evaluated paths.346×8,000 is2,768,000 logical paths, **not independent random trials**. | [Report](../playtests/prototype-0.3.0/mission_odds.md), [code](../playtests/prototype-0.3.0/mission_odds.py), [JSON](../playtests/prototype-0.3.0/mission_odds.json) |
| New-guild acquisition A/B | 14 arms×2,000 seeds=28,000 twelve-interval campaigns; terminal T13 settles bills/rewards without new actions. | [Report](../playtests/prototype-0.3.0/new_guild_ab.md), [code](../playtests/prototype-0.3.0/new_guild_ab.py), [JSON](../playtests/prototype-0.3.0/new_guild_ab.json) |
| Established/large capacity and economy | 30 cases×2,000 seeds=60,000 twelve-interval campaigns plus terminal settlement. | [Report](../playtests/prototype-0.3.0/large_guild.md), [code](../playtests/prototype-0.3.0/large_guild.py), [JSON](../playtests/prototype-0.3.0/large_guild.json) |
| Training and progression | 18 cases×10,000 seeds=180,000 one-squad24-interval growth trials, plus training arithmetic and independent exact mission oracle. | [Report](../playtests/prototype-0.3.0/training_growth.md), [code](../playtests/prototype-0.3.0/training_growth.py), [JSON](../playtests/prototype-0.3.0/training_growth.json) |
| Debt, property and distress | Exact12-payment amortization, authored monthly ledgers, zero-income/withdrawal/distress cases. No population sampling. | [Report](../playtests/prototype-0.3.0/debt_property.md), [code](../playtests/prototype-0.3.0/debt_property.py), [JSON](../playtests/prototype-0.3.0/debt_property.json) |
| Loyalty, rivals and trained actions | Exact20-face action/loyalty checks,16×8,000 mission paths, exact rival-event availability chain, seed7 trace. | [Report](../playtests/prototype-0.3.0/loyalty_actions.md), [code](../playtests/prototype-0.3.0/loyalty_actions.py), [JSON](../playtests/prototype-0.3.0/loyalty_actions.json) |

Total campaign runs **268,000**, spread across different bounded models and policy sensitivities. That count is not a single full-game validation sample. No agent played actual SF2e adventures or timed a live Guild Turn. Agents worked independently on their calculations/interpretation but shared the numerical pack and, for the two economy agents, the root campaign engine. Probability/progression/action agents wrote independent oracles; shared baseline mission probabilities agreed exactly.

Pack0.3.0 SHA256 `5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d`;0.3.1 SHA256 `32b207d3b379d4cc8e8b4ff818d912059866a2cdd98ab15f0a2b61c42e0dde99`. Reproduction commands and explicit engine omissions are in [playtests/README](../playtests/README.md). Root's[verifier](../playtests/prototype-0.3.0/verify.py) passed150 assertions, many being repeated conservation/capacity checks across seeds, **not150 independent scenarios**.

## Keep the opening numbers

Start with **2,000 credits, fourL1 mercenaries, two unpaid PC officers and150/month leased headquarters**. Shared Guild actions start3 and rise to7 over Guild1–10; each officer executes2. Keep 1,000 XP thresholds and training150/+10% subsequent blocks/cap50%. Keep one-action acquisition initially.

Under the favorable new-guild matching-level board, high-skill paid acquisition deployed **18.365 assignments/12 intervals**, versus **19.128 free**. With promotion disabled, ending mean treasury was **7,160.58 paid/7,525.81 free**; free added365.24 credits (paired95% mean-difference interval347.997–382.473). With the default promotion-heavy policy, free instead ended572.04 lower because it spent937.35 more on publicity while raising Reputation27.67 more. This is a policy-spending effect, not proof free acquisition loses money.

Free acquisition primarily releases roughly18 actions for other development in that opening fixture. On the separately held fixedL1 limited-board test, paid/free deployed **16.998/18.539**; both started with two offers and needed additional contract searches. A one-action-per-officer sensitivity reduced paid throughput about18%. These support preserving two/officer and testing acquisition's opportunity cost at the table, not assuming a trivial extra action is fun.

Each of the14 new-guild and30 large-guild arms observed **0/2,000 arrear breaches**, Wilson95% upper0.1917% per arm. Do not pool correlated sensitivity arms or call this an insolvency/default estimate. These campaigns omit disruptive events, property/debt and many adverse pressures. The progression model is not a solvency model at all.

## Problems demonstrated and revisions made

### 1. Cash adjustments rewarded unsupported squads

Frozen0.3.0 multiplied fixedL20 payout by1.5 for `[20,1,1,1]`. In an intentionally favorable fixture where theL20 generalist could lead every phase and all other members supported relevantly, completion remained99.275%, identical to fourL20 NPCs; the mixed crew's wages were3,620 versus13,880. Full-failed-pay calendar net rose **27,458→58,387**. This illustrates a permissive bound, not the assumption that every NPC knows all skills.

**0.3.1 removes positive size/level premiums**, keeps only capped discounts for oversized/overlevel staffing, and discloses default minimum Squad Level recommended−2, min1, on the card. `[20,1,1,1]` floor average5 is now ineligible for minimum18. `[20,20,20,12]` is eligible at average18 and retains a legitimate cheaper-support advantage without the cash premium. Phase leads, floor-average and equal XP are unchanged. Card authors can explicitly allow riskier lower-level work.

Cheap two-person Routine teams can still be efficient. A low-success-count easy job may deserve that; authored staffing/Essential objectives should establish genuine operational requirements rather than relying solely on financial penalties. A generalist leading every phase remains a watchpoint within the bounds.

### 2. Demanding jobs paid poorly for their commitment

FourL1 high leads with relevant capped support completed frozen Standard **87.8625%**, Demand/Exclusive **35.75%**. Half-failed-pay net **before monthly assets/officers**, adjusted for required/phase recovery, was **296.96 /125.17 /168.08 credits per calendar turn** respectively. Demanding also lost Reputation on average. Simply increasing cash left prestige penalties untouched.

**0.3.1 uses baseDC for Demand/Exclusive**, still requiring all3 phases versus Standard2 and one recovery turn. Demand cash factor2.4, XP200+300, GuildXP600, Reputation+3/−3; Exclusive3.0, XP200+350, GuildXP750, Reputation+4/−4. They remain substantially harder and less available, with stronger success rewards.

The targeted independent rerun found **53.675%** completion for either revisedL1 difficult card with high leads and full relevant support. Half-pay calendar net becomes **309.62 Demand/406.24 Exclusive**, versus unchanged Standard296.96. Expected Reputation/calendar turn is now modestly positive **+0.11025/+0.147**, versus negative in0.3.0. A moderateL1 lead instead completes44.125% and still loses expected Demand Reputation; specialist coverage matters. Standard still gives greater expected ordinary NPC XP/calendar turn atL1 (202.86 versus180.51 Demand/193.93 Exclusive); difficult cards need not win every metric.

These are exact fixed-level renewal calculations: expected receipts minus expected actual full/half/no wages, divided by `1+probability of one-turn recovery`. They exclude monthly fixed costs, scarce offers, event complications, action contention and expanding/advancing crews. Income forecasts from the older evolving0.3.0 campaigns are not revised0.3.1 forecasts.

### 3. Recovery mitigation erased its balancing role

Frozen Hardcase/Infirmary each removed the whole one-turn demanding recovery, doubling possible deployment frequency. **0.3.1 preserves mandatory recovery against passive reductions**, while removing eligible phase-added recovery. Active, paid postreturn Recovery Protocol may still reduce remaining recovery immediately: that is a deliberate skilled action/resource tradeoff, rather than a free passive waiver. It never releases captives or untreated special conditions.

For theL1 four-person/+10 doctor/DC15 fixture, treating after every difficult mission costs100 per attempt and one medical action. Success80% reduces expected cycle2→1.2, raising half-pay net to432.70 Demand/593.73 Exclusive before fixed costs and action contention. This is a strong recovery-investment choice to watch. Doctors must actually be present and qualified; organizational DC/officer progression, available action capacity and finances limit its use. Higher-level tests cannot assume the same80% forever.

### 4. Several investments/actions were inert or overpriced

- **Optimize Infrastructure:** frozen25-credit fee exceeded even guaranteed20-credit critical saving on the largest100/month authored property. New fee0, still one trained action, keeps10%/20% saving. Savings are modest opportunity-cost choices, not passive profit.
- **Recovery Protocol:** delayed activation originally coincided with ordinary one-turn release and provided no availability benefit. New immediate postreturn activation makes it usable.
- **Training Suite:** frozen1000/30 saved only20/month over two ordinary cohorts; Training Cadre made it5/month worse. New500/15 saves35/month without Cadre or10 with it, before construction/manager costs. It also consolidates six-person initiation into one cohort. The XP/streak program is unchanged.
- **Loyalty:** DC18 with divisor10 left maximum-loyalty NPCs accepting35% of compatible rival offers, while+4 half-pay changes frequently missed modifier bands. Divisor5 now gives refusal65% at50 and95% at100. Loyalty0 departure notice and individual agreements still govern; no roll can compel incompatible work.

### 5. Debt needed explicit bookkeeping, not easier credit

The secured cap is70% of **sale value**, itself70% purchase price: effective49%. A Field HQ1470 loan costs131/month; a1000 unsecured loan95/month. Together226 debt service requires753.33 average actual client receipts under the30%cap, above600-history. Debt-financed Field HQ overhead75+loan131=206 versus150 leased, with higher overlap during transition.

Keep conservative lending/property numbers initially. Add creditor-specific arrears, explicit missed-interest allocation and final payoff adjustment, and a separate operating-solvency budget; a30% gross-receipts test does not guarantee affordability after wages/overhead. These clarifications are in0.3.1. Default/restructuring is an authored campaign consequence, not an automated reset. Existing tests are deterministic arithmetic/scenario probes, not general distress-rate estimates.

## Progression and later-guild watchpoints

Continuous training reachesL5 after19 funded blocks. It provides2,475 XP at12 and5,175 at24, reachingL3/L6 with carryover. But a starting treasury cannot pay lease+150/cohort indefinitely without income; this is an arithmetic path, not a practical guaranteed training-only strategy. Keep the150/+10%/cap50% baseline while testing rotation versus long commitments.

In favorable one-squad24-interval progression trials, concentrating MVP on one NPC moved median first-leader timing **19→16 intervals** compared with rotating. Level5 leader and MVP awards can legally stack; monitor roster inequality rather than changing equal participation/completion XP. Standard GuildXP250 is retained. Multi-squad advancement is much faster: established Guild4 averaged8.58 after12 intervals and large Guild8 reached10 in all sampled clean cases. Early maximal Guild capacity/feats and fixed low facility prices in high-wage economies warrant broader testing.

Required officers to use the whole pool: **2 at Guild1–4,3 at5–8,4 at9–10**. This is not how many officers are needed merely to acquire current jobs: four squads use four acquisition actions. Clean established/large tests therefore found paid/free acquisition identical in contract/cash throughput at two/officer, while freeing many strategic actions. Additional salaried officers only buy value when other activities compete.

Do not extrapolate a fixture's fixed+10 officer to lateGuild organizationalDC39. A policy that kept promoting regardless of odds actually lost Reputation in the large-guild test. Actual PCs/NPC officers retain their own levels/statistics; rational players can use qualified officers, target easier projects or stop poor publicity attempts. Full procedural officer advancement and live administrative DC tuning remain to test.

## Targeted0.3.1 verification and limits

- [Mission revision report](../playtests/prototype-0.3.1/mission_revision.md), [code](../playtests/prototype-0.3.1/mission_revision.py), [JSON](../playtests/prototype-0.3.1/mission_revision.json): revised probability/economy/eligibility/recovery comparisons, independent enumeration.
- Mission revision sample:104 configurations,100 eligible×8,000=800,000 logical paths;52 distinct probability cases/416,000 evaluated paths. Ineligible cases have no mission success estimate.
- [Action/loyalty revision report](../playtests/prototype-0.3.1/loyalty_revision.md), [code](../playtests/prototype-0.3.1/loyalty_revision.py), [JSON](../playtests/prototype-0.3.1/loyalty_revision.json): revised loyalty, facility savings, infrastructure and immediate medical effects.

The full six-scenario campaign suite has **not** been rerun for0.3.1. Core Standard odds/XP for balanced recommended-level four-person squads are unchanged. Revised card cash, minimum eligibility, mixed crews, passive/active healing, event offers and facilities need campaign reruns with revised models before quantitative forecasting. Most Monte Carlo fixtures supplied replenishing boards and comprehensive relevant support; none is a full generated NPC/contract/event simulation.

## First live sessions

Use0.3.1 and actual distinct NPC skills. Begin with four mercenaries, twoPCofficers, two Standard offers, the visible event baseline and three shared actions. Run one matched paid/free acquisition comparison. Include one choice between recruitment, training, a project, publicity and preparing a difficult job. Record which actions were deferred and why, turn-management time, idle recovery, actual bills/quotes, failed-pay decisions, XP concentration, and whether medical preparation feels worth its cost.

Players should experience the promised choice: grow capacity, improve staff, or commit those resources to work. Simulated arithmetic supports this starting pack and identifies clear failure cases; live play must determine whether those decisions are understandable and enjoyable.

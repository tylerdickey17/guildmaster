# Guildmaster playtest review — October 12, 2026

**Frozen rules: 0.3.9. Live rules unchanged.** Six specialist agents tested progression speed, ordinary growth, action pressure, economy/recovery, discovery/Hero Points, and property/development exploits. Scripts, compact evidence and frozen source are in [the reproduction bundle](../playtests/prototype-0.3.9-review/README.md).

The fastest verified startup reached Guild Level 10 after **10 completed Guild Turns**. Ordinary balanced play reached Level 6 at a median **16.5 months**, closely matching the owner's Level 6 after 16 months, and Level 10 at **26 months** among runs that reached it. Current progression therefore supports the owner's concern. Powerful multi-action activities would improve the decisions, but do not by themselves solve XP throughput.

## Human feedback and scope

The owner reported a fun, increasingly polished core loop, two recoverable periods of negative finances during a 16-month run, and a loan-funded new base. Higher-level action surplus encouraged repetitive promotion. The requested direction is stronger two- and three-action activities while retaining action growth, and approximately five in-game years to build a top-level guild. This duration is a design preference, not a verified real-world business benchmark.

The owner accepts the browser UX as a proof of concept and expects a different Foundry UX. This review does not redesign it. No production rules, Site deployment or Foundry implementation changed. Proposed XP curves, attempt limits and new activities below remain unimplemented.

## Progression evidence

| Trial | Attempts / horizon | Reached Level 10 | Level 6 median | Level 10 median among reaches | Fastest found |
| --- | --- | --- | --- | --- | --- |
| Ordinary balanced, initial Hero Points only | 64 / 120 months | 63; 1 censored; 0 errors | 16.5 months | 26 months | 22 months |
| Ordinary balanced, manual monthly session reset sensitivity | 64 / 120 | 64; 0 censored; 0 errors | 16 months | 25 months | 22 months |
| Six optimized policies, initial Hero Points only | 384 / 90 | 378; 6 censored; 0 errors | Varies by policy | 13–14 months by policy | **10 months** |
| Rising-threshold counterfactual, two optimized policies | 64 / 90 | 63; 1 censored; 0 errors | Varies by policy | **21–24 months** | **18 months** |

Policies reuse fixed seeds; these are not 576 independent random samples. Medians exclude censored campaigns, whose denominators are shown. The shortest result is the fastest found, not a proven global minimum. These automated policies are useful stress tests, not a representative survey of human play.

### Verified ten-month route

Seed 30, `mission-first-low`, begins with the ordinary Staffed Level-1 guild, four PCs, four Free Agents and 2,000 credits. All decisions use visible cards and public engine APIs; no state edits, future-die inspection or monthly Hero reset.

- Ends Turn 10 at Level 10 with **14,159 cash, zero arrears, Reputation 61**.
- **31 completed and 2 failed contracts**, 23 hires, 27 roster members including 3 Missing.
- Spends exactly the four initial PC Hero Points.
- Earns **9,150 Guild XP entirely from contracts**; no loans, property purchases or development XP are needed.
- Uses mission levels **1–3**, grows several parallel squads, and takes favorable low-level work that continues to award full Guild XP.
- Reaches Levels 2/3/4/5/6/7/8/9/10 at Turns **3/4/5/6/7/8/8/10/10**.

Root independently reran the exact campaign from a clean frozen module. The replay was byte-identical and cash, action and Guild XP conservation passed. Neither the relocation bug nor property XP farming explains this route.

## Problems to address

### 1. Guild XP throughput scales much faster than the level thresholds

Current Level 1–10 requires nine flat 1,000-XP thresholds: **9,000 total**. A completed Normal job awards 250; Hard 400; Expert 600; Legendary 900, independent of mission level or how routine the work has become. Cash discounts for overqualified crews do not reduce Guild XP. Hiring additional squads multiplies this progression.

Reliable low-level discovery compounds it: the fixture officers retain +10, so a level-1 network check continues to generate useful offers at high Guild Level. A single such search has a 21.84% chance to include at least one Expert/Legendary card in the measured opening cohort; four searches yield 62.96%. Discovery quality is not a reward for high-level administrative competence alone.

**Recommendation:** tune Guild advancement separately from operative XP and money. Keep NPC levels 1–20 and floor-average squad level. Introduce diminishing *Guild XP* for established routine work and make important organizational accomplishments matter. A crew-level discount alone is insufficient: an advanced guild can hire appropriately leveled rookie squads and still farm low-level work. Guild relevance must consider the organization's development, not only the squad's relative level. Do not equate Guild Level 1–10 to NPC mission level 1–20 without a separate design decision.

### 2. Action surplus is real, and some existing activities are poor choices

With four PCs, the pool is nine actions at Guild Level 6 and thirteen at Level 10. One squad's search/acquisition/recon pipeline typically uses three; even a three-squad pipeline can use only seven before staffing, recovery and development choices. Ordinary-growth trials had median unused actions of five at Turn 16 and ten at Turn 30.

An action-utilization experiment ran 128 legal startup campaigns for 24 turns. Reserve-limited promotion filling averaged 1.953 promotions/month, versus zero in the leave-unused policy. Mean final treasury was 2,498 versus 5,039; 24/64 versus 14/64 ended in arrears. These are policy associations, not identical-dice causal effects, because additional actions change subsequent deterministic roll keys.

The default PC administrative modifiers stay **+10 forever**, while ordinary management DCs rise with `2 × Guild Level − 1`. At Guild Level 10, a Promote has expected Reputation **−0.85**, so five promotions cost 250 and average −4.25 Reputation. This is a browser fixture scaling problem, not a suitable intended PC advancement model. Optimize Facility is also weak: typical success saves only 1–4 asset-maintenance credits.

**Recommendation:** retain the shared action pool and actual PC skill checks in Foundry; give the browser an explicit advancing PC benchmark or character-level input before relying on late-game administrative odds. Add worthwhile multi-action activities and target-based attempt limits. No individual officer action cap. Passing remains legal; unused actions do not need to become spending obligations.

### 3. HQ relocation accidentally resolves missing-person consequences

Relocate Operations overwrites local Missing, Captured and Dead statuses with In Transit; the following Upkeep restores Available. Ordinary Transfer Personnel correctly rejects those statuses.

A natural-roll cohort from the authored Level-4 Expansion fixture had **41 Missing cases in 100 attempts; all 41 returned through normal HQ relocation**. A separately labeled synthetic fixture reproduced Captured and Dead restoration. The Expansion cohort is not startup affordability evidence.

**Fix:** move only physically present, eligible personnel and preserve absent/dead lifecycle states and assignment history. This is a correctness bug. A copied-engine economy rerun excluding this behavior still reached Level 10 in all 64 Free-Agent-growth runs, median 27 months, range 21–45, with four recoverable arrears cases and no ending arrears. Thus the bug matters, but is not the main progression explanation.

### 4. Standing Agreement and Trusted Client depend on acquisition order

Using Trusted first and then the Standing card grants two free acquisitions; the reverse order grants one. Old unaccepted Standing cards can also bypass a later turn's intended allowance.

**Fix:** use one explicit shared free-acquisition allowance, checked consistently when accepting any eligible card, including prior-turn cards. Preserve existing settled transactions; do not rewrite historical cash.

### 5. Development XP can be bought repeatedly across new assets

Same-asset duplicate guards work. However, every newly activated owned HQ/outpost grants 300 and every new installation grants 200, even if staff is paused. Distinct new properties provide new award opportunities without an organizational milestone limit.

An explicitly synthetic Level-4/100,000-credit fixture reached Level 10 in 11 completed months without contracts, spending 54,000. This demonstrates capital-to-XP conversion, **not** a legal startup speedrun.

**Recommendation:** first owned HQ, first staffed outpost and first funded operational facility of each category should be distinct guild milestones. Further copies should primarily provide capacity/services, with diminished or bounded Guild XP if repeated awards remain. Preserve XP already earned.

### 6. Personnel loss can still produce a genuine dead end

The ordinary cohort's censored seed 55 reached Level 6 at Turn 32, then stayed there through Turn 120: four Missing, only two viable crew, no cash and arrears 29,202. Three distinct phase leads are required, hiring is unaffordable and arrears block new loans. The lean economy cohort also had one irrecoverable startup loss.

The prototype lacks rescue/release procedures; Missing retained workers can keep billing retainers indefinitely. Existing debt accounting and principal/interest conservation passed targeted tests. Loan underwriting uses 30% of **gross** receipts, which can exceed a thin net operating margin.

**Recommendation:** add a visible rescue/continuity route and an explicit contract-release or suspension procedure, with costs and consequences. Do not treat relocation as the rescue mechanic or assume partial-arrears payments guarantee recovery. Keep distress meaningful without making a lost squad the end of all playable decisions.

## Recommended pacing experiment

Target approximately **48–72 months for ordinary competent play**, centered near 60. Treat it as a typical-play target, not a hard five-year wait. Clever operation should progress faster; the ten-month full-XP farm is too much.

The first rising-threshold candidate is:

| Reaching Guild Level | Additional XP | Cumulative XP |
| --- | ---: | ---: |
| 2 | 1,000 | 1,000 |
| 3 | 1,250 | 2,250 |
| 4 | 1,500 | 3,750 |
| 5 | 1,750 | 5,500 |
| 6 | 2,000 | 7,500 |
| 7 | 2,500 | 10,000 |
| 8 | 3,000 | 13,000 |
| 9 | 3,500 | 16,500 |
| 10 | 4,000 | **20,500** |

A static replay of ordinary earned-XP histories crosses this total at median **62 months** with initial Hero Points, or 59 with monthly manual resets. **That is a projection, not a changed-engine playtest:** lower Guild Levels would change actions, feat timing, development and discovery caps.

The isolated changed-engine speedrun test makes that limitation concrete. Two previously declared public-information policies, seeds 1–32, produced 63/64 Level-10 completions by 90 months, no errors. Median 21–24 months; fastest **18**, ending with 16,636 cash and no arrears. Only the isolated threshold/subtraction and harness accounting changed. Exact replay and conservation passed.

Consequently **do not implement this curve and claim five-year balance**. Use it as a starting experiment alongside routine-work Guild XP and nonrepeatable milestone rules, then run fresh integrated cohorts. Combining several slowdowns without another simulation could overshoot the target. Preserve the owner's favored 900-credit/110-credit paired economy initially; cash pay is not the primary lever for fixing XP pace.

## First-draft multi-action activities

These are concrete candidate cards, not adopted or live rules. Guild-level unlocks and costs need integrated testing after administrative scaling and progression are corrected.

| Activity / officer | Unlock | Shared actions | Draft effect and price |
| --- | ---: | ---: | --- |
| Launch a Sector Campaign / Command, Diplomacy | 3 | 2 | Pay 100; Reputation CF/F/S/CS −2/0/+5/+8. Once per guild/turn; replaces ordinary Promote that turn; no Guild XP. |
| Prepare an Operations Briefing / Operations, Computers | 3 | 2 | Pay 25 per assigned operative; CF −1 chosen phase, F none, S +1 circumstance to all three phases, CS +2 to all three. Locks squad/leads; uses the Recon preparation slot; highest circumstance only. |
| Run an Intensive Training Block / Personnel, funded instructor | 6 | 2 | Four trainees, six in a suite; 225 NPC XP each, 50 each materials plus ordinary trainer charges where applicable. Unavailable one month; once per operative per three turns; no chain multiplier. |
| Establish an Extraction Contingency / Operations, Medicine or Survival | 4 | 3 | Pay 25% of quoted squad wages, rounded up to 5. CF/F none; S one charge; CS two. A charge changes Missing to printed-severity Recovering or halves an Engagement repair. Missing has priority. One guild/job/turn; no change to phase success, payout or existing mandatory recovery. |

Training can accelerate the operative-to-contract feedback loop, so test it after the XP correction. Contingency is deliberately an investment in protecting experienced staff, not a guarantee of success. At Level-1 four-person wages it costs 110, more than an ordinary Normal repair; it becomes attractive for dangerous assignments and personnel-loss prevention.

At the opening Normal benchmark, without Hero Points, weighted completion is 82.92% with ordinary one-phase Recon versus 86.65% with proposed full briefing. This isolated enumeration demonstrates a measurable premium, not late-game observed balance. Existing higher circumstance bonuses can remove that premium.

### Participation and repetition

Reserve one shared action for each PC at Activity start. Each player can lead a one-action activity, contribute their action to a joint two/three-action activity, or pass. Relevant officer/skill leads the single roll; other contributors make concrete target, spending or contingency decisions. Allocate surplus afterward. This keeps every player involved without a second personal action budget.

Limit attempts by work: one public campaign/turn; one preparation/job; one morale program or recovery protocol/person/turn; one optimization/facility invoice. Repeating discovery should require another contact, sector or talent market, rather than rerolling unchanged facts. Multiple squads need access to multiple markets; a blind one-search-per-guild cap would strand a larger roster.

## Recommended next implementation order

1. Fix relocation lifecycle and the shared Standing/Trusted allowance with focused regressions.
2. Correct the browser's administrative scaling assumption; Foundry should read real actor skills.
3. Prototype the rising Guild XP curve, routine-work relevance and first-time operational milestones together; rerun ordinary and optimizer policies with all censoring reported.
4. Add the multi-action officer menu and per-target limits, preserving shared-player participation.
5. Add rescue/continuity and retained-worker suspension/release; check startup distress and debt-funded expansion again.
6. Human-playtest the revised curve before changing crew pay or redesigning the interface.

## Reproduction and limitations

See the bundle README for exact commands and source hashes. Current-rule startup campaigns, artificial fixtures, static threshold projections, manual Hero reset sensitivity, relocation-fixed economy runs and threshold-only counterfactuals are separately labeled. Full large generated histories can be regenerated from scripts; compact summaries and representative traces are committed.

No global optimum, final salary curve, published SF2e economic equivalence, five-year integrated balance, real-browser UX validation or Foundry compatibility is established here.


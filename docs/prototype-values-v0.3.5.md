# Prototype values: edition0.3.5

October12,2026. Implemented live-play feedback patch. [Play](https://contract-operations-playtest.primeangel2.chatgpt.site) · [Source](../prototypes/browser-playtest/README.md) · [Frozen values](../playtests/prototype-0.3.5/values.json) · [Verification](../playtests/prototype-0.3.5/verification.json).

Site source `e194b6eed5586f585f406342656b9b30ebfb4759`; deployment `appgdep_6acd0bd8239481919a399a5d544f3edc`, **succeeded**; version `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_e9b5736c60c48191843d6cf2368c6522`.

## Authority and published DCs

The user explicitly requested five contract bands, Legendary alone requiring3/3, different NPCs for all three checks, visible rolls including the third phase, and discussion before changing expansion/debt policy. This patch implements those requests. Naming and prototype prices remain refinable.

Both [SF2e GM Core, Difficulty Classes](https://2e.aonsrd.com/rules/702-difficulty-classes) and [PF2e GM Core, level-based DCs](https://2e.aonprd.com/Rules.aspx?ID=2629) were read. Their mission-level DC table matches the existing1–20 array. SF2e's adjustments and minimum-proficiency discussion are on the same page; PF2e's [difficulty adjustment rules](https://2e.aonprd.com/Rules.aspx?ID=2627&Redirected=1) match.

Use **mission Level DC + difficulty adjustment**, plus the retained undersized modifier where applicable. NPC actual skill modifiers and rank support remain separate, with highest-only circumstance bonuses. Do not replace the mission table with fixed10/15/20/30/40 proficiency DCs or use Guild Level for a mission's DC.

| Contract band | Successes | Difficulty adjustment | Level1 DC, four crew | Level1 base cash |
| --- | ---: | ---: | ---: | ---: |
| Easy | 1/3 | −2 | 13 | 450 |
| Normal | 2/3 | +0 | 15 | 600 |
| Hard | 2/3 | +2 | 17 | 1,440 |
| Expert | 2/3 | +5 | 20 | 2,100 |
| Legendary | 3/3 | +5 | 20 | 3,000 |

Cash still scales with mission-level ordinary wage, and oversize/overlevel discounts remain. These prices and our band-to-adjustment mapping are custom subsystem values, not published SF2e contract rewards.

Contract labels are distinct from skill ranks. New ordinary cards require a **Trained** lead in each listed phase skill; Easy permits Untrained. A specifically authored card may set a higher minimum per phase. A Legendary label alone does not require Legendary proficiency at low levels, consistent with published minimum-proficiency guidance.

Exclusive remains a deadline trait: its current offer is **Hard**,2/3,+2, premium cash and its existing mandatory recovery1. Essential phase objectives remain explicit card traits rather than silently disappearing.

## Three different phase leads

New deployments need **three to six crew**, recommended four, because each of the three phase leads must be a different squad member. The interface recommends a valid distinct assignment using actual skill eligibility; the engine rejects duplicate leads and missing qualifications before any mutation.

Automatic relevant support can still assist multiple phases without rolling. A squad leader is a separate role/feat and can also be one phase lead. This change does not add another mission check.

## Disclosed complications and additional rewards

Easy/Normal trigger on **Critical Failure only**. Hard/Expert/Legendary trigger on **Failure or Critical Failure**.

- Insertion: the lead requires a stated recovery duration on return.
- Engagement: charter transport damage creates a stated repair obligation in Events. No owned starship is assumed.
- Extraction: its lead can fail to return and become **Missing**, unavailable until a rescue adventure. There is no automatic permanent death or new automated rescue resolution.

Base severity1; Legendary2. Risky-tier Critical Failure doubles severity. Engagement costs ordinary mission wage ×severity (Easy/Normal use half wage). At Level1 this is25 for an Easy/Normal triggering critical failure,50/100 for a Hard ordinary/critical failure, and100/200 for Legendary. Consequences are deterministic authored phase effects, with no extra random complication roll.

Recovery sources use the longest applicable timer. Lead injury is separately authored recovery; passive Infirmary retains its existing reduction of generic phase-added squad recovery, and active medical care can reduce eligible returned personnel. Missing status is not cleared by generic recovery or next-turn timers.

All due client receipts still precede successful wages. Then repair obligations and roster consequences settle visibly. Actual cash cannot become negative; unpaid repairs become existing creditor-specific arrears. A successful2/3 contract may still incur a consequence from its failed phase.

Expert completion grants a level-appropriate **specialist referral**; Legendary also adds a **client contact**. Referral candidates expire at end of the next turn and still need normal hiring costs/action/onboarding. Cash, XP and additional rewards settle once.

## Roll visibility

Every administrative roll stores actor, turn, face, modifier, total, DC and degree. A persistent result panel and recent-roll table stay visible after modal closure and workspace changes; full chronological logs remain.

Mission checks show the same values. The next-phase button acknowledges the previous result before rolling; the third result waits for an explicit Continue. All three are retained in settlement and recent Operations log summaries, including consequences and completion outcome. No timer or automatic redirect hides Extraction.

## Migration and scope

Already-deployed contracts retain their prior wage quotes, DCs, completion requirements and consequence rules in an external rules snapshot. Their already-rolled results are never rerolled. This includes legacy duplicate leads; the new distinct-lead requirement applies to future deployments. Undeployed offers update to the new band description/rules. Existing cash, paid invoices, roster history and earlier outcomes remain.

**56 checks** and **48 deterministic campaigns over288 intervals** pass. New tests cover the published DC array, bands, distinct leads, rank eligibility, phase-review guards, ordinary/critical trigger differences, higher Legendary severity, noncash rewards, saved jobs and on-screen administrative/third-phase visibility. Real browser/visual QA remains unavailable because control-browser is not exposed.

The new Missing consequence provides a rescue hook; detailed rescue/death content remains future work. Full officer signatures, Reorganize Command, loans, sales and enforcement remain outside this focused patch.

## Financial feedback is discussion only

**No expansion lock, reserve spending restriction, starter-base price reduction or Normal payout increase is applied.** The user explicitly requested talking through that policy first.

[Balance discussion](expansion-balance-discussion.md) records a bounded8,000-roll opening-contract calculation and proposed900 Normal payout, staged Guild Level unlocks and reserve warnings. [Data](../playtests/prototype-0.3.5/opening-balance.json) and [reproduction script](../prototypes/browser-playtest/balance-check.cjs) distinguish facts from proposals. These are not a full campaign balance study.

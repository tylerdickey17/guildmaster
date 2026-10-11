# Integration regression walkthroughs: edition 0.2

Date: October 10, 2026. Source: [integration-rules-v0.2.md](integration-rules-v0.2.md).

These are deterministic, hand-authored procedure checks, not independent subagent simulations, probability estimates, numerical calibration, or observed live play. They exercise the adopted PASS procedures. Credits/XP/action-pool figures below are explicitly temporary fixtures.

## Shared fixtures

When needed: shared pool 3; each available officer capacity 2; baseline contract pay 900; total quoted squad wage 200; participation XP 100/person; completion bonus 50/person; Guild XP 200/completed job; training 100/block; illustrative consecutive bonus 10% per later block without compounding. None of these fixture amounts adopts a balancing value; officer capacity 2 is the already selected playtest baseline.

## Cases

| Case | Inputs / procedure | Expected result |
| --- | --- | --- |
| R01: Late recruitment | Candidates appear in Event Phase T; hire one in Activity T+1. | Offer was still valid; individual pending until Upkeep T+2. No forced same-night hiring and no premature deployment. |
| R02: Early hiring | Work the Network succeeds in Activity T; hire one immediately. | Two candidates shown, one action each for search and hiring. One officer can execute both with a pool of at least two. Recruit deploys T+1, other candidate remains until end T+1. |
| R03: Officer bottleneck | One officer, shared pool 3; search plus two hires proposed. | Search and first hire use that person's 2 capacity; second hire needs another officer. Pool alone does not authorize it. |
| R04: Appointment loop | Appoint a new NPC/promote an existing member in T; try to use their fresh capacity immediately. | Rejected; new officer capacity begins T+1. Role/custodian changes don't reset any capacity. |
| R05: Due income and bills | Opening 800; due client cash 900; squad pay 200; monthly obligations 1,000. | Cash 500 after all due settlement/obligations. Revenue precedes monthly bills; no double overhead, negative cash or false temporary-default ruling. |
| R06: Mixed phase success | Required count 2; Insertion Success, Engagement Failure, Extraction Critical Success. | Two successful phases. Completed only if Engagement is nonessential and no terminal result; otherwise failed. Failure consequence remains. Critical Success adds its effect, not a second success point. |
| R07: Failed job payment | Overall failure after actual attempt, wage quote 200; choose half pay. | Client cash 0; mercenaries participation XP only; Guild contract XP 0; pay 100; smaller Loyalty gain and separate Reputation loss. |
| R08: Unaffordable generosity | Treasury 50, fail-job quote 200; promise full pay. | No full-pay Loyalty award unless money actually arrives. Selecting an unpaid promise can't produce free Loyalty. |
| R09: Abort versus cancellation | Accept then cancel before departure; separately attempt Insertion then abort. | First: no participation XP. Second: failed-job participation, no completion awards, consequences/returns per card. No reused job identity rewards. |
| R10: New level and frozen wage | NPC reaches Level 5 from due contract; original quote 200. | Pay original quote; apply advancement/Leader Feat; next deployment gets new quote. Guild Level change waits to next turn for action/capacity benefits. |
| R11: Training continuation | Start T; complete block T+1 and immediately continue; complete second block T+2, then release. | XP 100 then fixture 110; no new action to continue; never Available between blocks; cannot deploy at T+1. Release at T+2 resets streak. |
| R12: Training interruption | Complete first block, interrupt second at day 15. | Keep first award; no second-block XP; streak ends. No half-block award invented. |
| R13: Officer personally instructs | Officer spends one action organizing own full-time cohort, then tries another unrelated action. | Start Full Commitment is final discrete action; second rejected. Staffed recurring instruction would leave a nonteaching initiating officer free for their second action. |
| R14: Recovery overlaps | Mission recovery 1 turn; failure adds 2 turns. | Recover 2 turns, not 3; no deployment/training. A separately disclosed required treatment remains a requirement. |
| R15: Captivity follow-up | Rival outcome due at T+1 captures an operative; later Standard rescue succeeds. | Visible Upkeep capture counts toward event minimum; Captured persists; rescue episode settles once with delegated rescue Loyalty and disclosed return/recovery. No rival squad rolls. |
| R16: Available return before Activity | Rival assignment returns safely in Upkeep. | Mercenary available for Activity; no second return/event award at end of turn. |
| R17: Relocation and sale | Transferable 2 removed in T, old property sold, destination slots reserved. | No origin benefit/value in sale, inactive for two intervals; completion T+2; occupied/reserved slot cannot hold another project. |
| R18: Manager lost | Transfer/expansion has one completed work interval; manager becomes unavailable. | Pause; preserve progress and ownership, no milestones/reward reset; qualified replacement permits future progress within shared project cap. |
| R19: Exclusive expiry | Exclusive offer declined; another accepted and deadline missed after actual effort. | Declined offer no failure penalty; accepted breach failure settlement. Standard/Priority form independent from exclusivity. |
| R20: Priority urgent rescue | Captured NPC story requires immediate party rescue with no Guild Actions left. | Adventure proceeds under explicit story exception; ordinary self-initiated Priority contract acquisition still costs an action. No extra Standard three-roll resolution. |
| R21: Collateral deficiency | Secured debt 2,000, sale 1,500, no transaction cost in fixture. | Apply proceeds, remaining debt 500; no guaranteed forgiveness or additional credit profit. |
| R22: Insolvency recovery | No current funding; agree creditor settlement, start cheaper funded operation, cure/restructure default. | No automatic guild/XP reset; only disclosed debt forgiven; state recovers when current obligations/default and next-interval funding plan are covered. |
| R23: Metrics/reward farming | Repeat same development, repair/reinstall asset, duplicate job, swap title. | No repeat milestone/job award or fresh officer actions; allowed leader+MVP stacking remains intact. |
| R24: Trained support | Three members, lead + Trained relevant supporter + Untrained relevant member. | Only second contributes automatic support; all count for size/participation. Same member may lead a later phase; no support check/fourth roll. |
| R25: Staff vacancy | Personnel Officer absent; available Contract Broker covers acting portfolio. | No extra capacity; still max 2 total. Ongoing staffed cohort continues; no automatic Reputation penalty from a title alone. |
| R26: Funding interrupted | Salary/rent unpaid, no qualified manager or program resources. | Automatic bookkeeping continues; unfunded affected new operations do not begin; projects/training pause or interrupt under their disclosed terms. |
| R27: Event response deadline | All actions spent; event asks for substantial project response. | Free choice now; project action next turn within disclosed window. No demanded retroactive action, no duplicate monthly budget. |
| R28: Simultaneous actions | Secure Financing in Commerce, then Activity initiatives. | Both consume same pool and executing-officer limit; reset only once. Normal repayment/withdrawal is not a financing action. |

## Reconciled ledgers

R05: 800 + 900 - 200 - 1,000 = 500.

R07 with opening 400 and no other costs: 400 + 0 - 100 = 300. Actual contractor payment drives the half-pay Loyalty outcome; loss of client Reputation remains.

R21: principal 2,000 - proceeds 1,500 = deficiency 500. Sale isn't both treasury revenue and full debt cancellation.

R11's 100/110 shows payout cadence only; it does not adopt 10% as the actual bonus.

## Verification scope

The workflow checks above are manual traces reviewed against PASS-001–011. A local verification script checks document links/IDs plus independently expressed accounting, action-budget, offer-window, completion-condition and training-streak cases. It is a temporary review aid, not module code or a general rules simulator.

No new six-agent rerun or broad balance simulation has been performed. The original 58 turns used older assumptions. Next tests should use this edition and transparent content fixtures, then compare acquisition-action versus free acquisition and observed workload.

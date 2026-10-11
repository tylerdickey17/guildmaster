# Prototype values: edition 0.3.2

October 10, 2026 (America/Chicago). This is the current live-play patch, incorporating the user's first browser-playtest feedback. It supersedes conflicting contract timing and oversized-squad DC adjustments in editions0.2–0.3.1. All other0.3.1 values and procedures remain in force. [Core values](../playtests/prototype-0.3.2/values.json) and [playable demo](https://contract-operations-playtest.primeangel2.chatgpt.site).

## Contract resolution during Events

**Confirmed user decision:** contracts resolve in the Events phase, rather than the following Upkeep.

Secure and deploy during Activity. A default one-turn Standard contract resolves during **Events of that same Guild Turn**, with the existing three phase checks. Resolve all due jobs and collect all successful client receipts before successful contractor payroll. Apply mercenary XP, recovery, Reputation and Loyalty/payment decisions; record Guild XP for that turn's Advancement. Finish failed-job pay and MVP choices, then handle the ordinary monthly Guild Event, then Advancement. Contract outcomes do not replace the monthly event.

Activity remains closed during Events: a successful squad cannot deploy again that turn, and unused Guild Actions do not reopen. Newly earned Guild Level capacity starts next turn. Longer authored contracts specify their due Events phase; a duration of N Guild Turns starting in T is due in Events T+N−1. Priority adventures still follow their authored adventure timeline, with settlement at the appropriate Events phase.

Training, onboarding, construction and recovery clocks stay in Upkeep. HQ rent and facility overhead remain in Upkeep, paid from cash already banked in prior Events. Successful wages and optional failed-job wages now settle in Events. This moves the failed-pay decision before the following routine bill, so players should budget for that bill when choosing wages.

No recovery means the squad can work in the next Activity. **One recovery turn occupies the entire following Guild Turn** unless a valid treatment reduces it: return in Events T, unavailable through Activity T+1, ready at Upkeep T+2. General ready boundary is T+1+recovery duration. Passive reductions still preserve mandatory card recovery. Medical treatment occurs during a subsequent Activity, after actual return.

The prototype Exclusive card must deploy and complete by the current Events phase; an accepted but undeployed Exclusive breaches its deadline there. Ordinary accepted contracts retain their disclosed deployment window and no automatic Reputation penalty for expiry.

## Extra personnel: circumstance bonus and smaller cash payout

**Confirmed user decision:** each operative above the recommended party count grants +1 circumstance bonus and diminishes the reward. **Designer-selected starting amount:** retain the existing10% client-cash reduction per extra operative.

For the default recommended four, maximum six:

| Deployed personnel | Size circumstance bonus on each phase | Client cash at recommended Squad Level |
| --- | ---: | ---: |
| 4 | +0 | 100% |
| 5 | +1 | 90% |
| 6 | +2 | 80% |

The extra-person contributions accumulate into **one** size circumstance bonus. With another circumstance bonus such as recon or a Leader Feat, use the highest bonus, rather than their sum. Applicable circumstance penalties still apply. Relevant automatic skill support remains the separate existing modifier with its existing cap.

Replace the old oversized-squad DC reduction with this bonus; never apply both. The earlier undersized-squad DC penalty remains +1 per missing operative, maximum+2. Deployment min/max, floor-average level, skill profiles and minimum Squad Level remain unchanged.

Cash multiplier remains `clamp(1 −0.10×max(0,actual size−recommended size) −0.10×max(0,Squad Level−recommended level),0.50,1.00)`. Pay actual deployed wages using frozen quotes. Reduce client cash only; participation/completion XP, Guild XP and Reputation remain their printed awards. Ten percent is a balancing value for playtesting, not a claimed user-selected percentage.

## Verification and saved games

The browser implementation passes23 automated checks plus48 deterministic smoke campaigns covering288 monthly intervals. Checks cover same-turn Events settlement, all receipts before wages, no early Guild capacity, full recovery timing, +1/+2 bonuses and90%/80% cash, highest-only circumstance stacking, saved-session migration and UI stage rendering in a minimal DOM.

Existing0.3.1 browser progress is migrated. Recorded rolls and already-frozen deployment quotes stay unchanged; new quotes use0.3.2. Legacy pending work is resolved through Events without duplicating the monthly event, bills or previously granted rewards. Work already returning at a legacy Upkeep keeps that return boundary for recovery timing.

Real browser visual QA remains unavailable. These are implementation checks, not human playtest results or a new numerical balance study. The earlier six-agent0.3.0 campaign evidence and0.3.1 targeted results remain historical; they have not been rerun as the full0.3.2 suite.

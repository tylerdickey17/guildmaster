# Prototype values: edition 0.3.3

October 11, 2026 (America/Chicago). Current live-play patch. This supersedes earlier officer action caps, fixed Guild Action schedules, starting PC officer count and failed-pay Loyalty values. Other [0.3.2](prototype-values-v0.3.2.md) rules remain in force. [Core values](../playtests/prototype-0.3.3/values.json); [browser demo](https://contract-operations-playtest.primeangel2.chatgpt.site).

## Failed-contract pay

These Loyalty changes are explicitly user-selected and apply to every participating mercenary after the failed job settles:

| Actual wages paid | Loyalty change |
| --- | ---: |
| Full agreed wages | +5 |
| Half agreed wages | 0 |
| No wages | −5 |

Only funded payments count. Failure still grants participation XP, awards no client payout or completion XP, and damages Reputation by the card's printed amount. Paying personnel affects Loyalty rather than offsetting public Reputation. Successful-contract wages follow their existing rule.

## One shared action pool

The user requested a baseline equal to the number of PCs so everyone at the table can take an action, and rejected the confusing overlap between shared actions and officer execution budgets. **Designer-selected implementation:** retain the shared pool and remove officer action caps. Officers provide skills, eligibility, availability and responsibility; they do not receive a personal action allotment.

**Prototype formula: Guild Actions = number of PC party members + Guild Level − 1.** Four PCs receive4/5/6/7/8/9/10/11/12/13 actions at Guild Levels1–10. The exact growth rate and use of Guild Level are designer-selected for testing, interpreting the user's unfinished level-plus suggestion; the party-size baseline and participation goal are explicit user requirements. NPC recruits or additional NPC officers never increase the PC count or manufacture Guild Actions.

At the table, first give every player the choice of one action or a pass. Then allocate the remaining shared actions together. This is the participation procedure, not a second budget or permanent one-action cap. Any eligible officer may lead additional actions while the shared pool has actions left. Action costs, skill requirements, funds and genuine availability still apply. An unavailable officer remains unable to act; removing a numerical cap does not remove Full Commitment or remote/local restrictions.

Reset the pool once at Budget using the Guild Level in force at the start of the turn. Earned Guild Levels add actions at the following Budget. Unused actions expire. The browser tracks actions led only as a record, and does not enforce player decision order; the facilitator gives each player their first choice before assigning repeats.

The browser defaults to four PCs and supports1–8 in New Playtest settings. PC count and hired mercenary count are separate. Its Guild Level remains capped at10, independently of PC level. More actions may accelerate growth compared with earlier numerical studies, so their action-crowding results are historical rather than predictions for this patch.

## Four starting PC officers

The user explicitly requested four starting officers, one per PC, using default SF2e character names. The demo uses **Navasi, Iseph, Dae and Chk Chk**, the four iconic heroes listed for Paizo's [Battle for Nova Rush](https://paizo.com/starfinder/2e/freeresources). Names/class labels come from that official page. Administrative portfolios and skill modifiers remain authored playtest fixtures; they are not copied pregenerated character sheets or mandatory builds for actual PCs.

Initial appointments are free. All four can lead basic actions using their actual skills, including untrained attempts where permitted. Trained actions retain their skill prerequisites. NPC officer hiring remains outside this focused demo.

## Verification and migration

Twenty-seven automated checks pass, including all three failed-pay outcomes and funded-payment rejection, four named officers each leading an action, repeated actions without an officer cap, party sizes1–8, Guild Level progression, old-save migration and a minimal DOM UI check. Forty-eight deterministic smoke campaigns cover288 monthly intervals and cash conservation. These checks verify implementation; they do not demonstrate human balance. Real browser visual QA remains unavailable.

Existing0.3.1/0.3.2 saves migrate to four PC officers and the new pool. During an open Activity, remaining actions are recalculated as the new pool minus recorded actions already spent that turn. Events and Advancement remain closed to new actions. Recorded mission rolls, frozen quotes, cash transactions and already-applied Loyalty outcomes are retained. New unresolved failed-pay decisions use +5/0/−5; past payments are not rewritten.

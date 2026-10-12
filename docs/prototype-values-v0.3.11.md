# Guildmaster prototype 0.3.11 — living roster and mission content

Published October12,2026 after the owner requested richer NPC identities and varied missions with lore before starting Foundry v0. The 0.3.10 progression, credit, action and phase-resolution rules continue; this release expands the generated content and available skill packages.

## NPC generation

The bundled generator uses the ten **SF2e Player Core ancestry labels** verified in [Archives of Nethys](https://2e.aonsrd.com/ancestries): Android, Barathu, Human, Kasatha, Lashunta, Pahtra, Shirren, Skittermander, Vesk and Ysoki.

Name banks and character prose are **original Guildmaster content**, inspired by different naming styles rather than copied official sample-name lists or third-party generator source. Human/android names, poetic barathu names, kasatha affiliation phrases and other ancestry-specific banks provide different flavors. These are selected naming defaults, not a claim that every member of an ancestry follows one rigid convention.

Every generated operative receives a unique full name, ancestry ID/label, call sign, origin, work history, personality, motivation, quirk and pronouns. Names use natural phrases instead of numbered copies. Collision handling retries the name combinations and, if needed, adds an authored operation-style alias. Names and personal details are stored on the operative; reloads do not reroll them.

Default ancestry selection draws all ten once per cycle to keep the roster varied. A recruit search can instead select a particular ancestry. Quantity, level and rarity still come from the existing four-degree discovery tables. Ancestry and skill role are independent; ancestry does not prescribe profession or add a new mechanical modifier.

The original four starter skill packages remain, with Vex/Briggs/Patch/Halo retained as call signs. New recruits use independently generated call signs. The six original skill roles are joined by Enforcer, Envoy, Surveyor, Cipher, Locksmith and Warden: **12 four-skill profiles**, each with two high and two moderate skills. Uncommon/Rare recruitment still adds one specialist skill. The existing profile d20 selects these twelve packages; the first eight have two die faces each and the last four one each. Future custom weighting can be reviewed during balancing.

Ancestry here is a character identity field in the streamlined mercenary system. Full ancestry feats, heritages, equipment and SF2e actor construction belong to the Foundry implementation.

## Mission catalog

The ten confirmed System B categories now each have three archetypes:

| Category | Archetypes |
| --- | --- |
| Bounty Hunting | Fugitive pursuit; digital manhunt; dangerous creature removal |
| Security | Convoy protection; witness protection; facility defense |
| Espionage | Covert data recovery; undercover infiltration; signal interception |
| Rescue | Disaster evacuation; hostage extraction; disabled-vessel rescue |
| Salvage | Wreck recovery; historical archive recovery; hazardous equipment salvage |
| Exploration | Frontier survey; ruin reconnaissance; anomaly reconnaissance |
| Smuggling | Contraband aid delivery; undocumented passage; restricted-device transfer |
| Sabotage | Surveillance disruption; hostile guidance disruption; targeted logistics disruption |
| Investigation | Communications investigation; disputed-claim investigation; unusual-incident investigation |
| Transport | Cargo delivery; specialist passage; sensitive-object transport |

Every new mission has a generated title, category/archetype, specific objective, compatible location/region, client/contact, local conditions, client history, lore hook and three phase objectives with their skill checks.

Content combines **30 archetypes, 90 objective choices, 90 base title patterns, 12 local sites, eight recurring clients/contacts, eight opposition entries, 400 two-word operation codes and 50 authored lore-hook templates**. Each archetype has its own hook plus two eligible category hooks. Some hooks insert the location. These are ingredients, not a claim that every mathematical combination is valid or equally likely. Location tags and selected explicit site lists avoid mismatched environments.

Most local setting details are original fiction centered on Station Meridian and its outer belt. A few origins/regions use familiar Starfinder places such as Absalom Station, Akiton, Bretheda, Castrovel, the Idari and Pulonis. [Skittermander](https://2e.aonsrd.com/ancestries/14-skittermander), [Barathu](https://2e.aonsrd.com/ancestries/8-barathu) and [Kasatha](https://2e.aonsrd.com/ancestries/10-kasatha) entries corroborate selected origins. Original clients, sites and mysteries are not presented as published Paizo canon.

Mission archetypes use a persisted thirty-entry shuffle bag. The next selection avoids the three most recent archetypes where the remaining bag permits; each full thirty-draw cycle uses all archetypes once. Title collisions across the saved board are resolved with another authored title/code combination rather than a numbered suffix.

Risk profile remains independent from category/archetype: every archetype can use Easy/Normal/Hard/Expert/Legendary or the deadline-bound Exclusive profile. Existing risk profiles still set DC adjustments, required successes, consequences and rewards. New archetypes deliberately vary the three skills, so matching the roster matters; preserving the numerical economy does not imply identical success odds for every new package.

The old escort/relay/cargo/etc. keys are compatibility adapters for fresh starter offers and existing workflows. Their printed skills are retained, but titles/locations/descriptions use the new content tables. Network discovery, Exclusive brokerage and Standing Agreement use the full archetype catalog. Standing Agreement keeps its known Helix Transit contact and the existing one-waiver rule.

Lore is **player-facing context**, not an extra roll, hidden price, guaranteed reward or rescue procedure for a specific Missing employee. The mechanical risk card remains separate. Open **Card details** for the dossier and per-phase objectives.

## Local generation and API research

A self-contained `dist/content.js` contains pure seeded generation and original tables. It runs in browser and Node without network calls, API keys, paid services or runtime AI.

Research found [Cuename's documented API](https://cuename.com/developers), with seeded procedural JSON generation, no API key and advertised commercial use of returned names. Direct searches for Starfinder/Shirren/Skittermander from this environment returned403, so neither endpoint operation nor exact SF2e ancestry coverage was validated. This is a limitation of this investigation, not a claim that the provider fails for every client.

[MUNA](https://github.com/ironarachne/muna) is an MIT-licensed name API documenting classic fantasy races; no verified SF2e ancestry catalog was found in the reviewed documentation. [Dungeonetics](https://dungeonetics.com/sfnames/) has a Starfinder-oriented web generator, but a supported API was not verified. [FantasyNameGenerators](https://www.fantasynamegenerators.com/contact.php) allows use of generated names while reserving its original generator content; no source or tables were copied.

**Designer choice:** ship the bundled generator for v0. An optional external provider can later feed names into the same saved identity fields; ordinary gameplay should remain usable offline. This satisfies the immediate content request without making Foundry sessions depend on a service whose ancestry coverage was not established here.

## Migration

- Existing default starter/numbered/referral identities gain generated names and personal details. Previous name and recognizable call sign are retained.
- Custom NPC names are preserved, including names beginning with an old profile nickname. Ancestry remains “Not recorded” when it was not supplied; migration does not guess a custom character's ancestry.
- NPC IDs, skills, levels, XP, status, employment, Loyalty, location, wages and financial state are retained.
- Default unaccepted live offers receive fresh descriptive content while keeping their old skills and client. Custom titles/prose or unknown clients are left alone.
- **Accepted/deployed/resolved jobs retain their original text and frozen quotes**, including prior names recorded in rolls. Historical settlements/logs are not rewritten.
- Content fields and shuffle-bag state persist; migration is idempotent.

Refresh to load the update. Existing progress migrates; New playtest → Staffed starter presents the full new opening experience.

## Validation

**128 checks passed**, including all existing finance/action/progression regressions and the288 campaign smoke intervals, plus:

- 2,000 generated NPCs without duplicate or numbered names;
- all ten ancestries across repeated balanced cycles, independently of skill profile;
- specific-ancestry recruitment with unchanged quantity/level/rarity dice;
- all30 archetypes used once per cycle across90 draws and no immediate cycle-boundary repeat;
- every archetype/risk-profile combination retaining its profile rules;
- public three-phase resolution of all30 archetypes with a matching specialist roster;
- reload/reproduction, content failure atomicity, actual0.3.10 pending-save migration and custom-name/client protection;
- minimal-DOM ancestry selection, full lore dossier and script loading order.

A separate seed42 content fixture generated **1,000 distinct mission titles**, all30 archetypes/all ten categories,148 distinct instantiated lore hooks, and2,004 distinct roster names including the four starters. It had no malformed template slots. This measures variety and generator correctness; it is not a legal startup or progression playtest.

The prior0.3.10 median48-month Level10 result remains historical evidence. New skills/profile availability can affect actual campaign outcomes and should receive human feedback. No new full progression estimate is claimed.

Real browser visual QA was unavailable because control-browser is not exposed. No Foundry compatibility test or module implementation is claimed.

## Publication and portable interfaces

- Live: https://contract-operations-playtest.primeangel2.chatgpt.site
- Site source: `be0e5b9110cda18d478fa582e388ceefa2ff8876`
- Deployment: `appgdep_6acd6a7a857881919335a18f344a0387`, **succeeded**
- Version: `appgprj_6acb0e7adc888191bb2947bb4077c061~appgver_54b9f5f2f488819180d80154a3cbdd04`
- [Source, content pack and tests](../prototypes/browser-playtest/README.md)
- [Verification, audit and sample dossiers](../playtests/prototype-0.3.11/README.md)

The content layer provides:

```javascript
identity(seed, stableKey, { ancestry, usedNames, callSign })
drawMission(remainingBag, seed, stableKey, recentArchetypeIds)
mission(seed, stableKey, archetypeId, { client, usedNames })
```

Foundry v0 can reuse these data/functions through an adapter, storing generated fields on actors/contracts and deck state on the guild. No AI integration is needed. Actual SF2e actor/proficiency mapping, documents, permissions and VTT interaction remain the next implementation phase.


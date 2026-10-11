# Session checkpoint: October11,2026

This handoff now includes the owner's follow-up playtests with their wife and the employment, officer-position and staffing discussions. Read [officers and staffing](officers-and-staffing.md) and [personnel employment](personnel-employment.md) for the later tabletop design, and [0.3.3](prototype-values-v0.3.3.md) for the implemented browser prototype.

## What exists

- [Private browser playtest](https://contract-operations-playtest.primeangel2.chatgpt.site), version0.3.3. Its [source and tests](../prototypes/browser-playtest/README.md) are preserved in GitHub.
- Contracts deployed in Activity resolve in the same turn's Events, before the ordinary monthly event and Advancement.
- Extra operatives above recommended count give +1 circumstance each. The retained prototype cash reduction is10% each; default five/six crew give +1/+2 and90%/80% base cash. Highest-only circumstance stacking and fixed XP remain.
- Failed-contract assignment wages change Loyalty full+5/half0/none−5, separately from Reputation.
- One shared action pool: PC count + Guild Level − 1, with no officer action caps. Four starting PC officers use Navasi, Iseph, Dae and Chk Chk; administrative statistics are scenario fixtures.
- Saved sessions retain previous rolls, frozen quotes and completed cash/Loyalty outcomes. Current Activity actions migrate using recorded expenditure.
- Last implementation verification:27 automated checks, including a minimal DOM smoke, and48 deterministic smoke campaigns spanning288 monthly intervals. Real browser visual QA was unavailable during construction. Earlier six-agent numerical studies remain historical and have not been fully rerun under0.3.3.

The implemented0.3.3 checkpoint is [commit056a2e1](https://github.com/tylerdickey17/sf2e-contract-operations/commit/056a2e19782d68552fd6d8ec8ab2142367257898). This documentation checkpoint records later discussion without changing that executable prototype.

## Owner playtest feedback

The user initially said the playtests were fun and the browser version worked well as a proof of concept. They subsequently reported running playtests with their wife and said the core gameplay loop seemed good. This is positive two-person human feedback, not a controlled balance study, complete system coverage or Foundry readiness. The earlier owner-only description is superseded by this later report.

The user wants to continue improving the playtest site and may begin work on the Foundry module in the next working session. This is a direction for follow-up, not a request to implement or publish the module during this checkpoint.

## Accepted since the last code update

Two employment models: **Free Agents** and **Retained Operatives**. Free Agents remain accessible regardless of Reputation tier and are nonexclusive. Higher Reputation opens recruitment of retained personnel, who work exclusively for the guild while their agreement is maintained. Retained personnel receive an ongoing retainer and reduced mission pay; free agents receive full assignment pay only.

**Retainers are overhead, paid at the start of every Guild Turn in Upkeep. Assignment wages resolve in Events when the mission resolves.** Full/half/no failed-job wages apply to assignment compensation; the retainer is a separate obligation. Loyalty continues to matter under both employment models. See the employment document for exact boundaries and unresolved values.

These employment rules are recorded but are not in browser0.3.3 yet.

## Officer and staffing design added later in this session

The user requested position-exclusive actions so each officer feels distinct, later specialist offices and outpost staff. They accepted a working draft with Commander, Operations, Quartermaster and Personnel as founding offices; Intelligence/Logistics/Diplomatic Liaison/Research at prototype Guild Levels 3/5/7/9; and an Outpost Chief plus facility-specific staff.

The full draft contains twelve founding signature concepts, twelve specialist success effects, qualifications and staffing/payment boundaries. The office responsibilities and staffing structure are accepted working design; numerical effects, unlock levels, full four-degree cards and salaries remain prototype/deferred work.

**Reorganize Command:** one shared Guild Action during Activity, once per Guild Turn, covers the entire reshuffle among existing PCs/appointed NPC officers. Assignments take effect immediately, each person holds one primary position and meets its requirements, no rearrangement credit fee applies, and hiring a new NPC remains separate. This supersedes free Upkeep switching and edition 0.2's role-change use of Appoint Officer.

Support staff enable ongoing services rather than receiving separate action menus. Each person covers one ongoing staff assignment; location-compatible actions are permitted, construction Full Commitment remains. NPC officer/staff pay is Upkeep overhead; retained personnel's agreement covers both roles without automatic duplicate billing.

See [officers and staffing](officers-and-staffing.md). These rules are saved, but not implemented in browser 0.3.3. Existing browser portfolios and unrestricted skill-based action access have not changed.

## Starting capital and overhead discussion

The2,000-credit treasury remains a **provisional starting value**. The user questioned its scale for PCs opening a guild around level3–4 and noted that the current browser lacks the full asset/location overhead model. The assistant recommended retaining2,000 for initial human testing, then revisiting after overhead and retainers are represented; the user has not explicitly locked that amount.

The budgeting comparison used the official character-wealth tables: PF2e level3/4 lump sums75/140 gp versus SF2e750/1,400 credits. This supports a rough10-credit-to-1-gp budgeting comparison, not a claim that every item has an identical exchange price. References: [PF2e Character Wealth](https://2e.aonprd.com/Rules.aspx?ID=2662) and [SF2e GM Core Rewards](https://2e.aonsrd.com/rules/722-rewards).

Current demo costs include150/month HQ rent and overhead for installed facilities; full property/location expenses and richer asset handling are outside its scope. Four level1 assignment wages total200, so a fully paid failed assignment plus base rent costs350 before other spending. Training all four costs150; a funded Training Suite costs600 including manager, and Infirmary1,400. These are custom prototype values, not official SF2e business prices.

The source of startup funds remains open: personal PC investment, an earned startup award, patron backing or another campaign arrangement. The existing rule allowing PC withdrawals remains in force; earmarking company cash alone does not remove its effect on adventuring treasure if withdrawn for gear.

## Next working session

Before implementation, finish officer action cards and resolve overlapping counterintelligence/logistics names. Define appointment and staff qualifications, salary quotes, vacancy handling and the fuller operating budget. Then add role gates, staffing and Reorganize Command to the browser alongside employment changes.

1. Choose prototype retainer and reduced assignment-pay values, recruitment access threshold, first-payment timing and missed-retainer consequences.
2. Add employment types and phase-separated pay to the browser, with clear quotes and upkeep costs.
3. Extend location/asset overhead and test the starting treasury against those recurring obligations. Preserve the ability to compare reserves against expansion spending.
4. Continue human playtests and collect exported notes; validate the new pay/overhead rules separately from the existing automated checks.
5. Consider beginning a small Foundry foundation: inspect the target Foundry/SF2e environment and supported APIs, define persistent guild/personnel/contract records, and build a first guild dashboard/turn ledger. Current v14 target and compatibility must be verified at implementation time. Expand automation after the relevant rules stabilize.

No new Site deployment, numerical simulation, Foundry manifest, module scaffold or scheduled automation is part of this documentation-only checkpoint.

## Subsequent Upkeep request and candidate checkpoint

The user requested a more meaningful and visible Upkeep phase, adding a base and expansions to the browser. Source inspection found existing150-inclusive rent and two buildable installations, but fresh games skip Upkeep and later invoices auto-settle.

[Upkeep and base playtest draft](upkeep-and-base-playtest.md) records a first-invoice review, visible base/slots, known-cost forecasts, three proposed facility quotes, ongoing specialist salaries, retained-worker candidate rates, service/obligation handling and migration acceptance checks. Candidate data is under playtests/prototype-0.3.4-candidate, separate from deployed values. Values are designer proposals; no user approval of individual rates is claimed.

**Blocked implementation:** the execution workspace is disconnected, and no shell/runtime tool is available. The Site source-helper, local editing/tests, packaging and publication could not run. GitHub remains accessible, so the design and arithmetic checkpoint is saved there. Live Site/code remains0.3.3; resume the supported workflow when execution is restored. This is a partial completion of the requested browser change, not a deployment claim.

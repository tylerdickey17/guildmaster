# Independent debt, distress and property probes

Frozen pack **0.3.0**, SHA-256 `5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d`. Reproduce with `python debt_property.py`; machine-readable evidence is `debt_property.json`. This agent did not change the pack or use root's simulator.

## Method and scope

Exact amortization and arithmetic bounds, authored stress cases, and **one seed7 monthly trace** using Python `random.Random(7)`. These are case-coverage probes, not Monte Carlo estimates: no population probability, confidence interval or cash quantile is claimed. The financial trace has twelve work intervals plus boundary13 to settle the final interval. Mission faces are independent uniform d20 draws, four degrees include natural1/20, and all three phases carry the stated consequences. Work begun at boundaryT returns at T+1. Four balanced mercenaries have relevant high leads and capped+3 support; one declared lead can cover all phases. The lead receives the single completion MVP bonus; none reaches Level5 in this trace. A replenished matched Standard offer deck is an explicit favorable override. It is authored before each deployment and does not change after seeing results.

The seed7 fixture is an **established Guild1**, not a new guild: two unpaid PC officers, four L1 mercenaries with750 openingXP,750 GuildXP,2,000 cash, and three historical600-credit client receipts qualify a new1,000-credit unsecured loan. The loan proceeds make opening cash3,000; payment starts one boundary later. It retains the starting150-credit lease. The policy acquires one Standard per interval when available, fully pays successes and pays half on failures. It recruits nobody, takes no project and makes no withdrawals. Officer/Guild capacity changes have no binding effect because the policy uses at most one acquisition action. The trace isolates cash timing and amortization, and omits the random event deck, morale actions and Loyalty updates. It therefore cannot establish sustainable whole-system balance. Story history sets starting Reputation0 despite prior receipts.

Financial distress probes separately freeze payroll/asset/loan fixtures and have zero client income. Payments are funded only with cash, with loan priority then lease. Loan interest continues on unpaid principal. No fees or new financing are invented. Failure-pay stress assumes four L1 operatives on authored repeated failed attempts,100 half-pay per interval until access ends; it is an expense/runway bound, not a physically simulated campaign or XP trajectory. A2,000 withdrawal is taken from opening3,000. After closure, the ledger records unresolved debt without pretending operations continue. The prior income that authorized the loan is deliberately not a forecast of the subsequent drought.

## Exact lending findings

| Loan | Monthly payment | Total paid over12 payments | Last payment |
| --- | ---: | ---: | ---: |
|1,470 secured at1% |131 |1,567.02 |126.02 |
|1,000 unsecured at2% |95 |1,134.09 |89.09 |
|5,000 secured at1%, arithmetic example only |445 |5,330.41 |435.41 |

The5,000 illustration is not assumed approved: it needs sufficient eligible collateral, cash receipts and a successful financing check. The engine uses exact fractional final payoff to reveal arithmetic; the pack needs a clear rounding policy for final interest/balances before live ledger use.

The secured cap is **70% of sale value**, and ordinary sale value is **70% of original cost**. Effective principal cap is therefore **49% of original cost**, not70%. A3,000 Field HQ realizes2,100 on sale and secures at most1,470. A6,000 Permanent HQ secures2,940. This is internally consistent conservative underwriting; describe the double haircut clearly so players can compare an offer.

The Field loan plus1,000 unsecured loan cost226/month. The30% test requires average actual client cash of **753.33/month**. Three600 receipts authorize at most180/month, so the combination is rejected even though each loan separately fits. With history `[600,0,0]`, the cap drops to60; no new95-payment loan fits. This limits stacking and automatically recognizes zeros. The unsecured gross principal cap is independent: Guild1 already borrowing1,000 has zero remaining unsecured principal room until the agreement interprets/paydowns its principal limit. Do not use booking a new loan to erase an uncured Default.

The service cap uses gross client receipts and is **not a solvency guarantee**. A600 monthly Standard receipt less200 wages,150 lease and one L3 outside officer salary175 leaves75 before debt, even though lender service allowance is180. A1,000 unsecured loan costs95: the operating result is then−20. The lender rule is plausible if borrower solvency and next-interval essential obligations remain a separate visible check, as edition0.2 requires. A permanent rule forbidding loans by personal intuition would be an unnecessary procedural change.

After two missed unsecured95 payments,1,000 principal grows to1,040.40 with2% interest. Scheduled arrears are190; paying190 immediately leaves850.40 principal, rather than adding the same190 again to that balance. This is an authored interest-accounting convention because the pack does not yet specify missed-interest capitalization. Write the ledger convention once to prevent double-counting principal/arrears in insolvency and cure calculations.

## Startup and property economics

Startup Field construction financed at maximum secured cap leaves `2,000 +1,470 −3,000 −100 manager =370` cash before other obligations. A disclosed signed600 Standard projection permits the131 debt payment under the startup exception. Once the lease ends, owned overhead75 plus131 debt is206/month, **56 more than the original150 lease during repayment**. Ownership improves long-run net assets but is not immediate cash relief. If the lease overlaps,150 rent+75 owned overhead+131 debt is356, before wages;370 reserves are thin. Construction beginsT and completesT+1, so both obligations depend on actual handover/lease terms and no benefit is granted early.

Secure Financing, Negotiate Property Deal and Commission Project consume all three Guild1 actions; an already signed accepted contract can deploy routinely, but acquiring a fresh projection contract in the same construction turn would need a fourth action. A ready advertised turnkey sale expressly skips Commission Project. Do not handwave this distinction in startup examples.

| Purchase | Lease saving after lease ends | Cash-only payback | Cost less ordinary resale / saving |
| --- | ---: | ---: | ---: |
|Field HQ3,000/75 overhead |75/month |40 months |12 months |
|Permanent HQ6,000/100 overhead |50/month |120 months |36 months |

These simple comparisons omit interest, managers, lease overlap and slot/mobile benefits. They are accounting bounds, not investment recommendations. The Permanent HQ is an expensive capacity purchase, and the prototype should say so rather than implying it makes a small guild solvent. A numerical sensitivity for an earlier accessible Field HQ is cost2,500 and overhead50: cash payback25 months and resale-net cost payback7.5 months, with secured cap1,225/payment109. Compared with current40/12 months, this changes ownership pacing substantially. **No such change was applied.** Keep current numbers initially if a slow ownership goal is intentional; compare that alternate in live play.

## Repairs, movement, collateral and project locks

| Operation using external manager | Cash outlay | Project turns | Guild1 consequence |
| --- | ---: | ---: | --- |
|Damaged Training Suite repair |300 |1 |Uses sole project slot and1 action; earns0 GuildXP |
|Offline Training Suite repair |500 |1 |Same lock; no benefit during work |
|Training Suite Transferable1 |200 |1 |Destination slot reserved; no transit benefit |
|Infirmary Transferable2 |320 |2 |No recovery reduction until installed |
|Suite+Infirmary coordinated manifest |420 |2 overall |One manager and project; two reserved destination slots, individual activation clocks |

These costs assume one100/month external manager, not a free PC's committed time. A PC manager removes the cash fee but still supplies a qualified commitment and the project's capacity. In Guild1, starting an upgrade while a two-turn transfer occupies the sole slot is unavailable even with a spare action. At Guild4, two independent projects require two qualified managers. A Damaged Training Suite already has ordinary cohort cap4, so the300 repair only restores cap6; its value is low for a four-person roster. Do not automatically repair every damage event. Relocation and repairs cannot become repetitive GuildXP farms.

Under ordinary fixed sale values and zero fees, prompt repossession of a maximally secured Infirmary after two missed1% payments has599.82 outstanding against840 sale proceeds, leaving240.18 surplus. **It produces no deficiency.** To verify the deficiency rule, a separately disclosed300 selling-fee sensitivity leaves540 net proceeds and59.82 debt. That fee is not in the baseline pack and is not a hidden event. With current49% effective LTV and rapid repossession, deficiencies are normally rare; that is acceptable protective collateral design, not an omission to fix by silently lowering sale prices. Do not count a pledged asset's entire840 toward free cash or insolvency assets while also retaining the whole loan as if both were spendable.

Lease access ends at the second uncured boundary after notice at the first. Access is not equivalent to destroying installed upgrades or cancelling their debts. A two-turn Infirmary transfer must start while origin access and a destination slot are available; after immediate access loss it cannot be assumed moved retrospectively. Rescue likewise uses real timing and funding: a delegated L1 rescue with authored zero client payout and full200 wages plus150 lease consumes350 even if it earns other rewards. An external rescue reward or waived wage needs an explicit card/agreement.

## Seed7 receipt-before-bills trace

| Boundary | Prior job | Client cash | Wages | Lease | Loan paid | End cash | Displayed Guild Level |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
|1 |— |0 |0 |150 |0 |2,850 |1 |
|2 |Completed |600 |200 |150 |95 |3,005 |2 |
|3 |Failed |0 |130 |150 |95 |2,630 |2 |
|4 |Completed |780 |260 |150 |95 |2,905 |2 |
|5 |Completed |780 |260 |150 |95 |3,180 |2 |
|6 |Failed |0 |130 |150 |95 |2,805 |2 |
|7 |Completed |780 |260 |150 |95 |3,080 |2 |
|8 |Completed |780 |275 |150 |95 |3,340 |3 |
|9 |Completed |960 |320 |150 |95 |3,735 |3 |
|10 |Completed |960 |320 |150 |95 |4,130 |3 |
|11 |Completed |960 |340 |150 |95 |4,505 |3 |
|12 |Failed |0 |170 |150 |95 |4,090 |3 |
|13 |Completed |1,200 |400 |150 |89.09 |4,650.91 |4 |

Nine completions and three failures; this particular seed contains no critical-failure recovery interval. New capacity applies next turn, and would not change this one-action policy. Rising wages are actual level-based departure quotes, not retroactive charges. Higher matched offers reflect an authored favorable board; the ledger never upgrades a deployed card. GuildXP carries over; final XP is3,750 for the lead and3,300 for each other mercenary. The final boundary includes the lease for the preceding interval, preventing cash from being inflated by omitting the last bill. This demonstrates correct funded settlement in one path and does **not** imply a75% population success rate.

## Distress probes and recommendations

At zero income,3,000 opening cash pays eleven95 loan payments,89.09 final payoff and twelve150 rent payments, leaving65.91. With no unpledged assets, funded restructuring or new approved financing, that remaining cash cannot cover the next essential150 rent, so insolvency evaluation can precede an actual missed payment. A fresh new guild cannot acquire the unsecured loan from no income history; this case deliberately begins with qualifying historical receipts.

A2,000 withdrawal leaves1,000. Loan-first funding leaves20 after four intervals. Both obligations become Delinquent at5, loan becomes Default and landlord access ends at6. Paying100 half-wages each failed-job interval instead exhausts safe reserves sooner: lease miss9, lease ends10, loan misses10 and reaches Default11. No waived failed-pay remainder becomes an arrear. These are authored deterministic stress outcomes, not frequencies. A13-month rent runway from bare2,000 with no operations shows that distress is driven much more by funded assignments, projects, hiring and withdrawals than by starting rent alone.

Recommended first changes are **clarifications, not silent rebalancing**: show49% effective collateral cap; publish final-payoff rounding and missed-interest/arrears accounting; present ownership as asset/capacity progression with a visible transition budget; make creditor/landlord notice, net asset realization and the separate borrower-solvency check explicit. Numerically test Field HQ2,500/50 overhead only if ownership is intended within the first year. Preserve the current two-boundary default clock until live sessions show whether intervention time is sufficient. Simulations cannot judge how stressful or enjoyable it feels.

"""Paired new-guild campaign probes. Run with Python 3; no third-party packages."""
import inspect
import json
import math
from pathlib import Path
import statistics
import simulator as sim

EXPECTED = "5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d"
assert sim.PACK_HASH == EXPECTED
HERE = Path(__file__).resolve().parent
N = 2000

# This limited-board fixture derives the same ledger/policy from the frozen root
# engine. All cards are fixed Level 1 BEFORE deployment. Saturated and limited
# comparisons below BOTH use that Level 1 deck, avoiding moving target difficulty.
# Expiring offers are countable; each search uses a separate keyed RNG domain.
source = inspect.getsource(sim.campaign)
source = source.replace("def campaign(", "def board_campaign(", 1)
source = source.replace("promotions=True):", "promotions=True, limited_board=True):", 1)
source = source.replace("candidates=[]; jobs=[]; cohorts=[]; trace=[]", "candidates=[]; jobs=[]; cohorts=[]; trace=[]; offers=[2,2]; contract_searches=0")
source = source.replace("available=[m[\"id\"] for m in roster if not m[\"inactive\"] and m[\"available\"]<=t]\n        if t<=turns:", "available=[m[\"id\"] for m in roster if not m[\"inactive\"] and m[\"available\"]<=t]\n        offers=[expiry for expiry in offers if expiry>=t]\n        if t<=turns:", 1)
source = source.replace("while len(available)>=4 and remaining>=acquisition_cost:\n                ids=", """while len(available)>=4 and remaining>=acquisition_cost:
                if limited_board and not offers:
                    if not remaining:
                        break
                    spend(1,"Work the Network: contracts")
                    contract_searches+=1
                    count=degree(keyed_face(seed,"contract_search",t,contract_searches),10,15)
                    offers.extend(t+1 for _ in range(count))
                    if not offers or remaining<acquisition_cost:
                        break
                if limited_board:
                    offers.pop(0)
                ids=""", 1)
source = source.replace('r=mission(levels,faces,kind=kind,profile=profile)', 'r=mission(levels,faces,kind=kind,profile=profile,recommended_level=1)', 1)
source = source.replace('"trace":trace}', '"contract_searches":contract_searches,"trace":trace}', 1)
namespace = vars(sim).copy()
exec(compile(source, __file__ + "::board_fixture", "exec"), namespace)
board_campaign = namespace["board_campaign"]

def summarize(results):
    for r in results:
        # Accounting invariant and boundary uniqueness, not a copy of the roll code.
        assert r["cash_end"] == (2000 + r["receipts_total"] - r["wages_paid_total"]
                                 - r["overhead_paid_total"] - r["hiring_cost_total"]
                                 - r["training_cost_total"] - r["promotion_cost_total"])
        assert r["trace"][-1]["boundary"] == 13 and r["trace"][-1]["actions_used"] == 0
        assert len(r["trace"]) == 13
        for row in r["trace"]:
            ids=[i for settlement in row["settlements"] for i in settlement["ids"]]
            assert len(ids) == len(set(ids)), "An operative resolved more than one one-turn assignment"
    flags = sum(r["ever_arrears"] for r in results)
    output = {"n":len(results), "ever_arrears_count":flags,
              "ever_arrears_rate":flags/len(results), "ever_arrears_wilson95":sim.wilson(flags,len(results)),
              "cash_quantiles":sim.quantiles([r["cash_end"] for r in results])}
    for key in ["cash_end","arrears_end","deployed","completed","failed","actions_used",
                "unused_executable","blocked_squad_turns","hires","searches","training_blocks",
                "guild_level","reputation","receipts_total","wages_paid_total","training_cost_total",
                "promotion_cost_total","hiring_cost_total","contract_searches"]:
        if key in results[0]:
            output["mean_"+key] = statistics.mean(r[key] for r in results)
    output["seed7_trace"] = results[7]["trace"]
    return output

def paired(paid, free):
    output={}
    for key in ["cash_end","deployed","completed","actions_used","training_blocks","reputation"]:
        differences=[b[key]-a[key] for a,b in zip(paid,free)]
        avg=statistics.mean(differences)
        half=1.95996398454*statistics.stdev(differences)/math.sqrt(len(differences))
        output[key]={"mean_free_minus_paid":avg,"paired_mean_normal95":[avg-half,avg+half],
                     "quantiles":sim.quantiles(differences)}
    return output

def main():
    results={}; pairs={}; full={}
    variants={
        "high_start4":dict(profile="high",initial_mercs=4),
        "high_start6":dict(profile="high",initial_mercs=6),
        "moderate_start4":dict(profile="moderate",initial_mercs=4),
        "high_officer_cap1":dict(profile="high",initial_mercs=4,officer_capacity=1),
        "high_no_promotions":dict(profile="high",initial_mercs=4,promotions=False),
    }
    for scenario, options in variants.items():
        for cost in [1,0]:
            key=scenario+("_paid" if cost else "_free")
            full[key]=[sim.campaign(seed=s,acquisition_cost=cost,**options) for s in range(N)]
            results[key]=summarize(full[key])
        pairs[scenario]=paired(full[scenario+"_paid"],full[scenario+"_free"])
    for limited in [False,True]:
        label="fixed_level1_"+("limited" if limited else "saturated")
        for cost in [1,0]:
            key=label+("_paid" if cost else "_free")
            full[key]=[board_campaign(seed=s,acquisition_cost=cost,limited_board=limited) for s in range(N)]
            results[key]=summarize(full[key])
        pairs[label]=paired(full[label+"_paid"],full[label+"_free"])
    output={"pack_hash":sim.PACK_HASH,"seeds":{"start":0,"end":N-1},"months":12,
            "terminal_settlement_boundary":13,"campaigns":N*len(results),
            "results":results,"paired_comparisons":pairs,
            "derived_board_fixture_source":source}
    (HERE/"new_guild_ab.json").write_text(json.dumps(output,indent=2)+"\n")
    for key,result in results.items():
        print(key, "cash",round(result["mean_cash_end"],2), "q",result["cash_quantiles"],
              "jobs",round(result["mean_deployed"],3),"breach",result["ever_arrears_count"],
              "training",round(result["mean_training_blocks"],3),"rep",round(result["mean_reputation"],3))
    print("paired", json.dumps(pairs,indent=2))

if __name__ == "__main__":
    main()

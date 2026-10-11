"""Meaningful numerical/ledger checks; run python verify.py from any directory."""
import itertools
import json
from simulator import V, PACK_HASH, campaign, cash_multiplier, degree, exact_mission, mission, wage

checks = []
def check(name, condition):
    assert condition, name
    checks.append(name)

check("frozen pack hash", PACK_HASH == "5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d")
check("published wage examples", [wage(l) for l in [1,5,10,15,20]] == [50,120,375,1135,3470])
check("natural20 raises failure only one degree", degree(20,-10,15)==2)
check("natural1 lowers success only one degree", degree(1,20,15)==1)
check("critical thresholds inclusive", degree(10,15,15)==3 and degree(5,0,15)==0)
check("criticalsuccess counts once", not mission([1]*4,[20,2,2],kind="demanding")["success"])
check("squad level floor", mission([5,1,1,1],[10]*3)["squad_level"]==2)
check("client multiplier capped", cash_multiplier([1,1],20)==1.5 and cash_multiplier([20]*6,1)==.5)
check("support high rank capped not duplicated", mission([20]*4,[1,1,1],recommended_level=20)["degrees"]==[1,1,1])
check("ordinary phase failure need not force recovery", mission([1]*4,[5,15,15])["recovery"]==0)
check("critical failure recovery max not sum", mission([1]*4,[1,1,1],kind="demanding")["recovery"]==1)
check("Essential Engagement denies unachieved rescue", mission([1]*4,[20,2,20],essential=1)["success"]==False)
r = exact_mission([1]*4)
check("independent agent oracle success", r["success_probability"]==.878625)
check("exact exhaustive probability mass", sum(r["successful_phase_counts"])==8000)
for seed in [0,7,42,99]:
    for cost in [0,1]:
        c=campaign(seed=seed,acquisition_cost=cost)
        check(f"cash conservation seed{seed} cost{cost}", c["cash_end"]==2000+c["receipts_total"]-c["wages_paid_total"]-c["overhead_paid_total"]-c["training_cost_total"]-c["promotion_cost_total"]-c["hiring_cost_total"])
        check(f"nonnegative cash and bills seed{seed} cost{cost}", all(t["cash"]>=0 and t["arrears"]>=0 for t in c["trace"]))
        check(f"capacity at starting level seed{seed} cost{cost}", all(t["actions_used"]<=min(t["pool"],t["officer_capacity"]) for t in c["trace"]))
        check(f"one final settlement no extra actions seed{seed} cost{cost}", len(c["trace"])==13 and c["trace"][-1]["actions_used"]==0 and c["overhead_paid_total"]==1800)
        for turn in c["trace"]:
            deployed=[i for j in turn["settlements"] for i in j["ids"]]
            check(f"no repeated sameinterval job seed{seed} cost{cost} turn{turn['boundary']}",len(deployed)==len(set(deployed)))
print(json.dumps({"passed":len(checks),"checks":checks,"pack_hash":PACK_HASH},indent=2))

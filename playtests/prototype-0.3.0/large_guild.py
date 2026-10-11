"""Independent established/large campaign experiment; frozen prototype 0.3.0.

Run from any directory: python large_guild.py. Standard library only.
The common keyed SHA256 draws in simulator.py pair capacity/acquisition variants.
This experiment never mutates values.json or simulator.py.
"""
import json
from pathlib import Path
import simulator as S

HERE = Path(__file__).resolve().parent
EXPECTED_HASH = "5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d"
N = 2000

SCENARIOS = {
    "established": {"initial_guild_level":4,"initial_merc_level":5,"initial_mercs":8,
                    "treasury":10000,"base_overhead":350},
    "large": {"initial_guild_level":8,"initial_merc_level":10,"initial_mercs":16,
              "treasury":50000,"base_overhead":800},
}

def run_case(scenario, officers=2, capacity=2, acquisition=1, profile="high", kind="standard", strategic=False):
    fixture = SCENARIOS[scenario]
    args = {k:v for k,v in fixture.items() if k != "base_overhead"}
    # First two officers are PCs with no salary. Additional officers are NPCs.
    monthly_salary = max(0,officers-2)*(100+25*fixture["initial_merc_level"])
    args.update(officers=officers, officer_capacity=capacity, acquisition_cost=acquisition,
                monthly_overhead=fixture["base_overhead"]+monthly_salary,
                target_roster=fixture["initial_mercs"], training=strategic, promotions=strategic,
                profile=profile, kind=kind, turns=12)
    observations=[]
    trace=None
    for seed in range(N):
        c=S.campaign(seed=seed,**args)
        if seed == 7: trace=c
        observations.append({k:c[k] for k in (
            "cash_end","arrears_end","ever_arrears","guild_level","guild_xp",
            "completed","failed","deployed","actions_used","unused_executable",
            "blocked_squad_turns","reputation","receipts_total","wages_paid_total",
            "training_blocks","training_cost_total","promotion_cost_total")})
    means={k:sum(o[k] for o in observations)/N for k in observations[0] if k != "ever_arrears"}
    count=sum(o["ever_arrears"] for o in observations)
    return {"scenario":scenario,"officers":officers,"officer_capacity_each":capacity,
            "acquisition_cost":acquisition,"profile":profile,"contract":kind,
            "strategic_spending":strategic,"additional_npc_salary_per_month":monthly_salary,
            "monthly_overhead_total":args["monthly_overhead"],"trials":N,"seeds":"0..1999",
            "means":means,"cash_quantiles":S.quantiles([o["cash_end"] for o in observations]),
            "arrears_probability":count/N,"arrears_wilson95":S.wilson(count,N),
            "trace_seed7":trace}

def main():
    assert S.PACK_HASH == EXPECTED_HASH
    cases=[]
    for scenario in SCENARIOS:
        for officers in (2,3,4):
            for capacity in (1,2):
                for acquisition in (1,0):
                    cases.append(run_case(scenario,officers,capacity,acquisition))
    # One policy sensitivity: surplus-action training and reputation promotion.
    cases.append(run_case("established",2,2,1,strategic=True))
    cases.append(run_case("large",3,2,1,strategic=True))
    # More difficult/ordinary staffing sensitivities with the default headcounts.
    cases.append(run_case("established",2,2,1,profile="moderate"))
    cases.append(run_case("large",3,2,1,profile="moderate"))
    cases.append(run_case("established",2,2,1,kind="demanding"))
    cases.append(run_case("large",3,2,1,kind="demanding"))
    capacity_table=[{"guild_level":level,"pool":S.V["guild_actions"][level],
                     "officers_needed_cap2":(S.V["guild_actions"][level]+1)//2,
                     "officers_needed_cap1":S.V["guild_actions"][level]}
                    for level in range(1,11)]
    exact_recovery={f"L{level}_{kind}":S.exact_mission([level]*4,kind=kind)
                    for level in (5,10) for kind in ("standard","demanding")}
    # Discrete authored bottleneck probe. Four squads are unavailable at boundary
    # T+1 after recovery-triggering critical failure; all return at T+2.
    recovery_probe=S.mission([10]*4,[1,10,10],kind="standard")
    output={"experiment":"established_large_capacity","pack_hash":S.PACK_HASH,
            "horizon":"12 management turns plus terminal boundary settlement",
            "trials_per_case":N,"case_count":len(cases),"campaigns_total":N*len(cases),
            "capacity_table":capacity_table,"exact_recovery":exact_recovery,
            "recovery_probe":recovery_probe,"cases":cases}
    (HERE/"large_guild.json").write_text(json.dumps(output,indent=2)+"\n")
    print(json.dumps({"case_count":len(cases),"campaigns":N*len(cases),
                      "baseline_established":cases[2]["means"],
                      "baseline_large":cases[18]["means"]},indent=2))

if __name__ == "__main__":main()

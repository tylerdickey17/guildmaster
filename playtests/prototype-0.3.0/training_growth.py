#!/usr/bin/env python3
"""Independent progression experiment for frozen 0.3.0; standard-library only."""
import hashlib, itertools, json, math, random
from functools import lru_cache
from pathlib import Path

HERE=Path(__file__).resolve().parent
VALUES=HERE/'values.json'
V=json.loads(VALUES.read_text())
PACK_HASH=hashlib.sha256(VALUES.read_bytes()).hexdigest()
assert PACK_HASH=='5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d'

def degree(face, modifier, dc):
    diff=face+modifier-dc
    result=3 if diff>=10 else 2 if diff>=0 else 0 if diff<=-10 else 1
    return max(0,min(3,result+(1 if face==20 else -1 if face==1 else 0)))

def rank(level):
    return 1 if level<5 else 2 if level<9 else 3 if level<17 else 4

def resolve(faces, modifier, dc):
    persistent=0; next_effect=0; successes=0; recovering=False
    for face in faces:
        d=degree(face,modifier+persistent+next_effect,dc)
        successes+=d>=2
        next_effect=0
        if d==0:
            persistent-=2; recovering=True
        elif d==1: next_effect=-1
        elif d==3: next_effect=1
    return successes>=2,recovering

@lru_cache(maxsize=None)
def exact(level=1,lead_level=None,support=3):
    mod=V['skill_high'][lead_level or level]+support
    dc=V['level_dc'][level]
    out={(s,r):0 for s in (False,True) for r in (False,True)}
    for faces in itertools.product(range(1,21),repeat=3):
        out[resolve(faces,mod,dc)]+=1
    return {f'{int(s)}{int(r)}':n/8000 for (s,r),n in out.items()}

def training(base=150,streak=.1,horizon=24):
    xp=0; trace=[]; first_level5=None
    for turn in range(1,horizon+1):
        # Decimal-safe percentage arithmetic, including the pack's integer floor.
        bonus=min(round(streak*(turn-1),8),.5)
        block=math.floor(base*(1+bonus)+1e-9)
        xp+=block
        lvl=min(20,1+xp//1000)
        if lvl>=5 and first_level5 is None:first_level5=turn
        trace.append({'interval':turn,'block_xp':block,'total_xp':xp,'level':lvl,
                      'cohort_training_cost':150,'cost_including_lease':300})
    if first_level5 is None:
        future_xp=xp
        for turn in range(horizon+1,101):
            future_xp+=math.floor(base*(1+min(round(streak*(turn-1),8),.5))+1e-9)
            if future_xp>=4000:
                first_level5=turn;break
    return {'base':base,'streak':streak,'level5_interval':first_level5,
            'xp_12':trace[11]['total_xp'],'level_12':trace[11]['level'],
            'xp_24':trace[23]['total_xp'],'level_24':trace[23]['level'],
            'trace':trace}

def campaign(seed,horizon=24,guild_award=250,mvp_policy='concentrated'):
    xp=[0]*4; levels=[1]*4; guild_xp=0; rest=0; jobs=0; wins=0
    first_level5=None; first_guild5=None; trace=[]
    for turn in range(1,horizon+1):
        before=list(levels)
        if rest:
            rest-=1
            row={'interval':turn,'activity':'recover','levels_before':before,
                 'levels_after':levels.copy(),'guild_level':min(10,1+guild_xp//1000)}
        else:
            jobs+=1
            squad_level=sum(levels)//4
            lead=max(range(4),key=lambda i:(levels[i],xp[i],-i))
            support=min(3,sum(rank(levels[i]) for i in range(4) if i!=lead))
            # Turn-keyed randomness keeps exogenous faces paired across policies.
            digest=hashlib.sha256(f'training-growth:{seed}:{turn}'.encode()).digest()
            rng=random.Random(int.from_bytes(digest[:8],'big'))
            faces=[rng.randint(1,20) for _ in range(3)]
            success,recovery=resolve(faces,V['skill_high'][levels[lead]]+support,
                                     V['level_dc'][squad_level])
            appointed_leader=lead if levels[lead]>=5 else None
            increments=[100+(150 if success else 0)]*4
            mvp=(0 if mvp_policy=='concentrated' else wins%4) if success else None
            if success:
                wins+=1; guild_xp+=guild_award
                increments[mvp]+=50
                if appointed_leader is not None:increments[appointed_leader]+=50
            for i in range(4):
                xp[i]+=increments[i]
                levels[i]=min(20,1+xp[i]//1000)
            if first_level5 is None and max(levels)>=5:first_level5=turn
            if first_guild5 is None and guild_xp>=4000:first_guild5=turn
            rest=int(recovery)
            row={'interval':turn,'activity':'mission','faces':faces,
                 'recommended_level':squad_level,'lead':lead,'levels_before':before,
                 'success':success,'recovery_next_interval':recovery,
                 'xp_increment':increments,'levels_after':levels.copy(),
                 'guild_level':min(10,1+guild_xp//1000)}
        row['xp']=xp.copy();row['guild_xp']=guild_xp
        trace.append(row)
    return {'levels':levels,'guild_level':min(10,1+guild_xp//1000),
            'jobs':jobs,'wins':wins,'first_level5':first_level5,
            'first_guild5':first_guild5,'trace':trace}

def q(xs,p):return sorted(xs)[max(0,math.ceil(p*len(xs))-1)]
def wilson(hits,n):
    z=1.95996398454;p=hits/n;den=1+z*z/n
    center=(p+z*z/(2*n))/den
    half=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/den
    return [center-half,center+half]

def sample_summary(horizon,guild_award,policy,n=10000):
    results=[campaign(seed,horizon,guild_award,policy) for seed in range(n)]
    out={'horizon_intervals':horizon,'guild_xp_award':guild_award,'mvp_policy':policy,
         'samples':n,'seeds':[0,n-1]}
    for name,f in [('guild_level',lambda r:r['guild_level']),
                   ('max_npc_level',lambda r:max(r['levels'])),
                   ('min_npc_level',lambda r:min(r['levels'])),
                   ('jobs',lambda r:r['jobs']),('wins',lambda r:r['wins'])]:
        xs=[f(r) for r in results]
        out[name]={'mean':sum(xs)/n,'p10':q(xs,.1),'p50':q(xs,.5),'p90':q(xs,.9)}
    for name,f in [('any_leader',lambda r:max(r['levels'])>=5),
                   ('guild5',lambda r:r['guild_level']>=5)]:
        hits=sum(f(r) for r in results)
        out[name]={'hits':hits,'proportion':hits/n,'wilson95':wilson(hits,n)}
    attained=[r['first_level5'] for r in results if r['first_level5'] is not None]
    out['conditional_first_leader_median']=q(attained,.5) if attained else None
    return out

def main():
    # Oracle/unit probes are independent from root's engine.
    assert degree(20,0,40)==1 and degree(1,50,15)==2
    assert degree(5,0,15)==0 and degree(15,0,15)==2
    t=training()
    assert [r['block_xp'] for r in t['trace'][:7]]==[150,165,180,195,210,225,225]
    assert [rank(l) for l in [4,5,8,9,16,17]]==[1,2,2,3,3,4]
    out={'pack_hash':PACK_HASH,'sample_method':'10,000 deterministic seeds 0..9999; turn-keyed SHA256/Python Random; independent exact 8,000-face-path oracle',
         'exact_standard':{str(l):exact(l) for l in [1,5,10,15,20]},
         'training_sensitivities':[training(b,s) for b in [100,150,200] for s in [0,.1,.2]],
         'campaign_sensitivities':[sample_summary(h,g,p) for h in [12,24] for g in [200,250,300] for p in ['concentrated','rotating']],
         'seed7_trace':campaign(7)['trace']}
    (HERE/'training_growth.json').write_text(json.dumps(out,indent=2)+'\n')
    print(json.dumps({'pack_hash':PACK_HASH,'training':{k:v for k,v in t.items() if k!='trace'},
                      'baseline':[r for r in out['campaign_sensitivities'] if r['guild_xp_award']==250],
                      'exact_standard':out['exact_standard']},indent=2))

if __name__=='__main__':main()

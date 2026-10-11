"""Independent targeted exact rerun for adopted 0.3.1; no root-engine imports."""
import hashlib
import itertools
import json
from collections import Counter
from decimal import Decimal, ROUND_HALF_UP
from functools import lru_cache
from pathlib import Path

HERE = Path(__file__).resolve().parent
RAW = (HERE/'values.json').read_bytes()
V = json.loads(RAW)
PACK_HASH = '32b207d3b379d4cc8e8b4ff818d912059866a2cdd98ab15f0a2b61c42e0dde99'
assert hashlib.sha256(RAW).hexdigest() == PACK_HASH


def rounded(n, unit=1):
    return int((Decimal(str(n))/unit).quantize(Decimal('1'), rounding=ROUND_HALF_UP))*unit


def wage(level):
    return rounded(Decimal(V['pay_base'])*Decimal(str(V['pay_growth']))**(level-1),5)


def degree(face, modifier, dc):
    margin = face+modifier-dc
    raw = 3 if margin>=10 else 2 if margin>=0 else 0 if margin<=-10 else 1
    return max(0,min(3,raw+(1 if face==20 else -1 if face==1 else 0)))


def rank_support(level):
    return 1 if level<5 else 2 if level<9 else 3 if level<17 else 4


@lru_cache(None)
def exact(modifier, dc, required, mandatory, passive_recovery=False):
    counts=Counter()
    for faces in itertools.product(range(1,21),repeat=3):
        persistent=next_only=0
        ds=[]
        for face in faces:
            d=degree(face,modifier+persistent+next_only,dc)
            ds.append(d)
            next_only=0
            if d==0:persistent-=2
            elif d==1:next_only=-1
            elif d==3:next_only=1
        phase_recovery=int(0 in ds)
        recovery=max(mandatory,max(0,phase_recovery-int(passive_recovery)))
        passed=sum(d>=2 for d in ds)>=required
        counts['passed']+=passed
        counts['recovery']+=recovery>0
        counts['passed_recovery']+=passed and recovery>0
        counts['critical_failure']+=0 in ds
    return dict(counts)


def row(levels, rec, card, profile='high', passive=False, medical=None):
    avg=sum(levels)//len(levels)
    minimum=max(1,rec-V['minimum_squad_level_gap'])
    if avg<minimum:
        return {'levels':levels,'mission_level':rec,'card':card,'squad_level':avg,'minimum_squad_level':minimum,'eligible':False,'exact_paths':0,'reason':'visible minimum Squad Level not met'}
    c=V['contracts'][card]
    lead=max(range(len(levels)),key=lambda i:levels[i])
    support=min(3,sum(rank_support(l) for i,l in enumerate(levels) if i!=lead))
    modifier=V['skill_'+profile][levels[lead]]+support
    dc=V['level_dc'][rec]+c['dc_offset']+max(-2,min(2,4-len(levels)))
    counts=exact(modifier,dc,c['required_successes'],c['mandatory_recovery'],passive)
    p=counts['passed']/8000
    recover=counts['recovery']/8000
    cash_multiplier=max(.5,min(1,1-.1*max(0,len(levels)-4)-.1*max(0,avg-rec)))
    payout=rounded(12*wage(rec)*c['payout_factor']*cash_multiplier)
    payroll=sum(wage(l) for l in levels)
    med_success=med_cost=0
    if medical is not None:
        skill,guild_level=medical
        med_dc=V['level_dc'][min(20,2*guild_level-1)]
        med_success=sum(degree(f,skill,med_dc)>=2 for f in range(1,21))/20
        med_cost=25*len(levels)*recover
    cycle=1+recover*(1-med_success)
    net={policy:(p*payout-payroll*(p+(1-p)*fraction)-med_cost)/cycle for policy,fraction in [('full',1),('half',.5),('none',0)]}
    return {'levels':levels,'mission_level':rec,'squad_level':avg,'minimum_squad_level':minimum,'eligible':True,'card':card,'profile':profile,'support':support,'lead_modifier':modifier,'dc':dc,'exact_paths':8000,'counts':counts,'success_probability':p,'recovery_probability_before_medical':recover,'expected_cycle_turns':cycle,'cash_multiplier':cash_multiplier,'quoted_cash':payout,'payroll':payroll,'net_per_calendar_turn_by_failed_pay':net,'merc_xp_per_calendar_turn_without_leader_mvp':(c['participation_xp']+p*c['completion_xp'])/cycle,'guild_xp_per_calendar_turn':p*c['guild_xp']/cycle,'reputation_per_calendar_turn':(p*c['reputation_success']+(1-p)*c['reputation_failure'])/cycle,'passive_phase_recovery_reduction':passive,'medical':None if medical is None else {'modifier':medical[0],'guild_level':medical[1],'dc':med_dc,'success_probability':med_success,'cost_when_used':25*len(levels),'expected_cost_per_assignment':med_cost,'expected_actions_per_assignment':recover}}


def main():
    rows=[row([level]*4,level,card,profile) for level in (1,5,10,20) for card in V['contracts'] for profile in ('high','moderate')]
    sizes=[row([level]*size,level,card) for level in (1,5,10,20) for size in (2,4,6) for card in ('routine','standard')]
    mixed=[row(levels,20,card) for levels in ([20,1,1,1],[20,20,20,12]) for card in V['contracts']]
    recovery=[row([level]*4,level,card,passive=True) for level in (1,5,10,20) for card in V['contracts']]
    medical=[row([level]*4,level,card,medical=(10,guild_level)) for level in (1,5,10,20) for card in ('standard','demanding','exclusive') for guild_level in (1,5)]
    for r in recovery:
        if r['card'] in ('demanding','exclusive'):assert r['expected_cycle_turns']==2
    assert all(not r['eligible'] for r in mixed if r['levels']==[20,1,1,1])
    assert all(r['eligible'] for r in mixed if r['levels']==[20,20,20,12])
    all_rows=rows+sizes+mixed+recovery+medical
    result={'version':V['version'],'pack_sha256':PACK_HASH,'method':'exact independent enumeration20^3 with natural shifts and sequential phase effects; exact independent20-face medical roll where specified','baseline':rows,'sizes':sizes,'mixed':mixed,'passive_recovery':recovery,'medical_treatment':medical,'configurations':len(all_rows),'eligible_configurations':sum(r['eligible'] for r in all_rows),'logical_mission_paths':sum(r['exact_paths'] for r in all_rows),'unique_probability_cases':exact.cache_info().currsize,'actually_enumerated_mission_paths':exact.cache_info().currsize*8000,'limits':['all non-leads relevant supporters','highest-level member leads allthreephasechecks','fixed jobs and statistics without XP advancement','unlimited suitable offers','no acquisition/search costs or constraints included except explicit medical action count','medical once per eligible actualreturn, never prebanked; repeated acrosslaterjobs','medical+10 is an explicit hypothetical qualified officer fixture, not guaranteed for everyPC','medical may reduce mandatory floor by explicit active action; passive treatment may not','Hardcase requires Level5; L1 passive sensitivity can represent an Infirmary instead','per-turn net is renewal expectation before overhead/capital and not a finitecampaign treasuryforecast']}
    (HERE/'mission_revision.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({k:result[k] for k in ('configurations','eligible_configurations','logical_mission_paths','unique_probability_cases','actually_enumerated_mission_paths')}))


if __name__=='__main__':main()

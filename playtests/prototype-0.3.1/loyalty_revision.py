"""Targeted independent 0.3.1 exact/arithmetic retune verification.

No campaign re-simulation. All writes belong to this agent's named artifacts.
"""
import hashlib
import itertools
import json
import math
from pathlib import Path

HERE = Path(__file__).resolve().parent
RAW = (HERE / 'values.json').read_bytes()
V = json.loads(RAW)


def degree(face, modifier, dc):
    margin = face + modifier - dc
    result = 3 if margin >= 10 else 2 if margin >= 0 else 0 if margin <= -10 else 1
    return max(0, min(3, result + (1 if face == 20 else -1 if face == 1 else 0)))


def administration(dc=15, modifier=10):
    return [sum(degree(face, modifier, dc) == d for face in range(1, 21))/20 for d in range(4)]


def refusal(loyalty):
    return sum(degree(f, loyalty//V['rival_offer_loyalty_divisor'], V['rival_offer_dc']) >= 2
               for f in range(1,21))/20


def mission(level, kind):
    c = V['contracts'][kind]
    modifier = V['skill_high'][level]+3
    dc = V['level_dc'][level]+c['dc_offset']
    successes = phase_recovery = 0
    for faces in itertools.product(range(1,21), repeat=3):
        lasting = next_only = count = 0
        recover = False
        for face in faces:
            d = degree(face,modifier+lasting+next_only,dc)
            next_only=0
            count += d>=2
            if d==0:
                lasting-=2
                recover=True
            elif d==1:
                next_only=-1
            elif d==3:
                next_only=1
        successes += count>=c['required_successes']
        phase_recovery += recover
    return {'success_probability':successes/8000,
            'phase_recovery_probability':phase_recovery/8000,
            'passive_recovery_probability':1 if c['mandatory_recovery'] else 0}


def wage(level):
    return 5*math.floor(50*1.25**(level-1)/5+0.5)


def main():
    admin = administration()
    o={'version':V['version'],'pack_sha256':hashlib.sha256(RAW).hexdigest(),
       'method':'Exact 20-face checks, 8000 equiprobable three-phase paths per mission, analytic renewal rate and fixed six-person training arithmetic. No sampled campaign or confidence intervals.',
       'admin_degree_probabilities_CF_F_S_CS':admin,
       'refusal':[{'loyalty':l,'modifier':l//5,'probability':refusal(l)} for l in [0,25,49,50,54,55,60,75,95,100]]}
    o['morale']=[{'starting_loyalty':l,'expected_loyalty_after':sum(p*max(0,min(100,l+b)) for p,b in zip(admin,V['morale_loyalty_by_degree'])),
        'refusal_before':refusal(l),'expected_refusal_after':sum(p*refusal(max(0,min(100,l+b))) for p,b in zip(admin,V['morale_loyalty_by_degree']))}
        for l in [0,49,50,54,55,60,95,100]]
    o['optimize']={'cash_cost':V['optimize_infrastructure_cash_cost'],'one_property_overhead':100,
                   'expected_saving':sum(p*x for p,x in zip(admin,[0,0,10,20])),
                   'action_cost':1,'lease_discount':0,'wage_discount':0}
    o['recovery_cases']=[{'mandatory':m,'phase_added':r,
        'ordinary_duration':max(m,r),'passive_one_reduction_duration':max(m,max(0,r-1)),
        'protocol_success_remaining_duration':max(0,max(m,r)-1),
        'protocol_critical_success_remaining_duration':max(0,max(m,r)-2)}
        for m,r in [(0,1),(1,0),(1,1),(2,1),(1,2)]]
    o['medical_competence']=[{'guild_level':g,'organizational_dc':V['level_dc'][min(20,2*g-1)],
        'fixed_medicine_modifier':10,'release_probability_for_remaining_one':sum(administration(V['level_dc'][min(20,2*g-1)])[2:]),
        'jobs_per_calendar_turn_if_medical_every_return':1/(2-sum(administration(V['level_dc'][min(20,2*g-1)])[2:]))}
        for g in [1,3,5,7,10]]
    o['mission_medical_economics']=[]
    for l in [1,5]:
        for kind in ['standard','demanding','exclusive']:
            result=mission(l,kind)
            cash=3*4*wage(l)*V['contracts'][kind]['payout_factor']
            margin=result['success_probability']*cash-4*wage(l)
            mandatory=V['contracts'][kind]['mandatory_recovery']
            q=1 if mandatory else result['phase_recovery_probability']
            o['mission_medical_economics'].append({'level':l,'kind':kind,**result,
                'without_passive_or_treatment_margin_per_calendar':margin/(1+q),
                'with_passive_margin_per_calendar':margin/(1+bool(mandatory)),
                'with_protocol_every_mandatory_return_at_DC15_margin_per_calendar':(margin-100)/1.2 if mandatory else None,
                'medical_cash_per_four_person_action':100,
                'medical_action_per_calendar_if_every_mandatory_return':1/1.2 if mandatory else None})
    suite=V['facilities']['training_suite']
    o['suite_six_trainees']=[]
    for cadre in [False,True]:
        trainer=V['training']['trainer_cost_per_cohort']-(25 if cadre else 0)
        before=2*trainer+6*25
        after=trainer+6*25+suite['monthly']
        save=before-after
        o['suite_six_trainees'].append({'training_cadre':cadre,'no_suite_monthly':before,
            'suite_monthly_including_own_overhead':after,'monthly_saving':save,
            'simple_purchase_payback_months':suite['cost']/save,
            'purchase_plus_100_manager_payback_months':(suite['cost']+100)/save,
            'one_time_training_initiation_actions_saved':1})
    (HERE/'loyalty_revision.json').write_text(json.dumps(o,indent=2)+'\n')
    print(json.dumps(o,indent=2))


if __name__=='__main__':
    main()

"""Independent exact oracle for Loyalty, actions, mission preparation and recovery.

Run with Python 3 from any directory. Writes only this assignment's JSON output.
All mission outcomes enumerate the same 8,000 three-d20 paths; no fourth check.
"""
import hashlib
import itertools
import json
import math
import random
from collections import Counter
from pathlib import Path

HERE = Path(__file__).resolve().parent
RAW = (HERE / 'values.json').read_bytes()
V = json.loads(RAW)
PACK_HASH = hashlib.sha256(RAW).hexdigest()


def degree(face, modifier, dc):
    margin = face + modifier - dc
    result = 3 if margin >= 10 else 2 if margin >= 0 else 0 if margin <= -10 else 1
    return max(0, min(3, result + (1 if face == 20 else -1 if face == 1 else 0)))


def administration(modifier=10, dc=15):
    return [sum(degree(face, modifier, dc) == d for face in range(1, 21)) / 20 for d in range(4)]


def mission(level, kind='standard', phase_bonus=(0, 0, 0), high=True):
    card = V['contracts'][kind]
    modifier = V['skill_high' if high else 'skill_moderate'][level] + V['support_cap']
    dc = V['level_dc'][level] + card['dc_offset']
    wins, recovery, success_recovery = 0, 0, 0
    for faces in itertools.product(range(1, 21), repeat=3):
        lasting, next_only, successes, critical_failure = 0, 0, 0, False
        for phase, face in enumerate(faces):
            outcome = degree(face, modifier + phase_bonus[phase] + lasting + next_only, dc)
            next_only = 0
            successes += outcome >= 2
            if outcome == 0:
                lasting -= 2
                critical_failure = True
            elif outcome == 1:
                next_only = -1
            elif outcome == 3:
                next_only = 1
        win = successes >= card['required_successes']
        recover = bool(critical_failure or card['mandatory_recovery'])
        wins += win
        recovery += recover
        success_recovery += win and recover
    return {'success': wins / 8000, 'recovery': recovery / 8000,
            'success_and_recovery': success_recovery / 8000}


def wage(level):
    return 5 * math.floor(50 * 1.25 ** (level - 1) / 5 + 0.5)


def refusal(loyalty, bonus=0, dc=18, divisor=10):
    return sum(degree(face, loyalty // divisor + bonus, dc) >= 2 for face in range(1, 21)) / 20


def event_chain(acceptance, turns=12):
    # State: returning next turn? / accumulated accepted offers. The due rival
    # return satisfies that turn's event minimum, so no new fallback that turn.
    states = {(False, 0): 1.0}
    for _ in range(turns):
        nxt = Counter()
        for (return_due, accepted), p in states.items():
            if return_due:
                nxt[(False, accepted)] += p
            else:
                nxt[(False, accepted)] += p * (1 - acceptance / 6)
                nxt[(True, accepted + 1)] += p * acceptance / 6
        states = nxt
    expected = sum(accepted * p for (_, accepted), p in states.items())
    any_acceptance = sum(p for (_, accepted), p in states.items() if accepted > 0)
    return {'expected_accepted_offers': expected, 'probability_any_accepted': any_acceptance,
            'steady_state_absent_share': acceptance / (6 + acceptance)}


def main():
    admin = administration()
    out = {'pack_version': V['version'], 'pack_sha256': PACK_HASH,
           'method': 'Exact enumeration: 20 administration/refusal outcomes and 8,000 independent phase paths per mission; finite 12-turn event Markov chain. Trace RNG Python Random(seed=7).',
           'administration_start_degree_probabilities_CF_F_S_CS': admin}
    out['loyalty_refusal'] = [{'loyalty': l, 'refusal': refusal(l), 'counterintel_plus2': refusal(l, 2),
                              'counterintel_plus4': refusal(l, 4)} for l in range(0, 101, 10)]
    out['refusal_dc_sensitivity'] = [{'dc': dc, 'at_loyalty50': refusal(50, dc=dc),
                                    'at_loyalty100': refusal(100, dc=dc)} for dc in [18, 16, 15, 13]]
    out['refusal_divisor5_sensitivity'] = [{'loyalty': l, 'refusal': refusal(l, divisor=5)} for l in [0,25,50,75,100]]
    out['morale_refusal_after_one_action'] = {str(l): sum(p * refusal(max(0,min(100,l+b)))
        for p,b in zip(admin,[-2,2,5,8])) for l in [50,55,60,95,100]}
    out['optimize_overhead'] = [{'property_overhead': amount,
        'expected_saving': amount * (0.5*0.1+0.3*0.2),
        'expected_net_after_25_cost': amount * (0.5*0.1+0.3*0.2)-25} for amount in [75,80,100,228,300]]
    out['failed_pay_four_failures'] = []
    for policy, delta in V['failed_pay_loyalty'].items():
        levels = [max(0, min(100, 50 + n * delta)) for n in range(5)]
        out['failed_pay_four_failures'].append({'policy': policy, 'squad_wages_per_failure_L1':
            200 if policy == 'full' else 100 if policy == 'half' else 0,
            'loyalty_initial_then_each_failure': levels,
            'refusal_probabilities': [refusal(l) for l in levels]})
    out['promotion'] = {}
    for guild_level in [1, 3, 5, 7, 10]:
        target = min(20, 2 * guild_level - 1)
        probs = administration(10, V['level_dc'][target])
        out['promotion'][str(guild_level)] = {
            'organizational_target': target,
            'unchanged_officer_modifier': 10,
            'promote_expected_rep': sum(p * x for p, x in zip(probs, [-1, 0, 2, 4])),
            'media_expected_rep': sum(p * x for p, x in zip(probs, [-2, 0, 3, 6])),
            'morale_expected_loyalty': sum(p * x for p, x in zip(probs, [-2, 2, 5, 8]))}
    out['counterintel'] = {str(l): {'baseline_acceptance': 1-refusal(l),
        'prepared_acceptance_if_event_matches': sum(p * (1 - refusal(l, bonus)) for p, bonus in zip(admin, [-1, 0, 2, 4]))}
        for l in [20, 50, 80, 100]}
    out['events_no_other_due_followups'] = {str(l): event_chain(1-refusal(l)) for l in [20, 50, 80, 100]}
    out['mission_action_recovery'] = []
    for level in [1, 5, 10, 20]:
        for kind in ['routine', 'standard', 'demanding', 'exclusive']:
            baseline = mission(level, kind)
            recon_variants = {b: mission(level, kind, (0, b, 0)) for b in [-1, 1, 2]}
            preparation_success = sum(p * (baseline if b == 0 else recon_variants[b])['success']
                                      for p, b in zip(admin, [-1, 0, 1, 2]))
            payout = 3 * 4 * wage(level) * V['contracts'][kind]['payout_factor']
            full_fail_pay_margin = baseline['success'] * payout - 4 * wage(level)
            out['mission_action_recovery'].append({'level': level, 'kind': kind, **baseline,
                'recon_expected_success_starting_officer': preparation_success,
                'recon_increment_expected_cash': (preparation_success - baseline['success']) * payout,
                'margin_per_calendar_turn_full_wages_without_fixed_costs': full_fail_pay_margin / (1+baseline['recovery']),
                'margin_per_calendar_turn_recovery_removed_without_fixed_costs': full_fail_pay_margin,
                'single_phase_plus1_success': recon_variants[1]['success'],
                'single_phase_plus2_success': recon_variants[2]['success']})
    out['hard_mission_dc_sensitivity'] = [{'level': level, 'dc_offset': offset,
        'success': mission(level,'demanding',(2-offset,)*3)['success']}
        for level in [1,5] for offset in [2,1,0]]
    rng = random.Random(7)
    trace = []
    due = False
    for turn in range(1, 13):
        if due:
            trace.append({'turn': turn, 'event': 'Rival return; no fallback draw', 'available_at_boundary': True})
            due = False
        else:
            event = rng.randint(1, 6)
            row = {'turn': turn, 'fallback_event': event, 'loyalty': 50}
            if event == 2:
                face = rng.randint(1, 20)
                accepted = degree(face, 5, 18) < 2
                due = accepted
                row.update({'refusal_die': face, 'accepted': accepted, 'available_at_boundary': not accepted})
            trace.append(row)
    out['seed7_event_trace'] = trace
    (HERE / 'loyalty_actions.json').write_text(json.dumps(out, indent=2) + '\n')
    print(json.dumps({'pack_sha256': PACK_HASH, 'admin': admin,
          'mission_level5': [r for r in out['mission_action_recovery'] if r['level'] == 5],
          'events': out['events_no_other_due_followups'], 'promotion': out['promotion']}, indent=2))


if __name__ == '__main__':
    main()

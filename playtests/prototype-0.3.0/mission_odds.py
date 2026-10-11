"""Independent exact oracle for frozen 0.3.0; no imports from root simulator."""
import hashlib
import itertools
import json
from collections import Counter
from decimal import Decimal, ROUND_HALF_UP
from functools import lru_cache
from pathlib import Path

HERE = Path(__file__).resolve().parent
RAW = (HERE / 'values.json').read_bytes()
V = json.loads(RAW)
EXPECTED_HASH = '5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d'
assert hashlib.sha256(RAW).hexdigest() == EXPECTED_HASH


def rounded(value, unit=1):
    return int((Decimal(str(value)) / Decimal(unit)).quantize(Decimal('1'), rounding=ROUND_HALF_UP)) * unit


def wage(level):
    return rounded(Decimal(V['pay_base']) * Decimal(str(V['pay_growth'])) ** (level - 1), V['pay_rounding'])


def degree(face, modifier, dc):
    margin = face + modifier - dc
    result = 3 if margin >= 10 else 2 if margin >= 0 else 0 if margin <= -10 else 1
    return max(0, min(3, result + (1 if face == 20 else -1 if face == 1 else 0)))


def rank_bonus(level):
    return 1 if level < 5 else 2 if level < 9 else 3 if level < 17 else 4


@lru_cache(None)
def enumerate_outcomes(modifier, dc, required, mandatory_recovery, phase_boost=(0, 0, 0), essential=-1):
    counts = Counter()
    for faces in itertools.product(range(1, 21), repeat=3):
        persistent = 0
        next_only = 0
        results = []
        for index, face in enumerate(faces):
            d = degree(face, modifier + persistent + next_only + phase_boost[index], dc)
            results.append(d)
            next_only = 0
            if d == 0:
                persistent -= 2
            elif d == 1:
                next_only = -1
            elif d == 3:
                next_only = 1
        passed = sum(d >= 2 for d in results) >= required and (essential < 0 or results[essential] >= 2)
        recover = mandatory_recovery > 0 or 0 in results
        counts['passed'] += passed
        counts['recovery'] += recover
        counts['passed_and_recovery'] += passed and recover
        counts['critical_failure'] += 0 in results
        counts['successful_phases_' + str(sum(d >= 2 for d in results))] += 1
    return dict(counts)


def calculate(levels, mission_level, card, profile='high', coverage='balanced', payout_factor=None, required_recovery=None, size_cash_coefficient=None, level_cash_coefficient=None, hardcase=False, essential=-1, phase_boost=(0, 0, 0)):
    card_values = V['contracts'][card]
    lead_index = max(range(len(levels)), key=lambda i: levels[i])
    lead_level = levels[lead_index]
    supporters = [lvl for i, lvl in enumerate(levels) if i != lead_index]
    if coverage == 'sparse':
        supporters = [min(supporters)] if supporters else []
    elif coverage == 'none':
        supporters = []
    support = min(V['support_cap'], sum(rank_bonus(lvl) for lvl in supporters))
    mod = V['skill_' + profile][lead_level] + support
    size_shift = max(-V['size_dc_adjustment_cap'], min(V['size_dc_adjustment_cap'], 4 - len(levels)))
    dc = V['level_dc'][mission_level] + card_values['dc_offset'] + size_shift
    mandatory = card_values['mandatory_recovery'] if required_recovery is None else required_recovery
    counts = enumerate_outcomes(mod, dc, card_values['required_successes'], mandatory, phase_boost, essential)
    sample_count = 20**3
    p = counts['passed'] / sample_count
    recovery = counts['recovery'] / sample_count
    if hardcase:
        recovery = 0.0
    squad_level = sum(levels) // len(levels)
    size_coefficient = V['cash_adjustment_per_size_difference'] if size_cash_coefficient is None else size_cash_coefficient
    level_coefficient = V['cash_adjustment_per_level_difference'] if level_cash_coefficient is None else level_cash_coefficient
    cash_modifier = max(V['cash_adjustment_min'], min(V['cash_adjustment_max'], 1 + size_coefficient * (4 - len(levels)) + level_coefficient * (mission_level - squad_level)))
    factor = card_values['payout_factor'] if payout_factor is None else payout_factor
    cash = rounded(3 * 4 * wage(mission_level) * factor * cash_modifier)
    payroll = sum(wage(lvl) for lvl in levels)
    expected_net = p * cash - payroll
    cycle = 1 + recovery
    return {
        'levels': levels, 'mission_level': mission_level, 'card': card,
        'profile': profile, 'coverage': coverage, 'lead_modifier': mod, 'dc': dc,
        'support': support, 'squad_level': squad_level, 'cash_modifier': cash_modifier,
        'quoted_cash': cash, 'payroll': payroll, 'exact_paths': sample_count,
        'counts': counts, 'success_probability': p, 'recovery_probability': recovery,
        'expected_net_per_assignment_full_failure_pay': expected_net,
        'expected_cycle_turns': cycle,
        'expected_net_per_calendar_turn': expected_net / cycle,
        'expected_net_per_calendar_turn_by_failure_pay': {policy: (p*cash - payroll*(p + (1-p)*fraction))/cycle for policy, fraction in [('full',1),('half',0.5),('none',0)]},
        'after_starting_lease_per_calendar_turn': expected_net / cycle - 150,
        'expected_merc_xp_per_calendar_turn': (card_values['participation_xp'] + p * card_values['completion_xp']) / cycle,
        'expected_guild_xp_per_calendar_turn': p * card_values['guild_xp'] / cycle,
        'expected_reputation_per_assignment': p * card_values['reputation_success'] + (1-p) * card_values['reputation_failure'],
        'sensitivity': {'payout_factor': factor, 'required_recovery': mandatory, 'size_cash_coefficient': size_coefficient, 'level_cash_coefficient': level_coefficient, 'hardcase': hardcase, 'essential_phase': essential, 'phase_boost': phase_boost},
    }


def main():
    # Boundary checks independently exercise natural shifts and ±10 ties.
    assert degree(10, 0, 20) == 0
    assert degree(10, 10, 20) == 2
    assert degree(20, 0, 20) == 3
    assert degree(1, 40, 20) == 2
    assert degree(20, -20, 20) == 1
    assert [wage(l) for l in (1, 5, 10, 15, 20)] == [50, 120, 375, 1135, 3470]
    main_rows = [calculate([level]*size, level, card, profile, coverage)
                 for level in (1, 5, 10, 20)
                 for card in V['contracts']
                 for profile in ('high', 'moderate')
                 for size in (2, 4, 6)
                 for coverage in ('balanced', 'sparse')]
    mixed = [calculate(levels, target, card, 'high', 'balanced')
             for levels in ([5, 1, 1, 1], [20, 1, 1, 1])
             for target in (1, 5, 10, 20)
             for card in V['contracts']]
    sensitivity = []
    for level in (1, 5, 10, 20):
        for card in ('standard', 'demanding', 'exclusive'):
            for factor_multiplier in (0.75, 1, 1.5, 2, 3):
                sensitivity.append(calculate([level]*4, level, card, payout_factor=V['contracts'][card]['payout_factor']*factor_multiplier))
        for card in ('standard', 'demanding', 'exclusive'):
            sensitivity.append(calculate([level]*4, level, card, hardcase=True))
            sensitivity.append(calculate([level]*4, level, card, required_recovery=0))
        for size in (2, 6):
            for coefficient in (0, 0.05, 0.10):
                sensitivity.append(calculate([level]*size, level, 'standard', size_cash_coefficient=coefficient))
        sensitivity.append(calculate([level]*4, level, 'standard', essential=1))
        sensitivity.append(calculate([level]*4, level, 'demanding', payout_factor=3.0))
        sensitivity.append(calculate([level]*4, level, 'exclusive', payout_factor=3.6))
    for levels in ([5,1,1,1], [20,1,1,1]):
        sensitivity.append(calculate(levels, max(levels), 'standard', level_cash_coefficient=0))
    result = {'pack_version': V['version'], 'pack_sha256': EXPECTED_HASH,
              'method': 'exact enumeration of 8000 equally probable three-d20 paths per configuration; no Monte Carlo confidence intervals',
              'assumptions': ['highest-level operative leads all three phases', 'all configured lead skills use same high or moderate benchmark', 'balanced all non-leads have relevant rank support; sparse only lowest-level non-lead supports', 'all failed wages paid in full', 'unlimited qualified contract deck for steady-state throughput', 'one complete job interval followed by one interval if recovery applies', 'no feat, infrastructure, trained prep unless explicitly named in sensitivity', 'no hiring, action, event, officer, asset costs included in per-job figures; lease deducted separately'],
              'main_configurations': main_rows, 'mixed_configurations': mixed, 'sensitivities': sensitivity,
              'configuration_count': len(main_rows)+len(mixed)+len(sensitivity),
              'logical_path_count': (len(main_rows)+len(mixed)+len(sensitivity))*8000}
    (HERE/'mission_odds.json').write_text(json.dumps(result, indent=2)+'\n')
    print(json.dumps({'configurations': result['configuration_count'], 'logical_path_count': result['logical_path_count'], 'unique_probability_cases': enumerate_outcomes.cache_info().currsize}))


if __name__ == '__main__':
    main()

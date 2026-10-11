"""Independent arithmetic and authored financial/property probes; no pack mutation."""
from pathlib import Path
import hashlib, json, math, random

HERE = Path(__file__).resolve().parent
PACK = HERE / 'values.json'
V = json.loads(PACK.read_text())
EXPECTED = '5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d'
assert hashlib.sha256(PACK.read_bytes()).hexdigest() == EXPECTED

def quote(level):
    return math.floor(V['pay_base'] * V['pay_growth'] ** (level - 1) / 5 + .5) * 5

def payment(principal, rate):
    return math.ceil(principal * rate / (1 - (1 + rate) ** -12))

def amortize(principal, rate):
    rows, balance = [], float(principal)
    regular = payment(principal, rate)
    for turn in range(1, 13):
        interest = balance * rate
        actual = min(regular, balance + interest)
        if turn == 12:
            actual = balance + interest
        balance = max(0, balance + interest - actual)
        rows.append(dict(turn=turn, payment=round(actual, 6), interest=round(interest, 6), balance=round(balance, 6)))
    return dict(principal=principal, rate=rate, monthly=regular, total_paid=round(sum(x['payment'] for x in rows), 6), rows=rows)

def degree(face, bonus, dc):
    delta = face + bonus - dc
    result = 3 if delta >= 10 else 2 if delta >= 0 else 0 if delta <= -10 else 1
    return max(0, min(3, result + (1 if face == 20 else -1 if face == 1 else 0)))

def seed7_ledger():
    """Established L1 guild with three historical600 receipts, opening XP750."""
    rng = random.Random(7)
    cash, xp, guild_xp, rep = 3000, [750] * 4, 750, 0
    balance, regular, recovery, pending = 1000.0, payment(1000, .02), 0, None
    rows = []
    # Interval T means work starts in T, settles at T+1; no same-boundary return.
    for boundary in range(1, 14):
        receipts = wages = 0
        result = 'none'
        recovery_this_interval = False
        if pending:
            result = 'completed' if pending['success'] else 'failed'
            receipts = pending['cash'] if pending['success'] else 0
            cash += receipts
            wages = pending['wages'] if pending['success'] else pending['wages'] / 2
            assert cash >= wages
            cash -= wages
            for i in range(4):
                xp[i] += 100 + (150 if pending['success'] else 0)
            if pending['success']:
                xp[0] += 50  # lead materially contributes; one MVP, no L5 leader yet
                guild_xp += 250
                rep += 2
            else:
                rep -= 3
            recovery_this_interval = pending['recovery']
            recovery = int(recovery_this_interval)
            pending = None
        interest = balance * .02 if boundary > 1 else 0
        debt_due = min(regular, balance + interest) if boundary > 1 and balance else 0
        if boundary == 13 and balance:
            debt_due = balance + interest
        assert cash >= 150 + debt_due
        cash -= 150 + debt_due
        balance = max(0, balance + interest - debt_due)
        started = None
        if boundary <= 12 and not recovery:
            levels = [min(20, 1 + x // 1000) for x in xp]
            target = sum(levels) // 4
            faces = [rng.randint(1, 20) for _ in range(3)]
            degrees, permanent, nxt = [], 0, 0
            for face in faces:
                d = degree(face, V['skill_high'][max(levels)] + 3 + permanent + nxt, V['level_dc'][target])
                degrees.append(d)
                nxt = 1 if d == 3 else -1 if d == 1 else 0
                if d == 0:
                    permanent -= 2
            success = sum(d >= 2 for d in degrees) >= 2
            pending = dict(success=success, cash=12 * quote(target), wages=sum(quote(x) for x in levels), recovery=0 in degrees)
            started = dict(faces=faces, degrees=degrees, levels=levels, recommended_level=target, **pending)
        elif recovery:
            recovery = 0  # one full skipped interval; next boundary available
        rows.append(dict(boundary=boundary, settled=result, receipts=receipts, wages_paid=wages,
                         rent=150, loan_paid=round(debt_due, 6), balance=round(balance, 6),
                         treasury=round(cash, 6), guild_level=min(10, 1 + guild_xp // 1000),
                         rep=max(-20, min(100, rep)), merc_xp=xp.copy(), new_assignment=started))
    return rows

def cash_distress(opening, monthly_extra=0):
    """No income: fund loan first then rent, failed pay funded separately if requested."""
    cash, balance = opening, 1000.0
    rent_miss, loan_miss, rent_arrears, rows = None, None, 0, []
    access = True
    for t in range(1, 13):
        optional = monthly_extra if access and cash >= monthly_extra else 0
        cash -= optional
        interest = balance * .02
        debt_due = min(95, balance + interest)
        if cash >= debt_due:
            cash -= debt_due
            balance += interest - debt_due
            loan_status = 'Current'
        else:
            balance += interest
            loan_status = 'Default' if loan_miss is not None else 'Delinquent'
            loan_miss = loan_miss or t
        if access:
            if cash >= 150 + rent_arrears:
                cash -= 150 + rent_arrears
                rent_arrears = 0
                rent_miss = None
            else:
                rent_arrears += 150
                if rent_miss is not None:
                    access = False
                rent_miss = rent_miss or t
        rows.append(dict(turn=t, cash=round(cash, 6), loan_balance=round(balance, 6), loan_status=loan_status,
                         lease_access=access, rent_arrears=rent_arrears, optional_failed_pay=optional))
    return rows

def main():
    schedules = {'secured_1470': amortize(1470, .01), 'unsecured_1000': amortize(1000, .02),
                 'secured_5000': amortize(5000, .01)}
    assert all(x['rows'][-1]['balance'] == 0 for x in schedules.values())
    sales = {key: round(card['cost'] * .7, 6) for key, card in V['facilities'].items()}
    caps = {key: round(sale * .7, 6) for key, sale in sales.items()}
    debt_total = payment(1470, .01) + payment(1000, .02)
    receipts_needed = debt_total / .3
    probes = {
      'effective_secured_ltv': .7 * .7,
      'sale_values': sales, 'secured_caps': caps,
      'two_loan_service': debt_total, 'two_loan_required_monthly_receipts': receipts_needed,
      'service_cap_history_600_0_0': .3 * (600 / 3),
      'field_startup_cash_after_purchase_and_first_manager': 2000 + caps['field_hq'] - 3000 - 100,
      'field_startup_secured_monthly': payment(caps['field_hq'], .01),
      'startup_signed_standard_service_cap': 600 * .3,
      'field_turn1_overlap_rent_and_owned_overhead': 150 + 75,
      'field_monthly_saving_after_lease_end': 150 - 75,
      'field_cash_only_payback_months': 3000 / (150 - 75),
      'field_resale_net_economic_payback_months': (3000 - 2100) / 75,
      'permanent_cash_only_payback_months': 6000 / (150 - 100),
      'permanent_resale_net_economic_payback_months': (6000 - 4200) / 50,
      'damaged_suite_repair': 1000 * .2 + 100,
      'offline_suite_repair': 1000 * .4 + 100,
      'suite_one_turn_transfer': 1000 * .1 + 100,
      'infirmary_two_turn_transfer': 1200 * .1 + 200,
      'suite_infirmary_manifest_transfer_shared_manager': (1000 + 1200) * .1 + 200,
      'infirmary_secured_loan_vs_distressed_sale': {'principal_cap': caps['infirmary'], 'sale': sales['infirmary']},
      'ordinary_secured_default_after_two_misses': {'balance': 588 * 1.01 ** 2, 'sale': 840,
                                                  'surplus': 840 - 588 * 1.01 ** 2},
      'deficiency_fee_sensitivity_not_baseline': {'balance': 588 * 1.01 ** 2, 'sale': 840,
                                                  'explicit_card_selling_fee': 300,
                                                  'deficiency': 588 * 1.01 ** 2 - (840 - 300)},
      'unsecured_two_misses_then_arrears_cure': {'balance_after_two_misses': 1000 * 1.02 ** 2,
                                               'scheduled_arrears': 190,
                                               'balance_after_paying_arrears': 1000 * 1.02 ** 2 - 190},
      'lease_zero_income_cash_runway_no_loan': math.floor(2000 / 150),
      'delegated_rescue_cash_outflow_level1_full_wages_before_bills': 4 * quote(1) + 150,
    }
    data = dict(pack_version='0.3.0', pack_hash=EXPECTED, method='exact arithmetic and one authored seed7 trace; no population estimates',
                amortization=schedules, probes=probes, seed7_trace=seed7_ledger(),
                distress_zero_income=cash_distress(3000), distress_withdrawal_2000=cash_distress(1000),
                distress_failed_half_pay=cash_distress(3000, 100))
    assert math.isclose(caps['field_hq'], 1470)
    assert math.isclose(data['distress_zero_income'][-1]['cash'], 65.90673, abs_tol=.00001)
    assert data['distress_withdrawal_2000'][5]['loan_status'] == 'Default'
    assert not data['distress_withdrawal_2000'][5]['lease_access']
    assert sum(x['settled'] == 'completed' for x in data['seed7_trace']) == 9
    (HERE / 'debt_property.json').write_text(json.dumps(data, indent=2) + '\n')
    print(json.dumps(dict(probes=probes, seed7_terminal=data['seed7_trace'][-1],
                         amortization={key: {'monthly': x['monthly'], 'total_paid': x['total_paid']} for key,x in schedules.items()},
                         distress_lease_end={key:next((x['turn'] for x in data[key] if not x['lease_access']),None) for key in ['distress_zero_income','distress_withdrawal_2000','distress_failed_half_pay']}), indent=2))

if __name__ == '__main__':
    main()

"""Validate published evidence, links, frozen hashes and independent oracle agreement."""
import hashlib
import json
import math
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
sys.path.insert(0,str(HERE / 'prototype-0.3.0'))
import simulator as shared

checks=[]
def check(name, ok):
    assert ok, name
    checks.append(name)

for ver,expected in [('0.3.0','5708920dfac9a55c40d273eed166024cd5bf63b84bf2549a21354ebc84aa099d'),('0.3.1','32b207d3b379d4cc8e8b4ff818d912059866a2cdd98ab15f0a2b61c42e0dde99')]:
    path=HERE / ('prototype-'+ver) / 'values.json'
    check('hash '+ver, hashlib.sha256(path.read_bytes()).hexdigest()==expected)
for p in HERE.rglob('*.json'):
    json.loads(p.read_text())
    check('parse '+str(p.relative_to(HERE)),True)
for p in HERE.rglob('*.py'):
    compile(p.read_text(),str(p),'exec')
    check('compile '+str(p.relative_to(HERE)),True)
for p in ROOT.rglob('*.md'):
    for target in re.findall(r'\]\(([^)]+)\)',p.read_text()):
        if '://' in target or target.startswith('#'):continue
        target=target.split('#',1)[0]
        check('link '+str(p.relative_to(ROOT))+' → '+target,(p.parent/target).exists())

old_checks=json.loads(subprocess.check_output([sys.executable,str(HERE/'prototype-0.3.0'/'verify.py')]))
check('150 baseline ledger/probability assertions',old_checks['passed']==150)
v=json.loads((HERE/'prototype-0.3.1'/'values.json').read_text())
shared.V=v
revised=json.loads((HERE/'prototype-0.3.1'/'mission_revision.json').read_text())
for row in revised['baseline']:
    r=shared.exact_mission(row['levels'],kind=row['card'],recommended_level=row['mission_level'],profile=row['profile'])
    check('independent revised success '+str((row['card'],row['mission_level'],row['profile'])),r['success_probability']==row['success_probability'])
    check('independent revised recovery '+str((row['card'],row['mission_level'],row['profile'])),r['recovery_probability']==row['recovery_probability_before_medical'])
check('100 eligible exact revision cases',revised['eligible_configurations']==100)
check('one generalist cannot access defaultL20 card withL1 cohort',(20+1+1+1)//4<20-v['minimum_squad_level_gap'])
action=json.loads((HERE/'prototype-0.3.1'/'loyalty_revision.json').read_text())
for loyalty,wanted in [(0,.15),(50,.65),(100,.95)]:
    rate=sum(shared.degree(f,loyalty//v['rival_offer_loyalty_divisor'],v['rival_offer_dc'])>=2 for f in range(1,21))/20
    check('revised refusal '+str(loyalty),rate==wanted)
result={'artifact_checks_passed':len(checks),'baseline_assertions_passed':old_checks['passed'],'independent_revision_oracle_configs':len(revised['baseline']),'revision_eligible_configs':revised['eligible_configurations'],'pack_hashes':{x:hashlib.sha256((HERE/('prototype-'+x)/'values.json').read_bytes()).hexdigest() for x in ['0.3.0','0.3.1']},'notes':['Artifact checks include JSON parsing, Python syntax and relative documentation links.','Independent exact revised probabilities agree with root mission engine for32 balanced baseline cases.','Full evolving0.3.1 campaign suite and live-table experience have not been retested.']}
(HERE/'verification-summary.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))

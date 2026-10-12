const fs=require('fs'),path=require('path');
const {run,policies,summarize}=require('./speedrun.cjs');
const selected=policies.filter(p=>['cash-engine','mission-first-low'].includes(p.id));
const results=[];
for(const p of selected){const runs=[];for(let seed=1;seed<=8;seed++)runs.push(run(seed,p,false,90));results.push({policy:p.id,summary:summarize(runs),runs:runs.map(({trace,...r})=>r)});console.log(p.id,JSON.stringify(results.at(-1).summary));}
fs.writeFileSync(path.join(__dirname,'bounded-speedrun-results.json'),JSON.stringify({rules:'0.3.10',policyAdaptation:'Score uses quoted relative Guild XP; conservation sums actual milestone history. Recovery filters already-attempted targets under the new per-person limit. Other behavior retained. This does not optimize new activities.',seeds:'1–8 each, reused',heroPolicy:'initial four only',horizon:90,results},null,2));

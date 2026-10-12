'use strict';
const fs=require('fs'),path=require('path');
const {run,policies,summarize}=require('./harness.cjs');
const chosen=policies.filter(p=>['mission-first-low','cash-engine'].includes(p.id));
const runs=[],summaries={},start=Date.now();
for(const p of chosen){const group=[];for(let seed=1;seed<=32;seed++){if(Date.now()-start>115000)break;const r=run(seed,p,false,90);group.push(r);runs.push(r);}summaries[p.id]=summarize(group);}
const fastest=runs.filter(r=>r.reached).sort((a,b)=>a.turnReached-b.turnReached)[0];
const result={counterfactual:true,liveAndFrozenUnchanged:true,onlyEngineChange:'settleGuildXP threshold/subtraction',thresholdsToLevels2Through10:[1000,1250,1500,1750,2000,2500,3000,3500,4000],totalXP:20500,requestedSeeds:32,seedDefinition:'Fixed seeds1–32, two previously declared public-information policies, no future-die peeking',horizon:90,initialHeroPoints:4,summaries,elapsedMilliseconds:Date.now()-start,incomplete:runs.length<64,runs:runs.map(({trace,...r})=>r),fastest:fastest?(({trace,...r})=>r)(fastest):null};
fs.writeFileSync(path.join(__dirname,'report.json'),JSON.stringify(result,null,2));
if(fastest)fs.writeFileSync(path.join(__dirname,'fastest-trace.json'),JSON.stringify(fastest,null,2));
console.log(JSON.stringify({...result,runs:undefined},null,2));

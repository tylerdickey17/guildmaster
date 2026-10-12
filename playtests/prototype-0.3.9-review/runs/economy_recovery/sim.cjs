/* Frozen 0.3.9 economic audit. Legal runs call public API only; synthetic fixtures labeled. */
const fs=require('fs'),path=require('path'),assert=require('assert');
const G=require('../../frozen/engine.js'),DIR=__dirname;
const cache=new Map();
function risk(q){
 const key=JSON.stringify([q.checks.map(x=>[x.modifier,x.dc]),q.contractRules.required_successes,q.contractRules.complication_trigger]);
 if(cache.has(key))return cache.get(key);
 let success=0,missing=0,injury=0,repair=0;
 function loop(p,prev,crit,n,prob){if(p===3){if(n>=q.contractRules.required_successes)success+=prob;return;}
  const counts=[0,0,0,0],check=q.checks[p],mod=check.modifier-2*crit+(prev===1?-1:prev===3?1:0);
  for(let d=1;d<=20;d++)counts[G.degree(d,mod,check.dc)]++;
  for(let d=0;d<4;d++)if(counts[d]){let nextProb=prob*counts[d]/20,trigger=d<2&&(q.contractRules.complication_trigger==='failure'||d===0);
   if(trigger){if(p===2)missing+=nextProb;if(p===0)injury+=nextProb;if(p===1)repair+=nextProb*(q.contractRules.complication_trigger==='critical_failure'?.5:d===0?2:1);}
   loop(p+1,d,crit+(d===0),n+(d>=2),nextProb);
  }
 }
 loop(0,null,0,0,1);const out={success,missing,injury,repair};cache.set(key,out);return out;
}
function combo(a,n){let out=[];function walk(i,c){if(c.length===n){out.push(c);return;}for(let j=i;j<a.length;j++)walk(j+1,[...c,a[j]]);}walk(0,[]);return out;}
const debt=s=>s.loans.reduce((n,l)=>n+l.remaining,0),arrears=s=>s.arrears.reduce((n,a)=>n+a.amount,0);
const roster=s=>s.mercs.filter(m=>!['Candidate','Expired','Inactive','Dead','Missing','Captured'].includes(m.status));
const ready=s=>roster(s).filter(m=>m.status==='Available'&&m.baseId===s.operatingBase&&m.dispatchedTurn!==s.turn&&(m.employment!=='retained'||m.retainerPaidTurn===s.turn));
const avg=s=>Math.max(1,Math.floor(roster(s).reduce((n,m)=>n+m.level,0)/Math.max(1,roster(s).length)));
function best(s){let rr=ready(s),max=null;if(rr.length<3)return null;
 for(const c of s.board.filter(c=>c.baseId===s.operatingBase&&((c.status==='Offer'&&c.expires>=s.turn)||(c.status==='Accepted'&&c.deployBy>=s.turn)))){
  for(const squad of combo(rr,Math.min(4,rr.length))){const ids=squad.map(m=>m.id),leads=G.chooseLeads(s,c,ids);if(!leads)continue;
   try{const q=G.quote(s,c,ids,leads),r=risk(q);
    // Ordinary reserve policy: price expected missing personnel and idle recovery; avoids catastrophic jobs for small margins.
    const replacement=2*G.wage(Math.max(...squad.map(m=>m.level))),score=r.success*q.payout-(.5+.5*r.success)*q.pay-r.repair*q.repairWage-r.missing*replacement-r.injury*60;
    if(!max||score>max.score)max={c,ids,leads,q,r,score};
   }catch(e){}
  }
 }
 return max;
}
function act(s,name,...args){try{G[name](s,...args);return true;}catch(e){return false;}}
function run(seed,policy,monthly){
 let s=G.fresh(seed,false,4,'staffed'),trace=[],stalls=0,distressTurns=0,distressEntries=0,previousDistress=false,first10=null,first4=null,loanAttempts=0,errors=[];
 for(let t=1;t<=60;t++){
  const cashStart=s.cash,debtStart=debt(s),arrStart=arrears(s),jobBefore=s.jobs.length;
  G.settleUpkeep(s);while(s.upkeep.choices.length)G.choice(s,s.upkeep.choices[0].id,'stop');G.finishUpkeep(s);const openingPool=s.actions;
  if(monthly&&t>1)G.startHeroSession(s);
  // Service is discretionary; keep instructor while spare people can train; otherwise pause next month.
  // Partial arrears retain the current bills and a minimum hiring/mission reserve.
  if(s.arrears.length&&s.cash>G.forecast(s)+440)G.payArrears(s,Math.min(arrears(s),s.cash-G.forecast(s)-440));
  for(const m of ready(s))if(m.level>=5&&!m.leaderFeat)G.chooseLeaderFeat(s,m.id,'hardcase');
  // Purchase one small owned HQ once a reserve can fund purchase/relocation or underwritten financing.
  const mobile=s.bases.find(b=>b.type==='field_hq');
  if(policy!=='lean'&&s.guildLevel>=4&&!mobile&&!s.arrears.length&&s.actions>1){
   let need=Math.ceil(Math.max(0,3000+100+3*G.forecast(s)+500-s.cash)/100)*100;
   if(need&&need<=s.guildLevel*1000){loanAttempts++;act(s,'borrow','unsecured',need,'command');}
   if(s.cash>=3000+100+3*G.forecast(s)+500)act(s,'purchaseBase','field_hq','command');
  }
  const destination=s.bases.find(b=>b.type==='field_hq'&&b.status==='Operational'&&b.id!==s.primaryBase);
  if(destination&&s.cash>G.forecast(s)+100&&s.actions)act(s,'relocate',destination.id,'command',false);
  // Replacement hiring priority. Grow to eight workers if two months' bills remain after recruiting.
  let employed=roster(s).length,target=policy==='lean'?4:8;
  if(s.actions&&employed<target&&(employed<3||s.cash>2*G.forecast(s)+440)){
   let candidates=s.mercs.filter(m=>m.status==='Candidate'&&m.expires>=s.turn&&m.baseId===s.operatingBase);
   if(!candidates.length&&s.actions>1){G.network(s,'command','recruits',Math.min(20,avg(s)+1,2*s.guildLevel+1));candidates=s.mercs.filter(m=>m.status==='Candidate'&&m.expires>=s.turn&&m.baseId===s.operatingBase);}
   candidates.sort((a,b)=>a.level-b.level||Object.keys(b.skills).length-Object.keys(a.skills).length);
   for(const m of candidates){if(!s.actions||roster(s).length>=target)break;const employment=policy==='retained'&&s.reputation>=20?'retained':'free',cost=2*G.wage(m.level);
    if(s.cash-cost>=G.forecast(s)+Math.max(220,employment==='retained'?G.wage(m.level)*2:0)||roster(s).length<3&&s.cash>=cost)act(s,'hire',m.id,'command',employment);
   }
  }
  // Recovered crew can be made ready before discovery using explicit care action, only if affordable.
  const sick=roster(s).filter(m=>m.status==='Recovering'&&m.baseId===s.operatingBase);
  if(ready(s).length<3&&sick.length&&s.actions&&s.cash>G.forecast(s)+25*sick.length)act(s,'recover',sick.slice(0,4).map(m=>m.id),'quarter');
  let searches=0;
  while(s.actions&&ready(s).length>=3){let b=best(s);
   if(b&&b.score>0){if(b.c.status==='Offer')G.secure(s,b.c.id,'command',s.guildFeats.includes('trusted')&&b.c.kind==='standard'&&s.contacts.includes(b.c.client)&&!s.trustedUsed);G.deploy(s,b.c.id,b.ids,b.leads);continue;}
   if(searches>=2||s.actions<2)break;
   G.network(s,'command','contracts',Math.min(20,avg(s)+1,2*s.guildLevel+1));searches++;
  }
  // Invest only from real reserves: one recruitment office, spare-person training, then maintenance.
  if(policy!=='lean'&&s.guildLevel>=2&&s.actions&&s.cash>3*G.forecast(s)+1100&&!s.facilities.some(f=>f.type==='recruitment_office'))act(s,'project','recruitment_office','quarter');
  let trainees=ready(s).slice(0,4);
  if(trainees.length&&s.actions&&s.cash>3*G.forecast(s)+500&&s.jobs.length>jobBefore)act(s,'train',trainees.map(m=>m.id),'field');
  for(const f of s.facilities)if(s.actions)act(s,'optimize',f.id,'quarter');
  // Full loyalty repair only if actual distress; don't spend every excess action on promotion.
  const low=roster(s).filter(m=>['Available','Recovering'].includes(m.status)&&m.loyalty<30);
  if(low.length&&s.actions&&s.cash>2*G.forecast(s)+10*low.length)act(s,'morale',low.map(m=>m.id),'liaison');
  const unused=s.actions;G.endActivity(s);
  while(G.nextJob(s)||s.operations.pendingReview){if(s.operations.pendingReview){const pending=s.operations.pendingReview,j=s.jobs.find(j=>j.id===pending.job),r=j.rolls[pending.phase],pc=G.heroPCs(s).find(o=>o.heroPoints>0);
    // Use limited Hero Points to prevent immediate serious complication or salvage a terminal fail.
    if(pc&&!r.heroSpent&&(r.degree===0||r.degree===1&&(j.quote.contractRules.complication_trigger==='failure'||pending.phase===2&&j.rolls.filter(x=>x.degree>=2).length<j.quote.contractRules.required_successes)))G.rerollPhase(s,pc.id);
    G.acknowledgePhase(s);
   }else G.rollPhase(s);
  }
  while(s.operations.choices.length){let c=s.operations.choices[0];if(c.type==='failedPay'){let j=s.jobs.find(j=>j.id===c.job);G.choice(s,c.id,s.cash>=Math.round(j.quote.pay*.5)?'half':'none');}else G.choice(s,c.id,c.eligible?.[0]||'none');}
  G.finishOperations(s);G.respondEvent(s,'accept');
  while(s.featChoices){let avail=G.availableGuildFeats(s),priority=['trusted','provisioned','standing','cadre','pipeline'],f=priority.map(id=>avail.find(f=>f.id===id)).find(Boolean);if(!f)break;G.chooseGuildFeat(s,f.id);}
  const distress=arrears(s)>0;distressTurns+=distress;if(distress&&!previousDistress)distressEntries++;previousDistress=distress;
  if(s.jobs.length===jobBefore)stalls++;
  if(s.guildLevel>=4&&first4===null)first4=t;if(s.guildLevel>=10&&first10===null)first10=t;
  const cashExpected=s.initialCash+s.ledger.reduce((n,l)=>n+l.amount,0);assert.equal(s.cash,cashExpected);assert(s.cash>=0);assert.equal(openingPool,s.actionHistory.filter(h=>h.turn===t).reduce((n,h)=>n+h.cost,0)+unused);
  trace.push({turn:t,cashStart,cash:s.cash,debtStart,debt:debt(s),arrearsStart:arrStart,arrears:arrears(s),guildLevel:s.guildLevel,guildXP:s.guildXP,pendingXP:s.pendingGuildXP,crew:roster(s).length,missing:s.mercs.filter(m=>m.status==='Missing').length,averageLevel:avg(s),jobs:s.jobs.length-jobBefore,successes:s.jobs.slice(jobBefore).filter(j=>j.result.success).length,unused,forecast:G.forecast(s),heroRemaining:G.heroPCs(s).reduce((n,o)=>n+o.heroPoints,0)});
  if(t<60){G.advance(s);if(s.phase==='upkeep'){for(const f of s.facilities){const active=roster(s).length>=5&&s.cash>G.forecast(s);if(f.type==='training_suite'&&f.staff.active!==active)G.renewStaff(s,f.id,active);}}}
 }
 return {seed,policy,monthlyHero:monthly,first4,first10,stalls,distressTurns,distressEntries,final:{cash:s.cash,debt:debt(s),arrears:arrears(s),level:s.guildLevel,xp:s.guildXP,crew:roster(s).length,missing:s.mercs.filter(m=>m.status==='Missing').length,completed:s.metrics.completed,failed:s.metrics.failed,loans:s.loans.length,bases:s.bases.map(b=>({type:b.type,status:b.status})),hireCount:s.metrics.hires},trace};
}
function stats(a){const vals=f=>a.map(f).sort((x,y)=>x-y),median=x=>x[Math.floor(x.length/2)],xs=vals(x=>x.final.level);return {attempted:a.length,level10:a.filter(x=>x.first10!==null).length,level10TurnRange:a.filter(x=>x.first10!==null).length?[Math.min(...a.filter(x=>x.first10!==null).map(x=>x.first10)),Math.max(...a.filter(x=>x.first10!==null).map(x=>x.first10))]:null,levelRange:[xs[0],xs.at(-1)],medianLevel:median(xs),medianCash:median(vals(x=>x.final.cash)),medianDebt:median(vals(x=>x.final.debt)),medianArrears:median(vals(x=>x.final.arrears)),everArrears:a.filter(x=>x.distressTurns).length,endArrears:a.filter(x=>x.final.arrears).length,endCrewUnder3:a.filter(x=>x.final.crew<3).length,medianStalls:median(vals(x=>x.stalls)),loanUsers:a.filter(x=>x.final.loans).length,ownedHQ:a.filter(x=>x.final.bases.some(b=>b.type==='field_hq')).length,medianCompleted:median(vals(x=>x.final.completed)),medianMissing:median(vals(x=>x.final.missing))};}
const policies=['lean','growth','retained'],runs=[];
for(const policy of policies)for(const monthly of [false,true]){let cohort=[];for(let seed=1;seed<=64;seed++){let r=run(seed,policy,monthly);cohort.push(r);runs.push(r);}console.log(policy,monthly,JSON.stringify(stats(cohort)));}
fs.writeFileSync(path.join(DIR,'results.json'),JSON.stringify({protocol:JSON.parse(fs.readFileSync(path.join(DIR,'../../protocol.json'))),policies:{lean:'Four-worker free-agent reserve policy, no property. Instructor paused unless useful.',growth:'Eight-worker free-agent reserve policy, one mobile HQ financed if needed, one recruitment office, spare training.',retained:'Same growth policy, new hires retained at Friendly reputation; starting four remain Free Agents.'},cohorts:policies.flatMap(policy=>[false,true].map(monthly=>({policy,monthlyHero:monthly,...stats(runs.filter(r=>r.policy===policy&&r.monthlyHero===monthly))}))),runs},null,2));

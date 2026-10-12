/* Frozen 0.3.9 audit. Synthetic fixtures are explicitly separated from legal startup cohorts. */
'use strict';
const fs=require('fs'),path=require('path');
const G=require('../../frozen/engine.js'),V=G.V;
const out=__dirname;
const avg=a=>a.reduce((s,x)=>s+x,0)/a.length;
function distribution(mod,dc){let count=[0,0,0,0];for(let f=1;f<=20;f++)count[G.degree(f,mod,dc)]++;return count.map(n=>n/20);}
function ev(p,v){return p.reduce((s,x,i)=>s+x*v[i],0);}
function open(s){G.settleUpkeep(s);for(const c of [...s.upkeep.choices])G.choice(s,c.id,'stop');G.finishUpkeep(s);}
const exact=[];
for(let level=1;level<=10;level++){
 let dc=V.level_dc[Math.min(20,2*level-1)],p=distribution(10,dc),pool=level+3;
 exact.push({level,pool,dc,pc_modifier:10,degrees:p,expected_reputation_per_promotion:ev(p,V.promotion_reputation_by_degree),expected_reputation_five_promotions:5*ev(p,V.promotion_reputation_by_degree),five_promotions_cost:250,expected_loyalty_per_morale:ev(p,V.morale_loyalty_by_degree),expected_recon_bonus:ev(p,[-1,0,1,2]),expected_broker_offers:ev(p,[0,0,1,2]),expected_recovery_reduction:ev(p,[0,0,1,2]),expected_network_count_at_admin_target:p[0]*.5+(1-p[0])*3});
}
const synthetics=[];
for(let level=1;level<=10;level++){
 let outcomes=[];
 for(let seed=1;seed<=1000;seed++){
  let s=G.fresh(seed,false,4,'lean');open(s);
  // SYNTHETIC: level/cash/pool set only here to isolate repeated actions, not to claim legal startup.
  s.guildLevel=level;s.actions=G.actionPool(s);s.cash=100000;
  for(let i=0;i<5;i++) {if(!s.actions)break;G.promote(s,'command');}
  outcomes.push(s.reputation);
 }
 synthetics.push({level,seeds:1000,promotions:Math.min(5,level+3),mean_rep_change:avg(outcomes),min:Math.min(...outcomes),max:Math.max(...outcomes),negative_runs:outcomes.filter(x=>x<0).length});
}
function candidates(s){return s.mercs.filter(m=>m.status==='Candidate'&&m.expires>=s.turn);}
function possible(s){const ids=s.mercs.filter(m=>m.status==='Available'&&m.baseId===s.primaryBase&&m.dispatchedTurn!==s.turn).map(m=>m.id);if(ids.length<3)return [];const squad=ids.slice(0,4);return s.board.filter(c=>['Offer','Accepted'].includes(c.status)&&c.expires>=s.turn).flatMap(c=>{let leads=G.chooseLeads(s,c,squad);if(!leads)return [];try{let q=G.quote(s,c,squad,leads);return [{c,squad,leads,q}];}catch{return [];}}).sort((a,b)=>{
 // Visible-card expected return proxy: risk-adjusted payout, with easier cards preferred.
 let score=x=>(x.q.payout-x.q.pay)/(x.c.kind==='routine'?1:x.c.kind==='standard'?1.2:x.c.kind==='demanding'?3:8);
 return score(b)-score(a);
 });}
function campaign(seed,fill){let s=G.fresh(seed,false,4,'staffed'),trace=[],reason=null;
 for(let month=1;month<=24;month++){
  open(s);let levelAtStart=s.guildLevel,pool=G.actionPool(s),cashBefore=s.cash,available=s.mercs.filter(m=>m.status==='Available').length;
  // Recruit only to replace loss or add a fifth ready member, with a funded two-Upkeep cushion.
  let live=s.mercs.filter(m=>['Available','Recovering','Onboarding','Deployed'].includes(m.status));
  if(live.length<4&&s.cash>1100){
   if(!candidates(s).length)G.network(s,'liaison','recruits',Math.max(1,Math.floor(live.reduce((n,m)=>n+m.level,0)/Math.max(1,live.length))));
   for(const m of candidates(s).sort((a,b)=>a.level-b.level)){if(live.length>=4||s.actions<1||s.cash<2*G.wage(m.level)+750)break;G.hire(s,m.id,'liaison');live.push(m);}
  }
  // Recovery is never repeated on the same recovering operative during this turn.
  let recovering=s.mercs.filter(m=>m.status==='Recovering').slice(0,4);
  if(recovering.length&&s.actions&&s.cash>G.forecast(s)+25*recovering.length)G.recover(s,recovering.map(m=>m.id),'liaison');
  let jobs=possible(s);
  if(!jobs.length&&s.actions){let ready=s.mercs.filter(m=>m.status==='Available'),target=Math.max(1,Math.floor(ready.reduce((n,m)=>n+m.level,0)/Math.max(1,ready.length)));G.network(s,'command','contracts',target);jobs=possible(s);}
  if(jobs.length&&s.actions){let j=jobs[0];if(j.c.status==='Offer')G.secure(s,j.c.id,'command',s.guildFeats.includes('trusted')&&j.c.kind==='standard'&&s.contacts.includes(j.c.client));if(s.actions)G.recon(s,j.c.id,'quarter',1);G.deploy(s,j.c.id,j.squad,j.leads);}
  // Fill policy spams promotion while leaving forecast plus half failed-job payroll as reserve.
  let payrollReserve=Math.ceil(s.jobs.filter(j=>j.departure===s.turn&&!j.settled).reduce((n,j)=>n+j.quote.pay,0)/2);
  if(!payrollReserve)payrollReserve=Math.ceil(s.mercs.filter(m=>m.status==='Available').slice(0,4).reduce((n,m)=>n+G.assignmentWage(m),0)/2);
  if(fill)while(s.actions>0&&s.cash>=G.forecast(s)+payrollReserve+50)G.promote(s,'command');
  let actionsUsed=pool-s.actions,promotions=s.actionHistory.filter(h=>h.turn===s.turn&&h.action==='Promote the Guild').length;
  G.endActivity(s);
  while(G.nextJob(s)||s.operations.pendingReview){if(s.operations.pendingReview){G.acknowledgePhase(s);continue;}let r=G.rollPhase(s);if(r.degree===0){let pc=G.heroPCs(s).find(o=>o.heroPoints>0);if(pc)G.rerollPhase(s,pc.id);}}
  for(const c of [...s.operations.choices]){if(c.type==='mvp')G.choice(s,c.id,c.eligible[0]||'none');else if(c.type==='failedPay'){let j=s.jobs.find(j=>j.id===c.job);G.choice(s,c.id,s.cash>=Math.round(j.quote.pay/2)?'half':'none');}}
  G.finishOperations(s);G.respondEvent(s,'accept');
  if(s.featChoices&&G.availableGuildFeats(s).length)G.chooseGuildFeat(s,G.availableGuildFeats(s).find(f=>f.id==='trusted')?.id||G.availableGuildFeats(s)[0].id);
  let ledgerTotal=s.initialCash+s.ledger.reduce((n,l)=>n+l.amount,0),guildXP=s.jobs.filter(j=>j.settled&&j.result.success).reduce((n,j)=>n+j.quote.contractRules.guild_xp,0);
  if(ledgerTotal!==s.cash||s.cash<0)throw new Error('Cash conservation failed');
  if(guildXP!==1000*(s.guildLevel-1)+s.guildXP+s.pendingGuildXP)throw new Error('Guild XP conservation failed');
  trace.push({turn:s.turn,levelAtStart,pool,actionsUsed,unused:pool-actionsUsed,promotions,availableAtStart:available,cashBefore,cashEnd:s.cash,arrears:s.arrears.reduce((n,a)=>n+a.amount,0),guildLevel:s.guildLevel,guildXP:s.guildXP,jobs:s.jobs.filter(j=>j.departure===s.turn).map(j=>({kind:j.contract.kind,level:j.contract.level,success:j.result.success,payout:j.quote.payout,pay:j.quote.pay})),officerUse:s.officers.map(o=>({id:o.id,used:o.used}))});
  if(month<24)G.advance(s);
 }
 return {seed,policy:fill?'reserve-limited-promotion-fill':'leave-surplus-unused',completedTurns:trace.length,level:s.guildLevel,cash:s.cash,arrears:s.arrears.reduce((n,a)=>n+a.amount,0),completed:s.metrics.completed,failed:s.metrics.failed,reason,trace};
}
const runs=[];for(let seed=1;seed<=64;seed++)for(const fill of [false,true])runs.push(campaign(seed,fill));
const campaigns=['leave-surplus-unused','reserve-limited-promotion-fill'].map(policy=>{let group=runs.filter(r=>r.policy===policy),months=group.flatMap(r=>r.trace);return {policy,attemptedRuns:group.length,completedRuns:group.length,completedTurns:months.length,meanLevel:avg(group.map(r=>r.level)),meanCash:avg(group.map(r=>r.cash)),runsWithArrears:group.filter(r=>r.arrears>0).length,meanUnusedActions:avg(months.map(t=>t.unused)),meanPromotionsPerTurn:avg(months.map(t=>t.promotions)),monthsWithoutMissions:months.filter(t=>!t.jobs.length).length,monthsWithNoAvailableCrew:months.filter(t=>!t.availableAtStart).length,levelUse:Array.from({length:10},(_,i)=>{let m=months.filter(t=>t.levelAtStart===i+1);return {level:i+1,months:m.length,meanUnusedActions:m.length?avg(m.map(t=>t.unused)):null,meanPromotions:m.length?avg(m.map(t=>t.promotions)):null};})};});
const contractPipeline=Array.from({length:10},(_,i)=>({level:i+1,pool:i+4,oneSquadNetworkAndSecure:2,oneSquadWithRecon:3,oneSquadSurplus:i+1,threeSquadsNetworkAndSecure:4,threeSquadsWithRecon:7,threeSquadsSurplus:i-3,comment:'One search supplies 3 leads on any non-critical-failure. Pipeline counts ideal local usable cards; actual quality, expiration, funds and personnel can require extra searches.'}));
function missionChance(bonuses){let wins=0;for(let a=1;a<=20;a++)for(let b=1;b<=20;b++)for(let c=1;c<=20;c++){let faces=[a,b,c],previous=null,criticalFails=0,successes=0;for(let p=0;p<3;p++){let modifier=[10,8,8][p]+bonuses[p]-2*criticalFails+(previous===1?-1:previous===3?1:0),d=G.degree(faces[p],modifier,15);successes+=d>=2;criticalFails+=d===0;previous=d;}wins+=successes>=2;}return wins/8000;}
const baselineChance=missionChance([0,0,0]);
const comparisonByDegree=[0,1,2,3].map(d=>({adminDegree:d,ordinaryRecon:missionChance([0,[-1,0,1,2][d],0]),proposedTwoActionBriefing:missionChance(d===0?[0,-1,0]:d===1?[0,0,0]:d===2?[1,1,1]:[2,2,2])}));
const normalized=distribution(10,15),campaignDegrees=[-2,0,5,8];
const multiActionBenchmarks={scope:'Draft design math only, not live-engine implementation. Fixed opening squad modifiers10/8/8 versusDC15; no Hero Points. Administrative +10vsDC15 reference for eventual PC progression, not current Guild3 DC20.',promotion:{twoOrdinaryCost:100,twoOrdinaryExpectedRep:2*ev(normalized,V.promotion_reputation_by_degree),proposedCampaignCost:100,campaignDegreeResults:campaignDegrees,proposedExpectedRep:ev(normalized,campaignDegrees)},briefing:{baselineChance,comparisonByDegree,ordinaryReconWeightedChance:comparisonByDegree.reduce((n,x,i)=>n+x.ordinaryRecon*normalized[i],0),proposedBriefingWeightedChance:comparisonByDegree.reduce((n,x,i)=>n+x.proposedTwoActionBriefing*normalized[i],0)}};
const result={protocol:'0.3.9',exactPromotionAndMorale:exact,syntheticFivePromotionMonth:synthetics,legalStartupCohort:campaigns,contractPipeline,multiActionBenchmarks,notes:['Exact degree enumeration assumes uniform d20; synthetic seeds 1–1000 check executable implementation and are not proof of uniform hash quality.','Startup 128 attempted, all 24 turns run; stalls recorded as no-mission months rather than silently dropped. No target-seed selection, future-die peek, artificial wealth, session refresh, state edit, or source edit in legal campaigns.','No expansion/training/new-squad policy; cohorts quantify conservative one-squad action utility, not fastest leveling or maximum economy.','Both policies use sequential seeds 1–64, but promotion consumes action-history keys and changes later deterministic dice. Differences are cohort associations, not an identical-mission causal counterfactual.','Fixed +10 PC administrative skills are a prototype artifact.','Cash and earned Guild XP conservation asserted every completed legal campaign month.']};
fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(result,null,2));
fs.writeFileSync(path.join(out,'traces.json'),JSON.stringify(runs,null,2));
console.log(JSON.stringify(result,null,2));

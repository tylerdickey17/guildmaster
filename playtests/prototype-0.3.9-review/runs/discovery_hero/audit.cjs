const fs=require('fs');
const G=require('../../frozen/engine.js'),V=G.V;
const pct=x=>Math.round(x*1e6)/1e6;
const kinds=['routine','standard','demanding','expert','legendary'];
// This is a probability/model audit. Mutated quote fixtures are not legal campaigns.
function fixture(crewLevel,missionLevel,kind){
 const s=G.fresh(7,false,4,'staffed');G.settleUpkeep(s);G.finishUpkeep(s);
 s.mercs.forEach(m=>m.level=crewLevel);
 const c={...G.templates.find(t=>t.kind===kind),id:'synthetic',baseId:'hq',level:missionLevel,status:'Accepted'};
 const ids=s.mercs.map(m=>m.id),leads=G.chooseLeads(s,c,ids);
 return {s,c,q:G.quote(s,c,ids,leads)};
}
function transition(st,d){return {p:st.p+1,cf:st.cf+(d===0?1:0),prev:d,successes:st.successes+(d>=2?1:0),missing:st.missing||(st.p===2&&d<2),injury:st.injury||(st.p===0&&d<2),repairs:st.repairs+(st.p===1&&d<2?1:0)};}
function mission(q,policy='none',budget=0){
 const card=q.contractRules,trigger=card.complication_trigger==='failure'?2:1,memo=new Map();
 function add(st,d){const n=transition(st,d);n.missing=st.missing||(st.p===2&&d<trigger);n.injury=st.injury||(st.p===0&&d<trigger);n.repairs=st.repairs+(st.p===1&&d<trigger?G.round(q.repairWage*card.severity*(d===0&&trigger===2?2:1)*(trigger===1?.5:1)):0);return n;}
 function visit(st,b){
  if(st.p===3)return [st.successes>=card.required_successes?1:0,+st.missing,+st.injury,st.repairs,+(st.missing&&st.successes>=card.required_successes)];
  const key=JSON.stringify([st,b]);if(memo.has(key))return memo.get(key);
  const ck=q.checks[st.p],mod=ck.modifier-2*st.cf+(st.prev===1?-1:st.prev===3?1:0);
  const outcomes=Array.from({length:20},(_,i)=>G.degree(i+1,mod,ck.dc));
  const total=[0,0,0,0,0];
  for(const d of outcomes){let chosen=visit(add(st,d),b);
   if(b>0&&policy!=='none'){
    const reroll=[0,0,0,0,0];for(const rd of outcomes){const r=visit(add(st,rd),b-1);r.forEach((v,i)=>reroll[i]+=v/20);}
    if((policy==='greedy'&&d<2)||(policy==='optimal'&&reroll[0]>chosen[0]+1e-12))chosen=reroll;
   }
   chosen.forEach((v,i)=>total[i]+=v/20);
  }
  memo.set(key,total);return total;
 }
 const out=visit({p:0,cf:0,prev:null,successes:0,missing:false,injury:false,repairs:0},budget);
 return {success:pct(out[0]),missing:pct(out[1]),injury:pct(out[2]),expectedRepairCost:pct(out[3]),successAndMissing:pct(out[4])};
}
function discovery(target){
 const deg=[0,0,0,0];for(let f=1;f<=20;f++)deg[G.degree(f,10,V.level_dc[target])]+=.05;
 const expectations={quantity:0,...Object.fromEntries(kinds.map(k=>[k,0])),Rare:0,Uncommon:0};
 const oneListProbability={expertOrLegendary:0,legendary:0,Rare:0};
 const byDegree=[];
 for(let d=0;d<4;d++){
  const k={},rarity={},levels={};
  for(let face=1;face<=20;face++){
   let e=G.discoveryEntry(d,target,{level:face,difficulty:face,rarity:face},20);
   k[e.kind]=(k[e.kind]||0)+.05;rarity[e.rarity]=(rarity[e.rarity]||0)+.05;levels[e.level]=(levels[e.level]||0)+.05;
  }
  const n=d===0?.5:3;expectations.quantity+=deg[d]*n;
  for(const kind of kinds)expectations[kind]+=deg[d]*n*(k[kind]||0);
  for(const r of ['Rare','Uncommon'])expectations[r]+=deg[d]*n*(rarity[r]||0);
  for(const [prop,p] of [['expertOrLegendary',(k.expert||0)+(k.legendary||0)],['legendary',k.legendary||0],['Rare',rarity.Rare||0]])oneListProbability[prop]+=deg[d]*(d===0?.5*p:1-(1-p)**3);
  byDegree.push({degree:G.names[d],probability:pct(deg[d]),meanQuantity:n,kinds:k,rarity,levels});
 }
 return {target,modifier:10,dc:V.level_dc[target],byDegree,expectations:Object.fromEntries(Object.entries(expectations).map(([k,v])=>[k,pct(v)])),oneListProbability:Object.fromEntries(Object.entries(oneListProbability).map(([k,v])=>[k,pct(v)]))};
}
function legalNetworkCohort(mode,repeat){
 const out={mode,repeatedSearches:repeat,attempted:10000,degreeCounts:[0,0,0,0],quantity:0,kinds:{},rarity:{},level:{},runsAnyExpert:0,runsAnyLegendary:0,runsAnyRare:0};
 for(let seed=1;seed<=out.attempted;seed++){
  const s=G.fresh(seed,false,4,'staffed');G.settleUpkeep(s);G.finishUpkeep(s);let seenE=false,seenL=false,seenR=false;
  for(let i=0;i<repeat;i++){
   G.network(s,'command',mode,1);const d=s.lastDiscovery;out.degreeCounts[d.degree]++;out.quantity+=d.results.length;
   for(const r of d.results){out.kinds[r.kind||'candidate']=(out.kinds[r.kind||'candidate']||0)+1;out.rarity[r.rarity]=(out.rarity[r.rarity]||0)+1;out.level[r.level]=(out.level[r.level]||0)+1;seenE ||= ['expert','legendary'].includes(r.kind);seenL ||= r.kind==='legendary';seenR ||= r.rarity==='Rare';}
  }
  out.runsAnyExpert+=+seenE;out.runsAnyLegendary+=+seenL;out.runsAnyRare+=+seenR;
 }
 out.conservation='All calls used public engine API; fresh Staffed starters, seeds 1–10000; one Activity only; no dice/state editing; no financial or progression campaign claim.';return out;
}
function apiChecks(){
 const checks=[];const check=(label,fn)=>{try{fn();checks.push({label,passed:true});}catch(e){checks.push({label,passed:false,error:e.message});}};
 const assert=(v,msg)=>{if(!v)throw Error(msg);};
 const s=G.fresh(13,false,4,'staffed');G.settleUpkeep(s);G.finishUpkeep(s);G.network(s,'command','recruits',1);
 const candidate=s.mercs.find(m=>m.status==='Candidate');if(candidate){G.hire(s,candidate.id,'command');check('Hire cannot deploy during onboarding',()=>assert(candidate.status==='Onboarding'&&candidate.readyAt===2,'Candidate did not onboard next turn'));}
 check('Three phases cannot repeat a lead',()=>{const c=s.board[0],ids=s.mercs.filter(m=>m.status==='Available').map(m=>m.id);let blocked=false;try{G.quote(s,c,ids,[ids[0],ids[0],ids[0]]);}catch(e){blocked=/different/.test(e.message);}assert(blocked,'Repeated leads accepted');});
 check('Missing skill cannot lead Normal',()=>{const c=s.board[1],ids=s.mercs.filter(m=>m.status==='Available').map(m=>m.id);assert(!G.leadEligible(c,s.mercs[1],1),'Untrained Computers accepted');});
 check('Hero review required; second reroll blocked',()=>{const c=s.board[0],ids=s.mercs.filter(m=>m.status==='Available').map(m=>m.id);G.secure(s,c.id,'command');const j=G.deploy(s,c.id,ids,G.chooseLeads(s,c,ids));G.endActivity(s);G.rollPhase(s);G.rerollPhase(s,'command');let blocked=false;try{G.rerollPhase(s,'quarter');}catch(e){blocked=/Only one/.test(e.message);}assert(blocked,'Second reroll accepted');assert(s.officers[0].heroPoints===0,'Hero Point not consumed');G.acknowledgePhase(s);});
 check('Manual session reset replenishes spent point without month advancement',()=>{const t=s.turn;G.startHeroSession(s);assert(s.turn===t&&s.officers[0].heroPoints===1,'Session sensitivity missing');});
 return checks;
}
const quotes=[];
for(const [crew,job] of [[1,1],[3,3],[5,1],[5,3],[5,5],[9,3],[9,7],[9,9]])for(const kind of kinds){
 const f=fixture(crew,job,kind),none=mission(f.q),greedy=mission(f.q,'greedy',3),one=mission(f.q,'optimal',1),optimal=mission(f.q,'optimal',3);
 const card=f.q.contractRules;
 quotes.push({fixture:'Synthetic legal-shaped quote, crew levels assigned for analysis only',crewLevel:crew,missionLevel:job,kind,modifiers:f.q.checks.map(c=>c.modifier),dc:f.q.checks[0].dc,payout:f.q.payout,pay:f.q.pay,none,greedyThreePoints:greedy,optimalOnePoint:one,optimalThreePoints:optimal,expectedGuildXP:pct(none.success*card.guild_xp),expectedHeroGuildXP:pct(greedy.success*card.guild_xp),netBeforeFixedOverhead:pct(none.success*f.q.payout-(.5+.5*none.success)*f.q.pay-none.expectedRepairCost)});
}
const result={protocol:JSON.parse(fs.readFileSync('../../protocol.json','utf8')),method:'Exact DP with independent uniform d20 faces and frozen engine degree/quote rules. Probability fixtures do not prove legal startup speed. Legal cohorts use deterministic engine dice, no resets, state edits or future peeking. Money expectation uses half wages on failure, excludes replacements/training/fixed overhead ; exact frozen repair severity/pricing included.',discovery:[1,3,5,7,10,15,20].map(discovery),quotes,legalDiscoveryCohorts:[legalNetworkCohort('contracts',1),legalNetworkCohort('contracts',4),legalNetworkCohort('recruits',1),legalNetworkCohort('recruits',4)],apiChecks:apiChecks()};
fs.writeFileSync('results.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({quoteFixtures:quotes.length,cohorts:result.legalDiscoveryCohorts.map(c=>({mode:c.mode,searches:c.repeatedSearches,attempted:c.attempted,anyExpert:c.runsAnyExpert/c.attempted,anyLegendary:c.runsAnyLegendary/c.attempted,anyRare:c.runsAnyRare/c.attempted})),apiChecks:result.apiChecks},null,2));

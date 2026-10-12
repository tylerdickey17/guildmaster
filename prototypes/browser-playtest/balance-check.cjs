// Exact one-contract arithmetic; does not simulate growth, replacement or expansion.
const G=require('./dist/engine.js');
const s=G.fresh(7,false,4,'staffed');G.settleUpkeep(s);G.finishUpkeep(s);
const c=s.board[0],ids=s.mercs.map(m=>m.id),q=G.quote(s,c,ids,G.chooseLeads(s,c,ids));
let wins=0,repair=0,missing=0;
for(let a=1;a<=20;a++)for(let b=1;b<=20;b++)for(let e=1;e<=20;e++){
 const degrees=[];let critFailures=0;
 for(const [p,face] of [a,b,e].entries()){
  const prev=degrees[p-1],mod=q.checks[p].modifier-2*critFailures+(prev===1?-1:prev===3?1:0);
  const d=G.degree(face,mod,q.checks[p].dc);degrees.push(d);if(d===0)critFailures++;
 }
 if(degrees.filter(d=>d>=2).length>=q.contractRules.required_successes)wins++;
 if(degrees[1]===0)repair+=25;if(degrees[2]===0)missing++;
}
const success=wins/8000,repairMean=repair/8000,upkeep=G.forecast(s);
console.log(JSON.stringify({scope:'Exact opening Dock Nine contract, four Level1 Free Agents, optimal distinct leads, staffed HQ, half failed wages. No training, replacement, future crew loss or expansion.',combinations:8000,successProbability:success,expectedRepairCredits:repairMean,missingRisk:missing/8000,monthlyUpkeep:upkeep,currentNormalPayout:q.payout,expectedMonthlyNet:q.payout*success-q.pay*success-q.pay*.5*(1-success)-upkeep-repairMean,proposed900PayoutMonthlyNet:900*success-q.pay*success-q.pay*.5*(1-success)-upkeep-repairMean,proposalStatus:'Payout and compensation comparisons are discussion only. Level 2/4 development gates are implemented in 0.3.6.',compensationComparisons:[{payout:600,wage:50},{payout:600,wage:75},{payout:900,wage:110}].map(x=>({...x,cleanSuccessAfterUpkeep:x.payout-4*x.wage-upkeep,expectedMonthlyNet:x.payout*success-4*x.wage*(success+.5*(1-success))-upkeep-repairMean*(x.wage/50)}))},null,2));

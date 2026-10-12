const fs=require('fs');
const median=a=>a.sort((x,y)=>x-y)[Math.floor(a.length/2)];
for(const prefix of ['', 'capped-search-', 'relocation-fixed-']){
 const p=__dirname+'/'+prefix+'results.json',r=JSON.parse(fs.readFileSync(p));
 for(const c of r.cohorts){const rr=r.runs.filter(x=>x.policy===c.policy&&x.monthlyHero===c.monthlyHero),hit=rr.filter(x=>x.first10!==null);
  c.medianLevel10Turn=median(hit.map(x=>x.first10));c.medianUnusedActionsPerTurn=median(rr.map(x=>x.trace.reduce((n,t)=>n+t.unused,0)/60));c.levelByMonth={};for(const t of [16,24,36,60])c.levelByMonth[t]=median(rr.map(x=>x.trace[t-1].guildLevel));c.allEverArrearsEventuallyCured=rr.filter(x=>x.distressTurns).every(x=>x.final.arrears===0);
 }
 const tail=r.runs.filter(x=>x.final.arrears>0).map(x=>({seed:x.seed,policy:x.policy,monthly:x.monthlyHero,final:x.final,firstDistress:x.trace.find(t=>t.arrears>0),lastSix:x.trace.slice(-6)}));
 const fastest=r.runs.filter(x=>x.first10!==null).sort((a,b)=>a.first10-b.first10)[0];
 const primaryFastest=r.runs.filter(x=>x.first10!==null&&!x.monthlyHero).sort((a,b)=>a.first10-b.first10)[0];
 fs.writeFileSync(p,JSON.stringify(r,null,2));fs.writeFileSync(__dirname+'/'+prefix+'summary.json',JSON.stringify({cohorts:r.cohorts,tailCases:tail,fastest:{seed:fastest.seed,policy:fastest.policy,monthly:fastest.monthlyHero,turn:fastest.first10,trace:fastest.trace.slice(0,fastest.first10)},primaryFastest:{seed:primaryFastest.seed,policy:primaryFastest.policy,monthly:primaryFastest.monthlyHero,turn:primaryFastest.first10,trace:primaryFastest.trace.slice(0,primaryFastest.first10)}},null,2));
 console.log(prefix||'adaptive-search',JSON.stringify(r.cohorts));
}

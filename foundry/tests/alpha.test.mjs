import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const copy=v=>JSON.parse(JSON.stringify(v));
class Collection extends Map {
  filter(fn){return [...this.values()].filter(fn);}
  find(fn){return [...this.values()].find(fn);}
  some(fn){return [...this.values()].some(fn);}
}
let counter=0,dice=[],nativeFace=15,nativeDegree=null,cancelNative=false,actorUpdateFail=false,journalCommitFail=false,chatFail=false,afterNative=null;
const notices=[];
globalThis.game={user:{id:'gm-a',name:'GM',isGM:true,active:true},users:new Collection(),actors:new Collection(),journal:new Collection(),messages:new Collection(),version:'14.369',system:{id:'sf2e',version:'1.6.1'}};
game.users.set(game.user.id,game.user);
class MockRoll {
  constructor(formula='1d20'){this.formula=formula;this.options={};}
  async evaluate(){this.total=dice.shift()??15;this.dice=[{faces:20,results:[{result:this.total,active:true}]}];return this;}
  toJSON(){return {formula:this.formula,total:this.total,options:this.options,dice:this.dice};}
  static fromJSON(json){const roll=new MockRoll();Object.assign(roll,JSON.parse(json));return roll;}
  async toMessage(data,options){assert.equal(options.messageMode,'public');return MockMessage.create({...data,rolls:[this.toJSON()]});}
}
class MockMessage {
  static getSpeaker({actor}){return {actor:actor.id,alias:actor.name};}
  static async create(data){if(chatFail)throw new Error('simulated chat failure');const doc={...copy(data),id:`msg${++counter}`,getFlag:(scope,key)=>data.flags?.[scope]?.[key]};game.messages.set(doc.id,doc);return doc;}
}
class MockJournal {
  static async create(data){const doc=new MockJournal(data);game.journal.set(doc.id,doc);return doc;}
  constructor(data){Object.assign(this,copy(data));this.id=`guild${++counter}`;this.uuid=`JournalEntry.${this.id}`;}
  getFlag(scope,key){return this.flags[scope]?.[key];}
  async setFlag(scope,key,value){if(journalCommitFail&&!value.pendingHeroSpend){journalCommitFail=false;throw new Error('simulated final journal write failure');}this.flags[scope]??={};this.flags[scope][key]=copy(value);return this;}
}
globalThis.foundry={utils:{randomID:()=>`tx${++counter}`},dice:{Roll:MockRoll},applications:{api:{ApplicationV2:class {constructor(){} async render(){return this;}async close(){return this;}},DialogV2:{}}}};
globalThis.CONFIG={ChatMessage:{documentClass:MockMessage},JournalEntry:{documentClass:MockJournal}};
globalThis.CONST={DOCUMENT_OWNERSHIP_LEVELS:{OBSERVER:2}};
globalThis.ui={notifications:{warn:m=>notices.push(m),error:m=>notices.push(m)}};
globalThis.fromUuid=async uuid=>game.actors.find(a=>a.uuid===uuid)??game.journal.find(j=>j.uuid===uuid)??null;
const C=await import('../guildmaster/scripts/core.mjs');
const {GuildmasterSheet}=await import('../guildmaster/scripts/sheet.mjs');
const {E,envelope,commitCommand,createGuild,executeWithRolls,dispatch,clone}=C;
const results=[];
async function test(name,fn){await fn();results.push(name);console.log('PASS',name);}
function pc(id,mod=8,rank=1){
  const actor={id,uuid:`Actor.${id}`,documentName:'Actor',type:'character',name:`PC ${id}`,system:{resources:{heroPoints:{value:2,max:3}},skills:{}},getStatistic:skill=>({mod,rank:actor.system.skills[skill]?.rank??rank,roll:async params=>{
    assert.equal(params.createMessage,false);assert.equal(params.messageMode,'public');
    if(cancelNative)return null;
    const roll=new MockRoll(`1d20 + ${mod}`);roll.total=nativeFace+mod;roll.dice=[{faces:20,results:[{result:nativeFace,active:true}]}];roll.options.degreeOfSuccess=nativeDegree??E.degree(nativeFace,mod,params.dc.value);
    if(afterNative)await afterNative();return roll;
  }}),update:async data=>{if(actorUpdateFail)throw new Error('simulated actor write failure');actor.system.resources.heroPoints.value=data['system.resources.heroPoints.value'];return actor;}};
  game.actors.set(id,actor);return actor;
}
const actors=['a','b','c','d'].map(id=>pc(id));
async function guild(preset='lean') {
  const j=await createGuild({name:'Test Guild',partySize:4,preset});
  for(let i=0;i<4;i++)await commitCommand(j,{name:'linkOfficer',args:[envelope(j).state.officers[i].id,actors[i].uuid]});
  return j;
}
async function opened(){const j=await guild();await commitCommand(j,{name:'settleUpkeep'});await commitCommand(j,{name:'finishUpkeep'});return j;}
async function deployed(){const j=await opened(),s=envelope(j).state,c=s.board[0],ids=s.mercs.map(m=>m.id),leads=E.chooseLeads(s,c,ids);await commitCommand(j,{name:'secure',args:[c.id,'command']});await commitCommand(j,{name:'deploy',args:[c.id,ids,leads,null]});await commitCommand(j,{name:'endActivity'});return j;}
async function setState(j,edit){const saved=clone(envelope(j));edit(saved.state);await j.setFlag(C.ID,'guild',saved);}

await test('module manifest targets exact installed system without claiming runtime verification',async()=>{
  const m=JSON.parse(await readFile(new URL('../guildmaster/module.json',import.meta.url),'utf8'));
  assert.equal(m.id,'guildmaster');assert.equal(m.compatibility.minimum,'14.369');assert.equal(m.relationships.systems[0].id,'sf2e');assert.equal(m.relationships.systems[0].compatibility.minimum,'1.6.1');assert.equal(m.compatibility.verified,undefined);assert.equal(m.version,'0.1.0-alpha.2');assert.equal(m.manifest,'https://raw.githubusercontent.com/tylerdickey17/guildmaster/main/foundry/guildmaster/module.json');assert.equal(m.download,'https://raw.githubusercontent.com/tylerdickey17/guildmaster/main/foundry/releases/guildmaster-0.1.0-alpha.2.zip');assert.equal(m.version,C.VERSION);
});
await test('guild creation stores a persistent shared observer journal and four unlinked PC slots',async()=>{
  const j=await createGuild();assert.equal(j.ownership.default,2);assert.equal(envelope(j).state.mercs.length,4);assert(envelope(j).state.officers.every(o=>!o.actorUuid&&o.heroPoints===0));assert.equal(envelope(j).state.cash,2000);
});
await test('one PC cannot fill two officer slots',async()=>{
  const j=await guild(),before=JSON.stringify(envelope(j));await assert.rejects(commitCommand(j,{name:'linkOfficer',args:['field',actors[0].uuid]}),/only one/);assert.equal(JSON.stringify(envelope(j)),before);
});
await test('players cannot mutate the guild or create one',async()=>{
  const j=await opened(),original=game.user;game.user={id:'player',isGM:false};
  try{await assert.rejects(commitCommand(j,{name:'promote',args:['command']}),/coordinating GM/);await assert.rejects(createGuild(),/coordinating GM/);}finally{game.user=original;}
});
await test('second active GM cannot commit and authority transfers when coordinating GM disconnects',async()=>{
  const j=await opened(),original=game.user,second={id:'gm-z',isGM:true,active:true};game.users.set(second.id,second);game.user=second;
  try{await assert.rejects(commitCommand(j,{name:'promote',args:['command']}),/coordinating GM/);original.active=false;await commitCommand(j,{name:'promote',args:['command']});}finally{original.active=true;game.user=original;game.users.delete(second.id);}
});
await test('native actor modifiers replace the demo advancement adjustment',async()=>{
  const j=await opened();await setState(j,s=>{s.guildLevel=8;s.actions=11;});await commitCommand(j,{name:'promote',args:['command']});const roll=envelope(j).state.lastRoll;assert.equal(roll.modifier,8);assert.equal(roll.face,nativeFace);assert.equal(roll.total,nativeFace+8);
});
await test('native degree adjustments determine administrative outcomes',async()=>{
  const j=await opened();nativeDegree=3;try{await commitCommand(j,{name:'promote',args:['command']});assert.equal(envelope(j).state.lastRoll.degree,3);assert.equal(envelope(j).state.reputation,4);}finally{nativeDegree=null;}
});
await test('funded hired outpost chiefs use their printed modifiers with real dice',async()=>{
  const j=await opened();await setState(j,s=>{const chief={id:'chief-test',name:'Test Chief',baseId:'outpost-test',readyAt:s.turn,paidTurn:s.turn,used:0,skills:{Diplomacy:7,Computers:7}};s.bases.push({id:'outpost-test',type:'outpost',name:'Test Outpost',status:'Operational',readyAt:s.turn,monthly:80,slots:2,chief});s.officers.push(chief);s.operatingBase='outpost-test';});dice=[13];await commitCommand(j,{name:'promote',args:['chief-test']});assert.equal(envelope(j).state.lastRoll.modifier,7);assert.equal(envelope(j).state.lastRoll.face,13);
});
await test('cancelled native checks spend no actions, cash, or generated candidates',async()=>{
  const j=await opened(),before=JSON.stringify(envelope(j));cancelNative=true;try{await assert.rejects(commitCommand(j,{name:'network',args:['command','recruits',1]}),/cancelled/);assert.equal(JSON.stringify(envelope(j)),before);}finally{cancelNative=false;}
});
await test('training gates use proficiency ranks, not nonzero modifiers',async()=>{
  const j=await opened(),s=envelope(j).state;actors[0].system.skills.computers={rank:0};
  try{await commitCommand(j,{name:'secure',args:[s.board[0].id,'command']});await assert.rejects(commitCommand(j,{name:'recon',args:[s.board[0].id,'command',1]}),/Trained Computers/);}finally{delete actors[0].system.skills.computers;}
});
await test('stale sheet revisions fail without spending',async()=>{
  const j=await opened(),revision=envelope(j).revision;await commitCommand(j,{name:'promote',args:['command']},revision);const before=JSON.stringify(envelope(j));await assert.rejects(commitCommand(j,{name:'network',args:['command','recruits',1]},revision),/out of date/);assert.equal(JSON.stringify(envelope(j)),before);
});
await test('simultaneous commands serialize and the stale second command does not spend',async()=>{
  const j=await opened(),revision=envelope(j).revision,before=envelope(j).state.actions;
  const result=await Promise.allSettled([commitCommand(j,{name:'network',args:['command','recruits',1]},revision),commitCommand(j,{name:'network',args:['command','contracts',1]},revision)]);assert.equal(result.filter(r=>r.status==='fulfilled').length,1);assert.equal(envelope(j).state.actions,before-1);
});
await test('authority loss during native roll prevents a guild commit',async()=>{
  const j=await opened(),before=JSON.stringify(envelope(j));afterNative=async()=>{game.user.active=false;};try{await assert.rejects(commitCommand(j,{name:'promote',args:['command']}),/coordinating GM/);assert.equal(JSON.stringify(envelope(j)),before);}finally{game.user.active=true;afterNative=null;}
});
await test('capacity follows Reputation tiers and counts unavailable operatives',async()=>{
  const s=E.fresh();for(const [rep,cap] of [[-20,6],[0,6],[19,6],[20,9],[49,9],[50,12],[79,12],[80,15],[100,15]]){s.reputation=rep;assert.equal(E.operativeCapacity(s),cap);}s.mercs[0].status='Missing';s.mercs[1].status='Training';s.mercs[2].status='Recovering';s.mercs[3].status='Onboarding';assert.equal(E.rosterCount(s),4);
});
await test('both employment types are blocked at capacity without spending',async()=>{
  const j=await opened();await setState(j,s=>{s.reputation=20;for(let i=s.mercs.length;i<9;i++)s.mercs.push(E.makeMerc(s,E.people[i%E.people.length]));const m=E.makeMerc(s,E.people[0]);m.status='Candidate';m.expires=s.turn+1;s.mercs.push(m);});const before=JSON.stringify(envelope(j)),candidate=envelope(j).state.mercs.at(-1);
  for(const type of ['free','retained'])await assert.rejects(commitCommand(j,{name:'hire',args:[candidate.id,'command',type]}),/Capacity is full/);assert.equal(JSON.stringify(envelope(j)),before);
});
await test('capacity loss preserves roster and permits existing deployments',async()=>{
  const j=await opened();await setState(j,s=>{for(let i=0;i<5;i++)s.mercs.push(E.makeMerc(s,E.people[0]));s.reputation=19;});const s=envelope(j).state,c=s.board[0],ids=s.mercs.slice(0,4).map(m=>m.id),leads=E.chooseLeads(s,c,ids);await commitCommand(j,{name:'secure',args:[c.id,'command']});await commitCommand(j,{name:'deploy',args:[c.id,ids,leads]});assert.equal(E.rosterCount(envelope(j).state),9);
});
await test('release opens capacity and removes only future retainers',async()=>{
  const j=await opened();await setState(j,s=>{s.mercs[0].employment='retained';});const s=envelope(j).state,m=s.mercs[0],before=s.cash,forecast=E.forecast(s);await commitCommand(j,{name:'release',args:[m.id]});const after=envelope(j).state;assert.equal(after.cash,before);assert.equal(E.rosterCount(after),3);assert.equal(E.forecast(after),forecast-E.retainer(m));
});
await test('all three mission checks require explicit review and remain saved after reload',async()=>{
  const j=await deployed();for(let i=0;i<3;i++){dice=[18];await commitCommand(j,{name:'rollPhase'});const restored=copy(envelope(j));assert.equal(restored.state.operations.pendingReview.phase,i);assert.equal(restored.state.jobs[0].rolls[i].face,18);assert(!restored.state.jobs[0].settled);await commitCommand(j,{name:'acknowledgePhase'});}assert(envelope(j).state.jobs[0].settled);assert.equal(envelope(j).state.jobs[0].rolls.length,3);
});
await test('native Hero Point reroll spends exactly one actual PC point and retains original result',async()=>{
  const j=await deployed();dice=[1];await commitCommand(j,{name:'rollPhase'});actors[0].system.resources.heroPoints.value=2;dice=[20];await commitCommand(j,{name:'rerollPhase',args:['command']});const r=envelope(j).state.jobs[0].rolls[0];assert.equal(actors[0].system.resources.heroPoints.value,1);assert.equal(r.originalRoll.face,1);assert.equal(r.face,20);assert(r.heroSpent);await assert.rejects(commitCommand(j,{name:'rerollPhase',args:['command']}),/Only one Hero/);assert.equal(actors[0].system.resources.heroPoints.value,1);
});
await test('interrupted actor write resumes once without losing the mission result',async()=>{
  const j=await deployed();await commitCommand(j,{name:'rollPhase'});actors[0].system.resources.heroPoints.value=2;actorUpdateFail=true;try{await assert.rejects(commitCommand(j,{name:'rerollPhase',args:['command']}),/actor write failure/);}finally{actorUpdateFail=false;}assert(envelope(j).pendingHeroSpend);assert.equal(actors[0].system.resources.heroPoints.value,2);await assert.rejects(commitCommand(j,{name:'acknowledgePhase'}),/Recover/);await C.recoverHeroSpend(j);assert.equal(actors[0].system.resources.heroPoints.value,1);assert.equal(envelope(j).pendingHeroSpend,undefined);assert(envelope(j).state.jobs[0].rolls[0].heroSpent);
});
await test('interrupted final guild write recovers without spending a second Hero Point',async()=>{
  const j=await deployed();await commitCommand(j,{name:'rollPhase'});actors[0].system.resources.heroPoints.value=2;journalCommitFail=true;await assert.rejects(commitCommand(j,{name:'rerollPhase',args:['command']}),/journal write failure/);assert.equal(actors[0].system.resources.heroPoints.value,1);assert(envelope(j).pendingHeroSpend);await C.recoverHeroSpend(j);assert.equal(actors[0].system.resources.heroPoints.value,1);assert(envelope(j).state.jobs[0].rolls[0].heroSpent);
});
await test('ambiguous Hero Point edits block recovery instead of guessing',async()=>{
  const j=await deployed();await commitCommand(j,{name:'rollPhase'});actors[0].system.resources.heroPoints.value=2;actorUpdateFail=true;try{await assert.rejects(commitCommand(j,{name:'rerollPhase',args:['command']}));}finally{actorUpdateFail=false;}actors[0].system.resources.heroPoints.value=0;await assert.rejects(C.recoverHeroSpend(j),/edited/);actors[0].system.resources.heroPoints.value=2;await C.recoverHeroSpend(j);
});
await test('chat failure keeps a durable outbox; retry does not duplicate delivered messages',async()=>{
  const j=await opened();chatFail=true;try{await commitCommand(j,{name:'promote',args:['command']});}finally{chatFail=false;}assert(envelope(j).outbox.length>0);const previous=game.messages.size;await C.retryChat(j);const after=game.messages.size;assert(after>previous);await C.retryChat(j);assert.equal(game.messages.size,after);assert.equal(envelope(j).outbox.length,0);
});
await test('complete turn settles count-only mission success, compensation, XP and next Upkeep once',async()=>{
  const j=await deployed();for(let i=0;i<3;i++){dice=[20];await commitCommand(j,{name:'rollPhase'});await commitCommand(j,{name:'acknowledgePhase'});}let s=envelope(j).state;assert(s.jobs[0].result.success);assert.equal(s.pendingGuildXP,80);for(const c of [...s.operations.choices])await commitCommand(j,{name:'choice',args:[c.id,'none']});await commitCommand(j,{name:'finishOperations'});await commitCommand(j,{name:'respondEvent',args:['accept']});await commitCommand(j,{name:'advance'});s=envelope(j).state;assert.equal(s.turn,2);assert.equal(s.phase,'upkeep');assert.equal(s.guildXP,80);assert.equal(s.cash,s.initialCash+s.ledger.reduce((n,l)=>n+l.amount,0));
});
await test('a two-of-three contract completes with two successes despite failed Extraction',async()=>{
  const j=await deployed();for(const face of [20,20,1]){dice=[face];await commitCommand(j,{name:'rollPhase'});await commitCommand(j,{name:'acknowledgePhase'});}const job=envelope(j).state.jobs[0];assert.equal(job.result.successfulPhases,2);assert.equal(job.result.requiredSuccesses,2);assert(job.result.success);assert.equal(job.rolls[2].degree,0);
});
await test('failed-job half pay preserves Loyalty and records exact wages once',async()=>{
  const j=await deployed();for(let i=0;i<3;i++){dice=[1];await commitCommand(j,{name:'rollPhase'});await commitCommand(j,{name:'acknowledgePhase'});}const s=envelope(j).state,choice=s.operations.choices.find(c=>c.type==='failedPay'),before=s.mercs.map(m=>m.loyalty),cash=s.cash,amount=E.round(s.jobs[0].quote.pay*.5);await commitCommand(j,{name:'choice',args:[choice.id,'half']});assert.equal(envelope(j).state.cash,cash-amount);assert.deepEqual(envelope(j).state.mercs.map(m=>m.loyalty),before);await assert.rejects(commitCommand(j,{name:'choice',args:[choice.id,'half']}),/already settled/);
});
await test('rendered mission review includes the third die and escaped generated/custom text',async()=>{
  const j=await deployed();for(let i=0;i<2;i++){await commitCommand(j,{name:'rollPhase'});await commitCommand(j,{name:'acknowledgePhase'});}dice=[17];await commitCommand(j,{name:'rollPhase'});await setState(j,s=>{s.jobs[0].contract.name='<img src=x onerror=evil()>';});const app=new GuildmasterSheet();app.guildId=j.id;const html=await app._renderHTML();assert(html.includes('Extraction result'));assert(html.includes('d20 17'));assert(!html.includes('<img src=x'));assert(html.includes('&lt;img'));for(const tab of ['officers','roster','contracts','assets','history']){app.tab=tab;assert((await app._renderHTML()).length>100);}
});
await test('shared player rendering disables spending and phase advancement',async()=>{
  const j=await opened(),app=new GuildmasterSheet(),original=game.user;app.guildId=j.id;game.user={id:'player',isGM:false};try{const html=await app._renderHTML();assert(/data-command="promote"[^>]*disabled/.test(html));assert(/data-command="endActivity"[^>]*disabled/.test(html));assert(html.includes('Shared player view'));}finally{game.user=original;}
});

const report={moduleVersion:C.VERSION,target:{foundry:'14.369',sf2e:'1.6.1'},checks:results.length,passed:results,verification:'Node integration harness with mocked Foundry documents, native checks, dice and chat. No live Foundry or visual verification.',generatedAt:new Date().toISOString()};
if(process.env.GUILDMASTER_TEST_REPORT)await writeFile(process.env.GUILDMASTER_TEST_REPORT,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({checks:results.length,status:'passed',liveFoundryVerified:false}));

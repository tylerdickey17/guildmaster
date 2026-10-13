import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const copy=v=>JSON.parse(JSON.stringify(v));
function merge(target,source){for(const [k,v]of Object.entries(source)){if(v&&typeof v==='object'&&!Array.isArray(v)){target[k]??={};merge(target[k],v);}else target[k]=copy(v);}return target;}
function setPath(root,key,value){const parts=key.split('.');let current=root;for(const part of parts.slice(0,-1))current=current[part]??={};const leaf=parts.at(-1);if(value&&typeof value==='object'&&!Array.isArray(value))current[leaf]=merge(current[leaf]??{},value);else current[leaf]=copy(value);}

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
  async setFlag(scope,key,value){if(journalCommitFail&&!value.pendingHeroSpend){journalCommitFail=false;throw new Error('simulated final journal write failure');}this.flags[scope]??={};this.flags[scope][key]=value&&typeof value==='object'?merge(this.flags[scope][key]??{},value):value;return this;}
}
globalThis.foundry={utils:{randomID:()=>`tx${++counter}`},dice:{Roll:MockRoll},applications:{api:{ApplicationV2:class {constructor(){this.rendered=false;}async render(){this.rendered=true;return this;}async close(){this.rendered=false;return this;}},DialogV2:{}}}};
globalThis.CONFIG={ChatMessage:{documentClass:MockMessage},JournalEntry:{documentClass:MockJournal}};
globalThis.CONST={DOCUMENT_OWNERSHIP_LEVELS:{OBSERVER:2,OWNER:3},KEYBINDING_PRECEDENCE:{NORMAL:0}};
globalThis.ui={notifications:{warn:m=>notices.push(m),error:m=>notices.push(m),info:m=>notices.push(m)}};
globalThis.fromUuid=async uuid=>game.actors.find(a=>a.uuid===uuid)??game.journal.find(j=>j.uuid===uuid)??null;
const C=await import('../guildmaster/scripts/core.mjs');
const {GuildmasterSheet}=await import('../guildmaster/scripts/sheet.mjs');
const {GuildTurnWizard}=await import('../guildmaster/scripts/wizard.mjs');
const T=await import('../guildmaster/scripts/turns.mjs');
const {E,envelope,commitCommand,createGuild,executeWithRolls,dispatch,clone}=C;
const results=[];
async function test(name,fn){await fn();results.push(name);console.log('PASS',name);}
function pc(id,mod=8,rank=1){
  const actor={flags:{},owners:['player-'+id],getFlag:(scope,key)=>actor.flags[scope]?.[key],testUserPermission:user=>user.isGM||actor.owners.includes(user.id),id,uuid:`Actor.${id}`,documentName:'Actor',type:'character',name:`PC ${id}`,system:{resources:{heroPoints:{value:2,max:3}},skills:{}},getStatistic:skill=>({mod,rank:actor.system.skills[skill]?.rank??rank,roll:async params=>{
    assert.equal(params.createMessage,false);assert.equal(params.messageMode,'public');
    if(cancelNative)return null;
    const roll=new MockRoll(`1d20 + ${mod}`);roll.total=nativeFace+mod;roll.dice=[{faces:20,results:[{result:nativeFace,active:true}]}];roll.options.degreeOfSuccess=nativeDegree??E.degree(nativeFace,mod,params.dc.value);
    if(afterNative)await afterNative();return roll;
  }}),update:async data=>{if(actorUpdateFail)throw new Error('simulated actor write failure');if('system.resources.heroPoints.value' in data)actor.system.resources.heroPoints.value=data['system.resources.heroPoints.value'];for(const [key,value]of Object.entries(data))if(key.startsWith('flags.'))setPath(actor,key,value);return actor;}};
  game.actors.set(id,actor);return actor;
}
const actors=['a','b','c','d'].map(id=>pc(id));
async function guild(preset='lean') {
  const j=await createGuild({name:'Test Guild',partySize:4,preset});
  for(let i=0;i<4;i++)await commitCommand(j,{name:'linkOfficer',args:[envelope(j).state.officers[i].id,actors[i].uuid]});
  return j;
}
async function opened(){const j=await guild();await commitCommand(j,{name:'startTurn'});await commitCommand(j,{name:'settleUpkeep'});await commitCommand(j,{name:'finishUpkeep'});return j;}
async function deployed(){const j=await opened(),s=envelope(j).state,c=s.board[0],ids=s.mercs.map(m=>m.id),leads=E.chooseLeads(s,c,ids);await commitCommand(j,{name:'secure',args:[c.id,'command']});for(const o of envelope(j).state.officers)if(!o.used)await commitCommand(j,{name:'pass',officerId:o.id});await commitCommand(j,{name:'finishActions'});await commitCommand(j,{name:'deploy',args:[c.id,ids,leads,null]});await commitCommand(j,{name:'endActivity'});return j;}
async function setState(j,edit){const saved=clone(envelope(j));edit(saved.state);await j.setFlag(C.ID,'guild',saved);}

await test('module manifest targets exact installed system without claiming runtime verification',async()=>{
  const m=JSON.parse(await readFile(new URL('../guildmaster/module.json',import.meta.url),'utf8'));
  assert.equal(m.id,'guildmaster');assert.equal(m.compatibility.minimum,'14.369');assert.equal(m.relationships.systems[0].id,'sf2e');assert.equal(m.relationships.systems[0].compatibility.minimum,'1.6.1');assert.equal(m.compatibility.verified,undefined);assert.equal(m.version,'0.1.0-alpha.3');assert.equal(m.manifest,'https://raw.githubusercontent.com/tylerdickey17/guildmaster/main/foundry/guildmaster/module.json');assert.equal(m.download,'https://raw.githubusercontent.com/tylerdickey17/guildmaster/main/foundry/releases/guildmaster-0.1.0-alpha.3.zip');assert.equal(m.version,C.VERSION);
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
  const j=await opened(),before=JSON.stringify(envelope(j));cancelNative=true;try{await assert.rejects(commitCommand(j,{name:'network',args:['liaison','recruits',1]}),/cancelled/);assert.equal(JSON.stringify(envelope(j)),before);}finally{cancelNative=false;}
});
await test('training gates use proficiency ranks, not nonzero modifiers',async()=>{
  const j=await opened(),s=envelope(j).state;actors[2].system.skills.computers={rank:0};
  try{await commitCommand(j,{name:'secure',args:[s.board[0].id,'command']});await assert.rejects(commitCommand(j,{name:'recon',args:[s.board[0].id,'field',1]}),/Trained Computers/);}finally{delete actors[2].system.skills.computers;}
});
await test('stale sheet revisions fail without spending',async()=>{
  const j=await opened(),revision=envelope(j).revision;await commitCommand(j,{name:'promote',args:['command']},revision);const before=JSON.stringify(envelope(j));await assert.rejects(commitCommand(j,{name:'network',args:['liaison','recruits',1]},revision),/out of date/);assert.equal(JSON.stringify(envelope(j)),before);
});
await test('simultaneous commands serialize and the stale second command does not spend',async()=>{
  const j=await opened(),revision=envelope(j).revision,before=envelope(j).state.actions;
  const result=await Promise.allSettled([commitCommand(j,{name:'network',args:['liaison','recruits',1]},revision),commitCommand(j,{name:'network',args:['command','contracts',1]},revision)]);assert.equal(result.filter(r=>r.status==='fulfilled').length,1);assert.equal(envelope(j).state.actions,before-1);
});
await test('authority loss during native roll prevents a guild commit',async()=>{
  const j=await opened(),before=JSON.stringify(envelope(j));afterNative=async()=>{game.user.active=false;};try{await assert.rejects(commitCommand(j,{name:'promote',args:['command']}),/coordinating GM/);assert.equal(JSON.stringify(envelope(j)),before);}finally{game.user.active=true;afterNative=null;}
});
await test('capacity follows Reputation tiers and counts unavailable operatives',async()=>{
  const s=E.fresh();for(const [rep,cap] of [[-20,6],[0,6],[19,6],[20,9],[49,9],[50,12],[79,12],[80,15],[100,15]]){s.reputation=rep;assert.equal(E.operativeCapacity(s),cap);}s.mercs[0].status='Missing';s.mercs[1].status='Training';s.mercs[2].status='Recovering';s.mercs[3].status='Onboarding';assert.equal(E.rosterCount(s),4);
});
await test('both employment types are blocked at capacity without spending',async()=>{
  const j=await opened();await setState(j,s=>{s.reputation=20;for(let i=s.mercs.length;i<9;i++)s.mercs.push(E.makeMerc(s,E.people[i%E.people.length]));const m=E.makeMerc(s,E.people[0]);m.status='Candidate';m.expires=s.turn+1;s.mercs.push(m);});const before=JSON.stringify(envelope(j)),candidate=envelope(j).state.mercs.at(-1);
  for(const type of ['free','retained'])await assert.rejects(commitCommand(j,{name:'hire',args:[candidate.id,'liaison',type]}),/Capacity is full/);assert.equal(JSON.stringify(envelope(j)),before);
});
await test('capacity loss preserves roster and permits existing deployments',async()=>{
  const j=await opened();await setState(j,s=>{for(let i=0;i<5;i++)s.mercs.push(E.makeMerc(s,E.people[0]));s.reputation=19;});const s=envelope(j).state,c=s.board[0],ids=s.mercs.slice(0,4).map(m=>m.id),leads=E.chooseLeads(s,c,ids);await commitCommand(j,{name:'secure',args:[c.id,'command']});for(const o of envelope(j).state.officers)if(!o.used)await commitCommand(j,{name:'pass',officerId:o.id});await commitCommand(j,{name:'finishActions'});await commitCommand(j,{name:'deploy',args:[c.id,ids,leads]});assert.equal(E.rosterCount(envelope(j).state),9);
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
  const j=await deployed();await commitCommand(j,{name:'rollPhase'});actors[0].system.resources.heroPoints.value=2;actorUpdateFail=true;try{await assert.rejects(commitCommand(j,{name:'rerollPhase',args:['command']}),/actor write failure/);}finally{actorUpdateFail=false;}assert(envelope(j).pendingHeroSpend);assert.equal(actors[0].system.resources.heroPoints.value,2);await assert.rejects(commitCommand(j,{name:'acknowledgePhase'}),/Recover/);await C.recoverHeroSpend(j);assert.equal(actors[0].system.resources.heroPoints.value,1);assert.equal(envelope(j).pendingHeroSpend,null);assert(envelope(j).state.jobs[0].rolls[0].heroSpent);
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
  const j=await deployed();for(let i=0;i<2;i++){await commitCommand(j,{name:'rollPhase'});await commitCommand(j,{name:'acknowledgePhase'});}dice=[17];await commitCommand(j,{name:'rollPhase'});await setState(j,s=>{s.jobs[0].contract.name='<img src=x onerror=evil()>';});const app=new GuildTurnWizard();app.guildId=j.id;const html=await app._renderHTML();assert(html.includes('Extraction result'));assert(html.includes('d20 17'));assert(!html.includes('<img src=x'));assert(html.includes('&lt;img'));for(const tab of ['officers','roster','contracts','assets','history']){const manager=new GuildmasterSheet();manager.guildId=j.id;manager.tab=tab;assert((await manager._renderHTML()).length>100);}
});
await test('shared player rendering disables spending and phase advancement',async()=>{
  const j=await opened(),app=new GuildmasterSheet(),original=game.user;app.guildId=j.id;game.user={id:'player',isGM:false};try{const html=await app._renderHTML();assert(html.includes('Start Guild Turn')||html.includes('Resume Guild Turn'));assert(!html.includes('data-command="promote"'));assert(!html.includes('data-command="endActivity"'));assert(html.includes('Shared guild management'));}finally{game.user=original;}
});


await test('Foundry recursive flag merge reproduces the old pending-marker bug and recovery clears it',async()=>{
  const j=await deployed();await commitCommand(j,{name:'rollPhase'});actors[0].system.resources.heroPoints.value=2;await commitCommand(j,{name:'rerollPhase',args:['command']});
  const completed=copy(envelope(j));delete completed.pendingHeroSpend;
  const legacy={actorUuid:actors[0].uuid,before:2,after:1,prepared:completed};
  await j.setFlag(C.ID,'guild',{...completed,pendingHeroSpend:legacy});
  await j.setFlag(C.ID,'guild',completed);assert(envelope(j).pendingHeroSpend,'Omission does not clear Foundry flags');
  await C.recoverHeroSpend(j);assert.equal(envelope(j).pendingHeroSpend,null);assert.equal(actors[0].system.resources.heroPoints.value,1);
  await commitCommand(j,{name:'acknowledgePhase'});assert(!envelope(j).state.operations.pendingReview);
});
await test('starting and resuming the guided turn preserves the existing phase, treasury and rolls',async()=>{
  const j=await deployed();await commitCommand(j,{name:'rollPhase'});const before=copy(envelope(j).state);await commitCommand(j,{name:'startTurn'});const after=envelope(j).state;assert.equal(after.cash,before.cash);assert.equal(after.actions,before.actions);assert.deepEqual(after.jobs[0].rolls,before.jobs[0].rolls);assert.equal(after.turnGuide.stage,'events');
});
await test('player action lists depend on actual ownership, primary office, skill rank and guild level',async()=>{
  const j=await opened(),s=C.stateForDisplay(j),original=game.user;game.user={id:'player-c',isGM:false};
  try{assert.deepEqual(T.officersForUser(s).map(o=>o.id),['field']);assert(T.visibleActions(s,s.officers[2]).some(([key])=>key==='recon'));assert(!T.visibleActions(s,s.officers[2]).some(([key])=>key==='hire'));s.officers[2].skillRanks.Computers=0;assert(!T.visibleActions(s,s.officers[2]).some(([key])=>key==='recon'));assert(!T.visibleActions(s,s.officers[3]).some(([key])=>key==='intensiveTraining'));}finally{game.user=original;}
});
await test('GM defaults to all officers and can preview a single officer without other role cards',async()=>{
  const j=await opened(),app=new GuildTurnWizard();app.guildId=j.id;let html=await app._renderHTML();assert(html.includes('All Officers'));assert(html.includes('Find contract leads'));assert(html.includes('Find recruits'));assert(html.includes('Run Intensive Training'));assert(html.includes('Guild Level 6 required'));
  app.viewOfficer='field';html=await app._renderHTML();assert(html.includes('Conduct Digital Recon'));assert(!html.includes('data-key="hire"'));assert(!html.includes('data-key="contracts"'));
});
await test('player wizard hides other officers and offers their own action submission controls',async()=>{
  const j=await opened(),app=new GuildTurnWizard(),original=game.user;app.guildId=j.id;game.user={id:'player-d',isGM:false};try{const html=await app._renderHTML();assert(html.includes('Find recruits'));assert(html.includes('Submit action'));assert(!html.includes('All Officers'));assert(!html.includes('data-key="contracts"'));assert.equal(app.officerId,'liaison');}finally{game.user=original;}
});
await test('role gates are enforced when committing, not just when rendering',async()=>{
  const j=await opened(),before=JSON.stringify(envelope(j));await assert.rejects(commitCommand(j,{name:'network',args:['field','contracts',1],officerId:'field'}),/belongs to/);assert.equal(JSON.stringify(envelope(j)),before);
});
await test('a player submits to their owned Actor inbox without spending shared actions or credits',async()=>{
  const j=await opened(),before=copy(envelope(j)),original=game.user;game.user={id:'player-d',isGM:false};let id;
  try{id=await C.submitRequest(j,{name:'network',args:['liaison','recruits',1],officerId:'liaison'},before.revision);}finally{game.user=original;}
  assert.equal(envelope(j).state.cash,before.state.cash);assert.equal(envelope(j).state.actions,before.state.actions);assert.equal(C.pendingRequests(j)[0].id,id);
  await C.approveRequest(j,actors[3].uuid,id);assert.equal(envelope(j).state.actions,before.state.actions-1);assert.equal(C.pendingRequests(j).length,0);await assert.rejects(C.approveRequest(j,actors[3].uuid,id),/no longer pending/);
});
await test('a player cannot request another actor’s officer or a GM-only phase advance',async()=>{
  const j=await opened(),original=game.user;game.user={id:'player-d',isGM:false};try{await assert.rejects(C.submitRequest(j,{name:'promote',args:['command'],officerId:'command'},envelope(j).revision),/do not own/);await assert.rejects(C.submitRequest(j,{name:'advance',officerId:'liaison'},envelope(j).revision),/GM advances/);}finally{game.user=original;}
});
await test('forged GM commands in an actor inbox are rejected by the authoritative approval path',async()=>{
  const j=await opened(),id='forged-phase';await actors[3].update({['flags.guildmaster.requests.'+id]:{guildUuid:j.uuid,status:'Pending',turn:1,stage:'actions',baseId:'hq',command:{name:'advance',officerId:'liaison'}}});await assert.rejects(C.approveRequest(j,actors[3].uuid,id),/not GM/);await C.declineRequest(j,id);assert.equal(C.pendingRequests(j).length,0);
});
await test('inbox requests cannot override their authoritative actor UUID or request ID',async()=>{
  const j=await opened(),id='bound-inbox';await actors[3].update({['flags.guildmaster.requests.'+id]:{guildUuid:j.uuid,status:'Pending',actorUuid:actors[0].uuid,id:'spoof',turn:1,stage:'actions',baseId:'hq',command:{name:'network',args:['liaison','recruits',1],officerId:'liaison'}}});const pending=C.pendingRequests(j)[0];assert.equal(pending.actorUuid,actors[3].uuid);assert.equal(pending.id,id);await C.declineRequest(j,id);
});
await test('two player requests revalidate against the current shared budget without stale-revision deadlock',async()=>{
  const j=await opened(),original=game.user,revision=envelope(j).revision;let first,second;
  try{game.user={id:'player-a',isGM:false};first=await C.submitRequest(j,{name:'network',args:['command','contracts',1],officerId:'command'},revision);game.user={id:'player-d',isGM:false};second=await C.submitRequest(j,{name:'network',args:['liaison','recruits',1],officerId:'liaison'},revision);}finally{game.user=original;}
  await C.approveRequest(j,actors[0].uuid,first);await C.approveRequest(j,actors[3].uuid,second);assert.equal(envelope(j).state.actions,2);assert.equal(C.pendingRequests(j).length,0);
});
await test('pending player requests block phase advancement and declining clears that gate',async()=>{
  const j=await opened(),original=game.user;let id;try{game.user={id:'player-d',isGM:false};id=await C.submitRequest(j,{name:'pass',officerId:'liaison'},envelope(j).revision);}finally{game.user=original;}
  await assert.rejects(commitCommand(j,{name:'finishActions'}),/pending player/);await C.declineRequest(j,id);for(const o of envelope(j).state.officers)await commitCommand(j,{name:'pass',officerId:o.id});await commitCommand(j,{name:'finishActions'});assert.equal(envelope(j).state.turnGuide.stage,'assignments');
});
await test('Reorganize Command swaps roles immediately for one action and preserves actor links',async()=>{
  const j=await opened(),s=envelope(j).state,changes=Object.fromEntries(s.officers.map(o=>[o.id,T.office(o)]));changes.command='field';changes.field='command';const links=s.officers.map(o=>o.actorUuid);await commitCommand(j,{name:'restructure',args:[changes],officerId:'command'});assert.equal(envelope(j).state.actions,3);assert.deepEqual(envelope(j).state.officers.map(o=>o.actorUuid),links);assert.equal(T.office(envelope(j).state.officers[2]),'command');await assert.rejects(commitCommand(j,{name:'promote',args:['command'],officerId:'command'}),/belongs/);await commitCommand(j,{name:'promote',args:['field'],officerId:'field'});await assert.rejects(commitCommand(j,{name:'restructure',args:[changes],officerId:'field'}),/once per turn/);
});
await test('multi-action signatures follow the reorganized office rather than original slot index',async()=>{
  const j=await opened();await setState(j,s=>{s.guildLevel=3;s.actions=6;});const s=envelope(j).state,changes=Object.fromEntries(s.officers.map(o=>[o.id,T.office(o)]));changes.command='field';changes.field='command';await commitCommand(j,{name:'restructure',args:[changes],officerId:'command'});await commitCommand(j,{name:'sectorCampaign',args:['field'],officerId:'field'});assert.equal(envelope(j).state.actions,3);
});
await test('Quartermaster drafts and deploys a distinct-lead team; Operations cannot assemble it',async()=>{
  const j=await opened(),s=envelope(j).state,c=s.board[0],ids=s.mercs.map(m=>m.id),leads=E.chooseLeads(s,c,ids);await commitCommand(j,{name:'secure',args:[c.id,'command']});for(const o of envelope(j).state.officers)if(!o.used)await commitCommand(j,{name:'pass',officerId:o.id});await commitCommand(j,{name:'finishActions'});
  await assert.rejects(commitCommand(j,{name:'draftAssignment',args:[c.id,ids,leads,null],officerId:'field'}),/belongs/);await commitCommand(j,{name:'draftAssignment',args:[c.id,ids,leads,null],officerId:'quarter'});assert.equal(envelope(j).state.jobs.length,0);const actions=envelope(j).state.actions;await commitCommand(j,{name:'deployDraft',args:[c.id],officerId:'quarter'});assert.equal(envelope(j).state.actions,actions);assert.equal(new Set(envelope(j).state.jobs[0].leads).size,3);
});
await test('reserved squad members cannot be trained or silently reused in another assignment',async()=>{
  const j=await opened(),s=envelope(j).state,c=s.board[0],other=s.board[1],ids=s.mercs.map(m=>m.id),leads=E.chooseLeads(s,c,ids);await commitCommand(j,{name:'secure',args:[c.id,'command']});await commitCommand(j,{name:'secure',args:[other.id,'command']});for(const o of envelope(j).state.officers)if(!o.used)await commitCommand(j,{name:'pass',officerId:o.id});await commitCommand(j,{name:'finishActions'});await commitCommand(j,{name:'draftAssignment',args:[c.id,ids,leads,null],officerId:'quarter'});
  await assert.rejects(commitCommand(j,{name:'draftAssignment',args:[other.id,ids,E.chooseLeads(envelope(j).state,other,ids),null],officerId:'quarter'}),/reserved/);await commitCommand(j,{name:'returnActions'});await assert.rejects(commitCommand(j,{name:'train',args:[[ids[0]],'liaison'],officerId:'liaison'}),/reserved squad/);
});
await test('guided completion prepares the next Upkeep without charging it and marks the old turn complete',async()=>{
  const j=await deployed();for(let i=0;i<3;i++){dice=[20];await commitCommand(j,{name:'rollPhase',officerId:'field'});await commitCommand(j,{name:'acknowledgePhase'});}for(const c of [...envelope(j).state.operations.choices])await commitCommand(j,{name:'choice',args:[c.id,'none'],officerId:'field'});await commitCommand(j,{name:'finishOperations'});await commitCommand(j,{name:'respondEvent',args:['accept']});assert.equal(envelope(j).state.turnGuide.stage,'finish');const cash=envelope(j).state.cash;await commitCommand(j,{name:'advance'});const s=envelope(j).state;assert.equal(s.turn,2);assert.equal(s.cash,cash);assert.equal(s.turnGuide.active,false);assert.equal(s.turnGuide.completedTurn,1);
});

await test('new turn resets each participation marker under Foundry recursive flag merging',async()=>{
  const j=await opened();for(const o of envelope(j).state.officers)await commitCommand(j,{name:'pass',officerId:o.id});await setState(j,s=>{s.phase='advancement';s.turnGuide.stage='finish';});await commitCommand(j,{name:'advance'});await commitCommand(j,{name:'startTurn'});await commitCommand(j,{name:'settleUpkeep'});await commitCommand(j,{name:'finishUpkeep'});assert(Object.values(envelope(j).state.turnGuide.participation).every(v=>v===null));await assert.rejects(commitCommand(j,{name:'finishActions'}),/every linked PC/);
});
await test('an invalidated squad draft produces a correction message rather than breaking the guide',async()=>{
  const j=await opened(),s=envelope(j).state,c=s.board[0],ids=s.mercs.map(m=>m.id);await commitCommand(j,{name:'secure',args:[c.id,'command']});for(const o of envelope(j).state.officers)if(!o.used)await commitCommand(j,{name:'pass',officerId:o.id});await commitCommand(j,{name:'finishActions'});await commitCommand(j,{name:'draftAssignment',args:[c.id,ids,E.chooseLeads(s,c,ids),null],officerId:'quarter'});await setState(j,s=>{s.mercs[0].status='Recovering';});const app=new GuildTurnWizard();app.guildId=j.id;const html=await app._renderHTML();assert(html.includes('Assignment needs revision'));assert(html.includes('Clear squad'));
});
class FakeElement{
  constructor(){this.children=[];this.handlers={};this.className='';}
  querySelector(selector){return selector==='.guildmaster-launch'?this.children.find(c=>c.className==='guildmaster-launch')??null:null;}
  append(child){this.children.push(child);}addEventListener(name,fn){this.handlers[name]=fn;}
}
globalThis.HTMLElement=FakeElement;globalThis.document={createElement:()=>new FakeElement()};
const registeredHooks=new Map();globalThis.Hooks={once:(name,fn)=>registeredHooks.set(name,[...(registeredHooks.get(name)??[]),fn]),on:(name,fn)=>registeredHooks.set(name,[...(registeredHooks.get(name)??[]),fn])};
const menus=[];const moduleRecord={};game.modules={get:()=>moduleRecord};game.settings={registerMenu:(_scope,key,data)=>menus.push({key,...data})};game.keybindings={register:()=>{}};
const M=await import('../guildmaster/scripts/main.mjs');
for(const init of registeredHooks.get('init'))init();
await test('Journal entry button uses the ApplicationV2 element even when hook HTML is a context object',async()=>{
  const root=new FakeElement();M.addJournalButton({element:root},{});assert.equal(root.children.length,1);assert.equal(root.children[0].className,'guildmaster-launch');M.addJournalButton({element:root},{});assert.equal(root.children.length,1);assert.equal(typeof root.children[0].handlers.click,'function');assert(menus.some(m=>m.key==='turn'));
});
await test('finishing the turn closes open guided windows while retaining the management sheet',async()=>{
  const j=await opened(),guide=new GuildTurnWizard(),manager=new GuildmasterSheet();guide.guildId=manager.guildId=j.id;guide.startedTurn=1;guide.rendered=manager.rendered=true;await setState(j,s=>{s.turn=2;s.turnGuide={active:false,completedTurn:1};});for(const fn of registeredHooks.get('updateJournalEntry'))fn(j);assert.equal(guide.rendered,false);assert.equal(manager.rendered,true);
});

const report={moduleVersion:C.VERSION,target:{foundry:'14.369',sf2e:'1.6.1'},checks:results.length,passed:results,verification:'Node integration harness with mocked Foundry documents, native checks, dice and chat. No live Foundry or visual verification.',generatedAt:new Date().toISOString()};
if(process.env.GUILDMASTER_TEST_REPORT)await writeFile(process.env.GUILDMASTER_TEST_REPORT,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({checks:results.length,status:'passed',liveFoundryVerified:false}));

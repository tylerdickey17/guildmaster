import '../vendor/values.js';
import '../vendor/content.js';
import '../vendor/engine.js';
const E=globalThis.GuildmasterEngine;
export const OFFICES={command:'Guild Commander',quarter:'Quartermaster',field:'Operations Officer',liaison:'Personnel Officer',member:'Guild Officer',chief:'Outpost Chief'};
export const STAGES=['upkeep','actions','assignments','events','finish'];
export function office(o){return o.office??(o.baseId?'chief':OFFICES[o.id]?o.id:'member');}
export function initializeOffices(s){for(const o of s.officers){o.office=office(o);o.role=OFFICES[o.office];}return s;}
export function stage(s){return s.turnGuide?.active?s.turnGuide.stage:({activity:'actions',event:'events',advancement:'finish'}[s.phase]??'upkeep');}
const spec=(label,offices,stages=['actions'],skill=[],level=1,actions=1,actingArg=null)=>({label,offices,stages,skill,level,actions,actingArg});
export const ACTIONS={
  contracts:spec('Find contract leads',['command'],['actions'],[],1,1,0),
  recruits:spec('Find recruits',['liaison'],['actions'],[],1,1,0),
  secure:spec('Secure Contract',['command'],['actions'],[],1,1,1),
  broker:spec('Broker Exclusive Deal',['command'],['actions'],['Diplomacy'],1,1,0),
  promote:spec('Promote the Guild',['command'],['actions'],[],1,1,0),
  sectorCampaign:spec('Launch a Sector Campaign',['command'],['actions'],['Diplomacy'],3,2,0),
  hire:spec('Recruit Operative',['liaison'],['actions'],[],1,1,1),
  release:spec('Release Operative',['liaison'],['actions'],[],1,0),
  train:spec('Run Training Drills',['liaison'],['actions'],[],1,1,1),
  intensiveTraining:spec('Run Intensive Training',['liaison'],['actions'],['Medicine'],6,2,1),
  recover:spec('Establish Recovery Protocol',['liaison'],['actions'],['Medicine'],1,1,1),
  morale:spec('Boost Morale',null,['actions'],[],1,1,1),
  recon:spec('Conduct Digital Recon',['field'],['actions','assignments'],['Computers'],1,1,1),
  operationsBriefing:spec('Prepare Operations Briefing',['field'],['assignments'],['Computers','Survival'],3,2,3),
  extractionContingency:spec('Establish Extraction Contingency',['field'],['assignments'],['Medicine','Survival'],4,3,3),
  project:spec('Commission Upgrade',['quarter'],['actions'],[],2,1,1),
  purchaseBase:spec('Purchase Base',['quarter'],['actions'],[],4,1,1),
  appointChief:spec('Appoint Outpost Chief',['quarter'],['actions'],[],4,1,1),
  optimize:spec('Optimize Infrastructure',['quarter'],['actions'],['Crafting'],1,1,1),
  borrow:spec('Secure Financing',['quarter'],['actions'],[],2,1,2),
  repayLoan:spec('Repay Loan Principal',['quarter'],['actions'],[],1,0),
  payArrears:spec('Pay Arrears',['quarter'],['actions'],[],1,0),
  restructure:spec('Reorganize Command',null,['actions'],[],1,1),
  pass:spec('Pass for now',null,['actions'],[],1,0),
  draftAssignment:spec('Assemble Mission Squad',['quarter'],['assignments'],[],1,0),
  clearAssignment:spec('Clear Assembled Squad',['quarter'],['assignments'],[],1,0),
  deployDraft:spec('Deploy Assembled Squad',['quarter'],['assignments'],[],1,0),
  deploy:spec('Deploy Squad',['quarter'],['assignments'],[],1,0),
  settleUpkeep:spec('Pay Available Funds',['quarter'],['upkeep'],[],1,0),
  payInvoiceLine:spec('Pay Expense',['quarter'],['upkeep'],[],1,0),
  renewStaff:spec('Renew / Pause Staff',['quarter'],['upkeep'],[],1,0),
  choice:spec('Resolve Turn Decision',null,['upkeep','events'],[],1,0),
  leaderFeat:spec('Choose Leader Feat',['liaison'],['actions','finish'],[],1,0),
  guildFeat:spec('Choose Guild Feat',['command'],['finish'],[],1,0),
  rerollPhase:spec('Spend Hero Point',null,['events'],[],1,0,0),
  rollPhase:spec('Roll Mission Phase',['field'],['events'],[],1,0)
};
const GM_ONLY=new Set(['startTurn','finishActions','returnActions','finishUpkeep','endActivity','acknowledgePhase','finishOperations','respondEvent','advance','linkOfficer','focusBase']);
export function actionSpec(cmd){return ACTIONS[cmd.name==='network'?cmd.args?.[1]==='contracts'?'contracts':'recruits':cmd.name];}
export function officersForUser(s,user=game.user){return s.officers.filter(o=>user.isGM||(!o.baseId&&o.actorUuid&&game.actors.get(o.actorUuid.split('.').at(-1))?.testUserPermission(user,3)));}
export function visibleActions(s,o){return Object.entries(ACTIONS).filter(([key,a])=>a.stages.includes(stage(s))&&(!a.offices||a.offices.includes(office(o)))&&s.guildLevel>=a.level&&(!a.skill.length||a.skill.some(k=>o.skillRanks?o.skillRanks[k]>0:!!o.skills[k]))&&(!['broker','recruits','contracts','hire'].includes(key)||key!=='broker'||s.reputation>=20));}
export function authorize(s,cmd,user=game.user){
  initializeOffices(s);
  if(GM_ONLY.has(cmd.name)){
    if(!user.isGM)throw new Error('The GM advances the shared turn and manages setup.');
    const required={finishUpkeep:'upkeep',endActivity:'assignments',acknowledgePhase:'events',finishOperations:'events',respondEvent:'events',advance:'finish'}[cmd.name];
    if(required&&s.turnGuide?.active&&stage(s)!==required)throw new Error('Finish the current guided stage first.');
    return null;
  }
  const a=actionSpec(cmd);if(!a)throw new Error('Unsupported Guildmaster action.');
  const inline=a.actingArg===null?null:cmd.args?.[a.actingArg];
  const choice=(s.phase==='upkeep'?s.upkeep:s.operations)?.choices?.find(c=>c.id===cmd.args?.[0]);
  const choiceRole=cmd.name==='choice'?(choice?.type==='training'?'liaison':choice?.type==='failedPay'?'quarter':'field'):null;
  const oid=cmd.officerId??inline??(user.isGM?s.officers.find(o=>choiceRole?office(o)===choiceRole:!a.offices||a.offices.includes(office(o)))?.id:null);
  const o=E.officer(s,oid);
  if(inline&&inline!==o.id)throw new Error('The requested action must use its own officer.');
  if(!user.isGM&&!officersForUser(s,user).some(x=>x.id===o.id))throw new Error('You do not own this linked officer.');
  if(a.offices&&!a.offices.includes(office(o))&&!(o.baseId&&!a.skill.length))throw new Error(`This action belongs to ${a.offices.map(id=>OFFICES[id]).join(' or ')}.`);
  if(s.turnGuide?.active&&!a.stages.includes(stage(s)))throw new Error('That action belongs to a different turn stage.');
  if(s.guildLevel<a.level)throw new Error(`This action unlocks at Guild Level ${a.level}.`);
  if(a.skill.length&&!a.skill.some(k=>o.skillRanks?o.skillRanks[k]>0:!!o.skills[k]))throw new Error(`This action requires Trained ${a.skill.join(' or ')}.`);
  if(cmd.name==='choice'){
    const choice=(s.phase==='upkeep'?s.upkeep:s.operations)?.choices.find(c=>c.id===cmd.args?.[0]);
    const required=choice?.type==='training'?'liaison':choice?.type==='failedPay'?'quarter':'field';
    if(office(o)!==required)throw new Error(`This decision belongs to ${OFFICES[required]}.`);
  }
  return o;
}
const record=(s,title,text)=>s.log.unshift({turn:s.turn,title,text,kind:'note'});
export function applyTurnCommand(s,cmd){
  initializeOffices(s);
  const a=cmd.args??[];
  if(cmd.name==='startTurn'){
    if(!s.turnGuide?.active)s.turnGuide={active:true,turn:s.turn,stage:stage(s),completedTurn:null,participation:Object.fromEntries(s.officers.map(o=>[o.id,null]))};
    return true;
  }
  if(cmd.name==='finishActions'){
    if(s.phase!=='activity'||stage(s)!=='actions')throw new Error('Finish the current stage first.');
    if(s.officers.filter(o=>!o.baseId&&o.actorUuid).some(o=>!o.used&&!s.turnGuide.participation[o.id]))throw new Error('Give every linked PC an action or mark their pass before continuing.');
    s.turnGuide.stage='assignments';return true;
  }
  if(cmd.name==='returnActions'){if(stage(s)!=='assignments')throw new Error('Return from Assignments only.');s.turnGuide.stage='actions';return true;}
  if(cmd.name==='pass'){
    const o=E.officer(s,cmd.officerId);s.turnGuide.participation[o.id]='passed';record(s,'Officer passes for now',`${o.name}: may still contribute to later preparation; no action spent.`);return true;
  }
  if(cmd.name==='restructure'){
    if(s.phase!=='activity'||s.reorganizedTurn===s.turn||s.actions<1)throw new Error('Reorganize Command costs one shared action, once per turn during Activity.');
    const actor=E.officer(s,cmd.officerId),changes=a[0],pcs=s.officers.filter(o=>!o.baseId);
    if(!changes||pcs.some(o=>!OFFICES[changes[o.id]]||changes[o.id]==='chief'))throw new Error('Assign a primary office to each PC.');
    const assigned=Object.values(changes).filter(v=>v!=='member');if(new Set(assigned).size!==assigned.length)throw new Error('Each primary office can have only one PC.');
    if(!E.baseOperational(s,E.operating(s)))throw new Error('Fund local management before restructuring.');
    s.actions--;actor.used++;s.reorganizedTurn=s.turn;s.actionHistory.push({turn:s.turn,officer:actor.name,action:'Reorganize Command',cost:1,credits:0});
    for(const o of pcs){o.office=changes[o.id];o.role=OFFICES[o.office];}
    record(s,'Command reorganized',pcs.map(o=>`${o.name}: ${o.role}`).join('; '));return true;
  }
  if(cmd.name==='draftAssignment'){
    const [cid,ids,leads,leader]=a,c=E.offer(s,cid);
    if(c.status!=='Accepted'||s.phase!=='activity')throw new Error('Assemble a secured, undeployed mission.');
    if(s.board.some(other=>other.id!==cid&&other.status==='Accepted'&&other.assignmentDraft?.turn===s.turn&&other.assignmentDraft.ids.some(id=>ids.includes(id))))throw new Error('An operative is already reserved for another assembled squad.');
    E.quote(s,c,ids,leads,leader);c.assignmentDraft={turn:s.turn,ids:[...ids],leads:[...leads],leader:leader??null,officerId:cmd.officerId};record(s,'Squad assembled',`${c.name}: ${ids.map(id=>E.merc(s,id).name).join(', ')}. Deployment remains routine.`);return true;
  }
  if(cmd.name==='deployDraft'){
    const c=E.offer(s,a[0]),draft=c.assignmentDraft;if(!draft||draft.turn!==s.turn)throw new Error('The Quartermaster must assemble a current squad first.');
    E.deploy(s,c.id,draft.ids,draft.leads,draft.leader);c.assignmentDraft=null;return true;
  }
  if(cmd.name==='clearAssignment'){
    const c=E.offer(s,a[0]);if(c.status!=='Accepted')throw new Error('Clear an undeployed assignment only.');
    if(c.preparation?.lock||c.contingency?.lock)throw new Error('A funded operation plan locks this squad.');
    c.assignmentDraft=null;record(s,'Assignment cleared',c.name);return true;
  }
  return false;
}
export function afterCommand(s,cmd,beforeActions){
  if(!s.turnGuide?.active)return;
  if(s.actions<beforeActions&&cmd.officerId)s.turnGuide.participation[cmd.officerId]='acted';
  if(cmd.name==='finishUpkeep')s.turnGuide.stage='actions';
  if(cmd.name==='endActivity')s.turnGuide.stage='events';
  if(cmd.name==='respondEvent')s.turnGuide.stage='finish';
  if(cmd.name==='advance'){s.turnGuide.active=false;s.turnGuide.completedTurn=s.turn-1;}
}

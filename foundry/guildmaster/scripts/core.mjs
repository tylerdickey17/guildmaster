import '../vendor/values.js';
import '../vendor/content.js';
import '../vendor/engine.js';
import {initializeOffices,authorize,applyTurnCommand,afterCommand,officersForUser,actionSpec,stage} from './turns.mjs';

export const ID = 'guildmaster';
export const VERSION = '0.1.0-alpha.3';
export const E = globalThis.GuildmasterEngine;
const Roll=foundry.dice.Roll;
export const SKILLS = ['Acrobatics','Arcana','Athletics','Computers','Crafting','Deception','Diplomacy','Intimidation','Medicine','Nature','Occultism','Performance','Piloting','Religion','Society','Stealth','Survival','Thievery'];
export const clone = value => JSON.parse(JSON.stringify(value));
export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const envelope = journal => journal?.getFlag(ID, 'guild') ?? null;
export const guilds = () => game.journal.filter(j => envelope(j));
export const activeGM = () => game.users.filter(u => u.active && u.isGM).sort((a,b) => a.id.localeCompare(b.id))[0];
export const canManage = () => game.user.isGM && activeGM()?.id === game.user.id;

export function requireManager() {
  if (!canManage()) throw new Error('Only the coordinating GM can commit guild changes. The first active GM by user ID coordinates this alpha.');
}

export function stateForDisplay(journal) {
  const data = envelope(journal);
  if (!data) return null;
  const s = clone(data.state);
  initializeOffices(s);
  for (const o of s.officers.filter(o => !o.baseId)) {
    const actor = game.actors.get(o.actorUuid?.split('.').at(-1));
    if (actor?.uuid === o.actorUuid) {
      o.name=actor.name; o.heroPoints=actor.system.resources?.heroPoints?.value??0;
      o.skills={}; o.skillRanks={};
      for(const k of SKILLS) {
        const stat=actorStatistic(actor,k);
        if(Number.isFinite(stat?.mod))o.skills[k]=stat.mod;
        o.skillRanks[k]=stat?.rank??actor.system.skills?.[k.toLowerCase()]?.rank??0;
      }
    }
  }
  return s;
}

export function actorStatistic(actor, skill) {
  const slug = skill.toLowerCase();
  return actor.getStatistic?.(slug) ?? actor.skills?.[slug];
}

export async function hydrateOfficers(s) {
  initializeOffices(s);
  for (const o of s.officers.filter(o => !o.baseId)) {
    if (!o.actorUuid) { o.skills = {}; o.skillRanks = {}; o.heroPoints = 0; continue; }
    const actor = await fromUuid(o.actorUuid);
    if (!actor || actor.documentName !== 'Actor' || actor.type !== 'character' || actor.parent) throw new Error(`${o.name}: linked world PC is unavailable. Relink that officer.`);
    o.name = actor.name;
    o.skills = {}; o.skillRanks = {};
    for (const k of SKILLS) {
      const stat = actorStatistic(actor,k);
      if (Number.isFinite(stat?.mod)) o.skills[k] = stat.mod;
      o.skillRanks[k] = stat?.rank ?? actor.system.skills?.[k.toLowerCase()]?.rank ?? 0;
    }
    o.heroPoints = actor.system.resources?.heroPoints?.value ?? 0;
  }
}

export class NeedRoll extends Error {
  constructor(key, data) { super('Foundry roll required'); this.key = key; this.data = data; }
}

// Replay a command on a fresh clone after each awaited native roll. Failed/cancelled
// commands never commit the speculative spending or generated candidates.
export async function executeWithRolls(initial, command, resolver) {
  const tape = new Map();
  for (let attempt=0; attempt<128; attempt++) {
    const draft = clone(initial);
    let index = 0;
    const take = data => {
      const key = JSON.stringify([index++,data]);
      if (!tape.has(key)) throw new NeedRoll(key,data);
      return tape.get(key).result;
    };
    globalThis.GuildmasterBridge = {
      die: (seed,...keys) => take({type:'d20',keys}).face,
      admin: (s,o,label,skill,dc) => {
        if(o.baseId) {
          const modifier=E.officerSkill(s,o,skill);
          const {face}=take({type:'chief',name:o.name,label,skill,dc,modifier});
          return {face,modifier,degree:E.degree(face,modifier,dc)};
        }
        if (!o.actorUuid) throw new Error('Link a PC to this officer before rolling a Guild Action.');
        return take({type:'admin',actorUuid:o.actorUuid,officer:o.id,label,skill,dc});
      }
    };
    let needed;
    try {
      command(draft);
      return {state:draft,rolls:[...tape.values()]};
    } catch (error) {
      if (!(error instanceof NeedRoll)) throw error;
      needed = error;
    } finally {
      delete globalThis.GuildmasterBridge;
    }
    const resolved = await resolver(needed.data);
    if (!resolved) throw new Error('Roll cancelled. No guild action or treasury funds were spent.');
    tape.set(needed.key,{...resolved,data:needed.data});
  }
  throw new Error('This action requested too many dice; no guild change was saved.');
}

export async function resolveFoundryRoll(data) {
  if (data.type === 'admin') {
    const actor = await fromUuid(data.actorUuid);
    const statistic = actorStatistic(actor,data.skill);
    if (!statistic?.roll) throw new Error(`${actor?.name ?? 'Officer'} has no supported ${data.skill} statistic.`);
    const roll = await statistic.roll({label:`Guildmaster: ${data.label}`,dc:{value:data.dc},extraRollOptions:['guildmaster'],createMessage:false,messageMode:'public',skipDialog:false});
    if (!roll) return null;
    const d20 = roll.dice.find(d => d.faces === 20);
    const face = d20?.results.find(r => r.active !== false && !r.discarded)?.result;
    if (!Number.isInteger(face)) throw new Error('The native check did not supply an active d20 result.');
    const modifier = roll.total-face;
    const nativeDegree = roll.options?.degreeOfSuccess;
    const degree = Number.isInteger(nativeDegree) ? nativeDegree : E.degree(face,modifier,data.dc);
    return {result:{face,modifier,degree},roll:roll.toJSON(),speaker:CONFIG.ChatMessage.documentClass.getSpeaker({actor})};
  }
  const roll = await new Roll('1d20').evaluate();
  return {result:{face:roll.total},roll:roll.toJSON()};
}

export function dispatch(s,cmd) {
  const authorized=authorize(s,cmd);
  if(authorized)cmd.officerId=authorized.id;
  if(['train','intensiveTraining','release'].includes(cmd.name)){
    const ids=cmd.name==='release'?[cmd.args[0]]:cmd.args[0];
    if(s.board.some(c=>c.status==='Accepted'&&c.assignmentDraft?.turn===s.turn&&c.assignmentDraft.ids.some(id=>ids.includes(id))))throw new Error('Clear the operative’s reserved squad assignment before training or release.');
  }
  if(applyTurnCommand(s,cmd))return;
  const beforeActions=s.actions;
  const a = cmd.args ?? [];
  const actions = {
    settleUpkeep:()=>E.settleUpkeep(s), finishUpkeep:()=>E.finishUpkeep(s),
    payInvoiceLine:()=>E.payInvoiceLine(s,...a),
    network:()=>E.network(s,...a), hire:()=>E.hire(s,...a), release:()=>E.releaseOperative(s,...a),
    secure:()=>E.secure(s,...a), deploy:()=>E.deploy(s,...a), promote:()=>E.promote(s,...a),
    train:()=>E.train(s,...a), morale:()=>E.morale(s,...a), recover:()=>E.recover(s,...a),
    recon:()=>E.recon(s,...a), broker:()=>E.broker(s,...a),
    endActivity:()=>E.endActivity(s), rollPhase:()=>E.rollPhase(s),
    acknowledgePhase:()=>E.acknowledgePhase(s), rerollPhase:()=>E.rerollPhase(s,...a),
    choice:()=>E.choice(s,...a), finishOperations:()=>E.finishOperations(s),
    respondEvent:()=>E.respondEvent(s,...a), advance:()=>{if(s.featChoices)throw new Error('Choose pending Guild Feats first.');E.advance(s);},
    leaderFeat:()=>E.chooseLeaderFeat(s,...a), guildFeat:()=>E.chooseGuildFeat(s,...a),
    payArrears:()=>E.payArrears(s,...a), project:()=>E.project(s,...a),
    purchaseBase:()=>E.purchaseBase(s,...a), appointChief:()=>E.appointChief(s,...a),
    focusBase:()=>E.focusBase(s,...a), renewStaff:()=>E.renewStaff(s,...a),
    borrow:()=>E.borrow(s,...a), repayLoan:()=>E.repayLoan(s,...a), optimize:()=>E.optimize(s,...a),
    sectorCampaign:()=>E.sectorCampaign(s,...a), intensiveTraining:()=>E.intensiveTraining(s,...a),
    operationsBriefing:()=>E.operationsBriefing(s,...a), extractionContingency:()=>E.extractionContingency(s,...a),
    linkOfficer:()=>{
      const [oid,uuid]=a, o=E.officer(s,oid);
      if(o.baseId)throw new Error('Only a PC officer can link a character.');
      if(o.actorUuid&&o.actorUuid!==uuid&&s.actionHistory.length)throw new Error('Use Reorganize Command to change existing officer roles. PC replacement after play starts needs a vacant slot.');
      if(s.officers.some(x=>x.id!==oid&&uuid&&x.actorUuid===uuid))throw new Error('Each PC can fill only one officer slot.');
      o.actorUuid=uuid||null; o.skills={}; o.skillRanks={}; o.heroPoints=0;
    }
  };
  if(!actions[cmd.name])throw new Error('Unsupported Guildmaster action.');
  const result=actions[cmd.name]();
  afterCommand(s,cmd,beforeActions);
  return result;
}

let queue = Promise.resolve();
export function serialize(task) {
  const result = queue.then(task);
  queue = result.catch(()=>{});
  return result;
}

function checkUnchanged(journal,base) {
  requireManager();
  const latest=envelope(journal);
  if(latest?.revision!==base.revision || latest?.pendingHeroSpend) throw new Error('The guild changed while this action was open. Refresh and try again.');
}

export async function createGuild({name='New Guild',partySize=4,seed=7,preset='staffed'}={}) {
  return serialize(async()=>{
    requireManager();
    const state=E.fresh(Number(seed),false,Number(partySize),preset);
    state.guildName=name.trim()||'New Guild';
    state.officers.forEach(o=>{o.actorUuid=null;o.skills={};o.skillRanks={};o.heroPoints=0;});
    initializeOffices(state);
    return CONFIG.JournalEntry.documentClass.create({name:state.guildName,ownership:{default:CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER},flags:{[ID]:{guild:{schema:1,moduleVersion:VERSION,revision:0,state,outbox:[],pendingHeroSpend:null,requestOutcomes:{}}}}});
  });
}

export async function commitCommand(journal,cmd,expectedRevision) {
  return serialize(()=>commitUnlocked(journal,cmd,expectedRevision));
}
async function commitUnlocked(journal,cmd,expectedRevision,requestId=null) {
    requireManager();
    const base=clone(envelope(journal));
    if(!base||base.schema!==1)throw new Error('Unsupported guild save schema.');
    if(base.pendingHeroSpend)throw new Error('Recover the interrupted Hero Point spend before continuing.');
    if(expectedRevision!==undefined&&base.revision!==expectedRevision)throw new Error('That sheet was out of date. Refresh before taking another action.');
    const initial=clone(base.state);
    await hydrateOfficers(initial);
    if(['finishUpkeep','finishActions','endActivity','respondEvent','advance'].includes(cmd.name)&&pendingRequests(journal).length)throw new Error('Resolve pending player requests before advancing the shared stage.');
    if(cmd.name==='linkOfficer'&&cmd.args?.[1]) {
      const actor=await fromUuid(cmd.args[1]);
      if(actor?.documentName!=='Actor'||actor.type!=='character'||actor.parent)throw new Error('Link a world character actor.');
    }
    const resolved=await executeWithRolls(initial,s=>dispatch(s,cmd),resolveFoundryRoll);
    checkUnchanged(journal,base);
    const transaction=foundry.utils.randomID();
    const oldLogs=initial.log.length;
    const records=resolved.rolls.map((r,i)=>({id:`${transaction}:roll:${i}`,kind:'roll',...r}));
    const newLogs=resolved.state.log.slice(0,Math.max(0,resolved.state.log.length-oldLogs)).reverse();
    records.push({id:`${transaction}:summary`,kind:'summary',title:cmd.name,logs:newLogs});
    const prepared={...base,schema:1,moduleVersion:VERSION,revision:base.revision+1,state:resolved.state,outbox:[...(base.outbox??[]),...records],pendingHeroSpend:null};
    if(requestId)prepared.requestOutcomes={...(base.requestOutcomes??{}),[requestId]:{status:'Approved',turn:initial.turn,action:cmd.name}};
    if(cmd.name==='rerollPhase') {
      const officer=E.officer(initial,cmd.args[0]),actor=await fromUuid(officer.actorUuid);
      const before=actor.system.resources.heroPoints.value;
      if(before!==officer.heroPoints||before<1)throw new Error('Hero Points changed while rolling. No guild result was committed.');
      await journal.setFlag(ID,'guild',{...base,pendingHeroSpend:{actorUuid:actor.uuid,before,after:before-1,prepared}});
      requireManager();
      await actor.update({'system.resources.heroPoints.value':before-1});
      requireManager();
      await journal.setFlag(ID,'guild',prepared);
    } else await journal.setFlag(ID,'guild',prepared);
    try { await flushOutbox(journal); } catch(error) { ui.notifications.warn('Guild saved; some chat results could not be posted. Use Retry chat delivery.'); console.error('Guildmaster chat delivery',error); }
    return envelope(journal);
}

export async function recoverHeroSpend(journal) {
  return serialize(async()=>{
    requireManager();
    const base=clone(envelope(journal)),pending=base?.pendingHeroSpend;
    if(!pending)throw new Error('No interrupted Hero Point transaction.');
    const actor=await fromUuid(pending.actorUuid);
    if(!actor)throw new Error('Restore the linked PC before recovering this transaction.');
    const current=actor.system.resources.heroPoints.value;
    if(current!==pending.before&&current!==pending.after)throw new Error('Hero Points were edited during the interruption. Restore their recorded pre-spend or post-spend value before recovery.');
    if(current===pending.before)await actor.update({'system.resources.heroPoints.value':pending.after});
    requireManager();
    await journal.setFlag(ID,'guild',{...pending.prepared,pendingHeroSpend:null});
    await flushOutbox(journal);
  });
}

export async function flushOutbox(journal) {
  requireManager();
  const base=clone(envelope(journal));
  for(const record of base.outbox??[]) {
    if(game.messages.some(m=>m.getFlag(ID,'delivery')===record.id))continue;
    const flags={[ID]:{delivery:record.id,guildUuid:journal.uuid}};
    if(record.kind==='roll') {
      const d=record.data;
      const flavor=d.type==='admin'?`Guildmaster · ${esc(d.label)} · ${esc(d.skill)} · DC ${d.dc} · ${E.names[record.result.degree]}`:d.type==='chief'?`Guildmaster · ${esc(d.name)} · ${esc(d.label)} · d20 ${record.result.face} +${d.modifier} vs DC ${d.dc} · ${E.names[E.degree(record.result.face,d.modifier,d.dc)]}`:`Guildmaster · ${esc(d.keys.join(' / '))} · d20 ${record.result.face}`;
      await Roll.fromJSON(JSON.stringify(record.roll)).toMessage({flavor,speaker:record.speaker??{alias:journal.name},flags}, {messageMode:'public'});
    } else {
      await CONFIG.ChatMessage.documentClass.create({speaker:{alias:journal.name},content:`<div class="guildmaster-chat"><strong>${esc(journal.name)}</strong>${record.logs.map(l=>`<p><b>${esc(l.title)}</b><br>${esc(l.text)}</p>`).join('')||'<p>Guild record updated.</p>'}</div>`,flags});
    }
  }
  // Preserve concurrent state fields; only the coordinating GM calls this method.
  const current=clone(envelope(journal));
  const ids=new Set((base.outbox??[]).map(r=>r.id));
  current.outbox=(current.outbox??[]).filter(r=>!ids.has(r.id));
  await journal.setFlag(ID,'guild',current);
}

export const retryChat = journal => serialize(()=>flushOutbox(journal));

export function pendingRequests(journal){
  const saved=envelope(journal),result=[];
  for(const actor of game.actors.values())for(const [id,r] of Object.entries(actor.getFlag(ID,'requests')??{})){
    if(r.guildUuid===journal.uuid&&r.status==='Pending'&&!saved?.requestOutcomes?.[id])result.push({...r,id,actorUuid:actor.uuid,actorName:actor.name});
  }
  return result;
}
export async function submitRequest(journal,cmd,expectedRevision){
  const saved=envelope(journal),s=stateForDisplay(journal);
  if(!s.turnGuide?.active)throw new Error('The GM must start the guided Guild Turn first.');
  if(saved.revision!==expectedRevision)throw new Error('The guild changed. Refresh and submit again.');
  const o=authorize(s,cmd);if(!o||o.baseId)throw new Error('Submit an action for your linked PC officer.');const actor=await fromUuid(o.actorUuid);
  if(!actor?.testUserPermission(game.user,3))throw new Error('You must own the linked PC to submit an action.');
  if(pendingRequests(journal).some(r=>r.actorUuid===actor.uuid))throw new Error('Wait for your pending action to be approved or declined.');
  const id=foundry.utils.randomID(),request={guildUuid:journal.uuid,status:'Pending',turn:s.turn,stage:stage(s),baseId:s.operatingBase,command:clone({...cmd,officerId:o.id}),createdAt:Date.now()};
  await actor.update({[`flags.${ID}.requests.${id}`]:request});
  return id;
}
export async function approveRequest(journal,actorUuid,id){
  return serialize(async()=>{
    requireManager();
    const actor=await fromUuid(actorUuid),r=actor?.getFlag(ID,'requests')?.[id],saved=envelope(journal);
    if(!r||r.guildUuid!==journal.uuid||r.status!=='Pending'||saved.requestOutcomes?.[id])throw new Error('This request is no longer pending.');
    const s=stateForDisplay(journal),o=E.officer(s,r.command.officerId);
    if(!actionSpec(r.command))throw new Error('Players can request officer actions, not GM phase or setup commands.');
    if(o.actorUuid!==actor.uuid||r.turn!==s.turn||r.stage!==stage(s)||r.baseId!==s.operatingBase)throw new Error('This request no longer matches its officer, turn, stage or base. Decline it and ask for a revised action.');
    // Actor ownership protects the inbox. Never trust a claimed user ID in a socket.
    authorize(s,r.command);
    return commitUnlocked(journal,clone(r.command),saved.revision,id);
  });
}
export async function declineRequest(journal,id){
  return serialize(async()=>{
    requireManager();const saved=clone(envelope(journal));
    if(saved.pendingHeroSpend)throw new Error('Recover the pending Hero Point spend first.');
    if(saved.requestOutcomes?.[id])throw new Error('That request is already resolved.');
    saved.requestOutcomes={...(saved.requestOutcomes??{}),[id]:{status:'Declined',turn:saved.state.turn}};saved.revision++;
    await journal.setFlag(ID,'guild',saved);
  });
}

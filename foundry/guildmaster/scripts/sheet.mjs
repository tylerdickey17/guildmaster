import {ID,VERSION,E,esc,clone,envelope,guilds,canManage,stateForDisplay,createGuild,commitCommand,recoverHeroSpend,retryChat,activeGM} from './core.mjs';

const {ApplicationV2,DialogV2}=foundry.applications.api;
const options = (rows,selected='') => rows.map(([value,label])=>`<option value="${esc(value)}" ${String(value)===String(selected)?'selected':''}>${esc(label)}</option>`).join('');
const select = (name,label,rows,selected='')=>`<label class="gm-field">${esc(label)}<select name="${esc(name)}">${options(rows,selected)}</select></label>`;
const input = (name,label,value,type='text',extra='')=>`<label class="gm-field">${esc(label)}<input name="${esc(name)}" type="${type}" value="${esc(value)}" ${extra}></label>`;
const credit = n => `${Number(n).toLocaleString()} cr`;
const paragraph = text => `<p>${esc(text)}</p>`;
const badge = text => `<span class="gm-badge">${esc(text)}</span>`;
const detail = (label,value)=>`<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`;
const b = (label,action,data={},disabled=false)=>`<button type="button" data-command="${esc(action)}" ${Object.entries(data).map(([k,v])=>`data-${k}="${esc(v)}"`).join(' ')} ${disabled?'disabled':''}>${esc(label)}</button>`;
const card = (title,body)=>`<article class="gm-card"><h3>${esc(title)}</h3>${body}</article>`;

export async function prompt(title,content,label='Continue') {
  return DialogV2.prompt({window:{title},position:{width:550},content:`<div class="guildmaster-dialog">${content}</div>`,ok:{label,callback:(_event,button)=>{
    const data=new FormData(button.form),result={};
    for(const key of data.keys())result[key]=key.endsWith('[]')?data.getAll(key):data.get(key);
    return result;
  }},rejectClose:false});
}

export class GuildmasterSheet extends ApplicationV2 {
  static openSheets=new Set();
  static DEFAULT_OPTIONS={id:'guildmaster-sheet',classes:['guildmaster'],position:{width:1040,height:760},window:{title:'Guildmaster · Alpha',icon:'fa-solid fa-building-shield',resizable:true}};
  constructor(options={}) {super(options);this.guildId=null;this.tab='overview';this.officerId='command';this.busy=false;this.revision=null;GuildmasterSheet.openSheets.add(this);}
  async close(options={}) {GuildmasterSheet.openSheets.delete(this);return super.close(options);}
  get journal(){return game.journal.get(this.guildId)??guilds()[0]??null;}
  get title(){return `${this.journal?.name??'Guildmaster'} · Alpha`;}
  async _renderHTML() {
    const journal=this.journal,all=guilds();
    this.guildId=journal?.id??null;
    if(!journal)return `<div class="gm-shell"><h1>Guildmaster</h1><p>Create a mercenary guild to begin its first thirty-day Guild Turn.</p><p>Alpha ${VERSION} · Foundry 14.369 / SF2e 1.6.1</p>${b('Create guild','create',{},!canManage())}<p>${canManage()?'The new guild starts with four operatives, a leased base, and 2,000 credits.':'The coordinating GM can create a guild. Players share its sheet.'}</p></div>`;
    const data=envelope(journal),s=stateForDisplay(journal),manage=canManage()&&!this.busy&&!data.pendingHeroSpend;
    this.revision=data.revision;
    const capacity=E.operativeCapacity(s),count=E.rosterCount(s),owed=s.arrears.reduce((n,a)=>n+a.amount,0);
    const officer=s.officers.some(o=>o.id===this.officerId)?this.officerId:s.officers[0].id;
    this.officerId=officer;
    return `<div class="gm-shell">
      <header class="gm-header"><div><div class="gm-eyebrow">GUILDMASTER · ALPHA ${VERSION}</div><h1>${esc(journal.name)}</h1><p>Turn ${s.turn} · ${esc(s.phase)} · 30 days per turn</p></div><div class="gm-controls"><select name="guild">${options(all.map(j=>[j.id,j.name]),journal.id)}</select>${b('New guild','create',{},!manage)}${b('Export backup','export')}</div></header>
      <div class="gm-metrics">${card('Treasury',`<strong>${credit(s.cash)}</strong><small>${credit(owed)} arrears</small>`)}${card('Guild Level',`<strong>${s.guildLevel}</strong><small>${s.guildXP}/1,000 XP · ${s.pendingGuildXP} pending</small>`)}${card('Reputation',`<strong>${s.reputation}</strong><small>${s.reputation>=80?'Exalted':s.reputation>=50?'Honored':s.reputation>=20?'Friendly':s.reputation>=0?'Neutral':'Unfriendly'}</small>`)}${card('Operatives',`<strong>${count} / ${capacity}</strong><small>${count>capacity?'Over capacity: recruitment blocked':'Guild-wide capacity'}</small>`)}${card('Guild Actions',`<strong>${s.actions}</strong><small>Pool ${E.actionPool(s)} · ${s.partySize} PCs</small>`)}</div>
      <div class="gm-banner">${game.user.isGM?`Coordinating GM: ${esc(activeGM()?.name??'none')}. ${canManage()?'You commit guild changes.':'This sheet is read-only for you while that GM is active.'}`:'Shared player view. Tell the GM your action; they resolve it using your linked PC.'}</div>
      ${data.pendingHeroSpend?`<div class="gm-alert">An interrupted Hero Point spend needs recovery. ${b('Recover Hero Point spend','recoverHero',{},!canManage()||this.busy)}</div>`:''}
      ${data.outbox?.length?`<div class="gm-alert">${data.outbox.length} chat result(s) await delivery. ${b('Retry chat delivery','retryChat',{},!manage)}</div>`:''}
      <div class="gm-toolbar">${select('officer','Acting officer',s.officers.map(o=>[o.id,`${o.name}${o.actorUuid||o.baseId?'':' · not linked'}`]),officer)}${select('base','Operating base',s.bases.filter(x=>x.status==='Operational').map(x=>[x.id,x.name]),s.operatingBase)}</div>
      <nav class="gm-tabs">${['overview','officers','roster','contracts','assets','history'].map(t=>b(t==='assets'?'Bases & finances':t[0].toUpperCase()+t.slice(1),'tab',{tab:t},this.tab===t)).join('')}</nav>
      <div class="gm-layout"><aside>${this.phasePanel(s,manage)}</aside><main>${this[this.tab](s,manage)}</main></div>
    </div>`;
  }
  _replaceHTML(html,content) {
    const top=content.querySelector('main')?.scrollTop??0;
    content.innerHTML=html;
    const main=content.querySelector('main');if(main)main.scrollTop=top;
    content.onclick=event=>{
      const button=event.target.closest('[data-command]');if(!button||button.disabled)return;
      event.preventDefault();this.handle(button.dataset).catch(error=>{console.error('Guildmaster',error);ui.notifications.error(error.message);});
    };
    content.onchange=event=>{
      const target=event.target;
      if(target.name==='guild'){this.guildId=target.value;this.render({force:true});}
      if(target.name==='officer')this.officerId=target.value;
      if(target.name==='base')this.run('focusBase',[target.value]).catch(error=>ui.notifications.error(error.message));
    };
    const base=content.querySelector('[name="base"]');if(base)base.disabled=!canManage()||this.busy;
  }
  phasePanel(s,manage) {
    let body='';
    if(s.phase==='upkeep') {
      body=`<p>Review rent, services, retainers, and debt before taking actions.</p><div class="gm-invoice">${s.upkeep.invoice.map(l=>`<p>${esc(l.label)}<br><strong>${credit(l.amount-l.paid)}</strong> remaining</p>`).join('')}</div>`;
      if(!s.upkeep.settled)body+=b('Pay available funds','settleUpkeep',{},!manage);
      for(const c of s.upkeep.choices)body+=card('Training decision',paragraph(s.cohorts.find(x=>x.id===c.cohort)?.ids.map(id=>E.merc(s,id).name).join(', '))+b('Release trainees','choice',{id:c.id,value:'stop'},!manage)+b('Fund another block','choice',{id:c.id,value:'continue'},!manage));
      if(s.upkeep.settled)body+=b('Open Activity phase','finishUpkeep',{},!manage||!!s.upkeep.choices.length);
    } else if(s.phase==='activity') {
      body='<p>Each player gets an opportunity to act. Officers use one shared pool; deploying a secured contract is routine.</p>'+b('Work the Network: recruits','network',{mode:'recruits'},!manage)+b('Work the Network: contracts','network',{mode:'contracts'},!manage)+b('Promote the Guild · 1 action / 50 cr','promote',{},!manage)+b('Train operatives','group',{kind:'train'},!manage)+b('Boost Morale','group',{kind:'morale'},!manage)+b('Recovery Protocol','group',{kind:'recover'},!manage)+b('Sector Campaign · 2 actions','sectorCampaign',{},!manage)+b('Intensive Training · 2 actions','group',{kind:'intensiveTraining'},!manage)+b('Broker Exclusive Deal','broker',{},!manage)+b('Begin Events phase','endActivity',{},!manage);
    } else if(s.phase==='event') {
      const pending=s.operations?.pendingReview;
      if(pending) {
        const j=s.jobs.find(x=>x.id===pending.job),r=j.rolls[pending.phase];
        body=card(`${E.phases[pending.phase]} result`,paragraph(j.contract.name)+`<strong class="gm-result">${esc(E.names[r.degree])}</strong>`+paragraph(`${r.leadName} · ${r.skill}: d20 ${r.face} ${r.actualModifier>=0?'+':''}${r.actualModifier} = ${r.total} vs DC ${r.dc}`)+(r.originalRoll?paragraph(`Original d20 ${r.originalRoll.face}; Hero Point reroll kept.`):'')+(r.complication?paragraph(r.complication.text):'')+b('Spend PC Hero Point to reroll','hero',{},!manage||!!r.heroSpent)+b('Accept this phase result','acknowledgePhase',{},!manage));
      } else if(!s.operations?.settled) {
        const job=E.nextJob(s);body=paragraph(job?`${job.contract.name}: ${E.phases[job.rolls.length]}`:'Resolve remaining jobs.')+b('Roll next mission phase','rollPhase',{},!manage);
      } else {
        for(const c of s.operations.choices) {
          const j=s.jobs.find(x=>x.id===c.job);
          if(c.type==='failedPay')body+=card('Failed-job compensation',paragraph(j.contract.name)+b(`Full ${credit(j.quote.pay)} · Loyalty +5`,'choice',{id:c.id,value:'full'},!manage)+b(`Half ${credit(E.round(j.quote.pay*.5))} · Loyalty unchanged`,'choice',{id:c.id,value:'half'},!manage)+b('No pay · Loyalty −5','choice',{id:c.id,value:'none'},!manage));
          if(c.type==='mvp')body+=card('Recognize an MVP',paragraph(j.contract.name)+b('Choose contributing operative','mvp',{id:c.id},!manage)+b('No MVP','choice',{id:c.id,value:'none'},!manage));
        }
        if(!s.operations.complete)body+=b('Continue to monthly event','finishOperations',{},!manage||!!s.operations.choices.length);
        else if(s.event)body+=card(s.event.title,paragraph(s.event.text)+b('Accept / acknowledge','respondEvent',{value:'accept'},!manage)+b('Decline','respondEvent',{value:'decline'},!manage));
      }
    } else {
      body=paragraph('Contract and development XP have been applied. Make any pending feat choices, then begin the next Guild Turn.');
      if(s.featChoices)body+=b(`Choose Guild Feat (${s.featChoices})`,'guildFeat',{},!manage);
      body+=b('Begin next Guild Turn','advance',{},!manage||s.featChoices>0);
    }
    return card(`${s.phase[0].toUpperCase()+s.phase.slice(1)} phase`,body);
  }
  overview(s) {
    const jobs=s.jobs.filter(j=>j.departure===s.turn);
    return card('Current operations',jobs.length?jobs.map(j=>`<section><h4>${esc(j.contract.name)}</h4>${paragraph(j.result?j.result.completionReason:`${j.rolls.length} / 3 checks rolled · ${E.completionRule(j.contract)}`)}${j.rolls.map(r=>paragraph(`${r.phase}: ${E.names[r.degree]} · d20 ${r.face} ${r.actualModifier>=0?'+':''}${r.actualModifier} = ${r.total} vs DC ${r.dc}`)).join('')}${j.result?paragraph(`${j.result.success?'Completed':'Failed'} · ${j.result.guildXP??0} Guild XP · ${j.result.recovery} recovery turn(s)`):''}${j.result?.exceptionalGuidance?paragraph(j.result.exceptionalGuidance):''}</section>`).join(''):'<p>No squad deployed this turn.</p>')+card('Next Upkeep forecast',`<strong>${credit(E.forecast(s))}</strong><p>Known overhead only. Mission wages and optional spending are separate.</p>`)+card('Recent results',s.log.slice(0,8).map(l=>`<p><b>${esc(l.title)}</b><br>${esc(l.text)}</p>`).join(''));
  }
  officers(s,manage) {
    return `<div class="gm-card-grid">${s.officers.map(o=>card(o.name,paragraph(o.role)+paragraph(o.baseId?'Hired outpost chief':o.actorUuid?'Linked PC':'Link your actual SF2e character to this slot.')+`<dl>${detail('Actions led this turn',o.used)}${!o.baseId?detail('Hero Points',o.heroPoints):''}</dl>`+(!o.baseId?b('Link / change character','link',{id:o.id},!manage):'')+(o.actorUuid?b('Open character sheet','actor',{uuid:o.actorUuid}):'')+`<details><summary>Current skill modifiers</summary>${Object.entries(o.skills).map(([k,v])=>paragraph(`${k}: ${v>=0?'+':''}${v}${o.skillRanks?` · rank ${o.skillRanks[k]??0}`:''}`)).join('')}</details>`)).join('')}</div><p>Linking assigns a character to an existing slot. Reorganize Command and the full officer progression are future work.</p>`;
  }
  roster(s,manage) {
    const members=s.mercs.filter(m=>!['Expired','Released','Dead','Inactive'].includes(m.status));
    return `<div class="gm-card-grid">${members.map(m=>card(m.name,badge(m.ancestry)+badge(m.status)+badge(`Level ${m.level}`)+paragraph(`${m.callSign} · ${m.role}`)+paragraph(m.bio)+`<dl>${detail('Employment',m.status==='Candidate'?'Candidate':m.employment)}${detail('Loyalty',m.loyalty)}${detail('Operative XP',`${m.xp}/1,000`)}${detail('Assignment pay',credit(E.assignmentWage(m)))}${detail('Monthly retainer',credit(E.retainer(m)))}${detail('Base',E.base(s,m.baseId).name)}${m.expires&&m.status==='Candidate'?detail('Candidate expires',`End of Turn ${m.expires}`):''}</dl>`+`<details><summary>Skills & personal details</summary>${Object.keys(m.skills).map(k=>paragraph(`${k}: +${E.skill(m,k)} · ${E.leadRank(m,k)}`)).join('')}${paragraph(m.personality)}${paragraph(m.motivation)}${paragraph(m.quirk)}</details>`+(m.status==='Candidate'?b(`Hire · ${credit(2*E.wage(m.level))}`,'hire',{id:m.id},!manage||E.rosterCount(s)>=E.operativeCapacity(s)):['Available','Onboarding','Recovering'].includes(m.status)?b('Release operative','release',{id:m.id},!manage):'')+(m.level>=5&&!m.leaderFeat?b('Choose Leader Feat','leaderFeat',{id:m.id},!manage):m.leaderFeat?paragraph(E.leaderFeats.find(f=>f.id===m.leaderFeat)?.name):''))).join('')}</div>`;
  }
  contracts(s,manage) {
    const cards=s.board.filter(c=>['Offer','Accepted','Deployed'].includes(c.status));
    return `<div class="gm-card-grid">${cards.map(c=>{
      const r=E.contractRule(c),xp=E.contractThreat(s,c),price=E.contractPayout(c.level,r.payout_factor);
      return card(c.name,badge(c.category)+badge(E.V.contracts[c.kind].label)+badge(c.status)+paragraph(c.description)+`<dl>${detail('Mission level',c.level)}${detail('Completion',E.completionRule(c))}${detail('Base payout',credit(price))}${detail('Guild threat / XP',`${xp.label??xp.name??xp.tier??''} · ${xp.xp} XP`)}${detail('Deadline',c.status==='Offer'?`Offer expires end Turn ${c.expires}`:`Deploy by Turn ${c.deployBy}`)}</dl>`+`<ol>${c.skills.map((k,p)=>`<li>${esc(E.phases[p])}: ${esc(k)} · ${esc(c.minimumLeadRanks?.[p]??r.minimum_lead_rank)} · base DC ${E.V.level_dc[c.level]+r.dc_offset}</li>`).join('')}</ol>`+`<details><summary>Client, lore & consequences</summary>${paragraph(`${c.client} · ${c.contact?.name??''}`)}${paragraph(c.location?.name)}${paragraph(c.clientLore)}${paragraph(c.loreHook)}${paragraph(c.localComplication)}${(c.phaseObjectives??[]).map(paragraph).join('')}${paragraph(E.consequencePreview(c))}</details>`+(c.status==='Offer'?b('Secure contract','secure',{id:c.id},!manage):c.status==='Accepted'?b('Assign squad & deploy','deploy',{id:c.id},!manage)+b('Prepare operation','prepare',{id:c.id},!manage):''));
    }).join('')||'<p>No active leads. Work the Network to find contracts.</p>'}</div>`;
  }
  assets(s,manage) {
    return card('Bases',s.bases.map(x=>`<section><h4>${esc(x.name)}</h4>${paragraph(`${x.status} · ${credit(x.monthly)}/month · ${E.locationSlots(s,x.id).free} free upgrade slots`)}${x.type==='outpost'&&!x.chief?b('Appoint chief','appointChief',{id:x.id},!manage):''}</section>`).join('')+b('Purchase base · Level 4+','purchaseBase',{},!manage))+card('Installed facilities',s.facilities.map(f=>`<section><h4>${esc(E.V.facilities[f.type].name)}</h4>${paragraph(`${E.base(s,f.baseId).name} · ${E.facilityOperational(s,f)?'Funded and operational':'Inactive / unfunded'} · ${credit(E.facilityQuote(f.type).overhead)}/month`)}${s.phase==='upkeep'&&!s.upkeep.settled?b(f.staff.active?'Pause service':'Renew service','renewStaff',{id:f.id,active:f.staff.active?'false':'true'},!manage):''}${s.phase==='activity'?b('Optimize next maintenance bill','optimize',{id:f.id},!manage):''}</section>`).join('')+b('Commission upgrade · Level 2+','project',{},!manage))+card('Projects',s.projects.filter(p=>!p.done).map(p=>paragraph(`${E.V.facilities[p.type].name}: ready Turn ${p.due}`)).join('')||'<p>No active projects.</p>')+card('Loans & arrears',s.loans.map(l=>`<p>${esc(l.id)} · ${esc(l.type)} · ${credit(l.remaining)} principal · ${esc(l.status)} ${b('Prepay principal','repayLoan',{id:l.id},!manage)}</p>`).join('')+s.arrears.map(a=>paragraph(`${a.creditor}: ${credit(a.amount)}`)).join('')+b('Apply for loan · Level 2+','borrow',{},!manage)+b('Pay arrears','payArrears',{},!manage));
  }
  history(s) {
    return card('Guild record',s.log.map(l=>`<p><small>Turn ${l.turn}</small><br><b>${esc(l.title)}</b><br>${esc(l.text)}</p>`).join(''))+card('Treasury ledger',`<table><thead><tr><th>Turn</th><th>Entry</th><th>Credits</th></tr></thead><tbody>${s.ledger.slice().reverse().map(l=>`<tr><td>${l.turn}</td><td>${esc(l.note)}</td><td>${l.amount>=0?'+':''}${l.amount}</td></tr>`).join('')}</tbody></table>`);
  }
  async run(name,args=[],expectedRevision=this.revision) {
    if(this.busy)return;
    const journal=this.journal,revision=expectedRevision;
    this.busy=true;
    try{await commitCommand(journal,{name,args},revision);}finally{this.busy=false;await this.render({force:true});}
  }
  async handle(d) {
    const journal=this.journal,s=journal?stateForDisplay(journal):null,oid=this.officerId,revision=this.revision;
    const run=(name,args=[])=>this.run(name,args,revision);
    if(d.command==='tab'){this.tab=d.tab;return this.render({force:true});}
    if(d.command==='export') {
      const blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),guild:clone(envelope(journal))},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`guildmaster-turn-${s.turn}.json`;a.click();URL.revokeObjectURL(url);return;
    }
    if(d.command==='actor'){const actor=await fromUuid(d.uuid);return actor?.sheet.render({force:true});}
    if(d.command==='create') {
      const value=await prompt('Create a Guild',input('name','Guild name','Meridian Guild')+input('partySize','PC officers',4,'number','min="1" max="8" step="1"')+input('seed','Content seed',7,'number','step="1"')+select('preset','Starting setup',[['staffed','Leased HQ + staffed Training Suite'],['lean','Leased HQ only']]),'Create guild');
      if(!value)return;const created=await createGuild(value);this.guildId=created.id;return this.render({force:true});
    }
    if(d.command==='recoverHero'){await recoverHeroSpend(journal);return this.render({force:true});}
    if(d.command==='retryChat'){await retryChat(journal);return this.render({force:true});}
    if(d.command==='link') {
      const value=await prompt('Link PC officer',select('actor','World character',[['','Unlinked'],...game.actors.filter(a=>a.type==='character').map(a=>[a.uuid,a.name])],E.officer(s,d.id).actorUuid),'Link character');
      return value?run('linkOfficer',[d.id,value.actor]):null;
    }
    if(d.command==='network'||d.command==='broker') {
      const value=await prompt(d.command==='broker'?'Broker Exclusive Deal':`Work the Network: ${d.mode}`,input('level','Target level',Math.min(20,2*s.guildLevel-1),'number',`min="1" max="${Math.min(20,2*s.guildLevel+1)}" step="1"`)+(d.mode==='recruits'?select('ancestry','Ancestry',[['','Any ancestry'],...E.C.ancestries.map(a=>[a.id,a.name])]):'')+paragraph('One shared Guild Action. Searching does not hire candidates or secure contracts.'),'Roll search');
      if(!value)return;return d.command==='broker'?run('broker',[oid,Number(value.level)]):run('network',[oid,d.mode,Number(value.level),value.ancestry||null]);
    }
    if(d.command==='hire') {
      const m=E.merc(s,d.id),value=await prompt(`Hire ${m.name}`,select('employment','Agreement',[['free','Free Agent'],['retained','Retained Operative · requires Reputation 20']])+paragraph(`One action; ${credit(2*E.wage(m.level))} hiring cost. Ready next Guild Turn. Retained assignment pay and Upkeep retainer remain separate.`),'Hire operative');
      return value?run('hire',[d.id,oid,value.employment]):null;
    }
    if(d.command==='release') {
      const value=await prompt('Release operative',paragraph(`Release ${E.merc(s,d.id).name} from the active roster? They stop future assignments and retainers. Existing paid fees are not refunded; debts remain. No Guild Action.`),'Release');
      return value?run('release',[d.id]):null;
    }
    if(d.command==='secure') {
      const c=E.offer(s,d.id),eligible=c.kind==='standard'&&s.contacts.includes(c.client)&&!s.trustedUsed&&(s.guildFeats.includes('trusted')||s.guildFeats.includes('standing'));
      const value=await prompt('Secure contract',paragraph(c.name)+select('waiver','Acquisition',[['false','Spend one Guild Action'],...(eligible?[['true','Use shared Trusted / Standing allowance']]:[])]),'Secure');
      return value?run('secure',[d.id,oid,value.waiver==='true']):null;
    }
    if(d.command==='deploy'||d.command==='prepare')return this.squadDialog(s,d.id,d.command,revision);
    if(d.command==='group') {
      const members=E.localMercs(s).filter(m=>d.kind==='recover'?m.status==='Recovering':d.kind==='morale'?['Available','Recovering'].includes(m.status):m.status==='Available');
      const value=await prompt(d.kind,paragraph('Select operatives. Costs and eligibility are validated before committing.')+members.map(m=>`<label class="gm-choice"><input type="checkbox" name="ids[]" value="${esc(m.id)}">${esc(m.name)} · Level ${m.level}</label>`).join(''),'Fund action');
      return value?run(d.kind,[value['ids[]']??[],oid]):null;
    }
    if(d.command==='hero') {
      const rows=s.officers.filter(o=>o.actorUuid&&o.heroPoints>0).map(o=>[o.id,`${o.name} · ${o.heroPoints} Hero Points`]);
      if(!rows.length)throw new Error('No linked PC has a Hero Point available.');
      const value=await prompt('Spend a Hero Point',select('pc','Spending PC',rows)+paragraph('Spend one point from the actual PC sheet. Reroll the pending mission check and keep the new result.'),'Spend & reroll');
      return value?run('rerollPhase',[value.pc]):null;
    }
    if(d.command==='mvp') {
      const choice=s.operations.choices.find(c=>c.id===d.id);
      if(!choice.eligible.length)return run('choice',[d.id,'none']);
      const value=await prompt('Recognize an MVP',select('member','Material contributor',choice.eligible.map(id=>[id,E.merc(s,id).name]))+paragraph('Award 50 operative XP.'),'Recognize');
      return value?run('choice',[d.id,value.member]):null;
    }
    if(d.command==='guildFeat'||d.command==='leaderFeat') {
      const rows=(d.command==='guildFeat'?E.availableGuildFeats(s):E.leaderFeats).map(f=>[f.id,`${f.name}: ${f.text}`]),value=await prompt('Choose feat',select('feat','Feat',rows),'Choose');
      return value?run(d.command,d.command==='guildFeat'?[value.feat]:[d.id,value.feat]):null;
    }
    if(d.command==='project'||d.command==='purchaseBase') {
      const rows=Object.entries(d.command==='project'?E.V.facilities:E.V.base_market).filter(([,v])=>d.command!=='project'||!!v.name).map(([id,v])=>[id,`${v.name}: ${credit(d.command==='project'?E.facilityQuote(id).cost:v.purchase_price)}`]),value=await prompt(d.command==='project'?'Commission upgrade':'Purchase base',select('type','Available options',rows)+paragraph(d.command==='project'?'The quote includes an external project manager. Monthly staff and asset overhead are separate.':'New properties become available next turn and add monthly overhead.'),'Fund purchase');
      return value?run(d.command,d.command==='project'?[value.type,oid,null,s.operatingBase]:[value.type,oid]):null;
    }
    if(d.command==='borrow') {
      const value=await prompt('Apply for financing',select('type','Loan type',[['unsecured','Unsecured · Level 2+'],['secured','Secured · Level 4+']])+input('amount','Principal (whole hundreds)',1000,'number','min="100" step="100"')+select('collateral','Collateral for secured loan',[['','None'],...s.bases.filter(x=>x.type!=='leased_station_hq'&&x.status==='Operational').map(x=>[x.id,x.name])]),'Review terms');
      if(!value)return;const q=E.loanQuote(s,value.type,Number(value.amount),value.collateral||null),ok=await prompt('Loan terms',paragraph(`${credit(q.amount)} principal; ${q.rate*100}% monthly interest on remaining principal; ${q.term} turns. First payment ${credit(q.payment)} next Upkeep. One Guild Action.`),'Accept & borrow');
      return ok?run('borrow',[value.type,q.amount,oid,value.collateral||null]):null;
    }
    if(d.command==='payArrears'||d.command==='repayLoan') {
      const limit=d.command==='repayLoan'?Math.min(s.cash,s.loans.find(l=>l.id===d.id).remaining):s.cash,value=await prompt('Choose repayment',input('amount','Credits to pay',Math.min(100,limit),'number',`min="1" max="${limit}" step="1"`)+paragraph(`Treasury ${credit(s.cash)}; known next Upkeep ${credit(E.forecast(s))}. No Guild Action.`),'Pay');
      return value?run(d.command,d.command==='repayLoan'?[d.id,Number(value.amount)]:[Number(value.amount)]):null;
    }
    const args={choice:[d.id,d.value],respondEvent:[d.value],promote:[oid],sectorCampaign:[oid],appointChief:[d.id,oid],optimize:[d.id,oid],renewStaff:[d.id,d.active==='true']}[d.command]??[];
    return run(d.command,args);
  }
  async squadDialog(s,cid,mode,revision=this.revision) {
    const run=(name,args=[])=>this.run(name,args,revision);
    const c=E.offer(s,cid),members=E.localMercs(s).filter(m=>m.status==='Available'&&m.dispatchedTurn!==s.turn),initial=members.slice(0,4).map(m=>m.id),leads=E.chooseLeads(s,c,initial)??[];
    const value=await prompt(mode==='deploy'?'Assign contract squad':'Prepare operation',paragraph(c.name)+members.map(m=>`<label class="gm-choice"><input type="checkbox" name="ids[]" value="${esc(m.id)}" ${initial.includes(m.id)?'checked':''}>${esc(m.name)} · Level ${m.level} · ${credit(E.assignmentWage(m))} pay</label>`).join('')+c.skills.map((k,p)=>select(`lead${p}`,`${E.phases[p]} · ${k}`,members.map(m=>[m.id,`${m.name}: +${E.skill(m,k)} · ${E.leadRank(m,k)}`]),leads[p])).join('')+select('leader','Squad leader',[['','No leader'],...members.filter(m=>m.level>=5&&m.leaderFeat).map(m=>[m.id,m.name])])+(mode==='prepare'?select('plan','Preparation',[['recon','Digital Recon · 1 action'],['briefing','Operations Briefing · 2 actions / Level 3+'],['contingency','Extraction Contingency · 3 actions / Level 4+']])+select('phase','Recon target phase',E.phases.map((p,i)=>[i,p]),1):''),'Review assignment');
    if(!value)return;
    const ids=value['ids[]']??[],chosen=[value.lead0,value.lead1,value.lead2],leader=value.leader||null,q=E.quote(s,c,ids,chosen,leader);
    const price=mode==='deploy'?`Success payout ${credit(q.payout)}; quoted wages ${credit(q.pay)}. Deployment spends no action.`:value.plan==='briefing'?`2 actions and ${credit(25*ids.length)}; squad and leads lock.`:value.plan==='contingency'?`3 actions and ${credit(5*Math.ceil(q.pay*.25/5))}; squad and leads lock.`:'1 action; prepare one phase.';
    const ok=await prompt('Review squad',paragraph(price)+paragraph(`Squad Level ${q.squadLevel}; ${E.completionRule(c)}`)+q.checks.map(r=>paragraph(`${r.phase}: ${r.leadName} (${r.skill}) +${r.modifier} vs DC ${r.dc}`)).join('')+paragraph(E.consequencePreview(c)),mode==='deploy'?'Deploy':'Prepare');
    if(!ok)return;
    if(mode==='deploy')return run('deploy',[cid,ids,chosen,leader]);
    if(value.plan==='recon')return run('recon',[cid,this.officerId,Number(value.phase)]);
    return run(value.plan==='briefing'?'operationsBriefing':'extractionContingency',[cid,ids,chosen,this.officerId,leader]);
  }
}

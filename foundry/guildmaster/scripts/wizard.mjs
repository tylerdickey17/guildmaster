import {ID,VERSION,E,envelope,stateForDisplay,canManage,activeGM,commitCommand,pendingRequests,approveRequest,declineRequest,esc} from './core.mjs';
import {OFFICES,STAGES,ACTIONS,office,stage,officersForUser,visibleActions} from './turns.mjs';
import {GuildmasterSheet,prompt,select,credit,paragraph,b,card,badge} from './sheet.mjs';

const TITLES={upkeep:'Upkeep',actions:'Guild Actions',assignments:'Mission Assignments',events:'Events & Resolution',finish:'Complete Guild Turn'};
const TILES=['contracts','recruits','secure','broker','promote','sectorCampaign','hire','release','train','intensiveTraining','recover','leaderFeat','morale','recon','operationsBriefing','extractionContingency','project','purchaseBase','appointChief','optimize','borrow','repayLoan','payArrears','restructure'];
export class GuildTurnWizard extends GuildmasterSheet {
  static DEFAULT_OPTIONS={id:'guildmaster-turn',classes:['guildmaster','guildmaster-turn'],position:{width:1060,height:800},window:{title:'Guildmaster · Guided Turn',icon:'fa-solid fa-forward-step',resizable:true}};
  constructor(options={}){super(options);this.viewOfficer='all';this.startedTurn=null;}
  get title(){return `${this.journal?.name??'Guildmaster'} · Guild Turn ${envelope(this.journal)?.state.turn??''}`;}
  async _renderHTML(){
    const j=this.journal;if(!j)return '<div class="gm-shell"><p>Create a guild in Guild Management first.</p></div>';
    const saved=envelope(j),s=stateForDisplay(j);this.guildId=j.id;this.revision=saved.revision;
    const officers=officersForUser(s);
    if(!game.user.isGM){this.viewOfficer=officers.some(o=>o.id===this.viewOfficer)?this.viewOfficer:(officers.find(o=>o.actorUuid===game.user.character?.uuid)??officers[0])?.id;}
    if(game.user.isGM&&this.viewOfficer!=='all'&&!s.officers.some(o=>o.id===this.viewOfficer))this.viewOfficer='all';
    const selected=s.officers.find(o=>o.id===this.viewOfficer);
    if(selected)this.officerId=selected.id;
    if(s.turnGuide?.active)this.startedTurn=s.turn;
    const current=stage(s),manager=canManage()&&!this.busy&&!saved.pendingHeroSpend;
    const view=game.user.isGM?select('viewOfficer','Officer view',[['all','All Officers — GM overview'],...officers.map(o=>[o.id,`${o.name} · ${OFFICES[office(o)]}`])],this.viewOfficer):officers.length>1?select('viewOfficer','Your officer',officers.map(o=>[o.id,`${o.name} · ${OFFICES[office(o)]}`]),this.viewOfficer):paragraph(selected?`${selected.name} · ${OFFICES[office(selected)]}`:'Link a PC you own to a guild office to participate.');
    return `<div class="gm-shell"><header class="gm-header"><div><div class="gm-eyebrow">GUILDMASTER · GUIDED TURN</div><h1>${esc(j.name)} · Turn ${s.turn}</h1><p>${credit(s.cash)} treasury · ${s.actions} shared actions · ${E.rosterCount(s)} / ${E.operativeCapacity(s)} operatives</p></div>${b('Guild Management','management')}</header>
      <ol class="gm-stepper">${STAGES.map((id,i)=>`<li class="${id===current?'current':STAGES.indexOf(current)>i?'complete':''}"><span>${i+1}</span>${TITLES[id]}</li>`).join('')}</ol>
      <div class="gm-toolbar">${view}</div>
      ${saved.pendingHeroSpend?`<div class="gm-alert">A Hero Point spend needs recovery. The recorded reroll is preserved. ${b('Recover Hero Point spend','recoverHero',{},!canManage()||this.busy)}</div>`:''}
      ${!s.turnGuide?.active?card('Start / resume this turn',paragraph('This resumes the current saved phase without resetting money, actions, or dice.')+b('Start Guild Turn','startTurn',{},!manager)):''}
      ${!canManage()&&game.user.isGM?paragraph(`Coordinating GM: ${activeGM()?.name??'none'}. This GM view is read-only.`):''}
      ${this.requests(s)}
      <main class="gm-guided-main">${s.turnGuide?.active?this[current](s,manager,selected):paragraph('The GM starts the shared turn. Players can then use their own officer view.')}</main>
    </div>`;
  }
  _replaceHTML(html,content){super._replaceHTML(html,content);const original=content.onchange;content.onchange=event=>{if(event.target.name==='viewOfficer'){this.viewOfficer=event.target.value;this.render({force:true});}else original?.(event);};}
  actorForRole(s,role){return s.officers.find(o=>office(o)===role)?.id;}
  canRole(s,role){return (canManage()&&this.viewOfficer==='all')||officersForUser(s).some(o=>o.id===this.viewOfficer&&office(o)===role);}
  roleButton(s,label,action,role,data={},disabled=false){const oid=role?this.actorForRole(s,role):this.officerId;return this.canRole(s,role)||(!role&&officersForUser(s).length)?b(label,action,{...data,officer:oid},disabled||this.busy||!!envelope(this.journal).pendingHeroSpend):'';}
  requests(s){
    const requests=pendingRequests(this.journal).filter(r=>canManage()||officersForUser(s).some(o=>o.actorUuid===r.actorUuid));
    if(!requests.length)return '';
    return card(canManage()?'Player action queue':'Your pending action',requests.map(r=>`<div class="gm-request"><b>${esc(r.actorName)}</b> · ${esc((r.command.name==='network'?ACTIONS[r.command.args[1]]:ACTIONS[r.command.name])?.label??r.command.name)}${paragraph(`Turn ${r.turn} · ${TITLES[r.stage]??r.stage}`)}${canManage()?b('Review & resolve','approve',{actor:r.actorUuid,id:r.id},this.busy)+b('Decline','decline',{id:r.id},this.busy):paragraph('Waiting for GM approval; no guild action or cash has been spent.')}</div>`).join(''));
  }
  upkeep(s,manager){
    const due=s.upkeep.invoice.reduce((n,l)=>n+l.amount-l.paid,0);
    let body=card('Expenses for this Guild Turn',paragraph(`${credit(due)} remains due. Rent, services, retainers, and loan payments are itemized below.`)+`<table><thead><tr><th>Expense</th><th>Due</th><th>Paid</th><th></th></tr></thead><tbody>${s.upkeep.invoice.map(l=>`<tr><td>${esc(l.label)}</td><td>${credit(l.amount)}</td><td>${credit(l.paid)}</td><td>${!s.upkeep.settled&&l.paid<l.amount?this.roleButton(s,'Pay','payExpense','quarter',{id:l.id}):''}</td></tr>`).join('')}</tbody></table>`+(!s.upkeep.settled?this.roleButton(s,'Pay available funds & record arrears','settleUpkeep','quarter'):'<p>Payments recorded. Resolve training decisions before continuing.</p>'));
    body+=card('Staff services',s.facilities.map(f=>paragraph(`${E.V.facilities[f.type].name}: ${f.staff.active?'renewed':'paused'} · ${credit(f.staff.monthly)}/month`)+(!s.upkeep.settled?this.roleButton(s,f.staff.active?'Pause service':'Renew service','renewStaff','quarter',{id:f.id,active:String(!f.staff.active)}):'')).join('')||paragraph('No facility services.'));
    for(const c of s.upkeep.choices)body+=card('Training decision',paragraph(s.cohorts.find(x=>x.id===c.cohort)?.ids.map(id=>E.merc(s,id).name).join(', '))+this.roleButton(s,'Release trainees','choice','liaison',{id:c.id,value:'stop'})+this.roleButton(s,'Fund another training block','choice','liaison',{id:c.id,value:'continue'}));
    return body+`<footer class="gm-turn-footer">${b('Continue to Guild Actions','finishUpkeep',{},!manager||!s.upkeep.settled||s.upkeep.choices.length>0)}</footer>`;
  }
  actions(s,manager,selected){
    const people=s.officers.filter(o=>!o.baseId&&o.actorUuid);
    const participation=card('Every player gets an opportunity',people.map(o=>paragraph(`${o.name} · ${OFFICES[office(o)]}: ${o.used>0?'acted':s.turnGuide.participation[o.id]?'passed for now':'awaiting action or pass'}`)).join('')+paragraph('One shared pool. Passing does not prevent later mission preparation.'));
    const rows=[];
    for(const key of TILES){
      const a=ACTIONS[key];let o=selected;
      if(!selected){o=s.officers.find(x=>a.offices?.includes(office(x)))??s.officers.find(x=>x.id===this.officerId)??s.officers[0];}
      const eligible=visibleActions(s,o).some(([id])=>id===key);
      if(selected&&!eligible)continue;
      if(!selected&&!game.user.isGM)continue;
      const reason=!a.stages.includes('actions')?'Available during Mission Assignments':a.offices&&!a.offices.includes(office(o))?'Office is vacant':s.guildLevel<a.level?`Guild Level ${a.level} required`:a.skill.length&&!a.skill.some(k=>o.skillRanks?.[k]>0||(!o.actorUuid&&o.skills[k]))?`Trained ${a.skill.join(' or ')} required`:s.actions<a.actions?`Needs ${a.actions} shared actions`:key==='broker'&&s.reputation<20?'Friendly Reputation required':key==='restructure'&&s.reorganizedTurn===s.turn?'Already reorganized this turn':'';
      rows.push(card(a.label,badge(a.offices?.map(id=>OFFICES[id]).join(' / ')??'General')+paragraph(`${a.actions} ${a.actions===1?'action':'actions'} · Guild Level ${a.level}${a.skill.length?' · '+a.skill.join(' or '):''}`)+paragraph(reason||`Acting officer: ${o.name}`)+b(game.user.isGM?'Take action':'Submit action','tile',{key,officer:o.id},this.busy||!!reason||!!envelope(this.journal).pendingHeroSpend)));
    }
    const passOffice=selected??s.officers.find(o=>o.id===this.officerId)??s.officers[0];
    return participation+`<div class="gm-card-grid">${rows.join('')||paragraph('No eligible actions in this officer view.')}</div>`+paragraph('Operations prepares accepted contracts here, then uses assembled squads for larger preparations in Assignments. Reserve shared actions for those plans.')+b('Pass for now','pass',{officer:passOffice.id},this.busy||!passOffice.actorUuid)+`<footer class="gm-turn-footer">${b('Continue to Mission Assignments','finishActions',{},!manager)}</footer>`;
  }
  assignments(s,manager){
    const contracts=s.board.filter(c=>c.status==='Accepted');
    const body=contracts.map(c=>{
      const d=c.assignmentDraft?.turn===s.turn?c.assignmentDraft:null;
      let description=paragraph(c.description)+paragraph(E.completionRule(c));
      if(d){try{const q=E.quote(s,c,d.ids,d.leads,d.leader);description+=paragraph(`Squad: ${d.ids.map(id=>E.merc(s,id).name).join(', ')}`)+paragraph(`Payout ${credit(q.payout)} · wages ${credit(q.pay)} · Squad Level ${q.squadLevel}`)+q.checks.map(r=>paragraph(`${r.phase}: ${r.leadName} (${r.skill}) +${r.modifier} vs DC ${r.dc}`)).join('');}catch(error){description+=paragraph('Assignment needs revision: '+error.message);}}
      description+=this.roleButton(s,d?'Change assembled squad':'Assemble squad','assemble','quarter',{id:c.id})+(d?this.roleButton(s,'Clear squad','clearAssignment','quarter',{id:c.id})+this.roleButton(s,'Deploy squad · routine','deployDraft','quarter',{id:c.id})+this.roleButton(s,'Prepare assembled operation','prepareDraft','field',{id:c.id}):paragraph('The Quartermaster assembles this team; Operations can then prepare it.'));
      return card(c.name,description);
    }).join('');
    return paragraph('Assembly and deployment are routine. Preparations still spend remaining Guild Actions. Each operative can lead only one of the three checks and deploy on one new mission per turn.')+`<div class="gm-card-grid">${body||paragraph('No accepted, undeployed contracts.')}</div>`+card('Deployed operations',s.jobs.filter(j=>j.departure===s.turn).map(j=>paragraph(j.contract.name)).join('')||paragraph('None yet.'))+`<footer class="gm-turn-footer">${b('Return to Guild Actions','returnActions',{},!manager)}${b('Continue to Events','beginEvents',{},!manager)}</footer>`;
  }
  events(s,manager){
    const p=s.operations?.pendingReview;let body='';
    if(p){const j=s.jobs.find(j=>j.id===p.job),r=j.rolls[p.phase];body=card(`${E.phases[p.phase]} result`,paragraph(j.contract.name)+`<strong class="gm-result">${E.names[r.degree]}</strong>`+paragraph(`${r.leadName} · ${r.skill}: d20 ${r.face} ${r.actualModifier>=0?'+':''}${r.actualModifier} = ${r.total} vs DC ${r.dc}`)+(r.originalRoll?paragraph(`Original d20 ${r.originalRoll.face}; Hero Point reroll kept.`):'')+(r.complication?paragraph(r.complication.text):'')+b('Spend a Hero Point','hero',{},this.busy||!!r.heroSpent||!officersForUser(s).some(o=>o.actorUuid&&o.heroPoints>0))+b('Accept phase result','acknowledgePhase',{},!manager));}
    else if(!s.operations.settled){const job=E.nextJob(s);body=card('Resolve deployed operations',paragraph(job?`${job.contract.name} · ${E.phases[job.rolls.length]}`:'Resolve remaining missions.')+this.roleButton(s,'Roll mission phase','rollPhase','field'));}
    else {
      body=this.overview(s);
      for(const c of s.operations.choices){const j=s.jobs.find(j=>j.id===c.job);body+=c.type==='failedPay'?card('Failed-job compensation',paragraph(j.contract.name)+this.roleButton(s,`Full ${credit(j.quote.pay)} · Loyalty +5`,'choice','quarter',{id:c.id,value:'full'})+this.roleButton(s,`Half ${credit(E.round(j.quote.pay*.5))} · Loyalty unchanged`,'choice','quarter',{id:c.id,value:'half'})+this.roleButton(s,'No pay · Loyalty −5','choice','quarter',{id:c.id,value:'none'})):card('Recognize an MVP',paragraph(j.contract.name)+this.roleButton(s,'Choose MVP','mvp','field',{id:c.id})+this.roleButton(s,'No MVP','choice','field',{id:c.id,value:'none'}));}
      if(!s.operations.complete)body+=b('Roll / reveal monthly event','finishOperations',{},!manager||s.operations.choices.length>0);
      else if(s.event)body+=card(s.event.title,paragraph(s.event.text)+b('Accept / acknowledge event','respondEvent',{value:'accept'},!manager)+b('Decline event','respondEvent',{value:'decline'},!manager));
    }
    return body;
  }
  finish(s,manager){return card('Guild Turn resolved',paragraph(`${s.metrics.completed} contracts completed overall · Guild Level ${s.guildLevel} · ${s.guildXP}/1,000 XP`)+paragraph(`Treasury ${credit(s.cash)} · known next Upkeep ${credit(E.forecast(s))}`)+(s.featChoices?this.roleButton(s,`Choose Guild Feat (${s.featChoices})`,'guildFeat','command'):'')+paragraph('Complete the turn to prepare the next Upkeep and close this guide.'))+b('Complete Guild Turn','advance',{},!manager||s.featChoices>0);}
  async handle(d){
    if(d.officer)this.officerId=d.officer;
    const s=stateForDisplay(this.journal),revision=this.revision;
    if(d.command==='management')return game.modules.get(ID).api.open(this.guildId);
    if(d.command==='approve'){
      const request=pendingRequests(this.journal).find(r=>r.id===d.id&&r.actorUuid===d.actor);if(!request)throw new Error('Request no longer pending.');
      const ok=await prompt('Review player action',paragraph(`${request.actorName}: ${request.command.name}`)+paragraph((request.command.args??[]).flat(Infinity).map(value=>s.mercs.find(m=>m.id===value)?.name??s.board.find(c=>c.id===value)?.name??s.officers.find(o=>o.id===value)?.name??s.bases.find(b=>b.id===value)?.name??(typeof value==='object'?Object.entries(value??{}).map(([id,role])=>`${s.officers.find(o=>o.id===id)?.name??id}: ${OFFICES[role]??role}`).join('; '):value)).join(' · '))+paragraph('Validate against the current shared budget and resolve with the linked PC. Cancelling a native roll leaves the request pending.'),'Approve & resolve');
      if(ok)await approveRequest(this.journal,d.actor,d.id);return this.render({force:true});
    }
    if(d.command==='decline'){await declineRequest(this.journal,d.id);return this.render({force:true});}
    if(d.command==='payExpense')return this.run('payInvoiceLine',[d.id],revision);
    if(d.command==='beginEvents'){
      const undeployed=s.board.filter(c=>c.status==='Accepted');
      if(undeployed.length){const ok=await prompt('Unassigned contracts',paragraph(`${undeployed.length} accepted contract(s) remain undeployed. Expiring Exclusive contracts lose Reputation. Ordinary uncompleted contracts have no payout or XP.`),'Continue to Events');if(!ok)return;}
      return this.run('endActivity',[],revision);
    }
    if(d.command==='tile'){
      const key=d.key;
      if(key==='contracts'||key==='recruits')return super.handle({command:'network',mode:key});
      if(['train','morale','recover','intensiveTraining'].includes(key))return super.handle({command:'group',kind:key});
      if(key==='restructure'){
        const choices=s.officers.filter(o=>!o.baseId).map(o=>select(o.id,o.name,Object.entries(OFFICES).filter(([id])=>id!=='chief'),office(o))).join('');
        const mapping=await prompt('Reorganize Command',paragraph('One shared Guild Action, once per turn. Changes apply immediately; existing actor links and resolved actions stay with their PCs.')+choices,'Reorganize');
        return mapping?this.run('restructure',[mapping],revision):null;
      }
      const pool=key==='secure'||key==='recon'?s.board.filter(c=>key==='secure'?c.status==='Offer':c.status==='Accepted'):key==='leaderFeat'?s.mercs.filter(m=>m.level>=5&&!m.leaderFeat):key==='hire'?s.mercs.filter(m=>m.status==='Candidate'):key==='release'?s.mercs.filter(m=>['Available','Recovering','Onboarding'].includes(m.status)):key==='optimize'?s.facilities:key==='appointChief'?s.bases.filter(b=>b.type==='outpost'&&!b.chief):key==='repayLoan'?s.loans.filter(l=>l.remaining>0):null;
      if(pool){if(!pool.length)throw new Error('No eligible targets yet.');const value=await prompt(ACTIONS[key].label,select('id','Target',pool.map(x=>[x.id,x.name??E.V.facilities[x.type]?.name??x.id])));if(!value)return;
        if(key==='recon'){const choice=await prompt('Digital Recon',select('phase','Mission phase',E.phases.map((name,i)=>[i,name]),1));return choice?this.run('recon',[value.id,this.officerId,Number(choice.phase)],revision):null;}
        return super.handle({command:key,id:value.id});
      }
      return super.handle({command:key});
    }
    if(d.command==='assemble')return this.squadDialog(s,d.id,'assemble',revision);
    if(d.command==='clearAssignment')return this.run('clearAssignment',[d.id],revision);
    if(d.command==='deployDraft')return this.run('deployDraft',[d.id],revision);
    if(d.command==='prepareDraft'){
      const c=E.offer(s,d.id),draft=c.assignmentDraft;if(!draft)throw new Error('The Quartermaster must assemble this squad first.');
      const available=visibleActions(s,E.officer(s,this.officerId)).filter(([key])=>['recon','operationsBriefing','extractionContingency'].includes(key));
      if(!available.length)throw new Error('This officer has no eligible preparation action.');
      const value=await prompt('Prepare assembled operation',paragraph(`Squad: ${draft.ids.map(id=>E.merc(s,id).name).join(', ')}`)+select('plan','Preparation',available.map(([key,a])=>[key,`${a.label} · ${a.actions} actions · ${key==='operationsBriefing'?credit(25*draft.ids.length):key==='extractionContingency'?credit(5*Math.ceil(E.quote(s,c,draft.ids,draft.leads,draft.leader).pay*.25/5)):'no cash cost'}`]))+select('phase','Recon phase',E.phases.map((name,i)=>[i,name]),1));
      if(!value)return;if(value.plan==='recon')return this.run('recon',[c.id,this.officerId,Number(value.phase)],revision);
      return this.run(value.plan,[c.id,draft.ids,draft.leads,this.officerId,draft.leader],revision);
    }
    if(d.command==='hero'){
      const eligible=officersForUser(s).filter(o=>o.actorUuid&&o.heroPoints>0),value=await prompt('Spend Hero Point',select('pc','Spending PC',eligible.map(o=>[o.id,`${o.name} · ${o.heroPoints} points`]))+paragraph('Spend one point from the actual PC sheet; keep the reroll.'));
      if(!value)return;this.officerId=value.pc;return this.run('rerollPhase',[value.pc],revision);
    }
    return super.handle(d);
  }
}

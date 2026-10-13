import {ID,VERSION,E,envelope,stateForDisplay,canManage,activeGM,commitCommand,pendingRequests,approveRequest,declineRequest,esc} from './core.mjs';
import {OFFICES,STAGES,ACTIONS,office,stage,officersForUser,visibleActions} from './turns.mjs';
import {GuildmasterSheet,prompt,select,credit,paragraph,b,card,badge,detail} from './sheet.mjs';

const TITLES={upkeep:'Upkeep',actions:'Guild Actions',assignments:'Mission Assignments',events:'Events & Resolution',finish:'Complete Guild Turn'};
const TILES=['contracts','recruits','secure','broker','promote','sectorCampaign','hire','release','train','intensiveTraining','recover','leaderFeat','morale','recon','missionBriefing','operationsBriefing','extractionContingency','project','purchaseBase','appointChief','optimize','borrow','repayLoan','payArrears','restructure'];
export class GuildTurnWizard extends GuildmasterSheet {
  static DEFAULT_OPTIONS={id:'guildmaster-turn',classes:['guildmaster','guildmaster-turn'],position:{width:1060,height:800},window:{title:'Guildmaster · Guided Turn',icon:'fa-solid fa-forward-step',resizable:true}};
  constructor(options={}){super(options);this.viewOfficer='all';this.startedTurn=null;this.workspace='actions';this.discoverySeen=null;this.assignmentContract=null;this.squadEdits=new Map();}
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
    const discoveryKey=`${j.id}:${s.discoveryHistory?.length??0}`;
    if(this.discoverySeen!==discoveryKey){this.discoverySeen=discoveryKey;if(stage(s)==='actions'&&s.lastDiscovery?.turn===s.turn&&(!selected||office(selected)===(s.lastDiscovery.mode==='contracts'?'command':'liaison')))this.workspace=s.lastDiscovery.mode;}
    const current=stage(s),manager=canManage()&&!this.busy&&!saved.pendingHeroSpend;
    const view=game.user.isGM?select('viewOfficer','Officer view',[['all','All Officers — GM overview'],...officers.map(o=>[o.id,`${o.name} · ${OFFICES[office(o)]}`])],this.viewOfficer):officers.length>1?select('viewOfficer','Your officer',officers.map(o=>[o.id,`${o.name} · ${OFFICES[office(o)]}`]),this.viewOfficer):paragraph(selected?`${selected.name} · ${OFFICES[office(selected)]}`:'Link a PC you own to a guild office to participate.');
    return `<div class="gm-shell"><header class="gm-header"><div><div class="gm-eyebrow">GUILDMASTER · GUIDED TURN</div><h1>${esc(j.name)} · Turn ${s.turn}</h1><p>${credit(s.cash)} treasury · ${s.actions} shared actions · ${E.rosterCount(s)} / ${E.operativeCapacity(s)} operatives</p></div>${b('Guild Management','management')}</header>
      <ol class="gm-stepper">${STAGES.map((id,i)=>`<li class="${id===current?'current':STAGES.indexOf(current)>i?'complete':''}"><span>${i+1}</span>${TITLES[id]}</li>`).join('')}</ol>
      <div class="gm-toolbar">${view}${select('base','Operating base',s.bases.filter(x=>x.status==='Operational').map(x=>[x.id,x.name]),s.operatingBase)}</div>
      ${saved.pendingHeroSpend?`<div class="gm-alert">A Hero Point spend needs recovery. The recorded reroll is preserved. ${b('Recover Hero Point spend','recoverHero',{},!canManage()||this.busy)}</div>`:''}
      ${!s.turnGuide?.active?card('Start / resume this turn',paragraph('This resumes the current saved phase without resetting money, actions, or dice.')+b('Start Guild Turn','startTurn',{},!manager)):''}
      ${!canManage()&&game.user.isGM?paragraph(`Coordinating GM: ${activeGM()?.name??'none'}. This GM view is read-only.`):''}
      ${this.requests(s)}
      <main class="gm-guided-main">${s.turnGuide?.active?this[current](s,manager,selected):paragraph('The GM starts the shared turn. Players can then use their own officer view.')}</main>
    </div>`;
  }
  _replaceHTML(html,content){
    super._replaceHTML(html,content);content.onsubmit=event=>event.preventDefault();const original=content.onchange;
    content.onchange=event=>{
      if(event.target.name==='viewOfficer'){this.viewOfficer=event.target.value;this.render({force:true});}
      else if(event.target.name==='assignmentContract'){this.assignmentContract=event.target.value;this.render({force:true});}
      else if(event.target.closest('[data-squad-form]')){const form=event.target.closest('[data-squad-form]'),s=stateForDisplay(this.journal),c=E.offer(s,form.dataset.squadForm),draft=this.readSquad(form);this.squadEdits.set(`${this.guildId}:${c.id}`,draft);form.querySelector('[data-squad-preview]').innerHTML=this.squadPreview(s,c,draft);}
      else original?.(event);
    };
    const handlers=content.onclick;content.onclick=event=>{const button=event.target.closest('[data-command="saveSquad"]');if(button&&!button.disabled){event.preventDefault();const form=button.closest('[data-squad-form]');this.handle({...button.dataset,draft:this.readSquad(form)}).catch(error=>ui.notifications.error(error.message));}else handlers?.(event);};
  }
  readSquad(form){const data=new FormData(form);return {ids:data.getAll('ids[]'),leads:[data.get('lead0'),data.get('lead1'),data.get('lead2')],leader:data.get('leader')||null};}

  actorForRole(s,role){return s.officers.find(o=>office(o)===role)?.id;}
  canRole(s,role){return (canManage()&&this.viewOfficer==='all')||officersForUser(s).some(o=>o.id===this.viewOfficer&&office(o)===role);}
  roleButton(s,label,action,role,data={},disabled=false){const oid=role?this.actorForRole(s,role):this.officerId;return this.canRole(s,role)||(!role&&officersForUser(s).length)?b(label,action,{...data,officer:oid},disabled||(game.user.isGM&&!canManage())||this.busy||!!envelope(this.journal).pendingHeroSpend):'';}
  requests(s){
    const requests=pendingRequests(this.journal).filter(r=>canManage()||officersForUser(s).some(o=>o.actorUuid===r.actorUuid));
    if(!requests.length)return '';
    return card(canManage()?'Player action queue':'Your pending action',requests.map(r=>`<div class="gm-request"><b>${esc(r.actorName)}</b> · ${esc((r.command.name==='network'?ACTIONS[r.command.args[1]]:ACTIONS[r.command.name])?.label??r.command.name)}${paragraph(`Turn ${r.turn} · ${TITLES[r.stage]??r.stage}`)}${canManage()?b('Review & resolve','approve',{actor:r.actorUuid,id:r.id},this.busy)+b('Decline','decline',{id:r.id},this.busy):paragraph('Waiting for GM approval; no guild action or cash has been spent.')}</div>`).join(''));
  }
  upkeep(s,manager){
    const due=s.upkeep.invoice.reduce((n,l)=>n+l.amount-l.paid,0);
    let body=card('Expenses for this Guild Turn',paragraph(`${credit(due)} remains due. Rent, services, retainers, and loan payments are itemized below.`)+`<table><thead><tr><th>Expense</th><th>Due</th><th>Paid</th><th></th></tr></thead><tbody>${s.upkeep.invoice.map(l=>`<tr><td>${esc(l.label)}</td><td>${credit(l.amount)}</td><td>${credit(l.paid)}</td><td>${!s.upkeep.settled&&l.paid<l.amount?this.roleButton(s,'Pay','payExpense','quarter',{id:l.id}):''}</td></tr>`).join('')}</tbody></table>`+(!s.upkeep.settled?this.roleButton(s,'Pay available funds & record arrears','settleUpkeep','quarter'):'<p>Payments recorded. Resolve training decisions before continuing.</p>'));
    body+=card('Staff services',s.facilities.map(f=>paragraph(`${E.V.facilities[f.type].name}: ${f.staff.active?'renewed':'paused'} · ${credit(f.staff.monthly)}/month`)+(!s.upkeep.settled?this.roleButton(s,f.staff.active?'Pause service':'Renew service','renewStaff','quarter',{id:f.id,active:String(!f.staff.active)}):'')).join('')||paragraph('No facility services.'));
    for(const c of s.upkeep.choices)body+=card('Training decision',paragraph(s.cohorts.find(x=>x.id===c.cohort)?.ids.map(id=>E.merc(s,id).name).join(', '))+this.roleButton(s,'Release trainees','choice','field',{id:c.id,value:'stop'})+this.roleButton(s,'Fund another training block','choice','field',{id:c.id,value:'continue'}));
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
      rows.push(card(a.label,badge(a.offices?.map(id=>OFFICES[id]).join(' / ')??'General')+paragraph(`${a.actions} ${a.actions===1?'action':'actions'} · Guild Level ${a.level}${a.skill.length?' · '+a.skill.join(' or '):''}`)+paragraph(reason||`Acting officer: ${o.name}`)+b(game.user.isGM?'Take action':'Submit action','tile',{key,officer:o.id},this.busy||(game.user.isGM&&!canManage())||!!reason||!!envelope(this.journal).pendingHeroSpend)));
    }
    const passOffice=selected??s.officers.find(o=>o.id===this.officerId)??s.officers[0];
    const counts={contracts:s.board.filter(c=>['Offer','Accepted'].includes(c.status)).length,recruits:s.mercs.filter(m=>m.status==='Candidate'&&m.expires>=s.turn).length,crew:E.rosterCount(s)};
    const nav=`<nav class="gm-tabs gm-workspaces">${[['actions','Officer Actions'],['contracts',`Contracts (${counts.contracts})`],['recruits',`Recruits (${counts.recruits})`],['crew',`Crew (${counts.crew})`]].map(([key,label])=>b(label,'workspace',{workspace:key},this.workspace===key)).join('')}</nav>`;
    const workspace=this.workspace==='contracts'?this.contractBoard(s):this.workspace==='recruits'?this.recruitMarket(s):this.workspace==='crew'?this.crewRoster(s):`<div class="gm-card-grid">${rows.join('')||paragraph('No eligible actions in this officer view.')}</div>`;
    return nav+workspace+`<details class="gm-participation"><summary>Player participation & remaining actions</summary>${participation}</details>`+paragraph('Operations manages training and recovery here, then briefs assembled squads in Assignments. Reserve shared actions for mission preparation.')+b('Pass for now','pass',{officer:passOffice.id},this.busy||!passOffice.actorUuid||(game.user.isGM&&!canManage()))+`<footer class="gm-turn-footer">${b('Continue to Mission Assignments','finishActions',{},!manager)}</footer>`;

  }
  discoverySummary(s,mode){
    const d=[...(s.discoveryHistory??[])].reverse().find(d=>d.mode===mode&&d.turn===s.turn);if(!d)return '';
    const roll=[...(s.rollHistory??[])].reverse().find(r=>r.turn===d.turn&&r.label===`Network ${mode}`);
    return card('Latest search results',badge(E.names[d.degree])+paragraph(roll?`${roll.officer}: d20 ${roll.face} ${roll.modifier>=0?'+':''}${roll.modifier} = ${roll.total} vs DC ${roll.dc}`:'Search result recorded.')+paragraph(`${d.results.length} ${mode==='contracts'?'contract leads':'candidates'} found at target Level ${d.targetLevel}. Finding is separate from securing or hiring.`)+(d.results.length?`<details><summary>Discovery table rolls</summary>${d.results.map(x=>paragraph(`${x.name} · ${Object.entries(x.rolls).map(([k,v])=>`${k} d20 ${v}`).join(', ')}${x.notes.length?' · '+x.notes.join('; '):''}`)).join('')}</details>`:paragraph('No results from this search. Earlier unexpired offers remain available.')));
  }
  contractDossier(s,c){
    const r=E.contractRule(c),xp=E.contractThreat(s,c),price=E.contractPayout(c.level,r.payout_factor);
    return badge(c.status)+badge(E.V.contracts[c.kind].label)+badge(c.rarity??'Common')+paragraph(c.description)+`<dl>${detail('Mission level',c.level)}${detail('Completion',E.completionRule(c))}${detail('Base payout',credit(price))}${detail('Guild threat / XP',`${xp.label} · ${xp.xp} XP`)}${detail('Origin base',E.base(s,c.baseId).name)}${detail('Deadline',c.status==='Offer'?`Offer expires end Turn ${c.expires}`:`Deploy by Turn ${c.deployBy}`)}</dl>`+`<ol>${c.skills.map((k,p)=>`<li>${esc(E.phases[p])}: ${esc(k)} · ${esc(c.minimumLeadRanks?.[p]??r.minimum_lead_rank)} · base DC ${E.V.level_dc[c.level]+r.dc_offset}</li>`).join('')}</ol>`+paragraph(E.consequencePreview(c))+(c.preparation?paragraph(`Preparation: ${c.preparation.bonus>=0?'+':''}${c.preparation.bonus} circumstance to ${c.preparation.allPhases?'all phases':E.phases[c.preparation.phase]}; expires end Turn ${c.preparation.expires}.`):'')+(c.contingency?paragraph(`Extraction contingency: ${c.contingency.charges} protection charges.`):'')+`<details><summary>Client & mission lore</summary>${paragraph(`${c.client} · ${c.contact?.name??''}`)}${paragraph(c.location?.name)}${paragraph(c.clientLore)}${paragraph(c.loreHook)}${paragraph(c.localComplication)}${(c.phaseObjectives??[]).map(paragraph).join('')}</details>`;
  }
  contractBoard(s){
    const cards=s.board.filter(c=>['Offer','Accepted','Deployed'].includes(c.status));
    return this.discoverySummary(s,'contracts')+paragraph('Inspect each lead before securing it. The Commander secures contracts; the Quartermaster assembles secured missions during Assignments. All officers can inspect this shared board.')+this.roleButton(s,'Find contract leads','tile','command',{key:'contracts'},s.actions<1)+`<div class="gm-card-grid">${cards.map(c=>card(c.name,this.contractDossier(s,c)+(c.status==='Offer'?this.roleButton(s,'Secure this contract','secure','command',{id:c.id},c.baseId!==s.operatingBase||c.expires<s.turn||s.actions<E.acquisitionCost(s,c).cost):c.status==='Accepted'?paragraph('Secured — ready for squad assembly in Mission Assignments.'):paragraph('Deployed — resolve during Events.')))).join('')||paragraph('No active contract leads. Find contract leads to populate the board.')}</div>`;
  }
  operativeDetails(s,m){
    return badge(m.ancestry)+badge(m.status)+badge(`Level ${m.level}`)+badge(m.rarity??'Common')+paragraph(`${m.callSign} · ${m.role}`)+paragraph(m.bio)+`<dl>${detail('Loyalty',m.loyalty)}${detail('Operative XP',`${m.xp}/1,000`)}${detail('Base',E.base(s,m.baseId).name)}${detail('Assignment pay',credit(E.assignmentWage(m)))}${detail('Employment',m.status==='Candidate'?'Choose agreement when hiring':m.employment)}${m.status==='Candidate'?detail('Hiring fee',credit(2*E.wage(m.level)))+detail('Offer expires',`End of Turn ${m.expires}`)+detail('Retained upkeep option',`${credit(E.retainer({...m,employment:'retained'}))}/turn · Reputation 20+`):detail('Monthly retainer',credit(E.retainer(m)))}${m.readyAt>s.turn?detail('Available from',`Turn ${m.readyAt}`):''}</dl>`+`<details><summary>Skills & personal details</summary>${Object.keys(m.skills).map(k=>paragraph(`${k}: +${E.skill(m,k)} · ${E.leadRank(m,k)}`)).join('')}${paragraph(m.personality)}${paragraph(m.motivation)}${paragraph(m.quirk)}</details>`;
  }
  recruitMarket(s){
    const candidates=s.mercs.filter(m=>m.status==='Candidate'&&m.expires>=s.turn);
    return this.discoverySummary(s,'recruits')+paragraph(`Roster ${E.rosterCount(s)} / ${E.operativeCapacity(s)}. Personnel hires candidates. New hires finish onboarding next Guild Turn; assignment wages and monthly retainers are separate.`)+this.roleButton(s,'Find recruits','tile','liaison',{key:'recruits'},s.actions<1)+`<div class="gm-card-grid">${candidates.map(m=>card(m.name,this.operativeDetails(s,m)+this.roleButton(s,`Hire ${m.name} · 1 action / ${credit(2*E.wage(m.level))}`,'hire','liaison',{id:m.id},m.baseId!==s.operatingBase||s.actions<1||s.cash<2*E.wage(m.level)||E.rosterCount(s)>=E.operativeCapacity(s)))).join('')||paragraph('No unexpired candidates. Find recruits to populate the market.')}</div>`;
  }
  crewRoster(s){
    return `<div class="gm-card-grid">${s.mercs.filter(m=>!['Candidate','Expired','Released','Inactive','Dead'].includes(m.status)).map(m=>card(m.name,this.operativeDetails(s,m)+(['Available','Onboarding','Recovering'].includes(m.status)?this.roleButton(s,'Release operative','release','liaison',{id:m.id}):'')+(m.level>=5&&!m.leaderFeat?this.roleButton(s,'Choose Leader Feat','leaderFeat','liaison',{id:m.id}):m.leaderFeat?paragraph(E.leaderFeats.find(f=>f.id===m.leaderFeat)?.name):''))).join('')}</div>`;
  }
  squadPreview(s,c,d){
    try{const q=E.quote(s,c,d.ids,d.leads,d.leader);return `<div class="gm-squad-quote">${paragraph(`Squad: ${d.ids.map(id=>E.merc(s,id).name).join(', ')}`)}${paragraph(`Success payout ${credit(q.payout)} · wages ${credit(q.pay)} · balance before overhead ${credit(q.payout-q.pay)} · Squad Level ${q.squadLevel}`)}${q.checks.map(r=>paragraph(`${r.phase}: ${r.leadName} (${r.skill}) +${r.modifier} vs DC ${r.dc}`)).join('')}${paragraph('Wages settle during Events; failed-job compensation is a separate decision.')}</div>`;}catch(error){return `<div class="gm-alert">${paragraph('Assignment needs revision: '+error.message)}</div>`;}
  }
  assignmentCrew(s,c){
    const reservation=m=>s.board.find(other=>other.status==='Accepted'&&other.assignmentDraft?.turn===s.turn&&other.assignmentDraft.ids.includes(m.id));
    const crew=E.localMercs(s).filter(m=>!['Candidate','Expired','Released','Inactive','Dead'].includes(m.status));
    return card('Crew at this base',`<div class="gm-table-scroll"><table><thead><tr><th>Operative</th><th>Level</th><th>Availability / reservation</th><th>Assignment wage</th>${c?c.skills.map((k,p)=>`<th>${esc(E.phases[p])}<br>${esc(k)}</th>`).join(''):'<th>Skills</th>'}</tr></thead><tbody>${crew.map(m=>{const reserved=reservation(m);return `<tr><td>${esc(m.name)}</td><td>${m.level}</td><td>${esc(reserved?`Reserved: ${reserved.name}`:m.status)}${m.readyAt>s.turn?` · Turn ${m.readyAt}`:''}</td><td>${credit(E.assignmentWage(m))}</td>${c?c.skills.map((k,p)=>`<td>+${E.skill(m,k)} · ${esc(E.leadRank(m,k))}${E.leadEligible(c,m,p)?'':' · below required rank'}</td>`).join(''):`<td>${esc(Object.keys(m.skills).join(', '))}</td>`}</tr>`;}).join('')}</tbody></table></div>`);
  }
  squadEditor(s,c){
    const key=`${this.guildId}:${c.id}`,saved=c.assignmentDraft?.turn===s.turn?c.assignmentDraft:null;
    const members=E.localMercs(s).filter(m=>m.status==='Available'&&m.dispatchedTurn!==s.turn&&!s.board.some(other=>other.id!==c.id&&other.status==='Accepted'&&other.assignmentDraft?.turn===s.turn&&other.assignmentDraft.ids.includes(m.id)));
    const ids=members.slice(0,4).map(m=>m.id),draft=this.squadEdits.get(key)??saved??{ids,leads:E.chooseLeads(s,c,ids)??[],leader:null};
    const locked=!!(c.preparation?.lock||c.contingency?.lock);
    if(locked)return paragraph('A funded plan locks this assembled squad and its leads.');
    return `<form class="gm-squad-editor" data-squad-form="${esc(c.id)}"><h4>${saved?'Edit assembled squad':'Assemble this mission team'}</h4>${paragraph('Choose 3–6 operatives, then one distinct qualified lead for each phase. Save the squad before Operations prepares it or you deploy.')}${members.map(m=>`<label class="gm-choice"><input type="checkbox" name="ids[]" value="${esc(m.id)}" ${draft.ids.includes(m.id)?'checked':''} ${locked?'disabled':''}>${esc(m.name)} · Level ${m.level} · ${credit(E.assignmentWage(m))}</label>`).join('')}${c.skills.map((k,p)=>select(`lead${p}`,`${E.phases[p]} · ${k}`,members.filter(m=>E.leadEligible(c,m,p)).map(m=>[m.id,`${m.name}: +${E.skill(m,k)} · ${E.leadRank(m,k)}`]),draft.leads[p])).join('')}${select('leader','Squad leader',[['','No leader'],...members.filter(m=>m.level>=5&&m.leaderFeat).map(m=>[m.id,m.name])],draft.leader)}<div data-squad-preview>${this.squadPreview(s,c,draft)}</div>${this.roleButton(s,'Save assembled squad','saveSquad','quarter',{id:c.id},locked)}${locked?paragraph('A funded plan locks this squad and its leads.'):''}</form>`;
  }
  assignments(s,manager){
    const contracts=s.board.filter(c=>c.status==='Accepted');
    const c=contracts.find(c=>c.id===this.assignmentContract)??contracts[0];this.assignmentContract=c?.id??null;
    const d=c?.assignmentDraft?.turn===s.turn?c.assignmentDraft:null;
    let body=c?select('assignmentContract','Secured mission to assemble',contracts.map(c=>[c.id,c.name]),c.id)+card(c.name,this.contractDossier(s,c)+(d?card('Saved squad & deployment quote',this.squadPreview(s,c,d))+this.roleButton(s,'Clear squad','clearAssignment','quarter',{id:c.id},!!(c.preparation?.lock||c.contingency?.lock))+this.roleButton(s,'Deploy squad · routine','deployDraft','quarter',{id:c.id})+this.roleButton(s,'Prepare assembled operation','prepareDraft','field',{id:c.id}):paragraph('The Quartermaster assembles this team; Operations can then prepare it.'))+this.assignmentCrew(s,c)+(this.canRole(s,'quarter')?this.squadEditor(s,c):'')):paragraph('No accepted, undeployed contracts.')+this.assignmentCrew(s,null);
    return paragraph('Inspect mission requirements and crew here. Assembly and deployment are routine. Preparations spend remaining Guild Actions. Each operative leads at most one phase and deploys on one new mission per turn.')+body+card('Deployed operations',s.jobs.filter(j=>j.departure===s.turn).map(j=>paragraph(j.contract.name)).join('')||paragraph('None yet.'))+`<footer class="gm-turn-footer">${b('Return to Guild Actions','returnActions',{},!manager)}${b('Continue to Events','beginEvents',{},!manager)}</footer>`;
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
    if(d.command==='workspace'){this.workspace=d.workspace;return this.render({force:true});}
    if(d.command==='saveSquad'){const draft=d.draft;if(!draft)throw new Error('Choose a squad in the assignment editor.');await this.run('draftAssignment',[d.id,draft.ids,draft.leads,draft.leader],revision);if(canManage())this.squadEdits.delete(`${this.guildId}:${d.id}`);return this.render({force:true});}
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
      if(key==='contracts'||key==='recruits'){this.workspace=key;return super.handle({command:'network',mode:key});}
      if(key==='broker'){this.workspace='contracts';return super.handle({command:key});}
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
      const available=visibleActions(s,E.officer(s,this.officerId)).filter(([key])=>['recon','missionBriefing','operationsBriefing','extractionContingency'].includes(key)&&s.actions>=ACTIONS[key].actions&&(key==='extractionContingency'?!c.contingency&&s.contingencyTurn!==s.turn:!c.preparation));
      if(!available.length)throw new Error('No unspent preparation fits this contract and the remaining shared actions.');
      const value=await prompt('Prepare assembled operation',paragraph(`Squad: ${draft.ids.map(id=>E.merc(s,id).name).join(', ')}`)+select('plan','Preparation',available.map(([key,a])=>[key,`${a.label} · ${a.actions} actions · ${['missionBriefing','operationsBriefing'].includes(key)?credit(25*draft.ids.length):key==='extractionContingency'?credit(5*Math.ceil(E.quote(s,c,draft.ids,draft.leads,draft.leader).pay*.25/5)):'no cash cost'}`]))+paragraph('Brief Mission Team: +1 to one chosen phase, no roll or trained skill. Recon and briefings share one attempt per contract. Highest circumstance bonus applies; funded briefings lock the squad.')+select('phase','Target phase for basic briefing / recon',E.phases.map((name,i)=>[i,name]),1));
      if(!value)return;if(value.plan==='recon')return this.run('recon',[c.id,this.officerId,Number(value.phase)],revision);
      return this.run(value.plan,[c.id,draft.ids,draft.leads,this.officerId,draft.leader,...(value.plan==='missionBriefing'?[Number(value.phase)]:[])],revision);
    }
    if(d.command==='hero'){
      const eligible=officersForUser(s).filter(o=>o.actorUuid&&o.heroPoints>0),value=await prompt('Spend Hero Point',select('pc','Spending PC',eligible.map(o=>[o.id,`${o.name} · ${o.heroPoints} points`]))+paragraph('Spend one point from the actual PC sheet; keep the reroll.'));
      if(!value)return;this.officerId=value.pc;return this.run('rerollPhase',[value.pc],revision);
    }
    return super.handle(d);
  }
}

import {ID,VERSION,guilds,envelope,canManage,commitCommand} from './core.mjs';
import {GuildmasterSheet} from './sheet.mjs';
import {GuildTurnWizard} from './wizard.mjs';
let sheet,wizard;
export function openGuildmaster(guildId){
  sheet??=new GuildmasterSheet();if(guildId)sheet.guildId=guildId;
  GuildmasterSheet.openSheets.add(sheet);return sheet.render({force:true});
}
export async function openTurn(guildId){
  wizard??=new GuildTurnWizard();if(guildId)wizard.guildId=guildId;
  const j=wizard.journal;
  if(j&&canManage()&&!envelope(j).state.turnGuide?.active&&!envelope(j).pendingHeroSpend)await commitCommand(j,{name:'startTurn'},envelope(j).revision);
  GuildmasterSheet.openSheets.add(wizard);return wizard.render({force:true});
}
const redraw=()=>{
  for(const app of GuildmasterSheet.openSheets){
    if(!app.rendered)continue;
    const s=envelope(app.journal)?.state;
    if(app instanceof GuildTurnWizard&&app.startedTurn&&!s?.turnGuide?.active&&s?.turnGuide?.completedTurn>=app.startedTurn){app.close();continue;}
    app.render({force:true}).catch(error=>console.error('Guildmaster render',error));
  }
};
export function addJournalButton(app,html){
  const root=app?.element instanceof HTMLElement?app.element:html instanceof HTMLElement?html:html?.[0];
  if(!root||root.querySelector('.guildmaster-launch'))return;
  const button=document.createElement('button');button.type='button';button.className='guildmaster-launch';button.innerHTML='<i class="fas fa-building-shield"></i> Guildmaster';button.addEventListener('click',()=>openGuildmaster());
  (root.querySelector('.directory-footer, [data-application-part="footer"], footer, .header-actions')??root).append(button);
}
Hooks.once('init',()=>{
  game.settings.registerMenu(ID,'open',{name:'Guildmaster',label:'Open Guildmaster',hint:'Guild management and the guided Guild Turn.',icon:'fas fa-building-shield',type:GuildmasterSheet,restricted:false});
  game.settings.registerMenu(ID,'turn',{name:'Guided Guild Turn',label:'Start / Resume Guild Turn',hint:'Upkeep, officer actions, assignments, Events and completion.',icon:'fas fa-forward-step',type:GuildTurnWizard,restricted:false});
  game.keybindings.register(ID,'open',{name:'Open Guildmaster',editable:[{key:'KeyG',modifiers:['Control','Shift']}],onDown:()=>{openGuildmaster();return true;},precedence:CONST.KEYBINDING_PRECEDENCE.NORMAL});
  game.modules.get(ID).api={version:VERSION,open:openGuildmaster,openTurn,listGuilds:()=>guilds().map(j=>({id:j.id,name:j.name,uuid:j.uuid}))};
});
Hooks.once('ready',()=>{
  if(game.system.id!=='sf2e')ui.notifications.error('Guildmaster requires the native SF2e system.');
  if(game.version!=='14.369'||game.system.version!=='1.6.1')ui.notifications.warn('Guildmaster alpha targets Foundry14.369 / SF2e1.6.1. Other versions have not been verified.');
  addJournalButton(ui.journal);
});
Hooks.on('renderJournalDirectory',addJournalButton);
Hooks.on('renderApplicationV2',(app,html)=>{if(app.tabName==='journal'||app.documentName==='JournalEntry'&&app.collection===game.journal)addJournalButton(app,html);});
Hooks.on('createJournalEntry',redraw);
Hooks.on('updateJournalEntry',journal=>{if(envelope(journal))redraw();});
Hooks.on('deleteJournalEntry',redraw);
Hooks.on('updateActor',redraw);
Hooks.on('updateUser',redraw);
Hooks.on('userConnected',redraw);

import {ID,VERSION,guilds,envelope} from './core.mjs';
import {GuildmasterSheet} from './sheet.mjs';

let sheet;
export function openGuildmaster(guildId) {
  sheet??=new GuildmasterSheet();
  if(guildId)sheet.guildId=guildId;
  return sheet.render({force:true});
}
const redraw=()=>{for(const app of GuildmasterSheet.openSheets)if(app.rendered)app.render({force:true}).catch(error=>console.error('Guildmaster render',error));};

Hooks.once('init',()=>{
  game.settings.registerMenu(ID,'open',{name:'Guildmaster',label:'Open Guildmaster',hint:'Shared mercenary guild sheet. The coordinating GM commits changes in this alpha.',icon:'fas fa-building-shield',type:GuildmasterSheet,restricted:false});
  game.keybindings.register(ID,'open',{name:'Open Guildmaster',editable:[{key:'KeyG',modifiers:['Control','Shift']}],onDown:()=>{openGuildmaster();return true;},precedence:CONST.KEYBINDING_PRECEDENCE.NORMAL});
  game.modules.get(ID).api={version:VERSION,open:openGuildmaster,listGuilds:()=>guilds().map(j=>({id:j.id,name:j.name,uuid:j.uuid}))};
});

Hooks.once('ready',()=>{
  if(game.system.id!=='sf2e')ui.notifications.error('Guildmaster alpha requires the native Starfinder Second Edition system.');
  if(game.version!=='14.369'||game.system.version!=='1.6.1')ui.notifications.warn('Guildmaster alpha targets Foundry 14.369 and SF2e 1.6.1. This combination has not yet been verified inside Foundry.');
});

Hooks.on('renderJournalDirectory',(_app,html)=>{
  const root=html instanceof HTMLElement?html:html?.[0];
  if(!root||root.querySelector('.guildmaster-launch'))return;
  const button=document.createElement('button');button.type='button';button.className='guildmaster-launch';button.innerHTML='<i class="fas fa-building-shield"></i> Guildmaster';button.addEventListener('click',()=>openGuildmaster());
  (root.querySelector('.directory-footer')??root).append(button);
});
Hooks.on('createJournalEntry',redraw);
Hooks.on('updateJournalEntry',journal=>{if(envelope(journal))redraw();});
Hooks.on('deleteJournalEntry',redraw);
Hooks.on('updateActor',redraw);
Hooks.on('updateUser',redraw);
Hooks.on('userConnected',redraw);

const countries = [...document.querySelectorAll('.country')];
const nationDialog = document.querySelector('#nationDialog');
const actionDialog = document.querySelector('#actionDialog');
const grid = document.querySelector('#nationGrid');
const preferred = ['Polska','Stany Zjednoczone','Brazylia','Francja','Chiny','Indie','Japonia','Australia','Kanada'];
const capitals = {Polska:'Warszawa','Stany Zjednoczone':'Waszyngton','Brazylia':'Brasília',Francja:'Paryż',Chiny:'Pekin',Indie:'Nowe Delhi',Japonia:'Tokio',Australia:'Canberra',Kanada:'Ottawa',Rosja:'Moskwa',Meksyk:'Meksyk',Nigeria:'Abudża','Wielka Brytania':'Londyn',Argentyna:'Buenos Aires'};
let selectedCountry = 'Polska', turn = 1, money = 48.2, zoom = 1;

function countryData(name){return countries.find(c=>c.dataset.country===name)?.dataset}
preferred.forEach(name=>{const d=countryData(name);const button=document.createElement('button');button.type='button';button.className='nation-option'+(name==='Polska'?' selected':'');button.dataset.name=name;button.innerHTML=`<span class="flag">${d.flag}</span><b>${name}</b><small>${d.pop} mln ludności · ${d.gdp} bln PKB</small>`;grid.append(button)});

function showToast(message){const toast=document.querySelector('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove('show'),2400)}
function selectCountry(name, updatePlayer=false){
  const d=countryData(name); if(!d)return;
  countries.forEach(c=>c.classList.toggle('selected',c.dataset.country===name));
  document.querySelector('#ownerFlag').textContent=d.flag;document.querySelector('#ownerName').textContent=name;
  document.querySelector('#capitalName').textContent=capitals[name]||'Stolica';
  document.querySelector('#provinceName').textContent=name==='Polska'?'MAZOWSZE':name.toUpperCase();
  document.querySelector('#provPop').textContent=(Math.max(2,Number(d.pop)/8)).toFixed(1)+' mln';
  document.querySelector('#income').textContent='+'+(Number(d.gdp)*1.3).toFixed(1)+' mld';
  if(updatePlayer){selectedCountry=name;document.querySelector('#playerFlag').textContent=d.flag;document.querySelector('#playerName').textContent=name;showToast(`Rozpoczęto kampanię: ${name}`)}
}
countries.forEach(country=>country.addEventListener('click',()=>selectCountry(country.dataset.country)));
document.querySelector('.nation-chip').addEventListener('click',()=>nationDialog.showModal());
grid.addEventListener('click',e=>{const option=e.target.closest('.nation-option');if(!option)return;grid.querySelectorAll('button').forEach(b=>b.classList.remove('selected'));option.classList.add('selected')});
document.querySelector('#startCampaign').addEventListener('click',()=>selectCountry(grid.querySelector('.selected').dataset.name,true));

document.querySelectorAll('.tool').forEach(tool=>tool.addEventListener('click',()=>{document.querySelectorAll('.tool').forEach(t=>t.classList.remove('active'));tool.classList.add('active');const svg=document.querySelector('.world svg');svg.classList.remove('terrain','economy-map','relations');if(tool.dataset.mode==='terrain')svg.classList.add('terrain');if(tool.dataset.mode==='economy')svg.classList.add('economy-map');if(tool.dataset.mode==='relations')svg.classList.add('relations')}));
document.querySelectorAll('.speed').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.speed').forEach(b=>b.classList.remove('active'));btn.classList.add('active')}));
document.querySelectorAll('.nav-btn[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');showToast(`${btn.textContent.trim()}: moduł aktywny`)}));

document.querySelector('#endTurn').addEventListener('click',()=>{turn++;money+=1.8;const date=new Date(2025,turn-1,1);document.querySelector('#dateLabel').textContent=date.toLocaleDateString('pl-PL',{day:'numeric',month:'long',year:'numeric'}).toUpperCase();document.querySelector('#turnLabel').textContent=`TURA ${turn}`;document.querySelector('#treasury').textContent=money.toFixed(1);showToast('Nowy miesiąc — skarbiec +1,8 mld')});
function setZoom(delta){zoom=Math.max(.7,Math.min(1.7,zoom+delta));document.querySelector('#world').style.transform=`scale(${zoom})`}
document.querySelector('#zoomIn').onclick=()=>setZoom(.15);document.querySelector('#zoomOut').onclick=()=>setZoom(-.15);

const buildOptions=[['🏭','Fabryka','8,4 mld'],['⚡','Elektrownia','6,1 mld'],['🛣','Infrastruktura','4,8 mld']];
const armyOptions=[['⚔','Piechota','2,2 mld'],['♞','Brygada pancerna','5,6 mld'],['✈','Skrzydło lotnicze','8,9 mld']];
function openAction(type){const recruitment=type==='army';document.querySelector('#actionEyebrow').textContent=recruitment?'SIŁY ZBROJNE':'ROZWÓJ PROWINCJI';document.querySelector('#actionTitle').textContent=recruitment?'Utwórz nową armię':'Wybierz budynek';const options=recruitment?armyOptions:buildOptions;const box=document.querySelector('#actionOptions');box.innerHTML=options.map((o,i)=>`<button type="button" class="action-option${i===0?' selected':''}"><span>${o[0]}</span><b>${o[1]}</b><small>${o[2]}</small></button>`).join('');actionDialog.dataset.type=type;actionDialog.showModal()}
document.querySelector('#buildBtn').onclick=()=>openAction('build');document.querySelector('[data-action="build"]').onclick=()=>openAction('build');document.querySelector('#recruitBtn').onclick=()=>openAction('army');document.querySelector('#newArmyTop').onclick=()=>openAction('army');
document.querySelector('#actionOptions').addEventListener('click',e=>{const option=e.target.closest('.action-option');if(!option)return;document.querySelectorAll('.action-option').forEach(o=>o.classList.remove('selected'));option.classList.add('selected')});
document.querySelector('#confirmAction').addEventListener('click',()=>{const choice=document.querySelector('.action-option.selected b')?.textContent;money=Math.max(0,money-5);document.querySelector('#treasury').textContent=money.toFixed(1);showToast(`${choice}: rozkaz przyjęty`)})
document.querySelector('#closePanel').onclick=()=>document.querySelector('.province-panel').classList.toggle('collapsed');
window.addEventListener('load',()=>setTimeout(()=>nationDialog.showModal(),350));

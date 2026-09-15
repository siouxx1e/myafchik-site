'use strict';
(() => {
  const $=s=>document.querySelector(s),E=window.MyafchikEngine;
  const game=new E.Game(),canvas=$('#game');
  const renderer=new window.MyafchikArt.Renderer(canvas,(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;});
  const overlay=$('#overlay'),input={left:false,right:false,jump:false};
  const keyboard=new Set(),pointers=new Map();
  let sound=false,audio=null,toastRemaining=0,accumulator=0,previous=0,lastMode='',lastScore=-1,uiClock=0,bannerRemaining=0,lastLevel=1;
  function size(){const landscapeShort=window.innerHeight<=520&&window.innerWidth>window.innerHeight;canvas.width=window.innerWidth<=600&&!landscapeShort?640:960;canvas.height=540;}
  size();window.addEventListener('resize',size);
  function clearInput(){keyboard.clear();pointers.clear();Object.keys(input).forEach(k=>input[k]=false);document.querySelectorAll('[data-control]').forEach(b=>b.classList.remove('active'));}
  function refreshInput(){
    input.left=keyboard.has('ArrowLeft')||keyboard.has('KeyA')||[...pointers.values()].includes('left');
    input.right=keyboard.has('ArrowRight')||keyboard.has('KeyD')||[...pointers.values()].includes('right');
    input.jump=keyboard.has('Space')||keyboard.has('ArrowUp')||keyboard.has('KeyW')||[...pointers.values()].includes('jump');
    document.querySelectorAll('[data-control]').forEach(b=>b.classList.toggle('active',[...pointers.values()].includes(b.dataset.control)));
  }
  function tone(freq,duration=.1,type='sine',end=freq,delay=0){
    if(!sound||!audio)return;
    if(audio.state==='suspended')audio.resume().catch(()=>{});
    const when=audio.currentTime+delay,osc=audio.createOscillator(),gain=audio.createGain();osc.type=type;osc.frequency.setValueAtTime(freq,when);osc.frequency.exponentialRampToValueAtTime(Math.max(20,end),when+duration);
    gain.gain.setValueAtTime(.05,when);gain.gain.exponentialRampToValueAtTime(.0001,when+duration);osc.connect(gain);gain.connect(audio.destination);osc.start(when);osc.stop(when+duration);
  }
  function toast(text,seconds=3){$('#toast').textContent=text;$('#toast').classList.add('visible');toastRemaining=seconds;}
  function formatTime(t){const n=Math.floor(t);return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;}
  function showPanel(){
    const mode=game.mode;if(mode===lastMode)return;lastMode=mode;
    overlay.hidden=mode==='playing'||mode==='transition';$('#pause').disabled=mode==='ready'||mode==='won';$('#restart').disabled=mode==='ready';
    $('#pause').textContent=mode==='paused'?'▶':'Ⅱ';$('#pause').setAttribute('aria-label',mode==='paused'?'Продолжить игру':'Поставить игру на паузу');
    if(mode==='playing'||mode==='transition'){if(mode==='transition')clearInput();canvas.focus({preventScroll:true});return;}
    clearInput();$('#mission-chips').hidden=mode!=='ready';
    if(mode==='ready'){
      $('#panel-label').textContent='УРОВЕНЬ 01 · ДОМА';$('#panel-title').innerHTML='Дела подождут.<br><span>Игрушка — нет.</span>';
      $('#panel-copy').innerHTML='Найди игрушку дома, а потом —<br>в подъезд, следом за курьером!';$('#play').innerHTML='Погнали! <span aria-hidden="true">→</span>';$('#start-note').textContent='Два уровня. Одна очень любопытная морда.';
    } else if(mode==='paused'){
      $('#panel-label').textContent='МИНУТКА КОШАЧЬИХ ДЕЛ';$('#panel-title').innerHTML='Мяфчик<br><span>на паузе.</span>';$('#panel-copy').textContent='Можно выдохнуть. И почесать за ушком.';$('#play').textContent='Продолжить →';$('#start-note').textContent='Прогресс сохранён до конца этой игры.';
    } else if(mode==='won'){
      $('#panel-label').textContent='ОБА УРОВНЯ ПРОЙДЕНЫ';$('#panel-title').innerHTML='Курьер пойман.<br><span>Коробка моя!</span>';$('#panel-copy').textContent=`Игрушка найдена, все 16 вкусняшек собраны за ${formatTime(game.time)}. Неудачных столкновений: ${game.mistakes}.`;$('#play').textContent='Оба уровня заново ↻';$('#start-note').textContent='Курьер доставлял заказ. Мяфчик доставил себя.';
    }
    if(mode!=='ready')$('#play').focus({preventScroll:true});
  }
  function startOrResume(){if(game.mode==='won'){game.reset();renderer.effects=[];renderer.camera=0;game.start();}else if(game.mode==='paused')game.resume();else game.start();showPanel();ui();}
  function pause(){if(game.mode==='playing'||game.mode==='transition')game.pause();else if(game.mode==='paused')game.resume();showPanel();}
  function restart(){game.restartLevel();renderer.effects=[];renderer.meow=0;renderer.camera=game.level===2?Math.max(0,game.player.x-canvas.width*.32):0;toastRemaining=0;bannerRemaining=0;$('#toast').classList.remove('visible');$('#chapter-banner').classList.remove('visible');clearInput();lastMode='';showPanel();ui();}
  $('#play').addEventListener('click',startOrResume);$('#pause').addEventListener('click',pause);$('#restart').addEventListener('click',restart);
  $('#sound').addEventListener('click',()=>{
    try{if(!audio){const A=window.AudioContext||window.webkitAudioContext;if(!A)throw new Error('Audio unavailable');audio=new A();}sound=!sound;$('#sound').textContent=`Звук: ${sound?'вкл.':'выкл.'}`;$('#sound').setAttribute('aria-pressed',String(sound));$('#sound').setAttribute('aria-label',sound?'Выключить звук':'Включить звук');if(sound)tone(440,.12,'sine',660);}catch{toast('В этом браузере звук недоступен. Играем без него.');}
  });
  window.addEventListener('keydown',e=>{
    const controls=['ArrowLeft','ArrowRight','ArrowUp','Space','KeyA','KeyD','KeyW'];
    if(controls.includes(e.code)&&game.mode==='playing'){e.preventDefault();keyboard.add(e.code);refreshInput();}
    if(e.repeat)return;
    if((e.code==='KeyP'||e.code==='Escape')&&(game.mode==='playing'||game.mode==='paused'||game.mode==='transition')){e.preventDefault();pause();}
    if(e.code==='KeyR'&&game.mode!=='ready'){e.preventDefault();restart();}
    if(e.code==='KeyE'&&game.mode==='playing'){e.preventDefault();game.meow();}
  });
  window.addEventListener('keyup',e=>{keyboard.delete(e.code);refreshInput();});
  document.querySelectorAll('[data-control]').forEach(button=>{
    button.addEventListener('pointerdown',e=>{e.preventDefault();if(game.mode!=='playing')return;button.setPointerCapture(e.pointerId);pointers.set(e.pointerId,button.dataset.control);refreshInput();});
    ['pointerup','pointercancel','lostpointercapture'].forEach(type=>button.addEventListener(type,e=>{pointers.delete(e.pointerId);refreshInput();}));
    button.addEventListener('contextmenu',e=>e.preventDefault());
  });
  $('#touch-meow').addEventListener('click',()=>game.meow());
  window.addEventListener('blur',()=>{clearInput();if(game.mode==='playing'||game.mode==='transition'){game.pause();showPanel();}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInput();game.pause();showPanel();}});
  function events(){for(const e of game.events){
    renderer.addEvent(e);
    if(e.type==='food')tone(780,.13,'sine',1150);
    if(e.type==='jump')tone(210,.12,'sine',400);
    if(e.type==='meow')tone(620,.38,'triangle',280);
    if(e.type==='hit'){tone(150,.17,'triangle',80);toast(game.level===1?'Клубок оказался быстрее! Вкусняшки остались с тобой.':'Тележка преградила путь! Вкусняшки остались с тобой.');}
    if(e.type==='checkpoint'){tone(540,.2,'sine',810);toast(game.level===1?'Половина комнаты позади. Тут можно перевести дух.':'Новая точка отдыха. Лестница уже рядом!');}
    if(e.type==='missing'){const f=game.food.find(f=>!f.taken);toast(`Ещё ${e.remaining} вкусняшек! ${f.x<game.player.x?'Вернись влево':'Посмотри справа'}: ${game.level===1?'проверь мебель':'проверь коробки и ступени'}.`,4);}
    if(e.type==='doorbell'){tone(880,.45,'sine',880);tone(660,.55,'sine',660,.25);toast('Дзынь! Курьер?! Игрушка подождёт. К двери справа →',5);}
    if(e.type==='transition'){toastRemaining=0;$('#toast').classList.remove('visible');$('#chapter-banner').classList.add('visible');bannerRemaining=4.5;}
    if(e.type==='hall'){lastScore=-1;ui();if(bannerRemaining<.1){$('#chapter-banner').classList.add('visible');bannerRemaining=2;}tone(440,.25,'sine',660);}
    if(e.type==='win'){tone(600,.4,'triangle',1200);}
  }game.events.length=0;}
  function ui(){
    if(lastScore!==game.collected||lastLevel!==game.level){lastScore=game.collected;lastLevel=game.level;$('#food-count').textContent=`${lastScore} / 8`;$('#progress-fill').style.width=`${((game.level-1)*8+lastScore)/16*100}%`;}
    $('#timer').textContent=formatTime(game.time);$('#room-name').textContent=game.level===1?'01 · Та самая комната':'02 · Следом за курьером';$('#level-badge').textContent=`ПРИКЛЮЧЕНИЕ · 0${game.level} / 02`;
    $('#checkpoint-label').textContent=game.level===1?(game.checkpoint>100?'СЕРЕДИНА КОМНАТЫ ПРОЙДЕНА':'СТАРТ НА КОВРЕ'):(game.checkpoint>4000?'ПЕРЕД ЛЕСТНИЦЕЙ':'ПОДЪЕЗД · ЭТАЖ 2');
    $('#scene-caption').textContent=game.level===1?'ТЕРРИТОРИЯ МЯФЧИКА':'ТЕРРИТОРИЯ ТЕПЕРЬ ТОЖЕ МЯФЧИКА';
    $('#stage').classList.toggle('in-hall',game.level===2);
    if(game.mode==='won')$('#objective').textContent='Курьер найден. Коробка проверена. Можно домой!';
    else if(game.mode==='transition')$('#objective').textContent='Дверь приоткрылась. Мяфчик уже в пути…';
    else if(game.level===1&&game.toyFound)$('#objective').textContent='Курьер у двери! Спрыгивай со шкафа и беги вправо →';
    else if(game.collected===8)$('#objective').textContent=game.level===1?'Игрушка — на шкафу справа →':'Все вкусняшки твои! Курьер ждёт у лифта справа →';
    else $('#objective').textContent=game.level===1?`Собери 8 вкусняшек и доберись до игрушки. Осталось: ${8-game.collected}.`:`Следуй за курьером! Вкусняшек в подъезде осталось: ${8-game.collected}.`;
  }
  function frame(now){
    const dt=previous?Math.min((now-previous)/1000,.05):0;previous=now;
    if(game.mode==='playing'||game.mode==='transition'){accumulator+=dt;while(accumulator>=1/120){game.step(1/120,input);accumulator-=1/120;}}else accumulator=0;
    events();showPanel();renderer.render(game,game.mode==='playing'||game.mode==='transition'||game.mode==='won'?dt:0);
    if(bannerRemaining>0&&game.mode!=='paused'){bannerRemaining-=dt;if(bannerRemaining<=0)$('#chapter-banner').classList.remove('visible');}
    if(toastRemaining>0){toastRemaining-=dt;if(toastRemaining<=0)$('#toast').classList.remove('visible');}
    uiClock+=dt;if(uiClock>.1){ui();uiClock=0;}
    requestAnimationFrame(frame);
  }
  showPanel();ui();requestAnimationFrame(frame);
})();

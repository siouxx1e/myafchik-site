(function(root){
  'use strict';
  const E=root.MyafchikEngine;
  const palette={ink:'#252931',wall:'#c9c2a5',leaf:'#a7a58c',wood:'#b98750',edge:'#3e3932',gold:'#efc575',red:'#983d40'};
  function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
  function poly(c,points,color){c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();}
  function line(c,x,y,x2,y2,color,width=2){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke();}
  function diamond(c,x,y,w,h,color){poly(c,[[x,y-h],[x+w,y],[x,y+h],[x-w,y]],color);}
  function flower(c,x,y,s=1,color='#a9a58b'){
    c.save();c.translate(x,y);c.scale(s,s);line(c,-8,18,4,-12,color,2);
    poly(c,[[-3,3],[-14,-3],[-12,7],[-4,10]],color);poly(c,[[1,-4],[13,-9],[11,0],[0,3]],color);
    rect(c,-3,-15,6,9,color);rect(c,-6,-12,12,4,color);rect(c,-1,-11,3,3,'#dcd4b4');c.restore();
  }
  function label(c,text,x,y,color='#efe2bc',size=12){c.fillStyle=color;c.font=`bold ${size}px monospace`;c.fillText(text,Math.round(x),Math.round(y));}
  function wardrobe(c,x,y,w,h){
    rect(c,x+8,y+8,w,h,'#292b3040');rect(c,x,y,w,h,palette.edge);rect(c,x+8,y+10,w-16,h-22,palette.wood);
    rect(c,x+14,y+20,w-28,h-45,'#c7985e');
    for(let i=0;i<9;i++){const px=x+23+i*(w-38)/9;line(c,px,y+25,px-3,y+h-30,i%2?'#b68955':'#cea46c',2);}
    rect(c,x+w/2-3,y+12,6,h-26,'#705338');rect(c,x+5,y+4,w-10,7,'#e4bd79');
    rect(c,x+w/2-14,y+h*.56,5,22,'#302e2c');rect(c,x+w/2+10,y+h*.56,5,22,'#302e2c');
    rect(c,x-4,y-4,w+8,9,'#353739');rect(c,x+4,y+h-8,w-8,8,'#303435');
    rect(c,x+10,y+h,14,10,'#3c3431');rect(c,x+w-24,y+h,14,10,'#3c3431');
  }
  function curtain(c,x,y,w,h){
    rect(c,x,y,w,h,'#c5bba0');
    for(let a=0;a<w;a+=18){rect(c,x+a,y,7,h,'#a79c89');rect(c,x+a+8,y,4,h,'#e0d5b7');}
    for(let a=10;a<w;a+=26)for(let b=25;b<h;b+=44)flower(c,x+a,y+b,.65,'#ede5c9');
    for(let a=0;a<w;a+=12)rect(c,x+a,y+h-(a%24?6:0),12,7,'#c8bca1');
  }
  function windowArt(c,x,y,w,h){
    rect(c,x-10,y-8,w+20,h+22,'#837e70');rect(c,x-3,y-2,w+6,h+9,'#eae1c4');rect(c,x+8,y+8,w-16,h-14,'#729ca7');
    const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'#7396a3');g.addColorStop(1,'#b5c5b6');rect(c,x+8,y+8,w-16,h-14,g);
    rect(c,x+28,y+45,32,5,'#d8dcc440');rect(c,x+w-75,y+84,47,5,'#d8dcc440');
    rect(c,x+w/2-5,y+5,10,h,'#e9dfc5');rect(c,x+5,y+h*.48,w-10,9,'#e9dfc5');rect(c,x+w/2+8,y+h/2-5,5,18,'#746f62');
    rect(c,x-24,y+h,w+48,11,'#eee3c7');rect(c,x-24,y+h+11,w+48,5,'#979081');
    line(c,x-62,y-17,x+w+62,y-17,'#585b51',6);curtain(c,x-49,y-12,65,h+70);curtain(c,x+w-14,y-12,65,h+70);
    for(let a=0;a<5;a++){rect(c,x+26+a*29,y+9,2,40+(a%3)*15,'#cec9a0');rect(c,x+24+a*29,y+48+(a%3)*15,5,5,'#ffe5a1');}
  }
  function sofa(c,x,y,w){
    rect(c,x+8,y+75,w-16,55,'#514b3e');rect(c,x+20,y+118,15,16,'#39372e');rect(c,x+w-35,y+118,15,16,'#39372e');
    rect(c,x+4,y-42,w-8,110,'#777663');rect(c,x+14,y-35,w-28,100,'#a4a187');
    for(let n=0;n<3;n++){const cw=(w-32)/3;rect(c,x+16+n*cw,y-30,cw-5,66,n%2?'#b7b096':'#a5a58b');rect(c,x+16+n*cw,y-30,cw-5,4,'#d0c5a3');}
    rect(c,x,y,w,20,'#c5bc9b');rect(c,x+6,y+20,w-12,67,'#969981');
    for(let n=15;n<w-10;n+=28)for(let v=33;v<79;v+=24){diamond(c,x+n,y+v,8,7,'#747d68');diamond(c,x+n,y+v,4,3,'#bec0a0');}
    rect(c,x-8,y-7,22,65,'#b3ab8d');rect(c,x+w-14,y-7,22,65,'#b3ab8d');rect(c,x-8,y-7,22,5,'#e0cdac');rect(c,x+w-14,y-7,22,5,'#e0cdac');
  }
  function ottoman(c,x,y,w){
    rect(c,x+8,y+10,w-16,E.FLOOR-y-10,'#9f7650');rect(c,x,y,w,14,'#dcb26e');rect(c,x+4,y+14,w-8,9,'#ba8c48');
    for(let n=6;n<w;n+=13){poly(c,[[x+n,y+16],[x+n+6,y+28],[x+n+12,y+16]],'#d4a451');}
    for(let n=20;n<w-10;n+=26)flower(c,x+n,y+47,.55,'#d1b384');
    rect(c,x+10,E.FLOOR-8,w-20,8,'#654f3d');
  }
  function scrollArt(c,x,y){
    line(c,x,y,x+60,y-32,'#454439',2);line(c,x+60,y-32,x+120,y,'#454439',2);
    rect(c,x,y,120,145,'#3b3d35');rect(c,x+6,y+7,108,129,'#ccad81');
    rect(c,x-4,y-4,128,9,'#343832');rect(c,x-3,y+140,126,6,'#343832');
    poly(c,[[x+6,y+86],[x+39,y+42],[x+70,y+88],[x+92,y+60],[x+114,y+85],[x+114,y+126],[x+6,y+126]],'#8b8b70');
    poly(c,[[x+6,y+103],[x+57,y+78],[x+92,y+120],[x+114,y+105],[x+114,y+130],[x+6,y+130]],'#666d57');
    rect(c,x+88,y+32,11,11,'#b65846');line(c,x+26,y+80,x+24,y+120,'#484e3e',3);
    for(let t=0;t<4;t++)poly(c,[[x+24,y+83+t*8],[x+9-t*2,y+96+t*7],[x+45+t*2,y+97+t*7]],'#454e3e');
    line(c,x+2,y+146,x+2,y+160,'#423d36',2);line(c,x+118,y+146,x+118,y+160,'#423d36',2);
  }
  function lamp(c,x){
    line(c,x,12,x,42,'#776345',3);rect(c,x-13,40,26,9,'#b58f50');
    [-42,0,42].forEach((dx,i)=>{line(c,x,45,x+dx,61+(i===1?13:0),'#ac8748',4);rect(c,x+dx-13,56+(i===1?13:0),26,16,'#e8d8a4');rect(c,x+dx-9,59+(i===1?13:0),18,16,'#fff0c0');});
  }
  function fan(c,x,t){
    rect(c,x-20,464,64,7,'#8b8c7c');rect(c,x-12,459,47,7,'#e2ddbd');rect(c,x+7,354,9,107,'#dddcc6');rect(c,x+10,399,5,40,'#a7aa96');
    c.save();c.translate(x+11,330);c.fillStyle='#e8e3c9';c.beginPath();c.arc(0,0,38,0,Math.PI*2);c.fill();
    c.fillStyle='#b6beb0';c.beginPath();c.arc(0,0,32,0,Math.PI*2);c.fill();
    c.save();c.rotate(t*3);for(let a=0;a<3;a++){c.rotate(Math.PI*2/3);poly(c,[[0,-3],[12,-27],[23,-22],[16,-8],[2,6]],'#e0e1c8');}c.restore();
    c.strokeStyle='#8a9288';c.lineWidth=1;[15,25,33,38].forEach(r=>{c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.stroke();});
    for(let a=0;a<8;a++){const ang=a*Math.PI/4;line(c,0,0,Math.cos(ang)*38,Math.sin(ang)*38,'#989f90',1);}
    rect(c,-5,-5,10,10,'#f0e8cc');c.restore();
  }
  function fish(c,x,y,scale=1){c.save();c.translate(Math.round(x),Math.round(y));c.scale(scale,scale);poly(c,[[-14,-8],[-5,-3],[-5,3],[-14,8]],'#ca8549');rect(c,-7,-7,17,14,'#f5cb6c');rect(c,-3,-10,9,20,'#f5cb6c');rect(c,9,-4,4,8,'#f5cb6c');rect(c,4,-4,3,3,'#66543b');rect(c,-4,-6,7,3,'#ffe5a0');c.restore();}
  function cat(c,p,time){
    const x=Math.round(p.x),y=Math.round(p.y);c.save();c.translate(x+p.w/2,y+p.h);c.scale(p.face,1);
    const stride=p.onGround&&p.vx?Math.sin(time*24)*3:0;
    const body=p.onGround?0:-3;
    line(c,-10,-15,-23,-18,'#262e39',7);line(c,-23,-18,-27,-31+Math.sin(time*5)*3,'#262e39',6);
    rect(c,-14,-26+body,28,21,'#202733');rect(c,-9,-30+body,22,16,'#202733');rect(c,-11,-26+body,21,3,'#354354');
    rect(c,-12,-9+stride,8,9-stride,'#1b2330');rect(c,6,-9-stride,8,9+stride,'#1b2330');rect(c,-13,-3+stride,10,3,'#344050');rect(c,6,-3-stride,10,3,'#344050');
    rect(c,0,-36+body,23,23,'#202733');poly(c,[[0,-32+body],[0,-44+body],[10,-35+body]],'#202733');poly(c,[[14,-36+body],[22,-45+body],[24,-28+body]],'#202733');
    poly(c,[[3,-35+body],[3,-40+body],[7,-35+body]],'#835961');poly(c,[[17,-35+body],[21,-40+body],[21,-33+body]],'#835961');
    rect(c,2,-15+body,20,4,'#c54e54');rect(c,15,-12+body,4,4,'#e6bd64');
    const blink=Math.sin(time*.9)>.999?1:7;
    rect(c,6,-29+body,6,blink,'#efc665');rect(c,17,-29+body,6,blink,'#efc665');
    if(blink>1){rect(c,9,-29+body,2,6,'#1f2731');rect(c,20,-29+body,2,6,'#1f2731');}
    rect(c,15,-20+body,4,3,'#aa7477');line(c,20,-19+body,29,-21+body,'#d0cbb6',1);line(c,20,-17+body,29,-16+body,'#d0cbb6',1);c.restore();
  }
  function toy(c,x,y,t){
    line(c,x+35,y-86,x+65,y-116,'#a2774e',7);line(c,x+36,y-85,x+Math.sin(t*2)*6,y-24,'#e5d8ad',2);
    c.save();c.translate(x+Math.sin(t*2)*6,y);rect(c,-18,-15,33,23,'#b9b4ba');rect(c,-14,-20,10,10,'#dcd7d8');rect(c,5,-20,8,9,'#dcd7d8');rect(c,-12,-10,3,3,'#3e4450');rect(c,6,-10,3,3,'#3e4450');rect(c,-6,-3,11,3,'#da9296');
    for(let i=-10;i<12;i+=6)line(c,i,3,i+2,7,'#eee5d8',1);line(c,15,-3,29,4,'#d8cdd6',3);c.restore();
  }
  function buildRoom(makeCanvas){
    const canvas=makeCanvas(E.WIDTH,540);const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;
    rect(c,0,0,E.WIDTH,540,palette.wall);
    for(let x=15;x<E.WIDTH;x+=44)for(let y=60;y<457;y+=49)flower(c,x+(y%2)*14,y,.72,palette.leaf);
    rect(c,0,0,E.WIDTH,47,'#dcd8bf');for(let x=0;x<E.WIDTH;x+=65){line(c,x,0,x,44,'#bfbda5',2);poly(c,[[x+8,10],[x+32,4],[x+54,12],[x+33,30]],'#e7e1c7');line(c,x+15,29,x+48,18,'#cfceb6',2);}
    rect(c,0,45,E.WIDTH,5,'#eee5c8');rect(c,0,50,E.WIDTH,5,'#9c9d85');rect(c,0,461,E.WIDTH,12,'#655845');
    rect(c,0,E.FLOOR,E.WIDTH,68,'#ab814d');for(let x=0;x<E.WIDTH;x+=120){line(c,x,475,x+40,540,'#89673d',2);line(c,x+5,515,x+85,515,'#bb945b',1);}
    rect(c,28,486,E.WIDTH-56,48,'#71373b');rect(c,33,491,E.WIDTH-66,38,'#cf9d69');rect(c,38,495,E.WIDTH-76,30,'#913d42');
    for(let x=58;x<E.WIDTH-40;x+=55){diamond(c,x,510,21,13,'#d7b479');diamond(c,x,510,14,9,'#393f37');diamond(c,x,510,8,5,'#d49664');rect(c,x+25,499,4,4,'#dac59b');rect(c,x+25,518,4,4,'#dac59b');}
    wardrobe(c,22,99,164,364);windowArt(c,421,95,208,218);lamp(c,705);scrollArt(c,966,68);
    windowArt(c,1450,105,173,209);lamp(c,1802);
    rect(c,1935,93,130,82,'#443e35');rect(c,1941,99,118,70,'#918f73');for(let i=0;i<5;i++){flower(c,1960+i*20,139+(i%2)*7,1.3,'#eae0c3');}
    for(const p of E.PLATFORMS){
      if(p.type==='ottoman')ottoman(c,p.x,p.y,p.w);
      if(p.type==='sofa')sofa(c,p.x,p.y,p.w);
      if(p.type==='cushion'){rect(c,p.x,p.y,p.w,58,'#6d7986');rect(c,p.x+5,p.y+5,p.w-10,48,'#8c9bab');rect(c,p.x+10,p.y+8,p.w-20,4,'#a9b5b9');}
      if(p.type==='shelf'){rect(c,p.x,p.y,p.w,12,'#594b3b');rect(c,p.x+4,p.y+3,p.w-8,4,'#c3945d');rect(c,p.x+10,p.y+12,8,17,'#6e6350');rect(c,p.x+p.w-18,p.y+12,8,17,'#6e6350');}
      if(p.type==='wardrobe')wardrobe(c,p.x,p.y,p.w,E.FLOOR-p.y-9);
      if(p.type==='table'){ottoman(c,p.x,p.y,p.w);rect(c,p.x+30,p.y-27,20,26,'#f1e4c5');rect(c,p.x+33,p.y-25,14,5,'#d3b488');rect(c,p.x+52,p.y-20,6,13,'#f1e4c5');}
      if(p.type==='books'){
        rect(c,p.x-16,p.y+79,p.w+32,122,'#9a7351');rect(c,p.x-19,p.y+75,p.w+38,12,'#bb9465');
        ['#566c7a','#b65b50','#bfa873','#727858'].forEach((v,i)=>{const by=p.y+i*19;rect(c,p.x+(i%2)*5,by,p.w-(i%2)*3,18,v);rect(c,p.x+10,by+4,p.w-18,10,'#d7c6a3');});
      }
    }
    // The red-lit laptop, a folded sweatshirt and the blue bedspread from the room.
    rect(c,543,290,50,40,'#373f48');rect(c,548,294,40,28,'#4d8a9c');rect(c,552,299,31,4,'#7fbdbe');rect(c,552,307,22,3,'#244d6a');poly(c,[[541,330],[592,330],[606,338],[534,338]],'#313743');rect(c,548,333,39,3,'#bb5459');
    poly(c,[[1897,301],[1930,285],[1964,300],[1971,334],[1893,334]],'#32363b');line(c,1931,293,1929,330,'#595a56',2);
    rect(c,2403,347,117,117,'#718598');rect(c,2403,347,117,8,'#9eacb0');for(let i=0;i<7;i++)line(c,2410+i*16,359,2410+i*16,460,'#60798c',2);
    // Soft daylight, kept behind every interactive object.
    c.globalAlpha=.06;poly(c,[[431,123],[620,123],[934,462],[545,462]],'#fff3b1');c.globalAlpha=1;
    return canvas;
  }
  class Renderer {
    constructor(canvas,makeCanvas){this.canvas=canvas;this.c=canvas.getContext('2d');this.camera=0;this.effects=[];this.meow=0;this.background=buildRoom(makeCanvas);}
    addEvent(event){if(event.type==='food'||event.type==='jump'||event.type==='win')for(let i=0;i<(event.type==='win'?36:8);i++)this.effects.push({x:event.x,y:event.y,vx:Math.cos(i*2.4)*70,vy:-40-i%5*25,life:.8,color:event.type==='jump'?'#e2c796':'#f5cb6c'});if(event.type==='meow')this.meow=1;}
    render(game,dt){
      const c=this.c,w=this.canvas.width,h=this.canvas.height,p=game.player,t=game.time;
      const target=E.clamp(p.x-w*.32,0,E.WIDTH-w);this.camera+=(target-this.camera)*Math.min(1,dt*9);
      if(game.mode==='ready')this.camera=0;
      c.imageSmoothingEnabled=false;c.clearRect(0,0,w,h);c.save();c.translate(-Math.round(this.camera),0);c.drawImage(this.background,0,0);
      fan(c,1522,t);
      for(const s of E.PLATFORMS){if(s.type!=='floor'){rect(c,s.x+3,s.y-2,s.w-6,3,'#f0dcab');}}
      for(const f of game.food){if(!f.taken){const yy=f.y+Math.sin(t*3+f.x)*3;c.globalAlpha=.15;diamond(c,f.x,yy,24,23,'#fff1b0');c.globalAlpha=1;fish(c,f.x,yy,.8);}}
      for(const yarn of game.yarns()){
        c.save();c.translate(Math.round(yarn.x),yarn.y);c.rotate(t*2);c.fillStyle='#bd7180';c.beginPath();c.arc(0,0,14,0,Math.PI*2);c.fill();c.strokeStyle='#e4a598';c.lineWidth=2;[-7,0,7].forEach(y=>line(c,-10,y,10,y+4,'#e4a598',2));c.restore();
      }
      rect(c,1440,421,3,50,'#d8c490');poly(c,[[1443,422],[1474,422],[1465,434],[1443,434]],game.checkpoint>100?'#d9b868':'#82988d');
      toy(c,2580,168,t);label(c,'ИГРУШКА',2538,52,'#615746',13);
      if(game.mode==='ready'){label(c,'МЯФЧИК',p.x-11,p.y-67,'#343c3d',13);poly(c,[[p.x+8,p.y-60],[p.x+24,p.y-60],[p.x+16,p.y-51]],'#875d41');}
      if(!(p.invulnerable>0&&Math.floor(p.invulnerable*10)%2))cat(c,p,t);
      for(const e of this.effects){e.life-=dt;e.x+=e.vx*dt;e.y+=e.vy*dt;e.vy+=100*dt;c.globalAlpha=Math.max(0,e.life);rect(c,e.x,e.y,4,4,e.color);}c.globalAlpha=1;this.effects=this.effects.filter(e=>e.life>0);
      this.meow=Math.max(0,this.meow-dt);if(this.meow){rect(c,p.x-12,p.y-78,78,27,'#fff0ce');label(c,'МЯ-А-АУ!',p.x-6,p.y-59,'#4b403d',13);}
      if(game.collected===8&&game.mode==='playing'){const gx=E.clamp(2580,this.camera+30,this.camera+w-45);label(c,'★',gx,100,'#a7663d',26);}
      c.restore();
      const vignette=c.createLinearGradient(0,0,0,h);vignette.addColorStop(0,'#18212c15');vignette.addColorStop(.2,'#18212c00');vignette.addColorStop(.85,'#18212c00');vignette.addColorStop(1,'#18212c25');rect(c,0,0,w,h,vignette);
    }
  }
  root.MyafchikArt={Renderer,cat,fish,buildRoom};if(typeof module!=='undefined')module.exports=root.MyafchikArt;
})(typeof globalThis!=='undefined'?globalThis:this);

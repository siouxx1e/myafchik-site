(function(root){
  'use strict';
  const E=root.MyafchikEngine;
  const R=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));};
  const L=(c,x,y,a,b,color,width=2)=>{c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(a,b);c.stroke();};
  const P=(c,points,color)=>{c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();};
  function text(c,str,x,y,color='#dce2d3',size=12){c.font=`bold ${size}px monospace`;c.fillStyle=color;c.fillText(str,x,y);}
  function parcel(c,x,y,w,h){
    R(c,x,y,w,h,'#9e714c');R(c,x+3,y+3,w-6,h-7,'#c69a68');R(c,x+3,y+3,w-6,7,'#e1bc85');R(c,x+w*.45,y+2,13,h-6,'#dfc394');
    L(c,x+5,y+h-8,x+w-4,y+h-8,'#a37e56',2);R(c,x+12,y+h*.4,Math.min(29,w*.25),18,'#eadcc0');R(c,x+16,y+h*.4+4,14,2,'#887960');R(c,x+16,y+h*.4+9,19,2,'#887960');
  }
  function door(c,x,y,w,h,num){
    R(c,x-6,y-6,w+12,h+6,'#405556');R(c,x,y,w,h,'#725b4e');R(c,x+7,y+8,w-14,h-16,'#8b7460');R(c,x+13,y+15,w-26,h-29,'#907b65');
    R(c,x+w/2-16,y+23,32,18,'#384b4c');text(c,num,x+w/2-8,y+36,'#e6ca8b',12);R(c,x+w/2-2,y+64,4,4,'#d9c5a2');R(c,x+w-21,y+h*.6,4,20,'#dac89f');R(c,x+w-21,y+h*.6+5,14,4,'#dac89f');
    R(c,x+13,y+h-43,w-26,22,'#7f6b59');R(c,x-9,y+h-2,w+18,5,'#8fa299');
  }
  function windowArt(c,x,y,w,h){
    R(c,x-7,y-7,w+14,h+17,'#637f7d');R(c,x,y,w,h,'#d2dace');
    const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'#7fa6b0');g.addColorStop(1,'#c1d6cb');R(c,x+8,y+8,w-16,h-16,g);
    for(let i=0;i<4;i++){R(c,x+12+i*31,y+h-65-i%2*12,23,53+i%2*12,'#829e9a');for(let j=0;j<3;j++)R(c,x+18+i*31,y+h-56+j*13-i%2*12,5,5,'#c4d6c4');}
    R(c,x+w/2-4,y,8,h,'#e4e3ce');R(c,x,y+h*.42,w,7,'#e4e3ce');R(c,x-12,y+h,w+24,9,'#d6dbc9');
    R(c,x+16,y+h+32,w-32,58,'#b8c4b9');for(let i=0;i<(w-32)/14;i++){R(c,x+16+i*14,y+h+34,7,54,'#d4d8c5');}
  }
  function mailboxes(c,x,y,w){
    R(c,x-4,y,w+8,130,'#314c50');
    for(let row=0;row<2;row++)for(let col=0;col<4;col++){
      const a=x+4+col*(w/4),b=y+5+row*61;R(c,a,b,w/4-8,56,'#779393');R(c,a+3,b+3,w/4-14,4,'#a9bbb0');R(c,a+7,b+14,w/4-22,5,'#324a4d');text(c,String(1+col+row*4),a+16,b+41,'#f0dec0',11);R(c,a+w/4-18,b+36,4,5,'#cfccb2');
    }
    R(c,x-8,y-4,w+16,6,'#bac7b9');
  }
  function elevator(c,x,y,w,h){
    R(c,x-10,y-12,w+20,h+12,'#455c5b');R(c,x,y,w,h,'#92a6a1');R(c,x+5,y+6,w/2-8,h-9,'#a3b4ac');R(c,x+w/2+3,y+6,w/2-8,h-9,'#869f9b');
    R(c,x+w/2-2,y+2,4,h-4,'#45615f');L(c,x+14,y+14,x+14,y+h-12,'#c3cdc0',2);R(c,x+w/2-21,y-33,42,18,'#33494c');text(c,'02',x+w/2-9,y-20,'#e4c183',13);
    R(c,x+w+22,y+100,15,34,'#3d5759');R(c,x+w+27,y+108,5,5,'#dbb475');R(c,x+w+27,y+120,5,5,'#aec0b1');
  }
  function background(c){
    const x0=E.ROOM_WIDTH,w=E.WIDTH-x0;
    R(c,x0,0,w,540,'#d1d0b8');R(c,x0,0,w,48,'#b7c0b3');R(c,x0,48,w,5,'#e1dfc5');R(c,x0,53,w,7,'#8da29a');
    R(c,x0,276,w,194,'#74968d');R(c,x0,276,w,7,'#557c75');R(c,x0,455,w,17,'#405e5a');
    for(let x=x0+10;x<E.WIDTH;x+=43){R(c,x,269,10,2,'#b3b8a2');for(let y=300;y<450;y+=55){R(c,x+(y%3)*8,y,7,2,'#7f9e92');R(c,x+16,y+12,3,6,'#8fa99a');}}
    R(c,x0,472,w,68,'#7a8983');
    for(let row=0;row<3;row++)for(let x=x0-10;x<E.WIDTH;x+=66){const xx=x+(row%2)*33;R(c,xx,475+row*23,64,21,(Math.floor(x/66)+row)%2?'#98a298':'#acb0a0');R(c,xx+2,477+row*23,60,1,'#c1c2ae');}
    R(c,x0,60,12,412,'#405b58');
    door(c,2945,211,118,259,'03');door(c,3770,188,120,282,'04');windowArt(c,4130,88,162,170);elevator(c,5370,198,156,274);
    // Notice board: deliberately fictional, with no addresses or personal details.
    R(c,3140,95,167,115,'#536d68');R(c,3147,102,153,101,'#a39d7d');
    for(let i=0;i<3;i++){R(c,3157+i*45,116+(i%2)*9,35,64,'#e2dcc1');R(c,3162+i*45,122+(i%2)*9,24,4,'#87948b');for(let j=0;j<4;j++)R(c,3162+i*45,136+(i%2)*9+j*7,19+(j%2)*5,2,'#a0a691');}
    for(const x of [3040,3530,4040,4600,5100,5550]){R(c,x,63,82,15,'#879b93');R(c,x+5,66,72,8,'#f5edcb');R(c,x+12,78,59,5,'#dfddbd');}
    R(c,3435,147,109,35,'#527a75');text(c,'ЭТАЖ 2',3448,171,'#e6dec0',18);
    for(const s of E.PLATFORMS){
      if(s.x<E.ROOM_WIDTH)continue;
      if(s.type==='parcel')parcel(c,s.x,s.y,s.w,E.FLOOR-s.y);
      if(s.type==='parcels'){
        const count=Math.ceil((E.FLOOR-s.y)/78),bh=(E.FLOOR-s.y)/count;
        for(let row=0;row<count;row++){const inset=row===0?0:(row%2?5:-4);parcel(c,s.x+inset,s.y+row*bh,s.w-inset,bh);}
      }
      if(s.type==='mailboxes')mailboxes(c,s.x,s.y,s.w);
      if(s.type==='bench'){R(c,s.x+12,s.y+9,11,E.FLOOR-s.y-9,'#3e5955');R(c,s.x+s.w-23,s.y+9,11,E.FLOOR-s.y-9,'#3e5955');R(c,s.x+8,s.y-53,8,58,'#3e5955');R(c,s.x+s.w-16,s.y-53,8,58,'#3e5955');for(let i=0;i<3;i++)R(c,s.x,s.y-50+i*13,s.w,10,'#b4966a');R(c,s.x-4,s.y,s.w+8,12,'#b89a6d');R(c,s.x-4,s.y,s.w+8,4,'#d3bc8a');}
      if(s.type==='step'){R(c,s.x,s.y,s.w,E.FLOOR-s.y,'#8a9790');R(c,s.x,s.y,s.w,8,'#c3c7b3');R(c,s.x,s.y+8,s.w,5,'#5c746d');R(c,s.x+4,s.y+17,s.w-8,2,'#a4aea0');}
    }
    for(let i=0;i<6;i++){const xx=4496+i*95,yy=320-i*56;L(c,xx,yy,xx,Math.max(191,yy+95),'#456661',5);}
    L(c,4490,320,4980,32,'#3b5755',8);L(c,4490,316,4980,28,'#bbab81',3);
    // A potted plant by the window and parcel tape mark the destination.
    R(c,4110,435,32,33,'#ad8864');P(c,[[4127,439],[4101,414],[4117,412],[4129,430],[4135,398],[4144,404],[4133,438]],'#466c59');
    R(c,5430,475,127,5,'#e1bf7b');text(c,'КУРЬЕР',5415,163,'#3e645d',17);
    c.globalAlpha=.09;P(c,[[4138,100],[4284,100],[4570,472],[4210,472]],'#fff6cd');c.globalAlpha=1;
    // The apartment threshold belongs to both scenes, so camera movement stays continuous.
    R(c,2724,231,112,241,'#394b49');R(c,2731,239,98,233,'#607e73');R(c,2738,247,84,225,'#96a294');R(c,2721,466,118,6,'#c5b18b');R(c,2706,327,12,19,'#e0d2aa');R(c,2709,331,6,7,'#7c8475');
  }
  function doorAnimation(c,amount,t){
    const width=Math.max(5,88*(1-amount));R(c,2735,245,width,220,'#79604a');R(c,2740,250,Math.max(1,width-10),207,'#aa8156');
    if(width>20){R(c,2735+width-17,357,4,18,'#e3c78d');R(c,2735+width-17,360,10,4,'#e3c78d');}
    if(amount>0){c.globalAlpha=.14*amount;P(c,[[2738,472],[2823,472],[2890,525],[2708,525]],'#ffe2a2');c.globalAlpha=1;text(c,'→',2772,218,'#976c3e',26);}
  }
  function cart(c,x,y,t){
    const yy=y-14;R(c,x-27,yy+16,55,5,'#455c60');L(c,x+24,yy+17,x+24,yy-23,'#627b77',4);L(c,x+24,yy-23,x+34,yy-23,'#627b77',4);
    parcel(c,x-21,yy-6,39,23);for(const xx of [x-18,x+17]){R(c,xx-5,yy+19,10,8,'#344c4e');R(c,xx-1,yy+21,3,3,'#a8b4a6');}
  }
  function courier(c,x,t,stopped=false){
    const stride=stopped?0:Math.sin(t*12)*5;c.save();c.translate(Math.round(x),472);
    R(c,-20,-74,16,41,'#d19556');R(c,-18,-70,10,31,'#ecb87a');
    R(c,-12,-42,10,35+stride,'#314d59');R(c,5,-42,10,35-stride,'#314d59');R(c,-15,-9+stride,18,8,'#304247');R(c,5,-9-stride,18,8,'#304247');
    R(c,-14,-80,32,43,'#5f9c8a');R(c,-12,-80,28,7,'#83b59c');R(c,13,-70,12,27,'#5f9c8a');R(c,18,-53,12,8,'#d3ae81');
    R(c,-6,-103,24,24,'#d5b28a');R(c,-9,-107,27,10,'#49786e');R(c,13,-100,13,5,'#49786e');R(c,12,-93,3,3,'#35494c');R(c,17,-87,5,5,'#d5b28a');
    parcel(c,19,-68,31,28);c.restore();
  }
  root.MyafchikHall={background,doorAnimation,cart,courier};if(typeof module!=='undefined')module.exports=root.MyafchikHall;
})(typeof globalThis!=='undefined'?globalThis:this);

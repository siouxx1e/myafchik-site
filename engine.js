(function (root) {
  'use strict';
  const ROOM_WIDTH = 2840, WIDTH = 5700, FLOOR = 472;
  const PLATFORMS = [
    {x:0,y:FLOOR,w:WIDTH,type:'floor'},
    {x:260,y:398,w:150,type:'ottoman'},
    {x:510,y:340,w:350,type:'sofa'},
    {x:735,y:275,w:105,type:'cushion'},
    {x:945,y:225,w:140,type:'shelf'},
    {x:1180,y:185,w:190,type:'wardrobe'},
    {x:1630,y:397,w:165,type:'table'},
    {x:1885,y:337,w:240,type:'sofa'},
    {x:2190,y:272,w:100,type:'books'},
    {x:2370,y:205,w:285,type:'wardrobe'},
    {x:3100,y:401,w:130,type:'parcel'},
    {x:3320,y:325,w:220,type:'mailboxes'},
    {x:3620,y:252,w:135,type:'parcels'},
    {x:3880,y:385,w:205,type:'bench'},
    {x:4200,y:320,w:145,type:'parcels'},
    {x:4500,y:415,w:95,type:'step'},
    {x:4595,y:359,w:95,type:'step'},
    {x:4690,y:303,w:95,type:'step'},
    {x:4785,y:247,w:95,type:'step'},
    {x:4880,y:191,w:95,type:'step'},
    {x:5120,y:242,w:215,type:'parcels'}
  ];
  const FOOD = [[330,368],[620,310],[785,245],[1010,195],[1270,155],[1710,367],[2000,307],[2240,242]];
  const YARNS = [{x:1000,y:458,range:85,speed:1.4},{x:1510,y:458,range:60,speed:1.7},{x:2180,y:458,range:70,speed:1.2}];
  const HALL_FOOD=[[3165,371],[3430,295],[3687,222],[3980,355],[4270,290],[4635,329],[4825,217],[5225,212]];
  const CARTS=[{x:3550,y:458,range:65,speed:.85},{x:4350,y:458,range:65,speed:1.05}];
  const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
  class Game {
    constructor() { this.reset(); }
    reset() {
      this.mode='ready';this.time=0;this.mistakes=0;this.checkpoint=70;this.events=[];
      this.food=FOOD.map(([x,y])=>({x,y,taken:false}));
      this.player={x:70,y:FLOOR-38,w:34,h:38,vx:0,vy:0,face:1,onGround:true,coyote:.11,jumpBuffer:0,invulnerable:0};
      this.jumpHeld=false;this.goalHint=0;this.hintCooldown=0;this.meowCooldown=0;
      this.level=1;this.toyFound=false;this.doorOpen=0;this.transitionClock=0;this.transitionStart=0;this.resumeMode='playing';this.roomTime=0;this.roomMistakes=0;this.courierX=2940;
    }
    get collected() { return this.food.filter(f=>f.taken).length; }
    start() { if(this.mode==='ready') this.mode='playing'; }
    pause() { if(this.mode==='playing'||this.mode==='transition'){this.resumeMode=this.mode;this.mode='paused';} }
    resume() { if(this.mode==='paused') this.mode=this.resumeMode; }
    yarns() { return (this.level===1?YARNS:CARTS).map((v,i)=>({...v,x:v.x+Math.sin(this.time*v.speed+i)*v.range})); }
    enterHall(){
      this.level=2;this.food=HALL_FOOD.map(([x,y])=>({x,y,taken:false}));this.checkpoint=2960;this.mode='playing';
      Object.assign(this.player,{x:2960,y:FLOOR-38,vx:0,vy:0,onGround:true,coyote:.11,jumpBuffer:0,invulnerable:1});
      this.jumpHeld=false;this.roomTime=this.time;this.roomMistakes=this.mistakes;this.events.push({type:'hall',x:2960,y:FLOOR});
    }
    restartLevel(){
      if(this.level===1){this.reset();this.start();return;}
      const time=this.roomTime,mistakes=this.roomMistakes;this.reset();this.time=time;this.mistakes=mistakes;this.toyFound=true;this.doorOpen=1;this.enterHall();this.courierX=3260;
    }
    meow() { if(this.mode==='playing'&&this.meowCooldown<=0){this.meowCooldown=1;this.events.push({type:'meow',x:this.player.x,y:this.player.y});} }
    step(dt,input={}) {
      if(this.mode==='transition'){
        dt=Math.min(dt,1/30);this.time+=dt;this.transitionClock+=dt;this.doorOpen=Math.min(1,this.doorOpen+dt);
        const progress=Math.min(1,this.transitionClock/2.6);const eased=progress*progress*(3-2*progress);
        this.player.x=this.transitionStart+(2960-this.transitionStart)*eased;this.player.y=FLOOR-this.player.h;this.player.vx=85;this.player.face=1;this.player.onGround=true;
        this.courierX=2940+progress*310;
        if(progress>=1)this.enterHall();return;
      }
      if(this.mode!=='playing') return;
      dt=Math.min(dt,1/30); this.time+=dt;this.hintCooldown-=dt;this.meowCooldown-=dt;
      const p=this.player; p.invulnerable=Math.max(0,p.invulnerable-dt);
      if(this.toyFound)this.doorOpen=Math.min(1,this.doorOpen+dt*.85);
      if(this.level===2)this.courierX=Math.min(5480,this.courierX+Math.max(0,Math.min(310*dt,p.x+350-this.courierX)));
      const axis=clamp(Number(input.right||0)-Number(input.left||0),-1,1);
      p.vx=axis*285;if(axis)p.face=axis;
      if(input.jump&&!this.jumpHeld)p.jumpBuffer=.14;
      this.jumpHeld=!!input.jump;
      p.jumpBuffer-=dt;
      p.coyote=p.onGround?.11:p.coyote-dt;
      if(p.jumpBuffer>0&&p.coyote>0){p.vy=-670;p.onGround=false;p.coyote=0;p.jumpBuffer=0;this.events.push({type:'jump',x:p.x,y:p.y+p.h});}
      const oldBottom=p.y+p.h;
      p.x=clamp(p.x+p.vx*dt,this.level===1?8:ROOM_WIDTH+30,this.level===1?(this.toyFound?2760:2690):WIDTH-p.w-8);
      p.vy+=1600*dt;p.y+=p.vy*dt;p.onGround=false;
      if(p.vy>=0){
        let landing=null;
        for(const s of PLATFORMS){
          if(p.x+p.w>s.x&&p.x<s.x+s.w&&oldBottom<=s.y+.5&&p.y+p.h>=s.y){if(!landing||s.y<landing.y)landing=s;}
        }
        if(landing){p.y=landing.y-p.h;p.vy=0;p.onGround=true;}
      }
      for(const f of this.food){if(!f.taken&&Math.abs(p.x+p.w/2-f.x)<29&&Math.abs(p.y+p.h/2-f.y)<33){f.taken=true;this.events.push({type:'food',x:f.x,y:f.y});}}
      const checkX=this.level===1?1440:4025;
      if(p.x>checkX&&this.checkpoint<checkX){this.checkpoint=this.level===1?1450:4050;this.events.push({type:'checkpoint',x:this.checkpoint,y:FLOOR});}
      for(const yarn of this.yarns()){
        if(p.invulnerable<=0&&Math.abs(p.x+p.w/2-yarn.x)<27&&p.y+p.h>yarn.y-11&&p.y<yarn.y+11){
          this.mistakes++;this.events.push({type:'hit',x:p.x,y:p.y});
          p.x=this.checkpoint;p.y=FLOOR-p.h;p.vx=0;p.vy=0;p.onGround=true;p.coyote=.11;p.invulnerable=1.8;break;
        }
      }
      if(this.level===1&&!this.toyFound&&Math.abs(p.x+p.w/2-2580)<38&&p.y+p.h<=218&&p.y+p.h>130){
        if(this.collected===FOOD.length){this.toyFound=true;this.events.push({type:'doorbell',x:2580,y:160});}
        else if(this.hintCooldown<=0){this.hintCooldown=3;this.events.push({type:'missing',remaining:FOOD.length-this.collected});}
      }
      if(this.level===1&&this.toyFound&&p.x>=2735&&p.onGround){this.mode='transition';this.transitionClock=0;this.transitionStart=p.x;this.events.push({type:'transition',x:p.x,y:p.y});}
      if(this.level===2&&p.x>5400&&p.onGround&&p.y+p.h>440){
        if(this.collected===HALL_FOOD.length){this.mode='won';this.events.push({type:'win',x:5480,y:410});}
        else if(this.hintCooldown<=0){this.hintCooldown=3;this.events.push({type:'missing',remaining:HALL_FOOD.length-this.collected});}
      }
    }
  }
  const api={Game,WIDTH,ROOM_WIDTH,FLOOR,PLATFORMS,FOOD,HALL_FOOD,YARNS,CARTS,clamp};
  root.MyafchikEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);

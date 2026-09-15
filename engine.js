(function (root) {
  'use strict';
  const WIDTH = 2840, FLOOR = 472;
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
    {x:2370,y:205,w:285,type:'wardrobe'}
  ];
  const FOOD = [[330,368],[620,310],[785,245],[1010,195],[1270,155],[1710,367],[2000,307],[2240,242]];
  const YARNS = [{x:1000,y:458,range:85,speed:1.4},{x:1510,y:458,range:60,speed:1.7},{x:2180,y:458,range:70,speed:1.2}];
  const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
  class Game {
    constructor() { this.reset(); }
    reset() {
      this.mode='ready';this.time=0;this.mistakes=0;this.checkpoint=70;this.events=[];
      this.food=FOOD.map(([x,y])=>({x,y,taken:false}));
      this.player={x:70,y:FLOOR-38,w:34,h:38,vx:0,vy:0,face:1,onGround:true,coyote:.11,jumpBuffer:0,invulnerable:0};
      this.jumpHeld=false;this.goalHint=0;this.hintCooldown=0;this.meowCooldown=0;
    }
    get collected() { return this.food.filter(f=>f.taken).length; }
    start() { if(this.mode==='ready') this.mode='playing'; }
    pause() { if(this.mode==='playing') this.mode='paused'; }
    resume() { if(this.mode==='paused') this.mode='playing'; }
    yarns() { return YARNS.map((v,i)=>({...v,x:v.x+Math.sin(this.time*v.speed+i)*v.range})); }
    meow() { if(this.mode==='playing'&&this.meowCooldown<=0){this.meowCooldown=1;this.events.push({type:'meow',x:this.player.x,y:this.player.y});} }
    step(dt,input={}) {
      if(this.mode!=='playing') return;
      dt=Math.min(dt,1/30); this.time+=dt;this.hintCooldown-=dt;this.meowCooldown-=dt;
      const p=this.player; p.invulnerable=Math.max(0,p.invulnerable-dt);
      const axis=clamp(Number(input.right||0)-Number(input.left||0),-1,1);
      p.vx=axis*285;if(axis)p.face=axis;
      if(input.jump&&!this.jumpHeld)p.jumpBuffer=.14;
      this.jumpHeld=!!input.jump;
      p.jumpBuffer-=dt;
      p.coyote=p.onGround?.11:p.coyote-dt;
      if(p.jumpBuffer>0&&p.coyote>0){p.vy=-670;p.onGround=false;p.coyote=0;p.jumpBuffer=0;this.events.push({type:'jump',x:p.x,y:p.y+p.h});}
      const oldBottom=p.y+p.h;
      p.x=clamp(p.x+p.vx*dt,8,WIDTH-p.w-8);
      p.vy+=1600*dt;p.y+=p.vy*dt;p.onGround=false;
      if(p.vy>=0){
        let landing=null;
        for(const s of PLATFORMS){
          if(p.x+p.w>s.x&&p.x<s.x+s.w&&oldBottom<=s.y+.5&&p.y+p.h>=s.y){if(!landing||s.y<landing.y)landing=s;}
        }
        if(landing){p.y=landing.y-p.h;p.vy=0;p.onGround=true;}
      }
      for(const f of this.food){if(!f.taken&&Math.abs(p.x+p.w/2-f.x)<29&&Math.abs(p.y+p.h/2-f.y)<33){f.taken=true;this.events.push({type:'food',x:f.x,y:f.y});}}
      if(p.x>1440&&this.checkpoint<1440){this.checkpoint=1450;this.events.push({type:'checkpoint',x:1450,y:FLOOR});}
      for(const yarn of this.yarns()){
        if(p.invulnerable<=0&&Math.abs(p.x+p.w/2-yarn.x)<27&&p.y+p.h>yarn.y-11&&p.y<yarn.y+11){
          this.mistakes++;this.events.push({type:'hit',x:p.x,y:p.y});
          p.x=this.checkpoint;p.y=FLOOR-p.h;p.vx=0;p.vy=0;p.onGround=true;p.coyote=.11;p.invulnerable=1.8;break;
        }
      }
      if(Math.abs(p.x+p.w/2-2580)<38&&p.y+p.h<=218&&p.y+p.h>130){
        if(this.collected===FOOD.length){this.mode='won';this.events.push({type:'win',x:2580,y:160});}
        else if(this.hintCooldown<=0){this.hintCooldown=3;this.events.push({type:'missing',remaining:FOOD.length-this.collected});}
      }
    }
  }
  const api={Game,WIDTH,FLOOR,PLATFORMS,FOOD,YARNS,clamp};
  root.MyafchikEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);

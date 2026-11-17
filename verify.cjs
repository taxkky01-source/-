const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const draw=new Proxy({}, {get:(o,k)=>k==='createLinearGradient'?()=>({addColorStop(){}}):()=>{},set:()=>true});
const nodes={};function node(){return {style:{},classList:{toggle(){}},getContext:()=>draw,getBoundingClientRect:()=>({width:1200,height:510}),setAttribute(){},append(){},querySelector:()=>node(),firstChild:{getContext:()=>draw}}}
const env={document:{getElementById:id=>nodes[id]??=node(),createElement:()=>node(),querySelectorAll:()=>[]},console,Math,setTimeout:()=>{},setInterval:()=>{},requestAnimationFrame:()=>{},addEventListener:()=>{}};
vm.createContext(env);vm.runInContext(fs.readFileSync('game.js','utf8'),env);
vm.runInContext(`
start(); update(4.2); if(mode!=='race') throw Error('Countdown failed');
keys.ArrowUp=true;for(let i=0;i<120;i++)update(1/60);if(speed<100)throw Error('Acceleration failed');
item='🚀';useItem();if(boost!==3||item!==null)throw Error('Boost failed');
pause();if(mode!=='paused')throw Error('Pause failed');pause();
lane=0;distance=205;pickupAt=-1000;update(.01);if(!item)throw Error('Pickup failed');
item='❄️';useItem();if(!opponents.every(o=>o.stun===3))throw Error('Freeze failed');
distance=FINISH-1;speed=180;update(.1);if(mode!=='finished')throw Error('Finish failed');
start();if(distance!==0||elapsed!==0||opponents.length!==5)throw Error('Restart failed');
scene(1);`,env);
console.log('PASS: countdown, acceleration, boost, pause, gift pickup, freeze, finish, restart, canvas rendering');

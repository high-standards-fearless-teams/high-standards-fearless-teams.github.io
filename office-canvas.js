// A small software-rendered isometric world for browsers without WebGL.
export function createCanvasWorld(container){
 const cv=document.createElement('canvas');container.replaceChildren(cv);const ctx=cv.getContext('2d');
 let playerName='Alex';
 let width=900,height=900,scale=65,ox=450,oy=450,stage='title',type='man',shirt='#688b72',elapsed=0;
 let px=2.4,pz=2.3,tx=2.4,tz=2.3,zoom=1,targetZoom=1,panX=0,targetPanX=0,panY=0,targetPanY=0,problem=0;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const P=(x,y,z)=>[ox+(x-z)*scale*.77,oy+(x+z)*scale*.36-y*scale];
 function path(pts,fill,stroke){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=.6;ctx.stroke();}}
 function poly(points,fill,stroke){path(points.map(p=>P(...p)),fill,stroke);}
 function cube(x,z,y,w,d,h,top,left,right){poly([[x,y,z+d],[x+w,y,z+d],[x+w,y+h,z+d],[x,y+h,z+d]],left);poly([[x+w,y,z],[x+w,y,z+d],[x+w,y+h,z+d],[x+w,y+h,z]],right);poly([[x,y+h,z],[x+w,y+h,z],[x+w,y+h,z+d],[x,y+h,z+d]],top);}
 function ellipse(x,y,rx,ry,fill){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();}
 function rr(x,y,w,h,r,fill){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();}
 function line(a,b,color,width=1){ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.stroke();}
 function floorLabel(t,x,y,z,size=12,color='#5f755b'){const p=P(x,y,z);ctx.font=`600 ${size*scale/65}px Arial`;ctx.textAlign='center';ctx.fillStyle=color;ctx.fillText(t,...p);}
 function plant(x,z,s=1){const [u,v]=P(x,0,z),unit=scale*s;ellipse(u+5,v+3,unit*.26,unit*.09,'#9ba87c33');path([[u-unit*.19,v-unit*.4],[u+unit*.19,v-unit*.4],[u+unit*.14,v],[u-unit*.14,v]],'#c99170');ellipse(u,v-unit*.4,unit*.2,unit*.075,'#e4b28b');ellipse(u,v-unit*.41,unit*.15,unit*.045,'#78694c');for(let j=0;j<7;j++){const a=j*2.4,dx=Math.sin(a)*unit*.22,dy=-unit*(.53+j%3*.11);line([u,v-unit*.4],[u+dx,v+dy],'#82966a',2);ctx.save();ctx.translate(u+dx,v+dy);ctx.rotate(Math.sin(a)*.8);ellipse(0,0,unit*.085,unit*.2,j%2?'#89a575':'#a1b78b');ctx.restore();}}
 function seat(x,z,back=true,c='#96af9c'){cube(x,z,.05,.09,.09,.5,'#b19c77','#a18c69','#937b5c');cube(x+.5,z+.4,.05,.09,.09,.5,'#b19c77','#a18c69','#937b5c');cube(x-.08,z-.04,.5,.76,.65,.12,c,'#7c9886','#88a38d');if(back)cube(x-.08,z-.02,.6,.76,.1,.55,c,'#7d9985','#87a18b');}
 function char(x,z,who,clothes,phase=0,walking=false){const p=P(x,0,z),k=scale/65;const b=reduced?0:Math.sin(elapsed*2+phase)*1.4*k;ctx.save();ctx.translate(p[0],p[1]);ellipse(4,3,20*k,7*k,'#899b7340');if(who==='player'){ctx.beginPath();ctx.ellipse(0,2,25*k,9*k,0,0,Math.PI*2);ctx.strokeStyle='#fff9da';ctx.lineWidth=2.2;ctx.stroke();}const swing=walking&&!reduced?Math.sin(elapsed*10)*4*k:0;
  rr(-13*k,-24*k+b+swing,10*k,22*k,5*k,'#61766d');rr(3*k,-24*k+b-swing,10*k,22*k,5*k,'#61766d');ellipse(-8*k,-3*k+swing,8*k,4*k,'#faf4df');ellipse(9*k,-3*k-swing,8*k,4*k,'#faf4df');
  const skin=who==='player'?(type==='neutral'?'#b98661':type==='woman'?'#e0b38c':'#d8aa83'):who==='sam'?'#b88762':'#e4bc99';const long=who==='maya'||who==='player'&&type==='woman';if(long)rr(-23*k,-89*k+b,46*k,50*k,20*k,'#63503c');
  rr(-20*k,-52*k+b,40*k,36*k,15*k,clothes);rr(-26*k,-48*k+b+swing,10*k,27*k,6*k,clothes);rr(16*k,-48*k+b-swing,10*k,27*k,6*k,clothes);ellipse(-21*k,-23*k+b+swing,5*k,6*k,skin);ellipse(21*k,-23*k+b-swing,5*k,6*k,skin);
  ellipse(-24*k,-64*k+b,5*k,7*k,skin);ellipse(24*k,-64*k+b,5*k,7*k,skin);ellipse(0,-66*k+b,25*k,25*k,skin);ellipse(0,-83*k+b,25*k,13*k,'#594936');ellipse(-12*k,-81*k+b,14*k,10*k,'#594936');ellipse(14*k,-83*k+b,13*k,10*k,'#594936');if(long){rr(-25*k,-81*k+b,7*k,33*k,5*k,'#63503c');rr(18*k,-81*k+b,7*k,33*k,5*k,'#63503c');}
  if(who==='sam'||who==='player'&&type==='neutral'){for(let j=0;j<6;j++)ellipse((-20+j*8)*k,(-86+(j%2)*3)*k+b,8*k,8*k,'#4b4132');}
  ellipse(-8*k,-66*k+b,2*k,3*k,'#374135');ellipse(8*k,-66*k+b,2*k,3*k,'#374135');ellipse(-16*k,-58*k+b,5*k,2.4*k,'#d59a7e');ellipse(16*k,-58*k+b,5*k,2.4*k,'#d59a7e');ctx.beginPath();ctx.arc(0,-56*k+b,4*k,.1,Math.PI-.1);ctx.strokeStyle='#9d6b52';ctx.lineWidth=1.2*k;ctx.stroke();rr(9*k,-43*k+b,5*k,7*k,1*k,'#fff4d3');ctx.restore();
 }
 function draw(){ctx.clearRect(0,0,width,height);const base=Math.min(width/14.5,height/12.5);scale=base*zoom;ox=width*.52+panX*base;oy=height*.48+panY*base;
  const sh=P(0,-.3,0);ellipse(sh[0],sh[1]+45*scale/65,scale*5.5,scale*2.6,'#a2ac8024');
  cube(-5,-3.5,-.35,10,7,.35,'#e1d5b5','#c4b696','#b5aa89');poly([[-5,.01,-3.5],[5,.01,-3.5],[5,.01,3.5],[-5,.01,3.5]],'#e4d7b7');
  for(let x=-4.5;x<5;x+=.65)line(P(x,.02,-3.5),P(x,.02,3.5),'#cebea033',1);for(let x=-4.8;x<4.8;x+=.65)for(let z=-3;z<3.5;z+=1.7)line(P(x,.025,z+(Math.floor(x*10)%2)*.5),P(x+.6,.025,z+(Math.floor(x*10)%2)*.5),'#c6b79a55',.7);
  cube(-5,-3.6,0,10,.16,2.7,'#e7e6cf','#d7ddc1','#c2ccb0');cube(-5.15,-3.6,0,.16,7.2,2.7,'#dae1c5','#c0d0b4','#c8d7b8');
  cube(-5.17,-3.65,2.7,10.2,.25,.1,'#c0c9ad','#b4c0a2','#a6b896');cube(-5.17,-3.65,2.7,.25,7.3,.1,'#c0c9ad','#b4c0a2','#a6b896');
  // Windows are projected onto the rear wall.
  for(const x of[-3.9,1.5]){poly([[x,.85,-3.42],[x+2.25,.85,-3.42],[x+2.25,2.4,-3.42],[x,2.4,-3.42]],'#f4efda');poly([[x+.1,.95,-3.4],[x+2.15,.95,-3.4],[x+2.15,2.3,-3.4],[x+.1,2.3,-3.4]],'#afcdc3');poly([[x+.1,.95,-3.38],[x+2.15,.95,-3.38],[x+2.15,1.4,-3.38],[x+.1,1.3,-3.38]],'#9fbbb0');line(P(x+1.125,.95,-3.36),P(x+1.125,2.3,-3.36),'#f3f1d9',3*scale/65);line(P(x+.1,1.65,-3.36),P(x+2.15,1.65,-3.36),'#f3f1d9',3*scale/65);cube(x-.1,-3.55,.8,2.45,.45,.12,'#f6ecd3','#dcd6bc','#d8cdb2');}
  floorLabel('C L O V E R',-.1,2.1,-3.4,12);floorLabel('S T U D I O',-.1,1.85,-3.4,8);
  // Back cabinet, coffee machine and plant.
  cube(-4.65,-3.05,0,2,.65,.85,'#e1c7a0','#c4ae8a','#bba17e');for(let i=0;i<3;i++){cube(-4.57+i*.63,-2.36,.08,.54,.025,.67,'#e2cbac','#d9c4a1','#c6b18d');const p=P(-4.3+i*.63,.5,-2.32);ellipse(...p,2.2,2.2,'#967e5e');}
  cube(-4.4,-2.9,.86,.45,.4,.5,'#607565','#4e6357','#52695a');cube(-4.32,-2.48,1.07,.27,.025,.16,'#bad1b7','#c5d8bf','#95ac96');plant(-2.9,-2.8,.55);plant(4.4,-3,1.1);
  cube(2.5,-2.9,.82,1.9,.85,.12,'#e8c699','#cfaa7d','#bc9871');cube(2.65,-2.8,0,.1,.6,.82,'#b99b72','#b99b72','#a38863');cube(4.1,-2.8,0,.1,.6,.82,'#b99b72','#b99b72','#a38863');cube(3.2,-2.65,1.15,.8,.05,.5,'#6d8170','#657969','#536b5c');poly([[3.25,1.2,-2.58],[3.95,1.2,-2.58],[3.95,1.6,-2.58],[3.25,1.6,-2.58]],'#c1d8c0');cube(3.54,-2.65,.95,.1,.05,.2,'#75866f','#75866f','#75866f');seat(3,-1.8,true,'#cba188');
  // Rug behind furniture.
  poly([[-1.4,.035,-1.6],[2.4,.035,-1.6],[2.4,.035,1],[-1.4,.035,1]],'#b0bd98');
  const objects=[];
  const add=(x,z,fn)=>objects.push({depth:x+z,fn});
  add(-.8,-1.5,()=>seat(-.8,-1.5,true));add(.9,-1.5,()=>seat(.9,-1.5,true));
  add(.2,-.5,()=>{for(const x of[-.8,1.5])for(const z of[-.8,.1])cube(x,z,0,.09,.09,.85,'#b39a75','#ad916b','#a28660');cube(-1.1,-1.1,.85,3,.17+1.1,.15,'#e9c599','#d5b184','#c09b72');poly([[-.6,1.01,-.45],[.1,1.01,-.45],[.1,1.01,0],[-.6,1.01,0]],'#fff7de');cube(.7,-.65,1.02,.6,.4,.035,'#788f7c','#697e6e','#687d6b');cube(.7,-.65,1.05,.6,.045,.38,'#778d79','#657d6a','#596f60');poly([[.75,1.09,-.595],[1.25,1.09,-.595],[1.25,1.38,-.595],[.75,1.38,-.595]],'#c0d9bb');const c=P(1.5,1.17,-.25);rr(c[0]-5*scale/65,c[1]-8*scale/65,10*scale/65,13*scale/65,3,'#c38d64');});
  add(-.8,.5,()=>seat(-.8,.5,false));add(.9,.5,()=>seat(.9,.5,false));
  add(-3.8,2,()=>{cube(-4.7,1.7,.12,1.9,.85,.4,'#d9ac8b','#cb9c79','#bb8b6b');cube(-4.7,1.7,.52,1.9,.2,.55,'#e6b695','#d9aa8b','#bf9477');cube(-4.85,1.7,.4,.2,.9,.4,'#ddb091','#ca9d7e','#bd8c6f');cube(-2.85,1.7,.4,.2,.9,.4,'#ddb091','#ca9d7e','#bd8c6f');cube(-4.35,1.95,.55,.6,.45,.12,'#f4e3ba','#e1cda2','#dcc398');});
  add(-4,-1,()=>plant(-4,-1,1));add(4,2.5,()=>plant(4,2.5,1.2));
  add(3.8,.7,()=>{cube(3.2,.7,0,.06,.06,2.1,'#afbb9c','#a0ac8f','#9aa486');cube(4.65,.7,0,.06,.06,2.1,'#afbb9c','#a0ac8f','#9aa486');cube(2.9,.7,1.05,2,.08,1.25,'#eee7ce','#fff9e9','#d8ddc4');for(let i=0;i<3;i++){const p=P(3.12,1.99-i*.27,.8);ellipse(...p,5*scale/65,5*scale/65,problem===2?(i===1?'#d1a759':'#cc7e60'):problem===1&&i===0?'#cc7e60':'#83a468');line(P(3.4,1.99-i*.27,.8),P(4.55,1.99-i*.27,.8),'#d2dac4',3*scale/65);}floorLabel('LAUNCH',3.9,2.42,.8,7);});
  let samX=-2,samZ=-.7,mayaX=2.2,mayaZ=-1.8;if(['afternoon','reaction2','lesson2'].includes(stage)){mayaX=1.5;mayaZ=-.2;}if(stage==='ending'){samX=-.6;samZ=1.5;mayaX=1.8;mayaZ=1.5;}
  add(samX,samZ,()=>char(samX,samZ,'sam','#c89069',2));add(mayaX,mayaZ,()=>char(mayaX,mayaZ,'maya','#a8adc2',4));add(px,pz,()=>char(px,pz,'player',shirt,0,Math.abs(tx-px)+Math.abs(tz-pz)>.05));
  objects.sort((a,b)=>a.depth-b.depth).forEach(o=>o.fn());
  const [lx,ly]=P(px,1.78,pz);ctx.font='600 13px Arial';const label=playerName+' · You',lw=ctx.measureText(label).width+24;rr(lx-lw/2,ly-24,lw,27,13,'#fffcec');ctx.fillStyle='#35553c';ctx.textAlign='center';ctx.fillText(label,lx,ly-6);

 }
 function resize(){width=container.clientWidth;height=container.clientHeight;const d=Math.min(devicePixelRatio,2);cv.width=width*d;cv.height=height*d;cv.style.width=width+'px';cv.style.height=height+'px';ctx.setTransform(d,0,0,d,0,0);}addEventListener('resize',resize);resize();
 let last=performance.now();function frame(now){let dt=Math.min((now-last)/1000,.05);last=now;elapsed+=dt;const smoothing=reduced?1:Math.min(dt*5,1);px+=(tx-px)*smoothing;pz+=(tz-pz)*smoothing;zoom+=(targetZoom-zoom)*smoothing;panX+=(targetPanX-panX)*smoothing;panY+=(targetPanY-panY)*smoothing;draw();requestAnimationFrame(frame);}requestAnimationFrame(frame);
 return{identity(name){playerName=name;},avatar(t,c){type=t;shirt=c;},stage(s){stage=s;targetZoom=1;targetPanX=0;targetPanY=0;tx=2.4;tz=2.3;if(['choose','intro'].includes(s)){targetZoom=1.9;targetPanY=-2.7;targetPanX=-.15;}if(['morning','reaction1','lesson1'].includes(s)){tx=-1.2;tz=1.4;targetZoom=1.08;targetPanY=-.15;}if(['afternoon','reaction2','lesson2'].includes(s)){tx=2.5;tz=1.3;targetZoom=1.08;targetPanY=-.15;}if(s==='ending'){tx=.6;tz=2.4;targetZoom=1.05;}if(s==='title')problem=0;},revealProblems(){problem=2;},calm(){problem=1;}};
}

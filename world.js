import * as THREE from './vendor/three.module.min.js';

export function createWorld(container, onReady) {
 const scene = new THREE.Scene(); scene.background=new THREE.Color('#e9eadb');
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7)); renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.25;
 container.appendChild(renderer.domElement);
 const camera=new THREE.OrthographicCamera(-10,10,10,-10,.1,100); const target=new THREE.Vector3(0,.5,0);
 let view=13.8, desiredView=13.8, desiredTarget=new THREE.Vector3(0,.5,0), stage='title', reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 scene.add(new THREE.HemisphereLight(0xfffce3,0x829b87,3.1));
 const sun=new THREE.DirectionalLight(0xffedc1,4.2);sun.position.set(-5,12,7);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-10;sun.shadow.camera.right=10;sun.shadow.camera.top=10;sun.shadow.camera.bottom=-10;sun.shadow.normalBias=.04;sun.shadow.bias=-.0003;scene.add(sun);
 const fill=new THREE.DirectionalLight(0xd3e4ff,1);fill.position.set(6,5,-3);scene.add(fill);
 const matCache={};const mat=(c)=>matCache[c]||(matCache[c]=new THREE.MeshStandardMaterial({color:c,roughness:.85}));
 const root=new THREE.Group();scene.add(root);
 function box(w,h,d,c,x=0,y=0,z=0,parent=root){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 function rounded(w,h,d,c,x=0,y=0,z=0,parent=root,r=.06){r=Math.min(r,w/3,h/3,d/3);const shape=new THREE.Shape();const a=-w/2,b=-h/2;shape.moveTo(a+r,b);shape.lineTo(a+w-r,b);shape.quadraticCurveTo(a+w,b,a+w,b+r);shape.lineTo(a+w,b+h-r);shape.quadraticCurveTo(a+w,b+h,a+w-r,b+h);shape.lineTo(a+r,b+h);shape.quadraticCurveTo(a,b+h,a,b+h-r);shape.lineTo(a,b+r);shape.quadraticCurveTo(a,b,a+r,b);const g=new THREE.ExtrudeGeometry(shape,{depth:d-2*r,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:r*.7,bevelThickness:r,curveSegments:4});g.translate(0,0,-d/2+r);const m=new THREE.Mesh(g,mat(c));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 function sphere(rx,ry,rz,c,x,y,z,parent=root){const m=new THREE.Mesh(new THREE.SphereGeometry(1,20,14),mat(c));m.scale.set(rx,ry,rz);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 function cyl(rt,rb,h,c,x,y,z,parent=root){const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,32),mat(c));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 function textPlane(text,w,h,c,bg,x,y,z,parent=root,size=52){const cv=document.createElement('canvas');cv.width=512;cv.height=256;const cx=cv.getContext('2d');cx.fillStyle=bg;cx.fillRect(0,0,512,256);cx.fillStyle=c;cx.font=`600 ${size}px Arial`;cx.textAlign='center';cx.textBaseline='middle';text.split('\n').forEach((line,i,arr)=>cx.fillText(line,256,128+(i-(arr.length-1)/2)*65));const tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex}));m.position.set(x,y,z);parent.add(m);return m;}
 // A handcrafted office diorama: no external art, no loading screen.
 rounded(11.4,.45,8.4,'#c9c3a5',0,-.28,0,root,.12);
 const floor=box(11,.12,8,'#e5d6b9',0,-.02,0); floor.receiveShadow=true;
 for(let x=-5;x<=5;x+=.55)box(.012,.007,8,'#cbbd9e',x,.045,0);
 for(let x=-5;x<5;x+=1.1)for(let z=-3.7;z<4;z+=1.9)box(.53,.006,.012,'#cbbd9e',x,.05,z+(Math.round(x*10)%2)*.3);
 box(11.2,2.9,.2,'#dfdfc6',0,1.45,-4.05);box(.2,2.9,8.2,'#cbd8bf',-5.55,1.45,0);
 box(11.2,.15,.3,'#bac4aa',0,2.95,-4.05);box(.3,.15,8.2,'#b3c4a3',-5.55,2.95,0);
 box(11,.12,.12,'#bdc6ac',0,.14,-3.9);box(.12,.12,8,'#b4c6a6',-5.4,.14,0);
 // Oversized windows and the soft skyline behind them.
 for(const x of[-3.3,3.15]){rounded(2.5,1.8,.12,'#f6f3dc',x,1.8,-3.85);box(2.28,1.55,.05,'#a9c6c0',x,1.8,-3.76);box(.06,1.6,.07,'#edf0db',x,1.8,-3.7);box(2.28,.06,.07,'#edf0db',x,1.75,-3.7);for(let j=0;j<4;j++)box(.3,.35+j%2*.2,.02,'#93b3ac',x-.8+j*.5,1.2,-3.72);box(2.7,.12,.4,'#f5e9ce',x,.87,-3.65);}
 textPlane('good work.\ngood company.',1.45,.73,'#637b5b','#e6e6cc',0,2.2,-3.9,root,49);
 // Back cabinets, coffee station, and corkboard.
 rounded(2.4,1, .65,'#c6b493',-4.25,.55,-2.8);for(const x of[-4.8,-4.05,-3.45]){box(.64,.75,.03,'#ded0b3',x,.57,-2.45);sphere(.035,.035,.035,'#917f61',x,.62,-2.41);}
 rounded(.48,.57,.43,'#59695c',-4.8,1.36,-2.8);box(.23,.18,.03,'#b9c9b9',-4.8,1.42,-2.57);cyl(.10,.08,.16,'#fcf5dc',-4.8,1.11,-2.5);cyl(.1,.08,.19,'#dc9871',-3.8,1.15,-2.7);
 // Central collaboration rug and conference table.
 rounded(4.1,.03,2.6,'#a4b293',1,.07,-.65,root,.01);
 rounded(3.2,.17,1.45,'#e8bd89',1,1.02,-.7,root,.08);
 for(const x of[-.2,2.2])for(const z of[-1.15,-.25])box(.12,.9,.12,'#a4835d',x,.48,z);
 function chair(x,z,rot=0,c='#8aa494'){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rot;root.add(g);rounded(.7,.14,.68,c,0,.62,0,g);rounded(.7,.65,.13,c,0,.98,-.28,g);for(const a of[-.23,.23])for(const b of[-.22,.22])box(.065,.58,.065,'#967a5a',a,.28,b,g);return g;}
 chair(-.05,.5,0);chair(1.6,.5,0);chair(-.05,-1.85,Math.PI);chair(1.6,-1.85,Math.PI);
 rounded(.8,.03,.6,'#faf7e5',.4,1.12,-.5);box(.65,.009,.025,'#b4c5a9',.4,1.145,-.5);cyl(.11,.09,.22,'#b86f51',2,1.21,-.55);
 const laptop=new THREE.Group();laptop.position.set(1.4,1.12,-.9);root.add(laptop);rounded(.65,.035,.44,'#76877b',0,0,0,laptop,.01);rounded(.65,.42,.035,'#73847a',0,.2,-.2,laptop,.015);box(.56,.32,.01,'#c9dfc8',0,.22,-.175,laptop);
 // Desk near the window.
 rounded(2.5,.15,1,'#e6be90',3.5,.96,-2.7);for(const x of[2.5,4.5])box(.1,.9,.7,'#a99070',x,.45,-2.7);chair(3.6,-1.75,0,'#cc9e82');rounded(.9,.55,.08,'#5d7165',3.55,1.43,-2.9);box(.79,.42,.01,'#bdd4c8',3.55,1.43,-2.85);box(.1,.25,.1,'#728376',3.55,1.15,-2.9);rounded(.6,.04,.2,'#ecebda',3.55,1.06,-2.55);
 // Reading nook and small side table.
 rounded(2,.55,.95,'#d9a17d',-4,.4,2.55);rounded(2,.7,.25,'#dca884',-4,.92,2.9);rounded(.25,.6,.95,'#c58e6d',-5,.65,2.55);rounded(.25,.6,.95,'#c58e6d',-3,.65,2.55);rounded(.65,.16,.65,'#eee5c9',-4.5,.75,2.55);cyl(.42,.42,.1,'#d9b78c',-2.5,.65,2.5);cyl(.08,.13,.6,'#ab8b63',-2.5,.3,2.5);cyl(.09,.07,.17,'#faf2dc',-2.5,.8,2.5);
 // Plants, shelves and a small analog clock.
 function plant(x,z,s=1){const p=new THREE.Group();p.position.set(x,0,z);p.scale.setScalar(s);root.add(p);cyl(.3,.22,.5,'#d39f7b',0,.25,0,p);cyl(.27,.27,.035,'#695d43',0,.51,0,p);for(let j=0;j<7;j++){const a=j*2.4;const leaf=sphere(.16,.42,.11,j%2?'#739460':'#92ab76',Math.sin(a)*.2,.8+j%3*.12,Math.cos(a)*.2,p);leaf.rotation.z=Math.sin(a)*.5;leaf.rotation.x=Math.cos(a)*.4;}return p;}
 plant(-4.8,-1.5,1.15);plant(4.65,2.75,1.4);plant(-4.6,-3.5,.85);plant(4.8,-3.25,.8);
 box(.65,.1,1.4,'#bda580',-5.2,1.75,.2);for(let i=0;i<5;i++)box(.36,.4+i%2*.1,.16,['#bb8063','#c3bb84','#7c9d90'][i%3],-5.22,2,.2+i*.18-.35);
 const clock=new THREE.Group();clock.position.set(-5.39,2.25,1.85);clock.rotation.y=Math.PI/2;root.add(clock);const rim=cyl(.3,.3,.06,'#899a7b',0,0,0,clock);rim.rotation.x=Math.PI/2;const face=cyl(.26,.26,.07,'#faf5dc',0,0,.02,clock);face.rotation.x=Math.PI/2;box(.018,.18,.02,'#5d7058',0,.075,.065,clock);const hand=box(.13,.018,.02,'#5d7058',.05,0,.065,clock);hand.rotation.z=-.35;
 // Status board responds to the player's leadership choices.
 const board=new THREE.Group();board.position.set(3.65,0,1.5);board.rotation.y=-.25;root.add(board);for(const x of[-.7,.7])box(.06,2,.06,'#9eaa8d',x,1,0,board);rounded(2.2,1.5,.1,'#fff9e9',0,1.75,0,board,.04);textPlane('LAUNCH REVIEW',1.85,.3,'#6b8064','#fff9e9',0,2.28,.06,board,38);const indicators=[];for(let i=0;i<3;i++){rounded(1.3,.08,.025,'#d7ddc8',.18,1.95-i*.3,.07,board,.01);const dot=sphere(.08,.08,.03,'#88ac69',-.75,1.95-i*.3,.08,board);indicators.push(dot);}
 const entry=cyl(.8,.8,.025,'#cad5af',2.5,.07,2.7);
 function character(x,z,shirt='#77977e',skin='#d8a77f',hairStyle='short',hairColor='#4c3d32'){
  const g=new THREE.Group();g.position.set(x,0,z);root.add(g);const body=new THREE.Group();g.add(body);
  const legL=rounded(.2,.42,.24,'#596d67',-.14,.28,0,body,.06),legR=rounded(.2,.42,.24,'#596d67',.14,.28,0,body,.06);
  rounded(.24,.16,.38,'#f2ebd8',-.14,.1,.055,body,.06);rounded(.24,.16,.38,'#f2ebd8',.14,.1,.055,body,.06);
  const torso=sphere(.36,.42,.25,shirt,0,.79,0,body);const armL=sphere(.115,.28,.12,shirt,-.36,.8,0,body),armR=sphere(.115,.28,.12,shirt,.36,.8,0,body);sphere(.1,.115,.1,skin,-.39,.57,.015,body);sphere(.1,.115,.1,skin,.39,.57,.015,body);
  const head=new THREE.Group();head.position.y=1.4;body.add(head);sphere(.39,.39,.34,skin,0,0,0,head);sphere(.08,.1,.06,skin,-.38,-.02,0,head);sphere(.08,.1,.06,skin,.38,-.02,0,head);
  sphere(.035,.052,.02,'#343c32',-.12,.015,.321,head);sphere(.035,.052,.02,'#343c32',.12,.015,.321,head);sphere(.05,.045,.035,skin,0,-.065,.345,head);sphere(.07,.028,.01,'#cf8c73',-.23,-.08,.285,head);sphere(.07,.028,.01,'#cf8c73',.23,-.08,.285,head);
  const smile=new THREE.Mesh(new THREE.TorusGeometry(.055,.009,6,16,Math.PI),mat('#8a5845'));smile.rotation.z=Math.PI;smile.position.set(0,-.125,.32);head.add(smile);
  const hair=new THREE.Group();head.add(hair);sphere(.4,.21,.34,hairColor,0,.22,-.03,hair);sphere(.24,.12,.14,hairColor,-.14,.24,.23,hair);sphere(.15,.1,.14,hairColor,.17,.27,.23,hair);
  if(hairStyle==='long'){sphere(.41,.43,.2,hairColor,0,-.08,-.24,hair);sphere(.09,.31,.17,hairColor,-.34,-.08,.02,hair);sphere(.09,.31,.17,hairColor,.34,-.08,.02,hair);}
  if(hairStyle==='curly'){for(let j=0;j<10;j++)sphere(.115,.12,.12,hairColor,Math.sin(j*2.4)*.3,.22+Math.cos(j*1.7)*.1,Math.cos(j*2.4)*.26,hair);}
  const badge=rounded(.1,.12,.01,'#f3edc9',.14,.84,.245,body,.01);
  return{g,body,head,torso,armL,armR,legL,legR,phase:Math.random()*6,hairStyle};
 }
 let player=character(2.5,2.7,'#688b72');const sam=character(-1.8,-.5,'#c98f68','#b8835f','curly','#3c342e');sam.g.rotation.y=.7;
 const maya=character(2.35,-2.3,'#a8acc0','#e5bb96','long','#695146');maya.g.rotation.y=.4;
 const extra=character(-3.65,1.5,'#c7b27b','#a87550','short','#37382e');extra.g.rotation.y=-.4;
 const ring=new THREE.Mesh(new THREE.RingGeometry(.49,.55,48),new THREE.MeshBasicMaterial({color:0xfdf5d4,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.08;root.add(ring);
 let playerName='Alex';const tagCanvas=document.createElement('canvas');tagCanvas.width=512;tagCanvas.height=128;const tagCtx=tagCanvas.getContext('2d');const tagTexture=new THREE.CanvasTexture(tagCanvas);tagTexture.colorSpace=THREE.SRGBColorSpace;const tag=new THREE.Sprite(new THREE.SpriteMaterial({map:tagTexture,depthTest:false}));tag.scale.set(2.15,.54,1);tag.renderOrder=10;root.add(tag);
 function setIdentity(name){playerName=name;tagCtx.clearRect(0,0,512,128);tagCtx.fillStyle='#fffcec';tagCtx.beginPath();tagCtx.roundRect(8,12,496,104,52);tagCtx.fill();tagCtx.fillStyle='#35553c';tagCtx.textAlign='center';tagCtx.textBaseline='middle';tagCtx.font='600 38px Arial';tagCtx.fillText(name+' · You',256,66,460);tagTexture.needsUpdate=true;}setIdentity(playerName);
 const raycaster=new THREE.Raycaster(),mouse=new THREE.Vector2();let walkTarget=new THREE.Vector3(2.5,0,2.7);
 let pointerDown=null;renderer.domElement.addEventListener('pointerdown',e=>{pointerDown={x:e.clientX,y:e.clientY};});renderer.domElement.addEventListener('pointerup',e=>{if(!pointerDown||Math.hypot(e.clientX-pointerDown.x,e.clientY-pointerDown.y)>10||!['morning','afternoon'].includes(stage))return;const rect=renderer.domElement.getBoundingClientRect();mouse.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(mouse,camera);const hits=raycaster.intersectObject(floor);if(hits.length){const q=hits[0].point;if(q.z>1.2&&q.x>-1.8&&q.x<4)walkTarget.set(q.x,0,q.z);}});
 function resize(){const w=container.clientWidth,h=container.clientHeight;renderer.setSize(w,h,false);camera.left=-view*w/h/2;camera.right=view*w/h/2;camera.top=view/2;camera.bottom=-view/2;camera.updateProjectionMatrix();}addEventListener('resize',resize);resize();
 const clockTime=new THREE.Clock();let elapsed=0;
 function frame(){const dt=Math.min(clockTime.getDelta(),.05);elapsed+=dt;target.lerp(desiredTarget,reduced?1:.04);view=THREE.MathUtils.lerp(view,desiredView,reduced?1:.04);const a=container.clientWidth/container.clientHeight;camera.left=-view*a/2;camera.right=view*a/2;camera.top=view/2;camera.bottom=-view/2;camera.updateProjectionMatrix();camera.position.copy(target).add(new THREE.Vector3(12,13,16));camera.lookAt(target);
  const diff=walkTarget.clone().sub(player.g.position),distance=diff.length();if(distance>.035){const speed=Math.min(distance,dt*2.3);player.g.position.addScaledVector(diff.normalize(),speed);const angle=Math.atan2(diff.x,diff.z);player.g.rotation.y=angle;player.body.position.y=reduced?0:Math.abs(Math.sin(elapsed*10))*.065;player.armL.rotation.x=Math.sin(elapsed*10)*.35;player.armR.rotation.x=-Math.sin(elapsed*10)*.35;}else{player.g.rotation.y=THREE.MathUtils.lerp(player.g.rotation.y,.48,.06);player.body.position.y=reduced?0:Math.sin(elapsed*2)*.018;player.armL.rotation.x=0;player.armR.rotation.x=0;}
  for(const ch of[sam,maya,extra]){ch.body.position.y=reduced?0:Math.sin(elapsed*1.7+ch.phase)*.018;ch.head.rotation.z=reduced?0:Math.sin(elapsed*.8+ch.phase)*.025;}
  tag.position.copy(player.g.position);tag.position.y=2.1;ring.position.x=player.g.position.x;ring.position.z=player.g.position.z;renderer.render(scene,camera);requestAnimationFrame(frame);
 }frame();onReady?.();
 return{
  identity(name){if(name!==playerName)setIdentity(name);},
  stage(s){stage=s;desiredView=13.8;desiredTarget.set(0,.5,0);if(['choose','intro'].includes(s)){desiredView=5.9;desiredTarget.set(2.5,.7,2.7);walkTarget.set(2.5,0,2.7);}else if(['morning','reaction1','lesson1'].includes(s)){desiredView=11;desiredTarget.set(-.3,.6,.4);walkTarget.set(-.8,0,1.65);}else if(['afternoon','reaction2','lesson2'].includes(s)){desiredView=11;desiredTarget.set(1,.7,.2);walkTarget.set(2.2,0,1.1);maya.g.position.set(2.2,0,-.3);}else if(s==='ending'){desiredView=12.5;desiredTarget.set(.5,.5,.5);walkTarget.set(.6,0,1.8);sam.g.position.set(-.6,0,1.5);maya.g.position.set(1.8,0,1.5);sun.color.set('#ffdab1');}else{walkTarget.set(2.5,0,2.7);sun.color.set('#ffedc1');sam.g.position.set(-1.8,0,-.5);maya.g.position.set(2.35,0,-2.3);indicators.forEach(d=>d.material=mat('#88ac69'));}},
  avatar(type,color){const pos=player.g.position.clone();root.remove(player.g);player=character(pos.x,pos.z,color,type==='woman'?'#dfb28b':type==='neutral'?'#b88560':'#d8a77f',type==='woman'?'long':type==='neutral'?'curly':'short');},
  revealProblems(){indicators.forEach((d,i)=>{d.material=mat(i===1?'#d6ac54':'#ce7d5b');});},
  calm(){indicators[0].material=mat('#ce7d5b');indicators[1].material=mat('#d6ac54');indicators[2].material=mat('#88ac69');}
 };
}

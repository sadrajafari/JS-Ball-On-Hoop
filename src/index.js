import * as THREE from 'three';
//import evaluatex from "evaluatex";


function main(dt, velocity, angle, omega, radius, g, k, equations){
  //console.log(omega)
    const N = 2;
    let r = radius;
    let i;
    let j;
    let h = dt; //this will be delta T between animation
    let t = 0.0;
    let y = [angle,velocity];
    let ynew = [];
    ynew = rk4(y,N,t,h,ynew,omega*3, r,g, k, equations);
    y[0] = ynew[0];
    y[1] = ynew[1];
    return y;
}

function derivs(t,y,dydt,omega,r,g,k, equations){
  //console.log(equations.thetadot);
  //const thetadot = evaluatex(equations.thetadot, {v:y[0],k:k,r:r,g:g,ω:omega,θ:y[1]}, {latex:true});
    dydt[0] = y[1]/r;
    dydt[1] = r*Math.sin(y[0])*(Math.pow(omega, 2)*Math.cos(y[0])-g/r)-k*y[1];
    //console.log(dydt)
    return dydt;
}

function rk4(y,N,x,h,ynew,omega, radius,g,k, equations){
    let h6;
    let hh;
    let xh;
    let dym = [];
    let dyt = [];
    let yt = [];
    let dydx = [];
    let index;
    hh = h*0.5;
    h6 = h/6.0;
    xh=x+hh;
    dydx = derivs(x,y,dydx,omega, radius,g,k, equations);//add stuff
    for (index = 0; index <= N; index++){
        yt[index] = y[index]+hh*dydx[index];
    }
    dyt = derivs(xh,yt,dyt,omega, radius,g,k, equations);
    for (index = 0; index <= N; index++){
        yt[index] = y[index]+hh*dyt[index];
    }
    dym = derivs(xh,yt,dym,omega, radius,g,k, equations);
    for (index = 0; index <= N; index++){
        yt[index] = y[index]+h*dym[index];
        dym[index] = dyt[index]+dym[index];
    }
    dyt = derivs(x+h,yt,dyt,omega, radius,g,k, equations);
    for (index = 0; index <= N; index++){
        ynew[index]=y[index]+h6*(dydx[index]+dyt[index]+2.0*dym[index]);
    }
    for (index = 0; index <= N; index++){
        if (ynew[index] instanceof Number){
            ynew[index] = ynew[index].toFixed(4);
        }
    }
    //console.log(dydx);
    return ynew;
}
export const context = {runloop: false};
export let nextFrame = null;
export function draw(equations) {
  if (nextFrame != null) cancelAnimationFrame(nextFrame);
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});
  //renderer.setSize(window.innerWidth, window.innerHeight);
  const viewSize = canvas.clientWidth;
  const aspectRatio = canvas.clientWidth/canvas.clientHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(25,aspectRatio,near,far);
  //const camera = new THREE.OrthographicCamera(-aspectRatio*viewSize/2,aspectRatio*viewSize/2, viewSize/2,-viewSize/2,near,far)
  camera.position.z = 500;
  

  const scene = new THREE.Scene();

  let radius = Number(document.getElementById("radius").value);
  let tube = 3;
  let radialSegments = 16; 
  let tubularSegments = 81;
  let arc = 2*Math.PI;
  let omega = Number(document.getElementById("omega").value);
  let g = Number(document.getElementById("gravity").value);
  let k  = Number(document.getElementById("friction").value); // Ask about what time constant should do
  let angle =  Number(document.getElementById("theta").value)*Math.PI/180;
  let velocity = Number(document.getElementById("velocity").value);
  let simSpeed = Number(document.getElementById("simSpeed").value);

  //const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const geometryHoop = new THREE.TorusGeometry(100,tube,radialSegments,tubularSegments, arc);
  const materialHoop = new THREE.MeshBasicMaterial({color: 0x44aa88}); 
  const geometryHoop2 = new THREE.TorusGeometry(100,tube*1.05,radialSegments,tubularSegments, arc/2);
  const materialHoop2 = new THREE.MeshBasicMaterial({color: 0x0000FF}); 
  const hoop = new THREE.Mesh(geometryHoop, materialHoop);
  const hoop2 = new THREE.Mesh(geometryHoop2, materialHoop2);
  hoop2.rotation.z = 6.28/4;
  scene.add(hoop);
  scene.add(hoop2);
  const geometryCenter = new THREE.SphereGeometry( 2, 32, 16 );
  const materialCenter = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const center = new THREE.Mesh( geometryCenter, materialCenter );
  scene.add( center );
  
  const geometryBall = new THREE.SphereGeometry( 5, 5,5 );
  const materialBall = new THREE.MeshBasicMaterial( { color: 0xff0000} );
  const ball = new THREE.Mesh( geometryBall, materialBall );

  scene.add( ball );
  let lastTime = 0;
  let firstIteration = true;
  const trailLen = Number(document.getElementById("trailLen").value);
  let balls = [];
  for (let i = 0; i < trailLen; i++) {
    balls.push(new THREE.Mesh( new THREE.SphereGeometry( i/trailLen*5, 5,5 ), new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true, opacity: 0+i/trailLen} )));
  }
  balls.forEach(e=>scene.add(e));
  let prevCords = []; 
  prevCords.length = trailLen; prevCords.fill(0);;
  //let funcID = Math.random();
  let timer = 0;
  renderer.render(scene, camera);
  function render(time){ // find delta t between animations and plug in as h in rk4
    //console.log(funcID);
    if (firstIteration){
      lastTime = time;
      firstIteration = false;
    }
    let dt = ((time - lastTime) *simSpeed/ 1000);//simspeed kinda causes unexpected behavior
    timer += dt;
    lastTime = time;
    let data = main(dt, velocity, angle, omega, radius, g, k, equations);
    angle = data[0];
    velocity = data[1];
    hoop.rotation.y += omega*dt;
    hoop2.rotation.y = hoop.rotation.y;
    let cords = getBallPos(angle+3*Math.PI/2, 100);
    let xyz = {x:cords[0]*Math.cos(hoop.rotation.y), y: cords[1], z: -cords[0]*Math.sin(hoop.rotation.y)};
    ball.position.set(xyz.x,xyz.y,xyz.z);
    prevCords.push([xyz.x,xyz.y,xyz.z]);
    prevCords.shift();
    for (let i = 0; i < trailLen; i++) {
      if (prevCords[i] != 0){
      balls[i].position.set(prevCords[i][0],prevCords[i][1],prevCords[i][2])
    }
    }
    document.getElementById("time").innerHTML = timer.toFixed(3);
    renderer.render(scene,camera);

    nextFrame = requestAnimationFrame(render);
  }
  nextFrame = requestAnimationFrame(render);
  
}
function getBallPos(angle,radius){
  let x = radius*Math.cos(angle);
  let y = radius*Math.sin(angle);
return [x,y];
}






import * as THREE from 'three';
let g = 9.8;
let k = 5.0;

function main(dt, velocity, angle, omega, radius){
  //console.log(omega)
    const N = 2;
    let r = radius/1000;
    let i;
    let j;
    let h = dt; //this will be delta T between animation
    let t = 0.0;
    let y = [angle,velocity];
    let ynew = [];
    ynew = rk4(y,N,t,h,ynew,omega, r);
    y[0] = ynew[0];
    y[1] = ynew[1];
    //console.log(angle)
    return y;
}

function derivs(t,y,dydt,omega,r){
    dydt[0] = y[1]/r;
    dydt[1] = r*Math.sin(y[0])*(Math.pow(omega, 2)*Math.cos(y[0])-g/r)-k*y[1];
    //console.log(dydt)
    return dydt;
}

function rk4(y,N,x,h,ynew,omega, radius){
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
    dydx = derivs(x,y,dydx,omega, radius);//add stuff
    for (index = 0; index <= N; index++){
        yt[index] = y[index]+hh*dydx[index];
    }
    dyt = derivs(xh,yt,dyt,omega, radius);
    for (index = 0; index <= N; index++){
        yt[index] = y[index]+hh*dyt[index];
    }
    dym = derivs(xh,yt,dym,omega, radius);
    for (index = 0; index <= N; index++){
        yt[index] = y[index]+h*dym[index];
        dym[index] = dyt[index]+dym[index];
    }
    dyt = derivs(x+h,yt,dyt,omega, radius);
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

export function draw() {

  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});
  const viewSize = canvas.clientWidth;
  const aspectRatio = canvas.clientWidth/canvas.clientHeight;
  const near = -1000;
  const far = 1000;
  const camera = new THREE.OrthographicCamera(-aspectRatio*viewSize/2,aspectRatio*viewSize/2, viewSize/2,-viewSize/2,near,far)
  camera.position.z = 100;

  const scene = new THREE.Scene();

  let radius = Number(document.getElementById("radius").value);
  let tube = Number(document.getElementById("tube").value);
  let radialSegments = Number(document.getElementById("radialSegments").value); 
  let tubularSegments = Number(document.getElementById("tubularSegments").value);
  let arc = Number(document.getElementById("arc").value);
  let omega = Number(document.getElementById("omega").value);

  //const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const geometryHoop = new THREE.TorusGeometry(radius,tube,radialSegments,tubularSegments, arc);
  const materialHoop = new THREE.MeshBasicMaterial({color: 0x44aa88}); 
  const geometryHoop2 = new THREE.TorusGeometry(radius,tube*1.05,radialSegments,tubularSegments, arc/2);
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

  let angle = 4.7;
  let lastTime = 0;
  let firstIteration = true;
  let velocity = 0.0;
  renderer.render(scene, camera);
  function render(time){ // find delta t between animations and plug in as h in rk4
    if (firstIteration){
      lastTime = time;
      firstIteration = false;
    }
    let dt = (time - lastTime) / 1000;
    lastTime = time;
    //console.log(dt);
    let data = main(dt, velocity, angle, omega, radius);
    angle = data[0];
    velocity = data[1];
    //console.log(velocity);
    hoop.rotation.y += omega*dt;
    hoop2.rotation.y = hoop.rotation.y;
    let cords = getBallPos(angle, radius);
    ball.position.set(cords[0]*Math.cos(hoop.rotation.y),cords[1], -cords[0]*Math.sin(hoop.rotation.y))
    renderer.render(scene,camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
function getBallPos(angle,radius){
  let x = radius*Math.cos(angle);
  let y = radius*Math.sin(angle);
return [x,y];
}





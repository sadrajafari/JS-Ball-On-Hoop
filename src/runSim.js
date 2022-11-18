
import * as THREE from 'three';
import {drawTheta, drawVelocity} from "./makeGraphs.js";
import {updateVals, getGraphData} from "./rk4functions.js";

export const context = {runloop: false};
export let nextFrameStatic = null;
export let nextFrameVariable = null;



export function draw(equations, useEval, thetaDivId, velocityDivId, ) {


    if (useEval){
        if (nextFrameVariable != null) cancelAnimationFrame(nextFrameVariable);
    } else{
        if (nextFrameStatic != null) cancelAnimationFrame(nextFrameStatic);
        }
    
  let canvas;
  if (useEval){
    canvas = document.querySelector('#c');
    } else {
    canvas = document.querySelector('#c2'); 
    }
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setClearColor( 0xffffff, 0);
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



  const geometryHoop = new THREE.TorusGeometry(100,tube,radialSegments,tubularSegments, arc);
  const materialHoop = new THREE.MeshBasicMaterial({color: 0x44aa88}); 
  const geometryHoop2 = new THREE.TorusGeometry(100,tube*1.05,radialSegments,tubularSegments, arc/2);
  //const materialHoop2 = new THREE.MeshBasicMaterial({color: 0x0000FF}); 
  const hoop = new THREE.Mesh(geometryHoop, materialHoop);
  //const hoop2 = new THREE.Mesh(geometryHoop2, materialHoop2);
  //hoop2.rotation.z = 6.28/4;
  scene.add(hoop);
  //scene.add(hoop2);
  const geometryCenter = new THREE.SphereGeometry( 2, 32, 16 );
  const materialCenter = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const center = new THREE.Mesh( geometryCenter, materialCenter );
  scene.add( center );
  const geometryBall = new THREE.SphereGeometry( 5, 5,5 );
  const materialBall = new THREE.MeshBasicMaterial( { color: 0xff0000} );
  const ball = new THREE.Mesh( geometryBall, materialBall );
  scene.add( ball );




  const trailLen = Number(document.getElementById("trailLen").value);
  let balls = [];
  let ballsCords = [];
  for (let i = 0; i < trailLen; i++) {
    balls.push(new THREE.Mesh( new THREE.SphereGeometry( i/trailLen*5, 5,5 ), new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true, opacity: 0+i/trailLen} )));
    ballsCords.push(0);
  }
  balls.forEach(e=>scene.add(e));
  let prevCords = []; 
  prevCords.length = trailLen; prevCords.fill(0);;
  //let funcID = Math.random();

  let shouldGraph = true;
  let graphTimer = 0;
  let graphUpdateInterval = Number(document.getElementById("graphint").value);
  let graphLen = Number(document.getElementById("graphlen").value);
  let project = document.getElementById("projection").checked;
  let graphData = getGraphData(graphUpdateInterval, velocity, angle, omega, radius, g, k, equations, useEval, graphLen, window.evaluatex);
  if (thetaDivId === "variableSim-theta"){
  drawTheta(graphData, graphLen, thetaDivId, "inputed");
  drawVelocity(graphData, graphLen, velocityDivId, "inputed");
} else{
  drawTheta(graphData, graphLen, thetaDivId, "actual");
  drawVelocity(graphData, graphLen, velocityDivId, "actual");

}

  let timer = 0;
  let lastTime = 0;
  let firstIteration = true;
  renderer.render(scene, camera);
  function render(time){ // find delta t between animations and plug in as h in rk4
    //console.log(funcID);
    if (firstIteration){
      lastTime = time;
      firstIteration = false;
    }
    graphTimer += (time - lastTime)/1000;
    let dt = ((time - lastTime) *simSpeed/ 1000);//simspeed kinda causes unexpected behavior
    timer += dt;
    lastTime = time;
    let data = updateVals(dt, velocity, angle, omega, radius, g, k, equations, useEval);
    angle = data[0];
    if (project){
      ballsCords.push(angle);
      ballsCords.shift();
    }
    angle = angle%(2*Math.PI);
    if (angle < 0){
      angle = 2*Math.PI - Math.abs(angle)
    }
    velocity = data[1];
    hoop.rotation.y += omega*dt;
    //hoop2.rotation.y = hoop.rotation.y;
    let cords = getBallPos(angle+3*Math.PI/2, 100);
    let xyz = {x:cords[0]*Math.cos(hoop.rotation.y), y: cords[1], z: -cords[0]*Math.sin(hoop.rotation.y)};
    ball.position.set(xyz.x,xyz.y,xyz.z);
    prevCords.push([xyz.x,xyz.y,xyz.z]);
    prevCords.shift();
    for (let i = 0; i < trailLen; i++) {
      if (prevCords[i] != 0){
        if (project){
          let tempCord = getBallPos(ballsCords[i]+3*Math.PI/2, 100);
          balls[i].position.set(tempCord[0]*Math.cos(hoop.rotation.y),  tempCord[1],  -tempCord[0]*Math.sin(hoop.rotation.y))
        } else {
      balls[i].position.set(prevCords[i][0],prevCords[i][1],prevCords[i][2])
      }
    }
    }
    
    document.getElementById("time").innerHTML = timer.toFixed(3);
    renderer.render(scene,camera);

    if (useEval){
        nextFrameVariable = requestAnimationFrame(render);
    } else{
        nextFrameStatic = requestAnimationFrame(render);
        }
    
  }
  if (useEval){
    nextFrameVariable = requestAnimationFrame(render);
} else{
    nextFrameStatic = requestAnimationFrame(render);
    }
  
}
function getBallPos(angle,radius){
  let x = radius*Math.cos(angle);
  let y = radius*Math.sin(angle);
return [x,y];
}


import * as THREE from 'three';

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

  //const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const geometryHoop = new THREE.TorusGeometry(radius,tube,radialSegments,tubularSegments, arc);
  const materialHoop = new THREE.MeshBasicMaterial({color: 0x44aa88, opacity: 0.5, transparent: true}); 
  const hoop = new THREE.Mesh(geometryHoop, materialHoop);
  scene.add(hoop);
  const geometryCenter = new THREE.SphereGeometry( 2, 32, 16 );
  const materialCenter = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const center = new THREE.Mesh( geometryCenter, materialCenter );
  scene.add( center );

  let angle = 270;
  const geometryBall = new THREE.SphereGeometry( 5, 32, 16 );
  const materialBall = new THREE.MeshBasicMaterial( { color: 0xff0000} );
  const ball = new THREE.Mesh( geometryBall, materialBall );
  scene.add( ball );



  renderer.render(scene, camera);
  function render(time){
    hoop.rotation.y += .01;
    angle++;
    let cords = getBallPos(angle, radius);
    ball.position.set(cords[0]*Math.cos(hoop.rotation.y),cords[1],0)
    renderer.render(scene,camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
function getBallPos(angle,radius){
  let x = radius*Math.cos(angle*Math.PI/180);
  let y = radius*Math.sin(angle*Math.PI/180);
return [x,y];
}





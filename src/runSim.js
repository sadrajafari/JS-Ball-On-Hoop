
import * as THREE from 'three';
import * as d3 from "https://cdn.skypack.dev/d3@7";


export const context = {runloop: false};
export let nextFrameStatic = null;
export let nextFrameVariable = null;

function updateVals(dt, velocity, angle, omega, radius, g, k, equations, useEval){
    //console.log(omega)
      const N = 2;
      let r = radius;
      let i;
      let j;
      let h = dt; //this will be delta T between animation
      let t = 0.0;
      let y = [angle,velocity];
      let ynew = [];
      ynew = rk4(y,N,t,h,ynew,omega, r,g, k, equations, useEval);
      y[0] = ynew[0];
      y[1] = ynew[1];
      return y;
    }


 function getGraphData(dt, velocity, angle, omega, radius, g, k, equations, useEval, graphLen){
    
    const N = 2;
      let r = radius;
      let i;
      let j;
      let h = dt; 
      let t = 0.0;
      let y = [angle,velocity];
      let ynew = [angle,velocity];
      let graphVals = [];

    for (i = 0; i <= graphLen*100; i++){
        graphVals.push([t,ynew[0],ynew[1]])
        //console.log([t,y[0],y[1]]);
        ynew = rk4(y,N,t,h,ynew,omega, radius,g,k, equations, useEval);
        y[0] = ynew[0];
        y[1] = ynew[1];
        t = t + h;
        //console.log(ynew);
        
    }
    return graphVals;
}
  
  function derivsEval(t,y,dydt,omega,r,g,k, equations){
    try{
      const thetadot = window.evaluatex(equations.thetadot, {k:k,r:r,g:g,o:omega}, {latex:true});
      dydt[0]= thetadot({v:y[1],t:y[0]});
      } catch (err){
        //console.log(err);
        document.getElementById("equations-label").innerHTML="Type equations below:, (use o for ω, use t for θ): [BAD OR NO EQUATION INPUTED, PLEASE FIX]";
      }
    
  
    try{
      const velocitydot = window.evaluatex(equations.velocitydot, {k:k,r:r,g:g,o:omega}, {latex:true});
      dydt[1]= velocitydot({v:y[1],t:y[0]});
    } catch(err){
      document.getElementById("equations-label").innerHTML="Type equations below:, (use o for ω, use t for θ): [BAD OR NO EQUATION INPUTED, PLEASE FIX]";
    }
    
  
    
      return dydt;
  }

  function derivs(t,y,dydt,omega,r,g,k){
    //console.log(`${y} - ${dydt} - ${omega} - ${r} - ${g} - ${k}`);
      dydt[0] = y[1]/r;
      dydt[1] = r*Math.sin(y[0])*(Math.pow(omega, 2)*Math.cos(y[0])-g/r)-k*y[1];
      return dydt;
  }
  
  function rk4(y,N,x,h,ynew,omega, radius,g,k, equations, useEval){
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
      dydx = useEval ?  derivsEval(x,y,dydx,omega, radius,g,k, equations) : derivs(x,y,dydx,omega, radius,g,k) ;//add stuff
      
      for (index = 0; index <= N; index++){
          yt[index] = y[index]+hh*dydx[index];
      }
      dyt = useEval ?  derivsEval(xh,yt,dyt,omega, radius,g,k, equations) : derivs(xh,yt,dyt,omega, radius,g,k) ;
      
      for (index = 0; index <= N; index++){
          yt[index] = y[index]+hh*dyt[index];
      }
      dym = useEval ?  derivsEval(xh,yt,dym,omega, radius,g,k, equations) : derivs(xh,yt,dym,omega, radius,g,k);
      
      for (index = 0; index <= N; index++){
          yt[index] = y[index]+h*dym[index];
          dym[index] = dyt[index]+dym[index];
      }
      dyt = useEval ? derivsEval(x+h,yt,dyt,omega, radius,g,k, equations) : derivs(x+h,yt,dyt,omega, radius,g,k) ;
      
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
  drawTheta(graphData, graphLen, thetaDivId);
  drawVelocity(graphData, graphLen, velocityDivId);


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
    hoop2.rotation.y = hoop.rotation.y;
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

function drawTheta(globalData,graphLen,divID){
  
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
  const svg = d3.select(`#${divID}`)
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
  //Read the data
  
      // Add X axis --> it is a date format
      const x = d3.scaleLinear()
        .domain([0,graphLen])
        .range([ 0, width]);
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
  
      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, 6.28])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y));
  
      
  
      // Add the line
      svg
        .append("path")
        .datum(globalData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x(d[0]) })
          .y(function(d) { return y(d[1]) })
          )
      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height/2))
      .attr("y", -30)
      .style("text-anchor", "middle")
      .style("font-size", "30px")
      .text("θ")
  
      svg.append("text")
      .attr("transform", "translate(" + (width/2) + "," + (height + 30) + ")")
      .style("text-anchor", "middle")
      .text("Time (s)")
  
      svg.append("text")
      .attr("x", (height/2))
      .attr("y", 20)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text("Theta over Time: Inputed Equation")
          if (globalData[globalData.length-1][0] > graphLen){
            return false;
          }
        return true;
  }
  
  
  export function drawVelocity(globalData,graphLen,divID){
    
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
  const svg = d3.select(`#${divID}`)
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
  //Read the data
  
      // Add X axis --> it is a date format
      const x = d3.scaleLinear()
        .domain([0,graphLen])
        .range([ 0, width]);
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
  
      // Add Y axis
      const y = d3.scaleLinear()
        .domain([-10, 10])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y));
  
      
  
      // Add the line
      svg
        .append("path")
        .datum(globalData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x(d[0]) })
          .y(function(d) { return y(d[2]) })
          )
  
          svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height/2))
      .attr("y", -30)
      .style("text-anchor", "middle")
      .style("font-size", "30px")
      .text("Velocity")
  
      svg.append("text")
      .attr("transform", "translate(" + (width/2) + "," + (height + 30) + ")")
      .style("text-anchor", "middle")
      .text("Time (s)")
  
      svg.append("text")
      .attr("x", (height/2))
      .attr("y", 20)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text("Velocity over Time: Inputed Equation")
  
          if (globalData[globalData.length-1][0] > graphLen){
            return false;
          }
        return true;
  }
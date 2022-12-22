t = document.getElementById("vars");
vars = {r:{val: ".1", id: "radius", name: "r", type: "text"},
 g:{val: "9.8", id: "gravity", name: "g", type: "text"},
  k:{val: "5.0", id: "friction", name: "k", type: "text"},
   theta:{val: "5.0", id: "theta", name: "θ", type: "text"},
    v:{val: "0.6", id: "velocity", name: "v", type: "text"},
     omega:{val: "20", id: "omega", name: "ω", type: "text"},
      simSpeed:{val: "0.3", id: "simSpeed", name: "simulation speed", type: "text"},
       graphUpdateInterval:{val: ".005", id: "graphint", name: "graph update interval", type: "text"},
       graphLen:{val: "5", id: "graphlen", name: "graph record length (s)", type: "text"},
       project:{val: "true", id: "projection", name: "Project trail on hoop?", type: "checkbox"},
       graphWrap:{val: "true", id: "wrap", name: "graph theta beyond 0-6.28", type: "checkbox"},
       trailLen:{val: "100", id: "trailLen", name: "trail length", type: "text"}

    };

html = "<table>";
for (const [key, value] of Object.entries(vars)) {
  html += `<tr><td class = 'varCol'>${value.id} (${value.name}): </td><td><input type=${value.type} id=${value.id} name=${value.name} value=${value.val} onBlur ="refresh()"></td>`;
}
html += "</table>";
t.innerHTML = html;
document.getElementById("projection").checked = true;
document.getElementById("wrap").checked = true;
window.play = true;
// graphs = {thetaInput:{loc:"variableSim-theta",width:300,height:300,top:10,bottom:30,right:30,left:60,yDataIndex:1,xDomain:[],xRange:[],yDomain,yRange:[],title:"",xLabel:"",yLabel:""},
// thetaActual:{loc:"staticSim-theta"},//if values such as graphLen are changed, how are they supposed to change the graph? will the graph only be partially made and finished later? 
// velocityInput:{loc:"variableSim-velocity"},
// velocityActual:{loc:"staticSim-velocity"}}
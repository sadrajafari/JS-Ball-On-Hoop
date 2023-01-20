document.getElementById("variableSim-theta").style.display = "none"
document.getElementById("variableSim-velocity").style.display = "none"

function changeId() {
  ((document.getElementById("staticSim-velocity").style.display != "none") && (document.getElementById("type2").checked == true)) ?
    ((document.getElementById("variableSim-theta").style.display = "block") && (document.getElementById("variableSim-velocity").style.display = "block"))
    && (document.getElementById("staticSim-velocity").style.display = "none") && (document.getElementById("staticSim-theta").style.display = "none") && (document.getElementById("type1").checked == false) :

    ((document.getElementById("variableSim-theta").style.display != "none") && (document.getElementById("type1").checked == true)) ?
      ((document.getElementById("staticSim-velocity").style.display = "block") && (document.getElementById("staticSim-theta").style.display = "block"))
      && (document.getElementById("variableSim-theta").style.display = "none") && (document.getElementById("variableSim-velocity").style.display = "none") && (document.getElementById("type2").checked == false)
      : null
}

document.getElementById("defaultEquation").style.display = "none"

function defEqu() {
  document.getElementById("equation").checked ? ((document.getElementById("defaultEquation").style.display = "block") && (document.getElementById("enterEquation").style.display = "none")) :
  ((document.getElementById("defaultEquation").style.display = "none") && (document.getElementById("enterEquation").style.display = "block"))
}



// document.getElementById("math-field").innerHTML = "\\frac v r"
// document.getElementById("math-field2").innerHTML = "\\frac v r"




document.getElementById("radius").value = .1
document.getElementById("rr").value = .1
document.getElementById("gravity").value = 9.8
document.getElementById("gr").value = 9.8
document.getElementById("friction").value = 5.0
document.getElementById("fr").value = 5.0
document.getElementById("theta").value = 5.0
document.getElementById("thr").value = 5.0
document.getElementById("velocity").value = .6
document.getElementById("vr").value = .6
document.getElementById("omega").value = 20
document.getElementById("or").value = 20
document.getElementById("simSpeed").value = .3
document.getElementById("sr").value = .3
document.getElementById("graphint").value = .005
document.getElementById("ghr").value = .005
document.getElementById("graphlen").value = 5
document.getElementById("glr").value = 5
document.getElementById("trailLen").value = 100
document.getElementById("tlr").value = 100
// };
// console.log(varss)
// vars = {
//     r: { val: ".1", id: "radius", name: "r", type: "text" },
//     g: { val: "9.8", id: "gravity", name: "g", type: "text" },
//     k: { val: "5.0", id: "friction", name: "k", type: "text" },
//     theta: { val: "5.0", id: "theta", name: "θ", type: "text" },
//     v: { val: "0.6", id: "velocity", name: "v", type: "text" },
//     omega: { val: "20", id: "omega", name: "ω", type: "text" },
//     simSpeed: { val: "0.3", id: "simSpeed", name: "simulation speed", type: "text" },
//     graphUpdateInterval: { val: ".005", id: "graphint", name: "graph update interval", type: "text" },
//     graphLen: { val: "5", id: "graphlen", name: "graph record length (s)", type: "text" },
//     project: { val: "true", id: "projection", name: "Project trail on hoop?", type: "checkbox" },
//     graphWrap: { val: "true", id: "wrap", name: "graph theta beyond 0-6.28", type: "checkbox" },
//     trailLen: { val: "100", id: "trailLen", name: "trail length", type: "text" }
  
//   };
//   console.log(vars)

// html = "<table>";
// for (const [key, value] of Object.entries(vars)) {
//   html += `<tr><td class = 'varCol'>${value.id} (${value.name}): </td><td><input type=${value.type} id=${value.id} name=${value.name} value=${value.val} onBlur ="refresh()"></td>`;
// }
// html += "</table>";
// t.innerHTML = html;
document.getElementById("projection").checked = true;
document.getElementById("wrap").checked = true;
window.play = true;
// graphs = {thetaInput:{loc:"variableSim-theta",width:300,height:300,top:10,bottom:30,right:30,left:60,yDataIndex:1,xDomain:[],xRange:[],yDomain,yRange:[],title:"",xLabel:"",yLabel:""},
// thetaActual:{loc:"staticSim-theta"},//if values such as graphLen are changed, how are they supposed to change the graph? will the graph only be partially made and finished later? 
// velocityInput:{loc:"variableSim-velocity"},
// velocityActual:{loc:"staticSim-velocity"}}
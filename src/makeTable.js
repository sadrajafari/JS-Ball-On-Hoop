t = document.getElementById("vars");
vars = {r:{val: ".1", id: "radius", name: "radius", type: "text"},
 g:{val: "9.8", id: "gravity", name: "g", type: "text"},
  k:{val: "5.0", id: "friction", name: "k", type: "text"},
   theta:{val: "5.0", id: "theta", name: "θ", type: "text"},
    v:{val: "0.6", id: "velocity", name: "v", type: "text"},
     omega:{val: "11", id: "omega", name: "ω", type: "text"},
      simSpeed:{val: "0.3", id: "simSpeed", name: "simulation speed", type: "text"},
       graphUpdateInterval:{val: ".005", id: "graphint", name: "graph update interval", type: "text"},
       graphLen:{val: "5", id: "graphlen", name: "graph record length (s)", type: "text"},
       project:{val: "true", id: "projection", name: "Project trail on hoop?", type: "checkbox"},
       trailLen:{val: "20", id: "trailLen", name: "trail length", type: "text"}
    };

html = "<table>";
for (const [key, value] of Object.entries(vars)) {
  html += `<tr><td>${value.name}: </td><td><input type=${value.type} id=${value.id} name=${value.name} value=${value.val} onBlur ="refresh()"></td>`;
}
html += "</table>";
t.innerHTML = html;
document.getElementById("projection").checked = true;
window.play = true;
graphs = {thetaInput:{},thetaActual:{},velocityInput:{},velocityActual:{}}
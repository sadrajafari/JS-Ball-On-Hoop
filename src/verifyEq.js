
export function verifyEq(equation){
    let omega = Number(document.getElementById("omega").value);
    let g = Number(document.getElementById("gravity").value);
    let k  = Number(document.getElementById("friction").value); // Ask about what time constant should do
    let angle =  Number(document.getElementById("theta").value)*Math.PI/180;
    let velocity = Number(document.getElementById("velocity").value);
    let radius = Number(document.getElementById("radius").value);
    let result;

    try{
      const eq = window.evaluatex(equation, {k:k,r:radius,g:g,o:omega}, {latex:true});
      result = eq({v:velocity,t:angle});
    } catch (err){
        document.getElementById("error-output").innerHTML="[BAD OR NO EQUATION INPUTED]";
        return [false,equation];
    }
    return [true, equation];
}


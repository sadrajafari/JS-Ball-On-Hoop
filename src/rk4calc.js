
const fs = require('fs');
let g = 9.8;
let k = 5.0;
let r = 0.1;
let omega = 20.0;
let pi = 3.1415926535;

function main(){
    
    const N =2;
    let i;
    let j;
    let h = 0.01;
    let t = 0.0;
    let y = [0.5,0.0];
    let ynew = [];


    let valid;
    fs.open('output.csv','w',function (err, f) {
        //console.log('Saved!');
      });
    fs.appendFile('output.csv', 't,theta,v\n',function (err, f) {
        //console.log('Saved!');
      });
    for (i = 0; i <= 200; i++){
        fs.appendFileSync('output.csv', `${t.toFixed(4)},${y[0].toFixed(4)},${y[1].toFixed(4)}\n`,function (err, f) {
            //console.log('Saved!');
          });
        valid = true;
        ynew = rk4(y,N,t,h,ynew);
        
        if (valid){
            for(j = 0; j<=N; j++){
                y[j] = ynew[j];
            }
            t = t + h;
        }
    }
}

function derivs(t,y,dydt){
    dydt[0] = y[1]/r;
    dydt[1] = r*Math.sin(y[0])*(Math.pow(omega, 2)*Math.cos(y[0])-g/r)-k*y[1];
    return dydt;
}

function rk4(y,N,x,h,ynew){
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
    dydx = derivs(x,y,dydx);//add stuff
    for (index = 0; index <= N; index++){
        yt[index] = y[index]+hh*dydx[index];
    }
    dyt = derivs(xh,yt,dyt);
    for (index = 0; index <= N; index++){
        yt[index] = y[index]+hh*dyt[index];
    }
    dym = derivs(xh,yt,dym);
    for (index = 0; index <= N; index++){
        yt[index] = y[index]+h*dym[index];
        dym[index] = dyt[index]+dym[index];
    }
    dyt = derivs(x+h,yt,dyt);
    for (index = 0; index <= N; index++){
        ynew[index]=y[index]+h6*(dydx[index]+dyt[index]+2.0*dym[index]);
    }
    for (index = 0; index <= N; index++){
        if (ynew[index] instanceof Number){
            ynew[index] = ynew[index].toFixed(4);
        }
    }
    return ynew;
}
main();
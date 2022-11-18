import * as d3 from "https://cdn.skypack.dev/d3@7";


export function drawTheta(globalData,graphLen,divID,type){
  
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 300 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;
  
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
      .style("font-size", "20px")
      .text("θ")
  
      svg.append("text")
      .attr("transform", "translate(" + (width/2) + "," + (height + 30) + ")")
      .style("text-anchor", "middle")
      .text("Time (s)")
  
      svg.append("text")
      .attr("x", (height/2.5))
      .attr("y", 20)
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .text(`Theta over Time: ${type} eqn`)
  }
  
  
  export function drawVelocity(globalData,graphLen,divID,type){
    
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 300 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;
  
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
      .style("font-size", "19px")
      .text("Velocity")
  
      svg.append("text")
      .attr("transform", "translate(" + (width/2) + "," + (height + 30) + ")")
      .style("text-anchor", "middle")
      .text("Time (s)")
  
      svg.append("text")
      .attr("x", (height/2.5))
      .attr("y", 20)
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .text(`Velocity over Time: ${type} eqn`)
  }


// Global variables
var dimensions = {x: 60, y:30}
var gridSize = .25
var increment = gridSize/2
var floorH = 3

// Create a colored grid of results.
var svgWidth = 960
var svgHeight = 400
var padding = {top: 10, left:100, right:100}
var cellDim = parseInt((svgWidth - padding.left - padding.right)/dimensions.x)

// Create a grid of points
var svg = d3.select("#content").append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

var pointGrid = []
var dataset = []
for (var i = 0; i < dimensions.x; i++) {
  for (var j = 0; j < dimensions.y; j++) {
  	pointGrid.push({x:(i*gridSize)+increment, y:-(j*gridSize)-increment, z:floorH})
    svg.append("rect")
    	.attr("x", padding.left + cellDim*i)
      .attr("y", padding.top + cellDim*j)
      .attr("width", cellDim)
      .attr("height", cellDim)
      .attr('fill', 'red')
      .style("stroke", "#000")
      .style("stroke-width", "0.05em");
  }
}

// Create the facade graphic
var facadeSvg = d3.select("#content").append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

facadeSvg.append("rect")
  .attr("x", padding.left)
  .attr("y", padding.top)
  .attr("width", (cellDim*dimensions.x))
  .attr("height", (cellDim*15))
  .attr('fill', '#b5b5b5')
  .style("stroke-width", "0.05em");


// Get inputs
var Alt = parseFloat($("#alt").val()); // Altitude
var Az = parseFloat($("#az").val()); // Azimuth
var Width = parseFloat($("#width").val());
var Height = parseFloat($("#height").val());
var WX = parseFloat($("#wx").val());
var WY = parseFloat($("#wy").val());

// Update the displayed altitude and azimuth
$("#alt").on("input", function(event) {
  Alt = parseFloat($(this).val());
  $("#altoutput").text(Alt.toString() + '°');
  sunVec = polarToCartesian(Az, Alt, 1);
  updateData();
  updateChart();
});
$("#az").on("input", function(event) {
  Az = parseFloat($(this).val());
  $("#azoutput").text(Az.toString() + '°');
  sunVec = polarToCartesian(Az, Alt, 1);
  updateData();
  updateChart();
});
$("#width").on("input", function(event) {
  Width = parseFloat($(this).val());
  $("#widthoutput").text(Width.toString());
  lines = updateWindowDim()
  updateData();
  updateChart();
});
$("#height").on("input", function(event) {
  Height = parseFloat($(this).val());
  $("#heightoutput").text(Height.toString());
  lines = updateWindowDim()
  updateData();
  updateChart();
});
$("#wx").on("input", function(event) {
  WX = parseFloat($(this).val());
  $("#xoutput").text(WX.toString());
  lines = updateWindowDim()
  updateData();
  updateChart();
});
$("#wy").on("input", function(event) {
  WY = parseFloat($(this).val());
  $("#youtput").text(WY.toString());
  lines = updateWindowDim()
  updateData();
  updateChart();
});


// Window dimensions
function updateWindowDim(){
  var windowDim = [{x:WX, y:WY}, {x:WX+Width, y:WY+Height}]
  var linex = [[windowDim[0].x, -dimensions.y*gridSize], [windowDim[1].x, -dimensions.y*gridSize]]
  var liney = [[-dimensions.y*gridSize, windowDim[0].y], [-dimensions.y*gridSize, windowDim[1].y]]

  facadeSvg.selectAll('.window').remove();
  facadeSvg.append("rect")
    .attr("x", padding.left + (cellDim*WX)/gridSize)
    .attr("y", padding.top + (cellDim*15) - (cellDim*WY) - (cellDim*Height))
    .attr("width", cellDim*Width*(1/gridSize))
    .attr("height", cellDim*Height)
    .attr('fill', "#bee9ee")
  	.attr("class", "window");

  return [linex, liney]
}


// Convert degrees to radians.
var RAD2DEG = 180 / Math.PI
var DEG2RAD = Math.PI / 180

// Convert sphereical to cartesian.
function polarToCartesian( lon, lat, radius ) {
  var phi = ( 90 - lat ) * DEG2RAD
	var theta = ( -lon ) * DEG2RAD

  return {
    x: -(radius * Math.sin(phi) * Math.sin(theta)),
    y: radius * Math.sin(phi) * Math.cos(theta),
    z: radius * Math.cos(phi),
  }
}

// 2D Vector Math
function subtract(a, b){
  return [a[0]-b[0], a[1]-b[1]];
}
function dotProduct(a, b){
  return a[0] * b[0] + a[1] * b[1];
}
function crossProduct(a, b){
  return a[0] * b[1] - b[0] * a[1]
}


// Check for intersection of ray and line.
function rayLineIntersect(rayOrigin, rayDirection, point1, point2){
  v1 = subtract(rayOrigin, point1);
  v2 = subtract(point2, point1);
  v3 = [-rayDirection[1], rayDirection[0]];

  dot = dotProduct(v2, v3);
  if (Math.abs(dot) < 0.000001) {
    return false;
  }

  t1 = (crossProduct(v2, v1)) / dot;
  t2 = dotProduct(v1,v3) / dot;

  if (t1 >= 0.0 && (t2 >= 0.0 && t2 <= 1.0)){
    return true;
  }

  return false;
}


// Perform intersection calculation.
var sunVec = polarToCartesian(Az, Alt, 1)

function updateData(){
	xySunVec = [sunVec.x, sunVec.y]
  yzSunVec = [sunVec.y, sunVec.z]
  dataset = []
  for (var i = 0; i < pointGrid.length; i++) {
    rayOriginxy = [pointGrid[i].x,pointGrid[i].y]
    rayOriginyz = [pointGrid[i].y,pointGrid[i].z]
    xyIntersect = rayLineIntersect(rayOriginxy, xySunVec, lines[0][0], lines[0][1])
    yzIntersect = rayLineIntersect(rayOriginyz, yzSunVec, lines[1][0], lines[1][1])
    if (xyIntersect == true && yzIntersect == true){
    	dataset.push(true)
    } else {
      dataset.push(false)
    }
  }
}


function updateChart() {
  svg.selectAll('rect')
    .data(dataset)
    .attr('fill', function(d){if(d == true){return 'red'}else{return 'blue'}})
}

var lines = updateWindowDim()
updateData()
updateChart()

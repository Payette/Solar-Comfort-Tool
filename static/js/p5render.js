d3.select("#visualization").append('svg')
var vis = d3.select("svg")
var arr = d3.range(13)
var ColorScaleArray = [];

//position scale
var xScale = d3.scale.linear().domain([0, 13]).range([0,240])

//The mystical polylinear color scale
var colorScale = d3.scale.linear().domain([0, 6, 13])
    .range([d3.rgb(255,255,255,200), d3.rgb(226,112,106,200), d3.rgb(137,49,50,200)])

vis.selectAll('rect').data(arr).enter()
    .append('rect')
    .attr({
        fill: function(d) { ColorScaleArray.push(d3.rgb(colorScale(d))); return colorScale(d)}
    });

let GridHtSlider, SunRotationSlider;
let cnv;

function setup() {
  cnv = createCanvas(800,500);
   // Move the canvas so it’s inside our <div id="sketch-holder">.
  cnv.parent('sketch');
  noStroke();
  angleMode(RADIANS);
}


function draw() {
    clear();
    background(255);
	
	text("Hours of the Day in Direct Sun",500,12);
    push();

    for (let i = 0; i < ColorScaleArray.length; i++){
      fill(ColorScaleArray[i].r,ColorScaleArray[i].g,ColorScaleArray[i].b);
      strokeWeight(1);
      stroke(0);
      rect(500+(i*20),20,20,13);
    }
    for (let i = 0; i < ColorScaleArray.length; i=i+2){
      textSize(10);
      text(i,505+(i*20), 50);
    }
    pop();

    let Hour = 10.5; // NOT CURRENTLY USED

    let Lon = document.getElementById("long").value;
    document.getElementsByName("long")[0].addEventListener('change', reload);

    let Lat = document.getElementById("lat").value;
    document.getElementsByName("lat")[0].addEventListener('change', reload);

    let TimeZone = document.getElementById("timeZone").value;
    document.getElementsByName("timeZone")[0].addEventListener('change', reload);


    let Day = document.getElementById("day").value;
    document.getElementsByName("day")[0].addEventListener('change', reload);

    let Month = document.getElementById("mon").value;
    document.getElementsByName("mon")[0].addEventListener('change', reload);

    let timestep = document.getElementById("timeStep").value;
    document.getElementsByName("timeStep")[0].addEventListener('change', reload);


    let roomOrientationValue = document.getElementById("north").value;
    document.getElementsByName("north")[0].addEventListener('change', reload);

    let gridHeightValue = document.getElementById("gridHt").value;
    document.getElementsByName("gridHt")[0].addEventListener('change', reload);

    let ceilingHeightValue = document.getElementById("ceiling").value;
    document.getElementsByName("ceiling")[0].addEventListener('change', reload);

    let wallLen = document.getElementById("wallWidth").value;
    document.getElementsByName("wallWidth")[0].addEventListener('change', reload);

    let wallDepVal = document.getElementById("wallDep").value;
    document.getElementsByName("wallDep")[0].addEventListener('change', reload);

    let windowHeightValue = document.getElementById("windowHeight").value*10;
    document.getElementsByName("windowHeight")[0].addEventListener('change', reload);
    windowHeightValue = windowHeightValue/10;

    let windowWidthValue = document.getElementById("windowWidth").value;
    document.getElementsByName("windowWidth")[0].addEventListener('change', reload);

    let glzRatioValue = document.getElementById("glazing").value;
    document.getElementsByName("glazing")[0].addEventListener('change', reload);

    let sillHeightValue = document.getElementById("sill").value;
    document.getElementsByName("sill")[0].addEventListener('change', reload);

    let distanceWindows = document.getElementById("distWindow").value;
    document.getElementsByName("distWindow")[0].addEventListener('change', reload);

	
    //sunVectors
    var solar = solarCalculator([Lon, Lat]);

	offset = (new Date().getTimezoneOffset())/60
	var dates = []
	for (i = 1; i <= 24*timestep; i++) {
			hour = i/timestep
			dates.push(new Date(2000, Month-1, Day, hour - TimeZone - offset, (hour%parseInt(hour))*60))
		}//console.log(dates);

	now = new Date(2000, Month-1, Day, Hour - TimeZone - offset, (Hour%parseInt(Hour))*60)
	start = d3.time.day.floor(now)
	end = d3.time.day.offset(start, 1)

	var coordinates = [];
	 for (i = 1; i <= (24*timestep)-1; i++) {
	coordinates.push(solarCalculator([Lon,Lat]).position(dates[i]));
}
	
  //RESULTS FROM GEO.JS

  var geoResult = geo.createGlazingForRect(parseFloat(ceilingHeightValue), parseFloat(wallDepVal), glzRatioValue/100, parseFloat(windowWidthValue), parseFloat(windowHeightValue), parseFloat(sillHeightValue), parseFloat(distanceWindows));
  var r = {}
  r.wallCoords = geoResult.wallCoords;
  r.glzCoords = geoResult.glzCoords;
  r.glzRatio = geoResult.glzRatio;
  r.windowWidth = geoResult.windowWidth;
  r.windowHeight = geoResult.windowHeight;
  r.sillHeight = geoResult.sillHeight;
  r.centLineDist = geoResult.centLineDist;

  fill(255, 150);
	
// MAKE SUN PATH CORNER GRAPHIC	
	
push();
translate(650,400);
rotate(45);
push();

strokeWeight(1);
stroke(0);
rect(25,wallDepVal/-4,wallLen/2,wallDepVal/2);
pop();
  for (let i = 0; i < coordinates.length; i++){
    if (coordinates[i][1]>0){
      push();
      strokeWeight(2);
      stroke(0);
      rotate(((coordinates[i][0])-float(roomOrientationValue))*(3.1415926 / 180));
      point(50,0);
      pop();
    }
  }
  pop();

  let gridX = wallLen; // number of y grids - should be fixed size normally at 60 and grid changed
  let gridY = wallDepVal-1; // number of x grids - should be fixed size normally at 30 and grid changed
  let gridHt = gridHeightValue;


  //ISOMETRIC BASED ON SQUARE OF 200px x 120px - the x and y numbers below change if not square grid
  let x = 100;
  let y = 60;
  let xNext = 200-x;
  let yNext = 120-y;
  let Ceil = ceilingHeightValue * 120;
  let yShift = x * gridY;

  //SINGLE GRID BLOCK - NOT VISIBLE
  //CLOCKWISE STARTING @ TOP LEFT
  let x1 = x+yShift;
  let y1 = 0+Ceil;
  let x2 = (200)+yShift;
  let y2 = y+Ceil;
  let x3 = ((200)-x)+yShift;
  let y3 = (120)+Ceil;
  let x4 = 0+yShift;
  let y4 = ((120)-y)+Ceil;

  //RE-DO THE MULTIPLIER TO FILL THE CANVAS
  let newMult = 0;
  let newYMult = 470/((y3+(y*(gridX)))+(yNext*(gridY)));
  let newXMult = 780/(x2+(xNext*(gridX)));
  if (newXMult>newYMult) {
    newMult = newYMult;
  } else {
    newMult = newXMult;
  }
  let m = newMult;

  //ISOMETRIC BASED ON SQUARE OF 200px x 120px - the x and y numbers below change if not square grid
  x = 100*m;
  y = 60*m;
  xNext = (200*m)-x;
  yNext = (120*m)-y;
  Ceil = (ceilingHeightValue*m) * 120;
  yShift = x * (gridY);
  let GridHt = (gridHt*m) * 120;

  //SINGLE GRID BLOCK - NOT VISIBLE
  //CLOCKWISE STARTING @ TOP LEFT
  x1 = x+yShift;
  y1 = 0+Ceil;
  x2 = (200*m)+yShift;
  y2 = y+Ceil;
  x3 = ((200*m)-x)+yShift;
  y3 = (120*m)+Ceil;
  x4 = 0+yShift;
  y4 = ((120*m)-y)+Ceil;

  //ITEMS THAT EXIST BEHIND THE GRID PLANE
  //FAR WALL LINE
  push();
  noFill();
  stroke(0);
  strokeWeight(1);
  line(x2, y2, x2, y2-Ceil);

  //FLOOR PLANE
  quad(x2, y2, (x2+(xNext*(gridX))), (y2+(y*(gridX))), ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY))), x, (y*(gridY+2))+Ceil);
  pop();

  //WINDOW ON WALL

    let FullRoomWidthX = x2-x;
    let FullRoomWidthY = (y*(gridY+2))-(y2-Ceil);

    push();
    fill(230,230,245);
    stroke(0);
    strokeWeight(1);

    for (let i = 0; i < r.glzCoords.length; i++){
      let arrayX = [];
      let arrayY = [];
      for (let j = 0; j < 4; j++){
        arrayX.push(((1-(r.glzCoords[i][j][0]+(wallDepVal/2))/wallDepVal)*FullRoomWidthX)+x);
        arrayY.push(((((r.glzCoords[i][j][0]+(wallDepVal/2))/wallDepVal)*FullRoomWidthY)+y2)-(((r.glzCoords[i][j][2])/ceilingHeightValue)*Ceil));
      }
      quad(arrayX[0],arrayY[0],arrayX[1],arrayY[1],arrayX[2],arrayY[2],arrayX[3],arrayY[3]);
      //console.log(arrayX[0] + ", " + arrayY[0]+ ", " + arrayX[1]+ ", " + arrayY[1]+ ", " + arrayX[2]+ ", " + arrayY[2]+ ", " + arrayX[3]+ ", " + arrayY[3]);
    }
    pop();
  //END ITEMS THAT EXIST BEHIND GRID PLANE

  //TIME FOR SOME TRIG
  let VecXArray = [];
  let VecYArray = [];
  let VecZArray = [];
  let angleZ;
  let angleHeight; //the height of the sun vector starting from the grid sq
  let angleHeightTest = [];

  //START PYTHAGOREAM THEORM FOR Z

  let a;
  let Ztest = [];
  let AHArray = [];
  for (let i = 0; i<gridX; i++) {
    let distanceFromWall = (i+1)/4;
    a = 0;
    for (let j = 0; j<gridY; j++){
      a = 0;
      for (let k = 0; k<coordinates.length; k++){
        let angleHeight = Math.tan((coordinates[k][1])*(3.1415926 / 180))*distanceFromWall;
        AHArray.push(coordinates[k][1]);
        if (coordinates[k][1] < 0 ){
          a = 0;
        }else if (angleHeight > r.glzCoords[0][0][2]-gridHt && angleHeight < (r.glzCoords[0][2][2] -gridHt)){
          a = 1;
        }else{
          a = 0;
        }Ztest.push(a);
      }
    }
  }
//END PYTHAGOREAM THEROM FOR Z


let newCoordinateArray = [];
for (let k = 0; k<coordinates.length; k++){
  //console.log(coordinates[k][0]+float(roomOrientationValue-180))
  if (coordinates[k][0]+float(roomOrientationValue-180)<-180){
    newCoordinateArray.push(coordinates[k][0]+float(roomOrientationValue-180)+360);
  }else if (coordinates[k][0]+float(roomOrientationValue-180)>180){
    newCoordinateArray.push(coordinates[k][0]+float(roomOrientationValue-180)-360);
  }else{
    newCoordinateArray.push(coordinates[k][0]+float(roomOrientationValue-180));
  }
}

//START PYTHAGOREAM THEORM FOR XY
//ASSUME +Y IS DUE NORTH and is the wall opposite the windowwall is N (windowwall is S)

  let b;
  let Xloc = []
  let XYtest = []
    AWArray = []
  for (let i = 0; i<gridX; i++) {
    let YdistanceFromWall = (i+1);
    b = 0;
    for (let j = 0; j<gridY; j++){
      b = 0;
      for (let k = 0; k<coordinates.length; k++){
        let XlocationOnWall = 180;
        if (newCoordinateArray[k]<88.0 && newCoordinateArray[k]> -88.0){
            XlocationOnWall = Math.tan(newCoordinateArray[k]*(3.1415926 / 180))*YdistanceFromWall;
        }
        AWArray.push(XlocationOnWall);
        let xCoord = 0;
        for (let m = 0; m<r.glzCoords.length; m++){
          if (XlocationOnWall+(j+1) > r.glzCoords[m][0][0]+(wallDepVal/2)  && XlocationOnWall+(j+1) < r.glzCoords[m][1][0]+(wallDepVal/2)){
            xCoord = xCoord + 1;
          }
        }
        if (xCoord > 0){
          b = 1;
        }else{
          b =  0;
        }XYtest.push(b);
      }
    }
  }
  //END PYTHAGOREM THEORM FOR XY

  //START XY and Z CHECK
  let gridColor;
  let gridColorArray = []
  for (let i = 0; i < XYtest.length; i++){
    let XYcolor = XYtest[i];
    let Zcolor = Ztest[i];
    if (XYcolor == 1 && Zcolor == 1){
      gridColor = gridColor + 1;
    }else{
      gridColor = gridColor + 0;
    }if (i % coordinates.length == (coordinates.length)-1){
      gridColorArray.push(gridColor);
      gridColor = 0;
  }
}

// CREATE GRID
  //GRID X ROW
  for (let i = 0; i<gridX; i++) {
    let X1 = (x2+(xNext*i));
    let Y1 = (y2+(y*i));
    let X2 = (x2+(xNext*(i+1)));
    let Y2 = (y2+(y*(i+1)));
    let X3 = (x3+(xNext*(i+1)));
    let Y3 = (y3+(y*(i+1)));
    let X4 = (x3+(xNext*i));
    let Y4 = (y3+(y*i));

      let mySun = int(gridColorArray[i*gridY]/timestep); // CHANGE THIS TO BE A d3 COLOR CHART
      fill(ColorScaleArray[mySun].r,ColorScaleArray[mySun].g,ColorScaleArray[mySun].b,200);

      quad(X1, Y1-GridHt, X2, Y2-GridHt, X3, Y3-GridHt, X4, Y4-GridHt);

    //GRID Y ROW
    for (let j = 0; j<gridY; j++) {
      let newX1 = (X4-(x*j));
      let newY1 = (Y4+(yNext*j));
      let newX2 = (X3-(x*j));
      let newY2 = (Y3+(yNext*j));
      let newX3 = (X3-(x*(j+1)));
      let newY3 = (Y3+(yNext*(j+1)));
      let newX4 = (X4-(x*(j+1)));
      let newY4 = (Y4+(yNext*(j+1)));
        mySun = int(gridColorArray[(i*gridY)+j]/timestep);
        fill(ColorScaleArray[mySun].r,ColorScaleArray[mySun].g,ColorScaleArray[mySun].b,200);

      quad(newX1, newY1-GridHt, newX2, newY2-GridHt, newX3, newY3-GridHt, newX4, newY4-GridHt);
    }
  }

// END GRID

  //FLOOR GRID PLANE/OUTLINE
  push();
  noFill();
  stroke(0);
  strokeWeight(1);
  quad(x2, y2-GridHt, (x2+(xNext*(gridX))), (y2+(y*(gridX)))-GridHt, ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY)))-GridHt, x, (y*(gridY+2))+Ceil-GridHt);

  //CEILING PLANE
  quad(x2, y2-Ceil, (x2+(xNext*(gridX))), (y2+(y*(gridX)))-Ceil, ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY)))-Ceil, x, (y*(gridY+2)));

  //WALL LINES
  //line(x2, y2, x2, y2-Ceil); This one exists behind the grid
  line((x2+(xNext*(gridX))), (y2+(y*(gridX))), (x2+(xNext*(gridX))), (y2+(y*(gridX)))-Ceil);
  line(((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY)))-Ceil, ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY))));
  line(x, (y*(gridY+2)), x, (y*(gridY+2)+Ceil));
  pop();

  noLoop();
}


function reload(){
  loop();
  noLoop();
}

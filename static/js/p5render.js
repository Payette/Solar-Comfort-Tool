d3.select("#visualization").append('svg').attr("height", 10)
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

var sketch1 = function(p) {
  let GridHtSlider, SunRotationSlider;
  //let cnv;

  p.setup = function() {
    //createCanvas(800, 500, SVG);
    //createCanvas(800, 500);
    p.cnv = p.createCanvas(440,350);
     // Move the canvas so it’s inside the <div id="sketch-holder">.
    p.cnv.parent('sketch');
    p.noStroke();
  };

   p.draw = function() {
      p.clear();
      p.background(255);

      p.push();

      for (let i = 0; i < ColorScaleArray.length; i++){
        p.fill(ColorScaleArray[i].r,ColorScaleArray[i].g,ColorScaleArray[i].b);
        p.strokeWeight(1);
        p.stroke(0);
        p.rect(275+(i*10),10,10,6);
      }
      p.textSize(8);
      p.text("Hours of the Day in Direct Sun",275,8);
      for (let i = 0; i < ColorScaleArray.length; i=i+2){
        p.textSize(6);
        p.text(i,277+(i*10), 24);
      }
      p.pop();

      let Hour = 10.5;

      let Lon = document.getElementById("long").value;
      document.getElementsByName("long")[0].addEventListener('change', p.reload);

      let Lat = document.getElementById("lat").value;
      document.getElementsByName("lat")[0].addEventListener('change', p.reload);

      let TimeZone = document.getElementById("timeZone").value;
      document.getElementsByName("timeZone")[0].addEventListener('change', p.reload);


      let Day = document.getElementById("day").value;
      document.getElementsByName("day")[0].addEventListener('change', p.reload);

      let Month = document.getElementById("mon").value;
      document.getElementsByName("mon")[0].addEventListener('change', p.reload);

      let timestep = document.getElementById("timeStep").value;
      document.getElementsByName("timeStep")[0].addEventListener('change', p.reload);


      let roomOrientationValue = document.getElementById("north").value;
      document.getElementsByName("north")[0].addEventListener('change', p.reload);

      let gridHeightValue = document.getElementById("gridHt").value;
      document.getElementsByName("gridHt")[0].addEventListener('change', p.reload);

      let ceilingHeightValue = document.getElementById("ceiling").value;
      document.getElementsByName("ceiling")[0].addEventListener('change', p.reload);

      let wallLen = document.getElementById("wallWidth").value;
      document.getElementsByName("wallWidth")[0].addEventListener('change', p.reload);

      let wallDepVal = document.getElementById("wallDep").value;
      document.getElementsByName("wallDep")[0].addEventListener('change', p.reload);

      let windowHeightValue = document.getElementById("windowHeight").value*10;
      document.getElementsByName("windowHeight")[0].addEventListener('change', p.reload);
      windowHeightValue = windowHeightValue/10;

      let windowWidthValue = document.getElementById("windowWidth").value;
      document.getElementsByName("windowWidth")[0].addEventListener('change', p.reload);

      let glzRatioValue = document.getElementById("glazing").value;
      document.getElementsByName("glazing")[0].addEventListener('change', p.reload);

      let sillHeightValue = document.getElementById("sill").value;
      document.getElementsByName("sill")[0].addEventListener('change', p.reload);

      let distanceWindows = document.getElementById("distWindow").value;
      document.getElementsByName("distWindow")[0].addEventListener('change', p.reload);



      let horzShadeDep = document.getElementById("hShadeDep").value;
      document.getElementsByName("hShadeDep")[0].addEventListener('change', p.reload);

      let horzShadeNum = document.getElementById("hShadeNum").value;
      document.getElementsByName("hShadeNum")[0].addEventListener('change', p.reload);

      let horzShadeSpace = document.getElementById("hShadeSpace").value;
      document.getElementsByName("hShadeSpace")[0].addEventListener('change', p.reload);

      let horzShadeDist = document.getElementById("hShadeDist").value;
      document.getElementsByName("hShadeDist")[0].addEventListener('change', p.reload);

      let horzShadeHeight = document.getElementById("hShadeHeight").value;
      document.getElementsByName("hShadeHeight")[0].addEventListener('change', p.reload);

      let horzShadeAngle = document.getElementById("hShadeAngle").value;
      document.getElementsByName("hShadeAngle")[0].addEventListener('change', p.reload);
       
       let vertShadeDep = document.getElementById("vShadeDep").value;
      document.getElementsByName("vShadeDep")[0].addEventListener('change', p.reload);

      let vertShadeNum = document.getElementById("vShadeNum").value;
      document.getElementsByName("vShadeNum")[0].addEventListener('change', p.reload);

      let vertShadeSpace = document.getElementById("vShadeSpace").value;
      document.getElementsByName("vShadeSpace")[0].addEventListener('change', p.reload);

      let vertShadeDist = document.getElementById("vShadeDist").value;
      document.getElementsByName("vShadeDist")[0].addEventListener('change', p.reload);

      let vertShadeHeight = document.getElementById("vShadeHeight").value;
      document.getElementsByName("vShadeHeight")[0].addEventListener('change', p.reload);

      let vertShadeStart = document.getElementById("vShadeStart").value;
      document.getElementsByName("vShadeStart")[0].addEventListener('change', p.reload);



      //SunVectors
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


    //GEO Result
    var geoResult = geo.createGlazingForRect(parseFloat(ceilingHeightValue), parseFloat(wallDepVal), glzRatioValue/100, parseFloat(windowWidthValue), parseFloat(windowHeightValue), parseFloat(sillHeightValue), parseFloat(distanceWindows));
    var r = {}
    r.wallCoords = geoResult.wallCoords;
    r.glzCoords = geoResult.glzCoords;
    r.glzRatio = geoResult.glzRatio;
    r.windowWidth = geoResult.windowWidth;
    r.windowHeight = geoResult.windowHeight;
    r.sillHeight = geoResult.sillHeight;
    r.centLineDist = geoResult.centLineDist;

    // MAKE SUN PATH CORNER GRAPHIC

    p.fill(255, 150);
  p.push();
  p.translate(360,280);
  p.rotate(45);
  p.push();

  p.strokeWeight(1);
  p.stroke(0);
  p.rect(20,wallDepVal/-4,wallLen/2,wallDepVal/2);
  p.pop();


    for (let i = 0; i < coordinates.length; i++){
      if (coordinates[i][1]>0){
        p.push();
        p.strokeWeight(2);
        p.stroke(0);
        p.rotate(((coordinates[i][0])-p.float(roomOrientationValue))*(3.1415926 / 180));
        p.point(50,0);
        p.pop();
      }
    }
    p.pop();


    //let CeilHt = CeilingSlider.value();//Ceiling Height (ft) - this moves the whole grid down.
    let gridX = wallLen; // number of y grids - should be fixed size normally at 60
    let gridY = wallDepVal-1; // number of x grids - should be fixed size normally at 30
    let gridHt = gridHeightValue;
    //let sunRotation = SunRotationSlider.value() * (3.1415926/180);


    //ISOMETRIC BASED ON SQUARE OF 200px x 120px - the x and y numbers below change if not square grid
    let x = 100;
    let y = 60;
    let xNext = 200-x;
    let yNext = 120-y;
    let Ceil = ceilingHeightValue * 120;
    let yShift = 0; //x * gridY

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
    let newYMult = 300/((y3+(y*(gridX)))+(yNext*(gridY)));
    let newXMult = 340/(x2+(xNext*(gridX)));
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
    p.push();
    p.noFill();
    p.stroke(0);
    p.strokeWeight(1);
    p.line(x2, y2, x2, y2-Ceil);

    //FLOOR PLANE
    p.quad(x2, y2, (x2+(xNext*(gridX))), (y2+(y*(gridX))), ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY))), x, (y*(gridY+2))+Ceil);
    p.pop();

    //WINDOW ON WALL

    let FullRoomWidthX = x2-x;
    let FullRoomWidthY = (y*(gridY+2))-(y2-Ceil);

    p.push();
    p.fill(230,230,245);
    p.stroke(0);
    p.strokeWeight(1);

    for (let i = 0; i < r.glzCoords.length; i++){
      let arrayX = [];
      let arrayY = [];
      for (let j = 0; j < 4; j++){
        arrayX.push(((1-(r.glzCoords[i][j][0]+(wallDepVal/2))/wallDepVal)*FullRoomWidthX)+x);
        arrayY.push(((((r.glzCoords[i][j][0]+(wallDepVal/2))/wallDepVal)*FullRoomWidthY)+y2)-(((r.glzCoords[i][j][2])/ceilingHeightValue)*Ceil));
      }
      p.quad(arrayX[0],arrayY[0],arrayX[1],arrayY[1],arrayX[2],arrayY[2],arrayX[3],arrayY[3]);
      //console.log(arrayX[0] + ", " + arrayY[0]+ ", " + arrayX[1]+ ", " + arrayY[1]+ ", " + arrayX[2]+ ", " + arrayY[2]+ ", " + arrayX[3]+ ", " + arrayY[3]);
    }
    p.pop();

    //HORIZONTAL SHADE LOUVERS
    p.push();
    p.strokeWeight(1);
    p.stroke(0);
    p.fill(50,50);

    for (let i = 0; i < r.glzCoords.length; i++){
      let arrayX = [];
      let arrayY = [];
      for (let j = 0; j < 4; j++){
        arrayX.push(((1-(r.glzCoords[i][j][0]+(wallDepVal/2))/wallDepVal)*FullRoomWidthX)+x);
        arrayY.push(((((r.glzCoords[i][j][0]+(wallDepVal/2))/wallDepVal)*FullRoomWidthY)+y2)-(((r.glzCoords[i][j][2])/ceilingHeightValue)*Ceil));
      }
      for (let k = 0; k<horzShadeNum; k++){
        let hSX1 = arrayX[2]-(((200*m)-x)*horzShadeDep)-(((200*m)-x)*horzShadeDist);
        let hSY1 = arrayY[2]-(y*horzShadeDep)+(k*y*horzShadeSpace*2)-(horzShadeHeight*y)-(y*horzShadeDist);
        let hSX2 = arrayX[3]-(((200*m)-x)*horzShadeDep)-(((200*m)-x)*horzShadeDist);
        let hSY2 = arrayY[3]-(y*horzShadeDep)+(k*y*horzShadeSpace*2)-(horzShadeHeight*y)-(y*horzShadeDist);
        let hSX3 = arrayX[3]-(((200*m)-x)*horzShadeDist);
        let hSY3 = arrayY[3]+(k*y*horzShadeSpace*2)-(horzShadeHeight*y)-(y*horzShadeDist);
        let hSX4 = arrayX[2]-(((200*m)-x)*horzShadeDist);
        let hSY4 = arrayY[2]+(k*y*horzShadeSpace*2)-(horzShadeHeight*y)-(y*horzShadeDist);

        let rotHSX1 = arrayX[2]-(((200*m)-x)*horzShadeDist)+(x*horzShadeDep) + (x*2*horzShadeDep*Math.sin(((-horzShadeAngle*2/3)-30)*p.TWO_PI/360));
        let rotHSY1 = arrayY[2]+(k*y*horzShadeSpace*2)-(horzShadeHeight*y)-(y*horzShadeDist) -(y*horzShadeDep) + (x*2*horzShadeDep*Math.cos(((-horzShadeAngle*2/3)-30)*p.TWO_PI/360))
        let rotHSX2 = arrayX[3]-(((200*m)-x)*horzShadeDist)+(x*horzShadeDep) + (x*2*horzShadeDep*Math.sin(((-horzShadeAngle*2/3)-30)*p.TWO_PI/360));
        let rotHSY2 = arrayY[3]+(k*y*horzShadeSpace*2)-(horzShadeHeight*y)-(y*horzShadeDist) -(y*horzShadeDep) + (x*2*horzShadeDep*Math.cos(((-horzShadeAngle*2/3)-30)*p.TWO_PI/360))

        p.quad(rotHSX1, rotHSY1, rotHSX2, rotHSY2, hSX3, hSY3, hSX4, hSY4);
        }
      }
    p.pop();
       
       p.push();
    p.strokeWeight(1);
    p.stroke(0);
    p.fill(50,50);

    //VERTICAL SHADE LOUVERS
    for (let i = 0; i < r.glzCoords.length; i++){
      let arrayX = [];
      let arrayY = [];
      for (let j = 0; j < 4; j++){
        arrayX.push(((1-(r.glzCoords[i][j][0]+(wallDepVal/2))/wallDepVal)*FullRoomWidthX)+x);
        arrayY.push(((((r.glzCoords[i][j][0]+(wallDepVal/2))/wallDepVal)*FullRoomWidthY)+y2)-(((r.glzCoords[i][j][2])/ceilingHeightValue)*Ceil));
      }

      if(vertShadeStart == "L"){
      for (let k = 0; k<vertShadeNum; k++){
      let vSX1 = arrayX[2]+(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDep)-(((200*m)-x)*vertShadeDist);
      let vSY1 = arrayY[2]-(y*vertShadeDep)-(k*y*vertShadeSpace)-(vertShadeHeight*y)-(y*vertShadeDist);
      let vSX2 = arrayX[2]+(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDist);
      let vSY2 = arrayY[2]-(k*y*vertShadeSpace)-(vertShadeHeight*y)-(y*vertShadeDist);
      let vSX4 = arrayX[1]+(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDep)-(((200*m)-x)*vertShadeDist);
      let vSY4 = arrayY[1]-(y*vertShadeDep)-(k*y*vertShadeSpace)-(vertShadeHeight*y)-(y*vertShadeDist);
      let vSX3 = arrayX[1]+(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDist);
      let vSY3 = arrayY[1]-(k*y*vertShadeSpace)-(vertShadeHeight*y)-(y*vertShadeDist);
      //p.line(vSX1, vSY1, vSX2, vSY2);
      //p.line(vSX3, vSY3, vSX4, vSY4);
      p.quad(vSX1, vSY1, vSX2, vSY2,vSX3, vSY3, vSX4, vSY4)
    }
  }else{
      for (let k = 0; k<vertShadeNum; k++){
      let vSX1 = arrayX[3]-(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDep)-(((200*m)-x)*vertShadeDist);
      let vSY1 = arrayY[3]-(y*vertShadeDep)+(k*y*vertShadeSpace)-(vertShadeHeight*y)-(y*vertShadeDist);
      let vSX2 = arrayX[3]-(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDist);
      let vSY2 = arrayY[3]+(k*y*vertShadeSpace)-(vertShadeHeight*y)-(y*vertShadeDist);
      let vSX4 = arrayX[0]-(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDep)-(((200*m)-x)*vertShadeDist);
      let vSY4 = arrayY[0]-(y*vertShadeDep)+(k*y*vertShadeSpace)-(vertShadeHeight*y)-(y*vertShadeDist);
      let vSX3 = arrayX[0]-(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDist);
      let vSY3 = arrayY[0]+(k*y*vertShadeSpace)-(vertShadeHeight*y)-(y*vertShadeDist);
      //p.line(vSX1, vSY1, vSX2, vSY2);
      //p.line(vSX3, vSY3, vSX4, vSY4);
      p.quad(vSX1, vSY1, vSX2, vSY2,vSX3, vSY3, vSX4, vSY4)
    }
    }
    }
    p.pop();


    //END ITEMS THAT EXIST BEHIND GRID PLANE

    //TIME FOR SOME TRIG
    let VecXArray = [];
    let VecYArray = [];
    let VecZArray = [];
    let angleZ;
    let angleHeight; //the height of the sun vector starting from the grid sq
    let angleHeightTest = [];

    //START PYTHAGOREAM THEORM FOR Z
    //console.log(coordinates);
    //console.log((coordinates[12][0])+float(roomOrientationValue));

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
    if (coordinates[k][0]+p.float(roomOrientationValue-180)<-180){
      newCoordinateArray.push(coordinates[k][0]+p.float(roomOrientationValue-180)+360);
    }else if (coordinates[k][0]+p.float(roomOrientationValue-180)>180){
      newCoordinateArray.push(coordinates[k][0]+p.float(roomOrientationValue-180)-360);
    }else{
      newCoordinateArray.push(coordinates[k][0]+p.float(roomOrientationValue-180));
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

    //START XY and Z check
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

        let mySun = p.int(gridColorArray[i*gridY]/timestep);
        p.fill(ColorScaleArray[mySun].r,ColorScaleArray[mySun].g,ColorScaleArray[mySun].b,200);

        p.quad(X1, Y1-GridHt, X2, Y2-GridHt, X3, Y3-GridHt, X4, Y4-GridHt);

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
          mySun = p.int(gridColorArray[(i*gridY)+j]/timestep);
          p.fill(ColorScaleArray[mySun].r,ColorScaleArray[mySun].g,ColorScaleArray[mySun].b,200);

        p.quad(newX1, newY1-GridHt, newX2, newY2-GridHt, newX3, newY3-GridHt, newX4, newY4-GridHt);
      }
    }

  // END GRID

    //FLOOR GRID PLANE/OUTLINE
    p.push();
    p.noFill();
    p.stroke(0);
    p.strokeWeight(1);
    p.quad(x2, y2-GridHt, (x2+(xNext*(gridX))), (y2+(y*(gridX)))-GridHt, ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY)))-GridHt, x, (y*(gridY+2))+Ceil-GridHt);

    //CEILING PLANE
    p.quad(x2, y2-Ceil, (x2+(xNext*(gridX))), (y2+(y*(gridX)))-Ceil, ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY)))-Ceil, x, (y*(gridY+2)));

    //WALL LINES
    //line(x2, y2, x2, y2-Ceil); This one exists behind the grid
    p.line((x2+(xNext*(gridX))), (y2+(y*(gridX))), (x2+(xNext*(gridX))), (y2+(y*(gridX)))-Ceil);
    p.line(((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY)))-Ceil, ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY))));
    p.line(x, (y*(gridY+2)), x, (y*(gridY+2)+Ceil));
    p.pop();
    p.noLoop();
  }


  p.reload = function(){
    p.loop();
    //noLoop();
  }
}

var iso1 = new p5(sketch1);

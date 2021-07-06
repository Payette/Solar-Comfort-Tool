var sketch2 = function(p) {
let GridHtSlider, SunRotationSlider;

let light_black = 100;

let Lon;
let Lat;
let TimeZone;
let Hour;
let Day;
let Month;
let coordinates = [];
let solar;
let xPointLoc = [];
let yPointLoc = [];
//let Case2Button = 0;
  let roomOrientationValue;
//let cnv;

var imgCheck;
var imgNope;
p.preload = function() {
imgCheck = p.loadImage('static/images/check.png');
imgNope = p.loadImage('static/images/x.png');
}

p.setup = function() {
  //createCanvas(800, 500, SVG);
  //createCanvas(800, 500);
  p.cnv = p.createCanvas(440,350);
   // Move the canvas so it’s inside the <div id="sketch-holder">.
  p.cnv.parent('sketch1');
  p.noStroke();

};


 p.draw = function() {
    p.clear();
    p.background(255);

    //RELOAD THE PAGE ONLY WHEN VALUES ARE CHANGED

    //let Hour = 10.5;
    let glzOrWidth = document.getElementById("glazingRatioCheck").checked;
    //console.log(Radiox);
    document.getElementsByName("glazingRadio")[0].addEventListener('input', p.reload);
    document.getElementsByName("glazingRadio")[1].addEventListener('input', p.reload);

    document.getElementsByName("button1")[0].addEventListener('click', p.checkButton);
    document.getElementsByName("button1")[1].addEventListener('click', p.checkButton);
    document.getElementsByName("button1")[2].addEventListener('click', p.checkButton);
    //console.log(Case2Button);




    //let Hour = 10.5;

    let Lon1 = document.getElementById("long1").value;
    document.getElementsByName("long1")[0].addEventListener('input', p.reload);

    let Lat1 = document.getElementById("lat1").value;
    document.getElementsByName("lat1")[0].addEventListener('input', p.reload);

    let TimeZone1 = document.getElementById("timeZone1").value;
    document.getElementsByName("timeZone1")[0].addEventListener('input', p.reload);

    let Hour1 = document.getElementById("hour1").value;
    document.getElementsByName("hour1")[0].addEventListener('input', p.reload);


    let Day1 = document.getElementById("day1").value;
    document.getElementsByName("day1")[0].addEventListener('input', p.reload);

    let Month1 = document.getElementById("mon1").value;
    document.getElementsByName("mon1")[0].addEventListener('input', p.reload);

    let timestep = document.getElementById("timeStep").value;
    document.getElementsByName("timeStep")[0].addEventListener('input', p.reload);


    let roomOrientationValue1 = document.getElementById("north1").value;
    document.getElementsByName("north1")[0].addEventListener('input', p.reload);

    let gridHeightValue = document.getElementById("gridHt1").value;
    document.getElementsByName("gridHt1")[0].addEventListener('input', p.reload);

    let ceilingHeightValue = document.getElementById("ceiling1").value;
    document.getElementsByName("ceiling1")[0].addEventListener('input', p.reload);

    let wallLen = document.getElementById("wallWidth1").value;
    document.getElementsByName("wallWidth1")[0].addEventListener('input', p.reload);

    let wallDepVal = document.getElementById("wallDep1").value;
    document.getElementsByName("wallDep1")[0].addEventListener('input', p.reload);

    let windowHeightValue = document.getElementById("windowHeight1").value*10;
    document.getElementsByName("windowHeight1")[0].addEventListener('input', p.reload);
    windowHeightValue = windowHeightValue/10;

    let windowWidthValue = document.getElementById("windowWidth1").value;
    document.getElementsByName("windowWidth1")[0].addEventListener('input', p.reload);

    let glzRatioValue = document.getElementById("glazing1").value;
    document.getElementsByName("glazing1")[0].addEventListener('input', p.reload);

    let sillHeightValue = document.getElementById("sill1").value;
    document.getElementsByName("sill1")[0].addEventListener('input', p.reload);

    let distanceWindows = document.getElementById("distWindow1").value;
    document.getElementsByName("distWindow1")[0].addEventListener('input', p.reload);



    let horzShadeDep = document.getElementById("hShadeDep1").value;
    document.getElementsByName("hShadeDep1")[0].addEventListener('input', p.reload);

    let horzShadeNum = document.getElementById("hShadeNum1").value;
    document.getElementsByName("hShadeNum1")[0].addEventListener('input', p.reload);

    let horzShadeSpace = document.getElementById("hShadeSpace1").value;
    document.getElementsByName("hShadeSpace1")[0].addEventListener('input', p.reload);

    let horzShadeDist = document.getElementById("hShadeDist1").value;
    document.getElementsByName("hShadeDist1")[0].addEventListener('input', p.reload);

    let horzShadeHeight = document.getElementById("hShadeHeight1").value;
    document.getElementsByName("hShadeHeight1")[0].addEventListener('input', p.reload);

    let horzShadeAngle = document.getElementById("hShadeAngle1").value;
    document.getElementsByName("hShadeAngle1")[0].addEventListener('input', p.reload);



    let vertShadeOn = document.getElementById("vShadeOn1").value;
    document.getElementsByName("vShadeOn1")[0].addEventListener('click', p.reload);

    let checkbox = document.querySelector("input[name=vShadeOn1]");


    if(checkbox.checked) {
        vertShadeOn = 0;
    } else {
        vertShadeOn = 1;
    }

    let vertShadeDep = document.getElementById("vShadeDep1").value;
    document.getElementsByName("vShadeDep1")[0].addEventListener('input', p.reload);

    let vertShadeNum = document.getElementById("vShadeNum1").value;
    document.getElementsByName("vShadeNum1")[0].addEventListener('input', p.reload);

    let vertShadeSpace = document.getElementById("vShadeSpace1").value;
    document.getElementsByName("vShadeSpace1")[0].addEventListener('input', p.reload);

    let vertShadeShift = document.getElementById("vShadeShift1").value;
    document.getElementsByName("vShadeShift1")[0].addEventListener('input', p.reload);

    let vertShadeDist = document.getElementById("vShadeDist1").value;
    document.getElementsByName("vShadeDist1")[0].addEventListener('input', p.reload);

    let vertShadeHeight = document.getElementById("vShadeHeight1").value;
    document.getElementsByName("vShadeHeight1")[0].addEventListener('input', p.reload);

    let vertShadeScale = document.getElementById("vShadeScale1").value;
    document.getElementsByName("vShadeScale1")[0].addEventListener('input', p.reload);

    let vertShadeStart = document.getElementById("vShadeStart1").value;
    document.getElementsByName("vShadeStart1")[0].addEventListener('input', p.reload);



    let valFal = document.getElementById("fal").value;
    document.getElementsByName("fal")[0].addEventListener('input', p.reload);

    let valMDST = document.getElementById("mdst").value;
    document.getElementsByName("mdst")[0].addEventListener('input', p.reload);






// CHECK IF THE CASE2BUTTON IS CLICKED

    if(Case2Button == 0){
      document.getElementsByName("button1")[0].className = "button1OFF";
      document.getElementsByName("button1")[1].className = "button1OFF";
      document.getElementsByName("button1")[2].className = "button1OFF";
      // document.getElementById("button1").className = "button1";
      //let vertShadeStart = document.getElementById("vShadeStart1").value;

      document.getElementById("long1").value = document.getElementById("long").value;
      document.getElementById("lat1").value = document.getElementById("lat").value;
      document.getElementById("timeZone1").value = document.getElementById("timeZone").value;
      document.getElementById("hour1").value = document.getElementById("hour").value;
      document.getElementById("day1").value = document.getElementById("day").value;
      document.getElementById("mon1").value = document.getElementById("mon").value;
      document.getElementById("north1").value = document.getElementById("north").value;
      document.getElementById("gridHt1").value = document.getElementById("gridHt").value;
      document.getElementById("ceiling1").value = document.getElementById("ceiling").value;
      document.getElementById("wallWidth1").value = document.getElementById("wallWidth").value;
      document.getElementById("wallDep1").value = document.getElementById("wallDep").value;
      document.getElementById("windowHeight1").value = document.getElementById("windowHeight").value;
      document.getElementById("windowWidth1").value = document.getElementById("windowWidth").value;
      document.getElementById("glazing1").value = document.getElementById("glazing").value;
      document.getElementById("sill1").value = document.getElementById("sill").value;
      document.getElementById("distWindow1").value = document.getElementById("distWindow").value;
      document.getElementById("hShadeDep1").value = document.getElementById("hShadeDep").value;
      document.getElementById("hShadeNum1").value = document.getElementById("hShadeNum").value;
      document.getElementById("hShadeSpace1").value = document.getElementById("hShadeSpace").value;
      document.getElementById("hShadeDist1").value = document.getElementById("hShadeDist").value;
      document.getElementById("hShadeHeight1").value = document.getElementById("hShadeHeight").value;
      document.getElementById("hShadeAngle1").value = document.getElementById("hShadeAngle").value;
      document.getElementById("vShadeOn1").value = document.getElementById("vShadeOn").value;
      document.getElementById("vShadeDep1").value = document.getElementById("vShadeDep").value;
      document.getElementById("vShadeNum1").value = document.getElementById("vShadeNum").value;
      document.getElementById("vShadeSpace1").value = document.getElementById("vShadeSpace").value;
      document.getElementById("vShadeShift1").value = document.getElementById("vShadeShift").value;
      document.getElementById("vShadeDist1").value = document.getElementById("vShadeDist").value;
      document.getElementById("vShadeHeight1").value = document.getElementById("vShadeHeight").value;
      document.getElementById("vShadeScale1").value = document.getElementById("vShadeScale").value;
      document.getElementById("vShadeStart1").value = document.getElementById("vShadeStart").value;

      document.getElementById("long1").disabled = true;
      document.getElementById("lat1").disabled = true;
      document.getElementById("timeZone1").disabled = true;
      document.getElementById("hour1").disabled = true;
      document.getElementById("day1").disabled = true;
      document.getElementById("mon1").disabled = true;
      document.getElementById("north1").disabled = true;
      document.getElementById("gridHt1").disabled = true;
      document.getElementById("ceiling1").disabled = true;
      document.getElementById("wallWidth1").disabled = true;
      document.getElementById("wallDep1").disabled = true;
      document.getElementById("windowHeight1").disabled = true;
      document.getElementById("windowWidth1").disabled = true;
      document.getElementById("glazing1").disabled = true;
      document.getElementById("sill1").disabled = true;
      document.getElementById("distWindow1").disabled = true;
      document.getElementById("hShadeDep1").disabled = true;
      document.getElementById("hShadeNum1").disabled = true;
      document.getElementById("hShadeSpace1").disabled = true;
      document.getElementById("hShadeDist1").disabled = true;
      document.getElementById("hShadeHeight1").disabled = true;
      document.getElementById("hShadeAngle1").disabled = true;
      document.getElementById("vShadeOn1").disabled = true;
      document.getElementById("vShadeDep1").disabled = true;
      document.getElementById("vShadeNum1").disabled = true;
      document.getElementById("vShadeSpace1").disabled = true;
      document.getElementById("vShadeShift1").disabled = true;
      document.getElementById("vShadeDist1").disabled = true;
      document.getElementById("vShadeHeight1").disabled = true;
      document.getElementById("vShadeScale1").disabled = true;
      document.getElementById("vShadeStart1").disabled = true;




      //DETERMINE HOW LARGE THE ISOMETRIC GRAPHIC WILL BE.
      //FIRST MAKE IT, THEN RE-DO IT USING A MULTIPLIER TO INCREASE OR DECREASE THE SCALE SO IT STAYS WITHIN THE BOUNDS OF THE CANVAS

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
        //p.push();
        p.noFill();
        p.stroke(light_black+100);
        p.strokeWeight(1);
        p.line(x2, y2, x2, y2-Ceil);

        //FLOOR PLANE
        p.quad(x2, y2, (x2+(xNext*(gridX))), (y2+(y*(gridX))), ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY))), x, (y*(gridY+2))+Ceil);
      //  p.push();
        p.stroke(light_black+100);

      //  p.push();
        p.noFill();
        p.stroke(light_black+100);
        p.strokeWeight(1);
      //  p.quad(x2, y2-GridHt, (x2+(xNext*(gridX))), (y2+(y*(gridX)))-GridHt, ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY)))-GridHt, x, (y*(gridY+2))+Ceil-GridHt);
        p.stroke(light_black+100);

        //CEILING PLANE
        p.quad(x2, y2-Ceil, (x2+(xNext*(gridX))), (y2+(y*(gridX)))-Ceil, ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY)))-Ceil, x, (y*(gridY+2)));

        //WALL LINES
        //line(x2, y2, x2, y2-Ceil); This one exists behind the grid
        p.line((x2+(xNext*(gridX))), (y2+(y*(gridX))), (x2+(xNext*(gridX))), (y2+(y*(gridX)))-Ceil);
        p.line(((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY)))-Ceil, ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY))));
        p.line(x, (y*(gridY+2)), x, (y*(gridY+2)+Ceil));
      //  p.pop();




// CHECK IF THE CASE2BUTTON IS CLICKED
    }else{
      document.getElementsByName("button1")[0].className = "button1ON";
      document.getElementsByName("button1")[1].className = "button1ON";
      document.getElementsByName("button1")[2].className = "button1ON";

      document.getElementById("long1").disabled = false;
      document.getElementById("lat1").disabled = false;
      document.getElementById("timeZone1").disabled = false;
      document.getElementById("hour1").disabled = false;
      document.getElementById("day1").disabled = false;
      document.getElementById("mon1").disabled = false;
      document.getElementById("north1").disabled = false;
      document.getElementById("gridHt1").disabled = false;
      document.getElementById("ceiling1").disabled = false;
      document.getElementById("wallWidth1").disabled = false;
      document.getElementById("wallDep1").disabled = false;
      document.getElementById("windowHeight1").disabled = false;
      document.getElementById("windowWidth1").disabled = false;
      document.getElementById("glazing1").disabled = false;
      document.getElementById("sill1").disabled = false;
      document.getElementById("distWindow1").disabled = false;
      document.getElementById("hShadeDep1").disabled = false;
      document.getElementById("hShadeNum1").disabled = false;
      document.getElementById("hShadeSpace1").disabled = false;
      document.getElementById("hShadeDist1").disabled = false;
      document.getElementById("hShadeHeight1").disabled = false;
      document.getElementById("hShadeAngle1").disabled = false;
      document.getElementById("vShadeOn1").disabled = false;
      document.getElementById("vShadeDep1").disabled = false;
      document.getElementById("vShadeNum1").disabled = false;
      document.getElementById("vShadeSpace1").disabled = false;
      document.getElementById("vShadeShift1").disabled = false;
      document.getElementById("vShadeDist1").disabled = false;
      document.getElementById("vShadeHeight1").disabled = false;
      document.getElementById("vShadeScale1").disabled = false;
      document.getElementById("vShadeStart1").disabled = false;


      if (Lon == Lon1 && Lat == Lat1 && Hour == Hour1 && Day == Day1 && Month == Month1 && TimeZone == TimeZone1 && roomOrientationValue == roomOrientationValue1 && currentStudy == singleHour){
        //console.log(1);

      }else{
        //console.log(0);
        Lon = Lon1;
        Lat = Lat1;
        Hour = Hour1;
        Day = Day1;
        Month = Month1;
        TimeZone = TimeZone1;
        roomOrientationValue = roomOrientationValue1;
        currentStudy = singleHour;

        //SunVectors - TAKEN FROM THE OLD SUNVECTORS.JS FILE
        solar = solarCalculator([Lon, Lat]);

      offset = (new Date().getTimezoneOffset())/60;
      var dates = []
      var date;
      var date2;
      for (i = 1; i <= 24*timestep; i++) {
        hour = i/timestep
        if ( i == ((parseInt(24-Hour))*timestep)){
          date = new Date(2000, Month-1, Day, hour - offset - TimeZone, (hour%parseInt(hour))*60);
          //console.log((hour%parseInt(hour))*60 + " " + Hour);
          let mytime = 24 - hour;
          date2 = new Date(2000, Month-1, Day, Hour - offset - TimeZone, 0);
        }
  			dates.push(new Date(2000, Month-1, Day, hour - offset - TimeZone, (hour%parseInt(hour))*60));
  		}
      //console.log(dates);
      //console.log(date);


      xPointLoc = [];
      yPointLoc = [];

      coordinates = [];
       for (i = 1; i <= (24*timestep)-1; i++) {
      coordinates.push(solarCalculator([Lon,Lat]).position(dates[i]));

    }

    for (let i = 0; i < coordinates.length; i += parseInt(timestep)){
      if (coordinates[i][1]>0){
        xPointLoc.push((36-(36*(coordinates[i][1]/180)))*p.sin((coordinates[i][0]-45-roomOrientationValue)*(-3.1415926 / 180)));
        yPointLoc.push(((22-(22*(coordinates[i][1]/180)))*p.cos((coordinates[i][0]-45-roomOrientationValue)*(-3.1415926 / 180)))-(coordinates[i][1]*.3));
        //p.point((36-(36*(coordinates[i][1]/180)))*p.sin((coordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)), ((22-(22*(coordinates[i][1]/180)))*p.cos((coordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)))-(coordinates[i][1]*.3));
        }
    }

    if (singleHour == 1){
      coordinates = [];
      let coordinates2 = [];
      for (i = 1; i <= 9; i++) {
        coordinates.push(solarCalculator([Lon,Lat]).position(date));
      }
      for (i = 1; i <= 9; i++) {
        coordinates2.push(solarCalculator([Lon,Lat]).position(date2));
      }
      xPointLoc = [];
      yPointLoc = [];
      for (let i = 0; i < coordinates2.length; i += parseInt(timestep)){
        if (coordinates2[i][1]>0){
          xPointLoc.push((36-(36*(coordinates2[i][1]/180)))*p.sin((coordinates2[i][0]-45-roomOrientationValue)*(-3.1415926 / 180)));
          yPointLoc.push(((22-(22*(coordinates2[i][1]/180)))*p.cos((coordinates2[i][0]-45-roomOrientationValue)*(-3.1415926 / 180)))-(coordinates2[i][1]*.3));
          //p.point((36-(36*(coordinates[i][1]/180)))*p.sin((coordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)), ((22-(22*(coordinates[i][1]/180)))*p.cos((coordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)))-(coordinates[i][1]*.3));
        }
      }
    }


  }






  //GEO Result - TAKES DATA FROM THE GEO.JS FILE
  //geo.createGlazingForRect = function(rectHeight, wallLength, glazingRatio, windowWidth, winHeight, silHeight, distBreakup, ratioOrWidth, changedVar)
  var geoResult = geo.createGlazingForRect(parseFloat(ceilingHeightValue), parseFloat(wallDepVal), glzRatioValue/100, parseFloat(windowWidthValue), parseFloat(windowHeightValue), parseFloat(sillHeightValue), parseFloat(distanceWindows), glzOrWidth);
  var r = {}
  r.wallCoords = geoResult.wallCoords;
  r.glzCoords = geoResult.glzCoords;
  r.glzRatio = geoResult.glzRatio;
  r.windowWidth = geoResult.windowWidth;
  r.windowHeight = geoResult.windowHeight;
  r.sillHeight = geoResult.sillHeight;
  r.centLineDist = geoResult.centLineDist;




  // MAKE SUN PATH CORNER GRAPHIC

  roomOrientationValue = roomOrientationValue*-1
  p.push();
  p.translate(380,280);
  p.strokeCap(p.SQUARE);
  p.stroke(light_black+100);
  p.strokeWeight(1);
  p.noFill();
  p.ellipse(0,0,75,45); //main circle
  p.fill(light_black+100);
  p.line(0,0,45*p.sin((roomOrientationValue+45)*(-3.1415926 / 180)), 27*p.cos((roomOrientationValue+45)*(-3.1415926 / 180)));
  p.line(0,0,45*p.sin((roomOrientationValue+135)*(-3.1415926 / 180)), 27*p.cos((roomOrientationValue+135)*(-3.1415926 / 180)));
  p.line(0,0,45*p.sin((roomOrientationValue+225)*(-3.1415926 / 180)), 27*p.cos((roomOrientationValue+225)*(-3.1415926 / 180)));
  p.textAlign(p.CENTER, p.CENTER);
  p.textSize(10);
  p.text("N", 56*p.sin((roomOrientationValue-45)*(-3.1415926 / 180)), 34*p.cos((roomOrientationValue-45)*(-3.1415926 / 180)));
  p.strokeWeight(4);
  p.line(0,0,45*p.sin((roomOrientationValue-45)*(-3.1415926 / 180)), 27*p.cos((roomOrientationValue-45)*(-3.1415926 / 180)));
  //p.translate(36*p.sin((roomOrientationValue+45)*(-3.1415926 / 180)), 22*p.cos((roomOrientationValue+45)*(-3.1415926 / 180)));
  //p.point(0,0);
  p.stroke(10);
  p.strokeWeight(3);

  p.strokeWeight(4);
  p.stroke(light_black);
  p.point(xPointLoc[0], yPointLoc[0]);
  for (let i = 0; i < xPointLoc.length-1; i++){
    p.strokeWeight(1);
    //p.stroke(light_black);
    p.line(xPointLoc[i], yPointLoc[i],xPointLoc[i+1], yPointLoc[i+1]);
    p.strokeWeight(4);
    //p.stroke(100);
    p.point(xPointLoc[i+1], yPointLoc[i+1]);
  }
  p.strokeWeight(3);
  p.stroke(100);
  // for (let i = 0; i < xPointLoc.length; i++){
  //   p.point(xPointLoc[i], yPointLoc[i]);
  // }
  p.pop();




roomOrientationValue = roomOrientationValue*-1

//DETERMINE HOW LARGE THE ISOMETRIC GRAPHIC WILL BE.
//FIRST MAKE IT, THEN RE-DO IT USING A MULTIPLIER TO INCREASE OR DECREASE THE SCALE SO IT STAYS WITHIN THE BOUNDS OF THE CANVAS

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
  p.stroke(light_black);
  p.strokeWeight(1);
  p.line(x2, y2, x2, y2-Ceil);

  //FLOOR PLANE
  p.quad(x2, y2, (x2+(xNext*(gridX))), (y2+(y*(gridX))), ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY))), x, (y*(gridY+2))+Ceil);
  p.push();
  p.stroke(150,150,150);
  //p.line((x2+(xNext*(gridX)))+10, (y2+(y*(gridX)))+6, ((x3+(xNext*(gridX)))-(x*(gridY)))+10, ((y3+(y*(gridX)))+(yNext*(gridY)))+6);
  p.line((x2+(xNext*(gridX)))+10-(x/2), (y2+(y*(gridX)))+6-(y/2), ((x3+(xNext*(gridX)))-(x*(gridY)))+10-(x/2), ((y3+(y*(gridX)))+(yNext*(gridY)))+6-(y/2));
  p.line(((x3+(xNext*(gridX)))-(x*(gridY)))-10+(x/2), ((y3+(y*(gridX)))+(yNext*(gridY)))+6-(y/2), x-10+(x/2), (y*(gridY+2))+Ceil+6-(y/2));


  //XY GRID LEGEND ALONG BOTTOM AND RIGHT EDGE OF ROOM
  //p.line(((x3+(xNext*(gridX)))-(x*(gridY)))-10, ((y3+(y*(gridX)))+(yNext*(gridY)))+6, x-10, (y*(gridY+2))+Ceil+6);
  p.textSize(10);
  p.fill(0);
  p.noStroke();
  p.text(wallDepVal, ((x3+(xNext*(gridX)))-(x*(gridY)))+10, ((y3+(y*(gridX)))+(yNext*(gridY)))+16 );
  p.text(wallLen, ((x3+(xNext*(gridX)))-(x*(gridY)))-24, ((y3+(y*(gridX)))+(yNext*(gridY)))+16 );
  p.stroke(150,150,150);
  p.strokeWeight(1);
  //p.point(((x3+(xNext*(gridX)))-(x*(gridY)))+10, ((y3+(y*(gridX)))+(yNext*(gridY)))+6);
  p.line(((x3+(xNext*(gridX)))-(x*(gridY)))+10, ((y3+(y*(gridX)))+(yNext*(gridY)))+6,((x3+(xNext*(gridX)))-(x*(gridY)))+10-x, ((y3+(y*(gridX)))+(yNext*(gridY)))+6-y);
  p.line(((x3+(xNext*(gridX)))-(x*(gridY)))-10, ((y3+(y*(gridX)))+(yNext*(gridY)))+6,((x3+(xNext*(gridX)))-(x*(gridY)))-10+x, ((y3+(y*(gridX)))+(yNext*(gridY)))+6-y);
  //p.point(((x3+(xNext*(gridX)))-(x*(gridY)))-10, ((y3+(y*(gridX)))+(yNext*(gridY)))+6);
  for (let RLen = 0; RLen < wallDepVal; RLen = RLen + 5){
    p.stroke(150,150,150);
    p.strokeWeight(1);
    let myNewX = ((x2+(xNext*(gridX)))+10) - (((x3+(xNext*(gridX)))-(x*(gridY)))+10);
    let myNewY = (((y3+(y*(gridX)))+(yNext*(gridY)))+6) - ((y2+(y*(gridX)))+6);
    myNewX = myNewX/(wallDepVal);
    myNewX = myNewX * RLen;
    myNewY = myNewY/(wallDepVal);
    myNewY = myNewY * RLen;
    //p.point((x2+(xNext*(gridX)))+10-myNewX, (y2+(y*(gridX)))+6+myNewY);
    p.line((x2+(xNext*(gridX)))+10-myNewX, (y2+(y*(gridX)))+6+myNewY,(x2+(xNext*(gridX)))+10-myNewX-x, (y2+(y*(gridX)))+6+myNewY-y);
    p.fill(0);
    p.noStroke();
    p.text(RLen, (x2+(xNext*(gridX)))+12-myNewX, (y2+(y*(gridX)))+16+myNewY);
  }
  for (let RDep = 0; RDep < wallLen; RDep = RDep + 5){
    p.stroke(150,150,150);
    p.strokeWeight(1);
    let myNewX = ((x3+(xNext*(gridX)))-(x*(gridY)))-10 - (x-10);
    let myNewY = (y*(gridY+2))+Ceil - ((y3+(y*(gridX)))+(yNext*(gridY)));
    myNewX = myNewX/(wallLen);
    myNewX = myNewX * RDep;
    myNewY = myNewY/(wallLen);
    myNewY = myNewY * RDep;
    //p.point( x-10 + myNewX, (y*(gridY+2))+Ceil+6  - myNewY);
    if (RDep > 0){
    p.line(x-10 + myNewX, (y*(gridY+2))+Ceil+6  - myNewY,x-10 + myNewX+x, (y*(gridY+2))+Ceil+6  - myNewY-y);
    }
    p.fill(0);
    p.noStroke();
    p.text(RDep, x-24 + myNewX, (y*(gridY+2))+Ceil+16  - myNewY);
  }
  p.pop();
  p.pop();



  //WINDOW ON WALL

  let FullRoomWidthX = x2-x;
  let FullRoomWidthY = (y*(gridY+2))-(y2-Ceil);

  p.push();
  p.fill(230,230,245);
  p.stroke(light_black);
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
  p.stroke(150);
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
  p.stroke(light_black);
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
    let vSX1 = arrayX[2]+(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDep)-(((200*m)-x)*vertShadeDist)-(vertShadeShift*x);
    let vSY1 = arrayY[2]-(y*vertShadeDep)-(k*y*vertShadeSpace)-(vertShadeHeight*y*2)-(y*vertShadeDist)+(vertShadeShift*y);
    let vSX2 = arrayX[2]+(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDist)-(vertShadeShift*x);
    let vSY2 = arrayY[2]-(k*y*vertShadeSpace)-(vertShadeHeight*y*2)-(y*vertShadeDist)+(vertShadeShift*y);
    let vSX4 = arrayX[1]+(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDep)-(((200*m)-x)*vertShadeDist)-(vertShadeShift*x);
    let vSY4 = arrayY[1]-(y*vertShadeDep)-(k*y*vertShadeSpace)-(vertShadeHeight*y*2)-(y*vertShadeDist)+(vertShadeScale*y*2)+(vertShadeShift*y);
    let vSX3 = arrayX[1]+(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDist)-(vertShadeShift*x);
    let vSY3 = arrayY[1]-(k*y*vertShadeSpace)-(vertShadeHeight*y*2)-(y*vertShadeDist)+(vertShadeScale*y*2)+(vertShadeShift*y);
    //p.line(vSX1, vSY1, vSX2, vSY2);
    //p.line(vSX3, vSY3, vSX4, vSY4);
    p.quad(vSX1, vSY1, vSX2, vSY2,vSX3, vSY3, vSX4, vSY4)
  }
}else{
    for (let k = 0; k<vertShadeNum; k++){
    let vSX1 = arrayX[3]-(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDep)-(((200*m)-x)*vertShadeDist)+(vertShadeShift*x);
    let vSY1 = arrayY[3]-(y*vertShadeDep)+(k*y*vertShadeSpace)-(vertShadeHeight*y*2)-(y*vertShadeDist)-(vertShadeShift*y);
    let vSX2 = arrayX[3]-(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDist)+(vertShadeShift*x);
    let vSY2 = arrayY[3]+(k*y*vertShadeSpace)-(vertShadeHeight*y*2)-(y*vertShadeDist)-(vertShadeShift*y);
    let vSX4 = arrayX[0]-(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDep)-(((200*m)-x)*vertShadeDist)+(vertShadeShift*x);
    let vSY4 = arrayY[0]-(y*vertShadeDep)+(k*y*vertShadeSpace)-(vertShadeHeight*y*2)-(y*vertShadeDist)+(vertShadeScale*y*2)-(vertShadeShift*y);
    let vSX3 = arrayX[0]-(k*x*vertShadeSpace)-(((200*m)-x)*vertShadeDist)+(vertShadeShift*x);
    let vSY3 = arrayY[0]+(k*y*vertShadeSpace)-(vertShadeHeight*y*2)-(y*vertShadeDist)+(vertShadeScale*y*2)-(vertShadeShift*y);
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



//THIS IS A FIX THAT ALLOWS THE ROOM ORIENTATION TO ROTATE A FULL 360 DEGREES
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



// VERTICAL SHADES XY
let LouverList1 = [];
let XYLouverTest = [];

if (parseInt(vertShadeOn) == 1){

  // VERTICAL SHADES XY
  let XYLouverTest = [];
        let b1;
        let Xloc1 = [];
        let XYtest1 = [];
        let AWArray1 = [];
        let ZAdd = [];
        let bigB = 0;
        let superB = [];
        let superD = [];
        let filledList = [];
        let filledListI = [];
        for (let i = 0; i<gridX; i++) {
          let filledListJ = [];
          for (let j = 0; j<gridY; j++){
            let filledListK = [];
            for (let k = 0; k<coordinates.length; k++){
              let filledListN = [];
              for (let n = 0; n<r.glzCoords.length; n++){
                let filledListP = [];
                for (let p = 0; p<parseInt(vertShadeNum); p++){
                  filledListP.push(0);
                }
                filledListN.push(filledListP);
              }
              filledListK.push(filledListN);
            }
            filledListJ.push(filledListK);
          }
          filledListI.push(filledListJ);
        }

        let filledListZ = [];
        for (let i = 0; i<gridX; i++) {
          let filledListJ = [];
          for (let j = 0; j<gridY; j++){
            let filledListK = [];
            for (let k = 0; k<coordinates.length; k++){
              let filledListN = [];
              for (let n = 0; n<r.glzCoords.length; n++){
                let filledListP = [];
                for (let p = 0; p<parseInt(vertShadeNum); p++){
                  filledListP.push(0);
                }
                filledListN.push(filledListP);
              }
              filledListK.push(filledListN);
            }
            filledListJ.push(filledListK);
          }
          filledListZ.push(filledListJ);
        }

        for (let i = 0; i<gridX; i++) {
          let YdistanceFromWall = (i+1); // grid distance from window wall in Y direction
          b1 = 0;
          filledList.push(0);
          for (let j = 0; j<gridY; j++){
            b1 = 0;
            for (let k = 0; k<coordinates.length; k++){
              let XYLouver1 = 0;
              let XlocationOnWall = 180; // this is a safe angle for the point to start from.. 180 means that it is perpindicular from the point (towards the wall?)
              if (newCoordinateArray[k]<88.0 && newCoordinateArray[k]> -88.0){
                  XlocationOnWall = Math.tan(newCoordinateArray[k]*(3.1415926 / 180))*YdistanceFromWall; //this is real point at the window wall relative to the grid point. Add j to get the real location on the window wall
              }
              AWArray1.push(XlocationOnWall);
              let xCoord = 0;
              let bigBArray = [];
              let superC = [];

              for (let n = 0; n<r.glzCoords.length; n++){ //cycle through each window
                // if (XlocationOnWall+(j+1) > r.glzCoords[n][0][0]+(wallDepVal/2)  && XlocationOnWall+(j+1) < r.glzCoords[n][1][0]+(wallDepVal/2)){ //cycle through all the windows, check if the wall position exists within the bounds of the window
                //   xCoord = n+1; //we really only care about if a point gets hit 1x per timestep so this number could go crazy high, but it only needs to go up by 1 to count.. if it gets sun from multiple windows it doesnt really matter
                // }
                // xCoord = 1;
              //}if(xCoord > 0){ //if this specific gridpoint and sun angle goes through a window...
              let newBigBArray = [];
                  for (let p = 0; p<parseInt(vertShadeNum); p++){ //for each shade in this window...

                    let angleA = abs(newCoordinateArray[k]);
                    let angleB = 90.0-abs(newCoordinateArray[k]);
                    if (newCoordinateArray[k] > 0){
                      angleB = angleB * -1;
                    }
                    let bigA;
                    if(vertShadeStart == "L"){
                      bigA = ((XlocationOnWall+(j+1)+(r.glzCoords[n][0][0]-(wallDepVal/2))+(p*parseInt(vertShadeSpace)-vertShadeShift)));
                    }else{
                      bigA = ((XlocationOnWall+(j+1)-(r.glzCoords[n][0][0]+(wallDepVal/2))+(-p*parseInt(vertShadeSpace)-vertShadeShift)));
                    }
                    bigB = ((Math.sin(angleB*(3.1415926 / 180))*bigA)/(Math.sin(angleA*(3.1415926 / 180))));
                    bigBArray.push(bigB);
                    newBigBArray.push(bigB);
                  }superC.push(newBigBArray);
              }//console.log(bigBArray.length);
              superB.push(bigBArray);
              superD.push(superC);
              for (let q = 0; q < superC.length; q++){ // I think the problem exists here... need a second layer of for loop?
                for (let g = 0; g < superC[0].length; g++){
                  if (superC[q][g] > parseInt(vertShadeDist) && superC[q][g] < (parseInt(vertShadeDist) + parseInt(vertShadeDep))){
                    XYLouver1 = XYLouver1 + 1;
                    filledListI[i][j][k][q][g] = 1;
                }else{
                  filledListI[i][j][k][q][g] = 0;
                }
                }
              }//ZAdd.push(bigB)
              if (XYLouver1 > 0){
                b1 = 1;
              }else{
                b1 =  0;
              }XYLouverTest.push(b1);
            }
          }
        }
        //console.log(filledListI);
  // VERTICAL SHADES Z

  let a1;
  let Ztest1 = [];
  let AHArray1 = [];
  let newCounter = 0;
  let emptyList = [];
    for (let i = 0; i<gridX; i++) {
    let distanceFromWall = (i+1)/4;
    a1 = 0;
    for (let j = 0; j<gridY; j++){
      a1 = 0;
      for (let k = 0; k<coordinates.length; k++){
        let distanceBeyondWall = 0;
        let anotherCounter = 0;
        let angleHeight = Math.tan((coordinates[k][1])*(3.1415926 / 180))*distanceFromWall;

        for (let n = 0; n<r.glzCoords.length; n++){

          for (let ru = 0; ru < vertShadeNum; ru ++){
            distanceBeyondWall = (superD[newCounter][n][ru]);

            let angleHeight2 = Math.tan((coordinates[k][1])*(3.1415926 / 180))*distanceBeyondWall;


            let myVar;
              if (angleHeight + angleHeight2  > (r.glzCoords[0][0][2]-gridHt) - parseInt(vertShadeScale) + parseInt(vertShadeHeight) && angleHeight + angleHeight2  < (r.glzCoords[0][2][2]-gridHt)   + parseInt(vertShadeHeight)){
                myVar = 0;
                 //if this condintion, it hits the full size louver
              }else{
                myVar = 1;
                anotherCounter = anotherCounter + 1
              }
              filledListZ[i][j][k][n][ru] = myVar;
          }
        }
        if (anotherCounter > 0 + vertShadeNum){
          XYLouverTest[newCounter-1] = 0;
        }
        newCounter = newCounter + 1;

      }
    }
  }


let decider = 0;
  for (let i = 0; i<gridX; i++) {
    for (let j = 0; j<gridY; j++){
      for (let k = 0; k<coordinates.length; k++){
        let nextLevel = 0;
        for (let n = 0; n < r.glzCoords.length; n++){
          for (let p = 0; p < parseInt(vertShadeNum); p++){
            decider = 0;
            if (filledListI[i][j][k][n][p] == 1){
              decider = 1;
              if (filledListZ[i][j][k][n][p] == 1){
                decider = 2;
              }
            }
            if (decider == 1){
              nextLevel = nextLevel + 1;
            }
          }
        }if (nextLevel > 0){
          LouverList1.push(1);
        }else{
          LouverList1.push(0);
        }
      }
    }
  }
}else{
  // VERTICAL SHADES XY

        let b1;
        let Xloc1 = [];
        let XYtest1 = [];
        let AWArray1 = [];
        let ZAdd = [];
        let bigB = 0;
        let superB = [];
        let superD = [];
        let filledList = [];
        for (let i = 0; i<gridX; i++) {
          let YdistanceFromWall = (i+1); // grid distance from window wall in Y direction
          b1 = 0;
          filledList.push(0);
          for (let j = 0; j<gridY; j++){
            b1 = 0;
            for (let k = 0; k<coordinates.length; k++){
              let XYLouver1 = 0;
              let XlocationOnWall = 180; // this is a safe angle for the point to start from.. 180 means that it is perpindicular from the point (towards the wall?)
              if (newCoordinateArray[k]<88.0 && newCoordinateArray[k]> -88.0){
                  XlocationOnWall = Math.tan(newCoordinateArray[k]*(3.1415926 / 180))*YdistanceFromWall; //this is real point at the window wall relative to the grid point. Add j to get the real location on the window wall
              }
              AWArray1.push(XlocationOnWall);
              let xCoord = 0;
              let bigBArray = [];
              let superC = [];

              for (let n = 0; n<r.glzCoords.length; n++){ //cycle through each window
                // if (XlocationOnWall+(j+1) > r.glzCoords[n][0][0]+(wallDepVal/2)  && XlocationOnWall+(j+1) < r.glzCoords[n][1][0]+(wallDepVal/2)){ //cycle through all the windows, check if the wall position exists within the bounds of the window
                //   xCoord = n+1; //we really only care about if a point gets hit 1x per timestep so this number could go crazy high, but it only needs to go up by 1 to count.. if it gets sun from multiple windows it doesnt really matter
                // }
                // xCoord = 1;
              //}if(xCoord > 0){ //if this specific gridpoint and sun angle goes through a window...
              let newBigBArray = [];
                  for (let p = 0; p<parseInt(vertShadeNum); p++){ //for each shade in this window...

                    let angleA = abs(newCoordinateArray[k]);
                    let angleB = 90.0-abs(newCoordinateArray[k]);
                    if (newCoordinateArray[k] > 0){
                      angleB = angleB * -1;
                    }
                    let bigA;
                    if(vertShadeStart == "L"){
                      bigA = ((XlocationOnWall+(j+1)+(r.glzCoords[n][0][0]-(wallDepVal/2))+(p*parseInt(vertShadeSpace)-vertShadeShift)));
                    }else{
                      bigA = ((XlocationOnWall+(j+1)-(r.glzCoords[n][0][0]+(wallDepVal/2))+(-p*parseInt(vertShadeSpace)-vertShadeShift)));
                    }
                    bigB = ((Math.sin(angleB*(3.1415926 / 180))*bigA)/(Math.sin(angleA*(3.1415926 / 180))));
                    bigBArray.push(bigB);
                    newBigBArray.push(bigB);
                  }superC.push(newBigBArray);
              }//console.log(bigBArray.length);
              superB.push(bigBArray);
              superD.push(superC);
              for (let q = 0; q < superC.length; q++){ // I think the problem exists here... need a second layer of for loop?
                for (let g = 0; g < superC[0].length; g++){
                  if (superC[q][g] > parseInt(vertShadeDist) && superC[q][g] < (parseInt(vertShadeDist) + parseInt(vertShadeDep))){
                    XYLouver1 = XYLouver1 + 1;
                }else{
                  }
                }
              }//ZAdd.push(bigB)
              if (XYLouver1 > 0){
                b1 = 1;
              }else{
                b1 =  0;
              }LouverList1.push(b1);
            }
          }
        }
        //console.log(filledListI);

}

//END OF VERTICAL SHADES




  //START PYTHAGOREAM THEORM FOR XY
  //ASSUME +Y IS DUE NORTH and is the wall opposite the windowwall is N (windowwall is S)

  let b;
  let Xloc = []
  let XYtest = []
  let AWArray = []
  for (let i = 0; i<gridX; i++) {
    let YdistanceFromWall = (i+1); // grid distance from window wall in Y direction
    b = 0;
    for (let j = 0; j<gridY; j++){
      b = 0;
      for (let k = 0; k<coordinates.length; k++){
        let XlocationOnWall = 180; // this is a safe angle for the point to start from.. 180 means that it is perpindicular from the point (towards the wall?)
        if (newCoordinateArray[k]<88.0 && newCoordinateArray[k]> -88.0){
            XlocationOnWall = Math.tan(newCoordinateArray[k]*(3.1415926 / 180))*YdistanceFromWall; //this is real point at the window wall relative to the grid point. Add j to get the real location on the window wall
            //console.log(XlocationOnWall);
        }
        AWArray.push(XlocationOnWall);
        let xCoord = 0;
        let vertLouverXdistance = [];
        for (let m = 0; m<r.glzCoords.length; m++){

          if (XlocationOnWall+(j+1) > r.glzCoords[m][0][0]+(wallDepVal/2)  && XlocationOnWall+(j+1) < r.glzCoords[m][1][0]+(wallDepVal/2)){ //cycle through all the windows, check if the wall position exists within the bounds of the window
            xCoord = xCoord + 1; //we really only care about if a point gets hit 1x per timestep so this number could go crazy high, but it only needs to go up by 1 to count.. if it gets sun from multiple windows it doesnt really matter
          }
          // if(xCoord > 0){ //if this specific gridpoint and sun angle goes through this window...
          //   if (vertShadeStart == "L" && vertShadeNum > 0){ //do this if the vert louvers start at the left and there is at least 1 vert louver
          //     for (let r = 0; r<vertShadeNum; r++){ //for each shade in this window...
          //       vertLouverXdistance.push((XlocationOnWall+(j+1)+);
          //     }
          //   }
          // }
        }
        if (xCoord > 0){
          b = 1;
        }else{
          b =  0;
        }XYtest.push(b);

      }
    }
  }//console.log(parseInt(vertShadeDist) + parseInt(vertShadeDep));
  //END PYTHAGOREM THEORM FOR XY


  //START PYTHAGOREAM THEORM FOR Z
  //THIS IS WHERE YOU WILL NEED TO LOOK AT THE VERTICAL SHADES pt2

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
          let testArray1 = [1];
          for (let n = 0; n < horzShadeNum; n++){
            let sinLawDist = (horzShadeDist*(Math.sin(3.1415926-(((90)-coordinates[k][1])*(3.1415926 / 180))-(90*(3.1415926 / 180)))))/Math.sin(((90)-coordinates[k][1])*(3.1415926 / 180));
            let sinLawAngle = (horzShadeDep*(Math.sin(3.1415926-(((90)-coordinates[k][1])*(3.1415926 / 180))-(horzShadeAngle*(3.1415926 / 180)))))/Math.sin(((90)-coordinates[k][1])*(3.1415926 / 180));

            if (angleHeight < (r.glzCoords[0][2][2]-gridHt)-(horzShadeSpace*n)-(sinLawDist)+(p.float(horzShadeHeight)*.5) && angleHeight > ((r.glzCoords[0][2][2]-gridHt)-(horzShadeSpace*n)-(sinLawDist)-(sinLawAngle)+(p.float(horzShadeHeight)*.5))){
              testArray1.push(0);
            }else{
              testArray1.push(1);
            }
          }
          let SortedArray = testArray1.sort();
          let SALength = testArray1.length;
          let itemArray = SortedArray[0];
          a = itemArray;

          //console.log(SortedArray);
        }else{
          a = 0;
        }Ztest.push(a);
      }
    }
  }
//END PYTHAGOREAM THEROM FOR Z
//console.log(singleAngleHeightList);

  //START XY and Z check
  let gridColor;
  let gridColorArray = []
  for (let i = 0; i < XYtest.length; i++){
    //let vertZTestItem = vertZTest[i];
    //let XYLouv = XYLouverTest[i];
    let XYLouv = LouverList1[i];
    let XYcolor = XYtest[i];
    let Zcolor = Ztest[i];

    if (XYcolor == 1 && Zcolor == 1 && XYLouv == 0){
      gridColor = gridColor + 1;
    }else{
      gridColor = gridColor + 0;
    }if (i % coordinates.length == (coordinates.length)-1){
      gridColorArray.push(gridColor);
      gridColor = 0;
  }
}

for (let i = 0; i < gridColorArray; i++){
  if (gridColorArray[i] < valMDST && gridColorArray[i+1] > valMDST){

  }
}

//END OF TRIG

// CREATE GRID
  //GRID X ROW
  let MDT; //Max Direct Time
  let Percentage = valMDST;
  //console.log(gridColorArray);

  for (let i = 0; i<gridX; i++) {
    let X1 = (x2+(xNext*i));
    let Y1 = (y2+(y*i));
    let X2 = (x2+(xNext*(i+1)));
    let Y2 = (y2+(y*(i+1)));
    let X3 = (x3+(xNext*(i+1)));
    let Y3 = (y3+(y*(i+1)));
    let X4 = (x3+(xNext*i));
    let Y4 = (y3+(y*i));
    let mySun = 0;
    if(i == 0){
      // mySun = (p.int(gridColorArray[1*gridY]/timestep));
      mySun = gridColorArray[1*gridY];
    }else{
      // mySun = (p.int(gridColorArray[i*gridY]/timestep));
      mySun = gridColorArray[i*gridY];
    }
    if(mySun > Percentage/timestep){
      MDT = MDT + 1;
    }

    mySun = p.int(mySun/timestep);


      p.fill(ColorScaleArray[mySun].r,ColorScaleArray[mySun].g,ColorScaleArray[mySun].b,200);

      p.quad(X1, Y1-GridHt, X2, Y2-GridHt, X3, Y3-GridHt, X4, Y4-GridHt);

      // if (gridColorArray[i*gridY]/(timestep-.1) < valMDST && gridColorArray[(i*gridY)-1]/(timestep-.1) > valMDST){
      //   p.push();
      //   p.strokeWeight(1);
      //   p.stroke(50);
      //   p.line(X3, Y3-GridHt, X4, Y4-GridHt);
      //   p.pop();
      // }

      if (gridColorArray[i*gridY]/(timestep-.1) > valMDST/timestep && gridColorArray[(i*gridY)+1]/(timestep-.1) < valMDST/timestep){
        p.push();
        p.strokeWeight(1);
        p.stroke(0);
        p.line(X3, Y3-GridHt, X4, Y4-GridHt);
        p.pop();
      }
      if (gridColorArray[(i*gridY)]/(timestep-.1) < valMDST/timestep && gridColorArray[(i*gridY)+gridY]/(timestep-.1) > valMDST/timestep){
        p.push();
        p.strokeWeight(1);
        p.stroke(0);
        p.line(X2, Y2-GridHt, X3, Y3-GridHt);
        p.pop();
      }
      if (gridColorArray[(i*gridY)]/(timestep-.1) > valMDST/timestep && gridColorArray[(i*gridY)+gridY]/(timestep-.1) < valMDST/timestep){
        p.push();
        p.strokeWeight(1);
        p.stroke(0);
        p.line(X2, Y2-GridHt, X3, Y3-GridHt);
        p.pop();
      }

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
      if(j == 0){
        // mySun = (p.int(gridColorArray[(i*gridY)+1]/timestep));
        mySun = gridColorArray[(i*gridY)+1];
      }else{
        // mySun = p.int(gridColorArray[(i*gridY)+j]/timestep);
        mySun = gridColorArray[(i*gridY)+j];
      }
      if( mySun/timestep > Percentage/timestep){
         MDT = p.int(MDT) + 1;
      }
      //console.log(mySun);
      mySun = p.int(mySun/timestep);


        p.fill(ColorScaleArray[mySun].r,ColorScaleArray[mySun].g,ColorScaleArray[mySun].b,200);

      p.quad(newX1, newY1-GridHt, newX2, newY2-GridHt, newX3, newY3-GridHt, newX4, newY4-GridHt);
      if (gridColorArray[(i*gridY)+j]/(timestep-.1) < valMDST/timestep && gridColorArray[(i*gridY)+j+1]/(timestep-.1) > valMDST/timestep){
        p.push();
        p.strokeWeight(1);
        p.stroke(0);
        p.line(newX3, newY3-GridHt, newX4, newY4-GridHt);
        p.pop();
      }
      if (gridColorArray[(i*gridY)+j]/(timestep-.1) > valMDST/timestep && gridColorArray[(i*gridY)+j+1]/(timestep-.1) < valMDST/timestep){
        p.push();
        p.strokeWeight(1);
        p.stroke(0);
        p.line(newX3, newY3-GridHt, newX4, newY4-GridHt);
        p.pop();
      }
      if (gridColorArray[(i*gridY)+j]/(timestep-.1) < valMDST/timestep && gridColorArray[(i*gridY)+j+gridY]/(timestep-.1) > valMDST/timestep){
        p.push();
        p.strokeWeight(1);
        p.stroke(0);
        p.line(newX2, newY2-GridHt, newX3, newY3-GridHt);
        p.pop();
      }
      if (gridColorArray[(i*gridY)+j]/(timestep-.1) > valMDST/timestep && gridColorArray[(i*gridY)+j+gridY]/(timestep-.1) < valMDST/timestep){
        p.push();
        p.strokeWeight(1);
        p.stroke(0);
        p.line(newX2, newY2-GridHt, newX3, newY3-GridHt);
        p.pop();
      }
    }
  }

// END OF GRID

  //FLOOR GRID PLANE/OUTLINE
  p.push();
  p.noFill();
  p.stroke(light_black+50);
  p.strokeWeight(1);
  p.quad(x2, y2-GridHt, (x2+(xNext*(gridX))), (y2+(y*(gridX)))-GridHt, ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY)))-GridHt, x, (y*(gridY+2))+Ceil-GridHt);
  p.stroke(light_black);

  //CEILING PLANE
  p.quad(x2, y2-Ceil, (x2+(xNext*(gridX))), (y2+(y*(gridX)))-Ceil, ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY)))-Ceil, x, (y*(gridY+2)));

  //WALL LINES
  //line(x2, y2, x2, y2-Ceil); This one exists behind the grid
  p.line((x2+(xNext*(gridX))), (y2+(y*(gridX))), (x2+(xNext*(gridX))), (y2+(y*(gridX)))-Ceil);
  p.line(((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY)))-Ceil, ((x3+(xNext*(gridX)))-(x*(gridY))), ((y3+(y*(gridX)))+(yNext*(gridY))));
  p.line(x, (y*(gridY+2)), x, (y*(gridY+2)+Ceil));
  p.pop();
  //p.noLoop();

  //CHECK IF MEETS CONDITION TEXT

  let MDTPercentage = p.int((p.float(MDT)/(wallLen * wallDepVal))*100);


  p.push();
  if(MDTPercentage < valFal){
    p.fill(0,255,0);
    p.image(imgCheck,310,2,30,30);
  }    else{
    p.fill(255,0,0);
    p.image(imgNope,310,2,30,30);
  }

  p.fill(0);
  p.textSize(50);

  p.text(MDTPercentage +"%", 340,38);
  p.textSize(10);
  p.text("> max direct sun time", 340,50);
  p.pop();

  // p.push();
  //
  // p.fill(50);
  // p.textSize(7);
  // p.text(p.frameCount,420,320);
  // p.pop();
}
}


p.reload = function(){
  //p.loop();
  //noLoop();
}
p.checkButton = function(){
  //p.loop();
  //noLoop();
  if (Case2Button == 1){
    Case2Button = 0;
  }else{
    Case2Button = 1;
  }
}
}
var iso2 = new p5(sketch2);

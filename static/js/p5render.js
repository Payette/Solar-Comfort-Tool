//THIS UPDATES THE FLOOR AREA LOSS, MAX DIRECT SUNTIME AND TIMESTEP PER HOUR VALUES
//IT ALSO REMEMBERS THEM SO THEY CAN BE USED IN THE D3 COLOR CHART BEFORE THE DRAW LOOP

let singleHour = 0;
let fullDay = 1;
let currentFrame = 0;
let annualOn = false; // Check If Annual Button is Pressed
let annualSimulationDone = false; // for regression test timing
let Case2Button = 0;

window.SOLAR_COMFORT.dateCounter = 0;
window.SOLAR_COMFORT.dateCounter1 = 0;

window.SOLAR_COMFORT.MDTResult = 0;
window.SOLAR_COMFORT.MDTResult1 = 0;
window.SOLAR_COMFORT.globalGridColor = undefined;
window.SOLAR_COMFORT.globalGridColor1 = undefined;

let Month_Debug_Case2 = undefined;
let Day_Debug_Case2 = undefined;
let Hour_Debug_Case2 = undefined;

function msg() {
  singleHour = 1;
  fullDay = 0;
}

function msg2() {
  singleHour = 0;
  fullDay = 1;
}

checkAnnual = function (target) { // Check If Annual Button is Pressed
  annualOn = target.checked;
  currentFrame = 0;
  singleHour = 2;
  window.SOLAR_COMFORT.dateCounter = 0;
  window.SOLAR_COMFORT.dateCounter1 = 0;

  for (let i = 0; i <= 1; i++) {
    let c = i === 0 ? '' : '1';

    if (!annualOn) {
      document.getElementById(`annualWarning`).innerHTML = '';
      document.getElementById(`ppdRadio`).disabled = false;
      document.getElementById(`dsHour`).disabled = false;
      document.getElementById(`dsDay`).disabled = false;
      document.getElementById(`long${c}`).disabled = false;
      document.getElementById(`lat${c}`).disabled = false;
      document.getElementById(`timeZone${c}`).disabled = false;
      document.getElementById(`outdoorTemp${c}`).disabled = false;
      document.getElementById(`hour${c}`).disabled = false;
      document.getElementById(`day${c}`).disabled = false;
      document.getElementById(`mon${c}`).disabled = false;
      document.getElementById(`airTemp${c}`).disabled = false;
      document.getElementById(`humidity${c}`).disabled = false;
      document.getElementById(`airSpeed${c}`).disabled = false;
      document.getElementById(`clothing${c}`).disabled = false;
      document.getElementById(`metabolic${c}`).disabled = false;
      document.getElementById(`posture${c}`).disabled = false;
      document.getElementById(`asa${c}`).disabled = false;
      document.getElementById(`north${c}`).disabled = false;
      document.getElementById(`gridHt${c}`).disabled = false;
      document.getElementById(`ceiling${c}`).disabled = false;
      document.getElementById(`wallWidth${c}`).disabled = false;
      document.getElementById(`wallDep${c}`).disabled = false;
      document.getElementById(`wallR${c}`).disabled = false;
      document.getElementById(`windowHeight${c}`).disabled = false;
      document.getElementById(`windowWidth${c}`).disabled = false;
      document.getElementById(`glazing${c}`).disabled = false;
      document.getElementById(`sill${c}`).disabled = false;
      document.getElementById(`distWindow${c}`).disabled = false;
      document.getElementById(`windowU${c}`).disabled = false;
      document.getElementById(`shgc${c}`).disabled = false;
      document.getElementById(`hShadeDep${c}`).disabled = false;
      document.getElementById(`hShadeNum${c}`).disabled = false;
      document.getElementById(`hShadeSpace${c}`).disabled = false;
      document.getElementById(`hShadeDist${c}`).disabled = false;
      document.getElementById(`hShadeHeight${c}`).disabled = false;
      document.getElementById(`hShadeAngle${c}`).disabled = false;
      document.getElementById(`vShadeOn${c}`).disabled = false;
      document.getElementById(`vShadeDep${c}`).disabled = false;
      document.getElementById(`vShadeNum${c}`).disabled = false;
      document.getElementById(`vShadeSpace${c}`).disabled = false;
      document.getElementById(`vShadeShift${c}`).disabled = false;
      document.getElementById(`vShadeDist${c}`).disabled = false;
      document.getElementById(`vShadeHeight${c}`).disabled = false;
      document.getElementById(`vShadeScale${c}`).disabled = false;
      document.getElementById(`vShadeStart${c}`).disabled = false;
    } else {
      // Case2Button = 0;
      document.getElementById(`annualWarning`).innerHTML = 'Chages to inputs are disabled.<br>Turn off Annual to enable changes.';
      document.getElementById(`ppdRadio`).disabled = true;
      document.getElementById(`dsHour`).disabled = true;
      document.getElementById(`dsDay`).disabled = true;
      document.getElementById(`long${c}`).disabled = true;
      document.getElementById(`lat${c}`).disabled = true;
      document.getElementById(`timeZone${c}`).disabled = true;
      document.getElementById(`outdoorTemp${c}`).disabled = true;
      document.getElementById(`hour${c}`).disabled = true;
      document.getElementById(`day${c}`).disabled = true;
      document.getElementById(`mon${c}`).disabled = true;
      document.getElementById(`airTemp${c}`).disabled = true;
      document.getElementById(`humidity${c}`).disabled = true;
      document.getElementById(`airSpeed${c}`).disabled = true;
      document.getElementById(`clothing${c}`).disabled = true;
      document.getElementById(`metabolic${c}`).disabled = true;
      document.getElementById(`posture${c}`).disabled = true;
      document.getElementById(`asa${c}`).disabled = true;
      document.getElementById(`north${c}`).disabled = true;
      document.getElementById(`gridHt${c}`).disabled = true;
      document.getElementById(`ceiling${c}`).disabled = true;
      document.getElementById(`wallWidth${c}`).disabled = true;
      document.getElementById(`wallDep${c}`).disabled = true;
      document.getElementById(`wallR${c}`).disabled = true;
      document.getElementById(`windowHeight${c}`).disabled = true;
      document.getElementById(`windowWidth${c}`).disabled = true;
      document.getElementById(`glazing${c}`).disabled = true;
      document.getElementById(`sill${c}`).disabled = true;
      document.getElementById(`distWindow${c}`).disabled = true;
      document.getElementById(`windowU${c}`).disabled = true;
      document.getElementById(`shgc${c}`).disabled = true;
      document.getElementById(`hShadeDep${c}`).disabled = true;
      document.getElementById(`hShadeNum${c}`).disabled = true;
      document.getElementById(`hShadeSpace${c}`).disabled = true;
      document.getElementById(`hShadeDist${c}`).disabled = true;
      document.getElementById(`hShadeHeight${c}`).disabled = true;
      document.getElementById(`hShadeAngle${c}`).disabled = true;
      document.getElementById(`vShadeOn${c}`).disabled = true;
      document.getElementById(`vShadeDep${c}`).disabled = true;
      document.getElementById(`vShadeNum${c}`).disabled = true;
      document.getElementById(`vShadeSpace${c}`).disabled = true;
      document.getElementById(`vShadeShift${c}`).disabled = true;
      document.getElementById(`vShadeDist${c}`).disabled = true;
      document.getElementById(`vShadeHeight${c}`).disabled = true;
      document.getElementById(`vShadeScale${c}`).disabled = true;
      document.getElementById(`vShadeStart${c}`).disabled = true;
    }
  }
}

let timeStepValue = 4;
let ppdValue1 = 4;
$("#timeStep").on("input", function (event) {
  timeStepValue = $(this).val();
  $("#ppdOutput2").text(Number.parseFloat(ppdValue1 / timeStepValue).toFixed(2) + " Hr");
});

$("#fal").on("input", function (event) {
  if ($(this).val() <= 0) {
    ppdValue = 1;
    $("#fal").val(1);
    $("#ppdOutput").text("0%");
  }
  else if ($(this).val() > 100) {
    ppdValue = 100;
    $("#fal").val(100);
    $("#ppdOutput").text("99%");
  }
  else {
    ppdValue = $(this).val();
    $("#fal").attr("value", ppdValue);
    $("#ppdOutput").text(ppdValue + "%");
  }
});

$("#mdst").on("change", function (event) {
  if ($(this).val() == 1) {
    ppdValue1 = 1;
    $("#mdst").val(1);
    $("#ppdOutput2").text(Number.parseFloat(ppdValue1 / timeStepValue).toFixed(2) + " Hr");
  }
  else {
    ppdValue1 = $(this).val();
    $("#mdst").attr("value", ppdValue1);
    $("#ppdOutput2").text(Number.parseFloat(ppdValue1 / timeStepValue).toFixed(2) + " Hr");
  }
});

//D3 COLOR CHART

d3.select("#visualization").append('svg').attr("height", 80).attr("width", 327)
var vis = d3.select("svg")
var arr = d3.range(13 * timeStepValue)
var ColorScaleArray = [];
var dataset = [0, 2, 4, 6, 8, 10, 12];

//position scale
var xScale = d3.scale.linear().domain([0, 13]).range([0, 325])

//The mystical polylinear color scale
// var colorScale = d3.scale.linear().domain([0, 2, 3, 5, 12])
//     .range([d3.rgb(255,255,255), d3.rgb(255,222,60), d3.rgb(218,93,127), d3.rgb(220,26,85), d3.rgb(220,26,85)])
var colorScale = d3.scale.linear().domain([0, 6, 13])
  .range(["#ffffff", "#e2706a", "#893132"])

vis.selectAll('rect').data(arr).enter()
  .append('rect')
  .attr({
    x: function (d) { return xScale(d) + 1 },
    y: 16,
    height: 12,
    width: 25,
    stroke: d3.rgb(0, 0, 0),
    fill: function (d) { ColorScaleArray.push(d3.rgb(colorScale(d))); return colorScale(d) }
  });


vis.selectAll("text") // <-- Note "text", not "circle" or "rect"
  .data(dataset)
  .enter()
  .append("text") // <-- Same here!
  .text(function (d) { return d; })
  .attr("text-anchor", "middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", "9px")
  .attr({
    x: function (d) { return xScale(d) + 12 },
    y: 40
  });

vis.append("text")
  .attr("x", 0)
  .attr("y", 12)
  .text("Hours of Day in Direct Sun")
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")



//INIT SKETCH1 P5 CANVAS

renderGraphicsAndRunSimulation = caseNumber => {
  // append 1 to case 2 variables
  let c = caseNumber === 1 ? '' : '1';

  return function (p) {
    let GridHtSlider, SunRotationSlider;
    let light_black = 100;


    let Lon;
    let Lat;
    let TimeZone;
    let Hour;
    let Day;
    let Month;            
    let coordinates = []; // [ azimuth in degress, elevation in degress ]
    // let solar;
    let xPointLoc = [];
    let yPointLoc = [];
    let roomOrientationValue;
    // let myButton = 0;
    let currentStudy = 0;
    let datesAnnual = [];
    let annualCoordinates = [];
    let bigArrayColor = [];


    var imgCheck;
    var imgNope;
    p.preload = function () {
      imgCheck = p.loadImage('static/images/check.png');
      imgNope = p.loadImage('static/images/x.png');
    }

    p.setup = function () {
      //createCanvas(800, 500, SVG);
      //createCanvas(800, 500);
      p.cnv = p.createCanvas(440, 375);
      // Move the canvas so it’s inside the <div id="sketch-holder">.
      p.cnv.parent(`sketch${c}`);
      p.noStroke();

      if (caseNumber === 2) {
        document.getElementsByName("button1")[0].addEventListener('click', p.checkButton);
        document.getElementsByName("button1")[1].addEventListener('click', p.checkButton);
        document.getElementsByName("button1")[2].addEventListener('click', p.checkButton);
        document.getElementsByName("button1")[3].addEventListener('click', p.checkButton);
      }
    };

    p.draw = function () {
      p.clear();
      p.background(255);

      if (caseNumber === 2) {
        if (Case2Button == 0) {
          document.getElementsByName("button1")[0].className = "button1OFF";
          document.getElementsByName("button1")[1].className = "button1OFF";
          document.getElementsByName("button1")[2].className = "button1OFF";
          document.getElementsByName("button1")[3].className = "button1OFF";
  
          $("input.case2, select.case2").css("visibility", "hidden");
  
          document.getElementById("long1").disabled = true;
          document.getElementById("lat1").disabled = true;
          document.getElementById("timeZone1").disabled = true;
          document.getElementById("outdoorTemp1").disabled = true;
          document.getElementById("hour1").disabled = true;
          document.getElementById("day1").disabled = true;
          document.getElementById("mon1").disabled = true;
          document.getElementById("airTemp1").disabled = true;
          document.getElementById("humidity1").disabled = true;
          document.getElementById("airSpeed1").disabled = true;
          document.getElementById("clothing1").disabled = true;
          document.getElementById("metabolic1").disabled = true;
          document.getElementById("posture1").disabled = true;
          document.getElementById("asa1").disabled = true;
          document.getElementById("north1").disabled = true;
          document.getElementById("gridHt1").disabled = true;
          document.getElementById("ceiling1").disabled = true;
          document.getElementById("wallWidth1").disabled = true;
          document.getElementById("wallDep1").disabled = true;
          document.getElementById("wallR1").disabled = true;
          document.getElementById("windowHeight1").disabled = true;
          document.getElementById("windowWidth1").disabled = true;
          document.getElementById("glazing1").disabled = true;
          document.getElementById("sill1").disabled = true;
          document.getElementById("distWindow1").disabled = true;
          document.getElementById("windowU1").disabled = true;
          document.getElementById("shgc1").disabled = true;
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
        } else {
          document.getElementsByName("button1")[0].className = "button1ON";
          document.getElementsByName("button1")[1].className = "button1ON";
          document.getElementsByName("button1")[2].className = "button1ON";
          document.getElementsByName("button1")[3].className = "button1ON";
  
          $("input.case2, select.case2").css("visibility", "visible");
  
          document.getElementById("long1").disabled = false;
          document.getElementById("lat1").disabled = false;
          document.getElementById("timeZone1").disabled = false;
          document.getElementById("outdoorTemp1").disabled = false;
          document.getElementById("hour1").disabled = false;
          document.getElementById("day1").disabled = false;
          document.getElementById("mon1").disabled = false;
          document.getElementById("airTemp1").disabled = false;
          document.getElementById("humidity1").disabled = false;
          document.getElementById("airSpeed1").disabled = false;
          document.getElementById("clothing1").disabled = false;
          document.getElementById("metabolic1").disabled = false;
          document.getElementById("posture1").disabled = false;
          document.getElementById("asa1").disabled = false;
          document.getElementById("north1").disabled = false;
          document.getElementById("gridHt1").disabled = false;
          document.getElementById("ceiling1").disabled = false;
          document.getElementById("wallWidth1").disabled = false;
          document.getElementById("wallDep1").disabled = false;
          document.getElementById("wallR1").disabled = false;
          document.getElementById("windowHeight1").disabled = false;
          document.getElementById("windowWidth1").disabled = false;
          document.getElementById("glazing1").disabled = false;
          document.getElementById("sill1").disabled = false;
          document.getElementById("distWindow1").disabled = false;
          document.getElementById("windowU1").disabled = false;
          document.getElementById("shgc1").disabled = false;
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
        }
      }

      if (annualOn) { // Check If Annual Button is Pressed

        if (currentFrame < 367) {
          currentFrame += 1;
        }
        p.push()
        p.noFill();
        p.stroke(150);
        p.strokeWeight(1);
        p.rect(5, 345, 367, 11);
        p.strokeWeight(0);
        if (currentFrame > 365) {
          p.fill('#61bb4c');
          p.rect(5, 345, 367, 11);
        } else {
          p.fill(150);
          p.rect(5, 345, currentFrame, 11);
          p.fill(100);
          p.text("CALCULATING ANNUAL DAYLIGHTING FACTOR", 55, 355);

        }

        p.pop();
      }


      let glzOrWidth = document.getElementById(`glazingRatioCheck`).checked;
      //console.log(Radiox);
      document.getElementsByName(`glazingRadio`)[0].addEventListener('input', p.reload);
      document.getElementsByName(`glazingRadio`)[1].addEventListener('input', p.reload);


      // document.getElementsByName("button1")[0].addEventListener('click', p.checkButton);
      //console.log(myButton);

      // CLIMATE

      let Lon1 = document.getElementById(`long${c}`).value;
      document.getElementsByName(`long${c}`)[0].addEventListener('input', p.reload);

      let Lat1 = document.getElementById(`lat${c}`).value;
      document.getElementsByName(`lat${c}`)[0].addEventListener('input', p.reload);

      let TimeZone1 = document.getElementById(`timeZone${c}`).value;
      document.getElementsByName(`timeZone${c}`)[0].addEventListener('input', p.reload);

      let outdoorTemp = document.getElementById(`outdoorTemp${c}`).value;

      // TIME CONFIG

      let Hour1 = document.getElementById(`hour${c}`).value;
      document.getElementsByName(`hour${c}`)[0].addEventListener('input', p.reload);

      let Day1 = document.getElementById(`day${c}`).value;
      document.getElementsByName("day")[0].addEventListener('input', p.reload);

      let Month1 = document.getElementById(`mon${c}`).value;
      document.getElementsByName("mon")[0].addEventListener('input', p.reload);

      let timestep = document.getElementById(`timeStep`).value;
      document.getElementsByName("timeStep")[0].addEventListener('input', p.reload);


      // INDOOR CONDITIONS
      let airTemp = document.getElementById(`airTemp${c}`).value;
      document.getElementsByName("airTemp")[0].addEventListener('input', p.reload);

      let humidity = document.getElementById(`humidity${c}`).value;
      document.getElementsByName("humidity")[0].addEventListener('input', p.reload);

      let airSpeed = document.getElementById(`airSpeed${c}`).value;
      document.getElementsByName("airSpeed")[0].addEventListener('input', p.reload);

      let clothing = document.getElementById(`clothing${c}`).value;
      document.getElementsByName("clothing")[0].addEventListener('input', p.reload);

      let metabolic = document.getElementById(`metabolic${c}`).value;
      document.getElementsByName("metabolic")[0].addEventListener('input', p.reload);

      let posture = document.getElementById(`posture${c}`).value;
      document.getElementsByName("posture")[0].addEventListener('select', p.reload);

      let fractionBodyExposed;

      if (posture == "seated") {
        fractionBodyExposed = 0.696;
      } else {
        fractionBodyExposed = 0.725;
      }

      let aveShortwave = document.getElementById(`asa${c}`).value;
      document.getElementsByName("asa")[0].addEventListener('input', p.reload);

      // ROOM GEOMETRY
      let roomOrientationValue1 = document.getElementById(`north${c}`).value;
      document.getElementsByName("north")[0].addEventListener('input', p.reload);

      let gridHeightValue = document.getElementById(`gridHt${c}`).value;
      document.getElementsByName("gridHt")[0].addEventListener('input', p.reload);

      let ceilingHeightValue = document.getElementById(`ceiling${c}`).value;
      document.getElementsByName("ceiling")[0].addEventListener('input', p.reload);
      let ceilingHeightValue1 = document.getElementById(`ceiling${c}`).value;
      document.getElementsByName("ceiling")[0].addEventListener('input', p.reload);

      let wallLen = document.getElementById(`wallWidth${c}`).value;
      document.getElementsByName("wallWidth")[0].addEventListener('input', p.reload);

      let wallDepVal = document.getElementById(`wallDep${c}`).value;
      document.getElementsByName("wallDep")[0].addEventListener('input', p.reload);

      let wallR = document.getElementById(`wallR${c}`).value;
      document.getElementsByName("wallR")[0].addEventListener('input', p.reload);

      // WINDOW GEOMETRY

      let windowHeightValue = document.getElementById(`windowHeight${c}`).value * 10;
      document.getElementsByName("windowHeight")[0].addEventListener('input', p.reload);
      windowHeightValue = windowHeightValue / 10;

      let windowWidthValue = document.getElementById(`windowWidth${c}`).value;
      document.getElementsByName("windowWidth")[0].addEventListener('input', p.reload);

      let glzRatioValue = document.getElementById(`glazing${c}`).value;
      document.getElementsByName("glazing")[0].addEventListener('input', p.reload);

      let sillHeightValue = document.getElementById(`sill${c}`).value;
      document.getElementsByName("sill")[0].addEventListener('input', p.reload);

      let distanceWindows = document.getElementById(`distWindow${c}`).value;
      document.getElementsByName("distWindow")[0].addEventListener('input', p.reload);

      let windowU = document.getElementById(`windowU${c}`).value;
      document.getElementsByName("windowU")[0].addEventListener('input', p.reload);

      let shgc = document.getElementById(`shgc${c}`).value;
      document.getElementsByName("shgc")[0].addEventListener('input', p.reload);


      // SHADE GEOMETRY

      let horzShadeDep = document.getElementById(`hShadeDep${c}`).value;
      document.getElementsByName("hShadeDep")[0].addEventListener('input', p.reload);

      let horzShadeNum = document.getElementById(`hShadeNum${c}`).value;
      document.getElementsByName("hShadeNum")[0].addEventListener('input', p.reload);

      let horzShadeSpace = document.getElementById(`hShadeSpace${c}`).value;
      document.getElementsByName("hShadeSpace")[0].addEventListener('input', p.reload);

      let horzShadeDist = document.getElementById(`hShadeDist${c}`).value;
      document.getElementsByName("hShadeDist")[0].addEventListener('input', p.reload);

      let horzShadeHeight = document.getElementById(`hShadeHeight${c}`).value;
      document.getElementsByName("hShadeHeight")[0].addEventListener('input', p.reload);

      let horzShadeAngle = document.getElementById(`hShadeAngle${c}`).value;
      document.getElementsByName("hShadeAngle")[0].addEventListener('input', p.reload);

      let vertShadeDep = document.getElementById(`vShadeDep${c}`).value;
      document.getElementsByName("vShadeDep")[0].addEventListener('input', p.reload);

      let vertShadeNum = document.getElementById(`vShadeNum${c}`).value;
      document.getElementsByName("vShadeNum")[0].addEventListener('input', p.reload);

      let vertShadeSpace = document.getElementById(`vShadeSpace${c}`).value;
      document.getElementsByName("vShadeSpace")[0].addEventListener('input', p.reload);

      let vertShadeStart = document.getElementById(`vShadeStart${c}`).value;
      document.getElementsByName("vShadeStart")[0].addEventListener('input', p.reload);

      let vertShadeShift = document.getElementById(`vShadeShift${c}`).value;
      document.getElementsByName("vShadeShift")[0].addEventListener('input', p.reload);

      let vertShadeDist = document.getElementById(`vShadeDist${c}`).value;
      document.getElementsByName("vShadeDist")[0].addEventListener('input', p.reload);

      let vertShadeOn = document.getElementById(`vShadeOn${c}`).value;
      document.getElementsByName("vShadeOn")[0].addEventListener('click', p.reload);

      let vShadeCheckbox = document.querySelector("input[name=vShadeOn]");

      if (vShadeCheckbox.checked) {
        vertShadeOn = 0;
      } else {
        vertShadeOn = 1;
      }

      let vertShadeHeight = document.getElementById(`vShadeHeight${c}`).value;
      document.getElementsByName("vShadeHeight")[0].addEventListener('input', p.reload);

      let vertShadeScale = document.getElementById(`vShadeScale${c}`).value;
      document.getElementsByName("vShadeScale")[0].addEventListener('input', p.reload);

      let valFal = document.getElementById(`fal`).value; //FLOOR AREA LOSS
      document.getElementsByName("fal")[0].addEventListener('input', p.reload1);

      let valMDST = document.getElementById(`mdst`).value; // MAX DIRECT SUN TIME
      document.getElementsByName("mdst")[0].addEventListener('input', p.reload1);


      if (annualOn) { // Check If Annual Button is Pressed
        var dates1 = [];
        offset1 = (new Date().getTimezoneOffset()) / 60;
        date1 = 0;

        if (window.SOLAR_COMFORT[`dateCounter${c}`] < 365) {
          window.SOLAR_COMFORT[`dateCounter${c}`] += 1;
          for (let i = 1; i < 24; i++) {
            hour1 = i / timestep;
            date1 = (new Date(2000, 0, window.SOLAR_COMFORT[`dateCounter${c}`], i - offset1 - TimeZone, (i % parseInt(i)) * 60));
            dates1.push(date1);
          }
        } else {
          window.SOLAR_COMFORT[`dateCounter${c}`] = 365;
          for (let i = 1; i < 24; i++) {
            hour1 = i / timestep;
            date1 = (new Date(2000, 0, window.SOLAR_COMFORT[`dateCounter${c}`], i - offset1 - TimeZone, (i % parseInt(i)) * 60));
            dates1.push(date1);
          }
        }


        xPointLoc = [];
        yPointLoc = [];

        // [ azimuth in degress, elevation in degress ]
        coordinates = [];
        for (let i = 1; i < 23; i++) {
          coordinates.push(solarCalculator([Lon, Lat]).position(dates1[i]));
        }

        for (let i = 0; i < coordinates.length; i++) {
          if (coordinates[i][1] > 0) {
            xPointLoc.push((36 - (36 * (coordinates[i][1] / 180))) * p.sin((coordinates[i][0] - 45 - roomOrientationValue) * (-3.1415926 / 180)));
            yPointLoc.push(((22 - (22 * (coordinates[i][1] / 180))) * p.cos((coordinates[i][0] - 45 - roomOrientationValue) * (-3.1415926 / 180))) - (coordinates[i][1] * .3));
            //p.point((36-(36*(coordinates[i][1]/180)))*p.sin((coordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)), ((22-(22*(coordinates[i][1]/180)))*p.cos((coordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)))-(coordinates[i][1]*.3));
          }
        }

        if (singleHour == 1) {
          coordinates = [];
          let coordinates2 = [];
          for (let i = 1; i <= 9; i++) {
            coordinates.push(solarCalculator([Lon, Lat]).position(date));
          }
          for (let i = 1; i <= 9; i++) {
            coordinates2.push(solarCalculator([Lon, Lat]).position(date2));
          }
          xPointLoc = [];
          yPointLoc = [];
          for (let i = 0; i < coordinates2.length; i++) {
            if (coordinates2[i][1] > 0) {
              xPointLoc.push((36 - (36 * (coordinates2[i][1] / 180))) * p.sin((coordinates2[i][0] - 45 - roomOrientationValue) * (-3.1415926 / 180)));
              yPointLoc.push(((22 - (22 * (coordinates2[i][1] / 180))) * p.cos((coordinates2[i][0] - 45 - roomOrientationValue) * (-3.1415926 / 180))) - (coordinates2[i][1] * .3));
              //p.point((36-(36*(coordinates[i][1]/180)))*p.sin((coordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)), ((22-(22*(coordinates[i][1]/180)))*p.cos((coordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)))-(coordinates[i][1]*.3));
            }
          }
        }
      } else {
        if (Lon == Lon1 && Lat == Lat1 && Hour == Hour1 && Day == Day1 && Month == Month1 && TimeZone == TimeZone1 && roomOrientationValue == roomOrientationValue1 && currentStudy == singleHour) {
          // console.log(1);
        } else {
          // console.log(0);
          Lon = Lon1;
          Lat = Lat1;
          Hour = Hour1;
          Day = Day1;
          Month = Month1;
          TimeZone = TimeZone1;
          roomOrientationValue = roomOrientationValue1;
          currentStudy = singleHour;

          window.SOLAR_COMFORT[`dateCounter${c}`] = 0;
          annualCoordinates = [];
          currentFrame = 0;

          //SunVectors - TAKEN FROM THE OLD SUNVECTORS.JS FILE

          offset = (new Date().getTimezoneOffset()) / 60;
          var dates = []
          var date;
          var date2;
          for (i = 1; i <= 24 * timestep; i++) {
            hour = i / timestep;
            if (i == ((parseInt(24 - Hour)) * timestep)) {
              date = new Date(2000, Month - 1, Day, hour - offset - TimeZone, (hour % parseInt(hour)) * 60);
              //console.log((hour%parseInt(hour))*60 + " " + Hour);
              let mytime = 24 - hour;
              date2 = new Date(2000, Month - 1, Day, Hour - offset - TimeZone, 0);
            }
            dates.push(new Date(2000, Month - 1, Day, hour - offset - TimeZone, (hour % parseInt(hour)) * 60));
          }
          //console.log(dates);
          //console.log(date);


          xPointLoc = [];
          yPointLoc = [];

          coordinates = [];
          for (let i = 1; i <= (24 * timestep) - 1; i++) {
            coordinates.push(solarCalculator([Lon, Lat]).position(dates[i]));
          }

          for (let i = 0; i < coordinates.length; i += parseInt(timestep)) {
            if (coordinates[i][1] > 0) {
              xPointLoc.push((36 - (36 * (coordinates[i][1] / 180))) * p.sin((coordinates[i][0] - 45 - roomOrientationValue) * (-3.1415926 / 180)));
              yPointLoc.push(((22 - (22 * (coordinates[i][1] / 180))) * p.cos((coordinates[i][0] - 45 - roomOrientationValue) * (-3.1415926 / 180))) - (coordinates[i][1] * .3));
              //p.point((36-(36*(coordinates[i][1]/180)))*p.sin((coordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)), ((22-(22*(coordinates[i][1]/180)))*p.cos((coordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)))-(coordinates[i][1]*.3));
            }
          }

          if (singleHour == 1) {
            coordinates = [];
            let coordinates2 = [];
            for (let i = 1; i <= 9; i++) {
              coordinates.push(solarCalculator([Lon, Lat]).position(date));
            }
            for (let i = 1; i <= 9; i++) {
              coordinates2.push(solarCalculator([Lon, Lat]).position(date2));
            }
            xPointLoc = [];
            yPointLoc = [];
            for (let i = 0; i < coordinates2.length; i += parseInt(timestep)) {
              if (coordinates2[i][1] > 0) {
                xPointLoc.push((36 - (36 * (coordinates2[i][1] / 180))) * p.sin((coordinates2[i][0] - 45 - roomOrientationValue) * (-3.1415926 / 180)));
                yPointLoc.push(((22 - (22 * (coordinates2[i][1] / 180))) * p.cos((coordinates2[i][0] - 45 - roomOrientationValue) * (-3.1415926 / 180))) - (coordinates2[i][1] * .3));
                //p.point((36-(36*(coordinates[i][1]/180)))*p.sin((coordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)), ((22-(22*(coordinates[i][1]/180)))*p.cos((coordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)))-(coordinates[i][1]*.3));
              }
            }
          }
        }

      }

      //GEO Result - TAKES DATA FROM THE GEO.JS FILE
      //geo.createGlazingForRect = function(rectHeight, wallLength, glazingRatio, windowWidth, winHeight, silHeight, distBreakup, ratioOrWidth, changedVar)
      var geoResult = geo.createGlazingForRect(parseFloat(ceilingHeightValue), parseFloat(wallDepVal), glzRatioValue / 100, parseFloat(windowWidthValue), parseFloat(windowHeightValue), parseFloat(sillHeightValue), parseFloat(distanceWindows), glzOrWidth);
      var r = {}
      r.wallCoords = geoResult.wallCoords;
      r.glzCoords = geoResult.glzCoords;
      r.glzRatio = geoResult.glzRatio;
      r.windowWidth = geoResult.windowWidth;
      r.windowHeight = geoResult.windowHeight;
      r.sillHeight = geoResult.sillHeight;
      r.centLineDist = geoResult.centLineDist;

      // MAKE SUN PATH CORNER GRAPHIC

      roomOrientationValue = roomOrientationValue * -1
      p.push();
      p.translate(380, 280);
      p.strokeCap(p.SQUARE);
      p.stroke(light_black + 100);
      p.strokeWeight(1);
      p.noFill();
      p.ellipse(0, 0, 75, 45); //main circle
      p.fill(light_black + 100);
      p.line(0, 0, 45 * p.sin((roomOrientationValue + 45) * (-3.1415926 / 180)), 27 * p.cos((roomOrientationValue + 45) * (-3.1415926 / 180)));
      p.line(0, 0, 45 * p.sin((roomOrientationValue + 135) * (-3.1415926 / 180)), 27 * p.cos((roomOrientationValue + 135) * (-3.1415926 / 180)));
      p.line(0, 0, 45 * p.sin((roomOrientationValue + 225) * (-3.1415926 / 180)), 27 * p.cos((roomOrientationValue + 225) * (-3.1415926 / 180)));
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(10);
      p.text("N", 56 * p.sin((roomOrientationValue - 45) * (-3.1415926 / 180)), 34 * p.cos((roomOrientationValue - 45) * (-3.1415926 / 180)));
      p.strokeWeight(4);
      p.line(0, 0, 45 * p.sin((roomOrientationValue - 45) * (-3.1415926 / 180)), 27 * p.cos((roomOrientationValue - 45) * (-3.1415926 / 180)));
      //p.translate(36*p.sin((roomOrientationValue+45)*(-3.1415926 / 180)), 22*p.cos((roomOrientationValue+45)*(-3.1415926 / 180)));
      //p.point(0,0);
      p.stroke(10);
      p.strokeWeight(3);

      p.strokeWeight(4);
      p.stroke(light_black);
      p.point(xPointLoc[0], yPointLoc[0]);
      for (let i = 0; i < xPointLoc.length - 1; i++) {
        p.strokeWeight(1);
        //p.stroke(light_black);
        p.line(xPointLoc[i], yPointLoc[i], xPointLoc[i + 1], yPointLoc[i + 1]);
        p.strokeWeight(4);
        //p.stroke(100);
        p.point(xPointLoc[i + 1], yPointLoc[i + 1]);
      }
      p.strokeWeight(3);
      p.stroke(100);
      // for (let i = 0; i < xPointLoc.length; i++){
      //   p.point(xPointLoc[i], yPointLoc[i]);
      // }
      p.pop();

      roomOrientationValue = roomOrientationValue * -1

      //DETERMINE HOW LARGE THE ISOMETRIC GRAPHIC WILL BE.
      //FIRST MAKE IT, THEN RE-DO IT USING A MULTIPLIER TO INCREASE OR DECREASE THE SCALE SO IT STAYS WITHIN THE BOUNDS OF THE CANVAS

      //let CeilHt = CeilingSlider.value();//Ceiling Height (ft) - this moves the whole grid down.
      let gridX = wallLen; // number of y grids - should be fixed size normally at 60
      let gridY = wallDepVal - 1; // number of x grids - should be fixed size normally at 30
      let gridHt = gridHeightValue;
      //let sunRotation = SunRotationSlider.value() * (3.1415926/180);


      //ISOMETRIC BASED ON SQUARE OF 200px x 120px - the x and y numbers below change if not square grid
      let x = 100;
      let y = 60;
      let xNext = 200 - x;
      let yNext = 120 - y;
      let Ceil = ceilingHeightValue * 120;
      let yShift = 0; //x * gridY

      //SINGLE GRID BLOCK - NOT VISIBLE
      //CLOCKWISE STARTING @ TOP LEFT
      let x1 = x + yShift;
      let y1 = 0 + Ceil;
      let x2 = (200) + yShift;
      let y2 = y + Ceil;
      let x3 = ((200) - x) + yShift;
      let y3 = (120) + Ceil;
      let x4 = 0 + yShift;
      let y4 = ((120) - y) + Ceil;

      //RE-DO THE MULTIPLIER TO FILL THE CANVAS
      let newMult = 0;
      let newYMult = 300 / ((y3 + (y * (gridX))) + (yNext * (gridY)));
      let newXMult = 340 / (x2 + (xNext * (gridX)));
      if (newXMult > newYMult) {
        newMult = newYMult;
      } else {
        newMult = newXMult;
      }
      let m = newMult;

      //ISOMETRIC BASED ON SQUARE OF 200px x 120px - the x and y numbers below change if not square grid
      x = 100 * m;
      y = 60 * m;
      xNext = (200 * m) - x;
      yNext = (120 * m) - y;
      Ceil = (ceilingHeightValue * m) * 120;
      yShift = x * (gridY);
      let GridHt = (gridHt * m) * 120;

      //SINGLE GRID BLOCK - NOT VISIBLE
      //CLOCKWISE STARTING @ TOP LEFT
      x1 = x + yShift;
      y1 = 0 + Ceil;
      x2 = (200 * m) + yShift;
      y2 = y + Ceil;
      x3 = ((200 * m) - x) + yShift;
      y3 = (120 * m) + Ceil;
      x4 = 0 + yShift;
      y4 = ((120 * m) - y) + Ceil;

      //ITEMS THAT EXIST BEHIND THE GRID PLANE
      //FAR WALL LINE
      p.push();
      p.noFill();
      p.stroke(light_black);
      p.strokeWeight(1);
      p.line(x2, y2, x2, y2 - Ceil);

      //FLOOR PLANE
      p.quad(x2, y2, (x2 + (xNext * (gridX))), (y2 + (y * (gridX))), ((x3 + (xNext * (gridX))) - (x * (gridY))), ((y3 + (y * (gridX))) + (yNext * (gridY))), x, (y * (gridY + 2)) + Ceil);
      p.push();
      p.stroke(150, 150, 150);
      //p.line((x2+(xNext*(gridX)))+10, (y2+(y*(gridX)))+6, ((x3+(xNext*(gridX)))-(x*(gridY)))+10, ((y3+(y*(gridX)))+(yNext*(gridY)))+6);
      p.line((x2 + (xNext * (gridX))) + 10 - (x / 2), (y2 + (y * (gridX))) + 6 - (y / 2), ((x3 + (xNext * (gridX))) - (x * (gridY))) + 10 - (x / 2), ((y3 + (y * (gridX))) + (yNext * (gridY))) + 6 - (y / 2));
      p.line(((x3 + (xNext * (gridX))) - (x * (gridY))) - 10 + (x / 2), ((y3 + (y * (gridX))) + (yNext * (gridY))) + 6 - (y / 2), x - 10 + (x / 2), (y * (gridY + 2)) + Ceil + 6 - (y / 2));


      //XY GRID LEGEND ALONG BOTTOM AND RIGHT EDGE OF ROOM
      //p.line(((x3+(xNext*(gridX)))-(x*(gridY)))-10, ((y3+(y*(gridX)))+(yNext*(gridY)))+6, x-10, (y*(gridY+2))+Ceil+6);
      p.textSize(10);
      p.fill(0);
      p.noStroke();
      p.text(wallDepVal, ((x3 + (xNext * (gridX))) - (x * (gridY))) + 10, ((y3 + (y * (gridX))) + (yNext * (gridY))) + 16);
      p.text(wallLen, ((x3 + (xNext * (gridX))) - (x * (gridY))) - 24, ((y3 + (y * (gridX))) + (yNext * (gridY))) + 16);
      p.stroke(150, 150, 150);
      p.strokeWeight(1);
      //p.point(((x3+(xNext*(gridX)))-(x*(gridY)))+10, ((y3+(y*(gridX)))+(yNext*(gridY)))+6);
      p.line(((x3 + (xNext * (gridX))) - (x * (gridY))) + 10, ((y3 + (y * (gridX))) + (yNext * (gridY))) + 6, ((x3 + (xNext * (gridX))) - (x * (gridY))) + 10 - x, ((y3 + (y * (gridX))) + (yNext * (gridY))) + 6 - y);
      p.line(((x3 + (xNext * (gridX))) - (x * (gridY))) - 10, ((y3 + (y * (gridX))) + (yNext * (gridY))) + 6, ((x3 + (xNext * (gridX))) - (x * (gridY))) - 10 + x, ((y3 + (y * (gridX))) + (yNext * (gridY))) + 6 - y);
      //p.point(((x3+(xNext*(gridX)))-(x*(gridY)))-10, ((y3+(y*(gridX)))+(yNext*(gridY)))+6);
      for (let RLen = 0; RLen < wallDepVal; RLen = RLen + 5) {
        p.stroke(150, 150, 150);
        p.strokeWeight(1);
        let myNewX = ((x2 + (xNext * (gridX))) + 10) - (((x3 + (xNext * (gridX))) - (x * (gridY))) + 10);
        let myNewY = (((y3 + (y * (gridX))) + (yNext * (gridY))) + 6) - ((y2 + (y * (gridX))) + 6);
        myNewX = myNewX / (wallDepVal);
        myNewX = myNewX * RLen;
        myNewY = myNewY / (wallDepVal);
        myNewY = myNewY * RLen;
        //p.point((x2+(xNext*(gridX)))+10-myNewX, (y2+(y*(gridX)))+6+myNewY);
        p.line((x2 + (xNext * (gridX))) + 10 - myNewX, (y2 + (y * (gridX))) + 6 + myNewY, (x2 + (xNext * (gridX))) + 10 - myNewX - x, (y2 + (y * (gridX))) + 6 + myNewY - y);
        p.fill(0);
        p.noStroke();
        p.text(RLen, (x2 + (xNext * (gridX))) + 12 - myNewX, (y2 + (y * (gridX))) + 16 + myNewY);
      }
      for (let RDep = 0; RDep < wallLen; RDep = RDep + 5) {
        p.stroke(150, 150, 150);
        p.strokeWeight(1);
        let myNewX = ((x3 + (xNext * (gridX))) - (x * (gridY))) - 10 - (x - 10);
        let myNewY = (y * (gridY + 2)) + Ceil - ((y3 + (y * (gridX))) + (yNext * (gridY)));
        myNewX = myNewX / (wallLen);
        myNewX = myNewX * RDep;
        myNewY = myNewY / (wallLen);
        myNewY = myNewY * RDep;
        //p.point( x-10 + myNewX, (y*(gridY+2))+Ceil+6  - myNewY);
        if (RDep > 0) {
          p.line(x - 10 + myNewX, (y * (gridY + 2)) + Ceil + 6 - myNewY, x - 10 + myNewX + x, (y * (gridY + 2)) + Ceil + 6 - myNewY - y);
        }
        p.fill(0);
        p.noStroke();
        p.text(RDep, x - 24 + myNewX, (y * (gridY + 2)) + Ceil + 16 - myNewY);
      }
      p.pop();
      p.pop();



      //WINDOW ON WALL

      let FullRoomWidthX = x2 - x;
      let FullRoomWidthY = (y * (gridY + 2)) - (y2 - Ceil);

      p.push();
      p.fill(230, 230, 245);
      p.stroke(light_black);
      p.strokeWeight(1);

      for (let i = 0; i < r.glzCoords.length; i++) {
        let arrayX = [];
        let arrayY = [];
        for (let j = 0; j < 4; j++) {
          arrayX.push(((1 - (r.glzCoords[i][j][0] + (wallDepVal / 2)) / wallDepVal) * FullRoomWidthX) + x);
          arrayY.push(((((r.glzCoords[i][j][0] + (wallDepVal / 2)) / wallDepVal) * FullRoomWidthY) + y2) - (((r.glzCoords[i][j][2]) / ceilingHeightValue) * Ceil));
        }
        p.quad(arrayX[0], arrayY[0], arrayX[1], arrayY[1], arrayX[2], arrayY[2], arrayX[3], arrayY[3]);
        //console.log(arrayX[0] + ", " + arrayY[0]+ ", " + arrayX[1]+ ", " + arrayY[1]+ ", " + arrayX[2]+ ", " + arrayY[2]+ ", " + arrayX[3]+ ", " + arrayY[3]);
      }
      p.pop();

      //HORIZONTAL SHADE LOUVERS
      p.push();
      p.strokeWeight(1);
      p.stroke(150);
      p.fill(50, 50);

      for (let i = 0; i < r.glzCoords.length; i++) {
        let arrayX = [];
        let arrayY = [];
        for (let j = 0; j < 4; j++) {
          arrayX.push(((1 - (r.glzCoords[i][j][0] + (wallDepVal / 2)) / wallDepVal) * FullRoomWidthX) + x);
          arrayY.push(((((r.glzCoords[i][j][0] + (wallDepVal / 2)) / wallDepVal) * FullRoomWidthY) + y2) - (((r.glzCoords[i][j][2]) / ceilingHeightValue) * Ceil));
        }
        for (let k = 0; k < horzShadeNum; k++) {
          let hSX1 = arrayX[2] - (((200 * m) - x) * horzShadeDep) - (((200 * m) - x) * horzShadeDist);
          let hSY1 = arrayY[2] - (y * horzShadeDep) + (k * y * horzShadeSpace * 2) - (horzShadeHeight * y) - (y * horzShadeDist);
          let hSX2 = arrayX[3] - (((200 * m) - x) * horzShadeDep) - (((200 * m) - x) * horzShadeDist);
          let hSY2 = arrayY[3] - (y * horzShadeDep) + (k * y * horzShadeSpace * 2) - (horzShadeHeight * y) - (y * horzShadeDist);
          let hSX3 = arrayX[3] - (((200 * m) - x) * horzShadeDist);
          let hSY3 = arrayY[3] + (k * y * horzShadeSpace * 2) - (horzShadeHeight * y) - (y * horzShadeDist);
          let hSX4 = arrayX[2] - (((200 * m) - x) * horzShadeDist);
          let hSY4 = arrayY[2] + (k * y * horzShadeSpace * 2) - (horzShadeHeight * y) - (y * horzShadeDist);

          let rotHSX1 = arrayX[2] - (((200 * m) - x) * horzShadeDist) + (x * horzShadeDep) + (x * 2 * horzShadeDep * Math.sin(((-horzShadeAngle * 2 / 3) - 30) * p.TWO_PI / 360));
          let rotHSY1 = arrayY[2] + (k * y * horzShadeSpace * 2) - (horzShadeHeight * y) - (y * horzShadeDist) - (y * horzShadeDep) + (x * 2 * horzShadeDep * Math.cos(((-horzShadeAngle * 2 / 3) - 30) * p.TWO_PI / 360))
          let rotHSX2 = arrayX[3] - (((200 * m) - x) * horzShadeDist) + (x * horzShadeDep) + (x * 2 * horzShadeDep * Math.sin(((-horzShadeAngle * 2 / 3) - 30) * p.TWO_PI / 360));
          let rotHSY2 = arrayY[3] + (k * y * horzShadeSpace * 2) - (horzShadeHeight * y) - (y * horzShadeDist) - (y * horzShadeDep) + (x * 2 * horzShadeDep * Math.cos(((-horzShadeAngle * 2 / 3) - 30) * p.TWO_PI / 360))

          p.quad(rotHSX1, rotHSY1, rotHSX2, rotHSY2, hSX3, hSY3, hSX4, hSY4);
        }
      }
      p.pop();


      p.push();
      p.strokeWeight(1);
      p.stroke(light_black);
      p.fill(50, 50);

      if (vertShadeOn == 0) {
        vertShadeHeight = ceilingHeightValue1 - (r.glzCoords[0][2][2]);
        vertShadeScale = ceilingHeightValue1 - (r.glzCoords[0][2][2]) + r.glzCoords[0][0][2];
      }

      //VERTICAL SHADE LOUVERS
      for (let i = 0; i < r.glzCoords.length; i++) {
        let arrayX = [];
        let arrayY = [];
        for (let j = 0; j < 4; j++) {
          arrayX.push(((1 - (r.glzCoords[i][j][0] + (wallDepVal / 2)) / wallDepVal) * FullRoomWidthX) + x);
          arrayY.push(((((r.glzCoords[i][j][0] + (wallDepVal / 2)) / wallDepVal) * FullRoomWidthY) + y2) - (((r.glzCoords[i][j][2]) / ceilingHeightValue) * Ceil));
        }

        if (vertShadeStart == "L") {
          for (let k = 0; k < vertShadeNum; k++) {
            let vSX1 = arrayX[2] + (k * x * vertShadeSpace) - (((200 * m) - x) * vertShadeDep) - (((200 * m) - x) * vertShadeDist) - (vertShadeShift * x);
            let vSY1 = arrayY[2] - (y * vertShadeDep) - (k * y * vertShadeSpace) - (vertShadeHeight * y * 2) - (y * vertShadeDist) + (vertShadeShift * y);
            let vSX2 = arrayX[2] + (k * x * vertShadeSpace) - (((200 * m) - x) * vertShadeDist) - (vertShadeShift * x);
            let vSY2 = arrayY[2] - (k * y * vertShadeSpace) - (vertShadeHeight * y * 2) - (y * vertShadeDist) + (vertShadeShift * y);
            let vSX4 = arrayX[1] + (k * x * vertShadeSpace) - (((200 * m) - x) * vertShadeDep) - (((200 * m) - x) * vertShadeDist) - (vertShadeShift * x);
            let vSY4 = arrayY[1] - (y * vertShadeDep) - (k * y * vertShadeSpace) - (vertShadeHeight * y * 2) - (y * vertShadeDist) + (vertShadeScale * y * 2) + (vertShadeShift * y);
            let vSX3 = arrayX[1] + (k * x * vertShadeSpace) - (((200 * m) - x) * vertShadeDist) - (vertShadeShift * x);
            let vSY3 = arrayY[1] - (k * y * vertShadeSpace) - (vertShadeHeight * y * 2) - (y * vertShadeDist) + (vertShadeScale * y * 2) + (vertShadeShift * y);
            //p.line(vSX1, vSY1, vSX2, vSY2);
            //p.line(vSX3, vSY3, vSX4, vSY4);
            p.quad(vSX1, vSY1, vSX2, vSY2, vSX3, vSY3, vSX4, vSY4)
          }
        } else {
          for (let k = 0; k < vertShadeNum; k++) {
            let vSX1 = arrayX[3] - (k * x * vertShadeSpace) - (((200 * m) - x) * vertShadeDep) - (((200 * m) - x) * vertShadeDist) + (vertShadeShift * x);
            let vSY1 = arrayY[3] - (y * vertShadeDep) + (k * y * vertShadeSpace) - (vertShadeHeight * y * 2) - (y * vertShadeDist) - (vertShadeShift * y);
            let vSX2 = arrayX[3] - (k * x * vertShadeSpace) - (((200 * m) - x) * vertShadeDist) + (vertShadeShift * x);
            let vSY2 = arrayY[3] + (k * y * vertShadeSpace) - (vertShadeHeight * y * 2) - (y * vertShadeDist) - (vertShadeShift * y);
            let vSX4 = arrayX[0] - (k * x * vertShadeSpace) - (((200 * m) - x) * vertShadeDep) - (((200 * m) - x) * vertShadeDist) + (vertShadeShift * x);
            let vSY4 = arrayY[0] - (y * vertShadeDep) + (k * y * vertShadeSpace) - (vertShadeHeight * y * 2) - (y * vertShadeDist) + (vertShadeScale * y * 2) - (vertShadeShift * y);
            let vSX3 = arrayX[0] - (k * x * vertShadeSpace) - (((200 * m) - x) * vertShadeDist) + (vertShadeShift * x);
            let vSY3 = arrayY[0] + (k * y * vertShadeSpace) - (vertShadeHeight * y * 2) - (y * vertShadeDist) + (vertShadeScale * y * 2) - (vertShadeShift * y);
            //p.line(vSX1, vSY1, vSX2, vSY2);
            //p.line(vSX3, vSY3, vSX4, vSY4);
            p.quad(vSX1, vSY1, vSX2, vSY2, vSX3, vSY3, vSX4, vSY4)
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
      for (let k = 0; k < coordinates.length; k++) {
        //console.log(coordinates[k][0]+float(roomOrientationValue-180))
        if (coordinates[k][0] + p.float(roomOrientationValue - 180) < -180) {
          newCoordinateArray.push(coordinates[k][0] + p.float(roomOrientationValue - 180) + 360);
        } else if (coordinates[k][0] + p.float(roomOrientationValue - 180) > 180) {
          newCoordinateArray.push(coordinates[k][0] + p.float(roomOrientationValue - 180) - 360);
        } else {
          newCoordinateArray.push(coordinates[k][0] + p.float(roomOrientationValue - 180));
        }
      }


      let LouverList1 = [];
      let XYLouverTest = [];


      let gridColorArray = [];




      if (annualOn) {
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
        for (let i = 0; i < gridX; i++) {
          let YdistanceFromWall = (i + 1); // grid distance from window wall in Y direction
          b1 = 0;
          filledList.push(0);
          for (let j = 0; j < gridY; j++) {
            b1 = 0;
            for (let k = 0; k < coordinates.length; k++) {
              let XYLouver1 = 0;
              let XlocationOnWall = 180; // this is a safe angle for the point to start from.. 180 means that it is perpindicular from the point (towards the wall?)
              if (newCoordinateArray[k] < 88.0 && newCoordinateArray[k] > -88.0) {
                XlocationOnWall = Math.tan(newCoordinateArray[k] * (3.1415926 / 180)) * YdistanceFromWall; //this is real point at the window wall relative to the grid point. Add j to get the real location on the window wall
              }
              AWArray1.push(XlocationOnWall);
              let xCoord = 0;
              let bigBArray = [];
              let superC = [];

              for (let n = 0; n < r.glzCoords.length; n++) { //cycle through each window
                // if (XlocationOnWall+(j+1) > r.glzCoords[n][0][0]+(wallDepVal/2)  && XlocationOnWall+(j+1) < r.glzCoords[n][1][0]+(wallDepVal/2)){ //cycle through all the windows, check if the wall position exists within the bounds of the window
                //   xCoord = n+1; //we really only care about if a point gets hit 1x per timestep so this number could go crazy high, but it only needs to go up by 1 to count.. if it gets sun from multiple windows it doesnt really matter
                // }
                // xCoord = 1;
                //}if(xCoord > 0){ //if this specific gridpoint and sun angle goes through a window...
                let newBigBArray = [];
                for (let p = 0; p < parseInt(vertShadeNum); p++) { //for each shade in this window...

                  let angleA = abs(newCoordinateArray[k]);
                  let angleB = 90.0 - abs(newCoordinateArray[k]);
                  if (newCoordinateArray[k] > 0) {
                    angleB = angleB * -1;
                  }
                  let bigA;
                  if (vertShadeStart == "L") {
                    bigA = ((XlocationOnWall + (j + 1) + (r.glzCoords[n][0][0] - (wallDepVal / 2)) + (p * parseInt(vertShadeSpace) - vertShadeShift)));
                  } else {
                    bigA = ((XlocationOnWall + (j + 1) - (r.glzCoords[n][0][0] + (wallDepVal / 2)) + (-p * parseInt(vertShadeSpace) - vertShadeShift)));
                  }
                  bigB = ((Math.sin(angleB * (3.1415926 / 180)) * bigA) / (Math.sin(angleA * (3.1415926 / 180))));
                  bigBArray.push(bigB);
                  newBigBArray.push(bigB);
                } superC.push(newBigBArray);
              }//console.log(bigBArray.length);
              superB.push(bigBArray);
              superD.push(superC);
              for (let q = 0; q < superC.length; q++) { // I think the problem exists here... need a second layer of for loop?
                for (let g = 0; g < superC[0].length; g++) {
                  if (superC[q][g] > parseInt(vertShadeDist) && superC[q][g] < (parseInt(vertShadeDist) + parseInt(vertShadeDep))) {
                    XYLouver1 = XYLouver1 + 1;
                  } else {
                  }
                }
              }//ZAdd.push(bigB)
              if (XYLouver1 > 0) {
                b1 = 1;
              } else {
                b1 = 0;
              } LouverList1.push(b1);
            }
          }
        }
        //console.log(filledListI);


        //END OF VERTICAL SHADES




        //START PYTHAGOREAM THEORM FOR XY
        //ASSUME +Y IS DUE NORTH and is the wall opposite the windowwall is N (windowwall is S)

        let b;
        let Xloc = []
        let XYtest = []
        let AWArray = []
        for (let i = 0; i < gridX; i++) {
          let YdistanceFromWall = (i + 1); // grid distance from window wall in Y direction
          b = 0;
          for (let j = 0; j < gridY; j++) {
            b = 0;
            for (let k = 0; k < coordinates.length; k++) {
              let XlocationOnWall = 180; // this is a safe angle for the point to start from.. 180 means that it is perpindicular from the point (towards the wall?)
              if (newCoordinateArray[k] < 88.0 && newCoordinateArray[k] > -88.0) {
                XlocationOnWall = Math.tan(newCoordinateArray[k] * (3.1415926 / 180)) * YdistanceFromWall; //this is real point at the window wall relative to the grid point. Add j to get the real location on the window wall
                //console.log(XlocationOnWall);
              }
              AWArray.push(XlocationOnWall);
              let xCoord = 0;
              let vertLouverXdistance = [];
              for (let m = 0; m < r.glzCoords.length; m++) {

                if (XlocationOnWall + (j + 1) > r.glzCoords[m][0][0] + (wallDepVal / 2) && XlocationOnWall + (j + 1) < r.glzCoords[m][1][0] + (wallDepVal / 2)) { //cycle through all the windows, check if the wall position exists within the bounds of the window
                  xCoord = xCoord + 1; //we really only care about if a point gets hit 1x per timestep so this number could go crazy high, but it only needs to go up by 1 to count.. if it gets sun from multiple windows it doesnt really matter
                }
              }
              if (xCoord > 0) {
                b = 1;
              } else {
                b = 0;
              } XYtest.push(b);

            }
          }
        }
        //END PYTHAGOREM THEORM FOR XY


        //START PYTHAGOREAM THEORM FOR Z

        let a;
        let Ztest = [];
        let AHArray = [];
        for (let i = 0; i < gridX; i++) {
          let distanceFromWall = (i + 1) / 4;
          a = 0;
          for (let j = 0; j < gridY; j++) {
            a = 0;
            for (let k = 0; k < coordinates.length; k++) {
              let angleHeight = Math.tan((coordinates[k][1]) * (3.1415926 / 180)) * distanceFromWall;
              AHArray.push(coordinates[k][1]);
              if (coordinates[k][1] < 0) {
                a = 0;
              } else if (angleHeight > r.glzCoords[0][0][2] - gridHt && angleHeight < (r.glzCoords[0][2][2] - gridHt)) {
                let testArray1 = [1];
                for (let n = 0; n < horzShadeNum; n++) {
                  let sinLawDist = (horzShadeDist * (Math.sin(3.1415926 - (((90) - coordinates[k][1]) * (3.1415926 / 180)) - (90 * (3.1415926 / 180))))) / Math.sin(((90) - coordinates[k][1]) * (3.1415926 / 180));
                  let sinLawAngle = (horzShadeDep * (Math.sin(3.1415926 - (((90) - coordinates[k][1]) * (3.1415926 / 180)) - (horzShadeAngle * (3.1415926 / 180))))) / Math.sin(((90) - coordinates[k][1]) * (3.1415926 / 180));

                  if (angleHeight < (r.glzCoords[0][2][2] - gridHt) - (horzShadeSpace * n) - (sinLawDist) + (p.float(horzShadeHeight) * .5) && angleHeight > ((r.glzCoords[0][2][2] - gridHt) - (horzShadeSpace * n) - (sinLawDist) - (sinLawAngle) + (p.float(horzShadeHeight) * .5))) {
                    testArray1.push(0);
                  } else {
                    testArray1.push(1);
                  }
                }
                let SortedArray = testArray1.sort();
                let SALength = testArray1.length;
                let itemArray = SortedArray[0];
                a = itemArray;

                //console.log(SortedArray);
              } else {
                a = 0;
              } Ztest.push(a);
            }
          }
        }
        //END PYTHAGOREAM THEROM FOR Z

        //START XY and Z check
        let gridColor = 0;
        //let gridColorArray = []
        for (let i = 0; i < XYtest.length; i++) {

          let XYLouv = LouverList1[i];
          let XYcolor = XYtest[i];
          let Zcolor = Ztest[i];

          if (XYcolor == 1 && Zcolor == 1 && XYLouv == 0) {
            gridColor = gridColor + 1;
          } else {
            gridColor = gridColor + 0;
          } if (i % coordinates.length == (coordinates.length) - 1) {
            gridColorArray.push(gridColor);
            gridColor = 0;
          }
        }

        // Annual
        window.SOLAR_COMFORT[`globalGridColor${c}`] = twoDimensionalRoomArrayFromOneDimensional(gridColorArray, wallDepVal - 1, 1);

        if (window.SOLAR_COMFORT[`dateCounter${c}`] == 1) {
          for (let i = 0; i < gridColorArray.length; i++) {
            bigArrayColor.push(gridColor);
          }
        } else if (window.SOLAR_COMFORT[`dateCounter${c}`] < 365) {
          for (let i = 0; i < gridColorArray.length; i++) {
            bigArrayColor[i] += gridColorArray[i];
          }
        }

      } else {

        bigArrayColor = [];

        if (vertShadeOn == 1) { // Variable height louvers


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
          for (let i = 0; i < gridX; i++) {
            let filledListJ = [];
            for (let j = 0; j < gridY; j++) {
              let filledListK = [];
              for (let k = 0; k < coordinates.length; k++) {
                let filledListN = [];
                for (let n = 0; n < r.glzCoords.length; n++) {
                  let filledListP = [];
                  for (let p = 0; p < parseInt(vertShadeNum); p++) {
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
          for (let i = 0; i < gridX; i++) {
            let filledListJ = [];
            for (let j = 0; j < gridY; j++) {
              let filledListK = [];
              for (let k = 0; k < coordinates.length; k++) {
                let filledListN = [];
                for (let n = 0; n < r.glzCoords.length; n++) {
                  let filledListP = [];
                  for (let p = 0; p < parseInt(vertShadeNum); p++) {
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

          for (let i = 0; i < gridX; i++) {
            let YdistanceFromWall = (i + 1); // grid distance from window wall in Y direction
            b1 = 0;
            filledList.push(0);
            for (let j = 0; j < gridY; j++) {
              b1 = 0;
              for (let k = 0; k < coordinates.length; k++) {
                let XYLouver1 = 0;
                let XlocationOnWall = 180; // this is a safe angle for the point to start from.. 180 means that it is perpindicular from the point (towards the wall?)
                if (newCoordinateArray[k] < 88.0 && newCoordinateArray[k] > -88.0) {
                  XlocationOnWall = Math.tan(newCoordinateArray[k] * (3.1415926 / 180)) * YdistanceFromWall; //this is real point at the window wall relative to the grid point. Add j to get the real location on the window wall
                }
                AWArray1.push(XlocationOnWall);
                let xCoord = 0;
                let bigBArray = [];
                let superC = [];

                for (let n = 0; n < r.glzCoords.length; n++) { //cycle through each window
                  // if (XlocationOnWall+(j+1) > r.glzCoords[n][0][0]+(wallDepVal/2)  && XlocationOnWall+(j+1) < r.glzCoords[n][1][0]+(wallDepVal/2)){ //cycle through all the windows, check if the wall position exists within the bounds of the window
                  //   xCoord = n+1; //we really only care about if a point gets hit 1x per timestep so this number could go crazy high, but it only needs to go up by 1 to count.. if it gets sun from multiple windows it doesnt really matter
                  // }
                  // xCoord = 1;
                  //}if(xCoord > 0){ //if this specific gridpoint and sun angle goes through a window...
                  let newBigBArray = [];
                  for (let p = 0; p < parseInt(vertShadeNum); p++) { //for each shade in this window...

                    let angleA = abs(newCoordinateArray[k]);
                    let angleB = 90.0 - abs(newCoordinateArray[k]);
                    if (newCoordinateArray[k] > 0) {
                      angleB = angleB * -1;
                    }
                    let bigA;
                    if (vertShadeStart == "L") {
                      bigA = ((XlocationOnWall + (j + 1) + (r.glzCoords[n][0][0] - (wallDepVal / 2)) + (p * parseInt(vertShadeSpace) - vertShadeShift)));
                    } else {
                      bigA = ((XlocationOnWall + (j + 1) - (r.glzCoords[n][0][0] + (wallDepVal / 2)) + (-p * parseInt(vertShadeSpace) - vertShadeShift)));
                    }
                    bigB = ((Math.sin(angleB * (3.1415926 / 180)) * bigA) / (Math.sin(angleA * (3.1415926 / 180))));
                    bigBArray.push(bigB);
                    newBigBArray.push(bigB);
                  } superC.push(newBigBArray);
                }//console.log(bigBArray.length);
                superB.push(bigBArray);
                superD.push(superC);
                for (let q = 0; q < superC.length; q++) { // I think the problem exists here... need a second layer of for loop?
                  for (let g = 0; g < superC[0].length; g++) {
                    if (superC[q][g] > parseInt(vertShadeDist) && superC[q][g] < (parseInt(vertShadeDist) + parseInt(vertShadeDep))) {
                      XYLouver1 = XYLouver1 + 1;
                      filledListI[i][j][k][q][g] = 1;
                    } else {
                      filledListI[i][j][k][q][g] = 0;
                    }
                  }
                }//ZAdd.push(bigB)
                if (XYLouver1 > 0) {
                  b1 = 1;
                } else {
                  b1 = 0;
                } XYLouverTest.push(b1);
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
          for (let i = 0; i < gridX; i++) {
            let distanceFromWall = (i + 1) / 4;
            a1 = 0;
            for (let j = 0; j < gridY; j++) {
              a1 = 0;
              for (let k = 0; k < coordinates.length; k++) {
                let distanceBeyondWall = 0;
                let anotherCounter = 0;
                let angleHeight = Math.tan((coordinates[k][1]) * (3.1415926 / 180)) * distanceFromWall;

                for (let n = 0; n < r.glzCoords.length; n++) {

                  for (let ru = 0; ru < vertShadeNum; ru++) {
                    distanceBeyondWall = (superD[newCounter][n][ru]);

                    let angleHeight2 = Math.tan((coordinates[k][1]) * (3.1415926 / 180)) * distanceBeyondWall;


                    let myVar;
                    if (angleHeight + angleHeight2 > (r.glzCoords[0][0][2] - gridHt) - parseInt(vertShadeScale) + parseInt(vertShadeHeight) && angleHeight + angleHeight2 < (r.glzCoords[0][2][2] - gridHt) + parseInt(vertShadeHeight)) {
                      myVar = 0;
                      //if this condintion, it hits the full size louver
                    } else {
                      myVar = 1;
                      anotherCounter = anotherCounter + 1
                    }
                    filledListZ[i][j][k][n][ru] = myVar;
                  }
                }
                if (anotherCounter > 0 + vertShadeNum) {
                  XYLouverTest[newCounter - 1] = 0;
                }
                newCounter = newCounter + 1;

              }
            }
          }


          let decider = 0;
          for (let i = 0; i < gridX; i++) {
            for (let j = 0; j < gridY; j++) {
              for (let k = 0; k < coordinates.length; k++) {
                let nextLevel = 0;
                for (let n = 0; n < r.glzCoords.length; n++) {
                  for (let p = 0; p < parseInt(vertShadeNum); p++) {
                    decider = 0;
                    if (filledListI[i][j][k][n][p] == 1) {
                      decider = 1;
                      if (filledListZ[i][j][k][n][p] == 1) {
                        decider = 2;
                      }
                    }
                    if (decider == 1) {
                      nextLevel = nextLevel + 1;
                    }
                  }
                } if (nextLevel > 0) {
                  LouverList1.push(1);
                } else {
                  LouverList1.push(0);
                }
              }
            }
          }
        } else { //baseline --- louvers extend to infinty
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
          for (let i = 0; i < gridX; i++) {
            let YdistanceFromWall = (i + 1); // grid distance from window wall in Y direction
            b1 = 0;
            filledList.push(0);
            for (let j = 0; j < gridY; j++) {
              b1 = 0;
              for (let k = 0; k < coordinates.length; k++) {
                let XYLouver1 = 0;
                let XlocationOnWall = 180; // this is a safe angle for the point to start from.. 180 means that it is perpindicular from the point (towards the wall?)
                if (newCoordinateArray[k] < 88.0 && newCoordinateArray[k] > -88.0) {
                  XlocationOnWall = Math.tan(newCoordinateArray[k] * (3.1415926 / 180)) * YdistanceFromWall; //this is real point at the window wall relative to the grid point. Add j to get the real location on the window wall
                }
                AWArray1.push(XlocationOnWall);
                let xCoord = 0;
                let bigBArray = [];
                let superC = [];

                for (let n = 0; n < r.glzCoords.length; n++) { //cycle through each window
                  // if (XlocationOnWall+(j+1) > r.glzCoords[n][0][0]+(wallDepVal/2)  && XlocationOnWall+(j+1) < r.glzCoords[n][1][0]+(wallDepVal/2)){ //cycle through all the windows, check if the wall position exists within the bounds of the window
                  //   xCoord = n+1; //we really only care about if a point gets hit 1x per timestep so this number could go crazy high, but it only needs to go up by 1 to count.. if it gets sun from multiple windows it doesnt really matter
                  // }
                  // xCoord = 1;
                  //}if(xCoord > 0){ //if this specific gridpoint and sun angle goes through a window...
                  let newBigBArray = [];
                  for (let p = 0; p < parseInt(vertShadeNum); p++) { //for each shade in this window...

                    let angleA = abs(newCoordinateArray[k]);
                    let angleB = 90.0 - abs(newCoordinateArray[k]);
                    if (newCoordinateArray[k] > 0) {
                      angleB = angleB * -1;
                    }
                    let bigA;
                    if (vertShadeStart == "L") {
                      bigA = ((XlocationOnWall + (j + 1) + (r.glzCoords[n][0][0] - (wallDepVal / 2)) + (p * parseInt(vertShadeSpace) - vertShadeShift)));
                    } else {
                      bigA = ((XlocationOnWall + (j + 1) - (r.glzCoords[n][0][0] + (wallDepVal / 2)) + (-p * parseInt(vertShadeSpace) - vertShadeShift)));
                    }
                    bigB = ((Math.sin(angleB * (3.1415926 / 180)) * bigA) / (Math.sin(angleA * (3.1415926 / 180))));
                    bigBArray.push(bigB);
                    newBigBArray.push(bigB);
                  } superC.push(newBigBArray);
                }//console.log(bigBArray.length);
                superB.push(bigBArray);
                superD.push(superC);
                for (let q = 0; q < superC.length; q++) { // I think the problem exists here... need a second layer of for loop?
                  for (let g = 0; g < superC[0].length; g++) {
                    if (superC[q][g] > parseInt(vertShadeDist) && superC[q][g] < (parseInt(vertShadeDist) + parseInt(vertShadeDep))) {
                      XYLouver1 = XYLouver1 + 1;
                    } else {
                    }
                  }
                }//ZAdd.push(bigB)
                if (XYLouver1 > 0) {
                  b1 = 1;
                } else {
                  b1 = 0;
                } LouverList1.push(b1);
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
        for (let i = 0; i < gridX; i++) {
          let YdistanceFromWall = (i + 1); // grid distance from window wall in Y direction
          b = 0;
          for (let j = 0; j < gridY; j++) {
            b = 0;
            for (let k = 0; k < coordinates.length; k++) {
              let XlocationOnWall = 180; // this is a safe angle for the point to start from.. 180 means that it is perpindicular from the point (towards the wall?)
              if (newCoordinateArray[k] < 88.0 && newCoordinateArray[k] > -88.0) {
                XlocationOnWall = Math.tan(newCoordinateArray[k] * (3.1415926 / 180)) * YdistanceFromWall; //this is real point at the window wall relative to the grid point. Add j to get the real location on the window wall
                //console.log(XlocationOnWall);
              }
              AWArray.push(XlocationOnWall);
              let xCoord = 0;
              let vertLouverXdistance = [];
              for (let m = 0; m < r.glzCoords.length; m++) {

                if (XlocationOnWall + (j + 1) > r.glzCoords[m][0][0] + (wallDepVal / 2) && XlocationOnWall + (j + 1) < r.glzCoords[m][1][0] + (wallDepVal / 2)) { //cycle through all the windows, check if the wall position exists within the bounds of the window
                  xCoord = xCoord + 1; //we really only care about if a point gets hit 1x per timestep so this number could go crazy high, but it only needs to go up by 1 to count.. if it gets sun from multiple windows it doesnt really matter
                }
              }
              if (xCoord > 0) {
                b = 1;
              } else {
                b = 0;
              } XYtest.push(b);

            }
          }

        }
        //END PYTHAGOREM THEORM FOR XY


        //START PYTHAGOREAM THEORM FOR Z

        let a;
        let Ztest = [];
        let AHArray = [];
        for (let i = 0; i < gridX; i++) {
          let distanceFromWall = (i + 1) / 4;
          a = 0;
          for (let j = 0; j < gridY; j++) {
            a = 0;
            for (let k = 0; k < coordinates.length; k++) {
              let angleHeight = Math.tan((coordinates[k][1]) * (3.1415926 / 180)) * distanceFromWall;
              AHArray.push(coordinates[k][1]);
              if (coordinates[k][1] < 0) {
                a = 0;
              } else if (angleHeight > r.glzCoords[0][0][2] - gridHt && angleHeight < (r.glzCoords[0][2][2] - gridHt)) {
                let testArray1 = [1];
                for (let n = 0; n < horzShadeNum; n++) {
                  let sinLawDist = (horzShadeDist * (Math.sin(3.1415926 - (((90) - coordinates[k][1]) * (3.1415926 / 180)) - (90 * (3.1415926 / 180))))) / Math.sin(((90) - coordinates[k][1]) * (3.1415926 / 180));
                  let sinLawAngle = (horzShadeDep * (Math.sin(3.1415926 - (((90) - coordinates[k][1]) * (3.1415926 / 180)) - (horzShadeAngle * (3.1415926 / 180))))) / Math.sin(((90) - coordinates[k][1]) * (3.1415926 / 180));

                  if (angleHeight < (r.glzCoords[0][2][2] - gridHt) - (horzShadeSpace * n) - (sinLawDist) + (p.float(horzShadeHeight) * .5) && angleHeight > ((r.glzCoords[0][2][2] - gridHt) - (horzShadeSpace * n) - (sinLawDist) - (sinLawAngle) + (p.float(horzShadeHeight) * .5))) {
                    testArray1.push(0);
                  } else {
                    testArray1.push(1);
                  }
                }
                let SortedArray = testArray1.sort();
                let SALength = testArray1.length;
                let itemArray = SortedArray[0];
                a = itemArray;

                //console.log(SortedArray);
              } else {
                a = 0;
              } Ztest.push(a);
            }
          }
        }
        //END PYTHAGOREAM THEROM FOR Z

        //START XY and Z check
        let gridColor = 0;
        //let gridColorArray = []
        for (let i = 0; i < XYtest.length; i++) {

          let XYLouv = LouverList1[i];
          let XYcolor = XYtest[i];
          let Zcolor = Ztest[i];

          if (XYcolor == 1 && Zcolor == 1 && XYLouv == 0) {
            gridColor = gridColor + 1;
          } else {
            gridColor = gridColor + 0;
          }
          if (i % coordinates.length == (coordinates.length) - 1) {
            gridColorArray.push(gridColor);
            gridColor = 0;
          }
        }

        // Hour or Day
        let stepDelta = singleHour == 1 ? 9 : 4;
        window.SOLAR_COMFORT[`globalGridColor${c}`] = twoDimensionalRoomArrayFromOneDimensional(gridColorArray, wallDepVal - 1, stepDelta);
      }

      //END OF TRIG

      // CREATE GRID
      //GRID X ROW
      let MDT; //Max Direct Time
      let Percentage = valMDST;
      //console.log(gridColorArray);

      for (let i = 0; i < gridX; i++) {
        let X1 = (x2 + (xNext * i));
        let Y1 = (y2 + (y * i));
        let X2 = (x2 + (xNext * (i + 1)));
        let Y2 = (y2 + (y * (i + 1)));
        let X3 = (x3 + (xNext * (i + 1)));
        let Y3 = (y3 + (y * (i + 1)));
        let X4 = (x3 + (xNext * i));
        let Y4 = (y3 + (y * i));
        let mySun = 0;
        if (annualOn && window.SOLAR_COMFORT[`dateCounter${c}`] > 364) {
          if (i == 0) {
            // mySun = (p.int(gridColorArray[1*gridY]/timestep));
            mySun = (bigArrayColor[1 * gridY] / 365);
          } else {
            // mySun = (p.int(gridColorArray[i*gridY]/timestep));
            mySun = (bigArrayColor[i * gridY] / 365);
          }
        } else {
          if (i == 0) {
            // mySun = (p.int(gridColorArray[1*gridY]/timestep));
            mySun = gridColorArray[1 * gridY];
          } else {
            // mySun = (p.int(gridColorArray[i*gridY]/timestep));
            mySun = gridColorArray[i * gridY];
          }
        }


        if (annualOn) {
          if (mySun > Percentage / timestep) {
            MDT = MDT + 1;
          }
        } else {
          if (mySun > Percentage / timestep) {
            MDT = MDT + 1;
          }
          mySun = p.int(mySun / timestep);
        }
        if (mySun == null) {
          mySun = 0;
        }
        //console.log(mySun);


        mySun = parseInt(mySun);

        p.fill(ColorScaleArray[mySun].r, ColorScaleArray[mySun].g, ColorScaleArray[mySun].b, 200);

        p.quad(X1, Y1 - GridHt, X2, Y2 - GridHt, X3, Y3 - GridHt, X4, Y4 - GridHt);

        // if (gridColorArray[i*gridY]/(timestep-.1) < valMDST && gridColorArray[(i*gridY)-1]/(timestep-.1) > valMDST){
        //   p.push();
        //   p.strokeWeight(1);
        //   p.stroke(50);
        //   p.line(X3, Y3-GridHt, X4, Y4-GridHt);
        //   p.pop();
        // }

        if (annualOn) {

          if (gridColorArray[i * gridY] / .99 > valMDST && gridColorArray[(i * gridY) + 1] / .99 < valMDST) {
            p.push();
            p.strokeWeight(1);
            p.stroke(0);
            p.line(X3, Y3 - GridHt, X4, Y4 - GridHt);
            p.pop();
          }
          if (gridColorArray[(i * gridY)] / .99 < valMDST && gridColorArray[(i * gridY) + gridY] / .99 > valMDST) {
            p.push();
            p.strokeWeight(1);
            p.stroke(0);
            p.line(X2, Y2 - GridHt, X3, Y3 - GridHt);
            p.pop();
          }
          if (gridColorArray[(i * gridY)] / .99 > valMDST && gridColorArray[(i * gridY) + gridY] / .99 < valMDST) {
            p.push();
            p.strokeWeight(1);
            p.stroke(0);
            p.line(X2, Y2 - GridHt, X3, Y3 - GridHt);
            p.pop();
          }
        } else {

          if (gridColorArray[i * gridY] / (timestep - .1) > valMDST / timestep && gridColorArray[(i * gridY) + 1] / (timestep - .1) < valMDST / timestep) {
            p.push();
            p.strokeWeight(1);
            p.stroke(0);
            p.line(X3, Y3 - GridHt, X4, Y4 - GridHt);
            p.pop();
          }
          if (gridColorArray[(i * gridY)] / (timestep - .1) < valMDST / timestep && gridColorArray[(i * gridY) + gridY] / (timestep - .1) > valMDST / timestep) {
            p.push();
            p.strokeWeight(1);
            p.stroke(0);
            p.line(X2, Y2 - GridHt, X3, Y3 - GridHt);
            p.pop();
          }
          if (gridColorArray[(i * gridY)] / (timestep - .1) > valMDST / timestep && gridColorArray[(i * gridY) + gridY] / (timestep - .1) < valMDST / timestep) {
            p.push();
            p.strokeWeight(1);
            p.stroke(0);
            p.line(X2, Y2 - GridHt, X3, Y3 - GridHt);
            p.pop();
          }
        }

        //GRID Y ROW
        for (let j = 0; j < gridY; j++) {
          let newX1 = (X4 - (x * j));
          let newY1 = (Y4 + (yNext * j));
          let newX2 = (X3 - (x * j));
          let newY2 = (Y3 + (yNext * j));
          let newX3 = (X3 - (x * (j + 1)));
          let newY3 = (Y3 + (yNext * (j + 1)));
          let newX4 = (X4 - (x * (j + 1)));
          let newY4 = (Y4 + (yNext * (j + 1)));
          if (annualOn && window.SOLAR_COMFORT[`dateCounter${c}`] > 364) {
            if (j == 0) {
              // mySun = (p.int(gridColorArray[1*gridY]/timestep));
              mySun = (bigArrayColor[(i * gridY) + 1] / 365);
            } else {
              // mySun = (p.int(gridColorArray[i*gridY]/timestep));
              mySun = (bigArrayColor[(i * gridY) + j] / 365);
            }
          } else {
            if (j == 0) {
              // mySun = (p.int(gridColorArray[(i*gridY)+1]/timestep));
              mySun = gridColorArray[(i * gridY) + 1];
            } else {
              // mySun = p.int(gridColorArray[(i*gridY)+j]/timestep);
              mySun = gridColorArray[(i * gridY) + j];
            }
          }

          //console.log(mySun);
          if (annualOn) {
            if (mySun > Percentage / timestep) {
              MDT = p.int(MDT) + 1;
            }
          } else {
            if (mySun / timestep > Percentage / timestep) {
              MDT = p.int(MDT) + 1;
            }
            mySun = p.int(mySun / timestep);
          }
          if (mySun == null) {
            mySun = 0;
          }

          mySun = parseInt(mySun);

          // draw colored grid square on floor representing % of time in direct sun
          p.fill(ColorScaleArray[mySun].r, ColorScaleArray[mySun].g, ColorScaleArray[mySun].b, 200);
          p.quad(newX1, newY1 - GridHt, newX2, newY2 - GridHt, newX3, newY3 - GridHt, newX4, newY4 - GridHt);

          if (annualOn && window.SOLAR_COMFORT[`dateCounter${c}`] > 364) {
            if (bigArrayColor[(i * gridY) + j] / .99 < valMDST / timestep * 365 && bigArrayColor[(i * gridY) + j + 1] / .99 > valMDST / timestep * 365) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX3, newY3 - GridHt, newX4, newY4 - GridHt);
              p.pop();
            }
            if (bigArrayColor[(i * gridY) + j] / .99 > valMDST / timestep * 365 && bigArrayColor[(i * gridY) + j + 1] / .99 < valMDST / timestep * 365) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX3, newY3 - GridHt, newX4, newY4 - GridHt);
              p.pop();
            }
            if (bigArrayColor[(i * gridY) + j] / .99 < valMDST / timestep * 365 && bigArrayColor[(i * gridY) + j + gridY] / .99 > valMDST / timestep * 365) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX2, newY2 - GridHt, newX3, newY3 - GridHt);
              p.pop();
            }
            if (bigArrayColor[(i * gridY) + j] / .99 > valMDST / timestep * 365 && bigArrayColor[(i * gridY) + j + gridY] / .99 < valMDST / timestep * 365) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX2, newY2 - GridHt, newX3, newY3 - GridHt);
              p.pop();
            }
          } else if (annualOn) {
            if (gridColorArray[(i * gridY) + j] / .99 < valMDST / timestep && gridColorArray[(i * gridY) + j + 1] / .99 > valMDST / timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX3, newY3 - GridHt, newX4, newY4 - GridHt);
              p.pop();
            }
            if (gridColorArray[(i * gridY) + j] / .99 > valMDST / timestep && gridColorArray[(i * gridY) + j + 1] / .99 < valMDST / timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX3, newY3 - GridHt, newX4, newY4 - GridHt);
              p.pop();
            }
            if (gridColorArray[(i * gridY) + j] / .99 < valMDST / timestep && gridColorArray[(i * gridY) + j + gridY] / .99 > valMDST / timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX2, newY2 - GridHt, newX3, newY3 - GridHt);
              p.pop();
            }
            if (gridColorArray[(i * gridY) + j] / .99 > valMDST / timestep && gridColorArray[(i * gridY) + j + gridY] / .99 < valMDST / timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX2, newY2 - GridHt, newX3, newY3 - GridHt);
              p.pop();
            }
          } else {
            if (gridColorArray[(i * gridY) + j] / (timestep - .1) < valMDST / timestep && gridColorArray[(i * gridY) + j + 1] / (timestep - .1) > valMDST / timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX3, newY3 - GridHt, newX4, newY4 - GridHt);
              p.pop();
            }
            if (gridColorArray[(i * gridY) + j] / (timestep - .1) > valMDST / timestep && gridColorArray[(i * gridY) + j + 1] / (timestep - .1) < valMDST / timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX3, newY3 - GridHt, newX4, newY4 - GridHt);
              p.pop();
            }
            if (gridColorArray[(i * gridY) + j] / (timestep - .1) < valMDST / timestep && gridColorArray[(i * gridY) + j + gridY] / (timestep - .1) > valMDST / timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX2, newY2 - GridHt, newX3, newY3 - GridHt);
              p.pop();
            }
            if (gridColorArray[(i * gridY) + j] / (timestep - .1) > valMDST / timestep && gridColorArray[(i * gridY) + j + gridY] / (timestep - .1) < valMDST / timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX2, newY2 - GridHt, newX3, newY3 - GridHt);
              p.pop();
            }
          }
        }
      }

      // END OF GRID

      //FLOOR GRID PLANE/OUTLINE
      p.push();
      p.noFill();
      p.stroke(light_black + 50);
      p.strokeWeight(1);
      p.quad(x2, y2 - GridHt, (x2 + (xNext * (gridX))), (y2 + (y * (gridX))) - GridHt, ((x3 + (xNext * (gridX))) - (x * (gridY))), ((y3 + (y * (gridX))) + (yNext * (gridY))) - GridHt, x, (y * (gridY + 2)) + Ceil - GridHt);
      p.stroke(light_black);

      //CEILING PLANE
      p.quad(x2, y2 - Ceil, (x2 + (xNext * (gridX))), (y2 + (y * (gridX))) - Ceil, ((x3 + (xNext * (gridX))) - (x * (gridY))), ((y3 + (y * (gridX))) + (yNext * (gridY))) - Ceil, x, (y * (gridY + 2)));

      //WALL LINES
      //line(x2, y2, x2, y2-Ceil); This one exists behind the grid
      p.line((x2 + (xNext * (gridX))), (y2 + (y * (gridX))), (x2 + (xNext * (gridX))), (y2 + (y * (gridX))) - Ceil);
      p.line(((x3 + (xNext * (gridX))) - (x * (gridY))), ((y3 + (y * (gridX))) + (yNext * (gridY))) - Ceil, ((x3 + (xNext * (gridX))) - (x * (gridY))), ((y3 + (y * (gridX))) + (yNext * (gridY))));
      p.line(x, (y * (gridY + 2)), x, (y * (gridY + 2) + Ceil));
      p.pop();
      //console.log(1);
      //p.noLoop();

      // if(currentFrame > 418){
      //   p.noLoop;
      // }

      //CHECK IF MEETS CONDITION TEXT
      let MDTPercentage = 0;
      if (annualOn) {
        MDTPercentage = p.int((p.float(MDT) / (wallLen * wallDepVal)) * 100);
      } else {
        MDTPercentage = p.int((p.float(MDT) / (wallLen * wallDepVal)) * 100);
      }


      //console.log(MDT);
      // if (annualOn == 1 && currentFrame > 418){
      //   MDTPercentage = p.int((p.float(MDT)/(wallLen * wallDepVal))*100/1.5);
      //   //console.log(MDT);
      // }

      //console.log(p.frameCount);

      window.SOLAR_COMFORT[`MDTResult${c}`] = "% > max direct sun time, " + MDTPercentage + "%, ";

      p.push();
      if (MDTPercentage < valFal) {
        p.fill(0, 255, 0);
        p.image(imgCheck, 310, 2, 30, 30);
        window.SOLAR_COMFORT[`MDTResult${c}`] += "Pass\n";
      } else {
        p.fill(255, 0, 0);
        p.image(imgNope, 310, 2, 30, 30);
        window.SOLAR_COMFORT[`MDTResult${c}`] += "Fail\n";
      }

      p.fill(0);
      p.textSize(50);

      p.text(MDTPercentage + "%", 340, 38);
      p.textSize(10);
      p.text("> max direct sun time", 340, 50);
      // p.pop();
      //
      // //console.log(p.frameCount);
      // p.fill(50);
      // p.textSize(7);
      // p.text(p.frameCount,420,320);

      // An annual simulation has completed
      if (window.SOLAR_COMFORT[`dateCounter${c}`] === 365 && annualOn) {
        annualSimulationDone = true;
      }
    }

    p.reload = function () {
      currentFrame = 0;
      //p.loop();
    }
    p.reload1 = function () {

      //p.loop();
    }

    // p.checkButton = function () {
    //   if (myButton == 1) {
    //     myButton = 0;
    //   } else {
    //     myButton = 1;
    //   }
    // }
    p.checkButton = function () {
      //p.loop();
      //noLoop();
      if (Case2Button == 1) {
        Case2Button = 0;
      } else {
        Case2Button = 1;
      }
    }
  }
}

var iso1 = new p5(renderGraphicsAndRunSimulation(1));
var iso2 = new p5(renderGraphicsAndRunSimulation(2));

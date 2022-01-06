//THIS UPDATES THE FLOOR AREA LOSS, MAX DIRECT SUNTIME AND TIMESTEP PER HOUR VALUES
//IT ALSO REMEMBERS THEM SO THEY CAN BE USED IN THE D3 COLOR CHART BEFORE THE DRAW LOOP

let singleHour = 1;
let fullDay = 0;
let currentFrame = 0;
let annualOn = false; // Check If Annual Button is Pressed

window.SOLAR_COMFORT.settings.thermalComfortSingleHour = !!document.getElementById(`ppdRadio`).checked;
window.SOLAR_COMFORT.settings1.thermalComfortSingleHour = window.SOLAR_COMFORT.settings.thermalComfortSingleHour
document.getElementsByName(`studyType`).forEach(e => e.addEventListener('click', () => {
  if (e.id === 'ppdRadio') {
    window.SOLAR_COMFORT.settings.thermalComfortSingleHour = true;
    window.SOLAR_COMFORT.settings1.thermalComfortSingleHour = true;
    Array.from(document.getElementsByClassName("directsunlegend")).forEach(e => e.classList.add('hidefromall'));
    Array.from(document.getElementsByClassName("ppdlegend")).forEach(e => e.classList.remove('hidefromall'));
  } else {
    window.SOLAR_COMFORT.settings.thermalComfortSingleHour = false;
    window.SOLAR_COMFORT.settings1.thermalComfortSingleHour = false;
    Array.from(document.getElementsByClassName("directsunlegend")).forEach(e => e.classList.remove('hidefromall'));
    Array.from(document.getElementsByClassName("ppdlegend")).forEach(e => e.classList.add('hidefromall'));
  }
}))

window.SOLAR_COMFORT.annualSimulationDone = false;
window.SOLAR_COMFORT.annualSimulationDone1 = false;

window.SOLAR_COMFORT.Case2Button = 0;

let TIME_STEPS_PER_HOUR_SINGLE_HOUR_SIMULATION = 9;
let TIME_STEPS_PER_HOUR_DAY_SIMULATION = 4;
let TIME_STEPS_PER_HOUR_ANNUAL_SIMULATION = 1;

// Minimum and Maximum azimuths the sun can be and still be 
// considered to directly hit a 0degree north facing window
// TODO reference, why are these -88 and 88 instead of -90 and 90?
let MIN_AZIMUTH_DIRECT_SUN = -88.0;
let MAX_AZIMUTH_DIRECT_SUN = 88.0;

window.SOLAR_COMFORT.dateCounter = 0;
window.SOLAR_COMFORT.dateCounter1 = 0;

window.SOLAR_COMFORT.MDTResult = 0;
window.SOLAR_COMFORT.MDTResult1 = 0;
window.SOLAR_COMFORT.globalGridColor = undefined;
window.SOLAR_COMFORT.globalGridColor1 = undefined;

window.SOLAR_COMFORT.solarCoordinatesHourly = [];
window.SOLAR_COMFORT.solarCoordinatesHourly1 = [];

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

function thermalComfortSingleHourChange(e) {
  singleHour = 1;
  fullDay = 0;
  window.SOLAR_COMFORT.settings.thermalComfortSingleHour = true;
  window.SOLAR_COMFORT.settings1.thermalComfortSingleHour = true;
}

window.SOLAR_COMFORT.checkButton = function () {
  if (window.SOLAR_COMFORT.Case2Button === 1) {
    window.SOLAR_COMFORT.Case2Button = 0;
  } else {
    window.SOLAR_COMFORT.copyCase1ToCase2();
    window.SOLAR_COMFORT.Case2Button = 1;
  }
}
document.getElementsByName("button1").forEach(e => {
  e.addEventListener('click', window.SOLAR_COMFORT.checkButton)
});

checkAnnual = function (target) { // Check If Annual Button is Pressed
  annualOn = target.checked;
  currentFrame = 0;
  singleHour = 2;
  window.SOLAR_COMFORT.dateCounter = 0;
  window.SOLAR_COMFORT.dateCounter1 = 0;
  window.SOLAR_COMFORT.annualSimulationDone = false;
  window.SOLAR_COMFORT.annualSimulationDone1 = false;

  if (!annualOn) {
    // Annual simulation is not running, enable all fields
    document.getElementById(`annualWarning`).innerHTML = '';

    for (let i = 0; i < window.SOLAR_COMFORT.globalInputFieldNames.length; i++) {
      document.getElementById(window.SOLAR_COMFORT.globalInputFieldNames[i]).disabled = false;
    }
    for (let i = 0; i < window.SOLAR_COMFORT.caseInputFieldNames.length; i++) {
      document.getElementById(window.SOLAR_COMFORT.caseInputFieldNames[i]).disabled = false;
      document.getElementById(`${window.SOLAR_COMFORT.caseInputFieldNames[i]}1`).disabled = false; // case 2
    }
    document.getElementsByName("button1").forEach(e => e.disabled = false);
  } else {
    // Annual simulation is running, disable all fields
    document.getElementById(`annualWarning`).innerHTML = 'Chages to inputs are disabled.<br>Turn off Annual to enable changes.';

    for (let i = 0; i < window.SOLAR_COMFORT.globalInputFieldNames.length; i++) {
      document.getElementById(window.SOLAR_COMFORT.globalInputFieldNames[i]).disabled = true;
    }
    for (let i = 0; i < window.SOLAR_COMFORT.caseInputFieldNames.length; i++) {
      document.getElementById(window.SOLAR_COMFORT.caseInputFieldNames[i]).disabled = true;
      document.getElementById(`${window.SOLAR_COMFORT.caseInputFieldNames[i]}1`).disabled = true; // case 2
    }
    document.getElementsByName("button1").forEach(e => e.disabled = true);
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
// https://andrewringler.github.io/palettes/#/9|d|ff91a2|258811|1|1|1|
let ppdColors0to30 = [
  /* green to yellow, 5 steps */
  '#258811', '#5da03b', '#8bb85e', '#b8cf81', '#e4e7a5',

  /* yellow to pink, 10 steps */
  '#ead8a4', '#efc8a2', '#f3b8a1', '#f6a89f', '#f9979e', '#fb859c', '#fd719a', '#fe5b98', '#ff3f96', '#ff0094'
];

let ppdColorScale0to30 = d3.scale.quantize().domain([0, 30]).range(ppdColors0to30);

var ColorScaleArray = [];

// Direct Sun Legend
function directSunLegend() {
  d3.select("#visualization").append('svg').attr("height", 80).attr("width", 327).attr('class', 'directsunlegend hidefromall')
  var vis = d3.select(".directsunlegend")
  var arr = d3.range(13 * timeStepValue)
  var dataset = [0, 2, 4, 6, 8, 10, 12];

  //position scale
  var xScale = d3.scale.linear().domain([0, 13]).range([0, 325])

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
}
directSunLegend();

// PPD Legend
function ppdLegend() {
  let svgWidth = 327;
  d3.select("#visualization").append('svg').attr("height", 80).attr("width", svgWidth).attr('class', 'ppdlegend')
  var vis = d3.select(".ppdlegend")
  let numBlocks = 15
  let width = svgWidth - 5;
  var arr = d3.range(numBlocks)
  var dataset = [0, 10, 20, 30];

  //position scale
  var blockXScale = d3.scale.linear().domain([0, numBlocks]).range([0, width])

  vis.selectAll('rect').data(arr).enter()
    .append('rect')
    .attr({
      x: function (d) { return blockXScale(d) + 1 },
      y: 16,
      height: 12,
      width: 25,
      stroke: d3.rgb(0, 0, 0),
      fill: function (d) { return ppdColorScale0to30(Math.floor(2 * d)) }
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
      x: function (d, i) {
        if (i === 0) return 12;
        if (i === dataset.length - 1) return width - 10;
        return Math.floor(d / 30 * numBlocks) / numBlocks * width - 10;
      },
      y: 40
    });

  vis.append("text")
    .attr("x", 0)
    .attr("y", 12)
    .text("Predicted Percentage of Dissatisfied (PPD)")
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
}
ppdLegend();

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
    let solarCoordinates = []; // [ azimuth in degress, elevation in degress ]
    // let solar;
    let sunPathGraphicPixelX = [];
    let sunPathGraphicPixelY = [];
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

      // if (caseNumber === 1) {
      //   console.log('adding button1 listener')
      //   document.getElementsByName("button1").forEach(e => e.addEventListener('click', checkButton));
      // }

      document.getElementById(`ppdRadio`).addEventListener('input', p.reload);
      document.getElementsByName(`glazingRadio`)[0].addEventListener('input', p.reload);
      document.getElementsByName(`glazingRadio`)[1].addEventListener('input', p.reload);
      document.getElementsByName(`long`)[0].addEventListener('input', p.reload);
      document.getElementsByName(`lat`)[0].addEventListener('input', p.reload);
      document.getElementsByName(`timeZone`)[0].addEventListener('input', p.reload);
      document.getElementsByName(`hour`)[0].addEventListener('input', p.reload);
      document.getElementsByName("day")[0].addEventListener('input', p.reload);
      document.getElementsByName("mon")[0].addEventListener('input', p.reload);
      document.getElementsByName("timeStep")[0].addEventListener('input', p.reload);
      document.getElementsByName("airTemp")[0].addEventListener('input', p.reload);
      document.getElementsByName("humidity")[0].addEventListener('input', p.reload);
      document.getElementsByName("airSpeed")[0].addEventListener('input', p.reload);
      document.getElementsByName("clothing")[0].addEventListener('input', p.reload);
      document.getElementsByName("metabolic")[0].addEventListener('input', p.reload);
      document.getElementsByName("posture")[0].addEventListener('select', p.reload);
      document.getElementsByName("asa")[0].addEventListener('input', p.reload);
      document.getElementsByName("north")[0].addEventListener('input', p.reload);
      document.getElementsByName("gridHt")[0].addEventListener('input', p.reload);
      document.getElementsByName("ceiling")[0].addEventListener('input', p.reload);
      document.getElementsByName("ceiling")[0].addEventListener('input', p.reload);
      document.getElementsByName("wallWidth")[0].addEventListener('input', p.reload);
      document.getElementsByName("wallDep")[0].addEventListener('input', p.reload);
      document.getElementsByName("wallR")[0].addEventListener('input', p.reload);
      document.getElementsByName("windowHeight")[0].addEventListener('input', p.reload);
      document.getElementsByName("windowWidth")[0].addEventListener('input', p.reload);
      document.getElementsByName("glazing")[0].addEventListener('input', p.reload);
      document.getElementsByName("sill")[0].addEventListener('input', p.reload);
      document.getElementsByName("distWindow")[0].addEventListener('input', p.reload);
      document.getElementsByName("windowU")[0].addEventListener('input', p.reload);
      document.getElementsByName("shgc")[0].addEventListener('input', p.reload);
      document.getElementsByName("hShadeDep")[0].addEventListener('input', p.reload);
      document.getElementsByName("hShadeNum")[0].addEventListener('input', p.reload);
      document.getElementsByName("hShadeSpace")[0].addEventListener('input', p.reload);
      document.getElementsByName("hShadeDist")[0].addEventListener('input', p.reload);
      document.getElementsByName("hShadeHeight")[0].addEventListener('input', p.reload);
      document.getElementsByName("hShadeAngle")[0].addEventListener('input', p.reload);
      document.getElementsByName("vShadeDep")[0].addEventListener('input', p.reload);
      document.getElementsByName("vShadeNum")[0].addEventListener('input', p.reload);
      document.getElementsByName("vShadeSpace")[0].addEventListener('input', p.reload);
      document.getElementsByName("vShadeStart")[0].addEventListener('input', p.reload);
      document.getElementsByName("vShadeShift")[0].addEventListener('input', p.reload);
      document.getElementsByName("vShadeDist")[0].addEventListener('input', p.reload);
      document.getElementsByName("vShadeOn")[0].addEventListener('click', p.reload);
      document.getElementsByName("vShadeHeight")[0].addEventListener('input', p.reload);
      document.getElementsByName("vShadeScale")[0].addEventListener('input', p.reload);
      document.getElementsByName("fal")[0].addEventListener('input', p.reload1);
      document.getElementsByName("mdst")[0].addEventListener('input', p.reload1);
    };

    p.draw = function () {
      window.SOLAR_COMFORT.frameCount = p.frameCount;

      if (caseNumber === 1) {
        if (window.SOLAR_COMFORT.Case2Button === 0) {
          document.getElementsByName("button1").forEach(e => e.className = "button1OFF")

          $("input.case2, select.case2").css("visibility", "hidden");

        } else {
          document.getElementsByName("button1").forEach(e => e.className = "button1ON");

          $("input.case2, select.case2").css("visibility", "visible");
        }
      }

      if (caseNumber === 2 && window.SOLAR_COMFORT.Case2Button === 0) {
        // this is the render code for Case 2, but case 2 is currently disabled
        // just return early to save some CPU cycles and ensure graphics are hidden
        return;
      }

      window.SOLAR_COMFORT.updateSettings(c);

      if(_.isEqual(window.SOLAR_COMFORT[`settings${c}`], window.SOLAR_COMFORT[`settings${c}_prev`])) {
        if(!(annualOn && window.SOLAR_COMFORT[`annualSimulationDone${c}`] === false)) {
          // settings have not changed and we are not in the middle of running an annual simulation
          // just return, everthing is up-to-date
          return;
        }        
      }

      p.clear();
      p.background(255);

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

      if (annualOn) { // Check If Annual Button is Pressed
        var dates1 = [];

        if (window.SOLAR_COMFORT[`dateCounter${c}`] < 365) {
          for (let i = 0; i < 24; i++) {
            let date1 = new Date(Date.UTC(2000, 0, 1, 12)); // January 1st 2000 at Noon
            date1 = javascriptDateAddHours(date1, parseInt(i + TimeZone) - 12);
            date1 = javascriptDateAddDays(date1, parseInt(window.SOLAR_COMFORT[`dateCounter${c}`]));

            dates1.push(date1);
          }

          window.SOLAR_COMFORT[`dateCounter${c}`] += 1; // dateCounter will end at 365
        }

        sunPathGraphicPixelX = [];
        sunPathGraphicPixelY = [];

        // [ azimuth in degress, elevation in degrees ]
        // daily & annual
        solarCoordinates = [];
        for (let i = 0; i < dates1.length; i++) {
          solarCoordinates.push(solarCalculator([Lon, Lat]).position(dates1[i]));
        }

        for (let i = 0; i < solarCoordinates.length; i++) {
          if (solarCoordinates[i][1] > 0) {
            sunPathGraphicPixelX.push((36 - (36 * (solarCoordinates[i][1] / 180))) * p.sin((solarCoordinates[i][0] - 45 - roomOrientationValue) * (-3.1415926 / 180)));
            sunPathGraphicPixelY.push(((22 - (22 * (solarCoordinates[i][1] / 180))) * p.cos((solarCoordinates[i][0] - 45 - roomOrientationValue) * (-3.1415926 / 180))) - (solarCoordinates[i][1] * .3));
            //p.point((36-(36*(solarCoordinates[i][1]/180)))*p.sin((solarCoordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)), ((22-(22*(solarCoordinates[i][1]/180)))*p.cos((solarCoordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)))-(solarCoordinates[i][1]*.3));
          }
        }
      } else {
        if (Lon == window.SOLAR_COMFORT[`settings${c}`].Lon1 && Lat == window.SOLAR_COMFORT[`settings${c}`].Lat1 && Hour == window.SOLAR_COMFORT[`settings${c}`].Hour1 && Day == window.SOLAR_COMFORT[`settings${c}`].Day1 && Month == window.SOLAR_COMFORT[`settings${c}`].Month1 && TimeZone == window.SOLAR_COMFORT[`settings${c}`].TimeZone1 && roomOrientationValue == window.SOLAR_COMFORT[`settings${c}`].roomOrientationValue1 && currentStudy == singleHour) {
          // console.log(1);
        } else {
          // console.log(0);
          Lon = window.SOLAR_COMFORT[`settings${c}`].Lon1;
          Lat = window.SOLAR_COMFORT[`settings${c}`].Lat1;
          Hour = window.SOLAR_COMFORT[`settings${c}`].Hour1;
          Day = window.SOLAR_COMFORT[`settings${c}`].Day1;
          Month = window.SOLAR_COMFORT[`settings${c}`].Month1;
          TimeZone = window.SOLAR_COMFORT[`settings${c}`].TimeZone1;
          roomOrientationValue = window.SOLAR_COMFORT[`settings${c}`].roomOrientationValue1;
          currentStudy = singleHour;

          window.SOLAR_COMFORT[`dateCounter${c}`] = 0;
          annualCoordinates = [];
          currentFrame = 0;

          //SunVectors - TAKEN FROM THE OLD SUNVECTORS.JS FILE

          /*
                      let date1 = new Date(Date.UTC(2000, 0, 1, 12)); //J2000
                      date1 = javascriptDateAddHours(date1, parseInt(i + TimeZone) - 12);
                      date1 = javascriptDateAddDays(date1, parseInt(window.SOLAR_COMFORT[`dateCounter${c}`]));
          
                                for (let i = 0; i < 24; i++) {
                      let date1 = new Date(Date.UTC(2000, 0, 1, 12)); //J2000
                      date1 = javascriptDateAddHours(date1, parseInt(i + TimeZone) - 12);
                      date1 = javascriptDateAddDays(date1, parseInt(window.SOLAR_COMFORT[`dateCounter${c}`]));
          
                      dates1.push(date1);
                    }
          */

          // TODO
          // calculate all dates in UTC!
          // see above

          /*
                      let date = new Date(Date.UTC(2000, Month - 1, 1, 12)); // January 1st 2000 at Noon (but adjusted for correct month)
                      let hourOffset = parseInt(Hour) - parseInt(TimeZone) - 12;
                      date = javascriptDateAddHours(date, hourOffset);
                      date = javascriptDateAddDays(date, parseInt(Day) - 1);
          
          */

          // offset = (new Date().getTimezoneOffset()) / 60;
          var dates = []
          for (i = 1; i <= 24 * window.SOLAR_COMFORT[`settings${c}`].timestep; i++) {
            let hourI = (i - 1) / window.SOLAR_COMFORT[`settings${c}`].timestep;
            let minutes = Math.floor(((i - 1) / window.SOLAR_COMFORT[`settings${c}`].timestep - Math.floor((i - 1) / window.SOLAR_COMFORT[`settings${c}`].timestep)) * 60.0);
            let newDate = new Date(Date.UTC(2000, Month - 1, 1, 12)); // January 1st 2000 at Noon (but adjusted for correct month)
            newDate = javascriptDateAddDays(newDate, parseInt(Day) - 1);
            newDate = javascriptDateAddHours(newDate, Math.floor(hourI) + parseInt(TimeZone) - 12);
            newDate = javascriptDateAddMinutes(newDate, minutes);

            dates.push(newDate);
          }

          sunPathGraphicPixelX = [];
          sunPathGraphicPixelY = [];

          // 95 coordinate locations
          // 24 hours * 4 timesteps -1???? = 95
          // TODO fix shouldn't be -1?
          solarCoordinates = [];
          let solarCoordinatesHourly = [];
          for (let i = 1; i <= (24 * TIME_STEPS_PER_HOUR_DAY_SIMULATION) - 1; i++) {
            let newCoordinate = solarCalculator([Lon, Lat]).position(dates[i]);
            solarCoordinates.push(newCoordinate);
            if((i-1) % TIME_STEPS_PER_HOUR_DAY_SIMULATION === 0) {
              solarCoordinatesHourly.push(newCoordinate);
            }
          }
          window.SOLAR_COMFORT[`solarCoordinatesHourly${c}`] = solarCoordinatesHourly;

          for (let i = 0; i < solarCoordinates.length; i += parseInt(window.SOLAR_COMFORT[`settings${c}`].timestep)) {
            if (solarCoordinates[i][1] > 0) {
              sunPathGraphicPixelX.push((36 - (36 * (solarCoordinates[i][1] / 180))) * p.sin((solarCoordinates[i][0] - 45 - roomOrientationValue) * (-3.1415926 / 180)));
              sunPathGraphicPixelY.push(((22 - (22 * (solarCoordinates[i][1] / 180))) * p.cos((solarCoordinates[i][0] - 45 - roomOrientationValue) * (-3.1415926 / 180))) - (solarCoordinates[i][1] * .3));
              //p.point((36-(36*(solarCoordinates[i][1]/180)))*p.sin((solarCoordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)), ((22-(22*(solarCoordinates[i][1]/180)))*p.cos((solarCoordinates[i][0]-45+roomOrientationValue)*(-3.1415926 / 180)))-(solarCoordinates[i][1]*.3));
            }
          }

          // Single hour, re-calculate solarCoordinates just for a single hour
          if (singleHour == 1) {
            let date = new Date(Date.UTC(2000, Month - 1, 1, 12)); // January 1st 2000 at Noon (but adjusted for correct month)
            let hourOffset = parseInt(Hour) - parseInt(TimeZone) - 12;
            date = javascriptDateAddHours(date, hourOffset);
            date = javascriptDateAddDays(date, parseInt(Day) - 1);

            solarCoordinates = [];
            for (let i = 1; i <= TIME_STEPS_PER_HOUR_SINGLE_HOUR_SIMULATION; i++) {
              solarCoordinates.push(solarCalculator([Lon, Lat]).position(date));
            }
            window.SOLAR_COMFORT[`solarCoordinatesHourly${c}`] = [solarCoordinates[0]];

            // Calculate sun path graphic info            
            let solarCoordinatesForDate = solarCalculator([Lon, Lat]).position(date); // returns: [ azimuth in degress, elevation in degress ]
            let solarAzimuth = solarCoordinatesForDate[0];
            let solarElevation = solarCoordinatesForDate[1];
            sunPathGraphicPixelX = [];
            sunPathGraphicPixelY = [];
            sunPathGraphicPixelX.push((36 - (36 * (solarElevation / 180))) * p.sin((solarAzimuth - 45 - roomOrientationValue) * (-3.1415926 / 180)));
            sunPathGraphicPixelY.push(((22 - (22 * (solarElevation / 180))) * p.cos((solarAzimuth - 45 - roomOrientationValue) * (-3.1415926 / 180))) - (solarElevation * .3));
          }
        }

      }

      //GEO Result - TAKES DATA FROM THE GEO.JS FILE
      //geo.createGlazingForRect = function(rectHeight, wallLength, glazingRatio, windowWidth, winHeight, silHeight, distBreakup, ratioOrWidth, changedVar)
      var geoResult = geo.createGlazingForRect(parseFloat(window.SOLAR_COMFORT[`settings${c}`].ceilingHeightValue), parseFloat(window.SOLAR_COMFORT[`settings${c}`].wallDepVal), window.SOLAR_COMFORT[`settings${c}`].glzRatioValue / 100, parseFloat(window.SOLAR_COMFORT[`settings${c}`].windowWidthValue), parseFloat(window.SOLAR_COMFORT[`settings${c}`].windowHeightValue), parseFloat(window.SOLAR_COMFORT[`settings${c}`].sillHeightValue), parseFloat(window.SOLAR_COMFORT[`settings${c}`].distanceWindows), window.SOLAR_COMFORT[`settings${c}`].glzOrWidth);
      var r = {}
      r.wallCoords = geoResult.wallCoords;
      r.glzCoords = geoResult.glzCoords;
      r.glzRatio = geoResult.glzRatio;
      r.windowWidth = geoResult.windowWidth;
      r.windowHeight = geoResult.windowHeight;
      r.sillHeight = geoResult.sillHeight;
      r.centLineDist = geoResult.centLineDist;

      // draw sun path graphic
      let roomOrientationValueNeg = roomOrientationValue - 47 /* we draw the room at a ~47degree offset?? */;
      let SUN_PATH_RADIUS = 20;
      let SUN_PATH_DIAMETER = SUN_PATH_RADIUS*2;
      let NORTH_LABEL_OFFSET = 13;
      p.push();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(10);
      p.strokeCap(p.SQUARE);
      p.strokeWeight(1);
      p.translate(325, 280);

      // Azimuth Graphic
      p.fill(light_black + 50);
      p.noStroke();
      p.text("AZIMUTH", 0, SUN_PATH_RADIUS + 2*NORTH_LABEL_OFFSET);
      
      p.stroke(light_black + 100);
      p.noFill();

      // Compass outline
      p.ellipse(0, 0, SUN_PATH_DIAMETER, SUN_PATH_DIAMETER);

      // East to West Line
      p.line(SUN_PATH_RADIUS * p.sin((roomOrientationValueNeg + 90) * (-Math.PI / 180)), SUN_PATH_RADIUS * p.cos((roomOrientationValueNeg + 90) * (-Math.PI / 180)),
      SUN_PATH_RADIUS * p.sin((roomOrientationValueNeg - 90) * (-Math.PI / 180)), SUN_PATH_RADIUS * p.cos((roomOrientationValueNeg - 90) * (-Math.PI / 180)));

      // North to South Line
      p.line(0, 0, SUN_PATH_RADIUS * p.sin((roomOrientationValueNeg + 180) * (-Math.PI / 180)), SUN_PATH_RADIUS * p.cos((roomOrientationValueNeg + 180) * (-Math.PI / 180)));

      // North line
      p.strokeWeight(5);
      p.line(0, 0, SUN_PATH_RADIUS * p.sin((roomOrientationValueNeg) * (-Math.PI / 180)), SUN_PATH_RADIUS * p.cos((roomOrientationValueNeg) * (-Math.PI / 180)));

      // North label
      p.strokeWeight(1);
      p.text("N", (SUN_PATH_RADIUS+NORTH_LABEL_OFFSET) * p.sin((roomOrientationValueNeg) * (-Math.PI / 180)), (SUN_PATH_RADIUS+NORTH_LABEL_OFFSET) * p.cos((roomOrientationValueNeg) * (-Math.PI / 180)));

      // Draw sun positions (azimuth)
      window.SOLAR_COMFORT[`solarCoordinatesHourly${c}`].forEach(sunCoordinate => {
        let azimuth = sunCoordinate[0];
        let elevation = sunCoordinate[1];
        let azimuthRoomAndGraphicAdjusted = (azimuth + roomOrientationValueNeg) % 360;

        if(elevation >= 0) {
          p.strokeWeight(4);
          p.stroke(0);
          p.point(SUN_PATH_RADIUS * p.sin((azimuthRoomAndGraphicAdjusted) * (-Math.PI / 180)), SUN_PATH_RADIUS * p.cos((azimuthRoomAndGraphicAdjusted) * (-Math.PI / 180)));
        }

        if(window.SOLAR_COMFORT[`solarCoordinatesHourly${c}`].length === 1) {
          p.fill(light_black + 50);
          p.noStroke();
          p.text(`${Math.round(azimuth)}°`, 0, SUN_PATH_RADIUS + 3*NORTH_LABEL_OFFSET);          
        }
      });
      
      // Elevation graphic
      p.translate(50, SUN_PATH_RADIUS);
      p.noFill();
      p.strokeWeight(1);
      p.stroke(light_black + 100);
      p.line(0, 0, 0, -SUN_PATH_DIAMETER);
      p.line(0, 0, SUN_PATH_DIAMETER, 0);

      
      // elevation full arc
      p.noFill();
      p.stroke(light_black + 100);
      p.arc(0, 0, 2*SUN_PATH_DIAMETER, 2*SUN_PATH_DIAMETER, Math.PI + Math.PI/2, 0, p.PIE);
      
      p.fill(light_black + 50);
      p.noStroke();
      p.textAlign(p.LEFT, p.CENTER);
      p.text("ELEVATION", 0, 2*NORTH_LABEL_OFFSET);

      // Draw sun positions (elevation)
      window.SOLAR_COMFORT[`solarCoordinatesHourly${c}`].forEach(sunCoordinate => {
        let elevation = sunCoordinate[1];

        if(elevation >= 0) {
          p.strokeWeight(4);
          p.stroke(0);
          p.point(SUN_PATH_DIAMETER * p.sin((270-elevation) * (-Math.PI / 180)), SUN_PATH_DIAMETER * p.cos((270-elevation) * (-Math.PI / 180)));
        }

        if(window.SOLAR_COMFORT[`solarCoordinatesHourly${c}`].length === 1) {
          p.fill(light_black + 50);
          p.noStroke();
          p.text(`${Math.round(elevation)}°`, 20, 3*NORTH_LABEL_OFFSET);          
        }
      });

      p.pop();


      // OLD DRAW SUN PATH CORNER GRAPHIC
      // roomOrientationValueNeg = roomOrientationValue * -1
      // p.push();
      // p.translate(380, 280);
      // p.strokeCap(p.SQUARE);
      // p.stroke(light_black + 100);
      // p.strokeWeight(1);
      // p.noFill();
      // p.ellipse(0, 0, 75, 45); //main circle
      // p.fill(light_black + 100);
      // p.line(0, 0, 45 * p.sin((roomOrientationValueNeg + 45) * (-3.1415926 / 180)), 27 * p.cos((roomOrientationValueNeg + 45) * (-3.1415926 / 180)));
      // p.line(0, 0, 45 * p.sin((roomOrientationValueNeg + 135) * (-3.1415926 / 180)), 27 * p.cos((roomOrientationValueNeg + 135) * (-3.1415926 / 180)));
      // p.line(0, 0, 45 * p.sin((roomOrientationValueNeg + 225) * (-3.1415926 / 180)), 27 * p.cos((roomOrientationValueNeg + 225) * (-3.1415926 / 180)));
      // p.textAlign(p.CENTER, p.CENTER);
      // p.textSize(10);
      // p.text("N", 56 * p.sin((roomOrientationValueNeg - 45) * (-3.1415926 / 180)), 34 * p.cos((roomOrientationValueNeg - 45) * (-3.1415926 / 180)));
      // p.strokeWeight(4);
      // p.line(0, 0, 45 * p.sin((roomOrientationValueNeg - 45) * (-3.1415926 / 180)), 27 * p.cos((roomOrientationValueNeg - 45) * (-3.1415926 / 180)));
      // //p.translate(36*p.sin((roomOrientationValueNeg+45)*(-3.1415926 / 180)), 22*p.cos((roomOrientationValueNeg+45)*(-3.1415926 / 180)));
      // //p.point(0,0);
      // p.stroke(10);
      // p.strokeWeight(3);

      // p.strokeWeight(4);
      // p.stroke(light_black);
      // p.point(sunPathGraphicPixelX[0], sunPathGraphicPixelY[0]);
      // for (let i = 0; i < sunPathGraphicPixelX.length - 1; i++) {
      //   p.strokeWeight(1);
      //   //p.stroke(light_black);
      //   p.line(sunPathGraphicPixelX[i], sunPathGraphicPixelY[i], sunPathGraphicPixelX[i + 1], sunPathGraphicPixelY[i + 1]);
      //   p.strokeWeight(4);
      //   //p.stroke(100);
      //   p.point(sunPathGraphicPixelX[i + 1], sunPathGraphicPixelY[i + 1]);
      // }
      // p.strokeWeight(3);
      // p.stroke(100);
      // p.pop();

      // roomOrientationValue = roomOrientationValue * -1

      //DETERMINE HOW LARGE THE ISOMETRIC GRAPHIC WILL BE.
      //FIRST MAKE IT, THEN RE-DO IT USING A MULTIPLIER TO INCREASE OR DECREASE THE SCALE SO IT STAYS WITHIN THE BOUNDS OF THE CANVAS

      //let CeilHt = CeilingSlider.value();//Ceiling Height (ft) - this moves the whole grid down.
      let gridX = parseInt(window.SOLAR_COMFORT[`settings${c}`].wallLen); // number of y grids - should be fixed size normally at 60
      let gridY = parseInt(window.SOLAR_COMFORT[`settings${c}`].wallDepVal); // number of x grids - should be fixed size normally at 30
      let gridHt = window.SOLAR_COMFORT[`settings${c}`].gridHeightValue;
      //let sunRotation = SunRotationSlider.value() * (3.1415926/180);


      //ISOMETRIC BASED ON SQUARE OF 200px x 120px - the x and y numbers below change if not square grid
      let x = 100;
      let y = 60;
      let xNext = 200 - x;
      let yNext = 120 - y;
      let Ceil = window.SOLAR_COMFORT[`settings${c}`].ceilingHeightValue * 120;
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
      Ceil = (window.SOLAR_COMFORT[`settings${c}`].ceilingHeightValue * m) * 120;
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
      p.text(window.SOLAR_COMFORT[`settings${c}`].wallDepVal, ((x3 + (xNext * (gridX))) - (x * (gridY))) + 10, ((y3 + (y * (gridX))) + (yNext * (gridY))) + 16);
      p.text(window.SOLAR_COMFORT[`settings${c}`].wallLen, ((x3 + (xNext * (gridX))) - (x * (gridY))) - 24, ((y3 + (y * (gridX))) + (yNext * (gridY))) + 16);
      p.stroke(150, 150, 150);
      p.strokeWeight(1);
      //p.point(((x3+(xNext*(gridX)))-(x*(gridY)))+10, ((y3+(y*(gridX)))+(yNext*(gridY)))+6);
      p.line(((x3 + (xNext * (gridX))) - (x * (gridY))) + 10, ((y3 + (y * (gridX))) + (yNext * (gridY))) + 6, ((x3 + (xNext * (gridX))) - (x * (gridY))) + 10 - x, ((y3 + (y * (gridX))) + (yNext * (gridY))) + 6 - y);
      p.line(((x3 + (xNext * (gridX))) - (x * (gridY))) - 10, ((y3 + (y * (gridX))) + (yNext * (gridY))) + 6, ((x3 + (xNext * (gridX))) - (x * (gridY))) - 10 + x, ((y3 + (y * (gridX))) + (yNext * (gridY))) + 6 - y);
      //p.point(((x3+(xNext*(gridX)))-(x*(gridY)))-10, ((y3+(y*(gridX)))+(yNext*(gridY)))+6);
      for (let RLen = 0; RLen < window.SOLAR_COMFORT[`settings${c}`].wallDepVal; RLen = RLen + 5) {
        p.stroke(150, 150, 150);
        p.strokeWeight(1);
        let myNewX = ((x2 + (xNext * (gridX))) + 10) - (((x3 + (xNext * (gridX))) - (x * (gridY))) + 10);
        let myNewY = (((y3 + (y * (gridX))) + (yNext * (gridY))) + 6) - ((y2 + (y * (gridX))) + 6);
        myNewX = myNewX / (window.SOLAR_COMFORT[`settings${c}`].wallDepVal);
        myNewX = myNewX * RLen;
        myNewY = myNewY / (window.SOLAR_COMFORT[`settings${c}`].wallDepVal);
        myNewY = myNewY * RLen;
        //p.point((x2+(xNext*(gridX)))+10-myNewX, (y2+(y*(gridX)))+6+myNewY);
        p.line((x2 + (xNext * (gridX))) + 10 - myNewX, (y2 + (y * (gridX))) + 6 + myNewY, (x2 + (xNext * (gridX))) + 10 - myNewX - x, (y2 + (y * (gridX))) + 6 + myNewY - y);
        p.fill(0);
        p.noStroke();
        p.text(RLen, (x2 + (xNext * (gridX))) + 12 - myNewX, (y2 + (y * (gridX))) + 16 + myNewY);
      }
      for (let RDep = 0; RDep < window.SOLAR_COMFORT[`settings${c}`].wallLen; RDep = RDep + 5) {
        p.stroke(150, 150, 150);
        p.strokeWeight(1);
        let myNewX = ((x3 + (xNext * (gridX))) - (x * (gridY))) - 10 - (x - 10);
        let myNewY = (y * (gridY + 2)) + Ceil - ((y3 + (y * (gridX))) + (yNext * (gridY)));
        myNewX = myNewX / (window.SOLAR_COMFORT[`settings${c}`].wallLen);
        myNewX = myNewX * RDep;
        myNewY = myNewY / (window.SOLAR_COMFORT[`settings${c}`].wallLen);
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
          arrayX.push(((1 - (r.glzCoords[i][j][0] + (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2)) / window.SOLAR_COMFORT[`settings${c}`].wallDepVal) * FullRoomWidthX) + x);
          arrayY.push(((((r.glzCoords[i][j][0] + (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2)) / window.SOLAR_COMFORT[`settings${c}`].wallDepVal) * FullRoomWidthY) + y2) - (((r.glzCoords[i][j][2]) / window.SOLAR_COMFORT[`settings${c}`].ceilingHeightValue) * Ceil));
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
          arrayX.push(((1 - (r.glzCoords[i][j][0] + (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2)) / window.SOLAR_COMFORT[`settings${c}`].wallDepVal) * FullRoomWidthX) + x);
          arrayY.push(((((r.glzCoords[i][j][0] + (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2)) / window.SOLAR_COMFORT[`settings${c}`].wallDepVal) * FullRoomWidthY) + y2) - (((r.glzCoords[i][j][2]) / window.SOLAR_COMFORT[`settings${c}`].ceilingHeightValue) * Ceil));
        }
        for (let k = 0; k < window.SOLAR_COMFORT[`settings${c}`].horzShadeNum; k++) {
          let hSX1 = arrayX[2] - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].horzShadeDep) - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].horzShadeDist);
          let hSY1 = arrayY[2] - (y * window.SOLAR_COMFORT[`settings${c}`].horzShadeDep) + (k * y * window.SOLAR_COMFORT[`settings${c}`].horzShadeSpace * 2) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeHeight * y) - (y * window.SOLAR_COMFORT[`settings${c}`].horzShadeDist);
          let hSX2 = arrayX[3] - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].horzShadeDep) - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].horzShadeDist);
          let hSY2 = arrayY[3] - (y * window.SOLAR_COMFORT[`settings${c}`].horzShadeDep) + (k * y * window.SOLAR_COMFORT[`settings${c}`].horzShadeSpace * 2) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeHeight * y) - (y * window.SOLAR_COMFORT[`settings${c}`].horzShadeDist);
          let hSX3 = arrayX[3] - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].horzShadeDist);
          let hSY3 = arrayY[3] + (k * y * window.SOLAR_COMFORT[`settings${c}`].horzShadeSpace * 2) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeHeight * y) - (y * window.SOLAR_COMFORT[`settings${c}`].horzShadeDist);
          let hSX4 = arrayX[2] - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].horzShadeDist);
          let hSY4 = arrayY[2] + (k * y * window.SOLAR_COMFORT[`settings${c}`].horzShadeSpace * 2) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeHeight * y) - (y * window.SOLAR_COMFORT[`settings${c}`].horzShadeDist);

          let rotHSX1 = arrayX[2] - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].horzShadeDist) + (x * window.SOLAR_COMFORT[`settings${c}`].horzShadeDep) + (x * 2 * window.SOLAR_COMFORT[`settings${c}`].horzShadeDep * Math.sin(((-window.SOLAR_COMFORT[`settings${c}`].horzShadeAngle * 2 / 3) - 30) * p.TWO_PI / 360));
          let rotHSY1 = arrayY[2] + (k * y * window.SOLAR_COMFORT[`settings${c}`].horzShadeSpace * 2) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeHeight * y) - (y * window.SOLAR_COMFORT[`settings${c}`].horzShadeDist) - (y * window.SOLAR_COMFORT[`settings${c}`].horzShadeDep) + (x * 2 * window.SOLAR_COMFORT[`settings${c}`].horzShadeDep * Math.cos(((-window.SOLAR_COMFORT[`settings${c}`].horzShadeAngle * 2 / 3) - 30) * p.TWO_PI / 360))
          let rotHSX2 = arrayX[3] - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].horzShadeDist) + (x * window.SOLAR_COMFORT[`settings${c}`].horzShadeDep) + (x * 2 * window.SOLAR_COMFORT[`settings${c}`].horzShadeDep * Math.sin(((-window.SOLAR_COMFORT[`settings${c}`].horzShadeAngle * 2 / 3) - 30) * p.TWO_PI / 360));
          let rotHSY2 = arrayY[3] + (k * y * window.SOLAR_COMFORT[`settings${c}`].horzShadeSpace * 2) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeHeight * y) - (y * window.SOLAR_COMFORT[`settings${c}`].horzShadeDist) - (y * window.SOLAR_COMFORT[`settings${c}`].horzShadeDep) + (x * 2 * window.SOLAR_COMFORT[`settings${c}`].horzShadeDep * Math.cos(((-window.SOLAR_COMFORT[`settings${c}`].horzShadeAngle * 2 / 3) - 30) * p.TWO_PI / 360))

          p.quad(rotHSX1, rotHSY1, rotHSX2, rotHSY2, hSX3, hSY3, hSX4, hSY4);
        }
      }
      p.pop();


      p.push();
      p.strokeWeight(1);
      p.stroke(light_black);
      p.fill(50, 50);

      if (window.SOLAR_COMFORT[`settings${c}`].vertShadeOn === 0) {
        window.SOLAR_COMFORT[`settings${c}`].vertShadeHeight = `${window.SOLAR_COMFORT[`settings${c}`].ceilingHeightValue - (r.glzCoords[0][2][2])}`;
        window.SOLAR_COMFORT[`settings${c}`].vertShadeScale = `${window.SOLAR_COMFORT[`settings${c}`].ceilingHeightValue - (r.glzCoords[0][2][2]) + r.glzCoords[0][0][2]}`;

        document.getElementById(`vShadeHeight${c}`).value = window.SOLAR_COMFORT[`settings${c}`].vertShadeHeight;
        document.getElementById(`vShadeScale${c}`).value = window.SOLAR_COMFORT[`settings${c}`].vertShadeScale;
      }

      //VERTICAL SHADE LOUVERS
      for (let i = 0; i < r.glzCoords.length; i++) {
        let arrayX = [];
        let arrayY = [];
        for (let j = 0; j < 4; j++) {
          arrayX.push(((1 - (r.glzCoords[i][j][0] + (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2)) / window.SOLAR_COMFORT[`settings${c}`].wallDepVal) * FullRoomWidthX) + x);
          arrayY.push(((((r.glzCoords[i][j][0] + (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2)) / window.SOLAR_COMFORT[`settings${c}`].wallDepVal) * FullRoomWidthY) + y2) - (((r.glzCoords[i][j][2]) / window.SOLAR_COMFORT[`settings${c}`].ceilingHeightValue) * Ceil));
        }

        if (window.SOLAR_COMFORT[`settings${c}`].vertShadeStart == "L") {
          for (let k = 0; k < window.SOLAR_COMFORT[`settings${c}`].vertShadeNum; k++) {
            let vSX1 = arrayX[2] + (k * x * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].vertShadeDep) - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * x);
            let vSY1 = arrayY[2] - (y * window.SOLAR_COMFORT[`settings${c}`].vertShadeDep) - (k * y * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeHeight * y * 2) - (y * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) + (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * y);
            let vSX2 = arrayX[2] + (k * x * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * x);
            let vSY2 = arrayY[2] - (k * y * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeHeight * y * 2) - (y * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) + (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * y);
            let vSX4 = arrayX[1] + (k * x * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].vertShadeDep) - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * x);
            let vSY4 = arrayY[1] - (y * window.SOLAR_COMFORT[`settings${c}`].vertShadeDep) - (k * y * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeHeight * y * 2) - (y * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) + (window.SOLAR_COMFORT[`settings${c}`].vertShadeScale * y * 2) + (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * y);
            let vSX3 = arrayX[1] + (k * x * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * x);
            let vSY3 = arrayY[1] - (k * y * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeHeight * y * 2) - (y * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) + (window.SOLAR_COMFORT[`settings${c}`].vertShadeScale * y * 2) + (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * y);
            //p.line(vSX1, vSY1, vSX2, vSY2);
            //p.line(vSX3, vSY3, vSX4, vSY4);
            p.quad(vSX1, vSY1, vSX2, vSY2, vSX3, vSY3, vSX4, vSY4)
          }
        } else {
          for (let k = 0; k < window.SOLAR_COMFORT[`settings${c}`].vertShadeNum; k++) {
            let vSX1 = arrayX[3] - (k * x * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].vertShadeDep) - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) + (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * x);
            let vSY1 = arrayY[3] - (y * window.SOLAR_COMFORT[`settings${c}`].vertShadeDep) + (k * y * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeHeight * y * 2) - (y * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * y);
            let vSX2 = arrayX[3] - (k * x * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) + (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * x);
            let vSY2 = arrayY[3] + (k * y * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeHeight * y * 2) - (y * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * y);
            let vSX4 = arrayX[0] - (k * x * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].vertShadeDep) - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) + (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * x);
            let vSY4 = arrayY[0] - (y * window.SOLAR_COMFORT[`settings${c}`].vertShadeDep) + (k * y * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeHeight * y * 2) - (y * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) + (window.SOLAR_COMFORT[`settings${c}`].vertShadeScale * y * 2) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * y);
            let vSX3 = arrayX[0] - (k * x * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (((200 * m) - x) * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) + (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * x);
            let vSY3 = arrayY[0] + (k * y * window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeHeight * y * 2) - (y * window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) + (window.SOLAR_COMFORT[`settings${c}`].vertShadeScale * y * 2) - (window.SOLAR_COMFORT[`settings${c}`].vertShadeShift * y);
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



      // THIS IS A FIX THAT ALLOWS THE ROOM ORIENTATION TO ROTATE A FULL 360 DEGREES
      // essentially, we are rotating the solar azimuth in our solar solarCoordinates array
      // relative to the room orientation, instead of taking into account room orientation during all our calculations
      let solarCoordinatesRoomOrientationAdjusted = [];
      for (let k = 0; k < solarCoordinates.length; k++) {
        //console.log(solarCoordinates[k][0]+float(roomOrientationValue-180))
        let windowOrientation = roomOrientationValue - 180;
        solarCoordinatesRoomOrientationAdjusted.push((solarCoordinates[k][0] + p.float(windowOrientation)) % 360);
        // if (solarCoordinates[k][0] + p.float(windowOrientation) < -180) {
        //   solarCoordinatesRoomOrientationAdjusted.push(solarCoordinates[k][0] + p.float(windowOrientation) + 360);
        // } else if (solarCoordinates[k][0] + p.float(windowOrientation) > 180) {
        //   solarCoordinatesRoomOrientationAdjusted.push(solarCoordinates[k][0] + p.float(windowOrientation) - 360);
        // } else {
        //   solarCoordinatesRoomOrientationAdjusted.push(solarCoordinates[k][0] + p.float(windowOrientation));
        // }
      }
      //      // returns: [ azimuth in degress, elevation in degress ]


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
            for (let k = 0; k < solarCoordinates.length; k++) {
              let XYLouver1 = 0;
              let XlocationOnWall = 180; // this is a safe angle for the point to start from.. 180 means that it is perpindicular from the point (towards the wall?)
              if (solarCoordinatesRoomOrientationAdjusted[k] < MAX_AZIMUTH_DIRECT_SUN && solarCoordinatesRoomOrientationAdjusted[k] > MIN_AZIMUTH_DIRECT_SUN) {
                XlocationOnWall = Math.tan(solarCoordinatesRoomOrientationAdjusted[k] * (3.1415926 / 180)) * YdistanceFromWall; //this is real point at the window wall relative to the grid point. Add j to get the real location on the window wall
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
                for (let p = 0; p < parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeNum); p++) { //for each shade in this window...

                  let angleA = abs(solarCoordinatesRoomOrientationAdjusted[k]);
                  let angleB = 90.0 - abs(solarCoordinatesRoomOrientationAdjusted[k]);
                  if (solarCoordinatesRoomOrientationAdjusted[k] > 0) {
                    angleB = angleB * -1;
                  }
                  let bigA;
                  if (window.SOLAR_COMFORT[`settings${c}`].vertShadeStart == "L") {
                    bigA = ((XlocationOnWall + (j + 1) + (r.glzCoords[n][0][0] - (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2)) + (p * parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - window.SOLAR_COMFORT[`settings${c}`].vertShadeShift)));
                  } else {
                    bigA = ((XlocationOnWall + (j + 1) - (r.glzCoords[n][0][0] + (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2)) + (-p * parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - window.SOLAR_COMFORT[`settings${c}`].vertShadeShift)));
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
                  if (superC[q][g] > parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) && superC[q][g] < (parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) + parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeDep))) {
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
            for (let k = 0; k < solarCoordinates.length; k++) {
              let XlocationOnWall = 180; // this is a safe angle for the point to start from.. 180 means that it is perpindicular from the point (towards the wall?)
              if (solarCoordinatesRoomOrientationAdjusted[k] < MAX_AZIMUTH_DIRECT_SUN && solarCoordinatesRoomOrientationAdjusted[k] > MIN_AZIMUTH_DIRECT_SUN) {
                XlocationOnWall = Math.tan(solarCoordinatesRoomOrientationAdjusted[k] * (3.1415926 / 180)) * YdistanceFromWall; //this is real point at the window wall relative to the grid point. Add j to get the real location on the window wall
                //console.log(XlocationOnWall);
              }
              AWArray.push(XlocationOnWall);
              let xCoord = 0;
              let vertLouverXdistance = [];
              for (let m = 0; m < r.glzCoords.length; m++) {

                if (XlocationOnWall + (j + 1) > r.glzCoords[m][0][0] + (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2) && XlocationOnWall + (j + 1) < r.glzCoords[m][1][0] + (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2)) { //cycle through all the windows, check if the wall position exists within the bounds of the window
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
            for (let k = 0; k < solarCoordinates.length; k++) {
              let angleHeight = Math.tan((solarCoordinates[k][1]) * (3.1415926 / 180)) * distanceFromWall;
              AHArray.push(solarCoordinates[k][1]);
              if (solarCoordinates[k][1] < 0) {
                a = 0;
              } else if (angleHeight > r.glzCoords[0][0][2] - gridHt && angleHeight < (r.glzCoords[0][2][2] - gridHt)) {
                let testArray1 = [1];
                for (let n = 0; n < window.SOLAR_COMFORT[`settings${c}`].horzShadeNum; n++) {
                  let sinLawDist = (window.SOLAR_COMFORT[`settings${c}`].horzShadeDist * (Math.sin(3.1415926 - (((90) - solarCoordinates[k][1]) * (3.1415926 / 180)) - (90 * (3.1415926 / 180))))) / Math.sin(((90) - solarCoordinates[k][1]) * (3.1415926 / 180));
                  let sinLawAngle = (window.SOLAR_COMFORT[`settings${c}`].horzShadeDep * (Math.sin(3.1415926 - (((90) - solarCoordinates[k][1]) * (3.1415926 / 180)) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeAngle * (3.1415926 / 180))))) / Math.sin(((90) - solarCoordinates[k][1]) * (3.1415926 / 180));

                  if (angleHeight < (r.glzCoords[0][2][2] - gridHt) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeSpace * n) - (sinLawDist) + (p.float(window.SOLAR_COMFORT[`settings${c}`].horzShadeHeight) * .5) && angleHeight > ((r.glzCoords[0][2][2] - gridHt) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeSpace * n) - (sinLawDist) - (sinLawAngle) + (p.float(window.SOLAR_COMFORT[`settings${c}`].horzShadeHeight) * .5))) {
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
          } if (i % solarCoordinates.length == (solarCoordinates.length) - 1) {
            gridColorArray.push(gridColor);
            gridColor = 0;
          }
        }

        // FIX
        // all calculations are flipped left to right
        // we will just flip the entire array in the room width direction
        // instead of updating the direction of all arrays above... 
        gridColorArray = flipWidthForOneDimensionalRoomArray(gridColorArray, parseInt(window.SOLAR_COMFORT[`settings${c}`].wallDepVal));

        // Annual
        // keep track of each day of the year
        // NOTE at this point in the code dateCounter actually ranges from 1-365 (so 365 total days! correct)
        if (window.SOLAR_COMFORT[`dateCounter${c}`] <= 365 && annualOn && window.SOLAR_COMFORT[`annualSimulationDone${c}`] === false) {
          for (let i = 0; i < gridColorArray.length; i++) {
            if (window.SOLAR_COMFORT[`dateCounter${c}`] == 1) {
              // first loop
              bigArrayColor[i] = gridColorArray[i];
            } else {
              bigArrayColor[i] += gridColorArray[i];
            }
          }
        }

        // Annual
        // do this 1 time once annual simulation has completed
        if (window.SOLAR_COMFORT[`dateCounter${c}`] === 365 && annualOn && window.SOLAR_COMFORT[`annualSimulationDone${c}`] === false) {
          let annualGridColorAverage = bigArrayColor.map(v => round4Decimals(v / 365.0));
          window.SOLAR_COMFORT[`globalGridColor${c}`] = twoDimensionalRoomArrayFromOneDimensional(annualGridColorAverage, parseInt(window.SOLAR_COMFORT[`settings${c}`].wallDepVal), 1);
        }
      } else {
        // day and hour simulation
        bigArrayColor = [];

        if (window.SOLAR_COMFORT[`settings${c}`].vertShadeOn == 1) { // Variable height louvers


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
              for (let k = 0; k < solarCoordinates.length; k++) {
                let filledListN = [];
                for (let n = 0; n < r.glzCoords.length; n++) {
                  let filledListP = [];
                  for (let p = 0; p < parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeNum); p++) {
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
              for (let k = 0; k < solarCoordinates.length; k++) {
                let filledListN = [];
                for (let n = 0; n < r.glzCoords.length; n++) {
                  let filledListP = [];
                  for (let p = 0; p < parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeNum); p++) {
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
              for (let k = 0; k < solarCoordinates.length; k++) {
                let XYLouver1 = 0;
                let XlocationOnWall = 180; // this is a safe angle for the point to start from.. 180 means that it is perpindicular from the point (towards the wall?)
                if (solarCoordinatesRoomOrientationAdjusted[k] < MAX_AZIMUTH_DIRECT_SUN && solarCoordinatesRoomOrientationAdjusted[k] > MIN_AZIMUTH_DIRECT_SUN) {
                  XlocationOnWall = Math.tan(solarCoordinatesRoomOrientationAdjusted[k] * (3.1415926 / 180)) * YdistanceFromWall; //this is real point at the window wall relative to the grid point. Add j to get the real location on the window wall
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
                  for (let p = 0; p < parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeNum); p++) { //for each shade in this window...

                    let angleA = abs(solarCoordinatesRoomOrientationAdjusted[k]);
                    let angleB = 90.0 - abs(solarCoordinatesRoomOrientationAdjusted[k]);
                    if (solarCoordinatesRoomOrientationAdjusted[k] > 0) {
                      angleB = angleB * -1;
                    }
                    let bigA;
                    if (window.SOLAR_COMFORT[`settings${c}`].vertShadeStart == "L") {
                      bigA = ((XlocationOnWall + (j + 1) + (r.glzCoords[n][0][0] - (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2)) + (p * parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - window.SOLAR_COMFORT[`settings${c}`].vertShadeShift)));
                    } else {
                      bigA = ((XlocationOnWall + (j + 1) - (r.glzCoords[n][0][0] + (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2)) + (-p * parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - window.SOLAR_COMFORT[`settings${c}`].vertShadeShift)));
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
                    if (superC[q][g] > parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) && superC[q][g] < (parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) + parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeDep))) {
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
              for (let k = 0; k < solarCoordinates.length; k++) {
                let distanceBeyondWall = 0;
                let anotherCounter = 0;
                let angleHeight = Math.tan((solarCoordinates[k][1]) * (3.1415926 / 180)) * distanceFromWall;

                for (let n = 0; n < r.glzCoords.length; n++) {

                  for (let ru = 0; ru < window.SOLAR_COMFORT[`settings${c}`].vertShadeNum; ru++) {
                    distanceBeyondWall = (superD[newCounter][n][ru]);

                    let angleHeight2 = Math.tan((solarCoordinates[k][1]) * (3.1415926 / 180)) * distanceBeyondWall;


                    let myVar;
                    if (angleHeight + angleHeight2 > (r.glzCoords[0][0][2] - gridHt) - parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeScale) + parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeHeight) && angleHeight + angleHeight2 < (r.glzCoords[0][2][2] - gridHt) + parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeHeight)) {
                      myVar = 0;
                      //if this condintion, it hits the full size louver
                    } else {
                      myVar = 1;
                      anotherCounter = anotherCounter + 1
                    }
                    filledListZ[i][j][k][n][ru] = myVar;
                  }
                }
                if (anotherCounter > 0 + window.SOLAR_COMFORT[`settings${c}`].vertShadeNum) {
                  XYLouverTest[newCounter - 1] = 0;
                }
                newCounter = newCounter + 1;

              }
            }
          }


          let decider = 0;
          for (let i = 0; i < gridX; i++) {
            for (let j = 0; j < gridY; j++) {
              for (let k = 0; k < solarCoordinates.length; k++) {
                let nextLevel = 0;
                for (let n = 0; n < r.glzCoords.length; n++) {
                  for (let p = 0; p < parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeNum); p++) {
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
              for (let k = 0; k < solarCoordinates.length; k++) {
                let XYLouver1 = 0;
                let XlocationOnWall = 180; // this is a safe angle for the point to start from.. 180 means that it is perpindicular from the point (towards the wall?)
                if (solarCoordinatesRoomOrientationAdjusted[k] < MAX_AZIMUTH_DIRECT_SUN && solarCoordinatesRoomOrientationAdjusted[k] > MIN_AZIMUTH_DIRECT_SUN) {
                  XlocationOnWall = Math.tan(solarCoordinatesRoomOrientationAdjusted[k] * (3.1415926 / 180)) * YdistanceFromWall; //this is real point at the window wall relative to the grid point. Add j to get the real location on the window wall
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
                  for (let p = 0; p < parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeNum); p++) { //for each shade in this window...

                    let angleA = abs(solarCoordinatesRoomOrientationAdjusted[k]);
                    let angleB = 90.0 - abs(solarCoordinatesRoomOrientationAdjusted[k]);
                    if (solarCoordinatesRoomOrientationAdjusted[k] > 0) {
                      angleB = angleB * -1;
                    }
                    let bigA;
                    if (window.SOLAR_COMFORT[`settings${c}`].vertShadeStart == "L") {
                      bigA = ((XlocationOnWall + (j + 1) + (r.glzCoords[n][0][0] - (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2)) + (p * parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - window.SOLAR_COMFORT[`settings${c}`].vertShadeShift)));
                    } else {
                      bigA = ((XlocationOnWall + (j + 1) - (r.glzCoords[n][0][0] + (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2)) + (-p * parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - window.SOLAR_COMFORT[`settings${c}`].vertShadeShift)));
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
                    if (superC[q][g] > parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) && superC[q][g] < (parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) + parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeDep))) {
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
            for (let k = 0; k < solarCoordinates.length; k++) {
              let XlocationOnWall = 180; // this is a safe angle for the point to start from.. 180 means that it is perpindicular from the point (towards the wall?)
              if (solarCoordinatesRoomOrientationAdjusted[k] < MAX_AZIMUTH_DIRECT_SUN && solarCoordinatesRoomOrientationAdjusted[k] > MIN_AZIMUTH_DIRECT_SUN) {
                XlocationOnWall = Math.tan(solarCoordinatesRoomOrientationAdjusted[k] * (3.1415926 / 180)) * YdistanceFromWall; //this is real point at the window wall relative to the grid point. Add j to get the real location on the window wall
                //console.log(XlocationOnWall);
              }
              AWArray.push(XlocationOnWall);
              let xCoord = 0;
              let vertLouverXdistance = [];
              for (let m = 0; m < r.glzCoords.length; m++) {

                if (XlocationOnWall + (j + 1) > r.glzCoords[m][0][0] + (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2) && XlocationOnWall + (j + 1) < r.glzCoords[m][1][0] + (window.SOLAR_COMFORT[`settings${c}`].wallDepVal / 2)) { //cycle through all the windows, check if the wall position exists within the bounds of the window
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
            for (let k = 0; k < solarCoordinates.length; k++) {
              let angleHeight = Math.tan((solarCoordinates[k][1]) * (3.1415926 / 180)) * distanceFromWall;
              AHArray.push(solarCoordinates[k][1]);
              if (solarCoordinates[k][1] < 0) {
                a = 0;
              } else if (angleHeight > r.glzCoords[0][0][2] - gridHt && angleHeight < (r.glzCoords[0][2][2] - gridHt)) {
                let testArray1 = [1];
                for (let n = 0; n < window.SOLAR_COMFORT[`settings${c}`].horzShadeNum; n++) {
                  let sinLawDist = (window.SOLAR_COMFORT[`settings${c}`].horzShadeDist * (Math.sin(3.1415926 - (((90) - solarCoordinates[k][1]) * (3.1415926 / 180)) - (90 * (3.1415926 / 180))))) / Math.sin(((90) - solarCoordinates[k][1]) * (3.1415926 / 180));
                  let sinLawAngle = (window.SOLAR_COMFORT[`settings${c}`].horzShadeDep * (Math.sin(3.1415926 - (((90) - solarCoordinates[k][1]) * (3.1415926 / 180)) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeAngle * (3.1415926 / 180))))) / Math.sin(((90) - solarCoordinates[k][1]) * (3.1415926 / 180));

                  if (angleHeight < (r.glzCoords[0][2][2] - gridHt) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeSpace * n) - (sinLawDist) + (p.float(window.SOLAR_COMFORT[`settings${c}`].horzShadeHeight) * .5) && angleHeight > ((r.glzCoords[0][2][2] - gridHt) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeSpace * n) - (sinLawDist) - (sinLawAngle) + (p.float(window.SOLAR_COMFORT[`settings${c}`].horzShadeHeight) * .5))) {
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
          if (i % solarCoordinates.length == (solarCoordinates.length) - 1) {
            gridColorArray.push(gridColor);
            gridColor = 0;
          }
        }

        /************************* 
         * Total Window Area:
         * 
         *        total window area that received direct sun
         *        for use in Solar Load Calculation
         *        0 if nighttime (or angle of window is > 90 from sun)
         *        otherwise it is the total window area of all windows
         *        minus area that is blocked by vertical and horizontal shades
         * 
         *************************/
        let windowGridSquareGetsDirectSun = [];
        let totalWindowArea = 0;
        let windowAreaDirectSun = 0;
        let windowSolarCoolingLoad = 0;
        let windowsCoordinates = r.glzCoords;
        let wallWidthHalf = parseFloat(window.SOLAR_COMFORT[`settings${c}`].wallDepVal) / 2.0;
        let gTL = 0, gTR = 1, gBR = 2, gBL = 3;
        let gX = 0, gY = 2, gZ = 0;
        for (let windowIndex = 0; windowIndex < windowsCoordinates.length; windowIndex++) {
          let window1 = windowsCoordinates[windowIndex];
          let width = window1[gTR][gX] - window1[gTL][gX];
          let height = window1[gBL][gY] - window1[gTL][gY];
          if(width > 0 && height > 0) {
            totalWindowArea += width * height;
          }
        }
        window.SOLAR_COMFORT[`totalWindowArea${c}`] = totalWindowArea;

        if (singleHour === 1 && Array.isArray(windowsCoordinates) && windowsCoordinates.length > 0 && Array.isArray(solarCoordinates) && solarCoordinates.length > 0) {
          let roomRotationAdjustedSolarAzimuthDegrees = solarCoordinatesRoomOrientationAdjusted[0];
          let solarElevation = solarCoordinates[0][1];
          let solarAzimuthDegrees = solarCoordinates[0][0];

          window.SOLAR_COMFORT[`solarAzimuthDegrees`] = solarAzimuthDegrees;
          window.SOLAR_COMFORT[`solarElevationDegrees`] = solarElevation;
          window.SOLAR_COMFORT[`solarAzimuthDegreesRoomRotationAdjusted${c}`] = roomRotationAdjustedSolarAzimuthDegrees;
          window.SOLAR_COMFORT[`iDir${c}`] = window.SOLAR_COMFORT.Idir_f(solarElevation);

          /* Azimuth
           * if window is facing the sun within tolerance, then
           * we have direct sun in the azimuth dimension
           * and we assume that the sun will be able to hit 100% of all windows (shades for now)
           * 
           * Elevation
           * if it is positive then the sun is visible in the horizon (IE daytime)
           */
          if (solarElevation > 0 && roomRotationAdjustedSolarAzimuthDegrees > MIN_AZIMUTH_DIRECT_SUN && roomRotationAdjustedSolarAzimuthDegrees < MAX_AZIMUTH_DIRECT_SUN) {
            /* Prepare arrays for each window divided into 1x1 foot squares
             * for each square we will determine if the shades are blocking it from the sun
             * initialize all grid squares as true and turn them to false anytime a shade blocks one of them */
            for (let windowIndex = 0; windowIndex < windowsCoordinates.length; windowIndex++) {
              let window1 = windowsCoordinates[windowIndex];
              let width = window1[gTR][gX] - window1[gTL][gX];
              let height = window1[gBL][gY] - window1[gTL][gY];
              let windowArray = [];
              for (let i = 0; i < height; i++) {
                windowArray[i] = [];
                for (let j = 0; j < width; j++) {
                  windowArray[i][j] = true;
                }
              }
              windowGridSquareGetsDirectSun.push(windowArray);
            }

            /* Vertical Shades
            * 
            * see if given sun's azimuth the vertical shades
            * are blocking parts of windows, we will grid the window into 1x1 foot squares
            * and assume that if any part of the 1x1 foot square is blocked 100% of the square is blocked */
            for (let windowIndex = 0; windowIndex < windowsCoordinates.length; windowIndex++) {
              let window1 = windowsCoordinates[windowIndex];
              let width = window1[gTR][gX] - window1[gTL][gX];
              let height = window1[gBL][gY] - window1[gTL][gY];
              let XlocationOnWall = 180; // this is a safe angle for the point to start from.. 180 means that it is perpindicular from the point (towards the wall?)
              if (roomRotationAdjustedSolarAzimuthDegrees < MAX_AZIMUTH_DIRECT_SUN && roomRotationAdjustedSolarAzimuthDegrees > MIN_AZIMUTH_DIRECT_SUN) {
                // XlocationOnWall = Math.tan(roomRotationAdjustedSolarAzimuthDegrees * (3.1415926 / 180)) * 2;
                XlocationOnWall = 0;
              }

              // for each 1x1 foot grid square in this window
              for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                  let newBigBArray = [];

                  //for each shade in this window
                  for (let p = 0; p < parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeNum); p++) { 
                    let angleA = abs(roomRotationAdjustedSolarAzimuthDegrees);
                    let angleB = 90.0 - abs(roomRotationAdjustedSolarAzimuthDegrees);
                    if (roomRotationAdjustedSolarAzimuthDegrees > 0) {
                      angleB = angleB * -1;
                    }
                    let shadePositionX;
                    if (window.SOLAR_COMFORT[`settings${c}`].vertShadeStart == "L") {
                      shadePositionX = ((XlocationOnWall + j + (window1[gTL][gX]) + (p * parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeShift))));
                    } else {
                      shadePositionX = ((XlocationOnWall + j+1 - (window1[gTL][gX] + wallWidthHalf) + (-p * parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace) - parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeShift))));
                    }

                    let ratioAngleBtoA = Math.sin(angleB * (Math.PI / 180)) / Math.sin(angleA * (Math.PI / 180));
                    let bigB = ratioAngleBtoA * shadePositionX;
                    newBigBArray.push(bigB);
                  }

                  for (let q = 0; q < newBigBArray.length; q++) {
                    if (newBigBArray[q] > parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) && newBigBArray[q] < (parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeDist) + parseInt(window.SOLAR_COMFORT[`settings${c}`].vertShadeDep))) {
                      // Vertical shade is blocking the sun at this window grid square
                      windowGridSquareGetsDirectSun[windowIndex][i][j] = false;
                    }
                  }
                }
              }
            }

            /* Horizontal Shades
            * 
            * see if given sun's elevation the horizontal shades
            * are blocking parts of windows, we will grid the window into 1x1 foot squares
            * and assume that if any part of the 1x1 foot square is blocked 100% of the square is blocked */
            let angleHeight = Math.tan(solarElevation * (Math.PI / 180)) * 1;
            for (let windowIndex = 0; windowIndex < windowsCoordinates.length; windowIndex++) {
              let window1 = windowsCoordinates[windowIndex];
              let width = window1[gTR][gX] - window1[gTL][gX];
              let height = window1[gBL][gY] - window1[gTL][gY];

              // for each 1x1 foot grid square in this window
              for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                  for (let n = 0; n < window.SOLAR_COMFORT[`settings${c}`].horzShadeNum; n++) {
                    let sinLawDist = (window.SOLAR_COMFORT[`settings${c}`].horzShadeDist * (Math.sin(Math.PI - (((90) - solarElevation) * (Math.PI / 180)) - (90 * (Math.PI / 180))))) / Math.sin(((90) - solarElevation) * (Math.PI / 180));
                    let sinLawAngle = (window.SOLAR_COMFORT[`settings${c}`].horzShadeDep * (Math.sin(Math.PI - (((90) - solarElevation) * (Math.PI / 180)) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeAngle * (Math.PI / 180))))) / Math.sin(((90) - solarElevation) * (Math.PI / 180));
  
                    if (angleHeight < (window1[gTR][gY] + i) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeSpace * n) - (sinLawDist) + (p.float(window.SOLAR_COMFORT[`settings${c}`].horzShadeHeight) * .5) && angleHeight > ((window1[gTR][gY] + i) - (window.SOLAR_COMFORT[`settings${c}`].horzShadeSpace * n) - (sinLawDist) - (sinLawAngle) + (p.float(window.SOLAR_COMFORT[`settings${c}`].horzShadeHeight) * .5))) {
                      // Horizontal shade is blocking the sun at this window grid square
                      windowGridSquareGetsDirectSun[windowIndex][i][j] = false;
                    }
                  }  
                }
              }
            }

            /* Window Area:
            * calculate total window area that received direct sun */
            for (let windowIndex = 0; windowIndex < windowsCoordinates.length; windowIndex++) {
              let window1 = windowsCoordinates[windowIndex];
              let width = window1[gTR][gX] - window1[gTL][gX];
              let height = window1[gBL][gY] - window1[gTL][gY];
              for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                  if(windowGridSquareGetsDirectSun[windowIndex][i][j]) {                    
                    windowAreaDirectSun = windowAreaDirectSun + 1; // windowGridSquareGetsDirectSun represents a 1x1 foot square
                  }
                }
              }
            }
            let iDir = window.SOLAR_COMFORT.Idir_f(solarElevation);
            windowSolarCoolingLoad = units.wattsPerMeterSquaredToBtuPerHourPerFootSquared(iDir) * windowAreaDirectSun * window.SOLAR_COMFORT[`settings${c}`].shgc;
          }
        }
        window.SOLAR_COMFORT[`windowAreaDirectSun${c}`] = windowAreaDirectSun;
        window.SOLAR_COMFORT[`windowSolarCoolingLoad${c}`] = windowSolarCoolingLoad;

        // FIX
        // all calculations are flipped left to right
        // we will just flip the entire array in the room width direction
        // instead of updating the direction of all arrays above...
        gridColorArray = flipWidthForOneDimensionalRoomArray(gridColorArray, parseInt(window.SOLAR_COMFORT[`settings${c}`].wallDepVal));

        // Hour or Day
        let stepDelta = singleHour == 1 ? 9 : 4;
        window.SOLAR_COMFORT[`globalGridColor${c}`] = twoDimensionalRoomArrayFromOneDimensional(gridColorArray, parseInt(window.SOLAR_COMFORT[`settings${c}`].wallDepVal), stepDelta);

        if (window.SOLAR_COMFORT[`settings${c}`].thermalComfortSingleHour && solarCoordinates.length > 0) {
          /* when in single hour mode we have 9 coordinates (subsets of hour)
           * just grab the 1st one, IE top of the hour */
          let coordinate = solarCoordinates[0];

          /* solarCoordinates = [ azimuth in degress, elevation in degrees (aka altitude) ] */
          let elevation = coordinate[1];
          let azimuth = coordinate[0];

          let deltaMRT_grid = window.SOLAR_COMFORT.calculateDeltaMRT_for_Grid(
            window.SOLAR_COMFORT[`settings${c}`].wallLen,    /* wallLen is room depth!! perpindicular to windows */
            window.SOLAR_COMFORT[`settings${c}`].wallDepVal, /* wallDepVal is room width!! parallel to windows */
            window.SOLAR_COMFORT[`settings${c}`].posture, window.SOLAR_COMFORT[`settings${c}`].sillHeightValue, window.SOLAR_COMFORT[`settings${c}`].windowWidthValue,
            elevation,
            azimuth,
            window.SOLAR_COMFORT[`settings${c}`].shgc,
            window.SOLAR_COMFORT[`settings${c}`].asa
          );
          // set delta MRT value to 0 for all grid locations that don't actually get direct sunlight
          window.SOLAR_COMFORT.zeroOutDeltaMRT_for_Locations_with_no_Direct_Sun(deltaMRT_grid, window.SOLAR_COMFORT[`globalGridColor${c}`])
          window.SOLAR_COMFORT[`deltaMRTGrid${c}`] = deltaMRT_grid;

          let MRT_grid = window.SOLAR_COMFORT.calculateMRT_for_Grid(
            window.SOLAR_COMFORT[`settings${c}`].wallLen,    /* wallLen is room depth!! perpindicular to windows */
            window.SOLAR_COMFORT[`settings${c}`].wallDepVal, /* wallDepVal is room width!! parallel to windows */
            geoResult,
            window.SOLAR_COMFORT[`settings${c}`].windowU,
            window.SOLAR_COMFORT[`settings${c}`].wallR,
            window.SOLAR_COMFORT[`settings${c}`].airTemp,
            window.SOLAR_COMFORT[`settings${c}`].outdoorTemp,
            window.SOLAR_COMFORT[`settings${c}`].clothing,
            window.SOLAR_COMFORT[`settings${c}`].metabolic,
            window.SOLAR_COMFORT[`settings${c}`].airSpeed,
            window.SOLAR_COMFORT[`settings${c}`].humidity,
            deltaMRT_grid
          );
          window.SOLAR_COMFORT[`MRTGrid${c}`] = MRT_grid;
        } else {
          window.SOLAR_COMFORT[`deltaMRTGrid${c}`] = undefined;
          window.SOLAR_COMFORT[`MRTGrid${c}`] = undefined;
        }
      }

      //END OF TRIG

      // CREATE GRID
      //GRID X ROW
      let MDT = 0; //Max Direct Time
      let Percentage = window.SOLAR_COMFORT[`settings${c}`].valMDST;
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
          if (mySun > Percentage / window.SOLAR_COMFORT[`settings${c}`].timestep) {
            // MDT = MDT + 1;
          }
        } else {
          if (mySun > Percentage / window.SOLAR_COMFORT[`settings${c}`].timestep) {
            // MDT = MDT + 1;
          }
          mySun = p.int(mySun / window.SOLAR_COMFORT[`settings${c}`].timestep);
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

          if (gridColorArray[i * gridY] / .99 > window.SOLAR_COMFORT[`settings${c}`].valMDST && gridColorArray[(i * gridY) + 1] / .99 < window.SOLAR_COMFORT[`settings${c}`].valMDST) {
            p.push();
            p.strokeWeight(1);
            p.stroke(0);
            p.line(X3, Y3 - GridHt, X4, Y4 - GridHt);
            p.pop();
          }
          if (gridColorArray[(i * gridY)] / .99 < window.SOLAR_COMFORT[`settings${c}`].valMDST && gridColorArray[(i * gridY) + gridY] / .99 > window.SOLAR_COMFORT[`settings${c}`].valMDST) {
            p.push();
            p.strokeWeight(1);
            p.stroke(0);
            p.line(X2, Y2 - GridHt, X3, Y3 - GridHt);
            p.pop();
          }
          if (gridColorArray[(i * gridY)] / .99 > window.SOLAR_COMFORT[`settings${c}`].valMDST && gridColorArray[(i * gridY) + gridY] / .99 < window.SOLAR_COMFORT[`settings${c}`].valMDST) {
            p.push();
            p.strokeWeight(1);
            p.stroke(0);
            p.line(X2, Y2 - GridHt, X3, Y3 - GridHt);
            p.pop();
          }
        } else {
          // single day or single hour
          if (gridColorArray[i * gridY] / (window.SOLAR_COMFORT[`settings${c}`].timestep - .1) > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep && gridColorArray[(i * gridY) + 1] / (window.SOLAR_COMFORT[`settings${c}`].timestep - .1) < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep) {
            p.push();
            p.strokeWeight(1);
            p.stroke(0);
            p.line(X3, Y3 - GridHt, X4, Y4 - GridHt);
            p.pop();
          }
          if (gridColorArray[(i * gridY)] / (window.SOLAR_COMFORT[`settings${c}`].timestep - .1) < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep && gridColorArray[(i * gridY) + gridY] / (window.SOLAR_COMFORT[`settings${c}`].timestep - .1) > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep) {
            p.push();
            p.strokeWeight(1);
            p.stroke(0);
            p.line(X2, Y2 - GridHt, X3, Y3 - GridHt);
            p.pop();
          }
          if (gridColorArray[(i * gridY)] / (window.SOLAR_COMFORT[`settings${c}`].timestep - .1) > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep && gridColorArray[(i * gridY) + gridY] / (window.SOLAR_COMFORT[`settings${c}`].timestep - .1) < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep) {
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
            if (mySun > Percentage / window.SOLAR_COMFORT[`settings${c}`].timestep) {
              MDT = p.int(MDT) + 1;
            }
          } else {
            if (mySun / window.SOLAR_COMFORT[`settings${c}`].timestep > Percentage / window.SOLAR_COMFORT[`settings${c}`].timestep) {
              MDT = p.int(MDT) + 1;
            }
            mySun = p.int(mySun / window.SOLAR_COMFORT[`settings${c}`].timestep);
          }
          if (mySun == null) {
            mySun = 0;
          }

          mySun = parseInt(mySun);

          // draw colored grid square on floor representing % of time in direct sun
          if (window.SOLAR_COMFORT[`settings${c}`].thermalComfortSingleHour && window.SOLAR_COMFORT[`MRTGrid${c}`]) {
            let mrtValues = window.SOLAR_COMFORT[`MRTGrid${c}`][i][(gridY - 1) - j]; /* flip left-to-right room is actually drawn 0 feet on the right */
            let gridColor = '#ffffff';
            if (mrtValues.mrtppd >= 0 && mrtValues.mrtppd <= 30) {
              gridColor = ppdColorScale0to30(mrtValues.mrtppd);
            } else if (mrtValues.mrtppd <= 100) {
              gridColor = ppdColors0to30[ppdColors0to30.length - 1];
            } else {
              console.error('invalid PPD: ', mrtValues.mrtppd);
              gridColor = "#000000";
            }
            p.fill(gridColor);
          } else {
            p.fill(ColorScaleArray[mySun].r, ColorScaleArray[mySun].g, ColorScaleArray[mySun].b, 200);
          }
          p.quad(newX1, newY1 - GridHt, newX2, newY2 - GridHt, newX3, newY3 - GridHt, newX4, newY4 - GridHt);

          if (annualOn && window.SOLAR_COMFORT[`dateCounter${c}`] > 364) {
            if (bigArrayColor[(i * gridY) + j] / .99 < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep * 365 && bigArrayColor[(i * gridY) + j + 1] / .99 > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep * 365) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX3, newY3 - GridHt, newX4, newY4 - GridHt);
              p.pop();
            }
            if (bigArrayColor[(i * gridY) + j] / .99 > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep * 365 && bigArrayColor[(i * gridY) + j + 1] / .99 < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep * 365) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX3, newY3 - GridHt, newX4, newY4 - GridHt);
              p.pop();
            }
            if (bigArrayColor[(i * gridY) + j] / .99 < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep * 365 && bigArrayColor[(i * gridY) + j + gridY] / .99 > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep * 365) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX2, newY2 - GridHt, newX3, newY3 - GridHt);
              p.pop();
            }
            if (bigArrayColor[(i * gridY) + j] / .99 > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep * 365 && bigArrayColor[(i * gridY) + j + gridY] / .99 < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep * 365) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX2, newY2 - GridHt, newX3, newY3 - GridHt);
              p.pop();
            }
          } else if (annualOn) {
            if (gridColorArray[(i * gridY) + j] / .99 < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep && gridColorArray[(i * gridY) + j + 1] / .99 > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX3, newY3 - GridHt, newX4, newY4 - GridHt);
              p.pop();
            }
            if (gridColorArray[(i * gridY) + j] / .99 > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep && gridColorArray[(i * gridY) + j + 1] / .99 < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX3, newY3 - GridHt, newX4, newY4 - GridHt);
              p.pop();
            }
            if (gridColorArray[(i * gridY) + j] / .99 < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep && gridColorArray[(i * gridY) + j + gridY] / .99 > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX2, newY2 - GridHt, newX3, newY3 - GridHt);
              p.pop();
            }
            if (gridColorArray[(i * gridY) + j] / .99 > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep && gridColorArray[(i * gridY) + j + gridY] / .99 < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX2, newY2 - GridHt, newX3, newY3 - GridHt);
              p.pop();
            }
          } else {
            if (gridColorArray[(i * gridY) + j] / (window.SOLAR_COMFORT[`settings${c}`].timestep - .1) < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep && gridColorArray[(i * gridY) + j + 1] / (window.SOLAR_COMFORT[`settings${c}`].timestep - .1) > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX3, newY3 - GridHt, newX4, newY4 - GridHt);
              p.pop();
            }
            if (gridColorArray[(i * gridY) + j] / (window.SOLAR_COMFORT[`settings${c}`].timestep - .1) > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep && gridColorArray[(i * gridY) + j + 1] / (window.SOLAR_COMFORT[`settings${c}`].timestep - .1) < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX3, newY3 - GridHt, newX4, newY4 - GridHt);
              p.pop();
            }
            if (gridColorArray[(i * gridY) + j] / (window.SOLAR_COMFORT[`settings${c}`].timestep - .1) < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep && gridColorArray[(i * gridY) + j + gridY] / (window.SOLAR_COMFORT[`settings${c}`].timestep - .1) > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep) {
              p.push();
              p.strokeWeight(1);
              p.stroke(0);
              p.line(newX2, newY2 - GridHt, newX3, newY3 - GridHt);
              p.pop();
            }
            if (gridColorArray[(i * gridY) + j] / (window.SOLAR_COMFORT[`settings${c}`].timestep - .1) > window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep && gridColorArray[(i * gridY) + j + gridY] / (window.SOLAR_COMFORT[`settings${c}`].timestep - .1) < window.SOLAR_COMFORT[`settings${c}`].valMDST / window.SOLAR_COMFORT[`settings${c}`].timestep) {
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
        MDTPercentage = p.int((p.float(MDT) / (parseInt(window.SOLAR_COMFORT[`settings${c}`].wallLen) * parseInt(window.SOLAR_COMFORT[`settings${c}`].wallDepVal))) * 100);
      } else {
        MDTPercentage = p.int((p.float(MDT) / (parseInt(window.SOLAR_COMFORT[`settings${c}`].wallLen) * parseInt(window.SOLAR_COMFORT[`settings${c}`].wallDepVal))) * 100);
      }


      //console.log(MDT);
      // if (annualOn == 1 && currentFrame > 418){
      //   MDTPercentage = p.int((p.float(MDT)/(wallLen * wallDepVal))*100/1.5);
      //   //console.log(MDT);
      // }

      //console.log(p.frameCount);

      window.SOLAR_COMFORT[`MDTResult${c}`] = "% > max direct sun time, " + MDTPercentage + "%, ";

      p.push();

      if (MDTPercentage < window.SOLAR_COMFORT[`settings${c}`].valFal) {
        if (!window.SOLAR_COMFORT[`settings${c}`].thermalComfortSingleHour) {
          p.fill(0, 255, 0);
          p.image(imgCheck, 310, 2, 30, 30);
        }
        window.SOLAR_COMFORT[`MDTResult${c}`] += "Pass\n";
      } else {
        if (!window.SOLAR_COMFORT[`settings${c}`].thermalComfortSingleHour) {
          p.fill(255, 0, 0);
          p.image(imgNope, 310, 2, 30, 30);
        }
        window.SOLAR_COMFORT[`MDTResult${c}`] += "Fail\n";
      }

      p.fill(0);
      p.textSize(50);

      if (!window.SOLAR_COMFORT[`settings${c}`].thermalComfortSingleHour) {
        p.text(MDTPercentage + "%", 340, 38);
        p.textSize(10);
        p.text("> max direct sun time", 340, 50);
      } else {
        let solarCoolingLoad = Math.round(window.SOLAR_COMFORT[`windowSolarCoolingLoad${c}`]);
        p.textSize(30);
        p.textAlign(p.RIGHT, p.BASELINE);
        p.text(solarCoolingLoad.toLocaleString(), 390, 40);
        p.textSize(10);
        p.textAlign(p.LEFT, p.BASELINE);
        p.text("Btu/hr", 395, 40);
        p.textAlign(p.CENTER, p.BASELINE);
        p.text("SOLAR COOLING LOAD", 375, 10);
      }
      p.textAlign(p.CENTER, p.CENTER);

      // p.pop();
      //
      // //console.log(p.frameCount);
      // p.fill(50);
      // p.textSize(7);
      // p.text(p.frameCount,420,320);

      // An annual simulation has completed
      if (window.SOLAR_COMFORT[`dateCounter${c}`] === 365 && annualOn) {
        window.SOLAR_COMFORT[`annualSimulationDone${c}`] = true;
      }

      // if(p.frameCount === 60*1 && caseNumber === 1) {
      //   console.log(solarCoordinates.map(c => c[1]));
      // }
    
      window.SOLAR_COMFORT[`settings${c}_prev`] = _.cloneDeep(window.SOLAR_COMFORT[`settings${c}`]);
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
    // p.checkButton = function () {
    //   //p.loop();
    //   //noLoop();
    //   if (window.SOLAR_COMFORT.Case2Button == 1) {
    //     console.log('turning off case 2')
    //     window.SOLAR_COMFORT.Case2Button = 0;
    //   } else {
    //     console.log('turning on case 2')
    //     window.SOLAR_COMFORT.Case2Button = 1;
    //   }
    // }
  }
}

new p5(renderGraphicsAndRunSimulation(1));
new p5(renderGraphicsAndRunSimulation(2));

window.SOLAR_COMFORT = {};

window.SOLAR_COMFORT.settings = {};
window.SOLAR_COMFORT.settings1 = {};
window.SOLAR_COMFORT.settings_prev = {};
window.SOLAR_COMFORT.settings1_prev = {};

window.SOLAR_COMFORT.BODY_POSITION_SIT = 'seated';
window.SOLAR_COMFORT.BODY_POSITION_STAND = 'standing';

unitSys = "IP";

let twoDimensionalRoomArrayFromOneDimensional = (oneDimensionalArray, gridY, numSteps) => {
  let gridColorArray2D = [];
  let gridColorArray2DX  = 0;
  let gridColorArray2DY  = 0;

  for(let i=0; i<oneDimensionalArray.length; i++) {
    if(gridColorArray2DX === 0) {
      gridColorArray2D[gridColorArray2DY] = []; 
    }

    gridColorArray2D[gridColorArray2DY][gridY - gridColorArray2DX - 1] = oneDimensionalArray[i] / numSteps;

    gridColorArray2DX++;
    if(gridColorArray2DX === gridY) {
      gridColorArray2DX = 0;
      gridColorArray2DY++;
    }
  }

  return gridColorArray2D
}

let flipWidthForOneDimensionalRoomArray = (oneDimensionalArray, dimY) => {
  let flippedArray = [];

  for(let i=0; i<oneDimensionalArray.length; i++) {
    let row = Math.floor(i/dimY);
    let ii = i % dimY;

    let index = Math.floor(row*dimY + dimY - ii - 1);
    flippedArray[index] = oneDimensionalArray[i];
  }

  return flippedArray;
}

let javascriptDateAddMinutes = (date, minutes) => {
  date.setTime(date.getTime() + Math.floor(minutes*60*1000));
  return date;
}

let javascriptDateAddHours = (date, hours) => {
  date.setTime(date.getTime() + Math.floor(hours*60*60*1000));
  return date;
}

let javascriptDateAddDays = (date, days) => {
  date.setTime(date.getTime() + Math.floor(days*24*60*60*1000));
  return date;
}

// https://stackoverflow.com/a/11832950
let round4Decimals = (value) => {
  return Math.round((value + Number.EPSILON) * 10000) / 10000;
}

// https://unicode.org/charts/nameslist/n_25A0.html
// allow us to have nice visually comparable data tables in our CSV exports
// useful for regression testing and validating changes during bug fixing
let ASCII_GRAYSCALE = ['⬛','█','▮','▰','◼','◾','▬','▪','•','=','-','.',' '];
let number0to12toAscii = (value) => {
  if(isNaN(value)) {
    return ' ';
  }

  let i = Math.round(value);
  i = (ASCII_GRAYSCALE.length-1) - i; // reverse
  i = i < 0 ? 0 : (i > (ASCII_GRAYSCALE.length-1) ? ASCII_GRAYSCALE.length-1 : i);
  return ASCII_GRAYSCALE[i];
}

window.SOLAR_COMFORT.bisect = function(a, b, fn, epsilon, target) {
    var a_T, b_T, midpoint, midpoint_T;
    while (Math.abs(b - a) > 2 * epsilon) {
        midpoint = (b + a) / 2;
        a_T = fn(a);
        b_T = fn(b);
        midpoint_T = fn(midpoint);
        if ((a_T - target) * (midpoint_T - target) < 0) b = midpoint;
        else if ((b_T - target) * (midpoint_T - target) < 0) a = midpoint;
        else return 0;
    }
    return midpoint;
}

window.SOLAR_COMFORT.secant = function(a, b, fn, epsilon) {
  // root-finding only
  var f1 = fn(a)
  if (Math.abs(f1) <= epsilon) return a
  var f2 = fn(b)
  if (Math.abs(f2) <= epsilon) return b
  var slope, c, f3
  for (var i = 0; i < 100; i++){
    slope = (f2 - f1) / (b - a)
    c = b - f2/slope
    f3 = fn(c)
    if (Math.abs(f3) < epsilon) return c
    a = b
    b = c
    f1 = f2
    f2 = f3
  }
  return 100
}

window.SOLAR_COMFORT.updateSettings = function(c) {
  window.SOLAR_COMFORT[`settings${c}`].glzOrWidth = document.getElementById(`glazingRatioCheck`).checked;

  window.SOLAR_COMFORT[`settings${c}`].Lon1 = document.getElementById(`long`).value;
  
  window.SOLAR_COMFORT[`settings${c}`].Lat1 = document.getElementById(`lat`).value;
  
  window.SOLAR_COMFORT[`settings${c}`].TimeZone1 = document.getElementById(`timeZone`).value;
  
  // CLIMATE
  window.SOLAR_COMFORT[`settings${c}`].outdoorTemp = document.getElementById(`outdoorTemp`).value;

  // TIME CONFIG
  window.SOLAR_COMFORT[`settings${c}`].Hour1 = document.getElementById(`hour`).value;

  window.SOLAR_COMFORT[`settings${c}`].Day1 = document.getElementById(`day`).value;

  window.SOLAR_COMFORT[`settings${c}`].Month1 = document.getElementById(`mon`).value;

  window.SOLAR_COMFORT[`settings${c}`].timestep = document.getElementById(`timeStep`).value;


  // INDOOR CONDITIONS
  window.SOLAR_COMFORT[`settings${c}`].airTemp = document.getElementById(`airTemp${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].humidity = document.getElementById(`humidity${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].airSpeed = document.getElementById(`airSpeed${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].clothing = document.getElementById(`clothing${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].metabolic = document.getElementById(`metabolic${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].posture = document.getElementById(`posture${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].asa = document.getElementById(`asa${c}`).value;

  // ROOM GEOMETRY
  window.SOLAR_COMFORT[`settings${c}`].roomOrientationValue1 = document.getElementById(`north${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].gridHeightValue = document.getElementById(`gridHt${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].ceilingHeightValue = document.getElementById(`ceiling${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].wallLen = document.getElementById(`wallWidth${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].wallDepVal = document.getElementById(`wallDep${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].wallR = document.getElementById(`wallR${c}`).value;

  // WINDOW GEOMETRY

  window.SOLAR_COMFORT[`settings${c}`].windowHeightValue = document.getElementById(`windowHeight${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].windowWidthValue = document.getElementById(`windowWidth${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].glzRatioValue = document.getElementById(`glazing${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].sillHeightValue = document.getElementById(`sill${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].distanceWindows = document.getElementById(`distWindow${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].windowU = document.getElementById(`windowU${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].shgc = document.getElementById(`shgc${c}`).value;


  // SHADE GEOMETRY

  window.SOLAR_COMFORT[`settings${c}`].horzShadeDep = document.getElementById(`hShadeDep${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].horzShadeNum = document.getElementById(`hShadeNum${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].horzShadeSpace = document.getElementById(`hShadeSpace${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].horzShadeDist = document.getElementById(`hShadeDist${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].horzShadeHeight = document.getElementById(`hShadeHeight${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].horzShadeAngle = document.getElementById(`hShadeAngle${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].vertShadeDep = document.getElementById(`vShadeDep${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].vertShadeNum = document.getElementById(`vShadeNum${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].vertShadeSpace = document.getElementById(`vShadeSpace${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].vertShadeStart = document.getElementById(`vShadeStart${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].vertShadeShift = document.getElementById(`vShadeShift${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].vertShadeDist = document.getElementById(`vShadeDist${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].vertShadeOn = document.getElementById(`vShadeOn${c}`).checked ? 0 : 1;

  window.SOLAR_COMFORT[`settings${c}`].vertShadeHeight = document.getElementById(`vShadeHeight${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].vertShadeScale = document.getElementById(`vShadeScale${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].valFal = document.getElementById(`fal`).value; //FLOOR AREA LOSS

  window.SOLAR_COMFORT[`settings${c}`].valMDST = document.getElementById(`mdst`).value; // MAX DIRECT SUN TIME
}
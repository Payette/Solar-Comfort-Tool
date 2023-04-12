window.SOLAR_COMFORT = {};

window.SOLAR_COMFORT.settings = {};
window.SOLAR_COMFORT.settings1 = {};
window.SOLAR_COMFORT.settings_prev = {};
window.SOLAR_COMFORT.settings1_prev = {};

window.SOLAR_COMFORT.BODY_POSITION_SIT = 'seated';
window.SOLAR_COMFORT.BODY_POSITION_STAND = 'standing';

unitSys = "IP";

// These input fields are shared by case 1 and case 2
window.SOLAR_COMFORT.globalInputFieldNames = [
  `ppdRadio`,
  `dsHour`,
  `dsDay`,
  `dsMonth`,
  `windowWidthCheck`,
  `glazingRatioCheck`,
  `long`,
  `lat`,
  `timeZone`,
  `outdoorTemp`,
  `hour`,
  `day`,
  `mon`
];

// Case 2 has a 1 appended to the end of these name
// IE hour refers to case 1, and hour1 refers to case 2
window.SOLAR_COMFORT.caseInputFieldNames = [
  `airTemp`,
  `humidity`,
  `airSpeed`,
  `clothing`,
  `metabolic`,
  `posture`,
  `asa`,
  `north`,
  `gridHt`,
  `ceiling`,
  `wallWidth`,
  `wallDep`,
  `wallR`,
  `windowHeight`,
  `windowWidth`,
  `glazing`,
  `sill`,
  `distWindow`,
  `windowU`,
  `shgc`,
  `hShadeDep`,
  `hShadeNum`,
  `hShadeSpace`,
  `hShadeDist`,
  `hShadeHeight`,
  `hShadeAngle`,
  `vShadeOn`,
  `vShadeDep`,
  `vShadeNum`,
  `vShadeSpace`,
  `vShadeShift`,
  `vShadeDist`,
  `vShadeHeight`,
  `vShadeScale`,
  `vShadeStart`
];

// case variable to input field name mappings
window.SOLAR_COMFORT.variableNameToInputMappings = {
  airTemp: 'airTemp',
  humidity: 'humidity',
  airSpeed: 'airSpeed',
  clothing: 'clothing',
  metabolic: 'metabolic',
  Posture: 'posture',
  asa: 'asa',
  windowOrientationValue1: 'north',
  gridHeightValue: 'gridHt',
  ceilingHeightValue: 'ceiling',
  wallLen: 'wallWidth',
  wallDepVal: 'wallDep',
  wallR: 'wallR',
  windowHeightValue: 'windowHeight',
  windowWidthValue: 'windowWidth',
  glzRatioValue: 'glazing',
  sillHeightValue: 'sill',
  distanceWindows: 'distWindow',
  windowU: 'windowU',
  shgc: 'shgc',
  horzShadeDep: 'hShadeDep',
  horzShadeNum: 'hShadeNum',
  horzShadeSpace: 'hShadeSpace',
  horzShadeDist: 'hShadeDist',
  horzShadeHeight: 'hShadeHeight',
  horzShadeAngle: 'hShadeAngle',
  vertShadeDep: 'vShadeDep',
  vertShadeNum: 'vShadeNum',
  vertShadeSpace: 'vShadeSpace',
  vertShadeStart: 'vShadeStart',
  vertShadeShift: 'vShadeShift',
  vertShadeDist: 'vShadeDist',
  vertShadeOn: {
    fieldName: 'vShadeOn',
    domSetter: newValue => {
      let el = document.getElementById('vShadeOn1');
      if(newValue === 0) {
        el.checked = true;
      } else {
        el.checked = false;
      }
    }
  },
  vertShadeHeight: 'vShadeHeight',
  vertShadeScale: 'vShadeScale'
}

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

let round1Decimal = (value) => {
  return Math.round((value + Number.EPSILON) * 10) / 10;
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
  window.SOLAR_COMFORT[`settings${c}`].thermalComfortVisualization = document.getElementById(`thermalcomfortvisualization`).value;

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

  window.SOLAR_COMFORT[`settings${c}`].Posture = document.getElementById(`posture${c}`).value;

  window.SOLAR_COMFORT[`settings${c}`].asa = document.getElementById(`asa${c}`).value;

  // ROOM GEOMETRY
  window.SOLAR_COMFORT[`settings${c}`].windowOrientationValue1 = document.getElementById(`north${c}`).value;

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

  window.SOLAR_COMFORT[`settings${c}`].valFal = document.getElementById(`fal`).value; //Floor Area Limit

  window.SOLAR_COMFORT[`settings${c}`].valMDST = document.getElementById(`mdst`).value; // Max Allowable Direct Sun
  
  //Monthly 
  var selectedStudyType;
  if($('#dsAnnual').is(':checked')) {
      selectedStudyType = $('#dsAnnual');
  }else{
      selectedStudyType = $("input[name=studyType]:checked")
  }
  window.SOLAR_COMFORT[`settings${c}`].studyType = selectedStudyType.val();

}

window.SOLAR_COMFORT.copyCase1ToCase2 = function() {
  Object.keys(window.SOLAR_COMFORT.variableNameToInputMappings).forEach(variableName => {
    let inputFieldName = undefined;
    let domSetter = undefined;
    if(typeof window.SOLAR_COMFORT.variableNameToInputMappings[variableName] === 'object') {
      inputFieldName = window.SOLAR_COMFORT.variableNameToInputMappings[variableName].fieldName;
      domSetter = window.SOLAR_COMFORT.variableNameToInputMappings[variableName].domSetter;
    } else {
      inputFieldName = window.SOLAR_COMFORT.variableNameToInputMappings[variableName]
    }
    
    // set case 2 variable on our settings object
    let case1Value = window.SOLAR_COMFORT.settings[`${variableName}`];
    window.SOLAR_COMFORT.settings1[`${variableName}`] = case1Value;

    // set case 2 input field values in the DOM
    if(domSetter) {
      domSetter(window.SOLAR_COMFORT.settings[`${variableName}`])
    } else {
      let el = document.getElementById(`${inputFieldName}1`);
      el.value = case1Value
    }
  })
}

window.SOLAR_COMFORT.handleMouseHover = function(p, c) {
  let el = document.getElementById(`visualizationhoverstats${c}`);
  el.classList.add('hidefromall')

  if (window.SOLAR_COMFORT[`settings${c}`].thermalComfortSingleHour && window.SOLAR_COMFORT[`MRTGrid${c}`]) {
    // ISOMETRIC calculations (copied from p5render...)
    let gridX = parseInt(window.SOLAR_COMFORT[`settings${c}`].wallLen); // number of y grids - should be fixed size normally at 60
    let gridY = parseInt(window.SOLAR_COMFORT[`settings${c}`].wallDepVal); // number of x grids - should be fixed size normally at 30
    let gridHt = window.SOLAR_COMFORT[`settings${c}`].gridHeightValue;

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

    for (let i = 0; i < gridX; i++) {
      let X1 = (x2 + (xNext * i));
      let Y1 = (y2 + (y * i));
      let X2 = (x2 + (xNext * (i + 1)));
      let Y2 = (y2 + (y * (i + 1)));
      let X3 = (x3 + (xNext * (i + 1)));
      let Y3 = (y3 + (y * (i + 1)));
      let X4 = (x3 + (xNext * i));
      let Y4 = (y3 + (y * i));

      for (let j = 0; j < gridY; j++) {
        let newX1 = (X4 - (x * j));
        let newY1 = (Y4 + (yNext * j));
        let newX2 = (X3 - (x * j));
        let newY2 = (Y3 + (yNext * j));
        let newX3 = (X3 - (x * (j + 1)));
        let newY3 = (Y3 + (yNext * (j + 1)));
        let newX4 = (X4 - (x * (j + 1)));
        let newY4 = (Y4 + (yNext * (j + 1)));

        let quad = [
          p.createVector(newX1, newY1 - GridHt),
          p.createVector(newX2, newY2 - GridHt),
          p.createVector(newX3, newY3 - GridHt),
          p.createVector(newX4, newY4 - GridHt)
        ]
        let mouseInQuad = p.collidePointPoly(p.mouseX, p.mouseY, quad);
        if(window.SOLAR_COMFORT[`mouseOver${c}`] && mouseInQuad) {
          let el = document.getElementById(`visualizationhoverstats${c}`);
          el.style.left = `${p.winMouseX + 5}px`;
          el.style.top = `${p.winMouseY + 5}px`;
          el.classList.remove('hidefromall')
          //var mrttest = document.getElementById("dmrt-result")

          let mrtValues = window.SOLAR_COMFORT[`MRTGrid${c}`][i][(gridY - 1) - j]; /* flip left-to-right room is actually drawn 0 feet on the right */

          document.querySelector(`#visualizationhoverstats${c} .stat_x`).innerHTML = i;
          document.querySelector(`#visualizationhoverstats${c} .stat_y`).innerHTML = j;
          document.querySelector(`#visualizationhoverstats${c} .stat_ppd`).innerHTML = mrtValues.mrtppd;
          document.querySelector(`#visualizationhoverstats${c} .stat_pmv`).innerHTML = mrtValues.pmv;
          document.querySelector(`#visualizationhoverstats${c} .stat_longwave_mrt`).innerHTML = mrtValues.mrt;
          document.querySelector(`#visualizationhoverstats${c} .stat_shortwave_mrt`).innerHTML = isNaN(mrtValues.deltaMRT) ? 0 : mrtValues.deltaMRT;
          document.querySelector(`#visualizationhoverstats${c} .stat_mrt`).innerHTML = mrtValues.solarAdjustedMRT;
          document.querySelector(`#visualizationhoverstats${c} .stat_ope_temp`).innerHTML = mrtValues.operativetemp;
          //document.querySelector(`#visualizationhoverstats${c} .stat_cbe_mrt`).innerHTML =  isNaN(mrtValues.erfMRT) ? 0 : mrtValues.cbeMRT;
        }
      }
    }
  }
}

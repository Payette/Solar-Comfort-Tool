window.SOLAR_COMFORT = {};

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
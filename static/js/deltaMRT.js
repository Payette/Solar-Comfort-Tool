/*
ERFsolar    - Effective Radiant Field solar
feff        - fraction of body surface exposed
                0.696 seated; 0.725 standing
fsvv        - fraction of sky vault
Idir        - Direct solar beam intensity W/m2, interpolate from table based on solar altitute
beta        - solar altitute
fp          - projected area factor
SHGC        - solar heat gain coefficient
alpha_sw    - shortwave absorptivity
h           - window height from sill
w           - window width
d           - distance from window to person
position_body - position of person near window either sit or stand
*/
const feff_seated = 0.696;
const feff_standing = 0.725;

/* MODELING THE COMFORT EFFECTS OF SHORT-WAVE SOLAR RADIATION INDOORS
   Edward ARENS1, Tyler HOYT1, Xin ZHOU1,3, Li HUANG1,2 , Hui ZHANG1, Stefano, SCHIAVON1

   Solar altitude angle [°] 5 10 20 30 40 50 60 70 80 90
   to: Direct beam solar radiation [W/m2] value
*/
let Idir_lookup_table = {
    5:  210,
    10: 390,
    20: 620,
    30: 740,
    40: 810,
    50: 860,
    60: 890,
    70: 910,
    80: 920,
    90: 925
}
var Idir_interpolation = d3.scale.linear().domain([5, 10, 20, 30, 40, 50, 60, 70, 80, 90])
.range([210, 390, 620, 740, 810, 860, 890, 910, 920, 925])

window.SOLAR_COMFORT.Idir_f = (solarAltitude) => {
    if(solarAltitude >= 5 && solarAltitude <= 90) {
        return Idir_interpolation(solarAltitude);
    }
    if(solarAltitude <= 5) {
        return 210;
    }
    return 925;   
}

window.SOLAR_COMFORT.delta_MRT_f = (ERF_solar, feff) => {
    return ERF_solar / (6.012 * feff);
}

window.SOLAR_COMFORT.ERF_solar_f = (feff, fsvv, Idir, beta, fp, SHGC, alpha_sw) => {
    return ((0.5 * feff * fsvv * (0.755 * Idir * Math.sin(beta)))
    + (0.5 * feff * fp * Idir))
    * SHGC
    * (alpha_sw / 0.95);
}

window.SOLAR_COMFORT.fsvv_f = (h, w, d) => {
    return (Math.atan(h / (2 * d)) * Math.atan(w / (2 * d))) /
    (90 * 180);
}

window.SOLAR_COMFORT.calculateDeltaMRT = (position_body, h, w, d, beta, solar_azimuth, SHGC, alpha_sw) => {
    let feff = position_body === window.SOLAR_COMFORT.BODY_POSITION_SIT ? feff_seated : feff_standing;
    let fsvv = window.SOLAR_COMFORT.fsvv_f(h, w, d);
    let Idir = window.SOLAR_COMFORT.Idir_f(beta);
    if(typeof Idir === 'undefined') {
        return undefined;
    }

    let fp = window.SOLAR_COMFORT.projected_area_factor(solar_azimuth, beta, position_body);
    let ERF_solar = window.SOLAR_COMFORT.ERF_solar_f(feff, fsvv, Idir, beta, fp, SHGC, alpha_sw);
    let delta_MRT = window.SOLAR_COMFORT.delta_MRT_f(ERF_solar, feff);

    //console.log(`delta MRT: ${delta_MRT}, ERF_solar: ${ERF_solar}, fp: ${fp}, Idir: ${Idir}, fsvv: ${fsvv}, feff: ${feff}, position_body: ${position_body}, h: ${h}, w: ${w}, d: ${d}, beta: ${beta}, solar_azimuth: ${solar_azimuth}, SHGC: ${SHGC}, alpha_sw: ${alpha_sw}`);

    return delta_MRT;
}

window.SOLAR_COMFORT.calculateDeltaMRT_for_Grid = (room_depth, room_width, position_body, h, w, beta, solar_azimuth, SHGC, alpha_sw) => {
    let delta_mrt_grid = [];
    for(let i=0; i<room_depth; i++) {
        delta_mrt_grid[i] = [];
        for(let j=0; j<room_width; j++) {
            let d = i + 1;
            if(isNaN(beta) || beta < 0 || isNaN(solar_azimuth)) {
                // solar elevation is negative when the sun has dropped below the horizon hence it is night-time
                delta_mrt_grid[i][j] = Number.NaN;
            } else {
                let deltaMRT = window.SOLAR_COMFORT.calculateDeltaMRT(position_body, h, w, d, beta, solar_azimuth, SHGC, alpha_sw);
                delta_mrt_grid[i][j] = deltaMRT;    
            }
        }
    }
    return delta_mrt_grid;
}

window.SOLAR_COMFORT.calculateMRT_for_Grid = (room_depth, room_width, geoResult, windowU, wallR, airTemp, outdoorTemp, clothing, metabolic, airSpeed, humidity, deltaMRTGrid) => {
    let intLowEChecked = false; // we aren't letting the user model this
    let intLowEEmissivity = 0.2; // UNUSED when intLowEChecked = false
    let radiantFloorChecked = false; // we aren't letting the user model this

    let ppdValue = 0.2; // Acceptable PPD from Downdraft   
    let ppdValue2 = 0.1; // Acceptable PPD from Radiant Loss

    let mrt_grid = [];
    let roomWidthCenter = room_width / 2.0;
    for(let i=0; i<room_depth; i++) {
        mrt_grid[i] = [];
        /* occupant distance from wall, IE room depth
         * formulas only work for non-zero positive values
         */
        let occDistFromFacade = i + 1; 
        for(let j=0; j<room_width; j++) {
            let deltaMRT = deltaMRTGrid[i][j];

            let occDistToWallCenter = j - roomWidthCenter; /* occupant horizontal position relative to room center */
            var viewResult = geo.computeAllViewFac(geoResult.wallCoords, geoResult.glzCoords, occDistToWallCenter, occDistFromFacade)
            
            var comfortResult = comf.getFullPPD(viewResult.wallViews, viewResult.glzViews, viewResult.facadeDist, viewResult.windIntervals,
                occDistToWallCenter, geoResult.windowHeight, geoResult.sillHeight,
                windowU, intLowEChecked, intLowEEmissivity,
                parseFloat(wallR), parseFloat(airTemp), parseFloat(outdoorTemp),
                radiantFloorChecked, parseFloat(clothing), parseFloat(metabolic), parseFloat(airSpeed),
                parseFloat(humidity), ppdValue, ppdValue2,
                deltaMRT
            );
            mrt_grid[i].push(comfortResult)
        }
    }
    return mrt_grid;
}

window.SOLAR_COMFORT.zeroOutDeltaMRT_for_Locations_with_no_Direct_Sun = (deltaMRTGrid, directSunGrid) => {
    for(var i=0; i<deltaMRTGrid.length; i++){
        for(var j=0; j<deltaMRTGrid[i].length; j++){
            if(directSunGrid[i][j] == 0) {
                deltaMRTGrid[i][j] = Number.NaN;
            }
        }
    }
}

// window.SOLAR_COMFORT.add2DArrays = (a, b) => {
//     let added = [];

//     for(var i=0; i<a.length; i++){
//         added[i] = [];
//         for(var j=0; j<a[i].length; j++){
//             added[i][j] = a[i][j] + b[i][j];
//         }
//     }
//     return added;
// }
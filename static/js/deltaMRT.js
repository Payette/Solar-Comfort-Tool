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
const DEG_TO_RAD = 0.0174532925;


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
        return Math.round(Idir_interpolation(solarAltitude));
    }
    if(solarAltitude <= 5) {
        return 210;
    }
    return 925;   
}

window.SOLAR_COMFORT.delta_MRT_f = (ERF_solar, feff) => {
    //return ERF_solar / (6.012 * feff);
    return ERF_solar / (6.012 * feff);
}

//origninal
// window.SOLAR_COMFORT.ERF_solar_f = (feff, fsvv, Idir, beta, fp, SHGC, alpha_sw) => {
//     return ((0.5 * feff * fsvv * (0.755 * Idir * Math.sin(beta * DEG_TO_RAD)))
//     + (0.5 * feff * fp * Idir))
//     * SHGC
//     * (alpha_sw / 0.95);
// }

///add f_bes, Idiff=0.17*Idir*sin beta
window.SOLAR_COMFORT.ERF_solar_f = (feff, fsvv, Idir, beta, fp, SHGC, alpha_sw, f_bes) => {
    //let Idiff = 0.17 * Idir * Math.sin(beta * DEG_TO_RAD)
    let Idiff = 0.2 * Idir
    //console.log (`Idir: ${Idir}`,`Idiff: ${Idiff}`,`fsvv: ${fsvv}`)
     
    return (0.5 * feff * fsvv * (Idiff + 0.6*(Idir * Math.sin(beta * DEG_TO_RAD) + Idiff))
    + (feff * fp * f_bes * Idir))
    * SHGC
    * (alpha_sw / 0.95);
}


window.SOLAR_COMFORT.f_bes_f = (d, j, beta, solar_azimuth, sillHeight, h, w, room_width) => { 
    let h_si = to_m(h);
    let w_si = to_m(w);
    let d_si = to_m(d);
    let room_width_si = to_m(room_width);
    let sillHeight_si = to_m(sillHeight);
    let JJ = j+1;
    let j_si = to_m(JJ);
    let tan_beta = Math.abs(Math.tan(beta * Math.PI/180));
    let sin_beta = Math.abs(Math.sin(beta * Math.PI/180));
    let azi = 90 - Math.abs(180 - solar_azimuth)
    let tan_azi = Math.abs(Math.tan(azi * Math.PI/180));
    let sin_azi = Math.sin(azi * Math.PI/180)
    let dia = d_si/ Math.abs(Math.sin(azi * Math.PI/180));
    let ray0 = sillHeight_si / tan_beta;
    let ray1 = (sillHeight_si + h_si) / tan_beta;
    //console.log (`d: ${d}`,`j: ${j}`, `beta: ${beta}`,`sin_beta: ${sin_beta}`, `solar_azimuth: ${solar_azimuth}`,`d_si: ${d_si}`, `j_si: ${j_si}`, `sillHeight_si: ${sillHeight_si}`, `h_si: ${h_si}`, `w_si: ${w_si}`, `room_width_si: ${room_width_si}`, `tan_beta: ${tan_beta}`,`azi: ${azi}`,`tan_azi: ${tan_azi}` ,`sin_azi: ${sin_azi}` ,`dia: ${dia}`  );
    let p1 = (room_width_si - w_si)/2 - d_si/tan_azi;
    let p2 = (room_width_si + w_si)/2 - d_si/tan_azi;
    //console.log (`p1: ${p1}`,`p2: ${p2}`,`ray0: ${ray0}`,`ray1: ${ray1}`);

    //1.73 is average human height (m)
    if ( ((room_width_si - w_si)/2 - d_si/tan_azi) < j_si && j_si < ((room_width_si + w_si)/2 - d_si/tan_azi) ){
        if (dia < (sillHeight_si / tan_beta)) {
            return Math.min(1, Math.max(0, (1.73 + dia * tan_beta - sillHeight_si)/1.73));
        } else if (dia >= (sillHeight_si / tan_beta) && dia < ((sillHeight_si + h_si) / tan_beta)){
            return Math.min(1, Math.max(0, (h_si - dia * tan_beta + sillHeight_si)/1.73));
        } else if (dia >= (sillHeight_si + h_si) / tan_beta) {
            return 0;
        }
    } else {
        return 0;
    }
}



window.SOLAR_COMFORT.invTanDeg = (i) => {
    return Math.atan(i) * 180.0 / Math.PI;
}

window.SOLAR_COMFORT.fsvv_f = (h, w, d) => {
    return Math.min(1, Math.max(0, (window.SOLAR_COMFORT.invTanDeg(h / (2 * d)) * window.SOLAR_COMFORT.invTanDeg(w / (2 * d))) /
    (90 * 180)));
}

let to_m = (value) => {
    if(unitSys === "IP") {
        return units.Ft2M(value);
    }
    return value;
}


window.SOLAR_COMFORT.calculateDeltaMRT = (position_body, h, w, d, beta, solar_azimuth, SHGC, alpha_sw, j, glzCoords, room_depth, room_width, gridHeight,geoResult, sillHeight) => {
    let h_si = to_m(h);
    let w_si = to_m(w);
    let d_si = to_m(d);
    let room_width_si = to_m(room_width);
    let j_si = to_m(j);

    // SHARP 0 is straight on, 90 is side, since we only have a window on 1 side of room, we can only range from 0-90
    // https://cbe-berkeley.gitbook.io/thermal-comfort-tool/documentation/solar-gain#solar-horizontal-angle-relative-to-front-of-person-sharp-degrees
    let SHARP = Math.min(90, Math.max(0, Math.abs(solar_azimuth - 180))); // 
    

    // Calculate sky vault view fraction [0, 1]
    // calculate using a 2d depth value for each window at this grid square
    let fsvv = 0;
    for(let g=0; g<glzCoords.length; g++) {
        let glzCoord = glzCoords[g]
        let center_x = room_width_si/2 + to_m(glzCoord[0][0]) + w_si/2;
        let d_at_grid = Math.max(1, Math.sqrt(Math.pow(center_x - j_si, 2) + Math.pow(0 - d_si, 2))); // Euclidean distance

        fsvv += window.SOLAR_COMFORT.fsvv_f(h_si, w_si, d_at_grid);
        
    }
    if(fsvv === 0) {
        return 0;
    }

    ////////////////////////////////////////////// calculate using 1d depth value, avarage height for human is 1.73m
    
    let f_bes = window.SOLAR_COMFORT.f_bes_f(d, j, beta, solar_azimuth, sillHeight, h, w, room_width);
    //let f_bes = window.SOLAR_COMFORT.f_bes_f(d, beta, sillHeight, h);
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let feff = position_body === window.SOLAR_COMFORT.BODY_POSITION_SIT ? feff_seated : feff_standing;
    let Idir = window.SOLAR_COMFORT.Idir_f(beta);
    if(typeof Idir === 'undefined') {
        return undefined;
    }

    let fp = window.SOLAR_COMFORT.projected_area_factor(SHARP, beta, position_body);
    
    let ERF_solar = window.SOLAR_COMFORT.ERF_solar_f(feff, fsvv, Idir, beta, fp, SHGC, alpha_sw, f_bes);
    //let ERF_solar = window.SOLAR_COMFORT.ERF_solar_f(feff, fsvv, Idir, beta, fp, SHGC, alpha_sw);
    let delta_MRT = window.SOLAR_COMFORT.delta_MRT_f(ERF_solar, feff);

    /*
      function ERF(alt, az, posture, I_dir, t_sol, f_svv, f_bes, asa) {
    //  ERF function to estimate the impact of solar radiation on occupant comfort
    //  INPUTS:
    //  alt : altitude of sun in degrees [0, 90]
    //  az : azimuth of sun in degrees [0, 180]
    //  posture: posture of occupant ('seated', 'standing', or 'supine')
    //  I_dir : direct beam intensity (normal)
    //  t_sol: total solar transmittance (SC * 0.87)
    //  f_svv : sky vault view fraction : fraction of sky vault in occupant's view [0, 1]
    //  f_bes : fraction body exposed to sun [0, 1]
    //  asa : avg shortwave abs : average shortwave absorptivity of body [0, 1]
    */
    let t_sol = SHGC;
    // let erf = ERF(beta, SHARP, position_body, Idir, t_sol, fsvv, feff, alpha_sw);
    let erf = ERF(beta, SHARP, position_body, Idir, t_sol, fsvv, f_bes, alpha_sw);
    console.log(`our dMRT: ${delta_MRT} vs berkeley tool: ${erf.dMRT}`,`different: ${erf.dMRT-delta_MRT}`);
    //console.log(f_bes);
    console.log(d, beta, f_bes);
    //console.log (`Idir: ${Idir}`)
    
    
    //return round1Decimal(delta_MRT);
    //Now use CBE Tool delta MRT result
    return round1Decimal(erf.dMRT);
}


window.SOLAR_COMFORT.calculateDeltaMRT_for_Grid = (room_depth, room_width, position_body, h, w, beta, solar_azimuth, SHGC, alpha_sw, geoResult, gridHeight, sillHeight) => {
    let delta_mrt_grid = [];
    for(let i=0; i<room_depth; i++) {
        delta_mrt_grid[i] = [];
        for(let j=0; j<room_width; j++) {
            let d = i + 1;
            if(isNaN(beta) || beta < 0 || isNaN(solar_azimuth) || h <= 0 || w <= 0) {
                // solar elevation is negative when the sun has dropped below the horizon hence it is night-time
                delta_mrt_grid[i][j] = Number.NaN;
            } else {
                let deltaMRT = window.SOLAR_COMFORT.calculateDeltaMRT(position_body, h, w, d, beta, solar_azimuth, SHGC, alpha_sw, j, geoResult.glzCoords, room_depth, room_width, gridHeight, geoResult, geoResult.sillHeight);
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
    //console.log(geoResult.sillHeight);
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

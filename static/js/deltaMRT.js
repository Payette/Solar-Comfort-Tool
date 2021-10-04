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
window.SOLAR_COMFORT.Idir_f = (solarAltitude) => {
    let solarAltitude_lookup = int(Math.round(solarAltitude / 10.0) * 10);
    solarAltitude_lookup = solarAltitude_lookup === 0 ? 5 : solarAltitude_lookup;
    let Idir = Idir_lookup_table[solarAltitude_lookup];
    if(typeof Idir === 'undefined') {
        console.error('error trying to lookup Idir', solarAltitude);
    }

    return Idir;    
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

window.SOLAR_COMFORT.calculateDeltaMRT = (position_body, h, w, d, beta, solar_azimuth, body_azimuth, SHGC, alpha_sw) => {
    let feff = position_body === window.SOLAR_COMFORT.BODY_POSITION_SIT ? feff_seated : feff_standing;
    let fsvv = window.SOLAR_COMFORT.fsvv_f(h, w, d);
    let Idir = window.SOLAR_COMFORT.Idir_f(beta);
    let fp = window.SOLAR_COMFORT.projected_area_factor(solar_azimuth, beta, position_body, body_azimuth);
    let ERF_solar = ERF_solar_f(feff, fsvv, Idir, beta, fp, SHGC, alpha_sw);
    let delta_MRT = window.SOLAR_COMFORT.delta_MRT_f(ERF_solar, feff);

    console.log(`delta MRT: ${delta_MRT}, ERF_solar: ${ERF_solar}, fp: ${fp}, Idir: ${Idir}, fsvv: ${fsvv}, feff: ${feff}, position_body: ${position_body}, h: ${h}, w: ${w}, d: ${d}, beta: ${beta}, solar_azimuth: ${solar_azimuth}, body_azimuth: ${body_azimuth}, SHGC: ${SHGC}, alpha_sw: ${alpha_sw}`);

    return delta_MRT;
}
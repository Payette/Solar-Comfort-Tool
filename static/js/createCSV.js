// GATHER GLOBAL INPUTS
function gatherGlobalInputs() {
    var selectedStudyType;
    if($('#dsAnnual').is(':checked')) {
        selectedStudyType = $('#dsAnnual');
    } else {
        selectedStudyType = $("input[name=studyType]:checked")
    }
    return {
        studyType: {label: "Study Type", value: selectedStudyType.val()},
        valFal: {label: "Floor Area Loss", value: $("input#fal").val() + "%"},
        valMDST: {label: "Max Direct Sun Time", value: $("input#mdst").val() + " hr"}
    }
}

// GATHER CASE 1 INPUTS
function gatherCase1Inputs() {
    return {
        month: {label: "Month", value: $("input#mon").val()},
        day: {label: "Day", value: $("input#day").val()},
        hour: {label: "Hour", value: $("input#hour").val()},
        timeStep: {label: "Time Step per Hour", value: $("input#timeStep").val()},
        long: {label: "Longitude", value: $("input#long").val()},
        lat: {label: "Latitude", value: $("input#lat").val()},
        timeZone: {label: "Time Zone Offset", value: $("input#timeZone").val()},
        outdoorTemp: {label: "Outdoor Temperature (°F)", value: $("input#outdoorTemp").val()},
        airTemp: {label: "Indoor Temperature (°F)", value: $("input#airTemp").val()},
        humidity: {label: "Relative Humidity (%)", value: $("input#humidity").val()},
        airSpeed: {label: "Air Speed (fpm)", value: $("input#airSpeed").val()},
        cloting: {label: "Clothing Level (clo)", value: $("input#clothing").val()},
        metabolic: {label: "Metabolic Rate (met)", value: $("input#metabolic").val()},
        posture: {label: "Occupant Posture", value: $("select#posture").val()},
        aveShortwave: {label: "Average Shortwave Absorptivity", value: $("input#asa").val()},
        windowOrientation: {label: "Window Orientation", value: $("input#north").val()},
        ceiling: {label: "Ceiling Height (ft)", value: $("input#ceiling").val()},
        gridHeight: {label: "Grid Height (ft)", value: $("input#gridHt").val()},
        wallDep: {label: "Room Length (ft)", value: $("input#wallDep").val()},
        wallLen: {label: "Room Depth (ft)", value: $("input#wallWidth").val()},
        wallR: {label: "Wall R-Value (ft²hr°F/Btu)", value: $("input#wallR").val()},
        windowHeight: {label: "Window Height from Sill (ft)", value: $("input#windowHeight").val()},
        sill: {label: "Sill Height (ft)", value: $("input#sill").val()},
        windowWidth: {label: "Window Width (ft)", value: $("input#windowWidth").val()},
        glzRatio: {label: "Window-to-Wall Ratio (%)", value: $("input#glazing").val()},
        distanceWindows: {label: "Window Seperation (ft)", value: $("input#distWindow").val()},
        windowU: {label: "Window U-Value (Btu/ft²hr°F)", value: $("input#windowU").val()},
        solarHeatGainCo: {label: "Solar Heat Gain Coefficient (shgc)", value: $("input#shgc").val()},
        horzShadeDep: {label: "Horizontal Shade Depth (ft)", value: $("input#hShadeDep").val()},
        horzShadeNum: {label: "Number of Shades (Horizontal)", value: $("input#hShadeNum").val()},
        horzShadeSpace: {label: "Spacing (Horizontal) (ft)", value: $("input#hShadeSpace").val()},
        horzShadeDist: {label: "Distance from Facade (Horizontal) (ft)", value: $("input#hShadeDist").val()},
        horzShadeHeight: {label: "Height Above Window (ft)", value: $("input#hShadeHeight").val()},
        horzShadeAngle: {label: "Angle", value: $("input#hShadeAngle").val()},
        vertShadeDep: {label: "Vertical Shade Depth (ft)", value: $("input#vShadeDep").val()},
        vertShadeNum: {label: "Number of Shades (Vertical)", value: $("input#vShadeNum").val()},
        vertShadeSpace: {label: "Spacing (Vertical) (ft)", value: $("input#vShadeSpace").val()},
        vertShadeStart: {label: "Left/Right", value: $("input#vShadeStart").val()},
        vertShadeShift: {label: "Left/Right Shift", value: $("input#vShadeShift").val()},
        vertShadeDist: {label: "Distance from Facade (Vertical) (ft)", value: $("input#vShadeDist").val()},
        vertShadeOn: {label: "Full Height Louvers", value: $("input#vShadeOn").prop("checked")},
        vertShadeHeight: {label: "Height Above Window (ft)", value: $("input#vShadeHeight").val()},
        vertShadeScale: {label: "Height Relative to Window (ft)", value: $("input#vShadeScale").val()}
    }
}

// GATHER CASE 2 INPUTS
function gatherCase2Inputs() {
    return {
        month: {label: "Month", value: $("input#mon").val()},
        day: {label: "Day", value: $("input#day").val()},
        hour: {label: "Hour", value: $("input#hour").val()},
        timeStep: {label: "Time Step per Hour", value: $("input#timeStep").val()},
        long: {label: "Longitude", value: $("input#long").val()},
        lat: {label: "Latitude", value: $("input#lat").val()},
        timeZone: {label: "Time Zone Offset", value: $("input#timeZone").val()},
        outdoorTemp: {label: "Outdoor Temperature (°F)", value: $("input#outdoorTemp").val()},
        airTemp: {label: "Indoor Temperature (°F)", value: $("input#airTemp1").val()},
        humidity: {label: "Relative Humidity (%)", value: $("input#humidity1").val()},
        airSpeed: {label: "Air Speed (fpm)", value: $("input#airSpeed1").val()},
        cloting: {label: "Clothing Level (clo)", value: $("input#clothing1").val()},
        metabolic: {label: "Metabolic Rate (met)", value: $("input#metabolic1").val()},
        posture: {label: "Occupant Posture", value: $("select#posture1").val()},
        aveShortwave: {label: "Average Shortwave Absorptivity", value: $("input#asa1").val()},
        windowOrientation: {label: "Window Orientation", value: $("input#north1").val()},
        ceiling: {label: "Ceiling Height (ft)", value: $("input#ceiling1").val()},
        gridHeight: {label: "Grid Height (ft)", value: $("input#gridHt1").val()},
        wallDep: {label: "Room Length (ft)", value: $("input#wallDep1").val()},
        wallLen: {label: "Room Depth (ft)", value: $("input#wallWidth1").val()},
        wallR: {label: "Wall R-Value (ft²hr°F/Btu)", value: $("input#wallR1").val()},
        windowHeight: {label: "Window Height from Sill (ft)", value: $("input#windowHeight1").val()},
        sill: {label: "Sill Height (ft)", value: $("input#sill1").val()},
        windowWidth: {label: "Window Width (ft)", value: $("input#windowWidth1").val()},
        glzRatio: {label: "Window-to-Wall Ratio (%)", value: $("input#glazing1").val()},
        distanceWindows: {label: "Window Seperation (ft)", value: $("input#distWindow1").val()},
        windowU: {label: "Window U-Value (Btu/ft²hr°F)", value: $("input#windowU1").val()},
        solarHeatGainCo: {label: "Solar Heat Gain Coefficient (shgc)", value: $("input#shgc1").val()},
        horzShadeDep: {label: "Horizontal Shade Depth (ft)", value: $("input#hShadeDep1").val()},
        horzShadeNum: {label: "Number of Shades (Horizontal)", value: $("input#hShadeNum1").val()},
        horzShadeSpace: {label: "Spacing (Horizontal) (ft)", value: $("input#hShadeSpace1").val()},
        horzShadeDist: {label: "Distance from Facade (Horizontal) (ft)", value: $("input#hShadeDist1").val()},
        horzShadeHeight: {label: "Height Above Window (ft)", value: $("input#hShadeHeight1").val()},
        horzShadeAngle: {label: "Angle", value: $("input#hShadeAngle1").val()},
        vertShadeDep: {label: "Vertical Shade Depth (ft)", value: $("input#vShadeDep1").val()},
        vertShadeNum: {label: "Number of Shades (Vertical)", value: $("input#vShadeNum1").val()},
        vertShadeSpace: {label: "Spacing (Vertical) (ft)", value: $("input#vShadeSpace1").val()},
        vertShadeStart: {label: "Left/Right", value: $("input#vShadeStart1").val()},
        vertShadeShift: {label: "Left/Right Shift", value: $("input#vShadeShift1").val()},
        vertShadeDist: {label: "Distance from Facade (Vertical) (ft)", value: $("input#vShadeDist1").val()},
        vertShadeOn: {label: "Full Height Louvers", value: $("input#vShadeOn1").prop("checked")},
        vertShadeHeight: {label: "Height Above Window (ft)", value: $("input#vShadeHeight1").val()},
        vertShadeScale: {label: "Height Relative to Window (ft)", value: $("input#vShadeScale1").val()}
    }
}

function hoursOfSunFloorGridToCSV(globalGridColor, asciiArt = false) {
    let str = "";

    if(globalGridColor.length <= 0) {
        console.error('error: globalGridColor should be a 2d array');
        return "";
    }

    // header
    let length = globalGridColor[0].length;
    str += "depth, ";
    let lengthValues = [];
    for(let i=length; i>=1; i--) {
        lengthValues.push(i);
    }
    str += lengthValues.join(",") + "\n";

    for(let i=0; i<globalGridColor.length; i++) {
        let value = asciiArt ? globalGridColor[i].map(number0to12toAscii) : globalGridColor[i];
        str += (i+1) + "," + value.join(',') + "\n";
    }

    return str;
}

function gridValueToCSV(globalGridColor, key, asciiArt = false, min = 0, max = 1) {
    let str = "";
    let scale = d3.scale.linear().clamp(true).domain([min, max]).range([0, 12]);

    if(globalGridColor.length <= 0) {
        console.error('error: globalGridColor should be a 2d array');
        return "";
    }

    // header
    let length = globalGridColor[0].length;
    str += "depth, ";
    let lengthValues = [];
    for(let i=length; i>=1; i--) {
        lengthValues.push(i);
    }
    str += lengthValues.join(",") + "\n";

    var map0to12 = v => {
        if(isNaN(v)) {
            return v;
        }
        return scale(v);
    }

    for(let i=0; i<globalGridColor.length; i++) {
        let value = asciiArt ? globalGridColor[i].map(v => map0to12(v[key])).map(number0to12toAscii) : globalGridColor[i].map(v => v[key]);
        str += (i+1) + "," + value.join(',') + "\n";
    }

    return str;
}

// CREATE CSV CONTENT
function createCSV(hideMRTCalculations = false) {
    // console.log(window.SOLAR_COMFORT[`deltaMRTGrid`]);

    var csvContent = "Global Inputs\n";
    Object.values(gatherGlobalInputs()).forEach(function(obj) {
        csvContent += obj.label + ',' + obj.value + '\n';
    });
    if(!hideMRTCalculations && window.SOLAR_COMFORT.MRTGrid && window.SOLAR_COMFORT.MRTGrid.length > 0) {
        csvContent += `Solar Azimuth (degrees), ${window.SOLAR_COMFORT.solarAzimuthDegrees}\n`;
        csvContent += `Solar Elevation (degrees), ${window.SOLAR_COMFORT.solarElevationDegrees}\n`;
    }

    csvContent += "\nCase 1 Inputs\n";
    Object.values(gatherCase1Inputs()).forEach(function(obj) {
        csvContent += obj.label + ',' + obj.value + '\n';
    });
    if(!hideMRTCalculations && window.SOLAR_COMFORT.MRTGrid && window.SOLAR_COMFORT.MRTGrid.length > 0) {
        csvContent += `Solar Azimuth + Window Direction (degrees), ${window.SOLAR_COMFORT.solarAzimuthDegreesRoomRotationAdjusted}\n`;
    }

    csvContent += "\nCase 1 Result\n";
    csvContent += window.SOLAR_COMFORT.MDTResult;
    if(!hideMRTCalculations && window.SOLAR_COMFORT.MRTGrid && window.SOLAR_COMFORT.MRTGrid.length > 0) {
        csvContent += `Solar Cooling Load (Btu/hr), ${window.SOLAR_COMFORT.windowSolarCoolingLoad}\n`;
        csvContent += `Window Area Total (sf), ${window.SOLAR_COMFORT.totalWindowArea}\n`;
        csvContent += `Window Area With Direct Sun Total (sf), ${window.SOLAR_COMFORT.windowAreaDirectSun}\n`;
        csvContent += `Direct Normal Irradiance (Idir), ${window.SOLAR_COMFORT.iDir}\n`;
    }

    csvContent += "\nCase 1 Hours of Sun Floor Grid (length x depth)\n";
    let globalGridColor = window.SOLAR_COMFORT.globalGridColor;
    if(globalGridColor && globalGridColor.length > 0) {
        csvContent += hoursOfSunFloorGridToCSV(globalGridColor);
    }

    csvContent += "\nCase 1 Hours of Sun Floor Grid ASCI-art (length x depth)\n";
    let globalGridColorA = window.SOLAR_COMFORT.globalGridColor;
    if(globalGridColorA && globalGridColorA.length > 0) {
        csvContent += hoursOfSunFloorGridToCSV(globalGridColorA, true);
    }

    if(!hideMRTCalculations && window.SOLAR_COMFORT.MRTGrid && window.SOLAR_COMFORT.MRTGrid.length > 0) {
        let MRTGrid = window.SOLAR_COMFORT.MRTGrid;

        csvContent += "\nCase 1 MRT Grid (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid, 'mrt');

        csvContent += "\nCase 1 MRT Grid ASCI-art (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid, 'mrt', true, 50, 100);

        csvContent += "\nCase 1 Delta-MRT Grid (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid, 'deltaMRT');

        csvContent += "\nCase 1 Delta-MRT Grid ASCI-art (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid, 'deltaMRT', true, -100, 100);

        csvContent += "\nCase 1 Solar Adjusted MRT Grid (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid, 'solarAdjustedMRT');

        csvContent += "\nCase 1 Solar Adjusted MRT Grid ASCI-art (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid, 'solarAdjustedMRT', true, 50, 100);
        
        csvContent += "\nCase 1 PMV Grid (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid, 'pmv');

        csvContent += "\nCase 1 PMV Grid ASCI-art (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid, 'pmv', true, -1, 1);
        
        csvContent += "\nCase 1 PPD Grid (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid, 'mrtppd');

        csvContent += "\nCase 1 PPD Grid ASCI-art (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid, 'mrtppd', true, 0, 100);
    }


    csvContent += "\nCase 2 Inputs\n";
    // Check if Case 2 is activated
    if(window.SOLAR_COMFORT.Case2Button == 0) {
        Object.values(gatherCase2Inputs()).forEach(function(obj) {
            csvContent += obj.label + '\n';
        });
    } else {
        Object.values(gatherCase2Inputs()).forEach(function(obj) {
            csvContent += obj.label + ',' + obj.value + '\n';
        });
    }
    if(!hideMRTCalculations && window.SOLAR_COMFORT.MRTGrid && window.SOLAR_COMFORT.MRTGrid.length > 0) {
        csvContent += `Solar Azimuth + Window Direction (degrees), ${window.SOLAR_COMFORT.solarAzimuthDegreesRoomRotationAdjusted1}\n`;
    }

    csvContent += "\nCase 2 Result\n";
    csvContent += window.SOLAR_COMFORT.MDTResult1;
    if(!hideMRTCalculations && window.SOLAR_COMFORT.MRTGrid && window.SOLAR_COMFORT.MRTGrid.length > 0) {
        csvContent += `Solar Cooling Load (Btu/hr), ${window.SOLAR_COMFORT.windowSolarCoolingLoad1}\n`;
        csvContent += `Window Area Total (sf), ${window.SOLAR_COMFORT.totalWindowArea1}\n`;
        csvContent += `Window Area With Direct Sun Total (sf), ${window.SOLAR_COMFORT.windowAreaDirectSun1}\n`;
        csvContent += `Direct Normal Irradiance (Idir), ${window.SOLAR_COMFORT.iDir1}\n`;
    }

    csvContent += "\nCase 2 Hours of Sun Floor Grid (length x depth)\n";
    let globalGridColor1 = window.SOLAR_COMFORT.globalGridColor1;
    if(globalGridColor1 && globalGridColor1.length > 0) {
        csvContent += hoursOfSunFloorGridToCSV(globalGridColor1);
    }

    csvContent += "\nCase 2 Hours of Sun Floor Grid ASCII-art (length x depth)\n";
    let globalGridColorA1 = window.SOLAR_COMFORT.globalGridColor1;
    if(globalGridColorA1 && globalGridColorA1.length > 0) {
        csvContent += hoursOfSunFloorGridToCSV(globalGridColorA1, true);
    }

    if(!hideMRTCalculations && window.SOLAR_COMFORT.MRTGrid1 && window.SOLAR_COMFORT.MRTGrid1.length > 0) {
        let MRTGrid1 = window.SOLAR_COMFORT.MRTGrid1;

        csvContent += "\nCase 2 MRT Grid (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid1, 'mrt');

        csvContent += "\nCase 2 MRT Grid ASCI-art (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid1, 'mrt', true, 50, 100);

        csvContent += "\nCase 2 Delta-MRT Grid (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid1, 'deltaMRT');

        csvContent += "\nCase 2 Delta-MRT Grid ASCI-art (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid1, 'deltaMRT', true, -100, 100);

        csvContent += "\nCase 2 Solar Adjusted MRT Grid (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid1, 'solarAdjustedMRT');

        csvContent += "\nCase 2 Solar Adjusted MRT Grid ASCI-art (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid1, 'solarAdjustedMRT', true, 50, 100);
        
        csvContent += "\nCase 2 PMV Grid (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid1, 'pmv');

        csvContent += "\nCase 2 PMV Grid ASCI-art (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid1, 'pmv', true, -1, 1);
        
        csvContent += "\nCase 2 PPD Grid (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid1, 'mrtppd');

        csvContent += "\nCase 2 PPD Grid ASCI-art (length x depth)\n";
        csvContent += gridValueToCSV(MRTGrid1, 'mrtppd', true, 0, 100);
    }

    return csvContent;
}

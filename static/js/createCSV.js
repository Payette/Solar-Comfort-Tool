// GATHER GLOBAL INPUTS
function gatherGlobalInputs() {
    return {
        studyType: {label: "Study Type", value: $("input[name=studyType]:checked").val()},
        valFal: {label: "Floor Area Loss", value: $("input#fal").val()},
        valMDST: {label: "Max Direct Sun Time", value: $("input#mdst").val()}
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
        fractionBody: {label: "Fraction of Body Exposed to Sun", value: $("input#fbes").val()},
        roomOrientation: {label: "Room Orientation", value: $("input#north").val()},
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
        aveShortwave: {label: "Average Shortwave Absorptivity", value: $("input#asa").val()},
        emissivity: {label: "Emissivity", value: $("input#emissivity").val()},
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
        vertShadeHeight: {label: "Height Above Window (ft)", value: $("input#vShadeHeight").val()},
        vertShadeScale: {label: "Height Relative to Window (ft)", value: $("input#vShadeScale").val()}
    }
}

// GATHER CASE 2 INPUTS
function gatherCase2Inputs() {
    return {
        month: {label: "Month", value: $("input#mon1").val()},
        day: {label: "Day", value: $("input#day1").val()},
        hour: {label: "Hour", value: $("input#hour1").val()},
        timeStep: {label: "Time Step per Hour", value: $("input#timeStep").val()},
        long: {label: "Longitude", value: $("input#long1").val()},
        lat: {label: "Latitude", value: $("input#lat1").val()},
        timeZone: {label: "Time Zone Offset", value: $("input#timeZone1").val()},
        outdoorTemp: {label: "Outdoor Temperature (°F)", value: $("input#outdoorTemp1").val()},
        airTemp: {label: "Indoor Temperature (°F)", value: $("input#airTemp1").val()},
        humidity: {label: "Relative Humidity (%)", value: $("input#humidity1").val()},
        airSpeed: {label: "Air Speed (fpm)", value: $("input#airSpeed1").val()},
        cloting: {label: "Clothing Level (clo)", value: $("input#clothing1").val()},
        metabolic: {label: "Metabolic Rate (met)", value: $("input#metabolic1").val()},
        fractionBody: {label: "Fraction of Body Exposed to Sun", value: $("input#fbes1").val()},
        roomOrientation: {label: "Room Orientation", value: $("input#north1").val()},
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
        aveShortwave: {label: "Average Shortwave Absorptivity", value: $("input#asa1").val()},
        emissivity: {label: "Emissivity", value: $("input#emissivity1").val()},
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
        vertShadeHeight: {label: "Height Above Window (ft)", value: $("input#vShadeHeight1").val()},
        vertShadeScale: {label: "Height Relative to Window (ft)", value: $("input#vShadeScale1").val()}
    }
}

// CREATE CSV CONTENT
function createCSV() {
    var csvContent = "Global Inputs, \n";
    Object.values(gatherGlobalInputs()).forEach(function(obj) {
        csvContent += obj.label + ',' + obj.value + '\n';
    });

    csvContent += "\nCase 1 Result, \n";
    csvContent += MDTResult;

    csvContent += "\nCase 1 Inputs, \n";
    Object.values(gatherCase1Inputs()).forEach(function(obj) {
        if (obj.label == "Emissivity" && !$("input#lowE").is(":checked")) {
            csvContent += obj.label + ',' + '0.9' + '\n';
        } else {
            csvContent += obj.label + ',' + obj.value + '\n';
        }
    });

    csvContent += "\nCase 2 Inputs, \n";
    // Check if Case 2 is activated
    if(Case2Button == 0) {
        Object.values(gatherCase2Inputs()).forEach(function(obj) {
            csvContent += obj.label + ', \n';
        });
    } else {
        Object.values(gatherCase2Inputs()).forEach(function(obj) {
            if (obj.label == "Emissivity" && !$("input#lowE1").is(":checked")) {
                csvContent += obj.label + ',' + '0.9' + '\n';
            } else {
                csvContent += obj.label + ',' + obj.value + '\n';
            }
        });
    }
    return csvContent;
}

function createURL(fullURL) {

	// create a dictionary of defaults.
	var defaultSettings = {

		//studyType: "Thermal Comfort - Single Hour",
	}

	var defaultDict = {
        month: "7",
        day: "21",
        hour:"12",
        timeStep:"4",
        long:"-71",
        lat: "42",
        timeZone: "-5",
        outdoorTemp: "90.9",
        airTemp:"76",
        humidity: "60",
        airSpeed: "10",
        cloting:"0.5",
        metabolic: "1.2",
        posture:"seated",
        aveShortwave: "0.7",
        windowOrientation: "180",
        ceiling: "12",
        gridHeight: "3",
        wallDep: "40",
        wallLen:"30",
        wallR: "15",
        windowHeight: "7",
        sill: "2",
        windowWidth: "14",
        glzRatio: "39",
        distanceWindows: "12",
        windowU: "0.35",
        solarHeatGainCo: "0.35",
        horzShadeDep: "1",
        horzShadeNum: "0",
        horzShadeSpace: "3",
        horzShadeDist: "0",
        horzShadeHeight: "0",
        horzShadeAngle: "90",
        vertShadeDep: "3",
        vertShadeNum: "0",
        vertShadeSpace: "3",
        vertShadeStart: "L",
        vertShadeShift: "0",
        vertShadeDist: "0",
        vertShadeOn: "TRUE",
        vertShadeHeight: "3",
        vertShadeScale: "5",
	}

	var defaultDictSI = {
        month: "7",
        day: "21",
        hour:"12",
        timeStep:"4",
        long:"-71",
        lat: "42",
        timeZone: "-5",
        outdoorTemp: "90.9",
        airTemp:"76",
        humidity: "60",
        airSpeed: "10",
        cloting:"0.5",
        metabolic: "1.2",
        posture:"seated",
        aveShortwave: "0.7",
        windowOrientation: "180",
        ceiling: "12",
        gridHeight: "3",
        wallDep: "40",
        wallLen:"30",
        wallR: "15",
        windowHeight: "7",
        sill: "2",
        windowWidth: "14",
        glzRatio: "39",
        distanceWindows: "12",
        windowU: "0.35",
        solarHeatGainCo: "0.35",
        horzShadeDep: "1",
        horzShadeNum: "0",
        horzShadeSpace: "3",
        horzShadeDist: "0",
        horzShadeHeight: "0",
        horzShadeAngle: "90",
        vertShadeDep: "3",
        vertShadeNum: "0",
        vertShadeSpace: "3",
        vertShadeStart: "L",
        vertShadeShift: "0",
        vertShadeDist: "0",
        vertShadeOn: "TRUE",
        vertShadeHeight: "3",
        vertShadeScale: "5",
	}

	// case visibility
	var case1Vis = "show";
	var case2Vis, case3Vis;
	if ($("#caseSelection #case2Label").hasClass("unselected") == false) {
		case2Vis = "show";
	} else {
		case2Vis = "hide";
	}

	if ($("#caseSelection #case3Label").hasClass("unselected") == false) {
		case3Vis = "show";
	} else {
		case3Vis = "hide";
	}

	// // units
	// if ($(".optionButton#IP").hasClass("selected") == true) {
	// 	var units = "IP";
	// } else {
	// 	var units = "SI";
	// }

	// // values regardless of case
	// var thisDistFromFacade = round(occDistFromFacade*10)/10;
	// var thisPpd = $("#ppd").val();
	// var thisPpd2 = $("#ppd2").val();

	// // Graph View type
	// if ($("#splitToggle").hasClass("marked") == true) {
	// 	var thisGraphType = "split";
	// } else {
	// 	var thisGraphType = "combined";
	// }


	// check to be sure that this is not already a long URL.
	locationURL = "https://payette.github.io/Solar-Comfort-Tool/"

	// Start the URL and create dictioaries of all values.
	var paramURL = locationURL + "?case1=show" + "&case2=" + case2Vis + "&case3=hide"

	var valDictionary = {
		//studyType:selectedStudyType.val(),
	}

	// values for only case 1
	var case1Dict = {
        month:$("input#mon").val(),
        day: $("input#day").val(),
        hour: $("input#hour").val(),
        timeStep: $("input#timeStep").val(),
        long: $("input#long").val(),
        lat: $("input#lat").val(),
        timeZone: $("input#timeZone").val(),
        outdoorTemp: $("input#outdoorTemp").val(),
        airTemp: $("input#airTemp").val(),
        humidity: $("input#humidity").val(),
        airSpeed: $("input#airSpeed").val(),
        cloting: $("input#clothing").val(),
        metabolic: $("input#metabolic").val(),
        posture: $("select#posture").val(),
        aveShortwave: $("input#asa").val(),
        windowOrientation: $("input#north").val(),
        ceiling: $("input#ceiling").val(),
        gridHeight: $("input#gridHt").val(),
        wallDep: $("input#wallDep").val(),
        wallLen: $("input#wallWidth").val(),
        wallR: $("input#wallR").val(),
        windowHeight: $("input#windowHeight").val(),
        sill: $("input#sill").val(),
        windowWidth: $("input#windowWidth").val(),
        glzRatio: $("input#glazing").val(),
        distanceWindows: $("input#distWindow").val(),
        windowU: $("input#windowU").val(),
        solarHeatGainCo: $("input#shgc").val(),
        horzShadeDep: $("input#hShadeDep").val(),
        horzShadeNum: $("input#hShadeNum").val(),
        horzShadeSpace: $("input#hShadeSpace").val(),
        horzShadeDist: $("input#hShadeDist").val(),
        horzShadeHeight: $("input#hShadeHeight").val(),
        horzShadeAngle: $("input#hShadeAngle").val(),
        vertShadeDep: $("input#vShadeDep").val(),
        vertShadeNum: $("input#vShadeNum").val(),
        vertShadeSpace:$("input#vShadeSpace").val(),
        vertShadeStart: $("select#vShadeStart").val(),
        vertShadeShift: $("input#vShadeShift").val(),
        vertShadeDist: $("input#vShadeDist").val(),
        vertShadeOn: $("input#vShadeOn").prop("checked"),
        vertShadeHeight: $("input#vShadeHeight").val(),
        vertShadeScale: $("input#vShadeScale").val()
	}

	// values for only case 2
	var case2Dict = {
        month:$("input#mon").val(),
        day: $("input#day").val(),
        hour: $("input#hour").val(),
        timeStep: $("input#timeStep").val(),
        long: $("input#long").val(),
        lat: $("input#lat").val(),
        timeZone: $("input#timeZone").val(),
        outdoorTemp: $("input#outdoorTemp").val(),
        airTemp: $("input#airTemp").val(),
        humidity: $("input#humidity").val(),
        airSpeed: $("input#airSpeed").val(),
        cloting: $("input#clothing").val(),
        metabolic: $("input#metabolic").val(),
        posture: $("select#posture").val(),
        aveShortwave: $("input#asa").val(),
        windowOrientation: $("input#north").val(),
        ceiling: $("input#ceiling").val(),
        gridHeight: $("input#gridHt").val(),
        wallDep: $("input#wallDep").val(),
        wallLen: $("input#wallWidth").val(),
        wallR: $("input#wallR").val(),
        windowHeight: $("input#windowHeight").val(),
        sill: $("input#sill").val(),
        windowWidth: $("input#windowWidth").val(),
        glzRatio: $("input#glazing").val(),
        distanceWindows: $("input#distWindow").val(),
        windowU: $("input#windowU").val(),
        solarHeatGainCo: $("input#shgc").val(),
        horzShadeDep: $("input#hShadeDep").val(),
        horzShadeNum: $("input#hShadeNum").val(),
        horzShadeSpace: $("input#hShadeSpace").val(),
        horzShadeDist: $("input#hShadeDist").val(),
        horzShadeHeight: $("input#hShadeHeight").val(),
        horzShadeAngle: $("input#hShadeAngle").val(),
        vertShadeDep: $("input#vShadeDep").val(),
        vertShadeNum: $("input#vShadeNum").val(),
        vertShadeSpace:$("input#vShadeSpace").val(),
        vertShadeStart: $("select#vShadeStart").val(),
        vertShadeShift: $("input#vShadeShift").val(),
        vertShadeDist: $("input#vShadeDist").val(),
        vertShadeOn: $("input#vShadeOn").prop("checked"),
        vertShadeHeight: $("input#vShadeHeight").val(),
        vertShadeScale: $("input#vShadeScale").val()
	}

	// values for only case 3
	// month:$("input#mon").val(),
	// day: $("input#day").val(),
	// hour: $("input#hour").val(),
	// timeStep: $("input#timeStep").val(),
	// long: $("input#long").val(),
	// lat: $("input#lat").val(),
	// timeZone: $("input#timeZone").val(),
	// outdoorTemp: $("input#outdoorTemp").val(),
	// airTemp: $("input#airTemp").val(),
	// humidity: $("input#humidity").val(),
	// airSpeed: $("input#airSpeed").val(),
	// cloting: $("input#clothing").val(),
	// metabolic: $("input#metabolic").val(),
	// posture: $("select#posture").val(),
	// aveShortwave: $("input#asa").val(),
	// windowOrientation: $("input#north").val(),
	// ceiling: $("input#ceiling").val(),
	// gridHeight: $("input#gridHt").val(),
	// wallDep: $("input#wallDep").val(),
	// wallLen: $("input#wallWidth").val(),
	// wallR: $("input#wallR").val(),
	// windowHeight: $("input#windowHeight").val(),
	// sill: $("input#sill").val(),
	// windowWidth: $("input#windowWidth").val(),
	// glzRatio: $("input#glazing").val(),
	// distanceWindows: $("input#distWindow").val(),
	// windowU: $("input#windowU").val(),
	// solarHeatGainCo: $("input#shgc").val(),
	// horzShadeDep: $("input#hShadeDep").val(),
	// horzShadeNum: $("input#hShadeNum").val(),
	// horzShadeSpace: $("input#hShadeSpace").val(),
	// horzShadeDist: $("input#hShadeDist").val(),
	// horzShadeHeight: $("input#hShadeHeight").val(),
	// horzShadeAngle: $("input#hShadeAngle").val(),
	// vertShadeDep: $("input#vShadeDep").val(),
	// vertShadeNum: $("input#vShadeNum").val(),
	// vertShadeSpace:$("input#vShadeSpace").val(),
	// vertShadeStart: $("select#vShadeStart").val(),
	// vertShadeShift: $("input#vShadeShift").val(),
	// vertShadeDist: $("input#vShadeDist").val(),
	// vertShadeOn: $("input#vShadeOn").prop("checked"),
	// vertShadeHeight: $("input#vShadeHeight").val(),
	// vertShadeScale: $("input#vShadeScale").val()
	// }


	// build the URL
	if (fullURL == true) {
		// for (var key in valDictionary) {
		// 	paramURL = paramURL + "&" + key + "=" + valDictionary[key]
		// }
		for (var key in case1Dict) {
			paramURL = paramURL + "&" + key + "=" + case1Dict[key]
		}
		for (var key in case2Dict) {
			paramURL = paramURL + "&" + key + "=" + case2Dict[key]
		}
		// for (var key in case3Dict) {
		// 	paramURL = paramURL + "&" + key + "=" + case3Dict[key]
		// }
        }
	// } else {
	// 	for (var key in valDictionary) {
	// 		if (units == "SI" && key == "distFromFacade") {
	// 			if (round(occDistFromFacade*100)/100 != 0.91) {
	// 				paramURL = paramURL + "&" + key + "=" + valDictionary[key]
	// 			}
	// 		} else {
	// 			if (valDictionary[key] != defaultSettings[key]) {
	// 				paramURL = paramURL + "&" + key + "=" + valDictionary[key]
	// 			}
	// 		}
	// 	}

	// 	// Alwatys write the units.
	// 	paramURL = paramURL + "&units=" + valDictionary["units"]

	// 	// Write in values for the cases that do not meet the defaults.
	// 	if (units == "IP") {
	// 		for (var key in case1Dict) {
	// 			if (case1Dict[key] != defaultDict[key]) {
	// 				paramURL = paramURL + "&" + key + "=" + case1Dict[key]
	// 			}
	// 		}

	// 		for (var key in case2Dict) {
	// 			if (case2Dict[key] != defaultDict[key]) {
	// 				paramURL = paramURL + "&" + key + "2=" + case2Dict[key]
	// 			}
	// 		}

	// 		// for (var key in case3Dict) {
	// 		// 	if (case3Dict[key] != defaultDict[key]) {
	// 		// 		paramURL = paramURL + "&" + key + "3=" + case3Dict[key]
	// 		// 	}
	// 		// }
	// 	} else {
	// 		for (var key in case1Dict) {
	// 			if (case1Dict[key] != defaultDictSI[key]) {
	// 				paramURL = paramURL + "&" + key + "=" + case1Dict[key]
	// 			}
	// 		}

	// 		for (var key in case2Dict) {
	// 			if (case2Dict[key] != defaultDictSI[key]) {
	// 				paramURL = paramURL + "&" + key + "2=" + case2Dict[key]
	// 			}
	// 		}

	// 		// for (var key in case3Dict) {
	// 		// 	if (case3Dict[key] != defaultDictSI[key]) {
	// 		// 		paramURL = paramURL + "&" + key + "3=" + case3Dict[key]
	// 		// 	}
	// 		// }
	// 	}
	// }



	return paramURL;

}

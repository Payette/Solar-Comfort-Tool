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
	if ($("#caseSelection #maincasetwobutton").hasClass("button1OFF") == false) {
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
        //vertShadeOn: $("input#vShadeOn").prop("checked"),
        vertShadeOn: $("input#vShadeOn").val(),
        vertShadeHeight: $("input#vShadeHeight").val(),
        vertShadeScale: $("input#vShadeScale").val()
	}

        // var month = $("input#mon").val();
        // var day = $("input#day").val();
        // var hour= $("input#hour").val();
        // var timeStep= $("input#timeStep").val();
        // var long= $("input#long").val();
        // var lat= $("input#lat").val();
        // var timeZone= $("input#timeZone").val();
        // var outdoorTemp= $("input#outdoorTemp").val();

        // var airTemp= $("input#airTemp").val(),
        // var humidity= $("input#humidity").val(),
        // var airSpeed= $("input#airSpeed").val(),
        // var cloting= $("input#clothing").val(),
        // var metabolic= $("input#metabolic").val(),
        // var posture= $("select#posture").val(),
        // var aveShortwave= $("input#asa").val(),
        // var windowOrientation= $("input#north").val(),
        // var ceiling= $("input#ceiling").val(),
        // var gridHeight= $("input#gridHt").val(),
        // var wallDep= $("input#wallDep").val(),
        // var wallLen= $("input#wallWidth").val(),
        // var wallR= $("input#wallR").val(),
        // var windowHeight= $("input#windowHeight").val(),
        // var sill= $("input#sill").val(),
        // var windowWidth= $("input#windowWidth").val(),
        // var glzRatio= $("input#glazing").val(),
        // var distanceWindows= $("input#distWindow").val(),
        // var windowU= $("input#windowU").val(),
        // var solarHeatGainCo= $("input#shgc").val(),
        // var horzShadeDep= $("input#hShadeDep").val(),
        // var horzShadeNum= $("input#hShadeNum").val(),
        // var horzShadeSpace= $("input#hShadeSpace").val(),
        // var horzShadeDist= $("input#hShadeDist").val(),
        // var horzShadeHeight= $("input#hShadeHeight").val(),
        // var horzShadeAngle=$("input#hShadeAngle").val(),
        // var vertShadeDep=$("input#vShadeDep").val(),
        // var vertShadeNum= $("input#vShadeNum").val(),
        // var vertShadeSpace=$("input#vShadeSpace").val(),
        // var vertShadeStart= $("select#vShadeStart").val(),
        // var vertShadeShift= $("input#vShadeShift").val(),
        // var vertShadeDist= $("input#vShadeDist").val(),
        // var vertShadeOn= $("input#vShadeOn").val(),
        // var vertShadeHeight= $("input#vShadeHeight").val(),
        // var vertShadeScale= $("input#vShadeScale").val()

        // var airTemp2= $("input#airTemp1").val(),
        // var humidity2= $("input#humidity1").val(),
        // var airSpeed2= $("input#airSpeed1").val(),
        // var cloting2= $("input#clothing1").val(),
        // var metabolic2= $("input#metabolic1").val(),
        // var posture2= $("select#posture1").val(),
        // var aveShortwave2= $("input#asa1").val(),
        // var windowOrientation2= $("input#north1").val(),
        // var ceiling2= $("input#ceiling1").val(),
        // var gridHeight2= $("input#gridHt1").val(),
        // var wallDep2=$("input#wallDep1").val(),
        // var wallLen2= $("input#wallWidth1").val(),
        // var wallR2= $("input#wallR1").val(),
        // var windowHeight2= $("input#windowHeight1").val(),
        // var sill2= $("input#sill1").val(),
        // var windowWidth2= $("input#windowWidth1").val(),
        // var glzRatio2= $("input#glazing1").val(),
        // var distanceWindows2= $("input#distWindow1").val(),
        // var windowU2= $("input#windowU1").val(),
        // var solarHeatGainCo2= $("input#shgc1").val(),
        // var horzShadeDep2= $("input#hShadeDep1").val(),
        // var horzShadeNum2= $("input#hShadeNum1").val(),
        // var horzShadeSpace2= $("input#hShadeSpace1").val(),
        // var horzShadeDist2= $("input#hShadeDist1").val(),
        // var horzShadeHeight2= $("input#hShadeHeight1").val(),
        // var horzShadeAngle2= $("input#hShadeAngle1").val(),
        // var vertShadeDep2= $("input#vShadeDep1").val(),
        // var vertShadeNum2= $("input#vShadeNum1").val(),
        // var vertShadeSpace2=$("input#vShadeSpace1").val(),
        // var vertShadeStart2= $("select#vShadeStart1").val(),
        // var vertShadeShift2= $("input#vShadeShift1").val(),
        // var vertShadeDist2= $("input#vShadeDist1").val(),
        // var vertShadeOn2= $("input#vShadeOn1").val(),
        // var vertShadeHeight2= $("input#vShadeHeight1").val(),
        // var  vertShadeScale2= $("input#vShadeScale1").val();

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
        airTemp: $("input#airTemp1").val(),
        humidity: $("input#humidity1").val(),
        airSpeed: $("input#airSpeed1").val(),
        cloting: $("input#clothing1").val(),
        metabolic: $("input#metabolic1").val(),
        posture: $("select#posture1").val(),
        aveShortwave: $("input#asa1").val(),
        windowOrientation: $("input#north1").val(),
        ceiling: $("input#ceiling1").val(),
        gridHeight: $("input#gridHt1").val(),
        wallDep: $("input#wallDep1").val(),
        wallLen: $("input#wallWidth1").val(),
        wallR: $("input#wallR1").val(),
        windowHeight: $("input#windowHeight1").val(),
        sill: $("input#sill1").val(),
        windowWidth: $("input#windowWidth1").val(),
        glzRatio: $("input#glazing1").val(),
        distanceWindows: $("input#distWindow1").val(),
        windowU: $("input#windowU1").val(),
        solarHeatGainCo: $("input#shgc1").val(),
        horzShadeDep: $("input#hShadeDep1").val(),
        horzShadeNum: $("input#hShadeNum1").val(),
        horzShadeSpace: $("input#hShadeSpace1").val(),
        horzShadeDist: $("input#hShadeDist1").val(),
        horzShadeHeight: $("input#hShadeHeight1").val(),
        horzShadeAngle: $("input#hShadeAngle1").val(),
        vertShadeDep: $("input#vShadeDep1").val(),
        vertShadeNum: $("input#vShadeNum1").val(),
        vertShadeSpace:$("input#vShadeSpace1").val(),
        vertShadeStart: $("select#vShadeStart1").val(),
        vertShadeShift: $("input#vShadeShift1").val(),
        vertShadeDist: $("input#vShadeDist1").val(),
        //vertShadeOn: $("input#vShadeOn").prop("checked"),
        vertShadeOn: $("input#vShadeOn1").val(),
        vertShadeHeight: $("input#vShadeHeight1").val(),
        vertShadeScale: $("input#vShadeScale1").val()
	}

	//values for only case 3
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

        // // build the URL

  
        // var startURL = location.href + "&case1=" + case1Vis + "&case2=" + case2Vis + "&case3=" + case3Vis;

        // var endURL = "&month=" + month + "&day=" + day + "&hour=" + hour + "&timeStep=" + timeStep + "&long=" + long + "&lat=" + lat + "&timeZone=" + timeZone + "&outdoorTemp=" + outdoorTemp;

        // var case1URL = "&airTemp=" + airTemp + "&humidity=" + humidity + "&airSpeed=" + airSpeed + "&cloting=" + cloting + "&metabolic=" + metabolic + "&posture=" + posture + "&aveShortwave=" + aveShortwave + "&windowOrientation=" + windowOrientation + "&ceiling=" + ceiling + "&gridHeight" + gridHeight + "&wallDep" + wallDep + "&wallLen" + wallLen + "&wallR" + wallR + "&windowHeight" + windowHeight +"&sill" + sill + "&windowWidth" + windowWidth + "&glzRatio=" + glzRatio + "&distanceWindows=" + distanceWindows + "&windowU=" + windowU + "&solarHeatGainCo=" + solarHeatGainCo + "&horzShadeDep=" + horzShadeDep + "&horzShadeNum=" + horzShadeNum + "&horzShadeSpace=" + horzShadeSpace + "&horzShadeDist=" + horzShadeDist + "&horzShadeHeight=" + horzShadeHeight + "&horzShadeAngle=" + horzShadeAngle + "&vertShadeDep=" + vertShadeDep + "&vertShadeNum=" + vertShadeNum + "&vertShadeSpace=" + vertShadeSpace + "&vertShadeStart=" + vertShadeStart + "&vertShadeShift=" + vertShadeShift + "&vertShadeDist=" + vertShadeDist + "&vertShadeOn=" + vertShadeOn + "&vertShadeHeight=" + vertShadeHeight + "&vertShadeScale=" + vertShadeScale;

        // var case2URL = "&airTemp2=" + airTemp2 + "&humidity2=" + humidity2 + "&airSpeed2=" + airSpeed2 + "&cloting2=" + cloting2 + "&metabolic2=" + metabolic2 + "&posture2=" + posture2 + "&aveShortwave2=" + aveShortwave2 + "&windowOrientation2=" + windowOrientation2 + "&ceiling2=" + ceiling2 + "&gridHeight2" + gridHeight2 + "&wallDep2" + wallDep2 + "&wallLen2" + wallLen2 + "&wallR2" + wallR2 + "&windowHeight2" + windowHeight2 +"&sill2" + sill2 + "&windowWidth2" + windowWidth2 + "&glzRatio2=" + glzRatio2 + "&distanceWindows2=" + distanceWindows2 + "&windowU2=" + windowU2 + "&solarHeatGainCo2=" + solarHeatGainCo2 + "&horzShadeDep2=" + horzShadeDep2 + "&horzShadeNum2=" + horzShadeNum2 + "&horzShadeSpace2=" + horzShadeSpace2 + "&horzShadeDist2=" + horzShadeDist2 + "&horzShadeHeight2=" + horzShadeHeight2 + "&horzShadeAngle2=" + horzShadeAngle2 + "&vertShadeDep2=" + vertShadeDep2 + "&vertShadeNum2=" + vertShadeNum2 + "&vertShadeSpace2=" + vertShadeSpace2 + "&vertShadeStart2=" + vertShadeStart2 + "&vertShadeShift2=" + vertShadeShift2 + "&vertShadeDist2=" + vertShadeDist2 + "&vertShadeOn2=" + vertShadeOn2 + "&vertShadeHeight2=" + vertShadeHeight2 + "&vertShadeScale2=" + vertShadeScale2;

        // var case3URL =  "&airTemp3=" + airTemp3 + "&humidity3=" + humidity3 + "&airSpeed3=" + airSpeed3 + "&cloting3=" + cloting3 + "&metabolic3=" + metabolic3 + "&posture3=" + posture3 + "&aveShortwave3=" + aveShortwave3 + "&windowOrientation3=" + windowOrientation3 + "&ceiling3=" + ceiling3 + "&gridHeight3" + gridHeight3 + "&wallDep3" + wallDep3 + "&wallLen3" + wallLen3 + "&wallR3" + wallR3 + "&windowHeight3" + windowHeight3 +"&sill3" + sill3 + "&windowWidth3" + windowWidth3 + "&glzRatio3=" + glzRatio3 + "&distanceWindows3=" + distanceWindows3 + "&windowU3=" + windowU3 + "&solarHeatGainCo3=" + solarHeatGainCo3 + "&horzShadeDep3=" + horzShadeDep3 + "&horzShadeNum3=" + horzShadeNum3 + "&horzShadeSpace3=" + horzShadeSpace3 + "&horzShadeDist3=" + horzShadeDist3 + "&horzShadeHeight3=" + horzShadeHeight3 + "&horzShadeAngle3=" + horzShadeAngle3 + "&vertShadeDep3=" + vertShadeDep3 + "&vertShadeNum3=" + vertShadeNum3 + "&vertShadeSpace3=" + vertShadeSpace3 + "&vertShadeStart3=" + vertShadeStart3 + "&vertShadeShift3=" + vertShadeShift3 + "&vertShadeDist3=" + vertShadeDist3 + "&vertShadeOn3=" + vertShadeOn3 + "&vertShadeHeight3=" + vertShadeHeight3 + "&vertShadeScale3=" + vertShadeScale3;



        // // if only case 1
        // if ($("#caseSelection #case2Label").hasClass("unselected") == true && $("#caseSelection #case3Label").hasClass("unselected") == true) {
        // var paramURL = startURL + case1URL + endURL;
        // }

        // // only case 1 and case 2
        // if ($("#caseSelection #case2Label").hasClass("unselected") == false && $("#caseSelection #case3Label").hasClass("unselected") == true) {
        // var paramURL = startURL + case1URL + case2URL + endURL;
        // }

        // // only case 1 and case 3
        // if ($("#caseSelection #case2Label").hasClass("unselected") == true && $("#caseSelection #case3Label").hasClass("unselected") == false) {
        // var paramURL = startURL + case1URL + case3URL + endURL;
        // }

        // // only all cases
        // if ($("#caseSelection #case2Label").hasClass("unselected") == false && $("#caseSelection #case3Label").hasClass("unselected") == false) {
        // var paramURL = startURL + case1URL + case2URL + case3URL + endURL;
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

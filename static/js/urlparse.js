//Assign any parameters from the URL

var thisURL = location.href;

//call URL parser function
var urlParameters = urlObject({'url':thisURL}).parameters;
console.log("****",urlParameters);

// // determine units
// if (typeof urlParameters.units != 'undefined') {

// 	unitSys = urlParameters.units;

// 	if (unitSys == "IP") {
// 		$(".optionButton#IP").addClass("selected");
// 		$(".optionButton#SI").removeClass("selected");
// 		$(".optionButton#SI").addClass("unselected");

// 		// change labels to have ft
// 		$(".units, .unitsTemp, .unitsUVal, .unitsRVal, .unitsAirSpeed").removeClass("SI");
// 		$(".units, .unitsTemp, .unitsUVal, .unitsRVal, .unitsAirSpeed").addClass("IP");
// 		$(".units, .unitsTemp, .unitsUVal, .unitsRVal, .unitsAirSpeed").empty();
// 		$(".units").append("ft");
// 		$(".unitsTemp").append("&deg;F");
// 		$(".unitsUVal").append("Btu/hr*ft&sup2;*&deg;F");
// 		$(".unitsRVal").append("hr*ft&sup2;*&deg;F/Btu");
// 		$(".unitsAirSpeed").append("fpm");
// 	}


// 	if (unitSys == "SI") {
// 		$(".optionButton#SI").addClass("selected");
// 		$(".optionButton#IP").removeClass("selected");
// 		$(".optionButton#IP").addClass("unselected");

// 		// change units labels to be in SI
// 		$(".units, .unitsTemp, .unitsUVal, .unitsRVal, .unitsAirSpeed").removeClass("IP");
// 		$(".units, .unitsTemp, .unitsUVal, .unitsRVal, .unitsAirSpeed").addClass("SI");
// 		$(".units, .unitsTemp, .unitsUVal, .unitsRVal, .unitsAirSpeed").empty();
// 		$(".units").append("m");
// 		$(".unitsTemp").append("&deg;C");
// 		$(".unitsUVal").append("W/m&sup2;*K");
// 		$(".unitsRVal").append("m&sup2;*K/W");
// 		$(".unitsAirSpeed").append("m/s");
// 		$("#calcuvalue, #calcuvalue2, #calcuvalue3").val(" ");

// 		// set default values for SI.
// 		$("#ceiling, #ceiling2, #ceiling3").val(3.66);
// 		$("#wallWidth, #wallWidth2, #wallWidth3").val(5.49);
// 		$("#windowHeight, #windowHeight2, #windowHeight3").val(2.13);
// 		$("#sill, #sill2, #sill3").val(0.91);
// 		$("#windowWidth, #windowWidth2, #windowWidth3").val(1.22);
// 		$("#glazing, #glazing2, #glazing3").val(39);
// 		$("#distWindow, #distWindow2, #distWindow3").val(1.83);
// 		$("#uvalue, #uvalue2, #uvalue3").val(1.99);
// 		$("#outdoortemp, #outdoortemp2, #outdoortemp3").val(-12);
// 		$("#airtemp, #airtemp2, #airtemp3").val(22.2);
// 		$("#rvalue, #rvalue2, #rvalue3").val(2.64);
// 		$("#airspeed, #airspeed2, #airspeed3").val(0.05);
// 		$("#distFromFacade").attr("max", 4).attr("min", .5);
// 		$("#distFromFacade").val(0.914);
// 		$("#distFromFacade").attr("value", 0.914);
// 		$("#distOutput").text(0.9 + " m");
// 	}
// }


// //fill form with parameters, but only if values are provided in URL
// if (typeof urlParameters.ppd != 'undefined') {
// 	$("#ppd").val(urlParameters.ppd);
// 	$("#ppdOutput").text(urlParameters.ppd + "%");
// }
// if (typeof urlParameters.ppd2 != 'undefined') {
// 	$("#ppd1").val(urlParameters.ppd2);
// 	$("#ppdOutput1").text(urlParameters.ppd2 + "%");
// }

// if (typeof urlParameters.distFromFacade != 'undefined') {
// 	$("#distFromFacade").val(urlParameters.distFromFacade);
// 	if (unitSys == "IP") {
// 		$("#distOutput").text(urlParameters.distFromFacade + " ft");
// 	} else {
// 		$("#distFromFacade").attr("max", 4).attr("min", .5);
// 		$("#distFromFacade").val(urlParameters.distFromFacade);
// 		$("#distFromFacade").attr("value", urlParameters.distFromFacade);
// 		$("#distOutput").text(urlParameters.distFromFacade + " m");
// 	}
// }

// function checkSplitGraph() {
// 	if ($("#graphWrapper").css("display") == "none") {
// 		$("#graphWrapper3").slideDown(50);
// 	}
// }
// if (typeof urlParameters.graphType != 'undefined') {
// 	$("#graphWrapper").slideUp(50);
// 	$("#graphWrapper1").slideUp(50);
// 	setTimeout(checkSplitGraph, 70);
// 	$("#splitToggle").removeClass("marked");
// 	$("#splitToggle").addClass("unmarked");
// 	$("#combinedToggle").removeClass("unmarked");
// 	$("#combinedToggle").addClass("marked");
// }

var case1visability = urlParameters.case1;
var case2visability = urlParameters.case2;
var case3visability = urlParameters.case3;


// first check should be which cases are shown - therefore if only case 1, dont need values for other cases, just fill with the same...

//only case 1 is shown, apply given values to all cases
if (urlParameters.case1 == 'show' && urlParameters.case2 == 'hide' && urlParameters.case3 == 'hide') {

	if (typeof urlParameters.month != 'undefined') {
		$("#month, #month1, #month3").val(urlParameters.month);
	}
	if (typeof urlParameters.day !== 'undefined') {
		$('#day, #day1, #day3').val(parseInt(urlParameters.day));
	}
	if (typeof urlParameters.hour !== 'undefined') {
		$('#hour, #hour1, #hour3').val(parseInt(urlParameters.hour));
	}
	if (typeof urlParameters.timeStep !== 'undefined') {
		$('#timeStep,#timeStep1,#timeStep3').val(parseInt(urlParameters.timeStep));
	}
	if (typeof urlParameters.long !== 'undefined') {
		$('#long,#long1,#long3').val(parseInt(urlParameters.long));
	}
	if (typeof urlParameters.lat !== 'undefined') {
		$('#lat,#lat1,#lat3').val(parseInt(urlParameters.lat));
	}
	if (typeof urlParameters.timeZone !== 'undefined') {
		$('#timeZone,#timeZone1,#timeZone3').val(parseInt(urlParameters.timeZone));
	}
	if (typeof urlParameters.outdoorTemp !== 'undefined') {
		$('#outdoorTemp,#outdoorTemp1,#outdoorTemp3').val(parseInt(urlParameters.outdoorTemp));
	}
	if (typeof urlParameters.airTemp !== 'undefined') {
		$('#airTemp,#airTemp1,#airTemp3').val(parseInt(urlParameters.airTemp));
	}
	if (typeof urlParameters.humidity !== 'undefined') {
		$('#humidity,#humidity1,#humidity3').val(parseInt(urlParameters.humidity));
	}
	if (typeof urlParameters.airSpeed !== 'undefined') {
		$('#airSpeed,#airSpeed1,#airSpeed3').val(parseInt(urlParameters.airSpeed));
	}
	if (typeof urlParameters.cloting !== 'undefined') {
		$('#cloting,#cloting1,#cloting3').val(urlParameters.cloting);
	}
	if (typeof urlParameters.metabolic !== 'undefined') {
		$('#metabolic,#metabolic1,#metabolic3').val(parseInt(urlParameters.metabolic));
	}
	if (typeof urlParameters.posture !== 'undefined') {
		$('#posture,#posture1,#posture3').val(urlParameters.posture);
	}
	if (typeof urlParameters.aveShortwave !== 'undefined') {
		$('#aveShortwave,#aveShortwave1,#aveShortwave3').val(urlParameters.aveShortwave);
	}
	if (typeof urlParameters.windowOrientation !== 'undefined') {
		$('#windowOrientation,#windowOrientation1,#windowOrientation3').val(urlParameters.windowOrientation);
	}
	if (typeof urlParameters.ceiling !== 'undefined') {
		$('#ceiling,#ceiling1,#ceiling3').val(parseInt(urlParameters.ceiling));
	}
	if (typeof urlParameters.gridHeight !== 'undefined') {
		$('#gridHeight,#gridHeight1,#gridHeight3').val(urlParameters.gridHeight);
	}
	if (typeof urlParameters.wallDep !== 'undefined') {
		$('#wallDep,#wallDep1,#wallDep3').val(Math.floor(parseInt(urlParameters.wallDep)));
	}
	if (typeof urlParameters.wallLen !== 'undefined') {
		$('#wallLen,#wallLen1,#wallLen3').val(Math.floor(parseInt(urlParameters.wallLen)));
	}
	if (typeof urlParameters.wallR !== 'undefined') {
		$('#wallR,#wallR1,#wallR3').val(parseInt(urlParameters.wallR));
	}
	if (typeof urlParameters.windowHeight !== 'undefined') {
		$('#windowHeight,#windowHeight1,#windowHeight3').val(parseInt(urlParameters.windowHeight));
	}
	if (typeof urlParameters.sill !== 'undefined') {
		$('#sill,#sill1,#sill3').val(parseInt(urlParameters.sill));
	}
	if (typeof urlParameters.windowWidth !== 'undefined') {
		$('#windowWidth,#windowWidth1,#windowWidth3').val(parseInt(urlParameters.windowWidth));
	}
	if (typeof urlParameters.glzRatio !== 'undefined') {
		$('#glzRatio,#glzRatio1,#glzRatio3').val(urlParameters.glzRatio);
	}
	if (typeof urlParameters.distanceWindows !== 'undefined') {
		$('#distanceWindows,#distanceWindows1,#distanceWindows3').val(urlParameters.distanceWindows);
	}
	if (typeof urlParameters.windowU !== 'undefined') {
		$('#windowU,#windowU1,#windowU3').val(parseInt(urlParameters.windowU));
	}
	if (typeof urlParameters.solarHeatGainCo !== 'undefined') {
		$('#solarHeatGainCo,#solarHeatGainCo1,#solarHeatGainCo3').val(urlParameters.solarHeatGainCo);
	}
	if (typeof urlParameters.horzShadeDep !== 'undefined') {
		$('#horzShadeDep,#horzShadeDep1,#horzShadeDep3').val(urlParameters.horzShadeDep);
	}
	if (typeof urlParameters.horzShadeNum !== 'undefined') {
		$('#horzShadeNum,#horzShadeNum1,#horzShadeNum3').val(urlParameters.horzShadeNum);
	}
	if (typeof urlParameters.horzShadeSpace !== 'undefined') {
		$('#horzShadeSpace,#horzShadeSpace1,#horzShadeSpace3').val(urlParameters.horzShadeSpace);
	}
	if (typeof urlParameters.horzShadeDist !== 'undefined') {
		$('#horzShadeDist,#horzShadeDist1,#horzShadeDist3').val(urlParameters.horzShadeDist);
	}
	if (typeof urlParameters.horzShadeHeight !== 'undefined') {
		$('#horzShadeHeight,#horzShadeHeight1,#horzShadeHeight3').val(urlParameters.horzShadeHeight);
	}
	if (typeof urlParameters.horzShadeAngle !== 'undefined') {
		$('#horzShadeAngle,#horzShadeAngle1,#horzShadeAngle3').val(urlParameters.horzShadeAngle);
	}
	if (typeof urlParameters.vertShadeDep !== 'undefined') {
		$('#vertShadeDep,#vertShadeDep1,#vertShadeDep3').val(urlParameters.vertShadeDep);
	}
	if (typeof urlParameters.vertShadeNum !== 'undefined') {
		$('#vertShadeNum,#vertShadeNum1,#vertShadeNum3').val(urlParameters.vertShadeNum);
	}
	if (typeof urlParameters.vertShadeSpace !== 'undefined') {
		$('#vertShadeSpace,#vertShadeSpace1,#vertShadeSpace3').val(urlParameters.vertShadeSpace);
	}
	if (typeof urlParameters.vertShadeStart !== 'undefined') {
		$('#vertShadeStart,#vertShadeStart1,#vertShadeStart3').val(urlParameters.vertShadeStart);
	}
	if (typeof urlParameters.vertShadeShift !== 'undefined') {
		$('#vertShadeShift,#vertShadeShift1,#vertShadeShift3').val(urlParameters.vertShadeShift);
	}	
	if (typeof urlParameters.vertShadeDist !== 'undefined') {
		$('#vertShadeDist,#vertShadeDist1,#vertShadeDist3').val(urlParameters.vertShadeDist);
	}	

	// if (typeof urlParameters.vertShadeOn !== 'undefined') {
	// 	$('#vertShadeOn,#vertShadeOn1,#vertShadeOn3').val(urlParameters.vertShadeOn);
	// }	

	if (urlParameters.vertShadeOn != '') {
		$("#vertShadeOn,#vertShadeOn1,#vertShadeOn3").val(urlParameters.vertShadeOn);
		$("#vertShadeOn,#vertShadeOn1,#vertShadeOn3").removeClass("inactive");
		$("#vertShadeOnLabel, #vertShadeOnLabel1, #vertShadeOnLabel3").removeClass("inactive");
		$("#checkvertShadeOn, #checkvertShadeOn1, #checkvertShadeOn3").removeClass("unselected");
	}

	if (typeof urlParameters.vertShadeHeight !== 'undefined') {
		$('#vertShadeHeight,#vertShadeHeight1,#vertShadeHeight3').val(parseInt(urlParameters.vertShadeHeight));
	}	
	if (typeof urlParameters.vertShadeScale !== 'undefined') {
		$('#vertShadeScale,#vertShadeScale1,#vertShadeScale3').val(parseInt(urlParameters.vertShadeScale));
	}

}

// show only case 1 and 2
// case 3 to match case 1
if (urlParameters.case1 == 'show' && urlParameters.case2 == 'show' &&  urlParameters.case3 == 'hide') {

	showCase2();
	//sizeButton();

    if (typeof urlParameters.month != 'undefined') {
		$("#month, #month3").val(urlParameters.month);
	}
	if (typeof urlParameters.month2 != 'undefined') {
		$("#month1").val(urlParameters.month2);
	}

	if (typeof urlParameters.day !== 'undefined') {
		$('#day, #day3').val(parseInt(urlParameters.day));
	}
	if (typeof urlParameters.day2 !== 'undefined') {
		$('#day1').val(parseInt(urlParameters.day2));
	}

	if (typeof urlParameters.hour !== 'undefined') {
		$('#hour, #hour3').val(parseInt(urlParameters.hour));
	}
	if (typeof urlParameters.hour2 !== 'undefined') {
		$('#hour1').val(parseInt(urlParameters.hour2));
	}

	if (typeof urlParameters.timeStep !== 'undefined') {
		$('#timeStep,#timeStep3').val(parseInt(urlParameters.timeStep));
	}
	if (typeof urlParameters.timeStep2 !== 'undefined') {
		$('#timeStep1').val(parseInt(urlParameters.timeStep2));
	}

	if (typeof urlParameters.long !== 'undefined') {
		$('#long,#long3').val(parseInt(urlParameters.long));
	}
	if (typeof urlParameters.long2 !== 'undefined') {
		$('#long1').val(parseInt(urlParameters.long2));
	}

	if (typeof urlParameters.lat !== 'undefined') {
		$('#lat,#lat3').val(parseInt(urlParameters.lat));
	}
	if (typeof urlParameters.lat2 !== 'undefined') {
		$('#lat1').val(parseInt(urlParameters.lat2));
	}

	if (typeof urlParameters.timeZone !== 'undefined') {
		$('#timeZone,#timeZone3').val(parseInt(urlParameters.timeZone));
	}
	if (typeof urlParameters.timeZone2 !== 'undefined') {
		$('#timeZone1').val(parseInt(urlParameters.timeZone2));
	}

	if (typeof urlParameters.outdoorTemp !== 'undefined') {
		$('#outdoorTemp,#outdoorTemp3').val(parseInt(urlParameters.outdoorTemp));
	}
	if (typeof urlParameters.outdoorTemp2 !== 'undefined') {
		$('#outdoorTemp1').val(parseInt(urlParameters.outdoorTemp2));
	}

	if (typeof urlParameters.airTemp !== 'undefined') {
		$('#airTemp,#airTemp3').val(parseInt(urlParameters.airTemp));
	}
	if (typeof urlParameters.airTemp2 !== 'undefined') {
		$('#airTemp1').val(parseInt(urlParameters.airTemp2));
	}

	if (typeof urlParameters.humidity !== 'undefined') {
		$('#humidity,#humidity3').val(parseInt(urlParameters.humidity));
	}
	if (typeof urlParameters.humidity2 !== 'undefined') {
		$('#humidity1').val(parseInt(urlParameters.humidity2));
	}

	if (typeof urlParameters.airSpeed !== 'undefined') {
		$('#airSpeed,#airSpeed3').val(parseInt(urlParameters.airSpeed));
	}
	if (typeof urlParameters.airSpeed2 !== 'undefined') {
		$('#airSpeed1').val(parseInt(urlParameters.airSpeed2));
	}

	if (typeof urlParameters.cloting !== 'undefined') {
		$('#cloting,#cloting3').val(urlParameters.cloting);
	}
	if (typeof urlParameters.cloting2 !== 'undefined') {
		$('#cloting1').val(urlParameters.cloting2);
	}

	if (typeof urlParameters.metabolic !== 'undefined') {
		$('#metabolic,#metabolic3').val(parseInt(urlParameters.metabolic));
	}
	if (typeof urlParameters.metabolic2 !== 'undefined') {
		$('#metabolic1').val(parseInt(urlParameters.metabolic2));
	}

	if (typeof urlParameters.posture !== 'undefined') {
		$('#posture,#posture3').val(urlParameters.posture);
	}
	if (typeof urlParameters.posture2 !== 'undefined') {
		$('#posture1').val(urlParameters.posture2);
	}

	if (typeof urlParameters.aveShortwave !== 'undefined') {
		$('#aveShortwave,#aveShortwave3').val(urlParameters.aveShortwave);
	}
	if (typeof urlParameters.aveShortwave2 !== 'undefined') {
		$('#aveShortwave1').val(urlParameters.aveShortwave2);
	}

	if (typeof urlParameters.windowOrientation !== 'undefined') {
		$('#windowOrientation,#windowOrientation3').val(urlParameters.windowOrientation);
	}
	if (typeof urlParameters.windowOrientation2 !== 'undefined') {
		$('#windowOrientation1').val(urlParameters.windowOrientation2);
	}

	if (typeof urlParameters.ceiling !== 'undefined') {
		$('#ceiling,#ceiling3').val(parseInt(urlParameters.ceiling));
	}
	if (typeof urlParameters.ceiling2 !== 'undefined') {
		$('#ceiling1').val(parseInt(urlParameters.ceiling2));
	}

	if (typeof urlParameters.gridHeight !== 'undefined') {
		$('#gridHeight,#gridHeight3').val(urlParameters.gridHeight);
	}
	if (typeof urlParameters.gridHeight2 !== 'undefined') {
		$('#gridHeight1').val(urlParameters.gridHeight2);
	}

	if (typeof urlParameters.wallDep !== 'undefined') {
		$('#wallDep,#wallDep3').val(Math.floor(parseInt(urlParameters.wallDep)));
	}
	if (typeof urlParameters.wallDep2 !== 'undefined') {
		$('#wallDep1').val(Math.floor(parseInt(urlParameters.wallDep2)));
	}

	if (typeof urlParameters.wallLen !== 'undefined') {
		$('#wallLen,#wallLen3').val(Math.floor(parseInt(urlParameters.wallLen)));
	}
	if (typeof urlParameters.wallLen2 !== 'undefined') {
		$('#wallLen1').val(Math.floor(parseInt(urlParameters.wallLen2)));
	}

	if (typeof urlParameters.wallR !== 'undefined') {
		$('#wallR,#wallR3').val(parseInt(urlParameters.wallR));
	}
	if (typeof urlParameters.wallR2 !== 'undefined') {
		$('#wallR1').val(parseInt(urlParameters.wallR2));
	}

	if (typeof urlParameters.windowHeight !== 'undefined') {
		$('#windowHeight,#windowHeight3').val(parseInt(urlParameters.windowHeight));
	}
	if (typeof urlParameters.windowHeight2 !== 'undefined') {
		$('#windowHeight1').val(parseInt(urlParameters.windowHeight2));
	}

	if (typeof urlParameters.sill !== 'undefined') {
		$('#sill,#sill3').val(parseInt(urlParameters.sill));
	}
	if (typeof urlParameters.sill2 !== 'undefined') {
		$('#sill1').val(parseInt(urlParameters.sill2));
	}

	if (typeof urlParameters.windowWidth !== 'undefined') {
		$('#windowWidth,#windowWidth3').val(parseInt(urlParameters.windowWidth));
	}
	if (typeof urlParameters.windowWidth2 !== 'undefined') {
		$('#windowWidth1').val(parseInt(urlParameters.windowWidth2));
	}

	if (typeof urlParameters.glzRatio !== 'undefined') {
		$('#glzRatio,#glzRatio3').val(urlParameters.glzRatio);
	}
	if (typeof urlParameters.glzRatio2 !== 'undefined') {
		$('#glzRatio1').val(urlParameters.glzRatio2);
	}

	if (typeof urlParameters.distanceWindows !== 'undefined') {
		$('#distanceWindows,#distanceWindows3').val(urlParameters.distanceWindows);
	}
	if (typeof urlParameters.distanceWindows2 !== 'undefined') {
		$('#distanceWindows1').val(urlParameters.distanceWindows2);
	}

	if (typeof urlParameters.windowU !== 'undefined') {
		$('#windowU,#windowU3').val(parseInt(urlParameters.windowU));
	}
	if (typeof urlParameters.windowU2 !== 'undefined') {
		$('#windowU1').val(parseInt(urlParameters.windowU2));
	}

	if (typeof urlParameters.solarHeatGainCo !== 'undefined') {
		$('#solarHeatGainCo,#solarHeatGainCo3').val(urlParameters.solarHeatGainCo);
	}
	if (typeof urlParameters.solarHeatGainCo2 !== 'undefined') {
		$('#solarHeatGainCo1').val(urlParameters.solarHeatGainCo2);
	}

	if (typeof urlParameters.horzShadeDep2 !== 'undefined') {
		$('#horzShadeDep,#horzShadeDep3').val(urlParameters.horzShadeDep);
	}
	if (typeof urlParameters.horzShadeDep2 !== 'undefined') {
		$('#horzShadeDep1').val(urlParameters.horzShadeDep2);
	}

	if (typeof urlParameters.horzShadeNum !== 'undefined') {
		$('#horzShadeNum,#horzShadeNum3').val(urlParameters.horzShadeNum);
	}
	if (typeof urlParameters.horzShadeNum2 !== 'undefined') {
		$('#horzShadeNum1').val(urlParameters.horzShadeNum2);
	}

	if (typeof urlParameters.horzShadeSpace !== 'undefined') {
		$('#horzShadeSpace,#horzShadeSpace3').val(urlParameters.horzShadeSpace);
	}
	if (typeof urlParameters.horzShadeSpace2 !== 'undefined') {
		$('#horzShadeSpace1').val(urlParameters.horzShadeSpace2);
	}

	if (typeof urlParameters.horzShadeDist !== 'undefined') {
		$('#horzShadeDist,#horzShadeDist3').val(urlParameters.horzShadeDist);
	}
	if (typeof urlParameters.horzShadeDist2 !== 'undefined') {
		$('#horzShadeDist1').val(urlParameters.horzShadeDist2);
	}

	if (typeof urlParameters.horzShadeHeight !== 'undefined') {
		$('#horzShadeHeight,#horzShadeHeight3').val(urlParameters.horzShadeHeight);
	}
	if (typeof urlParameters.horzShadeHeight2 !== 'undefined') {
		$('#horzShadeHeight1').val(urlParameters.horzShadeHeight2);
	}

	if (typeof urlParameters.horzShadeAngle !== 'undefined') {
		$('#horzShadeAngle,#horzShadeAngle3').val(urlParameters.horzShadeAngle);
	}
	if (typeof urlParameters.horzShadeAngle2 !== 'undefined') {
		$('#horzShadeAngle1').val(urlParameters.horzShadeAngle2);
	}

	if (typeof urlParameters.vertShadeDep !== 'undefined') {
		$('#vertShadeDep,#vertShadeDep3').val(urlParameters.vertShadeDep);
	}
	if (typeof urlParameters.vertShadeDep2 !== 'undefined') {
		$('#vertShadeDep1').val(urlParameters.vertShadeDep2);
	}

	if (typeof urlParameters.vertShadeNum !== 'undefined') {
		$('#vertShadeNum,#vertShadeNum3').val(urlParameters.vertShadeNum);
	}
	if (typeof urlParameters.vertShadeNum2 !== 'undefined') {
		$('#vertShadeNum1').val(urlParameters.vertShadeNum2);
	}

	if (typeof urlParameters.vertShadeSpace !== 'undefined') {
		$('#vertShadeSpace,#vertShadeSpace3').val(urlParameters.vertShadeSpace);
	}
	if (typeof urlParameters.vertShadeSpace2 !== 'undefined') {
		$('#vertShadeSpace1').val(urlParameters.vertShadeSpace2);
	}

	if (typeof urlParameters.vertShadeStart !== 'undefined') {
		$('#vertShadeStart,#vertShadeStart3').val(urlParameters.vertShadeStart);
	}
	if (typeof urlParameters.vertShadeStart2 !== 'undefined') {
		$('#vertShadeStart1').val(urlParameters.vertShadeStart2);
	}

	if (typeof urlParameters.vertShadeShift !== 'undefined') {
		$('#vertShadeShift,#vertShadeShift3').val(urlParameters.vertShadeShift);
	}	
	if (typeof urlParameters.vertShadeShift2 !== 'undefined') {
		$('#vertShadeShift1').val(urlParameters.vertShadeShift2);
	}	

	if (typeof urlParameters.vertShadeDist !== 'undefined') {
		$('#vertShadeDist,#vertShadeDist3').val(urlParameters.vertShadeDist);
	}	
	if (typeof urlParameters.vertShadeDist2 !== 'undefined') {
		$('#vertShadeDist1').val(urlParameters.vertShadeDist2);
	}	

	// if (typeof urlParameters.vertShadeOn !== 'undefined') {
	// 	$('#vertShadeOn,#vertShadeOn3').val(urlParameters.vertShadeOn);
	// }	
	// if (typeof urlParameters.vertShadeOn2 !== 'undefined') {
	// 	$('#vertShadeOn1').val(urlParameters.vertShadeOn2);
	// }	

	if (urlParameters.vertShadeOn != '') {
		$("#vertShadeOn,#vertShadeOn3").val(urlParameters.vertShadeOn);
		$("#vertShadeOn,#vertShadeOn3").removeClass("inactive");
		$("#vertShadeOnLabel, #vertShadeOnLabel3").removeClass("inactive");
		$("#checkvertShadeOn, #checkvertShadeOn3").removeClass("unselected");
	}
	if (urlParameters.vertShadeOn2 != '') {
		$("#vertShadeOn1").val(urlParameters.vertShadeOn2);
		$("#vertShadeOn1").removeClass("inactive");
		$("#vertShadeOnLabel1").removeClass("inactive");
		$("#checkvertShadeOn1").removeClass("unselected");
	}

	if (typeof urlParameters.vertShadeHeight !== 'undefined') {
		$('#vertShadeHeight,#vertShadeHeight3').val(parseInt(urlParameters.vertShadeHeight));
	}	
	if (typeof urlParameters.vertShadeHeight2 !== 'undefined') {
		$('#vertShadeHeight1').val(parseInt(urlParameters.vertShadeHeight2));
	}	

	if (typeof urlParameters.vertShadeScale !== 'undefined') {
		$('#vertShadeScale,#vertShadeScale3').val(parseInt(urlParameters.vertShadeScale));
	}
	if (typeof urlParameters.vertShadeScale2 !== 'undefined') {
		$('#vertShadeScale1').val(parseInt(urlParameters.vertShadeScale2));
	}

}

// show only case 1 and 3
// case 2 to match case 1
if (urlParameters.case1 == 'show' && urlParameters.case2 == 'hide' &&  urlParameters.case3 == 'show') {

	showCase3();
	//sizeButton();


    if (typeof urlParameters.month != 'undefined') {
		$("#month, #month1").val(urlParameters.month);
	}
	if (typeof urlParameters.month3 != 'undefined') {
		$("#month3").val(urlParameters.month3);
	}

	if (typeof urlParameters.day !== 'undefined') {
		$('#day, #day1').val(parseInt(urlParameters.day));
	}
	if (typeof urlParameters.day3 !== 'undefined') {
		$('#day3').val(parseInt(urlParameters.day3));
	}

	if (typeof urlParameters.hour !== 'undefined') {
		$('#hour, #hour1').val(parseInt(urlParameters.hour));
	}
	if (typeof urlParameters.hour3 !== 'undefined') {
		$('#hour3').val(parseInt(urlParameters.hour3));
	}

	if (typeof urlParameters.timeStep !== 'undefined') {
		$('#timeStep,#timeStep1').val(parseInt(urlParameters.timeStep));
	}
	if (typeof urlParameters.timeStep3 !== 'undefined') {
		$('#timeStep3').val(parseInt(urlParameters.timeStep3));
	}

	if (typeof urlParameters.long !== 'undefined') {
		$('#long,#long1').val(parseInt(urlParameters.long));
	}
	if (typeof urlParameters.long3 !== 'undefined') {
		$('#long3').val(parseInt(urlParameters.long3));
	}

	if (typeof urlParameters.lat !== 'undefined') {
		$('#lat,#lat1').val(parseInt(urlParameters.lat));
	}
	if (typeof urlParameters.lat3 !== 'undefined') {
		$('#lat3').val(parseInt(urlParameters.lat3));
	}

	if (typeof urlParameters.timeZone !== 'undefined') {
		$('#timeZone,#timeZone1').val(parseInt(urlParameters.timeZone));
	}
	if (typeof urlParameters.timeZone3 !== 'undefined') {
		$('#timeZone3').val(parseInt(urlParameters.timeZone3));
	}

	if (typeof urlParameters.outdoorTemp !== 'undefined') {
		$('#outdoorTemp,#outdoorTemp1').val(parseInt(urlParameters.outdoorTemp));
	}
	if (typeof urlParameters.outdoorTemp3 !== 'undefined') {
		$('#outdoorTemp3').val(parseInt(urlParameters.outdoorTemp3));
	}

	if (typeof urlParameters.airTemp !== 'undefined') {
		$('#airTemp,#airTemp1').val(parseInt(urlParameters.airTemp));
	}
	if (typeof urlParameters.airTemp3 !== 'undefined') {
		$('#airTemp3').val(parseInt(urlParameters.airTemp3));
	}

	if (typeof urlParameters.humidity !== 'undefined') {
		$('#humidity,#humidity1').val(parseInt(urlParameters.humidity));
	}
	if (typeof urlParameters.humidity3 !== 'undefined') {
		$('#humidity3').val(parseInt(urlParameters.humidity3));
	}

	if (typeof urlParameters.airSpeed !== 'undefined') {
		$('#airSpeed,#airSpeed1').val(parseInt(urlParameters.airSpeed));
	}
	if (typeof urlParameters.airSpeed3 !== 'undefined') {
		$('#airSpeed3').val(parseInt(urlParameters.airSpeed3));
	}

	if (typeof urlParameters.cloting !== 'undefined') {
		$('#cloting,#cloting1').val(urlParameters.cloting);
	}
	if (typeof urlParameters.cloting3 !== 'undefined') {
		$('#cloting3').val(urlParameters.cloting3);
	}

	if (typeof urlParameters.metabolic !== 'undefined') {
		$('#metabolic,#metabolic1').val(parseInt(urlParameters.metabolic));
	}
	if (typeof urlParameters.metabolic3 !== 'undefined') {
		$('#metabolic3').val(parseInt(urlParameters.metabolic3));
	}

	if (typeof urlParameters.posture !== 'undefined') {
		$('#posture,#posture1').val(urlParameters.posture);
	}
	if (typeof urlParameters.posture3 !== 'undefined') {
		$('#posture3').val(urlParameters.posture3);
	}

	if (typeof urlParameters.aveShortwave !== 'undefined') {
		$('#aveShortwave,#aveShortwave1').val(urlParameters.aveShortwave);
	}
	if (typeof urlParameters.aveShortwave3 !== 'undefined') {
		$('#aveShortwave3').val(urlParameters.aveShortwave3);
	}

	if (typeof urlParameters.windowOrientation !== 'undefined') {
		$('#windowOrientation,#windowOrientation1').val(urlParameters.windowOrientation);
	}
	if (typeof urlParameters.windowOrientation3 !== 'undefined') {
		$('#windowOrientation3').val(urlParameters.windowOrientation3);
	}

	if (typeof urlParameters.ceiling !== 'undefined') {
		$('#ceiling,#ceiling1').val(parseInt(urlParameters.ceiling));
	}
	if (typeof urlParameters.ceiling3 !== 'undefined') {
		$('#ceiling3').val(parseInt(urlParameters.ceiling3));
	}

	if (typeof urlParameters.gridHeight !== 'undefined') {
		$('#gridHeight,#gridHeight1').val(urlParameters.gridHeight);
	}
	if (typeof urlParameters.gridHeight3 !== 'undefined') {
		$('#gridHeight3').val(urlParameters.gridHeight3);
	}

	if (typeof urlParameters.wallDep !== 'undefined') {
		$('#wallDep,#wallDep1').val(Math.floor(parseInt(urlParameters.wallDep)));
	}
	if (typeof urlParameters.wallDep3 !== 'undefined') {
		$('#wallDep3').val(Math.floor(parseInt(urlParameters.wallDep3)));
	}

	if (typeof urlParameters.wallLen !== 'undefined') {
		$('#wallLen,#wallLen1').val(Math.floor(parseInt(urlParameters.wallLen)));
	}
	if (typeof urlParameters.wallLen3 !== 'undefined') {
		$('#wallLen3').val(Math.floor(parseInt(urlParameters.wallLen3)));
	}

	if (typeof urlParameters.wallR !== 'undefined') {
		$('#wallR,#wallR1').val(parseInt(urlParameters.wallR));
	}
	if (typeof urlParameters.wallR3 !== 'undefined') {
		$('#wallR3').val(parseInt(urlParameters.wallR3));
	}

	if (typeof urlParameters.windowHeight !== 'undefined') {
		$('#windowHeight,#windowHeight1').val(parseInt(urlParameters.windowHeight));
	}
	if (typeof urlParameters.windowHeight3 !== 'undefined') {
		$('#windowHeight3').val(parseInt(urlParameters.windowHeight3));
	}

	if (typeof urlParameters.sill !== 'undefined') {
		$('#sill,#sill1').val(parseInt(urlParameters.sill));
	}
	if (typeof urlParameters.sill3 !== 'undefined') {
		$('#sill3').val(parseInt(urlParameters.sill3));
	}

	if (typeof urlParameters.windowWidth !== 'undefined') {
		$('#windowWidth,#windowWidth1').val(parseInt(urlParameters.windowWidth));
	}
	if (typeof urlParameters.windowWidth3 !== 'undefined') {
		$('#windowWidth3').val(parseInt(urlParameters.windowWidth3));
	}

	if (typeof urlParameters.glzRatio !== 'undefined') {
		$('#glzRatio,#glzRatio1').val(urlParameters.glzRatio);
	}
	if (typeof urlParameters.glzRatio3 !== 'undefined') {
		$('#glzRatio3').val(urlParameters.glzRatio3);
	}

	if (typeof urlParameters.distanceWindows !== 'undefined') {
		$('#distanceWindows,#distanceWindows1').val(urlParameters.distanceWindows);
	}
	if (typeof urlParameters.distanceWindows3 !== 'undefined') {
		$('#distanceWindows3').val(urlParameters.distanceWindows3);
	}

	if (typeof urlParameters.windowU !== 'undefined') {
		$('#windowU,#windowU1').val(parseInt(urlParameters.windowU));
	}
	if (typeof urlParameters.windowU3 !== 'undefined') {
		$('#windowU3').val(parseInt(urlParameters.windowU3));
	}

	if (typeof urlParameters.solarHeatGainCo !== 'undefined') {
		$('#solarHeatGainCo,#solarHeatGainCo1').val(urlParameters.solarHeatGainCo);
	}
	if (typeof urlParameters.solarHeatGainCo3 !== 'undefined') {
		$('#solarHeatGainCo3').val(urlParameters.solarHeatGainCo3);
	}

	if (typeof urlParameters.horzShadeDep2 !== 'undefined') {
		$('#horzShadeDep,#horzShadeDep1').val(urlParameters.horzShadeDep);
	}
	if (typeof urlParameters.horzShadeDep3 !== 'undefined') {
		$('#horzShadeDep3').val(urlParameters.horzShadeDep3);
	}

	if (typeof urlParameters.horzShadeNum !== 'undefined') {
		$('#horzShadeNum,#horzShadeNum1').val(urlParameters.horzShadeNum);
	}
	if (typeof urlParameters.horzShadeNum3 !== 'undefined') {
		$('#horzShadeNum3').val(urlParameters.horzShadeNum3);
	}

	if (typeof urlParameters.horzShadeSpace !== 'undefined') {
		$('#horzShadeSpace,#horzShadeSpace1').val(urlParameters.horzShadeSpace);
	}
	if (typeof urlParameters.horzShadeSpace3 !== 'undefined') {
		$('#horzShadeSpace3').val(urlParameters.horzShadeSpace3);
	}

	if (typeof urlParameters.horzShadeDist !== 'undefined') {
		$('#horzShadeDist,#horzShadeDist1').val(urlParameters.horzShadeDist);
	}
	if (typeof urlParameters.horzShadeDist3 !== 'undefined') {
		$('#horzShadeDist3').val(urlParameters.horzShadeDist3);
	}

	if (typeof urlParameters.horzShadeHeight !== 'undefined') {
		$('#horzShadeHeight,#horzShadeHeight1').val(urlParameters.horzShadeHeight);
	}
	if (typeof urlParameters.horzShadeHeight3 !== 'undefined') {
		$('#horzShadeHeight3').val(urlParameters.horzShadeHeight3);
	}

	if (typeof urlParameters.horzShadeAngle !== 'undefined') {
		$('#horzShadeAngle,#horzShadeAngle1').val(urlParameters.horzShadeAngle);
	}
	if (typeof urlParameters.horzShadeAngle3 !== 'undefined') {
		$('#horzShadeAngle3').val(urlParameters.horzShadeAngle3);
	}

	if (typeof urlParameters.vertShadeDep !== 'undefined') {
		$('#vertShadeDep,#vertShadeDep1').val(urlParameters.vertShadeDep);
	}
	if (typeof urlParameters.vertShadeDep3 !== 'undefined') {
		$('#vertShadeDep3').val(urlParameters.vertShadeDep3);
	}

	if (typeof urlParameters.vertShadeNum !== 'undefined') {
		$('#vertShadeNum,#vertShadeNum1').val(urlParameters.vertShadeNum);
	}
	if (typeof urlParameters.vertShadeNum3 !== 'undefined') {
		$('#vertShadeNum3').val(urlParameters.vertShadeNum3);
	}

	if (typeof urlParameters.vertShadeSpace !== 'undefined') {
		$('#vertShadeSpace,#vertShadeSpace1').val(urlParameters.vertShadeSpace);
	}
	if (typeof urlParameters.vertShadeSpace3 !== 'undefined') {
		$('#vertShadeSpace3').val(urlParameters.vertShadeSpace3);
	}

	if (typeof urlParameters.vertShadeStart !== 'undefined') {
		$('#vertShadeStart,#vertShadeStart1').val(urlParameters.vertShadeStart);
	}
	if (typeof urlParameters.vertShadeStart3 !== 'undefined') {
		$('#vertShadeStart3').val(urlParameters.vertShadeStart3);
	}

	if (typeof urlParameters.vertShadeShift !== 'undefined') {
		$('#vertShadeShift,#vertShadeShift1').val(urlParameters.vertShadeShift);
	}	
	if (typeof urlParameters.vertShadeShift3 !== 'undefined') {
		$('#vertShadeShift3').val(urlParameters.vertShadeShift3);
	}	

	if (typeof urlParameters.vertShadeDist !== 'undefined') {
		$('#vertShadeDist,#vertShadeDist1').val(urlParameters.vertShadeDist);
	}	
	if (typeof urlParameters.vertShadeDist3 !== 'undefined') {
		$('#vertShadeDist3').val(urlParameters.vertShadeDist3);
	}	

	// if (typeof urlParameters.vertShadeOn !== 'undefined') {
	// 	$('#vertShadeOn,#vertShadeOn1').val(urlParameters.vertShadeOn);
	// }	
	// if (typeof urlParameters.vertShadeOn3 !== 'undefined') {
	// 	$('#vertShadeOn3').val(urlParameters.vertShadeOn3);
	// }	
	if (urlParameters.vertShadeOn != '') {
		$("#vertShadeOn,#vertShadeOn1").val(urlParameters.vertShadeOn);
		$("#vertShadeOn,#vertShadeOn1").removeClass("inactive");
		$("#vertShadeOnLabel, #vertShadeOnLabel1").removeClass("inactive");
		$("#checkvertShadeOn, #checkvertShadeOn1").removeClass("unselected");
	}
	if (urlParameters.vertShadeOn3 != '') {
		$("#vertShadeOn3").val(urlParameters.vertShadeOn3);
		$("#vertShadeOn3").removeClass("inactive");
		$("#vertShadeOnLabel3").removeClass("inactive");
		$("#checkvertShadeOn3").removeClass("unselected");
	}

	if (typeof urlParameters.vertShadeHeight !== 'undefined') {
		$('#vertShadeHeight,#vertShadeHeight1').val(parseInt(urlParameters.vertShadeHeight));
	}	
	if (typeof urlParameters.vertShadeHeight3 !== 'undefined') {
		$('#vertShadeHeight3').val(parseInt(urlParameters.vertShadeHeight3));
	}	

	if (typeof urlParameters.vertShadeScale !== 'undefined') {
		$('#vertShadeScale,#vertShadeScale1').val(parseInt(urlParameters.vertShadeScale));
	}
	if (typeof urlParameters.vertShadeScale3 !== 'undefined') {
		$('#vertShadeScale3').val(parseInt(urlParameters.vertShadeScale3));
	}
}


// show all cases
if (urlParameters.case1 == 'show' && urlParameters.case2 == 'show' &&  urlParameters.case3 == 'show') {

	showCase2();
	showCase3();
	//sizeButton();


    if (typeof urlParameters.month != 'undefined') {
		$("#month").val(urlParameters.month);
	}
	if (typeof urlParameters.month2 != 'undefined') {
		$("#month1").val(urlParameters.month2);
	}
	if (typeof urlParameters.month3 != 'undefined') {
		$("#month3").val(urlParameters.month3);
	}

	if (typeof urlParameters.day !== 'undefined') {
		$('#day').val(parseInt(urlParameters.day));
	}
	if (typeof urlParameters.day2 !== 'undefined') {
		$('#day1').val(parseInt(urlParameters.day2));
	}
	if (typeof urlParameters.day3 !== 'undefined') {
		$('#day3').val(parseInt(urlParameters.day3));
	}

	if (typeof urlParameters.hour !== 'undefined') {
		$('#hour').val(parseInt(urlParameters.hour));
	}
	if (typeof urlParameters.hour2 !== 'undefined') {
		$('#hour1').val(parseInt(urlParameters.hour2));
	}
	if (typeof urlParameters.hour3 !== 'undefined') {
		$('#hour3').val(parseInt(urlParameters.hour3));
	}

	if (typeof urlParameters.timeStep !== 'undefined') {
		$('#timeStep').val(parseInt(urlParameters.timeStep));
	}
	if (typeof urlParameters.timeStep2 !== 'undefined') {
		$('#timeStep1').val(parseInt(urlParameters.timeStep2));
	}
	if (typeof urlParameters.timeStep3 !== 'undefined') {
		$('#timeStep3').val(parseInt(urlParameters.timeStep3));
	}

	if (typeof urlParameters.long !== 'undefined') {
		$('#long').val(parseInt(urlParameters.long));
	}
	if (typeof urlParameters.long2 !== 'undefined') {
		$('#long1').val(parseInt(urlParameters.long2));
	}
	if (typeof urlParameters.long3 !== 'undefined') {
		$('#long3').val(parseInt(urlParameters.long3));
	}

	if (typeof urlParameters.lat !== 'undefined') {
		$('#lat').val(parseInt(urlParameters.lat));
	}
	if (typeof urlParameters.lat2 !== 'undefined') {
		$('#lat1').val(parseInt(urlParameters.lat2));
	}
	if (typeof urlParameters.lat3 !== 'undefined') {
		$('#lat3').val(parseInt(urlParameters.lat3));
	}

	if (typeof urlParameters.timeZone !== 'undefined') {
		$('#timeZone').val(parseInt(urlParameters.timeZone));
	}
	if (typeof urlParameters.timeZone2 !== 'undefined') {
		$('#timeZone1').val(parseInt(urlParameters.timeZone2));
	}
	if (typeof urlParameters.timeZone3 !== 'undefined') {
		$('#timeZone3').val(parseInt(urlParameters.timeZone3));
	}

	if (typeof urlParameters.outdoorTemp !== 'undefined') {
		$('#outdoorTemp').val(parseInt(urlParameters.outdoorTemp));
	}
	if (typeof urlParameters.outdoorTemp2 !== 'undefined') {
		$('#outdoorTemp1').val(parseInt(urlParameters.outdoorTemp2));
	}
	if (typeof urlParameters.outdoorTemp3 !== 'undefined') {
		$('#outdoorTemp3').val(parseInt(urlParameters.outdoorTemp3));
	}

	if (typeof urlParameters.airTemp !== 'undefined') {
		$('#airTemp').val(parseInt(urlParameters.airTemp));
	}
	if (typeof urlParameters.airTemp2 !== 'undefined') {
		$('#airTemp1').val(parseInt(urlParameters.airTemp2));
	}
	if (typeof urlParameters.airTemp3 !== 'undefined') {
		$('#airTemp3').val(parseInt(urlParameters.airTemp3));
	}

	if (typeof urlParameters.humidity !== 'undefined') {
		$('#humidity').val(parseInt(urlParameters.humidity));
	}
	if (typeof urlParameters.humidity2 !== 'undefined') {
		$('#humidity1').val(parseInt(urlParameters.humidity2));
	}
	if (typeof urlParameters.humidity3 !== 'undefined') {
		$('#humidity3').val(parseInt(urlParameters.humidity3));
	}

	if (typeof urlParameters.airSpeed !== 'undefined') {
		$('#airSpeed').val(parseInt(urlParameters.airSpeed));
	}
	if (typeof urlParameters.airSpeed2 !== 'undefined') {
		$('#airSpeed1').val(parseInt(urlParameters.airSpeed2));
	}
	if (typeof urlParameters.airSpeed3 !== 'undefined') {
		$('#airSpeed3').val(parseInt(urlParameters.airSpeed3));
	}

	if (typeof urlParameters.cloting !== 'undefined') {
		$('#cloting').val(urlParameters.cloting);
	}
	if (typeof urlParameters.cloting2 !== 'undefined') {
		$('#cloting1').val(urlParameters.cloting2);
	}
	if (typeof urlParameters.cloting3 !== 'undefined') {
		$('#cloting3').val(urlParameters.cloting3);
	}

	if (typeof urlParameters.metabolic !== 'undefined') {
		$('#metabolic').val(parseInt(urlParameters.metabolic));
	}
	if (typeof urlParameters.metabolic2 !== 'undefined') {
		$('#metabolic1').val(parseInt(urlParameters.metabolic2));
	}
	if (typeof urlParameters.metabolic3 !== 'undefined') {
		$('#metabolic3').val(parseInt(urlParameters.metabolic3));
	}

	if (typeof urlParameters.posture !== 'undefined') {
		$('#posture').val(urlParameters.posture);
	}
	if (typeof urlParameters.posture2 !== 'undefined') {
		$('#posture1').val(urlParameters.posture2);
	}
	if (typeof urlParameters.posture3 !== 'undefined') {
		$('#posture3').val(urlParameters.posture3);
	}

	if (typeof urlParameters.aveShortwave !== 'undefined') {
		$('#aveShortwave').val(urlParameters.aveShortwave);
	}
	if (typeof urlParameters.aveShortwave2 !== 'undefined') {
		$('#aveShortwave1').val(urlParameters.aveShortwave2);
	}
	if (typeof urlParameters.aveShortwave3 !== 'undefined') {
		$('#aveShortwave3').val(urlParameters.aveShortwave3);
	}

	if (typeof urlParameters.windowOrientation !== 'undefined') {
		$('#windowOrientation').val(urlParameters.windowOrientation);
	}
	if (typeof urlParameters.windowOrientation2 !== 'undefined') {
		$('#windowOrientation1').val(urlParameters.windowOrientation2);
	}
	if (typeof urlParameters.windowOrientation3 !== 'undefined') {
		$('#windowOrientation3').val(urlParameters.windowOrientation3);
	}

	if (typeof urlParameters.ceiling !== 'undefined') {
		$('#ceiling').val(parseInt(urlParameters.ceiling));
	}
	if (typeof urlParameters.ceiling2 !== 'undefined') {
		$('#ceiling1').val(parseInt(urlParameters.ceiling2));
	}
	if (typeof urlParameters.ceiling3 !== 'undefined') {
		$('#ceiling3').val(parseInt(urlParameters.ceiling3));
	}

	if (typeof urlParameters.gridHeight !== 'undefined') {
		$('#gridHeight').val(urlParameters.gridHeight);
	}
	if (typeof urlParameters.gridHeight2 !== 'undefined') {
		$('#gridHeight1').val(urlParameters.gridHeight2);
	}
	if (typeof urlParameters.gridHeight3 !== 'undefined') {
		$('#gridHeight3').val(urlParameters.gridHeight3);
	}

	if (typeof urlParameters.wallDep !== 'undefined') {
		$('#wallDep').val(Math.floor(parseInt(urlParameters.wallDep)));
	}
	if (typeof urlParameters.wallDep2 !== 'undefined') {
		$('#wallDep1').val(Math.floor(parseInt(urlParameters.wallDep2)));
	}
	if (typeof urlParameters.wallDep3 !== 'undefined') {
		$('#wallDep3').val(Math.floor(parseInt(urlParameters.wallDep3)));
	}

	if (typeof urlParameters.wallLen !== 'undefined') {
		$('#wallLen').val(Math.floor(parseInt(urlParameters.wallLen)));
	}
	if (typeof urlParameters.wallLen2 !== 'undefined') {
		$('#wallLen1').val(Math.floor(parseInt(urlParameters.wallLen2)));
	}
	if (typeof urlParameters.wallLen3 !== 'undefined') {
		$('#wallLen3').val(Math.floor(parseInt(urlParameters.wallLen3)));
	}

	if (typeof urlParameters.wallR !== 'undefined') {
		$('#wallR').val(parseInt(urlParameters.wallR));
	}
	if (typeof urlParameters.wallR2 !== 'undefined') {
		$('#wallR1').val(parseInt(urlParameters.wallR2));
	}
	if (typeof urlParameters.wallR3 !== 'undefined') {
		$('#wallR3').val(parseInt(urlParameters.wallR3));
	}

	if (typeof urlParameters.windowHeight !== 'undefined') {
		$('#windowHeight').val(parseInt(urlParameters.windowHeight));
	}
	if (typeof urlParameters.windowHeight2 !== 'undefined') {
		$('#windowHeight1').val(parseInt(urlParameters.windowHeight2));
	}
	if (typeof urlParameters.windowHeight3 !== 'undefined') {
		$('#windowHeight3').val(parseInt(urlParameters.windowHeight3));
	}

	if (typeof urlParameters.sill !== 'undefined') {
		$('#sill').val(parseInt(urlParameters.sill));
	}
	if (typeof urlParameters.sill2 !== 'undefined') {
		$('#sill1').val(parseInt(urlParameters.sill2));
	}
	if (typeof urlParameters.sill3 !== 'undefined') {
		$('#sill3').val(parseInt(urlParameters.sill3));
	}

	if (typeof urlParameters.windowWidth !== 'undefined') {
		$('#windowWidth').val(parseInt(urlParameters.windowWidth));
	}
	if (typeof urlParameters.windowWidth2 !== 'undefined') {
		$('#windowWidth1').val(parseInt(urlParameters.windowWidth2));
	}
	if (typeof urlParameters.windowWidth3 !== 'undefined') {
		$('#windowWidth3').val(parseInt(urlParameters.windowWidth3));
	}

	if (typeof urlParameters.glzRatio !== 'undefined') {
		$('#glzRatio').val(urlParameters.glzRatio);
	}
	if (typeof urlParameters.glzRatio2 !== 'undefined') {
		$('#glzRatio1').val(urlParameters.glzRatio2);
	}
	if (typeof urlParameters.glzRatio3 !== 'undefined') {
		$('#glzRatio3').val(urlParameters.glzRatio3);
	}

	if (typeof urlParameters.distanceWindows !== 'undefined') {
		$('#distanceWindows').val(urlParameters.distanceWindows);
	}
	if (typeof urlParameters.distanceWindows2 !== 'undefined') {
		$('#distanceWindows1').val(urlParameters.distanceWindows2);
	}
	if (typeof urlParameters.distanceWindows3 !== 'undefined') {
		$('#distanceWindows3').val(urlParameters.distanceWindows3);
	}

	if (typeof urlParameters.windowU !== 'undefined') {
		$('#windowU').val(parseInt(urlParameters.windowU));
	}
	if (typeof urlParameters.windowU2 !== 'undefined') {
		$('#windowU1').val(parseInt(urlParameters.windowU2));
	}
	if (typeof urlParameters.windowU3 !== 'undefined') {
		$('#windowU3').val(parseInt(urlParameters.windowU3));
	}

	if (typeof urlParameters.solarHeatGainCo !== 'undefined') {
		$('#solarHeatGainCo').val(urlParameters.solarHeatGainCo);
	}
	if (typeof urlParameters.solarHeatGainCo2 !== 'undefined') {
		$('#solarHeatGainCo1').val(urlParameters.solarHeatGainCo2);
	}
	if (typeof urlParameters.solarHeatGainCo3 !== 'undefined') {
		$('#solarHeatGainCo3').val(urlParameters.solarHeatGainCo3);
	}

	if (typeof urlParameters.horzShadeDep2 !== 'undefined') {
		$('#horzShadeDep').val(urlParameters.horzShadeDep);
	}
	if (typeof urlParameters.horzShadeDep2 !== 'undefined') {
		$('#horzShadeDep1').val(urlParameters.horzShadeDep2);
	}
	if (typeof urlParameters.horzShadeDep3 !== 'undefined') {
		$('#horzShadeDep3').val(urlParameters.horzShadeDep3);
	}

	if (typeof urlParameters.horzShadeNum !== 'undefined') {
		$('#horzShadeNum').val(urlParameters.horzShadeNum);
	}
	if (typeof urlParameters.horzShadeNum2 !== 'undefined') {
		$('#horzShadeNum1').val(urlParameters.horzShadeNum2);
	}
	if (typeof urlParameters.horzShadeNum3 !== 'undefined') {
		$('#horzShadeNum3').val(urlParameters.horzShadeNum3);
	}

	if (typeof urlParameters.horzShadeSpace !== 'undefined') {
		$('#horzShadeSpace').val(urlParameters.horzShadeSpace);
	}
	if (typeof urlParameters.horzShadeSpace2 !== 'undefined') {
		$('#horzShadeSpace1').val(urlParameters.horzShadeSpace2);
	}
	if (typeof urlParameters.horzShadeSpace3 !== 'undefined') {
		$('#horzShadeSpace3').val(urlParameters.horzShadeSpace3);
	}

	if (typeof urlParameters.horzShadeDist !== 'undefined') {
		$('#horzShadeDist').val(urlParameters.horzShadeDist);
	}
	if (typeof urlParameters.horzShadeDist2 !== 'undefined') {
		$('#horzShadeDist1').val(urlParameters.horzShadeDist2);
	}
	if (typeof urlParameters.horzShadeDist3 !== 'undefined') {
		$('#horzShadeDist3').val(urlParameters.horzShadeDist3);
	}

	if (typeof urlParameters.horzShadeHeight !== 'undefined') {
		$('#horzShadeHeight').val(urlParameters.horzShadeHeight);
	}
	if (typeof urlParameters.horzShadeHeight2 !== 'undefined') {
		$('#horzShadeHeight1').val(urlParameters.horzShadeHeight2);
	}
	if (typeof urlParameters.horzShadeHeight3 !== 'undefined') {
		$('#horzShadeHeight3').val(urlParameters.horzShadeHeight3);
	}

	if (typeof urlParameters.horzShadeAngle !== 'undefined') {
		$('#horzShadeAngle').val(urlParameters.horzShadeAngle);
	}
	if (typeof urlParameters.horzShadeAngle2 !== 'undefined') {
		$('#horzShadeAngle1').val(urlParameters.horzShadeAngle2);
	}
	if (typeof urlParameters.horzShadeAngle3 !== 'undefined') {
		$('#horzShadeAngle3').val(urlParameters.horzShadeAngle3);
	}

	if (typeof urlParameters.vertShadeDep !== 'undefined') {
		$('#vertShadeDep').val(urlParameters.vertShadeDep);
	}
	if (typeof urlParameters.vertShadeDep2 !== 'undefined') {
		$('#vertShadeDep1').val(urlParameters.vertShadeDep2);
	}
	if (typeof urlParameters.vertShadeDep3 !== 'undefined') {
		$('#vertShadeDep3').val(urlParameters.vertShadeDep3);
	}

	if (typeof urlParameters.vertShadeNum !== 'undefined') {
		$('#vertShadeNum').val(urlParameters.vertShadeNum);
	}
	if (typeof urlParameters.vertShadeNum2 !== 'undefined') {
		$('#vertShadeNum1').val(urlParameters.vertShadeNum2);
	}
	if (typeof urlParameters.vertShadeNum3 !== 'undefined') {
		$('#vertShadeNum3').val(urlParameters.vertShadeNum3);
	}

	if (typeof urlParameters.vertShadeSpace !== 'undefined') {
		$('#vertShadeSpace').val(urlParameters.vertShadeSpace);
	}
	if (typeof urlParameters.vertShadeSpace2 !== 'undefined') {
		$('#vertShadeSpace1').val(urlParameters.vertShadeSpace2);
	}
	if (typeof urlParameters.vertShadeSpace3 !== 'undefined') {
		$('#vertShadeSpace3').val(urlParameters.vertShadeSpace3);
	}

	if (typeof urlParameters.vertShadeStart !== 'undefined') {
		$('#vertShadeStart').val(urlParameters.vertShadeStart);
	}
	if (typeof urlParameters.vertShadeStart2 !== 'undefined') {
		$('#vertShadeStart1').val(urlParameters.vertShadeStart2);
	}
	if (typeof urlParameters.vertShadeStart3 !== 'undefined') {
		$('#vertShadeStart3').val(urlParameters.vertShadeStart3);
	}

	if (typeof urlParameters.vertShadeShift !== 'undefined') {
		$('#vertShadeShift').val(urlParameters.vertShadeShift);
	}	
	if (typeof urlParameters.vertShadeShift2 !== 'undefined') {
		$('#vertShadeShift1').val(urlParameters.vertShadeShift2);
	}	
	if (typeof urlParameters.vertShadeShift3 !== 'undefined') {
		$('#vertShadeShift3').val(urlParameters.vertShadeShift3);
	}	

	if (typeof urlParameters.vertShadeDist !== 'undefined') {
		$('#vertShadeDist').val(urlParameters.vertShadeDist);
	}	
	if (typeof urlParameters.vertShadeDist2 !== 'undefined') {
		$('#vertShadeDist1').val(urlParameters.vertShadeDist2);
	}	
	if (typeof urlParameters.vertShadeDist3 !== 'undefined') {
		$('#vertShadeDist3').val(urlParameters.vertShadeDist3);
	}	

	// if (typeof urlParameters.vertShadeOn !== 'undefined') {
	// 	$('#vertShadeOn').val(urlParameters.vertShadeOn);
	// }	
	// if (typeof urlParameters.vertShadeOn2 !== 'undefined') {
	// 	$('#vertShadeOn1').val(urlParameters.vertShadeOn2);
	// }	
	// if (typeof urlParameters.vertShadeOn3 !== 'undefined') {
	// 	$('#vertShadeOn3').val(urlParameters.vertShadeOn3);
	// }	
	if (urlParameters.vertShadeOn != '') {
		$("#vertShadeOn").val(urlParameters.vertShadeOn);
		$("#vertShadeOn").removeClass("inactive");
		$("#vertShadeOnLabel").removeClass("inactive");
		$("#checkvertShadeOn").removeClass("unselected");
	}
	if (urlParameters.vertShadeOn2 != '') {
		$("#vertShadeOn1").val(urlParameters.vertShadeOn2);
		$("#vertShadeOn1").removeClass("inactive");
		$("#vertShadeOnLabel1").removeClass("inactive");
		$("#checkvertShadeOn1").removeClass("unselected");
	}
	if (urlParameters.vertShadeOn3 != '') {
		$("#vertShadeOn3").val(urlParameters.vertShadeOn3);
		$("#vertShadeOn3").removeClass("inactive");
		$("#vertShadeOnLabel3").removeClass("inactive");
		$("#checkvertShadeOn3").removeClass("unselected");
	}

	if (typeof urlParameters.vertShadeHeight !== 'undefined') {
		$('#vertShadeHeight').val(parseInt(urlParameters.vertShadeHeight));
	}	
	if (typeof urlParameters.vertShadeHeight2 !== 'undefined') {
		$('#vertShadeHeight1').val(parseInt(urlParameters.vertShadeHeight2));
	}	
	if (typeof urlParameters.vertShadeHeight3 !== 'undefined') {
		$('#vertShadeHeight3').val(parseInt(urlParameters.vertShadeHeight3));
	}	

	if (typeof urlParameters.vertShadeScale !== 'undefined') {
		$('#vertShadeScale').val(parseInt(urlParameters.vertShadeScale));
	}
	if (typeof urlParameters.vertShadeScale2 !== 'undefined') {
		$('#vertShadeScale1').val(parseInt(urlParameters.vertShadeScale2));
	}
	if (typeof urlParameters.vertShadeScale3 !== 'undefined') {
		$('#vertShadeScale3').val(parseInt(urlParameters.vertShadeScale3));
	}
}


function showCase2() {
	$("#caseSelection #maincasetwobutton").removeClass("button1OFF");
	$("#case2Heading").removeClass("greyText").addClass("case2Text");
    $("#case2Button").removeClass("button1OFF");

    $("#inputs input.case2, div.case2, #sliderWrapper2, .connectLine2, .dotCase2, .occdot2").css("display","inline-block");
	$("hr.case2").css("display","block");
}

function showCase3() {
	$("#caseSelection #case3Label").removeClass("unselected");
	$("#case3Heading").removeClass("greyText").addClass("case3Text");
    $("#case3Button").removeClass("unselected");

    $("#inputs input.case3, div.case3, #sliderWrapper3, .connectLine3, .dotCase3, .occdot3").css("display","inline-block");
	$("hr.case3").css("display","block");
}

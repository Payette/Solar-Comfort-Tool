// Inputs

let Hour = 10.5;



let Lon = document.getElementById("long").value;
document.getElementsByName("long")[0].addEventListener('change', reload);
document.getElementsByName("long")[0].addEventListener('change', refresh);


let Lat = document.getElementById("lat").value;
document.getElementsByName("lat")[0].addEventListener('change', reload);
document.getElementsByName("lat")[0].addEventListener('change', refresh);

let TimeZone = document.getElementById("timeZone").value;
document.getElementsByName("timeZone")[0].addEventListener('change', reload);
document.getElementsByName("timeZone")[0].addEventListener('change', refresh);



let Day = document.getElementById("day").value;
document.getElementsByName("day")[0].addEventListener('change', reload);
document.getElementsByName("day")[0].addEventListener('change', refresh);

let Month = document.getElementById("mon").value;
document.getElementsByName("mon")[0].addEventListener('change', reload);
document.getElementsByName("mon")[0].addEventListener('change', refresh);

let timestep = document.getElementById("timeStep").value;
document.getElementsByName("timeStep")[0].addEventListener('change', reload);
document.getElementsByName("timeStep")[0].addEventListener('change', refresh);



// Sunpath


  refresh();

  function refresh() {

    Hour = 10.5;


    Lon = document.getElementById("long").value;
    document.getElementsByName("long")[0].addEventListener('change', reload);
    document.getElementsByName("long")[0].addEventListener('change', refresh);

    Lat = document.getElementById("lat").value;
    document.getElementsByName("lat")[0].addEventListener('change', reload);
    document.getElementsByName("lat")[0].addEventListener('change', refresh);

    TimeZone = document.getElementById("timeZone").value;
    document.getElementsByName("timeZone")[0].addEventListener('change', reload);
    document.getElementsByName("timeZone")[0].addEventListener('change', refresh);


    Day = document.getElementById("day").value;
    document.getElementsByName("day")[0].addEventListener('change', reload);
    document.getElementsByName("day")[0].addEventListener('change', refresh);

    Month = document.getElementById("mon").value;
    document.getElementsByName("mon")[0].addEventListener('change', reload);
    document.getElementsByName("mon")[0].addEventListener('change', refresh);

    timestep = document.getElementById("timeStep").value;
    document.getElementsByName("timeStep")[0].addEventListener('change', reload);
    document.getElementsByName("timeStep")[0].addEventListener('change', refresh);




    console.log(Lon + " " + Lat + " " + TimeZone);







  var solar = solarCalculator([Lon, Lat]);







    offset = (new Date().getTimezoneOffset())/60
    var dates = []
    for (i = 1; i <= 24*timestep; i++) {
        hour = i/timestep
        dates.push(new Date(2000, Month-1, Day, hour - TimeZone - offset, (hour%parseInt(hour))*60))
      }//console.log(dates);

    now = new Date(2000, Month-1, Day, Hour - TimeZone - offset, (Hour%parseInt(Hour))*60)
    start = d3.time.day.floor(now)
    end = d3.time.day.offset(start, 1)

    var coordinates = [];
     for (i = 1; i <= (24*timestep)-1; i++) {
    coordinates.push(solarCalculator([Lon,Lat]).position(dates[i]));
     }

    //console.log(coordinates);

  }


	offset = (new Date().getTimezoneOffset())/60
	var dates = []
	for (i = 1; i <= 24*timestep; i++) {
			hour = i/timestep
			dates.push(new Date(2000, Month-1, Day, hour - TimeZone - offset, (hour%parseInt(hour))*60))
		}//console.log(dates);

	now = new Date(2000, Month-1, Day, Hour - TimeZone - offset, (Hour%parseInt(Hour))*60)
	start = d3.time.day.floor(now)
	end = d3.time.day.offset(start, 1)

	var coordinates = [];
	 for (i = 1; i <= (24*timestep)-1; i++) {
	coordinates.push(solarCalculator([Lon,Lat]).position(dates[i]));
	 }

	//console.log(coordinates);

	function SunPositions(){
		return coordinates;
	}

  //console.log(coordinates);
  //console.log(123);

function flippedStereographic(λ, φ)  {
  var cosλ = Math.cos(λ),
      cosφ = Math.cos(φ),
      k = 1 / (1 + cosλ * cosφ);
  return [
    k * cosφ * Math.sin(λ),
    -k * Math.sin(φ)
  ];
	}


// Get inputs

    var Width = 5;
    var Height = 15;
    var WX = 4;
    var WY = 2;


    $("#width").on("input", function(event) {
      Width = parseFloat($(this).val());
      $("#widthoutput").text(Width.toString() + 'ft');
      //windowExtrusions = updateWinDim()
      //sunResult = threeDIntersect(sunVecs, pointGrid, windowExtrusions, [], 1/timestep)
      //updateChart(sunResult)
    });
    $("#height").on("input", function(event) {
      Height = parseFloat($(this).val());
      $("#heightoutput").text(Height.toString() + 'ft');
      //windowExtrusions = updateWinDim()
      //sunResult = threeDIntersect(sunVecs, pointGrid, windowExtrusions, [], 1/timestep)
      //updateChart(sunResult)
    });
    $("#wx").on("input", function(event) {
      WX = parseFloat($(this).val());
      $("#xoutput").text(WX.toString() + 'ft');
      //windowExtrusions = updateWinDim()
      //sunResult = threeDIntersect(sunVecs, pointGrid, windowExtrusions, [], 1/timestep)
      //updateChart(sunResult)
    });
    $("#wy").on("input", function(event) {
      WY = parseFloat($(this).val());
      $("#youtput").text(WY.toString() + 'ft');
      //windowExtrusions = updateWinDim()
      //sunResult = threeDIntersect(sunVecs, pointGrid, windowExtrusions, [], 1/timestep)
      //updateChart(sunResult)
    });

		// Function to update sun vectors.
    var updateSunVecs = function (solarObj, Mon, Day){
      // Convert sphereical to cartesian.
      var RAD2DEG = 180 / Math.PI
      var DEG2RAD = Math.PI / 180
      function polarToCartesian(lon, lat) {
        var phi = ( 90 - lat ) * DEG2RAD
        var theta = ( -lon ) * DEG2RAD

        return {
          x: -(Math.sin(phi) * Math.sin(theta)),
          y: Math.sin(phi) * Math.cos(theta),
          z: Math.cos(phi),
        }
      }

      var dates = []
      var sunvecs = []
      for (i = 1; i <= 24*timestep; i++) {
        hour = i/timestep
        dates.push(new Date(2000, Mon-1, Day, hour - TimeZone - offset, (hour%parseInt(hour))*60))
      }

      for (i = 0; i < dates.length; i++) {
        var posit = solarObj.position(dates[i])
        if (posit[1] > 0){
          sunvecs.push(polarToCartesian(posit[0], posit[1]))
        }
      }
      return sunvecs
    }

// Function to update window dimensions.

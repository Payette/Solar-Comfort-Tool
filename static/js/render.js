//var jsonObj = JSON.parse(LocationData);
//console.log(jsonObj.AFRICA);
var designTemp;
var designTemp1;
var designTemp2;

// show Outdoor Temprature in modal alert
    $(".optionButton#CitySearch").click(function(event) {
    var searchedTemperature = $("#outdoortemp").val();

    $("#Outdoorpop textarea").empty();
    $("#Outdoorpop textarea").append(searchedTemperature);

    $("#Outdoorpop").dialog("open");
  })



  // SEARCHING FOR OUTDOOR DESIGN TEMPERATURE //

  document.getElementById("continent").addEventListener('change', relawd);

function relawd () {

      // Grab the  dropdown menus.
      var contryDropdown = document.getElementById("country")
      var stateDropdown = document.getElementById("state")
      var cityDropdown = document.getElementById("city")

      // Clear out any old values.
      for(var i = contryDropdown.options.length - 1 ; i >= 0 ; i--) {
          contryDropdown.remove(i);
      }
      for(var i = stateDropdown.options.length - 1 ; i >= 0 ; i--) {
          stateDropdown.remove(i);
      }
      for(var i = cityDropdown.options.length - 1 ; i >= 0 ; i--) {
          cityDropdown.remove(i);
      }

      // Disable and enable the right form elements.
      contryDropdown.disabled=false
      stateDropdown.disabled=true
      cityDropdown.disabled=true
      document.getElementById("outTempTextArea").disabled=true
      if ($("#countryDiv").hasClass("empty") == true) {
        $("#countryDiv").removeClass("empty");
        $("#countryDiv").addClass("dropdown");
      }
      if ($("#stateDiv").hasClass("empty") == false) {
        $("#stateDiv").removeClass("dropdown");
        $("#stateDiv").addClass("empty");
      }
      if ($("#cityDiv").hasClass("empty") == false) {
        $("#cityDiv").removeClass("dropdown");
        $("#cityDiv").addClass("empty");
      }
      if ($("#outTempDiv").hasClass("temperatureEmpty") == false) {
        $("#outTempDiv").removeClass("temperature");
        $("#outTempDiv").addClass("temperatureEmpty");
      }
      document.getElementById("Apply").disabled=true
      if ($("#Apply").hasClass("activeButton") == true) {
        $("#Apply").removeClass("activeButton");
      }
      document.getElementById("outTempTextArea").disabled=true

      // Add values for the current continent.
      var selCont = $(this).val();
      var option = document.createElement("option");
      option.text = "Select";
      contryDropdown.add(option);
      var contSubset = jsonObj[selCont.toUpperCase()]
      for (var countr in contSubset) {
        var option = document.createElement("option");
        option.text = countr;
        contryDropdown.add(option);
      }
    }

    // Detect when a country is selected.
    $("#country").on("change", function(event) {
      // Grab the  dropdown menus.
      var stateDropdown = document.getElementById("state")
      var cityDropdown = document.getElementById("city")

      // Clear out any old values.
      for(var i = stateDropdown.options.length - 1 ; i >= 0 ; i--) {
          stateDropdown.remove(i);
      }
      for(var i = cityDropdown.options.length - 1 ; i >= 0 ; i--) {
          cityDropdown.remove(i);
      }

      // Check to see if there are any provinces/states in the country.
      var selCont = $("#continent").val();
      var selNation = $(this).val();
      var countSubset = jsonObj[selCont.toUpperCase()][selNation]

      if (Object.keys(countSubset).length == 1){
        var theState = Object.keys(countSubset)[0];
        var option = document.createElement("option");
        option.text = theState;
        stateDropdown.add(option);
        stateDropdown.disabled=true
        if ($("#stateDiv").hasClass("empty") == false) {
          $("#stateDiv").removeClass("dropdown");
          $("#stateDiv").addClass("empty");
        }

        cityDropdown.disabled=false
        if ($("#cityDiv").hasClass("empty") == true) {
          $("#cityDiv").removeClass("empty");
          $("#cityDiv").addClass("dropdown");
        }

        var option = document.createElement("option");
        option.text = "Select";
        cityDropdown.add(option);
        var stateSubset = countSubset[theState]
        for (var city in stateSubset) {
          var option = document.createElement("option");
          option.text = city;
          cityDropdown.add(option);
        }

      } else {
        var stateDropdown = document.getElementById("state")
        stateDropdown.disabled=false
        if ($("#stateDiv").hasClass("empty") == true) {
          $("#stateDiv").removeClass("empty");
          $("#stateDiv").addClass("dropdown");
        }
        document.getElementById("city").disabled=true
        if ($("#cityDiv").hasClass("empty") == false) {
          $("#cityDiv").removeClass("dropdown");
          $("#cityDiv").addClass("empty");
        }
        // Clear out any old values.
        for(var i = stateDropdown.options.length - 1 ; i >= 0 ; i--) {
            stateDropdown.remove(i);
        }

        var option = document.createElement("option");
        option.text = "Select";
        stateDropdown.add(option);
        for (var state in countSubset) {
          var option = document.createElement("option");
          option.text = state;
          stateDropdown.add(option);
        }
      }
      document.getElementById("outTempTextArea").disabled=true
      if ($("#outTempDiv").hasClass("temperatureEmpty") == false) {
        $("#outTempDiv").removeClass("temperature");
        $("#outTempDiv").addClass("temperatureEmpty");
      }
      document.getElementById("Apply").disabled=true
      if ($("#Apply").hasClass("activeButton") == true) {
        $("#Apply").removeClass("activeButton");
      }
    })


    // Detect when a state is selected.
    $("#state").on("change", function(event) {
      // Grab the  dropdown menus.
      var cityDropdown = document.getElementById("city")

      // Clear out any old values.
      for(var i = cityDropdown.options.length - 1 ; i >= 0 ; i--) {
          cityDropdown.remove(i);
      }

      // Check to see if there are any provinces/states in the country.
      var selCont = $("#continent").val();
      var selNation = $("#country").val();
      var selState = $(this).val();
      var stateSubset = jsonObj[selCont.toUpperCase()][selNation][selState]

      cityDropdown.disabled=false
      if ($("#cityDiv").hasClass("empty") == true) {
        $("#cityDiv").removeClass("empty");
        $("#cityDiv").addClass("dropdown");
      }

      var option = document.createElement("option");
      option.text = "Select";
      cityDropdown.add(option);

      for (var city in stateSubset) {
        var option = document.createElement("option");
        option.text = city;
        cityDropdown.add(option);
      }
      document.getElementById("outTempTextArea").disabled=true
      if ($("#outTempDiv").hasClass("temperatureEmpty") == false) {
        $("#outTempDiv").removeClass("temperature");
        $("#outTempDiv").addClass("temperatureEmpty");
      }
      document.getElementById("Apply").disabled=true
      if ($("#Apply").hasClass("activeButton") == true) {
        $("#Apply").removeClass("activeButton");
      }
    })

    // Detect when a city is selected.
    $("#city").on("change", function(event) {
      // Find the design temperature.
      var selCont = $("#continent").val();
      var selNation = $("#country").val();
      var selState = $("#state").val();
      var selCity = $(this).val();
      designTemp = jsonObj[selCont.toUpperCase()][selNation][selState][selCity].lon
      designTemp1 = jsonObj[selCont.toUpperCase()][selNation][selState][selCity].lat
      designTemp2 = jsonObj[selCont.toUpperCase()][selNation][selState][selCity].tz
      // if (unitSys == "IP"){
      //   designTemp = (Math.round(units.C2F(designTemp)* 10) / 10)
      // }

      // Grab the temperature text menu.
      var designTempTexArea = document.getElementById("outTempTextArea")
      designTempTexArea.disabled=false
      var designTempTexArea1 = document.getElementById("outTempTextArea1")
      designTempTexArea1.disabled=false
      var designTempTexArea2 = document.getElementById("outTempTextArea2")
      designTempTexArea2.disabled=false
      if ($("#outTempDiv").hasClass("temperatureEmpty") == true) {
        $("#outTempDiv").removeClass("temperatureEmpty");
        $("#outTempDiv").addClass("temperature");
      }
      document.getElementById("Apply").disabled=false
      if ($("#Apply").hasClass("activeButton") == false) {
        $("#Apply").addClass("activeButton");
      }

      // Clear out any old values and add the correct temperature.
      $("#outTempTextArea").empty();
      $("#outTempTextArea").append(parseInt(designTemp));
      $("#outTempTextArea").select();
      $("#outTempTextArea1").empty();
      $("#outTempTextArea1").append(parseInt(designTemp1));
      $("#outTempTextArea1").select();
      $("#outTempTextArea2").empty();
      $("#outTempTextArea2").append(parseInt(designTemp2));
      $("#outTempTextArea2").select();
    })


    $("#Apply").click(function(event) {


      document.getElementById("long").value = parseInt(designTemp);
      document.getElementById("lat").value = parseInt(designTemp1);
      document.getElementById("timeZone").value = parseInt(designTemp2);
      document.getElementById("long1").value = parseInt(designTemp);
      document.getElementById("lat1").value = parseInt(designTemp1);
      document.getElementById("timeZone1").value = parseInt(designTemp2);


      $("#Outdoorpop").dialog("close");
    })

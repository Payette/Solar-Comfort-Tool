var coolingSTAT = window.SOLAR_COMFORT.COOLING_STAT;
var designTemp;
var designTemp1;
var designTemp2;

var urlParams = new URLSearchParams(window.location.search);
let debug = urlParams.get('debug') === 'true';
window.SOLAR_COMFORT.debug = debug;

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
  //var selMonth = Jan;
  designTemp = jsonObj[selCont.toUpperCase()][selNation][selState][selCity].lon
  designTemp1 = jsonObj[selCont.toUpperCase()][selNation][selState][selCity].lat
  designTemp2 = jsonObj[selCont.toUpperCase()][selNation][selState][selCity].tz
  
  designTempData = coolingSTAT && coolingSTAT[selCont.toUpperCase()] && coolingSTAT[selCont.toUpperCase()][selNation] && coolingSTAT[selCont.toUpperCase()][selNation][selState][selCity]
  //designTempData1 = coolingSTAT && coolingSTAT[selCont.toUpperCase()] && coolingSTAT[selCont.toUpperCase()][selNation] && coolingSTAT[selCont.toUpperCase()][selNation][selState][selCity] && coolingSTAT[selCont.toUpperCase()][selNation][selState][selCity][selMonth]
  //console.log("designTempData,designTempData1")
  designTemp3 = undefined;
  if (typeof designTempData === 'object') {
    designTemp3 = parseFloat(designTempData.Jul);
    if (unitSys == "IP"){
      designTemp3 = (Math.round(units.C2F(designTempData.Jul)* 10) / 10)
    }
    $('#missingtemperature').addClass('errorhidden');

    $("#outTempTextArea3").append(parseFloat(designTemp3));
    $("#outTempTextArea3").select();  

    // var monthdic = {Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, Jul:7, Aug:8, Sept:9, Oct:10, Nov:11, Dec:12}; 
    // for (var key in monthdic) {
    //    designTempData.month = this.dataStore[selMonth];
    // }

    designTempData.month=7

    $("#outTempTextArea4").append(parseFloat(designTempData.month));
    $("#outTempTextArea4").select();  

    $("#outTempTextArea5").append(parseFloat(designTempData.dayOfMonth));
    $("#outTempTextArea5").select();  

  } else {
    $('#missingtemperature').removeClass('errorhidden');
    $("#outTempTextArea3").val('');
    $("#outTempTextArea3").select();  
    $("#outTempTextArea4").val('');
    $("#outTempTextArea4").select();  
    $("#outTempTextArea5").val('');
    $("#outTempTextArea5").select();  
  }

  // Grab the temperature text menu.
  var designTempTexArea = document.getElementById("outTempTextArea")
  designTempTexArea.disabled=false
  var designTempTexArea1 = document.getElementById("outTempTextArea1")
  designTempTexArea1.disabled=false
  var designTempTexArea2 = document.getElementById("outTempTextArea2")
  designTempTexArea2.disabled=false
  var designTempTexArea3 = document.getElementById("outTempTextArea3")
  designTempTexArea3.disabled=false
  var designTempTexArea4 = document.getElementById("outTempTextArea4")
  designTempTexArea4.disabled=false
  var designTempTexArea5 = document.getElementById("outTempTextArea5")
  designTempTexArea5.disabled=false
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


  if(typeof designTempData == 'object') {
    document.getElementById("outdoorTemp").value = parseFloat(designTemp3);
    document.getElementById("mon").value = parseFloat(designTempData.month);
    document.getElementById("day").value = 1;
    //document.getElementById("day").value = parseFloat(designTempData.dayOfMonth);
    document.getElementById("hour").value = 12;
  }

  

  $("#Outdoorpop").dialog("close");
})

$('#mon').on("change",function(){
  var selmon = $(this).val();
  if (selmon == 8){
    designTemp3 = parseFloat(designTempData.Aug);
    if (unitSys == "IP"){
      designTemp3 = (Math.round(units.C2F(designTempData.Aug)* 10) / 10);
    }
  }
  else if (selmon == 6){
    designTemp3 = parseFloat(designTempData.Jun);
    if (unitSys == "IP"){
      designTemp3 = (Math.round(units.C2F(designTempData.Jun)* 10) / 10);
    }
  }
  else if (selmon == 5){
    designTemp3 = parseFloat(designTempData.May);
    if (unitSys == "IP"){
      designTemp3 = (Math.round(units.C2F(designTempData.May)* 10) / 10)
    }
  }
  else if (selmon == 4){
    designTemp3 = parseFloat(designTempData.Apr);
    if (unitSys == "IP"){
      designTemp3 = (Math.round(units.C2F(designTempData.Apr)* 10) / 10)
    }
  }
  else if (selmon == 3){
    designTemp3 = parseFloat(designTempData.Mar);
    if (unitSys == "IP"){
      designTemp3 = (Math.round(units.C2F(designTempData.Mar)* 10) / 10)
    }
  }
  else if (selmon == 2){
    designTemp3 = parseFloat(designTempData.Feb);
    if (unitSys == "IP"){
      designTemp3 = (Math.round(units.C2F(designTempData.Feb)* 10) / 10)
    }
  }
  else if (selmon == 1){
    designTemp3 = parseFloat(designTempData.Jan);
    if (unitSys == "IP"){
      designTemp3 = (Math.round(units.C2F(designTempData.Jan)* 10) / 10)
    }
  }
  else if (selmon == 9){
    designTemp3 = parseFloat(designTempData.Sept);
    if (unitSys == "IP"){
      designTemp3 = (Math.round(units.C2F(designTempData.Sept)* 10) / 10)
    }
  }
  else if (selmon == 10){
    designTemp3 = parseFloat(designTempData.Oct);
    if (unitSys == "IP"){
      designTemp3 = (Math.round(units.C2F(designTempData.Oct)* 10) / 10)
    }
  }
  else if (selmon == 11){
    designTemp3 = parseFloat(designTempData.Nov);
    if (unitSys == "IP"){
      designTemp3 = (Math.round(units.C2F(designTempData.Nov)* 10) / 10)
    }
  }
  else {
    designTemp3 = parseFloat(designTempData.Dec);
    if (unitSys == "IP"){
      designTemp3 = (Math.round(units.C2F(designTempData.Dec)* 10) / 10)
    }
  }
  document.getElementById("outdoorTemp").value = parseFloat(designTemp3)
})

if ($("#dsDay").is(":checked")) {
  $("#hideTime").hide();
}

// Show/hide Hour, Time Step inputs when a study type is selected
$("#dsDay").on("change", function() {
  $("#hideTime").hide()
})

$("#ppdRadio, #dsHour").on("change", function() {
  $("#hideTime").show()
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Copy from CBE
let erf_inputs = {
  erf_tmrt: 25,
  erf_ta: 25,
  posture: "seated",
  alt: 45,
  az: 0,
  Idir: 700,
  tsol: 0.8,
  fsvv: 0.2,
  fbes: 0.5,
  asa: parseFloat($("#asa").val()),
};

var util = util || {};
util.STATIC_URL = "/static";

$(function () {
  $("#globedialog").dialog({
    autoOpen: false,
    height: 350,
    width: 400,
    modal: true,
    resizable: false,
    buttons: {
      "Set mean radiant temperature": function () {
        var tr = parseFloat($("#mrt-result").val());
        $("#tr").val(tr);
        $(this).dialog("close");
        update();
      },
    },
  });

  $("#ERFdialog").dialog({
    autoOpen: false,
    width: 600,
    modal: true,
    resizable: true,
    buttons: {
      Calculate: function () {
        for (let key in erf_inputs) {
          erf_inputs[key] = $("#" + key).val();
        }
        const r = ERF(
          erf_inputs.alt,
          erf_inputs.az,
          erf_inputs.posture,
          erf_inputs.Idir,
          erf_inputs.tsol,
          erf_inputs.fsvv,
          erf_inputs.fbes,
          erf_inputs.asa,
        );
        $("#erf-result").val(r.ERF.toFixed(1));
        // if (!isCelsius) r.dMRT = util.CtoF(r.dMRT) - 32;
        // if (unitSys == "IP") r.dMRT = util.C2F(r.dMRT) - 32;
        $("#dmrt-result").val(r.dMRT.toFixed(1));
      },
      
      // "Adjust MRT": function () {
      //   const dmrt = parseFloat($("#dmrt-result").val());
      //   if (!isNaN(dmrt)) {
      //     let mrt = parseFloat(erf_inputs.erf_tmrt);
      //     const t_a = parseFloat(erf_inputs.erf_ta);
      //     const chart = $("#chartSelect").val();

      //     // if the operative temperature is selected then I need to update its value else update only mrt temperature
      //     if (chart === "psychtop" || $("#link").is(":checked")) {
      //       const t_mrt = (mrt + dmrt).toFixed(1);
      //       let a;
      //       if (d.vel < 0.2) {
      //         a = 0.5;
      //       } else if (d.vel < 0.6) {
      //         a = 0.6;
      //       } else {
      //         a = 0.7;
      //       }
      //       $("#ta").val((a * t_a + (1 - a) * t_mrt).toFixed(1));
      //     } else {
      //       $("#tr").val((mrt + dmrt).toFixed(1));
      //       $("#ta").val(t_a.toFixed(1));
      //     }
      //     $(this).dialog("close");
      //     update();
      //   }
      // },
      // Help: function () {
      //   // window.location.href = "http://escholarship.org/uc/item/89m1h2dg";
      //   window.open(
      //     "http://escholarship.org/uc/item/89m1h2dg",
      //     "_blank" // <- This is what makes it open in a new window.
      //   );
      // },
      Close: function () {
        $(this).dialog("close");
      },
    },
  });

  // $("#localdialog").dialog({
  //   autoOpen: false,
  //   height: 900,
  //   width: 500,
  //   modal: true,
  //   resizable: false,
  // });

  // $("#radio").buttonset();

  // $("#customClo").click(function () {
  //   $("#customCloToggle").toggle("fast");
  // });

  // $("#dynamicClo").click(function () {
  //   $("#dynamicCloToggle").toggle("fast");
  // });

  // $("button").button();
  // $(".buttons").buttonset();

  // // create spinners and impose limits based on value defined in envValLimits
  // inputFields("ta");
  // inputFields("tr");
  // inputFields("vel");
  // inputFields("clo");
  // inputFields("met");
  // inputFields("rh");
  // inputFields("trm");

  // $("#save_state").click(function () {
  //   d["unit"] = isCelsius;
  //   localStorage.setItem("input_data", JSON.stringify(d));
  // });

  // $("#share_state").click(function () {
  //   d["unit"] = isCelsius;
  //   const dataExport = d;

  //   dataExport.chartSelection = $("#chartSelect").val();

  //   const b64p = btoa(JSON.stringify(d));
  //   const new_url = document.URL.split("?")[0] + "?" + b64p;
  //   window.prompt("Copy to clipboard: Ctrl+C (or Cmd+C on Apple/Mac)", new_url);
  // });

  // $("#reload_state").click(function () {
  //   // reload the value that have been saved in the memory
  //   const stored_values = JSON.parse(localStorage.getItem("input_data"));

  //   LoadData(stored_values);
  // });

  // const url_components = document.URL.split("?");
  // if (url_components.length > 1) {
  //   const stored_values = JSON.parse(atob(url_components[1]));

  //   LoadData(stored_values);
  // }
});

$("#ERF").click(function () {
  const container = $("#ERFdialog");
  $.ajax({
    url: util.STATIC_URL + "/erf.html",
    success: function (data) {
      $("#ERFdialog").html(data);
      for (let key in erf_inputs) {
        if (key === "erf_tmrt" && erf_inputs[key] == "") {
          $("#" + key).val($("#tr").val());
        } else if (key === "erf_ta" && erf_inputs[key] == "") {
          $("#" + key).val($("#ta").val());
        } else {
          $("#" + key).val(erf_inputs[key]);
        }
      }
      $("#posture").selectmenu({
        width: 90,
      });
    },
    async: false,
  });
  // if (unitSys == "IP") {
  //   $("#dmrt-unit").html("&deg;F");
  //   $("#erf-mrt-unit").html("&deg;F");
  //   $("#erf-ta-unit").html("&deg;F");
  // }
  container.dialog("open");
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Change Louvers Height inputs label style
if ($("input#vShadeOn").is(":checked")) {
  $("label[for=vShadeHeight]").css({"font-style": "italic"});
  $("label[for=vShadeHeight]").addClass("grey");
  $("label[for=vShadeScale]").css({"font-style": "italic"});
  $("label[for=vShadeScale]").addClass("grey");
}
$("input#vShadeOn, input#vShadeOn1").on("change", function() {
  if (!$("input#vShadeOn").is(":checked") || !$("input#vShadeOn1").is(":checked")) {
    $("label[for=vShadeHeight]").css({"font-style": "normal"});
    $("label[for=vShadeHeight]").removeClass("grey");
    $("label[for=vShadeScale]").css({"font-style": "normal"});
    $("label[for=vShadeScale]").removeClass("grey");
  } else {
    $("label[for=vShadeHeight]").css({"font-style": "italic"});
    $("label[for=vShadeHeight]").addClass("grey");
    $("label[for=vShadeScale]").css({"font-style": "italic"});
    $("label[for=vShadeScale]").addClass("grey");
  }
})

// EXPORT  INPUT DATA TO CSV FILE //
$(".optionButton#csv").click(function() {
  var csvContent = createCSV();
  var encodedUri = encodeURI(csvContent);
  var fileName = "SolarComfortInputs";

  downloadLink=document.createElement('a');
  downloadLink.textContent='download';
  downloadLink.download= fileName+".csv";
  downloadLink.href='data:text/csv;charset=utf-8,'+ encodedUri;
  downloadLink.target = "_blank"
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
});

function showCSVOnPage() {
  var csvContent = createCSV();
  
  let csvDiv=document.createElement('pre');
  csvDiv.setAttribute('id', 'debugcsv')
  csvDiv.textContent=csvContent;
  document.body.appendChild(csvDiv);
}

if(debug) {
  let debugButton=document.createElement('button');
  debugButton.setAttribute('id', 'debugbutton');
  debugButton.textContent="Print Debug";
  document.body.appendChild(debugButton);
  debugButtonEl = document.getElementById('debugbutton');
  debugButtonEl.addEventListener('click', () => {
    console.log('MRTGrid Case 1: ', window.SOLAR_COMFORT.MRTGrid);
    if(window.SOLAR_COMFORT.Case2Button === 1) {
      console.log('MRTGrid Case 2: ', window.SOLAR_COMFORT.MRTGrid1);
    }
  })

  let testingDoneButton=document.createElement('button');
  testingDoneButton.setAttribute('id', 'all_testing_inputs_set');
  testingDoneButton.textContent="Testing Code is Done Setting Inputs";
  document.body.appendChild(testingDoneButton);
  testingDoneButtonEl = document.getElementById('all_testing_inputs_set');
  testingDoneButtonEl.addEventListener('click', e => {
    e.target.classList.add('all_inputs_set');
  })

  function showCsvIfSimulationDone() {
    if($("#dsAnnual").is(":checked")) {
      // wait until annual simulation has completed
      // then wait a tad more, and grab our CSV export
      var annualDoneCheck = setInterval(function() {
        let simulationCase1Done = window.SOLAR_COMFORT.annualSimulationDone;
        let simulationCase2Done = window.SOLAR_COMFORT.Case2Button === 1 ? window.SOLAR_COMFORT.annualSimulationDone1 : true;

        if (simulationCase1Done && simulationCase2Done) {
          setTimeout(showCSVOnPage, 500);
          clearInterval(annualDoneCheck);
        }
     }, 5000);
    } else {
      showCSVOnPage();
    }
  }

  // wait for everything to load
  // wait for our tests to finish updating the UI inputs
  // then grab our CSV exports and display on the page
  var allInputsSet = setInterval(function() {
    testingDoneButtonEl = document.getElementById('all_testing_inputs_set');
    if(testingDoneButtonEl.classList.contains('all_inputs_set')) {
      clearInterval(allInputsSet);
      setTimeout(() => {
        showCsvIfSimulationDone();
      }, 250)
    }    
  }, 250)
}
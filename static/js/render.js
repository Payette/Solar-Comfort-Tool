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
  designTemp = jsonObj[selCont.toUpperCase()][selNation][selState][selCity].lon
  designTemp1 = jsonObj[selCont.toUpperCase()][selNation][selState][selCity].lat
  designTemp2 = jsonObj[selCont.toUpperCase()][selNation][selState][selCity].tz
  
  designTempData = coolingSTAT && coolingSTAT[selCont.toUpperCase()] && coolingSTAT[selCont.toUpperCase()][selNation] && coolingSTAT[selCont.toUpperCase()][selNation][selState][selCity]
  designTemp3 = undefined;
  if (typeof designTempData === 'object') {
    designTemp3 = parseFloat(designTempData.Jul);
    if (unitSys == "IP"){
      designTemp3 = (Math.round(units.C2F(designTempData.Jul)* 10) / 10)
    }
    $('#missingtemperature').addClass('errorhidden');

    $("#outTempTextArea3").append(parseFloat(designTemp3));
    $("#outTempTextArea3").select();  
    
    //set default as July data
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
    //document.getElementById("day").value = parseFloat(designTempData.dayOfMonth);
    document.getElementById("day").value = 1;
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



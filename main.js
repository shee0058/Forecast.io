//5a0cdae0012091663ebe0a2d6d164ba7
//https://api.forecast.io/forecast/5a0cdae0012091663ebe0a2d6d164ba7/45.348391,-75.757045

var scriptsLoaded = 0;
var loadCount;
document.addEventListener("DOMContentLoaded", function(){
  
  var css = document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("href", "main.css");	
  css.addEventListener("load", loadCount);
  document.querySelector("head").appendChild(css);
  var jq = document.createElement("script");
  jq.addEventListener("load", loadCount);
  jq.setAttribute("src","//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
  document.querySelector("head").appendChild(jq);
 
});

function buildWidget(cls){
  
     $.ajax({
         type:"GET",
         url:"https://api.forecast.io/forecast/5a0cdae0012091663ebe0a2d6d164ba7/45.348391,-75.757045",
         dataType:"jsonp",
     }).done(function(response){
         console.log(response);
         buildTable(response);
     })
     
}
          
      
function buildTable(response){
    var weatherForecast = $(".weatherForecast");
    var widget = $(".myWidget");
    var tableNew = $("<table>");
    var newDate = new Date(1000 * response.currently.time);
    var newDate2 = newDate.getHours();
    var countHour = 24 - newDate.getHours();
    var x =0;
    var tempP= response.hourly.data[x].apparentTemperature;
    console.log(tempP);
    
        $("<p>").text("Current conditions today,  " + (newDate.getDay() + 1) + "/" + (newDate.getMonth() + 1)).appendTo(weatherForecast);
        $("<p>").text("Temperature: " + tempP).appendTo(weatherForecast);
        tableNew.appendTo("body");
        $("<p>").text(response.hourly.data[x].summary).appendTo(weatherForecast);
    
    for (x =0; x < countHour; x++) {
            var newRow = $("<tr>");
            newRow.appendTo(tableNew);
        $("<td>").append(newDate2 + ":00").appendTo(newRow);
        newDate2++;
        $("<td>").text(response.hourly.data[x].humidity).appendTo(newRow);
        $("<td>").text(response.hourly.data[x].cloudCover).appendTo(newRow);
        $("<td>").text(response.hourly.data[x].windSpeed).appendTo(newRow);
        $("<td>").text(tempP).appendTo(newRow);
        tempP++;
        $("<td>").text(response.hourly.data[x].summary).appendTo(newRow);
    }
};

function loadCount(){
  scriptsLoaded++;
    if(scriptsLoaded === 2){
        buildWidget(".mywidget");
        console.log("both scripts loaded");    
    }
};           
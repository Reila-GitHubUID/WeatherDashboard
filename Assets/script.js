let inputCity = "";
// let selectCity = "";
let x = 8;

$(document).ready(function () { 
    // button event listener
    $("button").on("click", function(event) {
        event.preventDefault();
        inputCity = $(".searchCity").val();

        if (inputCity !== "") {
            // put and display previous searches
            addToList(inputCity);
            
            displayWeather(inputCity);
            displayForecast(inputCity);
            $(".searchCity").val("");
        }
    }); // ---- end of button click event listener

    function displayWeather(cityName){
        let url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&APPID=4c5b7de512dad1fed533c8bdb4858956";

        $.ajax({
            url,
            method: "GET"
        }).then (function(response) {
    
            let lat = response.coord.lat;
            let lon = response.coord.lon;
            
            let temp = response.main.temp;
            let humidity = response.main.humidity;
            let wind = response.wind.speed;

            let iconURL = response.weather[0].icon;
            let icon = "http://openweathermap.org/img/wn/" + iconURL + "@2x.png";
            
            // the line below is to get the UV Index
            let uvIndex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=4c5b7de512dad1fed533c8bdb4858956";

            $.ajax({
                url: uvIndex,
                method: "GET"
            }).then (function (r) {
                let dt = r.date_iso;
                let date = dt.split("T", 1);

                let uv = r.value;

                $(".city").text(cityName + "  (" + date + ") ").append($("<img>").attr("src", icon));
                $(".temp").text(temp+" °F");
                $(".humidity").text(humidity+"%");
                $(".wind").text(wind+" MPH");
                $(".uv").text(uv);
    


            });


        });
    } // ---- end of displayWeather function

    function displayForecast(cityName) {
        let $fiveDays = $(".fiveDays").empty();
        let fiveDaysAtNoon = [4, 12, 20, 28, 36];
        
        let url = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&APPID=4c5b7de512dad1fed533c8bdb4858956";
        $.ajax({
            url,
            method: "GET"
        }).then (function(response) {
            for (let i = 0; i<fiveDaysAtNoon.length; i++) {
                let fDate = response.list[fiveDaysAtNoon[i]].dt_txt;
                let forecastDate = fDate.split(" ", 1);
                let forecastIcon = response.list[fiveDaysAtNoon[i]].weather[0].icon;            
                let fIcon = "http://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";
                let forecastTemp = response.list[fiveDaysAtNoon[i]].main.temp;;
                let forecastHumidity = response.list[fiveDaysAtNoon[i]].main.humidity;
                
                let newDiv = $("<div>").addClass("col-2.4 forecast");
                newDiv.append($("<div>").text(forecastDate));
                newDiv.append($("<div>").append($("<img>").attr("src", fIcon)));
                newDiv.append($("<div>").text("Temp: " + forecastTemp + " °F"));
                newDiv.append($("<div>").text("Humidity: " + forecastHumidity + "%"));
                $fiveDays.append(newDiv);

            }
        });
    } // ---- end of displayForecast function


    function addToList(cityName) {
        let newDiv = $("<div>").addClass("history").text(cityName);
        $(".searchHistory").prepend(newDiv);
        
    } // ---- end of addToList function

    // row class listener
    $(".searchHistory").on("click", function(event) {        
        let clickVal = event.target.textContent;
        
        displayWeather(clickVal);
        displayForecast(clickVal);

    }); // ---- end of row class listener
});
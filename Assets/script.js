let inputCity = "";
let selectCity = "";

$(document).ready(function () { 
    // button event listener
    $("button").on("click", function(event) {
        console.log("click!!!!");
        inputCity = $(".searchCity").val();
        selectCity = inputCity;

        // put and display previous searches
        //localStorage.setItem(inputCity, url);   
        // addToList(inputCity);
        
        displayWeather(inputCity);
        displayForecast(inputCity);

        event.preventDefault();
    }); // ---- end of button click event listener

    function displayWeather(cityName){
        let url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&APPID=4c5b7de512dad1fed533c8bdb4858956";

        $.ajax({
            url,
            method: "GET"
        }).then (function(response) {
            console.log("success! Below is the response!!!");
            console.log(response);
            console.log("=================================");
    
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
                console.log(r);
                let date = r.date_iso;
                console.log("date=" + date);

                let uv = r.value;

                $(".city").text(selectCity + "  (" + date + ") ").append($("<img>").attr("src", icon));
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
            console.log("+++++++++++++++++++++++++++++++");
            console.log(response);

            for (let i = 0; i<fiveDaysAtNoon.length; i++) {
                let forecastDate = response.list[fiveDaysAtNoon[i]].dt_txt;
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
        console.log("I'm in the addToList function");
        console.log("cityName========"+cityName);
        let newDiv = $("<div>").addClass("row").text(cityName);
        // newDiv.text(cityName);
        $(".searchHistory").append(newDiv);
    } // ---- end of addToList function


});
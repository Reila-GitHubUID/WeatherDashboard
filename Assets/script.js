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

        let url = "https://api.openweathermap.org/data/2.5/weather?q="+inputCity+"&units=imperial&APPID=4c5b7de512dad1fed533c8bdb4858956";
        displayWeather(url);

        event.preventDefault();
    }); // ---- end of button click event listener

    function displayWeather(urlInput){
        $.ajax({
            url: urlInput,
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
                // let ISODate = r.date_iso;
                // console.log("ISODate===" + ISODate);
                // let localDate = moment(ISODate).tz("America/Los_Angeles");
                // console.log("localDate= "+ localDate);

                // let justDate = r.date;
                // console.log("justDate===" + justDate);
                // let justLocalDate = moment(justDate).tz("America/Los_Angeles");
                // console.log("justLocalDate= "+ justLocalDate);

                console.log("response.dt="+ response.dt);
                let m = moment(response.dt, 's');
                console.log("m="+ m);
                let date = m.format("YYYY-MM-DD HH:mm:ss");
                console.log("date=" + date);





                let uv = r.value;

                $(".city").text(selectCity + "  (" + date + ") ").append($("<img>").attr("src", icon));
                $(".temp").text(temp+ " °F");
                $(".humidity").text(humidity+"%");
                $(".wind").text(wind+" MPH");
                $(".uv").text(uv);
    

                // display the 5 days forecast                
                let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?q="+inputCity+"&units=imperial&APPID=4c5b7de512dad1fed533c8bdb4858956";
                $.ajax({
                    url: urlForecast,
                    method: "GET"
                }).then (function(r) {
                    console.log("+++++++++++++++++++++++++++++++");
                    console.log(r);

                    let fTime = r.list[9].dt_txt;
                    console.log("r.list[9].dt_txt==" + fTime);
                });
            });


        });
    } // ---- end of displayWeather function


    function addToList(cityName) {
        console.log("I'm in the addToList function");
        console.log("cityName========"+cityName);
        let newDiv = $("<div>").addClass("row").text(cityName);
        // newDiv.text(cityName);
        $(".searchHistory").append(newDiv);
    } // ---- end of addToList function


});
$(document).ready(function () { 
    // button event listener
    $("button").on("click", function(event) {
        console.log("click!!!!");
        let inputCity = $(".searchCity").val();
        let url = "https://api.openweathermap.org/data/2.5/weather?q="+inputCity+"&units=imperial&APPID=4c5b7de512dad1fed533c8bdb4858956";
        localStorage.setItem(inputCity, url);
        
        $.ajax({
            url,
            method: "GET"
        }).then (function(response) {
            console.log("success! Below is the response!!!");
            console.log(response);
    
            let lat = response.coord.lat;
            let lon = response.coord.lon;
            
            let temp = response.main.temp;
            let humidity = response.main.humidity;
            let wind = response.wind.speed;

            let iconURL = response.weather[0].icon;
            let icon = "http://openweathermap.org/img/wn/" + iconURL + "@2x.png";
            

            let uvIndex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=4c5b7de512dad1fed533c8bdb4858956";
            $.ajax({
                url: uvIndex,
                method: "GET"
            }).then (function (r) {
                let ISODate = r.date_iso;
                let localDate = moment(ISODate);
                let date = localDate.format("YYYY-MM-DD HH:mm:ss");

                let uv = r.value;

                $(".city").text(inputCity + "  (" + date + ") ").append($("<img>").attr("src", icon));
                $(".temp").text(temp+ " °F");
                $(".humidity").text(humidity+"%");
                $(".wind").text(wind+" MPH");
                $(".uv").text(uv);
    
            });


            let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?q="+inputCity+"&units=imperial&APPID=4c5b7de512dad1fed533c8bdb4858956";
            $.ajax({
                url: urlForecast,
                method: "GET"
            }).then (function(r) {
                console.log("=====================");
                console.log(r);


            });
        });

        event.preventDefault();

    });

});
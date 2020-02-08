$(document).ready(function () { 

    // button event listener
    $("button").on("click", function(event) {
        let inputCity = $(".searchCity").val();
        let url = "https://api.openweathermap.org/data/2.5/weather?q="+inputCity+"&units=imperial&APPID=4c5b7de512dad1fed533c8bdb4858956";
        
        $.ajax({
            url,
            method: "GET"
        }).then (function(response) {
            console.log("success! Below is the response!!!");
            console.log(response);

            let lat = response.coord.lat;
            let lon = reponse.coord.lon;
            
            let temp = response.main.temp;
            let humidity = response.main.humidity;
            let wind = response.wind.speed;
    
            $(".city").text(inputCity + "  (" + date + ") " + response.weather[0].icon);
            $(".temp").text(temp);
            $(".humidity").text(humidity);
            $(".wind").text(wind);
            $(".uv").text("TBA");

            // api.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37
            let uvIndex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon;
            console.log("=====================");
            console.log(uvIndex);
        });

        event.preventDefault();

    });

    


        
});
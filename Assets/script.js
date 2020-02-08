    let inputCity = "";

    let lat = "";
    let lon = "";
    let temp = "";
    let humidity = "";
    let wind = "";

    let uvIndex = "";
    let url = "";

$(document).ready(function () { 
    // button event listener
    $("button").on("click", function(event) {
        inputCity = $(".searchCity").val();
        url = "https://api.openweathermap.org/data/2.5/weather?q="+inputCity+"&units=imperial&APPID=4c5b7de512dad1fed533c8bdb4858956";

        event.preventDefault();

    });
        
    $.ajax({
        url,
        method: "GET"
    }).then (function(response) {
        console.log("success! Below is the response!!!");
        console.log(response);

        lat = response.coord.lat;
        lon = response.coord.lon;
        
        temp = response.main.temp;
        humidity = response.main.humidity;
        wind = response.wind.speed;

        
        $(".city").text(inputCity + "  (" + date + ") " + response.weather[0].icon);
        $(".temp").text(temp);
        $(".humidity").text(humidity);
        $(".wind").text(wind);
    });


    uvIndex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon;
    $.ajax({
        uvIndex,
        method: "GET"
    }).then (function (response) {
        console.log("=====================");
        console.log(uvIndex);
        $(".uv").text("TBA");

    });



    


        
});
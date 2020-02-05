let inputCity = $(".searchField");

let url = "api.openweathermap.org/data/2.5/weather?q="+inputCity+"&APPID=4c5b7de512dad1fed533c8bdb4858956";

$(document).ready(function () { 
    $.ajax({
        url,
        method: "GET"
    }).then (function(response) {
        console.log(response);
    });
});
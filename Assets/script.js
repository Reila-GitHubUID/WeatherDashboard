// let url = "";
// let inputCity = "";
  
$(document).ready(function () { 

    $(".button").on("click", function() {
        debugger;

        console.log("Button clicked!");

        let inputCity = $(".searchField");
        console.log("inputCity = " + inputCity);
        let url = "https://api.openweathermap.org/data/2.5/weather?q="+inputCity+"&APPID=4c5b7de512dad1fed533c8bdb4858956";
        console.log("url = " + url);

        
        $.ajax({
            url,
            method: "GET"
        }).then (function(response) {
            console.log("success! Below is the response!!!");
            console.log(response);
    
        });



    });

    


        
});
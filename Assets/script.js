let inputCity = $(".searchField");

let url = "" + "";

$(document).ready(function () { 
    $.ajax({
        url,
        method: "GET"
    }).then (function(response) {
        console.log(response);
    });
});
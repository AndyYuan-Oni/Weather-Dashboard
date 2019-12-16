$(document).ready(function() {
    var apiKey = "6ca57a58e237de03f61260dabc24269a";

    $(".submitBtn").on("click", function() {
        event.preventDefault();
        console.log("clicked");
        var searchInput = $("#searchInput").val(); //keyword
        $(".list-group").prepend("<li class=\"list-group-item\">" + searchInput + "</li>");
        parseResponse(searchInput);
    });

    function parseResponse(searchInput) {
        console.log("inside parse");
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + ",AUS&mode=JSON" + "&appid=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            displayCurrent(response);
        });
    };

    function displayCurrent(response) {
        var displaybox = $("currentWeather");

    };












});
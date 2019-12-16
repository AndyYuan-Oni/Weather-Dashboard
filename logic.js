$(document).ready(function() {
    var apiKey = "6ca57a58e237de03f61260dabc24269a";
    var searchInput = "Sydney";

    //0K − 273.15 = -273.1°C

    function currentResponse(searchInput) {
        //console.log("inside current");
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + ",AUS&mode=JSON" + "&appid=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(responseCurrent) {
            //console.log(responseCurrent);
            displayCurrent(responseCurrent);
            uvIndex(responseCurrent);
        });
    };

    function displayCurrent(responseCurrent) {
        var displaybox = $(".currentWeather");
        var currentTemp = Math.round((responseCurrent.main.temp - 273.15) * 10) / 10;
        var iconCurrent = responseCurrent.weather[0].icon;
        var iconCurrentUrl = $("<img src=\"http://openweathermap.org/img/wn/" + iconCurrent + "@2x.png\">");
        var humidityCurrent = responseCurrent.main.humidity;
        var windSpeedCurrent = responseCurrent.wind.speed;
        var currentDate = moment().format("(MM/DD/YYYY)");
        var currentName = responseCurrent.name;
        var line1 = $("<h4>");
        line1.text(currentName + currentDate);
        line1.append(iconCurrentUrl);
        displaybox.append(line1);
        var line2 = $("<P>");
        line2.text("Temperature: " + currentTemp + "°C");
        displaybox.append(line2);
        var line3 = $("<P>");
        line3.text("Humidity: " + humidityCurrent + "%");
        displaybox.append(line3);
        var line4 = $("<P>");
        line4.text("Wind Speed: " + windSpeedCurrent + "MPH");
        displaybox.append(line4);
    };

    function uvIndex(responseCurrent) {
        var displaybox = $(".currentWeather");
        var lat = responseCurrent.coord.lat;
        var lon = responseCurrent.coord.lon;
        var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(uvResponse) {
            //console.log(uvResponse);
            var uvBox = $("<p>");
            uvBox.text("UV Index: " + uvResponse.value);
            displaybox.append(uvBox);
        });
    }

    function fiveDayResponse(searchInput) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + ",AUS&mode=JSON" + "&appid=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(responseFiveDay) {
            displayFiveDay(responseFiveDay);
        });
    };

    function displayFiveDay(responseFiveDay) {
        var fiveDayBox = $(".fiveDay");

        for (var i = 0; i < responseFiveDay.list.length;) {

            var cardEl = $("<div class=\"card text-white bg-primary p-2\" style=\"max-width: 18rem;\">");
            var timeEl = moment(responseFiveDay.list[i].dt_txt).format("MM/DD/YYYY");
            var icon = responseFiveDay.list[i].weather[0].icon;
            var iconFive = $("<img style=\"width:50px\" src=\"http://openweathermap.org/img/wn/" + icon + "@2x.png\">");
            var tempEl = Math.round((responseFiveDay.list[i].main.temp - 273.15) * 10) / 10;
            var humidityEl = responseFiveDay.list[i].main.humidity;
            var cardline1 = $("<h5 class=\"card-title\">");
            cardline1.text(timeEl);
            cardEl.append(cardline1);
            cardEl.append(iconFive);
            var cardline3 = $("<p class=\"card-text\">");
            cardline3.text("Temp: " + tempEl + "°C");
            cardEl.append(cardline3);
            var cardline4 = $("<p class=\"card-text\">");
            cardline4.text("Humidity: " + humidityEl + "%");
            cardEl.append(cardline4);
            fiveDayBox.append(cardEl);
            i = i + 8;
        };
    };

    function clearAll() {
        $(".currentWeather").empty();
        $(".fiveDay").empty();
    };

    function localSave() {
        localStorage.clear();
        var childlength = $(".list-group").children().length;
        for (i = 0; i < childlength; i++) {
            var saveList = $($(".list-group").children()[i]).text();

            console.log(saveList);

            var newInput = [{
                "city": saveList,
            }];
            var cities = JSON.parse(localStorage.getItem("cities"));

            if (cities == null) {
                cities = [newInput];
                localStorage.setItem("cities", JSON.stringify(cities));
            } else {
                cities.push(newInput);
                localStorage.setItem("cities", JSON.stringify(cities));
            };
        };
    };

    function localDisplay() {
        if (display != null) {
            $(".list-group").empty();
            var display = JSON.parse(localStorage.getItem("cities"));

            for (var i = 0; i < display.length; i++) {
                var cityEl = display[i][0].city;
                var liEl = $("<li class=\"list-group-item\">");
                liEl.text(cityEl);
                $(".list-group").append(liEl);
            }
        };


    };

    localDisplay();
    currentResponse(searchInput);
    fiveDayResponse(searchInput);

    $(".submitBtn").on("click", function() {
        event.preventDefault();

        var searchInput = $("#searchInput").val(); //keyword

        $(".list-group").prepend("<li class=\"list-group-item\">" + searchInput + "</li>");

        localSave();
        localDisplay();
        clearAll();
        currentResponse(searchInput);
        fiveDayResponse(searchInput);
    });

    $("li").on("click", function() {
        console.log("clicked");
        var searchInput = $(this).text();
        clearAll();
        currentResponse(searchInput);
        fiveDayResponse(searchInput);
    })













});
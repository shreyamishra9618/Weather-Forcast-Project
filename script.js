function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "--" + newName.value + "--";
    var latitude;
    var longitude;
    // Modification by Shreya M on Oct 9 2022 for adding latitude and longitude api ///
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + newName.value + '&limit=1&appid=7fce6dca761e606465fe67951ea85095')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var latitude = data[0].lat;
            var longitude = data[0].lon;

            console.log("lat::" + latitude)
            console.log("Lon::" + longitude)


            weatherAPIcall(latitude, longitude)

        })
}
// End of Modification by Shreya M///////
function weatherAPIcall(latitude, longitude) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=7fce6dca761e606465fe67951ea85095')
        .then(response => response.json())
        .then(data => {

            //Getting the min and max values for each day
            for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°";
                //Number(1.3450001).toFixed(2); // 1.35
            }

            for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
            }
            //------------------------------------------------------------

            //Getting Weather Icons
            for (i = 0; i < 5; i++) {
                document.getElementById("img" + (i + 1)).src = "https://openweathermap.org/img/w/" +
                    data.list[i].weather[0].icon
                    + ".png";
            }
            //------------------------------------------------------------
            console.log(data)


        })

        .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}

function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "London";
    GetInfo();
}


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    }
    else {
        return day + d.getDay();
    }
}

for (i = 0; i < 5; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}
    //------------------------------------------------------------



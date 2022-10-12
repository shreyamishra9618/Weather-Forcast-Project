// Forloop for persisting the data onto HMTL page
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}
// Key count for local storage 
var keyCount = 0;



function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "  " + newName.value + "  ";
    // 
    var cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + newName.value + "</li>");
    // Local storage
    var local = localStorage.setItem(keyCount, newName.value);
    keyCount = keyCount + 1;
    // 
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


var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct day
function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    }
    else {
        return day + d.getDay();
    }
}

function weatherAPIcall(latitude, longitude) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=7fce6dca761e606465fe67951ea85095')
        .then(response => response.json())
        .then(data => {
// Start of Static elements code/////////////////////////////////////////////////
            // //Getting the min and max values for each day
            // for (i = 0; i < 5; i++) {
            //     document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°";

            // }

            // for (i = 0; i < 5; i++) {
            //     document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
            // }


            // //Getting Weather Icons
            // for (i = 0; i < 5; i++) {
            //     document.getElementById("img" + (i + 1)).src = "https://openweathermap.org/img/w/" +
            //         data.list[i].weather[0].icon
            //         + ".png";
            // }

            // // Getting Humidity Info
            // for (i = 0; i < 5; i++) {
            //     document.getElementById("day" + (i + 1) + "Humidity").innerHTML = "Humidity: " + data.list[i].main.humidity
            // }
            // End of Static elements code/////////////////////////////////////////////////
            console.log(data)
            // Dynamically generating HTML element

            for (var i = 0; i < 5; i++) {

                /*Implementation - Card*/
                let getPrincipalContainer = document.getElementById("weatherContainer");
                let createCard = document.createElement("div")
                createCard.className = 'product-card';
                getPrincipalContainer.append(createCard)

                /*Implementing Names of the park */
                let createName3 = document.createElement("h4")
                createName3.className = "card-title"
                createName3.innerHTML = weekday[CheckDay(i)]
                createCard.appendChild(createName3)

                /*Implémentation de l'img - IMG*/
                let createImg = document.createElement("img")
                createImg.className = "card-img-top";
                createImg.src = "https://openweathermap.org/img/w/" +
                    data.list[i].weather[0].icon
                    + ".png";
                createCard.appendChild(createImg)


                /*Implementing Names of the park */
                let createName = document.createElement("h4")
                createName.className = "card-title"
                createName.innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°";
                createCard.appendChild(createName)

                /*Implementing Names of the park */
                let createName1 = document.createElement("h4")
                createName1.className = "card-title"
                createName1.innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(1) + "°";
                createCard.appendChild(createName1)



                /*Implementing Names of the park */
                let createName2 = document.createElement("h4")
                createName2.className = "card-title"
                createName2.innerHTML = "Humidity: " + data.list[i].main.humidity
                createCard.appendChild(createName2)

                 /*Implementing Names of the park */
                 let createName4 = document.createElement("h4")
                 createName4.className = "card-title"
                 createName4.innerHTML = "Wind Speed: " + data.list[i].wind.speed
                 createCard.appendChild(createName4)

            }
           

        })

        .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}









let now = new Date();
let header = document.querySelector("header");
let date = now.getDate();
let time = now.getTime();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satursday",
];

let day = days[now.getDay()];

let months = [
  "Janury",
  "Feburay",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
header.innerHTML = `Today is ${day} ${month} ${date}th </br> Current time is ${hours}:${minutes}:${seconds}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="card" style="width: 12rem">
 <div class="forecast-week">
 <h5 class=""> ${formatDay(forecastDay.dt)}</h5> 
  <p class="card-text"> High:${Math.round(
    forecastDay.temp.max
  )}F˚ Low:${Math.round(forecastDay.temp.min)}F˚</p><img
src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
alt=""width="42"/>
 
   
</div>
</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "69eb1996b8122663b52f6fed57db9ae8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCurrentWeather(response) {
  let location = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let speed = document.querySelector("#windSpeed");
  let weatherLooks = document.querySelector("#weatherDescription");
  let humid = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  speed.innerHTML = Math.round(response.data.wind.speed);
  location.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  weatherLooks.innerHTML = response.data.weather[0].description;
  humid.innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "69eb1996b8122663b52f6fed57db9ae8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function submit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemp = (celsiusNumber * 9) / 5 + 32;
  temperatureElement.innerHTML = celsiusTemp;
}

let celsiusNumber = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Yuma");

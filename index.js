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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast-One");
  forecastElement.innerHTML = `
  <div class="column">
 <div class="card"
 id="forecast-one"
style="width: 12rem">
<div class="card-body">
<h5 class="Monday"><strong>TUESDAY</strong></h5>
 <p class="card-text">L: 92&#176; H: 110&#176;</p>
 </div>
</div>`;
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

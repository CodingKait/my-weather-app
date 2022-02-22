let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = ("0" + now.getMinutes()).slice(-2);
let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let formattedDate = `${day}, ${month} ${date} ${hours}:${minutes}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class= "row">`;
  let days = ["Thur", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <i class="fa-solid fa-cloud" width="42"></i>
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"> 18° </span>
        <span class="weather-forecast-temperature-min"> 12° </span>
    </div>
  </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let h1 = document.querySelector("h1");
h1.innerHTML = formattedDate;

function showTemp(response) {
  let currentTemp = document.querySelector("#current-temp");
  let city = document.querySelector("#location");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let feelsLike = document.querySelector("#feels-like");
  let message = document.querySelector("#message");
  let currentCondition = document.querySelector("#current-condition");
  let maxTemp = document.querySelector("#high");
  let minTemp = document.querySelector("#low");
  message.innerHTML = `Current Weather`;
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°F`;
  city.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} m/s`;
  feelsLike.innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )}°F`;
  currentCondition.innerHTML = response.data.weather[0].description;
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°F`;
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°F |`;

  console.log(response.data);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;
  let apiKey = "2e03d7d5a86e13a466013e0c083b84c1";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", search);

function showTempC(response) {
  let cDegrees = document.querySelector("#current-temp");
  let maxTemp = document.querySelector("#high");
  let minTemp = document.querySelector("#low");
  cDegrees.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°C |`;
}

function getC(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;
  let apiKey = "2e03d7d5a86e13a466013e0c083b84c1";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTempC);
}

let tempToggleC = document.querySelector("#toggletoC");
tempToggleC.addEventListener("click", getC);

//

function showTempF(response) {
  let fDegrees = document.querySelector("#current-temp");
  let maxTemp = document.querySelector("#high");
  let minTemp = document.querySelector("#low");
  fDegrees.innerHTML = `${Math.round(response.data.main.temp)}°F`;
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°F`;
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°F |`;
}

function getF(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;
  let apiKey = "2e03d7d5a86e13a466013e0c083b84c1";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTempF);
}

let tempToggleF = document.querySelector("#toggletoF");
tempToggleF.addEventListener("click", getF);

//

function showLocationTemp(response) {
  let searchInput = document.querySelector("#search-input");
  let currentTemp = document.querySelector("#current-temp");
  let city = document.querySelector("#location");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let feelsLike = document.querySelector("#feels-like");
  let message = document.querySelector("#message");
  let currentCondition = document.querySelector("#current-condition");
  let maxTemp = document.querySelector("#high");
  let minTemp = document.querySelector("#low");
  message.innerHTML = `Current Weather`;
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°F`;
  city.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} m/s`;
  feelsLike.innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )}°F`;
  currentCondition.innerHTML = response.data.weather[0].description;
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°F`;
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°F |`;
  searchInput.value = response.data.name;
}

function position(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "2e03d7d5a86e13a466013e0c083b84c1";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showLocationTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(position);
}

let button = document.querySelector("#geolocation");
button.addEventListener("click", getCurrentPosition);

displayForecast();

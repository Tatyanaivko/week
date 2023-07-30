let date = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
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

  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let hour = [date.getHours()];
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = [date.getMinutes(2)];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDay = days[date.getDay()];
  let currentYear = date.getFullYear();

  return `Last updated: ${currentMonth} ${currentDate}, ${currentDay}, ${hour}:${minutes}, ${currentYear}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = days[date.getDay()];

  return day;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (forecastDay, index) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                <div class="weather-forecast-day">${formatDay(
                  forecastDay.dt
                )}</div>
                
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-temp-max">  </span>
                  <span class="weather-forecast-temp-min"> $° </span>
                </div>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "174b8ddbc737a7348f372a4863d35504";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

displayForecast();

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "174b8ddbc737a7348f372a4863d35504";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

let now = document.querySelector("#yourD");
now.innerHTML = formatDate(date);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCity");
  let h2 = document.querySelector("h2");
  if (searchInput.value) {
    searchCity(searchInput.value);
    h2.innerHTML = `${searchInput.value}`;
  } else {
    h2.innerHTML = null;
    alert("Enter your city or give permission for your geolocation! 🌦️☀️🌤️");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
function showWeather(response) {
  let h2 = document.querySelector("#yourC");
  h2.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C `;

  let speedWind = Math.round(response.data.wind.speed);
  let windperhour = document.querySelector("#windspeed");
  windperhour.innerHTML = `Wind: ${speedWind} km/h`;
  let localhumidity = response.data.main.humidity;
  let currenthumidity = document.querySelector("#humid");
  currenthumidity.innerHTML = ` Humidity: ${localhumidity}%`;
  let maininfo = response.data.weather[0].description;
  let environment = document.querySelector("#environment-Info");
  environment.innerHTML = maininfo;
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function searchCity(city) {
  let apiKey = "174b8ddbc737a7348f372a4863d35504";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

function showPosition(position) {
  let apiKey = "174b8ddbc737a7348f372a4863d35504";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let ButtonClick = document.querySelector("#current");
ButtonClick.addEventListener("click", getPosition);
function changeCelciusTemp(event) {
  event.preventDefault();
  let newTempCelcius = document.querySelector("#temperature");
  newTempCelcius.innerHTML = `${Math.round(celciusTemperature)}°C `;
}
let newTempC = document.querySelector("#cellink");

newTempC.addEventListener("click", changeCelciusTemp);

function changeFarenheitTemp(event) {
  event.preventDefault();
  let farenheitTemperature = celciusTemperature * 1.8 + 32;

  let newTempFarenheit = document.querySelector("#temperature");
  newTempFarenheit.innerHTML = `${Math.round(farenheitTemperature)}°F `;
}

let newTempF = document.querySelector("#fahlink");

newTempF.addEventListener("click", changeFarenheitTemp);
searchCity("London");

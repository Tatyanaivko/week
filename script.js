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
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
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
function searchCity(city) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}
function showWeather(response) {
  let h2 = document.querySelector("#yourC");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let speedWind = Math.round(response.data.wind.speed);
  let windperhour = document.querySelector("#windspeed");
  let localhumidity = response.data.main.humidity;
  let currenthumidity = document.querySelector("#humid");
  let maininfo = response.data.weather[0].description;
  let environment = document.querySelector("#einvronment-Info");
  let iconElement = document.querySelector("#icon");
  h2.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}°C `;
  environment.innerHTML = maininfo;
  celciusTemperature = response.data.main.temp;
  windperhour.innerHTML = `Wind: ${speedWind} km/h`;
  currenthumidity.innerHTML = ` Humidity: ${localhumidity}%`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b340e3c24340f477e473822c01e392d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showPosition(position) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
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

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="card-body ">
                <div class="card ">${formatDay(forecastDay.dt)}</div>
                <img src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"/>

                <div class="weather-forecast-temp">
                  <span class="max">${Math.round(forecastDay.temp.max)}</span>
                  <span class="min">/ ${Math.round(
                    forecastDay.temp.min
                  )} </span>
                </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
searchCity("London");

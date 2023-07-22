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

  return `${currentMonth} ${currentDate}, ${currentDay}, ${hour}:${minutes}, ${currentYear}`;
}
let now = document.querySelector("#yourD");
now.innerHTML = formatDate(date);

function convertFah(event) {
  event.preventDefault();
  let fahrenHeit = document.querySelector("#temperature");
  fahrenHeit.innerHTML = "66℉";
}
let fahclick = document.querySelector("#fahlink");
fahclick.addEventListener("click", convertFah);
function upClick(event) {
  event.preventDefault();
  let fahrenHeit = document.querySelector("#temperature");
  fahrenHeit.innerHTML = "19℃";
}
let celclick = document.querySelector("#cellink");
celclick.addEventListener("click", upClick);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCity");
  let h2 = document.querySelector("h2");
  if (searchInput.value) {
    searchCity(searchInput.value);
    h2.innerHTML = `${searchInput.value}`;
  } else {
    h2.innerHTML = null;
    alert("please type a city");
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
  windperhour.innerHTML = speedWind;
  let localhumidity = response.data.main.humidity;
  let currenthumidity = document.querySelector("#humid");
  currenthumidity.innerHTML = localhumidity;
  let maininfo = response.data.weather[0].description;
  let environment = document.querySelector("#environment-Info");
  environment.innerHTML = maininfo;
}
function searchCity(city) {
  let apiKey = "174b8ddbc737a7348f372a4863d35504";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

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

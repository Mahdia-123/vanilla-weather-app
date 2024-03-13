function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formattedDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"
                class="vanilla-weather-app-icon"
              />`;
  getWeatherForecast(response.data.city);
}
function formattedDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Tursday",
    "Fraiday",
  ];
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(updateWeather);
}
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-form-input");

  searchCity(searchInputElement.value);
}
function getWeatherForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(showForecast);
}

function showForecast(response) {
  console.log(response.data);
  let days = ["Tues", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class= "weather-forecast-day">
<div class="weather-forecast-date">${day}</div>
          <div class="weather-icon">🌧</div>
          <div class="weather-forecast-temp">
            <div class="weather-temperature-max"><strong>26º</strong></div>
            <div class="weather-temperature-min">9º</div>
          </div>
        </div>`;
  });
  weatherForecast.innerHTML = forecastHtml;
}
let weatherForecast = document.querySelector("#weather-forecast");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Kabul");

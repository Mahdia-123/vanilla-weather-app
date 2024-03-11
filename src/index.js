function searchCity(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInputElement.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

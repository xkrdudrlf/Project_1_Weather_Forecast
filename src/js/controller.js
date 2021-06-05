import * as weatherModel from "./model/weatherModel";
import * as searchResultModel from "./model/searchResultModel";
import dailyWeatherView from "./view/dailyWeatherView";
import weeklyWeatherView from "./view/weeklyWeatherView";

const init = async function () {
  // Load search results
  const searchForm = document.querySelector(".search");
  const searchBar = document.querySelector(".search-bar");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchResultModel.loadCityInfo(searchBar.value);
    searchBar.blur();
    searchBar.value = "";
  });

  // Load the weather data based on the current location (Default)
  // await weatherModel.load();
  // dailyWeatherView.render(weatherModel.state);
  // weeklyWeatherView.render(weatherModel.state, false);
};

init();

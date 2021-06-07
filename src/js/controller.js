import * as weatherModel from "./model/weatherModel";
import * as searchResultModel from "./model/searchResultModel";
import * as bookmarkModel from "./model/bookmarkModel";
import currentWeatherView from "./view/currentWeatherView";
import searchResultView from "./view/searchResultView";

const controlBookmark = function (cityId) {
  return bookmarkModel.toggle(cityId);
};

const controlWeather = async function () {
  await weatherModel.load(bookmarkModel.bookmarks);
  currentWeatherView.render(weatherModel.state);
  currentWeatherView.addHandlerBookmark(controlBookmark);
};

const controlSearchResult = async function (searchKeyword) {
  await searchResultModel.load(searchKeyword, bookmarkModel.bookmarks);
  searchResultView.render(searchResultModel.searchResult);
  searchResultView.addHandlerBookmark(controlBookmark);
};

const init = async function () {
  bookmarkModel.load();
  currentWeatherView.addHandlerCurrentWeather(controlWeather);
  currentWeatherView.addHandlerClickLogo(controlWeather);
  searchResultView.addHandlerSearchResult(controlSearchResult);
};

init();

/*
  TO DO (~ Expect to finish untill 6/9)
  [C] 1. Bookmark sync with local storage
    When rendered(currentWeather/searchResult), 
    check localStorage and change the appearance of bookmakr accordingly.(~ 1 day)
  2. Search Result Redirection Feature (~ 1 day)
  3. Show a bookmarklist Feature(Globe Icon) (1 ~ 2 days)
*/

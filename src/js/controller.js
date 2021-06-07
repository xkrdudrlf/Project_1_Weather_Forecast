import * as weatherModel from "./model/weatherModel";
import * as searchResultModel from "./model/searchResultModel";
import * as bookmarkModel from "./model/bookmarkModel";
import weatherView from "./view/weatherView";
import searchResultView from "./view/searchResultView";

const controlBookmark = function (lat, lng) {
  return bookmarkModel.toggle({ lat, lng });
};

const controlWeather = async function (location = null) {
  await weatherModel.load(bookmarkModel.bookmarks, location);
  weatherView.render(weatherModel.state);
  weatherView.addHandlerBookmark(controlBookmark);
};

const controlSearchResult = async function (cityName) {
  await searchResultModel.load(cityName, bookmarkModel.bookmarks);
  searchResultView.render(searchResultModel.searchResult);
  searchResultView.addHandlerBookmark(controlBookmark);
  searchResultView.addHandlerSearchResultItem(controlWeather);
};

const init = async function () {
  bookmarkModel.load();
  weatherView.addHandlerWeather(controlWeather);
  weatherView.addHandlerClickLogo(controlWeather);
  searchResultView.addHandlerSearchResult(controlSearchResult);
};

init();

/*
  TO DO (~ Expect to finish untill 6/9)
  [C] 1. Bookmark sync with local storage
      When rendered(currentWeather/searchResult), 
      check localStorage and change the appearance of bookmakr accordingly.(~ 1 day)
  [C] 2. Search Result Redirection Feature (~ 1 day)
  3. Show a bookmarklist Feature(Globe Icon) (1 ~ 2 days)
*/

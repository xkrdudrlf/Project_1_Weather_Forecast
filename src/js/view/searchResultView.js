import View from "./View";

class SearchResultView extends View {
  _parentElement = document.querySelector(".main");
  _data;

  addHandlerSearchResult(handler) {
    const searchForm = document.querySelector(".search");

    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const searchBar = document.querySelector(".search-bar");
      handler(searchBar.value);

      searchBar.blur();
      searchBar.value = "";
    });
  }

  addHandlerSearchResultItem(handler) {
    const searchResultItems = document.querySelectorAll(".search-result__item");
    [...searchResultItems].forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        if (!e.target.classList.contains("city")) return;
        const bookmark = item.querySelector(".bookmark");
        const coords = {
          lat: bookmark.dataset.lat,
          lng: bookmark.dataset.lng,
        };
        handler(coords);
      });
    });
  }

  _generateMarkup() {
    const resultMsg = `${
      this._data.length
        ? `There are ${this._data.length} search result(s)`
        : "No result found"
    }`;

    let markup = "";
    markup += `<div class="search-result">`;
    markup += `<div class="search-result__header">${resultMsg}</div>`;
    markup += `<div class="search-result__grid">`;

    this._data.forEach((el) => {
      markup += `
        <div class="search-result__item">
          <div class="top">
            <div class="location">
              <div class="city">
                ${el.city}
              </div>
              <div class="country">${el.country}</div>
            </div>
            <div class="btn bookmark" 
              data-lat="${el.coords.lat}" 
              data-lng="${el.coords.lng}">
              ${this._generateMarkupBookmarkIcon(el.isBookmarked)}
            </div>
          </div>
          <div class="btm">
            <div class="weather-icon">
              <img src="http://openweathermap.org/img/w/${
                el.current.icon
              }.png" alt="weather-icon">
            </div>
            <div class="weather-info">
              <div class="temperature">${el.current.temp}???</div>
              <div class="time">${el.current.time}</div>
            </div>
          </div>
        </div>
      `;
    });

    markup += `</div>`;
    markup += `</div>`;
    return markup;
  }
}

export default new SearchResultView();

import View from "./View";

class DailyWeatherView extends View {
  _parentElement = document.querySelector(".main");
  _data;

  _generateMarkup() {
    let markup = ``;
    markup += `<div class="main__daily">`;
    markup += this._generateMarkupTop();
    markup += this._generateMarkupMid();
    markup += this._generateMarkupBtm();
    markup += `</div>`;
    return markup;
  }

  _generateMarkupTop() {
    return `
      <div class="top">
        <div class="header">Daily Weather</div>
        <div class="btn bookmark"><i class="far fa-bookmark"></i></div>
      </div>
    `;
  }
  _generateMarkupMid() {
    return `
      <div class="mid">
        <div class="weather-info--main">
          <div class="weather-icon--lg">
            <img src="http://openweathermap.org/img/w/${this._data.current.icon}.png" alt="weather-icon">
          </div>
          <div class="contents">
            <div class="item city">${this._data.current.city}</div>
            <div class="item">Sunny / ${this._data.current.temp}℃</div>
            <div class="item">${this._data.current.time}</div>
          </div>
        </div>
        <div class="weather-info--detail">
          <div class="contents">
            <div class="item">Min: ${this._data.daily.min}</div>
            <div class="item">Max: ${this._data.daily.max}</div>
            <div class="item">UV: ${this._data.daily.uvi}</div>
            <div class="item">Chances of Rain: ${this._data.daily.pop}%</div>
          </div>
        </div>
      </div>
    `;
  }
  _generateMarkupBtm() {
    let markup = ``;
    markup += `<div class="btm">`;

    markup += `<div class="weather-info-container">`;
    this._data.hourly.slice(0, 6).forEach((info) => {
      markup += `
        <div class="weather-info--hourly">
          <div class="time">${info.time}</div>
          <div class="weather">
            <div class="weather-icon--sm">
            <img src="http://openweathermap.org/img/w/${
              info.icon
            }.png" alt="weather-icon">
            </div>
            <div class="temperature">${Math.floor(info.temp)}℃</div>
          </div>
        </div>`;
    });
    markup += `</div>`;

    markup += `<div class="weather-info-container">`;
    this._data.hourly.slice(6, 12).forEach((info) => {
      markup += `
        <div class="weather-info--hourly">
          <div class="time">${info.time}</div>
          <div class="weather">
            <div class="weather-icon--sm">
            <img src="http://openweathermap.org/img/w/${
              info.icon
            }.png" alt="weather-icon">
            </div>
            <div class="temperature">${Math.floor(info.temp)}℃</div>
          </div>
        </div>`;
    });
    markup += `</div>`;

    markup += `</div>`;
    return markup;
  }
}

export default new DailyWeatherView();

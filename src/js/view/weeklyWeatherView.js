import View from "./View";

class WeeklyWeatherView extends View {
  _parentElement = document.querySelector(".main");
  _data;

  _generateMarkup() {
    let markup = ``;
    markup += `<div class="main__weekly">`;
    markup += `<div class="header">Weekly Weather</div>`;
    markup += `<div class="weather-info-container">`;
    this._data.weekly.slice(0, 7).forEach((info) => {
      markup += `
        <div class="weather-info-daily">
          <div class="day">${info.day}</div>
          <div class="weather">
            <div class="weather-icon--sm">
            <img src="http://openweathermap.org/img/w/${
              info.icon
            }.png" alt="weather-icon">
            </div>
            <div class="temperature">
              ${Math.floor(info.min)}℃/${Math.floor(info.max)}℃
            </div>
          </div>
        </div>`;
    });
    markup += `</div>`;
    markup += `</div>`;
    return markup;
  }
}

export default new WeeklyWeatherView();

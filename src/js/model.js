import { KEY, API_URL_WEATHER, API_URL_LOCATION } from "./config";
import { getDay, getJSON, getTime, getDay } from "./helpers";

export const state = {
  city: "",
  current: {},
  daily: {},
  hourly: [],
  weekly: [],
};

const getCurrentPosition = new Promise(function (resolve, reject) {
  function success(pos) {
    resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude });
  }
  function error(err) {
    reject(err.message);
  }
  navigator.geolocation.getCurrentPosition(success, error);
});

const loadCityInfo = async function (coords) {
  try {
    const cityInfo = await getJSON(
      `${API_URL_LOCATION}?lat=${coords.lat}&lon=${coords.lng}&limit=5&appid=${KEY}`
    );

    if (cityInfo.length === 0) throw new Error("No city found");

    state.city = cityInfo[0].name;
  } catch (err) {
    throw new Error(err.message);
  }
};

const loadCurrentInfo = function (weatherInfo) {
  state.current.icon = weatherInfo.current.weather[0].icon;
  state.current.desc = weatherInfo.current.weather[0].main;
  state.current.temp = Math.floor(weatherInfo.current.temp);
  state.current.time = getTime(weatherInfo.current.dt);
};

const loadTodayInfo = function (weatherInfo) {
  state.daily.min = Math.floor(weatherInfo.daily[0].temp.min);
  state.daily.max = Math.floor(weatherInfo.daily[0].temp.max);
  state.daily.uvi = Math.floor(weatherInfo.daily[0].uvi);
  state.daily.pop = weatherInfo.daily[0].pop;
};

const loadNext12HoursInfo = function (weatherInfo) {
  state.hourly = weatherInfo.hourly.slice(1, 13).map((info) => {
    return {
      time: getTime(info.dt),
      temp: info.temp,
      icon: info.weather[0].icon,
    };
  });
};

const loadNext7DaysInfo = function (weatherInfo) {
  state.weekly = weatherInfo.daily.slice(1, 8).map((info) => {
    return {
      day: getDay(info.dt),
      min: info.temp.min,
      max: info.temp.max,
      icon: info.weather[0].icon,
    };
  });
};

const loadWeatherInfo = async function (coords) {
  try {
    const weatherInfo = await getJSON(
      `${API_URL_WEATHER}?&units=metric&lat=${coords.lat}&lon=${coords.lng}&appid=${KEY}`
    );
    [
      loadCurrentInfo,
      loadTodayInfo,
      loadNext12HoursInfo,
      loadNext7DaysInfo,
    ].forEach((func) => func(weatherInfo));
  } catch (err) {
    throw new Error(err.message);
  }
};

const load = async function () {
  try {
    const coords = await getCurrentPosition;
    await loadCityInfo(coords);
    await loadWeatherInfo(coords);
    console.log(state);
  } catch (err) {
    throw new Error(err.message);
  }
};

load();

import { KEY, API_URL_ONECALL, API_URL_REVERSE_GEOCODING } from "../config";
import { getDay, getJSON, getTime, isBookmarked } from "../helpers";

export const state = {
  coords: "",
  current: {},
  daily: {},
  hourly: [],
  weekly: [],
  isBookmarked: false,
};

const getCoords = function (location) {
  return new Promise(async function (resolve, reject) {
    function success(pos) {
      state.coords = {
        lat: pos.coords.latitude.toFixed(2),
        lng: pos.coords.longitude.toFixed(2),
      };
      resolve();
    }
    function error(err) {
      reject(err.message);
    }
    if (location) {
      state.coords = {
        lat: location.lat,
        lng: location.lng,
      };
      resolve();
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  });
};

const loadCityName = async function () {
  try {
    let cityInfo = await getJSON(
      `${API_URL_REVERSE_GEOCODING}?lat=${state.coords.lat}&lon=${state.coords.lng}&limit=5&appid=${KEY}`
    );

    if (cityInfo.length === 0) throw new Error("No city found");

    state.current.city = cityInfo[0].name;
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
      temp: Math.floor(info.temp),
      icon: info.weather[0].icon,
    };
  });
};

const loadNext7DaysInfo = function (weatherInfo) {
  state.weekly = weatherInfo.daily.slice(1, 8).map((info) => {
    return {
      day: getDay(info.dt),
      min: Math.floor(info.temp.min),
      max: Math.floor(info.temp.max),
      icon: info.weather[0].icon,
    };
  });
};

const loadWeatherInfo = async function () {
  try {
    const weatherInfo = await getJSON(
      `${API_URL_ONECALL}?&units=metric&lat=${state.coords.lat}&lon=${state.coords.lng}&appid=${KEY}`
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

const loadBookmarkInfo = function (bookmarks) {
  state.isBookmarked = isBookmarked(bookmarks, state.coords);
};

export const load = async function (bookmarks, location) {
  try {
    await getCoords(location);
    await loadCityName();
    await loadWeatherInfo();
    loadBookmarkInfo(bookmarks);
  } catch (err) {
    throw new Error(err.message);
  }
};

import { KEY, API_URL_SEARCH } from "../config";
import { getJSON, getTime } from "../helpers";
import cityIDMap from "../../data/city.list.json";

export let searchResult = [];

const getCityIDs = function (cityName) {
  cityName = cityName.toLowerCase();

  const cityIDs = cityIDMap
    .filter((obj) => obj.name.toLowerCase() === cityName)
    .map((obj) => obj.id);

  return cityIDs;
};

export const load = async function (name, bookmarks) {
  try {
    // 0. Clear the previous search result.
    searchResult = [];

    // 1. Get "cityIDs" for the given name
    const cityIDs = getCityIDs(name);
    if (!cityIDs) return;

    // 2. Get "weatherDataArr" via request(s) to the server with "cityIDs"
    const weatherDataArr = await Promise.all(
      cityIDs.map((id) =>
        getJSON(`${API_URL_SEARCH}?&units=metric&id=${id}&appid=${KEY}`)
      )
    );

    // 3. Store data in "weatherDataArr" to "searchResult"
    weatherDataArr.forEach((weatherData) => {
      const weather = {
        id: weatherData.id,
        city: weatherData.name,
        country: weatherData.sys.country,
        current: {
          icon: weatherData.weather[0].icon,
          temp: Math.floor(weatherData.main.temp),
          time: getTime(weatherData.dt),
        },
        isBookmarked: bookmarks.includes(String(weatherData.id)),
      };
      searchResult.push(weather);
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

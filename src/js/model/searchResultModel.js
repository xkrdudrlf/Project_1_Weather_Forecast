import { KEY, API_URL_WEATHER, API_URL_GEOCODING } from "../config";
import { getJSON, getTime, isBookmarked, isSameLocation } from "../helpers";

export let searchResult = [];

const getCityCoords = async function (cityName) {
  cityName = cityName.toLowerCase();

  const cities = await getJSON(
    `${API_URL_GEOCODING}?q=${cityName}&limit=100&appid=${KEY}`
  );

  const cityCoords = cities.map((city) => {
    return { lat: city.lat, lng: city.lon };
  });

  return cityCoords;
};

const contains = function (container, item) {
  return (
    container.findIndex((el) => isSameLocation(el.coords, item.coords)) >= 0
  );
};

export const load = async function (cityName, bookmarks) {
  try {
    // 0. Clear the previous search result.
    searchResult = [];

    // 1. Get cityCoords with cityName (There can be multiple cities)
    const cityCoords = await getCityCoords(cityName);

    // 2. Get "weatherDataArr" via request(s) to the server with "cityCoords"
    const weatherDataArr = await Promise.all(
      cityCoords.map((city) =>
        getJSON(
          `${API_URL_WEATHER}?&units=metric&lat=${city.lat}&lon=${city.lng}&appid=${KEY}`
        )
      )
    );
    // 3. Store data in "weatherDataArr" to "searchResult"
    weatherDataArr.forEach((weatherData) => {
      const weather = {
        coords: {
          lat: weatherData.coord.lat.toFixed(2),
          lng: weatherData.coord.lon.toFixed(2),
        },
        city: weatherData.name,
        country: weatherData.sys.country,
        current: {
          icon: weatherData.weather[0].icon,
          temp: Math.floor(weatherData.main.temp),
          time: getTime(weatherData.timezone),
        },
        isBookmarked: isBookmarked(bookmarks, {
          lat: weatherData.coord.lat.toFixed(2),
          lng: weatherData.coord.lon.toFixed(2),
        }),
      };
      if (!contains(searchResult, weather)) searchResult.push(weather);
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

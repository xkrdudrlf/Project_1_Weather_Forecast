import { KEY, API_URL_WEATHER, API_URL_LOCATION } from "../config";
import { getDay, getJSON, getTime, getDay } from "../helpers";

/*
  < Steps required to render a search result>
  [C] 1. Get search input from a user 
  2. Make a request to the API server with the input
    - Searching by a name only returns a single result even when there are
    multiple possible results.
    Hence, should manually download the file conatining the id-city map to
    extract ids of matching cities.
    Then, we can make a request with multiple city ids now to the server and 
    get the results.
    => Download the id-city name map data
  3. Receive and store the response data to state
  4. send the data in the state to the view via controller.js

*/

export const loadCityInfo = async function (name) {
  const data = await getJSON(
    `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${KEY}`
  );
  console.log(data);
};

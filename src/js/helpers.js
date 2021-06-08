import { API_URL_TIME, KEY_GOOGLE_API } from "./config";
const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} seconds`)
      );
    }, seconds * 1000);
  });
};

export const getJSON = async function (url) {
  const res = await Promise.race([fetch(url), timeout(10)]);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);

  return data;
};

export const getTime = function (timezone) {
  const date = new Date();
  const UTCHour = date.getUTCHours();
  const UTCMinute = date.getUTCMinutes();

  // timezone is in seconds
  let hour = UTCHour + Math.floor(timezone / 60 / 60);
  let minute = UTCMinute + ((timezone / 60) % 60);

  if (hour < 0) hour += 24;
  if (hour < 10) hour = `0${hour}`;
  if (minute < 0) minute += 60;
  if (minute < 10) minute = `0${minute}`;

  return `${hour}:${minute}`;
};

export const getAfterIthHour = function (currTimeStr, i) {
  let [hour] = currTimeStr.split(":");
  hour = +hour + i;
  if (hour > 23) hour -= 24;
  if (hour < 10) hour = `0${hour}`;
  return `${hour}:00`;
};

export const getDay = function (dt) {
  let day = new Date(dt * 1000).getDay();
  return day === 0
    ? "Sun"
    : day === 1
    ? "Mon"
    : day === 2
    ? "Tue"
    : day === 3
    ? "Wed"
    : day === 4
    ? "Thu"
    : day === 5
    ? "Fri"
    : "Sat";
};

export const isBookmarked = function (bookmarks, coords) {
  const find = bookmarks.filter((bookmark) => isSameLocation(bookmark, coords));
  return find.length > 0;
};

export const isSameLocation = function (loca1, loca2) {
  return loca1.lat - loca2.lat < 1 && loca1.lng - loca2.lng < 1;
};

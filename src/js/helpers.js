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

export const getTime = function (dt) {
  const date = new Date(dt * 1000);
  const hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
  const minute =
    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
  return `${hour}:${minute}`;
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

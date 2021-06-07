import { isSameLocation } from "../helpers";

export let bookmarks;

export const toggle = function (coords) {
  const index = bookmarks.findIndex((bookmark) =>
    isSameLocation(bookmark, coords)
  );

  if (index === -1) bookmarks.push(coords);
  else bookmarks.splice(index, 1);

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  return index === -1;
};

export const load = function () {
  bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
  if (!bookmarks) bookmarks = [];
};

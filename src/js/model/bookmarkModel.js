const bookmarks = [];

export const toggle = function (cityId) {
  const index = bookmarks.findIndex((el) => el === cityId);

  if (index === -1) bookmarks.push(cityId);
  else bookmarks.splice(index, 1);

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  return index === -1;
};

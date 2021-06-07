export default class View {
  _parentElement;
  _data;

  render(data, clear = true) {
    if (!data) console.error("Render Error !");
    this._data = data;
    if (clear) this._clear();
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  addHandlerBookmark(handler) {
    const bookmarks = document.querySelectorAll(".bookmark");
    [...bookmarks].forEach((bookmark) => {
      bookmark.addEventListener("click", (e) => {
        e.preventDefault();
        const isBookmarked = handler(bookmark.dataset.cityId);

        bookmark.innerHTML = "";
        bookmark.insertAdjacentHTML(
          "afterbegin",
          `${this._generateMarkupBookmarkIcon(isBookmarked)}`
        );
      });
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkupBookmarkIcon(isBookmarked) {
    return isBookmarked
      ? `<i class="fas fa-bookmark"></i>`
      : `<i class="far fa-bookmark"></i>`;
  }
}

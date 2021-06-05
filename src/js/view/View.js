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

  _clear() {
    this._parentElement.innerHTML = "";
  }
}

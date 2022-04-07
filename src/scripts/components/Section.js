export default class Section {
  constructor({ items, renderer}, container) {
    this._renderItems = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem(element) {
    this._container.append(element)
  }

  addNewItem(element) {
    this._container.prepend(element)
  }

  renderItems() {
    this._renderItems.forEach(item => {
      this._renderer(item);
    });
  }
}

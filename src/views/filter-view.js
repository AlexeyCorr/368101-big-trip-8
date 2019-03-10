import AbstractView from "./../abstract-view";

class FilterView extends AbstractView {
  constructor(data) {
    super();

    this._data = data;
  }

  get template() {
    return `
    <input
    type="radio"
    id="filter-${this._data.type}"
    name="filter"
    value="${this._data.type}"
    ${this._data.checked ? `checked` : ``}
  >
  <label
    class="trip-filter__item"
    for="filter-${this._data.type}">
      ${this._data.type}
  </label>`;
  }
}

export default FilterView;

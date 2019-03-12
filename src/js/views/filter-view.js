import AbstractView from "./../abstract-view";

class FilterView extends AbstractView {
  constructor(data) {
    super();

    this._type = data.type;
    this._checked = data.checked;
  }

  get template() {
    return `
    <input
    type="radio"
    id="filter-${this._type}"
    name="filter"
    value="${this._type}"
    ${this._checked ? `checked` : ``}
  >
  <label
    class="trip-filter__item"
    for="filter-${this._type}">
      ${this._type}
  </label>`;
  }
}

export default FilterView;

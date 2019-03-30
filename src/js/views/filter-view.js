import AbstractView from "./../abstract-view";

class FilterView extends AbstractView {
  constructor(data) {
    super();

    this._type = data.type;
    this._checked = data.checked;

    this._onFilterButtonClick = this._onFilterButtonClick.bind(this);

    this._onFilter = null;
  }

  _onFilterButtonClick() {
    typeof this._onFilter === `function` && this._onFilter();
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `
    <div>
      <input
      type="radio"
      class="trip-filter__input"
      id="filter-${this._type}"
      name="filter"
      value="${this._type}"
      ${this._checked ? `checked` : ``}
    >
    <label
      class="trip-filter__item"
      for="filter-${this._type}">
        ${this._type}
    </label>
  </div>`;
  }

  bind() {
    this._element.querySelector(`.trip-filter__input`)
        .addEventListener(`change`, this._onFilterButtonClick);
  }

  unbind() {
    this._element.querySelector(`.filter__input`)
        .removeEventListener(`change`, this._onFilterButtonClick);
  }
}

export default FilterView;

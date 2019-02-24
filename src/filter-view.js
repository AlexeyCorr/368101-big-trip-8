const template = (type, checked = false) => `
  <input
    type="radio"
    id="filter-${type}"
    name="filter"
    value="${type}"
    ${checked ? `checked` : ``}
  >
  <label
    class="trip-filter__item"
    for="filter-${type}">
      ${type}
  </label>`;

export default template;

import AbstractView from './../abstract-view';

class CardView extends AbstractView {
  constructor(data) {
    super();

    this._data = data;
    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _onEditButtonClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
    <article class="trip-point">
      <i class="trip-icon">${this._data.type}</i>
      <h3 class="trip-point__title">Taxi to Airport</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${this._data.time.from}&nbsp;&mdash; ${this._data.time.to}</span>
        <span class="trip-point__duration">1h 30m</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${this._data.price}</p>
      <ul class="trip-point__offers">
      ${this._data.offers.map((it) =>`
        <li>
          <button class="trip-point__offer">${it}</button>
        </li>`)
        .join(``)}
      </ul>
      <button class="trip-edit" type="button">edit</button>
    </article>`;
  }

  bind() {
    this._element.querySelector(`.trip-edit`)
        .addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.querySelector(`.trip-edit`)
        .removeEventListener(`click`, this._onEditButtonClick);
  }
}

export default CardView;

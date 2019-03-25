import AbstractView from './../abstract-view';
import moment from 'moment';

class CardView extends AbstractView {
  constructor(data) {
    super();

    this._city = data.city;
    this._title = data.title;
    this._type = data.type;
    this._offers = data.offers;
    this._time = data.time;
    this._price = data.price;

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
      <i class="trip-icon">${this._type}</i>
      <h3 class="trip-point__title">${this._title} to ${this._city}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${this._time.from}&nbsp;&mdash; ${this._time.to}</span>
        <span class="trip-point__duration">
          ${moment(this._time.from, `HH:mm`).hour()}h
          ${moment(this._time.from, `HH:mm`).minutes()}m
        </span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
      <ul class="trip-point__offers">
      ${[...this._offers].map((it) =>`
        <li>
          <button class="trip-point__offer">${it}</button>
        </li>`)
        .join(``)}
      </ul>
    </article>`;
  }

  bind() {
    this._element.addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._type = data.type;
    this._city = data.city;
    this._offers = data.offers;
    this._price = data.price;
    this._from = data.time.from;
  }
}

export default CardView;


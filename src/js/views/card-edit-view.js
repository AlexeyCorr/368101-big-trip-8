import AbstractView from './../abstract-view';
import {TYPES} from './../data/data';
import flatpickr from 'flatpickr';

class CardEditView extends AbstractView {
  constructor(data) {
    super();

    this._title = data.title;
    this._type = data.type;
    this._offers = data.offers;
    this._time = data.time;
    this._price = data.price;
    this._city = data.city;
    this._description = data.description;
    this._photos = data.photos;
    this._types = Object.entries(TYPES);

    this._state.isFavorite = false;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onSelectTravel = this._onSelectTravel.bind(this);
    this._onChangeFavorite = this._onChangeFavorite.bind(this);
    this._onChangeTime = this._onChangeTime.bind(this);

    this._onSubmit = null;
    this._onDelete = null;
  }

  _processForm(formData) {
    const entry = {
      title: this._title,
      type: this._type,
      offers: this._offers,
      city: this._city,
      description: this._description,
      time: {
        from: this._time.from,
        to: this._time.to
      }
    };

    const cardEditView = CardEditView.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      cardEditView[property] && cardEditView[property](value);
    }

    return entry;
  }

  _onChangeFavorite() {
    this._state.isFavorite = !this._state.isFavorite;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.point__form`));
    const newData = this._processForm(formData);
    typeof this._onSubmit === `function` && this._onSubmit(newData);

    this.update(newData);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();

    typeof this._onDelete === `function` && this._onDelete();
  }

  _onSelectTravel(evt) {
    const checkedInput = evt.target;
    this._type = checkedInput.dataset.icon;
    this._title = checkedInput.value;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _onChangeTime() {
    flatpickr(`.point__time .point__input`,
      { enableTime: true,
        noCalendar: true,
        altInput: true,
        altFormat: `H:i`
      }
    );
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get template() {
    return `
    <article class="point">
      <form action="" method="get" class="point__form">
        <header class="point__header">
          <label class="point__date">
            choose day
            <input class="point__input" type="text" placeholder="MAR 18" name="day">
          </label>

          <div class="travel-way">
            <label class="travel-way__label" for="travel-way__toggle">${this._type}</label>

            <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

            <div class="travel-way__select">
              <div class="travel-way__select-group">
                ${this._types.map((it) => `
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${it[0]}" name="travel-way" value="${it[0]}" data-icon="${it[1]}">
                  <label class="travel-way__select-label" for="travel-way-${it[0]}">${it[1]} ${it[0]}</label>
                `).join(``)}
              </div>
            </div>
          </div>

          <div class="point__destination-wrap">
            <label class="point__destination-label" for="destination">${this._title} to</label>
            <input class="point__destination-input" list="destination-select" id="destination" value="${this._city}" name="destination">
            <datalist id="destination-select">
              <option value="airport"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
              <option value="hotel"></option>
            </datalist>
          </div>

          <label class="point__time">
            choose time
            <input class="point__input" type="text" value="12:00" name="time" placeholder="12:00">
          </label>

          <label class="point__price">
            write price
            <span class="point__price-currency">€</span>
            <input class="point__input" type="text" value="${this._price}" name="price">
          </label>

          <div class="point__buttons">
            <button class="point__button point__button--save" type="submit">Save</button>
            <button class="point__button point__button--delete" type="reset">Delete</button>
          </div>

          <div class="paint__favorite-wrap">
            <input type="checkbox"
            class="point__favorite-input visually-hidden"
            id="favorite"
            name="favorite"
            ${this._state.isFavorite && `checked`}>
            <label class="point__favorite" for="favorite">favorite</label>
          </div>
        </header>

        <section class="point__details">
          <section class="point__offers">
            <h3 class="point__details-title">offers</h3>

            <div class="point__offers-wrap">
              ${[...this._offers].map((it) => `<input class="point__offers-input visually-hidden" type="checkbox" id="${it}" name="offer" value="add-luggage">
              <label for="${it}" class="point__offers-label">
                <span class="point__offer-service">${it}</span> + €<span class="point__offer-price">30</span>
              </label>`).join(``)}
            </div>

          </section>
          <section class="point__destination">
            <h3 class="point__details-title">Destination</h3>
            <p class="point__destination-text">${this._description.join(``).trim()}</p>
            <div class="point__destination-images">
              ${this._photos.map((photo) => `<img src="${photo}" alt="picture from place" class="point__destination-image">`).join(``)}
            </div>
          </section>
          <input type="hidden" class="point__total-price" name="total-price" value="">
        </section>
      </form>
    </article>`;
  }

  bind() {
    this._element.querySelector(`.point__form`)
        .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.point__button--delete`)
        .addEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.travel-way__select-group`)
        .addEventListener(`change`, this._onSelectTravel);
    this._element.querySelector(`.point__favorite-input`)
        .addEventListener(`change`, this._onChangeFavorite);
    this._element.querySelector(`.point__time .point__input`)
        .addEventListener(`click`, this._onChangeTime);
  }

  unbind() {
    this._element.querySelector(`.point__form`)
        .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.point__button--delete`)
        .removeEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.travel-way__select-group`)
        .removeEventListener(`change`, this._onSelectTravel);
    this._element.querySelector(`.point__favorite-input`)
        .removeEventListener(`change`, this._onChangeFavorite);
    this._element.querySelector(`.point__time .point__input`)
        .removeEventListener(`click`, this._onChangeTime);
  }

  update(data) {
    this._type = data.type;
    this._city = data.city;
    this._offers = data.offers;
    this._price = data.price;
    this._from = data.time.from;
  }

  static createMapper(target) {
    return {
      'travel-way': (value) => target.type = value,
      'destination': (value) => target.city = value,
      'time': (value) => target.time.from = value,
      'price': (value) => target.price = value,
      'offer': (value) => target.offers.add(value),
    }
  }
}

export default CardEditView;

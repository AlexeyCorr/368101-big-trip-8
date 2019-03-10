import {createData} from './data';

const state = createData();
console.log(state);

const template = () => `
  <article class="trip-point">
    <i class="trip-icon">${state.type}</i>
    <h3 class="trip-point__title">Taxi to Airport</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${state.time.from}&nbsp;&mdash; ${state.time.to}</span>
      <span class="trip-point__duration">1h 30m</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${state.price}</p>
    <ul class="trip-point__offers">
    ${state.offers.map((it) => `<li>
        <button class="trip-point__offer">${it}</button>
      </li>`)
      .join(``)}
    </ul>
  </article>`;

export default template;

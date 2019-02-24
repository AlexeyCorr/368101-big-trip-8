import makeFilter from './filter-view';
import makeCard from './card-view';

const filtersData = [
  {
    type: `everything`,
    checked: true
  },
  {
    type: `future`
  },
  {
    type: `past`
  }
];

// Make filters
const filterBlock = document.querySelector(`.trip-filter`);

const filters = filtersData
  .map((it) => makeFilter(it.type, it.checked))
  .join(``);

filterBlock.insertAdjacentHTML(`beforeend`, filters);

// Make cards
const cardBlock = document.querySelector(`.trip-day__items`);
const createCards = (count) => {
  const cards = new Array(count)
  .fill(makeCard())
  .join(``);

  cardBlock.insertAdjacentHTML(`beforeend`, cards);
}

createCards(7);

filterBlock.querySelectorAll(`input[type=radio]`).forEach((it) => {
  it.addEventListener(`change`, () => {
    cardBlock.innerHTML = ``;
    createCards(Math.trunc((Math.random() * (7 - 0) + 0)));
  });
});

import CardModel from './model/card-model';
import {moneyChart, transportChart} from './stats';
import {filtersData, cardsData} from './data/data';

const cardModel = new CardModel();

cardModel.renderCards(cardsData);
cardModel.renderFilters(filtersData, cardsData);

// document.querySelector(`.view-switch`).addEventListener(`click`, (evt) => {
//   evt.preventDefault();

//   if (evt.target.classList.contains(`view-switch__item--stats`)) {
//     evt.target.classList
//       .add(`view-switch__item--active`);
//     document.querySelector(`.view-switch__item--table`).classList
//       .remove(`view-switch__item--active`);
//     document.querySelector(`.main`).classList
//       .add(`visually-hidden`);
//     document.querySelector(`.statistic`).classList
//       .remove(`visually-hidden`);
//   }
//   if (evt.target.classList.contains(`view-switch__item--table`)) {
//     evt.target.classList
//       .add(`view-switch__item--active`);
//     document.querySelector(`.view-switch__item--stats`).classList
//       .remove(`view-switch__item--active`);
//     document.querySelector(`.main`).classList
//       .remove(`visually-hidden`);
//     document.querySelector(`.statistic`).classList
//       .add(`visually-hidden`);
//   }
// });

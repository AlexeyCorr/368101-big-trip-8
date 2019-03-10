import FilterView from './views/filter-view';
import CardView from './views/card-view';
import CardEditView from './views/card-edit-view';

import {filtersData, cardsData} from './data/data';

const filterContainer = document.querySelector(`.trip-filter`);
const cardContainer = document.querySelector(`.trip-day__items`);

const filterComponent = new FilterView(filtersData);
const cardComponent = new CardView(cardsData[0]);
const cardEditComponent = new CardEditView(cardsData[0]);

filterContainer.appendChild(filterComponent.render());
cardContainer.appendChild(cardComponent.render());

cardComponent.onEdit = () => {
  cardEditComponent.render();
  cardContainer.replaceChild(cardEditComponent.element, cardComponent.element);
  cardComponent.unrender();
};

cardEditComponent.onSubmit = () => {
  cardComponent.render();
  cardContainer.replaceChild(cardComponent.element, cardEditComponent.element);
  cardEditComponent.unrender();
}

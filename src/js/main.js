import FilterView from './views/filter-view';
import CardView from './views/card-view';
import CardEditView from './views/card-edit-view';

import {filtersData, cardsData} from './data/data';

const filterContainer = document.querySelector(`.trip-filter`);
const cardContainer = document.querySelector(`.trip-day__items`);

const renderFilter = (data) => {
  data.forEach((it) => {
    const filterComponent = new FilterView(it);
    filterContainer.appendChild(filterComponent.render());
  });
};

const renderCards = (data) => {
  data.forEach((it) => {
    const cardComponent = new CardView(it);
    const cardEditComponent = new CardEditView(it);
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
    };
  });
};

renderFilter(filtersData);
renderCards(cardsData);

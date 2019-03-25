import FilterView from './views/filter-view';
import CardView from './views/card-view';
import CardEditView from './views/card-edit-view';

import {filtersData, cardsData} from './data/data';


const cardContainer = document.querySelector(`.trip-day__items`);

const renderFilter = (data) => {
  const filterContainer = document.querySelector(`.trip-filter`);
  data.forEach((it) => {
    filterContainer.appendChild(new FilterView(it).render());
  });
};

const renderCards = (data) => {
  data.forEach((point) => {
    const cardComponent = new CardView(point);
    const cardEditComponent = new CardEditView(point);
    cardContainer.appendChild(cardComponent.render());

    cardComponent.onEdit = () => {
      cardEditComponent.render();
      cardContainer.replaceChild(cardEditComponent.element, cardComponent.element);
      cardComponent.unrender();
    };

    cardEditComponent.onSubmit = (newData) => {
      console.log(point)
      point.type = newData.type;
      point.city = newData.city;
      point.time.from = newData.time.from;
      point.price = newData.price;
      point.offers = newData.offers;

      cardComponent.update(point);
      cardComponent.render();
      cardContainer.replaceChild(cardComponent.element, cardEditComponent.element);
      cardEditComponent.unrender();
    };
  });
};

renderFilter(filtersData);
renderCards(cardsData);

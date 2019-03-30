import FilterView from './../views/filter-view';
import CardView from './../views/card-view';
import CardEditView from './../views/card-edit-view';

const cardContainer = document.querySelector(`.trip-day__items`);
const filterContainer = document.querySelector(`.trip-filter`);

class CardModel {
  _delete(cards, card) {
    cards.slice(card, 1);
    return cards;
  }

  _update(card, newCard) {
    card = {...newCard};
    return card;
  }

  _filter(initialCards, filterName) {
    switch (filterName) {
      case `filter-everything`:
        return initialCards;

      case `filter-future`:
        return initialCards.filter((it) => it.dateStart < Date.now());

      case `filter-past`:
        return initialCards.filter((it) => it.dateEnd > Date.now());
    }
  }

  renderCards(cards) {
    const fragment = document.createDocumentFragment();

    cardContainer.innerHTML = ``;

    cards.forEach((card) => {
      const cardComponent = new CardView(card);
      const cardEditComponent = new CardEditView(card);
      fragment.appendChild(cardComponent.render());

      cardComponent.onEdit = () => {
        cardEditComponent.render();
        cardContainer.replaceChild(cardEditComponent.element, cardComponent.element);
        cardComponent.unrender();
      };

      cardEditComponent.onSubmit = (newData) => {
        const newCard = this._update(card, newData);

        cardComponent.update(newCard);
        cardComponent.render();
        cardContainer.replaceChild(cardComponent.element, cardEditComponent.element);
        cardEditComponent.unrender();
      };

      cardEditComponent.onDelete = () => {
        this._delete(cards, card);
        cardEditComponent.unrender();
      };
    });

    cardContainer.appendChild(fragment);
  }

  renderFilters(filters, cards) {
    const fragment = document.createDocumentFragment();

    filters.forEach((filter) => {
      const filterComponent = new FilterView(filter);
      fragment.appendChild(filterComponent.render());

      filterComponent.onFilter = () => {
        const newCards = this._filter(cards, filterComponent.element
          .querySelector(`.trip-filter__input`).id);
        this.renderCards(newCards);
      };
    });

    filterContainer.appendChild(fragment);
  }
}

export default CardModel;

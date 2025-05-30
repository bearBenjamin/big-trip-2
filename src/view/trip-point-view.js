import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointTime, humanizePointDate, getDurationDate, humanizePointDateTime } from '../util/utils.js';
import { pointTypeOffer } from '../mock/offer.js';

const createTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, destination, isFavorite, offers, type} = point;

  const dateBase = humanizePointDate(dateFrom);
  const dateMachine = humanizePointDateTime(dateFrom);
  const dateStart = humanizePointTime(dateFrom);
  const dateEnd = humanizePointTime(dateTo);
  const duration = getDurationDate(dateTo, dateFrom);

  const getListOffers = () => {
    const elementsListOffers = [];
    const typeOffers = pointTypeOffer(point);
    offers.forEach((item) => {
      for (let i = 0; i < typeOffers.offers.length; i += 1) {
        if (item === typeOffers.offers[i].id) {
          const elemetnList = `<li class="event__offer">
                               <span class="event__offer-title">${typeOffers.offers[i].title}</span>
                               &plus;&euro;&nbsp;
                               <span class="event__offer-price">${typeOffers.offers[i].price}</span>
                               </li>`;
          elementsListOffers.push(elemetnList);
        } else {
          const elementList = '';
          elementsListOffers.push(elementList);
        }
      }
    });
    const result = `<ul class="event__selected-offers">${elementsListOffers.join('')}</ul>`;
    return result;
  };

  const listOffersElement = getListOffers();

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateMachine}">${dateBase}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${dateStart}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${dateEnd}</time>
                  </p>
                  <p class="event__duration">${duration}M</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                ${listOffersElement}
                <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class TripPointView extends AbstractView{
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createTemplate(this.#point);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}


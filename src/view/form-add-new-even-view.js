import { DESTINATION } from '../util/const.js';
import { offersModel } from '../mock/offer.js';
import AbstractView from '../framework/view/abstract-view.js';

const createTemplate = (point) => {
  const { destination } = point;

  // console.log('basePrice: ', basePrice);
  // console.log('date: ', date);
  // console.log('dateFrom: ', dateFrom);
  // console.log('dateTo: ', dateTo);
  // console.log('destination: ', destination);
  // console.log('id: ', id);
  // console.log('isFavorite: ', isFavorite);
  // console.log('offers: ', offers);
  // console.log('type: ', type);

  const getOffers = (typeOffers = 'bus') => {
    const offersType = [];

    offersModel.forEach((offer) => {
      if (offer.type === typeOffers) {
        offer.offers.forEach((item) => {
          const offerElement = `
                        <div class="event__offer-selector">
                          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
                          <label class="event__offer-label" for="event-offer-luggage-1">
                            <span class="event__offer-title">${item.title}</span>
                              &plus;&euro;&nbsp;
                            <span class="event__offer-price">${item.price}</span>
                          </label>
                        </div>`;
          offersType.push(offerElement);
        });
      }
    });

    const offersConteiner = `<div class="event__available-offers">${offersType.join('')}</div>`;
    const offersSection = `
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    ${offersConteiner}
                  </section>`;
    return offersSection;
  };

  const getDescription = (destinationPoint = destination) => {
    let descriptionElement;
    const photosElement = [];
    DESTINATION.forEach((item) => {
      if (destinationPoint === '') {
        descriptionElement = `<p class="event__destination-description">${destinationPoint}</p>`;
      }

      if (destinationPoint === item.name) {
        descriptionElement = `<p class="event__destination-description">${item.description}</p>`;
        item.pictures.forEach((photo) => {
          const photoElement = `<img class="event__photo" src="${photo.src}" alt="Event photo">`;
          photosElement.push(photoElement);
        });
      }
    });

    const photoConteiner = `<div class="event__photos-container">
                            <div class="event__photos-tape">
                              ${photosElement.join('')}
                            </div>
                          </div>`;
    const descriptionsSection = `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    ${descriptionElement}
                    ${photoConteiner}
                    </section>`;
    return descriptionsSection;
  };

  const offerSection = getOffers();
  const descriptionSection = getDescription();

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      Flight
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                ${offerSection}
                ${descriptionSection}
                </section>
              </form>
            </li>`;
};

export default class FormAddNewEvenView extends AbstractView {
  #point = {};

  constructor () {
    super();
    this.#point = {
      basePrice: '',
      date: '',
      dateFrom: '',
      dateTo: '',
      destination: '',
      id: '',
      isFavorite: '',
      offers: '',
      type: ''
    };
  }

  get template() {
    return createTemplate(this.#point);
  }
}

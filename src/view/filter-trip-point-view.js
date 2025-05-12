import AbstractView from '../framework/view/abstract-view';


const createTemplate = (filter) => {
  console.log('filter: ', filter);
  return `<form class="trip-filters" action="#" method="get">
                <div class="trip-filters__filter">
                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
                </div>

                <div class="trip-filters__filter">
                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
                  <label class="trip-filters__filter-label" for="filter-future">Future</label>
                </div>

                <div class="trip-filters__filter">
                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
                  <label class="trip-filters__filter-label" for="filter-past">Past</label>
                </div>

                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
};

export default class FilterPointsTripView extends AbstractView {
  #filter = null;

  constructor (filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createTemplate(this.#filter);
  }

  setBtnFilterClickHandler = (callback) => {
    this._callback.btnFilterClick = callback;
    this.element
      .querySelectorAll('.trip-filters__filter-input')
      .forEach((btn) => {
        btn.addEventListener('change', (evt) => {
          evt.preventDefault();
          this.noAtribute();
          btn.setAttribute('checked', '');
          this._callback.btnFilterClick(btn.value);
        });
      });
  };

}

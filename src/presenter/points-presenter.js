import TripInfoView from '../view/trip-info-header-view.js';
import FilterPointsTripView from '../view/filter-trip-point-view.js';
import SortPointsTripView from '../view/sort-trip-point-view.js';
import ContainerListPointTripView from '../view/container-list-point-trip-view.js';
import TripPointView from '../view/trip-point-view.js';
import FormAddNewEvenView from '../view/form-add-new-even-view.js';
import FormEditingTripPointView from '../view/form-editing-trip-point-view.js';
import { render, RenderPosition } from '../render.js';
import { POINT_COUNT } from '../const.js';

const header = document.querySelector('.page-header');
const tripInfoContainer = header.querySelector('.trip-main');
const tripFilterContainer = header.querySelector('.trip-controls__filters');

export default class PointsPresenter {
  tripInfoComponent = new TripInfoView();
  filterPointsTripComponent = new FilterPointsTripView();
  sortPointsTripComponent = new SortPointsTripView();
  containerListPointTripComponent = new ContainerListPointTripView();
  formAddNewEvent = new FormAddNewEvenView();
  formEditingTripPointView = new FormEditingTripPointView();

  init = (container) => {
    this.container = container; //tripEventsContainer;

    render (this.tripInfoComponent, tripInfoContainer, RenderPosition.AFTERBEGIN);
    render (this.filterPointsTripComponent, tripFilterContainer);
    render (this.sortPointsTripComponent, this.container);
    render (this.containerListPointTripComponent, this.container);

    for (let i = 0; i < POINT_COUNT; i += 1) {
      render (new TripPointView(), this.containerListPointTripComponent.getElement());
    }

    render (this.formAddNewEvent, this.containerListPointTripComponent.getElement(), RenderPosition.AFTERBEGIN);

  };

  r;

}

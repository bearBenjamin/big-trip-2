import TripInfoView from '../view/trip-info-header-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import FilterPointsTripView from '../view/filter-trip-point-view.js';
import SortPointsTripView from '../view/sort-trip-point-view.js';
import ContainerListPointTripView from '../view/container-list-point-trip-view.js';
import FormAddNewEvenView from '../view/form-add-new-even-view.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';

const header = document.querySelector('.page-header');
const tripInfoContainer = header.querySelector('.trip-main');
const tripFilterContainer = header.querySelector('.trip-controls__filters');

const btnNewPoint = header.querySelector('.trip-main__event-add-btn');

export default class PointsPresenter {
  #container = null;
  #pointsModel = null;
  #points = [];
  #pointPresenter = new Map();
  #tripInfoComponent = new TripInfoView(); //в headere
  #listEmpty = new ListEmptyView();
  #filterComponent = new FilterPointsTripView();
  #sortComponent = new SortPointsTripView();
  #listPointComponent = new ContainerListPointTripView();
  #formAddNewEvent = new FormAddNewEvenView();

  constructor(container, pointsModel) {
    this.#container = container; //tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#points = [...this.#pointsModel.points];

    this.#renderListPoint();

    this.#renderNewPointForm();
  };

  #renderListPoint() {
    this.#renderFilter();

    if (this.#points.length === 0) {
      this.#renderListEmpty();
      return;
    }

    this.#renderTripInfo();
    this.#renderSort();
    this.#renderList();

    for (let i = 0; i < this.#points.length; i += 1) {
      this.#renderPoint(this.#points[i]);
    }
  }

  //на сейчас затык не понимаю, как обработать пустую форму
  //возможно через форму редактирования приду к решению здесь
  #renderNewPointForm() {
    btnNewPoint.addEventListener('click', () => {
      render(this.#formAddNewEvent, this.#listPointComponent.element, RenderPosition.AFTERBEGIN);
      btnNewPoint.disabled = true;

      //вопрос как менять тип в пустой форме остается открытым
      //const type = document.querySelectorAll('.event__type-item');
    });

  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#listPointComponent.element);
    pointPresenter.init(point);

    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderFilter() {
    render (this.#filterComponent, tripFilterContainer);
  }

  #renderSort() {
    render (this.#sortComponent, this.#container);
  }

  #renderListEmpty() {
    render (this.#listEmpty, this.#container);
  }

  #renderTripInfo() {
    render (this.#tripInfoComponent, tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderList() {
    render (this.#listPointComponent, this.#container);
  }
}

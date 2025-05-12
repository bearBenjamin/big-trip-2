import TripInfoView from '../view/trip-info-header-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortPointsTripView from '../view/sort-trip-point-view.js';
import ContainerListPointTripView from '../view/container-list-point-trip-view.js';
import FormAddNewEvenView from '../view/form-add-new-even-view.js';
import {render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../util/utils.js';
import { getSortDay, getSortTime, getSortPrice } from '../util/sort.js';
import { SortType } from '../util/const.js';

const header = document.querySelector('.page-header');
const tripInfoContainer = header.querySelector('.trip-main');

const btnNewPoint = header.querySelector('.trip-main__event-add-btn');

export default class PointsPresenter {
  #container = null;
  #pointsModel = null;
  #points = [];
  #pointPresenter = new Map();
  #tripInfoComponent = new TripInfoView(); //в headere
  #listEmpty = new ListEmptyView();
  #sortComponent = new SortPointsTripView();
  #currentSort = SortType.DAY;
  #sourcedListPoints = [];
  #listPointComponent = new ContainerListPointTripView();
  #formAddNewEvent = new FormAddNewEvenView();

  constructor(container, pointsModel) {
    this.#container = container; //tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#points = [...this.#pointsModel.points];
    this.#sourcedListPoints = [...this.#pointsModel.points];//список в том виде, как пришел с сервера

    this.#points.sort(getSortDay);

    this.#renderListPoint();

    this.#renderNewPointForm();
  };

  #renderListPoint() {
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
    const pointPresenter = new PointPresenter(this.#listPointComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedListPoints = updateItem(this.#sourcedListPoints, updatedPoint);

    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderSort() {
    render (this.#sortComponent, this.#container);
    this.#sortComponent.setBtnClickHandler(this.#handleSortTypeChange);
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(getSortDay);
        break;
      case SortType.TIME:
        this.#points.sort(getSortTime);
        break;
      case SortType.PRICE:
        this.#points.sort(getSortPrice);
        break;
      default:
        this.#points = [...this.#sourcedListPoints];
    }

    this.#currentSort = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    } // не перерисовываю список, если пользователь кликнул повторно на ту же кнопнку

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderListPoint();
  };

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

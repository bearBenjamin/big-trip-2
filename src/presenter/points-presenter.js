import TripInfoView from '../view/trip-info-header-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import FilterPointsTripView from '../view/filter-trip-point-view.js';
import SortPointsTripView from '../view/sort-trip-point-view.js';
import ContainerListPointTripView from '../view/container-list-point-trip-view.js';
import TripPointView from '../view/trip-point-view.js';
import FormAddNewEvenView from '../view/form-add-new-even-view.js';
import FormEditingTripPointView from '../view/form-editing-trip-point-view.js';
import { render, RenderPosition } from '../render.js';

const header = document.querySelector('.page-header');
const tripInfoContainer = header.querySelector('.trip-main');
const tripFilterContainer = header.querySelector('.trip-controls__filters');

const btnNewPoint = header.querySelector('.trip-main__event-add-btn');

export default class PointsPresenter {
  #container = null;
  #pointsModel = null;
  #points = [];
  #tripInfoComponent = new TripInfoView();
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
    render (this.#filterComponent, tripFilterContainer);

    if (this.#points.length === 0) {
      render (this.#listEmpty, this.#container);
      return;
    }

    render (this.#tripInfoComponent, tripInfoContainer, RenderPosition.AFTERBEGIN);
    render (this.#sortComponent, this.#container);
    render (this.#listPointComponent, this.#container);

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
    const pointComponent = new TripPointView(point);
    //окно редактирования формы создается по клику
    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#renderFormEditin(point, pointComponent);
    });

    render (pointComponent, this.#listPointComponent.element);
  }

  //отрисовка окна формы редактирования с обработчиками
  #renderFormEditin(point, pointComponent) {
    const formEditingPoint = new FormEditingTripPointView(point);

    const replacePointToForm = () => {
      this.#listPointComponent.element.replaceChild(formEditingPoint.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#listPointComponent.element.replaceChild(pointComponent.element, formEditingPoint.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    replacePointToForm();

    formEditingPoint.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    formEditingPoint.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    document.addEventListener('keydown', onEscKeyDown);
  }

}

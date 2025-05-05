import TripPointView from '../view/trip-point-view';
import FormEditingTripPointView from '../view/form-editing-trip-point-view';
import { render } from '../framework/render';

export default class PointPresenter {
  #point = null;
  #listPointContainer = null;
  #pointComponent = null;
  #formEditingPoint = null;

  constructor(listPointContainer) {
    this.#listPointContainer = listPointContainer;
  }

  init(point) {
    this.#point = point;
    this.#pointComponent = new TripPointView(point);

    this.#pointComponent.setClickHandler(() => {
      this.#renderFormEditing(point);
    });

    render (this.#pointComponent, this.#listPointContainer);
  }

  #renderFormEditing(point) {
    this.#formEditingPoint = new FormEditingTripPointView(point);

    this.#replacePointToForm();

    this.#formEditingPoint.setEditFormSubmitHandler(this.#hadleFormSubmit);
    this.#formEditingPoint.setEditFormBtnRollupClickHandler(this.#handleFormBtnRollUpClick);
  }

  #replacePointToForm = () => {
    this.#listPointContainer.replaceChild(this.#formEditingPoint.element, this.#pointComponent.element);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceFormToPoint = () => {
    this.#listPointContainer.replaceChild(this.#pointComponent.element, this.#formEditingPoint.element);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #hadleFormSubmit = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleFormBtnRollUpClick = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}

import TripPointView from '../view/trip-point-view';
import FormEditingTripPointView from '../view/form-editing-trip-point-view';
import { remove, render, replace } from '../framework/render';

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

    const prevPointComponent = this.#pointComponent;

    this.#pointComponent = new TripPointView(point);

    this.#pointComponent.setClickHandler(this.#handleBtnRollUpClick);

    if (prevPointComponent === null) {
      render (this.#pointComponent, this.#listPointContainer);
      return;
    }

    if (this.#listPointContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    remove(prevPointComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
  };

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

  #handleBtnRollUpClick = () => {
    this.#renderFormEditing(this.#point);
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

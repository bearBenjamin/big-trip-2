import TripPointView from '../view/trip-point-view';
import FormEditingTripPointView from '../view/form-editing-trip-point-view';
import { remove, render, replace } from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #point = null;
  #mode = Mode.DEFAULT;
  #listPointContainer = null;
  #pointComponent = null;
  #formEditingPoint = null;
  #changeData = null;
  #changeMode = null;

  constructor(listPointContainer, changeData, changeMode) {
    this.#listPointContainer = listPointContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    //const prevFormEditingPoint = this.#formEditingPoint;

    //console.log('prevFormEditingPoint: ', prevFormEditingPoint);

    this.#pointComponent = new TripPointView(point);

    this.#pointComponent.setClickHandler(this.#handleBtnRollUpClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevPointComponent === null /*|| prevFormEditingPoint === null*/) {
      render (this.#pointComponent, this.#listPointContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    /*if (this.#mode === Mode.EDITING) {
      replace(this.#formEditingPoint, prevFormEditingPoint);
    }*/

    remove(prevPointComponent);
    //remove(prevFormEditingPoint);
  }

  destroy = () => {
    remove(this.#pointComponent);
    //remove(this.#formEditingPoint);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #renderFormEditing() {

    this.#formEditingPoint = new FormEditingTripPointView(this.#point);

    this.#replacePointToForm();

    this.#formEditingPoint.setEditFormSubmitHandler(this.#hadleFormSubmit);
    this.#formEditingPoint.setEditFormBtnRollupClickHandler(this.#handleFormBtnRollUpClick);
  }

  #replacePointToForm = () => {
    this.#listPointContainer.replaceChild(this.#formEditingPoint.element, this.#pointComponent.element);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    this.#listPointContainer.replaceChild(this.#pointComponent.element, this.#formEditingPoint.element);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
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

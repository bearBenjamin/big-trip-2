import PointsPresenter from './presenter/points-presenter.js';
import PointModel from './model/point-model.js';

const main = document.querySelector('.page-main');
const tripEventsContainer = main.querySelector('.trip-events');

const pointsModel = new PointModel();
const pointPresenter = new PointsPresenter(tripEventsContainer, pointsModel);

pointPresenter.init();



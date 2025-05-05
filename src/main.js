import PointsPresenter from './presenter/points-presenter.js';
import PointModel from './model/point-model.js';
import { generateFilter } from './mock/filter.js';

const main = document.querySelector('.page-main');
const tripEventsContainer = main.querySelector('.trip-events');

const pointsModel = new PointModel();
const filter = generateFilter(pointsModel.points);
console.log('filter: ', filter);
const pointPresenter = new PointsPresenter(tripEventsContainer, pointsModel, filter);

pointPresenter.init();



import PointsPresenter from './presenter/list-points-presenter.js';
import PointModel from './model/point-model.js';
import { generateFilter } from './mock/filter.js';
import { render } from './framework/render.js';
import FilterPointsTripView from './view/filter-trip-point-view.js';

const main = document.querySelector('.page-main');
const tripEventsContainer = main.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new PointModel();
const ListPresenter = new PointsPresenter(tripEventsContainer, pointsModel);

const filter = generateFilter(pointsModel.points);

render(new FilterPointsTripView(filter), filterContainer);

ListPresenter.init();

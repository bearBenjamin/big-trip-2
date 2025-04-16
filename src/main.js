import PointsPresenter from './presenter/points-presenter.js';

const main = document.querySelector('.page-main');
const tripEventsContainer = main.querySelector('.trip-events');

const pointPresenter = new PointsPresenter();

pointPresenter.init(tripEventsContainer);

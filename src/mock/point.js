import { getRandomInteger } from '../util/utils';
import { pointTypeOffer } from './offer';
import { DESTINATION, TYPE } from '../util/const';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { POINT_COUNT } from '../util/const';

const getBasePrice = () => Math.floor(Math.random() * (2000 - 20) + 20);

const getDestination = () => DESTINATION[getRandomInteger(0, DESTINATION.length -1)].name;

const generateDate = (a, b) => {
  const daysGapStart = getRandomInteger(a, b);
  const startDay = dayjs().add(daysGapStart, 'day');
  const dateTimeStart = startDay.format();
  return dateTimeStart;
};

function generatePoint () {
  const point = {
    basePrice: getBasePrice(),
    dateFrom: generateDate(-14, 7),
    dateTo: generateDate(-31, 31),
    destination: getDestination(),
    id: nanoid(),
    isFavorite: false,
    offers: [],
    type: TYPE[getRandomInteger(0, TYPE.length - 1)]
  };

  const offers = pointTypeOffer(point);

  point.offers = [Number(getRandomInteger(1, offers.offers.length)), Number(getRandomInteger(1, offers.offers.length))];

  return point;
}

const generatePoints = () => {
  const points = Array.from({length: POINT_COUNT}, generatePoint);
  return points;
};


export { generatePoints };


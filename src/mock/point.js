import { getRandomInteger } from '../utils';
import { pointTypeOffer } from './offer';
import { DESTINATION } from '../const';
import dayjs from 'dayjs';

const maxDaysGap = 7;
const getBasePrice = () => Math.floor(Math.random() * (2000 - 20) + 20);

const TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const getDestination = () => DESTINATION[getRandomInteger(0, DESTINATION.length -1)].name;

const generateStartDate = () => {
  const daysGapStart = getRandomInteger(-maxDaysGap, 0);
  const startDay = dayjs().add(daysGapStart, 'day');
  const dateTimeStart = startDay.format();
  return dateTimeStart;
};

const generateEndDate = () => {
  const daysGapEnd = getRandomInteger(0, maxDaysGap);
  const endDay = dayjs().add(daysGapEnd, 'day');
  const dateTimeEnd = endDay.format();
  return dateTimeEnd;
};

function generatePoint () {
  const point = {
    basePrice: getBasePrice(),
    dateFrom: generateStartDate(),
    dateTo: generateEndDate(),
    destination: getDestination(),
    id: '0',
    isFavorite: `${getRandomInteger() === 1}`,
    offers: [],
    type: TYPE[getRandomInteger(0, TYPE.length - 1)]
  };

  const offers = pointTypeOffer(point);

  point.offers = [Number(getRandomInteger(1, offers.offers.length)), Number(getRandomInteger(1, offers.offers.length))];

  return point;
}

export { generatePoint };


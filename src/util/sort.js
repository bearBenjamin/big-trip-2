import dayjs from 'dayjs';
import { getDurationDate } from '../util/utils';

const getSortDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const getSortTime = (pointA, pointB) => {
  const durationA = getDurationDate(pointA.dateTo, pointA.dateFrom);
  const durationB = getDurationDate(pointB.dateTo, pointB.dateFrom);
  return durationB - durationA;
};

const getSortPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export { getSortDay, getSortTime, getSortPrice };

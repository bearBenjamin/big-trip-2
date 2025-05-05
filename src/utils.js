import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizePointTime = (dueDate) => dayjs(dueDate).format('HH:mm');
const humanizePointDate = (dueDate) => dayjs(dueDate).format('MMM DD');
const humanizePointDateTime = (dueDate) => dayjs(dueDate).format('YYYY-MM-DD');

const humanizeDateToFormEditing = (dueDate) => dayjs(dueDate).format('DD/MM/YY HH:mm');

const getDurationDate = (start, end) => {
  const date1 = dayjs(start);
  const date2 = dayjs(end);
  const duration = date1.diff(date2, 'minute');
  return duration;
};

const getEverything = (points) => {
  const everything = [];
  points.forEach((point) => everything.push(point));
  return everything;
};

const getFuturePoints = (points) => {
  const dateCurrent = new Date();
  const future = points.filter((point) => {
    const durationStartPoint = dayjs(point.dateFrom).diff(dayjs(dateCurrent));
    const durationEndPoint = dayjs(point.dateTo).diff(dayjs(dateCurrent));

    if ((durationStartPoint < 0 && durationEndPoint > 0) || (durationStartPoint >= 0)) {
      return point;
    }
  });

  return future;
};

const getPastPoints = (points) => {
  const dateCurrent = new Date ();
  const past = points.filter((point) => {
    const durationStartPoint = dayjs(point.dateFrom).diff(dayjs(dateCurrent));
    const durationEndPoint = dayjs(point.dateTo).diff(dayjs(dateCurrent));

    if ((durationStartPoint < 0 && durationEndPoint > 0) || (durationEndPoint < 0)) {
      return point;
    }
  });
  return past;
};

export {getRandomInteger, humanizePointTime, humanizePointDate, humanizePointDateTime, getDurationDate, humanizeDateToFormEditing, getEverything, getFuturePoints, getPastPoints};

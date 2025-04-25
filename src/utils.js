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

const getDurationDate = (start, end) => {
  const date1 = dayjs(start);
  const date2 = dayjs(end);
  const duration = date1.diff(date2, 'minute');
  return duration;
};

export {getRandomInteger, humanizePointTime, humanizePointDate, humanizePointDateTime, getDurationDate};

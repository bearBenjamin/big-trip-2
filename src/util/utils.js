import dayjs from 'dayjs';

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

const updateItem = (items, updata) => {
  const index = items.findIndex((item) => item.id === updata.id);

  if (index === -1) {
    return items;
  }

  const changePoint = [
    ...items.slice(0, index),
    updata,
    ...items.slice(index + 1),
  ];

  return changePoint;
};

export {getRandomInteger, humanizePointTime, humanizePointDate, humanizePointDateTime, getDurationDate, humanizeDateToFormEditing, updateItem };

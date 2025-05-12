import dayjs from 'dayjs';

const getFilterEverything = (points) => {
  const everything = [];
  points.forEach((point) => everything.push(point));
  return everything;
};

const getFilterFuturePoints = (points) => {
  const dateCurrent = new Date();
  const future = points.filter((point) => {
    const durationStartPoint = dayjs(point.dateFrom).diff(dayjs(dateCurrent));
    //const durationEndPoint = dayjs(point.dateTo).diff(dayjs(dateCurrent));

    if (/*(durationStartPoint < 0 && durationEndPoint > 0) ||*/ (durationStartPoint >= 0)) {
      return point;
    }
  });

  return future;
};

const getFilterPastPoints = (points) => {
  const dateCurrent = new Date ();
  const past = points.filter((point) => {
    //const durationStartPoint = dayjs(point.dateFrom).diff(dayjs(dateCurrent));
    const durationEndPoint = dayjs(point.dateTo).diff(dayjs(dateCurrent));

    if (/*(durationStartPoint < 0 && durationEndPoint > 0) ||*/ (durationEndPoint < 0)) {
      return point;
    }
  });
  return past;
};

export { getFilterEverything, getFilterFuturePoints, getFilterPastPoints };


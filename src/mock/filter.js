import { FilterType } from '../util/const';
import { getFilterEverything, getFilterFuturePoints, getFilterPastPoints } from '../util/filter';

const generateFilter = (points) => {
  FilterType.EVERYTHING = getFilterEverything(points);
  FilterType.FUTURE = getFilterFuturePoints(points);
  FilterType.PAST = getFilterPastPoints(points);
  return FilterType;
};

export { generateFilter };

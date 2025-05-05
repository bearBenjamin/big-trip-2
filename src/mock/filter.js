import { FilterType } from '../const';
import { getEverything, getFuturePoints, getPastPoints } from '../utils';

const generateFilter = (points) => {
  FilterType.EVERYTHING = getEverything(points);
  FilterType.FUTURE = getFuturePoints(points);
  FilterType.PAST = getPastPoints(points);
  return FilterType;
};


export { generateFilter };


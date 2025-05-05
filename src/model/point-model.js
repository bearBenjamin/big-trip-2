import { generatePoint } from '../mock/point';
import { POINT_COUNT } from '../const';

const generatePoints = () => {
  const points = Array.from({length: POINT_COUNT}, generatePoint);

  // return points.map((point, index) => {
  //   point.id = String(index + 1);
  //   return point;
  // });
  return points;
};


export default class PointModel {
  #points = generatePoints();

  get points() {
    return this.#points;
  }
}

import { generatePoint } from '../mock/point';
import { POINT_COUNT } from '../const';

const generatePoints = () => {
  const points = Array.from({length: POINT_COUNT}, generatePoint);

  return points.map((point, index) => {
    point.id = String(index + 1);
    return point;
  });
};


export default class PointModel {
  //points = Array.from({length: POINT_COUNT}, generatePoint);
  points = generatePoints();

  getPoints = () => this.points;
}

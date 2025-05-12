import { generatePoints } from '../mock/point';

export default class PointModel {
  #points = generatePoints();

  get points() {
    return this.#points;
  }
}

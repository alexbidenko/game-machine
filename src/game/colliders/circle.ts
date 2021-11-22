import BaseCollider from './base';
import { GameObject } from '../base';

export default class CircleCollider extends BaseCollider {
  radius: number;

  constructor(go: GameObject, radius: number) {
    super(go);
    this.radius = radius;
  }
}

import { GameObject } from '../base';
import CircleCollider from './circle';

export const getObjectsDistance = (g1: GameObject, g2: GameObject) => Math.sqrt(Math.abs(g1.coords.x - g2.coords.x) ** 2 + Math.abs(g1.coords.y - g2.coords.y) ** 2);

export default class BaseCollider {
  gameObject: GameObject;

  constructor(go: GameObject) {
    this.gameObject = go;
  }

  checkCollision(gameObject: GameObject): boolean {
    if (
      Math.abs(gameObject.coords.x - this.gameObject.coords.x) > 100
            && Math.abs(gameObject.coords.y - this.gameObject.coords.y) > 100
    ) return false;
    if (gameObject.collider instanceof CircleCollider && this instanceof CircleCollider) {
      return getObjectsDistance(gameObject, this.gameObject) < (this.radius + gameObject.collider.radius);
    }
    return false;
  }
}

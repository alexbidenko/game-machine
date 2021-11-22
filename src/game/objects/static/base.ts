import { GameObject } from '../../base';
import { globalState } from '../../state';

export default class BaseStatic extends GameObject {
  init() {
    super.init();
  }

  update() {
    super.update();
    if (this.collider) {
      globalState.objects.forEach((el) => {
        if (this.collider!.checkCollision(el) && el.speed > 0) {
          el.coords.x += el.coords.x > this.coords.x ? el.speed : -el.speed;
          el.coords.y += el.coords.y > this.coords.y ? el.speed : -el.speed;
        }
      });
    }
  }
}

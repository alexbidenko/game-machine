import { GameObject } from '../../base';
import { globalState } from '../../state';
import CircleCollider from '../../colliders/circle';

export default class BaseWeapon extends GameObject {
  soundScale = 1;

  inInventory = false;

  radius = 20;

  collider: CircleCollider = new CircleCollider(this, this.radius);

  update() {
    super.update();

    if (this.collider.checkCollision(globalState.player) && !this.inInventory) {
      this.inInventory = true;
      globalState.inventory.activeWeapon.destroy();
      globalState.inventory.activeWeapon = this;
    }
  }

  attack() {}

  drawWeapon() {}
}

import { GameObject } from '../base';
import { globalState } from '../state';

import image from '../../assets/images/enemy.png';
import { getObjectsDistance } from '../colliders/base';
import CircleCollider from '../colliders/circle';

export default class EnemyObject extends GameObject {
  radius = 30;

  deltaTime = -5000;

  speedX = 0;

  speedY = 0;

  live = 100;

  isDefeat = false;

  angry = false;

  image = new Image(this.radius * 2, this.radius * 2);

  imageLoaded = false;

  collider: CircleCollider = new CircleCollider(this, this.radius);

  init() {
    setTimeout(() => (this.angry = true), 2000);
    this.image.src = image;
    this.image.onload = () => {
      this.imageLoaded = true;
    };
  }

  draw() {
    super.draw();
    this.ctx.save();
    if (this.isDefeat) this.ctx.filter = 'grayscale(80%)';
    if (!this.reverse) this.ctx.scale(-1, 1);
    this.ctx.drawImage(this.image, (this.reverse ? 1 : -1) * (this.coords.x - globalState.sceneXDelta) - this.radius, this.coords.y - globalState.sceneYDelta - this.radius);
    this.ctx.restore();
  }

  update() {
    super.update();
    if (this.angry && getObjectsDistance(this, globalState.player) < (200 * (globalState.player.shotSound ? globalState.inventory.activeWeapon.soundScale : 1))) {
      if (Math.abs(globalState.player.coords.x - this.coords.x) > 5) this.coords.x += globalState.player.coords.x > this.coords.x ? 3 : -3;
      if (Math.abs(globalState.player.coords.y - this.coords.y) > 5) this.coords.y += globalState.player.coords.y > this.coords.y ? 3 : -3;
      this.speed = 3;
    } else {
      if (new Date().getTime() - (this.timeCreated + this.deltaTime) > 3000) {
        this.deltaTime = new Date().getTime() - this.timeCreated;
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = (Math.random() - 0.5) * 4;
      }
      this.coords.x += this.speedX;
      this.coords.y += this.speedY;
      this.speed = Math.sqrt(this.speedX ** 2 + this.speedY ** 2);
    }

    if (this.collider.checkCollision(globalState.player)) globalState.player.live -= 2;

    if (this.live <= 0) this.destroy();
  }

  takeDefeat(value: number) {
    this.live -= value;
    this.isDefeat = true;
    setTimeout(() => {
      this.isDefeat = false;
    }, 300);
  }
}

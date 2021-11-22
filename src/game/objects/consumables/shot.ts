import { GameObject } from '../../base';
import { globalState } from '../../state';
import EnemyObject from '../enemy';
import TreeObject from '../static/tree';

import inTarget from '../../../assets/audio/in_target.mp3';
import CircleCollider from '../../colliders/circle';
import WallObject from '../static/wall';

export default class ShotObject extends GameObject {
  direction = 0;

  radius = 20;

  speed = 8;

  collider: CircleCollider = new CircleCollider(this, this.radius);

  draw() {
    super.draw();
    this.ctx.strokeStyle = 'brown';
    this.ctx.lineWidth = 3;
    this.ctx.moveTo(this.coords.x - globalState.sceneXDelta, this.coords.y - globalState.sceneYDelta);
    this.ctx.lineTo(
      this.coords.x + 20 * Math.sin(this.direction) - globalState.sceneXDelta,
      this.coords.y - 20 * Math.cos(this.direction) - globalState.sceneYDelta,
    );
    this.ctx.stroke();
  }

  update() {
    super.update();
    if (this.speed === 0) return;
    this.coords.x += Math.sin(this.direction) * this.speed;
    this.coords.y -= Math.cos(this.direction) * this.speed;

    globalState.objects.forEach((el) => {
      if (el instanceof EnemyObject && this.collider.checkCollision(el)) {
        el.takeDefeat(40);
        this.destroy();
        const audio = new Audio(inTarget);
        audio.play();
      }
      if ((el instanceof TreeObject || el instanceof WallObject) && el.collider.checkCollision(this)) {
        this.speed = 0;
        setTimeout(() => this.destroy(), 1000);
        const audio = new Audio(inTarget);
        audio.play();
      }
    });

    if (new Date().getTime() - this.timeCreated > 500) {
      this.destroy();
    }
  }
}

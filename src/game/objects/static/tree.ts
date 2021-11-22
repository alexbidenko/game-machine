import { globalState } from '../../state';

import tree from '../../../assets/images/tree.png';
import CircleCollider from '../../colliders/circle';
import BaseStatic from './base';

export default class TreeObject extends BaseStatic {
  radius = 30;

  image = new Image(80, 80);

  collider: CircleCollider = new CircleCollider(this, this.radius);

  init() {
    super.init();
    this.image.src = tree;
  }

  draw() {
    super.draw();
    this.ctx.drawImage(this.image, this.coords.x - globalState.sceneXDelta - this.radius - 50, this.coords.y - globalState.sceneYDelta - this.radius - 90);
  }
}

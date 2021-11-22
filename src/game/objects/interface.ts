import { GameObject } from '../base';
import { globalState } from '../state';

export default class InterfaceObject extends GameObject {
  draw() {
    super.draw();
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(50, 50, 200, 40);
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(52, 52, (Math.max(0, globalState.player.live) / 100) * 196, 36);
  }
}

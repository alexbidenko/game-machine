import { GameObject } from '../base';

import gameOver from '../../assets/images/game_over.png';
import { globalState } from '../state';

export default class GameOver extends GameObject {
  image = new Image(934, 390);

  init() {
    super.init();
    this.image.src = gameOver;
    this.animate('show', {
      opacity: 0,
    }, {
      opacity: 1,
    }, 500);
  }

  draw() {
    super.draw();
    this.ctx.save();
    this.ctx.globalAlpha = this.animations.show?.current?.opacity || 1;
    this.ctx.drawImage(this.image, 0, 0, globalState.sceneWidth, globalState.sceneHeight);
    this.ctx.restore();
  }
}

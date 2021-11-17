import {GameObject} from "../base";
import collision from "../utils/collision";
import {globalState} from "../state";

import poison from '../../assets/images/poison.png'

export default class HealObject extends GameObject {
    radius = 20;
    image = new Image(40, 40)

    init() {
        super.init();
        this.image.src = poison
    }

    draw() {
        super.draw();
        this.ctx.drawImage(this.image, this.coords.x - globalState.sceneXDelta - this.radius, this.coords.y - globalState.sceneYDelta - this.radius)
    }

    update() {
        super.update();
        if (collision(this, globalState.player) && globalState.player.live < 100) {
            globalState.player.live = Math.min(100, globalState.player.live + 20);
            this.destroy()
        }
    }
}
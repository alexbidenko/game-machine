import {GameObject} from "../base";
import {globalState} from "../state";

import poison from '../../assets/images/poison.png'
import poisonSound from '../../assets/audio/potion.mp3'
import CircleCollider from "../colliders/circle";

export default class HealObject extends GameObject {
    radius = 20;
    image = new Image(40, 40)

    collider: CircleCollider = new CircleCollider(this, this.radius)

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
        if (this.collider.checkCollision(globalState.player) && globalState.player.live < 100) {
            globalState.player.live = Math.min(100, globalState.player.live + 20);
            new Audio(poisonSound).play()
            this.destroy()
        }
    }
}
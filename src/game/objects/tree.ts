import {GameObject} from "../base";
import collision from "../utils/collision";
import {globalState} from "../state";

import tree from '../../assets/tree.png';

export default class TreeObject extends GameObject {
    radius = 30;

    image = new Image(80, 80)

    init() {
        super.init();
        this.image.src = tree
    }

    draw() {
        super.draw();
        this.ctx.drawImage(this.image, this.coords.x - globalState.sceneXDelta - this.radius - 50, this.coords.y - globalState.sceneYDelta - this.radius - 90)
    }

    update() {
        super.update();
        globalState.objects.forEach((el) => {
            if (collision(el, this) && el.speed > 0) {
                el.coords.x += el.coords.x > this.coords.x ? el.speed : -el.speed
                el.coords.y += el.coords.y > this.coords.y ? el.speed : -el.speed
            }
        })
    }
}
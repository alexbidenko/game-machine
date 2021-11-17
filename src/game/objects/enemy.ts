import {GameObject} from "../base";
import {globalState} from "../state";
import collision, {getDistance} from "../utils/collision";

import image from '../../assets/enemy.png'

export default class EnemyObject extends GameObject {
    radius = 30;

    deltaTime = -5000;
    speedX = 0;
    speedY = 0;

    angry = false;

    image = new Image(this.radius * 2, this.radius * 2)
    imageLoaded = false;

    init() {
        setTimeout(() => this.angry = true, 2000)
        this.image.src = image;
        this.image.onload = () => {
            this.imageLoaded = true
        }
    }

    draw() {
        super.draw();
        this.ctx.drawImage(this.image, this.coords.x - globalState.sceneXDelta - this.radius, this.coords.y - globalState.sceneYDelta - this.radius)
    }

    update() {
        super.update();
        if (this.angry && getDistance(this, globalState.player) < (globalState.player.shotSound ? 600 : 200)) {
            this.coords.x += globalState.player.coords.x > this.coords.x ? 3 : -3
            this.coords.y += globalState.player.coords.y > this.coords.y ? 3 : -3
            this.speed = 3
        } else {
            if (new Date().getTime() - (this.timeCreated + this.deltaTime) > 3000) {
                this.deltaTime = new Date().getTime() - this.timeCreated;
                this.speedX = (Math.random() - 0.5) * 4
                this.speedY = (Math.random() - 0.5) * 4
            }
            this.coords.x += this.speedX
            this.coords.y += this.speedY
            this.speed = Math.sqrt(this.speedX ** 2 + this.speedY ** 2)
        }

        if (collision(this, globalState.player)) globalState.player.live -= 2
    }
}
import {GameObject} from "../../base";
import {globalState} from "../../state";
import EnemyObject from "../enemy";
import collision from "../../utils/collision";
import TreeObject from "../tree";

import inTarget from '../../../assets/audio/in_target.mp3'

export default class ShotObject extends GameObject {
    direction = 0;
    radius = 20;
    speed = 8

    draw() {
        super.draw();
        this.ctx.strokeStyle = 'brown'
        this.ctx.lineWidth = 3
        this.ctx.moveTo(this.coords.x - globalState.sceneXDelta, this.coords.y - globalState.sceneYDelta);
        this.ctx.lineTo(
            this.coords.x + 20 * Math.sin(this.direction) - globalState.sceneXDelta,
            this.coords.y - 20 * Math.cos(this.direction) - globalState.sceneYDelta
        );
        this.ctx.stroke()
    }

    update() {
        super.update();
        this.coords.x += Math.sin(this.direction) * this.speed
        this.coords.y -= Math.cos(this.direction) * this.speed

        globalState.objects.forEach((el) => {
            if (el instanceof EnemyObject && collision(el, this)) {
                el.takeDefeat(40)
                this.destroy()
                const audio = new Audio(inTarget)
                audio.play()
            }
            if (el instanceof TreeObject && collision(el, this)) {
                this.destroy();
                const audio = new Audio(inTarget)
                audio.play()
            }
        })

        if (new Date().getTime() - this.timeCreated > 500) {
            this.destroy()
        }
    }
}
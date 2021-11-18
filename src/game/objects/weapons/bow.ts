import BaseWeapon from "./base";
import ShotObject from "../consumables/shot";
import {globalState} from "../../state";

import shotSound from '../../../assets/audio/shot.mp3'

export default class BowObject extends BaseWeapon {
    soundScale = 2;

    attack() {
        super.attack();
        const shot = new ShotObject(this.ctx, globalState.player.coords);
        shot.direction = globalState.player.direction
        const audio = new Audio(shotSound);
        audio.play();
    }

    drawWeapon() {
        super.drawWeapon();

        this.ctx.fillStyle = 'black'
        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = 4
        this.ctx.beginPath();
        this.ctx.moveTo(globalState.player.coords.x - globalState.sceneXDelta, globalState.player.coords.y - globalState.sceneYDelta);
        this.ctx.lineTo(
            globalState.player.coords.x + globalState.player.radius * Math.sin(globalState.player.direction) - globalState.sceneXDelta,
            globalState.player.coords.y - globalState.player.radius * Math.cos(globalState.player.direction) - globalState.sceneYDelta
        );
        this.ctx.stroke();
    }
}
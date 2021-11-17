import {GameObject} from "../base";
import {globalState} from "../state";

import grass from '../../assets/images/grass.jpg';

export default class MapObject extends GameObject{
    grass = new Image(640, 640)
    grassLoaded = false;

    init() {
        super.init();
        this.grass.src = grass;
        this.grass.onload = () => {
            this.grassLoaded = true
        }
    }

    draw() {
        if (this.grassLoaded) {
            for (let i = 0; i < 30; i++) {
                for (let j = 0; j < 30; j++) {
                    this.ctx.drawImage(this.grass, -640 * 5 + i * 640 - globalState.sceneXDelta, -640 * 5 + j * 640 - globalState.sceneYDelta)
                }
            }
        }
    }
}
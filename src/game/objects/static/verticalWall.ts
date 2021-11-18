import RectangleCollider from "../../colliders/rectangle";

import wallFragment from '../../../assets/images/wall_fragment.png';
import {globalState} from "../../state";
import BaseStatic from "./base";

export default class VerticalWallObject extends BaseStatic {
    collider: RectangleCollider = new RectangleCollider(this, -200, 0, 400, 400);

    image = new Image(400, 400)

    init() {
        super.init();
        this.image.src = wallFragment;
    }

    draw() {
        super.draw();
        this.ctx.drawImage(this.image, this.coords.x - globalState.sceneXDelta - 200, this.coords.y - globalState.sceneYDelta)
        this.ctx.drawImage(this.image, this.coords.x - globalState.sceneXDelta - 200, this.coords.y - globalState.sceneYDelta + 107)
        this.ctx.drawImage(this.image, this.coords.x - globalState.sceneXDelta - 200, this.coords.y - globalState.sceneYDelta + 215)
    }
}
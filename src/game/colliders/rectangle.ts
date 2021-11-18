import BaseCollider from "./base";
import {GameObject} from "../base";
import CircleCollider from "./circle";

type CircleType = {
    x: number;
    y: number;
    r: number;
}

type RectangleType = {
    x: number;
    y: number;
    w: number;
    h: number;
}

function RectCircleColliding(circle: CircleType, rect: RectangleType) {
    const distX = Math.abs(circle.x - rect.x-rect.w/2);
    const distY = Math.abs(circle.y - rect.y-rect.h/2);
    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }
    if (distX <= (rect.w/2)) { return true; }
    if (distY <= (rect.h/2)) { return true; }
    const dx=distX-rect.w/2;
    const dy=distY-rect.h/2;
    return (dx * dx + dy * dy <= (circle.r * circle.r));
}

export default class RectangleCollider extends BaseCollider {
    dx: number;
    dy: number;
    width: number;
    height: number;

    constructor(go: GameObject, dx: number, dy: number, width: number, height: number) {
        super(go);
        this.dx = dx;
        this.dy = dy;
        this.width = width;
        this.height = height
    }

    checkCollision(gameObject: GameObject): boolean {
        if (
            Math.abs(gameObject.coords.x - this.gameObject.coords.x) > 400
            && Math.abs(gameObject.coords.y - this.gameObject.coords.y) > 400
        ) return false;

        if (gameObject.collider instanceof CircleCollider && this instanceof RectangleCollider) {
            return RectCircleColliding(
                {
                    x: gameObject.coords.x,
                    y: gameObject.coords.y,
                    r: gameObject.collider.radius,
                },
                { x: this.gameObject.coords.x + this.dx, y: this.gameObject.coords.y + this.dy, w: this.width, h: this.height }
            );
        }

        return false
    }
}

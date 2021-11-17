import {globalState} from "./state";

export type CoordinatesType = { x: number; y: number };

export class GameObject {
    key: number;
    ctx: CanvasRenderingContext2D;
    prevCoords: CoordinatesType;
    coords: CoordinatesType;

    radius = 1
    speed = 0;
    reverse = false;

    events = [] as [string, (event: Event) => void][];

    timeCreated = 0;

    constructor(ctx: CanvasRenderingContext2D, coords: CoordinatesType = {x: 0, y: 0}) {
        this.ctx = ctx;
        this.prevCoords = {...coords};
        this.coords = {...coords};
        this.key = Math.random();
        this.timeCreated = new Date().getTime()
        globalState.objects.push(this)
    }

    init() {
        this.events.forEach((el) => {
            window.addEventListener(el[0], el[1]);
        });
    }

    draw() {}

    update() {
        if (this.coords.x !== this.prevCoords.x) this.reverse = this.coords.x < this.prevCoords.x
        this.prevCoords = { ...this.coords };
    }

    destroy() {
        globalState.objects = globalState.objects.filter((el) => el.key !== this.key);
        this.events.forEach((el) => {
            window.removeEventListener(el[0], el[1]);
        });
    }
}
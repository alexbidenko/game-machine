import {globalState} from "./state";

export type CoordinatesType = { x: number; y: number };

export type AnimationStateType = {
    from: Record<string, number | (() => number)>;
    current?: Record<string, number>;
    to: Record<string, number | (() => number)>;
    timeStart: number;
    time: number;
    timeState: number;
}

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

    animations = {} as Record<string, AnimationStateType>;

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
        Object.keys(this.animations).forEach((k) => {
            const el = this.animations[k];
            if (el.timeState > el.time) {
                delete this.animations[k];
                return;
            }
            el.current = {};
            Object.keys(el.from).forEach((key) => {
                const getKey = (k1: 'from' | 'to'): number => (typeof el[k1][key] === 'number' ? el[k1][key] : (el[k1][key] as any)())
                el.current![key] = getKey('from') + (getKey('to') - getKey('from')) * (el.timeState / el.time)
            });
            el.timeState = new Date().getTime() - el.timeStart;
        });
    }

    destroy() {
        globalState.objects = globalState.objects.filter((el) => el.key !== this.key);
        this.events.forEach((el) => {
            window.removeEventListener(el[0], el[1]);
        });
    }

    animate(key: string, from: AnimationStateType['from'], to: AnimationStateType['to'], time: number) {
        this.animations[key] = {
            from,
            to,
            timeStart: new Date().getTime(),
            time,
            timeState: 0,
        };
    }
}
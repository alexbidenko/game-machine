import {globalState} from "./state";
import BaseCollider from "./colliders/base";

export type CoordinatesType = { x: number; y: number };

export type AnimationStateType = {
    from: Record<string, number | (() => number)>;
    current?: Record<string, number>;
    to: Record<string, number | (() => number)>;
    timeStart: number;
    time: number;
    timeState: number;
    recursive: boolean;
}

export type AnimationFramesType = {
    getFrame: (timeState: number) => HTMLImageElement;
    timeStart: number;
    time: number;
    timeState: number;
    recursive: boolean;
}

export class GameObject {
    key: number;
    ctx: CanvasRenderingContext2D;
    prevCoords: CoordinatesType;
    coords: CoordinatesType;

    speed = 0;
    reverse = false;

    events = [] as [string, (event: Event) => void][];

    timeCreated = 0;

    animations = {} as Record<string, AnimationStateType>;
    frameAnimations = {} as Record<string, AnimationFramesType>;

    collider: BaseCollider | null = null;

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
        Object.keys(this.frameAnimations).forEach((k) => {
            const el = this.frameAnimations[k];
            if (el.timeState > el.time) {
                if (el.recursive) {
                    el.timeState = 0
                    el.timeStart = new Date().getTime()
                } else {
                    delete this.animations[k];
                    return;
                }
            }
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
            recursive: false,
        };
    }

    animateFrame(key: string, getFrame: AnimationFramesType['getFrame'], time: number, recursive = false) {
        this.frameAnimations[key] = {
            getFrame,
            timeStart: new Date().getTime(),
            time,
            timeState: 0,
            recursive,
        };
    }
}
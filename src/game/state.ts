import {GameObject} from "./base";
import {Player} from "./objects/player";
import BaseWeapon from "./objects/weapons/base";

export const globalState = {
    keys: [] as string[],
    sceneWidth: window.innerWidth,
    sceneHeight: window.innerHeight,
    sceneXDelta: 0,
    sceneYDelta: 0,
    player: {} as Player,
    objects: [] as GameObject[],
    canvas: {} as HTMLCanvasElement,
    inventory: {
        activeWeapon: {} as BaseWeapon,
    }
}

const initState = () => {
    window.addEventListener('keydown', (event) => {
        globalState.keys.push(event.key)
        if (event.key === 'Escape') location.reload()
    })
    window.addEventListener('keyup', (event) => {
        globalState.keys = globalState.keys.filter((el) => el !== event.key)
    })
    window.addEventListener('resize', () => {
        globalState.sceneWidth = window.innerWidth
        globalState.sceneHeight = window.innerHeight
        globalState.canvas.width = window.innerWidth
        globalState.canvas.height = window.innerHeight
    })
}

export default initState

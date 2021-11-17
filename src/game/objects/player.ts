import {GameObject} from "../base";
import {globalState} from "../state";
import ShotObject from "./shot";

import image from '../../assets/images/player.png'
import shotSound from '../../assets/audio/shot.mp3'

const PLAYER_WIDTH = 80;

export class Player extends GameObject {
    speed = 6;
    direction = 0;
    radius = PLAYER_WIDTH / 2;

    shotSoundTimer = 0;
    shotSound = false;
    lastShotTime = 0;

    live = 100;

    image = new Image(this.radius * 2, this.radius * 2)

    events = [
        [
            'mousemove',
            (event: MouseEvent) => {
                this.direction = Math.atan2(
                    (event.clientX - (this.coords.x - globalState.sceneXDelta)),
                    (-event.clientY + (this.coords.y - globalState.sceneYDelta))
                )
            }
        ],
        [
            'click',
            () => {
                if (new Date().getTime() - this.lastShotTime < 500) return;
                this.lastShotTime = new Date().getTime()
                const shot = new ShotObject(this.ctx, this.coords);
                shot.direction = this.direction
                const audio = new Audio(shotSound);
                audio.play();
                this.shotSound = true
                clearTimeout(this.shotSoundTimer)
                this.shotSoundTimer = setTimeout(() => {
                    this.shotSound = false
                }, 2000)
            }
        ]
    ] as GameObject['events'];

    init() {
        super.init()
        this.image.src = image;
    }

    draw() {
        super.draw();
        this.ctx.save()
        if (this.reverse) this.ctx.scale(-1, 1);
        this.ctx.drawImage(this.image, (this.reverse ? -1 : 1) * (this.coords.x - globalState.sceneXDelta) - this.radius, this.coords.y - globalState.sceneYDelta - this.radius)
        this.ctx.restore();

        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = 4
        this.ctx.beginPath();
        this.ctx.moveTo(this.coords.x - globalState.sceneXDelta, this.coords.y - globalState.sceneYDelta);
        this.ctx.lineTo(
            this.coords.x + (PLAYER_WIDTH / 2) * Math.sin(this.direction) - globalState.sceneXDelta,
            this.coords.y - (PLAYER_WIDTH / 2) * Math.cos(this.direction) - globalState.sceneYDelta
        );
        this.ctx.stroke();
    }

    update() {
        super.update();
        if (this.live <= 0) this.destroy()

        if (globalState.keys.includes('w') || globalState.keys.includes('ц')) {
            this.coords.y -= this.speed;
        }
        if (globalState.keys.includes('s') || globalState.keys.includes('ы')) {
            this.coords.y += this.speed;
        }
        if (globalState.keys.includes('a') || globalState.keys.includes('ф')) {
            this.coords.x -= this.speed;
        }
        if (globalState.keys.includes('d') || globalState.keys.includes('в')) {
            this.coords.x += this.speed;
        }

        if (this.coords.x < globalState.sceneXDelta + globalState.sceneWidth * 0.4) globalState.sceneXDelta -= this.speed;
        if (this.coords.x > globalState.sceneXDelta + globalState.sceneWidth * 0.6) globalState.sceneXDelta += this.speed;
        if (this.coords.y < globalState.sceneYDelta + globalState.sceneHeight * 0.4) globalState.sceneYDelta -= this.speed;
        if (this.coords.y > globalState.sceneYDelta + globalState.sceneHeight * 0.6) globalState.sceneYDelta += this.speed;
    }
}
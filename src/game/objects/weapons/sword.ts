import collision from "../../utils/collision";
import {globalState} from "../../state";

import sword from '../../../assets/images/sword.png'
import swordEmptyEffect from '../../../assets/audio/empty_sword_effect.wav'
import swordShotEffect from '../../../assets/audio/sword_shot_effect.wav'
import BaseWeapon from "./base";
import EnemyObject from "../enemy";

export default class SwordObject extends BaseWeapon {
    soundScale = 3
    radius = 20;
    image = new Image(40, 40)
    isAttack = false

    init() {
        super.init();
        this.image.src = sword
    }

    draw() {
        super.draw();
        this.ctx.drawImage(this.image, this.coords.x - globalState.sceneXDelta - this.radius, this.coords.y - globalState.sceneYDelta - this.radius)
    }

    update() {
        super.update();
        if (collision(this, globalState.player)) {
            globalState.inventory.activeWeapon = new SwordObject(this.ctx);
            globalState.inventory.activeWeapon.init()
            this.destroy()
        }
        if (this.isAttack) {
            globalState.objects.forEach((el) => {
                if (el instanceof EnemyObject && collision(el, globalState.player)) {
                    el.takeDefeat(100)
                    const audio = new Audio(swordShotEffect);
                    audio.play();
                }
            })
        }
    }

    drawWeapon() {
        super.drawWeapon();
        this.ctx.save()
        const x = (globalState.player.reverse && !this.isAttack ? -1 : 1) *
            (globalState.player.coords.x - globalState.sceneXDelta)
            - this.radius + 20 + (
                +this.isAttack * (this.animations.attack?.current?.xDelta || 0) *
                (globalState.player.reverse ? -1 : 1)
            )
        const y = globalState.player.coords.y - globalState.sceneYDelta - this.radius - (this.animations.attack?.current?.yDelta || 10)
        if (this.isAttack) {
            this.ctx.translate(x, y);
            this.ctx.rotate(this.animations.attack?.current?.rotate || 0)
        }
        if (globalState.player.reverse) this.ctx.scale(-1, 1);
        this.ctx.drawImage(this.image,
            this.isAttack ? 0 : x,
            this.isAttack ? 0 : y
        )
        this.ctx.restore();
    }

    attack() {
        super.attack();
        this.isAttack = true
        globalState.player.speed *= 1.5
        const audio = new Audio(swordEmptyEffect);
        audio.play();
        this.animate(
            'attack',
            {
                yDelta: -15,
                xDelta: 40,
                rotate: () => Math.PI / 2 * (globalState.player.reverse ? -1 : 1),
            },
            {
                yDelta: 10,
                xDelta: 0,
                rotate: 0,
            },
            150,
        );
        setTimeout(() => {
            globalState.player.speed = globalState.player.defaultSpeed
            this.isAttack = false
        }, 200)
    }
}
import * as PIXI from 'pixi.js';
import * as RAPIER from '@dimforge/rapier2d'
const SCALE = 1;
import {Char} from './src/char.ts'

export async function init(): Promise<void> {
    const app = new PIXI.Application();
    await app.init({ width: 1280, height: 720});
    document.body.appendChild(app.canvas);

    let gravity = { x: 0.0, y: 9.81*2};
    let world = new RAPIER.World(gravity);
    
    const char = new Char(app, world);

    let floor = new PIXI.Graphics()
        .rect(0, 200, 1280, 3)
        .fill(0xb00b55);
    app.stage.addChild(floor);
    const floorDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 207);
    const floorBody = world.createRigidBody(floorDesc);
    const floorColiderDesc = RAPIER.ColliderDesc.cuboid(1280, 10);
    world.createCollider(floorColiderDesc, floorBody);

    function gameLoop() {
        world.step();

        char.update()

        requestAnimationFrame(gameLoop);
    }
    gameLoop();
}

init();


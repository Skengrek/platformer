import * as PIXI from 'pixi.js';
import * as RAPIER from '@dimforge/rapier2d'
const SCALE = 1;

export async function init(): Promise<void> {
    const app = new PIXI.Application();
    await app.init({ width: 1280, height: 720});
    document.body.appendChild(app.canvas);

    let gravity = { x: 0.0, y: 9.81 };
    let world = new RAPIER.World(gravity);
    
    let cube = new PIXI.Graphics()
        .rect(0, 0, 5, 5)
        .fill(0xff0000);
    app.stage.addChild(cube);

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(100 / SCALE, 100 / SCALE);
    const cubeBody = world.createRigidBody(bodyDesc);
    const colliderDesc = RAPIER.ColliderDesc.cuboid(1, 1); // 1x1 meters
    world.createCollider(colliderDesc, cubeBody);


    let floor = new PIXI.Graphics()
        .rect(0, 200, 1280, 3)
        .fill(0xb00b55);
    app.stage.addChild(floor);
    const floorDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 197);
    const floorBody = world.createRigidBody(floorDesc);
    const floorColiderDesc = RAPIER.ColliderDesc.cuboid(1280, 1);
    world.createCollider(floorColiderDesc, floorBody);

    function gameLoop() {
        world.step();

        const position = cubeBody.translation();
        const rotation = cubeBody.rotation();

        cube.position.set(position.x * SCALE, position.y * SCALE);
        cube.rotation = rotation;

        requestAnimationFrame(gameLoop);
    }
    gameLoop();
}

init();


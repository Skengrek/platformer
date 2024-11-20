import * as PIXI from 'pixi.js';
import * as RAPIER from '@dimforge/rapier2d'

export class Char {
    cube: PIXI.Graphics;
    cubeBody: RAPIER.RigidBody;
    keys: { [key: string]: boolean } = {};
    speed: number = 5;

    constructor(app:PIXI.Application, world: RAPIER.World, x: number = 0, y: number = 0){
        const bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(x, y);
        this.cubeBody = world.createRigidBody(bodyDesc);
        const colliderDesc = RAPIER.ColliderDesc.cuboid(1, 1); // 1x1 meters
        world.createCollider(colliderDesc, this.cubeBody);

        this.cube = new PIXI.Graphics()
            .rect(0, 0, 5, 5)
            .fill(0xff0000);
        app.stage.addChild(this.cube);

        window.addEventListener('keydown', (e) => (this.keys[e.key.toLowerCase()] = true));
        window.addEventListener('keyup', (e) => (this.keys[e.key.toLowerCase()] = false));
    }

    update() {
        const impulse = { x: 0, y: 0 };
        // Handle WASD input
        if (this.keys['w']) impulse.y -= this.speed;
        if (this.keys['s']) impulse.y += this.speed;
        if (this.keys['a']) impulse.x -= this.speed;
        if (this.keys['d']) impulse.x += this.speed;

        // Apply impulse to the rigid body
        if (impulse.x !== 0 || impulse.y !== 0) {
            this.cubeBody.applyImpulse(
                { x: impulse.x, y: impulse.y },
                true
            );
        }

        const position = this.cubeBody.translation();
        const rotation = this.cubeBody.rotation();
        this.cube.position.set(position.x, position.y);
        this.cube.rotation = rotation;
    }
}
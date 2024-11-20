import * as PIXI from 'pixi.js';
import * as RAPIER from '@dimforge/rapier2d'

export class Char {
    cube: PIXI.Graphics;
    cubeBody: RAPIER.RigidBody

    constructor(app:PIXI.Application, world: RAPIER.World, x: number = 0, y: number = 0){
        const bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(x, y);
        this.cubeBody = world.createRigidBody(bodyDesc);
        const colliderDesc = RAPIER.ColliderDesc.cuboid(1, 1); // 1x1 meters
        world.createCollider(colliderDesc, this.cubeBody);

        this.cube = new PIXI.Graphics()
            .rect(0, 0, 5, 5)
            .fill(0xff0000);
        app.stage.addChild(this.cube);
    }

    update() {
        const position = this.cubeBody.translation();
        const rotation = this.cubeBody.rotation();
        this.cube.position.set(position.x, position.y);
        this.cube.rotation = rotation;
    }
}
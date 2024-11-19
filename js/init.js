import * as PIXI from "pixijs";
import * as RAPIER from "rapier";


export default async function init(){
    // Graphic
    const app = new PIXI.Application();
    await app.init({ width: 1280, height: 720});
    document.body.appendChild(app.canvas);

    // physic
    await RAPIER.init();
    let gravity = {x: 0.0, y: -9.81};
    const world = new RAPIER.World(gravity)
    const { vertices, colors } = world.debugRender();
};


function render(world) {
    const { vertices, colors } = world.debugRender();

    this.lines.clear();

    for (let i = 0; i < vertices.length / 4; i += 1) {
        let color = PIXI.utils.rgb2hex([
            colors[i * 8],
            colors[i * 8 + 1],
            colors[i * 8 + 2],
        ]);
        this.lines.lineStyle(1.0, color, colors[i * 8 + 3], 0.5, true);
        this.lines.moveTo(vertices[i * 4], -vertices[i * 4 + 1]);
        this.lines.lineTo(vertices[i * 4 + 2], -vertices[i * 4 + 3]);
    }

    this.renderer.render(this.scene);
}
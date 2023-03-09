import * as BABYLON from 'babylonjs'
import { Color3 } from 'babylonjs';
import { Drawer } from './Drawer';
import { solarSystem, solarSystemColors, sol } from './SolarSystem';
export class AppOne {
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;
    drawer: Drawer;

    constructor(readonly canvas: HTMLCanvasElement) {
        this.engine = new BABYLON.Engine(canvas)
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
        this.scene = createScene(this.engine, this.canvas) //initialize the camera and lights 
        console.log("created scene");
        this.drawer = new Drawer(this.scene)
        console.log("created drawer");
        this.drawer.drawSolarSystem(solarSystem, solarSystemColors)
        console.log("drew solarsystem");
        

    }

    debug(debugOn: boolean = true) {
        if (debugOn) {
            this.scene.debugLayer.show({ overlay: true });
        } else {
            this.scene.debugLayer.hide();
        }
    }
    //run is called from main.ts after canvas is created and an Appone is made
    run() {
        this.debug(true);
        var alpha = 0;
        this.engine.runRenderLoop(() => {
            alpha += 0.001
            this.drawer.updatePlanetarySystem(solarSystem, alpha)
            this.scene.render();
        });
    }

}


var createScene = function (engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    // this is the default code from the playground:

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 500, BABYLON.Vector3.Zero(), scene);
    

    

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    //var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    //light.intensity = 0.7;

    // Our built-in 'sphere' shape.
    //var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);

    // Move the sphere upward 1/2 its height
    //sphere.position.y = 1;

    // Our built-in 'ground' shape.
    //var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

    return scene;
};
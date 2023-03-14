import * as BABYLON from 'babylonjs'
import { AbstractMesh, ArcRotateCamera, Color3, PickingInfo, Vector3 } from 'babylonjs';
import { Drawer } from './Drawer';
import { PlanetarySystem } from './PlanetarySystem';
import { solarSystem, solarSystemColors, sol, sizes } from './SolarSystem';
export class AppOne {
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;
    drawer: Drawer;
    system: PlanetarySystem;

    constructor(readonly canvas: HTMLCanvasElement) {
        //create engine: not sure about anit aliasing, but stencil true allows for highlights
        this.engine = new BABYLON.Engine(canvas, true, {stencil: true})
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
        this.scene = createScene(this.engine, this.canvas) //initialize the camera and lights 
        this.drawer = new Drawer(this.scene)
        this.system = solarSystem;
        this.drawer.drawSolarSystem(this.system, solarSystemColors)
        this.drawer.drawOrbits(this.system)
        sizes.forEach(size => {
            console.log(this.drawer.scaleCelestialBody(size));
             
        });

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
        
        //menu items
        let blueMenuItem = document.getElementById('blue-menu-item'),
            greenMenuItem = document.getElementById('green-menu-item'),
            redMenuItem = document.getElementById('red-menu-item'),
            currentsys = this.system;
        
        console.log(currentsys);

        function clickedMenuBlue(){
            let earth = currentsys.getPlanetaryMassByName("terra")
            if (earth)
                earth.layers[0].logElements()
        }
    
        function clickedMenuGreen(){
            let earth = currentsys.getPlanetaryMassByName("terra")
            if (earth)
                console.log(earth.size);
        }
    
        function clickedMenuRed(){
            let earth = currentsys.getPlanetaryMassByName("terra")
            if (earth)
                console.log(earth.name);
        }
        
        if (blueMenuItem)
            blueMenuItem.addEventListener('click', clickedMenuBlue);
        if (greenMenuItem)
            greenMenuItem.addEventListener('click', clickedMenuGreen);
        if (redMenuItem)
            redMenuItem.addEventListener('click', clickedMenuRed);



        var alpha = 0;
        this.engine.runRenderLoop(() => {
            alpha += 0.001
            this.drawer.updatePlanetarySystem(this.system, alpha)
            this.drawer.updateOrbits(this.system)
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
    camera.zoomToMouseLocation = true;
    camera.inputs.addMouseWheel();
    camera.wheelPrecision = 1.0
    camera.wheelDeltaPercentage = 0.05
    camera.maxZ = 50000
    camera.upperRadiusLimit = 10000
    //click on mesh centers the mesh 
    //----------------------------!!!!!!!!!!!!!!!!!!!!----------------------//
    //setting ineteractions here is probably fine since it's in a scene and the scene dictates the interaction
    scene.onPointerDown = function (evt, pickInfo) {
        if (pickInfo.hit && pickInfo.pickedMesh) {
            animateCamera(camera, pickInfo.pickedMesh);
        }
    }
    //animates the between the 2 camera positions. No idea how this works ripped it from a babylon playground
    //maybe I can do this with just a follow cam
    var animateCamera = function (camera: ArcRotateCamera, newTarget: AbstractMesh) {
        var name = newTarget.name;
        var body = solarSystem.getBodyByName(name)
    
        
        console.log("clicked on: " + body);

        const alpha = camera.alpha;
        const beta = camera.beta;
        const radius = camera.radius;
        const target = camera.getTarget().clone();

        camera.focusOn([newTarget], true);
        camera.rebuildAnglesAndRadius();
        var animCamAlpha = new BABYLON.Animation("animCam", "alpha", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);

        var keysAlpha = [];
        keysAlpha.push({
            frame: 0,
            value: alpha
        });
        keysAlpha.push({
            frame: 100,
            value: camera.alpha
        });
        var animCamBeta = new BABYLON.Animation("animCam", "beta", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);

        var keysBeta = [];
        keysBeta.push({
            frame: 0,
            value: beta
        });
        keysBeta.push({
            frame: 100,
            value: 1
        });
        var animCamRadius = new BABYLON.Animation("animCam", "radius", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);

        var keysRadius = [];
        keysRadius.push({
            frame: 0,
            value: radius
        });
        keysRadius.push({
            frame: 100,
            value: (body.size + 50) //<------------- set zoom value change
        });

        var animCamTarget = new BABYLON.Animation("animTarget", "_target", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);

        var keysTarget = [];

        keysTarget.push({
            frame: 0,
            value: target
        });

        keysTarget.push({
            frame: 100,
            value: camera.target.clone()
        });
        animCamAlpha.setKeys(keysAlpha);
        animCamBeta.setKeys(keysBeta);
        animCamRadius.setKeys(keysRadius);
        animCamTarget.setKeys(keysTarget);

        camera.animations.push(animCamAlpha);
        camera.animations.push(animCamBeta);
        camera.animations.push(animCamRadius);
        camera.animations.push(animCamTarget);

        camera.alpha = alpha;
        camera.beta = beta;
        camera.radius = radius;
        camera.target.copyFrom(target);

        scene.beginAnimation(camera, 0, 100, false, 2, function () {  
        });

    }

    console.log("created scene and camera");

    return scene;
};
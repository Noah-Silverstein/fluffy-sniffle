/*
this will draw all elements on the screen 
so draw a planet
or move/redraw a planet 
all of that happens here
scaling from d3 scaling https://github.com/d3/d3-scale/blob/main/README.md#power-scales
*/

import { AbstractMesh, ActionManager, Color3, Curve3, ExecuteCodeAction, HighlightLayer, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from "babylonjs";
import { CelestialBody, Moon, Planet, Star } from "./CelestialBodies";
import { PlanetarySystem } from "./PlanetarySystem";
import { scalePow, scaleLog } from "d3-scale"

export class Drawer {
    scene: Scene;
    planethl: HighlightLayer;
    constructor(scene: Scene){
        this.scene = scene
        console.log("created drawer");
        //highlighter
        this.planethl = new HighlightLayer("planethighlightlayer", this.scene, {blurHorizontalSize: 0.5, blurVerticalSize: 0.5})
        this.planethl.innerGlow = false; // disable the inner glow effect
        //this.planethl.outerGlow = false; // disable the outer glow effect
    }

    scaleCelestialBody(num: number){
        let customPwrFct = scalePow().domain([1000,1392000]).range([2,150]);
        let customLogFct = scaleLog().domain([1000,1392000]).range([5,150]);
        return customLogFct(num);
    }
    
    drawPlanet(planet: Planet | CelestialBody, color: Color3){
        let planetMesh = MeshBuilder.CreateSphere(planet.name, { diameter: planet.size }, this.scene);
        let planetMaterial = new StandardMaterial(planet.name+"Material", this.scene); 
        //set color to material
        planetMaterial.emissiveColor = color
        //set material to mesh
        planetMesh.material = planetMaterial;
        //set mesh to be pickable
        planetMesh.isPickable = true; 
        //what to do when hovering over the mesh
        this.setMeshSelectable(planetMesh, this.scene, this.planethl, new Color3(0,0,0))
    }

    drawMoon(moon: Moon | CelestialBody, color: Color3){
        let moonMesh = MeshBuilder.CreateSphere(moon.name, { diameter: moon.size }, this.scene);
        let moonMaterial = new StandardMaterial(moon.name+"Material", this.scene); 
        //set color to material
        moonMaterial.emissiveColor = color
        //set material to mesh
        moonMesh.material = moonMaterial;
        //set mesh to be pickable
        moonMesh.isPickable = true; 
        //what to do when hovering over the mesh
        this.setMeshSelectable(moonMesh, this.scene, this.planethl, new Color3(0,0,0))


    }

    //have to allow celestialbody for some reason
    drawStar(star: Star | CelestialBody, color: Color3){
        let starMesh = MeshBuilder.CreateSphere(star.name, { diameter: star.size }, this.scene);
        let starMaterial = new StandardMaterial(star.name+"Material", this.scene); 
        //set color to material
        starMaterial.emissiveColor = color
        //set material to mesh
        starMesh.material = starMaterial;
        //set mesh to be pickable
        starMesh.isPickable = true; 
        //what to do when hovering over the mesh
        this.setMeshSelectable(starMesh, this.scene, this.planethl, new Color3(0,0,0))

    }

    drawSolarSystem(sys: PlanetarySystem, colors: {[index:string]: Color3}){
        let bodies = Object.values(sys.sysBodies)        
        bodies.forEach(body => {
            
            switch (true) {
                case body instanceof Star:
                    this.drawStar(body, colors[body.name])
                    break;
                case body instanceof Planet:
                    this.drawPlanet(body, colors[body.name])
                    break;
                case body instanceof Moon:
                    this.drawMoon(body, colors[body.name])
                    break;
                default:
                    break;
            }
        });
    }

    drawPlanetarySystem(sys: PlanetarySystem){

    }
    //all planets are drawn in the X,Z plane
    drawOrbit(body: CelestialBody, color: Color3){
        //to draw a circle you need 3 V3 vectors
        let f = new Vector3(body.orbit.orbitLength, 0, 0);
        let s = new Vector3(-body.orbit.orbitLength, 0, 0)
        let t = new Vector3(0,0, body.orbit.orbitLength)

        //now we can draw an circle through the 3 points
        //create a circle object. orbitlength determines the #steps of the circle
        let circle = Curve3.ArcThru3Points(f, s, t, body.orbit.orbitLength, undefined, true);
        //create the mesh
        let orbitPath = MeshBuilder.CreateLines(body.name+"orbit", {points: circle.getPoints()}, this.scene)
        //create the material and assign
        let mat = new StandardMaterial(body.name+"orbitmaterial", this.scene)
        mat.emissiveColor = color
        orbitPath.material = mat
    }

    drawOrbits(sys: PlanetarySystem){
        Object.values(sys.sysBodies).forEach(body => {
            switch (true) {
                case body instanceof Planet:
                    this.drawOrbit(body, new Color3(177/255,177/255,190/255))
                    break;
                case body instanceof Moon:
                    this.drawOrbit(body, new Color3(179/255, 155/255, 125/255))
                    break;
                default:
                    break;
                
            }
        });
    }

    updateOrbits(sys: PlanetarySystem){
        //for moons and satellites the position of the orbit has to be the position of the parent body
        Object.values(sys.sysBodies).forEach(body => {
            switch (true) {
                case body instanceof Moon:
                    let parentBody = body.parentBody
                    if (parentBody) {   
                        let parentBodyMesh = this.scene.getMeshByName(parentBody.name)
                        let bodyMesh = this.scene.getMeshByName(body.name+"orbit")
                        if (parentBodyMesh && bodyMesh){
                            bodyMesh.position.x = parentBodyMesh.position.x
                            bodyMesh.position.z = parentBodyMesh.position.z
                        }
                    }
                    break;
                default:
                    break;
            }
        })
    }


    updatePlanetarySystem(sys: PlanetarySystem, alpha: number){
        Object.values(sys.sysBodies).forEach(body => {
            //get the mesh corresponding to the name
            let bodyMesh = this.scene.getMeshByName(body.name)
            //get the parent body mesh
            let parentBody = sys.getParentBody(body)
            //check to see if you have a planet body
            if (parentBody) {   
                let parentBodyMesh = this.scene.getMeshByName(parentBody.name)
                //get orbital parameters
                let orbLength = body.orbit.orbitLength;
                let orbSpeed = body.orbit.orbitSpeed;
                let initArc = body.orbit.initArc;
                //check that both meshes exist
                if (bodyMesh && parentBodyMesh) {
                    let newxpos = parentBodyMesh.position.x + orbLength * Math.cos(alpha * orbSpeed + initArc); 
                    let newzpos = parentBodyMesh.position.z + orbLength * Math.sin(alpha * orbSpeed + initArc); 
                    //console.log("body position x,z: " + body.name + ": "+ [newxpos, newzpos] + "| parentBody: " + parentBody.name + ": "+ [parentBodyMesh.position.x, parentBodyMesh.position.z]);
                    bodyMesh.position.x = newxpos
                    bodyMesh.position.z = newzpos
                }
                
            }
            

            
        });

    }

    setMeshSelectable(mesh: Mesh, scene: Scene, hl: HighlightLayer, color: Color3){
        mesh.actionManager = new ActionManager(this.scene);
        //on mouse enter mesh
        mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function(ev){	
            scene.hoverCursor = "pointer";
            //hl.addMesh(mesh, color);
        }));

        //on mouse exit mesh
        mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, function(ev){
           // hl.removeMesh(mesh);
        }))
    }

}
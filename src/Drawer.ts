/*
this will draw all elements on the screen 
so draw a planet
or move/redraw a planet 
all of that happens here
*/

import { Color3, MeshBuilder, Scene, StandardMaterial } from "babylonjs";
import { Moon, Planet, Star } from "./CelestialBodies";
import { PlanetarySystem } from "./PlanetarySystem";

export class Drawer {
    scene: Scene;
    constructor(scene: Scene){
        this.scene = scene
    }
    
    drawPlanet(planet: Planet, color: Color3){
        let planetMesh = MeshBuilder.CreateSphere(planet.name, { diameter: planet.size }, this.scene);
        let planetMaterial = new StandardMaterial(planet.name+"Material", this.scene); 
        //set color to material
        planetMaterial.emissiveColor = color
        //set material to mesh
        planetMesh.material = planetMaterial;
    }

    drawMoon(moon: Moon, color: Color3){
        let moonMesh = MeshBuilder.CreateSphere(moon.name, { diameter: moon.size }, this.scene);
        let moonMaterial = new StandardMaterial(moon.name+"Material", this.scene); 
        //set color to material
        moonMaterial.emissiveColor = color
        //set material to mesh
        moonMesh.material = moonMaterial;
    }

    drawStar(star: Star, color: Color3){
        let starMesh = MeshBuilder.CreateSphere(star.name, { diameter: star.size }, this.scene);
        let starMaterial = new StandardMaterial(star.name+"Material", this.scene); 
        //set color to material
        starMaterial.emissiveColor = color
        //set material to mesh
        starMesh.material = starMaterial;
    }

    drawSolarSystem(sys: PlanetarySystem, colors: {[index:string]: Color3}){
        let bodies = Object.values(sys.sysBodies)
        console.log(bodies);
        
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

}
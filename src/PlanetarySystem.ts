
/*
removed the tree datasctructure entirely as it became superfluous

TO_DO:
- add gravitational center: invisible orbtiting body that can be used to create binary setups


*/

import { CelestialBody, Moon, Planet, Star } from "./CelestialBodies";

//singular star system with only planets and moons
export class PlanetarySystem {
    name: string
    sysBodies: {[index: string]: CelestialBody}
    
    constructor(name: string){
        this.name = name;
        this.sysBodies = {} //includes sun, planets, moons
    }

    /**
   * Adds a Celestial Body to the Planetary System.
   * @param body - the Celestialbody to add to the Planetary System
   * @param parentBody - the Celestialbody around which the first Celestialbody orbits
   */
    addBody(body: CelestialBody, parentBody: CelestialBody){
        if (body instanceof Star) {                         
            this.addStar(body)
        }
        body.setParentBody(parentBody)                      //set the parentBody of the body
        this.sysBodies[parentBody.name].addSatellite(body)  //add the body to the satellites of the parentBody
        this.sysBodies[body.name] = body                    //add to system bodies

    }

    addStar(newstar: Star){
        newstar.setParentBody(newstar)              //set the parentbody of the star to itself
        this.sysBodies[newstar.name] = newstar      //add to system bodies
    }
    
    getParentBody(body: CelestialBody){
        return this.sysBodies[body.name].parentBody
    }

}

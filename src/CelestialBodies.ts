import { Orbit } from "./Orbit";
import { UniSimpleResource, SimpleResource, UniElement } from "./Resources";

/*
Celestial Bodies can be:
Stars, Planets, Moons, Asteroids, AsteroidBelt, Planetary Ring, ??
CelestialBodies
  >Black Hole
  >Star
    >Main Sequence
    >Neutron
    >Red Giant
    >White Dwarf
  >Planet
  >Moon


*/
//a celestial body for now is just star, planet or moon
//a satellite has to be a celestial body
export class CelestialBody {
    name: string;
    size: number;
    mass: number;
    orbit: Orbit;
    parentBody: CelestialBody | undefined;
    satellites: Array<CelestialBody>
    
    /**
    * @param name name of body 
    * @param size diameter in km 
    * @param mass mass of body in kg  
    * @param orbit an Orbit object that determines the orbit of the body
    */
    constructor(name: string, size: number, mass: number, orbit: Orbit){
        this.name = name
        this.size = size;
        this.mass = mass;
        this.orbit = orbit;
        this.parentBody = undefined 
        this.satellites = []
    }
    logCelestialBody(){
        console.log(this.name + "|size: " + this.size)
    }

    addSatellite(sat: CelestialBody){
        this.satellites.push(sat)
    }

    setParentBody(body: CelestialBody){
        this.parentBody = body
    }
        
}

export class Star extends CelestialBody{
    powerOutput: number     //in Watt
    constructor(name: string, size: number, mass: number,orbit: Orbit, powerOutput: number){
        super(name, size, mass, orbit);
        this.powerOutput = powerOutput
    }
}


/**
 * @class PlanetaryMass
 * @description A PlanetaryMass can be a moon or a planet. The only difference between the two is that planets orbit a 
 * star and a moon orbits a planet. Other than that there's no difference. (maybe later there will be gameplay differences)
 */
export class PlanetaryMass extends CelestialBody {
    layers: Array<PlanetaryMassLayer>;
    /**
    * @param layerSizes array of layer sizes. entries should be between 0 and 1 and sum to 1[crust size, mantle size, core size]. creates the layers (currently the layers are seperate objects)
    *               the sum of all sizes should be half of the PlanetaryMassSize. NOT CHECKED
    * @param layerMasses array of layer masses. the sum should be equal or less than the body mass NOT CHECKED.
    *               adding atmosphere is still needed
    */
    constructor(name: string, size: number, mass: number, orbit: Orbit, layerSizes: Array<number>, layerMasses: Array<number>){
        super(name, size, mass, orbit);
        this.layers = this.createLayers(layerSizes, layerMasses)
    }

    //you could reimplement this so that the layers could be customized
    private createLayers(ls: Array<number>, lm: Array<number>){
        let lsSum = ls.reduce((a, b) => a + b, 0)
        let lmSum = lm.reduce((a, b) => a + b, 0)
        if (ls.length == 3 && lm.length == 3){
            switch (true) {
                case (lsSum != 1):
                    console.log("irregular planetaryMassLayers Created for planet: " + this.name + lsSum);
                case (lmSum > this.mass):
                    console.log("created layers heavier than planet: "  + this.name + "|" + this.mass +"versus layermass: " + lmSum)
            }
            return [new Crust(ls[0]*this.size/2, ls[0]), 
                    new Mantle(ls[1]*this.size/2, ls[1]),
                    new Core(ls[2]*this.size/2, ls[2])]
        } else {
            console.log("layer size and mass don't line up created dummy layers");
            return [new Crust(0,0), new Mantle (0,0), new Core(0,0)]
        }
        
    }
    

    addElementToLayer(element: UniElement, perc: number, layer: number){
        let pLayer = this.layers[layer]
        pLayer.addElement(element, perc, true)
    }
}



export class Planet extends PlanetaryMass {
    constructor(name: string, size: number, mass: number, orbit: Orbit, layerSizes: Array<number>, layerMasses: Array<number>){
        super(name, size, mass, orbit, layerSizes, layerMasses);
    }
}

export class Moon extends PlanetaryMass {
    constructor(name: string, size: number, mass: number, orbit: Orbit, layerSizes: Array<number>, layerMasses: Array<number>){
        super(name, size, mass, orbit, layerSizes, layerMasses);
    }
}

//there's not going to be much difference between crust, atmosphere, outermantle and innermantle
//maybe create a Layer class and extend from there
export class PlanetaryMassLayer {
    size: number;
    mass: number;
    resources: {[index: string]: number} = {};
    elements: {[index: string]: number} = {}

    constructor(size: number, mass: number , resources: {[index: string]: number} = {}, elements: {[index: string]: number} = {}){
        this.size = size;
        this.mass = mass;
        this.resources = resources;
        this.elements = elements;
    }

    addElement(element: UniElement, amount: number, percentageFlag: boolean = true){
        if (percentageFlag)
            this.elements[element.name] = amount * this.mass / 100
        else
            this.elements[element.name] = amount
    }

    logElements(){
        for (const [key, value] of Object.entries(this.elements)) {
            console.log(`${key}: ${value}`);  
        } 
    }  
}

export class Crust extends PlanetaryMassLayer{
    constructor(size: number, mass: number, resources: {[index: string]: number} = {}, elements: {[index: string]: number} = {}){
        super(size, mass, resources, elements)
    }
}

export class Mantle extends PlanetaryMassLayer{
    constructor(size: number, mass: number, resources: {[index: string]: number} = {}, elements: {[index: string]: number} = {}){
        super(size, mass, resources, elements)
    }
}

export class Core extends PlanetaryMassLayer{
    constructor(size: number, mass: number, resources: {[index: string]: number} = {}, elements: {[index: string]: number} = {}){
        super(size, mass, resources, elements)
    }
}


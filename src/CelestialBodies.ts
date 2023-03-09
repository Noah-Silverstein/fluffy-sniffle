import { Orbit } from "./Orbit";

/*
Celestial Bodies can be:
Stars, Planets, Moons, Asteroids, AsteroidBelt, Planetary Ring, ??

*/
//a celestial body for now is just star, planet or moon
//a satellite has to be a celestial body
export class CelestialBody {
    name: string;
    size: number;
    orbit: Orbit;
    parentBody: CelestialBody | undefined;
    satellites: Array<CelestialBody>
    constructor(name: string, size: number, orbit: Orbit){
        this.name = name
        this.size = size;
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
    constructor(name: string, size: number, orbit: Orbit){
        super(name, size, orbit);
    }
}

export class Planet extends CelestialBody {
    constructor(name: string, size: number, orbit: Orbit){
        super(name, size, orbit);
    }
}

export class Moon extends CelestialBody {
    constructor(name: string, size: number, orbit: Orbit){
        super(name, size, orbit);
    }
}


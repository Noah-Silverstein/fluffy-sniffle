
//make a random system

import { Crust, Planet, Star } from "./CelestialBodies";
import { Orbit } from "./Orbit";
import { getRandomElements, getRndInteger, planetNames, starNames } from "./Random";
//MAIN SEQUENCE STARS
//in km
let maxStarSize = 1400000,
    minStarSize = 140000,
//in watt
    minPowerOutput = 3e25,
    maxPowerOutput = 5.7e26,
// in kg
    minStarMass = 1.6e29,
    maxStarMass = 2e32;

/*
create a random star
*/
function createStar(){
    let name = getRandomElements(starNames,1)[0],
        size = getRndInteger(minStarSize,maxStarSize),
        mass = getRndInteger(minStarMass, maxStarMass),
        orbit = new Orbit(0,0),
        powerOutput = getRndInteger(minPowerOutput, maxPowerOutput);
    let star = new Star(name, size, mass, orbit, powerOutput)
    return star
}


let maxPlanetSize = 140000,
    minPlanetSize = 4000,
    maxPlanetMass = 0,
    minPlanetMass = 0;
    



function createPlanet(){
    let name = getRandomElements(planetNames,1)[0],
        size = getRndInteger(minPlanetSize,maxPlanetSize),
        mass = getRndInteger(minPlanetMass, maxPlanetMass),
        orbit = new Orbit(0,0);

    let planet = new Planet(name, size, mass, orbit,[0,0,0], [0,0,0] )
    return planet 
}
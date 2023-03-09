import { PlanetarySystem } from "./PlanetarySystem";
import { Moon, Planet, Star } from "./CelestialBodies";
import { Orbit } from "./Orbit";
import { Color3 } from "babylonjs";


var innerPlanetDistanceScale = 2  //real value is 10e6
var outerPlanetDistanceScale = 1.5

//it's impossible to have realistic lunar distances

var planetSizeScale = 1     //real value is 10e3
var moonSizeScale = 1       //real value is 10e3

//impractical to have realistic lunar speeds
var planetSpeedScale = 1;

export let solarSystem = new PlanetarySystem("solarSystem")

export let solarSystemColors = {
    sol:  new Color3(1,1,0),
    mercurius: new Color3(0.86, 0.863, 0.863),
    venus: new Color3(1.000, 0.702, 0.278),
    terra: new Color3(0.000, 0.502, 1.000),
    luna: new Color3(1,1,1),
        
    mars: new Color3(1.000, 0.400, 0.000),
    jupiter: new Color3(0.933, 0.910, 0.667),
    io: new Color3(1,1,1),
    europa: new Color3(1,1,1),
    callisto: new Color3(1,1,1),
    ganymede: new Color3(1,1,1),

    saturnus: new Color3(0.90, 0.90, 0.98),
    neptunus: new Color3(0.56, 0.78, 1.00),
    uranus: new Color3(0.69, 0.93, 0.93)
}

//sun obviously scaled down for practicality (10 time more than other planets)
export let sol         = new Star("sol", 139.27, new Orbit(0, 0))

let mercurius   = new Planet("mercurius", 4.879  * planetSizeScale , new Orbit( 57.91 * innerPlanetDistanceScale, (1/0.24)* planetSpeedScale))

let venus       = new Planet("venus", 12.104 * planetSizeScale, new Orbit( 108.21 * innerPlanetDistanceScale, (1/0.62) * planetSpeedScale))

let terra       = new Planet("terra", 12.742 * planetSizeScale, new Orbit( 149.60 * innerPlanetDistanceScale, 1 * planetSpeedScale))
let luna        = new Moon("luna", 3.476 * moonSizeScale, new Orbit(10, (1/0.0748))) //actual value 384

let mars        = new Planet("mars", 6.779 * planetSizeScale, new Orbit( 227.92 * innerPlanetDistanceScale, (1/1.88) * planetSpeedScale))

//scale gets wonky past here so the scientific has to bow to the practical
//edited jupiters moon orbital lengths(custom amount) and speeds(reduced their speed by factor 10 and halved the speed of io. she's a fast gal)
let jupiter     = new Planet("jupiter", 139.822 *planetSizeScale, new Orbit( 778.57 * outerPlanetDistanceScale, (1/11.86) * planetSpeedScale))
let io          = new Moon("io", 3.630  * moonSizeScale, new Orbit(80, (1/0.0785) )) //421.70
let europa      = new Moon("europa", 3.122  * moonSizeScale, new Orbit( 100, (1/0.092 ) )) //671.08
let ganymede    = new Moon("ganymede", 5.262  * moonSizeScale, new Orbit( 120, (1/0.18 ) )) //1070.40
let callisto    = new Moon("callisto", 4.820  * moonSizeScale, new Orbit( 140, (1/0.42 ) )) //1882.70

let saturnus    = new Planet("saturnus", 116.460 * planetSizeScale, new Orbit( 1427 * outerPlanetDistanceScale, (1/29.5) * planetSpeedScale))
let uranus      = new Planet("uranus", 50.724 * planetSizeScale, new Orbit( 2869  * outerPlanetDistanceScale, (1/84) * planetSpeedScale))
let neptunus    = new Planet("neptunus", 49.244 * planetSizeScale, new Orbit( 4498  * outerPlanetDistanceScale, (1/165) * planetSpeedScale))

//create the system 
solarSystem.addStar(sol)
//adding the planets + the sun it orbits around
solarSystem.addBody(mercurius, sol)
solarSystem.addBody(venus, sol)
//when adding a moon you add the planet it orbits around.
solarSystem.addBody(terra, sol)
solarSystem.addBody(luna, terra)

solarSystem.addBody(mars, sol)

solarSystem.addBody(jupiter, sol)
solarSystem.addBody(io, jupiter)
solarSystem.addBody(europa, jupiter)
solarSystem.addBody(ganymede, jupiter)
solarSystem.addBody(callisto, jupiter)

solarSystem.addBody(saturnus, sol)
solarSystem.addBody(uranus, sol)
solarSystem.addBody(neptunus, sol)


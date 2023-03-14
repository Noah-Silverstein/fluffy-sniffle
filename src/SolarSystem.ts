import { PlanetarySystem } from "./PlanetarySystem";
import { Moon, Planet, Star } from "./CelestialBodies";
import { Orbit } from "./Orbit";
import { Color3 } from "babylonjs";
import * as Uni from "./ElementsAndResources";

//solar system sizes
export let sizes = [
    1392000, // Sun
    139822,  // Jupiter
    5268,    // Ganymede
    4820,    // Callisto
    3642,    // Io
    3121,    // Europa
    116460,  // Saturn
    5150,    // Titan
    1528,    // Rhea
    1470,    // Iapetus
    1123,    // Dione
    50724,   // Uranus
    1578,    // Titania
    1522,    // Oberon
    1169,    // Umbriel
    1157,    // Ariel
    49244,   // Neptune
    2706,    // Triton
    12742,   // Earth
    3476,    // Moon
    12104,   // Venus
    6792,    // Mars
    //22,      // Phobos
    //12,      // Deimos
    4880     // Mercury
  ];
var innerPlanetDistanceScale = 2  //real value is 10e6
var outerPlanetDistanceScale = 1.5

//it's impossible to have realistic lunar distances

var planetSizeScale = 1     //real value is 10e3
var moonSizeScale = 1       //real value is 10e3

//impractical to have realistic lunar speeds
var planetSpeedScale = 1;

export let solarSystem = new PlanetarySystem("solarSystem")
//colors for the solarsystem
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
//layer info
//dummy layer info
let dummyLayerMass = [0,0,0],
    dummyLayerSize = [0.05, 0.75, 0.20];
//earth layer info
let terraLayerMass = [2.4e22, 4.03e24, 1.85e23],
    terraLayerSize = [0.005 ,0.495, 0.5];


//logarithmic scaling function
let maxSize = 150

function minMaxScaling(arr: Array<number>, minScale: number, maxScale: number){
    let minSize = Math.min(...arr),
        maxSize = Math.max(...arr);
    return arr.map(size => {
        ((size - minSize) / (maxSize - minSize)) * (maxScale - minScale) + minScale;
    })
}

//sun obviously scaled down for practicality (10 time more than other planets)
export let sol         = new Star("sol", 139.27, 100, new Orbit(0, 0), 3.9e26)

let mercurius   = new Planet("mercurius", 4.879  * planetSizeScale, 100, new Orbit( 57.91 * innerPlanetDistanceScale, (1/0.24)* planetSpeedScale), dummyLayerSize, dummyLayerMass)

let venus       = new Planet("venus", 12.104 * planetSizeScale, 100, new Orbit( 108.21 * innerPlanetDistanceScale, (1/0.62) * planetSpeedScale), dummyLayerSize, dummyLayerMass)

let terra       = new Planet("terra", 12.742 * planetSizeScale, 5.97e24, new Orbit( 149.60 * innerPlanetDistanceScale, 1 * planetSpeedScale), terraLayerSize, terraLayerMass)
let luna        = new Moon("luna", 3.476 * moonSizeScale, 100, new Orbit(10, (1/0.0748)), dummyLayerSize, dummyLayerMass) //actual value 384

let mars        = new Planet("mars", 6.779 * planetSizeScale, 100, new Orbit( 227.92 * innerPlanetDistanceScale, (1/1.88) * planetSpeedScale), dummyLayerSize, dummyLayerMass)

//scale gets wonky past here so the scientific has to bow to the practical
//edited jupiters moon orbital lengths(custom amount) and speeds(reduced their speed by factor 10 and halved the speed of io. she's a fast gal)
let jupiter     = new Planet("jupiter", 139.822 *planetSizeScale, 100, new Orbit( 778.57 * outerPlanetDistanceScale, (1/11.86) * planetSpeedScale), dummyLayerSize, dummyLayerMass)
let io          = new Moon("io", 3.630  * moonSizeScale, 100, new Orbit(80, (1/0.0785) ), dummyLayerSize, dummyLayerMass) //421.70
let europa      = new Moon("europa", 3.122  * moonSizeScale, 100, new Orbit( 100, (1/0.092 ) ), dummyLayerSize, dummyLayerMass) //671.08
let ganymede    = new Moon("ganymede", 5.262  * moonSizeScale, 100, new Orbit( 120, (1/0.18 ) ), dummyLayerSize, dummyLayerMass) //1070.40
let callisto    = new Moon("callisto", 4.820  * moonSizeScale, 100, new Orbit( 140, (1/0.42 ) ), dummyLayerSize, dummyLayerMass) //1882.70

let saturnus    = new Planet("saturnus", 116.460 * planetSizeScale, 100, new Orbit( 1427 * outerPlanetDistanceScale, (1/29.5) * planetSpeedScale), dummyLayerSize, dummyLayerMass)
let uranus      = new Planet("uranus", 50.724 * planetSizeScale, 100, new Orbit( 2869  * outerPlanetDistanceScale, (1/84) * planetSpeedScale), dummyLayerSize, dummyLayerMass)
let neptunus    = new Planet("neptunus", 49.244 * planetSizeScale, 100, new Orbit( 4498  * outerPlanetDistanceScale, (1/165) * planetSpeedScale), dummyLayerSize, dummyLayerMass)


//add elements to earth
//add crust element composition
terra.addElementToLayer(Uni.oxygen, 46.6, 0);
terra.addElementToLayer(Uni.silicon, 27.7, 0);
terra.addElementToLayer(Uni.aluminum, 8.1, 0);
terra.addElementToLayer(Uni.iron, 5.0, 0);
terra.addElementToLayer(Uni.calcium, 3.6, 0);
terra.addElementToLayer(Uni.sodium, 2.8, 0);
terra.addElementToLayer(Uni.potassium, 2.6, 0);
terra.addElementToLayer(Uni.magnesium, 2.1, 0);
terra.addElementToLayer(Uni.titanium, 0.57, 0);
terra.addElementToLayer(Uni.hydrogen, 0.14, 0);



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


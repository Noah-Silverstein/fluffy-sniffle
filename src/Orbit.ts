import { getRndInteger } from "./Random";

export class Orbit {
    orbitLength: number;
    orbitSpeed: number;
    initArc: number;
    constructor(orbitLength: number, orbitSpeed: number){
        this.initArc = getRndInteger(0, Math.PI)    //randomize the initial orbital position
        this.orbitLength = orbitLength;
        this.orbitSpeed = orbitSpeed;
    }
}
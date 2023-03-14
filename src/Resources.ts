//like the actual periodic table 
//it would be cool if I could simplify element interaction to simulate the different major 
//elements in the atmosphere, and outercrust. 
//size of atmosphere is related to gravforce of planet and distance to sun
//like if a planet was far from the sun but had alot of oxygen it would have pools of liquid oxygen 
//and no atmosphere
export class UniElement {
    name: string;
    /**
    * Creates a new Universe Element.
    * @param name - the name of the element
    */
    constructor(name: string){
        this.name = name

    }
}

export class UniSimpleResource {
    name: string;
    amount: number;
    element: UniElement;
    constructor(name: string, amount: number, element: UniElement){
        this.name = name;
        this.amount = amount;
        this.element = element;
    }
}

//simple Resource not tied to any underlying physics and are mainly composite resources
//
export class SimpleResource {
    name: string
    constructor(name: string){
        this.name = name;
    }
}


/**
 * Encapsulation + Abstraction: Data Read Only
*/
class Animal {
    constructor(name) {
        this._name = name; // _name indicate name is private
    }

    // Soln: Read only [User can only read, cannot update]
    get name() {
        return this._name;
    }

    speak() {
        console.log(`${this._name} makes a sound`);
    }
}


/**
 * New workers keep renaming animals that have already been named in 
 * our farm:
*/
// let bageera = new Animal('bageera');
// console.log(bageera.name); // "bageera"
// bageera.name = "baggi";
// console.log(bageera.name); // "baggi"
// bageera.name = "baggs";
// console.log(bageera.name); // "baggs"

/**
 * Issue:
 * We went through all this trouble to encapsulate our data & functionality,
 * we are trying to use this encapsulated data and functionality to 
 * keep track of all the names of our animals on the farm and some new
 * worker on the farm rename any animal, and this breaks.
 * 
 * Now if I ever use Bageera in our code, it might not be the right name.
 * Why can anyone rename my animal. This will lose our sleep.
*/


/**
 * Solution:
 * - We could use a little bit of abstraction here.
 * - We want to be able to get the name of the animal, but we don't
 *   want anybody else to be able to update the name of an animal.
 * 
 *   get name() {
 *      return this.name;
 *   }
*/

let bageera = new Animal('bageera');
bageera.name = 'bagga'; // Error: Cannot directly modify the name
console.log(bageera.name);

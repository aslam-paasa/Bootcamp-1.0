/**
 * Q. Create an a class and extend it - Can be anything you would like
 *    it to be! 
*/

/**
 * Understanding Inheritance & super() keyword:
 * - Inheritance is making a class from another class to share a set 
 *   of properties and methods. 
 *  [Basically creating new objects based on old ones].
 * - Child Classes inherit the properties and methods of parent class
 *   using a keyword called super().
*/

class Animal {
    constructor(name, age, farmName) {
        this.name = name;
        this.age = age;
        this.farmName = farmName;
    }

    // Read only [User can only read, cannot update]
    get name() {
        return this.name;
    }

    speak() {
        console.log(`${this.name} makes a sound`);
    }
}

class Dog extends Animal {
    constructor(name, breed, age, farmName) {
        /**
         * What happen if we don't use the word super()?
         * => Play with code
        */
        super(name, age, farmName);
        this.breed = breed;
    }
}

/**
 * Here, we are creating Dog class, and the Dog inheriting from Animal.
 * But we want to make sure that when we are using 'new Dog()', the
 * constructor is going to spit out things for the Dog, then the super()
 * is saying instead of having to resay: this.name, this.age, this.farmName,
 * it's just one line i.e. super(name, age, farmName), and saves us
 * from repeating all the codes present in parent class. 
*/
console.log('\n' + 'Dog Object:');

let Simba = new Dog('Simba', 'Shephard');
console.log(Simba);


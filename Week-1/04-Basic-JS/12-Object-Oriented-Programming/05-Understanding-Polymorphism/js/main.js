/**
 * Pillar-4: Understanding Polymorphism
 * Let's say we are on a farm and we just rescued a whole lot bunch of
 * animals. How should we build out our system to keep track of all the
 * animals of our farm?
 * 
 * What do we want to do?
 * 1. We need to know their names and the sounds they make.
 * 2. The names should not be changeable once set. We only want to 
 *    retrieve their names so we can keep a track of all the animals
 *    in the farm.
*/


class Animal{
    constructor(name){
        this._name = name;  // private variable to store animal name
    }

    // Getter: Read Only
    get name(){
        return this._name
    }

    speak(){
        console.log(`${this._name} makes a sound`)
    }
}



/**
 * Dog class inherits from Animal. It represents a specific type of 
 * animal.
 */
class Dog extends Animal{
    constructor(name,breed){
        super(name)
        this._breed = breed; // private variable
    }

    // Getter: Read Only
    get breed(){
        return this._breed
    }

    // Override the speak method to specify how a dog speaks.
    speak(){
        super.speak()  // speak() method from parent element
        console.log(`${this.name} barks`); // Dog-specific implementation
    }    
}



/**
 * Cat class inherits from Animal. It represents another type of animal.
 */
class Cat extends Animal{

    constructor(name,breed){
        super(name)
        this._breed = breed; // private variable
    }

    // Getter: Read Only
    get breed(){
        return this._breed;
    }

    // Override the speak method to specify how a cat speaks.
    speak(){
        super.speak()  // speak() method from parent element
        console.log(`${this.name} meows`); // Cat-specific implementation
    }    
}



let simba = new Dog('Simba','Shepard')
let machi = new Dog('The Machine','Pitbull')
let salem = new Cat('Salem', 'American Shorthair')


/**
 * - Let's group the animals together in an array to represent the farm.
 *   Each animal can speak, and their behavior depends on their type 
 *   (Dog or Cat).
 * - Loop through the farm array and make each animal speak.
 */
let farm = [simba,machi,salem]

for( a of farm ){
    a.speak();
}


/**
 * What is an interface?
 * - We have two different kind of objects:
 *   a. Dog
 *   b. Cat
 * - Code written to use an interface i.e. speak() method, automatically
 *   knows how to work with any number of different objects i.e. Dog &
 *   Cat objects, that provide the interface.
 * 
 * Does Dog & Cat provide a speak() interface? Do they both have speak()
 * interface?
 * => Yes
 * 
 * Does the speak() interface do something different on each of them?
 * => Yes, Dog barks & Cat meows
 * 
 * What happens if one of them doesn't speak?
 * => They all speak
 * 
 * How come every single thing that would ever be in this loop will
 * always speak?
 * => Because the parent has speak()
 * 
 * Sibling descendants of a base class will have the same interface but
 * varying implementations.
 * - Sibling descendants means the child classes i.e. Dog & Cat.
 * - Base Class means Animal.
 * - Dog & Cat Class of an Animal Class will have the same interface 
 *   i.e. speak() method because it's inherited from Animal Class, but
 *   varying implementations i.e. bark & meow.
*/

/**
 * What is happening here?
 * 1. Dog and Cat both inherit the `speak` method from the Animal class.
 * 2. Each class (Dog, Cat) has its own version of the `speak` method.
 * 3. When we call `speak` on each animal, it uses the appropriate version.
 *    - Dogs bark.
 *    - Cats meow.
 * 
 * This is called Polymorphism:
 * - The same method (`speak`) works differently based on the object (Dog or Cat).
 * - It allows us to write flexible code that works with different types of animals.
 * 
 * Why does every animal in the loop always have a `speak` method?
 * - Because the parent class (Animal) ensures that every child class (Dog, Cat) has it.
 * - Even if a child class doesn't override `speak`, it will still inherit it from Animal.
 */
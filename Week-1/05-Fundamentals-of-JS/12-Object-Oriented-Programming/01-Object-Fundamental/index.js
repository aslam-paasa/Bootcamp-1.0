/**
 * Objects:
 * - Objects are a collection of variables and functions!
 * - Objects represent the attributes and behavior of something used in
 *   a program
 * - Object variables are called properties and object functions are
 *   called methods
 * - Objects store "keyed" collections
*/

/**
 * Stopwatch Object:
 * 1. Properties(attributes):
 *    - Might contains a variable to represent hours, another to represent
 *      minutes, and another to represent seconds.
 * 2. Methods(behaviors):
 *    - Might also contain functions that manipulate those values, such
 *      as "start()" and "stop()".
 * 3. Example:
 *    let stopwatch = {}
 *    stopwatch.currentTime = 12
 *    stopwatch.tellTime = function(time) {
 *       console.log(`The current time is ${time}.`)
 *    }
 *    stopwatch.tellTime(stopwatch.currentTime);
*/

/**
 * Q. Create a stopwatch object that has four properties and three methods
*/
let stopwatch = {}
stopwatch.color = 'black'
stopwatch.brand = 'nike'
stopwatch.shape = 'round'
stopwatch.size = 'large'
stopwatch.start = function () {
    console.log('STARTING');
}
stopwatch.stop = function () {
    console.log('STOPPING');
}
stopwatch.sayBrand = function () {
    alert(stopwatch.brand)
}


/**
 * Q. Create a mouse object that has four properties and three methods.
 * => Object is a collection of variables + functions
*/

let mouse = {}
mouse.brand = "logitech"
mouse.ergo = true
mouse.model = "mx ergo"
mouse.trackBall = true

mouse.leftClick = function() {
    console.log("Click left");
}

mouse.rightClick = function() {
    console.log("Click right");
}

mouse.scrollWheel = function() {
    console.log("Jump");
}

console.log(mouse);
console.log(mouse.leftClick());


/**
 * Q. What if we want to make a lot of objects?
 * => We are going to need a factory that can spit out a lot of objects.
 * => For example, a car factory spits out a lot of cars. Similarly, we
 *    have things is JS that enable us to create these objects. 
 * => There are two ways to create objects:
 *    a. Constructors [Old way]
 *    b. ES6 Syntax of classes
 * 
 * Example-1: Car Factory using Constructor(factory of object)
 * function MakeCar(carMake, carModel, carColor, numOfDoors) {
 *    this.make = carMake;
 *    this.model = carModel;
 *    this.color = carColor;
 *    this.doors = numOfDoors;
 *    this.honk = function() {
 *       alert('BEEP BEEP FUCKER')
 *    }
 *    this.lock = function() {
 *       alert(`Locked ${this.doors} doors`);
 *    }
 * }
 * 
 * let hondaCivic = new MakeCar('Honda', 'Civic', 'Silver', 4);
 * let teslaRoadster = new MakeCar('Tesla', 'Roadster', 'Red', 2);
*/

/**
 * Car Factory: We forgot to enable bluetooth
 * => A prototype is another object that is used as a fallback source
 *    of properties.
 * => Let's imagine that Tesla is using 'MakeCar' factory and made 
 *    thousand of cars, and they realized a couple months after that
 *    people couldn't connect their phones to the car, means they have
 *    created thousand of cars that didn't have bluetooth.
 * => Back in the day, if you sold thousands of car that didn't have a 
 *    feature that you wanted to have i.e. bluetooth, you have to recall
 *    all thousands of those cars to the dealership, the dealer would
 *    install the new feature and then you get your car back, but that
 *    is a huge call.
 * => But in case of tesla, it can be updated. Telsa has to just roll
 *    out an update and now you have bluetooth. And this is how we
 *    should think about object that came out of car factory.
 * => All the cars that came out of the factory, none of them have
 *    bluetooth but there's is something cool that we have in JS
 *    called the prototype. 
 * => Since, all the objects(cars) came from the same factory, they all
 *    have the same prototype, and a prototype is just like a fallback
 *    source of properties and methods.
 * => So, the car that we have just created doesn't have a bluetooth.
 *    But on the constructor's prototype we can add bluetooth, and now
 *    when we do teslaRoadster.bluetooth, we have a bluetooth.
 * 
 * 
 *    let teslaRoadster = new MakeCar('Tesla', 'Roadster', 'Red', 2);
 *    console.log(teslaRoadster.bluetooth);  <=== undefined
 * 
 *    MakeCar.prototype.bluetooth = true;
 *    console.log(teslaRoadster.bluetooth); // true
 * 
 * 
 * => Think of this like, I don't have a car, but someone on my family
 *    chain have. I asked my mom, do you have a car? No!. The I ask my
 *    grandma, do you have a car? Yes!, and since my grandma has a car
 *    I have a car.
 * => Similarly, objects are going to check at themselves and say, hey!
 *    do I have that property? or, do I have that method? If the ans is
 *    no!, it's going to look up the chain. If at any point of it looking
 *    up this chain, it finds thay value, it can use it. [Prototype is
 *    like ancestors]
 * => And this idea of objects looking at themselves to see if they have
 *    properties or methods and if not finding it, looking up through
 *    all of its parents is a type of inheritance. This chain of 
 *    inheritance is called "prototypal inheritance".
*/


/**
 * We will talk little bit about:
 * 1. How we create objects?
 * => Two main ways to create objects:
 *    a. Constructor [Older way]
 *    b. Class-based Syntax [Newer way]
 *  
 * 2. Once we are able to create bunch of objects, we are going to see
 *    object properties and method. And those fallback sources of
 *    properties and methods are called Prototype.
 * 
 * 3. Once we can start accessing the prototype, we are able to understand
 *    how we were able to use all these methods and properties. And once
 *    we get this idea of Prototype Inheritance, we will get a mini
 *    explosion in our mind.
*/

//Create a Tony Hawk Pro Skater constructor that makes fighting game characters with 4 properties and 3 methods
function TonyHawkProSkaterCharacter(chName, sponsor, specialMove, stance) {
    this.characterName = chName;
    this.sponsor = sponsor;
    this.specialTrick = specialMove;
    this.stance = stance;
    this.grind = function() { console.log('5050') };
    this.flip = function() { console.log('Kickflip Underflip')}; 
    this.taunt = function() { console.log('FIRRSSSTTTT TRRYYY!') };
}

let kareemCampbell = new TonyHawkProSkaterCharacter('Kareem', 'Element', 'Laserflip', 'Goofy');

console.log(kareemCampbell);
console.log(kareemCampbell.grind());
console.log(kareemCampbell.flip());


/**
 * Create a Netflix TV Show class with a constructor that makes Netflix 
 * TV Shows with 4 properties and 3 methods
*/

class MakeNetflixTVShows {
    constructor(title, genre, rating, numOfEp) {
    // properties  = parameters
        this.title = title;
        this.genre = genre;
        this.rating = rating;
        this.numOfEp = numOfEp;
    }

    addTodoList() {
        console.log('Added to list');
    }

    play() {
        console.log('Show Starting');
    }

    stop() {
        console.log('Show Stopping');
    }
}


let areYouAfraidOfTheDark = new MakeNetflixTVShows('Are you Afraid Of The Dark', 'horror', 4.5, 94);

console.log(areYouAfraidOfTheDark);
console.log(areYouAfraidOfTheDark.play());
console.log(areYouAfraidOfTheDark.stop());


/**
 * Create an espresso machine constructor that makes machines with 
 * 4 properties and 3 methods:
*/
class EspressoMachine {
    constructor(color, make, model, price) {
        this.color = color;
        this.make = make;
        this.model = model;
        this.price = price
    }
    start() {
        console.log('Starting to make espresso');
        
    }
    stop() {
        console.log('Turning off');
        
    }
    steam() {
        console.log('Building Steam');
        
    }
}

let gaggia = new EspressoMachine('red', 'Gaggia', 'Classic Pro', 400);

console.log(gaggia);
console.log(gaggia.start());

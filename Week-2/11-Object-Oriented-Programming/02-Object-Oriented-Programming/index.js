/**
 * Objects:
 * - Objects are a collection of variables and functions.
 * - Objects represent the attributes and behavior of something used
 *   in a program.
 * - Object variables are called properties and object functions are
 *   called methods.
 * - Objects store "keyed" collections.
*/

/**
 * Think of a physical object, like Stopwatch:
 * Q. What are the properties and methods?
 * => Properties:
 *    - color: black
 *    - shape: round
 *    - minutes: 03
 *    - seconds: 59
 *    - milliseconds: 45
 * 
 * => Methods:
 *    - start()
 *    - stop()
 *    - split()
 *    - reset()
*/

/**
 * What if we want to create a lot of objects, what could we use?
 * - Factory/Constructor
 *   Factory spits out a bunch of different cars, and the cars all come
 *   out of the factory with very similar properties and behaviors. So,
 *   it can have certain number of doors, color, model, make. And this
 *   constructor function makes it very easy to spit out objects that
 *   are similar.
 * - With the new syntax, we get class based syntax + constructor.
 *   [Classes are like templates of objects!]
 * - The constructor and function are all part of the one class and
 *   putting all of these things together i.e. data + functionality,
 *   that is an example of encapsulation.
*/

class MakeCar {
    constructor(carMake, carModel, carColor, numOfDoors) {
        this.make = carMake;
        this.model = carModel;
        this.color = carColor;
        this.doors = numOfDoors;
    }

    honk() {
        console.log('BEEP BEEP FUCKER!');
    }

    lock() {
        console.log(`Locked ${this.doors} doors!`);
    }
}

let hondaCivic = new MakeCar('Honda', 'Civic', 'Silver', 4);
console.log(hondaCivic);


/**
 * 1. As our codebase gets larger and more folx join the team, can we 
 *    keep our code organized?
 * 2. Is it easy to add new features and functionality?
 * 3. Can another developer look at my code and understand what is 
 *    happening?
 * 4. Can I make changes without losing sleep at night and being 
 *    confident that the change will not break?
 *    - Probably Not!
 * 
 * The reason these questions came up because as we write code, our code
 * gets a little bit more complex, and we start trying to work with
 * each other.
*/


/**
 * Why are objects such a big thing?
 * Why do we need these factories?
 * What if there was a system, a paradigm, a set of rules, an agreed
 * upon way to structure our code that:
 * - Made it easier to add new stuff.
 * - Made it easier to read through what was already coded.
 * - And make it so you were not afraid to make changes.
 * 
 * => It does exist, and we call it OOP[Object-Oriented Programming].
 * => Let's see some code:
*/

let hourlyRate = 250;
let hours = 160;
let taxRate = .35;

function calculateProfit(rate, numOfHours, taxes) {
    return rate * numOfHours * (1 - taxes);
}

function holdForTaxes(profitMade) {
    return hourlyRate * hours - profitMade;
}

let profit = calculateProfit(hourlyRate, hours, taxRate);
let taxesHeld = holdForTaxes(profit);

console.log(profit);
console.log(taxesHeld);

/**
 * Is it easy to add new features and functionality?
 * - With this procedural(function) type of coding:
 *   It is easy to add new features and functionality but hard to keep
 *   track of everything.
*/

/** 
 * Can another developer look at my code and understand what is
 * happening?
 * - There's only two bits of functionality but we need time to figure
 *   out. How we're gonna build a massive app that whole team will work.
*/

/** 
 * If we change any value like taxRate, will that change anything in
 * our codebase?
 * - No idea! Confusing, if it's a big codebase.
*/


/**
 * Pillar-1: Encapsulation: Data & Functionality
 * - When we are looking at this code, the first thing we are noticing
 *   is that, there's two things going on, and it would be really
 *   helpful if the two things were able to talk to each other or be
 *   together in some way, shape or form.
 *   a. data
 *   b. functionality
 * - It would be really cool, if we can combine our data and functionality,
 *   so that it was clean. [data + functionality]
 * 
 * Q. Why these objects are useful?
 * Q. Why this fusion of data and functionality into one object is 
 *    preferred?
 * => Encapsulation: The process of storing functions(methods) and their
 *    associated data(properties) - in one thing (object).
 * 
 * => By taking all the data & functions floating around, and putting 
 *    them into one object is so impactful & helpful, using which we 
 *    can easily add new features and functionality easily. 
 *    [Procedural Programming -> Object-Oriented Programming]
 * 
 * Note: If someone create a variable of the same name somewhere else
 *       in the casebase, is not gonna affect my object.
*/

console.log('\n' + 'Serious Business Person Object:');

let seriousBusinessPerson = {
    hourlyRate: 250,
    hours: 160,
    taxRate: .35,
    calculateProfit: function () {
        return this.hourlyRate * this.hours * (1 - this.taxRate);
    }
}

console.log(`Before update: taxRate = ${seriousBusinessPerson.taxRate}`);
console.log('Calculated Profit: ' + seriousBusinessPerson.calculateProfit());


/** 
 * Q. If you want to add a new bit of data or feature, do you know where
 *    to add that data or functionality?
 * => Yes! Now I would go and just modify the object.
*/

/** 
 * Q. Can another developer look at my code and understand what is
 *    happening?
 * => Yes!
*/

/** 
 * Q. Can I make changes without losing sleep at night?
 * => Yes, we can easily identify functionality as our code is smaller,
 *    and we can easily change it without losing sleep.
*/

console.log('\n' + 'Updated Serious Business Person Object:');

let updatedSeriousBusinessPerson = {
    hourlyRate: 250,
    hours: 160,
    taxRate: .40,  // changed
    calculateProfit: function () {
        return this.hourlyRate * this.hours * (1 - this.taxRate);
    }
}

console.log(`After Update: taxRate = ${updatedSeriousBusinessPerson.taxRate}`);
console.log('Calulated Profit: ' + updatedSeriousBusinessPerson.calculateProfit());




/**
 * Pillar-2: Understanding Abstraction
 * In my Espresso Machine, Steam wand sucks... What should the engineers
 * do?
 * - Keep that in mind, espresso machine is boiling water to build up
 *   steam and that steam is used for two things:
 *   a. Steam goes through porter filter to make our espresso, [best]
 *   b. Steam goes through the wand to add texture to the milk. [sucks]
 * 
 * - The engineers aren't concerned about anything other than the piece
 *   that is broken. So, we can say that the water boiling is ABSTRACTED
 *   (hidden) from the steam wand. 
 * - This enables us to implement things without understanding or even
 *   thinking about all the hidden complexity. And this idea of breaking
 *   things down into smaller and manageable pieces is what abstraction
 *   is all about.
 * 
 * How does this apply to programming?
 * - When we write code, we often use libraries, frameworks, or even
 *   methods written by others. We don't need to know how these pieces
 *   work internally, as long as we understand their purpose and how
 *   to use them.
*/

/**
 * Problem without abstraction:
*/

console.log('\n' + 'Agency Contractor without Abstraction:');
function AgencyContractorWithoutAbstraction(hourlyRate, hours, taxRate) {
    this.hourlyRate = hourlyRate
    this.hours = hours
    this.taxRate = taxRate

    // Methods are directly tied to the object
    this.calculateProfit = function () {
        return this.hourlyRate * this.hours * (1 - this.taxRate)
    }

    this.invoiceClient = function () {
        return `Your invoice total is ${this.hourlyRate * this.hours}`
    }
}

let leon = new AgencyContractorWithoutAbstraction(250, 160, .35)
console.log(leon.invoiceClient()); // 40000
console.log(leon.hourlyRate); // 250
console.log(leon.calculateProfit()); // 26000

/** 
 * Issues with this approach:
 * - Every contractor object duplicates 'calculateProfit()' and
 *   'invoiceClient()'. 
 * - Mistakes in methods (like calculateProfit()) can propagate 
 *   everywhere.
 * - Clients can directly access sensitive details like 'hourlyRate'. 
 * - I really wish, I had abstracted the away hourlyRate and only
 *   showing the essential stuff i.e. calculateProfit().
 *   [Means users cannot see hourlyRate, but they can user hourlyRate
 *    internally to calculate their profit.]
*/

/** 
 * Better Solution with Abstraction:
 * - Sensitive details and redundant logic are hidden while exposing
 *   only the essential functionality.
*/

console.log('\n' + 'Agency Contractor with Abstraction:');

function AgencyContractorWithAbstraction(hourlyRate, hours, taxRate) {

    // Data
    this.hours = hours
    this.taxRate = taxRate
    let rate = hourlyRate     // Private variable, hidden from client

    // Private method, not accessible outside
    let calculateProfit = function () {  // Abstracted/hidden
        return this.hourlyRate * this.hour * (1 - this.taxRate)
    }

    // Public method, exposing only what is needed
    this.invoiceClient = function () {
        return `Your invoice total is ${rate * this.hours}`
    }
}

let noel = new AgencyContractorWithAbstraction(250, 160, .35)
console.log(noel.hourlyRate);        // User cannot access directly: undefined
console.log(noel.invoiceClient());   // 40000 [invoiceClient can internally use hourlyRate]
// console.log(noel.calculateProfit()); // Uncaught TypeError: noel.calculateProfit is not a function



/** 
 * Advantage of this approach:
 * - 'rate' is now a local variable [private] and cannot be accessed
 *   directly, means it's abstracted away. So, sensitive details like
 *   'rate' cannot come out as part of the object.
 * - But 'rate' can be used inside our invoiceClient() object, but our
 *   sneaky client can't see it. And the hidden rate is used to calculate 
 *   our invoiceClient() methods which is giving output of 40,000.
 * - But our client tries access the 'rate' variable: 
 *   => leon.hourlyRate => undefined.
 * - This concept enables us to do some really important stuff:
 *   a. hide details [security]
 *   b. show essential details only [clarity]
*/

/**
 * Abstraction: 
 * - Hide details and show essentials
*/


/**
 * Abstraction and Encapsulation are very closely tied to each other.
 * If we're making objects, to keep our data and functionality together.
 * There's going to come a point to where we want to make it so, that
 * as our codebase goes larger and larger, we are going to have more 
 * and more complexity. We're often going to use pieces of our code
 * without really worrying about what's inside, we just expect something
 * to comeout. We don't want to be chasing a code around our codebase.
 * We just had a very precedural code base where variables were everywhere
 * and functions were everywhere, that would get a hot mess as we add
 * more code. So, encapsulation & abstraction are two of the four pillars
 * of object-oriented code, paradigm, system for organizing our code
 * that makes it so that we can work more efficiently together.
 * 
 * Encapsulation:
 * - The process of storing functions(methods) with their associated
 *   data(properties) in one thing(object).
 * - When we fuse our data and functionality together, we make it easier
 *   to add new stuff & eaier to read and organzie our code. This also
 *   makes our code protected, so if somebody else in the codebase use
 *   the same variable name, fn name, it didn't mess up our object,
 *   and that's the beauty of encapsulation.
 *   [Increases code readability, reduces code complexity]
 *   [Cleaner & Maintainable Code]
 * 
 * Abstraction:
 * - Hide details and show essentials.
 * - Means hide away all the complexity and just reveal the things that
 *   we care about. [I want the users to access only invoice, and not
 *   rate, so we abstract the rate but invoice can access the rate
 *   internally and using the rate property they can calculate their
 *   invoice internally and see].
 * - Abstraction just makes our code smaller, more manageable and enables
 *   us to split our complexity of our software project into manageable
 *   part. So, as our code grows, our project gets bigger, and being
 *   able to hide away the complexity and just have very simple interfaces
 *   and simple data out.
 *   [Reduces code complexity, ensuring clarity and security]
*/





/**
 * Pillar-3: Understanding Inheritance
 * Let's start a farm:
 * - We have a Animal class, and every object that comes out of this
 *   class will have a name, and have the ability to make a sound.
*/
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a sound`);
    }
}

/**
 * What if we want bunch of different animals on the farm?
 * => A factory/Constructor:
 * 
 * => We could start spitting them out of this Animal class. But eventually
 *    if we are building a farm and we want to keep a track of a bunch
 *    of different kind of animals like dogs, cats, sheeps, etc.
 * => Each of those different animals might have different things like:
 *    a. breed, 
 *    b. certain part of farm where certain animal live, 
 *    c. different way of speaking.
 * => So, we could kind of use that animal class or we could 'extend'
 *    Animal for each type of Animal that we are going to create.
*/

/**
 * We can extend animal:
 * - I have taken a base Animal class, and we are going to extend it
 *   for each Animal that we want in our farm.
 * - In this example, we extend Animal class to create a Dog class and
 *   then we could use that Dog class to create any number of dogs or
 *   dog breed that we would like.
 * - 'super()' enabling us to go up to the parent class i.e. Animal
 *   class and access their properties & behavior that is passed inside
 *   tha parameter.
 *   a. Animal Class: Parent Class
 *   b. Dog Class   : Child Class
 * - And we know Dog is a child of Animal because it is 'extending' it.
 * - So, now with super(), we can get all the stuff that came with Animal
 *   like the 'name' ability, but we can also add things that we care
 *   about on Dogs like 'breed'. 
*/

console.log('\n' + 'Dog extends Animal:');

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
}
let simba = new Dog('Simba', 'Shephard');
console.log(simba);


/**
 * If you find yourself starting to create a number of objects that
 * have similar features, then create a generic object type to contain
 * all the shared functionality and inheriting those features in more
 * specialized object types can be convenient and useful.
 * This just help us to eliminate a bunch of redundant code, and this
 * is called INHERITANCE.
 * 
 * [We don't have to repeat, we will just inherit from the Parent object
 *  and use it.]
*/

/**
 * Inheritance:
 * Make a class from another class for a hierarchy of classes that
 * share a set of properties and methods.
*/



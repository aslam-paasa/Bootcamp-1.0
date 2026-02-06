/**
 * Polyfill of Object.create():
 * - create function exists on Object Prototype. 
 * - This function is used to create a new object from existing object, and it links the newly created object
 *   links the newly created object to this existing object. (Inheritance) 
 * - By overriding the prototype key of newly created object.
*/

/**
 * Syntax:
 * const obj = Object.create({}, {})
 * const obj = Object.create(null); x
*/

const villain = {
    fightWith: "Galactus",
}

const superHero = {
    name: "Silver Surfer",
}

/**
 * 3-ways to create fresh object: (No Inheritance)
*/
const obj = {};
const obj2 = new Object();

/**
 * Object.create(): (Inheritance)
*/
const obj4 = Object.create(superHero, { origin: { value: "Earth" } });
console.log(obj4);


/**
 * Custom Object.create():
*/
Object.prototype.myCreate = function (parentObject, keysObject) {
    function F() { };

    F.prototype = parentObject;

    const newObj = new F();
    if (keysObject) {
        Object.defineProperties(newObj, keysObject);
    }

    return newObj;
}

const obj5 = Object.myCreate(superHero, {
    name: { value: "Superman" },
    origin: { value: "Earth" }
});

console.log(obj5);
console.log(obj5.name);
console.log(obj5.origin);
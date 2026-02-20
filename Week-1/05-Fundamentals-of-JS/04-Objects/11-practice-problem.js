/**
 * 1. Create an object representing a type of tea with properties of name,
 *    type, and caffeine content.
*/

const teas = {
    name: "Lemon tea",
    type: "Green",
    caffine: "low"
}

/**
 * 2. Access and print the name and type of properties of the tea object. 
*/

console.log(teas.name);

/**
 * Agar object key aisa hota - "tea type": "Green" 
 * toh usko access karne ke liye - 
*/
console.log(teas["tea type"]);


/**
 * 3. Add a new property origin to the tea object.
*/
teas.origin = "Assam";

/**
 * 4. Change the caffeine level of the tea object to "Medium".
*/
teas.caffine = "Medium";

/**
 * 5. Remove the type property from the tea object.
*/
delete teas.type;


/**
 * 6. Check if the tea object has a property origin.
*/
console.log(teas.hasOwnProperty("origin"));
console.log("origin" in teas);


/**
 * 7. Use a for...in loop to print all properties of the tea object. 
*/
for (let key in teas) {
    console.log(key + ": " + teas[key]); // old syntax
    console.log(`${key}: ${teas[key]}`); // new syntax
}

/**
 * 8. Create a nested object representing different type of teas and
 *    their properties.
*/

const myTeas = {
    greentea: {
        name: "Green Tea",
    },
    blacktea: {
        name: "Black Tea",
    },
    herbaltea: {
        name: "Herbal Tea",
    }
}

/**
 * 9. Create a copy of the tea object: [Object Copying Methods]
 *    - There are 3 ways to copy objects in JavaScript:
 *      1. Reference Copy
 *      2. Shallow Copy 
 *      3. Deep Copy
*/

const chai = {
    greentea: {
        name: "Green Tea",
        cups: {
            one: "1 cup",
            two: "2 cups",
            three: "3 cups"
        }
    },
    blacktea: {
        name: "Black Tea",
        cups: {
            one: "1 cup",
            two: "2 cups",
            three: "3 cups"
        }
    }
}

/**
 * Reference Copy:
 * - This is neither shallow nor deep copy. This is reference copy.
 * - Creates a reference to the original object
 * - Changes in copy affect original object
*/
const teaRef = chai;

/**
 * Shallow Copy:
 * - Copies first level properties
 * - Nested objects are referenced, not copied
 * - Changes to nested objects affect original
 * - Ex: Spread operator and Object.assign()
*/
const teaShallow = { ...chai };
const teaShallowTwo = Object.assign({}, chai);

/**
 * Deep Copy:
 * - It copies the entire object including the nested objects.
 * - It is a deep copy.
*/
const teaDeep = JSON.parse(JSON.stringify(chai));


/**
 * 10. Add a custom method describe to the tea object that returns a 
 *     description string.
 *     - Chalo chai object mein ek describe method add karte hain
*/

chai.describe = function() {
    return `Humare paas ${this.greentea.name} aur ${this.blacktea.name} available hai, dono mein 1-3 cups ki choice hai.`;
};

console.log(chai.describe());


/**
 * 11. Merge two objects representing different teas into one.
*/

const herbalTea = {
    chamomile: {
        name: "Chamomile Tea",
        cups: {
            one: "1 cup",
            two: "2 cups" 
        }
    },
    peppermint: {
        name: "Peppermint Tea",
        cups: {
            one: "1 cup",
            two: "2 cups"
        }
    }
};

const allTeas = { ...chai, ...herbalTea };

console.log("Saare teas ka merged object:", allTeas);
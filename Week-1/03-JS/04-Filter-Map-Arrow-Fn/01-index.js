/**
 * map, filter, arrow functions:
*/


/**
 * 1. Until now we have written functions like this: Normal Functions
 * => function sum(a, b) {
 *       return a + b;
 *    }
*/


/**
 * 2. Arrow Functions:
*/
const sum = (a, b) => {
    return a + b;
}

const ans = sum(1, 2);
console.log(ans);


/**
 * Similarly:
*/
app.get("/", function(req, res) {}) // Normal Functions
app.get("/", (req, res) => {}); // Arrow Functions
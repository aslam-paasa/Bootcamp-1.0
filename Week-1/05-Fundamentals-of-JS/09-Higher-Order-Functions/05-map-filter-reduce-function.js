/**
 * Map, Filter, Reduce:
 * - The map(), filter(), and reduce() functions are all higher-order functions
 *   that are used to transform arrays.
 * - They are all used to iterate over arrays and perform operations on the
 *   elements of the array.
*/

/**
 * Assume that this is list of users data that we get from API:
*/

const users = [
    { firstName: "akshat", lastName: "saini", age: 26 },
    { firstName: "donald", lastName: "trump", age: 75 },
    { firstName: "elon", lastName: "musk", age: 50 },
    { firstName: "deepika", lastName: "padukone", age: 26 },
];


/**
 * Q. Find the full name of all the users
 * Ans: The map() will be running on the array of objects and will return
 *      an array of strings.
*/
const outputMap = users.map(x => x.firstName + " " + x.lastName);
console.log(outputMap);



/**
 * Q. Find the number of people with the same age
 * Ans: The reduce() will be running on the array of objects and will return
 *      an object with the age as the key and the number of people with that
 *      age as the value.
*/

const outputReduce = users.reduce(function(acc, curr) {
    if(acc[curr.age]) {
        acc[curr.age] = ++acc[curr.age];
    } else {
        acc[curr.age] = 1;
    }
    return acc;
}, {});

console.log(outputReduce); // { '26': 2, '50': 1, '75': 1 }


/**
 * Q. Find firstName of all the people whose age is less than 30
 * Ans: The map() will be running on output of "users.filter((x) => x.age < 30)"
 *      these objects 
*/

const outputFilter1 = users.filter((x) => x.age < 30);
console.log(outputFilter1);
/**
 * [
 *     { firstName: 'akshat', lastName: 'saini', age: 26 },
 *     { firstName: 'deepika', lastName: 'padukone', age: 26 }
 * ]
*/


/**
 * Method chaining :
 * - Method chaining is a technique of chaining multiple methods together 
 *   in a single line of code.
 * - It is used to chain multiple methods together to perform a sequence of 
 *   operations on a data structure.
*/

/**
 * Q. Find the firstName of all the people whose age is less than 30
 * Ans: The filter() will be running on the array of objects and will return
 *      an array of objects.
 *      The map() will be running on the array of objects and will return
 *      an array of strings.
*/
const outputFilter2 = users.filter((x) => x.age < 30).map((x) => x.firstName);
console.log(outputFilter2); // [ 'akshat', 'deepika' ]

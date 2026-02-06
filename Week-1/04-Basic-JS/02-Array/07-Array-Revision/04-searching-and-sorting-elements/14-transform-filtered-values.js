/**
 * Assignment: Filter and Map Combination
 * 1. Task: Ek array mein different people ki information hai. 
 *          Humein sirf females ki age extract karni hai.
 * 
 * 2. Requirements:
 *    - Pehle females ko filter karna hai
 *    - Phir unki age extract karni hai
 * 
 * 3. Hint: filter() aur map() ka combination use karna hai
 */

/**
 * Data: People ki information
 */
const peopleData = [
    {name: "Rahul", age: 14, gender: "M"},
    {name: "Amit", age: 34, gender: "M"},
    {name: "Priya", age: 24, gender: "F"},
    {name: "Ananya", age: 4, gender: "F"},
    {name: "Rajesh", age: 44, gender: "M"},
    {name: "Neha", age: 28, gender: "F"},
    {name: "Vikram", age: 36, gender: "M"},
    {name: "Pooja", age: 27, gender: "F"}
];

/**
 * Solution using filter and map combination
 */
const femaleAges = peopleData
    .filter(person => person.gender === "F")
    .map(female => female.age);

console.log("Females ki ages:", femaleAges);    // Output: [24, 4, 28, 27]

/**
 * Explanation:
 * 1. filter() se humne sirf females ko select kiya
 * 2. map() se humne unki age extract ki
 * 3. Chaining ka use karke humne dono operations ek saath kiye
 */
/**
 * Assignment: Calculate sum of squares of ages for valid female candidates
 * Valid candidates criteria:
 * - Gender should be Female
 * - Age should be between 20 and 30 (inclusive)
 */

const candidates = [
    {name: "A", age: 14, gender: "M"},
    {name: "B", age: 34, gender: "M"},
    {name: "C", age: 24, gender: "F"},
    {name: "D", age: 44, gender: "F"},
    {name: "E", age: 44, gender: "M"},
    {name: "F", age: 28, gender: "F"},
    {name: "G", age: 36, gender: "M"},
    {name: "H", age: 47, gender: "F"}    
];

/**
 * Step 1: Filter valid female candidates
 */
const validFemaleCandidates = candidates.filter(candidate => 
    candidate.gender === 'F' && 
    candidate.age >= 20 && 
    candidate.age <= 30
);

/**
 * Step 2: Calculate square of ages
 */
const squaredAges = validFemaleCandidates.map(candidate => 
    candidate.age * candidate.age
);

/**
 * Step 3: Calculate sum of squared ages
 */
const sumOfSquaredAges = squaredAges.reduce((accumulator, currentValue) => 
    accumulator + currentValue, 
    0
);

console.log("Sum of squared ages of valid female candidates:", sumOfSquaredAges);
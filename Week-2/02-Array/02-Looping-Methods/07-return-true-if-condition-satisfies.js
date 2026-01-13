/**
 * Step 6: some() - At least one element passes condition
*/

const numbers = [1, 2, 3, 4, 5];

/* Koi bhi even number hai? */
const hasEven = numbers.some(num => num % 2 === 0);
console.log("Has even number?", hasEven); // true

/* Koi bhi number 10 se bada hai? */
const hasGreaterThan10 = numbers.some(num => num > 10);
console.log("Has number > 10?", hasGreaterThan10); // false


/**
 * Step 7: every() - All elements pass condition
*/

const numbers2 = [2, 4, 6, 8, 10];

/* Saare numbers even hain? */
const allEven = numbers2.every(num => num % 2 === 0);
console.log("All numbers even?", allEven); // true

/* Saare numbers positive hain? */
const allPositive = numbers2.every(num => num > 0);
console.log("All numbers positive?", allPositive); // true




/**
 * Real World Example - Form Validation
*/

const formFields = [
    { field: "name", value: "Rahul", required: true },
    { field: "email", value: "rahul@example.com", required: true },
    { field: "phone", value: "", required: false },
    { field: "age", value: "25", required: true }
];

/* Koi required field empty hai? */
const hasEmptyRequired = formFields.some(field => 
    field.required && field.value.trim() === ""
);

/* Saare required fields filled hain? */
const allRequiredFilled = formFields.every(field => 
    !field.required || field.value.trim() !== ""
);

console.log("Has empty required field?", hasEmptyRequired); // false
console.log("All required fields filled?", allRequiredFilled); // true
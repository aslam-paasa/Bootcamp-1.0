/**
 * 3. JavaScript Loops:
 * => (a) WAP to greet a person given their first and last name.
 *    (b) WAP to greet a person based on their gender.
 *    (c) WAP that counts from  0-1000 and prints.
*/

// (a) Write a program to greet a person given their first and last name.
function greet(firstName, lastName) {
    return `Hello ${firstName} ${lastName} very good morning`;
}

const greet1 = greet("Bhavani", "Kandepi");
console.log(greet1);


// (b) Write a program to greet a person based on their gender.
function genderGreeting(gender) {
    if (gender === "male") {
        return "Good Morning Sir";
    } else if (gender === "female") {
        return "Good Morning Madam";
    } else {
        return "I don't know you!";
    }
}

const greetFemale = genderGreeting("female");
console.log(greetFemale);

const greetMale = genderGreeting("male");
console.log(greetMale);


// (c) Write a program that counts from 0-1000 and prints.
let result = 0

for (let i = 0; i <= 1000; i++) {
    result = result + i;
}
console.log(result)

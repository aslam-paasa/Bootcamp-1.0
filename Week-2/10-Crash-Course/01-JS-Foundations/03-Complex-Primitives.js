/*
	1. Arrays
	2. Objects
*/


/**
 * Array:
 * (a) Creating an array of numbers
 * (b) Creating an array of strings
 * (c) Creating an array with mixed data types
 * 
 * Note: Accessing Array Elements: 
 * => Array elements are accessed using zero-based indexing.
*/

let numbers = [1, 2, 3, 4, 5];
let fruits = ['Apple', 'Banana', 'Orange'];
let mixedArray = [1, 'Hello', true, { key: 'value' }];


/**
 * Accessing elements in the array and their properties:
 */

// 1. Write  a program that prints  all the even numbers in the array
let number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10]

// function-1:
for (let i = 0; i < number.length; i++) {
  if (number[i] % 2 == 0) {
    console.log(number[i]);
  }
}


// function-2:
let i = 0
while (i < number.length) {
  if (number[i] % 2 == 0) {
    console.log(number[i]);
  }
  i++;
}

// function-3:
number.forEach((e) => {
  if (e % 2 == 0) {
    console.log(e)
  }
})



// 2. Write a program to print a biggest number in an array
let a = [1, 30, 54, 400, 3, -5]

let largest = a[0];

for (let i = 0; i < a.length; i++) {
  if (a[i] > largest) {
    largest = a[i]
  }
}
console.log(largest)


// 3. Write a program that reverse all the elements of an array.

// function-1:
let a01 = [2, 3, 45, 7, 100]
let b01 = [] //Empty array to store the reverse value

for (let i = a01.length - 1; i >= 0; i--) {
  b01.push(a01[i]);
}
console.log(b01)


// function-2:
let a02 = [2, 3, 45, 7, 100]

let b02 = a02.reverse()
console.log(b02)


// function-3:
function reverseArray(array) {
  return array.reverse();
}

const reversedArray = reverseArray([10, 30, 40, 50, 19, 41]);
console.log(reversedArray);




/**
 * 2. Object:
 * (a) Creating an array of objects
 * (b) Accessing elements in the array and their properties:
 *     (i) WAP to print all the female people's first name given a complex object.
 *     (ii) WAP to reverse all the elements of an array.
*/

let students = [
  { name: 'Alice', age: 20, grade: 'A' },
  { name: 'Bob', age: 22, grade: 'B' },
  { name: 'Charlie', age: 21, grade: 'A-' }
];



// 4. Write a program to print all the female people's first name given a complex object.

let user_details = [
  {
    firstname: "likitha",
    gender: 'female',
  },
  {
    firstname: "spoorthi",
    gender: 'female',
  },
  {
    firstname: "ajay",
    gender: 'male',
  },
];

for (let i = 0; i < user_details.length; i++) {
  if (user_details[i].gender == 'female') {
    console.log(user_details[i])
  }
}


// 5. Write a program that prints all the male people's first name given a complex object
  const people = [
    {
      gender: "male",
      firstName: "John",
    },
    {
      gender: "female",
      firstName: "Jane",
    },
    {
      gender: "male",
      firstName: "Bob",
    },
    {
      gender: "other",
      firstName: "Emily",
    },
    { gender: "Male", firstName: "Charlie" },
  ];
  
  const peopleFirstName = people
    .filter((person) => person.gender.toLowerCase() === "male")
    .map((person) => person.firstName);
  console.log(peopleFirstName);

  
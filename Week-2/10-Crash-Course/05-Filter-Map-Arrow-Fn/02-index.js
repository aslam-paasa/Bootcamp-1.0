// Given an array, give me back a new array in which every value is multiplied
// by 2.
// [1, 2, 3, 4, 5]
// [2, 4, 6, 8, 10]

const input = [1, 2, 3, 4, 5];

// Solution-1 : Using for-loop
const newArray = [];

for (let i = 0; i < input.length; i++) {
    newArray.push(input[i] * 2);
}

console.log(newArray);


// Solution-2 : Using map function (more cleaner)
// A function can take another function as an input in javascript.


function transform(i) {
    return i * 2;
}

const newMap = input.map(transform);
console.log(newMap);

// More Cleaner
const shortMap = input.map(function(i) {
    return i * 2;
});
console.log(shortMap);


// Create a map function that takes 2 inputs an array, and a transformation
// callback/fn and transforms the array into a new one using the transformation
// fn.
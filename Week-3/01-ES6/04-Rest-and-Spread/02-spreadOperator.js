// Spread Operator :
// => "spreadExample2" takes an array and uses destructuring assignment with
//    the rest parameter syntax to extract the first two elements of the array
//    and put the remaining elements into another array called "rest".

// Code Example :
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const spreadExample = ([first, second, ...rest]) => {
    console.log(first, second, rest);
}

console.log(spreadExample(array));

// rest with spread
console.log(spreadExample([...array, 11, 12, 13]));
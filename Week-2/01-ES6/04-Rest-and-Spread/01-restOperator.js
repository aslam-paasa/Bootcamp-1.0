// Rest Operator :
// => The rest parameter syntax allows a function to accept an indefinite
//    number of arguments as an array. The rest parameter is indicated by 
//    the use of the spread operator followed by a parameter name with
//    three dots (...parameterName).

// Code Example :
const restExample = (a, ...rest) => {
    console.log(a, rest);
}
console.log(restExample(2, 3, 4, 5, 6, 7, 8, 9, 10));
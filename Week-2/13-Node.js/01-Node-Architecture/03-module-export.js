let x = "export in React exports in Node";

function calculateSum(a, b) {
    let sum = a + b;
    console.log(sum);
}

// Exporting the function calculateSum
module.exports = {
    x: x,
    calculateSum: calculateSum
};


/**
 * What is module.exports?
 * => console.log(module.exports);  // {}
 * => It is emoty object.
*/
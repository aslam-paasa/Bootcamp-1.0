/**
 * string vs toString Comparison:
*/

console.log("⚖️ String() vs toString() Comparison:");

const testValues = [
    42,
    true,
    false,
    null,
    undefined,
    [1, 2, 3],
    { name: "John" },
    NaN
];

console.log("\nValue".padEnd(15) + "String()".padEnd(20) + "toString()".padEnd(20));
console.log("-".repeat(55));

testValues.forEach(value => {
    let stringResult, toStringResult;

    // String() - always works
    stringResult = String(value);

    // toString() - might throw error
    try {
        if (value === null || value === undefined) {
            toStringResult = "ERROR";
        } else {
            toStringResult = value.toString();
        }
    } catch (error) {
        toStringResult = "ERROR";
    }

    console.log(
        String(value).padEnd(15) +
        stringResult.padEnd(20) +
        toStringResult.padEnd(20)
    );
});
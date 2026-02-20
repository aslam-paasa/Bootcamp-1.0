/**
 * Q. Create a basic testing framework in JS:
 * 1. Start by writing an 'add' function that adds two numbers.
 * 2. Next, build a test function that takes a test name and a callback.
 *    The callback should return a boolean value to indicate if the test
 *    passed or failed. Log the test name and the test result.
 * 3. Finally, write a test case using the 'test' function to check if
 *    the 'add' function correctly adds two numbers. Test if the sum of
 *    5 and 7 is equal to 12.
*/

/**
 * But first, we have to set up the testing framework: JEST Testing
 * - npm install --save-dev jest
 * - package.json:
 *   {
 *      "scripts": {
 *        "test": "jest"
 *      }
 *   }
 * - npm run test
*/

function add(num1, num2) {
    return num1 + num2;
}

function product(num1, num2) {
    return num1 * num2;
}

/**
 * Test Results are working but the issue is which test failed we don't
 * know. So, we should write the name of the test case.
*/
console.log(add(2, 3) === 5 ? "add.. test passed" : "add.. test failed");
console.log(product(2, 3) === 6 ? "product.. test passed" : "product.. test failed");


/**
 * We want to make this easy to remember. So, we will write a function
 * test, where we can give the testName, and testFn.
 * 
 * 1. test is a function with two arguments:
 *    a. testName -- name of the test
 *    b. callback -- return true or false
 * 2. output -- it should print the result of the test
*/


function test(testName, cb) {
    console.log(`testing... ${testName}`);
    const testResult = cb();
    testResult ? console.log(`${testName} passed...`) : console.log(`${testName} failed`);
}


/**
 * Test-1:
*/
test("should add two numbers", () => {
    // Call the fn and match with expected output
    return add(2, 3) === 5;
})


/**
 * Test-2:
*/
test("should multiply two numbers", () => {
    // Call the fn and match with expected output
    return product(2, 3) === 5;
})

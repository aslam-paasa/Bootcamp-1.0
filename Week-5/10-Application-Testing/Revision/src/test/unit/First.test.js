/**
 * test() takes two arguments:
 * - Argument-1: Define jo hm krna chahte hai
 * - Argument-2: Callback fn - we have two more fns:
 *               a. expect() - What are we expecting
 *               b. toBe()   - What is the value
 * Note: Basically humaara expect() pe '1' hm as input paas krte hai
 *       to toBe() ko '2' as output expect krta hai. Agar toBe(2) hai
 *       to testcase paas ho jaega.
 * */ 

/**
 * Problem:
 * - Jb hm npn run test likh rhe hai to humara server fir se restart ho
 *   rha hai again and again. 
 * 
 * Solution:
 * - Go to package.json => "test": "jest --coverage --watchAll"
 * - Ab hm npm run test krnge to wo report ko dega but server end nhi
 *   hoga aur wait krega dusre test cases k liye. Aur jaise hi dusre
 *   test cases m kuch changes krnge mera server automatically chlne
 *   lgega.
*/

const fun = require('./function')
let sum = (x) => {
    return x+1;
}

function mult(y) {
    return y*2;
}


test('checking if one is equal to one', () => {
    expect(sum(1)).toBe(2);
})

test('checking if one is equal to one', () => {
    expect(mult(3)).toBe(6);
})

test('is one equal to 1', () => {
    expect(fun(1)).toBe(2);
})
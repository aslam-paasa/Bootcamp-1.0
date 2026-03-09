
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
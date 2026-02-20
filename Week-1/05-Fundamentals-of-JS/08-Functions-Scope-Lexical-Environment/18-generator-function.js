/**
 * 1. What is Iterator Pattern?
 * 2. What is Generator Function?
 * 3. What is yield keyword?
*/

/**
 * Iterator Pattern:
 * - Iterator pattern is a design pattern that allows us to iterate over a 
 *   collection of objects. It has 3 methods:
 *   a. value: Representing the next value in the collection
 *   b. done: Representing whether the iteration is complete or not
 *   c. next(): Calling this method will return the next value in the collection
*/

/**
 * How he knows k humein left to right iterate karna hai?
 * - Because array k andr hum build-in iterator fn hai jo isko btata hai ki
 *   kabhi tumhare paas array aata hai to usko kis tarah se print karna hai.
 * - And this is how we can customize the behavior of for-of loop.
 * - And sometimes we have to customize our own datatypes and usko upar
 *   iterate karne ka ko pattern/mechanism humein khud code karna padega
 *   aur uss chij ko banane k liye we have:
 *   a. iteration protocol
 *   b. generator and function* 
 *   c. yield keyword
*/
for (const val of [1, 2, 3, 4, 5]) {
    console.log(val);
}


/**
 * Creating our own iterator fn:
*/
function makeIterator(start = 0, end = Infinity, step = 1) {
    let current = start;
    let iterationCount = 0;

    return {
        next() {
            let result;
            if(iterationCount < end) {
                result = { value: current, done: false };
                current = current + step;
                iterationCount++;
                return result;
            }
            return { value: iterationCount, done: true };
        }
    }
}

// const myIterator = makeIterator(1, 10, 2);
// let result = myIterator.next();

// while(!result.done) {
//     console.log(result.value); 
//     result = myIterator.next();
// }


/**
 * Generator Function:
 * - Generator function is a special type of function that returns a 
 *   generator object.
*/

function* myGenerator(start = 0, end = Infinity, step = 1) {        
    for(let i = start; i <= end; i = i + step) {
        yield i;
    }
}

for(const val of myGenerator(1, 20, 1)) {
    console.log(val);
}

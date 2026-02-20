/**
 * Q. What are libraries?
 * => Libraries are external library that has all the logic require to read from an
 *    external file.
 * => 'fs' is in-built method inside our NodeJS but the HTTP Server that we will work
 *    with is not, which is why we need to use NPM (Node Package Manager) to bring
 *    its code to our machine.
*/

/**
 * Q. Do you remember the fs library?
 * => We use this to read the content of file.
 * => Similarly, there are many libraries that let's you create HTTP Servers.
 *    The most famous one is "ExpressJS". 
 * 
 * Note : Now-a-days NextJS is hotcake for Backend in market.
 */


/**
 * => A great exercise to do is to create HTTP Server from scratch is C++
 *    It is out of scope for this course, but if you're looking for challenge.
*/


/**
 * Q. How can we expose this code to the world?
 * => That is when we need HTTP Server.
 * => It is a rules & guidelines and people have already written "libraries" that let's
 *    us very easily create HTTP Servers.
 * => Now we have to work with "ExpressJS" library that let us use create "HTTP Server".
*/

function calculateSum(counter) {
    let sum = 0;
    for(let i = 0; i < counter; i++) {
        sum = sum + i;
    }
    return sum;
}

let calculatedSum = calculateSum(100);
console.log(calculatedSum);


// 'fs' has hidden the complexity of reading from file
const fs = require("fs");

function callbackFn(err, data) {
    console.log(data);
}
fs.readFile("a.txt", "utf-8", callbackFn);

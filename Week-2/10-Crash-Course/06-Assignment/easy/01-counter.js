/**
 * We have already covered this in the second lesson, but as an easy
 * recap try to code a counter in JS. It should go up as time goes
 * by in intervals of 1 second.
 */

let counter = 0;

function updateCounter() {
    counter++;
    console.log(counter);
}

setInterval(updateCounter, 1000);

/**
 * Expected output:
 * 1
 * 2
 * 3
 * 4
 * 5
 * 6
 * 7
 * 8
 * 9
 * 10
 * ...
 * 60
*/
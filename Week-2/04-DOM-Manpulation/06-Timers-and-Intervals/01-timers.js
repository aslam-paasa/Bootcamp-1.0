/**
 * Ek baar chlta hai
*/
setTimeout(function() {
    console.log('Resident Evil');
}, 1000);


/**
 * Baar baar chlta hai
*/
setInterval(function() {
    console.log('Call of Duty');
}, 2000);


/**
 * timer ko stop karta hai
*/

let timer = setInterval(function() {
    console.log('World of Warcraft');
}, 2000);

clearInterval(timer);


/**
 * Counter
*/

let count = 10;

let counter = setInterval(function() {
    console.log(count);
    count--;
    if (count < 0) {
        clearInterval(counter);
    }
}, 1000);

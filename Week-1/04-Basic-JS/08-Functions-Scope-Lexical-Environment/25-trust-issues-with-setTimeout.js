/**
 * Concurrency Model of JavaScript:
*/

console.log("Start");

setTimeout(function cb() {
    console.log("Callback");
}, 5000);

console.log("End");

/**
 * Q. How we can block the main thread via help of code? 
 * 1. Start will pe printed
 * 2. Callback will be registered
 * 3. End will be printed
 * 4. After 5sec expired, this Callback will be printed.
*/

/**
 * Q. Now let's block the main thread for 10 seconds. But how can we simulate to
 *    block our main thread for 10 seconds?
 * => We will use "while()" loop to wait for 10 seconds.
 * => We will take the startDate is "new Date().getTime()" and we somehow will run
 *    this while loop for 10 seconds. So, this while() loop will continuously run for
 *    10 seconds and we will keep updating our "endDate()" with "new Date()". SO, this
 *    loop will keep on updating our endDate with the present date in every millisecond.
 *    And we will keep running this while loop until and unless our endDate is less than
 *    equal to startDate + setTimeout().
 * => This startDate() basically takes the current date at present time and then will
 *    wait for 10,000ms. It goes into continuous loop and this while loop is
 *    updating the endDate in every milliseconds.
*/

let startDate = new Date().getTime(); // Current Time & Date
let endDate = startDate;
while(endDate < startDate + 10000) {
    endDate = new Date().getTime();
}

console.log("While expires here");

/**
 * Output:
 * => Start
 * => End
 * => cb() is registered
 * => While expires
 * => Callback
*/
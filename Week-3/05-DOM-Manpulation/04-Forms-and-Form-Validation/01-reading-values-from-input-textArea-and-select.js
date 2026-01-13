/**
 * Form Validation:
 * - preventDefault() mere form ko submit hone se rok deta hai, fir hum
 *   check karte hai ki mere input ki validation pass ho rahi hai ya nahi
 * - validation pass ho rahi hai toh form ko submit karte hai, nahi toh
 *   form ko submit nahi karte
*/

/**
 * 1. Reading values from input, textarea and select
 * 2. Preventing default form submission
 * 3. Inline and JS validation
 * 4. Showing error messages conditionally
 * 5. Pattern attribute vs custom regex
*/

let username = document.querySelector('#username');
let form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let ans = regex.test(email.value);
    console.log(ans);
});
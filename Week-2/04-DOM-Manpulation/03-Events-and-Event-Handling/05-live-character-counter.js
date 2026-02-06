/**
 * Live Character Counter:
 * input.value.length is a property that returns the number of characters
 * in the input field.
*/

let input = document.querySelector('input');
let span = document.querySelector('span');

input.addEventListener('input', function() {
    let left = 20 - input.value.length;
    if(left < 0) {
        span.textContent = 'You have exceeded the limit';
        span.style.color = 'red';
        input.maxLength = input.value.length;
    } else {
        span.style.color = 'black';
        span.textContent = left;
    }
});
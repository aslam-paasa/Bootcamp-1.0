/**
 * Create a new element in the DOM:
 * 1. Get the parent element
 * 2. Create a new element
 * 3. Set the innerHTML of the new element
 * 4. Append the new element to the parent element 
 *    (Adding new element to the end of the parent element)
*/

/**
 * 1. Get the parent element
*/
const parent = document.querySelector('body');

/**
 * 2. Create a new element
*/
const newElement = document.createElement('h1');

/**
 * 3. Set the innerHTML of the new element
*/
newElement.innerHTML = 'Hello from JavaScript';

/**
 * 4. Append the new element to the parent element
*/
parent.appendChild(newElement);

/**
 * DOM Attributes - getAttribute aur setAttribute
 * 
 * 1. getAttribute() Method:
 *    - Ye method kisi HTML element ke attribute ki value ko get karne ke liye use hota hai
 *    - Syntax: element.getAttribute('attributeName')
 *    - Example: 
 *      const img = document.querySelector('img');
 *      const srcValue = img.getAttribute('src'); // Returns the image source URL
 * 
 * 2. setAttribute() Method:
 *    - Ye method kisi HTML element ke attribute ki value ko change karne ke liye use hota hai
 *    - Syntax: element.setAttribute('attributeName', 'newValue')
 *    - Example:
 *      const img = document.querySelector('img');
 *      img.setAttribute('src', 'new-image.jpg'); // Changes the image source
 * 
 * Practical Example:
 * a. HTML: <button id="submitBtn">Submit</button>
 * 
 * b. JS: Getting attribute value
 *    - const button = document.querySelector('button');
 *    - const buttonId = button.getAttribute('id'); // Returns "submitBtn"
 * 
 * c. JS: Setting attribute value
 *    - button.setAttribute('id', 'newSubmitBtn'); // Changes id to "newSubmitBtn"
 * 
 * Note: Ye methods bahut useful hote hain jab hume dynamically HTML elements ke attributes
 * ko manipulate karna hota hai.
 */


var h = document.querySelector('h1');

var attribute = h.getAttribute('id');
console.log(attribute);


h.setAttribute('id', 'heroine');

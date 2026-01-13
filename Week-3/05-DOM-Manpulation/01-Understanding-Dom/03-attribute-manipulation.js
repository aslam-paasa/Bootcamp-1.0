/**
 * How can we manipulate DOM?
 * 1. Select Elements            [done]
 * 2. Text/Content Manipulation  [done]
 * 3. Attribute Manipulation     [done]
 * 4. Dynamic DOM Manipulation
 * 5. Style Manipulation
 * 6. Event Handling (DOM Events) 
*/


/**
 * What is an attribute?
 * - In HTML, attributes are basically extra info or settings for an element.
 *   Or,
 * - Ye object ke properties hai jo object k behavior ko define karta hai.
*/

/**
 * Attribute Manipulation:
 * 1. getAttribute()
 * 2. setAttribute()
 * 3. removeAttribute()
*/

let a = document.querySelector('a');

/**
 * Directly change the attribute value:
*/
a.href = 'https://www.unsplash.com';   

/**
 * 1. setAttribute(): It is used to set the value of an attribute.
*/

let img = document.querySelector('img');
img.setAttribute('src', 'https://plus.unsplash.com/premium_photo-1751998306511-8fc018746860?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D');


/**
 * 2. getAttribute(): It is used to get the value of an attribute.
*/
a.getAttribute('href'); // "www.unsplash.com"


/**
 * 3. removeAttribute(): It is used to remove an attribute.
*/

a.removeAttribute('href'); // "" 
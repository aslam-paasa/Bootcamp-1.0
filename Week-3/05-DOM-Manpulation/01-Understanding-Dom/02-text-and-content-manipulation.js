/**
 * How can we manipulate DOM?
 * 1. Select Elements            [done]
 * 2. Text/Content Manipulation  [done]
 * 3. Attribute Manipulation
 * 4. Dynamic DOM Manipulation
 * 5. Style Manipulation
 * 6. Event Handling (DOM Events) 
*/


/**
 * Text/Content Manipulation:
 * There are 3 ways to manipulate the text/content of an element:
 * 1. textContent
 * 2. innerText
 * 3. innerHTML
*/

let h1 = document.querySelector('h1'); 


/**    
 * 1. textContent: 
 *    - Replaces all text, including tags, and doesn't care about visibility. 
 *    - It shows everything, even the hidden stuff.
*/

h1.textContent = "<b>Hello Coders</b>"; 
// Output: <b>Hello Coders</b> (as plain text)

/**
 * 2. innerText:
 *    - Works kinda like textContent, but ignores hidden elements and keep
 *      formatting (like line breaks, spacing).
 *    - Only shows what's visible on screen.
*/

h1.innerText = "Hello\nCoders"; 
// Output: Hello Coders

/**
 * 3. innerHTML:
 *    - Can inject real HTML into the element.
 *    - You can add tags, styling, even scripts.
 *    - Security Risk: Yes! Avoid using this with user input (can be hacked
 *      via XSS attacks)
*/

h1.innerHTML = "<i>Hello Coders</i>"; 
// Output: Hello Coders (in italic)

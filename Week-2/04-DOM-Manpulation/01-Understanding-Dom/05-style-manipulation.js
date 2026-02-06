/**
 * How can we manipulate DOM?
 * 1. Select Elements            [done]
 * 2. Text/Content Manipulation  [done]
 * 3. Attribute Manipulation     [done]
 * 4. Dynamic DOM Manipulation   [done]
 * 5. Style Manipulation
 * 6. Event Handling (DOM Events) 
*/


/**
 * How to manipulate style of an element?
 * 1. style  
 * 2. classList: 
 *    - Add      : Add a class to an element
 *    - remove   : Remove a class from an element
 *    - toggle   : if class is present, remove it, if not present, add it
 *    - contains : Check if class is present or not
*/

let h1 = document.querySelector('h1');
h1.style.color = 'red';
h1.style.fontFamily = 'Gilroy';

h1.classList.remove('coder'); 
h1.classList.add('hulu');
h1.classList.toggle('hulu'); // toggle: if class is present, remove it, if not present, add it
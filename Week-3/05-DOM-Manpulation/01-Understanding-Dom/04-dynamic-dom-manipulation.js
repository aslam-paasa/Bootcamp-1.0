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
 * How to manipulate DOM dynamically?
 * 1. createElement(): New element create karna
 * 2. prepend()      : Attach element at the start of the parent element
 * 2. append()       : Attach element at the end of the parent element
 * 2. appendChild()  : Ek element ko ek dusre element ke andar add karna
 * 3. removeChild()  : Ek element ko andar k element ko remove karna
 * 4. remove()       : Remove element from the parent element
*/

let h1 = document.createElement('h1');
h1.textContent = 'Hello World';
document.querySelector('body').append(h1);
document.querySelector('body').prepend(h1);
h1.remove(); 

let div = document.createElement('div').append(h1);


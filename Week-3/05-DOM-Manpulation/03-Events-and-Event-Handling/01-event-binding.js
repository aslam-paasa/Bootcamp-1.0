/**
 * How can we manipulate DOM?
 * 1. Select Elements            [done]
 * 2. Text/Content Manipulation  [done]
 * 3. Attribute Manipulation     [done]
 * 4. Dynamic DOM Manipulation   [done]
 * 5. Style Manipulation         [done]
 * 6. Event Handling (DOM Events) 
*/

/**
 * What is an event?
 * - Event is like a signal/message that is sent to the browser when user
 *   performs an action on the webpage like click, hover, scroll, etc.
 * - Ye sb kuch browser k level pe detect hota hai, aur hum JS k through
 *   bol sakte hai:
 *   "Bhai, agar ye action/event hua - to ye kaam kar dena!"
*/

/**
 * How to manipulate DOM through actions on webpage? (VVI)
 * - Event Binding
 * - Event Object
 * - Event Bubbling & Capturing
 * - Event Delegation
*/


/**
 * Event Binding:
 * - Event Binding means connecting (binding) a function to an event so
 *   that when the event/action happens, the function runs.
 * - "Agar ye event ho to ye kaam karna hai"
 * 
 *   a. addEventListener()
 *   b. removeEventListener()
 * 
 * - Ye do chije maangta hai:
 *   a. Event Type: click, mouseover, keydown, etc.
 *   b. Function  : Function to run when event happens
*/


/**
 * 1. Select the element
 * 2. Add Event Listener (browser is waiting for user to perform action)
 * 3. When event happens, the function runs
 * 4. removeEventListener() is used to remove the event listener
*/

let h1 = document.querySelector('h1');
h1.addEventListener('click', function() {
    h1.style.color = 'red';
})


let button = document.querySelector('button');
function handleClick() {
    button.style.backgroundColor = 'pink';
}
button.addEventListener('click', handleClick);
button.removeEventListener('dblclick', handleClick);
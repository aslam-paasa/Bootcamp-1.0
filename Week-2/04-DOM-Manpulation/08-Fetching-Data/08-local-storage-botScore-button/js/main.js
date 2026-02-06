/**
 * Web Storage API is used by developers to store data in the browser
 * and this data is nothing but key-value pairs of strings. There are two
 * mechanism to store this data:
 * 1. Session Storage
 * 2. Local Storage
*/

/**
 * Session Storage:
 * The data stored in session storage persisted for the duration of the
 * browser session. This means that the data is deleted when the browser
 * is closed.
 * 
 * Unlike cookies, session storage is not sent to the server with each
 * request. It is a client-side storage mechanism that is only available
 * within the browser.
*/

/**
 * Local Storage:
 * - Local Storage allows you to store data across our browser session.
 *   That means what we've seen so far when it comes to JS is that, if
 *   we refresh all the stuff gets thrown out of the window. But with
 *   local storage even if we refresh we are not throwing things out
 *   of the window.
 * 
 * 1. Put Item Into Local Storage:
 * - We can put stuff into local storage by using the localStorage.setItem().
 *   localStorage.setItem('bestFriend', 'Bob');
 * - Now there will be an object in local storage that has the bestFriend
 *   property and the value of Bob.
 * 
 * 2. Get Item out of Local Storage:
 * - We can also get an item out of local storage by going ahead and
 *   just using the getItem method on localStorage.
 *   localStorage.getItem('bestFriend', 'Bob');
 * 
 * 3. Remove Item from Local Storage:
 * - We can also remove an item from local storage with the removeItem()
 *   method:
 *   localStorage.removeItem('bestFriend', 'Bob');
 * 
 * 4. Remove All from Local Storage:
 * - We can clear everything in local storage with clear().
 *   localStorage.clear();
*/

/**
 * Difference between SessionStorage and LocalStorage:
 * - Session ends on the refresh or closing that browser session. And
 *   doesn't enable us to save it across multiple sessions.
*/

/**
 * Why do we want to stuffs in local storage?
 * - We don't have databases yet, but right now what if I want to build
 *   a game, what if I want to keep the total of the game going for a
 *   longer period of time, what if I wanted to keep the score over couple
 *   days, and we don't have to accidentally refresh our tab. If we ever
 *   accidentally refresh, our score would disappear. And the idea of
 *   having local storage means that we can now store stuffs in our
 *   applications across a period of time and we can do that for any of
 *   our users. So, its basically a save button.
*/


/**
 * Q. Create a button that adds 1 to a botScore stored in localStorage.
 */

if(!localStorage.getItem('botScore')) {
    localStorage.setItem('botScore', 0);
}



/**
 * Everytime we click the button, we will update the botScore:
*/
document.querySelector('button').addEventListener('click', anotherOne)


function anotherOne() {
    let botScore = Number(localStorage.getItem('botScore'));
    botScore =  botScore + 1;
    localStorage.setItem('botScore', botScore);

}
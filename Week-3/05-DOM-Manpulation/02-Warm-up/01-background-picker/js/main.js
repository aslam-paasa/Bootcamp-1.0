/**
 * We will learn the idea of behavior and interaction:
 * - We are interacting with the site by clicking.
 * - The things we are clicking on are the <li> tags. And each tags
 *   has unique IDs, and that's how we know what we're clicking on.
 * - We are going to target those IDs with our JS and then listen for
 *   things that are happening to them like click.
*/

/**
 * We are looking into the browser, the browser renders our html & css.
 * It's just a fancy way to say opens the html & css file. This render
 * that we see on screen are not the actual files. The browser reads the
 * html then reads the css and then paints a picture and display it on
 * the browser. We refer this as DOM.
 * 
 * JS can come along and mess this picture, but the beautiful thing is
 * my actual html & css weren't affected. So, when I referesh, all the
 * changes that happened in the browser disappear, because when we
 * refersh we throw that painting and repaint the picture from the 
 * original html & css. So, JS has the ability to mess with the lovely
 * render, but as soon as we refresh, all goes back to normal.
*/

/**
 * Event Listeners:
 * 1. document: Means go ahead and look at the rendering(what we see 
 *    inside the browser i.e. painting) and inside it, we are going to
 *    find something that has the ID of 'purple' [Inspect]. And that's
 *    the thing we are targeting.
 * 2. getElementById: It has the ID of purple that we have found inside
 *    the document.
 * 3. onclick: When we click the element whose 'id: purple' then run
 *    the set of instructions inside partyPurple.
 * Note: The 3-line of code just below are called Event-Listeners,
 *       because they are kind of just sit and wait for the whole day
 *       for the user to click.
*/

document.getElementById('purple').onclick = partyPurple
document.getElementById('green').onclick = partyGreen
document.getElementById('blue').onclick = partyBlue


/**
 * Functions: Set of Instructions
 * 4. It says, go ahead and look at the document, find the body and
 *    change it's background-color to rgba(241,63,247,1), 
 * 5. Then find the document again, find the body, change it's font
 *    color to white.
 * Note: But before we are going to do all the fun stuffs, we have to
 *       know the basics.
*/
function partyPurple() {
  document.querySelector('body').style.backgroundColor = 'rgba(241,63,247,1)'
  document.querySelector('body').style.color = 'white'
}

function partyGreen() {
  document.querySelector('body').style.backgroundColor = 'rgba(0,253,81,1)'
  document.querySelector('body').style.color = 'white'
}

function partyBlue() {
  document.querySelector('body').style.backgroundColor = 'rgba(0,254,255)'
  document.querySelector('body').style.color = 'white'
}

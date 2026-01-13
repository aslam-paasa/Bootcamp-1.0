/**
 * innerText:
 * We have been able to get a value out of an input so far. Now we are
 * going to take those values and put them into the DOM so that we can
 * see them.
 * 
 * There are two ways of doing this:
 * a. Older way
 * b. Newer way
 * 
 * Back in the day, the W3C(World Wide Web Consortium), the group of 
 * folks that come together to decide like what html should be. There
 * is a similar council for JS called ECMAScript. They decide what JS
 * should look like.
 * 
 * In 2015-2016, ECMAScript updated very big changes in JS, and that's
 * why we see a lot of funky stuffs like const, let etc., and we call
 * all of these changes ES6+ [newer version of JS]. Think of this like,
 * ESMAScript is the base on which JS is built on.
 * a. Old Way to add stuffs to the DOM:
 *    document.querySelector('#placeToYell').innerText = fName + ' ' + fMidName + ' ' + ' ' + lMidName + ' ' + lName
 * b. Newer way to add stuffs to the DOM:
 *    document.querySelector('#placeToYell').innerText = `${fName} ${fMidName} ${lMidName} ${lName}`
*/

document.querySelector('#yell').addEventListener('click', run)

/**
 * We are grabbing each of these values of the input, and storing them
 * into each of these variables.
*/
function run() {
  const fName = document.querySelector('#firstName').value
  const fMidName = document.querySelector('#firstMiddle').value
  const lMidName = document.querySelector('#lastMiddle').value
  const lName = document.querySelector('#lastName').value

  /**
   * 1. Look in the dom and find an element having id='firstName'
   * 2. Put text inside of it, and the text are:
   *    a. fName
   *    b. fMidName
   *    c. lastMiddle
   *    d. lastName
   * 
  */

  // document.querySelector('#placeToYell').innerText = fName + ' ' + fMidName + ' ' + ' ' + lMidName + ' ' + lName
  // document.querySelector('#placeToYell').innerText = `${fName} ${fMidName} ${lMidName} ${lName}`

  const yellText = `${fName} ${fMidName} ${lMidName} ${lName}`
  document.querySelector('#placeToYell').innerText = yellText

  /**
   * Text-to-Speech API:
  */
  const synth = window.speechSynthesis;
  let yellThis = new SpeechSynthesisUtterance(yellText);
  synth.speak(yellThis);

}
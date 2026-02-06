/**
 * 1. Math.random() returns a random number between 0 and 1.
 *    Math.random kvi v 1 nahi hoga, 0.9999999999999999 hoga. That's
 *    why we are using Math.floor() to get the largest integer less 
 *    than or equal to a given number.
 * 
 * 2. Math.floor() returns the largest integer less than or equal to a 
 *    given number.
*/


var button = document.querySelector("button");
var box = document.querySelector("#box");

button.addEventListener("click", function() {
    var c1 = Math.floor(Math.random() * 256) ;
    var c2 = Math.floor(Math.random() * 256) ;
    var c3 = Math.floor(Math.random() * 256) ;
    box.style.backgroundColor = `rgb(${c1}, ${c2}, ${c3})`;
});

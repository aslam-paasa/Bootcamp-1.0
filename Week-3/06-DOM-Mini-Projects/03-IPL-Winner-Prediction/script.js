/**
 * 1. Math.random() returns a random number between 0 and 1.
 *    Math.random kvi v 1 nahi hoga, 0.9999999999999999 hoga. That's
 *    why we are using Math.floor() to get the largest integer less 
 *    than or equal to a given number.
 * 
 * 2. Math.floor() returns the largest integer less than or equal to a 
 *    given number.
*/


var arr = [
    {
        team: 'CSK',
        primary: 'yellow',
        secondary: 'green'
    },
    {
        team: 'RCB',
        primary: 'red',
        secondary: 'black'
    },
    {
        team: 'MI',
        primary: 'blue',
        secondary: 'white'
    },
    {
        team: 'KKR',
        primary: 'purple',
        secondary: 'gold'
    },
    {
        team: 'SRH',
        primary: 'orange',
        secondary: 'black'
    }
];

var num = Math.floor(Math.random() * arr.length);
console.log(arr[num]);

var button = document.querySelector("button");
var h1 = document.querySelector("h1");

button.addEventListener("click", function() {
    var num = Math.floor(Math.random() * arr.length);
    var winner = arr[num];

    h1.innerHTML = winner.team;
    h1.style.backgroundColor = winner.primary;
    h1.style.color = winner.secondary;

});



/**
 * Event Bubbling:
 * Jispe event aaega agar uspar listener nahi hua to humara event uske parent
 * par listener dhundega aur aise krte karte upar ki taraf move karega.
 * 
 * Structure:
 * - main div
 *     nav div
 *       links
 *       button
 * 
 * - Agar humne button pe click kiya aur uspe listener nhi hua to humara
 *   event uske parent par listener dhundega i.e., nav div par, aur agr
 *   ispar bhi listener nhi hua to humara event uske parent pe jump kar
 *   jaega i.e., main div par, aur agar main div par event listener mil
 *   gya to ispe event listener ko call karega, aur agar nhi mila to
 *   event ko window par dhundega. Agar event kahi nhi mila to kuch nhi hoga.
 * 
 * Note: Agar event listener mil gya fir v wo apne parent par jaega. Means
 *       agar parent se le k child tak sabhi par listener laga hua hai to
 *       wo sabhi par event listener ko call karega.
*/


/**
 * Humne nav div par click listener laga diya, aur agar humne button pe
 * click kiya to bhi nav div par event listener ko call karega. And this
 * is called event bubbling.
 * 
 * Note: Event bubbling is a default behavior of the browser.
*/

document.querySelector('#main')
.addEventListener('click', function() {
    alert('Main Div Clicked');
});

document.querySelector('#nav')
.addEventListener('click', function() {
    alert('Nav Div Clicked');
});

document.querySelector('button')
.addEventListener('click', function() {
    alert('Button Clicked');
});



/**
 * Parent par listener laga do
 * Hum jispe click karnge uspe line aa jayegi. Ab har element par click
 * lagana wastage hai, aur isse accha hum parent par listener lagaenge,
 * jisse hoga ye ki jab hum element par click karnge to wo parent par
 * listener ko call karega.
 * 
 * Flow: li > ul > body > html > document
*/

let ul = document.querySelector('ul')
ul.addEventListener('click', function(event) {
    event.target.classList.toggle('lt');
});



/**
 * Solution: event.stopPropagation()  [VVI]
 * - It's like saying: "Yeh baat bass yahi tak. Aage kisi ko mat batana".
 * - It stops the event from bubbling up to parent elements.
*/

let a = document.querySelector('#a');
let b = document.querySelector('#b'); 
let c = document.querySelector('#c');
let btn = document.querySelector('button');


/**
 * Button click event ko parent elements tak propagate hone se rokta hai
*/
btn.addEventListener('click', function(event) {
    event.stopPropagation(); 
    alert('Button Clicked');
});

/**
 * C div click event ko parent elements tak propagate hone se rokta hai
*/
c.addEventListener('click', function(event) {
    event.stopPropagation(); 
    alert('C Clicked');
});

/**
 * B div click event ko parent elements tak propagate hone se rokta hai
*/
b.addEventListener('click', function(event) {
    event.stopPropagation(); 
    alert('B Clicked');
});

/**
 * A div click event ko parent elements tak propagate hone se rokta hai
*/
a.addEventListener('click', function(event) {
    event.stopPropagation(); 
    alert('A Clicked');
});
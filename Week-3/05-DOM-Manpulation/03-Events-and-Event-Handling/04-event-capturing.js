/**
 * Event Capturing:
 * Jispe event aaega agar uspar listener nahi hua to humara event uske child
 * par listener dhundega aur aise krte karte neeche ki taraf move karega.
 * 
 * Structure:
 * - main div
 *     nav div
 *       links
 *       button
 * 
 * - Agar humne main div par click kiya aur uspe listener nhi hua to humara
 *   event uske child par listener dhundega i.e., nav div par, aur agr
 *   ispar bhi listener nhi hua to humara event uske child pe jump kar
 *   jaega i.e., button par, aur agar button par event listener mil
 *   gya to ispe event listener ko call karega, aur agar nhi mila to
 *   kuch nhi hoga.
*/

/**
 * Important:
 * Jab v hum click karte hai ya koi v event raise karte hai to humara jo
 * event flow/propagation hai wo do phases m chalta hai:
 * 1. Phase-1: Event raised element se niche k taraf jaega
 * 2. Phase-2: Event raised element se parent element k taraf jaega
 * Aur pehle phase-1 (Event capturing) hoti hai fir phase-2 (Event bubbling)
 * hoti hai. But phase-1 by-default off hota hai. Agar hum usse one kar de
 * to pehle phase-1 chlega fir phase-2.
*/

/**
 * How to enable capture phase?
 * - Kisi v curly braces k last m true dal do.
 *   a. Capture Phase: 
 *      - Humne button pe click kiya lekin capture phase ko parent par 
 *        listener mil gya to wo pehle chlega
 *      - 'b, c, btn' pe capture phase on nhi hai to sbse pehle 'A clicked'
 *        milega.
 *   b. Bubble Phase:
 *      - Ab btn pe check karega, listener mil gya to wo call karega.
 *      - Fir 'c' pe check karega, listener mil gya to wo call karega.
 *      - Fir 'b' pe check karega, listener mil gya to wo call karega.
 *      - Fir 'a' pe check karega, yha capture phase on hai to nhi chlega.
 * 
 * Flow: a > btn > c > b
*/

let a = document.querySelector('#a');
let b = document.querySelector('#b');
let c = document.querySelector('#c');
let btn = document.querySelector('button');

btn.addEventListener('click', function() {
    alert('Button Clicked');
});

c.addEventListener('click', function() {
    alert('C Clicked');
});

b.addEventListener('click', function() {
    alert('B Clicked');
});

a.addEventListener('click', function() {
    alert('A Clicked');
}, true);



/**
 * This scenario is rarely used. 
*/
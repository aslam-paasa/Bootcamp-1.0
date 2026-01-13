var box = document.querySelector('#box')

box.addEventListener('click', function() {
    console.log('clicked on box');
})

box.addEventListener('mouseenter', function() {
    console.log('mouse entered on box');
})

box.addEventListener('mouseleave', function() {
    console.log('mouse left from box');
})

/**
 * Working of 'details' parameter:  (VVI)
 * 1. Browser automatically ek MouseEvent object create karta hai
 * 2. Ye object mouse ki saari information store karta hai
 * 3. Ye object function mein pass hota hai
 * 4. Hum is object ko 'details' parameter mein receive karte hain
 *    [mousemove] --> MouseEvent object --> details --> console.log()
*/
box.addEventListener('mousemove', function(details) {
    console.log('mouse moving on box', details);
})

/**
 * Keyboard Events are always listened on document:
 * 
*/
document.addEventListener('keydown', function(details) {
    console.log('key pressed', details);
})

document.addEventListener('keyup', function(details) {
    console.log('key released', details);
})

document.addEventListener('wheel', function(details) {
    console.log('wheel moving', details);
})

document.addEventListener('scroll', function(details) {
    console.log('scrolling...', details);
})


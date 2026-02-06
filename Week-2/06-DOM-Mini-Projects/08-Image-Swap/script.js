/**
 * 1. Get both the images
 * 2. Get the button
 * 3. Add an event listener to the button
 * 4. Swap the images
*/

const cat = document.querySelector('#cat');
const dog = document.querySelector('#dog');
const button = document.querySelector('button');

button.addEventListener('click', () => {
    const catSrc = cat.getAttribute('src');
    const dogSrc = dog.getAttribute('src');

    cat.setAttribute('src', dogSrc);
    dog.setAttribute('src', catSrc);
});

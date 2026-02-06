/**
 * Common Events:
 * - click    [done] : User clicks on the element
 * - input    [done] : User types in the element
 * - change   [done] : User changes the value of the element
 * - submit   [done] : User submits the form
 * - mouseover[done] : User hovers over the element
 * - keyup    [done] : User releases a key
 * - mousemove[done] : User moves the mouse over the element
 * - keydown  [done] : User presses a key
 * - load            : A page or image fully loads
*/

/**
 * Event Object:
 * - When an event(like click, keydown, etc.) happens - JS automatically 
 *   passes an object to your event handler. That object is called Event 
 *   Object.
 * - It contains full details about the event like:
 *   a. Kis element pe event hua?
 *   b. Kis button se click hua?
 *   c. User ne kya key press kiya?
 *   d. Mouse kaha tha? etc... 
*/

/**
 * What is event.type?
 * - event.type tells you which type of event occurred - like:
 *   a. 'click'
 *   b. 'input'
 *   c. 'mouseover'
 *   etc...
*/

/**
 * What is event.target?
 * - event.target tells you which exact element has interacted with inside
 *   an event listener.
 * - Means: Target kaun tha? Jispe cick hua, hover, hua, etc.
 * 
 * What is event.target.value?
 * - event.target.value gives you the actual value typed or selected by the
 *   user inside the input-like element,
 * - It works with:
 *   a. <input>
 *   b. <textarea>
 *   c. <select> 
*/

/**
 * Breakdown:
 * 1. event : The object created when the event/action happens.
 * 2. type  : What type of event happened? (e.g., click, input, etc.)
 * 3. target: Which element triggered the event? (e.g., <input>)
 * 4. value : What data/value is inside the element? (e.g., "John")
*/


/**
 * Input:
 * 1. Select the input
 * 2. Add Event Listener on input action
 * 3. When event happens, the function runs
 * 4. event.data: It gives you the value of the key pressed
 * 5. event.target.value: It gives you the value of the input
*/

let input = document.querySelector('input');

input.addEventListener('input', function(event) {
    // console.log(event.data); // h, e, l, l, o, backspace(null)
    if (event.data !== null) {
        console.log(event.data) // h, e, l, l, o
        console.log(event.target.value); // h, he, hel, hell, hello
    }    
})



/**
 * Change:
 * - Change event tab chalta hai jab humaara koi input select ya textArea mai
 *   koi change hoga.
 *   a. type: 'change'
 *   b. event.target.value: It gives you the value of the selected option
 * 
 * Note: Hum option k value attribute m jo likhte hai usko event.target.value
 *       mein mil jata hai.
*/

let device = document.querySelector('#device-selected');
let select = document.querySelector('select');

select.addEventListener('change', function(event) {
    device.textContent = `${event.target.value} device selected`;
})


/**
 * Keydown:
 * - Keydown event tab chalta hai jab humaara koi key press hoga.
 *   a. type: 'keydown'
 *   b. event.key: It gives you the value of the key pressed
 * 
 * Note: Keyboard m jo type karnge window m wo print hoga.
*/

let h1 = document.querySelector('h1');

window.addEventListener('keydown', function(event) {
    if(event.key === ' ') {
        h1.textContent = 'Space';
    } else {
        h1.textContent = event.key;
    }
})



/**
 * Custom File Upload:
 * 1. Hide original input file
 * 2. Create a custom button
 * 3. When user click on custom button, the original input file will be 
 *    clicked
 * 4. When user select a file, the original input file will be changed
 *    and the file name will be displayed in the custom button
*/

let btn = document.querySelector('#btn');
let file = document.querySelector('#file');

btn.addEventListener('click', function(event) {
    file.click();
});

file.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if(file) {
        btn.textContent = file.name;
    }
});


/**
 * What is event.preventDefault()?
 * - preventDefault() ek method hoti hai event object ke andr, jo kisi
 *   element ke default browser behavior ko rokti hai (i.e., prevent krti h)
 *   a. Without preventDefault, form submits and page reloads
 *   b. With preventDefault, form submits but page doesn't reload
*/


/**
 * Submit:
 * - Submit event tab chalta hai jab hum submit button ko click karte hai,
 *   aur isse humaara page refresh ho jata hai jisse mera form clear ho 
 *   jata hai
 * - Ab humein form ko mana karna hai ki tum reload mat hona using
 *   preventDefault() method.
*/

let form = document.querySelector('form');
let inputs = document.querySelectorAll('#form-input');
let cardContainer = document.querySelector('#card-container');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let card = document.createElement('div');
    card.classList.add('card'); 

    let profile = document.createElement('div');
    profile.classList.add('profile');

    let img = document.createElement('img');
    img.setAttribute('src', inputs[0].value);

    let h3 = document.createElement('h3');
    h3.textContent = inputs[1].value;

    let h5 = document.createElement('h5');
    h5.textContent = inputs[2].value;

    let p = document.createElement('p');
    p.textContent = inputs[3].value;

    profile.appendChild(img);
    card.appendChild(profile);

    card.appendChild(h3);
    card.appendChild(h5);
    card.appendChild(p);

    cardContainer.appendChild(card);

    inputs.forEach(function(input) {
        if(input.type !== 'submit') {
            input.value = '';
        }
    });
    
});


/**
 * Mouseover & Mouseout:
 * - Mouseover event tab chalta hai jab hum mouse ko element par leke aayenge.
 * - Mouseout event tab chalta hai jab hum mouse ko element se nikalte hai.
 * 
 * Note: Mouseover and Mouseout are opposite events.
*/

let mouseOver = document.querySelector('#mouse-over');

mouseOver.addEventListener('mouseover', function() {
    mouseOver.style.backgroundColor = 'yellow';
});

mouseOver.addEventListener('mouseout', function() {
    mouseOver.style.backgroundColor = 'violet';
});


/**
 * Mousemove:
 * - Mousemove event tab chalta hai jab hum mouse ko window par leke aayenge.
 *   a. clientX: Move left to right
 *   b. clientY: Move up to down
 * 
 * Note: It is continuous event.
*/

let mouseMove = document.querySelector('#mouse-move');

window.addEventListener('mousemove', function(event) {
    mouseMove.style.top = `${event.clientY}px`;
    mouseMove.style.left = `${event.clientX}px`;
});
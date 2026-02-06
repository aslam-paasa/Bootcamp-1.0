/**
 * Write an ES6 fn that takes in an array of objects representing 
 * sounds and returns an array of sounds name with all the letters
 * capitalized.
*/

const sounds = [
    {
        name: 'rain',
        sound: 'tap tap tap',
    },
    {
        name: 'fire',
        sound: 'blaze',
    },
    {
        name: 'water',
        sound: 'slosh slosh',
    },
]

console.log(capitalizeLetters(sounds)) // Output: ["RAIN", "FIRE", "WATER"]
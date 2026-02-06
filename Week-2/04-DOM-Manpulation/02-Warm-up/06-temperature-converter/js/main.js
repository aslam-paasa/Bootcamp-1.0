/**
 * Functions:
 * - Functions are simple set of instructions!
 * - They form the basic "building blocks" of a program.
 * - Syntax:
 *   function name(parameters) {
 *      // body
 *   }
 * 
 *   // call
 *   name(arguments)
*/

/**
 * Write your pseduo code first! 
*/

// 1. Click Event(smurf)
document.querySelector('#zebra').addEventListener('click', convert);

function convert() {
    // 2. Get the value from the input
    const celsius = document.querySelector('#brainStorm').value;

    // 3. Quick mafs convert it
    const convertedValue = celsius * 9/5 + 32;

    // 4. Display the value
    document.querySelector('#talkThatTalk').innerText = convertedValue;
}

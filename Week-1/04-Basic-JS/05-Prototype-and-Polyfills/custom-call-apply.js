/**
 * Polyfill of Call:
 * Call is a function, that exists on Function Prototype chain, we use call
 * to execute a function with custom value of 'this' inside the function.
 * 
 * 1. Syntax
 * 2. First Attempt
 * 3. Second Attempt
 * 4. Final Code
*/

const villain = {
    name: "Galactus",
};

const anotherVillain = {
    name: "Dr.Doom",
};

// Since we're in Node.js environment, use global instead of window
// window.name = "Thanos";
global.name = "Thanos";

function showVillain() {
    console.log(this.name);
}

// function showVillain1() {
//     console.log(villain.name);
// }

// function showVillain2() {
//     console.log(anotherVillain.name);
// }

// showVillain();
// showVillain1();
// showVillain2();


/**
 * Function Reuse:
 * - When we pass a primitive value like string to call(), JavaScript automatically 
 *   wraps it in its corresponding wrapper object (String object in this case)
 * - The String object doesn't have a 'name' property by default
 * - That's why showVillain.call("Ultron") shows undefined
 * - To fix this, we'd need to add a name property: showVillain.call({name: "Ultron"})
*/
showVillain();
showVillain.call(villain);
showVillain.call(anotherVillain);
showVillain.call({name: "Ultron"});



/**
 * Custom Call Polyfill:
*/

Function.prototype.myCall = function(thisArg, ...args) {
    const self = thisArg || globalThis;
    const key = Symbol();
    self[key] = this;

    const result = self[key](...args);
    delete self[key];
    return result;
}

showVillain.myCall();
showVillain.myCall(global);
showVillain.myCall(villain);
showVillain.myCall(anotherVillain);
showVillain.myCall({name: "Ultron"});


/**
 * Custom Apply Polyfill:
 * apply is a function, that exists on Function Prototype chain, we use apply
 * to execute a function with custom value of 'this' inside the function.
 * 
 * We pass arguments in array, whereas in call we pass comma separated 
 * arguments.
*/

function showCharacter(n1, n2, n3) {
    console.log(this.name, n1, n2, n3);
}

Function.prototype.myApply = function(thisArg, args = []) {
    const context = thisArg || globalThis;
    const key = Symbol();
    context[key] = this;

    const result = context[key](...args);
    delete context[key];
    return result;
}

showCharacter.myApply(villain);
showCharacter.myApply(anotherVillain, [3, 3, 3]);
showCharacter.myApply({name: "Ultron"}, [4, 4, 4]);

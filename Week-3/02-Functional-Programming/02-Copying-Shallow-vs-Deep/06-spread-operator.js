/**
 * Assignment: Todo List with Immutable Updates using Spread Operator
 * 
 * Task: 
 * a. Hume ek todo list banani hai jisme new task add kar sakein
 * b. Lekin original list (array) ko change nahi karna hai
 * c. Ye React jaisi frameworks mein important hota hai
 * d. Isiliye hum use karenge: Spread Operator (…)
 * 
 * Goal: New todo item add karo without changing the old list
*/ 

/**
 * Steps:
 * a. Initial todo list create karein
 * b. addTodo function banayein jo new task add kare
 * c. Spread operator ka use karke immutable update karein
 * d. Test karein ki original array unchanged raha
 */


/**
 * 1. Initial todo list banate hain:
 */
const todos = [
    { task: 'reading', completed: true },
    { task: 'painting', completed: false }
];

/**
 * Wrong Approach (Mutable) 
 * — ye directly original list ko change karta hai
 * — Isse React mein UI re-render nahi hoga
 * — Kyunki state "same" lagti hai (reference same rehta hai)
 * 
 * ❌ todos.push(newItem); // Don't do this
 */

/**
 * Correct Approach (Immutable) 
 * — Spread Operator ka use karo
 * — Original list ko chhedoge nahi
 * — New list return karoge with old + new todos
 */

function addTodo(newTodo) {
    return [
        ...todos,     // old todos
        newTodo       // new todo
    ];
}

/**
 * 2. Test karte hain function ko:
 */
const newTodo = { task: 'recording', completed: false };
const updatedTodos = addTodo(newTodo);

/**
 * 3. Dekhte hain original aur updated todos:
 */
console.log('Original todos:', todos);       // Original list waise ki waise
console.log('Updated todos:', updatedTodos); // New list with added todo

/**
 * Output:
 * 
 * Original todos:
 * [
 *   { task: 'reading', completed: true },
 *   { task: 'painting', completed: false }
 * ]
 * 
 * Updated todos:
 * [
 *   { task: 'reading', completed: true },
 *   { task: 'painting', completed: false },
 *   { task: 'recording', completed: false }
 * ]
 */

/**
 * Summary for Beginners:
 * - When updating an array or object in React
 * - Don't use .push() or .splice() directly
 * - Use ...spread to create a new copy
 * - This helps the UI understand that a change has occurred
 */

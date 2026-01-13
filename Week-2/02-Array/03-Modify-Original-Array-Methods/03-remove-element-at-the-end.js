/**
 * Step 2: pop() - End se element remove karna
 * > pop() array ke last element ko remove karta hai aur use return karta hai.
 * > Return karta hai removed element.
 *
 * Syntax: const removedElement = array.pop()
 */

/**
 * Example 1: Basic Pop Operation
 */

const fruits = ["Apple", "Banana", "Orange", "Mango"];

console.log("Original fruits:", fruits);

/* Last fruit remove karo */
const removedFruit = fruits.pop();
console.log("Removed fruit:", removedFruit); // "Mango"
console.log("Remaining fruits:", fruits); // ["Apple", "Banana", "Orange"]

/**
 * Example 2: Real World - Stack Implementation
 */

/* Stack data structure - LIFO (Last In First Out) */
class Stack {
  constructor() {
    this.items = [];
  }

  /* Push - element add karo */
  push(element) {
    this.items.push(element);
    console.log(`Pushed: ${element}`);
  }

  /* Pop - element remove karo */
  pop() {
    if (this.isEmpty()) {
      console.log("Stack is empty!");
      return null;
    }
    const popped = this.items.pop();
    console.log(`Popped: ${popped}`);
    return popped;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  peek() {
    return this.isEmpty() ? null : this.items[this.items.length - 1];
  }

  display() {
    console.log("Stack:", this.items.join(" → "));
  }
}

/* Usage */
const browserHistory = new Stack();
browserHistory.push("google.com");
browserHistory.push("github.com");
browserHistory.push("stackoverflow.com");
browserHistory.display();

/* Back button simulate karo */
browserHistory.pop();
browserHistory.display();

/**
 * Example 3: Undo Functionality
 */

const actions = ["Type 'Hello'", "Bold text", "Insert image", "Add link"];

console.log("Document Actions:", actions);

/* Undo operation - last action remove karo */
function undo() {
  if (actions.length === 0) {
    console.log("Nothing to undo!");
    return null;
  }

  const undoneAction = actions.pop();
  console.log(`↶ Undone: ${undoneAction}`);
  console.log(`Remaining actions: ${actions.length}`);
  return undoneAction;
}

/* Test undo */
undo(); // Add link remove hoga
undo(); // Insert image remove hoga
console.log("Final actions:", actions);

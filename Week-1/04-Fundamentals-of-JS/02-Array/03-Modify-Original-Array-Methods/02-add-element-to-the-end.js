/**
 * Step 1: push() - End mein element add karna
 * > push() array ke end mein ek ya multiple elements add karta hai.
 * > Return karta hai nayi length.
 *
 * Syntax:
 * > array.push(element1, element2, ..., elementN)
 */



/**
 * Example 1: Single Element Add karna
 */

const fruits = ["Apple", "Banana"];

console.log("Original fruits:", fruits);

/* End mein ek fruit add karo */
const newLength = fruits.push("Orange");
console.log("After push:", fruits); // ["Apple", "Banana", "Orange"]
console.log("New length:", newLength); // 3



/**
 * Example 2: Multiple Elements Add karna
 */

const shoppingCart = ["Laptop", "Mouse"];

console.log("Original cart:", shoppingCart);

/* Multiple items ek saath add karo */
const updatedLength = shoppingCart.push("Keyboard", "Monitor", "Headphones");
console.log("Updated cart:", shoppingCart);
console.log("Cart items count:", updatedLength); // 5



/**
 * Real World - Todo List
 */

class TodoList {
  constructor() {
    this.todos = [];
  }

  addTodo(task, priority = "medium") {
    const newTodo = { task, priority, completed: false };
    const newLength = this.todos.push(newTodo);
    console.log(`✅ Added: "${task}" (Priority: ${priority})`);
    console.log(`Total todos: ${newLength}`);
    return newLength;
  }

  showTodos() {
    console.log("📝 Current Todos:");
    this.todos.forEach((todo, index) => {
      console.log(
        `${index + 1}. ${todo.task} [${todo.priority}] ${
          todo.completed ? "✓" : "◻"
        }`
      );
    });
  }
}

/* Usage */
const myTodos = new TodoList();
myTodos.addTodo("Learn JavaScript", "high");
myTodos.addTodo("Buy groceries", "medium");
myTodos.addTodo("Call mom");
myTodos.showTodos();

/**
 * Challenge: Updating the todo list
 * Implement event handlers that will dispatch actions when interacting
 * with the "Add Todo" and "Remove Todo" buttons.
 * 1. Create a function named addTodoHandler. Inside this function:
 *    a. Get the value from the input field using the value property of 
 *       the todoInput constant.
 *    b. Check if the text variable is not empty.
 *    c. If the text variable is not empty, dispatch the addTodo fn with the
 *       text
 * 2. Create a function named removeTodoHandler. This function should be
 *    attached to the window object so that it can be accessed globally.
 *    a. The function should take an index as a parameter, which will represent
 *       the index of the todo item to be removed.
 *    b. Inside the removeTodoHandler function, dispathc the removeTodo fn
 *       with the index.
 * 3. Attach event listener to the 'Add Todo' button. Call the corresponding
 *    handler function when the button is clicked. We will call the
 *    removeTodoHandler function when we will display the todos.
*/

/**
 * Understanding:
 * - Attaching the removeTodoHandler function to the window object allows it
 *   to be accessed from the outside the current scope. In our case, it's
 *   likely that the function is being used as an event handler within the
 *   HTML content, which is not within the scope of the current JS file.
 * - By attaching it to the window object, you make sure that it can be 
 *   called as a global function. This way, when the "Remove Todo" button
 *   is clicked in the HTML content, it can file and execute the 
 *   removeTodoHandler function globally.
*/

import { createStore } from 'redux';
import { addTodo, removeTodo } from './actions';
import todoReducer from './todoReducer';

const store = createStore(todoReducer);

store.subscribe(() => console.log(store.getState()));

const addButton = document.getElementById("add");
const todoInput = document.getElementById("todo-input");
// const todoList = document.getElementById("todo-list");


const addTodoHandler = () => {
    const text = todoInput.value;
    if (text) {
        store.dispatch(addTodo(text));
        todoInput.value = "";
    }
};

window.removeTodoHandler = (index) => {
    store.dispatch(removeTodo(index));
};

addButton.addEventListener("click", addTodoHandler);
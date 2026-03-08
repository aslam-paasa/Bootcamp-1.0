/**
 * Challenge: Displaying the todo list
 * Your task is to write JavaScript code that will display the list of todos
 * and update it whenever the state changes.
 * 1. Create a function named updateTodoList that will be responsible for
 *    updating the displayed list of todos on the webpage. Inside this fn,
 *    get the current state from the Redux store using store.getState(),
 *    and update the content of the todoList element with the todos from
 *    the state. For each todo, include a "Remove Todo" button that calls
 *    the removeTodoHandler fn with the corresponding index.
 * 2. Inside the 'store.subscribe' method, after the log, call the function
 *    'updateTodoList'
 * 3. Call the 'updateTodoList' function after defining it to ensure that
 *    the initial list of todos is displayed correctly on page load.
*/

import { createStore } from 'redux';
import { addTodo, removeTodo } from './actions';
import todoReducer from './todoReducer';

/**
 * Create a store:
*/
const store = createStore(todoReducer);


/**
 * Get the elements from the DOM & Add event listeners to the buttons:
*/
const addButton = document.getElementById("add");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");


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


/**
 * Subscribe to the store & Update the todo list:
*/
store.subscribe(() => {
  console.log(store.getState());
  updateTodoList();
});

const updateTodoList = () => {
  const state = store.getState();
  todoList.innerHTML = state.todos
    .map((todo, index) => {
      return `<li>${todo} <button onclick="removeTodoHandler(${index})">Remove</button></li>`
    })
    .join("");
};

updateTodoList();

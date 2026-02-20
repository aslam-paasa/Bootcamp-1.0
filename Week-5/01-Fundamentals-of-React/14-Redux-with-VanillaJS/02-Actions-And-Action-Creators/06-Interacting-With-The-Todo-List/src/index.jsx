/**
 * Challenge: Interacting with the todo list
 * index.html contains an input field for entering a new todo, an "Add Todo"
 * button, a "Remove Todo" button for each todo, and a list displaying the 
 * todos. Your task is to write JavaScript code that interacts with these 
 * elements using document.getElementById. 
 * 
 * 1. Inside the index.js file, create constants using the 
 *    document.getElementById method to select each of these elements by 
 *    their respective ids. Name the constans as follows:
 *    a. The input field: todoInput
 *    b. The "Add Todo" button: addButton
 *    c. The list element: todoList
*/


import { createStore } from 'redux';
import todoReducer from './todoReducer';

const store = createStore(todoReducer);

store.subscribe(() => console.log(store.getState()));

const addButton = document.getElementById("add");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

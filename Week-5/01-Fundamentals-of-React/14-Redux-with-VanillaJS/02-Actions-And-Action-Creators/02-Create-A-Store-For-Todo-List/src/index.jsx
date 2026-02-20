/**
 * Challenge: Create a store for todo list
 * - Just like with cookies, you need a store to manage the state of your
 *   todo list. The store keeps track of the state changes, which are
 *   managed by the reducer.
 * - In index.js, import the required 'createStore' function from Redux and
 *   'todosReducer'.
 * - Create a Redux store by passing your 'todosReducer' to the 'createStore'
 *   function.
*/

import { createStore } from 'redux';
import todoReducer from './todoReducer';

const store = createStore(todoReducer);
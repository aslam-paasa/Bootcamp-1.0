/**
 * Challenge: Subscribe to the store for todo list
 * - Subscribing to the store allows you to listen for state changes. 
 *   Whenever a todo is added or removed, the subscription function is called,
 *   and you can respond to the state updates.
 * - Use the 'subscribe' method of the Redux store to listen for state changes
 *   and log the state.
*/


import { createStore } from 'redux';
import todoReducer from './todoReducer';

const store = createStore(todoReducer);

store.subscribe(() => console.log(store.getState()));

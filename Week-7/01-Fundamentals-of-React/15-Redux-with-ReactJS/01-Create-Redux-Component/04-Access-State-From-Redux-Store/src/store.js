/**
 * Challenge-2: Attach counterReducer to Store
 * In the store.js file, create a Redux store by importing the necessary
 * functions from Redux and using the counterReducer.
 * 
 * Note: Install react-redux dependency
 *       npm install react-redux
*/

import { createStore } from 'redux';
import counterReducer from './counterReducer.js';

const store = createStore(counterReducer);

export default store;
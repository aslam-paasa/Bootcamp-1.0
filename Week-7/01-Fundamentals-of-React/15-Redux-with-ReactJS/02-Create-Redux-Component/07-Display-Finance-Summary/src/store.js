/**
 * Challenge-3: Create a Redux Store
 * In a file called store.js, create the Redux store and connect it to the
 * reducer.
*/

import { createStore } from 'redux';
import financeReducer from './reducers.js';

const store = createStore(financeReducer);

export default store;
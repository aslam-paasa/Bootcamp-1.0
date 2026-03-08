/**
 * Challenge: Create and Subscribe to the cart store to listen when the
 * state changes.
 * 1. Import the unnecessary action creators and the cart reducer.
 * 2. Create a Redux store using createStore and passing the cart reducer.
 * 3. Subscribe to the store using the store.subscribe method.
*/

import { createStore } from 'redux';
import cartReducer from './cartReducer';

const store = createStore(cartReducer);

store.subscribe(() => {
  console.log(store.getState());
});
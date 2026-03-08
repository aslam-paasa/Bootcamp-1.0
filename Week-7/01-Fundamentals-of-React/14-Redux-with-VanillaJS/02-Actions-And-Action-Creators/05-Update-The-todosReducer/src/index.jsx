import { createStore } from 'redux';
import todoReducer from './todoReducer';

const store = createStore(todoReducer);

store.subscribe(() => console.log(store.getState()));

/**
 * 2. App Store: Creating our main Redux Store
 *    - configureStore is a function that creates a store for our app
 *    - reducer is the combination of different small stores
 *    - We'll add slices to the store (cartSlice)
*/ 
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default appStore;

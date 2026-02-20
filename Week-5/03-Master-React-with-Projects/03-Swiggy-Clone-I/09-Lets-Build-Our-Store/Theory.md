## Namaste React Course by Akshay Saini

# Episode 12 - Let's Build Our Store

## Theory Assignment:

## 1. Advantages of using Redux Toolkit over Redux

- **Simpler Code**: Redux Toolkit provides easy-to-use functions so you write less code to achieve the same thing.
- **Less Boilerplate**: You don't need to create separate action types, action creators, or reducers — Toolkit combines them.
- **Built-in Best Practices**: It automatically handles common tasks like immutability and has sensible defaults, making your code safer.
- **Easier Configuration**: Comes preconfigured with helpful tools like Redux DevTools and middleware (like thunk for async code).
- **Better for Beginners**: The APIs are easier to learn and understand, so you can build features faster.

## 2. What is a Dispatcher?

- The dispatcher (usually accessed as `dispatch`) is a function provided by Redux.
- You use `dispatch` to send an "action" to the store telling Redux what you want to do.
- Think of it like giving instructions: “Please add this item to my cart!” — you dispatch an action, and Redux will process it.

Example:

```js
dispatch({ type: 'cart/addItem', payload: item });
```

## 3. What is a Reducer?

- A reducer is a function that gets the current state and an action, and returns a new (updated) state.
- It tells Redux how to update the state based on the action you dispatched.
- Reducers are pure functions, meaning they don’t change the old state directly — they create a copy with updates.

Example:

```js
function cartReducer(state, action) {
  if (action.type === 'cart/addItem') {
    // Return new state with added item
  }
}
```

## 4. What is a Slice?

- A slice is a portion of your Redux store which stores related state and logic in one place.
- For example, you might have a **cartSlice** for shopping cart data and a **userSlice** for user info.
- Each slice manages its own state, actions, and reducers — keeping your code clean and organized.

## 5. What is a Selector?

- A selector is a function that reads and returns data from the Redux store.
- Instead of accessing the store directly, you use selectors to get exactly what you need for your component.
- This separates how data is stored from how it’s used in your UI.

Example:

```js
const cartItems = useSelector((store) => store.cart.items);
```

## 6. Explain `createSlice` and its Configuration

- `createSlice` is a Redux Toolkit function that helps you create a slice of the Redux store quickly and easily.
- When you use `createSlice`, you provide a configuration object with:
    - **name**: A string name for this slice (e.g. 'cart')
    - **initialState**: The default state (data) for the slice
    - **reducers**: An object containing functions (reducers) that describe how to update the state

Example:

```js
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    }
  }
});
```

- After creating the slice, you get action creators (e.g. `addItem`) and the reducer for your Redux store — all with one step!


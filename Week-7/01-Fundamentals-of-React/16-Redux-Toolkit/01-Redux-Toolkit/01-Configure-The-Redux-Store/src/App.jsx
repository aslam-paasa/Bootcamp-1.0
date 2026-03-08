/**
 * Setup:
 * > npx create-react-app my-app --template redux
 * > But we'll be using codesandbox for the session.
 * > codesandbox to begin: https://codesandbox.io/s/react-redux-ex01-h4ct6
*/

/**
 * Understanding: Read Initial Posts in UI
 * There are few core concepts to Redux and Redux Toolkit. In this
 * exercise we will learn about:
 * 1. Provider: Similar to the AuthProviders and others we have been
 *    using throughout the camp. It uses context to provide the store
 *    to the React App.
 * 2. Store: This is where all your state resides.
 *    a. This is global. So keep things here which needs to the global.
 *    b. You can use local useState() in apps. And it is advisable to
 *       keep local states in that. For example, onChange of an input
 *       element shouldn't be put in the global state.
 *       https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367
 * 3. Slice: A piece of the bigger state. The convention is to take one
 *    feature and put it in one slice using createSlice().
 * 
 *    For example, slices in a social media app would be:
 *    - users
 *    - posts
 *    - notifications
 *    - trending
 *    This also means that your store is nothing but a collection of
 *    slices.
 * 
 *    Think of slices as a manager for a bigger object. It represents
 *    a small part and manages.
 *    a. Selector: If you put everything in a global store it get really
 *       big and then any update on it will run render function for the
 *       entire app, which will be a costly experience for large apps.
 * 
 * Note: 
 * > For smaller apps, this cost is negligible and that's why React
 *   experts, including me ;), warn against premature optimization. 
 *   You should think about this when your app is visibly slow. 
 * > Redux toolkit is suited for large apps and thus when you're 
 *   working in a startup, use it for main apps which would grow really
 *   fast. But if you're making side projects, or side apps, you can 
 *   go with useReducer + useContext combo.
*/

/**
 * Challenge-1: Configure the redux store
 * Create a file named store.js and setup the Redux store using 
 * configureStore from Redux Toolkit.
*/
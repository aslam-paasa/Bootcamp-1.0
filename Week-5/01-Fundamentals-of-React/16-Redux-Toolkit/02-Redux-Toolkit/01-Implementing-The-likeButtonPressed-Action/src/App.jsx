/**
 * When updating the state there are few new and old things which we
 * need to understand:
 * 1. Reducers are objects now. You see that we are not using switch
 *    anymore. This is much better as it keeps the code clean and also
 *    faster than switch.
 *    a. I covered switch because most of the examples around the 
 *       internet was that and it's beginner friendly. But now you can
 *       move even your reducers in useReducer to objects if you want. 
 *       More on that later.
 * 2. Actions are generated automatically and are functions. In typical
 *    redux also there was the convention of creating functions that 
 *    would return an object { type: string, payload?: any}. Now, with
 *    the toolkit, you don't need to write these functions by hand 
 *    anymore. Big relief otherwise there was a lot of boilerplate 
 *    earlier!
 * 3. Immer. Notice that you don't need to do immutable updates on state
 *    anymore. Toolkit comes with a library immer which makes doing 
 *    immutable updates a breeze. We all know how hard it is to do 
 *    updates on nested objects.
 * 
 *    Once again, you can use immer in your useReducer as well.
 * 
 *    However, immer with toolkit has it's gotchas. Even a console.log()
 *    doesn't work exactly as expected. Therefore, definitely read this
 *    when you're working on the app: 
 *    https://reduxtoolkit.js.org/usage/immer-reducers
 * 
 * 4. Dispatch:
 *    a. To dispatch an action you need useDispatch() in the component.
 *    b. Notice that the action function is being called inside the 
 *       dispatch() call.
*/

/**
 * Challenge-1:
 * Create a button against the likes number. On click of this button, 
 * the number of likes should increase.
*/

/**
 * Challenge-1.1: Implementing the likeButtonPressed action
 * In your Redux postSlice.js, implement the likeButtonPressed action.
 * This action should increase the number of likes for a specific post
 * when the "Like" button is pressed.
 * 1. Inside the reducers object of the createSlice function, add a new
 *    reducer named likeButtonPressed. This reducer takes two arguments:
 *    - state
 *    - action.
 * 2. Within the likeButtonPressed reducer, you need to find the index 
 *    of the post you want to update based on the postID provided in 
 *    the action.payload. To do this, use the findIndex method on the 
 *    state.posts array.
 * 3. Check if the postIndex is not equal to -1, indicating that the 
 *    post with the given postID was found in the state.posts array.
 * 4. If the postIndex is not -1, increment the likes count of the 
 *    corresponding post in the state.posts array by 1. You can access
 *    the post using state.posts[postIndex] and update its likes property.
 * 5. Export the likeButtonPressed action using the destructuring 
 *    assignment.
*/

import Posts from "./features/posts/Posts";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="app-body"><Posts /></div>
    </div>
  );
}

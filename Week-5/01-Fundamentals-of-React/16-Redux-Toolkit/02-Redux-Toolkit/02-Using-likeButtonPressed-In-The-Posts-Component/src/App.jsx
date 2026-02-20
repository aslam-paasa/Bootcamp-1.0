/**
 * Challenge-1.2: Using likeButtonPressed in the Posts Component
 * In your Posts.js component, use the likeButtonPressed action from 
 * Redux to handle the "Like" button click for each post. Dispatch this
 * action when the button is clicked to increase the number of likes 
 * for the corresponding post.
 * 1. Obtain the dispatch function from useDispatch hook from the 
 *    react-redux library. This function is used to dispatch actions 
 *    to the Redux store.
 * 2. In the onClick handler of the "Like" button, call the dispatch 
 *    function and pass in the likeButtonPressed action with the 
 *    post.postID as the payload. This action will be dispatched when 
 *    the "Like" button is clicked for a specific post.
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

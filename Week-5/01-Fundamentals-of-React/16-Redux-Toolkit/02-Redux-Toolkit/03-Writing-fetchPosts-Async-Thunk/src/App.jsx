/**
 * Understanding:
 * 1. thunk https://github.com/reduxjs/redux-thunk#why-do-i-need-this
 *    a. middleware: 
 *       - Exactly similar to how it works in the express. 
 *       - Gives you a superpower in the dispatch lifecycle.
 *    b. thunk:
 *       - Essentially a function which returns a function. 
 *       - More details are for purists.
 * 2. createAsyncThunk https://redux-toolkit.js.org/api/createAsyncThunk 
 *    documentation to look for challenge Makes your life much easier 
 *    by abstracting the same work of dispatching:
 * 
 *    a. loading
 *    b. fulfilled, and
 *    c. rejected actions in every async request. 
 * 
 *    Note, you don't need to put all three in every API request. 
 *    Some actions can just have fulfilled and error states.
 * 
 * 3. status: As discussed in previous classes as well, status shouldn't
 *    be boolean but an enum of different strings. With redux, we are 
 *    storing all the data, ie posts in the global state directly. In
 *    this scenario, redux also acts as a global cache. You don't need 
 *    to load posts every time you're on that route say /posts from 
 *    /user route right? To do that you need to dispatch the fetchPosts()
 *    action only when the status is idle. js 
 *    { status: 'idle' | 'loading' | 'succeeded' | 'failed', error: string | null }
*/

/**
 * Challenge-2: Load initial data from the server
 * > Server: https://social-media-server.tanaypratap.repl.co/posts
 * > Use a server or a fakeApi to make the initial data asynchronous.
 * > Now, load that data into the app.
 * > Show loading and fulfilled state.
 * > Bonus: Show error as well.
*/

/**
 * Challenge-2.1: Writing fetchPosts async thunk
 * In your Redux slice file (postSlice.js), write the fetchPosts async 
 * thunk using createAsyncThunk to fetch data from the specified server
 * URL. Ensure that it handles loading, fulfilled, and error states.
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

/**
 * Challenge-2.3: In the Redux slice file (postSlice.js), write the
 * extraReducers to handle the fetchPosts async thunk actions
 * (pending, fulfilled, rejected).
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

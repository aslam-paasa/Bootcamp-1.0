/**
 * Challenge-2.2: Updating initialState
 * In your Redux slice file (postSlice.js), write the initialState for
 * your posts slice with status and error.
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

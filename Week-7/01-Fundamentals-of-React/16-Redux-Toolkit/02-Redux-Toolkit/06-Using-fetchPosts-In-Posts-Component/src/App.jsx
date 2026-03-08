/**
 * Challenge-2.4: Using fetchPosts in Posts Component
 * In your Posts.js component, use the fetchPosts async thunk to fetch 
 * data when the status is "idle." Display loading, error, and post 
 * data based on the status.
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

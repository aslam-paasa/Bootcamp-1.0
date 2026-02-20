/**
 * Challenge-4: Setting up the Provider
 * In your React application, set up the Provider from React-Redux to
 * connect your Redux store to your application. Ensure that your
 * Redux store is properly configured using configureStore. Use the
 * provided App component as the root of your application.
*/

import Posts from "./features/posts/Posts";

export default function App() {
  return (
    <div className="App">
      <div className="app-body"><Posts /></div>
    </div>
  );
}
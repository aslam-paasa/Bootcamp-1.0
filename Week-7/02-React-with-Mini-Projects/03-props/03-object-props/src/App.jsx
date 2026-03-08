/**
 * Challenge:
 * Although this challenge books similar to the previous one, there are some
 * subtle differences. As before, apply the new props to the Badge component
 * so that it renders properly.
 * 
 * Task:
 * 1. Give the image a proper alt tag using the author's name
 * 2. Make sure the badge displays the profile image correctly
 * 3. Display the author's name in the badge's heading
 * 4. Display the author's handle below the heading
 * 5. Apply the correct styles to the outer div
 * 
 * Hint:
 * 1. JSX is "just JavaScript", so you can access properties of an object
 *    the way you normally would. Just remember, in JSX, expressions need
 *    to be wrapped in curly braces, {}.
 * 2. If a prop has a nested object, there are a few ways to access those
 *    properties. The most common is using JavaScript's "dot notation".
 * 
 *    function Badge({ user }) {
 *       return (
 *          <h1>Hello, {user.name}!</h1>
 *       )
 *    }
 * 
 * 3. You can also destructure the object in the function parameter.
 * 
 *    function Badge({ user }) {
 *       const { name } = user;
 * 
 *       return (
 *          <h1>Hello, {name}!</h1>
 *       )
 *    }
 * 
*/

import './App.css'

const USER_DATA = {
  name: "Ben Adam",
  img: "https://avatars.githubusercontent.com/u/6645985",
  handle: "benadam11"
};

function Badge({ style, user }) {
  return (
    <div style={style}>
      <img alt={user.name} src={user.img} />
      <div>
        <h4>{user.name}</h4>
        <p>@{user.handle}</p>
      </div>
    </div>
  );
}

function App() {

  return (
    <div>
      <Badge
        user={USER_DATA}
        style={{
          width: 300,
          margin: "0 auto",
          border: "1px solid var(--beige-10)",
          borderRadius: 8,
          backgroundColor: "var(--charcoal)",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          textAlign: "center"
        }}
      />
    </div>
  )
}

export default App

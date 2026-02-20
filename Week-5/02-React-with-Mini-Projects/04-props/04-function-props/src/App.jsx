/**
 * Challenge:
 * Often times, we want to split our UI into smaller, more focused components
 * to make our code easier to read and test. In this challenge, take the 
 * props being passed to the Badge Component and use them in order to render
 * the proper UI.
 * 
 * Task:
 * 1. Give the image a proper alt tag using the author's name
 * 2. Make sure the badge displays the profile image correctly
 * 3. Display the author's name in the badge's heading
 * 4. Display the author's handle below the heading
 * 5. Pass the click handler to the button so that it opens an alert when
 *    clicked.
 * 
 * Hint:
 * 1. Sometimes you need to pass props down multiple levels in order to use
 *    them. That's a totally normal thing to do in React.
 * 
 *    function Parent({ name, childName }) {
 *       return (
 *          <div>
 *             <p>{name}</p>
 *             <Child name={childName} />
 *          </div>
 *       )
 *    }
 * 
 * 2. Remember that when you pass a function as props, you want to pass a
 *    reference to the function, not a invocation of the function.
 * 
 *    function Badge({ name, handleClick }) {
 *       return (
 *          <div onClick={handleClick}>{name}</div>
 *       )
 *    }
 * 
 *    as opposed to this:
 * 
 *    function Badge({ name, handleClick }) {
 *       return (
 *          <div onClick={handleClick()}>{name}</div>
 *       )
 *    }
 * 
 * 
*/

import './App.css'

function Avatar({ img, name }) {
  return <img src={img} alt={name} />;
}

function Name({ name }) {
  return <h4>{name}</h4>;
}

function Handle({ handle }) {
  return <p>@{handle}</p>;
}

function Badge({ style, user, addFriend }) {
  return (
    <div style={style}>
      <Avatar img={user.img} name={user.name} />
      <div>
        <Name name={user.name} />
        <Handle handle={user.handle} />
        <button onClick={addFriend}>Add Friend</button>
      </div>
    </div>
  );
}

function App() {

  return (
    <div>
      <Badge
        user={{
          name: "Lynn Fisher",
          img: "https://avatars.githubusercontent.com/u/871315",
          handle: "lynnandtonic"
        }}
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
        addFriend={() => alert("Added!")}
      />
    </div>
  )
}

export default App

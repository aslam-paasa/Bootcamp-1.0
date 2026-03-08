/**
 * Challenge: 
 * We have a Badge Component with variables for name, handle, and img that
 * are unassigned. Your job is to assign those variable in the JSX so that
 * the component renders correctly.
 * 
 * 1. Give the image a props alt tag using the author's name.
 * 2. Make sure the badge displays the profile image correctly.
 * 3. Display the author's name in badge's heading.
 * 4. Display the author's handle below the heading
 * 
*/

import './App.css'

function Badge() {
  const name = "Tyler McGinnis";
  const handle = "tylermcginnis";
  const img = "https://avatars0.githubusercontent.com/u/2933430";

  return (
    <div className="badge">
      <img alt={name} src={img} />
      <div>
        <h4>{name}</h4>
        <p>{handle}</p>
      </div>
    </div>
  );
}

function App() {

  return (
    <div>
      <Badge />
    </div>
  )
}

export default App

/**
 * Challenge:
 * Currently, our Badge Component is displaying hardcoded values. Instead of
 * rendering the static values, we want to pass them in as props. In this
 * challenge, your goal is to apply props being passed to the Badge Component
 * (name, handle, and img) so that it renders correctly.
 * 
 * Tasks:
 * 1. Give the image a proper alt tag using the author's name
 * 2. Make sure the badge displays the profile image correctly
 * 3. Display the author's name in the badge's heading
 * 4. Display the author's handle below the heading
 * 
 * Hint: 
 * 1. You can access the props being passed to a component by using the 
 *    props argument in the component's function.
 *    
 *    function Badge(props) { 
 *      ... 
 *    }
 * 
 * 2. Since props is always an object, you can destructure it if you'd like.
 *      
 *      function Badge({ name, handle, img }) {
 *         ... 
 *      }
 * 
 * 3. Whenever you want to use an expression in JSX(an expression being
 *    something that produces a value like a variable or a function 
 *    invocation), you need to wrap the expression in single curly braces{}. 
 *    
 *     function Welcome({ name }) {
 *       return <h1>Hello, {name}!</h1>;
 *     }
 * 
*/

import './App.css'

function Badge({ name, handle, img }) {
  return (
    <div className="badge">
      <img alt={name} src={img} />
      <div>
        <h4>{name}</h4>
        <p>@{handle}</p>
      </div>
    </div>
  );
}

function App() {

  return (
    <div>
      <Badge
        name="Tyler McGinnis"
        handle="tylermcginnis"
        img="https://avatars0.githubusercontent.com/u/2933430"
      />
    </div>
  )
}

export default App

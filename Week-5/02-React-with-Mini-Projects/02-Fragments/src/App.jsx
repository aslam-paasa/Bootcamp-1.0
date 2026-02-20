/**
 * Fragments:
 * - In React, a component can return a single parent element, but it can
 *   contain multiple child within that single parent.
 * - It means React Fragments allows us to wrap or group multiple elements
 *   without adding extra nodes to the DOM. 

*/

/**
 * Wrong Code:
 * - Without a parent element i.e. div, the component will throw an error.
*/
const MyComponent1 = () => {
  return (
    <div>
      <h1>Hello</h1>
      <p>This is a paragraph</p>
    </div>
  )
}

/**
 * Correct Code:
*/
const MyComponent2 = () => {
  return (
    <>
      <h1>Hello</h1>
      <p>This is a paragraph</p>
    </>
  )
}

function App() {
  return (
    <div>
      <MyComponent1 />
      <MyComponent2 />
    </div>
  )
}

export default App

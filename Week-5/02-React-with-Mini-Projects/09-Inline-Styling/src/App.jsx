/**
 * Inline Styling:
 * - Inline Styling in React allows you to apply CSS styles directly to
 *   elements using a JavaScript object. 
 * 
 * Note:
 * 1. Inline styles are applied as a prop to the element.
 * 2. The style prop expects a JavaScript object.
 * 3. The key is the style name and the value is the style value.
 * 
*/

function App() {

  return (
    <div>
      <MyComponent />
    </div>
  )
}

function MyComponent() {

  const componentStyle = { 
    backgroundColor: 'blue',
    color: 'white'
  }

  return (
    <div>
      <h1 style={{ color: 'white', backgroundColor: 'blue' }}>Hello World</h1>
      <h1 style={componentStyle}>Hello World</h1>
    </div>
  )
}

export default App

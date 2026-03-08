/**
 * Every website that we see can be broken down into components & State.
 * - The actual html that we see is the component.
 * - State is the mutable data that represents the internal state of a
 *   component. It is managed and controlled within the component itself.
*/

/**
 * Difference between Props and State:
 * - Props are immutable data passed down from parent to child components.
 * - State is mutable and represents the internal state of a component.
 * - Props are passed as an argument to the component, whereas state is
 *   managed within the component using hooks.
*/

import './App.css'
import ChaiOrder from './ChaiOrder'

function App() {
  return (
    <div>
      <ChaiOrder />
    </div>
  )
}

export default App

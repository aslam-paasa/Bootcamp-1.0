/**
 * Prop Drilling: Anti-Pattern
 * Prop Drilling occurs when you need to pass data from higher level component
 * down to a lower level component that is several layers deep in the 
 * component tree. This often leads to following issues:
 * 
 * 1. Complexity: You may have to pass props through many intermediate
 *    components that don't use the props themselves, just to get them
 *    to the component that needs them.
 * 
 * 2. Maintenance: It can make the code harder to maintain, as changes
 *    in the props structure require updates in multiple components.
 * 
 * Issue: Drilling it down the prop chain i.e. grandparent -> parent -> child
 * Solution: LCA or,Context API
*/



import { useState } from "react";
import PropTypes from "prop-types";

function App() {
  const [bulbOn, setBulbOn] = useState(true);

  return (
    <div>
      <Light bulbOn={bulbOn} setBulbOn={setBulbOn} />
    </div>
  )
}

function Light({bulbOn, setBulbOn}) {

  /**
   * - bulbOn is a prop to the Bulb State component
   * - bulbOn, setBulbOn are props to the LightSwitch component
  */
  return (
    <div>
      <LightBulb bulbOn={bulbOn} />
      <LightSwitch bulbOn={bulbOn} setBulbOn={setBulbOn} />
    </div>
  )
}

function LightBulb({bulbOn}) {

  return (
    <div>
      {bulbOn ? "Bulb is On" : "Bulb is Off"}
    </div>
  )
}

function LightSwitch({setBulbOn}) {

  function toggleBulb() {
    setBulbOn(currentState => !currentState);
  }

  return (
    <button onClick={toggleBulb}>Toggle Bulb</button>
  )
}

Light.propTypes = {
  bulbOn: PropTypes.bool.isRequired,
  setBulbOn: PropTypes.func.isRequired,
}

LightBulb.propTypes = {
  bulbOn: PropTypes.bool.isRequired,
}

LightSwitch.propTypes = {
  setBulbOn: PropTypes.func.isRequired,
}

export default App




/**
 * What are the disadvanatges of props drilling and how we can avoid
 * props drilling?
 * 
 * 1. Code Complexity:
 *    Prop drilling can make code difficult to read and maintain,
 *    especially in large applications with many components. This is
 *    because props needs to be passed down through multiple levels
 *    of components, and it can be difficult to keep track of which
 *    components are using which props.
 * 
 * 2. Reduced Maintainability:
 *    Prop drilling can also make code less maintainable. This is because
 *    if a prop needs to be changed, the changed needs to be propagated
 *    through all the components that use it. This can be time-consuming
 *    and error-prone process.
 * 
 * 3. Increased risks of errors:
 *    Prop drilling can also increase the risk of errors. This is because
 *    it can be difficult to keep track of which components are using
 *    which props, and it can be easy to forget to pass a prop down to
 *    a component that needs it. This can lead to errors in the applcn.
 * 
 * 4. Performance Overhead:
 *    Prop drilling can also have a performance overhead. This is because
 *    every time a prop is passed down to a component, the component 
 *    needs to re-render. This can be a significant performance overhead
 *    in large applications with many components. 
 * 
 * - Makes Application slower.
 * - We can avoid props drilling using Context API or Redux by using
 *   any state management libraries.
*/
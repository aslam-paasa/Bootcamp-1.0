/**
 * Rolling Up The State And Unoptimal Renders: [State Uplifting]
 * As your application grows, you find that multiple components need access
 * to the same state Instead of duplicating state in each component, you
 * can lift the state up to the LCA (Lowest Common Ancestor), allowing the 
 * common ancestor to manage it.
 * 
 * When we will create our react application in the future, we might have
 * top level App Component which renders another component called Light,
 * which renders two component called LightBulb & LightSwitch. And it might
 * happen that these two lowest component needs to access a state variable.
 * So, we roll up the state means store the state in the LCA (Light Component).
 * Note: We can store the state anywhere up to the chain, but this should be
 * atleast one level up from the components that need to access the state.
 * So, we can pass it down as a prop.
 * 
 *                        [App]  (isLightOn State Variable)
 *                          |
 *             isLightOn    |    toggleLight
 *                          |
 *                          V
 *                       [Light]
 *             isLightOn /      \ toggleLight
 *                      /        \
 *                     /          \
 *                    V            V
 *               [LightBulb]   [LightSwitch]
*/ 


import { useState } from "react";

function App() {

  return (
    <div>
      <LightBulb />
    </div>
  )
}

function LightBulb() {
  const [bulbOn, setBulbOn] = useState(true);

  return (
    <div>
      <BulbState bulbOn={bulbOn} />
      <ToggleBulbState bulbOn={bulbOn} setBulbOn={setBulbOn} />
    </div>
  )
}

/**
 * Issue: This setBubOn fn needs to be present to its Sibling component.
 * Solution: We can lift the state up to the LCA (Light Component).
*/
function BulbState({bulbOn}) {
  // const [bulbOn, setBulbOn] = useState(true);

  return (
    <div>
      {bulbOn ? "Bulb is On" : "Bulb is Off"}
    </div>
  )
}

function ToggleBulbState({setBulbOn}) {

  function toggleBulb() {
    setBulbOn(currentState => !currentState);
  }

  return (
    <button onClick={toggleBulb}>Toggle Bulb</button>
  )
}

export default App

/**
 * Context API:
 * The Context API is a powerful feature in React that enables you to manage
 * state across your application more efficiently, especially when dealing
 * with deeply nested components.
 * 
 * The Context API provides a way to share values (state, functions, etc.)
 * between components without having to pass props down manually at every
 * level.
 * 
 * Jargon:
 * 1. Context: 
 *    - This is created using React.createContext(). 
 *    - It serves as a container for that data you want to share.
 *      [Here, we create the container that we want to teleport & should
 *       be created outside our component tree].
 * 2. Provider: 
 *    - This component wraps part of your application and provides
 *      the context value to all its descendants. 
 *    - Any component that is a child of this Provider can access the context.
 *      [It provides our context to all the children components].
 * 3. Consumer: 
 *    - This component subscribes to context changes. 
 *    - It allows you to access the context value(using useContext hook).
 * 
 * Note: Solved the problem of prop drilling using Context API. 
 * 
 * Issue with Context API:
 * - When the context value changes, all the components that are using that
 *   context will re-render.
 * - Libraries like Zustand, Redux, etc. are more powerful than Context API.
 *   They can do more than just share data between components like optimizing
 *   re-renders, state management, etc.
*/

import { createContext, useContext, useState } from "react";

/**
 * 1. Create the context:
*/
const BulbContext = createContext();


/**
 * 2. Wrap our context inside the Provider:
 *    - Inside the value, we pass the data that we want to share.
 *    - Inside the value, I want to share an key-value object:
 *      a. bulbOn : bulbOn, and 
 *      b. setBulbOn : setBulbOn.
 *    - And these are getting stored in the bulbContext.
*/

export function BulbProvider({ children }) {
  const [bulbOn, setBulbOn] = useState(true);

  return (
    <BulbContext.Provider value={{ 
      bulbOn: bulbOn, 
      setBulbOn: setBulbOn 
    }}>
      {children}
    </BulbContext.Provider>
  )
}

function App() {
  return (
    <BulbProvider>
      <Light />
    </BulbProvider>
  )
}

function Light() {
  return (
    <div>
      <LightBulb />
      <LightSwitch />
    </div>
  )
}

function LightBulb() {
  /**
   * 3. Consume the context: 
   *    - Destructure the context value.
   *    - Use the context value.
  */
  const { bulbOn } = useContext(BulbContext);

  return (
    <div>
      {bulbOn ? "Bulb is ON" : "Bulb is OFF"}
    </div>
  )
}

function LightSwitch() {
  const { setBulbOn } = useContext(BulbContext);

  function handleClick() {
    setBulbOn(currentBulbOn => !currentBulbOn);
  }

  return (
    <button onClick={handleClick}>Toggle Bulb</button>
  )
}
export default App

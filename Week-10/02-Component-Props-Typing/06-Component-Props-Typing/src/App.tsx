/**
 * Assignment: Component Props Typing
 * In this exercise, you'll practice typing props for a React component
 * using TypeScript. You will create a simple Button component with typed
 * props and then use it within a parent component.
*/

/**
 * Instructions:
 * Step-1: Create the Button Component
 * - Create a new file called Button.tsx in the src directory.
 * - Define a Button component that accepts the following props:
 *    a. label    : A string to display as the button's text.
 *    b. onClick  : A function that gets called when the button is clicked.
 *    c. disabled : A boolean to indicate if the button is disabled.
 * 
 * Step-2: Use the Button Component
 * - Open App.tsx (or create a new component if you prefer).
 * - Import and use the Button component, passing the appropriate props.
 * 
 * Step-3: Verify your Types
 * - Make sure your TypeScript compiler is not showing any type errors.
 * - Test the buttons in the browser to ensure they work as expected:
 *   a. The first button should display "Click Me" and show an alert when
 *      clicked.
 *   b. The second button should be disabled and should not trigger the alert.
 * 
*/

import Button from "./components/Button"

const App = () => {
  return (
    <div>
      <Button 
        label="Click Me" 
        onClick={() => console.log("Button clicked")} 
        disabled={false} 
      />
    </div>
  )
}

export default App

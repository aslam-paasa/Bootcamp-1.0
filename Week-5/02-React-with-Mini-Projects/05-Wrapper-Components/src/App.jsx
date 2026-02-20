/**
 * Wrapper Components:
 * - On any website, you must have seen cards - like Instagram posts,
 *   YouTube videos, or Twitter tweets. Each card has the same structure
 *   but different content.
 * 
 * - Instead of writing the same structure again and again, we can create
 *   a reusable Wrapper Component!
 */

/**
 * Way-1: Old approach (Not Recommended) 
 * - In this approach, we explicitly pass components through props.
 * - Reusable Component Flow:
 *   a. App.jsx -> CardWrapperOld.jsx -> TextComponent1.jsx (props)
 *   b. App.jsx -> CardWrapperOld.jsx -> TextComponent2.jsx (props)
 * 
 * - Note: This is just for learning, we'll remove this later
 */

// 1. Text Components:
function TextComponent1() {
  return (
    <div>
      <p>hi there111</p>
    </div>
  )
}

function TextComponent2() {
  return (
    <div>
      <p>hi there222</p>
    </div>
  )
}

// 2. Old Wrapper Component (Not Recommended)
function CardWrapperOld({component1, component2}) {
  return (
    <div>
      <div style={{border: "2px solid black", padding: 20}}>
        {component1}
      </div>
      <div style={{border: "2px solid black", padding: 20}}>
        {component2}
      </div>
    </div>
  )
}

// 3. App.jsx: Pass the components as props



/**
 * Way-2: Modern and better approach - using children prop
 * 
 * In this approach:
 * 1. We use CardWrapper like a normal tag (<CardWrapper>...</CardWrapper>)
 * 2. Whatever content we write between CardWrapper tags automatically 
 *    becomes the 'children' prop
 * 3. This is a special React prop that makes code cleaner and more readable
 */

// 1. Text Component:
function TextComponent() {
  return (
    <div>
      hi from txt component
    </div>
  )
}


// 2. Wrapper Component with children prop
function CardWrapper({children}) {
  return (
    <div style={{border: "2px solid black", padding: 20}}>
      {children}
    </div>
  )
}

function App() {
  return (
    <div>
      {/* 1. Old approach (Not Recommended) */}
      <CardWrapperOld component1={<TextComponent1/>} component2={<TextComponent2/>} />

      {/* 2. CardWrapper with children prop */}
      <CardWrapper>
        <div style={{border: "2px solid red"}}>hi there...</div>
      </CardWrapper>

      {/* 3. CardWrapper with children prop */}
      <CardWrapper>
        <div style={{border: "2px solid blue"}}>hello there...</div>
      </CardWrapper>

      {/* 4. Children props contains everything written between CardWrapper tags */}
      <CardWrapper>
        <div style={{border: "2px solid green"}}>
          <TextComponent />
        </div>
      </CardWrapper>

    </div>
  )
}

export default App

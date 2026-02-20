/**
 * Error Boundary:
 * - Error Boundary are React components that catch JavaScript errors
 *   in their child component tree and display a fallback UI.
 * - Error Boundaries only exist in class based components.
 * 
 *   A class component becomes an error boundary if it defines either
 *   (or both) of the following lifecycle methods:
 *   a. static getDerivedStateFromError() to render a fallback UI after
 *      an error is thrown.
 *   b. componentDidCatch() to log error information.
 * 
 *   The Error Boundary component must be a class component.
 * 
 * Note: It basically means if any of my components throw an error like
 *       not able to fetch data from an API, then the error boundary
 *       component will catch the error and display a fallback UI, instead
 *       of the entire application crashing.
*/

import ErrorBoundary from "./ErrorBoundary";

function App() {

  return (
    <div>
      <ErrorBoundary>
        <Card1 />
      </ErrorBoundary>
        <Card2 />
    </div>
  )
}

function Card1() {
  
  throw new Error("Error while rendering");

  return <div style={{backgroundColor: "red", borderRadius: 10, padding: 10}}>
    <h1>Card 1</h1>
  </div>
}

function Card2() {
  return <div style={{backgroundColor: "blue", padding: 10, borderRadius: 20}}>
    <h1>Card 2</h1>
  </div>
}

export default App

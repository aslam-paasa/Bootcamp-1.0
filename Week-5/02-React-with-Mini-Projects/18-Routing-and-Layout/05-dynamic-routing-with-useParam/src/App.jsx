/**
 * Dynamic Routing with useParams:
 * useParams hook is a very useful feature in React Router that's used for
 * dynamic routing.
*/

/**
 * What is Dynamic Routing?
 * - When you want to pass variable values in URLs
 * - For example: /users/123 or /products/electronics/laptop
 * - Here '123' and 'laptop' are dynamic values that can change
*/

/**
 * How does useParams work? Step by Step Guide:
 * 1. Setup (React Router Setup):
 *    - First install react-router-dom
 *    - Import BrowserRouter
 *    - Wrap your App with BrowserRouter
 * 
 * 2. Route Definition:
 *    - Define dynamic route inside Routes component
 *    Example:
 *    <Route path="/users/:id" element={<UserProfile/>} />
 *    - Here ':id' is a parameter that will accept dynamic values
 * 
 * 3. useParams Implementation:
 *    - Import useParams in your component:
 *      import { useParams } from 'react-router-dom'
 *    
 *    - Use useParams inside your component:
 *      function UserProfile() {
 *        const { id } = useParams();
 *        return <div>User ID is: {id}</div>
 *      }
 * 
 * 4. URL Navigation:
 *    - Now whenever someone goes to /users/123
 *    - '123' will automatically be stored in {id}
 *    - You can use this value for API calls or displaying content
 * 
 * Real Life Examples:
 * - Blog website: /blog/:postId 
 *   URL: /blog/how-to-learn-react -> postId = "how-to-learn-react"
 * 
 * - E-commerce: /products/:category/:productId
 *   URL: /products/electronics/iphone-13 -> category = "electronics", productId = "iphone-13"
 * 
 * Note: useParams is particularly useful when building large applications 
 * where you need to handle multiple dynamic routes and pass data through URLs
*/

import './App.css'

function App() {

  return (
    <div>
    </div>
  )
}

export default App

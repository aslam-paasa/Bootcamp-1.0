import './App.css'
import Home from './Pages/Home'
import Products from './Pages/Products'
import { Routes, Route } from 'react-router-dom'

/**
 * Setup the router:
 * - npm i react-router-dom
 * - Create a Browser Router in our root file(index.js/main.jsx). 
 *   It enables client-side routing for web apps.
 * - The routing elements are provided by the react-router-dom. So you
 *   need to add react-router-dom as dependency first.
*/

/**
 * Q. Add React Router to the App and create two routes. One for Home
 *    Page and one for product detail page.
*/

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
      </Routes>
    </div>
  )
}

export default App

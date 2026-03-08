import './App.css'
import ProductList from "./pages/ProductList"
import Cart from "./pages/Cart"
import products from "./data/productsDB"
import { Routes, Route, NavLink } from 'react-router-dom'
import Header from "./components/Header"


/**
 * Q. Let's create a React App with Two Components. 
 *    a. Cart and 
 *    b. ProductListing.
 * 
 * => Pages are already created. Add the routes first, like we practiced
 *    yesterday.
 *    a. Routes
 *    b. Header
 *    c. NavLink in the Header
 * 
 * Note: With the help of useContext Hooks, multiple components can
 *       talk to each other, share state & avoid prop drilling.
*/


function App() {

  return (
    <div className='App'>
      <Header />
      <nav>
        <NavLink to='/'>Home</NavLink> || 
        <NavLink to='/cart'> Cart</NavLink>
        <h3>Items in cart: 0</h3>
      </nav>
      <Routes>
          <Route path='/' element={<ProductList products={products} />} />
          <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App

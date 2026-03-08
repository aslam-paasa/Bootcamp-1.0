import './App.css'
import ProductList from "./pages/ProductList"
import Cart from "./pages/Cart"
import products from "./data/productsDB"
import { Routes, Route, NavLink } from 'react-router-dom'
import Header from "./components/Header"

/**
 * Create and Provide Context:
 * Let's learn by creating a cart context:
 *   a. Create a cartContext.jsx file and add context using the 
 *      createContext() from react.
 *      - cartContext.jsx
 *        import { createContext } from 'react'; => Importing createContext
 *        export const CartContext = createContext() => Creating Context
 *   b. Now in your root file(in our case main.jsx), provide the context
 *      to the <App /> component. Provide {cartItems: 4} as value with
 *      your provider.
 *      - main.jsx
 *        <CartContext.Provider value=({cartItems: 4})>
 *           <App />
 *        </CartContext.Provider>
 * 
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

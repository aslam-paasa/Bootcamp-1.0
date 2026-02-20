import './App.css'
import ProductList from "./pages/ProductList"
import Cart from "./pages/Cart"
import Header from "./components/Header"
import products from "./data/productsDB"
import { Routes, Route } from 'react-router-dom'

/**
 * useState for the item:
 * - Right now we are passing cartItem value directly as 4. Let's change
 *   that value from a direct value to be something coming from state.
 * - Now, instead of logger, you can pass setItem. You are basically
 *   passing { cartItems, setCartItems } pair.
*/

function App() {

  return (
    <div className='App'>
      <Header />
      <Routes>
          <Route path='/' element={<ProductList products={products} />} />
          <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App

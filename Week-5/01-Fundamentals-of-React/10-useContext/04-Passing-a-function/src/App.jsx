import './App.css'
import ProductList from "./pages/ProductList"
import Cart from "./pages/Cart"
import Header from "./components/Header"
import products from "./data/productsDB"
import { Routes, Route } from 'react-router-dom'

/**
 * Passing a function:
 * Create a simple fn logger which does console.log() and nothing else.
 * Can we pass this fn in the cart? If yes, do that and consume it in
 * Cart.
 *  
 * => const cartLogger = () => console.log(`carting`);
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

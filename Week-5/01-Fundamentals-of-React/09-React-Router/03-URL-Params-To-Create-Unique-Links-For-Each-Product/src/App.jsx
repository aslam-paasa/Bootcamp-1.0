import './App.css'
import Home from './Pages/Home'
import Category from './Pages/Category'
import ProductDetail from './Pages/ProductDetail'
import WishList from './Pages/WishList'
import Cart from './Pages/Cart'
import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'


/**
 * URL Params to create unique links to each product:
 * - If a path segment starts with : then it becomes a "dynamic segment".
 * - products/:productId - We call the productId in the URL "URL Params",
 *   or just "params" for short.
*/

/**
 * Q. In a category listing page, on click of view details for each
 *    product, navigate to a page which shows the details of that
 *    particular product only. The URL should be unique for each
 *    product.
 * => We will learn two new concepts:
 *    1. Writing productId to URL
 *    2. Reading productId from URL => useParams
*/

function App() {

/**
 * Step-2: When we create unique route for that item, we will add that
 *         in our Routes. i.e. "product/:productId". 
 * Step-3: Once we created the unique route for that item in our Routes
 *         we need to create that ProductDetail Component also.
*/
  return (
    <div className='App'>
      <nav>
        <Link to="/"> Home </Link> ||
        <Link to="/category"> Category </Link> ||
        <Link to="/cart"> Cart </Link> ||
        <Link to="/wishlist"> WishList</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/category' element={<Category />}></Route>
        <Route path='/product/:productId' element={<ProductDetail />}></Route>
        <Route path='/wishlist' element={<WishList />}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
    </div>
  )
}

export default App

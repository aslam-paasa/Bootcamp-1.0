import './App.css'

/**
 * Q. Convert useState to useContext and check if a user is logged in or not.
*/

import './App.css'
import { Routes, Route, NavLink } from "react-router-dom";
import Address from "./pages/Address";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import RequiresAuth from "./components/RequiresAuth";
import { AuthContext } from "./main";
import { useContext } from "react";

const getActiveStyle = ({ isActive }) => ({
  margin: "1rem 0",
  fontWeight: isActive ? "600" : "200",
  padding: isActive ? "1rem" : "0.5rem",
  color: isActive ? "red" : ""
});

function App() {

  /**
   * Step-4: Destructure & Use the Context
  */
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      <nav>
        <NavLink style={getActiveStyle} to="/">
          Home
        </NavLink>
        ||
        <NavLink style={getActiveStyle} to="/category">
          Category
        </NavLink>
        ||
        <NavLink style={getActiveStyle} to="/cart">
          Cart
        </NavLink>
        ||
        <NavLink style={getActiveStyle} to="/wishlist">
          WishList
        </NavLink>
        ||
        <NavLink style={getActiveStyle} to="/address">
          Address
        </NavLink>
        ||
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>{isLoggedIn ? "Logout" : "Login"}</button>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
        {/* {!isLoggedIn && <Route path="/address" element={<Login />} />} */}
        {/* {isLoggedIn && <Route path="/address" element={<Address />} />} */}
        <Route path="/address" element={<RequiresAuth><Address /></RequiresAuth>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App

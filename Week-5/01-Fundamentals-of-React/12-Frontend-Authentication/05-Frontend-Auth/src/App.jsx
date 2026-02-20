import './App.css'

/**
 * Q. Navigate the user to the page where he was going, after the successful
 *    login. User clicked on "address" and you redirected her to the "login"
 *    page so now it's your duty to redirect her to the "address" page.
 * => useLocation() hook: 
 *    - If I am logged in, I will be redirected to the page where I was going.
 *    - If I am not logged in, I will be redirected to the login page.
 * => Inside state, we pass the location where we are coming from i.e. previous
 *    path.
 * => Now when we are going to our login route, we will also have this info
 *    in the state that we are coming from which route.
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
import { useLocation, useNavigate } from "react-router-dom";

const getActiveStyle = ({ isActive }) => ({
  margin: "1rem 0",
  fontWeight: isActive ? "600" : "200",
  padding: isActive ? "1rem" : "0.5rem",
  color: isActive ? "red" : ""
});

function App() {

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  /**
   * Step-4: Remembering the previous URL where we are coming from and then
   *         redirecting the user to that URL after the successful login.
  */
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    console.log(location);
    navigate(location?.state?.from?.pathname || "/");
  }

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
        {/* 
        * Step-5: Create a button to login or logout and use the handleLogin
        *        function to toggle the isLoggedIn state.
        */}
        <button onClick={handleLogin}>{isLoggedIn ? "Logout" : "Login"}</button>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<RequiresAuth><Address /></RequiresAuth>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App

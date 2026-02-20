import './App.css'

/**
 * Understanding:
 * To summarize, you set the login using as useState. This is all about
 * authentication. From here we will just refactor our code to make it
 * better.
*/

/**
 * Q. Create a RequiresAuth component and show the element based on
 *    login status.
 * => In the Routes, we will wrap our Address Component with RequiresAuth
 *    as children. 
 * => RequiresAuth:
 *    a. If user 'isLoggedIn' = true: show 'children' i.e. Address Comp
 *    b. Else 'React-router-dom' will 'Navigate' to '/login' component.
*/

/**
 * Understanding:
 * - There are 'n' no. of routes, and we cannot keep doing this for every
 *   route, otherwise things will get messy:
 *    {!isLoggedIn && <Route path="/address" element={<Login />} />}
 *    {isLoggedIn && <Route path="/address" element={<Address />} />}
 * 
 * RequiresAuth Wrapper Component:
 * - To make this better, we will create a RequiresAuth Wrapper Component
 *   and wrap it around the Address Component.
 *   
 *   <Route path="/address" element={<RequiresAuth isLoggedIn={isLoggedIn}><Address /></RequiresAuth>} />
 * 
 * - This is a wrapper component, and it will check if the user is logged in
 *   or not. If the user is not logged in, it will navigate to the login
 *   page. If the user is logged in, it will show the Address Component.
 * 
 * - Similarly, we can wrap this RequiresAuth Wrapper to any component that
 *   we want to keep private.
*/

import './App.css'
import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Address from "./pages/Address";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import RequiresAuth from "./components/RequiresAuth";

const getActiveStyle = ({ isActive }) => ({
  margin: "1rem 0",
  fontWeight: isActive ? "600" : "200",
  padding: isActive ? "1rem" : "0.5rem",
  color: isActive ? "red" : ""
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        <Route path="/address" element={<RequiresAuth isLoggedIn={isLoggedIn}><Address /></RequiresAuth>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App

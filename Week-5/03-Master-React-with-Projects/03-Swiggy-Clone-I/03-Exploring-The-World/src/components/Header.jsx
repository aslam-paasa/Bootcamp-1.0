import { LOGO_URL } from '../utils/constants';
import { useState } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * Logic: Login Button
  */ 
  const buttonText = isLoggedIn ? 'Logout' : 'Login';

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };


  return (
    <div className="header">

      {/* 1. Logo */}
      <div className="logo-container">
        <img src={LOGO_URL} alt="App Logo" className="logo" />
      </div>

      {/* 2. Nav Items: List of Nav Items, Login Button */}
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
          <button className="login-btn" onClick={handleLogin}>{buttonText}</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;

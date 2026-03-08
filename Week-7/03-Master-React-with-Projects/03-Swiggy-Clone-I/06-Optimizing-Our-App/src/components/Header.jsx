import { LOGO_URL } from '../utils/constants';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onlineStatus = useOnlineStatus();

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
          <li>Online Status: {onlineStatus ? '✅' : '⛔'}</li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/grocery">Grocery</Link></li>
          <li>Cart</li>
          <button className="login-btn" onClick={handleLogin}>{buttonText}</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;

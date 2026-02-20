import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../main';
function Header() {
  /**
   * Consuming Context:
   * a. items variable
  */
  const { items } = useContext(CartContext);
  return (
    <div>
      <h1>meKart</h1>
      <h3>Items in cart: {items}</h3>
      <nav>
        <NavLink to='/'>Home</NavLink> || 
        <NavLink to='/cart'> Cart</NavLink>
      </nav>
    </div>
  )
}

export default Header

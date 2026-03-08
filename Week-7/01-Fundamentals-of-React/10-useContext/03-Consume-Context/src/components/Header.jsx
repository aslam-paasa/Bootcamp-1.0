import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../main';
function Header() {
  /**
   * Consume Context:
   * - If we have to pass the value of CartContext i.e. {items:4},
   *   first we have to pass it to <App /> in main.jsx. Then <App />
   *   will pass the CartContext value from <App /> to <Header />. And
   *   then <Header /> would be able to read this value, called as
   *   Prop Drilling.
   * - Prop Drilling basically means one prop is passed from grandfather
   *   component to father component and then father component to child.
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

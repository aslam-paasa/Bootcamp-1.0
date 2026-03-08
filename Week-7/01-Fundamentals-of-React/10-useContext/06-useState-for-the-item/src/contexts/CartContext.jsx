import { useState } from 'react';
import { createContext } from 'react'

/**
 * 1. Creating & Providing context:
*/
export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    console.log({ cart });
    

    const handleCartUpdate = (item) => {
        setCart(cart => [...cart, item]);
    }

    return (
        <CartContext.Provider value={{ cart, handleCartUpdate }}>
            {children}
        </CartContext.Provider>
    )
}
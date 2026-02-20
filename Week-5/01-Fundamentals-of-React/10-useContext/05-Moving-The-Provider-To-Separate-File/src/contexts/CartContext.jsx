import { createContext } from 'react'

/**
 * 1. Creating & Providing context:
 *    a. Passing items variable
 *    b. Passing cartLogger Fn
 * Note: Anything we wrap, it comes a children.
*/
export const CartContext = createContext();

export function CartProvider({ children }) {
    return (
        <CartContext.Provider value={{ items: 4, cartLogger: () => console.log(`Item clicked!`) }}>
            {children}
        </CartContext.Provider>
    )
}
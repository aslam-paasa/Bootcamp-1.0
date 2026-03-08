import { createContext, useState } from "react";

/**
 * Step-1: Create the Context
*/
export const AuthContext = createContext({ isLoggedIn: false });

/**
 * Step-2: Create the Provider
*/
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}
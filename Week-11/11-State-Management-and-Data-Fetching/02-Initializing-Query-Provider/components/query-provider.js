/**
 * 1. Make it a client component
 *    > "use client" tells Next.js this code runs in the browser
 *    > React Query works only on the client side
 * 
 * 2. Import required things
 *    > QueryClient - holds the power of tanstack (refetching, etc.)
 *    > QueryClientProvider - shares React Query with the app
 *    > useState - stores QueryClient object (superpowers)
 * 
 * 3. Create a wrapper component:
 *    > QueryProvider is a wrapper for the app
 *    > children means all components wrapped inside this provider
 * 
 * 4. Create QueryClient only once
 *    > useState(() => new QueryClient())
 *    > Ensures the client is not recreated on every render
 *    > Keeps cache and query data stable
 * 
 * 5. Provide QueryClient to children
 *    > QueryClientProvider passes the superpowers to all children
 *    > Now they can use useQuery, useMutation, caching, etc
*/

/**
 * Where you use this?
 * > Usually inside:
 *   - layout.js
 *   - or root provider file
 * 
 * > <QueryProvider>
 *     <App />
 *   </QueryProvider>
*/

"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }) {
    const [client] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}
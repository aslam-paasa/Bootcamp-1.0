/**
 * State Management & Data Fetching:
*/

/**
 * Introduction to TanStack Query:
 * 1. What problem are we solving?
 *    > Modern Apps constantly deal with server data:
 *      - API responses
 *      - User lists
 *      - Products
 *      - Posts
 *      - Search results
 *    > Traditionally, we do this:
 *      - Call fetch()
 *      - Store data in useState
 *      - Handle loading
 *      - Handle errors
 *      - Re-fetch manually
 *      - Sync data everywhere
 *    > This becomes messy very fast.
 * 
 * 2. Core Problem: Server State vs Client State
 *    a. Client State
 *       - UI state
 *       - Modal open/close 
 *       - Input values
 *       - Theme, toggles
 *       - useState is perfect for this.
 *    b. Server State (The Pain)
 *       - Comes from backend
 *       - Can change anytime
 *       - Can become stale
 *       - Needs refetching
 *       - Needs caching
 *       - useState is bad at handling this.
 * 
 * 3. What is TanStack Query?
 *    > It is server state management library for react.js and next.js.
 *    > Server State = Data that lives on a server, but is needed in
 *                     our react.js or next.js.  
 *    > It Manages server state for you - automatically, efficiently, 
 *      and correctly.
 *    > It handles:
 *      - Data Fetching
 *      - Caching
 *      - Refetching on network failure
 *      - Background Updates
 *      - Loading & Error States
 *   > You stop managing data and start using data, but when fetching
 *     data on the client side (CSR), we still faces challenges
 *     (fetch + useState + useEffect)
 * 
 * 4. Why TanStack Query Exists (Why not just fetch)?
 *    > Without TanStack Query, you manually handle:
 *      - Loading State
 *      - Error State
 *      - Refetch Logic
 *      - Cache Logic
 *      - Syncing data across components
 *    > TanStack Query gives you:
 *      - Auto Caching
 *      - Auto refetching
 *      - Auto error handling
 *      - Background updates
 *      - One source of truth
 * 
 * 5. How TanStack Query Works?
 *    > Component asks for data
 *         |
 *         V
 *    > TanStack Query checks cache
 *         |
 *         V
 *    > If fresh -> use cache
 *    > If stale -> refetch
 *         |
 *         V
 *    > UI updates automatically
 *      (You never manually sync anything).
 * 
 * 
 * Summary:
 * TanStack Query is a powerful server-state manager that handles 
 * fetching, caching, and syncing API data automatically — making 
 * it the perfect companion for client-side data handling in Next.js
 * apps.
*/
/**
 * Caching in Next.js?
 * 1. What is Caching?
 *    > Every customer order coffee      - Barista pre makes popular drink
 *    > Barista makes it fresh each time - Stores them in warming station
 *    > Takes 5 min per coffee           - Serves instantly (10sec)
 *    > Everyone waits in long line      - Happy fast customer
 * 
 * 2. How caching works in Next.js?
 *    > First user visits: website builds page from scratch (slow)
 *    > Save to cache    : copy of page is stored (like taking a photo)
 *    > Next users visit server, it serves the saved copy.
 *      a. Useful for:
 *         - Blog Posts, Docs, Product, Homepage, About Page
 *      b. Not useful for:
 *         - Shopping Cart, User Dashboard, Live Stock Prices
 * 
 * 3. Two types of Caching
 *    a. Page Caching
 *    b. API Data Caching
 *    c. Database Caching
 *    d. No Caching
 * 
 * Note:
 * > Caching is like keeping photocopy of something that you don't have
 *   to recreate every time. This makes our site superfast.
 * > In Next.js 15, by default nothing is cached, we have to tell.
*/

/**
 * Hydration in Next.js:
 * > When a static html page "comes alive" and become interactive.
 * > Example:
 *   HTML is like Frozen Pizza, if we want to make it interactive,
 *   we have to put it in oven, until then it is dehydrated.
 *   a. Server sends html - Static Page (like frozen pizza)
 *      You can see it, but buttons don't work yet
 *   b. JS Download - Interactive code arrives (heating up)
 *      Browser prepares to make page interactive
 *   c. Page "Hydrates" and button works, forms submits, animation play
 * 
 * Why Hydration matters?
 * > It makes website feels fast.
 * > User can see  content immediately and that interactivity kicks.
 * > If we don't use the technique of hydration then user will see
 *   blank screen while everything loads, which gives bad UX to users.
*/

/**
 * Summary:
 * a. Caching   = Saving a copy to serve faster later
 * b. Hydration = Making static html interactive
*/
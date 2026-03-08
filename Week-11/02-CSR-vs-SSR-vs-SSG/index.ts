/**
 * What is rendering?
 * - Rendering = How your HTML gets created and shown on the screen.
 * - Next.js gives you multiple rendering methods:
 *   a. Client-Side Rendering (CSR)
 *   b. Server-Side Rendering (SSR)
 *   c. Static Site Generation (SSG)
 *   d. Incremental Static Regeneration (ISR)
*/


/**
 * 1. Client-Side Rendering (CSR):
 * 
 *        Browser                            CDN 
 *    +---------------+                  +-----------+
 *    |               |  mywebsite.com   |           |
 *    |   White Page  |----------------->|           |
 *    |               |<-----------------|           |
 *    |               |  index.html      |           |
 *    |               |                  |           |
 *    |   White Page  |----------------->|           |
 *    |               |<-----------------|           |
 *    |  [JS Runs...] |  chunks.js       |           |
 *    | Page Renders  |                  |           |
 *    +---------------+                  +-----------+
 *    
 *    - In traditional React, we use CSR
 *    - Server only sends an empty HTML with div#root
 *    - Along with it, sends the JS bundle which gets injected into the HTML
 *    - Browser downloads and executes the JS
 *    - Then the entire UI is built on the browser/client side
 *    - Pros: Interactive UI, Better UX after initial load
 *    - Cons: 
 *      - Slow initial load
 *      - Poor SEO, Not good for search engine optimization
 *      - Every user will see blank page for 1 second before the JS bundle 
 *        is loaded
*/

/**
 * 2. Server-Side Methods:
 *    Server-Side Methods are used to render the page on the server side,
 *    and then send the rendered page to the client.
 * 
 *    Methods:
 *    a. Static Site Generation (SSG)
 *    b. Server Side Rendering (SSR)
 *    c. Incremental Static Regeneration (ISR)
 * 
 *    - Pros: Fast initial load, Better SEO, Can show real-time data
 *    - Cons: More load on server, Can be slower for dynamic content
*/

/**
 * 2.a. Static Site Generation (SSG):
 *      i. Think of it like this:
 *         - You have a blog website
 *         - In the traditional way, content is generated each time someone
 *           visits a page
 *         - But with SSG, you pre-generate all pages beforehand!
 *       
 *      ii. How does it work?
 *         - Generally, SSG doesn't involve API/DB calls, and our work mainly
 *           deals with static files.
 *         - For example, before deploying the website, Next.js generates HTML
 *           for all pages, and these ready-made pages are distributed to
 *           servers worldwide (CDN).
 *           [CDN is the nearest server to client, and it serves these
 *           static files.]
 *         - When a user visits the website, they get a ready page from the
 *           nearest server, just like a newspaper - it's already printed,
 *           just needs to be delivered.
 *
 *      iii. When is SSG perfect?
 *        - Perfect for content that doesn't update frequently:
 *          - Documentation sites
 *          - Marketing pages
 *          - Blog posts
 *        - Pages are stored on CDN for faster delivery
 *        - Best performance and SEO
 * 
 *      iv. Benefits:
 *        - Lightning fast speed - because pages are pre-ready
 *        - Better ranking in Google search - because content is pre-available
 *        - Less load on server - because pages don't need to be generated repeatedly
 *        - Cost effective - because processing is minimal
*/

/**
 * 2.b. Server Side Rendering (SSR):
 *      - If I have API or DB calls, will the SSG method work?
 *        - No, but I can make all the API calls on the server and then
 *          send the built page to the browser as much as possible.
 *        - If I can render the page on the server instead of the browser,
 *          that's what we call SSR.
 * 
 *      - SSR means the server does all the work
 *      - Let's understand with an example:
 *        Imagine WhatsApp Web:
 *        1. When you login
 *        2. Server fetches all your chats
 *        3. Creates a complete page and sends to browser
 *        4. Browser just displays it
 *       
 *      - In the traditional way:
 *        1. Empty page comes first
 *        2. Browser downloads JS
 *        3. Then fetches data
 *        4. Then builds the page
 *           This process is slow!
 *       
 *      - How SSR works:
 *        1. User makes a request
 *        2. Server:
 *           - Makes API calls (like fetching chats from database)
 *           - Processes the data
 *           - Builds complete HTML page
 *        3. Browser gets a ready page
 *       
 *      - SSR is perfect for:
 *        - Social media apps (Instagram/Facebook feeds)
 *        - E-commerce (Amazon product pages)
 *        - User dashboards (Gmail inbox)
 *        - News websites (Live updates)
 *       
 *      - Major benefits of SSR:
 *        - Fast initial load (gets ready page)
 *        - Better SEO (Google gets complete content)
 *        - Can show real-time data
 *        - Personalized content (different for each user)
 *        - Less work for user's device (battery friendly)
*/

/**
 * 2.c. Incremental Static Regeneration (ISR):
 *      - Let's say you want to add a new module (like DevOps) to your docs
 *        that uses SSG. What should you do? Regenerate the entire site or
 *        just generate additional pages?
 *      - If we don't have an algorithm that can detect what has already been
 *        generated, we'll need to regenerate everything. However, if we have
 *        an algorithm that can determine how many pages are already generated
 *        and detect that DevOps is a new module, then we only need to generate
 *        the additional pages. This is what ISR does.
 *      - ISR is an advanced version of SSG
 *      - Pages are revalidated after a specific interval
 *      - Combines the best features of both SSG and SSR
 *      - Perfect for ecommerce and news sites
*/

/**
 * Next.js supports all these rendering methods and we can decide
 * which method to use on a page-by-page basis
*/


/**
 * Hydration:
 * - Hydration means when an HTML page comes from the server, we need to
 *   make it "alive"
 * - Let's take an example:
 *   1. Server sends a login form with email/password fields and login button
 *   2. This is just HTML - no functionality
 *   3. Nothing will happen on button click because there's no JavaScript
 *   4. Hydration process attaches JavaScript:
 *      - Adds click event to button
 *      - Adds form validation
 *      - Adds code for API calls
 *   5. Now the form becomes fully functional!
 * 
 * In simple words - Hydration makes static HTML interactive using JavaScript.
 * 
 * Why Hydration Error occurs in UI?
 * 
 * Hydration errors occur in UI due to these common reasons:
 * 
 * 1. Content Mismatch between Server and Client
 *    - HTML from server doesn't match with client-side JavaScript output
 *    - Example: Server shows date as "10 Jan", client shows "11 Jan"
 *      [Server DOM != Client DOM]
 * 
 * 2. Component State Mismatch
 *    - Initial state differs between server and client
 *    - Example: Modal is closed on server but open on client
 * 
 * 3. Dynamic Content Issues
 *    - Random numbers, dates or user-specific data differs
 *    - Example: Math.random() gives different values on server vs client
 * 
 * 4. Browser-specific Code Usage
 *    - Server doesn't have access to browser objects like window/document
 *    - Example: Trying to access window.innerWidth on server
 * 
 * 5. Wrong useEffect Implementation
 *    - Attempting to execute useEffect during server-side rendering
 *    - Example: Direct DOM manipulation in useEffect
*/
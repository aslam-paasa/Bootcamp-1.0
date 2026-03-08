/**
 * Server Components: 
 * a. Default type of Component in NextJS App Router.
 * b. They are rendered on the server, not on the browser.
 * c. The output is static html + minimal js (if needed).
 * d. Great for performance 
 *    - Smaller bundle size
 *    - Faster load time
 *      (Because everything is loading on the server)
 * 
 * Points to Remember:
 * > By default, Layout and Pages are Server Component.
 * > Whenever you need something related to fetching data, rendering
 *   part of the UI on the server and wanted to cache something, in
 *   that case you should go with server component.
 * > But when you need interactivity or browser API (windows object,
 *   localStorage, DOM Manipulation), we need Client Component.
*/

/**
 * Whenever we are into server component, we can write:
 * 1. Write async keyword:
 *    > export default async function Home() { ... }
 * 2. Use fetch API at the root level
 *    > export default async function Home() {
 *         const res = await fetch('url')
 *         const data = await res.json();
 *         return ()
 *      }
 * 3. Now we can use fetched data on the Server Side:
 *    > export default async function Home() {
 *         const res = await fetch('url')
 *         const data = await res.json();
 *         return (
 *            <p>{JSON.stringify(data)}</p>
 *         )
 *      }
 *    > When we hit the API, we will receive rendered UI + data.
*/

/**
 * Advantage:
 * a. Data fetching happens securely on the server.
 * b. Can directly query databases, call APIs, or read files.
 * c. Reduce JS Shipped to the Client. (JS file is heavy)
 * 
 * Disadvantages:
 * a. Now Browser APIs (e.g., Window, Document)
 * b. No React Hooks like useState, useEffect
 * c. For interactivity, you need Client Components
*/

/**
 * Let's try exploring the response from the server on the /signup route:
 * 1. Run npm run dev
 * 2. Visit http://localhost:3000/signup
 * 3. Notice the response you get back in the HTML file
 *    <div>Hi from the signup page!</div>
 * 
 * > Now if Googlebot tries to scrap your page, it'll understand that this
 *   is a signup page without running any JS.
 * > This first index.html file it get's back will have context about the
 *   page since it was server-side rendered.
*/

/**
 * ReactJS Waterfall Problem:
 * 1. Browser loads HTML
 * 2. Browser loads JS
 * 3. JS runs
 * 4. JS fetches data on browser
 * 5. Finally, shows content!
 * 
 *    Time:   0s ────> 1s ────> 2s ────> 3s
 *    > Step: HTML → JS → Fetch Data → Show Content (Waterfall)
 *    > User sees: ⏳ → ⏳ → ⏳ → ✅
 *      - "Loading..." spinner ⏳
 *      - "Loading..." spinner ⏳
 *      - "Loading..." spinner ⏳
 *      - "Content loaded!"    ✅
*/

/**
 * NextJS Solution: Server Side Rendering (SSR)
 * 1. Browser requests page
 * 2. Server fetches data + creates HTML
 * 3. Browser gets complete page!
 * 
 *    Time:    0s ──────────────────────> 1s
 *    > Step: [Server: Fetch + Build] → Show Content
 *    > User sees: ⏳ → ✅ (Complete page!)
 *      - "Loading..." spinner ⏳
 *      - COMPLETE BLOG LIST! ✅✅✅ 
*/

/**
 * How does Next.js handle this?
 * > SSR pre-renders the page with data, so the browser can show it 
 *   instantly without waiting for the JS to load and run.
 * 
 * [Browser] → [Next.js Server] → [Backend API] → [Next.js Server] → [Browser]
 *     ↓            ↓                  ↓               ↓                ↓
 *  Request      Receives         Fetch data     Renders HTML     Gets COMPLETE
 *   page         request        from external     with real      page with data
 *                                   API            data 
*/



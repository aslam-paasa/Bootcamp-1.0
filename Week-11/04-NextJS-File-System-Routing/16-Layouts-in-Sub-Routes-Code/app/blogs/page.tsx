/**
 * ReactJS Waterfall Problem:
 * 1. Browser loads HTML
 * 2. Browser loads JS
 * 3. JS runs
 * 4. JS fetches data
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

import axios from "axios";

/* API Call: getBlogs */
async function getBlogs() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/")
    return response.data;
}


/**
 * 1. Async Component: This makes Next.js wait for data before sending page
*/
export default async function Blogs() {

    /** 
     * a. Server Does the Heavy Lifting (SSR)
     *    This runs on NEXT.JS SERVER, not in browser!
     *    > Server calls the API
     *    > Waits for data
     *    > Then creates the HTML with real data
     */
    const blogs = await getBlogs();

    /**
     * b. Browser Gets the Complete Page (CSR)
     *    > Browser gets the complete page with real data
     *    > Shows it instantly!
    */
    return <div>
        {blogs.map((blog: ITodo) => <Todo title={blog.title} completed={blog.completed} />)}
    </div>
}

interface ITodo {
    title: string;
    completed: boolean;
}

function Todo({ title, completed }: ITodo) {
    return <div>
        {title} {completed ? "done!" : "not done"}
    </div>
}
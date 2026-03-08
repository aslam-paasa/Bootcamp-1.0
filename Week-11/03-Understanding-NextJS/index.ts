/**
 * Step-1: NextJS Intro, Pre-requisites
*/

/**
 * Pre-requisites:
 * You need to understand basic frontend before proceeding to this track.
 * You need to know what React is and how you can create a simple application
 * in it.
*/

/**
 * NextJS Introduction:
 * NextJS is a powerful framework built on top of React that addresses several
 * key limitations:
 * 
 * 1. Unified Backend & Frontend:
 *    - React requires maintaining separate projects for frontend and backend
 *      APIs.
 *    - NextJS allows you to build both in a single codebase, simplifying 
 *      development
 * 
 * 2. Built-in Routing:
 *    - React has no native routing system
 *    - You need external libraries like react-router-dom
 *    - NextJS comes with an intuitive file-based routing system
 * 
 * 3. Enhanced SEO Capabilities:
 *    - Traditional React apps can be challenging for search engines to index
 *    - While React now has Server Components (SSR), NextJS offers more 
 *      comprehensive SEO optimization out of the box.
 *    - This is why many companies use:
 *      • HTML or NextJS for public-facing pages (landing pages, marketing sites)
 *      • React for internal tools (dashboards, admin panels)
 * 
 * 4. Solves the Waterfall Problem
 * 
 * Let's discuss some of these problems in the next slides:
*/

/**
 * Step-2: SEO Optimization in NextJS
 * 1. What is SEO?
 *    - When you search something on Google, it shows you relevant websites
 *    - To decide which websites are relevant, Google uses "crawlers"
 * 
 * 2. How do crawlers work?
 *    - They are like robots that visit websites
 *    - They read the first HTML content of the website they visit (main page)
 *    - They rank websites based on this content
 * 
 * 3. What's the problem?
 *    - In React apps, most content is generated using JavaScript
 *    - Crawlers only look at HTML, they don't run JavaScript
 *    - That's why React apps don't get good rankings on Google
 * 
 * 4. NextJS Solution:
 *    - Generates complete HTML on the server before sending
 *    - Crawlers can see all the content immediately
 *    - Results in better SEO rankings
*/

/**
 * Try to visit a react website:
 * What does the Googlebot get back when they visit a website written in
 * React?
 * - Visit: https://blog-six-tan-47.vercel.app/signup
 * - Googlebot has no idea on what the project is. It only sees title:
 *   Vite + React + TS in the original HTML response, because dynamic
 *   content is loaded after the initial HTML is loaded using JS in an
 *   empty div, we know Googlebot doesn't run JS.
 * - Ofcourse, when the JS file loads eventually, things get rendered but
 *   the GoogleBot doesn't discover this content very well.
*/


/**
 * Step-3: Waterfall Problem
 * 
 * Let's understand the waterfall problem with a real example. Imagine you're
 * building a blog website in React. When a user visits the website, these 
 * steps occur:
 * 
 * Client                Server                  Database
 * |                     |                       |
 * |--Request page------>|                       |
 * |<---Empty HTML-------|                       |    Step 1: Empty HTML
 * |                     |                       |    (Just div#root)
 * |--Request JS bundle->|                       |
 * |<---JS bundle--------|                       |    Step 2: All React code
 * |                     |                       |    (Usually 1-2MB size)
 * |--Request data-------|                       |
 * |                     |--Query database------>|    Step 3: DB call for 
 * |                     |<----Blog data---------|    blog posts
 * |<---Blog data--------|                       |
 * |                     |                       |
 * |-Render content      |                       |    Step 4: Finally content
 * |                     |                       |    is visible
 * 
 * a. Fetching the index.html from CDN (empty HTML)
 * b. Fetching script.js from CDN (all react code)
 * c. Checking if user is logged in(if not, redirect to login page)
 * d. Fetching the actual blogs (DB call)
 * e. Rendering the content (UI)
 * Total time = Step 1 + Step 2 + Step 3 + Step 4 + Step 5 
 * [One after another, not in parallel]
 * 
 * 
 * Understanding the Problems with React's Waterfall - And Their Reasons:
 * 
 * 1. Why Such a Slow Experience?
 *    Problem:
 *    - Each step happens one after another, like a waterfall
 *    - First empty HTML arrives
 *    - Then JS bundle downloads (1-2MB size!)
 *    - Then data comes from database
 *    - Finally UI renders
 *    
 *    Reason:
 *    - This is how React is designed - it uses client-side rendering
 *    - Browser must first download the entire React library
 *    - Then this library needs to execute
 *    - Only then can we fetch data
 * 
 * 2. Slow Global Performance:
 *    Problem: Imagine you build a website
 *    1. You keep your frontend code (HTML, CSS, React) and backend logic 
 *       (APIs, database queries, authentication) on one central server 
 *       (e.g., in the US).
 *    2. Now, if someone from India, Japan, or Africa opens your site — their 
 *       request has to travel all the way to the US server and then come back.
 *    > This makes the website slow for global users.
 * 
 * 
 * 2. Why is User Experience So Poor?
 *    Problem:
 *    - Initially shows blank page
 *    - Then loading spinner appears
 *    - User has to wait
 *    
 *    Reason:
 *    - This is React's hydration process
 *    - Empty HTML loads first
 *    - Then JS loads
 *    - React components can only be created after JS loads
 *    - Until then, user sees blank page
 * 
 * 3. Why Resource Wastage Happens?
 *    Problem:
 *    - Must download entire JS bundle (1-2MB!)
 *    - Even to view just one page, all code comes
 *    
 *    Reason:
 *    - React doesn't have default code splitting
 *    - All JavaScript gets packed into one bundle
 *    - That's why even small tasks need big bundle downloads
 * 
 * 
 * How NextJS Solved These Problems?
 * 1. Server-side Rendering: 
 *    - Creates HTML on server before sending
 *    - User sees content immediately
 * 
 * 2. Automatic Code Splitting:
 *    - Creates separate bundles for each page
 *    - Sends only necessary code
 * 
 * 3. Static Generation:
 *    - Creates pages at build time
 *    - Provides instant response to user
 * 
 * 4. Edge Network/Serverless:
 *    > To solve this, companies like Vercel, Cloudflare, AWS introduced 
 *      something called Edge Servers.
 *    > Think of them as:
 *      "Mini servers placed all around the world, near the users."
 *      a. Instead of only one central server, your website code gets copied
 *         and deployed to all these edge servers.
 *      b. Now, when a user visits your site, their request doesn’t need to 
 *         travel across the globe — it’s served from the nearest edge server.
 * 
 *    > Next.js Magic:
 *      Here's where Next.js makes things easy. When you write code in Next.js:
 *      a. Frontend Code(UI, React pages, CSS) still runs inside the browser 
 *         as usual.
 *      b. Backend Code(APIs, database queries, server-side logic) 
 *         automatically deploys this to the edge servers.
 *      - That means your backend logic is available everywhere in the world, 
 *        super close to users.
 *      - Browser(user) > talks to > Nearest Edge Server > talks to -> DB
 * 
 * This is how NextJS transformed React's waterfall into an efficient fountain!
*/

/**
 * Step-4: Next.js offerings:
 * Next.js provides the following upsides over React:
 * 
 * a. Server Side Rendering - Solves SEO problems
 *    - What happens in React:
 *      • Initially only gets an empty HTML file
 *      • Along with it comes HTML/CSS/JS bundle
 *      • This bundle is served from CDN
 *      • Browser needs to download JS first
 *      • Then JS executes
 *      • Only then UI appears
 *      • Search engines only get empty HTML = Poor SEO
 *    
 *    - What happens in Next.js:
 *      • Dedicated next.js server runs 24x7, instead of the browser
 *      • When request comes, it first goes to the next.js server, and then
 *        JS logic executes on server, so that it can fetch the data from the
 *        backend server, render the data and return it to the frontend.
 *      • Server fetches real data from backend
 *      • Complete HTML page is generated on the server itself
 *      • Browser gets ready-made HTML = Better SEO
 *      • User sees instant content
 *      • Page becomes interactive after JS loads
 * 
 * b. API Routes - Frontend and Backend in one place!
 *    - What's the problem in React?
 *      • Frontend code in separate folder
 *      • Backend code in separate folder
 *      • Hard to manage both
 *      • Need extra setup to send data from frontend to backend
 *    
 *    - What's good in Next.js?
 *      • Frontend and backend code in same project
 *      • Can write backend code in special API folder
 *      • Very easy to fetch data
 *      • Need to run only one server, not two
 * 
 * c. File based routing (no need for react-router-dom)
 *    - In React, you need to install a separate library for routing
 *    - In Next.js, routing is super simple - just create folders and files!
 *    - Example:
 *      • For homepage: pages/index.js
 *      • For about page: pages/about.js
 *      • For contact page: pages/contact.js
 *    - The routes are created exactly how you structure your folders
 *    - No extra code or setup needed
 *    - It's that simple and straightforward!
 * 
 * d. Bundle size optimizations, Static Site Generation
 *    - In React, you need to pack all your code into one big file
 *      (like packing one big suitcase)
 *    - In Next.js, you can create pages beforehand
 *      (like printing newspaper copies in advance)
 *    - This makes your website load super fast because:
 *      • Files become smaller
 *      • Pages are ready to go
 *      • Users don't have to wait
 * 
 * e. Edge Network:
 * 
 * f. Maintained by the Vercel team
 * 
 * Downsides:
 * a. Can't be distributed via a CDN, always needs a server running that
 *    does server side rendering and hence is expensive.
 * b. Very opinionated, very hard to move out of it.
*/

/**
 * Topics to be covered:
 * 1. NextJS vs React
 * 2. CSR vs SSR
 * 3. SEO Optimizations
 * 4. File Based Routing (App Router)
 * 5. "use client" directive
 * 6. Backend routes in NextJS
 * 7. Data fetching in NextJS
 * 8. Async Components, Server Components 
 * 9. () - Route Groups
 * 10. [] - Dynamic Segment
 * 11. [...] - Catch-All Segment
 * 12. Middlewares in NextJS
 * 13. Static Site Generation (SSG)
 * 14. Hydration in NextJS
*/







/**
 * Pre-requisites:
 * > You need to understand basic Frontend before proceeding to this track.
 * > You need to know what React is and how you can create a simple app
 *   in it. 
*/

/**
 * Step-1: NextJS Intro
 * > NextJS was a framework that was introduced because of some 'minor
 *   inconveniences' in React.  
 *   1. In a React Project, you have to maintain a separate backend project
 *      for your API routes
 *      a. React  -> Frontend, NodeJS -> Backend
 *      b. NextJS -> Frontend + Backend
 *   2. React does not provide out of the box routing (you have to use
 *      react-router-dom)
 *      > React => Full Stack Frontend (react + react-dom + react-router-dom)
 *        - mobile : react-native
 *        - web    : react-dom
 *        - routing: react-router-dom
 *      > NextJS   : In-built routing 
 *   3. React is not SEO Optimized
 *      a. not exactly true today because of React Server Components
 *      b. we'll discuss soon why
 *   4. Waterfalling Problem
*/

/**
 * Step-2: SEO Optimization
 * > Google/Bing has a bunch of 'crawlers' that hit websites and figure out
 *   what the website does.
 * > It ranks it on 'Google' based on the HTML it gets back.
 * > The crawlers DONT usually run your JS and render your page to see the
 *   final output.
 *   (While Googlebot can run JS, dynamically generated content is harder
 *    for the scraper to index)
 * 
 * Example: Try visiting a react website
 * Q. What does the Googlebot get back when they visit a website written in
 *    react?
 * 
 *    <html lang="en">
 *    <head>
 *      <meta charset="UTF-8">
 *      <meta name="viewport" content="width=device-width, initial-scale=1.0">
 *      <title>Vite + React + TS</title>
 *      <script type="module" src="/src/main.tsx"></script>
 *    </head>
 *    <body>
 *      <div id="root"></div>
 *    </body>
 *    </html>
 * 
 * > Googlebot has no idea on what the project is. It only sees:
 *  Vite + React + TS in the original HTML response.
 * > Ofcourse when the JS file loads eventually, things get rendered but the
 *   Googlebot doesn't discover this content very well.
*/

/**
 * Step-3: Waterfalling Problem
 * > Let's say you built a blogging website in React, what steps do you think
 *   the 'request cycle' takes?
 *   1. Browser: Hey, Can I have the main page?
 *      Server : Here's index.html
 *   2. Browser: Now I need the JS Code
 *      Server: Here's script.js
 *   3. JS    : Is user logged in? Let me check... 
 *      Server: Checking... Yes/No
 *   4. JS    : Okay, now get me the blog posts!
 *      Server: Here are the blog!
 * 
 * > Each step has to wait for the previous one to finish
 *   Time: 0s ────> 1s ────> 2s ────> 3s ────> 4s
 *   Step: HTML → JS → Login Check → Blogs → SHOW PAGE
 * > This is called the 'Waterfalling Problem'.
 * 
 * > Waterfalling means that each step has to wait for the previous one to 
 *   finish before it can start.
*/

/**
 * Step-4: NextJS Offering:
 * 
 * +---------+ index.html         +-------------+
 * |         |------------------->|             |
 * |         |  has all the blogs |             |
 * | Browser |<-------------------| Next Server |
 * |         |  /asset/script.js  |             |
 * |         |------------------->|             |
 * |         |<-------------------|             |
 * +---------+                    +-------------+
 * 
 * NextJS provides you the following 'upsides' over React:
 * 1. Server Side Rendering (SSR) - Get rid of SEO problems
 *    a. Traditional React: Search Engine see empty page
 *       <div id="root"></div>
 *    b. NextJS: Search Engines can see full content
 *       <div>
 *         <h1>My Awesome Blog</h1>
 *         <article>Complete Blog Content</article>
 *       </div>
 *    > Google can read your content immediately = Better Ranking!
 * 
 * 2. API Routes - Single codebase with both frontend and backend
 *    > Your Project Folder:
 *       /pages
 *         ├── index.js       # Frontend
 *         ├── blogs.js       # Frontend  
 *         └── api/
 *             ├── blogs.js   # Backend API
 *             └── users.js   # Backend API
 *    > No more separate frontend/backend! Everything lives together. 
 *    
 * 3. File Based Routing - No need for react-router-dom
 *    a. Old Way (React Router Dom):
 * 
 *       import { Routes, Route } from 'react-router-dom';
 *       <Routes>
 *         <Route path="/" element={<Home/>}/>
 *         <Route path="/blogs" element={<Blogs/>}/>
 *       </Routes>
 * 
 *    b. Next.js Way: Just create files!
 * 
 *       /pages/index.js     → mysite.com/
 *       /pages/blogs.js     → mysite.com/blogs
 *       /pages/about.js     → mysite.com/about
 * 
 *      > This makes it very difficult to move from one framework to another.
 * 
 * 4. Bundle Size Optimization, Static Site Generation (SSG)
 *    > Bundle Splitting: Only load code you need
 *    > Image Optimization: Automatically compress images
 *    > Static Generation : Pre-build pages for lightning fast loading
 * 
 * 5. Maintained by the Vercel Team
 * 
 * Downsides:
 * 1. Can't be distributed via a CDN, always needs a server running that does
 *    'server side rendering' and hence is expensive.
 * 2. Very opinionated, very hard to move out of it.
*/

/**
 * Step-5: How to get started with NextJS?
 * 1. Command to create a new NextJS project: 
 *    > npx create-next-app@latest <project-name>
 * 
 * 2. Folder Structure: (4 folders + 10 files)
 *    a. .next folder: 
 *       > This is made when we click npm run dev
 *       > They cached our application inside this folder.
 *    b. app folder:
 *       > Our actual application resides inside this
 *         a. favicon.ico
 *         b. layout.tsx
 *         c. page.tsx
 *    c. node_modules folder:
 *       > Contains all the dependencies and devDependencies installed 
 *         files.
 *    d. public folder:
 *       > contains icons, images, etc.
 *    e. .gitignore:
 *       > Keep all the paths and name of the file that we don't want to
 *         push inside our repository.
 *    f. eslint-config.mjs
 *       > This is for linting our application.
 *    g. next.config.js:
 *       > NextJS Configuration files where we can enable and disable
 *         some extra configs.
 *    h. postcss.config.mjs:
 *       > It handles the tailwind configuration
 *    i. tsconfig.json:
 *       > It handles the typescript configuration
 * 
 * 3. Folder and File Conventions in NextJS:
 *    a. Top Level Folders
 *       > Used to organize your application's code and static assets.
 *         - app   : App Router
 *         - pages : Pages Router
 *         - public: Static assets to be served
 *         - src   : Optional application source folder
 *       > Ex: app           src
 *             pages           app
 *             public          pages
 *             ...           public
 *                           ...
 *    b. Top Level Files:
 *       > Used to configure your application, manage dependencies, run
 *         middleware, integrate, monitoring tools, and define environment
 *         variables.
 *         - next.config.js: Config file for Next.js
 *         - package.json  : Project dependencies and scripts
 *         - middleware.ts : Next.js request middleware
 *         ....
 *    
 *    c. Routing Files:
 *       > Next.js uses file based routing inside the app/ folder.
 *       > Each folder = a route
 *       > Each special file = special behavior
 *         - page.tsx     : Page for route
 *         - layout.tsx   : Shared common layout b/w UI
 *         - loading.tsx  : Loading UI, while fetching data
 *         - error.tsx    : Error Boundary
 *         - not-found.tsx: 404 Not Found
 *         - route.tsx    : API Routes 
 * 
 * 4. Bootstrap the Project:
 *    a. Remove everything from app/page.tsx and return an empty div
 *    b. Remove the css bits (not the tailwind headers) from the global.css
*/


/**
 * Step-7: Server Side Rendering (SSR)
*/


/**
 * Step-8: Layouts
*/


/**
 * Step-10: Layouts in Sub-Routes
*/


/**
 * Step-11: Merging Routes
*/


/**
 * Step-12: Components Directory
*/


/**
 * Step-13: Add a button onclick handler
*/


/**
 * Step-14: Client and Server Components
*/
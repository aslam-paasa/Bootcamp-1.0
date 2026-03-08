/**
 * 1. What problem are you solving?
 *    > On the web, we do two very common things:
 *      a. Navigate b/w pages
 *      b. Load JS files
 *    > Traditionally, we use:
 *      - <a> for navigation
 *      - <script> for JS
 *    > But in modern apps, this is not enough
 * 
 * 2. The old way: <a> tag?
 *    > Ex: <a href="/about">About</a>
 *    > What happens?
 *      a. Browser req a new page
 *      b. Full page reload
 *      c. All JS reloads
 *      d. UI resets
 *    > Problems:
 *      - Slower navigation
 *      - Feels old-school
 *      - Breaks app-like experience
 * 
 * 3. Next.js Link: What it really is
 *    > Link is a smart replacement for <a>.
 *    > Think like this:
 *      - <a> = full reload
 *      - <Link> = instant client-side navigation
 * 
 * 4. What makes Link special?
 *    > Link gives you:
 *      - Client-side navigation
 *      - No full page reload
 *      - Preserves app state
 *      - Automatic prefetching
 *      - Faster UX (SPA-like)
 *    > Same web, much smoother experience
 * 
 * 5. What is Prefetching?
 *    > Prefetching means:
 *      - Next.js loads the next page in the backgound
 *      - Before the user clicks the link
 *    > So when user clicks:
 *      - Page is already ready
 *      - Navigation feels instant
 *    > <a> can't do this. Link can.
 * 
 * 6. When should you use Link?
 *    > Use Link for:
 *      - Internal navigation
 *      - Pages inside your app
 *      - Dashboards
 *      - Blogs
 *      - Any route handled by Next.js
 *    > Rule:
 *      - Internal Link : Link
 *      - External Link : <a>
 * 
 * 7. Common Mistakes:
 *    > Using <a> for internal pages
 *    > Expecting full reload behavior
 *    > Forgetting that prefetch is automatic
 *      (If the page is inside your app, use Link)
*/

/**
 * Script:
 * 1. The Old Way: <script> tag (problems)
 *    > Traditional script: <a href="/about">About</a>
 *    > Problems:
 *      - Blocks page rendering
 *      - Hard to control load timing
 *      - Can slow down page badly
 *      - Easy to mess up performance
 * 
 * 2. Next.js Script: Why it exists
 *    > Script lets you control:
 *      - When a script loads
 *      - How it affects performance
 *      - Where it runs
 *    > Think like this:
 *      - <script> = uncontrolled
 *      - <Script> = performance-aware
 * 
 * 3. Script Loading Strategies 
 *    > Next.js gives strategies for loading scripts.
 *      a. Before Interactive:
 *         - Loads early
 *         - Needed for critical scripts
 *      b. After Interactive (Most Common)
 *         - Loads after page is interactive
 *         - Best for analytics. tracking
 *      c. Lazy Onload
 *         - Loads when browser is idle
 *         - Best for non-essential scripts
 *           (You choose based on importance)
 * 
 * 4. Why this matters for performance
 *    > Bad script loading:
 *      - slows first paint
 *      - hurts Core Web Vitals
 *      - Frustrate users
 *    > Good script strategy
 *      - Faster page load
 *      - Better SEO
 *      - Smooth Experience
 *    > Script helps you win performance by default
 * 
 * 5. Link vs Script (diff Jobs, Same goal)
 *    a. Link  : Fast Navigation
 *    b. Script: Smart JS loading
 *    c. Goal  : Better UX & Performance
 * 
 *    > Both exist to make your app:
 *      - Faster
 *      - Smoother
 *      - More professional
 * 
 * 6. Easy Mental Model:
 *    > Think like this:
 *      - <a>      : reloads page
 *      - <Link>   : instant navigation
 *      - <script> : blocks pages
 *      - <Script> : loads smartly
 *    > Once this clicks, you'll never go back
 * 
 * Summary:
 * Next.js Link and Script go beyond basic HTML by enabling instant 
 * navigation, automatic prefetching, and smart script loading — giving
 * your app SPA-like speed without sacrificing performance.
*/

import React from 'react'

const page = () => {
  return (
    <div>
      Next.js Link & Scripts
    </div>
  )
}

export default page
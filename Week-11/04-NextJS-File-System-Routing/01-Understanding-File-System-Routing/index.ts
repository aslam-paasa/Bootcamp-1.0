/**
 * What is Router in NextJS? 
 * > A Router provides user the ability to move between different pages
 *   in your applications.
 * > NextJS used File Based Routing, so we don't have to do anything
 *   manually. 
 * > Our folder structure defines the route.
 * 
 * Two types of Router in NextJS:
 * a. Page Router
 * b. App Router
 * 
 * App Router vs Page Router? 
 * a. Page Router:
 *    > Page Router is the older way in NextJS.
 *    > Ex: pages/about.jsx 
 *          yourdomain.com/about 
 *    > Works with Next.JS 12 older but still supported in NextJS 13+
 * 
 * b. App Router:
 *    > App Router is the latest approach
 *    > It is based on app directory (/app)
 *    > It support react server component
 *    > It support server actions
 *    > They are more modern and designed for scalability
 *    > So, if we wanted to build application for millions of users 
 *      then NextJS App Router is best approach.
 * 
 * Which one to choose?
 * 1. App Router:
 *    a. New Project (App Router)
 *    b. Modern Features (App Router)
 *    c. Performance and Scalability 
 * 2. Page Router:
 *    a. You are maintaining an older project.
 *    b. You want a simple and familiar approach.
 *    c. Your team is not ready to move to modern approach.
*/

/**
 * Types of Folders & Files in NextJS:
 * 1. Static Routes: 
 *    > Ex: /about, /contact
 * 
 * 2. Dynamic Routes:
 *    > Whenever we want to pass some dynamic data into the route.
 *    > Ex: Unique data for each user: /user/[id]/page.tsx
 * 
 * 3. Catch All Routes:
 *    > Enhanced version of dynamic route
 *    > Ex: /docs/[.]
 * 
 * 4. Route Groups ():
 *    > Helps to organize without affecting the URL
 *    
 * 5. Parallel Routes
 * 
 * 6. Intercepting Routes
*/
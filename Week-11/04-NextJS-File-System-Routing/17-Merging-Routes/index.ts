/**
 * Merging Routes:
 * > What if you want to get the banner in both signup and signin?
 * 
 * > Approach-1: 
 *   Move both the 'signin' and 'signup' folder inside a 'auth' folder where
 *   we have the layout:
 *   > app
 *     > auth
 *       > signup
 *       > signin
 *       - layout.tsx (Applied to both signup and signin)
 *     
 *    You can access the routes at:
 *    - http://localhost:3000/auth/signup 
 *    - http://localhost:3000/auth/signin 
 *
 * > Approach-2: 
 *   You can use create a new folder with () around the name.
 *   This folder is ignored by the router.
 * 
 *   > app
 *     > (auth)
 *       > signup
 *       > signin
 *       - layout.tsx (Applied to both signup and signin)
 * 
 *    You can access the routes at:
 *    - http://localhost:3000/signup 
 *    - http://localhost:3000/signin 
*/ 
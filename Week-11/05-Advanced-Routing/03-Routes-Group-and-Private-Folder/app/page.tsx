/**
 * Advanced Routes:
 * 4. Route Groups & Private Folders 
 *    > A route group is a way to organize without affecting the url 
 *      structure
 *    > You define a route group with parantheses ()
 *      1. Organizing routes into sections (e.g., (auth) (dashboard))
 *      2. Sharing layouts across multiple routes without adding the url
 * 
 *    Private Folders:
 *    > A private folder is a folder that next.js ignore in the routing
 *      system
 *    > You can define it with an underscore _
 *    > It is useful for storing components, utils, configs
 *    > This is not going to show the url, preventing accidental routes
*/


export default function Home() {
  return (
    <div>Routes Group & Private Folders</div>
  );
}

/**
 * Server Components:
 * > By default, Layout and Pages are Server Component, which let you
 *   fetch data and render part of your UI on the server.
 * > Optionally cache the result and stream it to the client.
 * > But when you need interactivity or browser API (windows object,
 *   localStorage, DOM Manipulation), we need Client Component.
 * > So, whenever you need something related to fetching data, rendering
 *   part of the UI on the server and wanted to cache something, in
 *   that case you should go with server component. Otherwise we can
 *   go with Client Component.
 * 
 * What is Server Component?
 * a. Default type of Component in NextJS App Router.
 * b. They are rendered on the server, not on the browser.
 * c. The output is static html + minimal js (if needed).
 * d. Great for performance 
 *    - Smaller bundle size
 *    - Faster load time
 *      (Because everything is loading on the server)
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

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="space-y-4">
        <Link href="/signin" className="block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          Sign In
        </Link>
        <Link href="/signup" className="block px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
          Sign Up  
        </Link>
        <Link href="/blogs" className="block px-6 py-3 text-lg font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 border border-gray-300 transition-colors">
          View Blogs
        </Link>
      </div>
    </div>
  );
}

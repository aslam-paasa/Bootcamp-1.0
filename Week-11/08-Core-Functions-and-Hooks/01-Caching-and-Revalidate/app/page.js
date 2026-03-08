/**
 * Extended Fetch API in Next.js API:
 * 1. Next.js mai Fetch normal React jaisa nhi hai
 * 2. Next.js fetch ke saath:
 *    > caching
 *    > revalidation
 *    > multiple API calls
 *    > performance optimization
 *    Ye sb automatically milta hai, aur ye sab milke kehlata hai
 *    Extended Fetch API
*/

/**
 * Fetch Strategy:
 * > Teen API calls ek saath hoti hai
 * > Time save hota hai
 * > Fast rendering
 * > Best Practice:
 *   - Multiple independent fetches → always use Promise.all
*/

/**
 * Strategy-1: cache: "no-store" (always fresh)
 * > Koi cache nhi
 * > Har request pe API hit hogi
 * > Page becomes dynamic
 * > Means: "Mujhe har baar fresh data chahiye"
 * > Use Cases:
 *   - Logged-in user data
 *   - Dashboard
 *   - Notification
 */

/**
 * Strategy-2: cache: "force-cache" (permanent cache)
 * > Data ek baar fetch hoga
 * > Cache me store ho jayega
 * > Har user ko same data milega
 * > Means: Ye data rarely change hota hai
 * > Use Cases:
 *   - Blogs
 *   - Docs
 *   - Static Content
 * > Ye SSG jaisa behave karta hai
*/

/**
 * Strategy-3: revalidate (smart caching)
 * > Data cache hota hai
 * > 5 seconds ke baad stale ho jaata hai
 * > Background me fresh data aa jaata hai
 * > Means: "Fast bhi chahiye + thoda fresh bhi"
 * > Use Cases:
 *   - Products List
 *   - Feeds
 *   - Semi-dynamic data
 * > Ye ISR (Incremental Static Regenration) hai
*/


import { redirect } from "next/navigation";

export default async function Home() {

  const isLogged = true;

  if (!isLogged) {
    return redirect('/login')
  }


  const [fresh, cached, revalidated] = await Promise.all([

    fetch('http://localhost:3000/api/timer/utc', {
      cache: 'no-store'
    }).then(res => res.json()),

    fetch('http://localhost:3000/api/timer/iso', {
      cache: 'force-cache'
    }).then(res => res.json()),

    fetch('http://localhost:3000/api/timer/local', {
      next: { revalidate: 5 }
    }).then(res => res.json())
  ])

  return (
    <div>
      <h1>Timer Comparison</h1>

      <div style={{ border: '1px solid red', padding: '10px', margin: '10px' }}>
        <h3>Fresh Timer (no-store)</h3>
        <p>Time: {fresh.time}</p>
        <p>Request ID: {fresh.requestId}</p>
      </div>

      <div style={{ border: '1px solid blue', padding: '10px', margin: '10px' }}>
        <h3>Cached Timer (force-cache)</h3>
        <p>Time: {cached.time}</p>
        <p>Request ID: {cached.requestId}</p>
      </div>

      <div style={{ border: '1px solid green', padding: '10px', margin: '10px' }}>
        <h3>5-Second Revalidate</h3>
        <p>Time: {revalidated.time}</p>
        <p>Request ID: {revalidated.requestId}</p>
      </div>
    </div>
  );
}

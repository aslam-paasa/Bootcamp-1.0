/**
 * Advanced Routes:
 * 7. Unmatched Routes:
 *    > In parallel routes, each slots @slotname expects to load a page
 *      from a matching url, but if the route doesn't match any slot
 *      that slot will be unmatched.
 *    > Instead of breaking the UI, nextjs provided fallback UI i.e. 
 *      default.js. 
*/


export default function Home() {
  return (
    <div>Unmatched Routes and Default Page Convention</div>
  );
}

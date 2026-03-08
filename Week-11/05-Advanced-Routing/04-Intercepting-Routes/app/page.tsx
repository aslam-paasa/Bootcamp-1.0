/**
 * Advanced Routes:
 * 5. Intercepting Routes
 *    > It lets you show a page inside the current layout (like a modal
 *      or drawer) instead of navigating away completely.
 *    > For example, when clicking on a photo in a feed, you can display
 *      the photo in a modal, overlaying the feed. 
 *    > Next.js intercepts the /photo/123 route, maskes the URL, and
 *      overlays it over /feed.
 *    > It gives:
 *      a. Better UX
 *      b. Shareable URLs - Modals views have unique url that work
 *         standalone as well
 *      c. Consistency
 *    > Real World Example:
 *      a. Login/Signup 
 *      b. Gallery
 *      c. Side Panels
 *      d. Quick Preview without losing the context
 * 
 *    Levels of Intercepting Routes:
 *    1. Same Level   (.)
 *    2. One Level Up (..)
 *    3. Two Level Up (..)(..)
 *    4. From Root    (...)
*/


export default function Home() {
  return (
    <div>Routes Group</div>
  );
}

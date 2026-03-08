/**
 * Advanced Routes:
 * 2. Catch All Routes & Optional Catch-All Routes:
 *    > Let's say you are building a Docs App, and inside that docs app
 *      we are going to have a lot of features. And each feature is
 *      going to have further concepts related to that:
 *    > docs
 *         feature-1
 *            concept-1
 *            concept-2
 *            concept-3
 *            concept-4
 *            concept-5
 *         feature-2
 *            concept-1
 *            concept-2
 *            concept-3
 *            concept-4
 *         feature-3
 *            concept-1
 *            concept-2
 *            concept-3
 *    > Suppose, 5 feature -> 10 features -> 50 pages, but instead of
 *      creating static features and concept, we are going to use
 *      dynamic routing: featureid/conceptid, which will reduce from
 *      50 pages to 2 pages.
 *    > If we want to make it more nested like feaureid/conceptid/example1,
 *      things are going to be too much nested, so instead of using our
 *      nested dynamic route concept, we are going to use catch-all
 *      segment.
 * 
 *    > Catch-All Segment allows you to capture multiple parts of the
 *      url into a single parameter.
 *    > Syntax: [...param]
 *              /docs/nextjs -----> params -> "nextjs"
 *              /docs/nextjs/routing
 *              /docs/nextjs/routing/dynamic/example/demo -----> 
 *    > But there is one problem: 
 *      If we visit only /docs, it will show 404: page cannot be found.
 *      but we have enhanced version of Catch-All Route called Optional
 *      Catch-All-Routes.
 * 
 * 3. Optional Catch-All Routes:
 *    > Sometimes we want to route the work even if no slug or dynamic
 *      data is not provided, in that case we will change it from:
 *      [...slug] -> [[...slug]]
 *    
*/

import Link from "next/link";

export default function Home() {
  return (
    <div>Catch All Routing</div>
  );
}

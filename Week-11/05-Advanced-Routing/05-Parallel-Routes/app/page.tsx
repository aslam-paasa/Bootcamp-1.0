/**
 * Advanced Routes:
 * 6. Parallel Routes
 *    > Let you render multiple pages or layout at the same time, 
 *      side-by-side inside one layout.
 *    > You define "slots" where different routes will render
 *    > Each slot can have its own navigation, state, error-boundaries,
 *      even be conditionally.
 *    > Real World Example:
 *      a. Dashboard with multiple panels
 *      b. Tabbed Navigation
 *      c. Master Detail View
 *    > For example, in leetcode we have seen splitted layout:
 *      - Left Hand Side : Problem Statements
 *      - Right Hand Side: Code Editor + Test Case
 *      So, in a single layout we are rendering multiple sections 
 *      together.
*/


export default function Home() {
  return (
    <div>Parallel Routes</div>
  );
}

/**
 * Exercise: Making a Private Page in Next.js
 * > Learn how to make a page "private" (not directly accessible in the 
 *   browser) using a special folder naming trick in Next.js.
 *
 * What does "private page" mean?
 * > Normally, pages go in the "app" folder and are public (anyone can visit).
 * > Sometimes, we want a page to only be accessible by certain people,
 *   or to "hide" its URL from public access directly.
 *
 * Next.js Trick:
 * > Any folder that starts with an underscore (_) is treated as private
 *   route group.
 * > Pages inside it:
 *   a. cannot be accessed directly via URL
 *   b. can still be imported and used internally
 * 
 * Steps to try:
 * 1. Create a folder with an underscore in its name, like "_product":
 *    > Example: app/_product/page.tsx
 *    > The underscore makes it a "private" route group in Next.js,
 *      and it won't be accessible directly in the browser.
 * 2. Move the page you want to keep private into that folder.
 * 3. Try to visit: http://localhost:3000/_product
 *    > You should NOT see the page! It's "private" now.
 */

const HomePage = () => {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>🏠 Home Page</h1>
        <p style={{ marginTop: "1rem", color: "#555", lineHeight: "1.6" }}>
          This is the <strong>public</strong> home page. <br />
          To create a <strong>private page</strong>, follow the instructions in the comment above!
        </p>
      </div>
    );
  };

export default HomePage;

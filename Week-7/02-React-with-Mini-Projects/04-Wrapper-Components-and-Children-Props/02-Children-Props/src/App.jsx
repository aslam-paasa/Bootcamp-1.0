/**
 * TOPIC: The children Prop
 * 
 * The children prop lets you pass elements or components
 * INSIDE another component — just like how you put content
 * between HTML tags.
 *
 * The question we are answering here:
 * Can we create ONE generic Card component where the outer
 * structure is always the same, but the inner content is
 * different every time we use it?
 *
 * Yes — and that is exactly what the children prop solves.
 */

import PropTypes from "prop-types";


/**
 * THE PROBLEM — Why do we need this?
 * 
 * Imagine you are building a social media app.
 * You have many different types of cards on the screen:
 *   - A "Create Post" card → has a text input inside
 *   - A "Welcome" card     → has a greeting message inside
 *   - A "Profile" card     → has user name and photo inside
 *
 * ALL of these cards look the same from the outside:
 *   → same white background
 *   → same rounded corners
 *   → same topbar at the top
 *   → same bottombar at the bottom
 *
 * Only the INSIDE content is different.
 *
 * Bad approach: copy the outer card structure into every
 * card type. If you want to change the border radius later,
 * you have to update 10 different places.
 *
 * Good approach: write the outer structure ONCE in a Card
 * component and pass the inner content via children prop.
 * Change it once → every card in the whole app updates.
 */


/**
 * HOW children WORKS — Before we write the component
 * 
 * You already know how to pass a prop like this:
 *   <Card title="Hello" />
 *
 * children is the same idea, but instead of writing it as
 * an attribute, you write it BETWEEN the opening and closing tags:
 *
 *   <Card>
 *     <p>Hello</p>     ← this becomes the children prop
 *   </Card>
 *
 * Inside the Card component, you just write {children} wherever
 * you want that content to appear.
 *
 * We could have named this prop "innerContent" and passed it
 * like this:
 *   <Card innerContent={<p>Hello</p>} />    ← works but looks ugly
 *
 * React has "children" as a built-in special prop name so that
 * you can write it the clean way — between the tags.
 *   <Card><p>Hello</p></Card>               ← clean and natural
 */


/**
 * THE CARD COMPONENT
 * 
 * Card has two parts:
 *
 * STATIC part → written directly inside Card, same every time:
 *   - white background, rounded corners, padding, margin
 *   - "Upper topbar" text at the top
 *   - "Lower bottombar" text at the bottom
 *
 * DYNAMIC part → comes from whoever uses Card:
 *   - {children} → renders whatever was placed between <Card> tags
 *
 * Think of it like a burger:
 *   Top bun    = "Upper topbar"   → always the same
 *   Filling    = {children}       → different every time
 *   Bottom bun = "Lower bottombar"→ always the same
 *
 * PropTypes:
 * PropTypes.node.isRequired means Card MUST receive children.
 * If someone writes <Card /> with nothing inside, they get
 * a warning in the console. PropTypes.node accepts anything
 * renderable — plain text, HTML elements, or other components.
 */
function Card({ children }) {
  return (
    <div style={{
      background: "white",
      borderRadius: 10,
      padding: 10,
      margin: 10,
    }}>
      {/* Always rendered at the top of every card */}
      <div>Upper topbar</div>

      {/* This is where the dynamic inner content goes.
          Whatever is written between <Card> and </Card>
          in App.jsx will appear here. */}
      {children}

      {/* Always rendered at the bottom of every card */}
      <div>Lower bottombar</div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};


/**
 * ============================================================
 * APP — Same Card, different children each time
 * ============================================================
 * Look at how we use Card:
 *   - The outer structure (topbar, white box, bottombar) is
 *     identical in both cards — we only wrote it once in Card.
 *   - The content between the tags is completely different.
 *   - If we change Card's background from white to lightgray,
 *     BOTH cards update at the same time automatically.
 *     That is the power of a wrapper component.
 * ============================================================
 */
function App() {
  return (
    <div style={{ display: "flex", background: "gray" }}>

      {/* Card 1 — children is a post input form */}
      <Card>
        <div style={{ color: "red" }}>
          What do you want to post?
          <br /><br />
          <input type="text" />
        </div>
      </Card>

      {/* Card 2 — children is just a greeting text.
          Same Card component, totally different content inside. */}
      <Card>
        <div style={{ color: "blue" }}>
          Hi there
        </div>
      </Card>

    </div>
  );
}

export default App;
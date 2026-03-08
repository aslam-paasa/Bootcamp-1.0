/**
 * TOPIC: Wrapper Components in React:
 * 
 * On any website you visit, you see cards everywhere.
 * Instagram posts, YouTube video thumbnails, Twitter tweets —
 * they all follow the same structure (a box with a border,
 * padding, shadow etc.) but show different content inside.
 *
 * The bad way: copy-paste that same box structure every time
 * you want a card. If you later want to change the border
 * color, you have to find and update every single copy.
 *
 * The React way: create ONE wrapper component that provides
 * the structure (the box), and just put different content
 * inside it each time you use it.
 *
 * This file shows two ways to do this — old and modern.
 */


/**
 * WAY 1 — Passing Components as Props ❌ (Not Recommended)
 * In this approach, we treat components like data and pass
 * them as props explicitly.
 *
 * This feels like it works, but it has problems:
 *
 * 1. Unnatural syntax:
 *    Writing component1={<TextComponent1 />} inside a prop
 *    looks strange. JSX is designed to read like HTML —
 *    wrapping tags around content. Passing components as
 *    attributes breaks that natural reading flow.
 *
 * 2. Fixed and rigid:
 *    CardWrapperOld only accepts exactly component1 and
 *    component2. If you want to put 3 things inside,
 *    or just 1 thing, you need to change the wrapper itself.
 *    It is not truly flexible.
 *
 * 3. Hard to read at a glance:
 *    When you look at <CardWrapperOld component1={...} />,
 *    it is not immediately obvious that component1 is content
 *    going INSIDE the card. The relationship is not clear.
 */

/* Two simple text components we want to display inside cards */
function TextComponent1() {
  return <p>hi there 111</p>;
}

function TextComponent2() {
  return <p>hi there 222</p>;
}

/**
 * Old wrapper — receives components as explicit props ❌ 
 * - It works, but the syntax is awkward and inflexible.
 * - You have to know in advance exactly how many components
 *   will be passed in and give each one a prop name.
*/
function CardWrapperOld({ component1, component2 }) {
  return (
    <div>
      <div style={{ border: "2px solid black", padding: 20 }}>
        {component1}
      </div>
      <div style={{ border: "2px solid black", padding: 20 }}>
        {component2}
      </div>
    </div>
  );
}


/**
 * WAY 2 — Using the children Prop ✅ (Recommended)
 * React has a special built-in prop called "children".
 *
 * What is children?
 * Whatever you write BETWEEN the opening and closing tags of
 * a component automatically becomes its "children" prop.
 *
 * Example:
 *   <CardWrapper>
 *     <p>Hello!</p>        ← this becomes children
 *   </CardWrapper>
 *
 * Inside CardWrapper, {children} will render that <p>Hello!</p>.
 *
 * Think of it like a picture frame.
 * The frame (CardWrapper) always stays the same — same border,
 * same padding, same style. But you can put ANY picture
 * (any content) inside it just by writing it between the tags.
 * The frame does not need to know what picture it holds.
 *
 * HOW THIS FIXES WAY 1's PROBLEMS:
 *
 * 1. Natural and readable syntax:
 *    <CardWrapper><p>Hello</p></CardWrapper> reads exactly like
 *    HTML. The content is clearly INSIDE the wrapper. Anyone
 *    reading this immediately understands the relationship.
 *
 * 2. Completely flexible:
 *    You can put ONE thing, THREE things, a component, plain
 *    text, a whole section — anything — between the tags.
 *    CardWrapper does not care what is inside. It just wraps it.
 *
 * 3. Truly reusable:
 *    One CardWrapper component works for every use case.
 *    Change the border in CardWrapper once and every card
 *    across the whole app updates instantly.
 */

/* A simple text component to use as content inside a card */
function TextComponent() {
  return <div>hi from TextComponent</div>;
}

/**
 * Modern wrapper — uses the children prop.
 * - This component has no idea what will go inside it.
 * - It just provides the structure (the frame) and renders
 *   whatever content is placed between its tags as {children}.
*/
function CardWrapper({ children }) {
  return (
    <div style={{ border: "2px solid black", padding: 20 }}>
      {children}
    </div>
  );
}


/**
 * APP — Seeing both approaches side by side
 */
function App() {
  return (
    <div>

      {/* ── Way 1: Old approach ─────────────────────────────
          Components are passed as explicit props.
          Notice how awkward component1={<TextComponent1 />} looks.
          You can clearly see the content is NOT inside the tags. */}
      <CardWrapperOld
        component1={<TextComponent1 />}
        component2={<TextComponent2 />}
      />

      {/* ── Way 2: children prop ────────────────────────────
          Content goes INSIDE the tags — clean and natural.
          Same CardWrapper used 3 times with completely different content. */}

      {/* Plain text as children */}
      <CardWrapper>
        <div style={{ border: "2px solid red" }}>hi there...</div>
      </CardWrapper>

      {/* Different text as children — same wrapper, different content */}
      <CardWrapper>
        <div style={{ border: "2px solid blue" }}>hello there...</div>
      </CardWrapper>

      {/* A whole component as children — the wrapper does not care.
          children can be plain text, HTML, or other components. */}
      <CardWrapper>
        <div style={{ border: "2px solid green" }}>
          <TextComponent />
        </div>
      </CardWrapper>

    </div>
  );
}

export default App;
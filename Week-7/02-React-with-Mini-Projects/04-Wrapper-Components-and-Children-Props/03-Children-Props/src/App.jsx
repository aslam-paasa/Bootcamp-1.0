/**
 * PRACTICE: The children Prop
 * 
 * This is a clean practice example of everything we learned
 * in the previous file about the children prop.
 *
 * We have ONE Card component with a fixed outer structure.
 * We use it TWICE with completely different content inside.
 */

import PropTypes from "prop-types";


/**
 * CARD COMPONENT
 * The outer structure is defined here — border, border radius,
 * padding, margin, and box shadow.
 *
 * {children} is the placeholder for whatever content gets
 * placed between <Card> and </Card> when we use this component.
 *
 * This component has no idea what will go inside it.
 * It just provides the box and renders whatever it receives.
 */
const Card = ({ children }) => {
  return (
    <div style={{
      border      : "1px solid #ccc",
      borderRadius: "5px",
      padding     : "20px",
      margin      : "10px",
      boxShadow   : "2px 2px 5px rgba(0, 0, 0, 0.1)",
    }}>
      {/* Dynamic content — comes from whoever uses this Card */}
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};


/**
 * APP
 * Same Card component used twice.
 * The outer box looks identical for both cards.
 * Only the children (inner content) is different.
 */
function App() {
  return (
    <div>

      {/* Card 1 — children is a title and a paragraph */}
      <Card>
        <h2>Card Title</h2>
        <p>This is some content</p>
      </Card>

      {/* Card 2 — same Card component, different children */}
      <Card>
        <h2>Another Card</h2>
        <p>This card has different content</p>
      </Card>

    </div>
  );
}

export default App;
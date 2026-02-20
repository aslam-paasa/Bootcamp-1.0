/**
 * Star Rating:
 * - Star rating systems are widely used in web applications for feedback 
 *   collection and user reviews. 
 * - A dynamic star rating component needs to handle hover interactions,
 *   click selections, and seamless visual feedback.
*/

/**
 * Problem Statement:
 * We need to create star rating system that:
 * 1. Highlights stars dynamically when hovered over.
 * 2. Locks the selected stars when clicked.
 * 3. Resets the hover highlight when the mouse leaves the container.
 * 4. Is modular, reusable, and visually engaging.
*/

import './App.css'
import { FaStar } from "react-icons/fa";
import { useState } from "react";

function App() {
  /**
   * Tracks the index of the hovered star
   * Tracks the index of the clicked star
   */
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [clickedIndex, setClickedIndex] = useState(-1);


  /**
   * Handles the hover event:
   * 1. Updates the hovered index
   * 2. Highlights the stars up to the hovered index
   */
  const handleHover = (i) => {
    setHoveredIndex(i);
  };

  /**
   * Handles the click event:
   * 1. Updates the clicked index
   * 2. Locks the stars up to the clicked index
   */
  const handleClick = (i) => {
    setClickedIndex(i);
  };

  /**
   * Renders the stars
   */
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <div
          key={i}
          className="starDiv"
          onMouseEnter={() => handleHover(i)}
          onClick={() => handleClick(i)}
        >
          <FaStar
            color={i <= hoveredIndex || i <= clickedIndex ? "yellow" :
              "lightgrey"}
            size={40}
          />
        </div>
      );
    }
    return stars;
  };

  /**
   * Renders the star rating component
   */
  return (
    <div className="App">
      <div
        className="starContainer" onMouseLeave={() => setHoveredIndex(-1)}> {renderStars()} </div>
    </div>
  );
}

export default App;

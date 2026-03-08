/**
 * Carousel:
 * Building an interactive image carousel is a frequent requirement in web
 * development and a common task in machine coding interviews. It tests your
 * understanding of state management, user interactions, and edge case
 * handling. In this chapter, we will implement a circular carousel where:
 * a. Clicking 'next' loops back to the first image after the last.
 * b. Clicking 'prev' navigates to the last image from the first.
 * 
 * This problem may sound simple, but getting it right under interview
 * pressure requires precision and clarity. Let's break it down step by step.
*/

/**
 * Understanding the Problem:
 * Imagine a set of four images displayed one at a time. Your task is to
 * create a carousel that:
 * 1. Starts with the first image.
 * 2. Navigates forwards and backward using 'next' and 'prev' buttons.
 * 3. Handles edge cases:
 *    - Clicking 'next' on the last image loops back to the first.
 *    - Clicking 'prev' on the first image loops to the last.
*/


/**
 * Step-1: Setting up the Basic Component
 * We start with the basic structure of the Carousel component:
 * 1. A set of images stored in an array.
 * 2. A useState hook to track which image is currently active.
 *    a. Images Array: Holds the URLs of images to be displayed.'
 *    b. State(activeIndex): Keeps track of the currently displayed img idx.
 * This basic setup renders the first image but lacks navigation logic.
*/

/**
 * Step-2: Adding Navigation Logic
 * To make the carousel interactive, we implement 'Prev' and 'Next' buttons
 * with navigation logic:
 * 
 *   const handlePrevClick = () => {
 *     if (activeIndex === 0) {
 *       setActiveIndex(images.length - 1); <== Go the last image
 *     } else {
 *       setActiveIndex(activeIndex - 1);   <== Go the previous image
 *     }
 *   }
 * 
 *   const handleNextClick = () => {
 *     if (activeIndex === images.length - 1) {
 *       setActiveIndex(0); <== Loop back to the first image
 *     } else {
 *       setActiveIndex(activeIndex + 1); <== Go the next image
 *     }
 *   }
 * 
 * 
 * Why is this logic important?
 * 1. Edge Cases:
 *    - 'Next' on the last image (index n-1) wraps to the first image (index 0).
 *    - 'Prev' on the first image (index 0) wraps to the last image (index n-1).
 * 
 * 2. Clarity in State Management:
 *    - The activeIndex state determines which image is displayed at all times.
 *    - Using conditionals ensures seamless looping.
*/

/**
 * Step-3: Rendering the Buttons
 * Now, let's add the buttons to the JSX:
 * 
 *   return (
 *     <div>
 *       <img src={images[activeIndex]} alt="Carousel" />
 *       <button onClick={handlePrevClick}>Prev</button>
 *       <button onClick={handleNextClick}>Next</button>
 *     </div>
 *   )
 * 
 * Note: Style the carousel
*/

/**
 * Handling Real-World Scenarios:
 * 1. Large Datasets:
 *    - Preload images for smoother transitions.
 *    - Use lazy loading to save bandwidth.
 * 2. Responsive Design:
 *    - Adjust width and height dynamically for different devices.
 *    - Use media queries to improve the mobile experience.
 * 3. Animations:
 *    - Add sliding effects for a more engaging user experience.
*/

import './App.css'
import Carousel from './Components/Carousel'

function App() {

  return (
    <div>
      <Carousel />
    </div>
  )
}

export default App


/**
 * Key Takeways:
 * 1. Circular Logic: Handles edge cases where navigation loops seamlessly.
 * 2. State Management: Tracks the current image and updates dynamically.
 * 3. Reusability: The images array makes the component adaptable for different
 *    datasets.
*/

/**
 * Interview Tips:
 * When explaining this in interview:
 * 1. Start with Requirements: Explain how you handled edge cases (looping
 *    back to the start or end).
 * 2. Break down the logic: Walk through the conditional logic in 'Prev'
 *    and 'Next' handlers.
 * 3. Discuss Extensions: Talk about autoplay, animations, or thumbnails
 *    as potential enhancements. 
*/
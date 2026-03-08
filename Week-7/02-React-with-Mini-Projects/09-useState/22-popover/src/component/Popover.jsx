/**
 * Popover:
 * Popovers are commonly used UI elements that display additional information
 * when triggered by user interaction, such as clicking a button. In this
 * guide, we'll build a simple, toggleable popover in React. The popover 
 * includes a header, body content, and a triangular pointer for visual appeal.
 * This project demonstrates conditional rendering, state management, and
 * CSS styling - all essential skills for creating dynamic UI components.
*/

/**
 * Problem Statement:
 * We need to create a popover component that:
 * 1. Appears when the user clicks a button.
 * 2. Toggles visibility when clicked again. 
 * 3. Includes a header, body content, and a triangular pointer for visual
 *    context.
 * 4. Is styled cleanly and modularly.
*/

/**
 * Step-1: Setting up the Popover Component
 * The Popover component manages the state of the popover, visibility and
 * renders its content conditionally based on user interaction.
 * 
 * This triangle on top of the popover is a visual component that connects
 * the popover to its trigger. It's created using CSS, with transparent
 * border-left and border-right and a solid border-bottom to form a
 * downward-pointing triangle.
 * 
 * Positioned using position: absolute and adjusted with top and margin-left,
 * it enhances the UI indicating the relationship between the button and the
 * popover, a key detail for intuitive design in interviews.
 * 
 * Breaking down the Logic:
 * 1. State Management: The showBody state tracks whether the popover is
 *    visible(true) or hidden(false). It toggles when the button is clicked,
 *    ensuring dynamic behavior.
 * 2. Conditional Rendering: The popover's content is wrapped in a conditional
 *    block: { showBody ? <div>...</div> : null }. When showBody is true,
 *    the popover is rendered. Otherwise, nothing is displayed.
 * 3. User Interaction: Clicking the button calls the handleHeaderClick fn,
 *    toggling the state and visibility of the popover.
*/


import { useState } from "react";
import "./Popover.css";

const Popover = () => {
    const [showBody, setShowBody] = useState(false);

    const handleHeaderClick = () => {
        setShowBody(!showBody);
    };

    return (
        <div className="componentContainer">
            <button onClick={handleHeaderClick}>Click Here</button>
            {showBody ? (
                <div className="popoverContainer">
                    <>
                        <div className="triangle"></div>
                        <div className="popoverHeader">Header</div>
                        <div className="popoverBody">The content is added here</div>
                    </>
                </div>
            ) : null}
        </div>
    );
};

export default Popover;



/**
 * How conditional rendering works in popover component?
 * The showBody state determines whether the popover content is displayed.
 * When the user clicks the button, the handleHeaderClick function toggles
 * the state using setShowBody. This triggers a re-render of the component,
 * and the popover content is conditionally displayed if showBody is true.
 * 
 * The ternary operator { showBody ? <div>...</div> : null } ensures that
 * the content is only rendered when the state is active, keeping the DOM
 * lightweight and responsive.
 * 
 * React States Used:
 * The Popover component uses the showBody state to manage the visibility
 * of the popover content. Initially set to false, it toggles to true when
 * the user clicks the button, causing the popover to appear. Clicking the
 * button again sets the state back to false, hiding the popover. This simple
 * toggle mechanism ensures smooth and dynamic interaction.
*/
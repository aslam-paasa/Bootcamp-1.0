/**
 * Step-2: Building the Button Component
 * - In the Button component, conditional rendering dynamically updates the
 *   UI biased on the states passed as props.
 * - When loading is true, a spinner icon(FaFighterJet) is displayed, signaling
 *   that an action is in progress.
 * 
 * - If the button is liked, the Liked text and the buttonHolderLiked class
 *   are applied, changing its appearance and feedkback. If there's an error,
 *   it is displayed below the button. 
 * - This ensures the UI always reflects and the current state.
*/

import './Button.css';
import { FaHeart, FaFighterJet } from "react-icons/fa";

const Button = ({ onDoubleClick, liked, loading, error }) => {
    
    return (
        <div>
            {/* Button with dynamic styling based on liked state */}
            <button className={liked ? "buttonHolderLiked" : "buttonHolder"} onDoubleClick={onDoubleClick}>
                <span>Button</span>
                
                {/* Show spinner during loading, else show heart icon */}
                {loading ? <FaFighterJet /> : <FaHeart />}
            </button>
            
            {/* Display feedback: Liked message or error */}
            <div>{liked ? "Liked" : error}</div>
        </div>
    );
};
export default Button;

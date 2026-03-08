import Button from "./Button";
import Modal from "./Modal";
import { useState } from "react";

const Homepage = () => {
    /**
     * Tracks modal visibility
     */
    const [displayModal, setDisplayModal] = useState(false);
    
    /**
     * Opens the modal
     */
    const handleOpenClick = () => {
        setDisplayModal(true);
    };

    /**
     * Closes the modal and then passed as prop to the modal component
     */
    const handleCloseClick = () => {
        setDisplayModal(false);
    };

    /**
     * Renders the Homepage component:
     * - Displays a button to open the modal
     * - Conditionally renders the modal based on the displayModal state
     */
    return (
        <div>
            <h1>Homepage</h1>
            <Button text="Show Modal" handleClick={handleOpenClick} />
            {displayModal && <Modal handleClick={handleCloseClick} />}
        </div>
    );
};

export default Homepage;

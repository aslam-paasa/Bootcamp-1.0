/**
 * Dropdown:
 * Dropdown components are commonly used for displaying lists of selectable 
 * options. This guide explains how to design a dynamic dropdown with React,
 * allowing toggling between expanded and collapsed states, selecting an 
 * option, and reusability for multiple dropdowns.
 * 
 * This project demonstrates:
 * a. state management, 
 * b. event handling, and 
 * c. dynamic rendering,
*/

/**
 * Designing the Dropdown Component:
 * 
 * Step-1: Component Structure
 * The Dropdown Component receives a componentObject prop that contains the
 * title of the dropdown and its list of options.
*/

import { useState } from 'react';
import './Dropdown.css';

const Dropdown = ({ componentObject }) => {
    /**
     * States:
     * a. Tracks the currently clicked dropdown
     * b. Tracks the selected option 
    */
    const [clickedHeader, setClickedHeader] = useState("");
    const [clickedOption, setClickedOption] = useState("");

    /**
     * Handles header click to toggle dropdown
     * a. If the clicked header is same as the current title:
     *    - Collapse the dropdown if already open
     * b. If the clicked header is different from the current title:
     *    - Expand the dropdown
    */
    const headerClick = () => {
        if (clickedHeader === componentObject.title) {
            setClickedHeader("");
        } else {
            setClickedHeader(componentObject.title);
        }
    };

    /**
     * Handles option selection and collapses the dropdown
     * a. Set the selected option
     * b. Collapse the dropdown after selection
    */
    const handleClickOption = (option) => {
        setClickedOption(option);
        setClickedHeader("");
    };


    /**
     * Dynamically generates options when dropdown is expanded
    */
    const getReturnOptions = (componentObject) => {
        if (clickedHeader === componentObject.title) {
            return componentObject.options.map((option, index) => {
                return <span key={index} onClick={() => handleClickOption(option)}>{option}</span>
            })
        }

        /**
         * Return null if the dropdown is not expanded
        */
        return null;
    };

    /**
     * Renders the dropdown header & options dynamically:
     * a. componentTitle: Wraps the header and options
     * b. componentHeader: Displays the title and toggles the dropdown
     * c. componentOption: Dynamically renders options when expanded
    */
    return (
        <div className="componentTitle">
            <div className="componentHeader" onClick={headerClick}>
                {componentObject.title}
                {clickedOption && <span> - {clickedOption}</span>}
            </div>
            <div className="componentOption">{getReturnOptions(componentObject)}</div>
        </div>
    )
}

export default Dropdown;



/**
 * The dropdown component is designed to handle toggling and selection
 * dynamically. It works as follows:
 * a. When the dropdown header (componentHeader) is clicked, the headerClick
 *    function checks if the dropdown is already expanded (clickedHeader
 *    matches the current title). If so, it collapses the dropdown by resetting
 *    clickHeader to the current title. 
 * 
 * b. Once expanded, the options are dynamically rendered using the
 *    getReturnOptions function. Clicking on an option updates the 
 *    clickedOption state to store the selected value and collapses the
 *    dropdown, ensuring seamless interaction. This logic ensures that only
 *    one dropdown remains open at a time.
*/

/**
 * Explanation:
 * 1. States:
 *    - clickHeader: Tracks whether the dropdown is expanded or collapsed.
 *    - clickOption: Tracks the selected option for the dropdown.
 * 
 * 2. Header Click:
 *    - Toggles the dropdown's visibility by updating clickedHeader.
 * 
 * 3. Option Click:
 *    - Updates clickedOption with the selected option and collapses the
 *      dropdown.
 * 
 * 4. Dynamic Option Rendering:
 *    - The getReturnOptions function dynamically generates option elements
 *      if the dropdown is expanded.
*/


import React, { useState } from 'react';
import './WorkTile.css';

/**
 * Creating the WorkTile Component:
 * The WorkTile component is responsible for managing individual tasks.
 * It handles:
 * a. Displaying the task title
 * b. Editing the task
 * c. Deleting the task
*/

/**
 * Instead of handling task-specific operations (like editing or deleting)
 * in the parent App component, we created WorkTile to:
 * 1. Improve code modularity by speaking task-specific logic into WorkTile,
 *    allowing the App component to focus only on managing the overall list
 *    of tasks.
 * 2. Make the code reusable, enabling the WorkTile component to be used
 *    for any task list, regardless of context.
*/


/**
 * The edit logic begins the 'Edit' button is clicked, toggling the isEditing
 * state to true. This switches the display from static text to an input field
 * where the user can modify the task.
 * 
 * Upon clicking 'Save' the handleSave function updates the task in the
 * workList array by mapping through the list and replacing the matching
 * task with the edited value, If the user clicks 'Cancel', the task reverts
 * to its original value, and edit mode is exited.
 * 
 * The delete logic removes a task when the 'Delete' button is clicked.
 * The handleDelete function filters out the clicked task from the workList
 * array, and the updated list is set in the parent component (App), ensuring
 * the UI reflects the change immediately.
*/


const WorkTile = ({ title, workList, setWorkList }) => {
    /**
     * 1. Tracks if the tile is in edit mode
     * 2. Stores the edited title
    */
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    /**
     * Remove the clicked task
    */
    const handleDelete = (clickedTitle) => {
        let workListFiltered = workList.filter((item) => item !== clickedTitle);
        setWorkList(workListFiltered);
    };

    /**
     * Enter edit mode
    */
    const handleEdit = () => {
        setIsEditing(true);
    };

    /**
     * Update the task title in the list
    */
    const handleSave = () => {
        let workListUpdated = workList.map((item) => (item === title ? newTitle : item));
        setWorkList(workListUpdated);
        setIsEditing(false); // Exit edit mode
    };

    /**
     * Reset the edited title
    */
    const handleCancel = () => {
        setNewTitle(title);
        setIsEditing(false);
    };

    /**
     * Update the edited title
    */
    const handleChange = (event) => {
        setNewTitle(event.target.value);
    };

    return (
        <div className='tile'>
            {isEditing ? (
                <>
                    <input
                        type='text'
                        value={newTitle}
                        onChange={handleChange}
                        className='tileInput'
                    />
                    <div className='tileButtonContainer'>
                        <button onClick={handleSave} className='tileButton saveButton'>Save</button>
                        <button onClick={handleCancel} className='tileButton cancelButton'>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <p className='tileTitle'>{title}</p>
                    <div className='tileButtonContainer'>
                        <button onClick={handleEdit} className='tileButton editButton'>Edit</button>
                        <button onClick={() => handleDelete(title)} className='tileButton deleteButton'>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default WorkTile;
/**
 * Challenge-2.4: Student View - deleting students
 * 1. Create Delete Button:
 *    - In the StudentDetail component, create a "Delete" button.
 * 2. Use useDispatch Hook:
 *    - Inside the StudentDetail component, use the useDispatch hook 
 *      from react-redux to access the dispatch function.
 * 3. Dispatch deleteStudentAsync:
 *    - Implement an event handler for the "Delete" button click.
 *    - Dispatch the deleteStudentAsync action with the id of the 
 *      student being deleted as an argument.
 * 4. Update Redux Store:
 *    - In the studentsSlice, handle the deleteStudentAsync action by 
 *      removing the deleted student from the state. Use the filter 
 *      method to filter out the student with the matching id.
 * 5. Create Navigation Links:
 *    - In the StudentList component, map over the list of students and
 *      create navigation links to the StudentDetail component for each
 *      student.
 *    - These links should navigate to the StudentDetail component with
 *      the id of the respective student in the URL.
*/
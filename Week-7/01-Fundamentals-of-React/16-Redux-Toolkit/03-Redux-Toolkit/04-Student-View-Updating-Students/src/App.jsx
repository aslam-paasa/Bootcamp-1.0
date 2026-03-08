/**
 * Challenge-2.3: Student View - Updating Students
 * 1. Create StudentDetail Component:
 *    - Create a new component named StudentDetail.js.
 * 2. UseParams Hook:
 *    - In the StudentDetail component, use the useParams hook from 
 *      react-router-dom to extract the id of the student being viewed
 *      or edited.
 * 3. Retrieve Student Data:
 *    - Utilize the useSelector hook to retrieve the student's data 
 *      from the Redux store. You can find the student with the matching
 *      id in the array of students.
 * 4. Edit Link:
 *    - In the StudentDetail component, create a link/button labeled 
 *      "Edit Details." This link should navigate to the StudentForm 
 *      component to edit the student's information. Pass the student's
 *      data as state in the link.
 * 5. Edit StudentForm:
 *    - Modify the StudentForm component to handle both adding and 
 *      editing students.
 *    - Use the useLocation hook from react-router-dom to access the 
 *      state passed via the link when editing.
 *    - Pre-fill the form fields with the existing student's data if 
 *      you're editing an existing student.
 * 6. Update Student Data:
 *    - When editing a student, dispatch the updateStudentAsync action
 *      with the id of the student being edited and the updated student
 *      data as arguments.
 * 7. Redux Store Update:
 *    - In the studentsSlice, handle the updateStudentAsync action by 
 *      updating the Redux store with the edited student's data.
*/
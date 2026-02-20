/**
 * Challenge-2.2: Student View - Adding Students
 * 1. Create a form component (e.g., StudentForm) for adding new students.
 *    a. Inside the StudentForm component, use the useState hook to 
 *       manage the following form input fields:
 *       - Name
 *       - Age
 *       - Grade
 *       - Gender (as radio buttons)
 *       - Attendance (if editing an existing student)
 *       - Marks (if editing an existing student)
 * 
 * 2, Use the useDispatch hook to dispatch the addStudentAsync action 
 *    when the form is submitted.
 *    a. Implement a handleSubmit function that does the following:
 *       - Creates an object newStudent with the values of the form fields.
 *       - Dispatches the addStudentAsync action with newStudent as an 
 *         argument if it's a new student.
 *       - Dispatches the updateStudentAsync action if it's an existing
 *         student (updating). [LATER]
 * 
 * 3. Implement validation and error handling for the form.
 * 
 * 4. After adding a student, update the Redux store with the new 
 *    student data.
*/
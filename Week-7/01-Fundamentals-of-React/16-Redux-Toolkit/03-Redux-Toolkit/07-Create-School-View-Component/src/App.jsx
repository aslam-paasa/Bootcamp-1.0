/**
 * Challenge-4: Create school view component
 * 1. Create School View Component.
 * 2. Calculate School Statistics:
 *    a. Inside the useEffect hook, calculate the following school 
 *       statistics based on the students' data:
 *       - Total number of students in the school.
 *       - Average attendance (calculated as the sum of all students' 
 *         attendance divided by the total number of students).
 *       - Average marks (calculated as the sum of all students' marks 
 *         divided by the total number of students).
 *       - The top-performing student (student with the highest marks).
 * 3. Dispatch Actions:
 *    Dispatch the updateSchoolStats action to update the school 
 *    statistics in the Redux store. Pass an object containing the 
 *    calculated statistics (totalStudents, averageAttendance, 
 *    averageMarks, topStudent) as payload.
 * 4. Set Top Student:
 *    Dispatch the setTopStudent action to set the top-performing student
 *    in the Redux store.
 * 5. Render UI:
 *    Render the following elements in your SchoolView component:
 *    - An <h1> element with the text "School View."
 *    - Display the total number of students.
 *    - Display the average attendance (rounded to two decimal places).
 *    - Display the average marks (rounded to two decimal places).
 *    - Display the name of the top-performing student or "-" if there 
 *      is no top student.
*/

/**
 * Homework:
 * Extend the existing school management application by adding CRUD 
 * operations for teachers. i.e. to add a teacher, delete teacher, 
 * show a list of teacher and based on that display school-wide 
 * statistics and information in the SchoolView component.
*/
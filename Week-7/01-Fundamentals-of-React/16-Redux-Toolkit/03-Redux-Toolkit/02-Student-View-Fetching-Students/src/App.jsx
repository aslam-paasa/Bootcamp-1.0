/**
 * Challenge-2.1: Student View - fetching students
 * 1. Setup the Redux store, including the studentsSlice with
 *    fetchStudents async thunk.
 *    a. Create a Redux store using createSlice and createAsyncThunk.
 *    b. Define an async thunk action named fetchStudents within the 
 *       studentsSlice to fetch student data from an API.
 *    c. Define the initial state for the Redux store, including:
 *       - An empty array students to store student data.
 *       - A status field set to "idle" to indicate the initial state.
 *       - An error field initially set to null.
 * 
 * 2. Create a component (e.g., StudentView) to display a list of students.
 *    a. Implement a useEffect hook to fetch students when the 
 *       StudentView component mounts. Fetch students only if the status
 *       in the Redux store is "idle" to avoid redundant requests.
 *    b. Create UI elements to handle loading and error states:
 *       - When fetching students, display a loading message 
 *         (e.g., "Loading...").
 *       - If an error occurs while fetching, display an error message 
 *         along with the error details 
 *         (e.g., "Error: {error}").
 * 
 * 3. Display Student List:
 *    a. Use the StudentList component (which will be created separately)
 *       to display the list of students.
 *    b. Pass the students array from the Redux store as a prop to the 
 *       StudentList component.
*/
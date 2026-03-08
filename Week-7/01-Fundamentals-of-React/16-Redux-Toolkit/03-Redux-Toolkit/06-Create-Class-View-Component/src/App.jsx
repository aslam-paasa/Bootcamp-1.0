/**
 * Challenge-3: Create class view component
 * 1. Create Class View Component.
 * 2. Create setFilter and setSortBy actions in your students slice and
 *    in the initialState add filter: "All" and sortBy: "name" properties.
 * 3. Filter Students:
 *    a. Implement a filtering mechanism for students based on gender. 
 *       Create a variable filteredStudents that filters the students 
 *       based on the selected filter value.
 *    b. The filter options should include "All," "Boys," and "Girls."
 * 4. Sort Students:
 *    a. Implement sorting functionality for students based on the 
 *       selected sortBy value. Create a variable sortedStudents that 
 *       sorts the filteredStudents array accordingly.
 *    b. The sorting options should include "Name," "Marks," and 
 *       "Attendance."
 * 5. Handle Filter Change:
 *    Create an event handler function, such as handleFilterChange, 
 *    that dispatches the setFilter action when the filter dropdown 
 *    selection changes.
 * 6. Handle Sort Change:
 *    Create an event handler function, such as handleSortChange, that 
 *    dispatches the setSortBy action when the sort dropdown selection 
 *    changes.
 * 7. Render UI:
 *    Render the following elements in your ClassView component:
 *    - An <h1> element with the text "Class View."
 *    - A dropdown for filtering students by gender with options "All,"
 *      "Boys," and "Girls." Bind this dropdown to the filter value and
 *      use the handleFilterChange event handler.
 *    - A dropdown for sorting students with options "Name," "Marks," 
 *      and "Attendance." Bind this dropdown to the sortBy value and use
 *      the handleSortChange event handler.
 *    - A list of students rendered within a <ul> element. Map through 
 *      the sortedStudents array and display student information, 
 *      including name, gender, marks, and attendance, in <li> elements.
*/
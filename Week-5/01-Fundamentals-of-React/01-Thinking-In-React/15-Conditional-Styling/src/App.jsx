/**
 * Q. Given an employee data. List out the employee details and add
 *    a border to the employee details who have more than 5 years of
 *    experience.
*/

const employees = [
  { id: "E1", name: "Arpit Jain", workExperience: 6},
  { id: "E2", name: "Monica Jaiswal", workExperience: 4},
  { id: "E3", name: "Priya Shetty", workExperience: 9},
  { id: "E4", name: "Aman Sen", workExperience: 1},
]

function App() {

  return (
    <div>
      <h1>Employee List</h1>
      {employees.map((employee) => (
        <li key={employee.id} style={{border: employee.workExperience > 5 ? "4px solid orange" : "", padding: "4px"}}>
          {employee.name}: {employee.workExperience} years
        </li>
      ))}
    </div>
  );
}

export default App

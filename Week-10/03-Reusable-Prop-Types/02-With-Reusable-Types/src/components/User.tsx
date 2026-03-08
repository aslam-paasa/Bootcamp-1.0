/**
 * Way-2: With using reusable types
 * - Reusable types means we can define types separately and 
 *   use them across multiple components
 * - This reduces code duplication and improves maintainability
 * - We can also create type libraries for common patterns
*/

/**
 * Reusable type definition that can be exported and used in other components
 */
type UserShape = {
  name: string,
  age: number,
  isStudent: boolean
}

/**
 * Extending the reusable type:
*/
interface UserInfo extends UserShape {
  location: string[],
}

/**
 * Using the reusable type in our component
 */
const User = ({ name, age, isStudent, location }: UserInfo) => {
  return (
    <ul>
      <h1>{name}</h1>
      <p>{age}</p>
      <p>{isStudent ? "Student" : "Not a student"}</p>
      <p>{location.join(", ")}</p>
    </ul>
  )
}

export default User

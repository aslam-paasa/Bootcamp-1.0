/**
 * Creating custom types (type alias & Interfaces):
*/

// type UserTypes = {
//   name: string,
//   age: number,
//   isStudent: boolean
// }

interface UserTypes {
  name: string,
  age: number,
  isStudent: boolean
}

const User = ({name, age, isStudent }: UserTypes) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{isStudent ? "Student" : "Not a student"}</p>
    </div>
  )
}

export default User

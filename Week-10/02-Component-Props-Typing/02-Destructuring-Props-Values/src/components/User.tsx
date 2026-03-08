/**
 * Destructuring props values:
*/

const User = ({name, age, isStudent }: { name: string, age: number, isStudent: boolean }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{isStudent ? "Student" : "Not a student"}</p>
    </div>
  )
}

export default User

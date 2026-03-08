/**
 * Passing Types to the component:
*/

const User = (props: { name: string, age: number, isStudent: boolean }) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.age}</p>
      <p>{props.isStudent ? "Student" : "Not a student"}</p>
    </div>
  )
}

export default User

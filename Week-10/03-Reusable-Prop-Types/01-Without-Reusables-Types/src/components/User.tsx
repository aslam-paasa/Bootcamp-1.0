/**
 * Way-1: Without using reusable types
 * - We defined a UserInfo type to specify the props structure
 * - Used destructuring for cleaner code
 * - Used array rendering with JSON.stringify
*/

type UserInfo = {
  username: string,
  email: string,
  age: number,
  location: string[],
}

const User = ({ username, email, age, location }: UserInfo) => {
  return (
    <ul>
      <li>{username}</li>
      <li>{email}</li>
      <li>{age}</li>
      <li>{location.join(", ")}</li>
    </ul>
  )
}

export default User

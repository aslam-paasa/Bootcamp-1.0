/**
 * What is React.ReactNode?
 * 1. React.ReactNode ek type hai jo React mein children props ke liye use 
 *    hota hai.
 * 
 * 2. Ye accept kar sakta hai:
 *    - JSX Elements (<div>, <p>, etc)
 *    - Strings ("Hello")
 *    - Numbers (42) 
 *    - Arrays of elements ([<div>, <p>])
 *    - null ya undefined
 *    - Booleans (true/false)
 * 
 * 3. Example: <User>Hello World</User> 
 *    Yahan "Hello World" children prop ke through component mein pass hoga
 * 
 * Niche diye gaye component mein children prop ka use kiya gaya hai:
*/

const User = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>{children}</h1>
    </div>
  )
}

export default User

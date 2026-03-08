/**
 * UserInfo Component - User ki information display karne ke liye
 * 
 * Types ka explanation:
 * 1. Info type - Dusri file se import kiya hai "../types" se
 *    Isme user ki basic details hoti hai (id, name, email)
 * 
 * 2. UserInfoProps type - Component ke props ka structure define karta hai
 *    - user: Info type ka object
 * 
 * Component ka explanation:
 * - React.FC<UserInfoProps> matlab ye ek functional component hai 
 *   jo UserInfoProps type ke props accept karta hai
 * - Destructuring se user prop ko extract kiya hai
 * - Simple div me user ki info display kar rahe hain
 */

import type { Info } from "../types";

type UserInfoProps = {
  user: Info;
};

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div>
      <h2>User Information</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p> 
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserInfo;
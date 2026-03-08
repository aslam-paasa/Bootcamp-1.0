/**
 * AdminInfo Component - Admin ki details display karne ke liye
 * 
 * Types ka explanation:
 * 1. AdminInfoList type - "../types" se import kiya hai
 *    Isme admin ki saari details hoti hain (id, name, email, role, lastLogin)
 * 
 * 2. AdminInfoProps type - Component ke props ka structure batata hai
 *    - admin: AdminInfoList type ka object
 * 
 * Component ka explanation:
 * - React.FC<AdminInfoProps> matlab ye ek functional component hai
 *   jo AdminInfoProps type ke props leta hai
 * - Destructuring se admin prop ko nikala hai
 * - Div mein admin ki saari info display kar rahe hain:
 *   - ID
 *   - Name 
 *   - Email
 *   - Role
 *   - Last Login (toLocaleString() se date ko readable format mein convert kiya)
 */

import type { AdminInfoList } from "../types";

type AdminInfoProps = {
  admin: AdminInfoList;
};

const AdminInfo: React.FC<AdminInfoProps> = ({ admin }) => {
  return (
    <div>
      <h2>Admin Information</h2>
      <p>ID: {admin.id}</p>
      <p>Name: {admin.name}</p>
      <p>Email: {admin.email}</p>
      <p>Role: {admin.role}</p>
      <p>Last Login: {admin.lastLogin.toLocaleString()}</p>
    </div>
  );
};

export default AdminInfo;
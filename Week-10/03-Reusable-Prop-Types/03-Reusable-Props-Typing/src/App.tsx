/**
 * Assignment: Reusable Props Typing
 * In this exercise, you'll practice creating reusable prop types in TS. 
 * You'll define a set of reusable props for different types of user info
 * and then apply them to multiple React Components.
 * 
 * Step-1: Define Reusable Props
 * 1. Create a file named types.ts in the src directory.
 * 2. Define a base Info type and an extended AdminInfoList type in types.ts:
 *    a. Info Type: This type represents the base information shared by all
 *       users. It includes essential properties that any user will have
 *       like(id, name, email). 
 * 
 * Step-2: Create UserInfo Component
 * 1. Create a new file named UserInfo.tsx in the src directory.
 * 2. Create a UserInfo component that displays user information based on the
 *    Info type
 * 
 * Step 3: Create AdminInfo Component
 * 1. Create a new file named AdminInfo.tsx in the src directory.
 * 2. Create an AdminInfo component that displays user information and
 *    additional admin details based on the AdminInfoList type.
 * 
 * Step-4: Use the Components in App
 * 1. Open App.tsx (or create a new component if you prefer).
 * 2. Import and use the UserInfo and AdminInfo components, passing the 
 *    appropriate props
*/

import UserInfo from "./components/UserInfo"
import AdminInfo from "./components/AdminInfo"
import type { Info, AdminInfoList } from "./types"

const App = () => {
  const user: Info = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  };

  const admin: AdminInfoList = {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    lastLogin: new Date(),
  };

  return (
    <div>
      <UserInfo user={user} />
      <AdminInfo admin={admin} />
    </div>
  );
};

export default App;
/**
 * What are Server Actions?
 * > Server Actions are server-side functions that you can call directly
 *   from your UI (React components).
 *   - No API Routes
 *   - No /api/... files
 *   - No extra fetch calls
 * > You just call a function, and that function runs on the server.
 *   - It eliminates the API route
 *   - They handle form automatically
 *   - Build-in Security
 *   - Simplify data flow b/w client and server
*/

/**
 * Traditional Way: User Signup
 * 1. User fills a form: { email, username, password }
 * 2. Frontend sends data to an API: POST /api/auth/signup
 * 3. API Route:
 *    - Validates data
 *    - Talks to DB
 *    - Creates User
 *    - Sends response back
 * 4. Problem:
 *    - Too much boilerplate
 *    - Extra files for APIs
 *    - Extra fetch() code
 *    - Data + types can go out of sync
 * 
 * New Way: Server Actions (Next.js)
 * 1. User fills the form
 * 2. Form directly calls a server function
 * 3. That function:
 *    - Runs on the server
 *    - Talks to DB
 *    - Mutates data
 *    - Done
 * 
 * Server Action runs on server to:
 * a. Process formdata
 * b. Database Operations
 * c. Cache Updated
 * 
 * Then Returns back to client:
 * - UI updated automatically
 * 
 * Server Actions let you call server-side functions directly from UI 
 * components, without creating API routes, making your app simpler, 
 * cleaner, and faster to build.
*/

/**
 * Two types of Server Actions:
 * 1. Inline Server Actions
 * 2. Separate Server Actions (Better)
*/

import UserForm from "@/components/user-form"
import Form from "@/components/form"

export default function Home() {
  return (
    <div>
      <UserForm />
      <Form />
    </div>
  )
}
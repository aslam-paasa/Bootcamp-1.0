/**
 * Understanding Client Side Rendering:
 * > Whenever we wanted to add interactivity or Browser APIs inside our
 *   application, then we should use Client Component.
 * > By adding a simple 'use client' directive towards your server
 *   component, you can make it client component.
*/

/**
 * What is Client Components?
 * a. Components that run in the browser instead of the server.
 * b. They are used when you need interactivity:
 *    - clickable buttons
 *    - forms
 *    - animations
 *    - state management, etc...
 * c. To make a component a client component, you must 'use client'
 *    at the top of the file.
 * d. Example:
 *    'use client'
 *     export default function ClientComp() { ... }
*/

/**
 * Client Side Data Fetching in React/NextJS:
 * Build a website that let's a user see their name and email from the
 * given endpoint.
 * 1. Assume we already have this backend route:
 *   https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details
 * 2. Code: https://github.com/100xdevs-cohort-2/week-14-2.1
 * 3. UserCard Component:
 *    a. State Variables:
 *       const [userData, setUserData] = useState<User>();
 *       const [loading, setLoading] = useState(true);
 * 
 *    b. Data Fetching:
 *       useEffect(() => {
 *         fetch('https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details')
 *           .then(response => {
 *             setUserData(response.data);
 *             setLoading(false);
 *           })
 *       }, []);
 * 
 *    c. Rendering a spinner:
 *       if (loading) {
 *         return <Spinner />
 *       }
 * 
 *    d. Rendering the card:
 *       return (
 *         <div className="flex flex-col justify-center h-screen">
 *           <div className="flex justify-center">
 *             <div className="border p-8 rounded">
 *               <div>
 *                 Name: {userData?.name}
 *               </div>
 *               {userData?.email} 
 *             </div>
 *           </div>
 *         </div>
 *       )
 * 
 * 4. Data fetching happens on the client:
 * 
 *    +---------+ http://localhost:5173/blogs      +---------+
 *    |         |--------------------------------->|         |
 *    |         |         Empty HTML               |         |
 *    |         |<---------------------------------|  CDN    |
 *    |         |        Get JS File               |         |
 *    | Browser |--------------------------------->+---------+
 *    |         |                                  +---------+
 *    |         |  http:localhost:3000/api/v1/blogs|         |
 *    |         |--------------------------------->| Backend |
 *    |         |<---------------------------------| Server  |
 *    +---------+                                  +---------+
 * 
 * Note: In NextJS, we have to use the "use client" directive to use the 
 *       useEffect hook in the client side.
*/

/**
 * Component Directory:
 * > You should put all your 'components' in a components directory and use
 *   them in the app routes rather than shoving everything in the route
 *   handler.
 *   1. Create a new folder called components in the root project
 *   2. Add a new component there called Signin.tsx
 *   3. Move the signin logic there
 *   4. Render the Signin component in app/(auth)/signin/page.tsx
*/

/**
 * Solution: components/Signin.tsx
 * 
 * export function Signin() {
 *     return <div className="h-screen flex justify-center flex-col">
 *         <div className="flex justify-center">
 *         <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
 *                 <div>
 *                     <div className="px-10">
 *                         <div className="text-3xl font-extrabold">
 *                             Sign in
 *                         </div>
 *                     </div>
 *                     <div className="pt-2">
 *                         <LabelledInput label="Username" placeholder="harkirat@gmail.com" />
 *                         <LabelledInput label="Password" type={"password"} placeholder="123456" />
 *                         <button type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign in</button>
 *                     </div>
 *                 </div>
 *             </a>
 *         </div>
 *     </div>
 * }
 * 
 * interface LabelledInputType {
 *     label: string;
 *     placeholder: string;
 *     type?: string;
 * }
 * 
 * function LabelledInput({ label, placeholder, type }: LabelledInputType) {
 *     return <div>
 *         <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
 *         <input type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
 *     </div>
 * }
*/


/**
 * Solution:app/(auth)/signin/page.tsx
 * 
 * import { Signin as SigninComponent } from "@/components/Signin";
 * 
 * export default function Signin() {
 *     return <SigninComponent />
 * }
*/
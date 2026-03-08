/**
 * Client Side NextJS:
 * 1. global.css: TailwindCSS 
 * 2. page.tsx: File based routing 
 *    - app/page.tsx: Entry point of the application (/ : route)
*/

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="space-y-4">
        <Link href="/signin" className="block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          Sign In
        </Link>
        <Link href="/signup" className="block px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
          Sign Up  
        </Link>
        <Link href="/blogs" className="block px-6 py-3 text-lg font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 border border-gray-300 transition-colors">
          View Blogs
        </Link>
      </div>
    </div>
  );
}

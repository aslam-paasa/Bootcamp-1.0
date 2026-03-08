/**
 * What are Dynamic Routes in Next.js?
 * > In Next.js, sometimes you want to make pages for things that 
 *   change—like a blog post based on its name, a user's profile page, 
 *   or a product page with a different product each time. 
 * > These pages don't have fixed names, they depend on your data. 
 * > For example, you could have:
 *   - /blog/hello-world
 *   - /blog/another-post
 *   - /blog/react-basics
 * 
 * > Instead of making a new file for EVERY possible post, Next.js lets 
 *   you use 'dynamic routes'. 
 * > This means you create a file or folder with square brackets around
 *   a word, like [slug]:
 *   - /blog/[slug]
 * 
 * > When someone visits /blog/hello-world, Next.js puts 'hello-world'
 *   into a variable called 'slug' for you to use in your code.
 */


/**
 * Assignment for Practice:
 * Build a simple frontend in Next.js for showing a todo or post. The backend
 * endpoint you should use is:
 *    https://jsonplaceholder.typicode.com/posts/1
 * 
 * 
 * When a user visits: http://localhost:3000/post/1
 * - Your page should show the post loaded from the above URL.
 * - Make it a Server Component (use async/await and fetch or axios).
 * - (Optional) Try supporting different post IDs, like /post/2 or /post/3.
 * 
 * Hint: Use dynamic routes for the [id] part in /post/[id].
 *       Slug URL: https://jsonplaceholder.typicode.com/posts/[slug]
 */

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">USER PAGE</h1>
        <p className="text-gray-600 mt-2">Welcome to the user page!</p>
      </div>
    </div>
  );
}

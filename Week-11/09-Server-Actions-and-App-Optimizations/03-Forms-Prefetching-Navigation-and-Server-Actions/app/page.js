/**
 * 1. What is a Form?
 *    > A form is how users send data to your app.
 *    > Examples:
 *      - Loging form
 *      - Signup form
 *      - Create posts form
 *      - Contact us form
 *    > At the end of the day, a form does one simple job:
 *      Take user input -> send it to the server
 * 
 * 2. How forms worked traditionally? (Old Mental Model)
 *    > Before modern Next.js, this was common:
 *      a. User submits form
 *      b. JS fetch() runs
 *      c. API route receives data
 *      d. Server processes data
 *      e. JSON response comes back
 *      f. UI updates manually
 *    > Problems:
 *      - Too much code
 *      - Manual error handling
 *      - More JS
 *      - Harder to reason about
 * 
 * 3. What makes forms in Next.js different?
 *    > Next.js brings native form superpowers:
 *      - Server Actions
 *      - Built-in navigation handling
 *      - Automatic prefetching
 *      - Less JS
 *      - Better performance
 *    > Forms feel simple again, like HTML - but powerful.
 * 
 * Forms + Server Action:
 * 4. The Big Shift: Forms + Server Actions
 *    > In Next.js,
 *      - Forms can call server functions directly
 *      - No API route needed
 *      - No fetch() required
 *    > This is the biggest mindset shift.
 * 
 * 5. Server Actions + Forms (Core Idea):
 *    > Form Submit > Server Action runs > DB Logic > Page updates/Redirect
 *    > The form talks directly to the server
 * 
 * 6. Why Server Actions are perfectly for Forms:
 *    > Because forms:
 *      - Already send data
 *      - Already expect server processing
 *      - Already fit mutation use-cases
 *    > Server Actions give:
 *      - Less boilerplate
 *      - Better security
 *      - Cleaner code
 *      - Faster UX
 *    > This is why Server Actions outshine API routes for forms.
 * 
 * 7. Navigation After Form Submission 
 *    > After submitting a form, usually you want to:
 *      - Redirect to another page
 *      - Show success screen
 *      - Go back to list page
 *    > Next.js this on the server, cleanly.
 * 
 *    Model: Submit > Server Action > Redirect
 *    > No client-side routing hacks needed.
 * 
 * 
 * Prefetching: Forms + Navigation = Fast
 * 8. What is Prefetching?
 *    > Prefetching means:
 *      - Next.js loads the next page in advance
 *      - Before the user even navigates
 *    > So when redirect happens:
 *      - Page loads instantly
 *      - Feels super smooth
 *    > You get SPA-like speed with super logic
 * 
 * 9. Forms without JS? Yes
 *    > One underrated benefit:
 *      - Forms work even without JS
 *      - Accessibility improves
 *      - Progressive enhancement by default
 *    > If JS loads -> better UX
 *    > If JS fails -> form still works
 *    > This is web done right   
 * 
 * 10. When should you use forms + server actions?
 *     > Perfect for:
 *       - Login/Signup 
 *       - CRUD operations
 *       - Admin panels
 *       - Dashboards
 *       - Any data mutations
 *     > Covers most real-world use cases
 * 
 * 11. When not to use forms?
 *     > Avoid forms when:
 *       - You need real-time updates
 *       - Highly interactive UI (drag/drop)
 *       - Background polling
 *       - Public APIs
 *     > Forms are best for submit-based workflows
 * 
 * 12. Common Beginner Mistakes:
 *     > Using API routes unnecessarily
 *     > Writing fetch logic for simple forms
 *     > Over-complicating validation
 *     > Forgetting server-only execution
 *       (Let the framework help you)
 * 
 * 13. Easy Mental Model
 *     > Think like this:
 *       - Forms         : send data
 *       - Server Actions: handles logic
 *       - Redirects     : navigation
 *       - Prefetching   : speed boost
 *    > Once this clicks, forms feel effortless
 * 
 * Summary:
 * Forms in Next.js combine HTML simplicity with server power — using 
 * Server Actions, built-in navigation, and prefetching to create fast,
 * secure, and clean data-submission flows.
*/

import Form from "next/form"
import { Search, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Search through our collection of unique items
          </p>
          <Sparkles className="w-12 h-12 text-blue-500 mx-auto" />
        </div>

        {/* Search Form using Next.js Form component */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Search Products
            </h2>
            
            {/* Next.js Form Component - This is the key teaching point */}
            <Form action="/products" className="space-y-6">
              {/* Search Input */}
              <div className="space-y-2">
                <label htmlFor="query" className="block text-sm font-medium text-gray-300">
                  Search by title or description
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="query"
                    name="query"
                    placeholder="Enter product title or description..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400">
                  Try searching for terms like "gold", "concrete", "keyboard", or "chicken"
                </p>
              </div>

              {/* Search Type Filter (Optional) */}
              <div className="space-y-2">
                <label htmlFor="searchType" className="block text-sm font-medium text-gray-300">
                  Search in
                </label>
                <select
                  id="searchType"
                  name="searchType"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="both">Title and Description</option>
                  <option value="title">Title only</option>
                  <option value="description">Description only</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Search Products</span>
              </button>
            </Form>

            {/* Benefits explanation */}
            <div className="mt-8 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
              <h3 className="text-sm font-semibold text-blue-400 mb-2">
                💡 Next.js Form Benefits:
              </h3>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Automatic form submission handling</li>
                <li>• Built-in navigation on submit</li>
                <li>• Progressive enhancement (works without JS)</li>
                <li>• URL search params integration</li>
                <li>• Server-side form processing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Search Examples */}
        <div className="max-w-2xl mx-auto mt-8">
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-300">
            Try these quick searches:
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Gold', 'Concrete', 'Keyboard', 'Chicken', 'Metal', 'Ceramic'].map((term) => (
              <Form key={term} action="/products" className="inline">
                <input type="hidden" name="query" value={term.toLowerCase()} />
                <input type="hidden" name="searchType" value="both" />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg text-sm transition-all duration-200 border border-gray-600 hover:border-gray-500"
                >
                  {term}
                </button>
              </Form>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Updated server action to handle search
// In your actions file (e.g., actions/index.js or li
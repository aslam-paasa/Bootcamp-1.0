/**
 * 7. Github.jsx — useLoaderData demo
 *
 * useLoaderData() kya hai:
 *   Normal approach (useEffect):
 *     Component render → blank/loading dikhta → fetch hota →
 *     data aata → setState → dobara render
 *
 *   useLoaderData approach:
 *     Router pehle githubInfoLoader() chalata hai →
 *     fetch complete hota hai → tab component render hota hai
 *     Result: No blank screen, no loading state needed
 *
 * githubInfoLoader export karna zaroori hai taaki App.jsx
 * mein route ke loader property mein pass kar sakein:
 *   { path: 'github', element: <Github />, loader: githubInfoLoader }
 */
import { useLoaderData } from 'react-router-dom'

// Loader function — App.jsx mein route ke saath register hoga
// React Router is function ko component render se PEHLE chalata hai
export const githubInfoLoader = async () => {
  const response = await fetch('https://api.github.com/users/hiteshchoudhary')
  return response.json()
}

export default function Github() {
  // useLoaderData() — githubInfoLoader ne jo return kiya wo yahan milega
  // Koi useState, koi useEffect, koi loading state zaruri nahi
  const data = useLoaderData()

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="bg-gray-800 text-white rounded-2xl overflow-hidden shadow-xl">

        {/* Banner */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-800 h-24" />

        {/* Profile */}
        <div className="px-6 pb-6">
          <div className="-mt-12 mb-4">
            <img
              src={data.avatar_url}
              alt="GitHub avatar"
              className="w-24 h-24 rounded-full border-4 border-gray-800"
            />
          </div>

          <h2 className="text-2xl font-bold">{data.name || data.login}</h2>
          <p className="text-gray-400 text-sm mt-1">@{data.login}</p>
          {data.bio && <p className="text-gray-300 mt-3 text-sm">{data.bio}</p>}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-700 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-orange-400">{data.followers?.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">Followers</p>
            </div>
            <div className="bg-gray-700 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-orange-400">{data.following?.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">Following</p>
            </div>
            <div className="bg-gray-700 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-orange-400">{data.public_repos}</p>
              <p className="text-xs text-gray-400 mt-1">Repos</p>
            </div>
          </div>

          {/* How it works */}
          <div className="mt-6 bg-gray-900 rounded-xl p-4 text-xs font-mono">
            <p className="text-orange-400 mb-2">// useLoaderData kaise kaam kiya:</p>
            <p className="text-gray-400">1. User /github pe navigate kiya</p>
            <p className="text-gray-400">2. Router ne pehle githubInfoLoader() chalaya</p>
            <p className="text-gray-400">3. fetch() complete hua → data ready</p>
            <p className="text-gray-400">4. Tab Github component render hua</p>
            <p className="text-green-400 mt-2">// No blank screen. No loading state needed.</p>
          </div>

          <a
            href={data.html_url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 w-full block text-center bg-orange-700 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition"
          >
            GitHub pe Dekho →
          </a>
        </div>
      </div>
    </div>
  )
}
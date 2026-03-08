/**
 * 8. User.jsx — useParams demo
 *
 * Route: /user/:userid
 * URL:   /user/john  →  useParams() → { userid: "john" }
 * URL:   /user/42    →  useParams() → { userid: "42"   }
 *
 * :userid URL mein jo bhi value aaye — useParams se mil jaati hai.
 * Real app mein isse API call karte: fetch(`/api/users/${userid}`)
 */
import { useParams, useNavigate } from 'react-router-dom'

export default function User() {
  const { userid } = useParams()   // URL se :userid ki value
  const navigate = useNavigate()

  return (
    <div className="max-w-lg mx-auto my-12 px-4">
      <div className="bg-gray-600 text-white rounded-2xl p-8 text-center shadow-xl">

        {/* Avatar — first letter of userid */}
        <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
          {userid?.charAt(0)?.toUpperCase()}
        </div>

        <p className="text-gray-300 text-sm mb-2">URL → /user/{userid}</p>
        <p className="text-3xl font-bold">User: {userid}</p>
        <p className="text-gray-400 text-sm mt-2 font-mono">
          useParams() → {`{ userid: "${userid}" }`}
        </p>

        {/* Try different user IDs */}
        <div className="mt-6">
          <p className="text-sm text-gray-400 mb-3">Doosra user try karo:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['john', 'priya', '42', 'alice', 'rahul123'].map((id) => (
              <button
                key={id}
                onClick={() => navigate(`/user/${id}`)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${userid === id
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-500 hover:bg-gray-400 text-white'
                  }`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
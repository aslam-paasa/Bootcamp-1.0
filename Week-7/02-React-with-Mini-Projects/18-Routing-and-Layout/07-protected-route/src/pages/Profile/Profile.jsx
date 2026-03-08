/**
 * 9. Profile.jsx — Protected page
 * useAuth() se user ki details milti hain — direct, no props.
 */
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <div className="max-w-lg mx-auto px-4 py-12">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                {/* Banner */}
                <div className="h-20 bg-gradient-to-r from-orange-500 to-orange-700" />

                {/* Avatar + Info */}
                <div className="px-6 pb-6">
                    <div className="-mt-10 mb-4">
                        <div className="w-20 h-20 rounded-full bg-gray-800 border-4 border-white flex items-center justify-center text-white text-2xl font-black">
                            {user.name.charAt(0)}
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                    <span className="inline-block mt-2 text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold font-mono">
                        {user.role}
                    </span>

                    {/* Details */}
                    <div className="mt-6 space-y-3">
                        {[
                            { label: 'Full Name', value: user.name },
                            { label: 'Email', value: user.email },
                            { label: 'Role', value: user.role },
                            { label: 'Status', value: 'Active ✅' },
                        ].map(item => (
                            <div key={item.label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                                <span className="text-sm text-gray-500">{item.label}</span>
                                <span className="text-sm font-medium text-gray-800 font-mono">{item.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* useAuth concept note */}
                    <div className="mt-6 bg-gray-50 rounded-xl p-4 text-xs font-mono text-gray-500">
                        <p className="text-orange-600 mb-1">// Data kahan se aaya?</p>
                        <p>const {'{ user }'} = useAuth()</p>
                        <p className="text-green-600 mt-1">// Context se seedha — koi prop nahi</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-4 w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2.5 rounded-xl transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
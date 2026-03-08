/* 10. NotFound.jsx */
import { useNavigate, useLocation } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <p className="text-8xl font-black text-gray-200">404</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Page nahi mili</h2>
            <p className="text-gray-500 mt-2 mb-6">
                <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">{location.pathname}</code>
                {' '}— ye route exist nahi karta.
            </p>
            <button
                onClick={() => navigate('/')}
                className="bg-orange-700 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
                Home pe Jao
            </button>
        </div>
    )
}
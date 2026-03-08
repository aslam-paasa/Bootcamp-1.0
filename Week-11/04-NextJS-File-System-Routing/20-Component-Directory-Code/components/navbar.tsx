import Link from 'next/link';

export default function Navbar() {
    return (
      <nav className="bg-gray-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <ul className="flex justify-center space-x-6">
            {/* Home link */}
            <li><Link href="/" className="text-lg font-medium hover:text-gray-300 transition-colors duration-300">Home</Link></li>
            {/* About link */}
            <li><Link href="/about" className="text-lg font-medium hover:text-gray-300 transition-colors duration-300">About</Link></li>
            {/* Contact link */}
            <li><Link href="/contact" className="text-lg font-medium hover:text-gray-300 transition-colors duration-300">Contact</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
const Navbar = () => {
    return (
        <nav className="w-full bg-white border-b shadow-sm">

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo / Title */}
                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow">
                        AI
                    </div>

                    <h1 className="text-2xl font-bold text-blue-800 tracking-tight">
                        Resume Analyzer
                    </h1>

                </div>


                {/* Badge */}
                <div className="flex items-center">

                    <span className="px-4 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-full shadow-sm hover:bg-blue-200 transition">
                        Powered by Gemini
                    </span>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;

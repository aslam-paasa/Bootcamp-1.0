const Hero = () => {
    return (
        <section className="w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">

            <div className="max-w-4xl text-center px-6">

                {/* Main Heading */}
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">

                    AI-Based Resume
                    <span className="text-blue-600"> Analysis</span>

                </h1>


                {/* Subtitle */}
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">

                    Paste your resume and instantly receive a detailed report with score,
                    strengths, weaknesses, and actionable improvements powered by AI.

                </p>


                {/* CTA Button */}
                <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300">

                    Analyze Resume

                </button>


                {/* Optional small trust text */}
                <p className="text-sm text-gray-400 mt-4">
                    Fast • Accurate • AI Powered
                </p>

            </div>

        </section>
    );
};

export default Hero;


const Navbar = () => {
    return (
        <div className="h-6 p-14 m-5 flex items-center justify-between font-medium text-xl rounded-2xl text-blue-500 bg-blue-50">
            <div className="font-extrabold text-3xl text-blue-800">AI Resume Analyzer</div>
            <div>
                <p className="border-2 p-2 bg-blue-500 text-white rounded-2xl">powered by Gemini</p>
            </div>
        </div>
    )
}

export default Navbar
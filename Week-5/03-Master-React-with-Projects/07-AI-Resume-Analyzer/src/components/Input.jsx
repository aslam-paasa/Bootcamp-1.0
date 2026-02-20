
const Input = () => {
    return (
        <div className="flex justify-center items-center flex-col">
            <textarea name="userInput" id="userInput" value="this is value" className="text-center justify-center text-light border-2 border-blue-500 w-[90vw] h-[25vh] rounded-4xl p-10"></textarea>
            <button className="m-5 p-5 border bg-blue-500 text-white rounded-4xl">Submit Your Resume</button>
        </div>
    )
}

export default Input
const Tasks = () => {

  /**
   * Sample Tasks Data:
  */
  const tasks = [
    {
      id: 1,
      title: "Finish project report",
      description: "Complete the final report for the project and submit it.",
      status: "In Progress",
      dueDate: "2025-04-20",
    },
    {
      id: 2,
      title: "Update website content",
      description: "Revise the homepage text to reflect recent changes.",
      status: "Pending",
      dueDate: "2025-04-25",
    },
    {
      id: 3,
      title: "Team meeting",
      description: "Discuss the project progress and upcoming tasks.",
      status: "Completed",
      dueDate: "2025-04-22",
    },
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-50 p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Tasks</h1>

          {/**
           * Task List:
           * 1. Task Card:
           *    a. Task Title Section
           *    b. Task Description Section
           *    c. Task Status Section
           *    d. Task Due Date Section
           * 2. Task Action Buttons:
           *    a. Edit Button
           *    b. Delete Button
           * */}

          <section className="space-y-6">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between bg-white rounded-lg shadow-md p-6 border-l-4" style={{borderColor: task.status === 'Completed' ? 'green' : task.status === 'In Progress' ? 'yellow' : 'red'}}>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
                <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                <p className="text-sm text-gray-600 mt-2">Due Date: {task.dueDate}</p>
              </div>


                <section className="flex space-x-4">
                  <span className={`px-4 py-3 text-center text-sm rounded-full ${task.status === "In Progress" ? "bg-yellow-100 text-yellow-800" : task.status === "Pending" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>{task.status}</span>


                  {/**
                   * Task Action Buttons:
                   * a. Edit Button
                   * b. Delete Button
                  */}
                  <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Edit</button>

                  {task.status !== 'Completed' && (
                    <button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">Mark as Complete</button>
                  )}

                  <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Delete</button>
                  
                </section>
              </div>
            ))}
          </section>
        </div>
    </div>
  )
}

export default Tasks

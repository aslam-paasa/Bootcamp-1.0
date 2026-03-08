const Analytics = () => {
  const metrics = [
    {
      title: 'Total Sales',
      value: '$120,000',
      change: "+12%",
      isPositive: true,
    }, 
    {
      title: "Active Users",
      value: "1,200",
      change: "-8%",
      isPositive: false,
    },
    {
      title: "Website Visits",
      value: "8,500",
      change: "+5%",
      isPositive: true,
    },
    {
      title: "New Sign-Ups",
      value: "350",
      change: "+18%",
      isPositive: true,
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics Dashboard</h1>

          {/**
           * Metrics Section:
           * 1. Total Sales
           * 2. Active Users
           * 3. Website Visits
           * 4. New Sign-Ups
           */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div key={index} className={`flex justify-between items-center bg-white rounded-lg shadow-md p-6 border-l-4 ${metric.isPositive ? 'border-green-500' : 'border-red-500'}`}>
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-700">{metric.title}</h3>
                  <p className="text-3xl font-bold text-gray-600 mt-2">{metric.value}</p>
                </div>

                <div className="flex flex-col">
                  <span className={`px-4 py-2 text-sm rounded-full ${metric.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{metric.change}</span>
                </div>
              </div>
            ))}
           </div>


           {/**
            * Sales Chart Section (Placeholder for actual chart):
            * 1. Sales Chart
            * 2. Sales Chart Description
            */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Website Traffic</h2>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center h-64">
                  <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Website Traffic</h2>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center h-64">
                  <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
                </div>
              </div>
            </div>
           
           {/**
            * Recent Activities Section:
            * 1. Recent Activities
            * 2. Recent Activities Description
            */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activities</h2>

              <ul className="space-y-4">
                <li className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">User Registration</h3>
                    <p className="text-sm text-gray-600">New user signed up on 2026-02-15</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">+10 Users</p>
                  </div>
                </li>
                <li className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Sales Increase</h3>
                    <p className="text-sm text-gray-600">Sales grew by 12% on 2025-02-14</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">+$15,000</p>
                  </div>
                </li>
                <li className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Website Traffic Surge</h3>
                    <p className="text-sm text-gray-600">Traffic increased by 8% on 2025-02-13</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">+200 Visits</p>
                  </div>
                </li>
              </ul>
            </div>
           
           
        </div>
    </div>
  )
}

export default Analytics

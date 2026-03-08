const Shimmer = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Shimmer */}
      <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl mb-8 animate-pulse"></div>
      
      {/* Search Bar Shimmer */}
      <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl mb-8 animate-pulse"></div>
      
      {/* Restaurant Grid Shimmer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(12).fill(0).map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
            <div className="p-4">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-3 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4 animate-pulse w-2/3"></div>
              <div className="flex justify-between">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 animate-pulse"></div>
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shimmer;
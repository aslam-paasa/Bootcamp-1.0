import { CDN_URL } from '../utils/constants';

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } = resData;

  return (
    <div className="m-4 p-4 w-[300px] h-[450px] rounded-2xl bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
      {/* 1. Logo */}
      <img 
        className="w-full h-[200px] object-cover rounded-xl" 
        src={CDN_URL + cloudinaryImageId} 
        alt={name} 
      />

      {/* 2. Content: Name, Cuisines, Rating, Cost, Delivery Time */}
      <div className="mt-4">
        <h3 className="font-bold text-xl text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{cuisines.join(', ')}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className={`px-2 py-1 rounded-lg text-sm font-medium ${avgRating >= 4 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
            ★ {avgRating}
          </span>
          <span className="text-gray-600 text-sm">•</span>
          <span className="text-gray-600 text-sm">{sla.deliveryTime} mins</span>
          <span className="text-gray-600 text-sm">•</span>
          <span className="text-gray-600 text-sm">{costForTwo}</span>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-blue-500 text-sm font-medium hover:text-blue-600">
            Quick View
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

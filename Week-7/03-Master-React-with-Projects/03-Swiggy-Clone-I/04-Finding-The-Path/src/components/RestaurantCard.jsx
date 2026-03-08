import { CDN_URL } from '../utils/constants';

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } = resData;

  return (
    <div className="res-card" style={{ backgroundColor: '#f0f0f0' }}>
      {/* 1. Logo */}
      <img className="res-logo" src={CDN_URL + cloudinaryImageId} alt={name} />

      {/* 2. Content: Name, Cuisines, Rating, Cost, Delivery Time */}
      <div className="res-card-content">
        <h3>{name}</h3>
        <hr />
        <em>{cuisines.join(', ')}</em>
        <h4>{avgRating} stars</h4>
        <h4>{costForTwo}</h4>
        <h4>{sla.deliveryTime} minutes</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;

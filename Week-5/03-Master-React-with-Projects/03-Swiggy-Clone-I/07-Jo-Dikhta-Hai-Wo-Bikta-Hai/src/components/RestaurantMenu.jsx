import { useParams } from 'react-router-dom';
import ShimmerMenu from './ShimmerMenu';
import { CDN_URL } from '../utils/constants';
import { FiClock } from 'react-icons/fi';
import { AiOutlineStar } from 'react-icons/ai';
import useRestaurantMenu from '../utils/useRestaurantMenu';


const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  /**
   * Condition Rendering:
   * 1. If resInfo is null/undefined, then show Shimmer UI
   * 2. If resInfo + itemCards is loaded, then show the restaurant menu data
   *    - resInfo is used to get the restaurant info 
   *      a. name
   *      b. cuisines
   *      c. costForTwoMessage
   *      d. cloudinaryImageId
   *      e. avgRating
   *      f. deliveryTime
   *    - itemCards is used to get the restaurant menu items
   *      a. itemCards
  */
 
  if (!resInfo) return <ShimmerMenu />;

  if (!resInfo?.cards[2]?.card?.card?.info) return null;
  const { name, cuisines, costForTwoMessage, cloudinaryImageId, avgRating, deliveryTime } = resInfo.cards[2].card.card.info;
  const itemCards = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards || [];
  return (
    <div className="menu">
      <header className="menu-header">

        {/* 1. Logo */}
        <div className="menu-header-left">
          <img src={CDN_URL + cloudinaryImageId} alt="Restaurent Info" />
        </div>

        {/* 2. Restaurant Info: Name, Cuisines, Rating, Delivery Time, Cost for Two */}
        <div className="menu-header-right">

          {/* a. Top: Name, Cuisines */}
          <div className="top">
            <h1>{name}</h1>
            <h3>{cuisines.join(', ')}</h3>
          </div>

          {/* b. Bottom: Rating, Delivery Time, Cost for Two */}
          <div className="bottom">

            {/* - Rating */}
            <h4 className="avg-rating">
              <span
                className="icons"
                style={{
                  position: 'relative',
                  top: '2px',
                  marginRight: '3px',
                }}
              >
                <AiOutlineStar />
              </span>
              <span>{avgRating}</span>
            </h4>

            {/* - Delivery Time */}
            <h4 className="time">
              <span
                className="icons"
                style={{
                  position: 'relative',
                  top: '2px',
                  marginRight: '3px',
                }}
              >
                <FiClock />
              </span>
              <span> {deliveryTime} MINS</span>
            </h4>

            {/* - Cost for Two */}
            <h3>{costForTwoMessage}</h3>
          </div>
        </div>
      </header>

      {/* 3. Menu Items: Name, Price, Description, Image */}
      <div className="menu-main">

        {/* a. Title: Menu */}
        <h2>Menu</h2>

        {/* b. Items: Number of Items */}
        <h3 className="items">{itemCards.length} items</h3>

        {/* c. Menu Items: Name, Price, Description, Image */}
        <div className="menu-main-card-container">
          {itemCards.map((item) => (
            <div key={item?.card?.info?.id} className="menu-card">
              <div className="menu-card-left">
                <h2 className="menu-name">{item?.card?.info?.name}</h2>
                <h3 className="menu-price">
                  ₹
                  {item?.card?.info?.price / 100 ||
                    item?.card?.info?.defaultPrice / 100}
                </h3>
                <h4 className="menu-description">
                  {item?.card?.info?.description}
                </h4>
              </div>
              <div className="menu-card-right">
                <img src={CDN_URL + item?.card?.info?.imageId} alt="Menu Info" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;

import { useParams } from "react-router-dom";
import ShimmerMenu from "./ShimmerMenu";
import { CDN_URL } from "../utils/constants";
import { FiClock } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(0);

  /**
   * If API data not ready => shimmer
   */
  if (!resInfo) return <ShimmerMenu />;

  /**
   * 2. Extracting restaurant food items data
   *    a. If restaurantInfo is not found => null
   *    b. If restaurantInfo is found     => restaurantInfo
   */
  console.log("resInfo", resInfo);
  const restaurantInfo = resInfo?.cards?.find((c) => c?.card?.card?.info)?.card?.card?.info || resInfo?.cards[0]?.card?.card?.info || null;
  console.log(restaurantInfo)
  if (!restaurantInfo) return null;

  const {
    name,
    cuisines,
    costForTwoMessage,
    cloudinaryImageId,
    avgRating,
    sla,
  } = restaurantInfo;

  /**
   * 3. Extract all menu categories (REGULAR -> cards)
   *    a. If groupedCard is not found => []
   *    b. If groupedCard is found     => groupedCard
   */
  const categories =
    resInfo?.cards
      ?.find((c) => c.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
        (c) =>
          c?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      ) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 1.Header */}
      <header className="flex items-center gap-8 p-6 bg-white rounded-2xl shadow-lg mb-8">
        {/* 1.1. Logo */}
        <div className="w-48 h-48 overflow-hidden rounded-xl">
          <img
            src={CDN_URL + cloudinaryImageId}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 1.2. Restaurant Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
          <p className="text-gray-600 mb-4">{cuisines?.join(", ")}</p>

          <div className="flex items-center gap-6">
            <div className="flex items-center px-3 py-1 bg-green-50 rounded-lg">
              <AiOutlineStar className="text-green-600 mr-1" />
              <span className="font-medium text-green-700">{avgRating}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <FiClock className="mr-1" />
              <span>{sla?.deliveryTime} mins</span>
            </div>

            <div className="text-gray-600 font-medium">{costForTwoMessage}</div>
          </div>
        </div>
      </header>

      {/* 2. Menu */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Menu</h2>

        {/* 2.1. Categories */}
        <div className="space-y-8">
          {categories.map((category, index) => {
            const categoryTitle = category?.card?.card?.title;
            const items = category?.card?.card?.itemCards || [];

            return (
              <RestaurantCategory
                key={categoryTitle}
                title={categoryTitle}
                items={items}
                showItems={index === showIndex}
                setShowIndex={() =>
                  setShowIndex(index === showIndex ? null : index)
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;

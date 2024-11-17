import { useState } from "react";
import { restaurantObj } from "../utils/mockData";
import RestaurantCard from "./RestaurantCard";

export default Body = () => {
  /* Initialization of State Variables */
  const [listOfRestaurants, setListOfRestaurants] = useState(restaurantObj);

  /* State Variables Updater Functions */
  function onFilterRestaurantButtonClick(restaurants) {
    restaurants = restaurants.filter((restaurant) => {
      return restaurant.info.avgRating > 4;
    });
    setListOfRestaurants(restaurants);
  }

  /* Rendering Element */
  return (
    <div className="body-container">
      <div className="search-container">
        Search Bar: <input className="search-input"></input>
      </div>
      <div className="filter-button">
        <button
          onClick={() => onFilterRestaurantButtonClick(listOfRestaurants)}
        >
          Top Rated Restaurants Filter
        </button>
      </div>
      <div className="card-container">
        {listOfRestaurants.map((individualRes) => (
          <RestaurantCard key={individualRes.info.id} resData={individualRes} />
        ))}
      </div>
    </div>
  );
};

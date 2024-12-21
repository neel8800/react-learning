import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

export default Body = () => {
  /* Initialization of State Variables */
  const [actualListOfRestaurants, setActualListOfRestaurants] = useState([]);
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  /* Fetching Restaurants Information from Live API */
  useEffect(() => {
    fetchRestaurantsData();
  }, []);

  /* Promise to fetch restaurants from API */
  async function fetchRestaurantsData() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110"
    );

    /* Converting retrieved restaurants data to JSON format */
    const jsonData = await data.json();

    /* Setting restaurants detail */
    setListOfRestaurants(
      jsonData?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setActualListOfRestaurants(
      jsonData?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  }

  /* State Variables Updater Functions */
  function onFilterRestaurantButtonClick(restaurants) {
    restaurants = restaurants.filter((restaurant) => {
      return restaurant.info.avgRating > 4;
    });
    setListOfRestaurants(restaurants);
  }

  /* Rendering Element */
  return listOfRestaurants != 0 ? (
    <div className="body-container">
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        ></input>
        <button
          onClick={() => {
            const filteredRestaurant = actualListOfRestaurants.filter(
              (restaurant) => {
                return restaurant.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              }
            );
            setListOfRestaurants(filteredRestaurant);
          }}
        >
          Search
        </button>
      </div>
      <div className="filter-button-container">
        <button
          className="filter-button"
          onClick={() => onFilterRestaurantButtonClick(actualListOfRestaurants)}
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
  ) : (
    <div>Loading....</div>
  );
};

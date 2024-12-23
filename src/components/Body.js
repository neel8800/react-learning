import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { HOME_API } from "../utils/constants";
import { Link } from "react-router-dom";

export default Body = () => {
  /* Initialization of State Variables */
  const [actualListOfRestaurants, setActualListOfRestaurants] = useState(null);
  const [listOfRestaurants, setListOfRestaurants] = useState(null);
  const [searchText, setSearchText] = useState("");

  /* Fetching Restaurants Information from Live API */
  useEffect(() => {
    fetchRestaurantsData();
  }, []);

  /* Promise to fetch restaurants from API */
  async function fetchRestaurantsData() {
    const data = await fetch(HOME_API);

    /* Converting retrieved restaurants data to JSON format */
    const jsonData = await data.json();

    /* Setting restaurants detail */
    setListOfRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setActualListOfRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
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
  return listOfRestaurants !== null ? (
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
          <Link
            key={individualRes.info.id}
            to={"/restaurant/" + individualRes.info.id}
          >
            <RestaurantCard resData={individualRes} />
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div>Loading....</div>
  );
};

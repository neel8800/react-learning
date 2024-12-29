import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { HOME_API } from "../utils/constants";
import { Link } from "react-router-dom";
import useFetchAPIContent from "../utils/useFetchAPIContent";

const Body = () => {
  /* Initializing State Variables */
  const [listOfRestaurants, setListOfRestaurants] = useState(null);
  const [searchText, setSearchText] = useState("");

  /* Fetching Restaurants Information using Custom Hook */
  /**
   * IMPORTANT NOTE:
   * ----------------
   * Here the use of useFetchAPIContent make 1 extra rendering cycle as useFetchAPIContent
   * involves useEffect which is updating state variable inside custom hook. As the state variable
   * changes in custom hook, it triggers re-render of this component as it depends on the state
   * variable.
   *
   * I have kept it with 1 extra rendering cycle as this API interaction is not heavy and it can
   * not cause performance issue. But if the API interaction is heavy, then we can directly fetch
   * data in this component using useEffect and update the state variable directly in this component.
   *
   */
  const restaurantData = useFetchAPIContent(HOME_API);
  const actualListOfRestaurants =
    restaurantData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants;

  /* Update listOfRestaurants when actualListOfRestaurants changes */
  if (actualListOfRestaurants && listOfRestaurants == null) {
    setListOfRestaurants(actualListOfRestaurants);
  }

  /* Function to filter restaurants by rating */
  function onFilterRestaurantButtonClick() {
    const filteredRestaurants = actualListOfRestaurants.filter((restaurant) => {
      return restaurant.info.avgRating > 4;
    });
    setListOfRestaurants(filteredRestaurants);
  }

  /* Function to filter restaurants by search text */
  function onSearchButtonClick() {
    const filteredRestaurants = actualListOfRestaurants.filter((restaurant) => {
      return restaurant.info.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
    setListOfRestaurants(filteredRestaurants);
  }

  /* Rendering Component */
  return listOfRestaurants !== null ? (
    <div className="body-container">
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        ></input>
        <button onClick={onSearchButtonClick}>Search</button>
      </div>
      <div className="filter-button-container">
        <button
          className="filter-button"
          onClick={onFilterRestaurantButtonClick}
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

export default Body;

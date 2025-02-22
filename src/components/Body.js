import { useContext, useState } from "react";
import RestaurantCard, {
  RestaurantCardWithHigherRating,
} from "./RestaurantCard";
import { HOME_API } from "../utils/constants";
import { Link } from "react-router-dom";
import useFetchAPIContent from "../utils/useFetchAPIContent";
import UserContext from "../utils/UserContext";

const Body = () => {
  /* Initializing State Variables */
  const [listOfRestaurants, setListOfRestaurants] = useState(null);
  const [searchText, setSearchText] = useState("");
  const { loggedInUserName, setUserName } = useContext(UserContext);

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

  const ResCardWithHighRating = RestaurantCardWithHigherRating(RestaurantCard);

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
    <div className="flex flex-col justify-center">
      <div className="flex flex-row p-4 items-center justify-between">
        <div className="flex flex-row m-1 p-1 items-center">
          <input
            className="px-2 py-1 mx-2 my-1 bg-white text-gray-800 border border-gray-400 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-100 ease-in-out"
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          ></input>
          <button
            className="bg-red-500 text-white px-2 py-1 mx-2 my-1 rounded-lg hover:cursor-pointer active:scale-95 active:bg-red-600 transition-all duration-100"
            onClick={onSearchButtonClick}
          >
            Search
          </button>
        </div>
        <div className="flex flex-row m-1 p-1 items-center">
          <button
            className="bg-red-500 text-white px-2 py-1 mx-2 my-1 rounded-lg hover:cursor-pointer active:scale-95 active:bg-red-600 transition-all duration-100"
            onClick={onFilterRestaurantButtonClick}
          >
            Top Rated Restaurants Filter
          </button>
        </div>
        <div className="flex flex-row m-1 p-1 items-center">
          <label>Name: </label>
          <input
            className="px-2 py-1 mx-2 my-1 bg-white text-gray-800 border border-gray-400 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-100 ease-in-out"
            type="text"
            value={loggedInUserName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center items-center px-4 max-w-7xl mx-auto">
        {listOfRestaurants.map((individualRes) => (
          <Link
            className="flex"
            key={individualRes.info.id}
            to={"/restaurant/" + individualRes.info.id}
          >
            {parseFloat(individualRes.info.avgRating) >= 4.3 ? (
              <ResCardWithHighRating resData={individualRes} />
            ) : (
              <RestaurantCard resData={individualRes} />
            )}
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-wrap font-bold gap-4 justify-center items-center p-4 max-w-7xl m-auto">
      Loading....
    </div>
  );
};

export default Body;

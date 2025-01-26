import { useParams } from "react-router-dom";
import { RESTAURANT_MENU_API } from "../utils/constants";
import useFetchAPIContent from "../utils/useFetchAPIContent";
import MenuSection from "./menuComponents/MenuSection";

const RestaurantMenu = () => {
  console.log("rendering RestaurantMenu");

  const { restaurantId } = useParams();

  /* Fetching restaurant menu data using custom hook */
  const restaurantMenuData = useFetchAPIContent(
    RESTAURANT_MENU_API + restaurantId
  );

  if (restaurantMenuData === null) {
    return <div className="flex text-lg font-bold p-4 m-4">Loading....</div>;
  }

  const { name, avgRating, areaName, city, cuisines } =
    restaurantMenuData.data?.cards[2]?.card?.card?.info;
  const { cards } =
    restaurantMenuData.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;

  return (
    <div>
      <h1>{name}</h1>
      <p>Rating: {avgRating}</p>
      <p>
        Location: {areaName}, {city}
      </p>
      <p>Cuisines: {cuisines?.join(", ")}</p>

      <h2>Menu Items:</h2>
      <ul>
        {cards?.map((card) => {
          const cardInfo = card?.card?.card;
          if (!cardInfo?.title) return null;

          return (
            <li key={cardInfo.title}>
              <MenuSection title={cardInfo.title} items={cardInfo.itemCards} />
              <MenuSection title="Categories" items={cardInfo.categories} />
              <MenuSection title="Carousel" items={cardInfo.carousel} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;

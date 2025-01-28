import { useParams } from "react-router-dom";
import { RESTAURANT_MENU_API } from "../utils/constants";
import useFetchAPIContent from "../utils/useFetchAPIContent";
import MenuSection from "./menuComponents/MenuSection";
import { useContext, useState } from "react";
import UserContext from "../utils/UserContext";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(null);

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

  const categories = cards.filter(
    (card) =>
      card?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">Rating: {avgRating}</p>
      <p className="font-bold text-lg">
        Location: {areaName}, {city}
      </p>
      <p className="font-bold text-lg">Cuisines: {cuisines?.join(", ")}</p>
      {categories.map((category, index) => {
        return (
          <MenuSection
            key={category?.card?.card.title}
            menuData={category?.card?.card}
            showItems={index === showIndex ? true : false}
            setShowIndex={() => {
              if (index === showIndex) {
                setShowIndex(null);
              } else {
                setShowIndex(index);
              }
            }}
          />
        );
      })}

      {/* <h2>Menu Items:</h2>
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
      </ul> */}
    </div>
  );
};

export default RestaurantMenu;

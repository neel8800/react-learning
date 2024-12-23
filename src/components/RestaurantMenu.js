import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RESTAURANT_MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
  const [restaurantMenuData, setRestaurantMenuData] = useState(null);
  const { restaurantId } = useParams();

  const fetchRestaurantMenu = async () => {
    const data = await fetch(RESTAURANT_MENU_API + restaurantId);
    const menuData = await data.json();
    setRestaurantMenuData(menuData.data);
  };

  useEffect(() => {
    fetchRestaurantMenu();
  }, []);

  if (restaurantMenuData === null) {
    return <div>Loading....</div>;
  }

  const { name, avgRating, areaName, city, cuisines } =
    restaurantMenuData?.cards[2]?.card?.card?.info;
  const { cards } =
    restaurantMenuData?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;

  return (
    <div>
      <h1>{name}</h1>
      <p>Rating: {avgRating}</p>
      <p>Location: {areaName + ", " + city}</p>
      <p>Cuisines: {cuisines.join(", ")}</p>
      <h2>Menu Items:</h2>
      <ul>
        {cards?.map((card) => {
          if (card?.card?.card?.title !== undefined) {
            return (
              <li key={card?.card?.card?.title}>
                <h4>{card?.card?.card?.title}</h4>
                {card?.card?.card?.itemCards && (
                  <ul>
                    {card?.card?.card?.itemCards.map((item) => (
                      <li key={item?.card?.info?.id}>
                        {item?.card?.info?.name}
                      </li>
                    ))}
                  </ul>
                )}
                {card?.card?.card?.categories && (
                  <ul>
                    {card?.card?.card?.categories.map((item) => (
                      <li key={item?.title}>
                        {item?.title}
                        {item?.itemCards && (
                          <ul>
                            {item?.itemCards.map((subItem) => (
                              <li key={subItem?.card?.info?.id}>
                                {subItem?.card?.info?.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {card?.card?.card?.carousel && (
                  <ul>
                    {card?.card?.card?.carousel?.map((subItem) => (
                      <li key={subItem?.bannerId}>
                        {subItem?.dish?.info?.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;

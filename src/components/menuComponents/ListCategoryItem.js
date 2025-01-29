import { useContext } from "react";
import { CDN_URL } from "../../utils/constants";
import UserContext from "../../utils/UserContext";
import { useDispatch } from "react-redux";
import { addItem } from "../../utils/reduxStore/slices/cartSlice";

const ListCategoryItem = (props) => {
  const userData = useContext(UserContext);

  const dispatch = useDispatch();
  const onAddButtonClick = (item) => {
    console.log(item);

    dispatch(addItem(item));
  };

  return (
    <div>
      {props.menuItems?.map((item) => (
        <div
          key={item?.card?.info?.id}
          className="p-2 m-2 border-gray-300 border-b-1 text-left flex justify-between gap-10"
        >
          <div className="w-9/12 flex flex-col justify-between">
            <div className="py-2">
              <span>{item?.card?.info?.name}</span>
              <span>
                {" "}
                - ₹
                {item?.card?.info?.price
                  ? item?.card?.info?.price / 100
                  : item?.card?.info?.defaultPrice / 100}
              </span>
              <span> {userData.loggedInUserName}</span>
            </div>
            <p className="text-xs">{item?.card?.info?.description}</p>
          </div>
          <div className="flex flex-col w-3/12 items-center justify-between">
            <div>
              <img src={CDN_URL + item?.card?.info?.imageId} />
            </div>
            <div>
              <button
                className="bg-red-500 text-white px-2 py-1 my-1 rounded-lg hover:cursor-pointer active:scale-95 active:bg-red-600 transition-all duration-100"
                onClick={() => onAddButtonClick(item)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCategoryItem;

import { useDispatch, useSelector } from "react-redux";
import ListCategoryItem from "../components/menuComponents/ListCategoryItem";
import { clearCart } from "../utils/reduxStore/slices/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const onClearCardButton = () => {
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-2 p-2">
      <h1 className="font-bold text-4xl">Cart</h1>
      <div>
        <button
          className="bg-red-500 text-white px-2 py-1 mx-2 my-1 rounded-lg hover:cursor-pointer active:scale-95 active:bg-red-600 transition-all duration-100"
          onClick={() => onClearCardButton()}
        >
          Clear Cart
        </button>
      </div>
      <div className="w-6/12 mx-auto my-4 p-2 bg-white text-gray-800 rounded-lg shadow-sm">
        <ListCategoryItem menuItems={cartItems} />
      </div>
    </div>
  );
};

export default Cart;

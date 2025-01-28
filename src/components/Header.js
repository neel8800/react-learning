import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";

const Header = () => {
  const [buttonName, setButtonName] = useState("Login");
  const userData = useContext(UserContext);
  console.log(userData);

  return (
    <div className="flex justify-between p-4 bg-white shadow-lg">
      <div className="flex items-center justify-between w-16">
        <img
          className="rounded-lg shadow-xl"
          alt="food-logo"
          src="https://media.istockphoto.com/id/1435983029/vector/food-delivery-logo-images.jpg?s=612x612&w=0&k=20&c=HXPxcjOxUiW4pMW1u9E0k2dJYQOU37a_0qZAy3so8fY="
        />
      </div>
      <div className="flex items-center">
        <ul className="flex">
          <li className="px-2 mx-2 py-1 my-1">
            <Link to="/">Home</Link>
          </li>
          <li className="px-2 mx-2 py-1 my-1">
            <Link to="/about">About</Link>
          </li>
          <li className="px-2 mx-2 py-1 my-1">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-2 mx-2 py-1 my-1">Cart</li>
          <button
            className="px-2 mx-2 py-1 my-1 hover:cursor-pointer"
            onClick={() => {
              if (buttonName === "Login") {
                setButtonName("Logout");
              } else {
                setButtonName("Login");
              }
            }}
          >
            {buttonName}
          </button>
          <li className="font-bold text-lg px-2 mx-2 py-1 my-1">
            {userData.loggedInUserName}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [buttonName, setbuttonName] = useState("Login");
  return (
    <div className="header-container">
      <div className="food-logo-container">
        <img
          className="logo"
          alt="food-logo"
          src="https://media.istockphoto.com/id/1435983029/vector/food-delivery-logo-images.jpg?s=612x612&w=0&k=20&c=HXPxcjOxUiW4pMW1u9E0k2dJYQOU37a_0qZAy3so8fY="
        />
      </div>
      <div className="nav-container">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>Cart</li>
          <button
            onClick={() => {
              if (buttonName === "Login") {
                setbuttonName("Logout");
              } else {
                setbuttonName("Login");
              }
            }}
          >
            {buttonName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;

import { useState } from "react";
import ListCategoryItem from "./ListCategoryItem";

const MenuSection = (props) => {
  function handleAccordionClick() {
    props.setShowIndex();
  }
  return (
    <div>
      <div className="w-6/12 mx-auto my-4 p-2 bg-white text-gray-800 rounded-lg shadow-sm">
        <div
          className="flex justify-between hover:cursor-pointer"
          onClick={handleAccordionClick}
        >
          <span>{props.menuData?.title}</span>
          <span>🔽</span>
        </div>
        {props.showItems && (
          <ListCategoryItem menuItems={props.menuData?.itemCards} />
        )}
      </div>
    </div>
  );
};

export default MenuSection;

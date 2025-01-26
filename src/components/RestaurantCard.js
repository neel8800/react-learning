const RestaurantCard = (props) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg w-64 h-fit p-4 overflow-hidden transition-transform duration-200 hover:scale-105">
      <img
        className="w-full h-32 object-cover rounded-lg"
        alt="card-logo"
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
          props.resData.info.cloudinaryImageId
        }
      />
      <h3 className="text-lg font-bold overflow-hidden whitespace-nowrap text-ellipsis">
        {props.resData.info.name}
      </h3>
      <div className="flex w-fit gap-2">
        <h4 className="text-sm text-black">
          {props.resData.info.avgRating} Stars
        </h4>
        <h4 className="text-sm text-black">-</h4>
        <h4 className="text-sm text-black">
          {props.resData.info.sla.slaString} minutes
        </h4>
      </div>
      <h5 className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
        {props.resData.info.cuisines.join(", ")}
      </h5>
      <h5 className="text-sm text-gray-500">{props.resData.info.areaName}</h5>
    </div>
  );
};

export const RestaurantCardWithHigherRating = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white p-1 m-1 rounded-lg text-sm">
          Highly Rated
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;

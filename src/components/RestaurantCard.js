const RestaurantCard = (props) => {
  return (
    <div className="res-card-container">
      <img
        className="card-logo"
        alt="card-logo"
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
          props.resData.info.cloudinaryImageId
        }
      />
      <h3>{props.resData.info.name}</h3>
      <h4>{props.resData.info.avgRating} Stars</h4>
      <h4>{props.resData.info.sla.slaString} minutes</h4>
      <h5>{props.resData.info.cuisines.join(", ")}</h5>
      <h5>{props.resData.info.areaName}</h5>
    </div>
  );
};

export default RestaurantCard;

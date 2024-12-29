import ItemList from "./ItemList";

const MenuSection = (props) => {
  const { title, items } = props;
  if (!items || items.length === 0) return null;

  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item?.card?.info?.id || item?.title}>
            {item?.card?.info?.name || item?.title}
            {item?.itemCards && <ItemList items={item.itemCards} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuSection;

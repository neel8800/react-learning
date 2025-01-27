import ItemListOld from "./ItemList-old";

const MenuSectionOld = (props) => {
  const { title, items } = props;
  if (!items || items.length === 0) return null;

  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item?.card?.info?.id || item?.title}>
            {item?.card?.info?.name || item?.title}
            {item?.itemCards && <ItemListOld items={item.itemCards} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuSectionOld;

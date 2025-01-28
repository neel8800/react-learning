const ItemListOld = (props) => {
  const { items } = props;
  if (!items) return null;

  return (
    <ul>
      {items.map((item) => (
        <li key={item?.card?.info?.id}>{item?.card?.info?.name}</li>
      ))}
    </ul>
  );
};

export default ItemListOld;

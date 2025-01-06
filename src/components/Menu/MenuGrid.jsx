import MenuCard from "../Base/BaseMenuCard";

const MenuGrid = ({ items, onAddToCart, disabled }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No items available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <MenuCard
          key={item.item_id}
          foodName={item.item_name}
          imageSrc={
            item.item_image ||
            "https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU="
          }
          rating={item.rating || 4.5}
          time={item.preparation_time || 30}
          price={item.price}
          onAddClick={() => onAddToCart(item)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default MenuGrid;

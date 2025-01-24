import { useState } from "react";

const MenuFilters = ({ items, onFilterChange, onSortChange }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
      foodType: "all",
      priceRange: "all",
      rating: "all",
    });
    const [sortBy, setSortBy] = useState("recommended");
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [toggleStates, setToggleStates] = useState({
      fastDelivery: false,
      rating4Plus: false,
      offers: false,
    });
    
  
   
    const buttonClasses =
      "px-3 py-1.5 rounded-lg flex items-center gap-2 bg-white hover:bg-gray-50 shadow-md border font-semibold text-sm transition-colors duration-200";
  
    const getToggleButtonClasses = (isActive) => {
      return `${buttonClasses} ${
        isActive
          ? "bg-primary text-white hover:bg-[#C8102E]"
          : "bg-white text-gray-800"
      }`;
    };
  
    const handleToggle = (buttonName) => {
      setToggleStates((prev) => ({
        ...prev,
        [buttonName]: !prev[buttonName],
      }));
  
      let filteredItems = [...items];
  
      if (buttonName === "rating4Plus") {
        filteredItems = filteredItems.filter((item) =>
          !toggleStates.rating4Plus ? item.avg_ratings >= 4 : true
        );
      }
  
      onFilterChange(filteredItems);
    };
  
    const handleFilterChange = (filterType, value) => {
      const newFilters = { ...activeFilters, [filterType]: value };
      setActiveFilters(newFilters);
  
      let filteredItems = [...items];
  
      if (newFilters.foodType !== "all") {
        filteredItems = filteredItems.filter(
          (item) =>
            item.food_type_description.toLowerCase() ===
            newFilters.foodType.toLowerCase()
        );
      }
  
      if (newFilters.priceRange !== "all") {
        switch (newFilters.priceRange) {
          case "under15":
            filteredItems = filteredItems.filter((item) => item.price < 15);
            break;
          case "15to30":
            filteredItems = filteredItems.filter(
              (item) => item.price >= 15 && item.price <= 30
            );
            break;
          case "above30":
            filteredItems = filteredItems.filter((item) => item.price > 30);
            break;
        }
      }
  
      onFilterChange(filteredItems);
    };
  
    const handleSort = (option) => {
      setSortBy(option);
      setShowSortDropdown(false);
  
      let sortedItems = [...items];
      switch (option) {
        case "price-low":
          sortedItems.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          sortedItems.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          sortedItems.sort((a, b) => b.avg_ratings - a.avg_ratings);
          break;
        default:
          sortedItems.sort(
            (a, b) =>
              (b.is_recommended_item === "1") - (a.is_recommended_item === "1")
          );
      }
  
      onSortChange(sortedItems);
    };
  
    return (
        <div className="flex flex-wrap gap-3 items-center mb-6 w-full overflow-x-auto">
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={buttonClasses}
          >
            <span>Filter</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C8102E"
              strokeWidth="2"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
  
          {showFilters && (
            <div className="absolute top-10 left-0 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-sm">Food Type</h3>
                <div className="space-y-2">
                  {["all", "veg", "non-veg"].map((type) => (
                    <label key={type} className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="foodType"
                        value={type}
                        checked={activeFilters.foodType === type}
                        onChange={(e) =>
                          handleFilterChange("foodType", e.target.value)
                        }
                        className="mr-2"
                      />
                      <span className="capitalize">
                        {type === "all" ? "All" : type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
  
              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-sm">Price Range</h3>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All" },
                    { value: "under15", label: "Under $15" },
                    { value: "15to30", label: "$15 - $30" },
                    { value: "above30", label: "Above $30" },
                  ].map((range) => (
                    <label
                      key={range.value}
                      className="flex items-center text-sm"
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        value={range.value}
                        checked={activeFilters.priceRange === range.value}
                        onChange={(e) =>
                          handleFilterChange("priceRange", e.target.value)
                        }
                        className="mr-2"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
  
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className={buttonClasses}
          >
            <span>Sort by</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform ${
                showSortDropdown ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C8102E"
              strokeWidth="2"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
  
          {showSortDropdown && (
            <div className="absolute top-10 left-0 w-48 bg-white rounded-lg shadow-lg p-2 z-50">
              {[
                { value: "recommended", label: "Recommended" },
                { value: "rating", label: "Rating" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSort(option.value)}
                  className={`w-full text-left px-3 py-1.5 rounded text-sm hover:bg-gray-100 ${
                    sortBy === option.value ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
  
        <button
          onClick={() => handleToggle("fastDelivery")}
          className={getToggleButtonClasses(toggleStates.fastDelivery)}
        >
          Fast Delivery
        </button>
  
        <button
          onClick={() => handleToggle("rating4Plus")}
          className={getToggleButtonClasses(toggleStates.rating4Plus)}
        >
          Rating 4+
        </button>
  
        <button
          onClick={() => handleToggle("offers")}
          className={getToggleButtonClasses(toggleStates.offers)}
        >
          Offers
        </button>
      </div>
    );
  };

  export default MenuFilters;
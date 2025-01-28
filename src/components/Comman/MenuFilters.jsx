import React, { useState, useEffect } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal, 
  ArrowDownAZ, 
  Zap, 
  Star, 
  Tag,
  X 
} from "lucide-react";

const MenuFilters = ({ items, onFilterChange, onSortChange }) => {
  const [activeFilters, setActiveFilters] = useState({
    foodType: "all",
    priceRange: "all",
  });
  const [sortBy, setSortBy] = useState("recommended");
  const [toggleStates, setToggleStates] = useState({
    fastDelivery: false,
    rating4Plus: false,
    offers: false,
  });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const buttonClasses = `
    relative
    p-2
    rounded-lg 
    inline-flex items-center justify-center gap-2
    bg-white hover:bg-gray-50 
    shadow-sm border border-gray-200 
    font-medium text-xs
    transition-all duration-300 
    active:scale-95
    hover:shadow-md
    overflow-hidden
  `;

  const getToggleButtonClasses = (isActive) => {
    return `
      ${buttonClasses}
      ${isActive 
        ? "bg-[#C8102E] text-white hover:bg-[#a50d26] border-[#C8102E] shadow-[#C8102E]/20" 
        : "bg-white text-gray-700 hover:border-gray-300"}
      after:content-[''] 
      after:absolute 
      after:h-1 
      after:w-full 
      after:bg-[#C8102E] 
      after:left-0 
      after:bottom-0 
      after:transform 
      after:scale-x-0 
      after:origin-bottom-right
      after:transition-transform
      after:duration-300
      hover:after:scale-x-100 
      hover:after:origin-bottom-left
      ${isActive ? "after:scale-x-100" : ""}
    `;
  };

  const handleDropdownClick = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown-container')) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (buttonName) => {
    const newToggleStates = {
      ...toggleStates,
      [buttonName]: !toggleStates[buttonName],
    };
    setToggleStates(newToggleStates);

    let filteredItems = [...items];
    
    if (newToggleStates.rating4Plus) {
      filteredItems = filteredItems.filter((item) => item.avg_ratings >= 4);
    }
    if (newToggleStates.fastDelivery) {
      filteredItems = filteredItems.filter((item) => item.delivery_time <= 30);
    }
    if (newToggleStates.offers) {
      filteredItems = filteredItems.filter((item) => item.has_offer);
    }

    onFilterChange(filteredItems);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);

    let filteredItems = [...items];

    if (newFilters.foodType !== "all") {
      filteredItems = filteredItems.filter(
        (item) => item.food_type_description.toLowerCase() === newFilters.foodType.toLowerCase()
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
    setActiveDropdown(null);

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
          (a, b) => (b.is_recommended_item === "1") - (a.is_recommended_item === "1")
        );
    }

    onSortChange(sortedItems);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (activeFilters.foodType !== "all") count++;
    if (activeFilters.priceRange !== "all") count++;
    return count;
  };

  return (
    <div className="relative dropdown-container">
      <div className="flex flex-wrap gap-2">
        {/* All buttons in a single flex container */}
        <button 
          className={`${buttonClasses} ${activeDropdown === 'filter' ? 'bg-gray-100 border-gray-300' : ''} relative`}
          onClick={() => handleDropdownClick('filter')}
        >
          <SlidersHorizontal size={12} className="flex-shrink-0" />
          <span className={`${isMobile ? 'hidden' : 'inline'}`}>Filter</span>
          {!isMobile && (activeDropdown === 'filter' ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
          {getActiveFiltersCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C8102E] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>

        <button 
          className={`${buttonClasses} ${activeDropdown === 'sort' ? 'bg-gray-100 border-gray-300' : ''}`}
          onClick={() => handleDropdownClick('sort')}
        >
          <ArrowDownAZ size={12} className="flex-shrink-0" />
          <span className={`${isMobile ? 'hidden' : 'inline'}`}>Sort</span>
          {!isMobile && (activeDropdown === 'sort' ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
        </button>

        <button
          onClick={() => handleToggle("fastDelivery")}
          className={getToggleButtonClasses(toggleStates.fastDelivery)}
          title="Fast Delivery"
        >
          <Zap size={12} className="flex-shrink-0" />
          <span className={`${isMobile ? 'hidden' : 'inline'}`}>Fast Delivery</span>
        </button>

        <button
          onClick={() => handleToggle("rating4Plus")}
          className={getToggleButtonClasses(toggleStates.rating4Plus)}
          title="Rating 4+"
        >
          <Star size={12} className="flex-shrink-0" />
          <span className={`${isMobile ? 'hidden' : 'inline'}`}>Rating 4+</span>
        </button>

        <button
          onClick={() => handleToggle("offers")}
          className={getToggleButtonClasses(toggleStates.offers)}
          title="Offers"
        >
          <Tag size={12} className="flex-shrink-0" />
          <span className={`${isMobile ? 'hidden' : 'inline'}`}>Offers</span>
        </button>
      </div>

      {/* Filter Dropdown */}
      <div className={`
        fixed md:absolute inset-0 md:inset-auto md:top-full md:left-0 
        bg-white md:rounded-lg shadow-lg 
        md:w-[320px] p-4 z-50 md:mt-2
        transition-all duration-300 ease-in-out
        ${activeDropdown === 'filter' 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4 pointer-events-none'}
      `}>
        <div className="flex items-center justify-between mb-4 md:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button 
            onClick={() => setActiveDropdown(null)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-sm">Food Type</h3>
          <div className="space-y-2">
            {["all", "veg", "non-veg"].map((type) => (
              <label key={type} className="flex items-center text-sm hover:bg-gray-50 p-3 rounded-md cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="foodType"
                  value={type}
                  checked={activeFilters.foodType === type}
                  onChange={(e) => handleFilterChange("foodType", e.target.value)}
                  className="mr-3 accent-[#C8102E] w-4 h-4"
                />
                <span className="capitalize">
                  {type === "all" ? "All" : type}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm">Price Range</h3>
          <div className="space-y-2">
            {[
              { value: "all", label: "All" },
              { value: "under15", label: "Under $15" },
              { value: "15to30", label: "$15 - $30" },
              { value: "above30", label: "Above $30" },
            ].map((range) => (
              <label key={range.value} className="flex items-center text-sm hover:bg-gray-50 p-3 rounded-md cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="priceRange"
                  value={range.value}
                  checked={activeFilters.priceRange === range.value}
                  onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                  className="mr-3 accent-[#C8102E] w-4 h-4"
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className={`
        fixed md:absolute inset-0 md:inset-auto md:top-full md:left-0 
        bg-white md:rounded-lg shadow-lg 
        md:w-[320px] p-4 z-50 md:mt-2
        transition-all duration-300 ease-in-out
        ${activeDropdown === 'sort' 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4 pointer-events-none'}
      `}>
        <div className="flex items-center justify-between mb-4 md:hidden">
          <h2 className="text-lg font-semibold">Sort By</h2>
          <button 
            onClick={() => setActiveDropdown(null)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-2">
          {[
            { value: "recommended", label: "Recommended" },
            { value: "price-low", label: "Price: Low to High" },
            { value: "price-high", label: "Price: High to Low" },
            { value: "rating", label: "Rating" }
          ].map((option) => (
            <label key={option.value} className="flex items-center text-sm hover:bg-gray-50 p-3 rounded-md cursor-pointer transition-colors">
              <input
                type="radio"
                name="sortBy"
                value={option.value}
                checked={sortBy === option.value}
                onChange={() => handleSort(option.value)}
                className="mr-3 accent-[#C8102E] w-4 h-4"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuFilters;
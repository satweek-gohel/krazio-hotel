import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { getBranchDetails } from "../services/api/branchService";
import { Search } from "lucide-react";
import PromotionalSlider from "../components/Base/BasePromotionSlider";
import Category from "../components/Base/BaseCategory";
import BranchHeader from "../components/Branch/BranchHeader";
import MenuGrid from "../components/Menu/MenuGrid";
import LoadingSpinner from "../components/Loading/LoadingSpinner";
import { ItemCustomizationModal } from "../components/ItemCustomization";
import { images2 } from "../components/Enumes/Enumes";
import RestaurantHeader from "../components/Branch/ResHeader";
import MenuSlider from "../components/Menu/MenuSlider";
import CartModal from ".././cartModle";
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
    <div className="flex flex-wrap gap-3 items-center mb-6">
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

function BranchPage() {
  const { restaurantName, branchName } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [branchData, setBranchData] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [branchId, setBranchId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [RecommendedItems, setRecommendedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const { addItem } = useCart();

  // First fetch restaurant data
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch('https://sandbox.vovpos.com:3002/web/home', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            restaurant_id: 2 // This should come from config
          })
        });

        const restaurantData = await response.json();

        if (restaurantData.STATUS !== "1") {
          throw new Error("Failed to fetch restaurant data");
        }

        const branch = restaurantData.RESULT.branchDetails.find(
          branch => branch.branch_name.toLowerCase() === decodeURIComponent(branchName).toLowerCase()
        );

        if (!branch) {
          throw new Error("Branch not found");
        }

        setRestaurantId(restaurantData.RESULT.restaurantDetails.restaurant_id);
        setBranchId(branch.branch_id);

      } catch (error) {
        console.error("Failed to fetch restaurant data:", error);
        setError("Failed to load restaurant data");
      }
    };

    fetchRestaurantData();
  }, [restaurantName, branchName]);

  // Then fetch branch details once we have the IDs
  useEffect(() => {
    const fetchBranchData = async () => {
      if (!restaurantId || !branchId) return;

      try {
        const data = await getBranchDetails(restaurantId, branchId);
        setBranchData(data);
        setFilteredItems(data?.item_details || []);

        const allCategory = {
          category_name: "All",
          category_image: "/coffe.png",
          category_id: "all",
        };

        localStorage.setItem(
          "branch_schedule",
          JSON.stringify(data?.branch_details[0]?.branch_schedule)
        );

        setSelectedItem(null);
        const transformedCategories =
          data?.category_details.map((category) => ({
            category_name: category.category_name,
            category_image: category.category_image || "/coffe.png",
            category_id: category.category_id,
          })) || [];

        const categoriesWithAll = [allCategory, ...transformedCategories];

        const recommendedItems =
          data?.item_details.filter(
            (item) => item.is_recommended_item === "1"
          ) || [];

        const isOpen = data?.branch_details[0].is_open === "0";
        setIsOpen(isOpen);

        setCategories(categoriesWithAll);
        setRecommendedItems(recommendedItems);
      } catch (error) {
        console.error("Failed to fetch branch data:", error);
        setError("Failed to load branch details");
      } finally {
        setLoading(false);
      }
    };

    fetchBranchData();
  }, [restaurantId, branchId]);
  const handleCategorySelect = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory?.category_id === category.category_id ? null : category
    );
  };
  const [showCartModal, setShowCartModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
 const [shouldBlockNavigation, setShouldBlockNavigation] = useState(false);

  // Add this effect to handle the back button
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      if (cartItems.length > 0) {
        e.preventDefault();
        setShowCartModal(true);
        return (e.returnValue = 'You have items in your cart');
      }
    };

    const handleBackButton = (e) => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      if (cartItems.length > 0) {
        e.preventDefault();
        e.stopPropagation();
        setShowCartModal(true);
        // Push current state again to prevent immediate navigation
        window.history.pushState(null, document.title, window.location.href);
        return false;
      }
    };

    // Push initial state
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handleBackButton);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Check cart items on component mount
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    if (cartItems.length > 0) {
      setShouldBlockNavigation(true);
    }
  }, []);

  const handleModalConfirm = async () => {
    // First clear the cart
    localStorage.setItem("cartItems", JSON.stringify([]));
    setShowCartModal(false);
    setShouldBlockNavigation(false);
  
    try {
      // First navigate
      await navigate('/');
      // Then refresh
      window.location.reload();
    } catch (error) {
      // Fallback to direct location change if navigation fails
      window.location.href = '/';
    }
  };

  const handleModalCancel = () => {
    setShowCartModal(false);
    // Push state again to prevent immediate back navigation
    window.history.pushState(null, document.title, window.location.href);
  };


  const handleItemClick = async (item) => {
    if (!restaurantId || !branchId) {
      console.error("Restaurant or branch ID not available");
      return;
    }

    const enrichedItem = {
      ...item,
      restaurant_id: restaurantId,
      branch_id: branchId,
    };

    if (item.is_extra_ingradient_available === "1") {
      setSelectedItem(enrichedItem);
    } else {
      handleAddToCart({
        ...enrichedItem,
        totalPrice: item.price,
        quantity: 1,
      });
    }
  };

  const handleAddToCart = (customizedItem) => {
    addItem({
      ...customizedItem,
      id: customizedItem.item_id,
      item_name: customizedItem.item_name,
      price: customizedItem.totalPrice,
      item_image: customizedItem.item_image,
      restaurant_id: restaurantId,
      branch_id: branchId,
    });
  };

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">{error}</h2>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }



  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      setSelectedCategory(null);
    }
  };

  const getFilteredItems = () => {
    let items = filteredItems;

    if (selectedCategory && selectedCategory.category_id !== "all") {
      items = items.filter(
        (item) => item.category_id === selectedCategory.category_id
      );
    }

    if (searchTerm) {
      items = items.filter((item) =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return items;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-2 lg:px-20 py-8 lg:py-5 branch-page">
    <CartModal
      isOpen={showCartModal}
      onClose={handleModalCancel}
      onOk={handleModalConfirm}
    />

    {/* Fixed content above sticky section */}
    <div className="mb-6">
      <div className="base mt-20">
        <RestaurantHeader name={branchData.branch_details[0].branch_name} />
      </div>
      
      {images2.length > 0 && (
        <PromotionalSlider title="Deals For You" images={images2} />
      )}
      
      <div className="recmandtions mt-5">
        <MenuSlider
          items={RecommendedItems}
          onAddToCart={handleItemClick}
          disabled={isOpen}
          title={"Recommended Items"}
        />
      </div>
    </div>

    {/* Categories Section */}
    <div className=" bg-white z-40 mb-6">
      {categories.length > 0 && (
        <Category 
          title={'Food Category'} 
          categories={categories} 
          onSelect={handleCategorySelect} 
        />
      )}
    </div>

    {/* Filters and Search Section */}
    <div className="flex justify-between items-start gap-4 mb-6">
      <MenuFilters
        items={branchData?.item_details || []}
        onFilterChange={setFilteredItems}
        onSortChange={setFilteredItems}
      />
      
      <div className="relative min-w-[240px]">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
    </div>

    {/* Content Below Sticky Section */}
    <div className="mt-4">
      {selectedCategory && selectedCategory.category_id !== "all" && (
        <BranchHeader branchName={selectedCategory.category_name} />
      )}

      {getFilteredItems().length > 0 && (
        <MenuGrid
          items={getFilteredItems()}
          onAddToCart={handleItemClick}
          disabled={isOpen}
        />
      )}
    </div>

    {selectedItem?.is_extra_ingradient_available === "1" ? (
      <ItemCustomizationModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />
    ) : null}
  </div>
);
}

export default BranchPage;

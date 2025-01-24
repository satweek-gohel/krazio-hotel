import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBranches } from "../services/api/branchService";
import { useLogo } from "../contexts/LogoContext";


const CardList = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setLogo } = useLogo();
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await getBranches();
        setBranches(data.branchDetails);
        setRestaurant(data.restaurantDetails);
        // Set restaurant logo from home page
        if (data.restaurantDetails?.restaurant_image) {
          setLogo(data.restaurantDetails.restaurant_image);
        }
      } catch (error) {
       
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const getCurrentDaySchedule = (schedule) => {
    if (!schedule || schedule.length === 0) return null;

    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const today = new Date().getDay();
    const currentDay = days[today];

    return schedule.find((s) => s.day === currentDay);
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handlePickup = (restaurant, restaurantDetails) => {
    if (
      restaurant.is_pickup_available === "1" ||
      restaurant.is_pickup_available === 1
    ) {
      const branchName = encodeURIComponent(restaurant.branch_name);
      const restaurantName = encodeURIComponent(
        restaurantDetails.restaurant_name
      );
      navigate(`/${restaurantName}/${branchName}/branch-menu?mode=pickup`);
    }
  };

  const handleDelivery = (restaurant, restaurantDetails) => {
    if (
      restaurant.is_delivery_available === "1" ||
      restaurant.is_delivery_available === 1
    ) {
      const branchName = encodeURIComponent(restaurant.branch_name);
      const restaurantName = encodeURIComponent(
        restaurantDetails.restaurant_name
      );
      navigate(`/${restaurantName}/${branchName}/branch-menu?mode=delivery`);
    }
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-lg shadow-slate-300 overflow-hidden animate-pulse">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
      <hr className="border-gray-200" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="h-4 w-36 bg-gray-200 rounded"></div>
        </div>
      </div>
      <hr className="border-gray-200" />
      <div className="grid grid-cols-2 divide-x divide-gray-200 gap-4 p-3">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  const Card = ({ restaurant, restaurantDetails }) => {
    const todaySchedule = getCurrentDaySchedule(restaurant.branch_schedule);
    const isOpen = todaySchedule?.is_open === "1";
    const openTime = formatTime(todaySchedule?.open_time);
    const closeTime = formatTime(todaySchedule?.close_time);

    const pickupDisabled =
      restaurant.is_pickup_available !== "1" &&
      restaurant.is_pickup_available !== 1;
    const deliveryDisabled =
      restaurant.is_delivery_available !== "1" &&
      restaurant.is_delivery_available !== 1;

    return (
      <div className="bg-white rounded-lg shadow-lg shadow-slate-300 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="img shadow-lg rounded-lg p-2">
              <img
                src="/res-icon.svg"
                alt=""
                className="w-8 h-8 shadow-lg rounded-lg"
              />
            </div>
            <h2 className="text-lg font-bold uppercase text-black">
              {restaurant.branch_name}
            </h2>
          </div>
        </div>
        <hr className="border-gray-200" />
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <img src="/home-location-dark.svg" alt="" className="w-5 h-5" />
            <p className="text-gray-600">
              {restaurant.street1 ||
                restaurant.branch_address ||
                "Address not available"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <img src="/home-time-dark.svg" alt="" className="w-5 h-5" />
            <p className="text-gray-600">
              {isOpen ? `${openTime} - ${closeTime}` : "Closed Today"}
            </p>
          </div>
        </div>
        <hr className="border-gray-200" />
        <div className="grid grid-cols-2 divide-x divide-gray-200 gap-4 p-3 rounded">
          <button
            onClick={() => handlePickup(restaurant, restaurantDetails)}
            disabled={pickupDisabled}
            className={`flex items-center justify-center gap-2 p-2 text-white rounded transition-colors ${
              pickupDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-red-600"
            }`}
          >
            <span className="font-medium">Pickup</span>
          </button>
          <button
            onClick={() => handleDelivery(restaurant, restaurantDetails)}
            disabled={deliveryDisabled}
            className={`flex items-center justify-center gap-2 p-2 text-white rounded transition-colors ${
              deliveryDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-red-600"
            }`}
          >
            <span className="font-medium">Delivery</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 text-center">
        <h1 className="text-2xl font-semibold text-black-600">
          <span className="text-primary font-bold">Hungry?</span> Let's Bring
          the Restaurant to You!
        </h1>
        <p className="text-sm text-gray-500">
          Explore the top dishes from local restaurants, delivered straight to
          your door.
        </p>
      </div>

      <div
        style={{ margin: "auto" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-3 lg:w-2/3"
      >
        {loading
    ? Array(2)
        .fill(null)
        .map((_, index) => <SkeletonCard key={`skeleton-${index}`} />)
    : branches.map((branch) => (
        <Card
          key={branch.branch_id}
          restaurant={branch}
          restaurantDetails={restaurant}
        />
      ))}
      </div>
    </div>
  );
};

export default CardList;

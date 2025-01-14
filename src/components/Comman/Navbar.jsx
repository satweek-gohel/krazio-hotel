import { useState, useEffect } from "react";
import { Menu, X, Search, MapPin, Clock } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModals from "../auth/authModals";
import { useAuth } from "../../contexts/AuthContext";
import { useModals } from "../../hooks/useModals";
import { useCart } from "../../contexts/CartContext";
import CartSidebar from "../Cart/CartSidebar";
import CouponSidebar from "./CouponSidebar";
import ProfileModal from "./ProfileModal";
import { useBranchData } from "../../hooks/useBranchData";
import ProfileDropdown from "./ProfileDropdown";
import { formatTime } from "../../utils/cartHelpers";
import EmptyCartModal from "./EmptyCartModal";

function Navbar() {
  const { uniqueItemsCount } = useCart();
  const { isAuthenticated, isAuthReady } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCouponSidebarOpen, setIsCouponSidebarOpen] = useState(false);
  const [isEmptyCartModalOpen, setIsEmptyCartModalOpen] = useState(false);
  const modals = useModals();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function isBranchCurrentlyOpen(schedule) {
    if (!schedule || schedule.length === 0) return false;

    const today = new Date()
      .toLocaleString("en-US", { weekday: "short" })
      .toLowerCase();
    const currentDaySchedule = schedule?.find((day) => day.day === today);

    if (!currentDaySchedule || currentDaySchedule.is_open !== "1") return false;

    const now = new Date();
    const currentTime = now.toTimeString().split(" ")[0];

    return (
      currentTime >= currentDaySchedule.open_time &&
      currentTime <= currentDaySchedule.close_time
    );
  }
  const isBranchMenuPage = location.pathname.startsWith("/branch-menu/");
  const [restaurantId, branchId] = isBranchMenuPage
    ? location.pathname.split("/").slice(-2)
    : [null, null];

  const { branchDetails, loading: branchLoading } = useBranchData(
    restaurantId,
    branchId
  );

  useEffect(() => {
    if (isAuthReady) {
      setIsLoading(false);
    }
  }, [isAuthReady]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCartClick = () => {
    if (uniqueItemsCount > 0) {
      navigate("/checkout");
    } else {
      setIsEmptyCartModalOpen(true);
    }
  };

  const renderAuthButtons = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
        </div>
      );
    }

    if (isAuthenticated()) {
      return (
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={handleCartClick}
            className="relative p-1.5 sm:p-2 rounded bg-white-100 hover:bg-gray-200 transition-colors shadow-lg"
          >
            <img
              src="/cart.svg"
              alt="Cart"
              className="w-4 h-4 sm:w-5 sm:h-5 object-cover"
            />
            {uniqueItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {uniqueItemsCount}
              </span>
            )}
          </button>
          {restaurantId && branchId && (
            <button
              onClick={() => setIsCouponSidebarOpen(true)}
              className="relative p-1.5 sm:p-2 rounded bg-white-100 hover:bg-gray-200 shadow-lg transition-colors"
            >
              <img
                src="/coupon.svg"
                alt="Coupon"
                className="w-4 h-4 sm:w-5 sm:h-5 object-cover"
              />
            </button>
          )}
          <div className="flex items-center">
            <ProfileDropdown
              isOpen={isDropdownOpen}
              setIsOpen={setIsDropdownOpen}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={modals.openLoginModal}
          className="px-2 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-primary text-white rounded-lg transition-colors"
        >
          Log in
        </button>
        <button
          onClick={modals.openSignUpModal}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-white text-sm sm:text-base rounded-lg hover:bg-red-700 transition-colors"
        >
          Sign up
        </button>
      </div>
    );
  };

  const renderBranchInfo = () => {
    if (!restaurantId || !branchId || !branchDetails) return null;

    const schedule = branchDetails.branch_details[0].branch_schedule;
    console.log("branchDetails ===========>", branchDetails);
    const today = new Date()
      .toLocaleString("en-US", { weekday: "short" })
      .toLowerCase();
    const currentDaySchedule = schedule?.find((day) => day.day === today);

    const openTime = currentDaySchedule
      ? formatTime(currentDaySchedule.open_time)
      : "9:00 AM";
    const closeTime = currentDaySchedule
      ? formatTime(currentDaySchedule.close_time)
      : "10:00 PM";
    const isOpen = isBranchCurrentlyOpen(schedule);

    return (
      <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 max-w-xl justify-center">
        <div className="flex items-center gap-2 text-black-500 border bg-white-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm">
          <img
            src="/Frame.svg"
            alt="Location"
            className="w-3 h-3 sm:w-4 sm:h-4 object-cover"
          />
          <span className="truncate">
            {branchDetails.branch_details[0].branch_address}
          </span>
        </div>
        <div className="flex items-center gap-2 text-black-500 border px-3 py-1.5 sm:px-4 sm:py-2 rounded whitespace-nowrap text-xs sm:text-sm">
          <img
            src="/Frame (1).svg"
            alt="Time"
            className="w-3 h-3 sm:w-4 sm:h-4 object-cover"
          />
          <span>
            {openTime} - {closeTime}
          </span>
          <span
            className={`ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 text-xs badge ${
              isOpen ? "bg-green-500" : "bg-red-500"
            } text-white rounded-full`}
          >
            {isOpen ? "OPEN" : "CLOSED"}
          </span>
        </div>
      </div>
    );
  };
  const renderMobileBranchInfo = () => {
    if (!restaurantId || !branchId || branchLoading || !branchDetails)
      return null;

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">
            {branchDetails.branch_details[0].branch_address}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="h-4 w-4" />
          <span className="text-sm">9:00AM - 10:00PM</span>
          <span className="ml-2 px-2 py-0.5 text-xs bg-green-500 text-white rounded-full">
            OPEN
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <nav className="bg-white shadow-sm fixed w-full top-0 left-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-8">
            <div className="flex-shrink-0">
              <span className="text-xl sm:text-2xl font-bold text-primary">
                LOGO
              </span>
            </div>

            {renderBranchInfo()}

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative hidden sm:block w-48 lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for food"
                  className="w-full px-4 py-1.5 sm:py-2 bg-gray-50 rounded border text-sm focus:ring-2 focus:ring-primary pl-9 sm:pl-10"
                />
              </div>
              {renderAuthButtons()}
              <button
                onClick={toggleSidebar}
                className="p-1.5 sm:p-2 rounded hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="sm:hidden px-3 py-2 border-t">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for food"
              className="w-full px-4 py-1.5 bg-gray-50 rounded border text-sm focus:ring-2 focus:ring-red-500 pl-9"
            />
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity lg:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg sm:text-xl font-semibold">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {renderMobileBranchInfo()}
          <div className="pt-4 border-t">{renderAuthButtons()}</div>
        </div>
      </div>

      <AuthModals {...modals} />
      <CartSidebar />
      <CouponSidebar
        isOpen={isCouponSidebarOpen}
        onClose={() => setIsCouponSidebarOpen(false)}
      />
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
      <EmptyCartModal
        isOpen={isEmptyCartModalOpen}
        onClose={() => setIsEmptyCartModalOpen(false)}
      />
    </>
  );
}

export default Navbar;

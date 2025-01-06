import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getCoupons } from "../../services/api/branchService";
import { useLocation } from "react-router-dom";

const CouponSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isBranchMenuPage = location.pathname.startsWith("/branch-menu/");
  const [restaurantId, branchId] = isBranchMenuPage
    ? location.pathname.split("/").slice(-2)
    : [null, null];
  const [coupons, setCoupon] = useState([]);
  useEffect(() => {
    const fetchBranchData = async (restaurantId, branchId) => {
      try {
        const data = await getCoupons(restaurantId, branchId);
        setCoupon(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch branch data:", error);
      }
    };

    fetchBranchData();
  }, [restaurantId, branchId]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-gray-50 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b bg-white">
          <h2 className="text-xl font-semibold">Available Coupons</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-white bg-black rounded-full p-1" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          {coupons.map((coupon, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg overflow-hidden flex shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Left red section with vertical text */}
              <div className="bg-red-600 w-[70px] flex items-center justify-center relative">
                <div className="transform -rotate-90 whitespace-nowrap text-white text-2xl font-bold absolute w-[120px] text-center">
                  {coupon.coupon_code}
                </div>

                {/* Circular cutouts */}
                <div className="absolute -left-3 -bottom- w-6 h-6 bg-gray-50 rounded-full" />
              </div>

              {/* Content section */}
              <div className="flex-1 p-2 pl-5">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="parent flex justify-between items-start">
                      <div className="left">
                        <p className="text-blsck-600 text-lg mb-2 font-bold">
                          Extra {coupon.coupon_code_title}
                        </p>
                        <p className="text-gray-600 text-sm mb-2">
                          {coupon.coupon_code_description}
                        </p>
                      </div>
                      <div className="right">
                        <button className=" text-red-600 font-semibold text-right hover:text-red-700 transition-colors">
                          Apply
                        </button>
                      </div>
                    </div>
                    <div className="border-t border-dashed my-3" />
                    <p className="text-xs text-gray-500">
                      *Expires on {coupon.coupon_end_date || "27-04-2003"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CouponSidebar;

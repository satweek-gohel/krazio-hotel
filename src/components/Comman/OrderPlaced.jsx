import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderPlaced() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderDetails = location.state?.orderDetails || {};

  const {
    selectedAddress = {},
    items = [],
    pricing = {},
    selectedTip = {},
    paymentMethod = {},
    orderType = ''
  } = orderDetails;

  const handleBackToHome = () => {
    navigate("/");
  };

  const restaurantId = items[0]?.restaurant_id;
  const branchId = items[0]?.branch_id;
  const [branchName, setBranchName] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchBranchDetails = async () => {
      try {
        const response = await fetch(
          "https://sandbox.vovpos.com:3002/web/home",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              restaurant_id: restaurantId || "",
            }),
          }
        );

        const data = await response.json();

        if (data.STATUS === "1") {
          // Find branch name by matching branch_id
          const matchedBranch = data.RESULT.branchDetails.find(
            (branch) => branch.branch_id === branchId
          );

          if (matchedBranch) {
            setBranchName(matchedBranch.branch_name);
          }
        }
      } catch (err) {
        console.error("Error fetching branch details:", err);
      }
    };

    if (restaurantId && branchId) {
      fetchBranchDetails();
    }

    // Fetch user details from local storage
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')) || {};
    console.log(userDetails);
    setUserName(`${userDetails.first_name} ${userDetails.last_name}`);
    setUserId(userDetails.user_id || "Not Available");
  }, [restaurantId, branchId]);

  const safeValue = (value, fallback = "Not Available") =>
    value ?? fallback;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full relative">
        <div className="absolute top-8 right-8">
          <div className="bg-primary p-2 rounded-full">
            <Download className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="img mb-10">
            <img src="/order-placed.svg" alt="Order Placed" height={60} width={60} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Order Placed</h1>
          <p className="text-gray-500 text-center mt-2">
            {orderType === 'Pick Up' ? "Pick Up" : safeValue(selectedAddress.street_1, "Delivery Address Not Available")}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {/* Restaurant Details */}
          <div className="flex justify-start items-center border-b pb-4 gap-8">
            <span className="font-semibold text-sm">Branch Name | </span>
            <span className="text-gray-500 text-sm">
              {safeValue(branchName, "Restaurant Name Not Available")}
            </span>
          </div>

          {/* Customer Details */}
          <div className="flex justify-start items-center border-b pb-4 gap-8">
            <span className="font-semibold text-sm">Customer Name | </span>
            <span className="text-gray-500 text-sm">
              {safeValue(userName, "Customer Name Not Available")}
            </span>
          </div>

          {/* User ID */}
          <div className="flex justify-start items-center border-b pb-4 gap-8">
            <span className="font-semibold text-sm">User ID | </span>
            <span className="text-gray-500 text-sm">
              {safeValue(userId, "User ID Not Available")}
            </span>
          </div>

          {/* User Name */}
          <div className="flex justify-start items-center border-b pb-4 gap-8">
            <span className="font-semibold text-sm">User Name | </span>
            <span className="text-gray-500 text-sm">
              {safeValue(userName, "User Name Not Available")}
            </span>
          </div>

          {/* Address */}
          {orderType !== 'Pick Up' && (
            <div className="flex justify-start items-center border-b pb-4 gap-8">
              <span className="font-semibold text-sm">Address | </span>
              <span className="text-gray-500 text-sm">
                {`${safeValue(selectedAddress.street_1, "")} ${safeValue(
                  selectedAddress.street_2,
                  ""
                )}, ${safeValue(selectedAddress.city_name, "")}, 
                ${safeValue(selectedAddress.state_name, "")} 
                ${safeValue(selectedAddress.pincode, "")}`}
              </span>
            </div>
          )}

          {/* Contact Details */}
          {orderType !== 'Pick Up' && (
            <div className="flex justify-start items-center border-b pb-4 gap-8">
              <span className="font-semibold text-sm">Mobile No. | </span>
              <span className="text-gray-500 text-sm">
                {safeValue(selectedAddress.mobile_number, "Mobile Number Not Available")}
              </span>
            </div>
          )}

          {/* Order Summary */}
          <div className="flex justify-start items-center border-b pb-4 gap-8">
            <span className="font-semibold text-sm">Order Total | </span>
            <span className="text-gray-500 text-sm">
              $ {safeValue(pricing.total, "Total Not Available")}
            </span>
          </div>

          {/* Tip */}
          {selectedTip.amount && (
            <div className="flex justify-start items-center border-b pb-4 gap-8">
              <span className="font-semibold text-sm">Tip | </span>
              <span className="text-gray-500 text-sm">₹{selectedTip.amount}</span>
            </div>
          )}
        </div>

        <div className="mb-6">
          <img
            src="/order-paced-map.svg"
            alt="Map"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleBackToHome}
            className="flex-1 bg-primary text-white py-3 rounded-lg"
          >
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderPlaced;

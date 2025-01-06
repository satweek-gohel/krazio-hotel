const OrderTypeSelector = ({
  orderType,
  onOrderTypeChange,
  deliveryTime,
  onDeliveryTimeChange,
  selectedDateTime,
  onDateTimeChange,
  condition,
}) => {
  return (
    <div className="px-4 mx-1 py-1 space-y-4 border rounded mb-6">
      <div className="mb-0 flex justify-between p-3 rounded items-center border-b">
        <p className="text-black text-sm font-semibold">Order Type</p>
        <div className="flex gap-3">
          <button
            onClick={() => onOrderTypeChange("Delivery")}
            className={`px-4 py-2 rounded text-xs transition-colors duration-200 w-[80px] ${
              orderType === "Delivery"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Delivery
          </button>
          <button
            onClick={() => onOrderTypeChange("Pick Up")}
            className={`px-4 py-2 rounded text-xs transition-colors duration-200 w-[80px] ${
              orderType === "Pick Up"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Pick Up
          </button>
        </div>
      </div>

      {orderType === "Delivery" && (
        <>
          {/* */}
          <div
            className={`flex justify-between items-center p-3 rounded ${
              condition ? "cursor-not-allowed" : "pointer"
            }`}
          >
            <p className="text-black text-sm font-semibold">
              Food Delivery Time
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => onDeliveryTimeChange("Now")}
                className={`px-4 py-2 rounded text-xs transition-colors duration-200 w-[80px] ${
                  deliveryTime === "Now"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                disabled={condition}
              >
                Now
              </button>
              <button
                onClick={() => onDeliveryTimeChange("Later")}
                className={`px-4 py-2 rounded text-xs transition-colors duration-200 w-[80px] ${
                  deliveryTime === "Later"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                disabled={condition}
              >
                Later
              </button>
            </div>
          </div>

          {deliveryTime === "Later" && (
            <div className="bg-gray-100 p-4 rounded">
              <div className="relative">
                <input
                  type="datetime-local"
                  value={selectedDateTime}
                  onChange={(e) => onDateTimeChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-red-600/10 
             rounded-lg text-gray-700 focus:outline-none focus:border-red-600"
                  min={new Date().toISOString().slice(0, 16)} // Minimum is the current date and time
                  max={
                    condition
                      ? new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
                          .toISOString()
                          .slice(0, 16)
                      : null
                  }
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderTypeSelector;

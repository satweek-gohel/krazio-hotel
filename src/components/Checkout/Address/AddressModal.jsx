import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { addressService } from "../../../services/api/addressService";

export default function AddressModal({ onClose, onSave, initialData = null }) {
  useEffect(() => {
    const userDetailsString = sessionStorage.getItem("userDetails");
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      setUserId(userDetails.user_id);
    }
  }, []);
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    user_name: initialData?.user_name || "",
    mobile_number: initialData?.mobile_number || "",
    state_name: initialData?.state_name || "",
    city_name: initialData?.city_name || "",
    country_name: initialData?.country_name || "",
    location_name: initialData?.location_name || "",
    address: initialData?.address || "",
    street_1: initialData?.street_1 || "",
    street_2: initialData?.street_2 || "",
    landmark: initialData?.landmark || "",
    pincode: initialData?.pincode || "",
    address_type: initialData?.address_type || "0",
    customer_notes: initialData?.customer_notes || "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.user_name.trim()) newErrors.user_name = "Name is required";
    if (!formData.mobile_number)
      newErrors.mobile_number = "Mobile number is required";
    if (formData.mobile_number && !/^\d{10}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = "Enter valid 10-digit mobile number";
    }
    if (!formData.state_name.trim()) newErrors.state_name = "State is required";
    if (!formData.city_name.trim()) newErrors.city_name = "City is required";
    if (!formData.country_name.trim())
      newErrors.country_name = "Country is required";
    if (!formData.location_name.trim())
      newErrors.location_name = "Location is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.street_1.trim()) newErrors.street_1 = "Street is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter valid 6-digit pincode";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const payload = {
          ...formData,
          is_active: 1,
          user_id: userId,
          restaurant_id: 2,
          branch_id: 3,
        };

        // Add user_address_id to payload if it's an update operation
        if (initialData?.user_address_id) {
          payload.user_address_id = initialData.user_address_id;
        }
        await addressService.createAddress(payload);
        onSave(payload);
        onClose();
        window.location.reload();
      } catch (err) {
       
        setErrors((prev) => ({
          ...prev,
          submit: "Failed to save address. Please try again.",
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-3xl my-4 p-4 md:p-6 relative">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pt-2">
          <h2 className="text-xl md:text-2xl font-bold">
            {initialData ? "Update Address" : "Add New Address"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <X size={24} />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto px-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.user_name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.user_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.user_name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number*
                </label>
                <input
                  type="tel"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.mobile_number ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter 10-digit mobile number"
                />
                {errors.mobile_number && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.mobile_number}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location/Area*
                </label>
                <input
                  type="text"
                  name="location_name"
                  value={formData.location_name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.location_name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter location/area"
                />
                {errors.location_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.location_name}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complete Address*
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter complete address"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street 1*
                </label>
                <input
                  type="text"
                  name="street_1"
                  value={formData.street_1}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.street_1 ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter street details"
                />
                {errors.street_1 && (
                  <p className="text-red-500 text-xs mt-1">{errors.street_1}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street 2 (Optional)
                </label>
                <input
                  type="text"
                  name="street_2"
                  value={formData.street_2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter additional street details"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City*
                </label>
                <input
                  type="text"
                  name="city_name"
                  value={formData.city_name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.city_name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter city"
                />
                {errors.city_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.city_name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State*
                </label>
                <input
                  type="text"
                  name="state_name"
                  value={formData.state_name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.state_name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter state"
                />
                {errors.state_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.state_name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country*
                </label>
                <input
                  type="text"
                  name="country_name"
                  value={formData.country_name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.country_name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter country"
                />
                {errors.country_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.country_name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode*
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.pincode ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter 6-digit pincode"
                />
                {errors.pincode && (
                  <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Landmark
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter landmark"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="customer_notes"
                  value={formData.customer_notes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Add any additional notes"
                  rows="2"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Type
                </label>
                <div className="flex gap-4">
                  {["Home", "Work", "Other"].map((type, index) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="address_type"
                        value={index.toString()}
                        checked={formData.address_type === index.toString()}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 sticky bottom-0 bg-white py-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Saving..."
                  : initialData
                  ? "Update Address"
                  : "Add Address"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

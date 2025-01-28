import React, { useEffect, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SignupSuccessModal from "./SignupSyccessModal";
import OTPVerificationModal from "./OtpVerificationModal";
import { detectUserCountryWithCache } from "../../services/api/countrydetection";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";

const SignUpModal = ({ isOpen, onClose, onLoginClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [firstSubmitAttempt, setFirstSubmitAttempt] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userCountry, setUserCountry] = useState("in"); 
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
    mobile_number: "",
    date_of_birth: "",
    gender: "1",
  });
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isloginmodal, setIsLoginModal] =  useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const initializeCountry = async () => {
      const countryCode = await detectUserCountryWithCache();
      setUserCountry(countryCode);
    };

    initializeCountry();
  }, []);

  if (!isOpen) return null;
  
  const onloginclick = () => {
    setIsLoginModal(true);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      mobile_number: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFirstSubmitAttempt(true);

    if (!agreeToTerms) {
      setError("Please agree to the Privacy Policy and Terms and Conditions");
      return;
    }

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email_address ||
      !formData.password ||
      !formData.mobile_number ||
      !formData.date_of_birth ||
      !formData.gender
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(formData.email_address)) {
      setError("Invalid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://sandbox.vovpos.com:3002/web/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();

      setShowOTPModal(true);
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (otp) => {
    try {
      const response = await fetch(
        "https://sandbox.vovpos.com:3002/web/verifyEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "email_address": formData.email_address,
            "otp": otp,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("OTP verification failed");
      }

      setShowOTPModal(false);
      setShowSuccessModal(true); // Open success modal on successful verification
      setFormData({ // Clear the form data after successful signup
        first_name: "",
        last_name: "",
        email_address: "",
        password: "",
        mobile_number: "",
        date_of_birth: "",
        gender: "1",
      });
      setConfirmPassword(""); // Clear confirm password
      setAgreeToTerms(false); // Reset agree to terms
    } catch (error) {
      throw new Error("OTP verification failed");
    }
  };

  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg p-6 z-50 max-h-[90vh] overflow-auto">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black hover:bg-gray-800 p-1.5 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-white" />
            </button>

            <h2 className="text-2xl font-semibold mb-8 text-gray-800">
              Sign Up
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-gray-900 placeholder:text-gray-400"
                  />
                  {firstSubmitAttempt && !formData.first_name && (
                    <p className="text-red-500 text-xs mt-1">
                      First name is required
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-gray-900 placeholder:text-gray-400"
                  />
                  {firstSubmitAttempt && !formData.last_name && (
                    <p className="text-red-500 text-xs mt-1">
                      Last name is required
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile No
                </label>
                <PhoneInput
                  country={userCountry}
                  value={formData.mobile_number}
                  onChange={handlePhoneChange}
                  containerClass="!w-full"
                  inputClass="!w-full !h-[42px] !py-2.5 !pl-[48px] !rounded-lg !border-gray-300 focus:!ring-2 focus:!ring-red-500 focus:!border-transparent !outline-none"
                  buttonClass="!border-gray-300 !rounded-l-lg !h-[42px] !bg-transparent"
                  dropdownClass="!rounded-lg !shadow-lg"
                />
                {firstSubmitAttempt && !formData.mobile_number && (
                  <p className="text-red-500 text-xs mt-1">
                    Mobile number is required
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email_address"
                  value={formData.email_address}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-gray-900 placeholder:text-gray-400"
                />
                {firstSubmitAttempt && !formData.email_address && (
                  <p className="text-red-500 text-xs mt-1">
                    Email address is required
                  </p>
                )}
                {firstSubmitAttempt &&
                  formData.email_address &&
                  !validateEmail(formData.email_address) && (
                    <p className="text-red-500 text-xs mt-1">
                      Invalid email address
                    </p>
                  )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-gray-900"
                />
                {firstSubmitAttempt && !formData.date_of_birth && (
                  <p className="text-red-500 text-xs mt-1">
                    Date of birth is required
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-gray-900"
                >
                  <option value="">Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Other</option>
                </select>
                {firstSubmitAttempt && !formData.gender && (
                  <p className="text-red-500 text-xs mt-1">
                    Gender is required
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-gray-900 placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {firstSubmitAttempt && !formData.password && (
                    <p className="text-red-500 text-xs mt-1">
                      Password is required
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-gray-900 placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {firstSubmitAttempt &&
                    formData.password &&
                    formData.password !== confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        Passwords do not match
                      </p>
                    )}
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to{" "}
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => { window.location.href = '/privacy-policy'; window.open('/privacy-policy', '_blank'); }}
                  >
                    Privacy Policy
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-600"
                   onClick={() => { window.location.href = '/terms-and-conditions'; window.open('/terms-and-conditions', '_blank'); }}

                  >
                    Terms and Conditions
                  </button>
                </span>
                {firstSubmitAttempt && !agreeToTerms && (
                  <p className="text-red-500 text-xs mt-1">
                    You must agree to the terms
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-600 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={onLoginClick}
                    className="text-red-500 hover:text-red-600"
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </>
      )}

      <SignupSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onLoginClick={onloginclick}
      />

      <OTPVerificationModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleVerifyOTP}
        email={formData.email_address}
      />
      <LoginModal isOpen={isloginmodal} onClose={() => setIsLoginModal(false)}  />
    </>
  );
};

export default SignUpModal;

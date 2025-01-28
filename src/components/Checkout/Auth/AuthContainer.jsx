import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import CheckoutAsGuest from "./CheckoutAsGuest"; // Importing the CheckoutAsGuest component

const AuthCard = () => {
  const [view, setView] = useState("buttons");

  const handleGuestCheckout = () => {
    // Implement guest checkout logic here
    console.log("Proceeding as guest...");
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-gray-50">
      {view === "buttons" ? (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-md font-semibold text-gray-800 mb-6">
              Ready to order? Log in to your account or sign up to get started!
            </h2>

            <button
              onClick={() => setView("login")}
              className="w-full py-3 px-4 bg-primary hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Log In
            </button>

            <button
              onClick={() => setView("signup")}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition duration-200"
            >
              Sign Up
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <button
              onClick={() => setView("checkoutasguest")}
              className="w-full py-3 px-4 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              Checkout as Guest
            </button>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/deliveryboy.svg"
              alt="Delivery Illustration"
              className="w-full max-w-md h-auto object-contain"
            />
          </div>
        </div>
      ) : view === "checkoutasguest" ? (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          <CheckoutAsGuest onSwitchToLogin={() => setView("login")} />{" "}
          {/* Added CheckoutAsGuest component */}
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-6">
            {view === "login" ? (
              <LoginForm onSwitchToSignup={() => setView("signup")} />
            ) : (
              <SignupForm onSwitchToLogin={() => setView("login")} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthCard;

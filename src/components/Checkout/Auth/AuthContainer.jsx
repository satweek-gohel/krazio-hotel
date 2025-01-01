import React, { useState } from "react";

const AuthCard = () => {
  const [view, setView] = useState("buttons");

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
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/deliveryboy.svg"
              alt="Delivery Illustration"
              className="w-full max-w-md h-auto object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8"> {/* Changed max-w-md to max-w-4xl */}
          <div className="space-y-6">
            {view === "login" ? (
              <>
                <h2 className="text-md font-semibold text-gray-800">
                  Log In to your account or register to{" "}
                  <button
                    onClick={() => setView("signup")}
                    className="text-primary hover:text-red-700"
                  >
                    create a new one
                  </button>
                </h2>

                <form className="space-y-4">
                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="space-y-2 flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Email Id
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your Email Id"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    <div className="space-y-2 flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-primary hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
                  >
                    Log In
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    *By selecting Log In, you confirm your agreement to the Terms &
                    Conditions and Privacy Policy
                  </p>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-md font-semibold text-gray-800">
                  Sign up or{" "}
                  <button
                    onClick={() => setView("login")}
                    className="text-red-600 hover:text-red-700"
                  >
                    Already have an account
                  </button>
                </h2>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your First Name"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your Last Name"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile No
                    </label>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50">
                        <img
                          src="https://flagcdn.com/w20/in.png"
                          alt="India"
                          className="w-5 h-auto mr-1"
                        />
                        <span className="text-gray-500">+91</span>
                      </div>
                      <input
                        type="tel"
                        placeholder="Enter your mobile no"
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Id
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email id"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Enter password"
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          👁️
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Enter confirm password"
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          👁️
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-primary hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
                  >
                    Sign Up
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    *By selecting Sign Up, you confirm your agreement to the Terms &
                    Conditions and Privacy Policy
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthCard;

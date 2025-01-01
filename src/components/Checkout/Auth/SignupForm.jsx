import React from 'react';

const SignupForm = ({ onLoginClick }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Sign up or{' '}
        <button 
          onClick={onLoginClick}
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
              <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5 h-auto mr-1" />
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
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2">
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
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2">
                👁️
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Sign Up
        </button>

        <p className="text-xs text-gray-500 text-center">
          *By selecting Sign Up, you confirm your agreement to the Terms & Conditions and Privacy Policy
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
import React from 'react';

const LoginForm = ({ onSignupClick }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Log In to your account or register to{' '}
        <button 
          onClick={onSignupClick}
          className="text-red-600 hover:text-red-700"
        >
          create a new one
        </button>
      </h2>

      <form className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Id
          </label>
          <input
            type="email"
            placeholder="Enter your Email Id"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Log In
        </button>

        <p className="text-xs text-gray-500 text-center">
          *By selecting Log In, you confirm your agreement to the Terms & Conditions and Privacy Policy
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
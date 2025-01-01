import React from 'react';

const AuthButtons = ({ onLoginClick, onSignupClick }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Ready to order? Log in to your account or sign up to get started!
      </h2>
      
      <button
        onClick={onLoginClick}
        className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
      >
        Log In
      </button>
      
      <button
        onClick={onSignupClick}
        className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition duration-200"
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthButtons;
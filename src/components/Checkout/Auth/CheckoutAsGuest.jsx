import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

const CheckoutAsGuest = ({ onSwitchToLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loginAsGuest, isLoading, error } = useAuth(); // Using the loginAsGuest function from useAuth

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await loginAsGuest(firstName, lastName, email, mobileNo, password); 
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2 className="text-md font-semibold text-gray-800">
        Sign up or{" "}
        <button
          onClick={onSwitchToLogin}
          className="text-red-600 hover:text-red-700"
        >
          Already have an account
        </button>
      </h2>

      <form className="space-y-4 pt-3"  onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your First Name"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your Last Name"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
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
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              placeholder="Enter your mobile no"
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Id
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email id"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

      

        <button
          type="submit"
          className="w-full py-3 px-4 bg-primary hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Checkout AS Guest'}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <p className="text-xs text-gray-500 text-center">
          *By selecting Checkout As Guest, you confirm your agreement to the Terms &
          Conditions and Privacy Policy
        </p>
      </form>
    </>
  );
};

export default CheckoutAsGuest;
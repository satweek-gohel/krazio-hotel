import React, { useState } from 'react';
import { X } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useAuth } from '../../hooks/useAuth';

const CheckoutAsGuestModal = ({ isOpen, onClose, onLoginClick }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(''); 
  const { loginAsGuest, isLoading, error } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginAsGuest(firstName, lastName, email, mobileNo, gender); 
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg p-6 z-50">
        <button onClick={onClose} className="absolute top-4 right-4 bg-black rounded-full p-1">
          <X className="h-4 w-4 text-white" />
        </button>

        <h2 className="text-2xl font-semibold mb-8">Checkout As Guest</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your First Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your Last Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Mobile No</label>
            <PhoneInput
              country={'in'}
              value={mobileNo}
              onChange={setMobileNo}
              containerClass="!w-full"
              inputClass="!w-full !h-[42px] !py-2.5 !pl-[48px] !rounded-lg !border-gray-300 focus:!ring-2 focus:!ring-red-500 focus:!border-transparent !outline-none"
              buttonClass="!border-gray-300 !rounded-l-lg !h-[42px] !bg-transparent"
              dropdownClass="!rounded-lg !shadow-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email ID"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            >
              <option value="">Select Gender</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button type="button" onClick={onLoginClick} className="text-primary hover:text-red-600">
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutAsGuestModal;
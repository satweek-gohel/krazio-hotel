import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';


const LoginForm = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, isLoading, error } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value === '') {
      setPasswordError('Please enter a password.');
    } else {
      setPasswordError('');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }

    if (password === '') {
      setPasswordError('Please enter a password.');
      valid = false;
    }

    if (!valid) return;

    try {
      await login(email, password);
      window.location.reload();
    } catch (err) {
      // Error handling is managed by useAuth
    }
  };

  return (
    <>
      <h2 className="text-md font-semibold text-gray-800">
        Log In to your account or register to{" "}
        <button
          onClick={onSwitchToSignup}
          className="text-primary hover:text-red-700"
        >
          create a new one
        </button>
      </h2>

      <form className="space-y-4" onSubmit={handleLoginSubmit}>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="space-y-2 flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Email Id
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your Email Id"
              className={`w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${emailError ? 'border-red-500' : ''}`}
            />
            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
          </div>

          <div className="space-y-2 flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className={`w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${passwordError ? 'border-red-500' : ''}`}
            />
            {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-primary hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          *By selecting Log In, you confirm your agreement to the Terms &
          Conditions and Privacy Policy
        </p>
      </form>
    </>
  );
};

export default LoginForm;
import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import 'react-phone-input-2/lib/style.css';
import { useAuth } from '../../hooks/useAuth';

const LoginModal = ({
  isOpen,
  onClose,
  onSignUpClick,
  onForgotPasswordClick,
  onCheckoutAsGuestClick,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, isLoading, error } = useAuth();

  if (!isOpen) return null;

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

  const handleSubmit = async (e) => {
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
      onClose();
    } catch (err) {
      // Error handling is managed by useAuth
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[90%] md:max-w-md bg-white rounded-lg p-4 md:p-6 z-50 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 md:top-4 md:right-4 bg-black rounded-full p-1 hover:bg-gray-800 transition-colors"
        >
          <X className="h-4 w-4 text-white" />
        </button>

        <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 flex items-center">
          Login <span className="ml-2">✌️</span>
        </h2>

        {error && (
          <div className="mb-4 p-2 md:p-3 bg-red-100 border border-red-400 text-primary rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" noValidate>
          <div>
            <label className="block text-gray-700 mb-1 md:mb-2 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border ${emailError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm md:text-base`}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1 md:mb-2 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter password"
                className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm md:text-base`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
            <div className="flex justify-end mt-1 md:mt-2">
              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-primary hover:text-red-600 text-xs md:text-sm"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 md:py-3 rounded-lg hover:bg-primary transition-colors disabled:bg-primary disabled:cursor-not-allowed text-sm md:text-base"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="relative my-4 md:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs md:text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onCheckoutAsGuestClick}
            className="w-full border border-gray-300 text-gray-700 py-2 md:py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
          >
            Checkout As Guest
          </button>

          <div className="text-center mt-4 md:mt-6">
            <p className="text-gray-600 text-xs md:text-sm">
              Don't have an account?{' '}
              <button type="button" onClick={onSignUpClick} className="text-primary hover:text-red-600">
                Register here
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginModal;
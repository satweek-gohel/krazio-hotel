import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LoginForm = ({ onSignupClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, isLoading, error } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate both fields
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      await login(email, password);
      // Login successful - the context will be updated automatically
      // and the session storage will be set by the useAuth hook
    } catch (err) {
      // Error is handled by useAuth hook and will be displayed in the error message
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Log In to your account or register to{' '}
        <button 
          type="button"
          onClick={onSignupClick}
          className="text-red-600 hover:text-red-700"
        >
          create a new one
        </button>
      </h2>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <form className="space-y-4" noValidate>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Id
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => validateEmail(email)}
            placeholder="Enter your Email Id"
            className={`w-full px-3 py-2 bg-gray-50 border ${
              emailError ? 'border-red-500' : 'border-gray-200'
            } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => validatePassword(password)}
              placeholder="Enter your password"
              className={`w-full px-3 py-2 bg-gray-50 border ${
                passwordError ? 'border-red-500' : 'border-gray-200'
              } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}
        </div>

        <button
         onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 disabled:bg-red-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : 'Sign In'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          *By selecting Log In, you confirm your agreement to the Terms & Conditions and Privacy Policy
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
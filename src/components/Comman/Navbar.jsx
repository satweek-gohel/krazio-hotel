import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../Enumes/Enumes';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import CheckoutAsGuestModal from './CheckoutAsGuestModal';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isCheckoutAsGuestModalOpen, setIsCheckoutAsGuestModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsCheckoutAsGuestModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsCheckoutAsGuestModalOpen(false);
  };

  const openForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
    setIsCheckoutAsGuestModalOpen(false);
  };

  const openCheckoutAsGuestModal = () => {
    setIsCheckoutAsGuestModalOpen(true);
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
    setIsForgotPasswordModalOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="text-2xl font-bold text-red-600">Logo</div>
            </div>

            {/* Auth Buttons and Menu Toggle */}
            <div className="flex items-center space-x-4">
              {/* Auth Buttons - Hidden on mobile */}
              <div className="hidden md:flex space-x-2">
                <button
                  onClick={openLoginModal}
                  className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={openSignUpModal}
                  className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                >
                  Sign up
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-600 hover:text-red-600 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:text-red-600 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col p-4">
          {/* Mobile Nav Links */}
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              {link.title}
            </a>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col space-y-2 mt-4">
            <button
              onClick={openLoginModal}
              className="w-full px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              Log in
            </button>
            <button
              onClick={openSignUpModal}
              className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSignUpClick={openSignUpModal}
        onForgotPasswordClick={openForgotPasswordModal}
        onCheckoutAsGuestClick={openCheckoutAsGuestModal}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onLoginClick={openLoginModal}
      />
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
      />
      <CheckoutAsGuestModal
        isOpen={isCheckoutAsGuestModalOpen}
        onClose={() => setIsCheckoutAsGuestModalOpen(false)}
        onLoginClick={openLoginModal}
      />
    </>
  );
};

export default Navbar;
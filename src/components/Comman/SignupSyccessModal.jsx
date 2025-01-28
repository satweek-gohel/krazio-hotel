import React from 'react';
import { Mail, X } from 'lucide-react';

const SignupSuccessModal = ({ isOpen, onClose, onLoginClick }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg p-8 z-50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black hover:bg-gray-800 p-1.5 rounded-full transition-colors"
        >
          <X className="h-4 w-4 text-white" />
        </button>

        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Congratulations!
          </h2>
          
          <p className="text-gray-600 mb-8">
            Your email is successfully verified!
          </p>

          <button
            onClick={onLoginClick}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="h-5 w-5" />
            Continue to Login
          </button>
        </div>
      </div>
    </>
  );
};

export default SignupSuccessModal;
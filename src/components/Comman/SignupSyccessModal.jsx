import React from 'react';
import { Mail, X } from 'lucide-react';

const SignupSuccessModal = ({ isOpen, onClose, email }) => {
  if (!isOpen) return null;

  const handleOpenMail = () => {
    if (!email) {
      console.error('Email is undefined');
      window.open('https://mail.google.com', '_blank');
      return;
    }

    const [, domain] = email.split('@');
    const mailProviders = {
      'gmail.com': 'https://mail.google.com',
      'yahoo.com': 'https://mail.yahoo.com',
      'outlook.com': 'https://outlook.live.com',
      'hotmail.com': 'https://outlook.live.com'
    };

    const providerUrl = mailProviders[domain] || 'https://mail.google.com';
    window.open(providerUrl, '_blank');
  };

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
            Your signup was successful. Please check your email to verify your account.
          </p>

          <button
            onClick={handleOpenMail}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="h-5 w-5" />
            Open Mail
          </button>
        </div>
      </div>
    </>
  );
};

export default SignupSuccessModal;
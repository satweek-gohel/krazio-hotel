import React, { useState } from 'react';
import { X } from 'lucide-react';
import { forgotPassword, resetPassword } from '../../services/api/authService';
import PasswordResetModal from './PasswordResetModal';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); 

    try {
      const response = await forgotPassword(email);
      setSuccess(response.MESSAGE || 'Password reset link sent to your email.');
      setIsModalOpen(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleResetPassword = async (data) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await resetPassword(
        data.email,
        data.otp,
        data.password,
        data.confirm_password
      );
      setSuccess(response.MESSAGE || 'Password reset successful');
  
      onClose(); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg p-6 z-50">
        <button onClick={onClose} className="absolute top-4 right-4 bg-black rounded-full p-1">
          <X className="h-4 w-4 text-white" />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-6">Enter your email address below to reset your password</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2">Email ID</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email ID"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg transition-colors text-white ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-red-600'}`}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'} 
          </button>
        </form>
      </div>

      <PasswordResetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleResetPassword}
        loading={loading}
        email={email}
        title="Reset Your Password"
        submitButtonText="Update Password"
      />
    </>
  );
};

export default ForgotPasswordModal;
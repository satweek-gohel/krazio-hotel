import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const OTPVerificationModal = ({ isOpen, onClose, onVerify, email }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  useEffect(() => {
    let interval;
    if (timer > 0 && isOpen) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, isOpen]);

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const otpArray = pastedData.split('').slice(0, 6);
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      otpArray.forEach((digit, index) => {
        if (index < 6) newOtp[index] = digit;
      });
      return newOtp;
    });
  };

  const handleVerify = async () => {
    setError('');
    if (otp.some(digit => !digit)) {
      setError('Please enter all digits');
      return;
    }

    setLoading(true);
    try {
      // Convert OTP to a number before sending
      const otpNumber = parseInt(otp.join(''), 10);
      await onVerify(otpNumber);
      onClose();
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;
    
    try {
      // Here you would make your API call to resend OTP
      setTimer(30);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg p-6 z-50">
        <button onClick={onClose} className="absolute top-4 right-4 bg-black p-1 rounded-full">
          <X className="h-4 w-4 text-white" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">Verify Your Email</h2>
          <p className="text-gray-600">
            We've sent a 6-digit OTP to<br />
            <span className="font-medium">{email}</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-400 text-red-700 rounded text-center">
            {error}
          </div>
        )}

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading || otp.some(digit => !digit)}
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed mb-4"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        <div className="text-center">
          <p className="text-gray-600 mb-2">
            Didn't receive the code? {timer > 0 ? `Wait ${timer}s to` : ''}
          </p>
          <button
            onClick={handleResendOTP}
            disabled={timer > 0}
            className="text-red-600 font-medium hover:text-red-700 disabled:text-gray-400"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </>
  );
};

export default OTPVerificationModal;
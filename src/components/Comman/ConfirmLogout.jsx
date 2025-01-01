import React from 'react';
import { X } from 'lucide-react';

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Log Out", 
  message = "Are you sure you want to log out?",
  cancelText = "Cancel",
  confirmText = "Confirm"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 bg-black p-1 rounded-full "
        >
          <X size={15} className='text-white bg-black ' />
        </button>

        {/* Modal content */}
        <div className="p-6">
          {/* Illustration */}
          <div className="mb-6 flex justify-center">
            <img src="/logoutimg.svg" alt="Logout Illustration" className="w-50 h-50 object-cover" />
          </div>

          {/* Text content */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 tracking-wide  ">{title}</h2>
            <p className="text-gray-600">{message}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 font-semibold text-sm "
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
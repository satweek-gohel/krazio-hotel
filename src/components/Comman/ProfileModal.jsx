import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function ProfileModal({ isOpen, onClose }) {

  const [formData, setFormData] = useState({
    firstName: 'Vivek',
    lastName: 'Patel',
    mobile: '8787877478',
    email: 'Vivek@gmail.com',
    birthdate: '1990-04-18',
    anniversary: '2001-02-22'
  });
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically save the data to your backend
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Profile Details</h2>

        <div className="mb-6 flex justify-start">
          <div className="w-24 h-24 rounded overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-md disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-md disabled:bg-gray-50"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile No
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50">
                🇮🇳 +91
              </span>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-r-md disabled:bg-gray-50"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-md disabled:bg-gray-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Birthdate
              </label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-md disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wedding Anniversary
              </label>
              <input
                type="date"
                name="anniversary"
                value={formData.anniversary}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-md disabled:bg-gray-50"
              />
            </div>
          </div>

          {isEditing ? (
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Edit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfileModal;